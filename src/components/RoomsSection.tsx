import React, { useState } from 'react';
import { 
  Info, 
  Users, 
  Check, 
  CalendarCheck, 
  Sparkles, 
  Tv, 
  Wifi, 
  Wind, 
  Coffee,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Images,
  Maximize2,
  X
} from 'lucide-react';
import { Room } from '../types';
import { INITIAL_ROOMS } from '../data/initialData';
import { ResortExperiences } from './ResortExperiences';

interface RoomsSectionProps {
  rooms: Room[];
  onOpenBooking: (roomId: string) => void;
}

const RoomCardItem: React.FC<{
  room: Room;
  onOpenBooking: (roomId: string) => void;
  onOpenLightbox: (room: Room, initialIdx: number) => void;
}> = ({ room, onOpenBooking, onOpenLightbox }) => {
  const rawImages = (room.images && room.images.length > 0 ? room.images : (room.image ? [room.image] : []))
    .filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
  const imagesList = rawImages.length > 0
    ? rawImages
    : ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % imagesList.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Room Photo Area with 16:10 Aspect Ratio and Click to View Big */}
        <div 
          onClick={() => onOpenLightbox(room, currentImgIndex)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900 cursor-pointer select-none"
        >
          <img
            src={imagesList[currentImgIndex]}
            alt={`${room.title} photo ${currentImgIndex + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
          
          {/* Price Badge */}
          <span className="absolute bottom-3.5 left-3.5 bg-[#8B3A2B] text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-md z-10">
            ₹{room.price.toLocaleString()} / night
          </span>

          {/* Badge & Maximize Button */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
            {room.isAvailable === false ? (
              <span className="bg-red-600/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                🔴 SOLD OUT
              </span>
            ) : room.availableRoomsCount === 1 ? (
              <span className="bg-amber-500/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⚡ Only 1 Left!
              </span>
            ) : null}
            <span className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Click to view full photo">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Multiple image gallery indicators & navigation arrows */}
          {imagesList.length > 1 && (
            <>
              <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-xs">
                <Images className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentImgIndex + 1}/{imagesList.length}</span>
              </div>

              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots indicator at bottom right */}
              <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full">
                {imagesList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImgIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentImgIndex
                        ? 'bg-amber-400 w-4'
                        : 'bg-white/60 hover:bg-white w-1.5'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-wide uppercase min-h-[32px]">
              {room.title}
            </h2>
          </div>

          {/* Sold out alert banner inside card */}
          {room.isAvailable === false && (
            <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-800 flex items-center gap-2">
              <span className="font-bold">Notice:</span>
              <span>{room.soldOutReason || 'This room is currently fully booked / offline.'}</span>
            </div>
          )}

          <p className="text-xs font-semibold text-[#1E3A2B] mt-1 mb-2.5 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#8B3A2B]" />
            Suitable for: {room.capacity}
          </p>

          <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-3 line-clamp-2 min-h-[36px]">
            {room.desc}
          </p>

          {/* Key Amenities (Clean 2 rows x 3 columns Grid with Expand/Collapse) */}
          <div className="border-t border-stone-100 pt-3 mt-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wider">
                {showAllAmenities ? 'All Amenities:' : 'Key Amenities (6):'}
              </span>
              {room.amenities.length > 6 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllAmenities(!showAllAmenities);
                  }}
                  className="text-[11px] text-[#8B3A2B] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer transition hover:text-[#61261B]"
                >
                  {showAllAmenities ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>+{room.amenities.length - 6} More</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>

            <div className={`grid ${showAllAmenities ? 'grid-cols-2 gap-y-2.5 gap-x-3' : 'grid-cols-3 gap-y-2 gap-x-2'} text-xs transition-all duration-300`}>
              {(showAllAmenities ? room.amenities : room.amenities.slice(0, 6)).map((amenity) => (
                <div key={amenity} className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-stone-700 min-w-0">
                  <Check className="w-3.5 h-3.5 text-[#8B3A2B] shrink-0" />
                  <span className={showAllAmenities ? "break-words leading-tight" : "truncate"} title={amenity}>{amenity}</span>
                </div>
              ))}
            </div>

            {room.amenities.length > 6 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllAmenities(!showAllAmenities);
                }}
                className="text-[11.5px] text-[#8B3A2B] font-semibold hover:underline mt-2.5 inline-flex items-center gap-1 cursor-pointer transition hover:text-[#61261B]"
              >
                {showAllAmenities ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>+ {room.amenities.length - 6} more amenities included</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        {room.isAvailable !== false ? (
          <button
            onClick={() => onOpenBooking(room.id)}
            className="w-full bg-[#8B3A2B] hover:bg-[#61261B] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
            Reserve Now at ₹{room.price.toLocaleString()}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-stone-200 text-stone-500 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-not-allowed border border-stone-300"
          >
            <span className="text-red-700 font-bold">🔴 {room.soldOutReason || 'Sold Out / Closed'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  rooms,
  onOpenBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'deluxe' | 'premium' | 'suite' | 'dormitory'>('all');
  const [lightboxData, setLightboxData] = useState<{
    room: Room;
    index: number;
  } | null>(null);

  const handleOpenLightbox = (room: Room, initialIdx: number) => {
    const defaultMatch = INITIAL_ROOMS.find(r => r.id === room.id);
    const canonicalImages = defaultMatch?.images || (defaultMatch ? [defaultMatch.image] : []);
    const rawImages = room.images && room.images.length > 0 ? room.images : [room.image];
    const combinedImages = rawImages.length >= canonicalImages.length
      ? rawImages
      : Array.from(new Set([...canonicalImages, ...rawImages]));

    setLightboxData({ 
      room: {
        ...room,
        images: combinedImages,
      }, 
      index: initialIdx 
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  const lightboxImages = lightboxData
    ? (() => {
        const defaultMatch = INITIAL_ROOMS.find(r => r.id === lightboxData.room.id);
        const canonicalImages = defaultMatch?.images || (defaultMatch ? [defaultMatch.image] : []);
        const rawImages = lightboxData.room.images && lightboxData.room.images.length > 0
          ? lightboxData.room.images
          : [lightboxData.room.image];
        return rawImages.length >= canonicalImages.length
          ? rawImages
          : Array.from(new Set([...canonicalImages, ...rawImages]));
      })()
    : [];

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'all') return true;
    if (filter === 'deluxe') return room.id === 'deluxe' || room.id === 'semi-deluxe';
    if (filter === 'premium') return room.id === 'premium-deluxe' || room.id === 'royal-deluxe' || room.id === 'super-deluxe';
    if (filter === 'suite') return room.id === 'suite';
    if (filter === 'dormitory') return room.id === 'dormitory';
    return true;
  });

  return (
    <div className="py-12 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Rooms & Accommodations
        </h1>
        <p className="text-stone-600 mt-2 font-serif-custom text-sm sm:text-base">
          Transparent pricing with air-conditioned comfort, complimentary breakfast options, attached western bathrooms, and scenic courtyard garden views.
        </p>
        <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-xs font-semibold">
            🕒 Check-in: <strong>11:00 AM</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-semibold">
            🕒 Check-out: <strong>10:00 AM</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'All Stays' },
          { id: 'deluxe', label: 'Deluxe & Semi Deluxe' },
          { id: 'premium', label: 'Premium & Royal Deluxe' },
          { id: 'suite', label: 'Royal Suite' },
          { id: 'dormitory', label: 'Dormitory Group Suite' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
              filter === tab.id
                ? 'bg-[#1E3A2B] text-[#D4AF37] shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredRooms.map((room) => (
          <RoomCardItem
            key={room.id}
            room={room}
            onOpenBooking={onOpenBooking}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      {/* Fullscreen Room Photo Lightbox Modal */}
      {lightboxData && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white max-w-5xl w-full mx-auto pb-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100">
                {lightboxData.room.title}
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                ₹{lightboxData.room.price.toLocaleString()} / night • {lightboxData.room.capacity} • Photo {lightboxData.index + 1} of {lightboxImages.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const rId = lightboxData.room.id;
                  handleCloseLightbox();
                  onOpenBooking(rId);
                }}
                className="bg-[#8B3A2B] hover:bg-[#61261B] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow cursor-pointer hidden sm:flex items-center gap-1.5"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Book Room
              </button>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image View */}
          <div 
            className="flex-1 flex items-center justify-center relative max-w-5xl w-full mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxData.index]}
              alt={`${lightboxData.room.title} enlarged view`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Lightbox Prev / Next Controls */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      ...lightboxData,
                      index:
                        lightboxData.index === 0
                          ? lightboxImages.length - 1
                          : lightboxData.index - 1,
                    })
                  }
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer shadow-lg border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxData({
                      ...lightboxData,
                      index:
                        lightboxData.index === lightboxImages.length - 1
                          ? 0
                          : lightboxData.index + 1,
                    })
                  }
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer shadow-lg border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {lightboxImages.length > 1 && (
            <div 
              className="flex justify-center items-center gap-2 pt-3 max-w-xl mx-auto overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImages.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxData({ ...lightboxData, index: idx })}
                  className={`w-14 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    lightboxData.index === idx
                      ? 'border-[#D4AF37] scale-105 shadow-md ring-2 ring-[#D4AF37]/50'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resort Experiences Section */}
      <ResortExperiences />
    </div>
  );
};
