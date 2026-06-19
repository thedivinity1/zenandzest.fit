import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';

const mitochondriaSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does mitochondrial health affect cellular energy and aging?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Mitochondria are the cellular engines producing ATP energy. Age-related decay reduces ATP yields while increasing reactive oxygen species. Improving mitochondrial efficiency through PGC-1α pathway activation, CoQ10 support, and adaptogenic botanicals preserves cellular vitality and slows biological aging."
    }
  }]
};

export default function MitochondriaToolPage() {
  const [fatigue, setFatigue] = useState(5);
  const [brainFog, setBrainFog] = useState(5);
  const [exerciseRecovery, setExerciseRecovery] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [result, setResult] = useState<null | { atpScore: number; decayRate: number; level: string; recs: string[] }>(null);

  const calculate = () => {
    // Math to compute ATP mitochondrial efficiency score
    const avg = (fatigue + brainFog + exerciseRecovery + sleepQuality) / 4;
    const atpScore = Math.round(100 - (avg * 8));
    const decayRate = Math.round((avg * 0.4 + 1.2) * 10) / 10;
    
    let level = 'Optimal Cellular Vitality';
    if (atpScore < 45) level = 'Severe Mitochondrial Decay (HPA Exhaustion)';
    else if (atpScore < 70) level = 'Moderate Bioenergetic Declines';

    const recs = [
      'Implement CoQ10 (Ubiquinol 200mg/day) to support the mitochondrial electron transport chain (complex I-III).',
      'Integrate PQQ (Pyrroloquinoline Quinone 20mg/day) to stimulate PGC-1alpha pathways, forcing mitochondrial biogenesis.',
      'Take standardized Rhodiola Rosea (3% Rosavins) to enhance cellular ATP production under acute cognitive stress.',
      'Add daily cold therapy (cold shower/immersion) to trigger brown adipose tissue activity and mitochondrial volume increases.'
    ];

    setResult({ atpScore, decayRate, level, recs });
  };

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mitochondriaSchema) }} />
      <div className="container" style={{ maxWidth: '700px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Mitochondria & Bioenergetics</div>
          <h1 className="section-title">Mitochondrial Health & <span className="gold-gradient-text">ATP Calculator</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
            <strong>Answer-First:</strong> Mitochondrial health determines cellular ATP production. Age-related decay reduces ATP levels, causing fatigue and brain fog. Use this tool to calculate your ATP bioenergetic efficiency and get recommendations to stimulate mitochondrial biogenesis via PGC-1α pathway activation.
          </p>
        </ScrollAnimator>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
            Bioenergetic Metric Inputs
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Unexplained Muscle Fatigue (1 = none, 10 = constant)', val: fatigue, set: setFatigue },
              { label: 'Post-Meal Cognitive Brain Fog (1 = sharp, 10 = exhausted)', val: brainFog, set: setBrainFog },
              { label: 'Exercise Recovery Lag (1 = instant recovery, 10 = sore for 3 days)', val: exerciseRecovery, set: setExerciseRecovery },
              { label: 'Waking Morning Fatigue (1 = high energy, 10 = need 3 coffees)', val: sleepQuality, set: setSleepQuality }
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
            Analyze Mitochondrial ATP Efficiency
          </button>
        </div>

        {result && (
          <ScrollAnimator>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }} className="two-col-grid">
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '20px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{result.atpScore}%</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>ATP Efficiency Index</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.3rem 0.65rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1rem' }}>
                  Decay rate: {result.decayRate}x
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{result.level}</p>
              </div>

              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '20px', padding: '1.5rem' }}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>CELLULAR RESILIENCE RITUALS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.recs.map((tip, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span>
                      <span>{tip}</span>
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
