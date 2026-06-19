import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Shield, Sparkles, Activity, Clock } from 'lucide-react';

const epigeneticSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is biological age versus chronological age?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Biological age measures cellular function and DNA methylation patterns through epigenetic clocks like Horvath's method. It reflects how well your cells are aging versus your chronological years. Lifestyle factors including sleep, exercise, diet, stress, and pollutants can accelerate or decelerate biological aging by 1-5 years relative to chronological age."
    }
  }]
};

export default function EpigeneticClockPage() {
  const [chronoAge, setChronoAge] = useState<number>(35);
  const [sleep, setSleep] = useState<number>(7); // hours
  const [exercise, setExercise] = useState<number>(3); // hours/week
  const [diet, setDiet] = useState<string>('balanced');
  const [stress, setStress] = useState<number>(5); // 1-10
  const [pollutants, setPollutants] = useState<string>('minimal');
  const [result, setResult] = useState<null | { bioAge: number; difference: number; status: string; advice: string }>(null);
  const { addToCart, setCartOpen } = useCart();

  const handleCalculate = () => {
    let ageShift = 0;

    // Sleep impact
    if (sleep < 6) ageShift += 2.5;
    else if (sleep >= 7 && sleep <= 8.5) ageShift -= 1.5;
    else ageShift += 1.0;

    // Exercise impact (Zone 2 cardio and strength)
    if (exercise < 1.5) ageShift += 2.0;
    else if (exercise >= 4) ageShift -= 2.2;
    else ageShift -= 0.8;

    // Diet impact
    if (diet === 'inflammatory') ageShift += 3.0;
    else if (diet === 'keto-anti-inflammatory') ageShift -= 2.0;
    else ageShift -= 0.5;

    // Stress impact (cortisol/adrenal decay)
    if (stress > 7) ageShift += 2.8;
    else if (stress < 3) ageShift -= 1.0;
    else ageShift += 0.5;

    // Pollutants impact (smoking, heavy city pollution)
    if (pollutants === 'heavy') ageShift += 3.5;
    else if (pollutants === 'minimal') ageShift -= 1.2;

    const bioAge = Math.round((chronoAge + ageShift) * 10) / 10;
    const diff = Math.round((bioAge - chronoAge) * 10) / 10;

    let status = 'Aging Balanced';
    let advice = 'Your cell longevity markers are balanced. Adding standardized Kashmiri Saffron will protect your genomic transcription rates and help buffer cell aging.';

    if (diff < -1) {
      status = 'Optimal Decelerated Aging 🌿';
      advice = 'Incredible! Your biological longevity habits are highly protective. Continue stacking mitochondria-focused adaptogens (CoQ10 + Rhodiola) to preserve your cellular ATP reserves.';
    } else if (diff > 1.5) {
      status = 'Accelerated Biological Aging ⚠️';
      advice = 'Your cell decay markers are running high. High systemic cortisol and cellular inflammation are accelerating telomere depletion. We suggest an immediate HPA adrenal restoration stack.';
    }

    setResult({ bioAge, difference: diff, status, advice });
  };

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(epigeneticSchema) }} />
      <div className="container" style={{ maxWidth: '780px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Epigenetics & Cellular Age</div>
          <h1 className="section-title">Epigenetic Longevity <span className="gold-gradient-text">Clock</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Determine your biological cell age versus chronological age based on Horvath-style clinical lifestyle parameters and DNA methylation stressors.
          </p>
        </ScrollAnimator>

        {result ? (
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px', padding: '2.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '3rem' }}>🔬</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)', fontWeight: 900, marginTop: '1rem', marginBottom: '0.5rem' }}>
                Biological Cell Age: {result.bioAge} Years
              </h2>
              <div style={{ fontSize: '1.1rem', color: result.difference < 0 ? '#4caf50' : '#f44336', fontWeight: 800, marginBottom: '1rem' }}>
                {result.difference < 0 ? `Decelerating Aging by ${Math.abs(result.difference)} Years` : `Accelerated Aging by ${result.difference} Years`}
              </div>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 1.25rem', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
                Status: {result.status}
              </span>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                {result.advice}
              </p>

              <div style={{ display: 'flex', gap: '1rem', maxWidth: '480px', margin: '0 auto', flexDirection: 'column' }}>
                <button
                  onClick={() => { addToCart('Botanical Adrenal Recovery'); setCartOpen(true); }}
                  style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🛒 One-Click Shop Recommended Adaptogen Stack
                </button>
                <button
                  onClick={() => setResult(null)}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Recalculate Clock
                </button>
              </div>
            </div>
          </ScrollAnimator>
        ) : (
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
                DNA Methylation Lifestyle Intake
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Chronological Age</label>
                    <input
                      type="number"
                      value={chronoAge}
                      onChange={(e) => setChronoAge(Math.max(1, parseInt(e.target.value) || 0))}
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Sleep Duration (Hours/Night)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={sleep}
                      onChange={(e) => setSleep(Math.max(1, parseFloat(e.target.value) || 0))}
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Exercise (Hours/Week)</label>
                    <input
                      type="number"
                      value={exercise}
                      onChange={(e) => setExercise(Math.max(0, parseFloat(e.target.value) || 0))}
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Lifestyle Cortisol Stress</label>
                    <select
                      value={stress}
                      onChange={(e) => setStress(parseInt(e.target.value))}
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                    >
                      <option value="2">Low (Relaxed, stable circadian cycles)</option>
                      <option value="5">Moderate (Standard office job workload)</option>
                      <option value="9">Extreme (Burnout phase, constant deadlines)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Dietary Inflammatory Profile</label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                  >
                    <option value="balanced">Standard Balanced (Whole foods, moderate carbs)</option>
                    <option value="keto-anti-inflammatory">Anti-Inflammatory Keto (Low glycemic index, rich phytonutrients)</option>
                    <option value="inflammatory">Highly Inflammatory (High simple sugars, trans fats, low fiber)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Environmental Pollutants Exposure</label>
                  <select
                    value={pollutants}
                    onChange={(e) => setPollutants(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                  >
                    <option value="minimal">Minimal (Fresh air region, zero smoking)</option>
                    <option value="heavy">Heavy (Dense metropolitan city pollution, smoking)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                style={{ width: '100%', padding: '0.9rem', background: 'var(--gold)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
              >
                Compute Biological Cell Age
              </button>
            </div>
          </ScrollAnimator>
        )}

      </div>
    </div>
  );
}
