import React, { useState } from 'react';
import { X, ZoomIn, Image as ImageIcon, Eye } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  items: GalleryItem[];
  onNavigateToAdmin?: () => void;
}

// Top-Left Botanical Palm Leaves
const PalmLeavesTopLeft: React.FC = () => (
  <svg
    className="absolute -top-4 -left-4 sm:top-0 sm:left-0 w-44 sm:w-64 md:w-80 lg:w-96 h-auto pointer-events-none z-10 drop-shadow-sm select-none"
    viewBox="0 0 380 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="palmGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D4D2B" />
        <stop offset="50%" stopColor="#4A7543" />
        <stop offset="100%" stopColor="#253E23" />
      </linearGradient>
      <linearGradient id="palmGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3E633A" />
        <stop offset="60%" stopColor="#5B8752" />
        <stop offset="100%" stopColor="#32502E" />
      </linearGradient>
      <linearGradient id="palmGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4C7047" />
        <stop offset="70%" stopColor="#6C9761" />
        <stop offset="100%" stopColor="#3B5936" />
      </linearGradient>
    </defs>
    {/* Main Palm Stem 1 */}
    <path
      d="M-20 -10 C40 20, 140 70, 240 180"
      stroke="#2D452B"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Leaflets along Stem 1 */}
    <path d="M15 8 C30 -20, 50 -10, 40 18" fill="url(#palmGrad1)" />
    <path d="M40 20 C65 -15, 85 -5, 70 30" fill="url(#palmGrad2)" />
    <path d="M70 32 C105 -5, 125 10, 100 48" fill="url(#palmGrad1)" />
    <path d="M100 50 C145 15, 165 35, 135 70" fill="url(#palmGrad2)" />
    <path d="M135 72 C185 40, 205 65, 168 95" fill="url(#palmGrad1)" />
    <path d="M168 97 C220 75, 240 105, 198 128" fill="url(#palmGrad2)" />
    <path d="M198 130 C250 120, 265 150, 225 160" fill="url(#palmGrad1)" />
    <path d="M225 162 C265 165, 270 195, 240 180" fill="url(#palmGrad3)" />

    {/* Downward leaflets on Stem 1 */}
    <path d="M30 15 C20 45, 40 55, 52 28" fill="url(#palmGrad2)" />
    <path d="M60 28 C50 70, 75 80, 85 45" fill="url(#palmGrad1)" />
    <path d="M90 46 C80 95, 110 105, 118 65" fill="url(#palmGrad3)" />
    <path d="M125 68 C115 125, 150 135, 152 90" fill="url(#palmGrad2)" />
    <path d="M160 92 C150 155, 185 165, 184 118" fill="url(#palmGrad1)" />
    <path d="M192 122 C185 185, 218 195, 212 148" fill="url(#palmGrad2)" />

    {/* Stem 2 (Shorter secondary frond) */}
    <path
      d="M-10 10 C30 50, 100 110, 170 190"
      stroke="#283E26"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path d="M15 25 C10 60, 28 70, 32 40" fill="url(#palmGrad3)" />
    <path d="M40 48 C35 90, 58 100, 62 65" fill="url(#palmGrad1)" />
    <path d="M70 75 C65 125, 92 135, 96 95" fill="url(#palmGrad2)" />
    <path d="M102 108 C100 160, 130 170, 132 130" fill="url(#palmGrad1)" />
    <path d="M136 142 C135 190, 165 200, 165 168" fill="url(#palmGrad3)" />
  </svg>
);

