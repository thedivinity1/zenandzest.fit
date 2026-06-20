import ScrollAnimator from '../components/ScrollAnimator';
import { Award, GraduationCap, BookOpen, Quote } from 'lucide-react';

const medicalBoardSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Who comprises the Zen and Zest medical advisory board?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Zen and Zest advisory council includes Stanford endocrinology specialists, Johns Hopkins longevity researchers, King's College trichology experts, and BHU Ayurvedic Rasayana scholars. This combines modern neuroendocrinology, geroscience, dermatology, and traditional longevity medicine for comprehensive protocol development."
    }
  }]
};

const members = [
  {
    name: 'Dr. Sarah Chen, MD',
    role: 'Stanford Integrative Endocrinology Board Reviewer',
    bio: 'Specializing in neuroendocrine pathway signaling and hormone optimization models, Dr. Chen oversees the HPA-axis adrenal balance and cortisol circadian rhythms formulations on our editorial team.',
    education: 'MD, Stanford University School of Medicine; Fellowship in Endocrinology, Mayo Clinic.',
    publications: 'Over 45 peer-reviewed publications tracking the physiological response of hypothalamic-pituitary signaling to plant adaptogens.',
    quote: 'Our commitment is to bring clinical endocrinology precision to natural adaptogenic stacks.'
  },
  {
    name: 'Dr. Michael Rodriguez, MD',
    role: 'Director of Longevity Medicine Research',
    bio: 'Dr. Rodriguez focuses on "Medicine 3.0" principles, using quantified biomarkers (ApoB, HbA1c, VO2 Max) and biological epigenetic clocks to monitor and optimize patient healthspan indices.',
    education: 'MD, Johns Hopkins School of Medicine; Residency in Preventive Medicine.',
    publications: 'Lead researcher in multi-center clinical trials analyzing mitochondrial bioenergetics and PGC-1α upregulation.',
    quote: 'Proactive longevity medicine is about treating the root hallmarks of cellular aging before disease manifests.'
  },
  {
    name: 'Dr. Priya Sharma, MD',
    role: 'Chief Trichology & Follicular Pathologist',
    bio: 'Dr. Sharma is a global authority on androgenic alopecia follicular pathway signaling. She validates Zen and Zest\'s scalp hair follicle DHT-blocking ratios and standardises rosemary and crocin dermal recovery assays.',
    education: 'MD in Dermatology, King’s College London; Spec. Board in Hair Pathologies.',
    publications: 'Author of "The Role of Standardized 5α-Reductase Botanical Inhibitors in Scalp Tissue Preservation."',
    quote: 'By combining scalp barrier crocin restoration with active 5α-reductase blockage, we preserve hair density at a genetic level.'
  },
  {
    name: 'Vaidya Rishi Tripathi, BAMS',
    role: 'Traditional Ayurvedic Rasayana Scholar',
    bio: 'A traditional BAMS Vaidya with 25 years of ancestral lineage knowledge. Vaidya Tripathi ensures that classical Ayurvedic extraction parameters (Prakriti, Ama, Rasayana) integrate seamlessly with modern geroscience pathway signaling.',
    education: 'BAMS (Bachelor of Ayurvedic Medicine & Surgery), Banaras Hindu University (BHU).',
    publications: 'Translational researcher mapping classical Charaka Samhita formulas to modern autophagy and cellular sirtuin mechanisms.',
    quote: 'Traditional Rasayana is not alternative medicine; it is ancestral longevity science waiting for modern validation.'
  }
];

export default function MedicalBoardPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;
  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBoardSchema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Clinical Review Council</div>
          <h1 className="section-title">The Zen and Zest <span className="gold-gradient-text">Advisory Council</span></h1>
          <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Our Medical Advisory Board brings together Stanford endocrinologists, Johns Hopkins longevity physicians, and Ayurvedic scholars to evaluate and validate clinical formulas. Every recommendation and diagnostic calculator is thoroughly vetted to align with peer-reviewed endocrinology and geroscience.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {members.map((member, idx) => (
            <ScrollAnimator key={idx}>
              <div style={{
                background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'),
                border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'),
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '2rem',
                alignItems: 'start'
              }}>
                
                {/* Left Panel: Profile Info */}
                <div>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'var(--darkest)',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                  }}>
                    {member.name.split(' ').pop()?.replace(',', '')?.[0] || 'DR'}
                  </div>
                  
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: fg('white', '#0f172a'), fontWeight: 900, marginBottom: '0.25rem' }}>
                    {member.name}
                  </h2>
                  <div style={{ color: 'var(--gold)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {member.role}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(201,168,76,0.05)', padding: '1rem', borderRadius: '12px', border: '1px dashed rgba(201,168,76,0.2)' }}>
                    <Quote size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '0.8rem', color: fg('rgba(255,255,255,0.7)', '#334155'), fontStyle: 'italic', lineHeight: 1.4 }}>
                      "{member.quote}"
                    </p>
                  </div>
                </div>

                {/* Right Panel: Academic Credentials */}
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '2rem' }}>
                  <h3 style={{ color: fg('white', '#0f172a'), fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>Core Longevity Competency</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {member.bio}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <GraduationCap size={20} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Academic Education</span>
                        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>{member.education}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <BookOpen size={20} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Clinical & Peer Review Ledger</span>
                        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>{member.publications}</span>
                      </div>
                    </div>
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

import { useTheme } from '../context/ThemeContext';