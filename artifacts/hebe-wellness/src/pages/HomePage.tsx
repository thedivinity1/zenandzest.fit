import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import ScrollAnimator from '../components/ScrollAnimator';

/* ===== ANIMATED COUNT ===== */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const formatted = count >= 1000 ? `${Math.floor(count / 1000)}k` : count.toString();
  return <div ref={ref} className="stat-number">{formatted}{suffix}</div>;
}

/* ===== PRODUCTS DATA ===== */
const products = [
  {
    name: 'Botanical Sleep Drops',
    price: 'Rs. 2,999',
    desc: 'Ashwagandha, Brahmi & Vijaya botanical complex for deep, restorative sleep.',
    gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0f2a1e 50%, #c9a84c22 100%)',
    tag: 'Bestseller',
    icon: '🌙',
  },
  {
    name: 'Adaptogenic Stress Relief',
    price: 'Rs. 3,499',
    desc: 'HPA axis support with Shatavari, Rhodiola & premium adaptogenic extracts.',
    gradient: 'linear-gradient(135deg, #2d1f4e 0%, #1a0f2e 50%, #c9a84c22 100%)',
    tag: 'Top Rated',
    icon: '⚡',
  },
  {
    name: 'Hair Vitality Elixir',
    price: 'Rs. 2,499',
    desc: 'Bhringraj, Rosemary & Keratin-boosting botanicals for lustrous hair.',
    gradient: 'linear-gradient(135deg, #1f3a4e 0%, #0f1f2e 50%, #c9a84c22 100%)',
    tag: 'New',
    icon: '✨',
  },
  {
    name: 'Skin Radiance Oil',
    price: 'Rs. 2,999',
    desc: 'Saffron, Turmeric & rare seed oils for luminous, youthful skin.',
    gradient: 'linear-gradient(135deg, #4e2d1f 0%, #2e1a0f 50%, #c9a84c22 100%)',
    tag: 'Award Winning',
    icon: '🌸',
  },
  {
    name: 'Gut Balance Botanical',
    price: 'Rs. 1,999',
    desc: 'Triphala, Berberine & gut-brain axis botanicals for digestive harmony.',
    gradient: 'linear-gradient(135deg, #2d4e1f 0%, #1a2e0f 50%, #c9a84c22 100%)',
    tag: 'Clinically Tested',
    icon: '🌿',
  },
];

/* ===== FLIP CARDS ===== */
const flipCards = [
  {
    icon: '🌙',
    problem: 'Sleep Problems',
    problemDesc: 'Lying awake at 3 AM, mind racing, unable to quiet the noise?',
    solution: 'Botanical Sleep Solution',
    solutionDesc: 'Our Vijaya botanical complex + Ashwagandha formulation naturally calms your nervous system and restores your circadian rhythm within 14 days.',
  },
  {
    icon: '⚡',
    problem: 'Chronic Stress',
    problemDesc: 'Feeling overwhelmed, burned out, cortisol through the roof?',
    solution: 'Adaptogenic Relief',
    solutionDesc: 'Our HPA-axis targeting adaptogenic blend modulates cortisol, rebuilds resilience and brings sustainable calm without drowsiness.',
  },
  {
    icon: '✨',
    problem: 'Hair Thinning',
    problemDesc: 'Watching more hair fall each day with no real solution?',
    solution: 'Root Revitalizing Complex',
    solutionDesc: 'Bhringraj, Rosemary & DHT-blocking plant botanicals reactivate dormant follicles and stimulate growth in 30 days.',
  },
];

/* ===== HOW IT WORKS ===== */
const steps = [
  { icon: '🔬', title: 'Clinical Assessment', desc: 'Take our evidence-based wellness quiz to identify your unique biological needs and imbalances.' },
  { icon: '🌿', title: 'Personalized Protocol', desc: 'Our Ayurvedic physicians curate a botanical protocol tailored to your constitution and health goals.' },
  { icon: '📦', title: 'Premium Formulation', desc: 'Lab-tested, GMP-certified plant botanicals delivered in bioavailable formulations to your door.' },
  { icon: '📈', title: 'Track & Optimize', desc: 'Monitor your progress with our wellness tools and refine your protocol with expert guidance.' },
];

