import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, User, Film } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenFilm: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenFilm,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 border-b border-[#1C1C1C]'
          : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.25em] text-[#F4F1EB] hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0"
        >
          NOIRÉ
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.18em] uppercase text-[#B8B8B8]">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Silhouette
          </button>
          <button
            onClick={() => scrollToSection('exploded-garments')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            The Garments
          </button>
          <button
            onClick={() => scrollToSection('collection')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection('bespoke-atelier')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bespoke Atelier
          </button>
          <button
            onClick={() => scrollToSection('measurement')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Measurement
          </button>
          <button
            onClick={() => scrollToSection('craftsmanship')}
            className="hover:text-[#F4F1EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Our Craft
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Film, Wishlist, Account, Bag) */}
        <div className="flex items-center gap-4 text-[#F4F1EB] shrink-0">
          <button
            onClick={onOpenFilm}
            title="Watch Campaign Film"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-[#C5A46D] hover:text-white transition-colors px-3 py-1.5 border border-[#C5A46D]/30 hover:border-[#C5A46D] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Campaign Film</span>
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className="p-2 hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="p-2 hover:text-[#C5A46D] transition-colors relative cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-[#C5A46D] text-black font-semibold flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            aria-label="Customer Account"
            className="p-2 hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="flex items-center gap-2 px-3 py-2 bg-[#1C1C1C] hover:bg-[#262626] border border-[#2A2A2A] hover:border-[#C5A46D]/60 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A46D]" />
            <span className="text-xs font-mono font-medium">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
