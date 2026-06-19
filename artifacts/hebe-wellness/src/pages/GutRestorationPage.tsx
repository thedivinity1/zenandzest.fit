import ScrollAnimator from '../components/ScrollAnimator';

const gutSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does gut microbiome restoration improve overall health?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Your gut microbiome governs 95% of systemic serotonin synthesis and directly regulates vagal brain communication. Restoring Akkermansia muciniphila and tightening intestinal junctions reduces systemic inflammation, improves HPA axis regulation, and supports cognitive function through the gut-brain axis."
    }
  }]
};

const steps = [
  {
    title: 'Phase I: Pathogen Removal & Cleansing (Weeks 1-3)',
    desc: 'Remove inflammatory bacterial pathobionts and fungi. Calibrated botanical micro-extracts contain natural antimicrobials that selectively clear pathogens without destroying beneficial gut species.',
    actives: 'Supercritical extracts of Neem, Turmeric Curcuminoids, and clove active oils.'
  },
  {
    title: 'Phase II: Gut Barrier Tight-Junction Repair (Weeks 4-6)',
    desc: 'Repair leaky gut junctions to prevent systemic endotoxins (LPS) from leaking into the bloodstream, which is a major driver of chronic low-grade neuroinflammation and HPA fatigue.',
    actives: 'Gotu Kola (Centella asiatica) standardized triterpenes & licorice glycyrrhizin.'
  },
  {
    title: 'Phase III: Prebiotic Reinoculation & Akkermansia Growth (Weeks 7-12)',
    desc: 'Selectively feed and multiply beneficial keystone species, particularly Akkermansia muciniphila, which maintains the intestinal mucosal lining and signals vagus nerve satiety.',
    actives: 'Standardized Triphala tannins & 97% pure Berberine HCL (AMPK prebiotic restructuring).'
  }
];

export default function GutRestorationPage() {
  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gutSchema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Gut Microbiome & Gastric Biology</div>
          <h1 className="section-title">Akkermansia Gut <span className="gold-gradient-text">Microbiome Plan</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Your gut microbiome governs 95% of systemic serotonin synthesis and directly regulates vagal brain communication. The 3-phase protocol restores Akkermansia populations and intestinal tight junctions to reduce systemic inflammation and support HPA axis regulation.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          {steps.map((item, idx) => (
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
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.25rem' }}>🧪 Standardized active molecular targets:</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)' }}>{item.actives}</div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

      </div>
    </div>
  );
}
