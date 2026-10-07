import React, { useState } from 'react';
import { Route, MapPin, ExternalLink, ChevronLeft, ChevronRight, Images, Maximize2, X } from 'lucide-react';
import { NearbyAttraction } from '../types';

interface NearbySectionProps {
  attractions: NearbyAttraction[];
}

const AttractionCard: React.FC<{
  place: NearbyAttraction;
  onOpenLightbox: (place: NearbyAttraction, initialIdx: number) => void;
}> = ({ place, onOpenLightbox }) => {
  const images = place.images && place.images.length > 0 ? place.images : [place.image];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapsQuery || `${place.title} Bankura West Bengal`
  )}`;

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Main Photo Container with 16:10 Proportional Aspect Ratio */}
        <div 
          onClick={() => onOpenLightbox(place, currentImgIndex)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900 cursor-pointer select-none"
        >
          <img
            src={images[currentImgIndex]}
            alt={`${place.title} - view ${currentImgIndex + 1}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.currentTarget.src = place.image;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Distance Badge - Top Left */}
          <span className="absolute top-3.5 left-3.5 bg-[#1E3A2B]/90 backdrop-blur-md text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
            <Route className="w-3.5 h-3.5" />
            {place.distance}
          </span>

          {/* Photo Counter & Enlarge Hint - Top Right */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
            {images.length > 1 && (
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Images className="w-3 h-3 text-[#D4AF37]" />
                {currentImgIndex + 1}/{images.length}
              </span>
            )}
            <span className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Click to view full photo">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Carousel Arrows on Card Image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImg}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 cursor-pointer shadow-md hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImg}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 cursor-pointer shadow-md hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Minimalist Floating Dots at Bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-auto">
              <div className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImgIndex(idx);
                    }}
                    aria-label={`View photo ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentImgIndex === idx
                        ? 'bg-[#D4AF37] w-4'
                        : 'bg-white/60 hover:bg-white w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {place.category && (
            <span className="inline-block bg-[#FAF6F0] text-[#8B3A2B] border border-[#8B3A2B]/20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-2">
              {place.category}
            </span>
          )}
          <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
            {place.title}
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {place.desc}
          </p>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-6 pt-0">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-[#8B3A2B] hover:text-white text-stone-700 font-bold text-xs py-3 rounded-xl transition duration-200"
        >
          <MapPin className="w-3.5 h-3.5 text-[#8B3A2B] group-hover:text-white" />
          Get Google Maps Directions
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </div>
  );
};

export const NearbySection: React.FC<NearbySectionProps> = ({ attractions }) => {
  const [lightboxData, setLightboxData] = useState<{
    place: NearbyAttraction;
    index: number;
  } | null>(null);

  const handleOpenLightbox = (place: NearbyAttraction, initialIdx: number) => {
    setLightboxData({ place, index: initialIdx });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  const lightboxImages = lightboxData
    ? lightboxData.place.images && lightboxData.place.images.length > 0
      ? lightboxData.place.images
      : [lightboxData.place.image]
    : [];

  return (
    <div className="py-12 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[#8B3A2B] font-bold text-xs uppercase tracking-widest block mb-1">
          Explore Bankura District
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Prominent Nearby Attractions
        </h1>
        <p className="text-stone-600 mt-2 font-serif-custom text-sm sm:text-base">
          GramBangla Resort serves as your strategic basecamp to explore Bankura's world-famous Malla heritage sites, hill trails, and eco-tourism dams.
        </p>
      </div>

      {/* Grid of Attractions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((place) => (
          <AttractionCard
            key={place.id}
            place={place}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      {lightboxData && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white max-w-5xl w-full mx-auto pb-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100">
                {lightboxData.place.title}
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                {lightboxData.place.distance} • Photo {lightboxData.index + 1} of {lightboxImages.length}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center Image View */}
          <div 
            className="flex-1 flex items-center justify-center relative max-w-5xl w-full mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxData.index]}
              alt={`${lightboxData.place.title} enlarged`}
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
    </div>
  );
};

