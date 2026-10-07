import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Tv, 
  TreePine, 
  Users, 
  Calendar, 
  Phone, 
  Heart, 
  ArrowRight,
  Sun,
  Snowflake,
  Leaf,
  Sofa,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Images,
  Droplets,
  Maximize2,
  X,
  CalendarCheck
} from 'lucide-react';
import { Room } from '../types';

interface FeaturedRoomsProps {
  rooms: Room[];
  onOpenBooking: (roomId: string) => void;
  onViewAllRooms: () => void;
}

interface RoomCardData {
  id: string;
  tag: string;
  tagType: string;
  title: string;
  capacity: string;
  desc: string;
  price: number;
  image: string;
  images?: string[];
  buttonBg: string;
  amenities: { icon: React.ReactNode; label: string }[];
}

const FeaturedRoomCardItem: React.FC<{
  room: RoomCardData;
  dynamicPrice: number;
  isAvailable?: boolean;
  soldOutReason?: string;
  availableRoomsCount?: number;
  onOpenBooking: (roomId: string) => void;
  onViewAllRooms: () => void;
  onOpenLightbox: (room: RoomCardData, dynamicPrice: number, initialIdx: number) => void;
}> = ({
  room,
  dynamicPrice,
  isAvailable = true,
  soldOutReason,
  availableRoomsCount,
  onOpenBooking,
  onViewAllRooms,
  onOpenLightbox,
}) => {
  const rawImages = (room.images && room.images.length > 0 ? room.images : (room.image ? [room.image] : []))
    .filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
  const imagesList = rawImages.length > 0
    ? rawImages
    : ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'];
  const [imgIdx, setImgIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % imagesList.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group hover:-translate-y-1 ${
        isAvailable ? 'border-stone-200/90' : 'border-red-200 bg-red-50/10'
      }`}
    >
      <div>
        {/* Room Thumbnail with Badge and Click-to-Enlarge */}
        <div 
          onClick={() => onOpenLightbox(room, dynamicPrice, imgIdx)}
          className="aspect-[16/11] w-full relative overflow-hidden bg-stone-900 cursor-pointer select-none"
        >
          <img
            src={imagesList[imgIdx]}
            alt={`${room.title} photo ${imgIdx + 1}`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
              isAvailable ? '' : 'grayscale-[35%] opacity-90'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

          {/* Tag badge in top-left */}
          <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start">
            {/* Availability / Sold Out Pill */}
            {!isAvailable ? (
              <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                <span>🔴 SOLD OUT</span>
              </div>
            ) : availableRoomsCount === 1 ? (
              <div className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <span>⚡ Only 1 Left!</span>
              </div>
            ) : null}

            {room.tagType === 'non-ac' ? (
              <div className="bg-[#8B3A2B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Leaf className="w-3.5 h-3.5" />
                <span>Non-AC</span>
              </div>
            ) : (
              <div className="bg-[#0A261D]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Snowflake className="w-3.5 h-3.5 text-cyan-300" />
                <span>AC</span>
              </div>
            )}
          </div>

          {/* Enlarge Hint Button in top-right */}
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
            {imagesList.length > 1 && (
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Images className="w-3 h-3 text-amber-300" />
                {imgIdx + 1}/{imagesList.length}
              </span>
            )}
            <span className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Click to view full photo">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Multiple images controls */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImg}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-1.5 rounded-full transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:scale-105"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={nextImg}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-1.5 rounded-full transition-all cursor-pointer z-10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:scale-105"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                {imagesList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIdx(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === imgIdx ? 'bg-amber-400 w-3.5' : 'bg-white/70 hover:bg-white w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Content Details */}
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-[#0B251D] uppercase tracking-wide min-h-[44px] line-clamp-2">
            {room.title}
          </h3>

          {/* Capacity */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2 font-medium">
            <Users className="w-3.5 h-3.5 text-stone-500" />
            <span>{room.capacity}</span>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-[13px] mt-3 line-clamp-3 leading-relaxed min-h-[58px]">
            {room.desc}
          </p>

          {/* 4 Amenity Chips */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-1 mt-4 pt-3 border-t border-stone-100 text-xs text-stone-700">
            {room.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                {amenity.icon}
                <span className="truncate">{amenity.label}</span>
              </div>
            ))}
          </div>

          {/* Price Display */}
          <div className="mt-5 pt-3 border-t border-stone-100">
            <div className="text-[#8B3A2B] font-bold text-xl sm:text-2xl font-mono flex items-baseline gap-1">
              <span>₹{dynamicPrice.toLocaleString()}</span>
              <span className="text-stone-500 font-sans font-normal text-xs">/ night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons: Book This Room & View Details */}
      <div className="p-5 sm:p-6 pt-0 grid grid-cols-12 gap-2">
        {isAvailable ? (
          <button
            onClick={() => onOpenBooking(room.id)}
            className={`col-span-8 ${room.buttonBg} text-white font-bold py-2.5 px-3 rounded-xl shadow-sm hover:shadow-md transition text-xs sm:text-[13px] flex items-center justify-center gap-1.5 cursor-pointer`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate">Book This Room →</span>
          </button>
        ) : (
          <button
            disabled
            className="col-span-8 bg-stone-200 text-stone-500 font-bold py-2.5 px-3 rounded-xl text-xs sm:text-[13px] flex items-center justify-center gap-1.5 cursor-not-allowed opacity-90 border border-stone-300"
            title={soldOutReason || 'This room is currently fully booked'}
          >
            <span className="truncate text-red-700 font-bold">🔴 {soldOutReason || 'Sold Out'}</span>
          </button>
        )}

        <button
          onClick={onViewAllRooms}
          className="col-span-4 bg-white hover:bg-stone-50 text-[#8B3A2B] border border-[#8B3A2B]/40 hover:border-[#8B3A2B] font-semibold py-2.5 px-2 rounded-xl transition text-xs sm:text-[12px] text-center cursor-pointer truncate"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({
  rooms,
  onOpenBooking,
  onViewAllRooms,
}) => {
  const roomCards = [
    {
      id: 'deluxe',
      tag: 'AC • No Breakfast',
      tagType: 'ac',
      title: 'DELUXE ROOM',
      capacity: '2 Adults + 1 Child',
      desc: 'Air-conditioned room with classic wooden furnishings, King-size bed, complimentary toiletries, and 24/7 power backup.',
      price: 1500,
      image: 'https://i.pinimg.com/736x/b3/e0/cf/b3e0cfc61f315eebd01c730bbf9c58b5.jpg',
      images: [
        'https://i.pinimg.com/736x/b3/e0/cf/b3e0cfc61f315eebd01c730bbf9c58b5.jpg',
        'https://i.pinimg.com/736x/f5/bb/de/f5bbded199a723314a539feef9af6eb6.jpg',
        'https://i.pinimg.com/736x/12/a3/16/12a3169cf39908832ecd941c2ac74b04.jpg',
        'https://i.pinimg.com/736x/1f/a4/95/1fa495c87e6212079dadd60c94867adb.jpg'
      ],
      buttonBg: 'bg-[#8B3A2B] hover:bg-[#722A1E]',
      amenities: [
        { icon: <Bed className="w-4 h-4 text-stone-600" />, label: 'King-size Bed' },
        { icon: <Sparkles className="w-4 h-4 text-stone-600" />, label: 'Toiletries' },
        { icon: <Snowflake className="w-4 h-4 text-stone-600" />, label: 'Split AC' },
        { icon: <Sun className="w-4 h-4 text-stone-600" />, label: 'Power Backup' },
      ],
    },
    {
      id: 'semi-deluxe',
      tag: 'AC • With Breakfast',
      tagType: 'ac-breakfast',
      title: 'SEMI DELUXE ROOM',
      capacity: '2 Adults + 1 Child',
      desc: 'Well-appointed AC room with King-size bed, Smart TV, spacious wardrobe, hot & cold water, and complimentary daily morning breakfast.',
      price: 2000,
      image: 'https://i.pinimg.com/736x/8b/7c/da/8b7cdaa3a8d6bf5bd53ef57b96691ffa.jpg',
      images: [
        'https://i.pinimg.com/736x/8b/7c/da/8b7cdaa3a8d6bf5bd53ef57b96691ffa.jpg',
        'https://i.pinimg.com/736x/66/ff/d7/66ffd7e4ac6b6cbab3cf934c59a74311.jpg',
        'https://i.pinimg.com/736x/78/0e/f4/780ef44602df23bcb645f64d7a2ec2b5.jpg',
        'https://i.pinimg.com/736x/0e/55/ee/0e55ee84730e03f58c8423ae38a97d47.jpg'
      ],
      buttonBg: 'bg-[#0E2E22] hover:bg-[#071F17]',
      amenities: [
        { icon: <Tv className="w-4 h-4 text-stone-600" />, label: 'Smart TV' },
        { icon: <Bed className="w-4 h-4 text-stone-600" />, label: 'Wardrobe' },
        { icon: <Droplets className="w-4 h-4 text-stone-600" />, label: 'Hot & Cold Water' },
        { icon: <Sparkles className="w-4 h-4 text-stone-600" />, label: 'Housekeeping' },
      ],
    },
    {
      id: 'premium-deluxe',
      tag: 'AC • With Breakfast',
      tagType: 'ac-breakfast',
      title: 'PREMIUM DELUXE ROOM',
      capacity: '2-3 Adults',
      desc: 'Spacious premium AC room with Premium Double Bed, LED TV, hot & cold water, and daily complimentary breakfast.',
      price: 2200,
      image: 'https://i.pinimg.com/736x/0e/25/23/0e2523f72d06a739d9eb8c5fdd925180.jpg',
      images: [
        'https://i.pinimg.com/736x/0e/25/23/0e2523f72d06a739d9eb8c5fdd925180.jpg',
        'https://i.pinimg.com/736x/ce/59/1b/ce591b895bc315f578d3e6944df004d2.jpg',
        'https://i.pinimg.com/736x/34/4b/54/344b5424c51903c9a387836d299d2f76.jpg',
        'https://i.pinimg.com/736x/32/dd/9b/32dd9b10043027b57dcc2f30b1c06c3a.jpg',
        'https://i.pinimg.com/736x/58/9d/e7/589de7ce91ab1eeef22a90c7082da55f.jpg'
      ],
      buttonBg: 'bg-[#8B3A2B] hover:bg-[#722A1E]',
      amenities: [
        { icon: <Bed className="w-4 h-4 text-stone-600" />, label: 'Double Bed' },
        { icon: <Tv className="w-4 h-4 text-stone-600" />, label: 'LED TV' },
        { icon: <Droplets className="w-4 h-4 text-stone-600" />, label: 'Hot & Cold Water' },
        { icon: <Leaf className="w-4 h-4 text-stone-600" />, label: 'Incl. Breakfast' },
      ],
    },
    {
      id: 'royal-deluxe',
      tag: 'AC • With Breakfast',
      tagType: 'ac-breakfast',
      title: 'ROYAL DELUXE ROOM',
      capacity: '3-4 Guests',
      desc: 'Exquisite royal deluxe room with luxurious wooden accents, Two Beds, Smart TV, 24/7 power backup, 24/7 hot water, free pool access, and complimentary breakfast.',
      price: 3500,
      image: 'https://i.pinimg.com/736x/d4/ee/95/d4ee95e5824d850c6e30ad56e1939f74.jpg',
      images: [
        'https://i.pinimg.com/736x/d4/ee/95/d4ee95e5824d850c6e30ad56e1939f74.jpg',
        'https://i.pinimg.com/736x/70/16/57/701657bcd93fb3facdefc0c66d9a85bd.jpg',
        'https://i.pinimg.com/736x/58/9d/e7/589de7ce91ab1eeef22a90c7082da55f.jpg'
      ],
      buttonBg: 'bg-[#8B3A2B] hover:bg-[#722A1E]',
      amenities: [
        { icon: <Bed className="w-4 h-4 text-stone-600" />, label: 'Two Beds' },
        { icon: <Tv className="w-4 h-4 text-stone-600" />, label: 'Smart TV' },
        { icon: <Droplets className="w-4 h-4 text-stone-600" />, label: 'Hot & Cold Water' },
        { icon: <Leaf className="w-4 h-4 text-stone-600" />, label: 'Incl. Breakfast' },
      ],
    },
  ];

  const [lightboxData, setLightboxData] = useState<{
    room: RoomCardData;
    price: number;
    index: number;
  } | null>(null);

  const handleOpenLightbox = (
    room: RoomCardData,
    dynamicPrice: number,
    initialIdx: number
  ) => {
    const cardMatch = roomCards.find(c => c.id === room.id);
    const canonicalImages = cardMatch?.images || (cardMatch ? [cardMatch.image] : []);
    const rawImages = room.images && room.images.length > 0 ? room.images : [room.image];
    const combinedImages = rawImages.length >= canonicalImages.length
      ? rawImages
      : Array.from(new Set([...canonicalImages, ...rawImages]));

    setLightboxData({ 
      room: {
        ...room,
        images: combinedImages,
      }, 
      price: dynamicPrice, 
      index: initialIdx 
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  const lightboxImages = lightboxData
    ? (() => {
        const cardMatch = roomCards.find(c => c.id === lightboxData.room.id);
        const canonicalImages = cardMatch?.images || (cardMatch ? [cardMatch.image] : []);
        const rawImages = lightboxData.room.images && lightboxData.room.images.length > 0
          ? lightboxData.room.images
          : [lightboxData.room.image];
        return rawImages.length >= canonicalImages.length
          ? rawImages
          : Array.from(new Set([...canonicalImages, ...rawImages]));
      })()
    : [];


  return (
    <section className="bg-[#FAF6F0] py-14 sm:py-20 text-stone-900 relative overflow-hidden border-t border-stone-200/70">
      
      {/* Decorative Corner Botanical Leaf Accents */}
      <div className="absolute top-0 left-0 w-36 sm:w-48 opacity-20 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0 C60 20, 120 70, 160 140 C100 120, 40 80, 0 0 Z" fill="#2E6B4F" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-36 sm:w-48 opacity-20 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M200 0 C140 20, 80 70, 40 140 C100 120, 160 80, 200 0 Z" fill="#8B3A2B" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        
        {/* Section Top Header & Categorical Highlights */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 sm:mb-12 gap-6 relative">
          
          {/* Left Title & Description */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#8B3A2B] font-bold text-xs uppercase tracking-[0.24em] font-sans">
                STAY YOUR WAY
              </span>
              <span className="w-12 h-[1px] bg-[#8B3A2B]" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0B251D] tracking-wide uppercase leading-tight">
              ROOMS MADE FOR RELAXING
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] mt-2 leading-relaxed">
              Comfortable rooms for couples, families and weekend getaways. Experience a peaceful stay with modern amenities and the warm hospitality of Gram Bangla.
            </p>

            <div className="flex items-center gap-2.5 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-full text-[11px] font-bold">
                🕒 Check-in: 11:00 AM
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-[11px] font-bold">
                🕒 Check-out: 10:00 AM
              </span>
            </div>
          </div>

          {/* Right Highlights Badges & Calligraphy Accent */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 self-center lg:self-auto">
            
            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B3A2B] mb-1.5 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-bold text-[12px] sm:text-xs text-stone-900">Couples</span>
                <span className="text-[10px] text-stone-500">Romantic escapes</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B3A2B] mb-1.5 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-bold text-[12px] sm:text-xs text-stone-900">Families</span>
                <span className="text-[10px] text-stone-500">Comfort for all</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B3A2B] mb-1.5 shadow-2xs">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="font-bold text-[12px] sm:text-xs text-stone-900">Weekend Getaways</span>
                <span className="text-[10px] text-stone-500">Relax & recharge</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B3A2B] mb-1.5 shadow-2xs">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="font-bold text-[12px] sm:text-xs text-stone-900">Memorable Stays</span>
                <span className="text-[10px] text-stone-500">Feel at home</span>
              </div>

            </div>

            {/* Handwritten Script Accent on the right */}
            <div className="hidden xl:block pl-2 border-l border-stone-300 pointer-events-none select-none">
              <p className="font-serif-custom italic text-xl xl:text-2xl text-stone-600 leading-tight">
                More<br />Than Just<br />a Stay
              </p>
              <div className="w-12 h-[2px] bg-[#8B3A2B] mt-1 rounded-full" />
            </div>

          </div>

        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {roomCards.map((room) => {
            const liveRoom = rooms.find((r) => r.id === room.id);
            const dynamicPrice = liveRoom?.price || room.price;
            const isAvailable = liveRoom ? liveRoom.isAvailable !== false : true;
            const soldOutReason = liveRoom?.soldOutReason;
            const availableRoomsCount = liveRoom?.availableRoomsCount;

            const defaultCardImages = room.images && room.images.length > 0 ? room.images : [room.image];
            const liveImages = (liveRoom?.images || [])
              .filter((img): img is string => typeof img === 'string' && img.trim().length > 0 && !img.includes('1590490360182') && !img.includes('1611892440504') && !img.includes('bdca668959df'));

            let finalImages = defaultCardImages;
            if (liveImages.length >= defaultCardImages.length) {
              finalImages = liveImages;
            } else if (liveImages.length > 0) {
              finalImages = Array.from(new Set([...defaultCardImages, ...liveImages]));
            } else {
              finalImages = defaultCardImages;
            }

            const mergedRoom: RoomCardData = {
              ...room,
              title: liveRoom?.title || room.title,
              desc: liveRoom?.desc || room.desc,
              capacity: liveRoom?.capacity || room.capacity,
              price: dynamicPrice,
              image: finalImages[0] || room.image,
              images: finalImages,
            };

            return (
              <FeaturedRoomCardItem
                key={room.id}
                room={mergedRoom}
                dynamicPrice={dynamicPrice}
                isAvailable={isAvailable}
                soldOutReason={soldOutReason}
                availableRoomsCount={availableRoomsCount}
                onOpenBooking={onOpenBooking}
                onViewAllRooms={onViewAllRooms}
                onOpenLightbox={handleOpenLightbox}
              />
            );
          })}
        </div>

        {/* Bottom Consultation & Action Bar */}
        <div className="bg-[#F4EFE6] rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#E5DAC8] mb-10 max-w-7xl mx-auto shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            
            {/* Left Phone Consultation */}
            <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EADDC9] flex items-center justify-center text-[#8B3A2B] shrink-0 shadow-2xs">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-tight">
                  Need help choosing the perfect room?
                </h4>
                <p className="text-stone-600 text-xs sm:text-[13px] mt-0.5 sm:mt-1">
                  Front Desk & Reservations:{' '}
                  <a
                    href="tel:+919064485494"
                    className="text-[#8B3A2B] font-bold font-mono hover:underline inline-flex items-center gap-1"
                  >
                    +91 90644 85494
                  </a>
                </p>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="w-full sm:w-auto shrink-0 flex sm:justify-end">
              <button
                onClick={onViewAllRooms}
                className="w-full sm:w-auto bg-[#8B3A2B] hover:bg-[#722A1E] text-white font-bold px-6 py-2.5 sm:py-3 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>View all rooms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Aesthetic Divider */}
        <div className="flex items-center justify-center gap-4 text-[#8B3A2B] max-w-md mx-auto pt-2">
          <span className="w-16 h-[1px] bg-[#C99A45]/60" />
          <span className="text-[10px] sm:text-[11px] font-serif-custom tracking-[0.22em] uppercase font-bold text-[#8B3A2B] flex items-center gap-2 whitespace-nowrap">
            A PEACEFUL STAY
            <span className="inline-block">
              <Leaf className="w-3.5 h-3.5 text-[#C99A45]" />
            </span>
            A BRIGHTER TOMORROW
          </span>
          <span className="w-16 h-[1px] bg-[#C99A45]/60" />
        </div>

      </div>

      {/* Fullscreen Room Photo Lightbox Modal for Homepage */}
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
                ₹{lightboxData.price.toLocaleString()} / night • {lightboxData.room.capacity} • Photo {lightboxData.index + 1} of {lightboxImages.length}
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
    </section>
  );
};
