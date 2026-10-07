import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  BedDouble, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  CheckCircle,
  Copy,
  Check,
  UploadCloud,
  FileImage,
  Trash2,
  AlertCircle,
  ShieldCheck,
  Smartphone,
  Receipt,
  ZoomIn,
  Download,
  Loader2
} from 'lucide-react';
import { Room, BookingRecord } from '../types';
import { supabaseService } from '../lib/supabase';
import { GramBanglaLogo } from './GramBanglaLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  initialRoomId?: string;
  initialDates?: { checkin: string; checkout: string };
  onBookingConfirmed: (record: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  initialRoomId = 'deluxe',
  initialDates,
  onBookingConfirmed,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [checkin, setCheckin] = useState<string>(initialDates?.checkin || today);
  const [checkout, setCheckout] = useState<string>(initialDates?.checkout || tomorrow);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [idType, setIdType] = useState('Aadhaar Card');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment & Receipt Verification
  const [paymentMode, setPaymentMode] = useState<'upi' | 'resort'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialRoomId) setSelectedRoomId(initialRoomId);
    if (initialDates?.checkin) setCheckin(initialDates.checkin);
    if (initialDates?.checkout) setCheckout(initialDates.checkout);
  }, [initialRoomId, initialDates]);

  if (!isOpen) return null;

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Calculate nights
  const cinDate = new Date(checkin);
  const coutDate = new Date(checkout);
  let nights = Math.ceil((coutDate.getTime() - cinDate.getTime()) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights < 1) nights = 1;

  const baseRate = currentRoom ? currentRoom.price : 1000;
  const subtotal = baseRate * nights;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;
  const depositAmount = Math.round(total * 0.20);

  const handleStep1Next = () => {
    if (currentRoom && currentRoom.isAvailable === false) {
      setErrorMsg(`This ${currentRoom.title} is currently sold out (${currentRoom.soldOutReason || 'Fully Booked'}). Please choose another room.`);
      return;
    }
    if (!checkin || !checkout) {
      setErrorMsg('Please select both check-in and check-out dates.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!guestName.trim()) {
      setErrorMsg('Please enter primary guest name.');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  // Compresses large screenshot photos to lightweight JPEG (<200KB) so device uploads never fail
  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 50MB. Please upload a smaller screenshot.');
      return;
    }

    setErrorMsg('');
    setScreenshotFileName(file.name);

    // Read and compress image client-side for ultra-fast, reliable cloud persistence
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      try {
        const compressedUrl = await compressImage(rawDataUrl);
        setPaymentScreenshot(compressedUrl);
      } catch {
        setPaymentScreenshot(rawDataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFinalSubmit = async () => {
    if (paymentMode === 'upi' && !paymentScreenshot) {
      setErrorMsg('Payment screenshot is required. Please upload your UPI payment receipt/screenshot to confirm your booking and generate the voucher.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const refCode = `GB-BNK-2026-X${randomSuffix}`;
      const nowIso = new Date().toISOString();

      const newBooking: BookingRecord = {
        refCode,
        name: guestName.trim(),
        phone: guestPhone.trim(),
        email: guestEmail.trim(),
        idType,
        roomTitle: currentRoom.title,
        roomId: currentRoom.id,
        checkin,
        checkout,
        adults,
        children,
        nights,
        baseRate,
        tax,
        total,
        paymentMode,
        depositAmount,
        status: 'Confirmed',
        utrNumber: utrNumber.trim() || undefined,
        paymentScreenshot: paymentScreenshot || undefined,
        bookedAt: nowIso,
        specialRequests: specialRequests.trim() || undefined,
      };

      // Directly persist to Supabase Cloud Database
      await supabaseService.insertBooking(newBooking);

      onBookingConfirmed(newBooking);
      onClose();
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrorMsg('Could not process reservation. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiId = 'Q028343701@ybl';
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Gram%20Bangla%20Resort&am=${total}&cu=INR`;
  const qrCodeUrl = '/qr.jpg';
  const fallbackQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=6&data=${encodeURIComponent(upiPayUrl)}`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto border border-stone-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#8B3A2B] text-white px-5 sm:px-6 py-3.5 flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-[#61261B] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold shadow-xs shrink-0">
              <GramBanglaLogo variant="badge" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg leading-tight text-white">
                Room Reservation & Booking
              </h3>
              <p className="text-[11px] text-stone-200">
                Gram Bangla Resort • Bankura, West Bengal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer relative z-10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Enhanced Step Indicator */}
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <div
              className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all ${
                step === 1
                  ? 'bg-[#8B3A2B]/10 text-[#8B3A2B] font-bold border border-[#8B3A2B]/20'
                  : step > 1
                  ? 'bg-emerald-50 text-emerald-800 font-medium'
                  : 'text-stone-400 bg-stone-50'
              }`}
            >
              <span
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  step > 1
                    ? 'bg-emerald-600 text-white'
                    : step === 1
                    ? 'bg-[#8B3A2B] text-white'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {step > 1 ? '✓' : '1'}
              </span>
              <span className="truncate text-[11px] sm:text-xs">Dates & Room</span>
            </div>

            <div
              className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all ${
                step === 2
                  ? 'bg-[#8B3A2B]/10 text-[#8B3A2B] font-bold border border-[#8B3A2B]/20'
                  : step > 2
                  ? 'bg-emerald-50 text-emerald-800 font-medium'
                  : 'text-stone-400 bg-stone-50'
              }`}
            >
              <span
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  step > 2
                    ? 'bg-emerald-600 text-white'
                    : step === 2
                    ? 'bg-[#8B3A2B] text-white'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {step > 2 ? '✓' : '2'}
              </span>
              <span className="truncate text-[11px] sm:text-xs">Guest Details</span>
            </div>

            <div
              className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all ${
                step === 3
                  ? 'bg-[#8B3A2B]/10 text-[#8B3A2B] font-bold border border-[#8B3A2B]/20'
                  : 'text-stone-400 bg-stone-50'
              }`}
            >
              <span
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  step === 3 ? 'bg-[#8B3A2B] text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                3
              </span>
              <span className="truncate text-[11px] sm:text-xs">Payment & Confirm</span>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: DATES & ROOM */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#8B3A2B]" />
                  Select Accommodation
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium cursor-pointer"
                >
                  {rooms.map((r) => {
                    const isAvailable = r.isAvailable !== false;
                    return (
                      <option key={r.id} value={r.id} disabled={!isAvailable}>
                        {r.title} — {isAvailable ? `₹${r.price.toLocaleString()} / night` : `[🔴 SOLD OUT / CLOSED]`}
                      </option>
                    );
                  })}
                </select>

                {/* Sold out notice banner */}
                {currentRoom && currentRoom.isAvailable === false && (
                  <div className="mt-2.5 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in duration-200">
                    <span className="font-bold shrink-0">⚠️ Notice:</span>
                    <span>
                      <strong>{currentRoom.title}</strong> is currently closed for online bookings ({currentRoom.soldOutReason || 'Sold Out'}). Please switch to another room category or call resort reception directly at <strong>+91 94340 00000</strong>.
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8B3A2B]" />
                      Check-in Date
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      11:00 AM
                    </span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8B3A2B]" />
                      Check-out Date
                    </span>
                    <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      10:00 AM
                    </span>
                  </label>
                  <input
                    type="date"
                    min={checkin || today}
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8B3A2B]" />
                    Adult Guests
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                    <option value={5}>5 Adults</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Children (Under 10)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                    <option value={3}>3 Children</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Price Breakdown Box */}
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#8B3A2B]/15 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Duration & Room Rate:</span>
                  <span className="font-semibold text-stone-800">
                    {nights} Night{nights > 1 ? 's' : ''} × ₹{baseRate.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Applicable GST (12%):</span>
                  <span className="font-semibold text-stone-800">₹{tax.toLocaleString()}</span>
                </div>
                <hr className="border-[#8B3A2B]/15 my-1" />
                <div className="flex justify-between font-bold text-stone-900 text-sm sm:text-base">
                  <span>Estimated Total Amount:</span>
                  <span className="text-[#8B3A2B]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {currentRoom && currentRoom.isAvailable === false ? (
                <button
                  type="button"
                  disabled
                  className="w-full bg-stone-300 text-stone-600 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-not-allowed border border-stone-400"
                >
                  <span>🔴 Room Sold Out — Select Another Room</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="w-full bg-[#8B3A2B] hover:bg-[#61261B] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  Continue to Guest Details <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Primary Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Ananya Das"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Government ID Proof to Present at Check-in *
                </label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Voter ID Card">Voter ID Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Special Requests (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Ground floor preference, extra pillow, late arrival"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-sm font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="w-2/3 bg-[#8B3A2B] hover:bg-[#61261B] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION (COMPACT & BALANCED) */}
          {step === 3 && (
            <div className="space-y-3.5">
              
              {/* Payment Notification Bar */}
              <div className="bg-[#FAF6F0] border border-[#8B3A2B]/20 rounded-2xl px-3 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8B3A2B] text-white flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">
                      UPI Payment & Verification
                    </h4>
                    <p className="text-[10px] text-stone-500">
                      Scan QR or pay via UPI, then upload receipt screenshot.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Merchant</span>
                </div>
              </div>

              {/* Main Content: 2-Column Grid on Tablet/Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                
                {/* Column 1: QR & Payment Info */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-center space-y-2.5 flex flex-col items-center">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold block">
                      Total Payable Amount
                    </span>
                    <div className="text-2xl font-display font-extrabold text-[#8B3A2B] tracking-tight leading-none my-0.5">
                      ₹{total.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-stone-400">
                      (Inclusive of GST & All Taxes)
                    </span>
                  </div>

                  {/* Original QR Code Container */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      className="relative w-36 h-36 bg-white border-2 border-[#8B3A2B]/40 hover:border-[#8B3A2B] rounded-2xl p-1.5 shadow-xs flex items-center justify-center cursor-pointer transition overflow-hidden group"
                      title="Click to Enlarge QR Code"
                    >
                      <img
                        src={qrCodeUrl}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbackQrUrl;
                        }}
                        alt={`UPI Payment QR for ₹${total}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-[11px] font-semibold rounded-2xl backdrop-blur-xs">
                        <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Enlarge</span>
                      </div>
                    </button>

                    {/* QR Action Buttons: Zoom & Save */}
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowQrModal(true)}
                        className="px-2 py-0.5 text-[10px] font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-md flex items-center gap-1 transition shadow-2xs cursor-pointer"
                      >
                        <ZoomIn className="w-3 h-3 text-[#8B3A2B]" />
                        <span>Enlarge</span>
                      </button>

                      <a
                        href="/qr.jpg"
                        download="GramBangla_UPI_Payment_QR.jpg"
                        className="px-2 py-0.5 text-[10px] font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-md flex items-center gap-1 transition shadow-2xs"
                        title="Download QR image to scan from gallery"
                      >
                        <Download className="w-3 h-3 text-[#8B3A2B]" />
                        <span>Save QR</span>
                      </a>
                    </div>
                  </div>

                  {/* Mobile Direct Pay Button */}
                  <div className="w-full sm:hidden">
                    <a
                      href={upiPayUrl}
                      className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                    >
                      <Smartphone className="w-3 h-3 text-[#D4AF37]" />
                      Open UPI App (₹{total.toLocaleString()})
                    </a>
                  </div>

                  {/* Copy UPI ID Pill */}
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    <div className="inline-flex items-center gap-1 bg-white border border-stone-300 px-2.5 py-1 rounded-lg shadow-2xs max-w-[190px] overflow-hidden">
                      <span className="text-[10px] text-stone-400 font-semibold shrink-0">UPI:</span>
                      <span className="text-[11px] font-mono font-bold text-[#8B3A2B] truncate">{upiId}</span>
                    </div>

                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="text-[11px] bg-white hover:bg-stone-100 text-[#8B3A2B] font-bold px-2 py-1 rounded-lg border border-stone-300 flex items-center gap-1 transition cursor-pointer shrink-0"
                    >
                      {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-600" />}
                      {copiedUpi ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* Supported Badges */}
                  <div className="flex items-center justify-center gap-1 flex-wrap pt-0.5">
                    <span className="text-[9px] font-bold bg-white text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">GPay</span>
                    <span className="text-[9px] font-bold bg-[#5f259f] text-white px-1.5 py-0.5 rounded">PhonePe</span>
                    <span className="text-[9px] font-bold bg-[#002e6e] text-white px-1.5 py-0.5 rounded">Paytm</span>
                    <span className="text-[9px] font-bold bg-[#00796B] text-white px-1.5 py-0.5 rounded">BHIM</span>
                  </div>
                </div>

                {/* Column 2: Inputs & Upload Dropzone */}
                <div className="space-y-3">
                  
                  {/* UTR Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                        12-Digit UPI Ref / UTR No.
                      </label>
                      <span className="text-[10px] text-stone-400">Optional</span>
                    </div>
                    <input
                      type="text"
                      maxLength={20}
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 425612345678"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] outline-none text-xs font-mono font-semibold"
                    />
                  </div>

                  {/* Screenshot Upload Dropzone */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                        Payment Screenshot
                        <span className="text-[9px] text-red-700 bg-red-50 px-1.5 py-0.2 rounded font-bold border border-red-200">
                          Mandatory
                        </span>
                      </label>
                      <span className="text-[10px] text-stone-400">PNG, JPG</span>
                    </div>

                    {!paymentScreenshot ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#8B3A2B]/40 hover:border-[#8B3A2B] bg-[#FAF6F0]/50 hover:bg-[#FAF6F0] rounded-xl p-3 text-center cursor-pointer transition flex items-center justify-center gap-2.5 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white shadow-xs border border-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                          <UploadCloud className="w-4 h-4 text-[#8B3A2B]" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-stone-800 group-hover:text-[#8B3A2B] block">
                            Click to attach screenshot
                          </span>
                          <span className="text-[10px] text-stone-500 block leading-tight">
                            Showing transaction amount & status
                          </span>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-white shrink-0 border border-emerald-400">
                            <img
                              src={paymentScreenshot}
                              alt="Receipt"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1 truncate">
                              <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                              Receipt Attached
                            </span>
                            <span className="text-[10px] text-emerald-700 truncate block font-mono">
                              {screenshotFileName || 'Ready to verify'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition cursor-pointer shrink-0"
                          title="Remove Screenshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Summary ticket */}
                  <div className="bg-[#FAF6F0] p-2.5 rounded-xl border border-[#8B3A2B]/20 text-[11px] text-stone-700 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-stone-900 block truncate">{currentRoom.title}</span>
                      <span className="text-stone-500">{nights} Night(s) • {guestName}</span>
                    </div>
                    <div className="text-right pl-2 shrink-0">
                      <span className="text-[9px] text-stone-500 uppercase font-semibold block">Total</span>
                      <span className="font-bold text-[#8B3A2B] text-sm">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-2/3 bg-[#1E3A2B] hover:bg-[#0F2017] disabled:bg-stone-400 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 text-xs cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                      <span>Confirming & Securing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Confirm & Get Voucher</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Official QR Preview Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-70 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B3A2B] block">
                Official Resort UPI QR Standee
              </span>
              <h4 className="font-display font-bold text-lg text-stone-900">
                Gram Bangla Resort & Restaurant
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI app
              </p>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200 flex items-center justify-center my-3">
              <img
                src="/qr.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackQrUrl;
                }}
                alt="Gram Bangla Resort Official UPI QR"
                className="max-h-72 w-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="bg-[#FAF6F0] p-2.5 rounded-xl text-xs space-y-1 mb-4 border border-[#E8DFC8]">
              <div className="flex justify-between items-center text-stone-600">
                <span className="text-stone-500">Payable Amount:</span>
                <strong className="text-base text-[#8B3A2B] font-display font-extrabold">₹{total.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span className="text-stone-500">Official UPI ID:</span>
                <span className="font-mono font-bold text-stone-900 text-xs">{upiId}</span>
              </div>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
