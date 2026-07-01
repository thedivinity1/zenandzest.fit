import { Link } from 'wouter';
import { useTheme } from '../context/ThemeContext';
import ScrollAnimator from '../components/ScrollAnimator';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Activity, Compass } from 'lucide-react';

const longevityHubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zenandzest.fit/longevity-hub#webpage",
      "url": "https://zenandzest.fit/longevity-hub",
      "name": "Longevity Hub | Science-Backed Cellular Protocols",
      "description": "Access the Zen and Zest Longevity Hub. Explore 20+ clinical calculators, assessment tests, and diagnostic planners to optimize healthspan and biological age."
    },
    {
      "@type": "FAQPage",
      "@id": "https://zenandzest.fit/longevity-hub#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Longevity Hub?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Longevity Hub is a digital clinic containing 20+ assessment tools and diagnostic trackers developed by Zen and Zest to help measure and optimize sleep debt, biological cell age, circadian alignment, and botanical dosage efficacy."
          }
        }
      ]
    }
  ]
};

const categories = [
  {
    title: 'Circadian & Sleep Optimization',
    icon: <Activity size={20} color="var(--gold)" />,
    desc: 'Regulate your master pacemakers, recover faster, and eliminate systemic sleep fatigue.',
    items: [
      { href: '/tools/chronotype', label: '🐺 Circadian Chronotype Planner', desc: 'Map your biological sleep chronotype & optimal 24h schedule.' },
      { href: '/tools/sleep', label: '🌙 Sleep Quality Calculator', desc: 'Get your personalized sleep score & optimization protocol.' },
      { href: '/tools/debt', label: '😴 Sleep Debt Calculator', desc: 'Track 7-day sleep patterns and calculate your deficit.' },
      { href: '/tools/ritual', label: '🕯️ Wellness Ritual Builder', desc: 'Design your perfect morning and evening wellness protocol.' },
      { href: '/circadian-planner', label: '⏱️ SCN Planner', desc: 'Suprachiasmatic Nucleus light exposure and circadian timer.' }
    ]
  },
  {
    title: 'Epigenetics & Cellular Biomarkers',
    icon: <Heart size={20} color="var(--gold)" />,
    desc: 'Monitor biological aging hallmarks and optimize cardiorespiratory healthspan.',
    items: [
      { href: '/tools/bioage', label: '🧬 Biological Cell Age Index', desc: 'Calculate your epigenetic health rate and cell age index.' },
      { href: '/tools/vo2max', label: '🏃 VO2 Max Healthspan Estimator', desc: 'Estimate cardiovascular VO2 max, healthspan age & recovery zones.' },
      { href: '/tools/bdnf', label: '🧠 BDNF Neuroplasticity Index', desc: 'Assess your cognitive brain aging rate & neuroplasticity priming.' },
      { href: '/geroscience-map', label: '📊 Aging Hallmarks Map', desc: 'Interactive visual mapping of primary molecular hallmarks of aging.' }
    ]
  },
  {
    title: 'Botanical Science & Extraction',
    icon: <Compass size={20} color="var(--gold)" />,
    desc: 'Audit active chemical compounds, match adaptogens, and optimize target biological tissues.',
    items: [
      { href: '/tools/potency', label: '🧪 Botanical Potency Dose Auditor', desc: 'Audit active molecular yields of generic powders vs standard extracts.' },
      { href: '/tools/adaptogen', label: '🌿 Adaptogen Matchmaker', desc: 'Find the exact adaptogens for your unique wellness goals.' },
      { href: '/tools/hair', label: '✨ Hair Health Analyser', desc: 'Build a personalized botanical hair restoration routine.' },
      { href: '/tools/skin', label: '🌸 Skin Type Finder', desc: '8-question quiz for your exact skin type & botanical protocol.' },
      { href: '/tools/bmi', label: '💚 BMI + Wellness Index', desc: 'Holistic wellness score with personalized radar analysis.' },
      { href: '/dermal-crocin', label: '🍂 Saffron Dermal Matrix', desc: 'Crocin extraction yields for collagen synthesis and UV protection.' },
      { href: '/dht-block', label: '💆 Scalp DHT Block', desc: 'Scalp DHT follicular stress assessment & botanical inhibitors.' },
      { href: '/gut-restoration', label: '🦠 Gut Akkermansia', desc: 'Akkermansia muciniphila restorers & prebiotic mucilage index.' }
    ]
  },
  {
    title: 'Clinical Audits & Governance',
    icon: <ShieldCheck size={20} color="var(--gold)" />,
    desc: 'Integrative medicine standards, doctor verification, and purity COA auditing.',
    items: [
      { href: '/prakriti-test', label: '📋 Prakriti Test', desc: 'Ancient Ayurvedic mind-body constitution test.' },
      { href: '/clinical-trials', label: '🔬 NABL Lab Audits', desc: 'COA chemical assays verifying molecular purity and active payload.' },
      { href: '/medical-board', label: '⚖️ Advisory Council', desc: 'Meet our medical board of integrative physicians and clinical researchers.' },
      { href: '/sourcing-index', label: '🔎 CO2 Sourcing Index', desc: 'Directory of farm partners and supercritical CO2 botanical extractions.' },
      { href: '/rasayana-geroscience', label: '🔬 Rasayana Biology', desc: 'Deep dive into standard clinical biology of Ayurvedic anti-aging.' },
      { href: '/stacking-protocols', label: '📋 Adaptogen Stacks', desc: 'Synergistic stacking protocols matching individual stress levels.' },
      { href: '/lab-intake', label: '💉 Blood Report Uploader', desc: 'Upload your latest blood panel for expert integrative review.' },
      { href: '/clinical-cases', label: '📁 Biomarker Archive', desc: 'Anonymized archive of patient biomarker improvements and metrics.' }
    ]
  }
];

