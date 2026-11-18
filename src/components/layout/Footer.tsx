import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#040405] border-t border-[#141416] text-[#B8B8B8] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Tier: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#141416]">
          <div className="lg:col-span-5">
            <a href="#hero" className="font-cinzel text-3xl font-bold tracking-[0.25em] text-[#F4F1EB] block mb-3">
              NOIRÉ
            </a>
            <div className="text-xs font-mono tracking-[0.2em] text-[#C5A46D] uppercase mb-4">
              The Art of Bespoke · Savile Row & Milano
            </div>
            <p className="text-xs font-sans-clean text-[#8C8C92] max-w-sm leading-relaxed">
              Dedicated to the preservation of master tailoring, hand-padded horsehair canvassing, and rare botanical-dyed cloths.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#F4F1EB] uppercase mb-2">
                Private Gazette & Fitting Invitations
              </div>
              <p className="text-xs font-sans-clean text-[#8C8C92] mb-4">
                Receive private notices on incoming seasonal cloth arrivals from Biella and trunk show dates.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter client email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0C0C0E] border border-[#222226] px-4 py-2.5 text-xs font-mono text-[#F4F1EB] placeholder-[#666] outline-none focus:border-[#C5A46D] flex-1"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#F4F1EB] hover:bg-[#C5A46D] text-black font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Inquire
              </button>
            </form>

            {subscribed && (
              <div className="text-xs font-mono text-[#C5A46D] mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>You have been registered for private atelier notices.</span>
              </div>
            )}
          </div>
        </div>

        {/* Middle Tier: Global Ateliers & Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-[#141416] text-xs font-mono">
          <div>
            <div className="text-[#F4F1EB] uppercase tracking-wider mb-3">London Mayfair</div>
            <div className="text-[#888] space-y-1">
              <div>14 Savile Row</div>
              <div>Mayfair, London W1S 3JN</div>
              <div>+44 20 7946 0912</div>
            </div>
          </div>

          <div>
            <div className="text-[#F4F1EB] uppercase tracking-wider mb-3">Milano Montenapoleone</div>
            <div className="text-[#888] space-y-1">
              <div>Via Montenapoleone 8</div>
              <div>20121 Milano MI, Italy</div>
              <div>+39 02 8739 1045</div>
            </div>
          </div>

          <div>
            <div className="text-[#F4F1EB] uppercase tracking-wider mb-3">Paris Vendôme</div>
            <div className="text-[#888] space-y-1">
              <div>18 Place Vendôme</div>
              <div>75001 Paris, France</div>
              <div>+33 1 42 68 55 00</div>
            </div>
          </div>

          <div>
            <div className="text-[#F4F1EB] uppercase tracking-wider mb-3">Atelier Services</div>
            <ul className="text-[#888] space-y-1.5">
              <li><a href="#bespoke-atelier" className="hover:text-[#C5A46D] transition-colors">Bespoke Commissions</a></li>
              <li><a href="#measurement" className="hover:text-[#C5A46D] transition-colors">Measurement Studio</a></li>
              <li><a href="#craftsmanship" className="hover:text-[#C5A46D] transition-colors">Cloth & Horsehair Canvas</a></li>
              <li><a href="#collection" className="hover:text-[#C5A46D] transition-colors">Ready-to-Wear Vestiaire</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#666]">
          <div>
            © {new Date().getFullYear()} NOIRÉ HAUTE TAILORING LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#888] transition-colors">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-[#888] transition-colors">Bespoke Terms</span>
            <span>·</span>
            <span className="hover:text-[#888] transition-colors">Pattern Vault</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
