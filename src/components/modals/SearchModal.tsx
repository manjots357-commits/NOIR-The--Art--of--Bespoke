import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.cloth.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 flex items-start justify-center p-4 pt-20">
      <div className="relative w-full max-w-2xl bg-[#09090B] border border-[#222] text-[#F4F1EB] shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1F] mb-6">
          <div className="flex items-center gap-3 w-full">
            <Search className="w-5 h-5 text-[#C5A46D] shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search garments, cloth (e.g. Super 160s, Twill, Flannel)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-lg font-editorial text-[#F4F1EB] placeholder-[#666] outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Searches */}
        {query === '' && (
          <div className="mb-6">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#888] mb-3">
              CURATED ATELIER SEARCHES
            </div>
            <div className="flex flex-wrap gap-2">
              {['Full Canvas Suits', 'Egyptian Twill', 'Peak Lapel', 'Gurkha Trousers', 'Cashmere Overcoat'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term.toLowerCase())}
                    className="px-3 py-1 bg-[#121215] border border-[#222] text-xs font-mono text-[#B8B8B8] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-[#888]">
              No garments matching "{query}"
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 bg-[#111114] border border-[#1E1E22] hover:border-[#C5A46D]/60 flex items-center justify-between gap-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover border border-[#222]"
                  />
                  <div>
                    <h4 className="font-editorial text-base text-[#F4F1EB]">{product.name}</h4>
                    <div className="text-[11px] font-mono text-[#888]">{product.cloth}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#C5A46D] tabular-nums">
                    ${product.price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#888]" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
