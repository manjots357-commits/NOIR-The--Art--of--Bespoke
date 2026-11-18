import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

interface CampaignEditorialProps {
  onOpenFilm: () => void;
  onExploreProduct: (productId: string) => void;
}

export const CampaignEditorial: React.FC<CampaignEditorialProps> = ({
  onOpenFilm,
  onExploreProduct,
}) => {
  return (
    <section id="editorial" className="py-24 bg-[#050505] border-t border-[#141414] text-[#F4F1EB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A46D] mb-3">
              CAMPAIGN EDITORIAL · CHAPTERS IV – VII
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#F4F1EB] tracking-tight">
              The Architecture of Presence
            </h2>
          </div>
          <button
            onClick={onOpenFilm}
            className="flex items-center gap-3 px-6 py-3 border border-[#C5A46D]/40 hover:border-[#C5A46D] bg-[#0A0A0C] hover:bg-[#141416] text-xs font-mono tracking-widest uppercase text-[#C5A46D] hover:text-[#F4F1EB] transition-all cursor-pointer self-start md:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Campaign Film (0:13)</span>
          </button>
        </div>

        {/* Feature Grid: Master Campaign Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card: The Complete Silhouette (Left 7 Cols) */}
          <div className="lg:col-span-7 group relative overflow-hidden bg-[#0C0C0E] border border-[#1C1C1F] flex flex-col justify-between">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
              <img
                src="/src/assets/images/campaign_silhouette_1794501136623.jpg"
                alt="NOIRÉ Bespoke Tailored Suit Silhouette"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
            </div>

            <div className="p-8 relative -mt-24 z-10">
              <div className="text-xs font-mono text-[#C5A46D] tracking-widest uppercase mb-1">
                04 / THE SILHOUETTE
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EB] mb-3">
                The Complete Silhouette
              </h3>
              <p className="text-sm font-sans-clean text-[#B8B8B8] max-w-lg leading-relaxed mb-6">
                Cut to heighten presence and sculpt the chest. Each jacket balances structured canvassing with effortless drape, demanding neither stiffness nor compromise.
              </p>
              <button
                onClick={() => onExploreProduct('noire-sovereign-suit')}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#F4F1EB] hover:text-[#C5A46D] uppercase transition-colors cursor-pointer"
              >
                <span>Inspect The Sovereign Suit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (5 Cols): Procession & Detail */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Card 2: The Procession */}
            <div className="group relative overflow-hidden bg-[#0C0C0E] border border-[#1C1C1F] flex-1 flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/campaign_procession_1794501138735.jpg"
                  alt="A Language of Colour Campaign Procession"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-xs font-mono text-[#C5A46D] tracking-widest uppercase mb-1">
                  06 / THE PROCESSION
                </div>
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-2">
                  A Language of Colour
                </h4>
                <p className="text-xs font-sans-clean text-[#B8B8B8] leading-relaxed mb-4">
                  From deep charcoal twill to sovereign midnight navy and cream flannel, our bespoke palettes are dyed using non-synthetic botanical baths in Biella.
                </p>
                <button
                  onClick={() => onExploreProduct('noire-double-breasted-suit')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#C5A46D] hover:text-white uppercase transition-colors cursor-pointer"
                >
                  <span>Explore Mayfair Flannel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: The Last Quarter-Inch */}
            <div className="group relative overflow-hidden bg-[#0C0C0E] border border-[#1C1C1F] flex-1 flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/craft_cuff_detail_1794501137648.jpg"
                  alt="The Last Quarter-Inch Surgeon Cuff"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-xs font-mono text-[#C5A46D] tracking-widest uppercase mb-1">
                  07 / THE DETAIL
                </div>
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-2">
                  The Last Quarter-Inch
                </h4>
                <p className="text-xs font-sans-clean text-[#B8B8B8] leading-relaxed mb-4">
                  Functioning surgeon’s cuffs with genuine horn buttons. Four hand-cut buttonholes stitched with silk thread, allowing exactly one-quarter inch of pristine shirt cuff to emerge.
                </p>
                <button
                  onClick={() => onExploreProduct('noire-foundation-shirt')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#C5A46D] hover:text-white uppercase transition-colors cursor-pointer"
                >
                  <span>Inspect Shirt & Cuffs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
