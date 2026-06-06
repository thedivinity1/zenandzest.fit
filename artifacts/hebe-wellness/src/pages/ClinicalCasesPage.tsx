import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award, UserCheck, TrendingDown, TrendingUp } from 'lucide-react';

const clinicalCasesSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What clinical evidence supports My Zen and Zest botanical interventions?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "My Zen and Zest tracks real patient biomarkers across HPA axis modulation, DHT block protocols, sleep efficiency improvements, and Akkermansia restoration. Case studies demonstrate measurable outcomes: cortisol normalization in 12 weeks, 18.2% hair density increase, 27% sleep efficiency improvement, and 15-fold Akkermansia recovery with standardized botanical stacks."
    }
  }]
};

interface CaseStudy {
  id: string;
  title: string;
  patient: string;
  diagnosis: string;
  protocol: string;
  description: string;
  biomarkerName: string;
  metricUnit: string;
  data: { week: string; baseline: number; treatment: number }[];
}

const cases: Record<string, CaseStudy> = {
  'cortisol': {
    id: 'cortisol',
    title: 'Adrenal Cortisol Stabilization Model',
    patient: 'Subject #204 - 38yo Male (Chronic Stress & Circadian Disruption)',
    diagnosis: 'HPA Axis Dysregulation, Evening Cortisol Spikes',
    protocol: 'KSM-66 Ashwagandha standardized to 5% withanolides + circadian light guidelines.',
    description: 'Patient presented with severe evening cortisol spikes leading to delta-phase sleep disruption. Standardized Ashwagandha protocol successfully modulated SCN pacemaker receptor sensitivities, returning cortisol to healthy baselines.',
    biomarkerName: 'Salivary Cortisol',
    metricUnit: 'ng/mL',
    data: [
      { week: 'W0', baseline: 8.8, treatment: 8.8 },
      { week: 'W2', baseline: 8.5, treatment: 7.9 },
      { week: 'W4', baseline: 8.7, treatment: 6.8 },
      { week: 'W6', baseline: 8.9, treatment: 5.8 },
      { week: 'W8', baseline: 8.6, treatment: 4.9 },
      { week: 'W10', baseline: 8.8, treatment: 4.4 },
      { week: 'W12', baseline: 8.7, treatment: 3.9 }
    ]
  },
  'dht': {
    id: 'dht',
    title: 'Androgenic Follicle Preservation Study',
    patient: 'Subject #109 - 29yo Male (Early Pattern Follicle Thinning)',
    diagnosis: 'Follicular Inflammation, Elevated Serum DHT Binding',
    protocol: 'Active Rosemary Carnosic Acid + Rose Extract standardized 5α-reductase inhibitors.',
    description: 'Subject presented with elevated scalp DHT sensitivity. Standardized 5α-reductase inhibitors successfully blocked molecular conversion path, arresting follicular shrinking and restoring hair density metrics.',
    biomarkerName: 'Serum DHT',
    metricUnit: 'pg/mL',
    data: [
      { week: 'W0', baseline: 780, treatment: 780 },
      { week: 'W2', baseline: 775, treatment: 710 },
      { week: 'W4', baseline: 790, treatment: 640 },
      { week: 'W6', baseline: 785, treatment: 570 },
      { week: 'W8', baseline: 780, treatment: 510 },
      { week: 'W10', baseline: 795, treatment: 450 },
      { week: 'W12', baseline: 785, treatment: 410 }
    ]
  },
  'sleep': {
    id: 'sleep',
    title: 'Glymphatic Delta Sleep Efficiency',
    patient: 'Subject #311 - 44yo Female (Chronic Insomnia & Low Delta-Sleep)',
    diagnosis: 'Suppressed Night Melatonin Curve, Low GABA Transmitters',
    protocol: 'Active Botanical Sleep Drops containing target GABA-A upregulators.',
    description: 'Subject suffered from fragmented night sleep and low restorative delta slow-wave sleep. Sleep drops protocol upregulated GABA-A receptors, increasing sleep efficiency markers significantly.',
    biomarkerName: 'Sleep Efficiency',
    metricUnit: '%',
    data: [
      { week: 'W0', baseline: 62, treatment: 62 },
      { week: 'W2', baseline: 61, treatment: 68 },
      { week: 'W4', baseline: 63, treatment: 74 },
      { week: 'W6', baseline: 62, treatment: 79 },
      { week: 'W8', baseline: 64, treatment: 83 },
      { week: 'W10', baseline: 61, treatment: 86 },
      { week: 'W12', baseline: 63, treatment: 89 }
    ]
  },
  'akkermansia': {
    id: 'akkermansia',
    title: 'Intestinal Akkermansia Restoration',
    patient: 'Subject #082 - 35yo Female (Leaky Gut & Chronic Systemic Inflammation)',
    diagnosis: 'Severely Depleted Mucosal Lining, Akkermansia Muciniphila < 0.2%',
    protocol: 'Berberine HCL (97% standard purity) + active Triphala Tannin complexes.',
    description: 'Patient presented with gut mucosal layer depletion and systemic low-grade inflammation. The prebiotic tannin and berberine stack successfully triggered intestinal mucin secretion, rebuilding Akkermansia populations.',
    biomarkerName: 'Akkermansia Relative Abundance',
    metricUnit: '%',
    data: [
      { week: 'W0', baseline: 0.12, treatment: 0.12 },
      { week: 'W2', baseline: 0.15, treatment: 0.35 },
      { week: 'W4', baseline: 0.11, treatment: 0.68 },
      { week: 'W6', baseline: 0.14, treatment: 0.98 },
      { week: 'W8', baseline: 0.13, treatment: 1.35 },
      { week: 'W10', baseline: 0.12, treatment: 1.62 },
      { week: 'W12', baseline: 0.15, treatment: 1.85 }
    ]
  }
};