// Bottom-Right Botanical Palm Leaves
const PalmLeavesBottomRight: React.FC = () => (
  <svg
    className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 w-44 sm:w-60 md:w-72 lg:w-84 h-auto pointer-events-none z-10 drop-shadow-sm select-none"
    viewBox="0 0 340 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="palmGradBR1" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#253E23" />
        <stop offset="50%" stopColor="#436C3D" />
        <stop offset="100%" stopColor="#2E4E2C" />
      </linearGradient>
      <linearGradient id="palmGradBR2" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#365732" />
        <stop offset="70%" stopColor="#557F4D" />
        <stop offset="100%" stopColor="#2B4628" />
      </linearGradient>
    </defs>
    {/* Upward Arching Stem */}
    <path
      d="M360 300 C280 230, 180 160, 90 60"
      stroke="#283E26"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Leaflets spreading upward and left */}
    <path d="M100 70 C70 40, 60 70, 92 88" fill="url(#palmGradBR1)" />
    <path d="M125 95 C90 60, 80 95, 115 115" fill="url(#palmGradBR2)" />
    <path d="M155 125 C115 85, 105 125, 142 148" fill="url(#palmGradBR1)" />
    <path d="M190 158 C145 115, 135 160, 175 185" fill="url(#palmGradBR2)" />
    <path d="M230 195 C180 150, 170 200, 215 225" fill="url(#palmGradBR1)" />
    <path d="M275 235 C220 190, 210 245, 255 265" fill="url(#palmGradBR2)" />

    {/* Downward Leaflets */}
    <path d="M120 85 C145 50, 165 75, 138 105" fill="url(#palmGradBR2)" />
    <path d="M150 115 C180 75, 205 105, 172 138" fill="url(#palmGradBR1)" />
    <path d="M185 148 C220 105, 250 140, 210 175" fill="url(#palmGradBR2)" />
    <path d="M225 185 C265 140, 295 180, 255 215" fill="url(#palmGradBR1)" />
  </svg>
);

