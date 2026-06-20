import { useTheme } from '../context/ThemeContext';
﻿import ScrollAnimator from '../components/ScrollAnimator';

const geroscienceSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What are the hallmarks of cellular aging?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The nine hallmarks of aging include genomic instability, telomere attrition, mitochondrial decay, cellular senescence, stem cell exhaustion, altered intercellular communication, disabled macroautophagy, deregulated nutrient sensing, and chronic inflammation. Each hallmark represents a target for longevity interventions."
    }
  }]
};

const hallmarks = [
  {
    title: '1. Genomic Instability & DNA Repair',
    desc: 'Cumulative cellular damage degrades genetic codes over time. Standardized antioxidants and DNA-protective adaptogens shield genetic sequences, preventing the transcriptional errors that accelerate physiological aging.',
    solution: 'Kashmiri Saffron Crocin activates cellular defense markers and blocks free-radical DNA damage.',
    marker: '8-OHdG levels (DNA damage index)'
  },
  {
    title: '2. Telomere Attrition',
    desc: 'Each replication cycle shortens the protective telomere caps on chromosomes. Telomerase-activating adaptogens help buffer this shortening, extending cellular replicative lifespan bounds.',
    solution: 'Standardized Ashwagandha KSM-66 acts as a mild telomerase upregulator in double-blind longevity trials.',
    marker: 'qPCR Telomere Length Assays'
  },
  {
    title: '3. Mitochondrial Decay & Energy Depletion',
    desc: 'Mitochondria produce cellular ATP. Age-related decay reduces energy yields while increasing toxic reactive oxygen species (ROS). Standardized adaptogens upregulate mitochondrial biogenesis.',
    solution: 'Rhodiola Rosea standardized to 3% rosavins directly increases cellular ATP synthesis and protects membrane charges.',
    marker: 'Cellular ATP ratios'
  },
  {
    title: '4. Cellular Senescence (Zombie Cells)',
    desc: 'Senescent cells stop dividing but refuse to die, secreting toxic SASP factors that damage surrounding healthy cells. Senolytics help clear these zombie cells.',
    solution: 'Standardized Spearmint and Kashmiri Crocin act as natural senotherapeutics to block chronic SASP inflammatory cycles.',
    marker: 'IL-6 and TNF-alpha inflammatory assays'
  },
  {
    title: '5. Loss of Proteostasis & Autophagy',
    desc: 'Proteins must fold correctly to function. Misfolded protein aggregates accumulate and choke cells, causing neurodegeneration. Autophagy clears this cellular trash.',
    solution: 'Standardized Triphala tannins and Berberine activate AMPK to trigger intense autophagy clearing cycles.',
    marker: 'LC3-II autophagosomic markers'
  }
];

export default function GeroscienceMapPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geroscienceSchema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Science & Geroscience Map</div>
          <h1 className="section-title">The Hallmarks of <span className="gold-gradient-text">Cellular Aging</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Geroscience research identifies the key hallmarks of cellular aging—such as genomic instability, telomere attrition, and mitochondrial decay—as the root drivers of physical degeneration. Our protocols target these pathways with standardized botanicals validated to reduce biomarkers of decay.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {hallmarks.map((item, idx) => (
            <ScrollAnimator key={idx}>
              <div style={{
                background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'),
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }} />
                
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: fg('white', '#0f172a'), fontWeight: 800, marginBottom: '0.75rem' }}>
                  {item.title}
                </h2>
                
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
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.25rem' }}>🌿 Targeted Botanical Action:</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)' }}>{item.solution}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Clinical Marker: {item.marker}</div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

      </div>
    </div>
  );
}
