import React from 'react';
import {
  Wine,
  Cake,
  Users,
  ArrowRight,
  Trees,
  Monitor,
  Landmark,
  PartyPopper,
  Leaf
} from 'lucide-react';

interface EventsSectionProps {
  onEnquireClick: () => void;
  onExploreGallery?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onEnquireClick,
  onExploreGallery
}) => {
  const topCategories = [
    {
      id: 'weddings',
      title: 'Weddings',
      subtitle: 'A new beginning',
      icon: (
        <svg className="w-5 h-5 text-[#8B3A2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
          <path d="M12 6l.8-1.5a1.5 1.5 0 0 1 2.4 0L16 6" />
        </svg>
      ),
      bgColor: 'bg-[#F9EDE6]',
    },
    {
      id: 'receptions',
      title: 'Receptions',
      subtitle: 'Celebrate in style',
      icon: <Wine className="w-5 h-5 text-[#8B3A2B]" strokeWidth={1.8} />,
      bgColor: 'bg-[#F9EDE6]',
    },
    {
      id: 'birthdays',
      title: 'Birthdays',
      subtitle: 'Make it special',
      icon: <Cake className="w-5 h-5 text-[#8B3A2B]" strokeWidth={1.8} />,
      bgColor: 'bg-[#F9EDE6]',
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      subtitle: 'Meet. Connect. Grow.',
      icon: <Users className="w-5 h-5 text-[#8B3A2B]" strokeWidth={1.8} />,
      bgColor: 'bg-[#F9EDE6]',
    },
  ];

  const venueSpaces = [
    {
      title: 'Banquet Hall',
      desc: 'Spacious & elegant',
      icon: <Users className="w-5 h-5 text-[#8B3A2B]" />,
    },
    {
      title: 'Community Hall',
      desc: 'For social gatherings',
      icon: <Landmark className="w-5 h-5 text-[#8B3A2B]" />,
    },
    {
      title: 'Party Hall',
      desc: 'Celebrate your way',
      icon: <PartyPopper className="w-5 h-5 text-[#8B3A2B]" />,
    },
    {
      title: 'Lawn & Outdoor',
      desc: 'Open-air events',
      icon: <Trees className="w-5 h-5 text-[#8B3A2B]" />,
    },
    {
      title: 'Meeting Hall',
      desc: 'Ideal for corporate events',
      icon: <Monitor className="w-5 h-5 text-[#8B3A2B]" />,
    },
  ];

  return (
    <section className="py-14 sm:py-18 lg:py-22 bg-[#FAF6F0] text-stone-900 relative overflow-hidden border-t border-stone-200/70">
      
      {/* Decorative Botanical Leaf Accents in Background */}
      <div className="absolute right-0 top-0 w-48 sm:w-64 md:w-80 pointer-events-none select-none opacity-40 z-0">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M180 20 C140 60, 110 120, 150 180 C110 140, 80 80, 180 20 Z" fill="#8B3A2B" opacity="0.15" />
          <path d="M120 40 C90 80, 70 140, 100 190 C80 150, 50 100, 120 40 Z" fill="#2E6B4F" opacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        
        {/* Top Header Row with Category Badges & Calligraphy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          
          {/* Left Title & Subtext */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#8B3A2B] font-sans">
                CELEBRATE WITH US
              </span>
              <span className="w-12 h-[2px] bg-[#8B3A2B] inline-block" />
            </div>

            <h2 className="font-hero-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#0A1A12] leading-[1.15] tracking-tight uppercase mb-3">
              Weddings, Banquets & Special Events
            </h2>

            <p className="text-stone-600 font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed">
              Bring your family and guests together in a comfortable setting for weddings, receptions, birthdays, parties and private gatherings. Create unforgettable moments at Gram Bangla.
            </p>
          </div>

          {/* Right Side: 4 Round Icons + Calligraphy Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:gap-8 shrink-0">
            
            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {topCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={onEnquireClick}
                  className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-white/60 transition cursor-pointer group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F5EBE1] border border-[#E8D8CA] flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-[#EFE0D2] transition-transform shadow-2xs">
                    {cat.icon}
                  </div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">
                    {cat.title}
                  </h4>
                  <span className="text-[9px] sm:text-[10px] text-stone-500 mt-0.5 whitespace-nowrap">
                    {cat.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Handwritten Script Accent: "Moments that last Forever" */}
            <div className="hidden xl:block select-none pl-2 border-l border-stone-300/80">
              <div className="font-script text-2xl lg:text-[28px] leading-[1.1] text-stone-700 -rotate-3">
                <div>Moments</div>
                <div className="pl-2">that last</div>
                <div className="pl-4 text-[#8B3A2B]">Forever</div>
              </div>
              <svg className="w-20 h-2 mt-0.5 ml-2" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 C25 2, 65 3, 98 6" stroke="#8B3A2B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8 sm:mb-10">
          
          {/* Left Large Highlight Card: Banquet & Events */}
          <div className="lg:col-span-7 xl:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex flex-col justify-end p-6 sm:p-8 lg:p-10 bg-stone-900">
            {/* Background Image: Grand Banquet Hall with Golden Lighting & Chandeliers */}
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=75"
              alt="Gram Bangla Luxury Banquet Hall and Wedding Stage"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 brightness-[0.88]"
            />
            
            {/* Subtle dark gradient overlay for crystal clear text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            {/* Card Content */}
            <div className="relative z-10 max-w-xl">
              <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E5B63A] font-sans mb-2">
                BANQUET & EVENTS
              </span>
              
              <h3 className="font-hero-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight uppercase mb-2.5">
                Make Every Gathering Memorable
              </h3>

              <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-sans">
                A dedicated space for family functions, corporate gatherings and social celebrations.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center">
                <button
                  onClick={onEnquireClick}
                  className="bg-[#9E3E26] hover:bg-[#85311C] active:scale-[0.98] text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>Enquire for an Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Bento Cards */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Card: Wedding Celebrations */}
            <div 
              onClick={onEnquireClick}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group h-[210px] sm:h-[235px] flex flex-col justify-end p-5 sm:p-6 bg-stone-900 cursor-pointer"
            >
              <img
                src="https://i.pinimg.com/736x/64/95/5d/64955deeb946d894b8fedf4923324d74.jpg"
                alt="Gram Bangla Open Air Wedding Celebrations"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h4 className="font-bold text-white text-base sm:text-lg tracking-wide uppercase leading-tight drop-shadow-xs">
                    Wedding Celebrations
                  </h4>
                  <p className="text-white/85 text-xs sm:text-[13px] mt-0.5">
                    A perfect setting for your special day.
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E5B63A] transition shadow-md shrink-0 ml-3">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Bottom 2 Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-grow">
              
              {/* Card 1: Parties & Gatherings */}
              <div 
                onClick={onEnquireClick}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group h-[200px] sm:h-auto flex flex-col justify-end p-4 sm:p-5 bg-stone-900 cursor-pointer"
              >
                <img
                  src="https://i.pinimg.com/736x/70/ff/f8/70fff8e3ed60a4deea286c3ebead4a1c.jpg"
                  alt="Birthday Parties and Celebrations at Gram Bangla"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide uppercase leading-tight drop-shadow-xs">
                      Parties & Gatherings
                    </h4>
                    <p className="text-white/85 text-[11px] sm:text-xs mt-0.5 leading-snug">
                      Birthdays, anniversaries & private functions.
                    </p>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E5B63A] transition shadow-md shrink-0 ml-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 2: Corporate Events */}
              <div 
                onClick={onEnquireClick}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group h-[200px] sm:h-auto flex flex-col justify-end p-4 sm:p-5 bg-stone-900 cursor-pointer"
              >
                <img
                  src="https://i.pinimg.com/736x/db/9e/7c/db9e7cf996b6a039d3609013a1442ec5.jpg"
                  alt="Gram Bangla Corporate Events and Meeting Rooms"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide uppercase leading-tight drop-shadow-xs">
                      Corporate Events
                    </h4>
                    <p className="text-white/85 text-[11px] sm:text-xs mt-0.5 leading-snug">
                      Meetings, conferences & team events.
                    </p>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E5B63A] transition shadow-md shrink-0 ml-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Strip of 5 Venue Spaces + 1 Gold Highlight Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5 items-stretch">
          
          {venueSpaces.map((space, index) => (
            <div
              key={index}
              onClick={onEnquireClick}
              className="bg-white hover:bg-white/95 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex items-start gap-2.5 sm:gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#F7EFE9] border border-[#EEDFD2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                {space.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="font-bold text-stone-900 text-xs sm:text-[13px] leading-snug group-hover:text-[#8B3A2B] transition-colors">
                  {space.title}
                </h5>
                <p className="text-stone-500 text-[10px] sm:text-[11px] mt-0.5 leading-tight">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Highlight Card: "Beautiful Spaces for Every Occasion" */}
          <div
            onClick={onEnquireClick}
            className="bg-[#F5EDE4] hover:bg-[#EFE4D8] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-[#E3D4C4] shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex items-start gap-2.5 sm:gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-[#E2EBE5] border border-[#CDE0D4] flex items-center justify-center shrink-0 text-[#2E6B4F] mt-0.5">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-hero-serif italic font-semibold text-stone-900 text-xs sm:text-[13px] leading-tight">
                Beautiful Spaces
              </div>
              <div className="font-hero-serif italic text-stone-700 text-[10px] sm:text-[11px] leading-tight mt-0.5">
                for Every Occasion
              </div>
              <span className="w-7 h-[1.5px] bg-[#8B3A2B] inline-block mt-1" />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