// Traditional Bengal Terracotta Alpana / Mandala Watermark
const TerracottaMandala: React.FC = () => (
  <svg
    className="absolute -left-12 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 w-64 sm:w-84 md:w-[420px] lg:w-[480px] h-auto pointer-events-none z-0 text-[#A65836] opacity-[0.16] select-none"
    viewBox="0 0 400 400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Concentric Circles */}
    <circle cx="200" cy="200" r="185" strokeDasharray="3 4" strokeWidth="1.2" />
    <circle cx="200" cy="200" r="172" strokeWidth="1.5" />
    <circle cx="200" cy="200" r="156" strokeWidth="1.8" />
    <circle cx="200" cy="200" r="130" strokeWidth="1.4" />
    <circle cx="200" cy="200" r="95" strokeWidth="1.6" />
    <circle cx="200" cy="200" r="60" strokeWidth="1.4" />
    <circle cx="200" cy="200" r="28" fill="currentColor" fillOpacity="0.12" strokeWidth="2" />
    <circle cx="200" cy="200" r="10" fill="currentColor" fillOpacity="0.4" />

    {/* Outer Lotus Scallops (24 petals) */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      return (
        <path
          key={`scallop-${i}`}
          d="M200 28 C206 18, 214 18, 220 28"
          transform={`rotate(${angle} 200 200)`}
          strokeWidth="1.4"
        />
      );
    })}

    {/* Petal Ring (16 petals) */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      return (
        <g key={`petal-${i}`} transform={`rotate(${angle} 200 200)`}>
          <path
            d="M200 70 C185 105, 185 125, 200 130 C215 125, 215 105, 200 70 Z"
            strokeWidth="1.3"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <circle cx="200" cy="62" r="3" fill="currentColor" />
        </g>
      );
    })}

    {/* Diamond & Zigzag Pattern Ring */}
    {Array.from({ length: 32 }).map((_, i) => {
      const angle = (i * 360) / 32;
      return (
        <path
          key={`zigzag-${i}`}
          d="M200 144 L204 150 L200 156 L196 150 Z"
          transform={`rotate(${angle} 200 200)`}
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.08"
        />
      );
    })}

    {/* Radial spokes / Sun rays */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      return (
        <line
          key={`spoke-${i}`}
          x1="200"
          y1="100"
          x2="200"
          y2="130"
          transform={`rotate(${angle} 200 200)`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// Rolling Sand Dunes / Landscape Curves at bottom
const BottomLandscapeWaves: React.FC = () => (
  <div className="absolute bottom-0 inset-x-0 pointer-events-none z-0 overflow-hidden leading-none select-none">
    <svg
      className="w-full h-16 sm:h-24 md:h-32 text-[#EFE4D6]"
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 60 C320 110, 680 20, 1080 75 C1240 95, 1360 80, 1440 65 L1440 120 L0 120 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M0 85 C240 40, 560 110, 920 60 C1140 30, 1320 70, 1440 50 L1440 120 L0 120 Z"
        fill="#E8DCB"
        fillOpacity="0.75"
      />
    </svg>
  </div>
);

// Scenic Background Composite Inside Empty Card (Authentic Bengal Terracotta Cottage & Potted Banana Plant)
const ScenicEmptyCardBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* Left Scenic Element: Terracotta Urn & Lush Tropical Banana Leaves */}
    <div className="absolute -bottom-2 -left-2 sm:bottom-0 sm:left-4 w-40 sm:w-56 md:w-72 lg:w-80 h-auto opacity-80 sm:opacity-90">
      <svg
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="bananaLeaf1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48753B" />
            <stop offset="70%" stopColor="#6C9F59" />
            <stop offset="100%" stopColor="#3B6030" />
          </linearGradient>
          <linearGradient id="bananaLeaf2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3A602F" />
            <stop offset="60%" stopColor="#5B874C" />
            <stop offset="100%" stopColor="#2E4D25" />
          </linearGradient>
          <linearGradient id="terracottaUrn" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C3A24" />
            <stop offset="35%" stopColor="#B35539" />
            <stop offset="70%" stopColor="#C46749" />
            <stop offset="100%" stopColor="#7E311D" />
          </linearGradient>
          <linearGradient id="brickPlinth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C87A5B" />
            <stop offset="100%" stopColor="#9C5237" />
          </linearGradient>
        </defs>

        {/* Banana Leaf 1 (Left arching) */}
        <path
          d="M120 200 C80 140, 20 120, 10 90 C5 75, 25 70, 45 85 C80 110, 120 155, 125 200 Z"
          fill="url(#bananaLeaf1)"
        />
        {/* Banana Leaf 2 (Tall upright center-left) */}
        <path
          d="M130 200 C110 110, 85 45, 95 15 C105 10, 125 25, 130 65 C138 115, 140 165, 135 200 Z"
          fill="url(#bananaLeaf2)"
        />
        {/* Banana Leaf 3 (Right arching) */}
        <path
          d="M135 200 C155 125, 195 90, 230 75 C240 70, 245 85, 230 100 C195 130, 160 170, 142 200 Z"
          fill="url(#bananaLeaf1)"
        />
        {/* Leaf Ribs */}
        <path d="M120 200 C80 140, 20 120, 10 90" stroke="#7CB468" strokeWidth="1.8" />
        <path d="M130 200 C110 110, 85 45, 95 15" stroke="#89C474" strokeWidth="2" />
        <path d="M135 200 C155 125, 195 90, 230 75" stroke="#7CB468" strokeWidth="1.8" />

        {/* Handcrafted Terracotta Urn / Planter */}
        {/* Urn Rim */}
        <ellipse cx="132" cy="205" rx="38" ry="7" fill="#782E1A" />
        <path
          d="M94 205 C90 225, 80 250, 95 285 C102 298, 162 298, 169 285 C184 250, 174 225, 170 205 Z"
          fill="url(#terracottaUrn)"
        />
        {/* Traditional Engraved Bengali Folk Pottery Motifs */}
        <ellipse cx="132" cy="225" rx="32" ry="4" stroke="#682412" strokeWidth="1.5" fill="none" />
        <path
          d="M100 240 Q116 232 132 240 T164 240"
          stroke="#F3D0B8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M98 252 Q115 244 132 252 T166 252"
          stroke="#F3D0B8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M102 265 L110 272 L118 265 L126 272 L134 265 L142 272 L150 265 L158 272 L162 265"
          stroke="#5E2010"
          strokeWidth="1.6"
          fill="none"
        />

        {/* Terracotta Brick Pedestal Steps */}
        <rect x="70" y="295" width="124" height="15" rx="2" fill="url(#brickPlinth)" />
        <rect x="50" y="308" width="164" height="12" rx="2" fill="#8C442A" />
      </svg>
    </div>

    {/* Right Scenic Element: Rustic Bengal Terracotta Heritage Resort Cottage */}
    <div className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-2 w-56 sm:w-80 md:w-96 lg:w-[440px] h-auto opacity-75 sm:opacity-85">
      <svg
        viewBox="0 0 420 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="roofTile" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A24B32" />
            <stop offset="50%" stopColor="#873520" />
            <stop offset="100%" stopColor="#6C2816" />
          </linearGradient>
          <linearGradient id="verandahWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAD8C3" />
            <stop offset="100%" stopColor="#D5C0A7" />
          </linearGradient>
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFB300" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Background Trees & Palms Behind Cottage */}
        <ellipse cx="360" cy="80" rx="45" ry="55" fill="#5A7D52" fillOpacity="0.35" />
        <ellipse cx="300" cy="70" rx="40" ry="48" fill="#4B6E44" fillOpacity="0.3" />
        <ellipse cx="230" cy="85" rx="35" ry="42" fill="#5A7D52" fillOpacity="0.25" />

        {/* Sloping Clay Tile Roof (Chala Architecture) */}
        <polygon points="120,135 410,135 380,85 170,85" fill="url(#roofTile)" />
        {/* Roof tile lines */}
        <line x1="170" y1="85" x2="120" y2="135" stroke="#561E10" strokeWidth="2" />
        <line x1="210" y1="85" x2="175" y2="135" stroke="#561E10" strokeWidth="1.2" />
        <line x1="250" y1="85" x2="225" y2="135" stroke="#561E10" strokeWidth="1.2" />
        <line x1="290" y1="85" x2="275" y2="135" stroke="#561E10" strokeWidth="1.2" />
        <line x1="330" y1="85" x2="325" y2="135" stroke="#561E10" strokeWidth="1.2" />
        <line x1="380" y1="85" x2="410" y2="135" stroke="#561E10" strokeWidth="2" />
        {/* Roof Ridge Cap */}
        <rect x="165" y="80" width="220" height="7" rx="3" fill="#B7583E" />

        {/* Verandah Wall Base */}
        <rect x="135" y="135" width="270" height="110" fill="url(#verandahWall)" />

        {/* Deep Verandah Shadow Inset */}
        <rect x="145" y="145" width="250" height="90" fill="#42352B" fillOpacity="0.4" />

        {/* Wooden Verandah Pillars */}
        <rect x="155" y="135" width="10" height="110" fill="#6A4533" />
        <rect x="215" y="135" width="10" height="110" fill="#6A4533" />
        <rect x="275" y="135" width="10" height="110" fill="#6A4533" />
        <rect x="335" y="135" width="10" height="110" fill="#6A4533" />
        <rect x="385" y="135" width="10" height="110" fill="#6A4533" />

        {/* Glowing Warm Porch Lanterns */}
        <circle cx="185" cy="165" r="24" fill="url(#lanternGlow)" />
        <rect x="182" y="158" width="6" height="12" rx="2" fill="#FFE57F" />
        <circle cx="305" cy="165" r="24" fill="url(#lanternGlow)" />
        <rect x="302" y="158" width="6" height="12" rx="2" fill="#FFE57F" />

        {/* Verandah Terracotta Plinth Steps */}
        <rect x="120" y="245" width="300" height="16" fill="#C27A5F" />
        <rect x="100" y="260" width="320" height="18" fill="#A85E44" />
      </svg>
    </div>

    {/* Soft Center Atmospheric Mist / Radial Diffuser to keep text 100% crisp and readable */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0]/90 via-[#FAF6F0]/85 to-[#FAF6F0]/90 pointer-events-none" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,250,245,0.95)_0%,_rgba(250,245,238,0.7)_60%,_rgba(245,235,223,0.3)_100%)] pointer-events-none" />
  </div>
);

export const GallerySection: React.FC<GallerySectionProps> = ({
  items,
  onNavigateToAdmin,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'resort', label: 'Resort & Rooms' },
    { id: 'dining', label: 'Rasoi' },
    { id: 'heritage', label: 'Bankura Heritage' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-b from-[#FAF5EE] via-[#F8F2E8] to-[#F3E8DB] py-12 sm:py-16 px-4 sm:px-6 lg:px-10 xl:px-14 overflow-hidden">
      {/* Botanical Corner Elements & Background Artwork */}
      <PalmLeavesTopLeft />
      <PalmLeavesBottomRight />
      <TerracottaMandala />
      <BottomLandscapeWaves />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header with Terracotta Visual Experience Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2.5">
            <span className="w-8 sm:w-16 h-[1.5px] bg-[#9E3E26]/40" />
            <span className="text-[#8B3A26] font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              Visual Experience
            </span>
            <span className="w-8 sm:w-16 h-[1.5px] bg-[#9E3E26]/40" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#221B18] tracking-tight mb-3">
            Resort & Surroundings Gallery
          </h1>

          <p className="text-[#655B54] font-serif-custom text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            A glimpse into our terracotta architectural motifs, serene garden verandahs, authentic Bengali thali presentations, and nearby historic monuments.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1 px-2 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#85341D] text-white shadow-md shadow-[#85341D]/25 ring-2 ring-[#85341D]/20 scale-[1.02]'
                    : 'bg-white/95 text-[#85341D] hover:bg-[#85341D]/10 border border-[#85341D]/35 hover:border-[#85341D]/60 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Center Content: Empty State Card OR Themed Photo Grid */}
        {filteredItems.length === 0 ? (
          /* Empty State Scenic Card matching the user's uploaded theme image */
          <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-[#DFD1C2] overflow-hidden shadow-xl shadow-[#85341D]/5 bg-[#FAF6F0] min-h-[380px] sm:min-h-[420px] flex items-center justify-center p-6 sm:p-10 my-2">
            <ScenicEmptyCardBackground />

            {/* Centered Message & Action Button */}
            <div className="relative z-10 text-center max-w-lg mx-auto py-8 px-4 flex flex-col items-center">
              {/* Frosted Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 backdrop-blur-md border border-[#DFCFC0] flex items-center justify-center text-[#85341D] shadow-sm mb-4">
                <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.6]" />
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#221B18] mb-2 tracking-wide">
                Gallery Is Currently Empty
              </h2>

              {/* Subtitle */}
              <p className="text-[#655B54] text-xs sm:text-sm leading-relaxed max-w-md">
                No photos to display in this category.
              </p>
            </div>
          </div>
        ) : (
          /* Themed Photo Grid when photos exist */
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-[#DFD1C2]/90 flex flex-col justify-end"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                  {/* Content Label */}
                  <div className="relative z-10 p-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#F0C987] block mb-1">
                      {item.category === 'resort'
                        ? 'Resort & Stay'
                        : item.category === 'dining'
                        ? 'Gram Bangla Rasoi'
                        : 'Bankura Tourism'}
                    </span>
                    <h3 className="text-sm font-bold leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100">
                    <ZoomIn className="w-4 h-4 text-stone-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1F1916] rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2.5 rounded-full hover:bg-[#85341D] transition cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/60">
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#251E1A] text-white flex justify-between items-center border-t border-stone-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#F0C987] block mb-0.5">
                  {lightboxItem.category === 'resort'
                    ? 'Resort & Stay'
                    : lightboxItem.category === 'dining'
                    ? 'Gram Bangla Rasoi'
                    : 'Bankura Tourism'}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold">
                  {lightboxItem.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
