import { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

/* ===== SLEEP QUALITY CALCULATOR ===== */
function SleepCalculator() {
  const [hours, setHours] = useState(7);
  const [wakeUps, setWakeUps] = useState(1);
  const [energy, setEnergy] = useState(5);
  const [screenTime, setScreenTime] = useState(2);
  const [result, setResult] = useState<null | { score: number; label: string; tips: string[] }>(null);

  const calculate = () => {
    let score = 100;
    if (hours < 6) score -= 30; else if (hours < 7) score -= 15; else if (hours > 9) score -= 10;
    score -= wakeUps * 8;
    score -= (10 - energy) * 3;
    score -= screenTime * 4;
    score = Math.max(0, Math.min(100, score));
    const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : 'Poor';
    const tips = score < 80 ? [
      hours < 7 ? 'Aim for 7-9 hours of sleep nightly' : null,
      wakeUps > 1 ? 'Reduce nighttime wake-ups with Ashwagandha + Magnolia Bark before bed' : null,
      energy < 7 ? 'Low morning energy suggests poor deep sleep — try Brahmi + L-Theanine 1hr before sleep' : null,
      screenTime > 1 ? 'Remove screens 90min before bed — blue light suppresses melatonin for 3+ hours' : null,
    ].filter(Boolean) as string[] : ['Excellent sleep hygiene! Maintain your botanical ritual.'];
    setResult({ score, label, tips });
  };

  const scoreColor = result ? (result.score >= 80 ? '#4ade80' : result.score >= 60 ? '#fbbf24' : result.score >= 40 ? '#f97316' : '#ef4444') : 'var(--gold)';

  return (
    <div>
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Hours of sleep last night', value: hours, set: setHours, min: 3, max: 12, step: 0.5, unit: 'hrs', format: (v: number) => `${v} hrs` },
          { label: 'Times you woke up during the night', value: wakeUps, set: setWakeUps, min: 0, max: 8, step: 1, unit: 'times', format: (v: number) => v === 0 ? 'None' : `${v}x` },
          { label: 'Morning energy level (1 = exhausted, 10 = energized)', value: energy, set: setEnergy, min: 1, max: 10, step: 1, unit: '/10', format: (v: number) => `${v}/10` },
          { label: 'Screen time in last 2 hours before sleep', value: screenTime, set: setScreenTime, min: 0, max: 4, step: 0.5, unit: 'hrs', format: (v: number) => `${v} hrs` },
        ].map((input, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>{input.label}</label>
              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.875rem' }}>{input.format(input.value)}</span>
            </div>
            <input type="range" min={input.min} max={input.max} step={input.step} value={input.value} onChange={e => input.set(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
        ))}
      </div>
      <button onClick={calculate} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: result ? '1.5rem' : 0 }}>Calculate My Sleep Score</button>
      {result && (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${scoreColor}33`, borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: scoreColor, fontFamily: 'var(--font-serif)' }}>{result.score}</div>
            <div style={{ color: scoreColor, fontWeight: 700, fontSize: '1.1rem' }}>{result.label} Sleep Quality</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {result.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span> {tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== STRESS TRACKER ===== */
function StressTracker() {
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(0));
  const [result, setResult] = useState<null | { level: string; score: number; color: string; recs: string[] }>(null);
  const questions = [
    'How often do you feel overwhelmed by your responsibilities?',
    'Do you have difficulty relaxing or switching off?',
    'How often do you feel irritable or short-tempered?',
    'Do you experience physical symptoms of stress (headaches, tension, stomach issues)?',
    'How often do you feel anxious or worried?',
    'Do you find it hard to concentrate or focus?',
    'How disrupted is your sleep due to stress?',
    'Do you feel emotionally exhausted at the end of the day?',
    'How often do you feel you have no control over your life?',
    'Do you struggle to find joy or pleasure in activities you used to enjoy?',
  ];
  const calculate = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    const pct = Math.round((total / 30) * 100);
    const level = pct < 30 ? 'Low Stress' : pct < 60 ? 'Moderate Stress' : 'High Stress';
    const color = pct < 30 ? '#4ade80' : pct < 60 ? '#fbbf24' : '#ef4444';
    const recs = pct >= 60
      ? ['Start Rhodiola Rosea + Ashwagandha stack — clinically proven for HPA axis support', 'Implement 4-7-8 breathing 3x daily — reduces cortisol within minutes', 'Consider our free expert consultation — this level of stress needs a personalized protocol', 'Prioritize sleep above all — chronic stress + sleep deprivation creates a dangerous loop']
      : pct >= 30
      ? ['Ashwagandha KSM-66 daily — reduces cortisol 28% in 8-week trials', 'Implement morning sunlight exposure — regulates cortisol awakening response', 'Try L-Theanine for acute stress moments — works within 45 minutes']
      : ['Excellent stress resilience! Maintain your botanical wellness ritual.', 'Consider Brahmi for cognitive support and continued stress prevention'];
    setResult({ level, score: pct, color, recs });
  };
  const data = questions.map((_, i) => ({ name: `Q${i + 1}`, value: answers[i] }));
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {questions.map((q, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '0.75rem' }}><span style={{ color: 'var(--gold)', fontWeight: 700 }}>Q{i + 1}.</span> {q}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Never', 'Rarely', 'Sometimes'].map((opt, j) => (
                <button key={j} onClick={() => { const a = [...answers]; a[i] = j; setAnswers(a); }} style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: `1px solid ${answers[i] === j ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: answers[i] === j ? 'rgba(201,168,76,0.15)' : 'transparent', color: answers[i] === j ? 'var(--gold)' : 'rgba(255,255,255,0.5)', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>{opt}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={calculate} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: result ? '1.5rem' : 0 }}>Analyze My Stress Level</button>
      {result && (
        <div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: `1px solid ${result.color}33`, marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: result.color, fontFamily: 'var(--font-serif)' }}>{result.score}%</div>
            <div style={{ color: result.color, fontWeight: 700 }}>{result.level}</div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data}><Bar dataKey="value" fill="var(--gold)" radius={4} /><XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} /><Tooltip contentStyle={{ background: '#0a1a0f', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px', color: '#fff' }} /></BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {result.recs.map((r, i) => <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{r}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== HAIR HEALTH ANALYSER ===== */
function HairAnalyser() {
  const [hairType, setHairType] = useState('');
  const [concern, setConcern] = useState('');
  const [diet, setDiet] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [result, setResult] = useState<null | { routine: string[]; products: string[] }>(null);
  const calculate = () => {
    const routine = [];
    const products = [];
    if (concern === 'thinning' || concern === 'loss') { routine.push('Apply Bhringraj + Rosemary oil 3x weekly and massage for 5 min'); products.push('Hair Vitality Elixir (Bhringraj + Saw Palmetto + Rosemary)'); }
    if (concern === 'dandruff') { routine.push('Use Neem + Tea Tree scalp treatment twice weekly'); products.push('Scalp Clarity Botanical Oil'); }
    if (diet === 'poor') { routine.push('Add Iron, Zinc, and Biotin-rich foods or supplements daily'); products.push('Hair Vitality Elixir for internal nutritional support'); }
    if (lifestyle === 'stressed') { routine.push('Start Ashwagandha + Brahmi — stress is the #1 hidden cause of hair loss'); products.push('Adaptogenic Stress Relief (manages cortisol-driven hair loss)'); }
    routine.push('Wash with sulfate-free shampoo maximum 2-3x weekly');
    routine.push('Take Bhringraj extract 300mg daily for 90 days for measurable results');
    setResult({ routine, products: [...new Set(products)] });
  };
  return (
    <div>
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
        {[
          { label: 'Hair Type', value: hairType, set: setHairType, options: ['straight', 'wavy', 'curly', 'coily'] },
          { label: 'Primary Concern', value: concern, set: setConcern, options: ['thinning', 'loss', 'dandruff', 'dryness', 'breakage', 'premature_grey'] },
          { label: 'Diet Quality', value: diet, set: setDiet, options: ['excellent', 'good', 'average', 'poor'] },
          { label: 'Lifestyle Stress Level', value: lifestyle, set: setLifestyle, options: ['low', 'moderate', 'stressed', 'very_stressed'] },
        ].map((field, i) => (
          <div key={i}>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{field.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {field.options.map(opt => (
                <button key={opt} onClick={() => field.set(opt)} style={{ padding: '0.5rem 1rem', borderRadius: '100px', border: `1px solid ${field.value === opt ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: field.value === opt ? 'rgba(201,168,76,0.15)' : 'transparent', color: field.value === opt ? 'var(--gold)' : 'rgba(255,255,255,0.55)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize' }}>{opt.replace(/_/g, ' ')}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={calculate} disabled={!hairType || !concern || !diet || !lifestyle} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: !hairType || !concern ? 0.6 : 1, marginBottom: result ? '1.5rem' : 0 }}>Analyze My Hair Profile</button>
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>YOUR PERSONALIZED ROUTINE</div>
            {result.routine.map((r, i) => <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}><span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{r}</div>)}
          </div>
          {result.products.length > 0 && (
            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>RECOMMENDED PRODUCTS</div>
              {result.products.map((p, i) => <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}><span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>{p}</div>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ===== SKIN TYPE FINDER ===== */
function SkinFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<null | { type: string; desc: string; botanicals: string[] }>(null);
  const questions = [
    { q: 'How does your skin feel 2 hours after cleansing?', opts: ['Tight and dry', 'Comfortable', 'Slightly oily', 'Very oily and shiny', 'Dry in some areas, oily in others'] },
    { q: 'How often do you experience breakouts?', opts: ['Rarely or never', 'Occasionally', 'Frequently', 'Almost always'] },
    { q: 'How does your skin react to new products?', opts: ['Often becomes irritated or red', 'Usually tolerates products well', 'No particular reaction', 'Can be unpredictable'] },
    { q: 'How would you describe your pore size?', opts: ['Very small or invisible', 'Small to medium', 'Large on nose/chin', 'Large all over'] },
    { q: 'How does your skin look by midday?', opts: ['Dull and dry', 'Fresh and normal', 'Slightly shiny', 'Very oily', 'Oily T-zone, dry cheeks'] },
    { q: 'How often do you experience skin sensitivity or redness?', opts: ['Very often', 'Sometimes', 'Rarely', 'Never'] },
    { q: 'What is your biggest skin concern?', opts: ['Dryness and flaking', 'Uneven tone / pigmentation', 'Acne and breakouts', 'Oiliness and large pores', 'Fine lines and aging'] },
    { q: 'How does your skin respond to sun exposure?', opts: ['Burns easily, rarely tans', 'Sometimes burns, does tan', 'Rarely burns, tans easily', 'Never burns, always tans'] },
  ];
  const skinTypes: Record<string, { type: string; desc: string; botanicals: string[] }> = {
    dry: { type: 'Dry / Dehydrated', desc: 'Your skin lacks moisture and lipids. Focus on barrier-strengthening and deep hydration botanicals.', botanicals: ['Rosehip Seed Oil (trans-retinoic acid)', 'Saffron extract (antioxidant barrier)', 'Aloe Vera + Hyaluronic Acid', 'Tulsi for inflammation control'] },
    oily: { type: 'Oily / Acne-Prone', desc: 'Excess sebum and potential hormonal androgens are driving oil and breakouts. Target sebum regulation.', botanicals: ['Berberine (AMPK activation + sebum control)', 'Neem extract (antimicrobial)', 'Spearmint (androgen modulation)', 'Turmeric Curcumin (anti-inflammatory)'] },
    combo: { type: 'Combination', desc: 'Different zones need different care. Focus on balancing botanicals that work for both dry and oily areas.', botanicals: ['Turmeric + Gotu Kola (balance)', 'Green Tea Extract (antioxidant)', 'Bakuchiol (natural retinol)', 'Saffron for evening tone'] },
    sensitive: { type: 'Sensitive / Reactive', desc: 'Your skin barrier is compromised or reactive. Prioritize soothing, anti-inflammatory botanicals.', botanicals: ['Calendula (strongest botanical soother)', 'Centella Asiatica (barrier repair)', 'Chamomile (histamine modulation)', 'Aloe Vera (cooling anti-inflammatory)'] },
    normal: { type: 'Normal / Balanced', desc: 'Lucky you! Maintain your natural balance and focus on anti-aging and protection.', botanicals: ['Saffron (brightening + antioxidant)', 'Rosehip Oil (gentle retinoid activity)', 'Ashwagandha (anti-aging adaptogen)', 'Vitamin C complex (collagen synthesis)'] },
  };
  const determineType = (ans: string[]) => {
    if (ans.includes('Tight and dry') && ans.filter(a => a.includes('dry') || a.includes('Dry')).length >= 2) return 'dry';
    if (ans.filter(a => a.toLowerCase().includes('oily')).length >= 2) return 'oily';
    if (ans.includes('Often becomes irritated or red') || ans.includes('Very often')) return 'sensitive';
    if (ans.includes('Dry in some areas, oily in others') || ans.includes('Oily T-zone, dry cheeks')) return 'combo';
    return 'normal';
  };
  const handleAnswer = (ans: string) => {
    const newAnswers = [...answers, ans];
    setAnswers(newAnswers);
    if (step < questions.length - 1) { setStep(step + 1); }
    else { const type = determineType(newAnswers); setResult(skinTypes[type]); }
  };
  const reset = () => { setStep(0); setAnswers([]); setResult(null); };
  if (result) return (
    <div>
      <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(201,168,76,0.08)', borderRadius: '16px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌸</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 700 }}>{result.type}</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.7 }}>{result.desc}</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>YOUR BOTANICAL PROTOCOL</div>
        {result.botanicals.map((b, i) => <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}><span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>{b}</div>)}
      </div>
      <button onClick={reset} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem' }}>Retake Quiz →</button>
    </div>
  );
  return (
    <div>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          <span>Question {step + 1} of {questions.length}</span><span>{Math.round(((step) / questions.length) * 100)}% complete</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(step / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', transition: 'width 0.4s ease' }} />
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.5 }}>{questions[step].q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {questions[step].opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.8)', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===== BMI + WELLNESS INDEX ===== */
function WellnessIndex() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [sleep, setSleep] = useState(6);
  const [exercise, setExercise] = useState(3);
  const [stress, setStress] = useState(5);
  const [nutrition, setNutrition] = useState(5);
  const [result, setResult] = useState<null | { bmi: number; bmiLabel: string; wellnessScore: number; radarData: object[] }>(null);
  const calculate = () => {
    const bmi = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
    const bmiLabel = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy Weight' : bmi < 30 ? 'Overweight' : 'Obese';
    const bmiScore = bmi < 18.5 ? 50 : bmi < 25 ? 100 : bmi < 30 ? 70 : 40;
    const sleepScore = sleep >= 7 ? 100 : sleep >= 6 ? 70 : 40;
    const exerciseScore = exercise >= 5 ? 100 : exercise >= 3 ? 80 : exercise >= 1 ? 50 : 20;
    const stressScore = (10 - stress) * 10;
    const wellnessScore = Math.round((bmiScore + sleepScore + exerciseScore + stressScore + nutrition * 10) / 5);
    const radarData = [
      { axis: 'BMI', value: bmiScore }, { axis: 'Sleep', value: sleepScore }, { axis: 'Exercise', value: exerciseScore },
      { axis: 'Stress', value: stressScore }, { axis: 'Nutrition', value: nutrition * 10 },
    ];
    setResult({ bmi, bmiLabel, wellnessScore, radarData });
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Weight (kg)', value: weight, set: setWeight, min: 30, max: 200, step: 1, format: (v: number) => `${v} kg` },
          { label: 'Height (cm)', value: height, set: setHeight, min: 140, max: 220, step: 1, format: (v: number) => `${v} cm` },
          { label: 'Sleep (hrs/night)', value: sleep, set: setSleep, min: 3, max: 12, step: 0.5, format: (v: number) => `${v} hrs` },
          { label: 'Exercise days/week', value: exercise, set: setExercise, min: 0, max: 7, step: 1, format: (v: number) => `${v} days` },
          { label: 'Stress level (1-10)', value: stress, set: setStress, min: 1, max: 10, step: 1, format: (v: number) => `${v}/10` },
          { label: 'Nutrition quality (1-10)', value: nutrition, set: setNutrition, min: 1, max: 10, step: 1, format: (v: number) => `${v}/10` },
        ].map((input, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{input.label}</span>
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{input.format(input.value)}</span>
            </div>
            <input type="range" min={input.min} max={input.max} step={input.step} value={input.value} onChange={e => input.set(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
        ))}
      </div>
      <button onClick={calculate} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: result ? '1.5rem' : 0 }}>Calculate Wellness Index</button>
      {result && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{result.bmi}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>BMI · {result.bmiLabel}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(201,168,76,0.08)', borderRadius: '16px', border: '1px solid rgba(201,168,76,0.25)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{result.wellnessScore}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Wellness Score / 100</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={result.radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
              <Radar name="Wellness" dataKey="value" stroke="var(--gold)" fill="var(--gold)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* ===== ADAPTOGEN MATCHMAKER ===== */
function AdaptogenMatchmaker() {
  const [selections, setSelections] = useState<string[]>([]);
  const [result, setResult] = useState<null | { adaptogens: { name: string; desc: string; dose: string }[] }>(null);
  const goals = ['Reduce stress & anxiety', 'Improve sleep quality', 'Boost energy & stamina', 'Enhance focus & memory', 'Balance hormones', 'Improve gut health', 'Strengthen immunity', 'Support hair & skin'];
  const adaptogenMap: Record<string, { name: string; desc: string; dose: string }> = {
    'Reduce stress & anxiety': { name: 'Ashwagandha KSM-66', desc: 'Reduces cortisol 28% in 8 weeks. Clinically proven HPA axis modulator.', dose: '300-600mg/day' },
    'Improve sleep quality': { name: 'Brahmi + Magnolia Bark', desc: 'GABA modulation + cortisol reduction = deeper sleep architecture.', dose: 'Brahmi 300mg + Magnolia 250mg' },
    'Boost energy & stamina': { name: 'Rhodiola Rosea', desc: 'Increases ATP synthesis, reduces physical fatigue, stimulating adaptogen.', dose: '200-400mg standardized 3% rosavins' },
    'Enhance focus & memory': { name: "Lion's Mane + Bacopa Monnieri", desc: 'NGF stimulation + acetylcholine enhancement = measurable cognitive gains.', dose: "Lion's Mane 500mg + Bacopa 300mg" },
    'Balance hormones': { name: 'Shatavari + Ashwagandha', desc: 'The female/male hormonal balancing adaptogenic pair in classical Ayurveda.', dose: 'Shatavari 500mg + Ashwagandha 300mg' },
    'Improve gut health': { name: 'Triphala + Berberine', desc: 'Gut microbiome restructuring + AMPK activation for metabolic gut health.', dose: 'Triphala 500mg + Berberine 500mg' },
    'Strengthen immunity': { name: 'Tulsi (Holy Basil) + Astragalus', desc: 'Immunomodulating adaptogens with antiviral and antibacterial properties.', dose: 'Tulsi 400mg + Astragalus 500mg' },
    'Support hair & skin': { name: 'Bhringraj + Collagen Botanicals', desc: 'DHT inhibition + collagen precursor support for internal beauty.', dose: 'Bhringraj 300mg + Amla 500mg' },
  };
  const toggle = (g: string) => setSelections(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  const calculate = () => {
    const adaptogens = [...new Map(selections.map(s => [adaptogenMap[s].name, adaptogenMap[s]])).values()];
    setResult({ adaptogens });
  };
  return (
    <div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '1rem' }}>Select your wellness goals (choose all that apply):</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {goals.map(g => (
          <button key={g} onClick={() => toggle(g)} style={{ padding: '0.5rem 1rem', borderRadius: '100px', border: `1px solid ${selections.includes(g) ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`, background: selections.includes(g) ? 'rgba(201,168,76,0.15)' : 'transparent', color: selections.includes(g) ? 'var(--gold)' : 'rgba(255,255,255,0.55)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>{g}</button>
        ))}
      </div>
      <button onClick={calculate} disabled={selections.length === 0} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: selections.length === 0 ? 0.5 : 1, marginBottom: result ? '1.5rem' : 0 }}>Find My Adaptogens</button>
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {result.adaptogens.map((a, i) => (
            <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>{a.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{a.desc}</div>
              <div style={{ display: 'inline-flex', background: 'rgba(201,168,76,0.12)', padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 600 }}>Dose: {a.dose}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== SLEEP DEBT CALCULATOR ===== */
function SleepDebtCalc() {
  const [days, setDays] = useState([6.5, 5.5, 7, 6, 5, 7.5, 6]);
  const [result, setResult] = useState<null | { debt: number; recs: string[] }>(null);
  const needed = 8;
  const calculate = () => {
    const debt = days.reduce((acc, d) => acc + Math.max(0, needed - d), 0);
    const recs = debt > 5 ? ['Serious sleep debt — prioritize sleep above all this week', 'Start Ashwagandha + Brahmi tonight for deeper recovery sleep', 'Avoid caffeine after 12 PM — it has a 6-hour half-life that blocks recovery sleep', 'Consider a free expert consultation to build a sleep restoration protocol']
      : debt > 2 ? ['Moderate sleep debt — aim for 30-min extra nightly this week', 'Use Botanical Sleep Drops before bed for deeper, more restorative cycles']
      : ['Minimal sleep debt — great work maintaining your sleep health!'];
    setResult({ debt: Math.round(debt * 10) / 10, recs });
  };
  const data = days.map((d, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], hours: d, target: needed }));
  return (
    <div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '1rem' }}>Log your sleep hours for the last 7 days:</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem', width: '80px', flexShrink: 0 }}>{day}</span>
            <input type="range" min={0} max={12} step={0.5} value={days[i]} onChange={e => { const d = [...days]; d[i] = Number(e.target.value); setDays(d); }} style={{ flex: 1, accentColor: 'var(--gold)' }} />
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.83rem', width: '48px', textAlign: 'right' }}>{days[i]}h</span>
          </div>
        ))}
      </div>
      <button onClick={calculate} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '12px', color: '#000', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: result ? '1.5rem' : 0 }}>Calculate Sleep Debt</button>
      {result && (
        <div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: result.debt > 5 ? 'rgba(239,68,68,0.08)' : result.debt > 2 ? 'rgba(251,191,36,0.08)' : 'rgba(74,222,128,0.08)', borderRadius: '16px', border: `1px solid ${result.debt > 5 ? 'rgba(239,68,68,0.3)' : result.debt > 2 ? 'rgba(251,191,36,0.3)' : 'rgba(74,222,128,0.3)'}`, marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-serif)', color: result.debt > 5 ? '#ef4444' : result.debt > 2 ? '#fbbf24' : '#4ade80' }}>{result.debt}h</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Weekly Sleep Debt (vs. optimal 8 hrs)</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data}>
              <Bar dataKey="hours" fill="var(--gold)" radius={4} />
              <Bar dataKey="target" fill="rgba(255,255,255,0.08)" radius={4} />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0a1a0f', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px', color: '#fff' }} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {result.recs.map((r, i) => <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', display: 'flex', gap: '0.75rem' }}><span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>{r}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== WELLNESS RITUAL BUILDER ===== */
function RitualBuilder() {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening'>('morning');
  const [selected, setSelected] = useState<string[]>([]);
  const morningOptions = ['5-min sunlight exposure (regulate cortisol awakening response)', 'Warm water with Triphala (gut activation)', 'Ashwagandha 300mg (cortisol modulation)', 'Lion\'s Mane 500mg (cognitive priming)', '10-min breathwork or pranayama', 'Cold shower (norepinephrine +300%)', 'Protein-rich breakfast (neurotransmitter precursors)', '20-min walk (zone 2 cardio, mitochondrial health)'];
  const eveningOptions = ['Digital sunset 90min before sleep', 'Botanical Sleep Drops or Brahmi 300mg', 'Magnesium Glycinate 400mg', '4-7-8 breathing (parasympathetic activation)', 'Warm Ashwagandha latte (moon milk)', 'Light stretching or yoga nidra', 'Journaling (cortisol clearance through expression)', 'Cool room temperature 65-68°F for deep sleep'];
  const options = timeOfDay === 'morning' ? morningOptions : eveningOptions;
  const toggle = (opt: string) => setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['morning', 'evening'] as const).map(t => (
          <button key={t} onClick={() => { setTimeOfDay(t); setSelected([]); }} style={{ flex: 1, padding: '0.625rem', borderRadius: '10px', border: `1px solid ${timeOfDay === t ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`, background: timeOfDay === t ? 'rgba(201,168,76,0.15)' : 'transparent', color: timeOfDay === t ? 'var(--gold)' : 'rgba(255,255,255,0.55)', cursor: 'pointer', fontWeight: timeOfDay === t ? 700 : 400, fontSize: '0.875rem', textTransform: 'capitalize' }}>{timeOfDay === t ? (t === 'morning' ? '☀️' : '🌙') : ''} {t} Ritual</button>
        ))}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: '1rem' }}>Select the practices you want to build into your {timeOfDay} ritual:</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem' }}>
        {options.map((opt, i) => (
          <button key={i} onClick={() => toggle(opt)} style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: `1px solid ${selected.includes(opt) ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`, background: selected.includes(opt) ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)', color: selected.includes(opt) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
            <span style={{ width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${selected.includes(opt) ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`, background: selected.includes(opt) ? 'var(--gold)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '0.65rem', fontWeight: 900 }}>{selected.includes(opt) ? '✓' : ''}</span>
            {opt}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <div style={{ padding: '1.5rem', background: 'rgba(201,168,76,0.06)', borderRadius: '16px', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>YOUR {timeOfDay.toUpperCase()} RITUAL ({selected.length} practices)</div>
          {selected.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{i + 1}.</span> {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const tools = [
  { id: 'sleep', icon: '🌙', name: 'Sleep Quality Calculator', desc: 'Get your personalized sleep score & optimization protocol', component: <SleepCalculator />, color: '#1a237e' },
  { id: 'stress', icon: '⚡', name: 'Stress Level Tracker', desc: '10-question assessment with cortisol & burnout analysis', component: <StressTracker />, color: '#2d1f4e' },
  { id: 'hair', icon: '✨', name: 'Hair Health Analyser', desc: 'Build a personalized botanical hair restoration routine', component: <HairAnalyser />, color: '#1f3a4e' },
  { id: 'skin', icon: '🌸', name: 'Skin Type Finder', desc: '8-question quiz for your exact skin type & botanical protocol', component: <SkinFinder />, color: '#4e2d1f' },
  { id: 'bmi', icon: '💚', name: 'BMI + Wellness Index', desc: 'Holistic wellness score with personalized radar analysis', component: <WellnessIndex />, color: '#1a3d2e' },
  { id: 'adaptogen', icon: '🌿', name: 'Adaptogen Matchmaker', desc: 'Find the exact adaptogens for your unique wellness goals', component: <AdaptogenMatchmaker />, color: '#2d4e1f' },
  { id: 'debt', icon: '😴', name: 'Sleep Debt Calculator', desc: 'Track 7-day sleep patterns and calculate your deficit', component: <SleepDebtCalc />, color: '#1f2d4e' },
  { id: 'ritual', icon: '🕯️', name: 'Wellness Ritual Builder', desc: 'Design your perfect morning and evening wellness protocol', component: <RitualBuilder />, color: '#3d1a2e' },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const active = tools.find(t => t.id === activeTool);

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3d2e 50%, #0a1a0f 100%)', padding: '5rem 0 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.5rem', background: 'rgba(201,168,76,0.08)' }}>FREE WELLNESS TOOLS</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 900 }}>
            Know Your Body. <span style={{ color: 'var(--gold)' }}>Optimize Your Life.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            8 science-backed assessment tools developed by our clinical team. Free, personalized, instant results.
          </p>
        </div>
      </section>

      {/* Tool Selector Grid */}
      <section style={{ padding: '4rem 0', background: 'var(--darkest)' }}>
        <div className="container">
          <div className="tools-grid">
            {tools.map(tool => (
              <button key={tool.id} onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)} style={{ width: '100%', padding: '2rem', background: activeTool === tool.id ? `${tool.color}bb` : `${tool.color}66`, border: `1px solid ${activeTool === tool.id ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`, borderRadius: '20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease', color: 'inherit' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                onMouseLeave={e => { if (activeTool !== tool.id) { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.12)'; } }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1rem' }}>{tool.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem', textAlign: 'left' }}>{tool.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, textAlign: 'left' }}>{tool.desc}</p>
                <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, marginTop: '1rem', textAlign: 'left' }}>{activeTool === tool.id ? 'Close Tool ↑' : 'Launch Tool →'}</div>
              </button>
            ))}
          </div>

          {/* Active Tool Panel */}
          {active && (
            <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${active.color}aa`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{active.icon}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>{active.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{active.desc}</p>
                </div>
              </div>
              <div style={{ maxWidth: '680px' }}>{active.component}</div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0a1f12, #1a3d2e)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Want a Deeper <span style={{ color: 'var(--gold)' }}>Clinical Analysis?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>Book a free 45-minute expert consultation. Our integrative medicine physicians will create a comprehensive botanical protocol tailored to your biology.</p>
          <a href="/consult" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', borderRadius: '100px', color: '#000', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book Free Consultation →</a>
        </div>
      </section>

      <style>{`
        .tools-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        @media (max-width: 1024px) { .tools-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .tools-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
