import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    discountCode,
    discountPercentage,
    applyDiscountCode,
    clearCart,
  } = useCart();

  const [promo, setPromo] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);

  // Checkout form state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  // Shipping dynamic calculation
  const isMetro = ['110001', '400001', '560001', '600001', '700001'].includes(pincode.trim().substring(0, 6));
  const freeShippingThreshold = 999;
  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = rawSubtotal >= freeShippingThreshold ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyDiscountCode(promo);
    if (success) {
      setPromoSuccess(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoSuccess(false);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !pincode || !address) return;
    
    // Create mock order ID
    const randomId = 'OJAS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutStep('success');
  };

  const handleOrderReset = () => {
    clearCart();
    setCheckoutStep('cart');
    setName('');
    setEmail('');
    setPhone('');
    setPincode('');
    setAddress('');
    setCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
      <div className="drawer-content" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🛒 Shopping Cart <span style={{ fontSize: '0.85rem', color: 'var(--gold)', background: 'rgba(201,168,76,0.1)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{cartCount}</span>
          </h2>
          <button onClick={() => setCartOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {checkoutStep === 'success' ? (
          /* Step 3: SUCCESS Screen */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'float 5s ease-in-out infinite' }}>🌿</div>
            <div className="section-tag" style={{ background: 'rgba(76,201,135,0.1)', border: '1px solid #4cc987', color: '#4cc987', marginBottom: '1.5rem' }}>ORDER PLACED SUCCESSFULLY</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>
              Your Longevity Protocol is on the Way!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 320 }}>
              Order ID: <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{orderId}</span><br />
              We have sent a medical checklist & shipment tracking link to your email <span style={{ color: 'white' }}>{email}</span>.
            </p>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, width: '100%', marginBottom: '2rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>SHIPPING TO:</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>{address}, {pincode}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, marginTop: '0.5rem' }}>
                🚚 {isMetro ? 'Express Metro Same-Day Delivery active!' : 'Standard Dispatch (2-3 business days)'}
              </div>
            </div>
            <button onClick={handleOrderReset} className="submit-btn" style={{ width: '100%' }}>Continue Shopping</button>
          </div>
        ) : checkoutStep === 'details' ? (
          /* Step 2: Customer Checkout Details */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'white', marginBottom: '1.5rem' }}>
              Shipping & Delivery Details
            </h3>
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <div>
                <label className="form-label">Full Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className="form-input" />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="form-input" />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile number" className="form-input" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Pincode</label>
                  <input required type="text" maxLength={6} value={pincode} onChange={e => setPincode(e.target.value)} placeholder="e.g. 400001" className="form-input" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
                  {pincode.length >= 6 && (
                    <div style={{ fontSize: '0.75rem', color: isMetro ? '#4cc987' : 'var(--gold)', fontWeight: 600 }}>
                      {isMetro ? '⚡ Same-Day Express Pincode' : '🚚 Standard Shipping Pincode'}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Full Delivery Address</label>
                <textarea required rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="House/Flat No, Apartment, Street name, City" className="form-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
              </div>

              {/* Order summary box */}
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(201,168,76,0.1)', marginTop: 'auto', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
                  <span>Subtotal:</span>
                  <span>₹{rawSubtotal.toLocaleString()}</span>
                </div>
                {discountPercentage > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4cc987', marginBottom: '0.5rem' }}>
                    <span>Promo Applied ({discountCode}):</span>
                    <span>-₹{(rawSubtotal * discountPercentage / 100).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: 'white', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--gold)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setCheckoutStep('cart')} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>Back to Cart</button>
                <button type="submit" className="submit-btn" style={{ flex: 2 }}>Confirm Cod Order</button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 1: CART Listing */
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              {cartItems.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                  <h3 style={{ color: 'white', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Your Cart is Empty</h3>
                  <p style={{ fontSize: '0.85rem', maxWidth: 220 }}>Browse our catalog and select clinical formulations to begin.</p>
                </div>
              ) : (
                <>
                  {/* Free Shipping Meter */}
                  <div style={{ padding: '1rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>
                      {rawSubtotal >= freeShippingThreshold ? (
                        <span>🎉 You qualify for <span style={{ color: 'var(--gold)' }}>FREE SHIPPING!</span></span>
                      ) : (
                        <span>Add <span style={{ color: 'var(--gold)' }}>₹{(freeShippingThreshold - rawSubtotal).toLocaleString()}</span> more for FREE SHIPPING!</span>
                      )}
                      <span>₹{rawSubtotal} / ₹{freeShippingThreshold}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--gold)', width: `${Math.min((rawSubtotal / freeShippingThreshold) * 100, 100)}%`, transition: 'width 0.3s ease' }} />
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cartItems.map((item) => (
                      <div key={item.product.name} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: item.product.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                          {item.product.icon}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700 }}>{item.product.name}</h4>
                              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{item.product.size}</span>
                            </div>
                            <button onClick={() => removeFromCart(item.product.name)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.85rem' }}>✕</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '2px 8px' }}>
                              <button onClick={() => updateQuantity(item.product.name, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: '20px', height: '20px', fontWeight: 700 }}>-</button>
                              <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.name, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: '20px', height: '20px', fontWeight: 700 }}>+</button>
                            </div>
                            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart Footer Summary */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.15)', background: 'rgba(10,26,15,0.98)' }}>
                {/* Promo application */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <input type="text" value={promo} onChange={e => setPromo(e.target.value)} placeholder="PROMO CODE (e.g. QUIZ15)" style={{ flex: 1, padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 100, color: 'white', fontSize: '0.8rem', outline: 'none' }} />
                  <button type="submit" style={{ padding: '0.5rem 1.25rem', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 100, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Apply</button>
                </form>
                {promoError && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>⚠ Invalid code. Try "QUIZ15" or "LONGEVITY25"</div>}
                {promoSuccess && <div style={{ color: '#4cc987', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>✓ Promo code applied! Saved {discountPercentage}%</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span>Subtotal:</span>
                    <span>₹{rawSubtotal.toLocaleString()}</span>
                  </div>
                  {discountPercentage > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4cc987' }}>
                      <span>Promo Applied ({discountCode}):</span>
                      <span>-₹{(rawSubtotal * discountPercentage / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span>Estimated Shipping:</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'white', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.25rem' }}>
                    <span>Total Amount:</span>
                    <span style={{ color: 'var(--gold)' }}>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={() => setCheckoutStep('details')} className="submit-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Checkout Securely ₹{grandTotal.toLocaleString()} →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
