import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';

/* ===== COUNT UP ===== */
function CountUp({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60; const increment = target / steps; let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(current)); }
        }, 2000 / steps);
      }
    }, { threshold: 0.3 });
    observer.observe(el); return () => observer.disconnect();
  }, [target]);
  const fmt = count >= 1000 ? `${Math.floor(count / 1000)}k` : count.toString();
  return <div ref={ref} className="stat-number">{prefix}{fmt}{suffix}</div>;
}

/* ===== SCROLL REVEAL ===== */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    observer.observe(el); return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const products = [
  { name: 'Botanical Sleep Drops', price: '₹2,999', originalPrice: '₹3,999', desc: 'Ashwagandha, Brahmi & Vijaya botanical complex for deep restorative sleep.', icon: '🌙', tag: 'Bestseller', tagColor: '#c9a84c', rating: 4.9, reviews: 2847, category: 'Sleep', ingredients: ['Ashwagandha KSM-66', 'Brahmi Extract', 'Botanical Terpene Complex', 'Melatonin Precursors'], gradient: 'linear-gradient(135deg, #0d2418 0%, #1a3d2e 100%)' },
  { name: 'Adaptogenic Stress Relief', price: '₹3,499', originalPrice: '₹4,499', desc: 'HPA axis support with Shatavari, Rhodiola & premium adaptogenic extracts.', icon: '⚡', tag: 'Top Rated', tagColor: '#8b5cf6', rating: 4.8, reviews: 1923, category: 'Stress', ingredients: ['Shatavari 40:1', 'Rhodiola Rosea', 'Eleuthero Root', 'Magnolia Bark'], gradient: 'linear-gradient(135deg, #1a0f2e 0%, #2d1f4e 100%)' },
  { name: 'Hair Vitality Elixir', price: '₹2,499', originalPrice: '₹3,299', desc: 'Bhringraj, Rosemary & DHT-blocking plant botanicals for lustrous growth.', icon: '✨', tag: 'New', tagColor: '#06b6d4', rating: 4.7, reviews: 1456, category: 'Hair', ingredients: ['Bhringraj 20:1', 'Rosemary Extract', 'Saw Palmetto', 'Biotin Complex'], gradient: 'linear-gradient(135deg, #0f1f2e 0%, #1f3a4e 100%)' },
  { name: 'Skin Radiance Oil', price: '₹2,999', originalPrice: '₹3,799', desc: 'Saffron, Turmeric & rare seed oils for luminous, youthful skin.', icon: '🌸', tag: 'Award Winning', tagColor: '#f59e0b', rating: 4.9, reviews: 3211, category: 'Skin', ingredients: ['Kashmir Saffron', 'Turmeric Curcumin', 'Rosehip Seed Oil', 'Vitamin C Complex'], gradient: 'linear-gradient(135deg, #2e1a0f 0%, #4e2d1f 100%)' },
  { name: 'Gut Balance Botanical', price: '₹1,999', originalPrice: '₹2,799', desc: 'Triphala, Berberine & gut-brain axis botanicals for digestive harmony.', icon: '🌿', tag: 'Clinically Tested', tagColor: '#10b981', rating: 4.6, reviews: 1088, category: 'Gut', ingredients: ['Triphala Complex', 'Berberine HCL', "Lion's Mane", 'Prebiotics Blend'], gradient: 'linear-gradient(135deg, #1a2e0f 0%, #2d4e1f 100%)' },
  { name: 'Cognition & Focus Blend', price: '₹3,199', originalPrice: '₹4,199', desc: 'Nootropic botanical stack for peak mental performance and clarity.', icon: '🧠', tag: 'New Launch', tagColor: '#3b82f6', rating: 4.8, reviews: 743, category: 'Brain', ingredients: ['Lion\'s Mane 8:1', 'Bacopa Monnieri', 'Ginkgo Biloba', 'Phosphatidylserine'], gradient: 'linear-gradient(135deg, #0f1a2e 0%, #1f2d4e 100%)' },
];

const comparisonFeatures = [
  { feature: 'Third-Party Lab Testing', hebe: true, competitor1: false, competitor2: true },
  { feature: 'Clinical Research Backed', hebe: true, competitor1: false, competitor2: false },
  { feature: 'Ministry of Ayush Compliant', hebe: true, competitor1: true, competitor2: false },
  { feature: 'Standardized Extracts', hebe: true, competitor1: false, competitor2: false },
  { feature: 'GMP Certified Facility', hebe: true, competitor1: false, competitor2: true },
  { feature: 'Free Expert Consultation', hebe: true, competitor1: false, competitor2: false },
  { feature: 'Wellness Tools & Tracking', hebe: true, competitor1: false, competitor2: false },
  { feature: 'No Artificial Fillers', hebe: true, competitor1: false, competitor2: true },
  { feature: 'Transparent Sourcing', hebe: true, competitor1: false, competitor2: false },
  { feature: 'Personalized Protocol', hebe: true, competitor1: false, competitor2: false },
];

