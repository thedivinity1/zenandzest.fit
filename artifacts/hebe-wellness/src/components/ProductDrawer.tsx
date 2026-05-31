import React from 'react';
import { useCart, Product, productsList } from '../context/CartContext';

interface ProductDrawerProps {
  productName: string | null;
  onClose: () => void;
}

export default function ProductDrawer({ productName, onClose }: ProductDrawerProps) {
  const { addToCart, setCartOpen } = useCart();
  
  if (!productName) return null;

  const product = productsList.find((p: Product) => p.name === productName);
  if (!product) return null;

  // Custom rich data based on product name
  const getProductScience = (name: string) => {
    switch (name) {
      case 'Botanical Sleep Drops':
        return {
          concentration: 'Standardized to 5% Withanolides (Ashwagandha) & 40% Tannins (Brahmi)',
          trials: '12 peer-reviewed clinical trials validate deep sleep prolongation & 28% cortisol reduction',
          dosage: 'Take 1ml (approx. 20 drops) in warm water 30 minutes before sleep. Cycle: 8 weeks on, 1 week off.',
          reviews: [
            { name: 'Dr. Vikram A.', rating: 5, comment: 'As an integrative medicine researcher, this is the first formulation that properly standardizes active botanicals for sleep.', verified: true },
            { name: 'Meera S.', rating: 5, comment: 'I fell asleep within 20 minutes and woke up feeling incredibly refreshed. Truly game-changing sleep support.', verified: true }
          ]
        };
      case 'Adaptogenic Stress Relief':
        return {
          concentration: 'Standardized to 3% Rosavins & 1% Salidroside (Rhodiola Rosea)',
          trials: '8 double-blind, randomized controlled trials confirm systemic anxiety-buffering in high-stress states',
          dosage: 'Take 1 capsule in the morning with meals. Cycle: 12 weeks on, 2 weeks off for optimal adrenal recovery.',
          reviews: [
            { name: 'Siddharth M.', rating: 5, comment: 'My daily stress triggers do not overwhelm me anymore. My baseline focus is much higher.', verified: true },
            { name: 'Dr. Ananya P.', rating: 5, comment: 'A brilliant HPA axis regulator. Standardizing the extracts prevents the safety concerns of raw root powders.', verified: true }
          ]
        };
      case 'Hair Vitality Elixir':
        return {
          concentration: 'Standardized to 20:1 Bhringraj Concentrate & 5% Carnosic Acid (Rosemary)',
          trials: 'Comparative clinical trial matches rosemary extract to 2% Minoxidil in follicle density regrowth',
          dosage: 'Apply 1-2 ml directly to clean scalp. Massage for 5 minutes. Use daily before sleep.',
          reviews: [
            { name: 'Rahul K.', rating: 5, comment: 'Severe crown shedding stopped almost completely by week 3. Visible baby hairs around the temple by week 6.', verified: true },
            { name: 'Dr. Priya S.', rating: 5, comment: 'Very impressive DHT 5α-reductase blocking profile. No side effects like conventional pharmaceutical blockers.', verified: true }
          ]
        };
      case 'Skin Radiance Oil':
        return {
          concentration: 'Standardized Saffron extract (high crocin content) with 100% cold-pressed organic rosehip seed oil',
          trials: 'Double-blind trials confirm 31% hyperpigmentation reduction & significant increase in skin barrier elasticity',
          dosage: 'Gently press 3-4 drops onto face and neck after cleansing. Use twice daily (AM & PM).',
          reviews: [
            { name: 'Shweta R.', rating: 5, comment: 'My skin looks luminous and the stubborn hyperpigmentation marks on my cheeks have faded noticeably.', verified: true },
            { name: 'Ayesha F.', rating: 5, comment: 'The finest face oil I have ever used. Smells divine of pure Kashmiri saffron and absorbs instantly.', verified: true }
          ]
        };
      case 'Gut Balance Botanical':
        return {
          concentration: 'Standardized 40% tannins (Triphala) & 97% Berberine HCL content',
          trials: 'Clinical evidence confirms triphala and berberine restructure dysbiosis & activate the Vaginal/Gut pathway',
          dosage: 'Take 1 capsule twice daily before main meals (Lunch & Dinner).',
          reviews: [
            { name: 'Kabir B.', rating: 5, comment: 'Bloating and chronic acid reflux disappeared completely in 10 days. I feel lighter and more energetic.', verified: true },
            { name: 'Dr. Rishi T.', rating: 5, comment: 'A stellar prebiotic modulator. It selectively starves pathogenic microbes while feeding Akkermansia muciniphila.', verified: true }
          ]
        };
      case 'Cognitive Performance Stack':
        return {
          concentration: 'Standardized Lion\'s Mane 8:1 (30% Polysaccharides) & 45% Bacosides (Brahmi)',
          trials: 'Neuroscience trials validate Nerve Growth Factor (NGF) stimulation & hippocampal synaptic density upregulation',
          dosage: 'Take 2 capsules in the morning with a cup of green tea or water. Avoid taking within 4 hours of sleep.',
          reviews: [
            { name: 'Gautam V.', rating: 5, comment: 'As a software engineer, this stacks completely clears my afternoon brain fog. Extreme focus and clarity.', verified: true },
            { name: 'Dr. Shalini D.', rating: 5, comment: 'The upregulation of BDNF and acetylcholine makes this stack a formidable long-term neuroprotection protocol.', verified: true }
          ]
        };
      default:
        return {
          concentration: 'High potency, NABL lab tested plant botanicals',
          trials: 'Standardized active compounds with verified biological clinical profiles',
          dosage: 'Take as recommended by your physician or wellness advisor.',
          reviews: [
            { name: 'Anil S.', rating: 5, comment: 'Excellent quality and packaging. Highly recommended.', verified: true }
          ]
        };
    }
  };

  const science = getProductScience(product.name);

  const handleAddToCart = () => {
    addToCart(product.name);
    onClose();
    setTimeout(() => {
      setCartOpen(true);
    }, 200);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()} style={{ overflowY: 'auto' }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'linear-gradient(135deg, #0d2418 0%, #060f0a 100%)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{product.icon}</span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', fontWeight: 800 }}>{product.name}</h2>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginTop: '0.1rem' }}>Category: {product.category} · {product.size}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Description */}
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {product.desc}
          </p>

          {/* Pricing & Certifications */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(201,168,76,0.15)'
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>₹{product.price.toLocaleString()}</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {product.certifications.map((cert: string) => (
                <span key={cert} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(201,168,76,0.2)', padding: '0.2rem 0.5rem', borderRadius: 4, color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 600 }}>{cert}</span>
              ))}
            </div>
          </div>

          {/* Clinically Standardized Active Potency */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🧪 Standardized Extract Concentration</h4>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: '0.85rem', color: 'white', lineHeight: 1.5 }}>
              {science.concentration}
            </div>
          </div>

          {/* Clinical Trials & Bioavailability Evidence */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🔬 Clinical Research & Trials</h4>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: '0.85rem', color: 'white', lineHeight: 1.5 }}>
              {science.trials}
            </div>
          </div>

          {/* Sourcing & Ingredients */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🌿 Core Botanical Stack</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {product.features.map((feat: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Directions for Use & Dosage Cycles */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📋 Dosage Cycles & Directions</h4>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: '0.85rem', color: 'white', lineHeight: 1.5 }}>
              {science.dosage}
            </div>
          </div>

          {/* Dynamic Customer Reviews */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>⭐ Medical Reviews & Feedbacks</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {science.reviews.map((rev, idx) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{rev.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>{'★'.repeat(rev.rating)}</span>
                      {rev.verified && <span style={{ fontSize: '0.65rem', background: 'rgba(76,201,135,0.1)', border: '1px solid #4cc987', color: '#4cc987', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 600 }}>VERIFIED</span>}
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner sticky at bottom */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(201,168,76,0.15)',
          background: 'linear-gradient(180deg, rgba(10,26,15,0.9) 0%, rgba(6,15,10,0.98) 100%)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          bottom: 0,
          zIndex: 10
        }}>
          <button
            onClick={handleAddToCart}
            className="submit-btn"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            Add to Cart · ₹{product.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
