import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product, GarmentCategory } from '../../types';
import { Heart, Eye, ShoppingBag, SlidersHorizontal } from 'lucide-react';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'suits', label: 'Tailored Suits' },
    { id: 'shirts', label: 'Formal Shirts' },
    { id: 'waistcoats', label: 'Waistcoats' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      searchFilter === '' ||
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.cloth.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="collection" className="py-24 bg-[#050505] border-t border-[#141414] text-[#F4F1EB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C5A46D] mb-3">
              THE NOIRÉ COLLECTION · HAUTE VESTIAIRE
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#F4F1EB] tracking-tight">
              Ready-to-Wear & Semi-Bespoke
            </h2>
          </div>
          <div className="text-xs font-mono text-[#B8B8B8]">
            Showing <span className="text-[#C5A46D] font-bold">{filteredProducts.length}</span> Masterpieces
          </div>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1C1C1F]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1C1C1F] text-[#C5A46D] border-b-2 border-[#C5A46D]'
                    : 'text-[#B8B8B8] hover:text-[#F4F1EB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Search Controls */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search cloth or garment..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-[#0C0C0E] border border-[#222225] px-3 py-1.5 text-xs font-mono text-[#F4F1EB] placeholder-[#666] focus:border-[#C5A46D] outline-none w-44 sm:w-56"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0C0C0E] border border-[#222225] px-3 py-1.5 text-xs font-mono text-[#F4F1EB] focus:border-[#C5A46D] outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-[#B8B8B8] border border-dashed border-[#222]">
            <p className="font-editorial text-2xl text-[#F4F1EB] mb-2">No garments found</p>
            <p className="text-xs font-mono">Try adjusting your search terms or filter selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative bg-[#0C0C0E] border border-[#1C1C1F] hover:border-[#333338] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Hover Zoom & Secondary Image toggle */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#080808]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      aria-label="Save to Wishlist"
                      className="absolute top-4 right-4 p-2 bg-[#050505]/70 hover:bg-[#050505] text-[#F4F1EB] hover:text-[#C5A46D] transition-colors z-10 cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A46D] text-[#C5A46D]' : ''}`}
                      />
                    </button>

                    {/* Quick View Button overlay on hover */}
                    <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 py-2.5 bg-[#050505]/90 hover:bg-[#C5A46D] hover:text-black text-[#F4F1EB] text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#222]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#C5A46D] mb-1">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Full Canvas</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-editorial text-2xl text-[#F4F1EB] hover:text-[#C5A46D] transition-colors cursor-pointer mb-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs font-sans-clean text-[#8C8C92] line-clamp-2 mb-3">
                        {product.cloth}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1C1C1F] flex items-center justify-between">
                      {/* Price in Tabular figures */}
                      <span className="font-mono text-base font-semibold text-[#F4F1EB] tabular-nums">
                        ${product.price.toLocaleString()}
                      </span>

                      {/* Quick Add Button */}
                      <button
                        onClick={() => onAddToCart(product, product.colors[0]?.name || 'Standard', product.sizes[0] || '40R')}
                        className="px-3 py-1.5 bg-[#18181A] hover:bg-[#C5A46D] hover:text-black text-[#F4F1EB] text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer border border-[#2A2A2E]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
