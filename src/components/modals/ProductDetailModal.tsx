import React, { useState } from 'react';
import { Product } from '../../types';
import { X, Heart, ShoppingBag, SlidersHorizontal, ShieldCheck, Ruler, ArrowRight, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onCustomizeBespoke: (preset: 'suit' | 'shirt' | 'waistcoat') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onCustomizeBespoke,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '40R');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#0A0A0C] border border-[#1E1E22] text-[#F4F1EB] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-5 right-5 p-2 bg-[#121215] text-[#888] hover:text-white hover:bg-[#1E1E22] transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery (6 Cols) */}
          <div className="md:col-span-6 bg-[#060606] p-6 flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#1A1A1D]">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-20 border overflow-hidden cursor-pointer transition-all ${
                    activeImage === product.image ? 'border-[#C5A46D]' : 'border-[#222] opacity-60'
                  }`}
                >
                  <img
                    src={product.image}
                    alt="Main"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-16 h-20 border overflow-hidden cursor-pointer transition-all ${
                    activeImage === product.secondaryImage ? 'border-[#C5A46D]' : 'border-[#222] opacity-60'
                  }`}
                >
                  <img
                    src={product.secondaryImage}
                    alt="Secondary"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module (6 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C5A46D] mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Hand-Canvassed</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EB] mb-2">
                {product.name}
              </h2>

              <p className="text-xs font-mono text-[#8C8C92] mb-4">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="font-mono text-2xl font-bold text-[#F4F1EB] tabular-nums mb-6">
                ${product.price.toLocaleString()}
              </div>

              {/* Description */}
              <p className="text-xs font-sans-clean text-[#B8B8B8] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase text-[#888] mb-2">
                  Selected Shade: <span className="text-[#F4F1EB]">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-[#C5A46D] bg-[#18181C] text-[#F4F1EB]'
                          : 'border-[#222] text-[#888] hover:border-[#444]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-[#888]">
                    Selected Size: <span className="text-[#F4F1EB]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide((prev) => !prev)}
                    className="text-xs font-mono text-[#C5A46D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono uppercase text-center border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#C5A46D] border-[#C5A46D] text-black font-semibold'
                          : 'bg-[#121215] border-[#222] text-[#B8B8B8] hover:border-[#444]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-[#121215] border border-[#26262B] text-xs font-mono text-[#8C8C92] space-y-1">
                    <div className="text-[#C5A46D] uppercase">Savile Row Sizing Reference:</div>
                    <div>38R: Chest 38" · Shoulder 18.0" · Sleeve 25.0"</div>
                    <div>40R: Chest 40" · Shoulder 18.5" · Sleeve 25.5"</div>
                    <div>42R: Chest 42" · Shoulder 19.0" · Sleeve 26.0"</div>
                    <div>44R: Chest 44" · Shoulder 19.5" · Sleeve 26.5"</div>
                    <div>Bespoke: Individual paper pattern cut to client profile</div>
                  </div>
                )}
              </div>

              {/* Tailoring Key Points */}
              <div className="mb-8 pt-4 border-t border-[#1C1C1F] space-y-2">
                <div className="text-xs font-mono uppercase text-[#888]">Craftsmanship Notes:</div>
                <ul className="space-y-1.5 text-xs text-[#8C8C92] font-sans-clean">
                  {product.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#C5A46D] rounded-full mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-[#1C1C1F]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5A46D]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className={`p-4 border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#C5A46D] bg-[#141418] text-[#C5A46D]'
                      : 'border-[#222] bg-[#121215] text-[#888] hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A46D]' : ''}`} />
                </button>
              </div>

              {product.explodedModelType && (
                <button
                  onClick={() => {
                    onClose();
                    onCustomizeBespoke(product.explodedModelType!);
                  }}
                  className="w-full py-3 bg-[#141418] hover:bg-[#1E1E24] border border-[#2A2A30] text-xs font-mono tracking-widest uppercase text-[#F4F1EB] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>Customize in Bespoke Atelier</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777] font-mono pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Complimentary global insured courier · Signature required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
