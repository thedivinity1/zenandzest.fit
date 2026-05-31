import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';

const questions = [
  {
    id: 1,
    q: 'How would you describe your physical frame and body structure?',
    opts: [
      { text: 'Thin, slender, light bone structure, struggle to gain weight', score: 'vata' },
      { text: 'Medium build, athletic, moderate bone density, easy to maintain weight', score: 'pitta' },
      { text: 'Broad build, heavy bone structure, gain weight easily, struggle to lose it', score: 'kapha' }
    ]
  },
  {
    id: 2,
    q: 'How does your digestive system and appetite typically function?',
    opts: [
      { text: 'Variable, erratic, gas, bloating, irregular bowel movements', score: 'vata' },
      { text: 'Strong, intense hunger, heartburn, easy acidity, regular/loose bowel movements', score: 'pitta' },
      { text: 'Slow, steady, sluggish digestion, feel heavy after eating, regular bowel movements', score: 'kapha' }
    ]
  },
  {
    id: 3,
    q: 'How do you respond to changes in weather and temperature?',
    opts: [
      { text: 'Dislike cold, wind, dry weather; prefer warm, humid climates', score: 'vata' },
      { text: 'Dislike heat, strong sun, humidity; sweat easily; prefer cool, dry weather', score: 'pitta' },
      { text: 'Dislike dampness, cold, damp fog; prefer warm, dry climates', score: 'kapha' }
    ]
  },
  {
    id: 4,
    q: 'How would you describe your mental focus, learning style, and memory?',
    opts: [
      { text: 'Quick learner but forget quickly, highly creative, racing thoughts, easily anxious', score: 'vata' },
      { text: 'Sharp, logical, detail-oriented, quick to understand, competitive, easily irritable', score: 'pitta' },
      { text: 'Slow to learn but remember forever, calm, patient, stable, struggle with lethargy', score: 'kapha' }
    ]
  },
  {
    id: 5,
    q: 'How would you describe your sleep patterns?',
    opts: [
      { text: 'Light, interrupted, easily awakened by noise, struggle with middle-of-the-night insomnia', score: 'vata' },
      { text: 'Moderate, sound, usually fall asleep quickly, feel warm at night', score: 'pitta' },
      { text: 'Heavy, deep, sleep 8+ hours easily, feel groggy upon waking up', score: 'kapha' }
    ]
  }
];

export default function PrakritiTestPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<string[]>([]);
  const [result, setResult] = useState<null | { dominant: string; percentage: Record<string, number>; desc: string; protocols: string[]; stack: string }>(null);
  const { addToCart, setCartOpen } = useCart();

  const handleAnswer = (score: string) => {
    const nextScores = [...scores, score];
    setScores(nextScores);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate dominant dosha
      const counts = nextScores.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const total = nextScores.length;
      const pct = {
        vata: Math.round(((counts.vata || 0) / total) * 100),
        pitta: Math.round(((counts.pitta || 0) / total) * 100),
        kapha: Math.round(((counts.kapha || 0) / total) * 100)
      };

      let dominant = 'Vata';
      let desc = 'Vata is governed by Air and Space. You are naturally creative, light on your feet, and dynamic, but highly prone to cold, dry stress, circadian sleep fragmentation, and adrenal burnout.';
      let stack = 'Botanical Sleep Drops';
      let protocols = ['Standardized Ashwagandha to balance Vata cortisol surges', 'Kerala Brahmi to quiet the racing mind', 'Magnesium Glycinate for muscle relaxation'];

      if (pct.pitta > pct.vata && pct.pitta > pct.kapha) {
        dominant = 'Pitta';
        desc = 'Pitta is governed by Fire and Water. You are highly driven, logical, passionate, and metabolic, but prone to inflammatory skin issues, early hair thinning, and emotional irritability.';
        stack = 'Hair Vitality Elixir';
        protocols = ['Standardized Spearmint and Berberine for sebum balance', 'Active Kashmiri Saffron to reduce inflammatory crocin degradation', 'Rose Rosemary oil for DHT block'];
      } else if (pct.kapha > pct.vata && pct.kapha > pct.pitta) {
        dominant = 'Kapha';
        desc = 'Kapha is governed by Earth and Water. You are stable, strong, calm, and nurturing, but prone to sluggish digestion, metabolic insulin resistance, and heavy lethargy.';
        stack = 'Gut Balance Botanical';
        protocols = ['Standardized Triphala tannins for microbiome reset', '97% Berberine HCL for AMPK metabolic activation', 'Morning light CAR pulse to break waking lethargy'];
      }

      setResult({ dominant, percentage: pct, desc, protocols, stack });
    }
  };

  const reset = () => {
    setStep(0);
    setScores([]);
    setResult(null);
  };

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        
        {result ? (
          <div>
            <ScrollAnimator>
              <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(201,168,76,0.08)', borderRadius: '24px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem' }}>🌿</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--gold)', fontWeight: 900, marginTop: '1rem' }}>
                  Dominant Dosha: {result.dominant}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                  <span>Vata: <strong>{result.percentage.vata}%</strong></span>
                  <span>Pitta: <strong>{result.percentage.pitta}%</strong></span>
                  <span>Kapha: <strong>{result.percentage.kapha}%</strong></span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontSize: '0.98rem' }}>{result.desc}</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  YOUR CUSTOM BOTANICAL PROTOCOL
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {result.protocols.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', alignItems: 'center' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {p}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                  <button onClick={() => { addToCart(result.stack); setCartOpen(true); }} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                    🛒 One-Click Shop {result.stack}
                  </button>
                  <button onClick={reset} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Retake Constitution Test
                  </button>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-tag">Ayurvedic Prakriti Test</div>
              <h1 className="section-title">Discover Your <span className="gold-gradient-text">Constitutional Biology</span></h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.92rem' }}>
                Complete this 5-step clinical intake assessment to map your cellular elements and obtain custom adaptogenic protocol suggestions.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>
                <span>Question {step + 1} of {questions.length}</span>
                <span>{Math.round((step / questions.length) * 100)}% complete</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden', marginBottom: '2rem' }}>
                <div style={{ height: '100%', width: `${((step) / questions.length) * 100}%`, background: 'var(--gold)', transition: 'width 0.3s ease' }} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                {questions[step].q}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {questions[step].opts.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.88rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