export default function LongevityHubPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;
  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '5rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(longevityHubSchema) }} />
      
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3d2e 50%, #0a1a0f 100%)', padding: '5rem 0 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(229, 197, 117, 0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.5rem', background: 'rgba(201,168,76,0.08)' }}>
            <Sparkles size={12} /> CLINICAL PORTAL
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 900 }}>
            The Longevity <span style={{ color: 'var(--gold)' }}>Hub</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.75 }}>
            <strong>Answer-First:</strong> The Longevity Hub provides access to 20+ specialized clinical planners, biological calculators, and analytical tools designed to monitor and regulate stress, optimize sleep cycles, map biological cell age, and match custom botanical adaptogens.
          </p>
        </div>
      </section>

      {/* Index list */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {categories.map((cat, idx) => (
              <ScrollAnimator key={idx}>
                <div style={{ borderBottom: '1px solid rgba(229, 197, 117, 0.15)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    {cat.icon}
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: fg('#fff', '#0f172a'), fontWeight: 800 }}>{cat.title}</h2>
                  </div>
                  <p style={{ color: fg('rgba(255,255,255,0.5)', '#475569'), fontSize: '0.9rem' }}>{cat.desc}</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {cat.items.map((item, itemIdx) => (
                    <Link key={itemIdx} href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
                      <div 
                        className="longevity-card"
                        style={{
                          height: '100%',
                          background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'),
                          border: '1px solid rgba(229, 197, 117, 0.12)',
                          borderRadius: '16px',
                          padding: '1.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.borderColor = 'rgba(229, 197, 117, 0.35)';
                          e.currentTarget.style.background = 'rgba(229, 197, 117, 0.04)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'rgba(229, 197, 117, 0.12)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        }}
                      >
                        <div>
                          <h3 style={{ fontSize: '1.05rem', color: fg('#fff', '#0f172a'), marginBottom: '0.5rem', fontWeight: 700 }}>
                            {item.label}
                          </h3>
                          <p style={{ color: fg('rgba(255,255,255,0.55)', '#475569'), fontSize: '0.82rem', lineHeight: 1.5 }}>
                            {item.desc}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, marginTop: '1.25rem' }}>
                          Open Portal <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0a1f12, #1a3d2e)', padding: '5rem 0', textAlign: 'center', borderTop: '1px solid rgba(229, 197, 117, 0.15)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginBottom: '1rem' }}>Interested in a <span style={{ color: 'var(--gold)' }}>Clinical Consultation?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem' }}>Schedule a free 45-minute consultation with our advisory council physicians. Get a customized cellular optimization stack matching your biological constitution.</p>
          <Link href="/consult" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', borderRadius: '100px', color: '#000', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Schedule Free Consultation →</Link>
        </div>
      </section>
    </div>
  );
}
