import React, { useState, useEffect } from 'react';
import { 
  Hotel, 
  MapPin, 
  Phone, 
  Sparkles, 
  CalendarCheck, 
  Menu, 
  X, 
  ShieldCheck, 
  Lock,
  UtensilsCrossed, 
  Compass, 
  Image as ImageIcon, 
  Mail 
} from 'lucide-react';
import { GramBanglaLogo } from './GramBanglaLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  bookingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'dining', label: 'Rasoi' },
    { id: 'nearby', label: 'Nearby Bankura' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Notification Announcement Bar (Desktop & Tablet only) */}
      <div className="hidden md:block bg-[#78281B] text-white text-xs border-b border-black/10">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-2 flex justify-between items-center font-medium">
          {/* Left Contact & Address */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-stone-100 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              Chinchura, Dhaldanga, Bankura, West Bengal
            </span>
            <a
              href="tel:9064485494"
              className="hidden sm:flex items-center gap-1.5 text-stone-100 hover:text-white transition text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Room Service: <strong className="font-bold tracking-wide text-amber-200">9064485494</strong></span>
            </a>
          </div>

          {/* Right Admin Portal Access */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('admin')}
              className={`text-xs flex items-center gap-1.5 py-1 px-2.5 rounded transition cursor-pointer ${
                activeSection === 'admin'
                  ? 'text-[#FDE8AE] font-bold bg-white/15'
                  : 'text-stone-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-stone-200" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container - Full Screen Width */}
      <div className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex justify-between items-center h-18 sm:h-20 gap-2">
          {/* Logo & Resort Branding */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left group focus:outline-none cursor-pointer shrink-0"
          >
            <GramBanglaLogo
              variant="light"
              iconSize="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11"
              textSize="text-sm sm:text-base lg:text-lg xl:text-xl"
              subtextSize="text-[7.5px] sm:text-[8.5px] xl:text-[9.5px]"
              className="group-hover:scale-102 transition-transform"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 font-medium text-xs xl:text-sm shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#85341D]/10 text-[#85341D] font-bold shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50 font-medium'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <button
              onClick={onOpenBooking}
              className="bg-[#85341D] hover:bg-[#6D2816] text-white px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-xl shadow-xs font-semibold text-xs xl:text-sm transition transform hover:-translate-y-0.5 flex items-center gap-1.5 xl:gap-2 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Stay Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-[#78281B] focus:outline-none rounded-xl hover:bg-stone-100 transition cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed backdrop overlay covering background content */}
          <div
            className="fixed inset-0 top-[72px] sm:top-[80px] md:top-[114px] bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Full-Height Mobile Drawer */}
          <div className="fixed inset-x-0 top-[72px] sm:top-[80px] md:top-[114px] bottom-0 bg-white z-50 lg:hidden flex flex-col justify-between overflow-y-auto px-5 py-6 shadow-2xl border-t border-stone-200">
            {/* Navigation Links */}
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#8B3A2B]/10 text-[#8B3A2B] font-bold shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#8B3A2B]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Section */}
            <div className="pt-6 border-t border-stone-100 mt-auto space-y-3 pb-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#8B3A2B] hover:bg-[#6D2816] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
              >
                <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Your Stay Online</span>
              </button>

              <div className="text-center text-xs text-stone-500 pt-1 space-y-1">
                <p className="font-semibold text-stone-700">Gram Bangla Resort & Restaurant</p>
                <p className="text-[11px] text-stone-400">Chinchura, Dhaldanga, Bankura-722101</p>
                <div className="pt-2">
                  <button
                    onClick={() => handleLinkClick('admin')}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#8B3A2B] bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer active:scale-95"
                  >
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    <span>Staff & Admin Portal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
