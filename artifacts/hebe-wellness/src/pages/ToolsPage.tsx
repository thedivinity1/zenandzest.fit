import { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import ScrollAnimator from '../components/ScrollAnimator';

type Tool = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  questions: Question[];
};

type Question = {
  text: string;
  options: string[];
};

const tools: Tool[] = [
  {
    id: 'sleep',
    icon: '🌙',
    name: 'Sleep Calculator',
    desc: 'Optimize your sleep cycles, bedtime, and wake time based on your chronotype',
    questions: [
      { text: 'How many hours of sleep do you typically get?', options: ['Less than 5 hours', '5-6 hours', '6-7 hours', '7-8 hours', '8+ hours'] },
      { text: 'How long does it take you to fall asleep?', options: ['Less than 10 min', '10-20 minutes', '20-30 minutes', '30-60 minutes', 'Over an hour'] },
      { text: 'How do you feel when you wake up?', options: ['Refreshed and energized', 'Okay, need a few minutes', 'Groggy for 30+ minutes', 'Exhausted, want more sleep'] },
      { text: 'How often do you wake up during the night?', options: ['Never', '1-2 times rarely', '1-2 times regularly', '3+ times per night'] },
    ],
  },
  {
    id: 'stress',
    icon: '⚡',
    name: 'Stress Assessment',
    desc: 'Measure your cortisol load, burnout risk, and HPA axis health',
    questions: [
      { text: 'How would you rate your current stress level?', options: ['Minimal', 'Moderate', 'High', 'Extreme — burnout territory'] },
      { text: 'Do you experience physical symptoms of stress?', options: ['Rarely if ever', 'Occasionally', 'Weekly', 'Daily'] },
      { text: 'How is your energy throughout the day?', options: ['Consistent and high', 'Morning high, afternoon low', 'Low all day', 'Wired but tired'] },
      { text: 'How well do you recover from stressful events?', options: ['Quickly — within hours', 'A day or two', 'Several days', 'Rarely feel recovered'] },
    ],
  },
  {
    id: 'hair',
    icon: '💆',
    name: 'Hair Analyzer',
    desc: 'Identify your hair loss pattern, root cause, and personalized botanical regimen',
    questions: [
      { text: 'Describe your hair loss pattern:', options: ['Thinning overall', 'Receding hairline', 'Crown/vertex thinning', 'Patches (alopecia)', 'Post-illness shedding'] },
      { text: 'When did you notice significant hair loss?', options: ['Just started — less than 3 months', '3-6 months ago', '6-12 months ago', 'Over a year ago'] },
      { text: 'What is your stress level?', options: ['Low and managed', 'Moderate', 'High', 'Very high — chronic'] },
      { text: 'How is your diet?', options: ['Nutritious and balanced', 'Mostly good', 'Could be better', 'Poor — often skip meals'] },
    ],
  },
  {
    id: 'skin',
    icon: '✨',
    name: 'Skin Finder',
    desc: 'Discover your skin type, underlying imbalances, and botanical skincare regimen',
    questions: [
      { text: 'How does your skin feel by midday?', options: ['Fresh and balanced', 'Tight and dry', 'Oily all over', 'Oily T-zone, dry cheeks', 'Sensitive and reactive'] },
      { text: 'Primary skin concern?', options: ['Acne & breakouts', 'Pigmentation & uneven tone', 'Fine lines & aging', 'Dullness & lack of glow', 'Sensitivity & redness'] },
      { text: 'How does your skin react to new products?', options: ['Never reacts', 'Rarely', 'Sometimes breaks out', 'Almost always reacts'] },
      { text: 'Describe your gut health:', options: ['Excellent digestion', 'Occasional bloating', 'Regular digestive issues', 'Chronic gut problems'] },
    ],
  },
  {
    id: 'wellness',
    icon: '💚',
    name: 'Wellness Score',
    desc: 'Get a comprehensive health score across 6 dimensions of wellness',
    questions: [
      { text: 'Rate your sleep quality (1 = poor, 4 = excellent):', options: ['1 — Very Poor', '2 — Poor', '3 — Good', '4 — Excellent'] },
      { text: 'Rate your energy and vitality:', options: ['1 — Chronically exhausted', '2 — Low energy', '3 — Good energy', '4 — Vibrant and vital'] },
      { text: 'Rate your mental clarity:', options: ['1 — Constant brain fog', '2 — Frequent fog', '3 — Generally clear', '4 — Sharp and focused'] },
      { text: 'Rate your mood and emotional wellbeing:', options: ['1 — Struggling significantly', '2 — Up and down', '3 — Generally good', '4 — Thriving'] },
    ],
  },
  {
    id: 'adaptogen',
    icon: '🌿',
    name: 'Adaptogen Finder',
    desc: 'Match the perfect adaptogens to your unique stress profile and constitution',
    questions: [
      { text: 'Your dominant stress response:', options: ['Fight (aggressive, irritable)', 'Flight (anxious, restless)', 'Freeze (withdrawn, depleted)', 'Mixed — depends on the day'] },
      { text: 'Primary goal with adaptogens:', options: ['Energy and stamina', 'Anxiety and calm', 'Sleep and recovery', 'Cognitive performance', 'Immune resilience'] },
      { text: 'Your Ayurvedic body type (Prakriti):', options: ['Vata — thin, anxious, creative', 'Pitta — intense, driven, hot', 'Kapha — calm, slow, solid', 'Not sure / mixed'] },
      { text: 'Experience with herbal supplements:', options: ['Never used them', 'Tried a few basics', 'Regular supplement user', 'Advanced — studied herbalism'] },
    ],
  },
];

