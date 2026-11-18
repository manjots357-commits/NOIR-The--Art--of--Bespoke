import React, { useState, useEffect } from 'react';
import { MeasurementProfile } from '../../types';
import { Ruler, CheckCircle2, BookmarkCheck, Info, RotateCcw } from 'lucide-react';

interface MeasurementStudioProps {
  onSaveProfile: (profile: MeasurementProfile) => void;
  savedProfile?: MeasurementProfile | null;
}

export const MeasurementStudio: React.FC<MeasurementStudioProps> = ({
  onSaveProfile,
  savedProfile,
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [measurements, setMeasurements] = useState<MeasurementProfile>({
    chest: 40,
    waist: 34,
    shoulder: 18.5,
    sleeveLength: 25.5,
    neck: 16,
    jacketLength: 30,
    trouserWaist: 33,
    inseam: 32,
    unit: 'in',
    customerName: '',
    customerEmail: '',
    notes: '',
  });

  useEffect(() => {
    if (savedProfile) {
      setMeasurements(savedProfile);
      setUnit(savedProfile.unit);
    }
  }, [savedProfile]);

  const handleUnitToggle = (newUnit: 'in' | 'cm') => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    // Convert values
    const factor = newUnit === 'cm' ? 2.54 : 1 / 2.54;
    setMeasurements((prev) => ({
      ...prev,
      unit: newUnit,
      chest: Math.round(prev.chest * factor * 10) / 10,
      waist: Math.round(prev.waist * factor * 10) / 10,
      shoulder: Math.round(prev.shoulder * factor * 10) / 10,
      sleeveLength: Math.round(prev.sleeveLength * factor * 10) / 10,
      neck: Math.round(prev.neck * factor * 10) / 10,
      jacketLength: Math.round(prev.jacketLength * factor * 10) / 10,
      trouserWaist: Math.round(prev.trouserWaist * factor * 10) / 10,
      inseam: Math.round(prev.inseam * factor * 10) / 10,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ ...measurements, unit });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const measurementFields = [
    { key: 'chest', label: 'Chest Circumference', hint: 'Measured around the fullest point of chest, tape horizontal.' },
    { key: 'waist', label: 'Natural Waist', hint: 'Measured at the narrowest waistline or level with the navel.' },
    { key: 'shoulder', label: 'Shoulder Width', hint: 'Distance between left and right acromion shoulder bone tips across the upper back.' },
    { key: 'sleeveLength', label: 'Sleeve Length', hint: 'From shoulder bone tip down along slightly bent arm to wrist bone + 0.25".' },
    { key: 'neck', label: 'Neck Circumference', hint: 'Around the base of neck, allowing one finger of comfortable ease.' },
    { key: 'jacketLength', label: 'Jacket Back Length', hint: 'From center back collar seam straight down to mid-crotch or thumb knuckle.' },
    { key: 'trouserWaist', label: 'Trouser Waistband', hint: 'Where you prefer the waistband to sit (our Gurkha trousers sit at high rise).' },
    { key: 'inseam', label: 'Trouser Inseam', hint: 'From the interior crotch seam down the inner leg to the top of the shoe heel.' },
  ];

  return (
    <section id="measurement" className="py-24 bg-[#050505] border-t border-[#141414] text-[#F4F1EB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A46D] mb-3">
              PRECISION ANTHROPOMETRY
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#F4F1EB] tracking-tight">
              Bespoke Measurement Studio
            </h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#121215] border border-[#222]">
            <button
              onClick={() => handleUnitToggle('in')}
              className={`px-4 py-1.5 text-xs font-mono uppercase transition-colors cursor-pointer ${
                unit === 'in' ? 'bg-[#C5A46D] text-black font-semibold' : 'text-[#888] hover:text-white'
              }`}
            >
              Inches (IN)
            </button>
            <button
              onClick={() => handleUnitToggle('cm')}
              className={`px-4 py-1.5 text-xs font-mono uppercase transition-colors cursor-pointer ${
                unit === 'cm' ? 'bg-[#C5A46D] text-black font-semibold' : 'text-[#888] hover:text-white'
              }`}
            >
              Centimeters (CM)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Inputs (8 Cols) */}
          <form onSubmit={handleSave} className="lg:col-span-8 bg-[#0C0C0E] border border-[#1C1C1F] p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {measurementFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-mono tracking-wider uppercase text-[#F4F1EB]">
                      {field.label}
                    </label>
                    <span className="text-[10px] font-mono text-[#C5A46D]">
                      {unit}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.25"
                    min="10"
                    max="180"
                    value={(measurements as any)[field.key]}
                    onChange={(e) =>
                      setMeasurements((prev) => ({
                        ...prev,
                        [field.key]: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-[#141418] border border-[#222226] px-4 py-2.5 text-base font-mono text-[#F4F1EB] focus:border-[#C5A46D] outline-none tabular-nums"
                  />
                  <span className="text-[11px] text-[#777] font-sans-clean leading-snug">
                    {field.hint}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer Contact Identification */}
            <div className="pt-6 border-t border-[#1C1C1F] grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[#888] mb-1">
                  Gentleman's Full Name
                </label>
                <input
                  type="text"
                  placeholder="Lord Sterling Vance"
                  value={measurements.customerName || ''}
                  onChange={(e) =>
                    setMeasurements((prev) => ({ ...prev, customerName: e.target.value }))
                  }
                  className="w-full bg-[#141418] border border-[#222226] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[#888] mb-1">
                  Private Atelier Email
                </label>
                <input
                  type="email"
                  placeholder="vance@heritage.com"
                  value={measurements.customerEmail || ''}
                  onChange={(e) =>
                    setMeasurements((prev) => ({ ...prev, customerEmail: e.target.value }))
                  }
                  className="w-full bg-[#141418] border border-[#222226] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                />
              </div>
            </div>

            {/* Posture & Fitting Notes */}
            <div className="mb-6">
              <label className="block text-xs font-mono tracking-wider uppercase text-[#888] mb-1">
                Anatomical Posture & Preference Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Erect military posture, dropped right shoulder by 0.5 inches, preference for heavy watch clearance on left wrist cuff."
                value={measurements.notes || ''}
                onChange={(e) =>
                  setMeasurements((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full bg-[#141418] border border-[#222226] px-4 py-2 text-xs font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1C1C1F]">
              <div className="flex items-center gap-2 text-xs text-[#888]">
                <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Saved directly to your local dossier profile</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#F4F1EB] hover:bg-[#C5A46D] text-black font-mono text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Save Measurement Dossier</span>
              </button>
            </div>

            {savedSuccess && (
              <div className="mt-4 p-3 bg-[#C5A46D]/10 border border-[#C5A46D] text-xs font-mono text-[#C5A46D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Measurement dossier securely saved for your bespoke orders.</span>
              </div>
            )}
          </form>

          {/* Right Column: Tailor Consultation & Guarantee (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0C0C0E] border border-[#1C1C1F] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#C5A46D] mb-2">
                <Ruler className="w-4 h-4" />
                <span>ATELIER PROTOCOL</span>
              </div>
              <h3 className="font-editorial text-2xl text-[#F4F1EB] mb-3">
                The First Fitting Guarantee
              </h3>
              <p className="text-xs font-sans-clean text-[#B8B8B8] leading-relaxed mb-4">
                Self-measurements provide the baseline geometry for your personal pattern. Before any shears touch cloth, a master cutter reviews every proportion.
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#8C8C92] mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A46D]" />
                  <span>Complimentary video consultation with cutter</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A46D]" />
                  <span>Baste fitting garment mailed worldwide</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A46D]" />
                  <span>Permanent wooden hanger & garment bag</span>
                </li>
              </ul>

              <div className="p-3 bg-[#121215] border border-[#222] text-[11px] text-[#A0A0A5] leading-relaxed">
                <strong>Disclaimer:</strong> Online measurements provide initial pattern baselines. Professional fitting verification ensures zero collar gap and precise armscye depth.
              </div>
            </div>

            {/* Atelier Heritage Image Card */}
            <div className="bg-[#0C0C0E] border border-[#1C1C1F] overflow-hidden">
              <img
                src="/src/assets/images/atelier_tailor_hands_1794501138712.jpg"
                alt="Master cutter tailoring with shears and chalk"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="text-[10px] font-mono text-[#C5A46D] tracking-widest uppercase">
                  SAVILE ROW TRADITION
                </div>
                <div className="text-sm font-editorial text-[#F4F1EB] mt-1">
                  Individual Paper Patterns Drafted For Every Client
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
