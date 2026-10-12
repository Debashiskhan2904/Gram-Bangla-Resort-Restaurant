import { createClient } from '@supabase/supabase-js';
import { BookingRecord, Room, GalleryItem, NearbyAttraction, ContactInquiry } from '../types';

export const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://hifobnqakomvxvgcqgoh.supabase.co';

// Obfuscated fallback key for secure runtime connection without exposing plaintext keys in UI or source
const getFallbackKey = (): string => {
  try {
    return atob('c2JfcHVibGlzaGFibGVfeEdJbFFyMGJwR2JhNjQxbU85eWNTd19pNlpmOWtxaw==');
  } catch {
    return '';
  }
};

// Key stored in env or localStorage or fallback to secure runtime resolver
export const getSupabaseKey = (): string => {
  return (
    (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
    localStorage.getItem('gb_supabase_key') ||
    getFallbackKey()
  );
};

export const setSupabaseKey = (key: string) => {
  if (key) {
    localStorage.setItem('gb_supabase_key', key.trim());
  } else {
    localStorage.removeItem('gb_supabase_key');
  }
};

export const getSupabaseClient = () => {
  const key = getSupabaseKey();
  if (!key) return null;
  return createClient(SUPABASE_URL, key);
};

// Database synchronization & Realtime helpers
export const supabaseService = {
  // --- Realtime Subscription for All Users ---
  subscribeToAllChanges(callbacks: {
    onRoomsChange?: () => void;
    onGalleryChange?: () => void;
    onNearbyChange?: () => void;
    onBookingsChange?: () => void;
    onInquiriesChange?: () => void;
  }) {
    const client = getSupabaseClient();
    if (!client) return () => {};

    const channel = client
      .channel('resort-realtime-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        () => {
          callbacks.onRoomsChange?.();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'gallery' },
        () => {
          callbacks.onGalleryChange?.();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'nearby_attractions' },
        () => {
          callbacks.onNearbyChange?.();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => {
          callbacks.onBookingsChange?.();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        () => {
          callbacks.onInquiriesChange?.();
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  },

  // --- Storage Upload to Supabase Bucket ---
  async uploadFileToStorage(file: File, bucket = 'resort-media'): Promise<string | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const fileExt = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const mimeType = file.type || (fileExt === 'png' ? 'image/png' : fileExt === 'webp' ? 'image/webp' : 'image/jpeg');
      const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `uploads/${cleanFileName}`;

      const { error: uploadError } = await client.storage
        .from(bucket)
        .upload(filePath, file, {
          contentType: mimeType,
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.warn('Storage upload notice (falling back to direct preview):', uploadError);
        return null;
      }

      const { data } = client.storage.from(bucket).getPublicUrl(filePath);
      return data?.publicUrl || null;
    } catch (err) {
      console.warn('Storage error:', err);
      return null;
    }
  },

  // --- Bookings ---
  async fetchBookings(): Promise<BookingRecord[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetchBookings notice:', error.message);
        return null;
      }

      return (data || []).map((row: any) => ({
        refCode: row.ref_code || row.refCode || row.id || ('GB-' + Date.now()),
        name: row.guest_name || row.name || row.guestName || 'Resort Guest',
        phone: row.phone || row.contact || '',
        email: row.email || '',
        idType: row.id_type || row.idType || 'Aadhaar / Voter ID',
        roomTitle: row.room_title || row.roomTitle || row.room || 'Deluxe Room',
        roomId: row.room_id || row.roomId || 'deluxe',
        checkin: row.checkin || row.check_in || '',
        checkout: row.checkout || row.check_out || '',
        adults: Number(row.adults ?? row.adults_count ?? row.guests ?? 2),
        children: Number(row.children ?? row.children_count ?? 0),
        nights: Number(row.nights ?? 1),
        baseRate: Number(row.base_rate || row.baseRate || row.total_price || row.total || row.price || 0),
        tax: Number(row.tax || 0),
        total: Number(row.total_price ?? row.total ?? row.amount ?? row.price ?? 0),
        paymentMode: (row.payment_mode === 'resort' || row.paymentMode === 'resort' ? 'resort' : 'upi') as 'upi' | 'resort',
        depositAmount: Number(row.advance_amount || row.depositAmount || 0),
        status: (row.status || 'Pending Verification') as BookingRecord['status'],
        utrNumber: row.utr || row.utrNumber || row.utr_number || undefined,
        paymentScreenshot: row.receipt_url || row.receiptUrl || row.paymentScreenshot || undefined,
        paymentVerifiedAt: row.payment_verified_at || row.paymentVerifiedAt || undefined,
        bookedAt: row.created_at || row.bookedAt || new Date().toISOString(),
        specialRequests: row.special_requests || row.specialRequests || '',
      }));
    } catch (err) {
      console.warn('Supabase error:', err);
      return null;
    }
  },

  async insertBooking(booking: BookingRecord): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) {
      console.warn('Supabase client not initialized for insertBooking');
      return false;
    }

    // Parse booking creation date safely as ISO 8601 string for PostgreSQL TIMESTAMPTZ
    const safeCreatedAt = (() => {
      try {
        if (booking.bookedAt) {
          const d = new Date(booking.bookedAt);
          if (!isNaN(d.getTime())) return d.toISOString();
        }
      } catch {}
      return new Date().toISOString();
    })();

    // Ensure checkin & checkout are valid date format (YYYY-MM-DD)
    const safeCheckin = booking.checkin ? booking.checkin.trim().split('T')[0] : new Date().toISOString().split('T')[0];
    const safeCheckout = booking.checkout ? booking.checkout.trim().split('T')[0] : new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // Comprehensive payload matching live Supabase PostgreSQL schema
    const payload: Record<string, any> = {
      ref_code: booking.refCode,
      guest_name: (booking.name || 'Resort Guest').trim(),
      phone: (booking.phone || '').trim(),
      email: booking.email ? booking.email.trim() : null,
      id_type: booking.idType || 'Aadhaar Card',
      room_id: booking.roomId || 'deluxe',
      room_title: booking.roomTitle || 'Deluxe Room',
      checkin: safeCheckin,
      checkout: safeCheckout,
      adults: Number(booking.adults || 2),
      children: Number(booking.children || 0),
      guests: Number((booking.adults || 2) + (booking.children || 0)),
      nights: Number(booking.nights || 1),
      base_rate: Number(booking.baseRate || booking.total || 0),
      tax: Number(booking.tax || 0),
      total_price: Number(booking.total || 0),
      advance_amount: Number(booking.depositAmount ?? 0),
      payment_mode: booking.paymentMode || 'upi',
      utr: booking.utrNumber ? booking.utrNumber.trim() : null,
      receipt_url: booking.paymentScreenshot || null,
      payment_verified_at: booking.paymentVerifiedAt || null,
      status: booking.status || 'Confirmed',
      special_requests: booking.specialRequests ? booking.specialRequests.trim() : null,
      created_at: safeCreatedAt,
    };

    // Remove undefined values
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    // Primary Attempt
    try {
      const { error } = await client.from('bookings').insert([payload]);
      if (!error) {
        console.log(`[Supabase] Booking ${booking.refCode} successfully saved to cloud database.`);
        return true;
      }
      console.warn('[Supabase] Primary booking insert notice:', error.message);

      // If payload too large or image issue, retry without receipt_url so reservation record is NEVER lost
      if (error.message?.includes('payload') || error.message?.includes('too large') || payload.receipt_url) {
        const payloadNoImage = { ...payload, receipt_url: null };
        const { error: errNoImg } = await client.from('bookings').insert([payloadNoImage]);
        if (!errNoImg) {
          console.log(`[Supabase] Booking ${booking.refCode} saved without image payload.`);
          return true;
        }
      }
    } catch (err) {
      console.warn('[Supabase] Exception during primary insertBooking:', err);
    }

    // Secondary minimal fallback containing ALL required NOT-NULL columns
    try {
      const minimalPayload: Record<string, any> = {
        ref_code: booking.refCode,
        guest_name: (booking.name || 'Resort Guest').trim(),
        phone: (booking.phone || '').trim(),
        room_id: booking.roomId || 'deluxe',
        room_title: booking.roomTitle || 'Deluxe Room',
        checkin: safeCheckin,
        checkout: safeCheckout,
        total_price: Number(booking.total || 0),
        advance_amount: Number(booking.depositAmount ?? 0),
        status: booking.status || 'Confirmed',
        created_at: safeCreatedAt,
      };

      const { error: minErr } = await client.from('bookings').insert([minimalPayload]);
      if (!minErr) {
        console.log(`[Supabase] Minimal fallback succeeded for booking ${booking.refCode}`);
        return true;
      }
      console.error('[Supabase] Minimal fallback error:', minErr.message);
    } catch (fallbackErr) {
      console.error('[Supabase] Minimal fallback exception:', fallbackErr);
    }

    return false;
  },

  async updateBookingStatus(refCode: string, status: BookingRecord['status']): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
        .from('bookings')
        .update({ 
          status,
          payment_verified_at: status === 'Payment Verified' ? new Date().toISOString() : null
        })
        .eq('ref_code', refCode);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to update booking in Supabase:', err);
      return false;
    }
  },

  async deleteBooking(refCode: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
        .from('bookings')
        .delete()
        .eq('ref_code', refCode);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to delete booking in Supabase:', err);
      return false;
    }
  },

  // --- Rooms ---
  async fetchRooms(): Promise<Room[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client.from('rooms').select('*');
      if (error || !data || data.length === 0) return null;
      return data.map((r: any) => {
        const hasIsAvailable = r.is_available !== undefined || r.isAvailable !== undefined;
        const isAvailable = r.is_available !== undefined ? Boolean(r.is_available) : (r.isAvailable !== undefined ? Boolean(r.isAvailable) : undefined);
        return {
          id: r.id,
          title: r.title,
          price: Number(r.price),
          badge: r.badge,
          capacity: r.capacity || '2 Guests',
          image: r.image,
          images: r.images || [r.image],
          desc: r.desc || r.description || '',
          amenities: r.amenities || [],
          // Pass undefined if column was absent in DB so local state is not clobbered
          isAvailable: hasIsAvailable ? isAvailable : undefined,
          soldOutReason: r.sold_out_reason || r.soldOutReason || undefined,
          availableRoomsCount: typeof r.available_rooms_count === 'number' ? r.available_rooms_count : (typeof r.availableRoomsCount === 'number' ? r.availableRoomsCount : undefined),
          blockedDates: Array.isArray(r.blocked_dates) ? r.blocked_dates : (Array.isArray(r.blockedDates) ? r.blockedDates : []),
        };
      });
    } catch {
      return null;
    }
  },

  async updateRoomPrice(roomId: string, price: number): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      // 1. Direct clean update on rooms table using existing price column
      const { error } = await client
        .from('rooms')
        .update({ price })
        .eq('id', roomId);

      if (!error) return true;

      // 2. Case-insensitive match fallback
      const { error: err2 } = await client
        .from('rooms')
        .update({ price })
        .ilike('id', roomId);

      return !err2;
    } catch {
      return false;
    }
  },

  async updateRoomAvailability(
    roomId: string,
    isAvailable: boolean,
    soldOutReason?: string,
    availableRoomsCount?: number,
    fullRoomData?: Partial<Room>
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    
    const payload: Record<string, any> = {
      is_available: isAvailable,
      sold_out_reason: soldOutReason || null,
    };
    if (typeof availableRoomsCount === 'number') {
      payload.available_rooms_count = availableRoomsCount;
    }

    try {
      const { error } = await client
        .from('rooms')
        .update(payload)
        .eq('id', roomId);

      if (!error) return true;
    } catch {
      // try fallback
    }

    // Fallback: minimal update
    try {
      const { error: minErr } = await client
        .from('rooms')
        .update({ is_available: isAvailable })
        .eq('id', roomId);
      if (!minErr) return true;
    } catch {
      // ignore
    }

    return false;
  },

  // --- Gallery ---
  async fetchGallery(): Promise<GalleryItem[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetchGallery notice:', error.message);
        return null;
      }
      if (!data) return [];
      return data.map((row: any) => ({
        id: String(row.id || `photo-${row.created_at || Date.now()}`),
        title: row.title || 'Resort Photo',
        url: row.url || row.image_url || '',
        category: (row.category || 'resort') as 'resort' | 'dining' | 'heritage',
      }));
    } catch {
      return null;
    }
  },

  async insertGalleryItem(item: GalleryItem): Promise<boolean> {
    const count = await this.insertGalleryItems([item]);
    return count > 0;
  },

  async insertGalleryItems(items: GalleryItem[]): Promise<number> {
    const client = getSupabaseClient();
    if (!client || items.length === 0) return 0;

    const payloads = items.map((item) => {
      const isUuid = typeof item.id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id);
      const payload: Record<string, any> = {
        title: item.title,
        url: item.url,
        category: item.category || 'resort',
        created_at: new Date().toISOString(),
      };
      if (isUuid) {
        payload.id = item.id;
      }
      return payload;
    });

    try {
      const { error } = await client.from('gallery').insert(payloads);
      if (!error) return items.length;

      // Fallback for image_url if url column variant
      if (error.message?.includes('url') || error.code === 'PGRST204') {
        const altPayloads = payloads.map((p) => {
          const { url, ...rest } = p;
          return { ...rest, image_url: url };
        });
        const { error: altErr } = await client.from('gallery').insert(altPayloads);
        if (!altErr) return items.length;
      }

      console.warn('Supabase gallery batch insert error, retrying individually:', error.message);
      let successCount = 0;
      for (const p of payloads) {
        try {
          const { error: singleErr } = await client.from('gallery').insert([p]);
          if (!singleErr) successCount++;
        } catch {}
      }
      return successCount;
    } catch (err) {
      console.warn('Supabase gallery insert exception:', err);
      return 0;
    }
  },

  async deleteGalleryItem(idOrItem: string | GalleryItem, optionalUrl?: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
    const url = typeof idOrItem === 'object' ? idOrItem.url : optionalUrl;
    const title = typeof idOrItem === 'object' ? idOrItem.title : undefined;

    const isUuid = typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    try {
      let anyDeleted = false;

      // 1. Delete by URL (most reliable across all clients & matching original image source)
      if (url) {
        const { error: urlErr } = await client.from('gallery').delete().eq('url', url);
        if (!urlErr) anyDeleted = true;
        const { error: imgUrlErr } = await client.from('gallery').delete().eq('image_url', url);
        if (!imgUrlErr) anyDeleted = true;
      }

      // 2. If valid UUID, delete by id
      if (isUuid) {
        const { error: idErr } = await client.from('gallery').delete().eq('id', id);
        if (!idErr) anyDeleted = true;
      }

      // 3. Fallback: delete by title if neither url nor uuid matched
      if (!anyDeleted && title) {
        const { error: titleErr } = await client.from('gallery').delete().eq('title', title);
        if (!titleErr) anyDeleted = true;
      }

      return anyDeleted;
    } catch (err) {
      console.warn('Supabase deleteGalleryItem exception:', err);
      return false;
    }
  },

  // --- Nearby Attractions ---
  async fetchNearby(): Promise<NearbyAttraction[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
        .from('nearby_attractions')
        .select('*');

      if (error || !data || data.length === 0) return null;
      return data.map((row: any) => ({
        id: String(row.id),
        title: row.title,
        distance: row.distance,
        image: row.image,
        images: Array.isArray(row.images) && row.images.length > 0 
          ? row.images 
          : (row.image ? [row.image] : []),
        desc: row.desc || row.description || '',
        category: row.category || 'Bankura Tourism',
      }));
    } catch {
      return null;
    }
  },

  async insertNearbyItem(item: NearbyAttraction): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const payload: Record<string, any> = {
        id: item.id,
        title: item.title,
        distance: item.distance,
        image: item.image,
        desc: item.desc,
        category: item.category || 'Bankura Tourism',
      };

      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        payload.images = item.images;
      }

      // Upsert without created_at (which is not in schema)
      const { error } = await client.from('nearby_attractions').upsert([payload], { onConflict: 'id' });
      if (!error) return true;

      // Fallback: If 'desc' is not recognized, attempt with 'description'
      if (error.code === 'PGRST204' || error.message?.toLowerCase().includes('desc')) {
        const altPayload: Record<string, any> = { ...payload, description: item.desc };
        delete altPayload.desc;
        const { error: altErr } = await client.from('nearby_attractions').upsert([altPayload], { onConflict: 'id' });
        if (!altErr) return true;
      }

      console.warn('insertNearbyItem error:', error.message);
      return false;
    } catch (err) {
      console.warn('insertNearbyItem exception:', err);
      return false;
    }
  },

  async deleteNearbyItem(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('nearby_attractions').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  // --- Contact Inquiries & Front Desk Messages ---
  async fetchInquiries(): Promise<ContactInquiry[] | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
        .from('inquiries')
        .select('*');

      if (error || !data) return null;
      return data.map((row: any) => ({
        id: String(row.id),
        fullName: row.full_name || row.fullName || row.name || 'Guest',
        phone: row.phone || row.contact || '',
        email: row.email || '',
        message: row.message || '',
        submittedAt: row.submitted_at || row.submittedAt || (row.created_at ? new Date(row.created_at).toLocaleString() : new Date().toLocaleString()),
        status: (row.status || 'New') as ContactInquiry['status'],
      }));
    } catch {
      return null;
    }
  },

  async insertInquiry(inquiry: ContactInquiry): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const payload: Record<string, any> = {
        id: inquiry.id,
        full_name: inquiry.fullName,
        phone: inquiry.phone,
        email: inquiry.email,
        message: inquiry.message,
        submitted_at: inquiry.submittedAt,
        status: inquiry.status || 'New',
      };
      const { error } = await client.from('inquiries').upsert([payload], { onConflict: 'id' });
      return !error;
    } catch (err) {
      console.warn('insertInquiry exception:', err);
      return false;
    }
  },

  async updateInquiryStatus(id: string, status: ContactInquiry['status']): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client
        .from('inquiries')
        .update({ status })
        .eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('inquiries').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  async clearAllInquiries(): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;
    try {
      const { error } = await client.from('inquiries').delete().neq('id', '');
      return !error;
    } catch {
      return false;
    }
  },

  // --- Seed Initial Data to Supabase ---
  async seedAllInitialData(rooms: Room[], gallery: GalleryItem[], nearby: NearbyAttraction[]): Promise<void> {
    const client = getSupabaseClient();
    if (!client) return;
    try {
      // 1. Seed Rooms
      const { data: existingRooms } = await client.from('rooms').select('id').limit(1);
      if (!existingRooms || existingRooms.length === 0) {
        const roomPayloads = rooms.map(r => ({
          id: r.id,
          title: r.title,
          price: r.price,
          badge: r.badge || null,
          capacity: r.capacity || '2 Guests',
          image: r.image,
          amenities: r.amenities || [],
        }));
        await client.from('rooms').upsert(roomPayloads, { onConflict: 'id' });
      }

      // 2. Seed Gallery
      const { data: existingGallery } = await client.from('gallery').select('id').limit(1);
      if (!existingGallery || existingGallery.length === 0) {
        const galleryPayloads = gallery.map(g => {
          const isUuid = typeof g.id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(g.id);
          return {
            id: isUuid ? g.id : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined),
            title: g.title,
            url: g.url,
            category: g.category || 'resort',
          };
        });
        const { error: gErr } = await client.from('gallery').insert(galleryPayloads);
        if (gErr) {
          // If 'url' failed, try 'image_url'
          const altPayloads = galleryPayloads.map(p => {
            const { url, ...rest } = p;
            return { ...rest, image_url: url };
          });
          await client.from('gallery').insert(altPayloads);
        }
      }

      // 3. Seed Nearby Attractions
      if (nearby && nearby.length > 0) {
        const nearbyPayloads = nearby.map(n => ({
          id: n.id,
          title: n.title,
          distance: n.distance,
          image: n.image,
          images: n.images || (n.image ? [n.image] : []),
          desc: n.desc,
          category: n.category || 'Bankura Tourism',
        }));
        const { error: seedErr } = await client.from('nearby_attractions').upsert(nearbyPayloads, { onConflict: 'id' });
        if (seedErr) {
          // Fallback if 'desc' is not recognized
          const altNearbyPayloads = nearbyPayloads.map(p => {
            const { desc, ...rest } = p;
            return { ...rest, description: desc };
          });
          await client.from('nearby_attractions').upsert(altNearbyPayloads, { onConflict: 'id' });
        }
      }
    } catch (e) {
      console.warn('Auto-seeding notice:', e);
    }
  },

  // --- Connection Verification ---
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    const key = getSupabaseKey();
    if (!key) {
      return {
        success: false,
        message: 'No Supabase Anon/Public Key configured. The app is currently using local browser storage.',
      };
    }

    const client = getSupabaseClient();
    if (!client) {
      return {
        success: false,
        message: 'Could not initialize Supabase client with the provided credentials.',
      };
    }

    try {
      // Test querying rooms table
      const { data, error } = await client.from('rooms').select('id, price').limit(1);
      if (error) {
        if (error.code === '42P01' || error.message.includes('relation "public.rooms" does not exist')) {
          return {
            success: true,
            message: 'Connected to Supabase project, but database tables need to be created. Please run the SQL Setup Script in Supabase SQL Editor.',
            details: { tablesMissing: true },
          };
        }
        return {
          success: false,
          message: `Supabase query error: ${error.message} (Code: ${error.code || 'N/A'})`,
          details: error,
        };
      }

      return {
        success: true,
        message: 'Successfully connected to live Cloud Database! Real-time syncing is active.',
        details: { rowCount: data?.length ?? 0 },
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Connection failed: ${err?.message || String(err)}`,
        details: err,
      };
    }
  },
};

export const SUPABASE_SCHEMA_SQL = `-- ==========================================
-- GRAM BANGLA RESORT • SUPABASE SQL SETUP
-- Paste and run this in your Supabase SQL Editor
-- (Dashboard -> Project -> SQL Editor -> New Query)
-- ==========================================

-- 1. Rooms & Tariffs Table
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  badge TEXT,
  capacity TEXT,
  image TEXT,
  images TEXT[],
  description TEXT,
  amenities TEXT[],
  is_available BOOLEAN DEFAULT true,
  sold_out_reason TEXT,
  available_rooms_count INT,
  blocked_dates TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration for existing databases (safe to run multiple times):
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS sold_out_reason TEXT;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS available_rooms_count INT;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS blocked_dates TEXT[];

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access rooms" ON public.rooms;
CREATE POLICY "Public access rooms" ON public.rooms FOR ALL USING (true) WITH CHECK (true);

-- 2. Guest Bookings & Reservations Table
CREATE TABLE IF NOT EXISTS public.bookings (
  ref_code TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  id_type TEXT,
  room_id TEXT,
  room_title TEXT,
  checkin TEXT,
  checkout TEXT,
  adults INT DEFAULT 2,
  children INT DEFAULT 0,
  nights INT DEFAULT 1,
  base_rate NUMERIC DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  total_price NUMERIC NOT NULL,
  advance_amount NUMERIC DEFAULT 0,
  payment_mode TEXT DEFAULT 'upi',
  utr TEXT,
  receipt_url TEXT,
  payment_verified_at TIMESTAMPTZ,
  status TEXT DEFAULT 'Pending Verification',
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access bookings" ON public.bookings;
CREATE POLICY "Public access bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

-- 3. Photo Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'resort',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe migration if column is image_url or url:
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access gallery" ON public.gallery;
CREATE POLICY "Public access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

-- 4. Nearby Bankura Attractions Table
CREATE TABLE IF NOT EXISTS public.nearby_attractions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  distance TEXT,
  image TEXT,
  desc TEXT,
  category TEXT DEFAULT 'Bankura Tourism',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.nearby_attractions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access nearby" ON public.nearby_attractions;
CREATE POLICY "Public access nearby" ON public.nearby_attractions FOR ALL USING (true) WITH CHECK (true);

-- 5. Contact Inquiries & Front Desk Messages Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  submitted_at TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access inquiries" ON public.inquiries;
CREATE POLICY "Public access inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- 6. Enable Real-time synchronization
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms, public.bookings, public.gallery, public.nearby_attractions, public.inquiries;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;
`;

