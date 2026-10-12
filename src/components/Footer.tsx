import React from 'react';
import { 
  ChevronRight, 
  BedDouble, 
  UtensilsCrossed, 
  Waves, 
  Wine, 
  Users, 
  PartyPopper, 
  Landmark, 
  Trees, 
  Monitor, 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import { GramBanglaLogo } from './GramBanglaLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Rooms', id: 'rooms' },
    { label: 'Restaurant & Menu', id: 'dining' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Bankura Tourist Spots', id: 'nearby' },
    { label: 'Contact & Directions', id: 'contact' },
  ];

  const facilities = [
    {
      title: 'Rooms & Cottages',
      icon: <BedDouble className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Multi-Cuisine Restaurant',
      icon: <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Swimming Pool',
      icon: <Waves className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Bar & Lounge',
      icon: <Wine className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Banquet Hall',
      icon: <Users className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Party Hall',
      icon: <PartyPopper className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Community Hall',
      icon: <Landmark className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Lawn & Outdoor Events',
      icon: <Trees className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'Meeting Hall',
      icon: <Monitor className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      title: 'EV Charging',
      icon: <Zap className="w-4 h-4 text-[#D4AF37]" />,
    },
  ];

  const exploreBankura = [
    {
      title: 'Bishnupur',
      desc: 'Terracotta Temples',
      image: 'https://i.pinimg.com/736x/b9/b3/1a/b9b31af62c88b58384f773b466831183.jpg',
    },
    {
      title: 'Mukutmanipur',
      desc: 'Dam & Scenic Beauty',
      image: 'https://i.pinimg.com/1200x/5f/31/19/5f31199e7a14991eb47415aac9352c4e.jpg',
    },
    {
      title: 'Susunia Hills',
      desc: 'Nature & Adventure',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSypGrkMuH8R96M5tGf4PPJUyID_pKv-Vs1QWxbP6zVww&s=10',
    },
    {
      title: 'Panchmura',
      desc: 'Terracotta Crafts',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPPanm7YYt6ycTecKp3nnkyZwMtHjfomLXiMSiLpw3Q&s=10',
    },
    {
      title: 'Joyrambati',
      desc: 'Spiritual Heritage',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <footer className="bg-[#0A261D] text-white relative overflow-hidden border-t-2 border-[#1E4336] pt-14 pb-10">
      
      {/* Decorative Botanical Watermark (Left Corner) */}
      <div className="absolute left-0 bottom-0 w-64 md:w-80 pointer-events-none select-none opacity-15 z-0">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M-20 320 C40 240, 100 220, 180 280 C100 200, 60 120, -20 320 Z" fill="#D4AF37" />
          <path d="M-40 280 C60 180, 140 180, 220 220 C140 140, 80 80, -40 280 Z" fill="#D4AF37" />
          <path d="M-10 200 C80 120, 180 140, 260 160 C160 100, 120 40, -10 200 Z" fill="#D4AF37" />
        </svg>
      </div>

      {/* Decorative Village Silhouette Watermark (Right Corner) */}
      <div className="absolute right-0 bottom-0 w-72 md:w-96 pointer-events-none select-none opacity-15 z-0">
        <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Palm Trees */}
          <path d="M340 250 Q335 150 350 80 Q320 60 280 90 Q340 50 350 30 Q360 50 420 90 Q380 60 350 80" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
          {/* Rural Hut */}
          <path d="M220 250 L220 190 L260 160 L300 190 L300 250 Z" fill="#D4AF37" opacity="0.3" />
          <path d="M210 190 L260 150 L310 190 Z" fill="#D4AF37" opacity="0.6" />
          {/* Sun disc */}
          <circle cx="260" cy="110" r="30" fill="#D4AF37" opacity="0.25" />
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* 5-Column Grid with Responsive Column Spanning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-12">
          
          {/* COLUMN 1: Brand & Identity */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3 space-y-4">
            
            {/* Logo */}
            <div className="space-y-1 overflow-hidden">
              <GramBanglaLogo 
                variant="dark" 
                textSize="text-lg sm:text-xl" 
                subtextSize="text-[9px] sm:text-[10px]" 
                iconSize="w-9 h-9 sm:w-10 sm:h-10"
              />
            </div>

            {/* Script Text */}
            <div className="pt-1">
              <p className="font-serif-custom italic text-lg sm:text-xl text-[#E8DCC4] tracking-wide font-normal">
                A Home Away From Home
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed font-sans max-w-sm">
              Your gateway to authentic rural Bengali culture, terracotta heritage, serene Mukutmanipur river breezes, and world-famous Bankura Pata delicacies. Stay. Dine. Celebrate. Experience Bankura.
            </p>

            {/* Bottom 4 Pillars Ribbon */}
            <div className="pt-2">
              <div className="flex items-center text-[9px] sm:text-[10px] xl:text-[10.5px] font-serif-custom tracking-[0.06em] text-[#D4AF37] uppercase font-medium whitespace-nowrap select-none">
                <span>NATURE</span>
                <span className="mx-1.5 text-[#D4AF37]/40 text-[9px]">|</span>
                <span>FOOD</span>
                <span className="mx-1.5 text-[#D4AF37]/40 text-[9px]">|</span>
                <span>PEOPLE</span>
                <span className="mx-1.5 text-[#D4AF37]/40 text-[9px]">|</span>
                <span>MEMORIES</span>
              </div>
            </div>

          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-2 xl:col-span-2 space-y-3">
            <div>
              <h4 className="font-display font-semibold text-sm sm:text-[15px] text-white tracking-wider uppercase">
                QUICK LINKS
              </h4>
              <div className="w-8 h-[2px] bg-[#D4AF37] mt-1 mb-4" />
            </div>

            <ul className="space-y-2 text-xs sm:text-[13px] text-white/80">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer group text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: OUR FACILITIES */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-3">
            <div>
              <h4 className="font-display font-semibold text-sm sm:text-[15px] text-white tracking-wider uppercase">
                OUR FACILITIES
              </h4>
              <div className="w-8 h-[2px] bg-[#D4AF37] mt-1 mb-4" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/80">
              {facilities.map((fac, idx) => (
                <li key={idx}>
                  <div className="flex items-center gap-2.5">
                    <span className="shrink-0 text-[#D4AF37]">
                      {fac.icon}
                    </span>
                    <span className="font-medium block leading-tight text-white/90">{fac.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: EXPLORE BANKURA */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-3">
            <div>
              <h4 className="font-display font-semibold text-sm sm:text-[15px] text-white tracking-wider uppercase">
                EXPLORE BANKURA
              </h4>
              <div className="w-8 h-[2px] bg-[#D4AF37] mt-1 mb-4" />
            </div>

            <ul className="space-y-3 text-xs sm:text-[13px]">
              {exploreBankura.map((place, idx) => (
                <li key={idx}>
                  <div 
                    onClick={() => onNavigate('nearby')}
                    className="flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]/40 shadow-xs bg-stone-800">
                      <img 
                        src={place.image} 
                        alt={place.title}
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500" 
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-xs sm:text-[13px] leading-tight group-hover:text-[#D4AF37] transition-colors">
                        {place.title}
                      </h5>
                      <p className="text-[10px] sm:text-[11px] text-white/60 mt-0.5 leading-tight">
                        {place.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: FRONT DESK */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-12 xl:col-span-3 space-y-4 lg:pt-4 xl:pt-0 lg:border-t lg:border-white/10 xl:border-t-0">
            <div>
              <h4 className="font-display font-semibold text-sm sm:text-[15px] text-white tracking-wider uppercase">
                FRONT DESK
              </h4>
              <div className="w-8 h-[2px] bg-[#D4AF37] mt-1 mb-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 gap-5 lg:gap-6 text-xs sm:text-[13px] text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[11px] text-white/60 block">Resort Location:</span>
                  <span className="leading-snug block">
                    Chinchura, Dhaldanga, Bankura – 722101<br />
                    West Bengal, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[11px] text-white/60 block">Front Desk & Reservations:</span>
                  <a href="tel:+919064485494" className="text-[#FDE8AE] hover:text-[#D4AF37] transition font-bold font-mono text-sm block">
                    +91 90644 85494
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[11px] text-white/60 block">Email Inquiries:</span>
                  <a 
                    href="mailto:grambanglaresortbankura2022@gmail.com" 
                    className="text-[#FDE8AE] hover:text-[#D4AF37] transition font-medium text-xs sm:text-[13px] block break-all lg:break-normal" 
                    title="grambanglaresortbankura2022@gmail.com"
                  >
                    grambanglaresortbankura2022@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[11px] text-white/60 block">Reception Hours:</span>
                  <span className="text-white font-medium text-xs sm:text-[13px] block">
                    8:00 AM – 10:00 PM
                  </span>
                  <div className="text-[11px] text-[#D4AF37] flex flex-wrap items-center gap-x-1.5 pt-0.5">
                    <span className="whitespace-nowrap">Check-in: <strong>11 AM</strong></span>
                    <span>•</span>
                    <span className="whitespace-nowrap">Check-out: <strong>10 AM</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <p>© 2026 Gram Bangla Resort & Restaurant, Bankura. All rights reserved.</p>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-white/40 hover:text-white/80 transition underline underline-offset-2 cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
          
          <div className="text-white/70 text-xs">
            Design & Developed by{' '}
            <a
              href="https://www.hintonevolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#f3d376] font-semibold underline underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              Hinton Evolution Tech
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
};
