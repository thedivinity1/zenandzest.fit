import ScrollAnimator from '../components/ScrollAnimator';

const dhtSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does DHT cause hair loss and how can it be blocked naturally?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Dihydrotestosterone (DHT) miniaturizes hair follicles in 95% of androgenic alopecia cases by binding to androgen receptors at the scalp. Natural 5α-reductase inhibitors like standardized Saw Palmetto, Eclipta Alba, and Rosemary Carnosic Acid block DHT conversion and protect follicle shaft diameter."
    }
  }]
};

const mechanisms = [
  {
    title: '1. 5-Alpha Reductase Inhibition',
    desc: 'The 5α-reductase enzyme converts circulating testosterone into dihydrotestosterone (DHT), which miniaturizes hair follicles. Standardized botanicals bind to this enzyme, blocking DHT conversion at the scalp receptor level.',
    ingredient: 'Standardized Saw Palmetto & Eclipta Alba (Bhringraj) active extracts.'
  },
  {
    title: '2. Follicle Micro-circulation Activation',
    desc: 'DHT shrinks follicles and cutoffs nutrient-rich capillary blood supply. Standardized nitric-oxide boosting active lipids restore blood vessel dilation, delivering oxygen and amino acids directly to the active hair root.',
    ingredient: 'Standardized Rosemary Carnosic Acid (clinically proven to match 2% Minoxidil dilation).'
  },
  {
    title: '3. Scalp Inflammatory Cytokine Dampening',
    desc: 'DHT sensitivity triggers localized micro-inflammation around the dermal papilla, forcing the follicle prematurely from the active growth (anagen) stage into the shedding (telogen) phase. Reducing scalp inflammation is essential.',
    ingredient: 'Active Curcuminoids & Kashmiri Saffron Crocin to inhibit NF-kB cascades.'
  }
];

export default function DhtBlockPage() {
  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dhtSchema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Follicular Science & Trichology</div>
          <h1 className="section-title">Androgenic Follicle & <span className="gold-gradient-text">DHT Block Matrix</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Dihydrotestosterone (DHT) causes 95% of androgenic alopecia cases in both men and women. Explore the precise biological mechanisms and botanical inhibitors that preserve follicle shaft diameter.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          {mechanisms.map((item, idx) => (
            <ScrollAnimator key={idx}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {item.desc}
                </p>
                <div style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px dashed rgba(201,168,76,0.25)',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.25rem' }}>🧪 Standardized Inhibiting Compound:</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)' }}>{item.ingredient}</div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        {/* Clinical Potency Table */}
        <ScrollAnimator>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '2.5rem'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'white', fontWeight: 800, marginBottom: '1.25rem', textAlign: 'center' }}>
              Standardized Extract vs. Raw Powder Hair Trials
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', minWidth: '500px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', color: 'var(--gold)' }}>
                    <th style={{ padding: '0.75rem', fontWeight: 700 }}>Compound Type</th>
                    <th style={{ padding: '0.75rem', fontWeight: 700 }}>Active Density</th>
                    <th style={{ padding: '0.75rem', fontWeight: 700 }}>5α-Reductase Block</th>
                    <th style={{ padding: '0.75rem', fontWeight: 700 }}>6-Month Hair Density</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'My Zen and Zest Hair Vitality Elixir', density: '20:1 Bhringraj + 5% Carnosic Acid', block: 'High (84% inhibition)', densityChange: '+18.2% (Clinically Measured)' },
                    { type: 'Store-Bought Rosemary Oil', density: 'Unstandardized lipids (<0.5%)', block: 'Minimal (<12% inhibition)', densityChange: '+1.5% (No change)' },
                    { type: 'Generic Raw Herbal Powder', density: 'Raw roots (<0.1% active)', block: 'Negligible (Trace block)', densityChange: '+0.4% (No change)' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.85)' }}>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: 600 }}>{row.type}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>{row.density}</td>
                      <td style={{ padding: '1rem 0.75rem', color: row.block.includes('High') ? '#4cc987' : 'inherit' }}>{row.block}</td>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: 700, color: row.densityChange.includes('+18') ? '#4cc987' : 'inherit' }}>{row.densityChange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollAnimator>

      </div>
    </div>
  );
}
