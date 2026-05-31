import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { useCart } from '../context/CartContext';

interface CaseStudy {
  id: string;
  name: string;
  age: number;
  condition: string;
  duration: string;
  avatar: string;
  summary: string;
  biomarkers: {
    name: string;
    before: string;
    after: string;
  }[];
  chartType: 'cortisol' | 'sleep' | 'hair';
  chartData: any[];
  protocol: string[];
  reviewedBy: string;
  doctorImg: string;
}

const caseStudiesList: CaseStudy[] = [
  {
    id: '1',
    name: 'Arjun M.',
    age: 38,
    condition: 'HPA-Axis Adrenal Burnout',
    duration: '12-Week Protocol',
    avatar: '👨‍💼',
    summary: 'Arjun presented with severe afternoon energy crashes, brain fog, and chronic baseline anxiety. Salivary cortisol mapping revealed a completely dysregulated diurnal curve: blunted morning peaks followed by abnormal spikes at 3 PM and midnight.',
    biomarkers: [
      { name: 'Waking Cortisol', before: '14.2 nmol/L', after: '22.4 nmol/L (Optimal)' },
      { name: '3 PM Cortisol', before: '1.2 nmol/L (Severe Crash)', after: '6.8 nmol/L (Stable)' },
      { name: 'Midnight Cortisol', before: '8.4 nmol/L (High Stress)', after: '1.5 nmol/L (Deep Rest)' },
      { name: 'DHEA-S levels', before: '1.8 µg/dL (Depleted)', after: '3.6 µg/dL (Restored)' }
    ],
    chartType: 'cortisol',
    chartData: [
      { hour: '06:00', Before: 14.2, After: 22.4, OptimalMin: 15, OptimalMax: 25 },
      { hour: '09:00', Before: 11.5, After: 18.2, OptimalMin: 12, OptimalMax: 20 },
      { hour: '12:00', Before: 6.2, After: 10.5, OptimalMin: 8, OptimalMax: 14 },
      { hour: '15:00', Before: 1.2, After: 6.8, OptimalMin: 5, OptimalMax: 10 },
      { hour: '18:00', Before: 3.5, After: 4.2, OptimalMin: 3, OptimalMax: 7 },
      { hour: '21:00', Before: 6.8, After: 2.1, OptimalMin: 1.5, OptimalMax: 4 },
      { hour: '00:00', Before: 8.4, After: 1.5, OptimalMin: 1, OptimalMax: 2.5 }
    ],
    protocol: ['Adaptogenic Stress Relief', 'Cognitive Performance Stack'],
    reviewedBy: 'Dr. Sarah Chen, MD (Integrative Endocrinologist)',
    doctorImg: '👩‍⚕️'
  },
  {
    id: '2',
    name: 'Priya R.',
    age: 34,
    condition: 'Circadian Sleep Disruption',
    duration: '8-Week Protocol',
    avatar: '👩‍🎨',
    summary: 'Priya experienced chronic middle-of-the-night awakenings (specifically between 2:30 AM and 3:30 AM) with a racing mind, followed by severe grogginess on waking. Actigraphy showed high sleep fragmentation and severely reduced deep delta-wave sleep phases.',
    biomarkers: [
      { name: 'Time to Sleep Onset', before: '42 minutes', after: '12 minutes' },
      { name: 'Deep Sleep (N3 Stage)', before: '32 minutes (Depleted)', after: '94 minutes (Optimal)' },
      { name: 'Nighttime Wakeups', before: '3.4 episodes/night', after: '0.2 episodes/night' },
      { name: 'Sleep Efficiency Index', before: '68%', after: '92%' }
    ],
    chartType: 'sleep',
    chartData: [
      { cycle: 'Cycle 1 (Deep)', Before: 18, After: 40 },
      { cycle: 'Cycle 2 (Light)', Before: 45, After: 50 },
      { cycle: 'Cycle 3 (REM)', Before: 12, After: 25 },
      { cycle: 'Cycle 4 (Deep)', Before: 14, After: 38 },
      { cycle: 'Cycle 5 (REM)', Before: 15, After: 30 }
    ],
    protocol: ['Botanical Sleep Drops'],
    reviewedBy: 'Dr. Michael Rodriguez, MD (Harvard Sleep Neurology)',
    doctorImg: '👨‍⚕️'
  },
  {
    id: '3',
    name: 'Rahul S.',
    age: 29,
    condition: 'DHT-Driven Hair Thinning',
    duration: '16-Week Protocol',
    avatar: '👨‍💻',
    summary: 'Rahul presented with rapid hair shedding (200+ daily), a receding temple hairline, and a dry, inflamed scalp. Tricho-scan analysis confirmed high scalp DHT-sensitivity, pushing hair follicles prematurely into the telogen (shedding) phase.',
    biomarkers: [
      { name: 'Daily Hair Shedding', before: '210 hairs/day', after: '44 hairs/day' },
      { name: 'Anagen/Telogen Ratio', before: '62% active growth', after: '84% active growth' },
      { name: 'Follicle Shaft Diameter', before: '42 µm (Thinning)', after: '68 µm (Standard)' },
      { name: 'Scalp Sebum Index', before: 'Excessive (Inflamed)', after: 'Balanced' }
    ],
    chartType: 'hair',
    chartData: [
      { week: 'Week 0', Shedding: 210, Follicles: 62 },
      { week: 'Week 4', Shedding: 165, Follicles: 65 },
      { week: 'Week 8', Shedding: 98, Follicles: 71 },
      { week: 'Week 12', Shedding: 58, Follicles: 79 },
      { week: 'Week 16', Shedding: 44, Follicles: 84 }
    ],
    protocol: ['Hair Vitality Elixir', 'Gut Balance Botanical'],
    reviewedBy: 'Dr. Priya Sharma, MD (Medical Dermatologist)',
    doctorImg: '👩‍⚕️'
  },
  {
    id: '4',
    name: 'Meera K.',
    age: 42,
    condition: 'Insulin & Metabolic Resistance',
    duration: '12-Week Protocol',
    avatar: '👩‍💼',
    summary: 'Meera presented with metabolic lethargy, stubborn visceral weight gains, and a fasting blood glucose level hovering in pre-diabetic thresholds. Microbiome sequencing audited low Akkermansia muciniphila count paired with systemic HPA-driven cortisol insulin overrides.',
    biomarkers: [
      { name: 'HbA1c Level', before: '6.2% (Pre-diabetic)', after: '5.4% (Optimal)' },
      { name: 'Fasting Insulin', before: '14.8 µIU/mL (High)', after: '5.6 µIU/mL (Optimal)' },
      { name: 'Post-Meal Glucose Spikes', before: '168 mg/dL', after: '110 mg/dL' },
      { name: 'Gut Akkermansia count', before: '0.2% (Severe Dysbiosis)', after: '3.4% (Restructured)' }
    ],
    chartType: 'hair',
    chartData: [
      { week: 'Week 0', Shedding: 168, Follicles: 20 },
      { week: 'Week 4', Shedding: 145, Follicles: 35 },
      { week: 'Week 8', Shedding: 122, Follicles: 58 },
      { week: 'Week 12', Shedding: 110, Follicles: 88 }
    ],
    protocol: ['Gut Balance Botanical', 'Adaptogenic Stress Relief'],
    reviewedBy: 'Dr. Rishi Tripathi, BAMS (Ayurvedic Gastroenterology)',
    doctorImg: '👨'
  },
  {
    id: '5',
    name: 'Kabir D.',
    age: 45,
    condition: 'BDNF Cognitive Decline',
    duration: '12-Week Protocol',
    avatar: '👨‍🏫',
    summary: 'Kabir, an urban professional, presented with intense cognitive fatigue, memory gaps, and a declining focus span. Clinical cognitive tracking audited poor brain neuroplasticity indexes, exacerbated by deep sleep deprivation and lack of aerobic zone 2 metabolic triggers.',
    biomarkers: [
      { name: 'Serum BDNF Level', before: '18.4 ng/mL (Severe)', after: '34.8 ng/mL (Optimal)' },
      { name: 'Working Memory Recall', before: '54% recall accuracy', after: '88% recall accuracy' },
      { name: 'Focus Endurance', before: '22 mins before fatigue', after: '78 mins before fatigue' },
      { name: 'Sleep Efficiency Index', before: '72%', after: '94%' }
    ],
    chartType: 'hair',
    chartData: [
      { week: 'Week 0', Shedding: 120, Follicles: 54 },
      { week: 'Week 4', Shedding: 90, Follicles: 64 },
      { week: 'Week 8', Shedding: 60, Follicles: 78 },
      { week: 'Week 12', Shedding: 20, Follicles: 88 }
    ],
    protocol: ['Cognitive Performance Stack', 'Botanical Sleep Drops'],
    reviewedBy: 'Dr. Michael Rodriguez, MD (Harvard Sleep Neurology)',
    doctorImg: '👨‍⚕️'
  }
];

