import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Compass, Heart, Users as UsersIcon, Sun } from 'lucide-react';

interface AboutWarmthProps {
  onContactClick: () => void;
  onRoomsClick: () => void;
  onDiningClick: () => void;
}

export const AboutWarmth: React.FC<AboutWarmthProps> = ({
  onContactClick,
  onRoomsClick,
  onDiningClick,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <section className="pt-10 sm:pt-14 lg:pt-18 pb-16 sm:pb-20 lg:pb-24 bg-[#FAF6F0] text-stone-900 relative overflow-hidden">
      
      {/* Delicate Watermark Botanical Foliage in Background */}
      <div className="absolute top-2 left-1/3 w-64 md:w-80 pointer-events-none select-none opacity-25 z-0">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto animate-pulse" style={{ animationDuration: '8s' }}>
          <path d="M40 90 C70 50, 120 40, 170 20" stroke="#3A5A40" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M80 65 C95 45, 125 45, 115 65 C105 85, 75 75, 80 65 Z" fill="#4A6B53" opacity="0.6" />
          <path d="M120 50 C140 30, 165 35, 155 55 C145 70, 115 65, 120 50 Z" fill="#4A6B53" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center">
          
          {/* ================= LEFT VISUAL COMPOSITION ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative pt-14 sm:pt-16 pb-6">
            
            {/* Top-Left Handwritten Script: "More Than a Stay, A Feeling" */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute top-0 left-2 sm:left-4 z-30 select-none group cursor-default"
            >
              <div className="font-script text-3xl sm:text-4xl lg:text-[36px] leading-[1.05] text-[#1E3326] -rotate-3 font-bold drop-shadow-xs transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-105">
                <div className="text-[#1E3326]">More</div>
                <div className="pl-2 text-[#233F30]">Than a Stay</div>
                <div className="pl-4 text-[#8B3A2B]">A Feeling</div>
              </div>
              {/* Animated Terracotta Underline Stroke */}
              <svg className="w-28 sm:w-32 h-3 mt-1 ml-2 overflow-visible" viewBox="0 0 100 10" fill="none">
                <motion.path 
                  d="M2 7 C25 2, 65 3, 98 6" 
                  stroke="#9E3E26" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>
            </motion.div>

            {/* Visual Cards Cluster */}
            <div className="relative pb-5">
              {/* Grid of Two Visual Cards with Interactive Lift */}
              <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-5 items-center">
                
                {/* CARD 1: Resort Pool & Sunset (Left) */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={onRoomsClick}
                  className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-2xl bg-stone-900 aspect-[3.5/4.9] group border-[3px] border-white/90 cursor-pointer"
                >
                  <picture className="w-full h-full block">
                    <source srcSet="/images/swim.webp" type="image/webp" />
                    <img
                      src="/images/swim.webp"
                      alt="Gram Bangla Resort Swimming Pool at Sunset"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[1.02]"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80";
                      }}
                    />
                  </picture>
                  
                  {/* Subtle Sun Flare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-amber-400/10 pointer-events-none" />

                  {/* Water Shimmer Highlight on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </motion.div>

                {/* CARD 2: Dining Room & Restaurant (Right) */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={onDiningClick}
                  className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-2xl bg-stone-900 aspect-[3.5/4.9] group border-[3px] border-white/90 cursor-pointer"
                >
                  <picture className="w-full h-full block">
                    <source srcSet="/images/bar.webp" type="image/webp" />
                    <img
                      src="/images/bar.webp"
                      alt="Gram Bangla Restaurant & Dining Room"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.98]"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
                      }}
                    />
                  </picture>
                  
                  {/* Warm Amber Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A1408]/90 via-black/30 to-transparent" />
                  
                  {/* Script Calligraphy Overlay: Good Food Brings People Together */}
                  <div className="absolute bottom-3.5 left-3 right-3 z-10 select-none">
                    <div className="font-script text-white text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-[1.05] -rotate-2 drop-shadow-md font-medium group-hover:text-[#FDE68A] transition-colors">
                      <div>Good Food</div>
                      <div>Brings People Together</div>
                    </div>
                    {/* Glowing White Brush Line */}
                    <svg className="w-24 sm:w-28 h-2 mt-0.5" viewBox="0 0 120 8" fill="none">
                      <path d="M2 5 C30 1, 80 2, 118 5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>

              </div>

              <div className="absolute bottom-0 left-4 right-4 sm:left-10 sm:right-6 z-20 translate-y-1/2">
                <div className="bg-gradient-to-r from-[#F5E8DC] via-[#EEDFD0] to-[#F5E8DC] text-[#4A3B2E] text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.2em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-center shadow-md border border-[#DFCBB7] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <span 
                    onMouseEnter={() => setActiveTag('nature')}
                    onMouseLeave={() => setActiveTag(null)}
                    className={`cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeTag === 'nature' ? 'bg-[#2D6A4F] text-white scale-105 shadow-xs' : 'hover:text-[#2D6A4F]'}`}
                  >
                    NATURE
                  </span>
                  <span className="text-[#8B3A2B]/40 font-normal">|</span>
                  <span 
                    onMouseEnter={() => setActiveTag('food')}
                    onMouseLeave={() => setActiveTag(null)}
                    className={`cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeTag === 'food' ? 'bg-[#9E3E26] text-white scale-105 shadow-xs' : 'hover:text-[#9E3E26]'}`}
                  >
                    FOOD
                  </span>
                  <span className="text-[#8B3A2B]/40 font-normal">|</span>
                  <span 
                    onMouseEnter={() => setActiveTag('people')}
                    onMouseLeave={() => setActiveTag(null)}
                    className={`cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeTag === 'people' ? 'bg-[#3A5A40] text-white scale-105 shadow-xs' : 'hover:text-[#3A5A40]'}`}
                  >
                    PEOPLE
                  </span>
                  <span className="text-[#8B3A2B]/40 font-normal">|</span>
                  <span 
                    onMouseEnter={() => setActiveTag('memories')}
                    onMouseLeave={() => setActiveTag(null)}
                    className={`cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeTag === 'memories' ? 'bg-[#8B3A2B] text-white scale-105 shadow-xs' : 'hover:text-[#8B3A2B]'}`}
                  >
                    MEMORIES
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN CONTENT ================= */}
          <div className="lg:col-span-6 xl:col-span-6 lg:pl-2 xl:pl-6">
            
            {/* Eyebrow Header: — • WELCOME TO GRAM BANGLA */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2.5px] bg-[#9E3E26] inline-block rounded-full" />
              <span className="w-2 h-2 rounded-full bg-[#9E3E26] inline-block animate-ping" style={{ animationDuration: '3s' }} />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#1E2E25] font-sans">
                WELCOME TO <span className="text-[#9E3E26] font-extrabold">GRAM BANGLA</span>
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-hero-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[44px] text-[#0A1A12] leading-[1.1] tracking-tight uppercase mb-4">
              A Peaceful Stay With The Warmth Of Bengal.
            </h2>

            {/* Subtext Description */}
            <p className="text-stone-600 font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed mb-6 max-w-xl">
              Designed around the character of Bankura, Gram Bangla brings together comfortable accommodation, great food, open spaces and a welcoming atmosphere for families, couples, and memorable celebrations.
            </p>

            {/* 4 Feature Badges (2x2 Grid matching exact reference design) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 mb-8">
              
              {/* 1. Swimming Pool */}
              <div 
                onClick={onRoomsClick}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#F1E7DA] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#8B4A2D]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4v10" />
                    <path d="M14 4v10" />
                    <path d="M9 8h5" />
                    <path d="M9 11.5h5" />
                    <path d="M5 18c2-1.2 4.5-1.2 6.5 0s4.5 1.2 6.5 0 4.5-1.2 6.5 0" />
                    <path d="M5 22c2-1.2 4.5-1.2 6.5 0s4.5 1.2 6.5 0 4.5-1.2 6.5 0" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-[15px] leading-tight group-hover:text-[#8B4A2D] transition-colors">
                    Swimming Pool
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-[13px] mt-1 leading-tight">
                    Relax, refresh & unwind
                  </p>
                </div>
              </div>

              {/* 2. Multi-Cuisine Restaurant */}
              <div 
                onClick={onDiningClick}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#DFEBE3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#244A37]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Fork */}
                    <path d="M7 5v7a2 2 0 0 0 2 2v9" />
                    <path d="M11 5v7a2 2 0 0 1-2 2" />
                    <path d="M9 5v9" />
                    {/* Knife */}
                    <path d="M18 5v18" />
                    <path d="M18 5a3.5 3.5 0 0 1 3.5 3.5v5.5a2 2 0 0 1-2 2H18" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-[15px] leading-tight group-hover:text-[#244A37] transition-colors">
                    Multi-Cuisine Restaurant
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-[13px] mt-1 leading-snug">
                    Bengali • Chinese • Tandoor <br />• Mughlai & Indian
                  </p>
                </div>
              </div>

              {/* 3. Banquets & Events */}
              <div 
                onClick={onContactClick}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#F6E8E1] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#8B4A2D]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10.5" cy="10.5" r="2.8" />
                    <circle cx="17.5" cy="10.5" r="2.8" />
                    <path d="M5 23v-2.5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4V23" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-[15px] leading-tight group-hover:text-[#8B4A2D] transition-colors">
                    Banquets & Events
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-[13px] mt-1 leading-snug">
                    Weddings • Parties • <br />Gatherings
                  </p>
                </div>
              </div>

              {/* 4. Bar & Lounge */}
              <div 
                onClick={onDiningClick}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#F2E7D5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#8B4A2D]" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 7h16l-8 9-8-9Z" />
                    <path d="M14 16v8" />
                    <path d="M10 24h8" />
                    <path d="M8 4l12 11" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-[15px] leading-tight group-hover:text-[#8B4A2D] transition-colors">
                    Bar & Lounge
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-[13px] mt-1 leading-tight">
                    Unwind with friends & family
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Row: CTA Button + EXPERIENCE + Script Signature */}
            <div className="flex items-center justify-between gap-4 pt-3 border-t border-stone-200/70 relative">
              
              {/* CTA & Experience Tag */}
              <div className="flex items-center gap-3 sm:gap-5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onRoomsClick}
                  className="bg-gradient-to-r from-[#9E3E26] to-[#85311C] hover:from-[#B0452C] hover:to-[#9E3E26] text-white font-bold py-3.5 px-6 sm:px-7 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer shrink-0"
                >
                  <span>Explore Our Resort</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="hidden sm:flex items-center gap-2.5">
                  <span className="w-6 h-[1.5px] bg-[#8B3A2B]/40 inline-block" />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold leading-tight">
                    <div className="text-stone-700">EXPERIENCE</div>
                    <div className="text-[#8B3A2B] font-medium">THE EXTRAORDINARY</div>
                  </div>
                </div>
              </div>

              {/* Bottom Right Handwritten Calligraphy Accent: "A Home Away From Home" */}
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="relative select-none shrink-0 pl-2 cursor-default"
              >
                {/* Delicate Palm Leaf Watermark behind script */}
                <div className="absolute -right-3 -bottom-4 w-20 pointer-events-none opacity-25">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#8B3A2B" strokeWidth="1.2">
                    <path d="M10 90 Q50 50 90 10 M50 50 Q70 30 80 15 M50 50 Q30 70 20 85 M50 50 Q60 60 70 70" />
                  </svg>
                </div>
                
                <div className="font-script text-base sm:text-lg md:text-xl text-stone-700 -rotate-3 text-right leading-tight drop-shadow-2xs transition-transform duration-300">
                  <div>A Home</div>
                  <div className="pr-1 text-stone-500 font-normal">Away</div>
                  <div className="text-[#9E3E26] font-bold">From Home</div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
