import React, { useState } from 'react';
import { MeasurementProfile, BespokeConfig } from '../../types';
import { X, User, Ruler, Scissors, Package, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedMeasurements?: MeasurementProfile | null;
  savedBespoke?: BespokeConfig[];
  onOpenMeasurements: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  savedMeasurements,
  savedBespoke = [],
  onOpenMeasurements,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'measurements' | 'orders'>('profile');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#0A0A0C] border border-[#1E1E22] text-[#F4F1EB] shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-[#1C1C1F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-[#C5A46D]" />
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A46D]">
                NOIRÉ PRIVATE ATELIER CLIENT
              </div>
              <h3 className="font-editorial text-2xl text-[#F4F1EB]">
                {savedMeasurements?.customerName || 'Lord Sterling Vance'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Account"
            className="p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#1C1C1F] bg-[#0E0E11] text-xs font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#C5A46D] border-b-2 border-[#C5A46D] bg-[#121215]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Client Profile
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'measurements'
                ? 'text-[#C5A46D] border-b-2 border-[#C5A46D] bg-[#121215]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Saved Measurements
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'text-[#C5A46D] border-b-2 border-[#C5A46D] bg-[#121215]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Order Archives
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#121215] border border-[#222]">
                  <div className="text-[#888] uppercase">Client Status</div>
                  <div className="text-sm font-editorial text-[#C5A46D] mt-1">Savile Row Bespoke Patron</div>
                </div>
                <div className="p-4 bg-[#121215] border border-[#222]">
                  <div className="text-[#888] uppercase">Assigned Master Cutter</div>
                  <div className="text-sm font-editorial text-[#F4F1EB] mt-1">Maestro Vittorio De Luca</div>
                </div>
                <div className="p-4 bg-[#121215] border border-[#222]">
                  <div className="text-[#888] uppercase">Registered Email</div>
                  <div className="text-sm font-sans-clean text-[#F4F1EB] mt-1">
                    {savedMeasurements?.customerEmail || 'vance@heritage.com'}
                  </div>
                </div>
                <div className="p-4 bg-[#121215] border border-[#222]">
                  <div className="text-[#888] uppercase">Preferred Fitting Atelier</div>
                  <div className="text-sm font-editorial text-[#F4F1EB] mt-1">London Mayfair (14 Savile Row)</div>
                </div>
              </div>

              <div className="p-4 bg-[#141418] border border-[#222] text-xs font-sans-clean text-[#B8B8B8] leading-relaxed">
                As a registered NOIRÉ patron, your bespoke paper patterns are securely archived in our vault. Re-ordering additional bespoke trousers, waistcoats, or evening wear can be executed directly from your archived measurements.
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <div className="space-y-6">
              {savedMeasurements ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#C5A46D] uppercase">
                      Current Pattern Geometry ({savedMeasurements.unit.toUpperCase()})
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenMeasurements();
                      }}
                      className="text-xs font-mono text-[#F4F1EB] hover:text-[#C5A46D] underline cursor-pointer"
                    >
                      Update Dimensions
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Chest</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.chest} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Waist</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.waist} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Shoulder</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.shoulder} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Sleeve</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.sleeveLength} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Neck</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.neck} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Jacket Length</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.jacketLength} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Trouser Waist</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.trouserWaist} {savedMeasurements.unit}</div>
                    </div>
                    <div className="p-3 bg-[#121215] border border-[#222]">
                      <div className="text-[#888]">Inseam</div>
                      <div className="text-base font-semibold text-[#F4F1EB] mt-0.5">{savedMeasurements.inseam} {savedMeasurements.unit}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ruler className="w-8 h-8 text-[#555] mx-auto mb-3" />
                  <p className="font-editorial text-xl text-[#F4F1EB] mb-2">No Saved Measurements</p>
                  <p className="text-xs font-sans-clean text-[#888] max-w-sm mx-auto mb-6">
                    Record your 8 anatomical body dimensions in the Measurement Studio for pattern drafting.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMeasurements();
                    }}
                    className="px-6 py-2.5 bg-[#C5A46D] text-black font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Open Measurement Studio
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#121215] border border-[#222] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#C5A46D]">ORDER #NR-94182 · ARCHIVED</div>
                  <div className="text-sm font-editorial text-[#F4F1EB] mt-0.5">
                    The Sovereign Peak Lapel Bespoke Suit
                  </div>
                  <div className="text-[11px] font-mono text-[#888]">
                    Tasmanian Super 160s · Delivered to Mayfair Atelier
                  </div>
                </div>
                <span className="text-xs font-mono bg-[#1C1C22] text-[#C5A46D] px-2.5 py-1 border border-[#C5A46D]/30">
                  Completed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
