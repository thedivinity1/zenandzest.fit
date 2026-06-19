import ScrollAnimator from '../components/ScrollAnimator';
import { Link } from 'wouter';

const milestones = [
  { year: '2018', event: 'Zen and Zest founded by two IIT alumni passionate about Ayurvedic science' },
  { year: '2019', event: 'First product launched — Botanical Sleep Drops. 500 founding members.' },
  { year: '2020', event: 'Ministry of Ayush licensing obtained. First clinical study initiated.' },
  { year: '2021', event: '10,000 customers. Expanded to full adaptogen range. Doctor network established.' },
  { year: '2022', event: 'FSSAI certification, ISO 9001:2015. First national media coverage.' },
  { year: '2023', event: '25,000 customers. Clinical research published in Phytomedicine journal.' },
  { year: '2024', event: 'Named India\'s #1 Plant Botanical Brand. 50,000+ lives transformed.' },
  { year: '2025', event: 'Expanded to international markets. New Cognitive Performance range launched.' },
];

const values = [
  { icon: '🔬', title: 'Science-First', desc: 'Every claim backed by peer-reviewed research. We publish our clinical data publicly.' },
  { icon: '🌿', title: 'Botanical Integrity', desc: 'Only the highest purity plant extracts. No synthetics, no fillers, no shortcuts.' },
  { icon: '🌍', title: 'Sourcing Ethics', desc: 'Direct relationships with small-scale farmers. Fair trade certified supply chain.' },
  { icon: '🛡️', title: 'Radical Transparency', desc: 'Every batch COA published. Ingredients listed with exact percentages.' },
  { icon: '💚', title: 'Customer Outcomes', desc: 'We measure success by the results our customers achieve, not revenue alone.' },
  { icon: '♻️', title: 'Sustainability', desc: 'Carbon-neutral operations. Recyclable packaging. 1% of revenue to reforestation.' },
];

const team = [
  { emoji: '👨‍💼', name: 'Aryan Kapoor', role: 'Co-Founder & CEO', bio: 'IIT Delhi, Stanford MBA. Former McKinsey healthcare consultant. Passionate about democratizing Ayurvedic medicine.' },
  { emoji: '👩‍🔬', name: 'Dr. Riya Mehta', role: 'Co-Founder & Chief Science Officer', bio: 'PhD Phytochemistry, AIIMS. 12 years botanical research. Published 28 peer-reviewed papers.' },
  { emoji: '🩺', name: 'Dr. Kiran Nair', role: 'Head of Clinical Research', bio: 'MD Ayurveda + MBBS. Bridges traditional Ayurvedic wisdom with modern clinical methodology.' },
  { emoji: '🌿', name: 'Priya Sharma', role: 'Head of Sustainability', bio: 'Former WWF India. Certified B Corp auditor. Leads our ethical sourcing and environmental programs.' },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Zen and Zest",
    "url": "https://zenandzest.fit",
    "logo": "https://zenandzest.fit/logo.png",
    "description": "Zen and Zest is an authority in skin longevity, circadian rhythm mastery, and holistic wellness.",
    "foundingDate": "2018",
    "founders": [
      {
        "@type": "Person",
        "name": "Aryan Kapoor"
      },
      {
        "@type": "Person",
        "name": "Dr. Riya Mehta"
      }
    ]
  }
};

