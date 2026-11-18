import React from 'react';
import { CartItem } from '../../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollection,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = item.bespokeDetails ? item.bespokeDetails.basePrice : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#09090B] border-l border-[#1C1C1F] text-[#F4F1EB] h-full flex flex-col justify-between z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#1C1C1F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#C5A46D]" />
            <h3 className="font-editorial text-2xl text-[#F4F1EB]">Shopping Bag</h3>
            <span className="text-xs font-mono text-[#888]">({items.length})</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Bag"
            className="p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag className="w-12 h-12 text-[#333] mb-4" />
              <div className="font-editorial text-2xl text-[#F4F1EB] mb-2">
                Your Bag is Empty
              </div>
              <p className="text-xs font-sans-clean text-[#888] max-w-xs mb-6">
                Discover our hand-canvassed bespoke suits, fine Egyptian twill shirts, and tailoring accessories.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollection();
                }}
                className="px-6 py-3 bg-[#C5A46D] text-black font-mono text-xs font-semibold tracking-widest uppercase transition-all hover:bg-[#DFCA9B] cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.bespokeDetails
                ? item.bespokeDetails.basePrice
                : item.product.price;

              return (
                <div
                  key={item.id}
                  className="p-4 bg-[#0E0E11] border border-[#1C1C1F] flex gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover shrink-0 border border-[#222]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-editorial text-lg text-[#F4F1EB] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-[#666] hover:text-[#C5A46D] transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-[#8C8C92] mt-1 space-y-0.5">
                        <div>Size: {item.selectedSize} · Color: {item.selectedColor}</div>
                        {item.bespokeDetails && (
                          <div className="text-[#C5A46D] text-[10px]">
                            Bespoke: {item.bespokeDetails.fitPreference} · Monogram: "{item.bespokeDetails.monogramText}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#1C1C1F]">
                      <div className="flex items-center border border-[#2A2A2E]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-sm font-semibold text-[#F4F1EB] tabular-nums">
                        ${(unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#1C1C1F] bg-[#0C0C0E] space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#888]">
                <span>Bespoke Hand-Finishing:</span>
                <span className="text-[#F4F1EB]">Complimentary</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>White-Glove Courier:</span>
                <span className="text-[#F4F1EB]">Included</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F4F1EB] pt-2 border-t border-[#1C1C1F]">
                <span>Estimated Subtotal:</span>
                <span className="text-[#C5A46D] tabular-nums">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5A46D]/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#777] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Complimentary alterations within 60 days of delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
