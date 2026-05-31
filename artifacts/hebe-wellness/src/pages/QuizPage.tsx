import { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '../context/CartContext';

const questions = [
  {
    q: 'What is your primary health concern right now?',
    options: [
      { label: 'Sleep & Rest', icon: '🌙', desc: 'Insomnia, poor sleep quality, racing mind' },
      { label: 'Stress & Anxiety', icon: '⚡', desc: 'Overwhelm, burnout, anxiety, cortisol' },
      { label: 'Hair & Scalp', icon: '💆', desc: 'Hair loss, thinning, scalp issues' },
      { label: 'Skin & Glow', icon: '✨', desc: 'Acne, dullness, aging, radiance' },
      { label: 'Gut & Digestion', icon: '🌿', desc: 'Bloating, IBS, microbiome, constipation' },
      { label: 'Energy & Performance', icon: '💪', desc: 'Fatigue, mental fog, athletic performance' },
    ],
  },
  {
    q: 'How would you describe your stress level?',
    options: [
      { label: 'Minimal', icon: '😌', desc: 'I manage stress well most of the time' },
      { label: 'Moderate', icon: '😐', desc: 'Occasional overwhelm but manageable' },
      { label: 'High', icon: '😤', desc: 'Frequently stressed and anxious' },
      { label: 'Severe', icon: '😰', desc: 'Chronic stress, near burnout territory' },
    ],
  },
  {
    q: 'How is your sleep quality?',
    options: [
      { label: 'Excellent', icon: '😴', desc: '7-9 hours, feel refreshed on waking' },
      { label: 'Fair', icon: '🙂', desc: '6-7 hours, take time to feel alert' },
      { label: 'Poor', icon: '😞', desc: 'Under 6 hours, groggy mornings' },
      { label: 'Insomniac', icon: '😩', desc: 'Can\'t fall or stay asleep' },
    ],
  },
  {
    q: 'What\'s your current lifestyle like?',
    options: [
      { label: 'Active & Balanced', icon: '🏃', desc: 'Regular exercise, good diet, good habits' },
      { label: 'Mostly Sedentary', icon: '🛋️', desc: 'Desk job, limited movement' },
      { label: 'High Performance', icon: '🚀', desc: 'High achiever, work intensely, often push limits' },
      { label: 'Irregular & Chaotic', icon: '🌀', desc: 'Inconsistent sleep, diet, schedule' },
    ],
  },
  {
    q: 'Have you tried natural or herbal supplements before?',
    options: [
      { label: 'Never tried', icon: '🆕', desc: 'This would be my first time' },
      { label: 'A few basics', icon: '🌱', desc: 'Tried turmeric, ashwagandha, etc.' },
      { label: 'Regular user', icon: '💊', desc: 'Use supplements consistently' },
      { label: 'Advanced', icon: '🔬', desc: 'Deep knowledge of phytochemistry & herbs' },
    ],
  },
  {
    q: 'What outcome matters most to you in 30 days?',
    options: [
      { label: 'Sleep 7+ hours', icon: '🌙', desc: 'Consistently deep, refreshing sleep' },
      { label: 'Feel calm & focused', icon: '🎯', desc: 'Reduced anxiety, sharp mind' },
      { label: 'Visible hair growth', icon: '💇', desc: 'Less shedding, stronger hair' },
      { label: 'Glowing skin', icon: '🌟', desc: 'Clear, radiant, youthful complexion' },
      { label: 'Better digestion', icon: '💚', desc: 'No bloating, regular, gut comfort' },
      { label: 'More energy', icon: '⚡', desc: 'Sustained energy, no afternoon crash' },
    ],
  },
];

const recommendations: Record<string, { products: string[]; protocol: string; headline: string }> = {
  '0_0': { products: ['Botanical Sleep Drops', 'Cognitive Performance Stack'], protocol: 'Sleep Restoration Protocol', headline: 'Your personalized sleep restoration stack is ready.' },
  '0_1': { products: ['Adaptogenic Stress Relief', 'Botanical Sleep Drops'], protocol: 'Calm & Sleep Stack', headline: 'Stress-driven sleep disruption — we have the formula.' },
  '1_0': { products: ['Adaptogenic Stress Relief', 'Cognitive Performance Stack'], protocol: 'Stress Resilience Protocol', headline: 'Your HPA axis needs botanical support.' },
  '2_0': { products: ['Hair Vitality Elixir', 'Gut Balance Botanical'], protocol: 'Hair Revival Protocol', headline: 'Targeting your hair loss at the root cause.' },
  '3_0': { products: ['Skin Radiance Oil', 'Gut Balance Botanical'], protocol: 'Skin Clarity Protocol', headline: 'Inside-out skin transformation begins here.' },
  '4_0': { products: ['Gut Balance Botanical', 'Adaptogenic Stress Relief'], protocol: 'Gut Health Protocol', headline: 'Microbiome reset for total body wellness.' },
  default: { products: ['Adaptogenic Stress Relief', 'Botanical Sleep Drops', 'Gut Balance Botanical'], protocol: 'Comprehensive Wellness Protocol', headline: 'A complete botanical wellness overhaul.' },
};

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ q: number; a: number }[]>([]);
  const [done, setDone] = useState(false);
  const { addToCart, applyDiscountCode, setCartOpen } = useCart();

  const progress = ((currentQ) / questions.length) * 100;

  const selectAnswer = (aIndex: number) => {
    const newAnswers = [...answers, { q: currentQ, a: aIndex }];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setDone(false);
  };

  const getResult = () => {
    const firstAnswer = answers[0];
    if (!firstAnswer) return recommendations.default;
    const key = `${firstAnswer.q}_${firstAnswer.a}`;
    return recommendations[key] || recommendations.default;
  };

  const result = getResult();

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, var(--forest-green) 0%, var(--darkest) 60%)' }}>
      {/* Header */}
      <div style={{ paddingTop: '8rem', paddingBottom: '2rem', textAlign: 'center' }}>
        <div className="section-tag" style={{ marginBottom: '1rem' }}>Wellness Quiz</div>
        <h1 className="section-title" style={{ marginBottom: '0.75rem' }}>
          Find Your <span className="gold-gradient-text">Perfect Protocol</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: 400, margin: '0 auto' }}>
          6 questions · 2 minutes · Personalized botanical recommendation
        </p>
      </div>

      {/* Quiz Card */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        {!done ? (
          <div className="quiz-question-card">
            {/* Progress */}
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>
                Question {currentQ + 1} of {questions.length}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                {Math.round(progress)}% complete
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: 800, color: 'white', marginBottom: '2rem', lineHeight: 1.35
            }}>
              {questions[currentQ].q}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: questions[currentQ].options.length > 4 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  style={{
                    padding: '1.25rem', textAlign: 'left',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14, cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(201,168,76,0.1)';
                    el.style.borderColor = 'rgba(201,168,76,0.5)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{opt.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem', color: 'white' }}>
                    {opt.label}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>

            {currentQ > 0 && (
              <button
                onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); }}
                style={{
                  marginTop: '1.5rem', background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.875rem',
                  display: 'flex', alignItems: 'center', gap: '0.25rem'
                }}
              >
                ← Back
              </button>
            )}
          </div>
        ) : (
          /* Results */
          <div className="quiz-question-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>Your Personalized Recommendation</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.35 }}>
              {result.headline}
            </h2>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '100px', color: 'var(--gold)',
              fontSize: '0.875rem', fontWeight: 700, marginBottom: '2rem'
            }}>
              Protocol: {result.protocol}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
                Recommended Products
              </h4>
              {result.products.map((product, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 12
                }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.1rem' }}>{i + 1}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{product}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>Clinically formulated · Lab tested</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>◆</span>
                </div>
              ))}
            </div>

            {/* Auto Discount highlight */}
            <div style={{
              background: 'rgba(76, 201, 135, 0.08)',
              border: '1px dashed rgba(76, 201, 135, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4cc987', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                🎉 PROMO CODE: <strong>QUIZ15</strong> AUTO-APPLIED FOR 15% BUNDLE SAVINGS!
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => {
                result.products.forEach(p => addToCart(p));
                applyDiscountCode('QUIZ15');
                setCartOpen(true);
              }} style={{
                width: '100%', padding: '1rem', textAlign: 'center',
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                color: 'var(--darkest)', borderRadius: 12,
                fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', border: 'none',
                boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                ⚡ Add Recommended Protocol to Cart & Checkout (15% Off)
              </button>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <Link href="/shop" style={{
                  flex: 1, padding: '0.85rem', textAlign: 'center',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, color: 'white',
                  textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem'
                }}>
                  Browse Shop
                </Link>
                <Link href="/consult" style={{
                  flex: 1, padding: '0.85rem', textAlign: 'center',
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, color: 'white',
                  textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem'
                }}>
                  Talk to an Expert
                </Link>
              </div>
            </div>
            <button onClick={reset} style={{
              marginTop: '1rem', background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.875rem', display: 'block', width: '100%'
            }}>
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
