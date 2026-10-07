import React, { useState } from 'react';
import { 
  Calendar, 
  Play,
  BedDouble, 
  Search, 
  UtensilsCrossed,
  PartyPopper,
  Waves,
  Trees,
  Car,
  Zap,
  Mountain
} from 'lucide-react';
import { Room } from '../types';

interface HeroProps {
  rooms: Room[];
  onOpenBooking: (roomId?: string, dates?: { checkin: string; checkout: string }) => void;
  onExploreBankura?: () => void;
  onExploreGallery?: () => void;
  onNavigate?: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  rooms,
  onOpenBooking,
  onExploreBankura,
  onExploreGallery,
  onNavigate,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || 'non-ac');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedRoomId, { checkin, checkout });
  };

  return (
    <section className="relative">
      {/* Hero Scenic Banner */}
      <div className="relative bg-[#08140E] text-white overflow-hidden flex flex-col justify-between min-h-[560px] sm:min-h-[600px] lg:min-h-[640px]">
        {/* Scenic Golden Sunset Resort Background with Progressive Fast Loading */}
        <div 
          className="absolute inset-0 z-0 bg-[#1A0C08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 30%, #3D1C12 0%, #1A0C08 70%, #08140E 100%)',
          }}
        >
          {/* Micro-blur placeholder */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: 'url(/images/hero-thumb.webp)',
              filter: 'blur(20px)',
              transform: 'scale(1.05)',
            }}
          />

          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet="/images/hero-mobile.webp" type="image/webp" />
            <source media="(min-width: 769px)" srcSet="/images/hero.webp" type="image/webp" />
            <img
              src="/images/hero.webp"
              alt="Gram Bangla Resort & Restaurant Bankura"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.02]'
              }`}
              onError={(e) => {
                // Fallback to high-res Pinterest image if local file is missing
                e.currentTarget.src = "https://i.pinimg.com/736x/d5/80/ba/d580ba94273a1696b3801e02b6a2e84f.jpg";
                setImageLoaded(true);
              }}
            />
          </picture>
        </div>

        {/* Lightweight Vignette for Maximum Image Vibrancy & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 via-45% to-black/5 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 z-1" />

        {/* Main Content Area */}
        <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20 relative z-10 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 flex-grow flex flex-col justify-start">
          <div className="max-w-3xl">
            {/* Top Eyebrow with Gold Accent Line on Right */}
            <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
              <span className="text-white/90 font-medium text-xs sm:text-sm tracking-[0.28em] uppercase font-sans">
                WELCOME TO
              </span>
              <span className="w-10 sm:w-16 h-[2px] bg-[#D4AF37] inline-block" />
            </div>

            {/* Main Brand Title: Gram Bangla */}
            <h1 className="font-hero-serif font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[1.08] tracking-tight text-white mb-2">
              Gram Bangla
            </h1>

            {/* Sub-label: RESORT & RESTAURANT with small gold underline accent */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 sm:w-10 h-[2px] bg-[#D4AF37] inline-block" />
              <span className="text-white/95 font-semibold text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-sans">
                RESORT & RESTAURANT
              </span>
            </div>

            {/* Tagline Slogan: Stay. Dine. Celebrate. */}
            <div className="font-hero-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal leading-tight mb-3 sm:mb-4 tracking-tight">
              <span className="text-white">Stay. Dine. </span>
              <span className="text-[#E5B63A]">Celebrate.</span>
            </div>

            {/* Sub-paragraph Description */}
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-light sm:font-normal max-w-2xl leading-relaxed mb-6 sm:mb-8 font-sans">
              A peaceful Bengali retreat in Bankura with comfortable stays, authentic dining, beautiful spaces and memorable celebrations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
              {/* Primary Terracotta CTA Button with Calendar Icon on Left */}
              <button
                onClick={() => onOpenBooking(selectedRoomId)}
                className="bg-[#9E3E26] hover:bg-[#85311C] active:scale-[0.98] text-white font-medium sm:font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer group"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Book Your Stay</span>
              </button>

              {/* Secondary Transparent Video Tour Button with Play Badge on Left */}
              <button
                onClick={onExploreGallery}
                className="border border-white/45 hover:border-white/80 bg-black/30 hover:bg-black/45 active:scale-[0.98] text-white font-medium sm:font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center gap-3 text-sm sm:text-base cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-900 shrink-0 shadow-sm">
                  <Play className="w-3 h-3 fill-stone-900 text-stone-900 ml-0.5" />
                </span>
                <span>Explore Resort</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom 6 Feature Pillars (Exact match to reference strip) */}
        <div className="w-full relative z-10 border-t border-white/15 bg-black/30 pt-7 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-2 items-start">
            
            {/* 1. Comfortable Stays */}
            <div 
              onClick={() => onNavigate ? onNavigate('rooms') : onOpenBooking(selectedRoomId)}
              className="flex flex-col items-center text-center px-2 sm:border-r sm:border-white/20 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs">
                <BedDouble className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                Comfortable Stays
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Rooms & cottages
              </p>
            </div>

            {/* 2. Multi-Cuisine Restaurant */}
            <div 
              onClick={() => onNavigate && onNavigate('dining')}
              className="flex flex-col items-center text-center px-2 sm:border-r sm:border-white/20 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs">
                <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                Multi-Cuisine Restaurant
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Bengali • Chinese • Tandoor • South Indian
              </p>
            </div>

            {/* 3. Events & Weddings */}
            <div 
              onClick={() => onNavigate && onNavigate('contact')}
              className="flex flex-col items-center text-center px-2 lg:border-r lg:border-white/20 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs">
                <PartyPopper className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                Events & Weddings
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Celebrate together
              </p>
            </div>

            {/* 4. Swimming Pool */}
            <div 
              onClick={() => onNavigate && onNavigate('rooms')}
              className="flex flex-col items-center text-center px-2 sm:border-r sm:border-white/20 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs">
                <Waves className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                Swimming Pool
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Relax & unwind
              </p>
            </div>

            {/* 5. Lawn & Outdoor Spaces */}
            <div 
              onClick={() => onNavigate && onNavigate('gallery')}
              className="flex flex-col items-center text-center px-2 sm:border-r sm:border-white/20 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs">
                <Trees className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                Lawn & Outdoor Spaces
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Open-air events
              </p>
            </div>

            {/* 6. EV Charging */}
            <div 
              onClick={() => onNavigate && onNavigate('contact')}
              className="flex flex-col items-center text-center px-2 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all shadow-xs relative">
                <Car className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.75} />
                <Zap className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37] absolute top-1.5 right-1.5" />
              </div>
              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                EV Charging
              </h4>
              <p className="text-white/75 text-[11px] sm:text-xs mt-1">
                Drive green, stay with us
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Quick Booking Bar Widget (Centered cleanly) */}
      <div className="w-full relative z-30 -mt-8 sm:-mt-10 md:-mt-12 px-4 sm:px-6 lg:px-8 flex justify-center pb-0">
        <div className="w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-4 sm:p-5 lg:p-6 border border-stone-200/80">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-[#8B3A2B] uppercase tracking-wider mb-1.5 flex items-center justify-between font-sans">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8B3A2B]" />
                  CHECK-IN
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  11:00 AM
                </span>
              </label>
              <input
                type="date"
                value={checkin}
                min={today}
                onChange={(e) => setCheckin(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50/80 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] focus:border-[#8B3A2B] outline-none text-sm font-semibold text-stone-800 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-[#8B3A2B] uppercase tracking-wider mb-1.5 flex items-center justify-between font-sans">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8B3A2B]" />
                  CHECK-OUT
                </span>
                <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  10:00 AM
                </span>
              </label>
              <input
                type="date"
                value={checkout}
                min={checkin || today}
                onChange={(e) => setCheckout(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50/80 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] focus:border-[#8B3A2B] outline-none text-sm font-semibold text-stone-800 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-[#8B3A2B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-sans">
                <BedDouble className="w-3.5 h-3.5 text-[#8B3A2B]" />
                ROOM CATEGORY
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50/80 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8B3A2B] focus:border-[#8B3A2B] outline-none text-sm font-semibold text-stone-800 transition cursor-pointer"
              >
                {rooms.map((room) => {
                  const isAvailable = room.isAvailable !== false;
                  return (
                    <option key={room.id} value={room.id} disabled={!isAvailable}>
                      {room.title} {isAvailable ? `(₹${room.price.toLocaleString()}/night)` : `[🔴 SOLD OUT]`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#9E3E26] hover:bg-[#85311C] active:scale-[0.98] text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer h-[42px] sm:h-[44px]"
              >
                <Search className="w-4 h-4 text-[#E5B63A]" />
                <span>Check Rates & Book</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