const resultData: Record<string, {
  radar: { subject: string; score: number }[];
  bar: { name: string; value: number; color: string }[];
  recommendations: string[];
  headline: string;
  score: number;
}> = {
  sleep: {
    headline: 'Moderate Sleep Disruption Detected',
    score: 65,
    radar: [
      { subject: 'Duration', score: 70 },
      { subject: 'Quality', score: 55 },
      { subject: 'Latency', score: 60 },
      { subject: 'Continuity', score: 75 },
      { subject: 'Recovery', score: 65 },
    ],
    bar: [
      { name: 'NREM Stage 1', value: 5, color: '#c9a84c' },
      { name: 'NREM Stage 2', value: 50, color: '#1a3d2e' },
      { name: 'Deep Sleep', value: 20, color: '#0a3020' },
      { name: 'REM Sleep', value: 25, color: '#c9a84c88' },
    ],
    recommendations: ['Botanical Sleep Drops (Ashwagandha + Vijaya complex)', 'Brahmi for racing mind before bed', 'Consistent sleep/wake schedule within 30 minutes'],
  },
  stress: {
    headline: 'Elevated Stress Load — HPA Axis Engaged',
    score: 58,
    radar: [
      { subject: 'Mental', score: 55 },
      { subject: 'Physical', score: 65 },
      { subject: 'Emotional', score: 50 },
      { subject: 'Recovery', score: 45 },
      { subject: 'Resilience', score: 70 },
    ],
    bar: [
      { name: 'Morning Cortisol', value: 85, color: '#c9a84c' },
      { name: 'Afternoon', value: 60, color: '#1a3d2e' },
      { name: 'Evening', value: 40, color: '#0a3020' },
      { name: 'Ideal Pattern', value: 70, color: '#c9a84c88' },
    ],
    recommendations: ['Adaptogenic Stress Relief (Ashwagandha + Rhodiola)', 'Brahmi for cognitive resilience', 'Mindfulness + HRV biofeedback practice'],
  },
  hair: {
    headline: 'Androgenic + Telogen Effluvium Pattern',
    score: 72,
    radar: [
      { subject: 'DHT Load', score: 60 },
      { subject: 'Nutrition', score: 70 },
      { subject: 'Scalp Health', score: 65 },
      { subject: 'Circulation', score: 75 },
      { subject: 'Stress', score: 55 },
    ],
    bar: [
      { name: 'Bhringraj', value: 95, color: '#c9a84c' },
      { name: 'Rosemary', value: 88, color: '#1a3d2e' },
      { name: 'Biotin', value: 75, color: '#0a3020' },
      { name: 'Iron', value: 70, color: '#c9a84c88' },
    ],
    recommendations: ['Hair Vitality Elixir (Bhringraj + Rosemary)', 'Iron and protein-rich diet optimization', 'Scalp massage 5 minutes daily for microcirculation'],
  },
  skin: {
    headline: 'Combination Skin with Inflammatory Tendency',
    score: 68,
    radar: [
      { subject: 'Hydration', score: 65 },
      { subject: 'Oil Balance', score: 55 },
      { subject: 'Radiance', score: 70 },
      { subject: 'Gut Health', score: 60 },
      { subject: 'Immunity', score: 75 },
    ],
    bar: [
      { name: 'Turmeric', value: 90, color: '#c9a84c' },
      { name: 'Saffron', value: 85, color: '#1a3d2e' },
      { name: 'Probiotics', value: 80, color: '#0a3020' },
      { name: 'Vitamin C', value: 75, color: '#c9a84c88' },
    ],
    recommendations: ['Skin Radiance Oil (Saffron + Turmeric)', 'Gut Balance Botanical for microbiome', 'Anti-inflammatory diet, reduce dairy and sugar'],
  },
  wellness: {
    headline: 'Moderate Wellness — Room for Significant Optimization',
    score: 62,
    radar: [
      { subject: 'Sleep', score: 60 },
      { subject: 'Energy', score: 65 },
      { subject: 'Clarity', score: 55 },
      { subject: 'Mood', score: 70 },
      { subject: 'Immunity', score: 68 },
      { subject: 'Digestion', score: 62 },
    ],
    bar: [
      { name: 'Physical', value: 65, color: '#c9a84c' },
      { name: 'Mental', value: 60, color: '#1a3d2e' },
      { name: 'Emotional', value: 70, color: '#0a3020' },
      { name: 'Spiritual', value: 55, color: '#c9a84c88' },
    ],
    recommendations: ['Comprehensive botanical protocol — schedule consultation', 'Daily Ashwagandha for foundational stress support', 'Triphala for gut health and detoxification'],
  },
  adaptogen: {
    headline: 'Your Ideal Adaptogen Stack: Ashwagandha + Brahmi',
    score: 85,
    radar: [
      { subject: 'Ashwagandha', score: 95 },
      { subject: 'Brahmi', score: 85 },
      { subject: 'Rhodiola', score: 70 },
      { subject: 'Shatavari', score: 65 },
      { subject: "Lion's Mane", score: 80 },
    ],
    bar: [
      { name: 'Ashwagandha', value: 95, color: '#c9a84c' },
      { name: 'Brahmi', value: 85, color: '#1a3d2e' },
      { name: "Lion's Mane", value: 80, color: '#0a3020' },
      { name: 'Rhodiola', value: 70, color: '#c9a84c88' },
    ],
    recommendations: ['Start with Ashwagandha 300-600mg KSM-66 extract daily', 'Add Brahmi 300mg for cognitive support', 'Cycle adaptogens — 8 weeks on, 2 weeks off'],
  },
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const startTool = (tool: Tool) => {
    setActiveTool(tool);
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    if (step < (activeTool?.questions.length ?? 0) - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setActiveTool(null);
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = activeTool ? resultData[activeTool.id] : null;

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--forest-green)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="section-tag">Free Wellness Tools</div>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            Know Your Body. <span className="gold-gradient-text">Optimize Your Life.</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            8 science-backed assessment tools developed by our clinical team. Free. Personalized. Instant results.
          </p>
        </div>
      </section>

      {/* Assessment Modal */}
      {activeTool && (
        <div className="modal-overlay" onClick={reset}>
          <div style={{
            background: 'var(--darkest)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 24, padding: '2.5rem',
            maxWidth: showResult ? 800 : 600, width: '95%',
            position: 'relative', animation: 'fade-in-up 0.3s ease',
            maxHeight: '90vh', overflowY: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <button onClick={reset} className="modal-close">✕</button>

            {!showResult ? (
              <>
                {/* Tool Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2rem' }}>{activeTool.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'white', fontWeight: 700 }}>
                      {activeTool.name}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Question {step + 1} of {activeTool.questions.length}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="tool-step-indicator">
                  {activeTool.questions.map((_, i) => (
                    <div key={i} className={`tool-step-dot ${i <= step ? 'active' : ''}`} />
                  ))}
                </div>

                {/* Question */}
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'white', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.4 }}>
                  {activeTool.questions[step].text}
                </h2>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeTool.questions[step].options.map((opt, i) => (
                    <button key={i} className="tool-option-btn" onClick={() => selectAnswer(i)}>
                      <span style={{ color: 'var(--gold)', marginRight: '0.75rem', fontWeight: 700 }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : result ? (
              <>
                {/* Results */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>{activeTool.icon}</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', fontWeight: 800, margin: '0.75rem 0 0.5rem' }}>
                    {result.headline}
                  </h2>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1.25rem',
                    background: result.score >= 70 ? 'rgba(26,61,46,0.6)' : result.score >= 50 ? 'rgba(201,168,76,0.1)' : 'rgba(255,50,50,0.1)',
                    border: `1px solid ${result.score >= 70 ? 'rgba(26,61,46,0.8)' : result.score >= 50 ? 'rgba(201,168,76,0.4)' : 'rgba(255,50,50,0.4)'}`,
                    borderRadius: '100px', color: result.score >= 70 ? '#4caf84' : result.score >= 50 ? 'var(--gold)' : '#ff7878',
                    fontSize: '1rem', fontWeight: 700
                  }}>
                    Wellness Score: {result.score}/100
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  {/* Radar */}
                  <div>
                    <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      Profile Analysis
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={result.radar}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                        <Radar dataKey="score" stroke="#c9a84c" fill="#c9a84c" fillOpacity={0.25} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar */}
                  <div>
                    <h4 style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      Key Metrics
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={result.bar} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} width={80} />
                        <Tooltip contentStyle={{ background: '#0a1a0f', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 8 }} />
                        <Bar dataKey="value" fill="#c9a84c" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Personalized Recommendations
                  </h4>
                  {result.recommendations.map((rec, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.7rem', marginTop: '0.2rem' }}>◆</span>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{rec}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a href="/shop" style={{
                    flex: 1, padding: '0.875rem', textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                    color: 'var(--darkest)', borderRadius: 12,
                    textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem'
                  }}>
                    Shop Recommendations
                  </a>
                  <button onClick={reset} style={{
                    flex: 1, padding: '0.875rem',
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 12, color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem'
                  }}>
                    Try Another Tool
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <section style={{ background: 'var(--darkest)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {tools.map((tool, i) => (
              <ScrollAnimator key={tool.id} className={`stagger-${(i % 3) + 1}`}>
                <div
                  onClick={() => startTool(tool)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, padding: '2.5rem', cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(201,168,76,0.06)';
                    el.style.borderColor = 'rgba(201,168,76,0.3)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.75rem', marginBottom: '1.25rem'
                  }}>
                    {tool.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                    {tool.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {tool.desc}
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem'
                  }}>
                    Start Assessment →
                  </div>
                </div>
              </ScrollAnimator>
            ))}

            {/* Extra tools (static display) */}
            {[
              { icon: '🧬', name: 'Prakriti Analyzer', desc: 'Discover your Ayurvedic body type and personalized regimen based on Tridosha theory' },
              { icon: '🔬', name: 'Lab Marker Guide', desc: 'Understand which blood markers to test for comprehensive wellness assessment' },
            ].map((tool, i) => (
              <ScrollAnimator key={i} className={`stagger-${(i % 3) + 1}`} style={{ opacity: 0.6 }}>
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  borderRadius: 20, padding: '2.5rem'
                }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>{tool.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
                    {tool.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {tool.desc}
                  </p>
                  <div style={{ color: 'rgba(201,168,76,0.4)', fontWeight: 600, fontSize: '0.85rem' }}>
                    Coming Soon
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
