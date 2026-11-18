import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, CheckCircle, ArrowRight, ShieldCheck, Lock, Truck, CreditCard } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    deliveryMethod: 'white-glove',
    paymentMethod: 'demo-card',
    specialInstructions: '',
  });

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = item.bespokeDetails ? item.bespokeDetails.basePrice : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const shippingCost = formData.deliveryMethod === 'white-glove' ? 0 : 0;
  const total = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `NOIRE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0A0A0C] border border-[#1E1E22] text-[#F4F1EB] shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-[#1C1C1F] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A46D]">
              NOIRÉ ATELIER · DEMONSTRATION CHECKOUT
            </div>
            <h3 className="font-editorial text-2xl text-[#F4F1EB]">
              {orderConfirmed ? 'Order Confirmed' : 'Bespoke Order Protocol'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 text-[#888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Order Confirmation View */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#C5A46D]/10 border border-[#C5A46D] rounded-full flex items-center justify-center text-[#C5A46D] mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="text-xs font-mono tracking-widest uppercase text-[#C5A46D] mb-2">
              ACQUISITION CONFIRMED · {orderId}
            </div>

            <h4 className="font-editorial text-3xl sm:text-4xl text-[#F4F1EB] mb-4">
              Thank You, {formData.firstName || 'Honored Client'}
            </h4>

            <p className="text-sm font-sans-clean text-[#B8B8B8] max-w-lg leading-relaxed mb-8">
              Your tailoring commission has been registered with our Savile Row & Milano cutting rooms. A private atelier dossier confirmation has been dispatched to <span className="text-[#C5A46D] font-mono">{formData.email || 'your email'}</span>.
            </p>

            <div className="w-full max-w-md bg-[#0F0F12] border border-[#1E1E22] p-5 text-left text-xs font-mono space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[#888]">Reference Code:</span>
                <span className="text-[#F4F1EB] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Delivery Method:</span>
                <span className="text-[#F4F1EB]">
                  {formData.deliveryMethod === 'white-glove' ? 'White-Glove Courier' : 'Mayfair Atelier Collection'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Destination:</span>
                <span className="text-[#F4F1EB]">{formData.city || 'London'}, {formData.country}</span>
              </div>
              <div className="flex justify-between text-[#C5A46D] pt-2 border-t border-[#1C1C1F]">
                <span>Total Amount:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black font-mono text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer"
            >
              Return To Atelier
            </button>
          </div>
        ) : (
          /* Step-by-Step Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1C1C1F] text-xs font-mono">
              <span className={step >= 1 ? 'text-[#C5A46D]' : 'text-[#666]'}>1. Contact</span>
              <span className="text-[#444]">→</span>
              <span className={step >= 2 ? 'text-[#C5A46D]' : 'text-[#666]'}>2. Delivery</span>
              <span className="text-[#444]">→</span>
              <span className={step >= 3 ? 'text-[#C5A46D]' : 'text-[#666]'}>3. Shipping</span>
              <span className="text-[#444]">→</span>
              <span className={step >= 4 ? 'text-[#C5A46D]' : 'text-[#666]'}>4. Payment</span>
            </div>

            {/* STEP 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-4">
                  Gentleman's Contact Dossier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">First Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Alexander"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">Last Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Montgomery"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="montgomery@mayfair.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">Telephone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 20 7946 0912"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Address */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-4">
                  Bespoke Delivery Address
                </h4>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#888] mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    placeholder="14 Savile Row, Mayfair"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">City</label>
                    <input
                      required
                      type="text"
                      placeholder="London"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">Postal Code</label>
                    <input
                      required
                      type="text"
                      placeholder="W1S 3JN"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888] mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#121215] border border-[#222] px-4 py-2.5 text-sm font-sans-clean text-[#F4F1EB] focus:border-[#C5A46D] outline-none cursor-pointer"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Japan">Japan</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Delivery Method */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-4">
                  Select Delivery Protocol
                </h4>
                <div className="space-y-3">
                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'white-glove' })}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      formData.deliveryMethod === 'white-glove'
                        ? 'bg-[#18181C] border-[#C5A46D]'
                        : 'bg-[#0E0E10] border-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#C5A46D]" />
                      <div>
                        <div className="text-sm font-editorial text-[#F4F1EB]">
                          Insured White-Glove Courier Delivery
                        </div>
                        <div className="text-xs text-[#888]">
                          Delivered on cedar hanger within padded breathable garment trunk. Signature required.
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C5A46D]">Complimentary</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'atelier-pickup' })}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      formData.deliveryMethod === 'atelier-pickup'
                        ? 'bg-[#18181C] border-[#C5A46D]'
                        : 'bg-[#0E0E10] border-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
                      <div>
                        <div className="text-sm font-editorial text-[#F4F1EB]">
                          Private Atelier Collection & Personal Fitting
                        </div>
                        <div className="text-xs text-[#888]">
                          Available at NOIRÉ Mayfair (London) or Via Montenapoleone (Milano).
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C5A46D]">Complimentary</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Payment (Demo Clearly Labeled) */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="font-editorial text-2xl text-[#F4F1EB] mb-1">
                  Atelier Payment Authorisation
                </h4>
                <div className="p-3 bg-[#18181C] border border-[#C5A46D]/40 text-xs font-mono text-[#C5A46D] mb-4">
                  Notice: This is a demonstration luxury atelier portal. No real monetary charge will be processed.
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-[#121215] border border-[#222]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase text-[#F4F1EB] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#C5A46D]" />
                        <span>Corporate Atelier House Account / Demo Card</span>
                      </span>
                      <span className="text-xs font-mono text-[#888]">Direct Settlement</span>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        disabled
                        value="•••• •••• •••• 9421 (NOIRÉ Private Client)"
                        className="w-full bg-[#0A0A0C] border border-[#222] px-4 py-2 text-xs font-mono text-[#888]"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          disabled
                          value="EXP: 12/28"
                          className="w-full bg-[#0A0A0C] border border-[#222] px-4 py-2 text-xs font-mono text-[#888]"
                        />
                        <input
                          type="text"
                          disabled
                          value="CVC: •••"
                          className="w-full bg-[#0A0A0C] border border-[#222] px-4 py-2 text-xs font-mono text-[#888]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Order Review */}
                <div className="pt-4 border-t border-[#1C1C1F] space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#888]">
                    <span>Items ({items.length}):</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#888]">
                    <span>Courier & Bespoke Boxing:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F4F1EB] pt-2 border-t border-[#1C1C1F]">
                    <span>Total Authorization:</span>
                    <span className="text-[#C5A46D] tabular-nums">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-8 pt-6 border-t border-[#1C1C1F] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#888] hover:text-white cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-6 py-3 bg-[#1C1C1F] hover:bg-[#2A2A30] text-[#F4F1EB] text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C5A46D] hover:bg-[#DFCA9B] text-black font-mono text-xs font-semibold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5A46D]/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize Bespoke Commission</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
