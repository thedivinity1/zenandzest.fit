import ScrollAnimator from '../components/ScrollAnimator';
import { BookOpen, RefreshCw, Layers } from 'lucide-react';

const pathways = [
  {
    pathway: 'SIRT1 Expression (Sirtuin Longevity Gene)',
    modernRole: 'NAD+-dependent deacetylase that regulates DNA repair, metabolic rate, mitochondrial integrity, and antioxidant enzyme transcription.',
    ayurvedicHerb: 'Amalaki Rasayana (Emblica officinalis)',
    mechanism: 'Phytochemical tannins and vitamin C complexes in Amalaki act as direct upregulators of the SIRT1 expression profile. Clinical trials confirm Amalaki significantly increases SIRT1 activity, promoting DNA repair and buffering metabolic decline.',
    status: 'Clinically Assayed'
  },
  {
    pathway: 'AMPK Activation (Cellular Energy Sensor)',
    modernRole: 'The master metabolic energy sensor that stimulates catabolism (glucose uptake, fatty acid oxidation) while shutting down mTOR anabolic growth signals that accelerate cell aging.',
    ayurvedicHerb: 'Guduchi (Tinospora cordifolia) & Berberine',
    mechanism: 'Actives in Guduchi work in tandem with Berberine HCL to activate AMP-activated protein kinase (AMPK). This restores cellular energy homeostasis, reverses insulin resistance, and prompts mitochondrial biogenesis.',
    status: 'Verified In-Vitro & Clinical'
  },
  {
    pathway: 'Autophagy Induction (Cellular Cleanup)',
    modernRole: 'Lysosomal degradation pathway that clears out misfolded protein aggregates, damaged organelles, and senescent intracellular debris.',
    ayurvedicHerb: 'Triphala (Haritaki, Bibhitaki, Amalaki tannins)',
    mechanism: 'Standardized Triphala tannins activate the SIRT1-AMPK signaling axis. This prompts cells to initiate autophagic clearance, clearing out intracellular waste and maintaining cellular proteostasis.',
    status: 'Peer-Reviewed Validated'
  }
];

export default function RasayanaGerosciencePage() {
  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Ayurvedic Rejuvenation & Modern Biology</div>
          <h1 className="section-title">Rasayana & <span className="gold-gradient-text">Geroscience</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Bridging 5,000 years of traditional Indian longevity medicine with contemporary molecular biology. Discover how classical Rasayana formulas trigger cellular lifespan extension.
          </p>
        </ScrollAnimator>

        {/* Conceptual introduction */}
        <ScrollAnimator>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '1rem', fontWeight: 900 }}>
              The Convergence of Two Longevity Parallels
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              In Ayurveda, **Rasayana** (from *Rasa* - essence, and *Ayana* - path) represents the science of cellular rejuvenation and immune preservation. Modern medicine is arriving at the exact same destination through **Geroscience**—the study of biological drivers of aging.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Rather than treating age-related diseases in isolation, both systems advocate for systemic interventions that preserve the body's self-healing mechanisms and optimize cellular homeostasis at its foundation.
            </p>
          </div>
        </ScrollAnimator>

        {/* Cellular Pathways Table */}
        <ScrollAnimator>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'white', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={20} color="var(--gold)" /> Molecular Pathway Mapping
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {pathways.map((p, idx) => (
                <div key={idx} style={{
                  borderBottom: idx < pathways.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  paddingBottom: idx < pathways.length - 1 ? '2rem' : '0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '2rem',
                  alignItems: 'start'
                }}>
                  
                  {/* Left Column: Biological Pathway & Herb */}
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      {p.status}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'white', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {p.pathway}
                    </h4>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                      🌿 {p.ayurvedicHerb}
                    </div>
                  </div>

                  {/* Right Column: Mechanisms */}
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Modern Geroscience Role</span>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {p.modernRole}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Molecular Integration Mechanism</span>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {p.mechanism}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </ScrollAnimator>

      </div>
    </div>
  );
}
