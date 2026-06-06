import ScrollAnimator from '../components/ScrollAnimator';
import { Leaf, Award, ShieldAlert, Cpu } from 'lucide-react';

const sourcingSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What extraction methods ensure botanical supplement purity and potency?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supercritical CO2 extraction operates at low temperatures (31.1°C) preserving thermolabile longevity molecules while leaving zero toxic residues. Unlike chemical solvents (hexane, methanol), CO2 fully evaporates upon pressure release, ensuring 99.8% heavy metal clearance and standardized active molecular yields verified by NABL-certified HPLC assays."
    }
  }]
};

const sources = [
  {
    herb: 'Kashmiri Saffron (Crocus sativus)',
    origin: 'Pampore Highlands, Kashmir, India (Altitude: 5,300 ft)',
    method: 'Supercritical CO₂ Extraction',
    standard: '3.0% Crocin Active Molecule',
    desc: 'Harvested exclusively by hand during a narrow 2-week morning solar window to preserve maximum crocin carotenoid integrity, avoiding sun-bleached degradation.'
  },
  {
    herb: 'Kerala Brahmi (Bacopa monnieri)',
    origin: 'Wayanad Wet Basin, Kerala, India (Pure Water Sourced)',
    method: 'Supercritical Sub-atmospheric CO₂ Extraction',
    standard: '50% Bacosides Active Glycosides',
    desc: 'Sourced from strictly audited bio-isolated wetlands to eliminate the typical heavy metal contamination (Lead, Arsenic) common in municipal runoff zones.'
  },
  {
    herb: 'Himalayan Shilajit (Asphaltum punjabianum)',
    origin: 'Spiti Valley, Himalayas (Altitude: 15,000 ft)',
    method: 'Classical Shodhana Water-Purification & Low-Temp Condensation',
    standard: '60% Fulvic Acid + 80+ trace Ionic Minerals',
    desc: 'Exuded from rocks at extreme altitudes, purified via classical Ayurvedic Shodhana (triphala decoction washes) and cold-concentrated to shield organic bioactives.'
  }
];

export default function SourcingIndexPage() {
  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sourcingSchema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Harvesting & Extraction Standards</div>
          <h1 className="section-title">Standardized <span className="gold-gradient-text">Sourcing Index</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Supercritical CO2 extraction at 31.1°C preserves thermolabile longevity molecules without toxic residues. This zero-waste method delivers 15-20x concentration ratios versus raw powders while ensuring 99.8% heavy metal clearance through NABL-certified HPLC validation.
          </p>
        </ScrollAnimator>

        {/* Supercritical CO2 vs Standard Solvents */}
        <ScrollAnimator>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Cpu size={32} color="var(--gold)" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', fontWeight: 900 }}>
                Supercritical CO₂ Extraction vs. Chemical Solvents
              </h2>
            </div>
            
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Standard extractors rely on industrial organic solvents like <strong>Hexane, Methanol, or Acetone</strong> to strip active chemicals from plant matter. While cheap, this leaves trace petroleum residues and destroys thermolabile (heat-sensitive) longevity molecules.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* CO2 Extraction */}
              <div style={{ background: 'rgba(76,175,80,0.04)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ color: '#4caf50', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🌿 Supercritical CO₂ (My Zen and Zest Standard)
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Uses recycled carbon dioxide compressed into a fluid state.</li>
                  <li>Operates at low temperatures (31.1°C), preserving heat-sensitive bioactives.</li>
                  <li><strong>Zero Toxic Residue:</strong> When pressure is released, CO₂ evaporates completely.</li>
                  <li>Upregulates high-density molecular yields (e.g. 5% Withanolides).</li>
                </ul>
              </div>

              {/* Solvents */}
              <div style={{ background: 'rgba(244,67,54,0.04)', border: '1px solid rgba(244,67,54,0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ color: '#f44336', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚠️ Industrial Chemical Solvents (Generic)
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Relies on Hexane, Methanol, and high-heat distillation.</li>
                  <li>Destroys delicate carotenoids like Saffron Crocin.</li>
                  <li>Leaves toxic solvent chemical residues behind in the raw powder.</li>
                  <li>Significantly higher heavy metal binding risk in plant concentrates.</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollAnimator>

        {/* Botanical Sourcing Cards */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800 }}>
          Botanical Origin Directory
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {sources.map((src, idx) => (
            <ScrollAnimator key={idx}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--gold)', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <Leaf size={14} /> SOURCED & CERTIFIED
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {src.herb}
                  </h4>
                  
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '1rem' }}>
                    Origin: {src.origin}
                  </span>
                  
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {src.desc}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '1rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Extraction:</span>
                    <strong style={{ color: 'white' }}>{src.method}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Standard:</span>
                    <strong style={{ color: 'var(--gold-light)' }}>{src.standard}</strong>
                  </div>
                </div>

              </div>
            </ScrollAnimator>
          ))}
        </div>

      </div>
    </div>
  );
}
