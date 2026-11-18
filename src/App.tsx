import React, { useState, useEffect } from 'react';
import { Product, CartItem, BespokeConfig, MeasurementProfile } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/layout/Navbar';
import { HeroSilhouette } from './components/sections/HeroSilhouette';
import { ExplodedGarmentSection } from './components/sections/ExplodedGarmentSection';
import { CampaignEditorial } from './components/sections/CampaignEditorial';
import { CollectionSection } from './components/sections/CollectionSection';
import { BespokeConfigurator } from './components/sections/BespokeConfigurator';
import { MeasurementStudio } from './components/sections/MeasurementStudio';
import { CraftsmanshipSection } from './components/sections/CraftsmanshipSection';
import { Footer } from './components/layout/Footer';

// Modals
import { CartDrawer } from './components/modals/CartDrawer';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { SearchModal } from './components/modals/SearchModal';
import { AccountModal } from './components/modals/AccountModal';
import { CampaignVideoModal } from './components/modals/CampaignVideoModal';

export default function App() {
  // 1. Persistent Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('noire_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('noire_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // 2. Persistent Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('noire_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('noire_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // 3. Persistent Measurements
  const [savedMeasurements, setSavedMeasurements] = useState<MeasurementProfile | null>(() => {
    try {
      const saved = localStorage.getItem('noire_measurements');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSaveProfile = (profile: MeasurementProfile) => {
    setSavedMeasurements(profile);
    try {
      localStorage.setItem('noire_measurements', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  // 4. Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Preset for Bespoke Atelier
  const [bespokePreset, setBespokePreset] = useState<'suit' | 'shirt' | 'waistcoat'>('suit');

  // Handlers
  const handleAddToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size &&
          !item.bespokeDetails
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      const newItem: CartItem = {
        id: `${product.id}-${color}-${size}-${Date.now()}`,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const handleAddBespokeToCart = (config: BespokeConfig) => {
    // Find matching base product or construct a custom one
    const baseProduct = PRODUCTS.find((p) => p.explodedModelType === bespokePreset) || PRODUCTS[0];

    const newItem: CartItem = {
      id: `bespoke-${Date.now()}`,
      product: {
        ...baseProduct,
        name: `Bespoke ${config.garmentType}`,
        subtitle: `${config.fabric} · Hand-Cut Pattern`,
        price: config.basePrice,
      },
      selectedColor: config.fabricColor,
      selectedSize: 'Bespoke Custom',
      quantity: 1,
      bespokeDetails: config,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuickAdd = (productSlug: string) => {
    const prod = PRODUCTS.find((p) => p.id === productSlug);
    if (prod) {
      handleAddToCart(prod, prod.colors[0]?.name || 'Standard', prod.sizes[0] || '40R', 1);
    }
  };

  const handleOpenBespokeWithPreset = (preset: 'suit' | 'shirt' | 'waistcoat') => {
    setBespokePreset(preset);
    const el = document.getElementById('bespoke-atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProduct = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EB] flex flex-col font-sans-clean antialiased">
      {/* 1. Header Navigation */}
      <Navbar
        cartCount={cartTotalItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenFilm={() => setIsFilmOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Silhouette Section */}
        <HeroSilhouette
          onExploreCollection={() => scrollToSection('collection')}
          onDiscoverBespoke={() => scrollToSection('bespoke-atelier')}
          onWatchFilm={() => setIsFilmOpen(true)}
        />

        {/* 3. The Exploded Garment (Signature Feature directly inspired by video) */}
        <ExplodedGarmentSection
          onQuickAdd={handleQuickAdd}
          onOpenBespokeWithPreset={handleOpenBespokeWithPreset}
        />

        {/* 4. Campaign Editorial (High fashion photo narrative & video link) */}
        <CampaignEditorial
          onOpenFilm={() => setIsFilmOpen(true)}
          onExploreProduct={handleExploreProduct}
        />

        {/* 5. Collection Section (E-commerce browsing, category filtering, search, sorting) */}
        <CollectionSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 6. Bespoke Configurator (9-step interactive customisation) */}
        <BespokeConfigurator
          onAddBespokeToCart={handleAddBespokeToCart}
          initialPreset={bespokePreset}
        />

        {/* 7. Measurement Studio (Guided 8-point measurement form with local persistence) */}
        <MeasurementStudio
          onSaveProfile={handleSaveProfile}
          savedProfile={savedMeasurements}
        />

        {/* 8. Craftsmanship & Fabric Section (Macro fabric stories & Savile Row heritage) */}
        <CraftsmanshipSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreCollection={() => scrollToSection('collection')}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, p.colors[0]?.name || 'Standard', p.sizes[0] || '40R', 1)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        savedMeasurements={savedMeasurements}
        onOpenMeasurements={() => scrollToSection('measurement')}
      />

      <CampaignVideoModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onCustomizeBespoke={handleOpenBespokeWithPreset}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