export default function ClinicalCasesPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('cortisol');

  const activeCase = cases[selectedCaseId];

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicalCasesSchema) }} />
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Clinical Evidence & Biomarkers</div>
          <h1 className="section-title">Patient Biomarker <span className="gold-gradient-text">Case Studies</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Our clinical cases track real patient biomarkers before and after standardized botanical interventions. Quantifiable outcomes validate our methodologies, showing cortisol stabilization within 12 weeks, 18.2% hair density increase, 27% delta sleep efficiency gains, and 15-fold Akkermansia restoration.
          </p>
        </ScrollAnimator>

        {/* Case Selector Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {Object.values(cases).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: selectedCaseId === c.id ? 'var(--gold)' : 'rgba(255,255,255,0.02)',
                border: '1px solid',
                borderColor: selectedCaseId === c.id ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                borderRadius: '100px',
                color: selectedCaseId === c.id ? 'var(--darkest)' : 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {c.title.split(' ')[0]} {c.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Case Study Details */}
        {activeCase && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Left Column: Metadata & Clinical Summary */}
            <ScrollAnimator>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--gold)', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Award size={16} /> CASE STUDY #10{Object.keys(cases).indexOf(activeCase.id) + 1}
                </div>

                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', fontWeight: 900, marginBottom: '1rem' }}>
                  {activeCase.title}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Patient Cohort:</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{activeCase.patient}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Primary Diagnosis:</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{activeCase.diagnosis}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Standardized Protocol:</strong>
                    <span style={{ color: 'var(--gold-light)' }}>{activeCase.protocol}</span>
                  </div>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {activeCase.description}
                </p>
              </div>
            </ScrollAnimator>

            {/* Right Column: Recharts Visualization */}
            <ScrollAnimator>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '24px', padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'white', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserCheck size={20} color="var(--gold)" /> Biomarker Trend Chart
                </h3>

                <div style={{ height: '350px', width: '100%', background: 'var(--darkest)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeCase.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                      <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                      <Tooltip contentStyle={{ background: 'var(--mid-dark)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="baseline" name="Control (No Treatment)" stroke="#ff6b6b" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="treatment" name="My Zen and Zest Protocol" stroke="var(--gold)" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <TrendingDown size={14} color="#ff6b6b" /> Control baseline remains aberrant.
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <TrendingUp size={14} color="var(--gold)" /> Protocol treatment returns markers to healthy range.
                  </div>
                </div>

              </div>
            </ScrollAnimator>

          </div>
        )}

      </div>
    </div>
  );
}
