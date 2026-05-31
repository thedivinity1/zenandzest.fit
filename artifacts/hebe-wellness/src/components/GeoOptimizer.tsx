import React, { useState } from 'react';

interface LocalAdvice {
  city: string;
  seasonAdvice: string;
  recommendedProduct: string;
  deliverySpeed: string;
}

const localizedAdviceDatabase: Record<string, LocalAdvice> = {
  Mumbai: {
    city: 'Mumbai',
    seasonAdvice: 'High coastal humidity & monsoon dampness can destabilize scalp sebum levels. Protect your hair roots and prevent follicle clogging with standard Bhringraj & Rosemary serum.',
    recommendedProduct: 'Hair Vitality Elixir',
    deliverySpeed: '⚡ Same-Day Express Delivery active in Mumbai Metro!'
  },
  Delhi: {
    city: 'Delhi',
    seasonAdvice: 'Elevated urban particulate pollution & dry air drive oxidative cellular stress. Support your internal gut-brain barrier and metabolic detox pathways with Triphala & Berberine.',
    recommendedProduct: 'Gut Balance Botanical',
    deliverySpeed: '⚡ Same-Day Express Delivery active in NCR Region!'
  },
  Bangalore: {
    city: 'Bangalore',
    seasonAdvice: 'Mild mountain altitude and dry atmospheric winds accelerate epidermal dehydration. Restore structural skin lipids and glow with pure cold-pressed Saffron & Rosehip face oil.',
    recommendedProduct: 'Skin Radiance Oil',
    deliverySpeed: '⚡ Next-Day Express Delivery active in Bangalore!'
  },
  Chennai: {
    city: 'Chennai',
    seasonAdvice: 'Intense tropical heat spikes systemic cortisol and depletes physical energy reserves. Buffer endocrine stress responses and balance stress hormones with Shatavari Adaptogenic capsules.',
    recommendedProduct: 'Adaptogenic Stress Relief',
    deliverySpeed: '🚚 Fast 48-Hour Tracked Shipping to Chennai Metro!'
  },
  Hyderabad: {
    city: 'Hyderabad',
    seasonAdvice: 'Dry tropical heat drives afternoon energy crashes and brain fog. Keep cognitive synapses firing and accelerate BDNF neuron growth using organic Lion\'s Mane & Brahmi.',
    recommendedProduct: 'Cognitive Performance Stack',
    deliverySpeed: '🚚 Fast 48-Hour Tracked Shipping to Hyderabad!'
  }
};

export default function GeoOptimizer() {
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const advice = localizedAdviceDatabase[selectedCity] || localizedAdviceDatabase.Mumbai;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pincode.trim();
    if (pin.length < 6) {
      setPincodeStatus('⚠ Please enter a valid 6-digit Indian pincode.');
      return;
    }
    
    // Simple metro checks: Mumbai (400xxx), Delhi (110xxx), Bangalore (560xxx)
    const isExpress = ['400', '110', '560'].includes(pin.substring(0, 3));
    if (isExpress) {
      setPincodeStatus('⚡ Same-Day Express delivery active! Hand-delivered in 4-8 hours.');
    } else {
      setPincodeStatus('🚚 Standard Free Delivery active! Hand-delivered via express air in 2-3 business days.');
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(201, 168, 76, 0.15)',
      borderRadius: '24px',
      padding: '2.5rem',
      maxWidth: '100%',
      backdropFilter: 'blur(12px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
        background: 'linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%)'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }} className="geo-grid-inner">
        {/* Left: Seasonal Regional Wellness advice */}
        <div>
          <div className="section-tag" style={{ marginBottom: '1rem' }}>📍 GEO-TARGETED WELLNESS ADVISOR</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', marginBottom: '1rem' }}>
            Regional Bio-Climate Protocol for <span style={{ color: 'var(--gold)' }}>{advice.city}</span>
          </h3>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {Object.keys(localizedAdviceDatabase).map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '100px',
                  border: `1px solid ${selectedCity === city ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`,
                  background: selectedCity === city ? 'var(--gold)' : 'transparent',
                  color: selectedCity === city ? '#000' : 'rgba(255,255,255,0.7)',
                  fontSize: '0.78rem',
                  fontWeight: selectedCity === city ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {city}
              </button>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {advice.seasonAdvice}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>RECOMMENDED STACK:</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 700, borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '0.1rem' }}>{advice.recommendedProduct}</span>
          </div>
        </div>

        {/* Right: Pincode Express dispatch checker */}
        <div style={{
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🚚 Dispatch Speed Checker
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>
            Enter your 6-digit Indian shipping pincode to check real-time courier dispatch speeds.
          </p>

          <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 400001"
              style={{
                flex: 1,
                padding: '0.6rem 1rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--gold)',
                color: 'var(--darkest)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Check
            </button>
          </form>

          {pincodeStatus ? (
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: pincodeStatus.startsWith('⚡') || pincodeStatus.startsWith('🚚') ? '#4cc987' : '#ef4444',
              lineHeight: 1.4,
              animation: 'fade-in 0.2s'
            }}>
              {pincodeStatus}
            </div>
          ) : (
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
              💡 Courier partnerships active: Delhivery, BlueDart, Xpressbees.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .geo-grid-inner { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