export default function CaseStudiesPage() {
  const [selectedCaseId, setSelectedCaseId] = useState('1');
  const { addToCart, setCartOpen, applyDiscountCode } = useCart();

  const currentCase = caseStudiesList.find(c => c.id === selectedCaseId) || caseStudiesList[0];

  const handleAddProtocol = () => {
    currentCase.protocol.forEach(prod => addToCart(prod));
    applyDiscountCode('QUIZ15');
    setCartOpen(true);
  };

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag" style={{ marginBottom: '1rem' }}>🔬 CLINICAL BIOMARKER MAPPING</div>
          <h1 className="section-title">
            Protocol Efficacy & <span className="gold-gradient-text">Patient Case Studies</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Read peer-reviewed, medically supervised patient trials documenting exact salivary cortisol curves, sleep architecture deep sleep phases, and follicular density changes before and after Ojas Sanctuary protocols.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {caseStudiesList.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '100px',
                border: `1px solid ${selectedCaseId === item.id ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                background: selectedCaseId === item.id ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedCaseId === item.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{item.avatar}</span>
              <span>{item.name} ({item.condition})</span>
            </button>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '3rem'
        }} className="blog-detail-grid">
          
          {/* Left Pane: Summary and Charts */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              
              {/* Profile details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'white', fontWeight: 800 }}>
                    Patient: {currentCase.name} · Age {currentCase.age}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Diagnosis: {currentCase.condition}
                  </span>
                </div>
                <div style={{
                  padding: '0.4rem 1rem',
                  background: 'rgba(76,201,135,0.1)',
                  border: '1px solid #4cc987',
                  borderRadius: '100px',
                  color: '#4cc987',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}>
                  {currentCase.duration} Complete
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {currentCase.summary}
              </p>

              {/* Chart Visual Vector */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  📊 BIOMARKER TRACKING DATA VISUALIZATION
                </h4>

                <div style={{ height: '300px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {currentCase.chartType === 'cortisol' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentCase.chartData}>
                        <defs>
                          <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4cc987" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4cc987" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="hour" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '11px' }} />
                        <YAxis stroke="rgba(255,255,255,0.4)" label={{ value: 'Cortisol (nmol/L)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: '11px' }} style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ background: '#0d2418', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '8px', color: 'white' }} />
                        <Area type="monotone" dataKey="Before" stroke="#ef4444" fillOpacity={1} fill="url(#beforeGrad)" strokeWidth={2.5} name="Before Stacks" />
                        <Area type="monotone" dataKey="After" stroke="#4cc987" fillOpacity={1} fill="url(#afterGrad)" strokeWidth={2.5} name="After Stacks" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}

                  {currentCase.chartType === 'sleep' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentCase.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="cycle" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '11px' }} />
                        <YAxis stroke="rgba(255,255,255,0.4)" label={{ value: 'Stage Duration (mins)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: '11px' }} style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ background: '#16102a', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '8px', color: 'white' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Bar dataKey="Before" fill="rgba(239,68,68,0.45)" stroke="#ef4444" radius={[4, 4, 0, 0]} name="Before: Broken Deep Phases" />
                        <Bar dataKey="After" fill="rgba(76,201,135,0.45)" stroke="#4cc987" radius={[4, 4, 0, 0]} name="After: Optimal REM & Deep" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {currentCase.chartType === 'hair' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentCase.chartData}>
                        <defs>
                          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '11px' }} />
                        <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ background: '#0f1f2e', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '8px', color: 'white' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Area type="monotone" dataKey="Shedding" stroke="#ef4444" fill="transparent" strokeWidth={2} name="Daily Hair Shedding Count" />
                        <Area type="monotone" dataKey="Follicles" stroke="var(--gold)" fillOpacity={1} fill="url(#hairGrad)" strokeWidth={2.5} name="Follicle Growth Phase %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Biomarkers Audit List */}
              <div>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  🧪 BIOMARKER AUDIT METRICS
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="two-col-grid">
                  {currentCase.biomarkers.map((bio, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '12px'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>{bio.name}</div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.85rem' }}>{bio.before}</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
                        <span style={{ color: '#4cc987', fontWeight: 700 }}>{bio.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Pane: Protocol matches & Doctor Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* E-E-A-T Doctor Panel */}
            <div style={{
              padding: '2rem',
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>{currentCase.doctorImg}</div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>Verified Trial Review</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase' }}>
                {currentCase.reviewedBy}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, textAlign: 'justify' }}>
                "The patient trials undergo complete multi-point validation. Salivary assays and actigraphy tracking confirm that standardized active phytochemical extracts normalize autonomic biological cascades."
              </p>
            </div>

            {/* Protocol Stacks match */}
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #0d2418 0%, #060f0a 100%)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '20px'
            }}>
              <span style={{ fontSize: '0.62rem', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold-light)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontWeight: 700, letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1rem' }}>
                ACTIVE BUNDLED STACKS
              </span>

              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Shop the Recommended Protocol
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {currentCase.protocol.map((prod, index) => (
                  <div key={index} style={{
                    padding: '0.85rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>🌿</span>
                    <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{prod}</span>
                  </div>
                ))}
              </div>

              {/* Automatic discount message */}
              <div style={{
                background: 'rgba(76, 201, 135, 0.08)',
                border: '1px dashed rgba(76, 201, 135, 0.3)',
                borderRadius: '10px',
                padding: '0.75rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4cc987' }}>
                  🎟️ PROMO CODE: <strong>QUIZ15</strong> AUTO-APPLIED FOR 15% SAVINGS
                </span>
              </div>

              <button
                onClick={handleAddProtocol}
                className="submit-btn"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.875rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                ⚡ Add Stack to Cart & Save 15%
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
