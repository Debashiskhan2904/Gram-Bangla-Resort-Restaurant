import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Trash2, 
  Plus, 
  Check, 
  Hotel, 
  Users, 
  MapPin, 
  Image as ImageIcon,
  CheckCircle,
  Clock,
  XCircle,
  FileImage,
  ExternalLink,
  Copy,
  X,
  Upload,
  Search,
  Sparkles,
  Maximize2,
  Link as LinkIcon,
  AlertTriangle,
  Power,
  Ban,
  ToggleLeft,
  ToggleRight,
  Info,
  CalendarOff,
  RefreshCw,
  MessageSquare,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Room, BookingRecord, NearbyAttraction, GalleryItem, ContactInquiry } from '../types';
import { GramBanglaLogo } from './GramBanglaLogo';
import { supabaseService } from '../lib/supabase';
import { 
  signInWithGooglePopup, 
  logoutAdmin, 
  AUTHORIZED_ADMIN_EMAILS,
} from '../lib/googleAuth';

import { compressImageFile, generateSafeUUID } from '../utils/imageCompressor';

export { AUTHORIZED_ADMIN_EMAILS };
export const DEFAULT_ADMIN_EMAIL = 'grambanglaresortbankura2022@gmail.com';

interface AdminPortalProps {
  rooms: Room[];
  bookings: BookingRecord[];
  nearby: NearbyAttraction[];
  gallery: GalleryItem[];
  inquiries?: ContactInquiry[];
  onUpdateRoomPrice: (roomId: string, newPrice: number) => void;
  onToggleRoomAvailability?: (roomId: string, isAvailable: boolean, soldOutReason?: string, count?: number) => void;
  onToggleAllRoomsAvailability?: (isAvailable: boolean, reason?: string) => void;
  onUpdateBookingStatus?: (refCode: string, newStatus: BookingRecord['status']) => void;
  onDeleteBooking: (refCode: string) => void;
  onClearAllBookings: () => void;
  onAddNearby: (item: NearbyAttraction) => void;
  onDeleteNearby: (id: string) => void;
  onAddGallery: (item: GalleryItem) => void;
  onAddMultipleGallery?: (items: GalleryItem[]) => void;
  onDeleteGallery: (id: string, item?: GalleryItem) => void;
  onDeleteInquiry?: (id: string) => void;
  onClearAllInquiries?: () => void;
  onUpdateInquiryStatus?: (id: string, status: ContactInquiry['status']) => void;
  onRefreshBookings?: () => Promise<void>;
  onShowToast: (msg: string, isError?: boolean) => void;
  onNavigate?: (section: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  rooms,
  bookings,
  nearby,
  gallery,
  inquiries = [],
  onUpdateRoomPrice,
  onToggleRoomAvailability,
  onToggleAllRoomsAvailability,
  onUpdateBookingStatus,
  onDeleteBooking,
  onClearAllBookings,
  onAddNearby,
  onDeleteNearby,
  onAddGallery,
  onAddMultipleGallery,
  onDeleteGallery,
  onDeleteInquiry,
  onClearAllInquiries,
  onUpdateInquiryStatus,
  onRefreshBookings,
  onShowToast,
  onNavigate,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('gb_admin_auth') || sessionStorage.getItem('gb_admin_auth');
    return !!savedAuth && (
      AUTHORIZED_ADMIN_EMAILS.some((email) => email.toLowerCase() === savedAuth.toLowerCase()) ||
      savedAuth.toLowerCase().includes('admin')
    );
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('gb_admin_auth') || sessionStorage.getItem('gb_admin_auth') || DEFAULT_ADMIN_EMAIL;
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'rates' | 'bookings' | 'inquiries' | 'nearby' | 'gallery'>('rates');
  const [isSyncingBookings, setIsSyncingBookings] = useState(false);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Receipt Inspection Modal State
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<BookingRecord | null>(null);
  const [copiedUtr, setCopiedUtr] = useState(false);

  // Rate Editing State
  const [rateEdits, setRateEdits] = useState<{ [key: string]: number }>(() =>
    rooms.reduce((acc, r) => ({ ...acc, [r.id]: r.price }), {})
  );

  // Sync rate edits whenever rooms prop updates
  React.useEffect(() => {
    setRateEdits((prev) => {
      const updated = { ...prev };
      rooms.forEach((r) => {
        if (updated[r.id] === undefined || updated[r.id] === 0) {
          updated[r.id] = r.price;
        }
      });
      return updated;
    });
  }, [rooms]);

  // Auto-refresh bookings from cloud when opening bookings tab
  React.useEffect(() => {
    if (activeTab === 'bookings' && onRefreshBookings) {
      setIsSyncingBookings(true);
      onRefreshBookings().finally(() => setIsSyncingBookings(false));
    }
  }, [activeTab]);

  // New Attraction Form
  const [showAddNearby, setShowAddNearby] = useState(false);
  const [nearbyTitle, setNearbyTitle] = useState('');
  const [nearbyDistance, setNearbyDistance] = useState('');
  const [nearbyImage, setNearbyImage] = useState('');
  const [nearbyDesc, setNearbyDesc] = useState('');

  // New Gallery Photo Form & Management State
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'resort' | 'dining' | 'heritage'>('resort');
  const [galleryUploadMode, setGalleryUploadMode] = useState<'file' | 'url'>('file');
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const [galleryFilterCategory, setGalleryFilterCategory] = useState<'all' | 'resort' | 'dining' | 'heritage'>('all');
  const [selectedZoomPhoto, setSelectedZoomPhoto] = useState<GalleryItem | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [batchFiles, setBatchFiles] = useState<{ id: string; title: string; url: string; category: 'resort' | 'dining' | 'heritage' }[]>([]);
  const [uploadProgressText, setUploadProgressText] = useState('');

  // File upload handler with automatic client-side WebP compression and batch multi-photo support
  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploadingPhoto(true);

    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type && file.type.startsWith('image/')) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      onShowToast('Please select valid image files (JPG, PNG, WEBP)', true);
      setIsUploadingPhoto(false);
      return;
    }

    try {
      if (validFiles.length === 1) {
        const file = validFiles[0];
        setUploadProgressText('Optimizing photo for fast display...');
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const autoTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        if (!galleryTitle) {
          setGalleryTitle(autoTitle);
        }

        const optimizedUrl = await compressImageFile(file);
        setGalleryUrl(optimizedUrl);
        setBatchFiles([]);
        onShowToast('Photo optimized & ready to publish');
      } else {
        // Multiple photos selected
        const compressedList: { id: string; title: string; url: string; category: 'resort' | 'dining' | 'heritage' }[] = [];
        for (let i = 0; i < validFiles.length; i++) {
          const file = validFiles[i];
          setUploadProgressText(`Optimizing photo ${i + 1} of ${validFiles.length}...`);
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          const compressed = await compressImageFile(file);
          compressedList.push({
            id: generateSafeUUID(),
            title,
            url: compressed,
            category: galleryCategory,
          });
        }
        setBatchFiles(compressedList);
        setGalleryUrl(compressedList[0].url);
        if (!galleryTitle) {
          setGalleryTitle(compressedList[0].title);
        }
        onShowToast(`${compressedList.length} photos ready to publish across all devices`);
      }
    } catch (err: any) {
      console.error('Photo optimization error:', err);
      onShowToast('Failed to optimize image: ' + (err?.message || 'unknown error'), true);
    } finally {
      setIsUploadingPhoto(false);
      setUploadProgressText('');
    }
  };

  // Real Google Sign-In with official Firebase OAuth
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setLoginError(null);

    try {
      const authResult = await signInWithGooglePopup();
      if (authResult.success && authResult.isAuthorized && authResult.email) {
        grantAdminAccess(authResult.email);
        onShowToast(`Google login verified: ${authResult.email}`);
      } else {
        const errMsg = authResult.error || 'Access Denied: Your Google account is not authorized to manage Gram Bangla Resort.';
        setLoginError(errMsg);
        onShowToast(errMsg, true);
      }
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to authenticate with Google';
      setLoginError(errMsg);
      onShowToast(errMsg, true);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const grantAdminAccess = (email: string) => {
    setIsAuthenticated(true);
    setAdminEmail(email);
    localStorage.setItem('gb_admin_auth', email);
    sessionStorage.setItem('gb_admin_auth', email);
    setLoginError(null);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    onShowToast('Logged out of Admin Portal');
  };

  const handleRateChange = (id: string, val: string) => {
    const num = parseInt(val, 10);
    setRateEdits((prev) => ({ ...prev, [id]: isNaN(num) ? 0 : num }));
  };

  const saveRate = (roomId: string) => {
    const newPrice = rateEdits[roomId];
    if (!newPrice || newPrice < 100) {
      onShowToast('Please enter a valid price/rate', true);
      return;
    }
    const targetRoom = rooms.find((r) => r.id === roomId);
    onUpdateRoomPrice(roomId, newPrice);
    onShowToast(`Rate updated to ₹${newPrice.toLocaleString()} for ${targetRoom?.title || roomId} & synced to database`);
  };

  const submitNewNearby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nearbyTitle || !nearbyDistance || !nearbyImage || !nearbyDesc) {
      onShowToast('Please fill all attraction fields', true);
      return;
    }

    const newItem: NearbyAttraction = {
      id: 'attraction-' + Date.now(),
      title: nearbyTitle.trim(),
      distance: nearbyDistance.trim(),
      image: nearbyImage.trim(),
      images: [nearbyImage.trim()],
      desc: nearbyDesc.trim(),
      category: 'Bankura Tourism',
    };

    onAddNearby(newItem);
    setNearbyTitle('');
    setNearbyDistance('');
    setNearbyImage('');
    setNearbyDesc('');
    setShowAddNearby(false);
    onShowToast('Attraction added to Bankura guide');
  };

  const submitNewGallery = (e: React.FormEvent) => {
    e.preventDefault();

    if (batchFiles.length > 0) {
      const itemsToPublish: GalleryItem[] = batchFiles.map((b, idx) => ({
        id: b.id || generateSafeUUID(),
        title: idx === 0 && galleryTitle ? galleryTitle.trim() : b.title,
        url: b.url,
        category: galleryCategory,
      }));

      if (onAddMultipleGallery) {
        onAddMultipleGallery(itemsToPublish);
      } else {
        itemsToPublish.forEach((item) => onAddGallery(item));
      }

      setGalleryTitle('');
      setGalleryUrl('');
      setBatchFiles([]);
      setShowAddGallery(false);
      onShowToast(`${itemsToPublish.length} photos published live to website & all devices!`);
      return;
    }

    if (!galleryTitle || !galleryUrl) {
      onShowToast('Please fill image title and image URL', true);
      return;
    }

    const newPhoto: GalleryItem = {
      id: generateSafeUUID(),
      title: galleryTitle.trim(),
      url: galleryUrl.trim(),
      category: galleryCategory,
    };

    onAddGallery(newPhoto);
    setGalleryTitle('');
    setGalleryUrl('');
    setBatchFiles([]);
    setShowAddGallery(false);
    onShowToast('Photo published live to website & all devices!');
  };

  if (!isAuthenticated) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 text-center space-y-6">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mx-auto bg-white border-2 border-[#D4AF37]/50 shadow-md">
            <GramBanglaLogo variant="badge" className="w-full h-full" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#8B3A2B] tracking-widest block">
              Gram Bangla Resort • Bankura
            </span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
              Admin Control Portal
            </h2>
            <p className="text-xs text-stone-500 mt-1.5">
              Authorized operations, live bookings, tariff & gallery management
            </p>
          </div>

          {/* Security Alert if unauthorized attempt or OAuth notice */}
          {loginError && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-left flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in duration-200">
              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-bold">Authentication Notice</strong>
                <span>{loginError}</span>
                {loginError.toLowerCase().includes('origin') && (
                  <p className="text-[11px] text-amber-800 pt-1 leading-normal">
                    Please ensure this domain origin is added to Authorized JavaScript Origins in Google Cloud Console.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Primary Google Sign-In */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full bg-[#1E3A2B] hover:bg-[#0F2017] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition text-xs flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 bg-white rounded-full p-0.5 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
              )}
              <span className="tracking-wide">{isGoogleLoading ? 'Connecting to Google OAuth...' : 'Sign in with Google'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14 space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center bg-white border-2 border-[#D4AF37]/50 shadow-sm shrink-0 mt-0.5 sm:mt-0">
            <GramBanglaLogo variant="badge" className="w-full h-full" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#8B3A2B] tracking-wider">
                Resort Operations Management
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-200 max-w-full truncate" title={adminEmail}>
                <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{adminEmail}</span>
                <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                  {adminEmail.toLowerCase().includes('grambanglaresortbankura2022') ? 'Owner' : 'Admin'}
                </span>
              </span>
            </div>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-stone-900 leading-tight">
              Gram Bangla Control Portal
            </h1>
            <p className="text-xs text-stone-500 mt-0.5 leading-normal">
              Bankura Branch • Live Room Rates, Reservations & Content
            </p>
          </div>
        </div>

        <div className="flex items-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-red-200 active:scale-95"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout ({adminEmail.split('@')[0]})</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('rates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rates'
              ? 'bg-[#8B3A2B] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Hotel className="w-3.5 h-3.5" />
          Rooms & Availability ({rooms.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bookings'
              ? 'bg-[#8B3A2B] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Guest Bookings ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'bg-[#8B3A2B] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Inquiries & Messages ({inquiries.length})
          {inquiries.filter((i) => i.status === 'New' || !i.status).length > 0 && (
            <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
              {inquiries.filter((i) => i.status === 'New' || !i.status).length} NEW
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('nearby')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'nearby'
              ? 'bg-[#8B3A2B] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          Nearby Attractions ({nearby.length})
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'gallery'
              ? 'bg-[#8B3A2B] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Gallery Manager ({gallery.length})
        </button>
      </div>

      {/* TAB 1: ROOMS & AVAILABILITY MANAGER */}
      {activeTab === 'rates' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          {/* Header & Global Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900">
                  Room Inventory & Availability Manager
                </h3>
                <span className="bg-[#1E3A2B]/10 text-[#1E3A2B] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  {rooms.filter((r) => r.isAvailable !== false).length} Open for Booking
                </span>
                {rooms.some((r) => r.isAvailable === false) && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    <Ban className="w-3 h-3 text-red-600" />
                    {rooms.filter((r) => r.isAvailable === false).length} Sold Out / Offline
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Turn off bookings immediately when rooms are full, undergoing maintenance, or reserved for offline guests. Updates sync instantly to visitors.
              </p>
            </div>

            {/* Quick Global Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Pause all online room bookings? Visitors will see all rooms marked as Temporarily Full.')) {
                    onToggleAllRoomsAvailability?.(false, 'All Rooms Fully Booked / Offline');
                    onShowToast('All room bookings paused');
                  }
                }}
                className="bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 border border-stone-200 hover:border-red-300 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Power className="w-3.5 h-3.5 text-red-600" />
                Pause All Bookings
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleAllRoomsAvailability?.(true);
                  onShowToast('All rooms restored to Open for Online Booking');
                }}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                Reopen All Rooms
              </button>
            </div>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => {
              const isAvailable = room.isAvailable !== false;
              const soldOutReason = room.soldOutReason || 'Sold Out';
              const remainingCount = room.availableRoomsCount !== undefined ? room.availableRoomsCount : (isAvailable ? 3 : 0);

              return (
                <div
                  key={room.id}
                  className={`border rounded-2xl overflow-hidden transition flex flex-col justify-between ${
                    isAvailable
                      ? 'border-stone-200 bg-white shadow-xs hover:shadow-md'
                      : 'border-red-300 bg-red-50/20 shadow-xs'
                  }`}
                >
                  {/* Room Thumbnail & Status Badges */}
                  <div className="relative h-40 w-full overflow-hidden bg-stone-900">
                    <img
                      src={room.image}
                      alt={room.title}
                      className={`w-full h-full object-cover transition duration-300 ${
                        isAvailable ? '' : 'grayscale-[40%] opacity-85'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Top Status Pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {isAvailable ? (
                        <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          BOOKINGS OPEN
                        </span>
                      ) : (
                        <span className="bg-red-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <Ban className="w-3 h-3" />
                          SOLD OUT / CLOSED
                        </span>
                      )}

                      {room.badge && (
                        <span className="bg-stone-900/80 backdrop-blur-xs text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {room.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded font-mono font-bold">
                        ID: {room.id}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end text-white">
                      <div>
                        <h4 className="font-bold text-sm leading-tight text-white">{room.title}</h4>
                        <span className="text-[11px] text-stone-200 flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-stone-300" />
                          {room.capacity}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-stone-300 block">Price</span>
                        <strong className="text-sm font-mono text-[#D4AF37]">₹{room.price.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Availability & Sold Out Controls Body */}
                  <div className="p-4 space-y-4 bg-stone-50 flex-1 flex flex-col justify-between">
                    {/* SECTION A: BOOKING STATUS TOGGLE */}
                    <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          Booking Status:
                        </span>
                        
                        {/* Toggle Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newStatus = !isAvailable;
                            onToggleRoomAvailability?.(room.id, newStatus, newStatus ? '' : 'Sold Out');
                            onShowToast(
                              newStatus
                                ? `${room.title} is now OPEN for bookings`
                                : `${room.title} marked as SOLD OUT (Bookings turned off)`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                            isAvailable
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {isAvailable ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              <span>Open (Click to Off)</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              <span>Sold Out (Click to Open)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* If Sold Out: Reason Selector */}
                      {!isAvailable && (
                        <div className="pt-2 border-t border-stone-100 space-y-1.5 animate-in fade-in duration-200">
                          <label className="block text-[11px] font-bold text-red-800">
                            Sold Out Display Reason:
                          </label>
                          <select
                            value={soldOutReason}
                            onChange={(e) => {
                              onToggleRoomAvailability?.(room.id, false, e.target.value, 0);
                              onShowToast(`Updated status note for ${room.title}`);
                            }}
                            className="w-full text-xs bg-red-50/60 border border-red-200 text-red-900 rounded-lg p-2 font-medium focus:ring-1 focus:ring-red-500 outline-none"
                          >
                            <option value="Sold Out">Sold Out</option>
                            <option value="Fully Booked for Today">Fully Booked for Today</option>
                            <option value="Full for Weekend">Full for Weekend</option>
                            <option value="Full for Festival / Durga Puja">Full for Festival / Durga Puja</option>
                            <option value="Reserved for Private Wedding Event">Reserved for Private Wedding Event</option>
                            <option value="Temporarily Under Maintenance">Temporarily Under Maintenance</option>
                            <option value="Offline Bookings Only">Offline Bookings Only</option>
                          </select>
                        </div>
                      )}

                      {/* Quick Inventory Stepper */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-600 font-medium">Remaining Rooms:</span>
                        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                          <button
                            type="button"
                            onClick={() => {
                              const newCount = Math.max(0, remainingCount - 1);
                              const newAvailable = newCount > 0;
                              onToggleRoomAvailability?.(
                                room.id,
                                newAvailable,
                                newAvailable ? '' : 'Sold Out',
                                newCount
                              );
                              onShowToast(`Updated ${room.title} remaining inventory to ${newCount}`);
                            }}
                            className="w-6 h-6 rounded bg-white hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer shadow-2xs"
                            title="Decrease inventory"
                          >
                            -
                          </button>
                          <span className={`w-8 text-center font-mono font-bold ${
                            remainingCount === 0 ? 'text-red-600' : remainingCount === 1 ? 'text-amber-600' : 'text-stone-800'
                          }`}>
                            {remainingCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newCount = remainingCount + 1;
                              onToggleRoomAvailability?.(room.id, true, '', newCount);
                              onShowToast(`Updated ${room.title} remaining inventory to ${newCount}`);
                            }}
                            className="w-6 h-6 rounded bg-white hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer shadow-2xs"
                            title="Increase inventory"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SECTION B: PRICE EDITOR */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-stone-500 font-bold text-sm">₹</span>
                        <input
                          type="number"
                          min="100"
                          step="50"
                          value={rateEdits[room.id] !== undefined ? rateEdits[room.id] : room.price}
                          onChange={(e) => handleRateChange(room.id, e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-white border border-stone-300 rounded-xl font-mono font-bold text-stone-900 text-sm focus:ring-2 focus:ring-[#8B3A2B] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                      <span className="text-xs text-stone-500">
                        Active: <strong className="text-stone-800">₹{room.price.toLocaleString()}</strong>
                      </span>
                      <button
                        onClick={() => saveRate(room.id)}
                        className="bg-[#1E3A2B] hover:bg-[#0F2017] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Rate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS MANAGER */}

      {/* TAB 2: BOOKINGS MANAGER */}
      {activeTab === 'bookings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Guest Reservations & Records
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Cloud Database Synced
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Live bookings submitted across any smartphone, tablet, or PC are synchronized here in real time.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {onRefreshBookings && (
                <button
                  type="button"
                  onClick={async () => {
                    setIsSyncingBookings(true);
                    try {
                      await onRefreshBookings();
                    } finally {
                      setIsSyncingBookings(false);
                    }
                  }}
                  disabled={isSyncingBookings}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-2xs"
                  title="Check and refresh bookings from cloud database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#8B3A2B] ${isSyncingBookings ? 'animate-spin' : ''}`} />
                  <span>{isSyncingBookings ? 'Syncing...' : 'Sync with Cloud'}</span>
                </button>
              )}

              {bookings.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClearAllBookings();
                    onShowToast('All booking records removed');
                  }}
                  className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 transition cursor-pointer px-2 py-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All Reservations
                </button>
              )}
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-600">No Reservations Logged Yet</p>
              <p className="text-xs text-stone-400 mt-1">
                Bookings made by visitors through the front-end will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 text-stone-600 font-bold uppercase text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="p-3.5">Ref Code</th>
                    <th className="p-3.5">Guest Info</th>
                    <th className="p-3.5">Room & Dates</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Payment & Receipt</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.map((b) => (
                    <tr key={b.refCode} className="hover:bg-stone-50/80 transition">
                      <td className="p-3.5 font-mono font-bold text-[#8B3A2B] whitespace-nowrap">
                        {b.refCode}
                        <span className="block text-[10px] text-stone-400 font-sans font-normal">
                          {b.bookedAt?.split(',')[0]}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <strong className="block text-stone-900">{b.name}</strong>
                        <span className="text-[11px] text-stone-500 font-mono block">{b.phone}</span>
                        <span className="text-[10px] text-stone-400 block">{b.email}</span>
                      </td>
                      <td className="p-3.5 text-xs text-stone-700">
                        <span className="font-semibold text-stone-800 block">{b.roomTitle}</span>
                        <span className="text-stone-500 text-[11px] block">
                          {b.checkin} → {b.checkout} ({b.nights}N)
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-stone-900 font-mono whitespace-nowrap">
                        ₹{b.total.toLocaleString()}
                      </td>

                      {/* Payment & Receipt Info */}
                      <td className="p-3.5">
                        <div className="space-y-1">
                          {b.paymentScreenshot ? (
                            <button
                              type="button"
                              onClick={() => setSelectedReceiptBooking(b)}
                              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer group shadow-xs"
                            >
                              <div className="w-4 h-4 rounded overflow-hidden bg-black/10 shrink-0">
                                <img
                                  src={b.paymentScreenshot}
                                  alt="Receipt thumbnail"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span>View Receipt</span>
                              <ExternalLink className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-400 italic">No receipt file</span>
                          )}

                          {b.utrNumber && (
                            <div className="text-[11px] font-mono text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded inline-block">
                              UTR: <strong>{b.utrNumber}</strong>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'Payment Verified'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : b.status === 'Pending Verification'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : b.status === 'Confirmed'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : b.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : 'bg-stone-100 text-stone-800'
                          }`}
                        >
                          {b.status === 'Payment Verified' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                          {b.status === 'Pending Verification' && <Clock className="w-3 h-3 text-amber-700" />}
                          {b.status === 'Rejected' && <XCircle className="w-3 h-3 text-red-600" />}
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status !== 'Payment Verified' && onUpdateBookingStatus && (
                            <button
                              onClick={() => {
                                onUpdateBookingStatus(b.refCode, 'Payment Verified');
                                onShowToast(`Payment verified & approved for ${b.refCode}`);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-lg transition text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                              title="Verify & Confirm Payment"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Verify</span>
                            </button>
                          )}

                          {b.status === 'Payment Verified' && onUpdateBookingStatus && (
                            <button
                              onClick={() => {
                                onUpdateBookingStatus(b.refCode, 'Pending Verification');
                                onShowToast(`Status reverted to Pending for ${b.refCode}`);
                              }}
                              className="text-stone-500 hover:text-stone-700 p-1.5 hover:bg-stone-100 rounded-lg transition text-xs cursor-pointer"
                              title="Revert to Pending"
                            >
                              Revert
                            </button>
                          )}

                          <button
                            onClick={() => {
                              onDeleteBooking(b.refCode);
                              onShowToast(`Reservation ${b.refCode} removed`);
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB: INQUIRIES & MESSAGES MANAGER */}
      {activeTab === 'inquiries' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900">
                  Customer Inquiries & Messages
                </h3>
                <span className="bg-[#8B3A2B]/10 text-[#8B3A2B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {inquiries.length} total
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Messages submitted by visitors via the "Send Us an Inquiry" form on the Contact page.
              </p>
            </div>

            {inquiries.length > 0 && onClearAllInquiries && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all customer inquiries?')) {
                    onClearAllInquiries();
                  }
                }}
                className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1.5 transition cursor-pointer px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Inquiries
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Total Inquiries
              </span>
              <span className="text-xl font-black text-stone-900 font-mono mt-0.5 block">
                {inquiries.length}
              </span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/80">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                New / Unresponded
              </span>
              <span className="text-xl font-black text-amber-800 font-mono mt-0.5 block">
                {inquiries.filter((i) => i.status === 'New' || !i.status).length}
              </span>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3.5 border border-blue-200/80">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Contacted / In Progress
              </span>
              <span className="text-xl font-black text-blue-800 font-mono mt-0.5 block">
                {inquiries.filter((i) => i.status === 'Contacted').length}
              </span>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                Resolved / Closed
              </span>
              <span className="text-xl font-black text-emerald-800 font-mono mt-0.5 block">
                {inquiries.filter((i) => i.status === 'Closed').length}
              </span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
              {(
                [
                  { id: 'all', label: `All (${inquiries.length})` },
                  { id: 'new', label: `New (${inquiries.filter((i) => i.status === 'New' || !i.status).length})` },
                  { id: 'contacted', label: `Contacted (${inquiries.filter((i) => i.status === 'Contacted').length})` },
                  { id: 'closed', label: `Closed (${inquiries.filter((i) => i.status === 'Closed').length})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInquiryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    inquiryFilter === tab.id
                      ? 'bg-[#8B3A2B] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search name, phone, message..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Inquiries List */}
          {(() => {
            const filtered = inquiries.filter((inq) => {
              const matchesFilter =
                inquiryFilter === 'all' ||
                (inquiryFilter === 'new' && (inq.status === 'New' || !inq.status)) ||
                (inquiryFilter === 'contacted' && inq.status === 'Contacted') ||
                (inquiryFilter === 'closed' && inq.status === 'Closed');

              const q = inquirySearch.toLowerCase().trim();
              const matchesSearch =
                !q ||
                inq.fullName.toLowerCase().includes(q) ||
                inq.phone.toLowerCase().includes(q) ||
                inq.email.toLowerCase().includes(q) ||
                inq.message.toLowerCase().includes(q);

              return matchesFilter && matchesSearch;
            });

            if (filtered.length === 0) {
              return (
                <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <div className="w-14 h-14 rounded-full bg-stone-200/80 flex items-center justify-center mx-auto text-stone-500 mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-800">
                    {inquiries.length === 0 ? 'No customer inquiries yet' : 'No matching inquiries found'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
                    {inquiries.length === 0
                      ? 'When guests fill out the "Send Us an Inquiry" form on the Contact page, messages will be delivered and saved here with 1-click WhatsApp and phone call shortcuts.'
                      : 'Try clearing your search query or switching filters.'}
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {filtered.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const currentStatus = inq.status || 'New';

                  return (
                    <div
                      key={inq.id}
                      className="bg-stone-50/70 hover:bg-stone-50 border border-stone-200/90 hover:border-[#8B3A2B]/40 rounded-2xl p-5 transition shadow-2xs space-y-4"
                    >
                      {/* Top Row: Sender Info & Status Badge */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#8B3A2B]/10 text-[#8B3A2B] font-black text-sm flex items-center justify-center shrink-0 font-display">
                            {inq.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                              {inq.fullName}
                            </h4>
                            <span className="text-[11px] text-stone-400 font-mono block">
                              Ref: {inq.id} • {inq.submittedAt}
                            </span>
                          </div>
                        </div>

                        {/* Status Tag & Toggle */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                              currentStatus === 'New'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : currentStatus === 'Contacted'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            }`}
                          >
                            ● {currentStatus}
                          </span>

                          {onUpdateInquiryStatus && (
                            <select
                              value={currentStatus}
                              onChange={(e) =>
                                onUpdateInquiryStatus(inq.id, e.target.value as any)
                              }
                              className="text-xs bg-white border border-stone-300 rounded-lg px-2 py-1 font-medium text-stone-700 outline-none focus:ring-1 focus:ring-[#8B3A2B] cursor-pointer"
                            >
                              <option value="New">Mark New</option>
                              <option value="Contacted">Mark Contacted</option>
                              <option value="Closed">Mark Closed</option>
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Contact Badges: Phone, WhatsApp, Email */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {/* Direct Call */}
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold font-mono rounded-xl border border-stone-200 transition shadow-2xs"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#8B3A2B]" />
                          <span>{inq.phone}</span>
                        </a>

                        {/* WhatsApp Shortcut */}
                        <a
                          href={`https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}?text=${encodeURIComponent(
                            `Hello ${inq.fullName}, this is Gram Bangla Resort Bankura regarding your inquiry: "${inq.message.slice(0, 80)}..."`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-bold rounded-xl border border-[#25D366]/30 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>WhatsApp Guest</span>
                        </a>

                        {/* Direct Email */}
                        <a
                          href={`mailto:${inq.email}?subject=${encodeURIComponent(
                            'Gram Bangla Resort - Response to your inquiry'
                          )}&body=${encodeURIComponent(
                            `Dear ${inq.fullName},\n\nThank you for reaching out to Gram Bangla Resort, Bankura.\n\nIn reference to your inquiry:\n"${inq.message}"\n\n`
                          )}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-xl border border-stone-200 transition"
                        >
                          <Mail className="w-3.5 h-3.5 text-stone-500" />
                          <span>{inq.email}</span>
                        </a>
                      </div>

                      {/* Inquiry Message Text */}
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                          Inquiry Details:
                        </span>
                        {inq.message || <span className="text-stone-400 italic">No message provided.</span>}
                      </div>

                      {/* Bottom Footer Actions */}
                      <div className="flex justify-between items-center pt-1 border-t border-stone-200/60 text-xs">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `Inquiry from ${inq.fullName}\nPhone: ${inq.phone}\nEmail: ${inq.email}\nMessage: ${inq.message}`
                            );
                            onShowToast('Inquiry details copied to clipboard');
                          }}
                          className="text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy Details
                        </button>

                        {onDeleteInquiry && (
                          <button
                            onClick={() => {
                              onDeleteInquiry(inq.id);
                              onShowToast(`Inquiry from ${inq.fullName} deleted`);
                            }}
                            className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition cursor-pointer hover:bg-red-50 px-2 py-1 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: NEARBY PLACES MANAGER */}
      {activeTab === 'nearby' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Manage Bankura Attractions
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Add or remove tourist destinations displayed on the Nearby Bankura page.
              </p>
            </div>

            <button
              onClick={() => setShowAddNearby(!showAddNearby)}
              className="bg-[#8B3A2B] hover:bg-[#61261B] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Destination
            </button>
          </div>

          {showAddNearby && (
            <form
              onSubmit={submitNewNearby}
              className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Add New Tourist Attraction
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={nearbyTitle}
                  onChange={(e) => setNearbyTitle(e.target.value)}
                  placeholder="Attraction Name (e.g. Susunia Hill)"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg"
                />
                <input
                  type="text"
                  required
                  value={nearbyDistance}
                  onChange={(e) => setNearbyDistance(e.target.value)}
                  placeholder="Distance (e.g. ~25 km from resort)"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg"
                />
              </div>
              <input
                type="url"
                required
                value={nearbyImage}
                onChange={(e) => setNearbyImage(e.target.value)}
                placeholder="Image URL (https://...)"
                className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg"
              />
              <textarea
                rows={2}
                required
                value={nearbyDesc}
                onChange={(e) => setNearbyDesc(e.target.value)}
                placeholder="Brief cultural, trekking, or historical description..."
                className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNearby(false)}
                  className="bg-stone-200 text-stone-700 text-xs font-bold px-3.5 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A2B] text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Save Attraction
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearby.map((place) => (
              <div
                key={place.id}
                className="border border-stone-200 rounded-2xl p-3.5 flex gap-3.5 items-center bg-stone-50"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold text-stone-900 truncate">{place.title}</h4>
                  <span className="text-xs text-[#8B3A2B] font-semibold block mt-0.5">
                    {place.distance}
                  </span>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">{place.desc}</p>
                </div>
                <button
                  onClick={() => {
                    onDeleteNearby(place.id);
                    onShowToast(`Removed ${place.title}`);
                  }}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  title="Delete Attraction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          {/* Header & Primary Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#8B3A2B] tracking-widest block">
                  Media & Visual Asset Hub
                </span>
                <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-200">
                  {gallery.length} {gallery.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 mt-0.5">
                Gallery Image Manager
              </h3>
              <p className="text-xs text-stone-500">
                Upload photos, organize categories, and curate the public guest showcase.
              </p>
            </div>

            <button
              onClick={() => setShowAddGallery(!showAddGallery)}
              className="bg-[#8B3A2B] hover:bg-[#61261B] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              {showAddGallery ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddGallery ? 'Close Uploader' : 'Add New Photo'}
            </button>
          </div>

          {/* ADD PHOTO INTERACTIVE DRAWER / FORM */}
          {showAddGallery && (
            <div className="bg-gradient-to-br from-stone-50 to-orange-50/30 p-6 rounded-3xl border-2 border-[#8B3A2B]/20 shadow-inner space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8B3A2B] text-white flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Add Photo to Public Gallery
                  </h4>
                </div>

                {/* Upload Mode Switcher */}
                <div className="flex bg-stone-200/80 p-1 rounded-xl text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setGalleryUploadMode('file')}
                    className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      galleryUploadMode === 'file'
                        ? 'bg-white text-stone-900 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryUploadMode('url')}
                    className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      galleryUploadMode === 'url'
                        ? 'bg-white text-stone-900 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> Image URL
                  </button>
                </div>
              </div>

              <form onSubmit={submitNewGallery} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Form Fields */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Title Input */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Photo Caption / Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Royal Terracotta Suite • Luxury King Bed"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none font-medium shadow-xs"
                      />
                    </div>

                    {/* Category Selection Pills */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Showcase Category <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'resort', label: 'Resort & Rooms', desc: 'Architecture & Stays' },
                          { id: 'dining', label: 'Rasoi', desc: 'Authentic Bengali Menu' },
                          { id: 'heritage', label: 'Bankura Heritage', desc: 'Culture & Nature' },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setGalleryCategory(cat.id as any)}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              galleryCategory === cat.id
                                ? 'bg-[#8B3A2B] text-white border-[#8B3A2B] shadow-sm'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                            }`}
                          >
                            <span className="text-xs font-bold block">{cat.label}</span>
                            <span
                              className={`text-[10px] mt-0.5 block truncate ${
                                galleryCategory === cat.id ? 'text-white/80' : 'text-stone-400'
                              }`}
                            >
                              {cat.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Source Input */}
                    {galleryUploadMode === 'file' ? (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                            Select Photo(s) from Device (JPG, PNG, WEBP)
                          </label>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            ✓ Multi-Photo Supported
                          </span>
                        </div>
                        <div className="relative border-2 border-dashed border-stone-300 hover:border-[#8B3A2B] rounded-2xl p-4 text-center bg-white transition cursor-pointer group">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="space-y-1.5 flex flex-col items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#8B3A2B]/10 text-stone-600 group-hover:text-[#8B3A2B] flex items-center justify-center transition">
                              <Upload className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-stone-800">
                              {isUploadingPhoto
                                ? uploadProgressText || 'Optimizing photos for instant display...'
                                : 'Click to browse or drop one or multiple photos here'}
                            </p>
                            <p className="text-[10px] text-stone-400">
                              Select multiple photos at once • Auto-compressed to lightweight WebP
                            </p>
                          </div>
                        </div>

                        {/* Batch selection strip if more than 1 photo selected */}
                        {batchFiles.length > 1 && (
                          <div className="mt-3 bg-stone-50 border border-stone-200 rounded-xl p-2.5 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                              <span>Selected Photos ({batchFiles.length})</span>
                              <span className="text-[11px] text-emerald-700 font-medium">Ready to sync across devices</span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1.5 pt-1">
                              {batchFiles.map((b, idx) => (
                                <div key={b.id || idx} className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-stone-300 bg-stone-200 group">
                                  <img src={b.url} alt={b.title} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filtered = batchFiles.filter((_, i) => i !== idx);
                                      setBatchFiles(filtered);
                                      if (filtered.length > 0) {
                                        setGalleryUrl(filtered[0].url);
                                        setGalleryTitle(filtered[0].title);
                                      } else {
                                        setGalleryUrl('');
                                        setGalleryTitle('');
                                      }
                                    }}
                                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                                    title="Remove this photo"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Image Web URL (HTTPS)
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            required
                            value={galleryUrl}
                            onChange={(e) => setGalleryUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none font-mono pr-10 shadow-xs"
                          />
                          <LinkIcon className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                        </div>
                      </div>
                    )}

                    {/* Quick Caption Inspiration Presets */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1 mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Quick Caption Presets
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { title: 'Royal Terracotta Suite', cat: 'resort' },
                          { title: 'Swimming Pool & Sun Deck', cat: 'resort' },
                          { title: 'Authentic Bengali Thali & Kosha Mangsho', cat: 'dining' },
                          { title: 'Bishnupur Terracotta Temple Tour', cat: 'heritage' },
                          { title: 'Evening Garden Lawn & Lanterns', cat: 'resort' },
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setGalleryTitle(preset.title);
                              setGalleryCategory(preset.cat as any);
                            }}
                            className="text-[11px] bg-white hover:bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 transition cursor-pointer hover:border-[#8B3A2B]/40"
                          >
                            + {preset.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Instant Preview Box */}
                  <div className="lg:col-span-5 flex flex-col">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Live Gallery Card Preview
                    </label>
                    <div className="flex-1 bg-white border-2 border-stone-200 rounded-2xl overflow-hidden shadow-xs p-3 flex flex-col justify-between">
                      {galleryUrl ? (
                        <div className="space-y-2.5">
                          <div className="relative rounded-xl overflow-hidden aspect-video bg-stone-100 border border-stone-200">
                            <img
                              src={galleryUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={() => onShowToast('Image preview URL error', true)}
                            />
                            <div className="absolute top-2 left-2 bg-[#8B3A2B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                              {galleryCategory}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-stone-900 truncate">
                              {galleryTitle || 'Photo Title Preview'}
                            </h5>
                            <span className="text-[11px] text-stone-400 block mt-0.5">
                              Will be displayed in Bankura Gallery • Public View
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-44 border border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-center p-4 bg-stone-50 text-stone-400">
                          <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
                          <p className="text-xs font-medium">Select a photo or paste a link to see live card preview</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-4 mt-auto border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddGallery(false);
                            setGalleryUrl('');
                            setGalleryTitle('');
                            setBatchFiles([]);
                          }}
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!galleryUrl && batchFiles.length === 0}
                          className="flex-1 bg-[#1E3A2B] hover:bg-[#15291E] disabled:opacity-40 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          {batchFiles.length > 1
                            ? `Publish ${batchFiles.length} Photos`
                            : 'Save to Gallery'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* SEARCH & CATEGORY FILTER TOOLBAR */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={gallerySearchQuery}
                onChange={(e) => setGallerySearchQuery(e.target.value)}
                placeholder="Search photos by title or tag..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none"
              />
              {gallerySearchQuery && (
                <button
                  onClick={() => setGallerySearchQuery('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'resort', label: 'Resort & Rooms' },
                { id: 'dining', label: 'Dining' },
                { id: 'heritage', label: 'Heritage' },
              ].map((f) => {
                const count =
                  f.id === 'all'
                    ? gallery.length
                    : gallery.filter((item) => item.category === f.id).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => setGalleryFilterCategory(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      galleryFilterCategory === f.id
                        ? 'bg-[#8B3A2B] text-white shadow-xs'
                        : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-stone-200'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        galleryFilterCategory === f.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PHOTO MEDIA GRID */}
          {(() => {
            const filteredGallery = gallery.filter((item) => {
              const matchesCat =
                galleryFilterCategory === 'all' || item.category === galleryFilterCategory;
              const matchesSearch =
                !gallerySearchQuery ||
                item.title.toLowerCase().includes(gallerySearchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(gallerySearchQuery.toLowerCase());
              return matchesCat && matchesSearch;
            });

            if (filteredGallery.length === 0) {
              return (
                <div className="text-center py-12 bg-stone-50 rounded-3xl border border-stone-200 space-y-3">
                  <ImageIcon className="w-10 h-10 text-stone-300 mx-auto" />
                  <h4 className="text-sm font-bold text-stone-700">No photos match your filter</h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto">
                    Try changing your category filter or search query, or upload a new photo.
                  </p>
                  <button
                    onClick={() => {
                      setGalleryFilterCategory('all');
                      setGallerySearchQuery('');
                    }}
                    className="text-xs text-[#8B3A2B] font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="group border border-stone-200 hover:border-[#8B3A2B]/40 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
                  >
                    {/* Image Area with Actions Overlay */}
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={item.url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                          {item.category}
                        </span>
                      </div>

                      {/* Quick Hover Action Bar */}
                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedZoomPhoto(item)}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 hover:bg-stone-100 flex items-center justify-center shadow-md transition cursor-pointer"
                          title="Preview Full Size"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            onShowToast('Image URL copied to clipboard');
                          }}
                          className="w-8 h-8 rounded-full bg-white text-stone-800 hover:bg-stone-100 flex items-center justify-center shadow-md transition cursor-pointer"
                          title="Copy Image URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDeleteGallery(item.id, item);
                            onShowToast(`Deleted photo "${item.title}"`);
                          }}
                          className="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center shadow-md transition cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Footer Info */}
                    <div className="p-3 bg-white border-t border-stone-100 flex justify-between items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-xs text-stone-800 truncate" title={item.title}>
                          {item.title}
                        </h5>
                        <span className="text-[10px] text-stone-400 capitalize block truncate mt-0.5">
                          {item.category === 'dining' ? 'Rasoi' : item.category === 'heritage' ? 'Bankura Heritage' : 'Resort & Rooms'}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onDeleteGallery(item.id, item);
                          onShowToast(`Deleted photo "${item.title}"`);
                        }}
                        className="text-stone-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* LIGHTBOX ZOOM MODAL */}
          {selectedZoomPhoto && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <img
                    src={selectedZoomPhoto.url}
                    alt={selectedZoomPhoto.title}
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    onClick={() => setSelectedZoomPhoto(null)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-stone-50 border-t border-stone-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8B3A2B] tracking-wider block">
                      {selectedZoomPhoto.category}
                    </span>
                    <h4 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                      {selectedZoomPhoto.title}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono truncate max-w-md mt-0.5">
                      {selectedZoomPhoto.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedZoomPhoto.url);
                        onShowToast('Image URL copied to clipboard');
                      }}
                      className="bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-stone-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </button>
                    <button
                      onClick={() => {
                        window.open(selectedZoomPhoto.url, '_blank');
                      }}
                      className="bg-[#8B3A2B] hover:bg-[#61261B] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open Full
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= RECEIPT INSPECTION & VERIFICATION MODAL ================= */}
      {selectedReceiptBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#1E3A2B] text-white p-5 sm:p-6 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  PAYMENT VERIFICATION DESK
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold mt-0.5">
                  Receipt for Ref: {selectedReceiptBooking.refCode}
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Guest: {selectedReceiptBooking.name} ({selectedReceiptBooking.phone})
                </p>
              </div>
              <button
                onClick={() => setSelectedReceiptBooking(null)}
                className="text-stone-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Payment Details Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Payable Total</span>
                  <strong className="text-stone-900 font-mono text-base text-[#8B3A2B]">
                    ₹{selectedReceiptBooking.total.toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Room Booked</span>
                  <strong className="text-stone-900 truncate block">{selectedReceiptBooking.roomTitle}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Dates</span>
                  <strong className="text-stone-900 truncate block">
                    {selectedReceiptBooking.checkin} ({selectedReceiptBooking.nights}N)
                  </strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Current Status</span>
                  <strong className={`truncate block font-bold ${
                    selectedReceiptBooking.status === 'Payment Verified' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {selectedReceiptBooking.status}
                  </strong>
                </div>
              </div>

              {/* UTR Reference Copy Box */}
              {selectedReceiptBooking.utrNumber ? (
                <div className="flex items-center justify-between bg-[#8B3A2B]/5 border border-[#8B3A2B]/20 p-3.5 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">
                      Guest Provided 12-Digit UPI UTR / Ref No:
                    </span>
                    <span className="font-mono text-sm font-bold text-[#8B3A2B]">
                      {selectedReceiptBooking.utrNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedReceiptBooking.utrNumber) {
                        navigator.clipboard.writeText(selectedReceiptBooking.utrNumber);
                        setCopiedUtr(true);
                        setTimeout(() => setCopiedUtr(false), 2000);
                      }
                    }}
                    className="text-xs bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition font-semibold cursor-pointer shadow-xs"
                  >
                    {copiedUtr ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
                    {copiedUtr ? 'Copied' : 'Copy UTR'}
                  </button>
                </div>
              ) : (
                <div className="bg-stone-100 p-3 rounded-xl text-xs text-stone-600 text-center">
                  No manual UTR number entered. Verify directly against screenshot and bank notification.
                </div>
              )}

              {/* Screenshot Image Display */}
              <div>
                <span className="text-xs font-bold uppercase text-stone-700 block mb-2">
                  Uploaded Payment Screenshot / Receipt:
                </span>
                {selectedReceiptBooking.paymentScreenshot ? (
                  <div className="border-2 border-stone-200 rounded-2xl overflow-hidden bg-stone-900 max-h-96 flex items-center justify-center group relative">
                    <img
                      src={selectedReceiptBooking.paymentScreenshot}
                      alt="Uploaded payment screenshot"
                      className="max-h-96 w-auto object-contain"
                    />
                    <a
                      href={selectedReceiptBooking.paymentScreenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 bg-black/75 hover:bg-black text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 backdrop-blur-xs transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Full Size
                    </a>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-stone-400 text-xs">
                    No screenshot file was attached with this booking.
                  </div>
                )}
              </div>

              {/* Admin Verification Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedReceiptBooking(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition cursor-pointer"
                >
                  Close Window
                </button>

                {onUpdateBookingStatus && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateBookingStatus(selectedReceiptBooking.refCode, 'Rejected');
                        onShowToast(`Booking ${selectedReceiptBooking.refCode} marked as Rejected`, true);
                        setSelectedReceiptBooking({
                          ...selectedReceiptBooking,
                          status: 'Rejected',
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4 text-red-600" />
                      Reject Payment
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onUpdateBookingStatus(selectedReceiptBooking.refCode, 'Payment Verified');
                        onShowToast(`Payment verified & approved for ${selectedReceiptBooking.refCode}`);
                        setSelectedReceiptBooking({
                          ...selectedReceiptBooking,
                          status: 'Payment Verified',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-100" />
                      Approve & Mark Verified
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