/* ===== SCIENCE CARDS ===== */
const scienceCards = [
  {
    title: 'Endocannabinoid System',
    abbr: 'ECS',
    desc: 'The human body\'s master regulatory system governs mood, sleep, appetite, immunity & pain perception. Our plant botanicals work in harmony with this system.',
    points: ['CB1 & CB2 receptor support', 'Endocannabinoid tone optimization', '2-AG and AEA balance'],
  },
  {
    title: 'HPA Axis Regulation',
    abbr: 'HPA',
    desc: 'The Hypothalamic-Pituitary-Adrenal axis is the master stress-response circuit. Chronic activation leads to burnout, insomnia, and metabolic disruption.',
    points: ['Cortisol rhythm restoration', 'Adaptogen-mediated buffering', 'Neuroplasticity support'],
  },
  {
    title: 'Gut-Brain Connection',
    abbr: 'GBA',
    desc: 'Your gut produces 95% of your serotonin. The gut-brain axis is the bidirectional communication highway between your microbiome and your mind.',
    points: ['Microbiome diversity support', 'Serotonin precursor balance', 'Vagus nerve optimization'],
  },
];

/* ===== TOOLS PREVIEW ===== */
const tools = [
  { icon: '🌙', name: 'Sleep Calculator', desc: 'Optimize your sleep cycles & wake times' },
  { icon: '⚡', name: 'Stress Test', desc: 'Measure your cortisol load & burnout risk' },
  { icon: '💆', name: 'Hair Analyzer', desc: 'Identify your hair loss pattern & solutions' },
  { icon: '✨', name: 'Skin Finder', desc: 'Discover your skin type & botanical regimen' },
  { icon: '💚', name: 'Wellness Score', desc: 'Get your comprehensive wellness assessment' },
  { icon: '🌿', name: 'Adaptogen Finder', desc: 'Match adaptogens to your stress profile' },
];

/* ===== BLOG PREVIEW ===== */
const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Vijaya Botanical Complex: What Research Says',
    category: 'Science',
    categoryColor: '#1a3d2e',
    categoryBg: '#e8f5e9',
    readTime: '8 min read',
    date: 'March 28, 2026',
    excerpt: 'Emerging clinical research reveals how plant-derived terpenes and phytocannabinoids modulate the human endocannabinoid system to restore balance...',
    gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0a3020 100%)',
    icon: '🔬',
  },
  {
    id: 2,
    title: 'Ashwagandha vs. Modern Adaptogens: A Comprehensive Comparison',
    category: 'Ayurveda',
    categoryColor: '#7b4f12',
    categoryBg: '#fff3e0',
    readTime: '6 min read',
    date: 'March 22, 2026',
    excerpt: 'Ancient Rasayana herbs meet modern adaptogen science...',
    gradient: 'linear-gradient(135deg, #c9a84c 0%, #8a6520 100%)',
    icon: '🌿',
  },
  {
    id: 3,
    title: '5 Botanical Ingredients Clinically Proven to Improve Sleep Quality',
    category: 'Sleep',
    categoryColor: '#1a237e',
    categoryBg: '#e8eaf6',
    readTime: '5 min read',
    date: 'March 15, 2026',
    excerpt: 'Clinical trials confirm these 5 natural compounds outperform conventional sleep aids...',
    gradient: 'linear-gradient(135deg, #1a237e 0%, #0d1459 100%)',
    icon: '🌙',
  },
];

