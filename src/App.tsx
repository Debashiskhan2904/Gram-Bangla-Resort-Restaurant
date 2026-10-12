import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutWarmth } from './components/AboutWarmth';
import { EventsSection } from './components/EventsSection';
import { FeaturedRooms } from './components/FeaturedRooms';
import { Footer } from './components/Footer';

// Code-split secondary views & modals to keep initial mobile bundle ultra-light
const RoomsSection = lazy(() => import('./components/RoomsSection').then((m) => ({ default: m.RoomsSection })));
const DiningSection = lazy(() => import('./components/DiningSection').then((m) => ({ default: m.DiningSection })));
const NearbySection = lazy(() => import('./components/NearbySection').then((m) => ({ default: m.NearbySection })));
const GallerySection = lazy(() => import('./components/GallerySection').then((m) => ({ default: m.GallerySection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const BookingModal = lazy(() => import('./components/BookingModal').then((m) => ({ default: m.BookingModal })));
const VoucherModal = lazy(() => import('./components/VoucherModal').then((m) => ({ default: m.VoucherModal })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal })));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-24 gap-3">
    <div className="w-8 h-8 rounded-full border-3 border-[#8B3A2B] border-t-transparent animate-spin" />
    <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Loading...</span>
  </div>
);

import {
  INITIAL_ROOMS,
  INITIAL_NEARBY,
  INITIAL_MENU,
  INITIAL_GALLERY,
} from './data/initialData';

import { Room, NearbyAttraction, GalleryItem, BookingRecord, ContactInquiry } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { supabaseService, getSupabaseKey } from './lib/supabase';

const VALID_SECTIONS = ['home', 'rooms', 'dining', 'nearby', 'gallery', 'contact', 'admin'] as const;
type SectionType = (typeof VALID_SECTIONS)[number];

const getSectionFromLocation = (): string => {
  // Always default to Home on full page load / reload
  return 'home';
};

const SECTION_TITLES: Record<string, string> = {
  home: 'Gram Bangla Resort | Bankura, West Bengal',
  rooms: 'Rooms & Luxury Cottages | Gram Bangla Resort Bankura',
  dining: 'Rasoi Dining & Authentic Bengali Thalis | Gram Bangla Resort',
  nearby: 'Bankura Sightseeing & Tourist Spots | Gram Bangla Resort',
  gallery: 'Resort Photo Gallery | Gram Bangla Resort Bankura',
  contact: 'Contact & Location Directions | Gram Bangla Resort Bankura',
  admin: 'Admin Operations Portal | Gram Bangla Resort',
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  home: 'Experience authentic Bengali heritage, luxury rooms, multi-cuisine dining, swimming pool, and scenic Bankura hospitality at Gram Bangla Resort. Book direct for best rates.',
  rooms: 'Explore luxury cottage rooms, AC deluxe rooms, family suites, and executive villas at Gram Bangla Resort Bankura with modern amenities and scenic rural views.',
  dining: 'Taste authentic Bengali delicacies, traditional rural thalis, multi-cuisine specialties, and garden lawn dining at Gram Bangla Rasoi Restaurant Bankura.',
  nearby: 'Discover top tourist attractions in Bankura near Gram Bangla Resort: Bishnupur Terracotta Temples, Mukutmanipur Dam, Susunia Hills, and Joypur Forest.',
  gallery: 'View official photos of Gram Bangla Resort Bankura: cottages, swimming pool, banquet halls, lawn events, dining, and scenic surroundings.',
  contact: 'Get in touch with Gram Bangla Resort Bankura front desk: phone numbers, location map directions, email inquiries, and room booking assistance.',
  admin: 'Official Resort Administration & Management Portal for live room inventory, pricing updates, and guest reservation verification.',
};

const ADMIN_OVERRIDES_KEY = 'gb_admin_room_overrides_v1';

export interface RoomAdminOverride {
  price?: number;
  isAvailable?: boolean;
  soldOutReason?: string;
  availableRoomsCount?: number;
  blockedDates?: string[];
  updatedAt: number;
}

const getAdminOverrides = (): Record<string, RoomAdminOverride> => {
  try {
    const raw = localStorage.getItem(ADMIN_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveAdminOverride = (roomId: string, patch: Partial<RoomAdminOverride>) => {
  try {
    const all = getAdminOverrides();
    all[roomId] = {
      ...all[roomId],
      ...patch,
      updatedAt: Date.now(),
    };
    localStorage.setItem(ADMIN_OVERRIDES_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
};

// Merge helper ensuring all standard rooms from INITIAL_ROOMS are always present
const mergeRoomsWithDefaults = (incoming: Room[] | null | undefined): Room[] => {
  const adminOverrides = getAdminOverrides();

  const incomingMap = new Map<string, Partial<Room>>();
  if (Array.isArray(incoming)) {
    incoming.forEach((r) => {
      if (r && r.id) {
        incomingMap.set(r.id, r);
      }
    });
  }

  // Always retain all standard rooms, applying admin overrides and remote updates
  const merged: Room[] = INITIAL_ROOMS.map((defaultRoom) => {
    const override = incomingMap.get(defaultRoom.id);
    const admin = adminOverrides[defaultRoom.id];

    // Priority for inventory & status:
    // 1. Explicit Admin Override
    // 2. Remote database update
    // 3. Default room values

    const priceVal = typeof admin?.price === 'number' && admin.price > 0
      ? admin.price
      : (typeof override?.price === 'number' && !isNaN(override.price) && override.price > 0 ? override.price : defaultRoom.price);

    const isAvailableVal = typeof admin?.isAvailable === 'boolean'
      ? admin.isAvailable
      : (typeof override?.isAvailable === 'boolean' ? override.isAvailable : (defaultRoom.isAvailable ?? true));

    const soldOutReasonVal = typeof admin?.soldOutReason === 'string'
      ? admin.soldOutReason
      : (typeof override?.soldOutReason === 'string' ? override.soldOutReason : (defaultRoom.soldOutReason || ''));

    const countVal = typeof admin?.availableRoomsCount === 'number'
      ? admin.availableRoomsCount
      : (typeof override?.availableRoomsCount === 'number' ? override.availableRoomsCount : (defaultRoom.availableRoomsCount ?? (isAvailableVal ? 3 : 0)));

    const blockedDatesVal = Array.isArray(admin?.blockedDates)
      ? admin.blockedDates
      : (Array.isArray(override?.blockedDates) ? override.blockedDates : (defaultRoom.blockedDates || []));

    const defaultImages = (defaultRoom.images && defaultRoom.images.length > 0 ? defaultRoom.images : (defaultRoom.image ? [defaultRoom.image] : []))
      .filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
    const sanitizedOverrideImages = (override?.images || [])
      .filter((img): img is string => typeof img === 'string' && img.trim().length > 0 && !img.includes('1611892440504') && !img.includes('1590490360182') && !img.includes('bdca668959df'));

    let finalRoomImages = defaultImages;
    if (sanitizedOverrideImages.length > 0) {
      finalRoomImages = sanitizedOverrideImages;
    } else if (override && Array.isArray(override.images) && override.images.length === 0) {
      finalRoomImages = [];
    }

    const sanitizedImage = override?.image && typeof override.image === 'string' && override.image.trim().length > 0 && !override.image.includes('1611892440504') && !override.image.includes('1590490360182') && !override.image.includes('bdca668959df')
      ? override.image
      : (finalRoomImages[0] || defaultRoom.image || '');

    return {
      ...defaultRoom,
      ...(override || {}),
      title: override?.title && override.title !== 'Gram Bangla Royal Suite' ? override.title : defaultRoom.title,
      price: priceVal,
      capacity: override?.capacity || defaultRoom.capacity,
      desc: override?.desc || defaultRoom.desc,
      image: sanitizedImage,
      images: finalRoomImages,
      amenities: override?.amenities && override.amenities.length > 0 ? override.amenities : defaultRoom.amenities,
      badge: override?.badge || defaultRoom.badge,
      isAvailable: isAvailableVal,
      soldOutReason: soldOutReasonVal,
      availableRoomsCount: countVal,
      blockedDates: blockedDatesVal,
    };
  });

  // Also include any extra custom rooms that were added beyond INITIAL_ROOMS
  const defaultIds = new Set(INITIAL_ROOMS.map((r) => r.id));
  if (Array.isArray(incoming)) {
    incoming.forEach((r) => {
      if (r && r.id && !defaultIds.has(r.id)) {
        merged.push(r as Room);
      }
    });
  }

  return merged;
};

// Keys for permanent custom and deleted nearby attractions
const CUSTOM_NEARBY_KEY = 'gb_custom_nearby_attractions_v1';
const DELETED_NEARBY_KEY = 'gb_deleted_nearby_ids_v1';

const getCustomNearby = (): NearbyAttraction[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_NEARBY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const getDeletedNearbyIds = (): string[] => {
  try {
    const raw = localStorage.getItem(DELETED_NEARBY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Keys for permanent deleted gallery items
const DELETED_GALLERY_KEY = 'gb_deleted_gallery_urls_v2';

const getDeletedGalleryUrls = (): string[] => {
  try {
    const raw = localStorage.getItem(DELETED_GALLERY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const addDeletedGalleryItem = (id: string, url?: string) => {
  try {
    const list = getDeletedGalleryUrls();
    if (id && !list.includes(id)) list.push(id);
    if (url && !list.includes(url)) list.push(url);
    localStorage.setItem(DELETED_GALLERY_KEY, JSON.stringify(list));
  } catch {}
};

export default function App() {
  // Navigation State - initialized immediately from URL to eliminate refresh flashing
  const [activeSection, setActiveSection] = useState<string>(getSectionFromLocation);

  // App Data with LocalStorage Persistence & Default Room Preservation
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('gb_rooms_v13');
      if (saved) {
        const parsed = JSON.parse(saved);
        return mergeRoomsWithDefaults(parsed);
      }
    } catch (e) {
      console.warn('Error reading saved rooms, using defaults:', e);
    }
    return INITIAL_ROOMS;
  });

  const [nearby, setNearby] = useState<NearbyAttraction[]>(() => {
    try {
      const saved = localStorage.getItem('gb_nearby_v5');
      const custom = getCustomNearby();
      const deletedIds = new Set(getDeletedNearbyIds());
      const baseList: NearbyAttraction[] = saved ? JSON.parse(saved) : INITIAL_NEARBY;
      
      const existingIds = new Set(baseList.map((item) => item.id));
      const combined = baseList.filter((item) => !deletedIds.has(item.id));
      
      // Ensure custom attractions created by admin are never lost
      for (const c of custom) {
        if (!deletedIds.has(c.id) && !existingIds.has(c.id)) {
          combined.unshift(c);
        }
      }
      return combined;
    } catch {
      return INITIAL_NEARBY;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('gb_gallery_v4');
      const base: GalleryItem[] = saved ? JSON.parse(saved) : INITIAL_GALLERY;
      const deletedSet = new Set(getDeletedGalleryUrls());
      return base.filter((item) => !deletedSet.has(item.id) && (!item.url || !deletedSet.has(item.url)));
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('gb_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('gb_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading inquiries:', e);
    }
    return [];
  });

  // Fetch initial data from Supabase and listen for Realtime broadcast changes
  useEffect(() => {
    const key = getSupabaseKey();
    if (!key) return;

    // Initial loader from Supabase
    const loadAllRemoteData = async () => {
      try {
        const [remoteRooms, remoteGallery, remoteNearby, remoteBookings, remoteInquiries] = await Promise.all([
          supabaseService.fetchRooms(),
          supabaseService.fetchGallery(),
          supabaseService.fetchNearby(),
          supabaseService.fetchBookings(),
          supabaseService.fetchInquiries(),
        ]);

        if (remoteRooms && remoteRooms.length > 0) {
          const mergedRooms = mergeRoomsWithDefaults(remoteRooms);
          setRooms(mergedRooms);
          localStorage.setItem('gb_rooms_v13', JSON.stringify(mergedRooms));
        } else {
          // If tables were empty, seed the initial resort rooms & attractions to Supabase
          supabaseService.seedAllInitialData(INITIAL_ROOMS, INITIAL_GALLERY, INITIAL_NEARBY);
        }

        if (remoteGallery !== null) {
          const deletedSet = new Set(getDeletedGalleryUrls());
          const filteredRemote = remoteGallery.filter(
            (item) => !deletedSet.has(item.id) && (!item.url || !deletedSet.has(item.url))
          );

          setGallery(filteredRemote);
          try {
            localStorage.setItem('gb_gallery_v4', JSON.stringify(filteredRemote));
          } catch (storageErr) {
            console.warn('localStorage quota notice for gallery:', storageErr);
          }
        }

        if (remoteNearby && remoteNearby.length > 0) {
          const deletedIds = new Set(getDeletedNearbyIds());
          const customItems = getCustomNearby().filter((c) => !deletedIds.has(c.id));
          
          // Filter remote attractions by deleted list
          const filteredRemote = remoteNearby.filter((item) => !deletedIds.has(item.id));
          const remoteIds = new Set(filteredRemote.map((item) => item.id));

          // Any custom attraction not yet present in remote is retained at top
          const missingCustom = customItems.filter((c) => !remoteIds.has(c.id));
          const mergedNearby = [...missingCustom, ...filteredRemote];

          setNearby(mergedNearby);
          localStorage.setItem('gb_nearby_v5', JSON.stringify(mergedNearby));

          // Background-sync any missing custom attractions to Supabase
          missingCustom.forEach((item) => {
            supabaseService.insertNearbyItem(item).catch(() => {});
          });
        }

        if (remoteBookings && remoteBookings.length > 0) {
          setBookings((prev) => {
            const remoteRefs = new Set(remoteBookings.map((b) => b.refCode));
            const localOnly = prev.filter((b) => !remoteRefs.has(b.refCode));
            const merged = [...remoteBookings, ...localOnly];
            localStorage.setItem('gb_bookings', JSON.stringify(merged));
            return merged;
          });
        }

        if (remoteInquiries !== null) {
          setInquiries(remoteInquiries);
          localStorage.setItem('gb_inquiries', JSON.stringify(remoteInquiries));
        }
      } catch (e) {
        console.warn('Realtime initial sync notice:', e);
      }
    };

    loadAllRemoteData();

    // Periodic cloud poll and visibility listener so other devices' rooms, bookings & inquiries stay permanently synchronized
    const syncLatestData = async () => {
      try {
        const [remoteRooms, remoteBookings, remoteInquiries] = await Promise.all([
          supabaseService.fetchRooms(),
          supabaseService.fetchBookings(),
          supabaseService.fetchInquiries(),
        ]);

        if (remoteRooms && remoteRooms.length > 0) {
          const merged = mergeRoomsWithDefaults(remoteRooms);
          setRooms(merged);
          localStorage.setItem('gb_rooms_v13', JSON.stringify(merged));
        }

        if (remoteBookings && remoteBookings.length > 0) {
          setBookings((prev) => {
            const remoteRefs = new Set(remoteBookings.map((b) => b.refCode));
            const localOnly = prev.filter((b) => !remoteRefs.has(b.refCode));
            const merged = [...remoteBookings, ...localOnly];
            localStorage.setItem('gb_bookings', JSON.stringify(merged));
            return merged;
          });
        }

        if (remoteInquiries !== null) {
          setInquiries(remoteInquiries);
          localStorage.setItem('gb_inquiries', JSON.stringify(remoteInquiries));
        }
      } catch (err) {
        console.warn('Sync poll notice:', err);
      }
    };

    const handleFocusOrVisible = () => {
      if (document.visibilityState === 'visible') {
        syncLatestData();
      }
    };

    window.addEventListener('focus', handleFocusOrVisible);
    document.addEventListener('visibilitychange', handleFocusOrVisible);

    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncLatestData();
      }
    }, 15000);

    // Subscribe to Realtime PostgreSQL events
    const unsubscribe = supabaseService.subscribeToAllChanges({
      onRoomsChange: async () => {
        const updatedRooms = await supabaseService.fetchRooms();
        if (updatedRooms) {
          const merged = mergeRoomsWithDefaults(updatedRooms);
          setRooms(merged);
          localStorage.setItem('gb_rooms_v13', JSON.stringify(merged));
        }
      },
      onGalleryChange: async () => {
        const updatedGallery = await supabaseService.fetchGallery();
        if (updatedGallery !== null) {
          const deletedSet = new Set(getDeletedGalleryUrls());
          const filtered = updatedGallery.filter(
            (item) => !deletedSet.has(item.id) && (!item.url || !deletedSet.has(item.url))
          );
          setGallery(filtered);
          localStorage.setItem('gb_gallery_v4', JSON.stringify(filtered));
        }
      },
      onNearbyChange: async () => {
        const updatedNearby = await supabaseService.fetchNearby();
        if (updatedNearby && updatedNearby.length > 0) {
          const deletedIds = new Set(getDeletedNearbyIds());
          const customItems = getCustomNearby().filter((c) => !deletedIds.has(c.id));
          const filteredRemote = updatedNearby.filter((item) => !deletedIds.has(item.id));
          const remoteIds = new Set(filteredRemote.map((item) => item.id));
          const missingCustom = customItems.filter((c) => !remoteIds.has(c.id));
          const merged = [...missingCustom, ...filteredRemote];
          setNearby(merged);
          localStorage.setItem('gb_nearby_v5', JSON.stringify(merged));
        }
      },
      onBookingsChange: async () => {
        const updatedBookings = await supabaseService.fetchBookings();
        if (updatedBookings) {
          setBookings(updatedBookings);
          localStorage.setItem('gb_bookings', JSON.stringify(updatedBookings));
        }
      },
      onInquiriesChange: async () => {
        const updatedInquiries = await supabaseService.fetchInquiries();
        if (updatedInquiries !== null) {
          setInquiries(updatedInquiries);
          localStorage.setItem('gb_inquiries', JSON.stringify(updatedInquiries));
        }
      },
    });

    return () => {
      unsubscribe();
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleFocusOrVisible);
      clearInterval(pollInterval);
    };
  }, []);

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState('deluxe');
  const [bookingDates, setBookingDates] = useState<{ checkin: string; checkout: string } | undefined>(
    undefined
  );
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null);

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync active section with document title, SEO metadata, and session storage
  useEffect(() => {
    // Dynamic page title for perfect indexing
    if (SECTION_TITLES[activeSection]) {
      document.title = SECTION_TITLES[activeSection];
    }

    // Dynamic SEO meta description, OpenGraph, and Twitter tags for search engines
    if (SECTION_DESCRIPTIONS[activeSection]) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', SECTION_DESCRIPTIONS[activeSection]);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', SECTION_DESCRIPTIONS[activeSection]);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && SECTION_TITLES[activeSection]) {
        ogTitle.setAttribute('content', SECTION_TITLES[activeSection]);
      }
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle && SECTION_TITLES[activeSection]) {
        twitterTitle.setAttribute('content', SECTION_TITLES[activeSection]);
      }
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute('content', SECTION_DESCRIPTIONS[activeSection]);
      }

      // Update canonical and og:url
      const targetUrl = activeSection === 'home' 
        ? 'https://grambanglaresort.com/' 
        : `https://grambanglaresort.com/#${activeSection}`;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', targetUrl);
      }
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', targetUrl);
      }
    }
  }, [activeSection]);

  useEffect(() => {
    // Scroll to top on fresh load / reload
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Clean any lingering hash/path on initial mount
    try {
      if (window.location.hash || window.location.pathname !== '/') {
        window.history.replaceState({ section: 'home' }, '', '/');
      }
      sessionStorage.removeItem('gb_active_section');
    } catch (e) {
      // ignore
    }

    const handleUrlChange = () => {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
      const hash = window.location.hash.replace(/^#[!/]?/, '').trim().toLowerCase();
      const target = (VALID_SECTIONS.includes(pathname as SectionType) ? pathname : VALID_SECTIONS.includes(hash as SectionType) ? hash : 'home');
      setActiveSection(target);
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateTo = (sectionId: string) => {
    const targetSection = VALID_SECTIONS.includes(sectionId as SectionType) ? sectionId : 'home';
    const targetPath = targetSection === 'home' ? '/' : `/${targetSection}`;

    try {
      if (window.location.pathname !== targetPath && !window.location.hash.includes(targetSection)) {
        window.history.pushState({ section: targetSection }, '', targetPath);
      }
    } catch (e) {
      // Fallback for sandboxed iframe environments
      const targetHash = targetSection === 'home' ? '' : `#${targetSection}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    }

    setActiveSection(targetSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Booking Modal Launchers
  const handleOpenBooking = (roomId?: string, dates?: { checkin: string; checkout: string }) => {
    if (roomId) setBookingRoomId(roomId);
    if (dates) setBookingDates(dates);
    setBookingModalOpen(true);
  };

  const handleBookingConfirmed = (record: BookingRecord) => {
    const updated = [record, ...bookings.filter(b => b.refCode !== record.refCode)];
    setBookings(updated);
    localStorage.setItem('gb_bookings', JSON.stringify(updated));
    setConfirmedBooking(record);
    showToast(`Booking confirmation voucher generated for Ref: ${record.refCode}`);

    // Re-verify cloud sync in background
    supabaseService.insertBooking(record).catch(console.error);
  };

  const handleRefreshBookings = async () => {
    try {
      const remote = await supabaseService.fetchBookings();
      if (remote) {
        setBookings((prev) => {
          const remoteRefs = new Set(remote.map((b) => b.refCode));
          const localOnly = prev.filter((b) => !remoteRefs.has(b.refCode));
          const merged = [...remote, ...localOnly];
          localStorage.setItem('gb_bookings', JSON.stringify(merged));
          return merged;
        });
        showToast(`Synced ${remote.length} reservation(s) from cloud database`);
      }
    } catch (e) {
      showToast('Could not sync with cloud database', true);
    }
  };

  // Admin Mutations
  const handleUpdateRoomPrice = async (roomId: string, newPrice: number) => {
    saveAdminOverride(roomId, { price: newPrice });
    const updated = rooms.map((r) => (r.id === roomId ? { ...r, price: newPrice } : r));
    setRooms(updated);
    localStorage.setItem('gb_rooms_v13', JSON.stringify(updated));

    // Sync to Supabase cloud database
    try {
      const ok = await supabaseService.updateRoomPrice(roomId, newPrice);
      if (ok) {
        const freshRooms = await supabaseService.fetchRooms();
        if (freshRooms) {
          const merged = mergeRoomsWithDefaults(freshRooms);
          setRooms(merged);
          localStorage.setItem('gb_rooms_v13', JSON.stringify(merged));
        }
      }
    } catch (err) {
      console.error('Error updating room price in Supabase:', err);
    }
  };

  const handleToggleRoomAvailability = (roomId: string, isAvailable: boolean, soldOutReason?: string, count?: number) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    const countVal = typeof count === 'number' ? count : (isAvailable ? 3 : 0);
    const reasonVal = soldOutReason !== undefined ? soldOutReason : (isAvailable ? '' : 'Sold Out');

    saveAdminOverride(roomId, {
      isAvailable,
      soldOutReason: reasonVal,
      availableRoomsCount: countVal,
    });

    const updated = rooms.map((r) =>
      r.id === roomId
        ? {
            ...r,
            isAvailable,
            soldOutReason: reasonVal,
            availableRoomsCount: countVal,
          }
        : r
    );
    setRooms(updated);
    localStorage.setItem('gb_rooms_v13', JSON.stringify(updated));

    // Sync to Supabase with full room data for safe upsert
    supabaseService.updateRoomAvailability(
      roomId,
      isAvailable,
      reasonVal,
      countVal,
      targetRoom
    ).catch(console.error);
  };

  const handleToggleAllRoomsAvailability = (isAvailable: boolean, reason?: string) => {
    const reasonVal = isAvailable ? '' : (reason || 'All Bookings Temporarily Paused');
    const updated = rooms.map((r) => {
      saveAdminOverride(r.id, {
        isAvailable,
        soldOutReason: reasonVal,
        availableRoomsCount: isAvailable ? (r.availableRoomsCount ?? 3) : 0,
      });
      return {
        ...r,
        isAvailable,
        soldOutReason: reasonVal,
        availableRoomsCount: isAvailable ? (r.availableRoomsCount ?? 3) : 0,
      };
    });
    setRooms(updated);
    localStorage.setItem('gb_rooms_v13', JSON.stringify(updated));

    // Sync all to Supabase
    updated.forEach((r) => {
      supabaseService.updateRoomAvailability(r.id, isAvailable, r.soldOutReason, r.availableRoomsCount, r).catch(console.error);
    });
  };

  const handleDeleteBooking = (refCode: string) => {
    const updated = bookings.filter((b) => b.refCode !== refCode);
    setBookings(updated);
    localStorage.setItem('gb_bookings', JSON.stringify(updated));

    // Sync to Supabase
    supabaseService.deleteBooking(refCode).catch(console.error);
  };

  const handleUpdateBookingStatus = (refCode: string, newStatus: BookingRecord['status']) => {
    const updated = bookings.map((b) =>
      b.refCode === refCode
        ? {
            ...b,
            status: newStatus,
            paymentVerifiedAt: newStatus === 'Payment Verified' ? new Date().toLocaleString() : b.paymentVerifiedAt,
          }
        : b
    );
    setBookings(updated);
    localStorage.setItem('gb_bookings', JSON.stringify(updated));

    // Sync to Supabase
    supabaseService.updateBookingStatus(refCode, newStatus).catch(console.error);
  };

  const handleClearAllBookings = () => {
    setBookings([]);
    localStorage.setItem('gb_bookings', JSON.stringify([]));
  };

  const handleAddNearby = (item: NearbyAttraction) => {
    // 1. Remove from deleted IDs if previously deleted
    try {
      const remainingDeleted = getDeletedNearbyIds().filter((id) => id !== item.id);
      localStorage.setItem(DELETED_NEARBY_KEY, JSON.stringify(remainingDeleted));
    } catch {}

    // 2. Persist in custom attractions storage
    try {
      const custom = getCustomNearby().filter((c) => c.id !== item.id);
      custom.unshift(item);
      localStorage.setItem(CUSTOM_NEARBY_KEY, JSON.stringify(custom));
    } catch {}

    // 3. Update active state & cache
    const updated = [item, ...nearby.filter((n) => n.id !== item.id)];
    setNearby(updated);
    localStorage.setItem('gb_nearby_v5', JSON.stringify(updated));

    // 4. Sync to Supabase
    supabaseService.insertNearbyItem(item).catch(console.error);
  };

  const handleDeleteNearby = (id: string) => {
    // 1. Track in deleted IDs
    try {
      const deleted = getDeletedNearbyIds();
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem(DELETED_NEARBY_KEY, JSON.stringify(deleted));
      }
    } catch {}

    // 2. Remove from custom attractions storage
    try {
      const custom = getCustomNearby().filter((c) => c.id !== id);
      localStorage.setItem(CUSTOM_NEARBY_KEY, JSON.stringify(custom));
    } catch {}

    // 3. Update active state & cache
    const updated = nearby.filter((item) => item.id !== id);
    setNearby(updated);
    localStorage.setItem('gb_nearby_v5', JSON.stringify(updated));

    // 4. Sync deletion to Supabase
    supabaseService.deleteNearbyItem(id).catch(console.error);
  };

  const handleAddGallery = async (item: GalleryItem) => {
    const updated = [item, ...gallery.filter((g) => g.id !== item.id && g.url !== item.url)];
    setGallery(updated);
    try {
      localStorage.setItem('gb_gallery_v4', JSON.stringify(updated));
    } catch (e) {
      console.warn('localStorage write warning:', e);
    }

    // Sync to Supabase
    try {
      const ok = await supabaseService.insertGalleryItem(item);
      if (ok) {
        showToast('Photo synced live to website & all devices');
      }
    } catch (err) {
      console.error('Supabase gallery sync error:', err);
    }
  };

  const handleAddMultipleGallery = async (items: GalleryItem[]) => {
    if (items.length === 0) return;
    const newUrls = new Set(items.map((i) => i.url));
    const newIds = new Set(items.map((i) => i.id));
    const updated = [...items, ...gallery.filter((g) => !newIds.has(g.id) && !newUrls.has(g.url))];
    setGallery(updated);
    try {
      localStorage.setItem('gb_gallery_v4', JSON.stringify(updated));
    } catch (e) {
      console.warn('localStorage write warning:', e);
    }

    // Sync to Supabase in batch
    try {
      const count = await supabaseService.insertGalleryItems(items);
      showToast(`${count} ${count === 1 ? 'photo' : 'photos'} synced live to website & all devices`);
    } catch (err) {
      console.error('Supabase batch gallery sync error:', err);
    }
  };

  const handleDeleteGallery = (id: string, itemToDelete?: GalleryItem) => {
    const targetItem = itemToDelete || gallery.find((g) => g.id === id);
    const targetUrl = targetItem?.url;

    // 1. Permanently record deletion so this device or others never restore it
    addDeletedGalleryItem(id, targetUrl);

    // 2. Filter out of active state & localStorage
    const updated = gallery.filter((item) => item.id !== id && (!targetUrl || item.url !== targetUrl));
    setGallery(updated);
    localStorage.setItem('gb_gallery_v4', JSON.stringify(updated));

    // 3. Immediately delete from Supabase by URL, UUID, and Title
    supabaseService.deleteGalleryItem(targetItem || id, targetUrl).catch(console.error);
  };

  const handleInquirySubmitted = (inquiry: ContactInquiry) => {
    const updated = [inquiry, ...inquiries.filter((i) => i.id !== inquiry.id)];
    setInquiries(updated);
    try {
      localStorage.setItem('gb_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Sync to Supabase cloud database
    supabaseService.insertInquiry(inquiry).catch(console.error);
    showToast('Inquiry sent! Saved to Front Desk Admin Portal.');
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem('gb_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Permanently delete from Supabase cloud database
    supabaseService.deleteInquiry(id).catch(console.error);
    showToast('Inquiry permanently deleted');
  };

  const handleClearAllInquiries = () => {
    setInquiries([]);
    try {
      localStorage.setItem('gb_inquiries', JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }

    // Permanently clear from Supabase cloud database
    supabaseService.clearAllInquiries().catch(console.error);
    showToast('All inquiries cleared');
  };

  const handleUpdateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    setInquiries(updated);
    try {
      localStorage.setItem('gb_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Sync status to Supabase
    supabaseService.updateInquiryStatus(id, status).catch(console.error);
    showToast(`Inquiry marked as ${status}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6F0] text-stone-800">
      {/* Primary Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
        bookingCount={bookings.length}
      />

      {/* Main Content Area Based on Active Hash / Page Section */}
      <main className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
          {activeSection === 'home' && (
            <div>
              <Hero
                rooms={rooms}
                onOpenBooking={handleOpenBooking}
                onExploreBankura={() => navigateTo('nearby')}
                onExploreGallery={() => navigateTo('gallery')}
                onNavigate={navigateTo}
              />
              <AboutWarmth
                onContactClick={() => navigateTo('contact')}
                onRoomsClick={() => navigateTo('rooms')}
                onDiningClick={() => navigateTo('dining')}
              />
              <EventsSection
                onEnquireClick={() => navigateTo('contact')}
                onExploreGallery={() => navigateTo('gallery')}
              />
              <FeaturedRooms
                rooms={rooms}
                onOpenBooking={handleOpenBooking}
                onViewAllRooms={() => navigateTo('rooms')}
              />
            </div>
          )}

          {activeSection === 'rooms' && (
            <RoomsSection rooms={rooms} onOpenBooking={(id) => handleOpenBooking(id)} />
          )}

          {activeSection === 'dining' && <DiningSection menu={INITIAL_MENU} />}

          {activeSection === 'nearby' && <NearbySection attractions={nearby} />}

          {activeSection === 'gallery' && (
            <GallerySection
              items={gallery}
              onNavigateToAdmin={() => navigateTo('admin')}
            />
          )}

          {activeSection === 'contact' && (
            <ContactSection onInquirySubmitted={handleInquirySubmitted} />
          )}

          {activeSection === 'admin' && (
            <AdminPortal
              rooms={rooms}
              bookings={bookings}
              nearby={nearby}
              gallery={gallery}
              inquiries={inquiries}
              onUpdateRoomPrice={handleUpdateRoomPrice}
              onToggleRoomAvailability={handleToggleRoomAvailability}
              onToggleAllRoomsAvailability={handleToggleAllRoomsAvailability}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onDeleteBooking={handleDeleteBooking}
              onClearAllBookings={handleClearAllBookings}
              onAddNearby={handleAddNearby}
              onDeleteNearby={handleDeleteNearby}
              onAddGallery={handleAddGallery}
              onAddMultipleGallery={handleAddMultipleGallery}
              onDeleteGallery={handleDeleteGallery}
              onDeleteInquiry={handleDeleteInquiry}
              onClearAllInquiries={handleClearAllInquiries}
              onUpdateInquiryStatus={handleUpdateInquiryStatus}
              onRefreshBookings={handleRefreshBookings}
              onNavigate={navigateTo}
              onShowToast={showToast}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Booking Modal (Only loaded and mounted when opened) */}
      {bookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            rooms={rooms}
            initialRoomId={bookingRoomId}
            initialDates={bookingDates}
            onBookingConfirmed={handleBookingConfirmed}
          />
        </Suspense>
      )}

      {/* Printable Confirmation Voucher Modal (Only loaded when booking confirmed) */}
      {confirmedBooking && (
        <Suspense fallback={null}>
          <VoucherModal
            booking={confirmedBooking}
            onClose={() => setConfirmedBooking(null)}
          />
        </Suspense>
      )}

      {/* Floating Notification Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-2.5 border transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.isError
              ? 'bg-red-900 text-white border-red-700'
              : 'bg-stone-900 text-white border-stone-700'
          }`}
        >
          {toast.isError ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