const testimonials = [
  { initial: 'R', name: 'Riya M.', location: 'Mumbai', rating: 5, text: 'I struggled with insomnia for 4 years. Within 2 weeks of the Botanical Sleep Drops, I was sleeping 7 hours straight for the first time in years. No grogginess, no dependency.', product: 'Botanical Sleep Drops', bg: '#1a3d2e' },
  { initial: 'A', name: 'Arjun P.', location: 'Bangalore', rating: 5, text: 'The Adaptogenic Stress Relief actually works. As a startup founder, this is the first product that genuinely reduced my baseline anxiety without dulling my edge.', product: 'Adaptogenic Stress Relief', bg: '#2d1f4e' },
  { initial: 'S', name: 'Sneha K.', location: 'Delhi', rating: 5, text: 'Hair fall stopped in 3 weeks. My dermatologist was impressed. The Bhringraj + Rosemary formula is unlike anything I\'ve tried.', product: 'Hair Vitality Elixir', bg: '#1f3a4e' },
  { initial: 'P', name: 'Priya V.', location: 'Chennai', rating: 5, text: 'Skin literally glows now. I was skeptical at first but the Skin Radiance Oil transformed my complexion in under a month. Worth every rupee.', product: 'Skin Radiance Oil', bg: '#4e2d1f' },
  { initial: 'V', name: 'Vikram N.', location: 'Hyderabad', rating: 5, text: 'Been dealing with gut issues for years. Two months on the Gut Balance Botanical and my digestion is completely transformed. I feel lighter, clearer, energized.', product: 'Gut Balance Botanical', bg: '#2d4e1f' },
  { initial: 'N', name: 'Neha S.', location: 'Pune', rating: 5, text: 'The Focus Blend is incredible. My productivity has gone up significantly. I can work for 6 hours without brain fog. This is now non-negotiable in my routine.', product: 'Cognition & Focus Blend', bg: '#1f2d4e' },
];

const ingredients = [
  { name: 'Ashwagandha', emoji: '🌿', latin: 'Withania somnifera', origin: 'India', research: '24 clinical trials', benefits: ['Cortisol reduction up to 28%', 'Improved sleep quality & duration', 'Enhanced cognitive performance', 'Athletic endurance & muscle recovery', 'Anti-inflammatory properties', 'Thyroid hormone support'] },
  { name: 'Brahmi', emoji: '🍃', latin: 'Bacopa monnieri', origin: 'India', research: '16 clinical trials', benefits: ['Memory & learning enhancement', 'BDNF upregulation', 'Anxiolytic without sedation', 'Neuroprotection from oxidative stress', 'Acetylcholine enhancement', 'ADHD symptom support'] },
  { name: 'Bhringraj', emoji: '🌱', latin: 'Eclipta alba', origin: 'India', research: '9 clinical trials', benefits: ['DHT-5α-reductase inhibition', 'Scalp microcirculation boost', 'Hepatoprotective properties', 'Melanin production support', 'Anagen phase prolongation', 'Dandruff & scalp inflammation control'] },
  { name: 'Saffron', emoji: '🌸', latin: 'Crocus sativus', origin: 'Kashmir', research: '31 clinical trials', benefits: ['Serotonin & dopamine modulation', 'Clinically proven mood support', 'Skin luminosity & brightening', 'PMS & menstrual pain relief', 'Antioxidant — 11x more than Vitamin E', 'Eye health & macular protection'] },
  { name: 'Turmeric', emoji: '🟡', latin: 'Curcuma longa', origin: 'Kerala', research: '40+ clinical trials', benefits: ['Curcumin: master anti-inflammatory', 'NF-kB pathway inhibition', 'Joint pain & mobility support', 'Gut microbiome support', 'Cellular protection research', 'Brain fog & cognitive clarity'] },
  { name: 'Rosemary', emoji: '🌾', latin: 'Rosmarinus officinalis', origin: 'Mediterranean', research: '12 clinical trials', benefits: ['Hair growth (equals Minoxidil in trials)', 'AChE inhibition for memory', 'Powerful antioxidant Carnosic acid', 'Scalp blood flow stimulation', 'Antimicrobial & antifungal', 'Circulation & respiratory support'] },
  { name: "Lion's Mane", emoji: '🍄', latin: 'Hericium erinaceus', origin: 'Himalayas', research: '18 clinical trials', benefits: ['NGF (Nerve Growth Factor) stimulation', 'Neurogenesis & cognitive regeneration', 'Neuroprotective compounds', 'Gut microbiome diversity', 'Mood & anxiety regulation', 'Immune system modulation'] },
  { name: 'Berberine', emoji: '🔶', latin: 'Berberis aristata', origin: 'Barberry Root', research: '22 clinical trials', benefits: ['AMPK pathway activation', 'Blood sugar regulation support', 'Gut microbiome restructuring', 'PCOS symptom management', 'Cholesterol & triglyceride support', 'Anti-obesity metabolic health'] },
];

