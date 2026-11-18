import React, { useState } from 'react';
import { BespokeConfig, Product } from '../../types';
import { Check, Sparkles, Scissors, ShoppingBag, ShieldCheck } from 'lucide-react';

interface BespokeConfiguratorProps {
  onAddBespokeToCart: (config: BespokeConfig) => void;
  initialPreset?: 'suit' | 'shirt' | 'waistcoat';
}

export const BespokeConfigurator: React.FC<BespokeConfiguratorProps> = ({
  onAddBespokeToCart,
  initialPreset = 'suit',
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [config, setConfig] = useState<BespokeConfig>({
    garmentType: initialPreset === 'shirt' ? 'Formal Dress Shirt' : initialPreset === 'waistcoat' ? 'Tailored 6-Button Waistcoat' : 'Three-Piece Sovereign Suit',
    fabric: 'Tasmanian Super 160s Worsted Wool (260g/m)',
    fabricColor: 'Obsidian Black',
    lapelStyle: 'Sculpted Peak Lapel (3.75")',
    buttonType: 'Carved Buffalo Horn Buttons',
    pocketStyle: 'Slanted Hacker Flap with Ticket Pocket',
    vents: 'Double Side Vents (10")',
    fitPreference: 'Savile Row Architectural Structure',
    monogramText: 'N·R',
    monogramThread: 'Champagne Gold',
    basePrice: initialPreset === 'shirt' ? 450 : initialPreset === 'waistcoat' ? 950 : 3850,
  });

  const steps = [
    {
      title: '01. Garment Silhouette',
      options: [
        { name: 'Three-Piece Sovereign Suit', price: 3850, desc: 'Includes full canvas jacket, matching waistcoat, and high-rise gurkha trousers.' },
        { name: 'Two-Piece Single-Breasted Suit', price: 3350, desc: 'Classic two-button stance with hand-padded canvas chest structure.' },
        { name: '6x2 Double-Breasted Suit', price: 3550, desc: 'Architectural wrap with sweeping peak lapels and low break.' },
        { name: 'Evening Black-Tie Dinner Tuxedo', price: 4200, desc: 'Satin silk grosgrain facings, jetted pockets, and braided side stripes.' },
        { name: 'Formal Dress Shirt', price: 450, desc: 'Egyptian 140-ply twill cotton with mitered French cuffs.' },
        { name: 'Tailored 6-Button Waistcoat', price: 950, desc: 'Sculpted horseshoe V-cut with mulberry silk damask back.' },
      ],
      field: 'garmentType' as const,
    },
    {
      title: '02. Fabric Selection',
      options: [
        { name: 'Tasmanian Super 160s Worsted Wool (260g/m)', price: 0, desc: 'Milled in Biella, Italy. Superlative year-round drape and natural wrinkle resistance.' },
        { name: 'Vitale Barberis Canonico 340g Flannel', price: 150, desc: 'Substantial woolen flannel with rich tactile warmth and traditional body.' },
        { name: 'Loro Piana Mongolian Cashmere-Wool Blend', price: 650, desc: 'Cloud-soft hand with subtle cashmere bloom.' },
        { name: 'Solbiati Heavy Irish Tailoring Linen (380g/m)', price: 100, desc: 'Crisp, breathable artisanal summer linen with deep character.' },
      ],
      field: 'fabric' as const,
    },
    {
      title: '03. Fabric Colour',
      options: [
        { name: 'Obsidian Black', hex: '#0B0B0C', price: 0 },
        { name: 'Midnight Sovereign Navy', hex: '#0A1222', price: 0 },
        { name: 'Charcoal Twill Melange', hex: '#1C1C1E', price: 0 },
        { name: 'Cream Ivory Flannel', hex: '#EAE4D7', price: 120 },
        { name: 'Vicuna Desert Camel', hex: '#875C36', price: 120 },
      ],
      field: 'fabricColor' as const,
    },
    {
      title: '04. Lapel Architecture',
      options: [
        { name: 'Sculpted Peak Lapel (3.75")', price: 0, desc: 'Dramatic upward spear line accentuating broad shoulders.' },
        { name: 'Hand-Rolled Notch Lapel (3.25")', price: 0, desc: 'Classic Savile Row proportion with natural soft roll.' },
        { name: 'Full Shawl Collar with Silk Facing', price: 180, desc: 'Continuous organic curve reserved for dinner attire.' },
      ],
      field: 'lapelStyle' as const,
    },
    {
      title: '05. Button Selection',
      options: [
        { name: 'Carved Buffalo Horn Buttons', price: 0, desc: 'Matte dark horn with distinctive natural grain.' },
        { name: 'Australian Smoked Mother-of-Pearl', price: 90, desc: 'Lustrous iridescence with crow-foot shank stitching.' },
        { name: 'Antique Hand-Engraved Brass Crest', price: 140, desc: 'Heavy forged metal with subtle vintage patina.' },
        { name: 'Pure Silk Grosgrain Covered', price: 70, desc: 'Hand-turned matching silk buttons.' },
      ],
      field: 'buttonType' as const,
    },
    {
      title: '06. Pockets & Details',
      options: [
        { name: 'Slanted Hacker Flap with Ticket Pocket', price: 0, desc: 'Angled sporting cut with functional secondary ticket pocket.' },
        { name: 'Straight Flap Pockets', price: 0, desc: 'Clean, understated horizontal alignment.' },
        { name: 'Double Jetted Minimalist Pockets', price: 0, desc: 'Ultra-refined formal finish with no pocket flap.' },
      ],
      field: 'pocketStyle' as const,
    },
    {
      title: '07. Vents & Cuff Engineering',
      options: [
        { name: 'Double Side Vents (10")', price: 0, desc: 'Allows access to trouser pockets while maintaining jacket drape.' },
        { name: 'Single Center Vent', price: 0, desc: 'Classic equestrian silhouette.' },
        { name: 'Ventless Formal Evening Cut', price: 0, desc: 'Strictly unbroken rear line for black tie.' },
      ],
      field: 'vents' as const,
    },
    {
      title: '08. Shoulder & Fit Cut',
      options: [
        { name: 'Savile Row Architectural Structure', price: 0, desc: 'Padded shoulder with distinct roped sleevehead and structured chest.' },
        { name: 'Neapolitan Soft Spalla Camicia', price: 0, desc: 'Unpadded shirt-shoulder with gentle handmade shirring and relaxed drape.' },
        { name: 'Milano Modern Tapered Cut', price: 0, desc: 'Trim waist suppression and natural shoulder line.' },
      ],
      field: 'fitPreference' as const,
    },
    {
      title: '09. Personal Monogram',
      options: [
        { name: 'Champagne Gold', price: 45, desc: 'Hand-embroidered silk thread inside breast lining.' },
        { name: 'Sterling Silver Thread', price: 45, desc: 'Subtle metallic sheen.' },
        { name: 'Tone-on-Tone Shadow', price: 35, desc: 'Discreet matching thread.' },
        { name: 'No Monogram Required', price: 0, desc: 'Unmarked lining.' },
      ],
      field: 'monogramThread' as const,
    },
  ];

  const currentStepData = steps[activeStep];

  // Calculate total price dynamically
  const calculateTotal = () => {
    let total = 3350;
    const garment = steps[0].options.find((o) => o.name === config.garmentType);
    if (garment) total = garment.price;

    const fabric = steps[1].options.find((o) => o.name === config.fabric);
    if (fabric) total += fabric.price;

    const color = steps[2].options.find((o) => o.name === config.fabricColor);
    if (color) total += color.price;

    const lapel = steps[3].options.find((o) => o.name === config.lapelStyle);
    if (lapel) total += lapel.price;

    const button = steps[4].options.find((o) => o.name === config.buttonType);
    if (button) total += button.price;

    const thread = steps[8].options.find((o) => o.name === config.monogramThread);
    if (thread) total += thread.price;

    return total;
  };

  const currentTotal = calculateTotal();

  const handleSelectOption = (field: keyof BespokeConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
      basePrice: currentTotal,
    }));
  };

  const handleAddBespoke = () => {
    onAddBespokeToCart({
      ...config,
      basePrice: currentTotal,
    });
  };

  return (
    <section id="bespoke-atelier" className="py-24 bg-[#08080A] border-t border-[#141414] text-[#F4F1EB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A46D] mb-3">
            INTERACTIVE BESPOKE ATELIER
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#F4F1EB] tracking-tight mb-4">
            Create Your Signature Fit
          </h2>
          <p className="text-sm font-sans-clean text-[#B8B8B8] leading-relaxed">
            Every bespoke commission is cut individually by a master pattern maker. Configure your personal canvas, cloth, lapel stance, and hand-embroidered monogram below.
          </p>
        </div>

        {/* 9-Step Progress Pill-less Segmented Bar */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 mb-10 border-b border-[#1C1C1F] gap-2 scrollbar-none">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-3 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeStep === idx
                  ? 'text-[#C5A46D] border-b-2 border-[#C5A46D] bg-[#121215]'
                  : 'text-[#888] hover:text-[#DDD]'
              }`}
            >
              {s.title.split('. ')[1]}
            </button>
          ))}
        </div>

        {/* Configurator 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Options Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0C0C0E] border border-[#1C1C1F] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#18181A]">
              <h3 className="font-editorial text-2xl text-[#F4F1EB]">
                {currentStepData.title}
              </h3>
              <span className="text-xs font-mono text-[#C5A46D]">
                Step {activeStep + 1} of {steps.length}
              </span>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentStepData.options.map((opt: any) => {
                const isSelected = (config as any)[currentStepData.field] === opt.name;

                return (
                  <div
                    key={opt.name}
                    onClick={() => handleSelectOption(currentStepData.field, opt.name)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#18181C] border-[#C5A46D]'
                        : 'bg-[#0E0E10] border-[#1E1E22] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {opt.hex && (
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-editorial text-[#F4F1EB] font-medium">
                          {opt.name}
                        </div>
                        {opt.desc && (
                          <div className="text-xs text-[#8C8C92] mt-0.5 leading-relaxed font-sans-clean">
                            {opt.desc}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {opt.price > 0 && (
                        <span className="text-xs font-mono text-[#C5A46D] tabular-nums">
                          +${opt.price}
                        </span>
                      )}
                      <div
                        className={`w-5 h-5 flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#C5A46D] border-[#C5A46D] text-black'
                            : 'border-[#333] text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Monogram Input if on step 9 */}
            {activeStep === 8 && (
              <div className="mt-6 pt-6 border-t border-[#1C1C1F]">
                <label className="block text-xs font-mono tracking-widest text-[#B8B8B8] uppercase mb-2">
                  Embroidered Initials (Max 4 Characters)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={config.monogramText}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, monogramText: e.target.value.toUpperCase() }))
                  }
                  placeholder="e.g. A·V"
                  className="w-full bg-[#141418] border border-[#2A2A30] px-4 py-3 text-lg font-cinzel text-[#C5A46D] tracking-widest outline-none focus:border-[#C5A46D]"
                />
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-[#1C1C1F] flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#B8B8B8] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Previous Step
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-6 py-2.5 bg-[#1C1C1F] hover:bg-[#2A2A30] text-[#F4F1EB] text-xs font-mono tracking-widest uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Step →
              </button>
            </div>
          </div>

          {/* Right Column: Live Commission Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0C0C0E] border border-[#1C1C1F] p-6 sm:p-8 sticky top-28">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#C5A46D] mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>LIVE BESPOKE DOSSIER</span>
            </div>
            <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-4">
              {config.garmentType}
            </h4>

            {/* Configured Itemized Summary */}
            <div className="space-y-2.5 text-xs font-mono pb-6 border-b border-[#1C1C1F]">
              <div className="flex justify-between">
                <span className="text-[#888]">Cloth:</span>
                <span className="text-[#F4F1EB] text-right font-medium truncate max-w-[220px]">
                  {config.fabric}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Colour:</span>
                <span className="text-[#F4F1EB]">{config.fabricColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Lapel:</span>
                <span className="text-[#F4F1EB]">{config.lapelStyle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Buttons:</span>
                <span className="text-[#F4F1EB]">{config.buttonType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Pockets:</span>
                <span className="text-[#F4F1EB]">{config.pocketStyle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Fit Style:</span>
                <span className="text-[#F4F1EB]">{config.fitPreference}</span>
              </div>
              {config.monogramText && (
                <div className="flex justify-between text-[#C5A46D]">
                  <span>Monogram:</span>
                  <span>
                    "{config.monogramText}" ({config.monogramThread})
                  </span>
                </div>
              )}
            </div>

            {/* Total Estimated Price */}
            <div className="py-6 flex items-baseline justify-between">
              <div>
                <div className="text-xs font-mono uppercase text-[#888]">Estimated Total</div>
                <div className="text-[10px] text-[#666] font-mono">Includes pattern cutting & 2 fittings</div>
              </div>
              <div className="font-mono text-3xl font-bold text-[#F4F1EB] tabular-nums">
                ${currentTotal.toLocaleString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddBespoke}
                className="w-full py-4 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5A46D]/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Commission This Bespoke Piece</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-[#888] font-mono justify-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Guaranteed master tailor pattern review before cutting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
