import React, { useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';

interface CampaignVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignVideoModal: React.FC<CampaignVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#08080A] border border-[#222226] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="w-4 h-4 text-[#C5A46D]" />
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A46D]">
                CINEMATIC CAMPAIGN ARCHIVE
              </div>
              <h3 className="font-editorial text-xl text-[#F4F1EB]">
                NOIRÉ — The Floating Garment & Exploded Canvas
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close film"
            className="p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
          <video
            src="/assets/aistudio/WhatsApp_Video_2026-11-12_at_9.14.50_PM_a933c03f.mp4"
            controls
            autoPlay
            playsInline
            className="w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Video Chapters Reference Footer */}
        <div className="p-4 bg-[#0A0A0D] border-t border-[#1A1A1E] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <div className="text-[#C5A46D]">01. THE FOUNDATION</div>
            <div className="text-[#888] text-[11px]">Egyptian 140-Ply Twill</div>
          </div>
          <div>
            <div className="text-[#C5A46D]">02. THE WAISTCOAT</div>
            <div className="text-[#888] text-[11px]">Structure, Held Close</div>
          </div>
          <div>
            <div className="text-[#C5A46D]">03. THE CANVAS</div>
            <div className="text-[#888] text-[11px]">Built on Full Canvas</div>
          </div>
          <div>
            <div className="text-[#C5A46D]">07. THE DETAIL</div>
            <div className="text-[#888] text-[11px]">The Last Quarter-Inch</div>
          </div>
        </div>
      </div>
    </div>
  );
};
