import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'badge' | 'navbar' | 'emblem-only' | 'footer';
  iconSize?: string;
  textSize?: string;
  subtextSize?: string;
  showText?: boolean;
  alt?: string;
}

export const GramBanglaLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  iconSize = 'w-10 h-10 sm:w-11 sm:h-11',
  textSize = 'text-lg sm:text-xl md:text-2xl',
  subtextSize = 'text-[9.5px] sm:text-[10.5px]',
  showText = true,
  alt = 'Gram Bangla Resort & Restaurant',
}) => {
  const [imageError, setImageError] = useState(false);
  const isDark = variant === 'dark' || variant === 'footer';

  // Fallback vector SVG if image fails to load
  const fallbackEmblem = (
    <div className={`${iconSize} rounded-xl bg-[#0A261D] flex items-center justify-center p-2 border border-[#C99A45]/30 shrink-0 shadow-xs`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#C99A45]"
      >
        <path 
          d="M12 2 C12 7.5 7.5 12 2 12 C7.5 12 12 16.5 12 22 C12 16.5 16.5 12 22 12 C16.5 12 12 7.5 12 2 Z" 
          stroke="currentColor" 
          strokeWidth="2.4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );

  // Emblem image
  const emblemImage = !imageError ? (
    <div className={`${iconSize} shrink-0 rounded-full overflow-hidden shadow-xs border ${isDark ? 'border-white/15' : 'border-[#C99A45]/40'} bg-white flex items-center justify-center`}>
      <img
        src="/images/logo.jpeg"
        alt={alt}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  ) : fallbackEmblem;

  // Badge variant (circular stamp for vouchers/modals)
  if (variant === 'badge') {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-full border border-[#C99A45]/40 shadow-xs bg-white text-[#C99A45] p-0.5 ${className}`}>
        {!imageError ? (
          <img
            src="/images/logo.jpeg"
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {fallbackEmblem}
          </div>
        )}
      </div>
    );
  }

  // Emblem-only variant
  if (variant === 'emblem-only' || !showText) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {emblemImage}
      </div>
    );
  }

  // Complete Brand Lockup (Emblem + Typography)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      {emblemImage}

      <div className="flex flex-col justify-center text-left min-w-0">
        <span 
          className={`font-display font-black ${textSize} leading-none tracking-[0.06em] sm:tracking-[0.08em] uppercase ${
            isDark ? 'text-white' : 'text-[#0E2E22]'
          }`}
        >
          GRAMBANGLA
        </span>
        <span 
          className={`font-sans font-bold ${subtextSize} tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#C99A45] mt-1.5 leading-none`}
        >
          RESORT & RESTAURANT
        </span>
      </div>
    </div>
  );
};