const faqItems = [
  { q: 'Are your products legal in India?', a: 'Yes, all Hebe Wellness products are fully compliant with FSSAI regulations and the Ministry of Ayush guidelines. We operate under Category A food supplement classifications and are manufactured in GMP-certified facilities.' },
  { q: 'What is the difference between plant botanicals and supplements?', a: 'Plant botanicals are whole-plant or standardized plant extracts that work in harmony with your body\'s natural systems. Unlike synthetic supplements, they contain the full spectrum of phytonutrients, terpenes, and cofactors that work synergistically.' },
  { q: 'How long before I see results?', a: 'Most customers report initial effects within 7-14 days, with optimal results typically seen at 4-8 weeks of consistent use. Botanicals work gradually and sustainably, unlike synthetic compounds that may produce immediate but short-lived effects.' },
  { q: 'Can I take multiple products together?', a: 'Yes, our formulations are designed to work synergistically. We recommend starting with one product for 2 weeks before adding others. Our expert consultation service can help you design the optimal protocol for your specific needs.' },
  { q: 'Are the products safe for long-term use?', a: 'All our formulations use adaptogenic botanicals that are traditionally used for long-term wellness support. We conduct quarterly safety reviews and third-party testing to ensure ongoing quality and safety standards.' },
  { q: 'Do you offer a money-back guarantee?', a: 'Yes, we offer a 30-day satisfaction guarantee on all products. If you are not fully satisfied with your results, contact our team for a full refund, no questions asked.' },
  { q: 'What certifications do your products have?', a: 'All products are FSSAI licensed, Ministry of Ayush compliant, manufactured in ISO 22000:2018 and GMP-certified facilities, and third-party tested by NABL-accredited laboratories for purity and potency.' },
  { q: 'Are products suitable for vegetarians and vegans?', a: 'All Hebe Wellness products are 100% plant-based and suitable for vegetarians and vegans. We do not use any animal-derived ingredients, gelatin capsules, or animal-tested ingredients.' },
  { q: 'How are your products different from pharmacy Ayurvedic brands?', a: 'We use standardized, high-potency extracts (e.g., KSM-66 Ashwagandha at 5% withanolides) rather than raw powder. Our extracts are 20-40x more concentrated than conventional Ayurvedic products, with clinical research validating each dose.' },
  { q: 'Can I consult a doctor before purchasing?', a: 'Absolutely — and we encourage it! Our free 45-minute expert consultation connects you with our network of integrative medicine physicians and Ayurvedic practitioners who can guide your protocol.' },
  { q: 'What is your shipping and delivery timeline?', a: 'We offer free express delivery across India for orders above ₹999. Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available in metro cities.' },
  { q: 'Do you have a subscription option?', a: 'Yes, our subscription plans save you up to 25% and ensure you never run out. Subscribers also get priority access to new product launches, exclusive research reports, and a dedicated wellness advisor.' },
];

const subscriptionPlans = [
  { name: 'Basic Ritual', price: '₹1,499', period: '/month', savings: 'Save 15%', color: 'var(--forest-green)', items: ['1 Core Product of Choice', 'Monthly Wellness Report', 'Email Support', 'Community Access', 'Free Shipping'], cta: 'Start Basic' },
  { name: 'Premium Protocol', price: '₹3,499', period: '/month', savings: 'Save 20%', color: 'var(--gold)', popular: true, items: ['3 Products (Customized Stack)', 'Monthly Expert Check-in', 'Priority Support', 'Wellness Tool Access', 'Free Shipping', 'Exclusive Research Reports'], cta: 'Go Premium' },
  { name: 'Elite Wellness', price: '₹6,499', period: '/month', savings: 'Save 25%', color: '#8b5cf6', items: ['Full Product Library Access', 'Weekly Expert Consultation', '24/7 Priority Support', 'Personal Wellness Dashboard', 'Free Express Shipping', 'Early Access to New Products', 'Personalized Lab Testing Guidance'], cta: 'Go Elite' },
];

