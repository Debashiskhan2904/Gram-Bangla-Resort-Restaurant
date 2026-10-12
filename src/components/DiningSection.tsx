import React, { useState, useMemo, useRef } from 'react';
import { 
  Utensils, 
  Leaf, 
  Users, 
  Clock, 
  ChefHat, 
  Heart, 
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Flame,
  Soup,
  Coffee,
  Fish,
  Wheat,
  X
} from 'lucide-react';
import { MenuItem } from '../types';

interface DiningSectionProps {
  menu: MenuItem[];
}

export const DiningSection: React.FC<DiningSectionProps> = ({ menu }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const menuListRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Items', icon: '🍽️' },
    { id: 'noodles', label: '1. Noodle', icon: '🍜' },
    { id: 'indian-veg', label: '2. Indian Veg.', icon: '🥘' },
    { id: 'south-indian', label: '3. South Indian', icon: '🥞' },
    { id: 'indian-dal', label: '4. Indian Dal', icon: '🍛' },
    { id: 'indian-non-veg', label: '5. Indian Nonveg.', icon: '🍗' },
    { id: 'mutton', label: '6. Mutton', icon: '🍖' },
    { id: 'tandoori-kabab', label: '7. Tandoori Kabab', icon: '🔥' },
    { id: 'chinese-gravy', label: '8. Chinese Gravy', icon: '🥢' },
    { id: 'chinese-snacks', label: '9. Chinese Snacks', icon: '🥡' },
    { id: 'salad-soup', label: '10. Salad, Raita & Soup', icon: '🥗' },
    { id: 'breakfast-rolls', label: '11. Breakfast & Roll', icon: '🥪' },
    { id: 'thali-fish', label: '12. Lunch, Thali & Fish Egg', icon: '🍚' },
    { id: 'breads-roti', label: '13. Assorted Bread', icon: '🫓' },
    { id: 'biryani-rice', label: '14. Biriyani', icon: '🍛' },
  ];

  const cuisineHighlights = [
    {
      id: 'thali-fish',
      badge: 'AUTHENTIC BENGAL',
      title: 'THALIS & FRESH FISH',
      subtitle: 'Shorshe Ilish, Katla, Rui Postu & Traditional Thalis',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'mutton',
      badge: 'HERITAGE RECIPE',
      title: 'MUTTON SPECIALS',
      subtitle: 'Dak Bungalow, Handi & Bankura Kosha Mangsho',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'tandoori-kabab',
      badge: 'CLAY OVEN CHARRED',
      title: 'TANDOOR & KABAB',
      subtitle: 'Reshmi, Pahadi, Banjara & Charcoal Murgh',
      image: 'https://i.pinimg.com/1200x/0a/58/8c/0a588c4e308e31631d166ffc1b3cd6c8.jpg',
    },
    {
      id: 'biryani-rice',
      badge: 'AROMATIC DUM',
      title: 'BIRYANI & POLAO',
      subtitle: 'Kolkata Dum Biryani, Kashmiri & Badshahi Pulao',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (menuListRef.current) {
      menuListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSub = item.subCategory?.toLowerCase().includes(query) || false;
        const matchesCat = item.categoryName?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesSub && !matchesCat) return false;
      }

      return true;
    });
  }, [menu, activeCategory, dietFilter, searchQuery]);

  // Group items by category for clear presentation
  const groupedMenu = useMemo(() => {
    const groups: { [key: string]: MenuItem[] } = {};
    filteredMenu.forEach((item) => {
      const catKey = item.categoryName || item.category;
      if (!groups[catKey]) {
        groups[catKey] = [];
      }
      groups[catKey].push(item);
    });
    return groups;
  }, [filteredMenu]);

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 sm:py-16 text-stone-900 relative overflow-hidden">
      
      {/* Decorative Traditional Motifs */}
      <div className="absolute top-4 left-2 sm:left-6 opacity-20 pointer-events-none hidden md:block">
        <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20 C60 50 80 120 40 200 C30 140 10 70 20 20 Z" fill="#2E6B4F" opacity="0.4" />
          <path d="M50 60 C90 90 120 160 80 230 C60 170 30 110 50 60 Z" fill="#8B3A2B" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-4 right-2 sm:right-6 opacity-20 pointer-events-none hidden md:block">
        <svg width="140" height="240" viewBox="0 0 140 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M120 20 C80 50 60 120 100 200 C110 140 130 70 120 20 Z" fill="#2E6B4F" opacity="0.4" />
          <path d="M90 60 C50 90 20 160 60 230 C80 170 110 110 90 60 Z" fill="#C99A45" opacity="0.35" />
        </svg>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        
        {/* Top Header Row */}
        <div className="relative text-center max-w-5xl mx-auto mb-10 sm:mb-12">
          
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#8B3A2B]" />
            <span className="text-[#8B3A2B] font-bold text-xs sm:text-sm tracking-[0.24em] uppercase">
              GRAM BANGLA RESORT RESTAURANT
            </span>
            <span className="w-8 h-[1px] bg-[#8B3A2B]" />
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0A1A12] leading-tight tracking-wide uppercase mt-1 mb-4">
            OUR COMPLETE FOOD MENU
          </h1>


          <div className="mt-3 inline-block">
            <p className="font-serif-custom italic text-xl sm:text-2xl text-[#0E2E22] font-semibold">
              Authentic Flavours • Fresh Daily Catch • Made with Care
            </p>
            <div className="w-20 h-[2px] bg-[#8B3A2B] mx-auto mt-1.5 rounded-full" />
          </div>
        </div>

        {/* Feature Highlights Ribbon */}
        <div className="bg-[#0A261D] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-white/10 mb-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y md:divide-y-0 lg:divide-x divide-white/10">
            
            <div className="flex items-start gap-3.5 pt-4 md:pt-0 lg:px-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  13 MENU SECTIONS
                </h4>
                <p className="text-[#D4AF37] text-xs font-semibold mt-0.5">
                  Over 160+ Fresh Delicacies
                </p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  Bengali, Chinese, Tandoori, Mughlai & Breakfast
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 lg:px-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  FRESHLY PREPARED
                </h4>
                <p className="text-[#D4AF37] text-xs font-semibold mt-0.5">
                  Pure Mustard Oil & Desi Spices
                </p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  Cooked fresh for every order
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 lg:px-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  DINE-IN & GROUP FEASTS
                </h4>
                <p className="text-[#D4AF37] text-xs font-semibold mt-0.5">
                  Courtyard & AC Dining Hall
                </p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  Family gatherings, tours & special occasions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 md:pt-0 lg:px-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-[13px] tracking-wider uppercase text-white">
                  SERVICE TIMINGS
                </h4>
                <p className="text-[#D4AF37] text-xs font-semibold mt-0.5">
                  7:30 AM – 10:30 PM
                </p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  Breakfast • Lunch • Evening Snacks • Dinner
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Feature Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 max-w-6xl mx-auto">
          {cuisineHighlights.map((card) => (
            <div
              key={card.id}
              onClick={() => handleSelectCategory(card.id)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-4 border border-black/10"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[#D4AF37] font-bold text-[10px] tracking-widest uppercase block">
                  {card.badge}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-wide uppercase mt-0.5">
                  {card.title}
                </h3>
                <p className="text-white/80 text-[11px] line-clamp-1 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Search & Filter Toolbar */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-stone-200/80 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any dish (e.g. Mutton, Postu, Hakka, Biryani, Naan)..."
                className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B3A2B] focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Diet Filter Switch */}
            <div className="flex items-center gap-1.5 w-full md:w-auto justify-center bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  dietFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  dietFilter === 'veg'
                    ? 'bg-[#2E6B4F] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Pure Veg
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  dietFilter === 'non-veg'
                    ? 'bg-[#8B3A2B] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Non-Veg
              </button>
            </div>

          </div>

          {/* 13 Category Quick-Filter Scroll/Grid */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#8B3A2B]" /> Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#8B3A2B] text-white shadow-sm scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Showcase */}
        <div ref={menuListRef} className="max-w-6xl mx-auto pt-2">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-3 border-b border-stone-300 gap-2">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0A1A12] uppercase tracking-wide flex items-center gap-2">
                <span>
                  {categories.find((c) => c.id === activeCategory)?.icon || '🍽️'}
                </span>
                <span>
                  {activeCategory === 'all'
                    ? 'Complete Restaurant Menu'
                    : categories.find((c) => c.id === activeCategory)?.label}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Showing {filteredMenu.length} freshly crafted dishes {dietFilter !== 'all' ? `(${dietFilter.toUpperCase()})` : ''}
              </p>
            </div>

            {(activeCategory !== 'all' || dietFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setDietFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#8B3A2B] hover:underline cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredMenu.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 my-6 shadow-sm">
              <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800 text-base">No matching dishes found</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Try searching with a different term or clear the diet/category filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setDietFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#8B3A2B] text-white text-xs font-bold hover:bg-[#722A1E] transition cursor-pointer"
              >
                View Full Menu
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedMenu).map(([categoryHeading, items]) => (
                <div key={categoryHeading} className="space-y-4">
                  
                  {/* Category Subheading Banner */}
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-6 bg-[#8B3A2B] rounded-full" />
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#0A261D] tracking-wide uppercase">
                      {categoryHeading}
                    </h3>
                    <span className="text-xs bg-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full font-bold">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                    <div className="flex-1 h-[1px] bg-stone-300" />
                  </div>

                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-stone-200/90 hover:shadow-md hover:border-[#8B3A2B]/40 transition-all duration-200 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start gap-3 mb-2">
                            
                            {/* Veg / Non-Veg Indicator Symbol */}
                            <span
                              className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 rounded-xs ${
                                item.isVeg ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'
                              }`}
                              title={item.isVeg ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                                }`}
                              />
                            </span>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#8B3A2B] transition-colors">
                                {item.name}
                              </h4>

                              {/* Tags row */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                {item.subCategory && (
                                  <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                                    {item.subCategory}
                                  </span>
                                )}
                                
                                {item.isSpecial && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#916F16] bg-[#D4AF37]/20 px-2 py-0.5 rounded-md">
                                    <Sparkles className="w-2.5 h-2.5 text-[#B08920]" />
                                    Specialty
                                  </span>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Bottom Quality Footnote */}
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                          <span className="flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {item.isVeg ? 'Fresh Vegetarian' : 'Fresh Catch / Poultry'}
                          </span>
                          <span className="text-stone-400 text-[10px]">Made to Order</span>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Bottom Feature Quality Strip */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-stone-200 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#8B3A2B]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm sm:text-[15px]">
                  Quality & Fresh Ingredients
                </h5>
                <p className="text-xs text-stone-500">
                  Pure mustard oils & authentic whole spices
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#8B3A2B]">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm sm:text-[15px]">
                  Expert Local & Multi-Cuisine Chefs
                </h5>
                <p className="text-xs text-stone-500">
                  Traditional culinary mastery in every dish
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#8B3A2B]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm sm:text-[15px]">
                  Family & Group Friendly
                </h5>
                <p className="text-xs text-stone-500">
                  Warm courtyard & indoor dining experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F3ECE0] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#8B3A2B]">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-sm sm:text-[15px]">
                  Customized Catering
                </h5>
                <p className="text-xs text-stone-500">
                  Breakfast, lunch thalis & festive dinners
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
