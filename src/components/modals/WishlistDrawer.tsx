import React from 'react';
import { Product } from '../../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 transition-opacity" />

      <div className="relative w-full max-w-md bg-[#09090B] border-l border-[#1C1C1F] text-[#F4F1EB] h-full flex flex-col justify-between z-10 shadow-2xl">
        <div className="p-6 border-b border-[#1C1C1F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C5A46D] fill-[#C5A46D]" />
            <h3 className="font-editorial text-2xl text-[#F4F1EB]">Saved Pieces</h3>
            <span className="text-xs font-mono text-[#888]">({wishlistProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <Heart className="w-12 h-12 text-[#333] mb-4" />
              <div className="font-editorial text-2xl text-[#F4F1EB] mb-2">No Saved Garments</div>
              <p className="text-xs font-sans-clean text-[#888] max-w-xs">
                Select the heart icon on any silhouette in the collection to curate your personal wardrobe wishlist.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-[#0E0E11] border border-[#1C1C1F] flex gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover shrink-0 border border-[#222]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-editorial text-lg text-[#F4F1EB] leading-tight">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#666] hover:text-white p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs font-mono text-[#C5A46D] mt-1 tabular-nums">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product);
                    }}
                    className="w-full py-2 bg-[#1C1C1F] hover:bg-[#C5A46D] hover:text-black text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move To Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