const instagramPosts = [
  { emoji: '🌿', caption: 'Morning ritual starts here', likes: '2.4k', bg: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { emoji: '🌙', caption: 'Sleep like nature intended', likes: '3.1k', bg: 'linear-gradient(135deg, #1a0f2e, #0d0820)' },
  { emoji: '✨', caption: '30-day hair transformation', likes: '5.7k', bg: 'linear-gradient(135deg, #2e1f0f, #1a0f05)' },
  { emoji: '🔬', caption: 'Science meets ancient wisdom', likes: '1.9k', bg: 'linear-gradient(135deg, #0f1a2e, #050d1a)' },
  { emoji: '🌸', caption: 'Glow from within', likes: '4.2k', bg: 'linear-gradient(135deg, #2e0f1a, #1a0510)' },
  { emoji: '🧠', caption: 'Peak cognitive performance', likes: '2.8k', bg: 'linear-gradient(135deg, #0f2e2e, #051a1a)' },
];

const beforeAfterCards = [
  { icon: '🌙', name: 'Priya, 34, Delhi', concern: 'Chronic Insomnia', before: 'Averaging 4 hrs broken sleep. Brain fog. Anxiety. 3 AM wake-ups every night for 2 years.', after: '7.5 hrs deep sleep. Zero wake-ups. Energy restored. Working better than I have in years.', product: 'Botanical Sleep Drops', weeks: 6, gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { icon: '✨', name: 'Rohit, 28, Bangalore', concern: 'Severe Hair Loss', before: 'Losing 200+ hairs daily. Receding hairline. Tried everything from DHT blockers to PRP.', after: 'Down to 50-60 hairs. Visible new growth at temples. Scalp health completely transformed.', product: 'Hair Vitality Elixir', weeks: 12, gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { icon: '⚡', name: 'Ananya, 31, Mumbai', concern: 'Burnout & Anxiety', before: 'Constant overwhelm. Cortisol through the roof. Can\'t switch off. Full burnout by 3 PM daily.', after: 'Calm, focused, energized. Stress response normalized. Actually sleeping well again.', product: 'Adaptogenic Stress Relief', weeks: 8, gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f30)' },
];

const researchCards = [
  { abbr: 'ECS', title: 'Endocannabinoid System', icon: '🔬', journal: 'Journal of Neuroimmunology, 2023', summary: 'The human body\'s master regulatory system governs mood, sleep, appetite, immunity & pain perception. Our plant botanicals work in harmony with this system through multiple receptor pathways.', points: ['CB1 & CB2 receptor modulation', 'Endocannabinoid tone optimization', 'Phytocannabinoid bioavailability'], year: '2023' },
  { abbr: 'HPA', title: 'HPA Axis Regulation', icon: '🧬', journal: 'Phytomedicine International, 2024', summary: 'The Hypothalamic-Pituitary-Adrenal axis is the master stress-response circuit. Chronic activation leads to burnout, insomnia, and metabolic disruption.', points: ['Cortisol rhythm restoration', 'Adaptogen-mediated stress buffering', 'Neuroplasticity support'], year: '2024' },
  { abbr: 'GBA', title: 'Gut-Brain Axis', icon: '🦠', journal: 'Nature Reviews Neuroscience, 2024', summary: 'Your gut produces 95% of your serotonin. The gut-brain axis bidirectional communication highway governs mood, cognition, and systemic inflammation.', points: ['Microbiome diversity support', 'Serotonin precursor balance', 'Vagus nerve optimization'], year: '2024' },
  { abbr: 'NGF', title: 'Neurogenesis & BDNF', icon: '🧠', journal: 'Frontiers in Neuroscience, 2023', summary: 'Specific botanical compounds directly stimulate Nerve Growth Factor production, enabling neurogenesis — the growth of new brain cells — even in adulthood.', points: ['NGF & BDNF upregulation', 'Hippocampal neurogenesis', 'Cognitive reserve building'], year: '2023' },
];

export default function HomePage() {
  const [flippedProduct, setFlippedProduct] = useState<number | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedResearch, setExpandedResearch] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* ===== 1. HERO ===== */}
      <section className="hero-section">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ animation: 'fade-in-up 0.5s ease forwards' }}>
            <div className="hero-badge"><span>🌿</span>India #1 Plant-Botanical Authority · Trusted by 50,000+ Indians</div>
          </div>
          <div style={{ animation: 'fade-in-up 0.7s ease forwards', marginTop: '1.5rem' }}>
            <h1 className="hero-h1">
              <span style={{ color: '#ffffff', display: 'block' }}>Reclaim Your</span>
              <span style={{ display: 'block', background: 'linear-gradient(135deg, #e8c97a 0%, #c9a84c 50%, #a87e30 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Natural Balance</span>
            </h1>
          </div>
          <div style={{ animation: 'fade-in-up 0.9s ease forwards', marginTop: '1.5rem' }}>
            <p className="hero-subtitle" style={{ margin: '0 auto 2.5rem' }}>
              Scientifically formulated plant botanicals rooted in 5,000 years of Ayurvedic wisdom. Backed by 150+ clinical studies. Zero compromise on purity.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fade-in-up 1s ease forwards' }}>
            <Link href="/shop" className="hero-cta-primary">Explore Products</Link>
            <Link href="/quiz" className="hero-cta-secondary">Take Wellness Quiz</Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap', animation: 'fade-in-up 1.1s ease forwards' }}>
            {[{ icon: '🏛️', label: 'Ministry of Ayush' }, { icon: '🔬', label: 'NABL Lab Tested' }, { icon: '👨‍⚕️', label: 'Doctor Backed' }, { icon: '🛡️', label: 'GMP Certified' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" style={{ display: 'block', width: '100%' }} preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--darkest)" />
          </svg>
        </div>
      </section>

      {/* ===== 2. TRUST TICKER ===== */}
      <section style={{ background: 'var(--darkest)', padding: '2rem 0', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap', gap: '0' }}>
          {[...Array(2)].map((_, copy) => (
            <div key={copy} style={{ display: 'flex', gap: '0' }}>
              {[
                { icon: '⭐', text: '4.9/5 Average Rating' }, { icon: '👥', text: '50,000+ Customers' },
                { icon: '🔬', text: '150+ Clinical Studies' }, { icon: '🏆', text: 'India\'s #1 Botanical Brand' },
                { icon: '🌿', text: '100% Plant-Based' }, { icon: '🛡️', text: 'GMP Certified' },
                { icon: '📦', text: 'Free Shipping ₹999+' }, { icon: '🔄', text: '30-Day Guarantee' },
                { icon: '👨‍⚕️', text: 'Doctor Formulated' }, { icon: '🧪', text: 'NABL Lab Tested' },
              ].map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0 3rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                  {item.text}
                  <span style={{ color: 'rgba(201,168,76,0.4)', marginLeft: '2rem' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. STATS ===== */}
      <section style={{ background: 'linear-gradient(180deg, var(--darkest) 0%, var(--mid-dark) 100%)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }} className="stats-grid">
            {[
              { target: 50000, suffix: '+', label: 'Happy Customers', icon: '👥' },
              { target: 150, suffix: '+', label: 'Clinical Studies', icon: '🔬' },
              { target: 98, suffix: '%', label: 'Customer Satisfaction', icon: '⭐' },
              { target: 5000, suffix: ' yrs', label: 'Ayurvedic Heritage', icon: '🏛️' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <CountUp target={stat.target} suffix={stat.suffix} />
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. MISSION & PHILOSOPHY ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Our Mission</div>
              <h2 className="section-h2">Where Ancient <span style={{ color: 'var(--gold)' }}>Wisdom</span> Meets Modern Science</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '1rem auto 0', lineHeight: 1.8 }}>
                We exist to make India's extraordinary botanical heritage accessible, scientifically validated, and genuinely transformative — without compromise.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="three-col-grid">
            {[
              { icon: '🌿', title: 'Botanical Purity', desc: 'Every ingredient is sourced from its traditional origin, validated for authenticity, and standardized to therapeutic concentrations. No shortcuts, no synthetic substitutes.' },
              { icon: '🔬', title: 'Clinical Validation', desc: 'We only formulate with ingredients backed by peer-reviewed clinical evidence. Our formulations are designed by integrative medicine doctors and Ayurvedic vaidyas.' },
              { icon: '🤝', title: 'Radical Transparency', desc: 'Full ingredient disclosure, third-party lab reports published online, and sourcing documentation available on request. We have nothing to hide.' },
            ].map((pillar, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '20px', textAlign: 'center', transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pillar.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--gold)', marginBottom: '1rem' }}>{pillar.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. FEATURED PRODUCTS ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">The Collection</div>
              <h2 className="section-h2">Premium Plant <span style={{ color: 'var(--gold)' }}>Botanical</span> Formulations</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>Hover over any product to reveal what's inside. Every ingredient — explained.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {products.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{ position: 'relative', height: '380px', cursor: 'pointer', perspective: '1000px' }}
                  onMouseEnter={() => setFlippedProduct(i)}
                  onMouseLeave={() => setFlippedProduct(null)}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)', transform: flippedProduct === i ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                    {/* Front */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: p.gradient, borderRadius: '20px', padding: '2rem', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '3rem' }}>{p.icon}</span>
                          <span style={{ background: p.tagColor, color: '#000', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em' }}>{p.tag}</span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', marginBottom: '0.75rem' }}>{p.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                          <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.floor(p.rating))}</span>
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{p.rating} ({p.reviews.toLocaleString()} reviews)</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)' }}>{p.price}</span>
                          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{p.originalPrice}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }} style={{ background: 'var(--gold)', color: '#000', border: 'none', borderRadius: '100px', padding: '0.5rem 1.25rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Add to Cart</button>
                      </div>
                      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Hover to see ingredients →</div>
                    </div>
                    {/* Back */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #0a1a0f, #1a3d2e)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>ACTIVE INGREDIENTS</div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem' }}>{p.name}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {p.ingredients.map((ing, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.1)' }}>
                              <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>🌿</span>
                              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>{ing}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/shop" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#000', padding: '0.75rem', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>View Full Details</Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/shop" className="hero-cta-secondary">View All Products</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 6. QUIZ CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3d2e 50%, #0a1a0f 100%)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(26,61,46,0.5) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="two-col-grid">
            <Reveal>
              <div>
                <div className="section-badge">Personalized Protocol</div>
                <h2 className="section-h2" style={{ textAlign: 'left' }}>Find Your Perfect <span style={{ color: 'var(--gold)' }}>Botanical Ritual</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Answer 6 science-based questions about your sleep, stress, energy, and lifestyle. Our algorithm matches you to the exact botanical stack your body needs.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {['6 questions · 2 minutes', 'Personalized botanical recommendations', 'Free — no email required'].map((point, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span> {point}
                    </div>
                  ))}
                </div>
                <Link href="/quiz" className="hero-cta-primary">Start Free Quiz →</Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1rem' }}>QUIZ PREVIEW</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>What is your primary health concern?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[{ icon: '🌙', label: 'Sleep & Rest Issues', color: '#1a3d2e' }, { icon: '⚡', label: 'Stress & Anxiety', color: '#2d1f4e' }, { icon: '✨', label: 'Hair Thinning', color: '#1f3a4e' }, { icon: '🌸', label: 'Skin Concerns', color: '#4e2d1f' }].map((opt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: `${opt.color}88`, borderRadius: '12px', border: '1px solid rgba(201,168,76,0.1)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'}>
                      <span style={{ fontSize: '1.3rem' }}>{opt.icon}</span>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>{opt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 7. HOW IT WORKS ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">The Process</div>
              <h2 className="section-h2">How Hebe Wellness <span style={{ color: 'var(--gold)' }}>Works</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative' }} className="four-col-grid">
            {[
              { icon: '🔬', step: '01', title: 'Clinical Assessment', desc: 'Take our evidence-based wellness quiz to map your unique biological profile and identify root imbalances.' },
              { icon: '🌿', step: '02', title: 'Personalized Protocol', desc: 'Our Ayurvedic physicians and AI algorithm curate a botanical stack tailored to your constitution.' },
              { icon: '📦', step: '03', title: 'Premium Formulation', desc: 'Lab-tested, GMP-certified plant botanicals delivered in bioavailable formulations to your door.' },
              { icon: '📈', step: '04', title: 'Track & Optimize', desc: 'Monitor progress with our wellness tools and refine your protocol with ongoing expert guidance.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{ textAlign: 'center', padding: '2rem 1.5rem', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--forest-green), var(--darkest))', border: '2px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>{step.icon}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'rgba(201,168,76,0.15)', fontWeight: 900, position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>{step.step}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. TOOLS SECTION ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Free Wellness Tools</div>
              <h2 className="section-h2">Know Your Body. <span style={{ color: 'var(--gold)' }}>Optimize Your Life.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>8 science-backed assessment tools built by our clinical team. Free, personalized, instant results.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {[
              { icon: '🌙', name: 'Sleep Quality Calculator', desc: 'Calculate your sleep score & optimize recovery cycles', color: '#1a3d2e' },
              { icon: '⚡', name: 'Stress Score Tracker', desc: 'Measure cortisol load, burnout risk & nervous system state', color: '#2d1f4e' },
              { icon: '💆', name: 'Hair Health Analyser', desc: 'Map your hair loss pattern & build a custom botanical routine', color: '#1f3a4e' },
              { icon: '🌸', name: 'Skin Type Finder', desc: '8-question quiz to identify your skin type & botanical protocol', color: '#4e2d1f' },
              { icon: '💚', name: 'BMI + Wellness Index', desc: 'Holistic health score combining BMI, lifestyle & nutrition factors', color: '#2d4e1f' },
              { icon: '🌿', name: 'Adaptogen Matchmaker', desc: 'Find the perfect adaptogens for your unique stress profile', color: '#1f2d4e' },
            ].map((tool, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Link href="/tools" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ padding: '2rem', background: `${tool.color}cc`, borderRadius: '20px', border: '1px solid rgba(201,168,76,0.1)', transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer', height: '100%' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem' }}>{tool.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{tool.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.6 }}>{tool.desc}</p>
                    <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, marginTop: '1rem' }}>Try Free →</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><div style={{ textAlign: 'center', marginTop: '3rem' }}><Link href="/tools" className="hero-cta-secondary">Explore All 8 Tools →</Link></div></Reveal>
        </div>
      </section>

      {/* ===== 9. INGREDIENT EXPLORER ===== */}
      <section style={{ background: 'linear-gradient(180deg, var(--mid-dark) 0%, var(--darkest) 100%)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Ingredient Science</div>
              <h2 className="section-h2">The <span style={{ color: 'var(--gold)' }}>Botanical Arsenal</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>Click any ingredient to explore the science, benefits, and traditional usage. Backed by clinical research.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="four-col-grid">
            {ingredients.map((ing, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <button onClick={() => setSelectedIngredient(ing)} style={{ width: '100%', padding: '1.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', color: 'inherit' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{ing.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#fff', fontWeight: 600, marginBottom: '0.25rem' }}>{ing.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Origin: {ing.origin}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: '0.5rem', fontWeight: 600 }}>{ing.research}</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        {/* Modal */}
        {selectedIngredient && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(8px)' }} onClick={() => setSelectedIngredient(null)}>
            <div style={{ background: 'linear-gradient(135deg, #0f2a1e, #1a3d2e)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px', padding: '3rem', maxWidth: '560px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedIngredient(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedIngredient.emoji}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>{selectedIngredient.name}</h3>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>{selectedIngredient.latin}</div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>📍 {selectedIngredient.origin}</span>
                <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>🔬 {selectedIngredient.research}</span>
              </div>
              <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1rem' }}>CLINICALLY RESEARCHED BENEFITS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedIngredient.benefits.map((benefit, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.1)' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 10. SCIENCE & RESEARCH ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">The Science</div>
              <h2 className="section-h2">Research-Backed <span style={{ color: 'var(--gold)' }}>Formulations</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>We publish our sources. Every claim is backed by peer-reviewed research. Click to explore the science.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="two-col-grid">
            {researchCards.map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpandedResearch(expandedResearch === i ? null : i)}>
                  <div style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--forest-green), var(--darkest))', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>{card.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem' }}>{card.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>{card.journal}</div>
                        </div>
                        <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>{card.abbr}</span>
                      </div>
                    </div>
                    <div style={{ color: 'var(--gold)', fontSize: '1.2rem', transition: 'transform 0.3s', transform: expandedResearch === i ? 'rotate(180deg)' : 'rotate(0)' }}>▾</div>
                  </div>
                  {expandedResearch === i && (
                    <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.7, margin: '1.5rem 0 1rem' }}>{card.summary}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {card.points.map((point, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--gold)' }}>→</span> {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. COMPARISON TABLE ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Why Hebe?</div>
              <h2 className="section-h2">The <span style={{ color: 'var(--gold)' }}>Gold Standard</span> Difference</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>We invite you to compare. See exactly how we stack up against the alternatives.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>FEATURE</th>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'center', background: 'rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.2)', borderLeft: '1px solid rgba(201,168,76,0.2)', borderRight: '1px solid rgba(201,168,76,0.2)' }}>
                      <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>Hebe Wellness</div>
                      <div style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.75rem' }}>Premium Plant Botanical</div>
                    </th>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Typical Pharmacy Brand</th>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Generic Supplement</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem 1.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{row.feature}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center', background: 'rgba(201,168,76,0.05)', borderLeft: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }}>
                        <span style={{ color: '#4ade80', fontSize: '1.25rem' }}>✓</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        <span style={{ color: row.competitor1 ? '#4ade80' : '#ef4444', fontSize: '1.25rem' }}>{row.competitor1 ? '✓' : '✗'}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        <span style={{ color: row.competitor2 ? '#4ade80' : '#ef4444', fontSize: '1.25rem' }}>{row.competitor2 ? '✓' : '✗'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 12. TESTIMONIALS ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Real Results</div>
              <h2 className="section-h2">50,000+ Lives <span style={{ color: 'var(--gold)' }}>Transformed</span></h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#fbbf24', fontSize: '1.5rem' }}>{s}</span>)}
                <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '0.5rem', alignSelf: 'center' }}>4.9 average from 9,200+ reviews</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '2rem', background: `${t.bg}88`, border: '1px solid rgba(201,168,76,0.15)', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                  <div style={{ color: '#fbbf24', fontSize: '1rem' }}>{'★'.repeat(t.rating)}</div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic', flex: 1 }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: '1.1rem', flexShrink: 0 }}>{t.initial}</div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>{t.location} · {t.product}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. BEFORE & AFTER ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Transformation Stories</div>
              <h2 className="section-h2">Before & After: <span style={{ color: 'var(--gold)' }}>Real Journeys</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '1rem' }}>Results are individual and may vary. All stories are from verified customers with consent.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {beforeAfterCards.map((card, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div style={{ background: card.gradient, padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{card.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontWeight: 700 }}>{card.name}</div>
                      <div style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>{card.concern}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', background: 'rgba(201,168,76,0.2)', borderRadius: '100px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700 }}>{card.weeks} weeks</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div style={{ padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,0,0,0.6)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>BEFORE</div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>{card.before}</p>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(74,222,128,0.8)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>AFTER</div>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.6 }}>{card.after}</p>
                    </div>
                  </div>
                  <div style={{ padding: '1rem 1.5rem', background: 'rgba(201,168,76,0.05)', borderTop: '1px solid rgba(201,168,76,0.1)', fontSize: '0.8rem', color: 'var(--gold)' }}>Used: {card.product}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 14. BLOG PREVIEW ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">The Wellness Journal</div>
              <h2 className="section-h2">Science Meets <span style={{ color: 'var(--gold)' }}>Ancient Wisdom</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>Evidence-based articles from Ayurvedic physicians and botanical researchers. 50 in-depth guides.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {[
              { icon: '🔬', title: 'The Science Behind Ashwagandha: What 24 Clinical Trials Actually Show', category: 'Science', readTime: '8 min', date: 'Mar 28, 2026', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
              { icon: '🌙', title: '5 Botanical Ingredients Clinically Proven to Improve Sleep Quality', category: 'Sleep', readTime: '6 min', date: 'Mar 22, 2026', gradient: 'linear-gradient(135deg, #1a237e, #0d1459)' },
              { icon: '💆', title: 'DHT, Hair Loss & The Plant Botanicals That Actually Block It', category: 'Hair Health', readTime: '9 min', date: 'Mar 15, 2026', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
            ].map((post, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Link href="/blog" style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)', transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; }}>
                    <div style={{ height: '140px', background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>{post.icon}</div>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 }}>{post.category}</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{post.readTime} · {post.date}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#fff', lineHeight: 1.5 }}>{post.title}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><div style={{ textAlign: 'center', marginTop: '3rem' }}><Link href="/blog" className="hero-cta-secondary">Read All 50 Articles →</Link></div></Reveal>
        </div>
      </section>

      {/* ===== 15. SUBSCRIPTION PLANS ===== */}
      <section style={{ background: 'linear-gradient(180deg, var(--darkest) 0%, #060e08 100%)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Subscription Wellness</div>
              <h2 className="section-h2">Choose Your <span style={{ color: 'var(--gold)' }}>Wellness Protocol</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>Save up to 25% with a subscription. Cancel anytime. No commitment.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'stretch' }} className="three-col-grid">
            {subscriptionPlans.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '2.5rem 2rem', background: plan.popular ? `linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))` : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.popular ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '24px', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {plan.popular && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#000', padding: '0.25rem 1.25rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>⭐ MOST POPULAR</div>}
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '0.25rem' }}>{plan.name}</div>
                    <div style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '0.2rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block', marginBottom: '1.5rem' }}>{plan.savings}</div>
                    <div style={{ marginBottom: '2rem' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 900, color: plan.popular ? 'var(--gold)' : '#fff' }}>{plan.price}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>{plan.period}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                      {plan.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                          <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button style={{ marginTop: 'auto', width: '100%', padding: '0.875rem', background: plan.popular ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.2)', color: plan.popular ? '#000' : '#fff', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { if (!plan.popular) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; } }}
                    onMouseLeave={e => { if (!plan.popular) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}>
                    {plan.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 16. FREE RESOURCES ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">Free Resources</div>
              <h2 className="section-h2">Wellness <span style={{ color: 'var(--gold)' }}>Knowledge Library</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '1rem auto 0' }}>Free guides, research summaries, and reference documents curated by our clinical team.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="four-col-grid">
            {[
              { icon: '📖', title: 'Adaptogen Bible', pages: '48 pages', desc: 'Complete guide to all major adaptogens, dosing, and stacking', color: '#1a3d2e' },
              { icon: '🌙', title: 'Sleep Optimization Protocol', pages: '32 pages', desc: 'Clinical sleep hygiene with botanical support strategies', color: '#1a0f2e' },
              { icon: '💆', title: 'Stress Reset Handbook', pages: '28 pages', desc: 'HPA axis reset protocol with botanical and lifestyle tools', color: '#2d1f4e' },
              { icon: '✨', title: 'Hair & Skin Botanical Guide', pages: '36 pages', desc: 'Ingredient science for natural beauty from within', color: '#2e1a0f' },
            ].map((res, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '1.75rem', background: `${res.color}88`, border: '1px solid rgba(201,168,76,0.1)', borderRadius: '18px', transition: 'transform 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{res.icon}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>{res.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>{res.pages}</div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{res.desc}</p>
                  <Link href="/resources" style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Download Free →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 17. COMMUNITY CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0a1f12 0%, #1a3d2e 100%)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🌿</div>
            <h2 className="section-h2">Join 50,000+ Indians on Their <span style={{ color: 'var(--gold)' }}>Wellness Journey</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '1rem auto 2rem', lineHeight: 1.8 }}>
              Share your journey. Get expert support. Access exclusive research. Be part of India's most trusted plant botanical community.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/consult" className="hero-cta-primary">Join Community →</Link>
              <Link href="/about" className="hero-cta-secondary">Our Story</Link>
            </div>
            <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[{ n: '50K+', l: 'Community Members' }, { n: '200+', l: 'Research Papers' }, { n: '12', l: 'Expert Advisors' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)', fontWeight: 700 }}>{s.n}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 18. NEWSLETTER ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <div className="section-badge">Free Wellness Assessment</div>
              <h2 className="section-h2">Get Your <span style={{ color: 'var(--gold)' }}>Personalized</span> Wellness Report</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '1rem auto 2rem', lineHeight: 1.8 }}>
                Join 50,000+ subscribers. Receive clinical wellness insights, early access to new products, and a free Botanical Protocol Guide instantly.
              </p>
              {subscribed ? (
                <div style={{ padding: '2rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅</div>
                  <div style={{ color: '#4ade80', fontWeight: 600 }}>You're in! Check your inbox for your free guide.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto' }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" style={{ flex: 1, padding: '0.875rem 1.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRight: 'none', borderRadius: '100px 0 0 100px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
                  <button onClick={() => { if (email) setSubscribed(true); }} style={{ padding: '0.875rem 1.75rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '0 100px 100px 0', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Get Free Guide →</button>
                </div>
              )}
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '1rem' }}>No spam. Unsubscribe anytime. Your data is safe with us.</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 19. INSTAGRAM MOCKUP ===== */}
      <section style={{ background: 'var(--mid-dark)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-badge">@hebewellness</div>
              <h2 className="section-h2">Follow the <span style={{ color: 'var(--gold)' }}>Journey</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }} className="six-col-grid">
            {instagramPosts.map((post, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ aspectRatio: '1', borderRadius: '12px', background: post.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}>
                  <span style={{ fontSize: '2rem' }}>{post.emoji}</span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>❤️ {post.likes}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><div style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Follow @hebewellness for daily wellness science, rituals & community stories</div></Reveal>
        </div>
      </section>

      {/* ===== 20. FAQ ===== */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-badge">FAQ</div>
              <h2 className="section-h2">Everything You Need to <span style={{ color: 'var(--gold)' }}>Know</span></h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: '0.95rem' }}>{item.q}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ padding: '0 1.5rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.75, marginTop: '1rem' }}>{item.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .three-col-grid { grid-template-columns: repeat(3, 1fr); }
        .four-col-grid { grid-template-columns: repeat(4, 1fr); }
        .two-col-grid { grid-template-columns: repeat(2, 1fr); }
        .six-col-grid { grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .four-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .six-col-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .four-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .two-col-grid { grid-template-columns: 1fr !important; }
          .six-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .four-col-grid { grid-template-columns: 1fr !important; }
          .six-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
