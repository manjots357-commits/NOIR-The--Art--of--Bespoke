import React from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

interface HeroSilhouetteProps {
  onExploreCollection: () => void;
  onDiscoverBespoke: () => void;
  onWatchFilm: () => void;
}

export const HeroSilhouette: React.FC<HeroSilhouetteProps> = ({
  onExploreCollection,
  onDiscoverBespoke,
  onWatchFilm,
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
      {/* Cinematic subtle spotlight gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(197,164,109,0.08)_0%,rgba(5,5,5,0)_70%)]" />

      {/* Atmospheric subtle vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20 flex flex-col items-center">
        {/* Editorial Subtitle Kicker (Clean, unboxed) */}
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A46D] mb-6">
          <span>NOIRÉ ATELIER</span>
          <span aria-hidden="true">·</span>
          <span>THE ART OF BESPOKE</span>
          <span aria-hidden="true">·</span>
          <span>EST. SAVILE ROW & MILANO</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#F4F1EB] leading-[0.95] mb-8 text-balance">
          Dressed Beyond<br />
          <span className="italic font-light text-[#C5A46D]">Ordinary.</span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-xl text-sm sm:text-base font-sans-clean font-light tracking-wide text-[#B8B8B8] leading-relaxed mb-12 uppercase text-balance">
          Precision in every stitch. Elegance in every detail. Hand-padded full canvas construction tailored for the modern connoisseur.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={onExploreCollection}
            className="px-8 py-4 bg-[#F4F1EB] hover:bg-[#C5A46D] text-[#050505] font-sans-clean text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#C5A46D]/20"
          >
            Explore The Collection
          </button>

          <button
            onClick={onDiscoverBespoke}
            className="px-8 py-4 bg-transparent hover:bg-[#111111] text-[#F4F1EB] border border-[#2A2A2A] hover:border-[#C5A46D] font-sans-clean text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
          >
            Discover Bespoke
          </button>

          <button
            onClick={onWatchFilm}
            className="flex items-center gap-2.5 px-6 py-4 text-xs tracking-[0.2em] uppercase text-[#B8B8B8] hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#C5A46D] fill-[#C5A46D]" />
            <span>Watch Campaign Film</span>
          </button>
        </div>

        {/* Tailoring Key Spec Strip */}
        <div className="mt-20 pt-10 border-t border-[#1C1C1C] w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#B8B8B8]">Construction</div>
            <div className="text-sm font-editorial text-[#F4F1EB] mt-1">100% Full Horsehair Canvas</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#B8B8B8]">Origin Cloth</div>
            <div className="text-sm font-editorial text-[#F4F1EB] mt-1">Tasmanian Super 160s Wool</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#B8B8B8]">Artisan Handwork</div>
            <div className="text-sm font-editorial text-[#F4F1EB] mt-1">54 Hours of Hand Stitches</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#B8B8B8]">Surgeon’s Cuffs</div>
            <div className="text-sm font-editorial text-[#F4F1EB] mt-1">Working Real Buffalo Horn</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 text-[#B8B8B8]/60 hover:text-[#C5A46D] transition-colors">
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll To Explore 3D Architecture</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A46D]" />
        </div>
      </div>
    </section>
  );
};
