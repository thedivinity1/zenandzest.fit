import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import ProductDrawer from '../components/ProductDrawer';

const categories = ['All', 'Sleep', 'Stress', 'Hair', 'Skin', 'Gut'];

const shopSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are Zen and Zest products lab certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every batch of Zen and Zest products is tested at NABL accredited laboratories for active phytochemical purity, potency, and safety (clearing all heavy metal testing under 1ppm)."
      }
    }
  ]
};

const products = [
  {
    name: 'Botanical Sleep Drops',
    category: 'Sleep',
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 1247,
    badge: 'Bestseller',
    badgeColor: '#c9a84c',
    gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0a2018 60%, #1a3d2e 100%)',
    icon: '🌙',
    desc: 'Deep, restorative sleep with Ashwagandha, Vijaya botanical complex & Brahmi. Non-habit forming.',
    features: ['Vijaya Botanical Complex', 'KSM-66 Ashwagandha', 'Brahmi Extract', 'Melatonin-free'],
    size: '30ml Tincture',
    certifications: ['FSSAI', 'GMP', 'Lab Tested'],
  },
  {
    name: 'Adaptogenic Stress Relief',
    category: 'Stress',
    price: 3499,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 893,
    badge: 'Top Rated',
    badgeColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #2d1f4e 0%, #1a1030 60%, #2d1f4e 100%)',
    icon: '⚡',
    desc: 'HPA axis support with Ashwagandha, Rhodiola & Shatavari. Clinically proven cortisol reduction.',
    features: ['Rhodiola Rosea', 'Ashwagandha Root', 'Shatavari', 'Holy Basil (Tulsi)'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Doctor Approved'],
  },
  {
    name: 'Hair Vitality Elixir',
    category: 'Hair',
    price: 2499,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 2134,
    badge: 'New Formula',
    badgeColor: '#059669',
    gradient: 'linear-gradient(135deg, #1f3a4e 0%, #0f2030 60%, #1f3a4e 100%)',
    icon: '✨',
    desc: 'Bhringraj, Rosemary & DHT-blocking botanicals that clinically match Minoxidil in hair regrowth studies.',
    features: ['Bhringraj Extract', 'Rosemary Essential Oil', 'Biotin 5000mcg', 'Iron Bisglycinate'],
    size: '60ml Serum',
    certifications: ['FSSAI', 'Dermatologist Tested', 'GMP'],
  },
  {
    name: 'Skin Radiance Oil',
    category: 'Skin',
    price: 2999,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 678,
    badge: 'Award Winning',
    badgeColor: '#d97706',
    gradient: 'linear-gradient(135deg, #4e2d1f 0%, #2e1a0f 60%, #4e2d1f 100%)',
    icon: '🌸',
    desc: 'Pure Kashmiri saffron, turmeric & rare seed oils for luminous, ageless skin. Luxury botanical skincare.',
    features: ['Kashmiri Saffron', 'Nano-Turmeric', 'Rosehip Seed Oil', 'Sea Buckthorn'],
    size: '30ml Face Oil',
    certifications: ['FSSAI', 'Cruelty-Free', 'Vegan'],
  },
  {
    name: 'Gut Balance Botanical',
    category: 'Gut',
    price: 1999,
    originalPrice: 2699,
    rating: 4.8,
    reviews: 1089,
    badge: 'Clinically Tested',
    badgeColor: '#1a3d2e',
    gradient: 'linear-gradient(135deg, #2d4e1f 0%, #1a2e0f 60%, #2d4e1f 100%)',
    icon: '🌿',
    desc: 'Triphala, Berberine & targeted prebiotics for microbiome diversity and gut-brain axis balance.',
    features: ['Triphala Complex', 'Berberine HCl', 'Prebiotic Fiber', 'Digestive Enzymes'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Clinically Studied'],
  },
  {
    name: 'Cognitive Performance Stack',
    category: 'Stress',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 421,
    badge: 'Premium',
    badgeColor: '#c9a84c',
    gradient: "linear-gradient(135deg, #1a3040 0%, #0a1520 60%, #1a3040 100%)",
    icon: '🧠',
    desc: "Lion's Mane, Brahmi & Saffron synergy for peak mental performance, memory, and cognitive longevity.",
    features: ["Lion's Mane Mushroom", 'Bacopa Monnieri', 'Saffron Extract', 'Phosphatidylserine'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Nootropic Grade'],
  },
];

export default function ShopPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { cartCount, addToCart, setCartOpen } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (name: string) => {
    addToCart(name);
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 2000);
  };


  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }} />
      {/* Hero */}
      <section className="shop-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-tag" style={{ marginBottom: '1rem' }}>The Collection</div>
          <h1 className="section-title" style={{ marginBottom: '1rem', maxWidth: 600 }}>
            Premium Plant <span className="gold-gradient-text">Botanical Formulations</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 700, marginBottom: '2rem', lineHeight: 1.8 }}>
            <strong>Answer-First:</strong> Our premium plant botanical formulations target sleep efficiency, stress recovery, hair vitality, skin resilience, and gut health. Every capsule or tincture is standardized to guarantee active molecular yields, verified by NABL-certified HPLC testing, and clear of heavy metals.
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🔬', label: 'Third-Party Lab Tested' },
              { icon: '🌿', label: '100% Plant Botanicals' },
              { icon: '🛡️', label: '30-Day Guarantee' },
              { icon: '🚀', label: 'Free Shipping ₹999+' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: fg('rgba(255,255,255,0.7)', '#334155'), fontSize: '0.85rem' }}>
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart notification */}
      {addedItem && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
          background: 'var(--forest-green)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: 12, padding: '1rem 1.5rem',
          color: fg('white', '#0f172a'), fontWeight: 600,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          animation: 'fade-in-up 0.3s ease'
        }}>
          ✓ {addedItem} added to cart
        </div>
      )}

      {/* Filter + Cart */}
      <div style={{ background: bg('var(--darkest)', '#f8fafc'), borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0', position: 'sticky', top: 70, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div 
            onClick={() => setCartOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem',
              cursor: 'pointer', padding: '0.5rem 1rem',
              border: '1px solid rgba(201,168,76,0.3)', borderRadius: '100px',
              background: 'rgba(201,168,76,0.05)'
            }}
          >
            🛒 Cart ({cartCount})
          </div>
        </div>
      </div>

      {/* Products */}
      <section style={{ background: bg('var(--darkest)', '#f8fafc'), padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {filtered.map((product, i) => (
              <ScrollAnimator key={i} className={`stagger-${(i % 3) + 1}`}>
                <div 
                  onClick={() => setSelectedProduct(product.name)}
                  style={{
                    background: bg('rgba(255,255,255,0.03)', 'rgba(0,0,0,0.03)'),
                    border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'),
                    borderRadius: 20, overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-6px)';
                    el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)';
                    el.style.borderColor = 'rgba(201,168,76,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {/* Image area */}
                  <div style={{ height: 200, background: product.gradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: '3.5rem' }}>{product.icon}</span>
                    <span style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      padding: '0.3rem 0.75rem', borderRadius: '100px',
                      background: product.badgeColor + '20',
                      border: `1px solid ${product.badgeColor}60`,
                      color: product.badgeColor === '#c9a84c' ? product.badgeColor : product.badgeColor,
                      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase'
                    }}>
                      {product.badge}
                    </span>
                    <div style={{
                      position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end'
                    }}>
                      {product.certifications.slice(0, 2).map(cert => (
                        <span key={cert} style={{
                          padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: 4,
                          color: fg('rgba(255,255,255,0.7)', '#334155'), fontSize: '0.65rem', fontWeight: 600
                        }}>{cert}</span>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 800, color: fg('white', '#0f172a'), marginBottom: '0.5rem' }}>
                      {product.name}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
                        {'★'.repeat(Math.floor(product.rating))}
                      </span>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>{product.rating}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), fontSize: '0.825rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {product.desc}
                    </p>

                    {/* Key ingredients */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {product.features.slice(0, 3).map(f => (
                        <span key={f} style={{
                          padding: '0.2rem 0.6rem',
                          background: 'rgba(201,168,76,0.06)',
                          border: '1px solid rgba(201,168,76,0.15)',
                          borderRadius: 100, color: 'rgba(201,168,76,0.8)',
                          fontSize: '0.7rem', fontWeight: 600
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold)' }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span style={{ marginLeft: '0.5rem', color: '#4caf84', fontSize: '0.8rem', fontWeight: 700 }}>
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{product.size}</span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product.name); }}
                      style={{
                        width: '100%', padding: '0.75rem',
                        background: 'linear-gradient(135deg, var(--forest-green) 0%, #0d2a1c 100%)',
                        color: fg('white', '#0f172a'), border: '1px solid rgba(201,168,76,0.2)',
                        borderRadius: 10, fontWeight: 700, fontSize: '0.9rem',
                        cursor: 'pointer', transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--darkest)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, var(--forest-green) 0%, #0d2a1c 100%)';
                        (e.currentTarget as HTMLElement).style.color = 'white';
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section style={{ background: 'var(--forest-green)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {[
              { icon: '🔬', title: 'Lab Certified', desc: 'Every batch tested at NABL accredited labs for purity, potency & safety' },
              { icon: '🌿', title: '100% Natural', desc: 'No synthetic additives, no fillers — pure botanical extracts only' },
              { icon: '🚚', title: 'Free Delivery', desc: 'Free shipping on orders over ₹999 across all Indian pincodes' },
              { icon: '🛡️', title: '30-Day Guarantee', desc: 'Not satisfied? Full refund, no questions asked within 30 days' },
            ].map((item, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), fontSize: '0.85rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){.shop-hero+div+div+div .container>div{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Product Detail Drawer */}
      <ProductDrawer productName={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
