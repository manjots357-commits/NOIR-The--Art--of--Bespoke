import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, Feather, Compass } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      title: 'Full Floating Canvas',
      subtitle: 'The Anatomy of True Tailoring',
      tag: 'STRUCTURE',
      icon: Layers,
      content:
        'Unlike industrial fused garments glued with heat-activated resin, every NOIRÉ suit features an unglued horsehair canvas suspended freely between wool cloth and silk lining. The canvas slowly contours to the gentleman’s unique torso with every wear, providing living drape that never bubbles or stiffens.',
      specs: [
        { label: 'Chest Interlining', value: '100% Mongolian Camelhair & Horsehair' },
        { label: 'Lapel Pad-Stitching', value: 'Over 1,200 invisible hand stitches' },
        { label: 'Lifespan', value: 'Over 25 years with proper steam pressing' },
      ],
      image: '/src/assets/images/atelier_tailor_hands_1794501138712.jpg',
    },
    {
      title: 'Tasmanian Super 160s Wool',
      subtitle: 'Milled in the Alpine Springs of Biella',
      tag: 'CLOTH',
      icon: Feather,
      content:
        'Sourced from certified ethical pastoralists in the Tasmanian Midlands. The fleece fibers measure a razor-thin 15.75 microns in diameter, spun into 2-fold yarns and washed in glacial mountain spring water in Piedmont to yield an unmatched silken luster and natural mechanical stretch.',
      specs: [
        { label: 'Fleece Micron Count', value: '15.75µ (Super 160s Grade)' },
        { label: 'Weight & Weave', value: '260g/m Four-Season Twill' },
        { label: 'Dyeing Method', value: 'Pure Botanical Low-Impact Bath' },
      ],
      image: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    },
    {
      title: 'Egyptian 140-Ply Cotton',
      subtitle: 'Giza 87 Extra-Long Staple',
      tag: 'TWILL',
      icon: Sparkles,
      content:
        'Cultivated in the fertile Nile Delta. Giza 87 represents the pinnacle of cotton farming: extraordinary staple length exceeding 36mm, spun into 140/2 double-twisted yarns. The result is a shirt that remains crisp through evening engagements yet soft against bare skin.',
      specs: [
        { label: 'Yarn Count', value: '140/2 Two-Fold Compact' },
        { label: 'Stitch Density', value: '22 Stitches Per Inch (Single Needle)' },
        { label: 'Buttons', value: '4mm Solid Australian Mother-of-Pearl' },
      ],
      image: '/src/assets/images/campaign_silhouette_1794501136623.jpg',
    },
    {
      title: 'The Working Surgeon’s Cuff',
      subtitle: 'The Mark of Bespoke Authenticity',
      tag: 'FINISHING',
      icon: Compass,
      content:
        'Originally devised for military surgeons who needed to roll their sleeves in battle without removing their jackets. Each buttonhole is hand-cut with a chisel and bound using silk gimp cord. The four horn buttons are individually shanked to allow seamless unbuttoning.',
      specs: [
        { label: 'Button Material', value: 'Genuine Water Buffalo Horn' },
        { label: 'Buttonhole Stitch', value: 'Handmade Keyhole with Silk Gimp' },
        { label: 'Sleeve Allowance', value: '1.5-inch in-sleeve fabric reserve' },
      ],
      image: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    },
  ];

  const currentPillar = pillars[activeTab];

  return (
    <section id="craftsmanship" className="py-24 bg-[#08080A] border-t border-[#141414] text-[#F4F1EB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A46D] mb-3">
            HERITAGE & ARTISANAL INTEGRITY
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#F4F1EB] tracking-tight mb-4">
            The Pillars of Our Craft
          </h2>
          <p className="text-sm font-sans-clean text-[#B8B8B8] leading-relaxed">
            Every garment born in the NOIRÉ atelier is defined by the marriage of centuries-old Savile Row discipline and progressive Italian finishing.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;

            return (
              <button
                key={pillar.title}
                onClick={() => setActiveTab(idx)}
                className={`p-4 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141418] border-[#C5A46D] text-[#F4F1EB]'
                    : 'bg-[#0B0B0D] border-[#1C1C1F] text-[#888] hover:border-[#333]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46D]">
                    {pillar.tag}
                  </span>
                  <Icon className="w-4 h-4 text-[#C5A46D]" />
                </div>
                <div className="text-sm font-editorial font-medium text-[#F4F1EB]">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Display (2 Column Layout) */}
        <div className="bg-[#0C0C0E] border border-[#1C1C1F] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-xs font-mono text-[#C5A46D] tracking-widest uppercase mb-2">
              PILLAR 0{activeTab + 1} · {currentPillar.tag}
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EB] mb-2">
              {currentPillar.title}
            </h3>
            <div className="text-xs font-mono text-[#888] uppercase tracking-wider mb-6">
              {currentPillar.subtitle}
            </div>
            <p className="text-sm font-sans-clean text-[#C2C2C8] leading-relaxed mb-8">
              {currentPillar.content}
            </p>

            {/* Technical Specs List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1C1C1F]">
              {currentPillar.specs.map((spec) => (
                <div key={spec.label} className="bg-[#121215] p-3 border border-[#1E1E22]">
                  <div className="text-[10px] font-mono text-[#888] uppercase tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-xs font-editorial font-medium text-[#F4F1EB] mt-1">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden bg-[#050505] border border-[#222]">
            <img
              src={currentPillar.image}
              alt={currentPillar.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
