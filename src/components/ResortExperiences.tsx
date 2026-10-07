import React from 'react';
import { 
  Waves, 
  UtensilsCrossed, 
  Wine, 
  Trees, 
  Sparkles, 
  Zap 
} from 'lucide-react';

export const ResortExperiences: React.FC = () => {
  const experiences = [
    {
      id: 'pool',
      title: 'Swimming Pool',
      subtitle: 'Relax & Refresh',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <Waves className="w-5 h-5" />
        </div>
      ),
      emoji: '🏊'
    },
    {
      id: 'restaurant',
      title: 'Multi-Cuisine Restaurant',
      subtitle: 'Bengali • Chinese • Tandoor • South Indian',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <UtensilsCrossed className="w-5 h-5" />
        </div>
      ),
      emoji: '🍽️'
    },
    {
      id: 'bar',
      title: 'Bar & Lounge',
      subtitle: 'Unwind & Socialize',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <Wine className="w-5 h-5" />
        </div>
      ),
      emoji: '🍸'
    },
    {
      id: 'lawn',
      title: 'Lawn & Outdoor Spaces',
      subtitle: 'Perfect for Events',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <Trees className="w-5 h-5" />
        </div>
      ),
      emoji: '🌿'
    },
    {
      id: 'banquet',
      title: 'Banquets & Party Halls',
      subtitle: 'Celebrate Together',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <Sparkles className="w-5 h-5" />
        </div>
      ),
      emoji: '🎉'
    },
    {
      id: 'ev',
      title: 'EV Charging',
      subtitle: 'Travel Greener',
      iconUrl: (
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3 shadow-2xs group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5" />
        </div>
      ),
      emoji: '⚡'
    }
  ];

  return (
    <div className="my-12 sm:my-16 max-w-7xl mx-auto px-2">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[#C99A45] font-semibold text-xs sm:text-[13px] tracking-[0.25em] uppercase block mb-1.5">
          RESORT EXPERIENCES
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2E22] tracking-tight">
          More Than a Room
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-normal">
          Your stay also gives you access to a complete resort experience.
        </p>
      </div>

      {/* 6 Experience Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-[#C99A45]/60 transition-all duration-300 flex flex-col items-center text-center justify-start group cursor-default"
          >
            {/* Visual Icon */}
            <div className="text-2xl sm:text-3xl mb-2.5 transform group-hover:scale-110 transition-transform duration-300">
              {exp.emoji}
            </div>

            {/* Title */}
            <h3 className="font-bold text-[#0E2E22] text-xs sm:text-[14px] leading-snug mb-1.5">
              {exp.title}
            </h3>

            {/* Subtitle */}
            <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed">
              {exp.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