/* ===== TESTIMONIALS ===== */
const testimonials = [
  {
    initial: 'R',
    name: 'Riya M.',
    location: 'Mumbai',
    rating: 5,
    text: 'I\'ve struggled with insomnia for 4 years. Within 2 weeks of the Botanical Sleep Drops, I was sleeping 7 hours straight for the first time in years. No grogginess, no dependency.',
    product: 'Botanical Sleep Drops',
    bg: '#1a3d2e',
  },
  {
    initial: 'A',
    name: 'Arjun P.',
    location: 'Bangalore',
    rating: 5,
    text: 'The Adaptogenic Stress Relief actually works. I\'m a startup founder — this is the first product that\'s genuinely reduced my baseline anxiety without dulling my edge.',
    product: 'Adaptogenic Stress Relief',
    bg: '#2d1f4e',
  },
  {
    initial: 'S',
    name: 'Sneha K.',
    location: 'Delhi',
    rating: 5,
    text: 'Hair fall stopped in 3 weeks. My dermatologist was impressed. The Bhringraj + Rosemary formula is unlike anything I\'ve tried. Highly recommend!',
    product: 'Hair Vitality Elixir',
    bg: '#1f3a4e',
  },
];

/* ===== EXPERTS ===== */
const experts = [
  { emoji: '🩺', name: 'Dr. Priya Sharma', specialty: 'Integrative Medicine & Phytotherapy', years: '14 years' },
  { emoji: '👨‍🔬', name: 'Dr. Kiran Mehta', specialty: 'Clinical Pharmacognosy & Botanical Research', years: '18 years' },
  { emoji: '🌿', name: 'Vaidya Anand Joshi', specialty: 'Classical Ayurveda & Panchakarma', years: '22 years' },
  { emoji: '🧠', name: 'Dr. Meera Krishnan', specialty: 'Neuroscience & Gut-Brain Axis', years: '11 years' },
];

/* ===== INGREDIENTS ===== */
const ingredients = [
  { name: 'Ashwagandha', emoji: '🌿', origin: 'India', benefits: ['Cortisol reduction up to 28%', 'Improved sleep quality & duration', 'Enhanced cognitive performance', 'Athletic endurance & muscle recovery', 'Anti-inflammatory properties', 'Thyroid hormone optimization'] },
  { name: 'Brahmi', emoji: '🍃', origin: 'India', benefits: ['Memory & learning enhancement', 'BDNF (Brain-Derived Neurotrophic Factor) upregulation', 'Anxiolytic effects without sedation', 'Neuroprotection against oxidative stress', 'Acetylcholine enhancement', 'ADHD symptom management'] },
  { name: 'Bhringraj', emoji: '🌱', origin: 'India', benefits: ['DHT-5-alpha reductase inhibition', 'Scalp microcirculation improvement', 'Hepatoprotective properties', 'Melanin production support', 'Anagen phase prolongation', 'Dandruff & scalp inflammation control'] },
  { name: 'Saffron', emoji: '🌸', origin: 'Kashmir', benefits: ['Serotonin & dopamine modulation', 'Clinically proven anti-depressant (clinical-grade dose)', 'Skin luminosity & brightening', 'PMS & menstrual pain relief', 'Antioxidant — 11x more than Vitamin E', 'Eye health & macular protection'] },
  { name: 'Turmeric', emoji: '🟡', origin: 'Kerala', benefits: ['Curcumin: Master anti-inflammatory', 'NF-kB pathway inhibition', 'Joint pain & arthritis relief', 'Gut microbiome support', 'Cancer cell apoptosis research', 'Brain fog & cognitive clarity'] },
  { name: 'Rosemary', emoji: '🌾', origin: 'Mediterranean', benefits: ['Hair growth (equals Minoxidil in trials)', 'AChE inhibition for memory', 'Powerful antioxidant — Carnosic acid', 'Scalp blood flow stimulation', 'Antimicrobial & antifungal', 'Circulation & respiratory support'] },
  { name: "Lion's Mane", emoji: '🍄', origin: 'Himalayas', benefits: ['NGF (Nerve Growth Factor) stimulation', 'Neurogenesis & cognitive regeneration', 'Alzheimer\'s & dementia protection', 'Gut microbiome diversity', 'Mood & anxiety regulation', 'Immune system modulation'] },
  { name: 'Berberine', emoji: '🔶', origin: 'Barberry', benefits: ['AMPK pathway activation (mimics exercise)', 'Blood sugar regulation (comparable to Metformin)', 'Gut microbiome restructuring', 'PCOS symptom management', 'Cholesterol & triglyceride reduction', 'Anti-obesity & metabolic health'] },
];

