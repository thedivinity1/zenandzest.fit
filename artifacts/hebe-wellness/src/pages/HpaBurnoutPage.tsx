import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';

const hpaSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is HPA axis dysfunction?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "HPA axis dysfunction (often colloquially called adrenal fatigue) is the dysregulation of cortisol and stress hormones, leading to chronic stress, fatigue even after sleeping, and brain fog."
    }
  }]
};

export default function HpaBurnoutPage() {
  const [morningEnergy, setMorningEnergy] = useState(5);
  const [caffeineDep, setCaffeineDep] = useState(5);
  const [eveningWired, setEveningWired] = useState(5);
  const [cognitiveCrash, setCognitiveCrash] = useState(5);
  const [result, setResult] = useState<null | { stage: string; cortisolCurve: string; desc: string; recs: string[] }>(null);

  const calculate = () => {
    const score = (morningEnergy + caffeineDep + eveningWired + cognitiveCrash) / 4;
    
    let stage = 'Stage I: Hyper-Adrenal (Adaptive Phase)';
    let cortisolCurve = 'Elevated morning & spike at night';
    let desc = 'Your HPA axis is in overdrive, actively secreting excessive baseline cortisol to match cognitive demands. You feel wired but tired, with high evening energy and high systemic anxiety.';
    let recs = [
      'Take high-concentration calibrated Ashwagandha KSM-66 (300mg) at night to block ACTH receptors and lower midnight cortisol spikes.',
      'Implement 200mg L-Theanine before screen exposure to stimulate alpha brain waves, protecting sleep architecture.',
      'Establish a strict 90-minute digital sunset before bed to support endogenous melatonin production.'
    ];

    if (score > 7) {
      stage = 'Stage III: HPA Axis Dysfunction (Exhaustion Phase)';
      cortisolCurve = 'Completely flattened curve';
      desc = 'Your HPA axis feedback loop is severely blunted. The hypothalamic receptors are non-reactive, yielding depleted morning cortisol output and high systemic metabolic fatigue (formerly known as severe adrenal fatigue).';
      recs = [
        'Integrate powerful adaptogenic Rhodiola Rosea (3% rosavins) in the morning to upregulate dopamine and block physical exhaustion cycles.',
        'Use specialized Shatavari root extract to modulate baseline DHEA-S levels, returning cellular homeostasis.',
        'Restrict high-intensity cardiovascular training; prioritize low-heart-rate Zone 2 cardio (max 30 mins) or cyclic pranayama breathing.'
      ];
    } else if (score > 4) {
      stage = 'Stage II: HPA Axis Resistance (Resistive Phase)';
      cortisolCurve = 'Erratic spikes & afternoon crashes';
      desc = 'Your body is struggling to maintain homeostasis. Cortisol peaks are erratic, leading to classic 3 PM energy crashes, low morning drive, and an HPA axis that is highly vulnerable to minor stress overrides.';
      recs = [
        'Take standardized Ashwagandha KSM-66 daily in the morning to buffer diurnal curve dips.',
        'Utilize active Kerala Brahmi to protect hippocampal receptors from high cortisol-mediated oxidative stress.',
        'Eliminate caffeine after 12 PM to prevent long half-life adenosine blocks that interfere with sleep.'
      ];
    }

    setResult({ stage, cortisolCurve, desc, recs });
  };

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hpaSchema) }} />
      <div className="container" style={{ maxWidth: '700px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Cortisol Regulation & Recovery</div>
          <h1 className="section-title">HPA Axis Dysfunction <span className="gold-gradient-text">& Burnout Analyzer</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.92rem' }}>
            <strong>Answer-First:</strong> Assess HPA axis dysfunction stages (Adaptive, Resistive, or Exhausted) by auditing diurnal cortisol curves and neuroendocrine stress indicators to aid in chronic stress recovery.
          </p>
        </ScrollAnimator>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
            HPA Stressor Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Morning Waking Lethargy (1 = fresh, 10 = exhausted)', val: morningEnergy, set: setMorningEnergy },
              { label: 'Caffeine Dependency (1 = none, 10 = need 3+ cups for baseline functioning)', val: caffeineDep, set: setCaffeineDep },
              { label: 'Evening "Wired" Alertness (1 = sleepy, 10 = wide awake/racing thoughts)', val: eveningWired, set: setEveningWired },
              { label: '3 PM Cognitive Energy Crash (1 = none, 10 = severe brain fog)', val: cognitiveCrash, set: setCognitiveCrash }
            ].map((slider, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)' }}>{slider.label}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{slider.val}/10</span>
                </div>
                <input type="range" min={1} max={10} value={slider.val} onChange={e => slider.set(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
              </div>
            ))}
          </div>

          <button onClick={calculate} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer' }}>
            Analyze HPA Burnout Stage
          </button>
        </div>

        {result && (
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '24px', padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>HPA STAGE ANALYSIS REPORT</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'white', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.25rem' }}>{result.stage}</h3>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Cortisol Curve: <strong>{result.cortisolCurve}</strong></div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem', textAlign: 'justify' }}>{result.desc}</p>
              
              <div>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  CLINICAL RITUAL PROTOCOL:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.recs.map((rec, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimator>
        )}

      </div>
    </div>
  );
}
