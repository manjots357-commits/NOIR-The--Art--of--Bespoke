import React, { useState } from 'react';
import { ExplodedGarmentCanvas } from '../canvas/ExplodedGarmentCanvas';
import { CRAFT_SPECS } from '../../data/products';
import { RotateCw, Layers, Eye, ChevronDown, ChevronUp, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { Product } from '../../types';

interface ExplodedGarmentSectionProps {
  onQuickAdd: (productSlug: string) => void;
  onOpenBespokeWithPreset: (preset: 'suit' | 'shirt' | 'waistcoat') => void;
}

export const ExplodedGarmentSection: React.FC<ExplodedGarmentSectionProps> = ({
  onQuickAdd,
  onOpenBespokeWithPreset,
}) => {
  const [activeModel, setActiveModel] = useState<'shirt' | 'waistcoat' | 'suit'>('suit');
  const [explosionProgress, setExplosionProgress] = useState<number>(0.85); // Start gracefully exploded
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [inspectedPart, setInspectedPart] = useState<string | null>(null);

  const currentSpec = CRAFT_SPECS.find((s) => s.modelType === activeModel) || CRAFT_SPECS[2];

  const handleAssemble = () => {
    setExplosionProgress(0);
  };

  const handleExplode = () => {
    setExplosionProgress(1.0);
  };

  const toggleRotate = () => {
    setIsRotating((prev) => !prev);
  };

  const productSlugMap: Record<'shirt' | 'waistcoat' | 'suit', string> = {
    suit: 'noire-sovereign-suit',
    shirt: 'noire-foundation-shirt',
    waistcoat: 'noire-canvas-waistcoat',
  };

  return (
    <section
      id="exploded-garments"
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex flex-col justify-between py-12 border-t border-[#141414]"
    >
      {/* Top Editorial Spec Header (Framed cleanly in top corners, leaving center 100% open) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row md:items-start justify-between gap-6 pointer-events-none">
        {/* Left: Garment Title & Reference Chapter */}
        <div className="pointer-events-auto max-w-md">
          <div className="flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] text-[#C5A46D] mb-1">
            <span>{currentSpec.number}</span>
            <span>/</span>
            <span>{currentSpec.title}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#F4F1EB] tracking-tight">
            {currentSpec.subtitle}
          </h2>
          <div className="mt-3 space-y-1 text-xs font-mono tracking-wider text-[#B8B8B8]/80">
            <div>
              <span className="text-[#C5A46D] uppercase">Cloth:</span> {currentSpec.material}
            </div>
            <div>
              <span className="text-[#C5A46D] uppercase">Construction:</span> {currentSpec.construction}
            </div>
          </div>
        </div>

        {/* Right: Quick actions for this piece */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onOpenBespokeWithPreset(activeModel)}
            className="px-4 py-2 bg-[#1C1C1C] hover:bg-[#262626] border border-[#2A2A2A] hover:border-[#C5A46D] text-xs font-mono tracking-widest text-[#F4F1EB] uppercase transition-all cursor-pointer flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Customize Bespoke</span>
          </button>
          <button
            onClick={() => onQuickAdd(productSlugMap[activeModel])}
            className="px-4 py-2 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black text-xs font-mono font-semibold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Bag</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport (Full container immersion) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ExplodedGarmentCanvas
          modelType={activeModel}
          explosionProgress={explosionProgress}
          isRotating={isRotating}
          onHoverPart={setInspectedPart}
        />
      </div>

      {/* Unified Ergonomic Bottom Control Dock (§5 Three.js Directives) */}
      <div className="relative z-30 max-w-3xl mx-auto w-full px-6 flex flex-col items-center">
        {/* Cinema / Zen Mode Collapse Trigger */}
        <button
          onClick={() => setHudCollapsed((prev) => !prev)}
          className="mb-2 px-3 py-1 bg-[#111111]/80 border border-[#222222] text-[10px] tracking-widest uppercase text-[#B8B8B8] hover:text-[#C5A46D] transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-none"
        >
          {hudCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-[#C5A46D]" />
              <span>Show 3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-[#C5A46D]" />
              <span>Cinema Mode (Hide HUD)</span>
            </>
          )}
        </button>

        {!hudCollapsed && (
          <div className="w-full bg-[#0C0C0E] border border-[#262626] p-4 sm:p-5 shadow-2xl flex flex-col gap-4">
            {/* Row 1: Garment Model Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveModel('shirt')}
                className={`py-2 px-3 text-xs tracking-widest font-mono uppercase transition-all cursor-pointer text-center ${
                  activeModel === 'shirt'
                    ? 'bg-[#1F1F24] text-[#C5A46D] border border-[#C5A46D]/60'
                    : 'bg-[#141416] text-[#B8B8B8] border border-transparent hover:text-white'
                }`}
              >
                01. The Shirt
              </button>
              <button
                onClick={() => setActiveModel('waistcoat')}
                className={`py-2 px-3 text-xs tracking-widest font-mono uppercase transition-all cursor-pointer text-center ${
                  activeModel === 'waistcoat'
                    ? 'bg-[#1F1F24] text-[#C5A46D] border border-[#C5A46D]/60'
                    : 'bg-[#141416] text-[#B8B8B8] border border-transparent hover:text-white'
                }`}
              >
                02. The Waistcoat
              </button>
              <button
                onClick={() => setActiveModel('suit')}
                className={`py-2 px-3 text-xs tracking-widest font-mono uppercase transition-all cursor-pointer text-center ${
                  activeModel === 'suit'
                    ? 'bg-[#1F1F24] text-[#C5A46D] border border-[#C5A46D]/60'
                    : 'bg-[#141416] text-[#B8B8B8] border border-transparent hover:text-white'
                }`}
              >
                03. The Canvas Suit
              </button>
            </div>

            {/* Row 2: Explosion Slider & Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#1C1C1F]">
              {/* Explosion Slider with percentage */}
              <div className="flex-1 w-full flex items-center gap-3">
                <span className="text-[10px] tracking-widest uppercase text-[#B8B8B8] font-mono whitespace-nowrap">
                  Explosion
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosionProgress}
                  onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A46D] h-1.5 bg-[#222222] cursor-pointer"
                />
                <span className="text-xs font-mono tabular-nums text-[#C5A46D] w-12 text-right">
                  {Math.round(explosionProgress * 100)}%
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleAssemble}
                  className="px-3 py-1.5 bg-[#18181A] hover:bg-[#222] text-[#F4F1EB] text-[11px] font-mono tracking-wider uppercase border border-[#2E2E32] transition-colors cursor-pointer"
                >
                  Assemble
                </button>
                <button
                  onClick={handleExplode}
                  className="px-3 py-1.5 bg-[#18181A] hover:bg-[#222] text-[#F4F1EB] text-[11px] font-mono tracking-wider uppercase border border-[#2E2E32] transition-colors cursor-pointer"
                >
                  Explode
                </button>
                <button
                  onClick={toggleRotate}
                  className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isRotating
                      ? 'bg-[#C5A46D]/10 border-[#C5A46D] text-[#C5A46D]'
                      : 'bg-[#18181A] border-[#2E2E32] text-[#B8B8B8] hover:text-white'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>360°</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