export default function HomePage() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFlip = (i: number) => {
    setFlippedCards(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ animation: 'fade-in-up 0.8s ease both', animationDelay: '0.2s' }}>
            <div className="hero-badge">
              <span>🌿</span>
              India #1 Plant-Botanical Authority
            </div>
          </div>

          <div style={{ animation: 'fade-in-up 0.8s ease forwards' }}>
            <h1 className="hero-h1">
              <span style={{ color: '#ffffff', display: 'block' }}>Reclaim Your</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #e8c97a 0%, #c9a84c 50%, #a87e30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Natural Balance</span>
            </h1>
          </div>

          <div style={{ animation: 'fade-in-up 0.8s ease both', animationDelay: '0.6s' }}>
            <p className="hero-subtitle" style={{ margin: '0 auto 2.5rem' }}>
              Scientifically formulated plant botanicals rooted in 5,000 years of Ayurvedic wisdom.
              Backed by clinical research. Trusted by 50,000+ Indians.
            </p>
          </div>

          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fade-in-up 0.8s ease both', animationDelay: '0.8s'
          }}>
            <Link href="/shop" className="hero-cta-primary">Explore Products</Link>
            <Link href="/quiz" className="hero-cta-secondary">Take Wellness Quiz</Link>
          </div>

          <div style={{
            display: 'flex', gap: '2rem', justifyContent: 'center',
            marginTop: '4rem', flexWrap: 'wrap',
            animation: 'fade-in-up 0.8s ease both', animationDelay: '1s'
          }}>
            {[
              { icon: '🏛️', label: 'Ministry of Ayush' },
              { icon: '🔬', label: 'Lab Tested' },
              { icon: '👨‍⚕️', label: 'Doctor Backed' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem'
              }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="wave-container">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} style={{ display: 'flex', alignItems: 'center' }}>
              <span className="marquee-item">🌿 Ministry of Ayush Licensed</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">⚗️ Lab Tested &amp; Certified</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">👨‍⚕️ Doctor Backed</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">💚 50,000+ Lives Transformed</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">🔬 Clinically Studied</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">🛡️ FSSAI Certified</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">🌱 100% Plant-Botanical</span>
              <span className="marquee-divider">◆</span>
              <span className="marquee-item">⭐ 4.9/5 Rating</span>
              <span className="marquee-divider">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {[
              { target: 50000, suffix: '+', label: 'Lives Transformed' },
              { target: 100, suffix: '%', label: 'Natural Ingredients' },
              { target: 15, suffix: '+', label: 'Expert Physicians' },
              { target: 99, suffix: '%', label: 'Customer Satisfaction' },
            ].map((stat, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div className="stat-card">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                  <p className="stat-label">{stat.label}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>

        <style>{`@media(max-width:700px){.stats-section .container>div{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="products-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Our Formulations</div>
            <h2 className="section-title" style={{ color: 'var(--darkest)' }}>
              Plant Botanicals That <span className="gold-gradient-text">Actually Work</span>
            </h2>
            <p className="section-subtitle section-subtitle-dark" style={{ margin: '1rem auto 0' }}>
              Each product is clinically formulated, third-party tested and crafted from the world's most potent botanical extracts.
            </p>
          </ScrollAnimator>

          <div className="grid-5">
            {products.map((product, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div className="product-card">
                  <div className="product-image-area" style={{ background: product.gradient }}>
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '3rem' }}>{product.icon}</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(201,168,76,0.2)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        borderRadius: '100px',
                        color: 'var(--gold-light)',
                        fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase'
                      }}>
                        {product.tag}
                      </span>
                    </div>
                  </div>
                  <div className="product-body">
                    <div className="product-name">{product.name}</div>
                    <div className="product-desc">{product.desc}</div>
                    <div className="product-price">{product.price}</div>
                    <button className="product-add-btn">Add to Cart</button>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>

          <ScrollAnimator style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--forest-green)', fontWeight: 600, textDecoration: 'none',
              borderBottom: '2px solid var(--gold)', paddingBottom: '2px'
            }}>
              View All Products →
            </Link>
          </ScrollAnimator>
        </div>
      </section>

      {/* ===== PROBLEM-SOLUTION ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Problem → Solution</div>
            <h2 className="section-title">
              What's Really <span className="gold-gradient-text">Holding You Back?</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0' }}>
              Click each card to reveal the botanical solution hidden inside.
            </p>
          </ScrollAnimator>

          <div className="grid-3">
            {flipCards.map((card, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div
                  className={`flip-card ${flippedCards.includes(i) ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleFlip(i)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>{card.icon}</span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'white' }}>
                        {card.problem}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {card.problemDesc}
                      </p>
                      <p style={{ marginTop: '1.5rem', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Tap to reveal solution →
                      </p>
                    </div>
                    <div className="flip-card-back">
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
                        {card.solution}
                      </h3>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.65, opacity: 0.9 }}>
                        {card.solutionDesc}
                      </p>
                      <Link href="/shop" style={{
                        marginTop: '1.5rem', display: 'inline-block',
                        padding: '0.6rem 1.5rem',
                        background: 'var(--darkest)', color: 'white',
                        borderRadius: '100px', textDecoration: 'none',
                        fontSize: '0.85rem', fontWeight: 600
                      }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-tag">The Process</div>
            <h2 className="section-title">How Hebe Wellness <span className="gold-gradient-text">Works</span></h2>
          </ScrollAnimator>

          <div className="grid-4">
            {steps.map((step, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div className="step-card">
                  <div className="step-number-bg">{String(i + 1).padStart(2, '0')}</div>
                  <div className="step-content">
                    <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>{step.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCIENCE SECTION ===== */}
      <section className="science-section">
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle-dot" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            '--tx': `${(Math.random() - 0.5) * 100}px`,
            '--ty': `${(Math.random() - 0.5) * 100}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          } as React.CSSProperties} />
        ))}

        {/* Pulse rings */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="pulse-ring" style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 1.3}s`,
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">The Science</div>
            <h2 className="section-title">
              The Biology Behind <span className="gold-gradient-text">Every Formula</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
              Our formulations are built on three pillars of human biology that govern how you feel, function and heal.
            </p>
          </ScrollAnimator>

          <div className="grid-3">
            {scienceCards.map((card, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div className="glass-card">
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 64, height: 64, borderRadius: '16px',
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 900,
                    color: 'var(--gold)', marginBottom: '1.25rem', letterSpacing: '0.05em'
                  }}>
                    {card.abbr}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {card.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {card.points.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>◆</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOOLS PREVIEW ===== */}
      <section className="tools-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Wellness Tools</div>
            <h2 className="section-title" style={{ color: 'var(--darkest)' }}>
              Diagnose. Discover. <span className="gold-gradient-text">Optimize.</span>
            </h2>
            <p className="section-subtitle section-subtitle-dark" style={{ margin: '1rem auto 0' }}>
              Free science-backed tools to understand your body and build your personalized wellness protocol.
            </p>
          </ScrollAnimator>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {tools.map((tool, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <Link href="/tools" className="tool-card">
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-title">{tool.name}</div>
                  <div className="tool-desc">{tool.desc}</div>
                  <div style={{ marginTop: '1rem', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                    Start Free →
                  </div>
                </Link>
              </ScrollAnimator>
            ))}
          </div>

          <style>{`@media(max-width:700px){.tools-section .container>div:nth-child(2){grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.tools-section .container>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="blog-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Knowledge Hub</div>
            <h2 className="section-title" style={{ color: 'var(--darkest)' }}>
              The Hebe <span className="gold-gradient-text">Wellness Journal</span>
            </h2>
          </ScrollAnimator>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
            {/* Large Card */}
            <ScrollAnimator>
              <div className="blog-card-large" style={{ background: blogPosts[0].gradient, padding: '3rem' }}>
                <span className="category-pill" style={{
                  background: blogPosts[0].categoryBg,
                  color: blogPosts[0].categoryColor
                }}>
                  {blogPosts[0].category}
                </span>
                <div style={{ fontSize: '3rem', margin: '1.5rem 0 1rem' }}>{blogPosts[0].icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800,
                  color: 'white', marginBottom: '1rem', lineHeight: 1.3
                }}>
                  {blogPosts[0].title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                  {blogPosts[0].excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                    {blogPosts[0].date} · {blogPosts[0].readTime}
                  </div>
                  <Link href="/blog" style={{
                    color: 'var(--gold)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600
                  }}>
                    Read Article →
                  </Link>
                </div>
              </div>
            </ScrollAnimator>

            {/* Small cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {blogPosts.slice(1).map((post, i) => (
                <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                  <div className="blog-card-small">
                    <div style={{
                      width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                      background: post.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem'
                    }}>
                      {post.icon}
                    </div>
                    <div>
                      <span className="category-pill" style={{
                        background: post.categoryBg, color: post.categoryColor, marginBottom: '0.5rem'
                      }}>
                        {post.category}
                      </span>
                      <h4 style={{
                        fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 700,
                        color: 'var(--darkest)', lineHeight: 1.4, marginBottom: '0.5rem'
                      }}>
                        {post.title}
                      </h4>
                      <div style={{ color: '#999', fontSize: '0.75rem' }}>{post.readTime}</div>
                    </div>
                  </div>
                </ScrollAnimator>
              ))}
              <Link href="/blog" style={{
                display: 'block', textAlign: 'center', padding: '0.75rem',
                border: '2px solid var(--gold)', borderRadius: '100px',
                color: 'var(--gold-dark)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}>
                Read All Articles →
              </Link>
            </div>
          </div>

          <style>{`@media(max-width:700px){.blog-section .container>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Social Proof</div>
            <h2 className="section-title" style={{ color: 'var(--darkest)' }}>
              Real People. <span className="gold-gradient-text">Real Results.</span>
            </h2>
          </ScrollAnimator>

          {/* Auto-cycling testimonial */}
          <div style={{ maxWidth: 720, margin: '0 auto 3rem' }}>
            <div className="testimonial-card" style={{ transition: 'all 0.5s ease' }}>
              <div className="testimonial-quote-mark">"</div>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: 1.75,
                color: '#333', marginBottom: '2rem', fontStyle: 'italic'
              }}>
                {testimonials[activeTestimonial].text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="avatar-initial">{testimonials[activeTestimonial].initial}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--darkest)', fontSize: '0.95rem' }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>
                    {testimonials[activeTestimonial].location} · {testimonials[activeTestimonial].product}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '1rem' }}>
                  {'★'.repeat(testimonials[activeTestimonial].rating)}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 24 : 8,
                    height: 8, borderRadius: 4,
                    background: i === activeTestimonial ? 'var(--gold)' : 'rgba(0,0,0,0.15)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Trust row */}
          <ScrollAnimator>
            <div style={{
              display: 'flex', gap: '1.5rem', justifyContent: 'center',
              flexWrap: 'wrap', padding: '2rem',
              background: 'white', borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              {[
                { value: '4.9/5', label: 'Average Rating', icon: '⭐' },
                { value: '50,000+', label: 'Happy Customers', icon: '💚' },
                { value: '98%', label: 'Recommend Us', icon: '👍' },
                { value: '14-day', label: 'Results Guarantee', icon: '🛡️' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--forest-green)' }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ===== EXPERT NETWORK ===== */}
      <section className="expert-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Expert Network</div>
            <h2 className="section-title">
              Backed by India's <span className="gold-gradient-text">Top Physicians</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
              Our formulations are reviewed and endorsed by a network of 15+ certified Ayurvedic physicians and clinical researchers.
            </p>
          </ScrollAnimator>

          <div className="grid-experts">
            {experts.map((expert, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div className="expert-card">
                  <span className="expert-emoji">{expert.emoji}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                    {expert.name}
                  </h3>
                  <p style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {expert.specialty}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>{expert.years} experience</p>
                  <Link href="/consult" style={{
                    display: 'block', marginTop: '1.25rem',
                    padding: '0.6rem 1rem',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '100px',
                    color: 'var(--gold)', textDecoration: 'none',
                    fontSize: '0.8rem', fontWeight: 600,
                    textAlign: 'center', transition: 'all 0.2s'
                  }}>
                    Book Consultation
                  </Link>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INGREDIENT EXPLORER ===== */}
      <section className="ingredients-section">
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">Ingredient Explorer</div>
            <h2 className="section-title">
              Meet the <span className="gold-gradient-text">Power Botanicals</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
              Click any botanical to discover its clinical benefits and how it works in the body.
            </p>
          </ScrollAnimator>

          <div className="grid-ingredients">
            {ingredients.map((ing, i) => (
              <ScrollAnimator key={i} className={`stagger-${(i % 4) + 1}`}>
                <div
                  className="ingredient-card"
                  onClick={() => setSelectedIngredient(ing)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedIngredient(ing)}
                >
                  <span className="ingredient-emoji">{ing.emoji}</span>
                  <span className="ingredient-name">{ing.name}</span>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>
                    {ing.origin}
                  </span>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>

        {/* Ingredient Modal */}
        {selectedIngredient && (
          <div className="modal-overlay" onClick={() => setSelectedIngredient(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedIngredient(null)}>✕</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.15)',
                  border: '2px solid rgba(201,168,76,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', flexShrink: 0
                }}>
                  {selectedIngredient.emoji}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
                    {selectedIngredient.name}
                  </h3>
                  <p style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                    Origin: {selectedIngredient.origin}
                  </p>
                </div>
              </div>
              <div className="section-tag" style={{ marginBottom: '1rem' }}>Clinical Benefits</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedIngredient.benefits.map((benefit, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    padding: '0.75rem', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem'
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.75rem', marginTop: '0.15rem', flexShrink: 0 }}>◆</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link href="/shop" style={{
                display: 'block', marginTop: '1.5rem', textAlign: 'center',
                padding: '0.875rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                color: 'var(--darkest)', borderRadius: '12px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.95rem'
              }}
                onClick={() => setSelectedIngredient(null)}
              >
                Shop Products with {selectedIngredient.name}
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollAnimator>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800, color: 'var(--darkest)', marginBottom: '1rem'
            }}>
              Join the Wellness Revolution
            </h2>
            <p style={{ color: 'rgba(10,26,15,0.7)', fontSize: '1rem', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>
              Get science-backed wellness insights, exclusive member discounts, and early access to new formulations.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe Free</button>
            </div>
            <p style={{ marginTop: '1rem', color: 'rgba(10,26,15,0.5)', fontSize: '0.78rem' }}>
              No spam. Unsubscribe anytime. 12,000+ subscribers.
            </p>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  );
}