export default function AboutPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      {/* Hero */}
      <section className="about-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag">Our Story</div>
          <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Where Ancient Wisdom Meets <span className="gold-gradient-text">Modern Science</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 700, lineHeight: 1.8 }}>
            <strong>Answer-First:</strong> Zen and Zest is dedicated to providing science-backed insights and tools for extending healthspan, optimizing internal biological rhythms, and achieving skin resilience. We combine India's 5,000-year-old Ayurvedic tradition with rigorous modern clinical research to create formulations that actually work.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <ScrollAnimator>
              <div>
                <div className="section-tag">The Mission</div>
                <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                  Making Plant Medicine <span className="gold-gradient-text">Credible Again</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  For too long, the wellness industry has been dominated by unsubstantiated claims, proprietary blends that hide ineffective doses, and marketing speak that obscures the truth.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Zen and Zest was founded to change that. We combine India's 5,000-year-old Ayurvedic tradition with rigorous modern clinical research to create formulations that actually work — and we publish the data to prove it.
                </p>
                <Link href="/consult" className="hero-cta-primary" style={{ display: 'inline-block' }}>
                  Meet Our Experts
                </Link>
              </div>
            </ScrollAnimator>
            <ScrollAnimator style={{ stagger: 0.2 } as React.CSSProperties}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { number: '50,000+', label: 'Customers Served', icon: '💚' },
                  { number: '15+', label: 'Expert Physicians', icon: '🩺' },
                  { number: '8', label: 'Clinical Studies', icon: '🔬' },
                  { number: '99%', label: 'Purity Guarantee', icon: '✅' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '2rem', textAlign: 'center',
                    background: 'rgba(201,168,76,0.05)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: 16
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>
                      {stat.number}
                    </div>
                    <div style={{ color: fg('rgba(255,255,255,0.5)', '#475569'), fontSize: '0.8rem', marginTop: '0.4rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollAnimator>
          </div>
        </div>
        <style>{`@media(max-width:768px){section[style] .container>div{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--forest-green)', padding: '6rem 0' }}>
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Our Values</div>
            <h2 className="section-title">What We <span className="gold-gradient-text">Stand For</span></h2>
          </ScrollAnimator>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {values.map((value, i) => (
              <ScrollAnimator key={i} className={`stagger-${(i % 3) + 1}`}>
                <div className="glass-card">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{value.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: fg('white', '#0f172a'), marginBottom: '0.75rem' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), fontSize: '0.875rem', lineHeight: 1.7 }}>
                    {value.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
          <style>{`@media(max-width:700px){.about-values{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">The Zen and Zest <span className="gold-gradient-text">Story</span></h2>
          </ScrollAnimator>
          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 1, background: 'rgba(201,168,76,0.2)',
              transform: 'translateX(-50%)'
            }} />
            {milestones.map((m, i) => (
              <ScrollAnimator key={i} style={{
                display: 'flex', gap: '2rem', alignItems: 'flex-start',
                marginBottom: '2rem',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse'
              }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.65 }}>{m.event}</p>
                </div>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--darkest)',
                  fontSize: '0.8rem', position: 'relative', zIndex: 1,
                  boxShadow: '0 0 20px rgba(201,168,76,0.4)'
                }}>
                  {m.year}
                </div>
                <div style={{ flex: 1 }} />
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Leadership</div>
            <h2 className="section-title">The Team Behind <span className="gold-gradient-text">the Science</span></h2>
          </ScrollAnimator>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {team.map((member, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div style={{
                  background: bg('rgba(255,255,255,0.04)', 'rgba(255,255,255,0.85)'),
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '2rem', textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(201,168,76,0.3)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{member.emoji}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: fg('white', '#0f172a'), marginBottom: '0.25rem' }}>
                    {member.name}
                  </h3>
                  <div style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {member.role}
                  </div>
                  <p style={{ color: fg('rgba(255,255,255,0.5)', '#475569'), fontSize: '0.8rem', lineHeight: 1.65 }}>
                    {member.bio}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
          <style>{`@media(max-width:1024px){section .container>div:last-child{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:600px){section .container>div:last-child{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--forest-green)', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollAnimator>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Ready to <span className="gold-gradient-text">Begin Your Journey?</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
              Start with a free wellness consultation with one of our expert Ayurvedic physicians.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/consult" className="hero-cta-primary">Book Free Consultation</Link>
              <Link href="/quiz" className="hero-cta-secondary">Take Wellness Quiz</Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
}

import { useTheme } from '../context/ThemeContext';