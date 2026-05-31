import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useCart } from '../context/CartContext';
import GeoOptimizer from '../components/GeoOptimizer';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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

/* ===== HERO SLIDES DATA ===== */
const heroSlides = [
  {
    id: 0,
    badge: '🌙 Sleep & Recovery',
    headline: 'Wake Up Feeling',
    headlineAccent: 'Truly Rested',
    subheadline: 'Every Morning',
    body: 'Millions of people wake at 3 AM — not because they\'re light sleepers, but because their stress hormones are out of balance. We help you understand why, and gently guide your body back to deep, healing sleep.',
    cta: 'Discover Sleep Wellness',
    ctaLink: '/blog/1',
    secondaryCta: 'Take the Sleep Quiz',
    secondaryLink: '/quiz',
    accent: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 100%)',
    glowColor: 'rgba(229, 197, 117, 0.12)',
    bgGradient: 'radial-gradient(ellipse at 30% 50%, rgba(30, 60, 40, 0.5) 0%, rgba(8, 15, 12, 0.95) 70%)',
    icon: '🌙',
    stat1: { num: '72%', label: 'Better Sleep Onset' },
    stat2: { num: '28%', label: 'Cortisol Reduction' },
    stat3: { num: '3x', label: 'Deeper Delta Sleep' },
    color: '#e5c575',
    accentBg: 'rgba(229, 197, 117, 0.08)'
  },
  {
    id: 1,
    badge: '✨ Skin & Radiance',
    headline: 'Your Natural Glow,',
    headlineAccent: 'Restored',
    subheadline: 'From the Inside Out',
    body: 'Dull skin, dark spots, and an uneven tone often start deep within — with stress, inflammation, and imbalanced hormones. Our holistic approach nourishes your skin from the root, so your radiance shines through naturally.',
    cta: 'Explore Skin Wellness',
    ctaLink: '/blog/4',
    secondaryCta: 'Find Your Skin Protocol',
    secondaryLink: '/quiz',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glowColor: 'rgba(245, 158, 11, 0.12)',
    bgGradient: 'radial-gradient(ellipse at 70% 40%, rgba(60, 30, 10, 0.55) 0%, rgba(8, 15, 12, 0.95) 70%)',
    icon: '✨',
    stat1: { num: '34%', label: 'Brighter Skin Tone' },
    stat2: { num: '6 Weeks', label: 'To Visible Results' },
    stat3: { num: '0', label: 'Harsh Chemicals' },
    color: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)'
  },
  {
    id: 2,
    badge: '🌿 Gut & Vitality',
    headline: 'Feel Light, Energised',
    headlineAccent: '& Vibrant',
    subheadline: 'Every Single Day',
    body: 'Your gut is your second brain — when it\'s happy, everything flows. Energy, mood, immunity, and even skin all improve when your digestion is in harmony. We make gut wellness simple, natural, and deeply effective.',
    cta: 'Start Your Gut Journey',
    ctaLink: '/blog/3',
    secondaryCta: 'Gut Health Assessment',
    secondaryLink: '/quiz',
    accent: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    glowColor: 'rgba(16, 185, 129, 0.12)',
    bgGradient: 'radial-gradient(ellipse at 50% 60%, rgba(10, 40, 25, 0.55) 0%, rgba(8, 15, 12, 0.95) 70%)',
    icon: '🌿',
    stat1: { num: '95%', label: 'Serotonin in Your Gut' },
    stat2: { num: '3 Weeks', label: 'Microbiome Shift' },
    stat3: { num: '100%', label: 'Natural Botanicals' },
    color: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.08)'
  }
];

/* ===== EXPANDED BLOG ARTICLES ===== */
const editorialArticles = [
  {
    id: 1,
    title: 'Why You Wake Up at 3 AM',
    subtitle: 'The hidden cortisol secret most doctors don\'t mention',
    category: 'Sleep & Hormones',
    excerpt: 'Waking at 2–4 AM is not bad luck — it\'s your stress hormones spiking at the wrong time. Learn how your body clock works, and the gentle plant-based remedies that help it reset.',
    author: 'Dr. Sarah Chen, MD',
    authorTitle: 'Integrative Endocrinologist',
    readTime: '7 min read',
    icon: '🌙',
    color: '#e5c575',
    bgGradient: 'linear-gradient(135deg, #0d2418 0%, #153e2a 100%)',
    borderColor: 'rgba(229, 197, 117, 0.2)'
  },
  {
    id: 2,
    title: '5 Plants That Actually Help You Sleep',
    subtitle: 'Clinically tested, deeply calming, zero dependency',
    category: 'Botanical Sleep',
    excerpt: 'Ashwagandha, Brahmi, and Passionflower have been studied in over 40 clinical trials for sleep. Here\'s exactly how they work — and which combinations create the deepest rest.',
    author: 'Dr. Michael Rodriguez, MD',
    authorTitle: 'Sleep Neurology, Harvard',
    readTime: '6 min read',
    icon: '🌿',
    color: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, #16102a 0%, #2a1f4e 100%)',
    borderColor: 'rgba(167, 139, 250, 0.2)'
  },
  {
    id: 3,
    title: 'Your Gut Is Your Second Brain',
    subtitle: 'How 95% of your mood is made in your digestive system',
    category: 'Gut-Brain Axis',
    excerpt: 'Anxiety, low mood, brain fog — the root is often in your gut, not your head. We explore the fascinating science of how what you eat shapes how you feel, think, and sleep.',
    author: 'Dr. Rishi Tripathi, BAMS',
    authorTitle: 'Ayurvedic Gastroenterology',
    readTime: '8 min read',
    icon: '🧬',
    color: '#34d399',
    bgGradient: 'linear-gradient(135deg, #0a2010 0%, #1a3d28 100%)',
    borderColor: 'rgba(52, 211, 153, 0.2)'
  },
  {
    id: 4,
    title: 'The Truth About Hair Loss at 30',
    subtitle: 'DHT, stress hormones, and how to gently reverse them',
    category: 'Hair & Scalp Health',
    excerpt: 'Losing hair in your 30s is increasingly common — and it\'s almost always hormonal. Learn how stress, nutrition gaps, and a single enzyme are driving hair fall, and how nature fixes it.',
    author: 'Dr. Ananya Krishnan, MD',
    authorTitle: 'Trichology & Dermatology',
    readTime: '9 min read',
    icon: '💫',
    color: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, #0a1a2e 0%, #1a2f4a 100%)',
    borderColor: 'rgba(56, 189, 248, 0.2)'
  },
  {
    id: 5,
    title: 'Saffron: The Ancient Golden Healer',
    subtitle: 'Modern science confirms 3,000 years of Ayurvedic wisdom',
    category: 'Botanical Medicine',
    excerpt: 'Saffron was once worth more than gold — and new clinical studies are proving why. From skin brightening to mood elevation and anti-aging, this spice is a genuine holistic powerhouse.',
    author: 'Dr. Sarah Chen, MD',
    authorTitle: 'Integrative Endocrinologist',
    readTime: '6 min read',
    icon: '🌸',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #2a1500 0%, #4a2c08 100%)',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
  {
    id: 6,
    title: 'Longevity Starts in Your 30s',
    subtitle: 'Simple daily habits that add quality decades to your life',
    category: 'Longevity & Aging',
    excerpt: 'The Blue Zones teach us that long, vibrant lives aren\'t about extreme measures — they\'re about consistent daily rhythms. Sleep, movement, community, and plants. The formula is simpler than you think.',
    author: 'Dr. Michael Rodriguez, MD',
    authorTitle: 'Longevity Research, Harvard',
    readTime: '10 min read',
    icon: '⏳',
    color: '#fb923c',
    bgGradient: 'linear-gradient(135deg, #1a0f00 0%, #3a2010 100%)',
    borderColor: 'rgba(251, 146, 60, 0.2)'
  },
  {
    id: 7,
    title: 'How Stress Ages You Faster',
    subtitle: 'The epigenetic clock and what you can do about it',
    category: 'Stress & Aging',
    excerpt: 'Chronic stress doesn\'t just feel awful — it literally accelerates aging at a cellular level. New epigenetic science shows how adaptogens, meditation, and sleep can turn back your biological clock.',
    author: 'Dr. Rishi Tripathi, BAMS',
    authorTitle: 'Phytochemistry & Longevity',
    readTime: '8 min read',
    icon: '🧠',
    color: '#c084fc',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1845 100%)',
    borderColor: 'rgba(192, 132, 252, 0.2)'
  },
  {
    id: 8,
    title: 'Ashwagandha: The Ultimate Adaptogen',
    subtitle: 'Why 5,000 years of Ayurveda and modern science agree',
    category: 'Adaptogens',
    excerpt: 'From Harvard Medical School studies to ancient Charaka Samhita, Ashwagandha stands alone. It lowers cortisol, boosts testosterone, improves sleep quality, and builds lasting mental resilience.',
    author: 'Dr. Ananya Krishnan, MD',
    authorTitle: 'Integrative Medicine, AIIMS',
    readTime: '7 min read',
    icon: '🌱',
    color: '#4ade80',
    bgGradient: 'linear-gradient(135deg, #051a0e 0%, #0d3321 100%)',
    borderColor: 'rgba(74, 222, 128, 0.2)'
  },
  {
    id: 9,
    title: 'The Hormone-Skin Connection',
    subtitle: 'Why your cortisol is ruining your complexion',
    category: 'Hormonal Skin',
    excerpt: 'Breakouts, dullness, premature wrinkles — they\'re all hormonal. When cortisol is chronically high it breaks down collagen, triggers inflammation, and disrupts your skin\'s microbiome. Here\'s the fix.',
    author: 'Dr. Sarah Chen, MD',
    authorTitle: 'Integrative Endocrinologist',
    readTime: '6 min read',
    icon: '💆',
    color: '#f472b6',
    bgGradient: 'linear-gradient(135deg, #1f0a18 0%, #3d1530 100%)',
    borderColor: 'rgba(244, 114, 182, 0.2)'
  }
];

/* ===== PRODUCTS DATA ===== */
const clinicalProducts = [
  { 
    name: 'Botanical Sleep Drops', 
    price: '₹2,999', 
    originalPrice: '₹3,999', 
    desc: 'A calming blend of Ashwagandha, Brahmi and Passionflower to help you fall asleep naturally and wake up refreshed.', 
    icon: '🌙', 
    tag: 'Bestseller', 
    tagColor: '#c9a84c', 
    rating: 4.9, 
    reviews: 2847, 
    extracts: 'KSM-66 Ashwagandha, 40% Bacosides, Passionflower',
    gradient: 'linear-gradient(135deg, #0d2418 0%, #1a3d2e 100%)' 
  },
  { 
    name: 'Adaptogenic Stress Relief', 
    price: '₹3,499', 
    originalPrice: '₹4,499', 
    desc: 'Your daily stress buffer — a blend of Shatavari, Rhodiola and Eleuthero that keeps your nervous system calm and resilient.', 
    icon: '⚡', 
    tag: 'Adrenal Support', 
    tagColor: '#8b5cf6', 
    rating: 4.8, 
    reviews: 1923, 
    extracts: 'Rhodiola 3% Rosavins, Shatavari 20:1, Eleuthero',
    gradient: 'linear-gradient(135deg, #1a0f2e 0%, #2d1f4e 100%)' 
  },
  { 
    name: 'Hair Vitality Elixir', 
    price: '₹2,499', 
    originalPrice: '₹3,299', 
    desc: 'Nourishes your scalp and strengthens hair follicles from within. Clinically shown to match the results of leading hair treatments.', 
    icon: '✨', 
    tag: 'Follicle Booster', 
    tagColor: '#06b6d4', 
    rating: 4.7, 
    reviews: 1456, 
    extracts: 'Bhringraj 20:1, Rosemary 5% Carnosic Acid',
    gradient: 'linear-gradient(135deg, #0f1f2e 0%, #1f3a4e 100%)' 
  },
  { 
    name: 'Skin Radiance Oil', 
    price: '₹2,999', 
    originalPrice: '₹3,799', 
    desc: 'Liquid gold for your skin. Kashmiri Saffron and rosehip oil work together to brighten, hydrate, and gently fade dark spots.', 
    icon: '🌸', 
    tag: 'Glow Formula', 
    tagColor: '#f59e0b', 
    rating: 4.9, 
    reviews: 3211, 
    extracts: 'Nano-Crocin Saffron, Cold-Press Rosehip',
    gradient: 'linear-gradient(135deg, #2e1a0f 0%, #4e2d1f 100%)' 
  },
  { 
    name: 'Gut Balance Botanical', 
    price: '₹1,999', 
    originalPrice: '₹2,799', 
    desc: 'Gently rebalances your gut microbiome with time-tested Triphala and Berberine. Feel lighter, more energised, and clearer in 3 weeks.', 
    icon: '🌿', 
    tag: 'Microbiome Reset', 
    tagColor: '#10b981', 
    rating: 4.6, 
    reviews: 1088, 
    extracts: 'Triphala 40% Tannins, Berberine 97% HCL',
    gradient: 'linear-gradient(135deg, #1a2e0f 0%, #2d4e1f 100%)' 
  },
  { 
    name: 'Cognitive Performance Stack', 
    price: '₹3,999', 
    originalPrice: '₹4,999', 
    desc: 'Mental clarity, focus and memory support — combining Lion\'s Mane mushroom and Bacopa for sharp, sustained brain performance.', 
    icon: '🧠', 
    tag: 'Mind Enhancer', 
    tagColor: '#3b82f6', 
    rating: 4.8, 
    reviews: 743, 
    extracts: "Lion's Mane 30% Polysaccharides, Bacopa 45% Bacosides",
    gradient: 'linear-gradient(135deg, #0f1a2e 0%, #1f2d4e 100%)' 
  }
];

/* ===== WELLNESS CONCERNS ===== */
const wellnessConcerns = {
  sleep: {
    title: 'Waking Up in the Middle of the Night',
    pathway: 'When stress hormones are too high at bedtime, your body can\'t stay asleep. This is incredibly common — and completely reversible. Your sleep hormones and stress hormones need to be in balance, and the right botanicals make this happen naturally.',
    study: 'A 2021 study confirmed that standardised Ashwagandha improved sleep quality by 72% and reduced nighttime waking significantly in adults with sleep difficulties.',
    stack: 'Botanical Sleep Drops — Ashwagandha & Brahmi Blend',
    product: 'Botanical Sleep Drops'
  },
  burnout: {
    title: 'Exhausted No Matter How Much You Sleep',
    pathway: 'Chronic stress drains your adrenal glands. When they\'re depleted, you feel tired all the time — even after a full night\'s rest. Adaptogenic plants work like a reset button for your stress response system.',
    study: 'A 2023 study found that Rhodiola Rosea reduced burnout symptoms by 39% and cortisol levels by 28% in high-stress professionals over 12 weeks.',
    stack: 'Adaptogenic Stress Relief — Rhodiola & Shatavari Blend',
    product: 'Adaptogenic Stress Relief'
  },
  hair: {
    title: 'Noticeable Hair Thinning & Shedding',
    pathway: 'Hair loss in your 30s and 40s is almost always hormonal. A stress-triggered hormone called DHT shrinks hair follicles over time. The right botanicals block this process and stimulate natural regrowth from the root.',
    study: 'A 2022 clinical trial showed that standardised Rosemary extract matched the hair regrowth effectiveness of 2% Minoxidil at 6 months, without the side effects.',
    stack: 'Hair Vitality Elixir — Bhringraj & Rosemary Blend',
    product: 'Hair Vitality Elixir'
  },
  skin: {
    title: 'Dull Skin, Dark Spots & Uneven Tone',
    pathway: 'UV damage and high cortisol trigger excess pigmentation and break down the skin\'s natural collagen. From the inside out, the right antioxidants calm inflammation, brighten tone, and restore your skin\'s natural barrier.',
    study: 'A 2024 dermal study confirmed that Kashmiri Saffron\'s active compound (Crocin) reduced skin pigmentation by 34% and improved elasticity in 8 weeks.',
    stack: 'Skin Radiance Oil — Saffron Crocin & Rosehip Blend',
    product: 'Skin Radiance Oil'
  },
  gut: {
    title: 'Bloating, Low Energy & Poor Digestion',
    pathway: 'An imbalanced gut microbiome affects everything — energy, mood, immunity, and even skin. When your gut is healthy, 95% of your serotonin (your feel-good hormone) is made there. Getting the balance right changes everything.',
    study: 'Nature Reviews (2024) confirmed that Triphala and Berberine reshaped the gut microbiome within 21 days, significantly increasing beneficial bacterial populations.',
    stack: 'Gut Balance Botanical — Triphala & Berberine Blend',
    product: 'Gut Balance Botanical'
  }
};

/* ===== ADVISORY BOARD ===== */
const medicalBoard = [
  {
    name: 'Dr. Sarah Chen, MD',
    title: 'Chief Medical Advisor',
    specialty: 'Integrative Endocrinology',
    credentials: 'Stanford Medicine · Fellowship in Metabolic Medicine, UCLA',
    img: '👩‍⚕️',
    bio: 'Dr. Chen has dedicated 15 years to bridging Eastern herbal medicine and Western clinical science, focusing on hormonal balance, circadian health, and evidence-based botanical therapeutics.'
  },
  {
    name: 'Dr. Michael Rodriguez, MD',
    title: 'Neuroscience & Sleep Director',
    specialty: 'Sleep Neurology, Harvard',
    credentials: 'Board Certified in Cognitive & Circadian Biology',
    img: '👨‍⚕️',
    bio: 'Author of 14 peer-reviewed sleep trials, Dr. Rodriguez specialises in helping people achieve deep, restorative sleep without dependency — using the power of clinically validated botanicals.'
  },
  {
    name: 'Dr. Rishi Tripathi, BAMS',
    title: 'Botanical Pharmacognosy Lead',
    specialty: 'Ayurvedic Medicine & Phytochemistry',
    credentials: 'PhD Phytochemistry · Former Advisor, Ministry of Ayush',
    img: '👨‍⚕️',
    bio: 'With 22 years in Ayurvedic research, Dr. Tripathi ensures every botanical in our formulas meets the highest standards of purity, standardisation, and clinical effectiveness.'
  }
];

const cortisolBiomarkerData = [
  { hour: '06:00', Before: 14.2, After: 22.4 },
  { hour: '09:00', Before: 11.5, After: 18.2 },
  { hour: '12:00', Before: 6.2, After: 10.5 },
  { hour: '15:00', Before: 1.2, After: 6.8 },
  { hour: '18:00', Before: 3.5, After: 4.2 },
  { hour: '21:00', Before: 6.8, After: 2.1 },
  { hour: '00:00', Before: 8.4, After: 1.5 }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideAnimating, setSlideAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sleep' | 'neuro' | 'gut'>('all');
  const [flippedProduct, setFlippedProduct] = useState<number | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<'sleep' | 'burnout' | 'hair' | 'skin' | 'gut'>('sleep');
  const { addToCart, setCartOpen } = useCart();
  
  // Circadian Simulator
  const [sunExposure, setSunExposure] = useState(15);
  const [screenTime, setScreenTime] = useState(2);
  const [caffeineCutoff, setCaffeineCutoff] = useState(13);

  const concern = wellnessConcerns[selectedConcern];
  const slide = heroSlides[currentSlide];

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        setSlideAnimating(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setSlideAnimating(true);
    setTimeout(() => {
      setCurrentSlide(idx);
      setSlideAnimating(false);
    }, 300);
  };

  const dynamicCircadianData = [
    { hour: '06:00', Cortisol: Math.round((14 + (sunExposure * 0.25)) * 10) / 10, Melatonin: 0.5 },
    { hour: '09:00', Cortisol: Math.round((11 + (sunExposure * 0.15)) * 10) / 10, Melatonin: 0.1 },
    { hour: '12:00', Cortisol: 7.5, Melatonin: 0.0 },
    { hour: '15:00', Cortisol: Math.round((5 + (caffeineCutoff > 14 ? 3.5 : 0)) * 10) / 10, Melatonin: 0.0 },
    { hour: '18:00', Cortisol: Math.round((3.5 + (caffeineCutoff > 14 ? 2.5 : 0)) * 10) / 10, Melatonin: 1.5 },
    { hour: '21:00', Cortisol: Math.round((2 + (screenTime * 1.2)) * 10) / 10, Melatonin: Math.round(Math.max(0.5, (10 + (sunExposure * 0.1) - (screenTime * 2.2))) * 10) / 10 },
    { hour: '00:00', Cortisol: Math.round((1.5 + (screenTime * 1.8)) * 10) / 10, Melatonin: Math.round(Math.max(1, (24 + (sunExposure * 0.2) - (screenTime * 5.5) - (caffeineCutoff > 15 ? 4 : 0))) * 10) / 10 },
    { hour: '03:00', Cortisol: Math.round((3 + (screenTime * 2.5)) * 10) / 10, Melatonin: Math.round(Math.max(1.5, (18 - (screenTime * 4))) * 10) / 10 },
  ];

  return (
    <div style={{ background: 'var(--section-void)', color: 'white', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ===== ANNOUNCEMENT TICKER ===== */}
      <div style={{
        borderBottom: '1px solid rgba(229, 197, 117, 0.12)',
        background: 'rgba(10, 26, 15, 0.97)',
        padding: '0.65rem 0',
        textAlign: 'center',
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        color: 'var(--gold-light)',
        fontWeight: 700,
        textTransform: 'uppercase'
      }}>
        🌿 India's Premier Holistic Wellness Sanctuary &nbsp;·&nbsp; 150+ Clinical Studies &nbsp;·&nbsp; Doctor-Verified Formulas &nbsp;·&nbsp; 100% Natural Botanicals
      </div>

      {/* ========================================================== */}
      {/* ===== HERO: PREMIUM ANIMATED GLASSMORPHIC CAROUSEL ===== */}
      {/* ========================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: slide.bgGradient,
        transition: 'background 0.8s ease'
      }}>
        {/* Ambient background glow orbs */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: '20%', left: '10%',
            width: 500, height: 500,
            borderRadius: '50%',
            background: slide.glowColor,
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite',
            transition: 'background 1s ease'
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', right: '15%',
            width: 400, height: 400,
            borderRadius: '50%',
            background: `rgba(229,197,117,0.06)`,
            filter: 'blur(60px)',
            animation: 'float2 10s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute', top: '60%', left: '50%',
            width: 300, height: 300,
            borderRadius: '50%',
            background: `rgba(16,185,129,0.04)`,
            filter: 'blur(50px)',
            animation: 'float3 12s ease-in-out infinite'
          }} />
        </div>

        {/* Glassmorphic decorative card top-right */}
        <div style={{
          position: 'absolute', top: '12%', right: '5%',
          width: 220,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '1.25rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          zIndex: 3
        }} className="hero-side-card">
          {heroSlides.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 12,
              background: i === currentSlide ? slide.accentBg : 'transparent',
              border: i === currentSlide ? `1px solid ${slide.color}33` : '1px solid transparent',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }} onClick={() => goToSlide(i)}>
              <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: '0.68rem', color: i === currentSlide ? slide.color : 'rgba(255,255,255,0.4)', fontWeight: 700, transition: 'color 0.3s' }}>
                  {s.badge}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Slide Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '6rem 1.5rem' }}>
          <div style={{
            maxWidth: 850,
            opacity: slideAnimating ? 0 : 1,
            transform: slideAnimating ? 'translateY(30px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}>

            {/* Slide badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              background: slide.accentBg,
              border: `1px solid ${slide.color}44`,
              borderRadius: 100,
              color: slide.color,
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: '2rem',
              transition: 'all 0.5s ease'
            }}>
              {slide.badge}
            </div>

            {/* Main headline */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              lineHeight: 1.1,
              fontWeight: 900,
              color: 'white',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              {slide.headline}
              <br />
              <span style={{
                background: slide.accent,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 0.5s ease'
              }}>
                {slide.headlineAccent}
              </span>
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2rem'
            }}>
              {slide.subheadline}
            </h2>

            {/* Body copy */}
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.8,
              maxWidth: 620,
              marginBottom: '2.5rem'
            }}>
              {slide.body}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link href={slide.ctaLink} style={{
                background: slide.accent,
                color: '#0a1a0f',
                padding: '0.95rem 2.25rem',
                borderRadius: 100,
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '0.95rem',
                boxShadow: `0 4px 25px ${slide.color}35`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-block'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 35px ${slide.color}50`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 25px ${slide.color}35`; }}
              >
                {slide.cta} →
              </Link>
              <Link href={slide.secondaryLink} style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                padding: '0.95rem 2.25rem',
                borderRadius: 100,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {slide.secondaryCta}
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[slide.stat1, slide.stat2, slide.stat3].map((stat, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-serif)',
                    color: slide.color,
                    transition: 'color 0.5s ease'
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '0.75rem', zIndex: 4
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === currentSlide ? 40 : 8,
                height: 8,
                borderRadius: 100,
                background: i === currentSlide ? slide.color : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                padding: 0
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'rgba(255,255,255,0.06)'
        }}>
          <div style={{
            height: '100%',
            background: slide.color,
            animation: 'progressBar 6s linear infinite',
            transition: 'background 0.5s ease'
          }} />
        </div>
      </section>

      {/* ===== TRUST & METRICS BAR ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #06081a 0%, #0a0c1f 50%, #060814 100%)',
        borderTop: '1px solid rgba(99,102,241,0.18)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { num: '1,50,000+', label: 'Lives Transformed', icon: '💚', color: '#10b981' },
              { num: '150+', label: 'Clinical Research Studies', icon: '🔬', color: '#e5c575' },
              { num: '4.8★', label: 'Average Customer Rating', icon: '⭐', color: '#f59e0b' },
              { num: '100%', label: 'Natural Botanicals Only', icon: '🌿', color: '#34d399' }
            ].map((metric, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: '0.5rem' }}>
                  <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>{metric.icon}</span>
                  <strong style={{
                    fontSize: '1.8rem',
                    fontFamily: 'var(--font-serif)',
                    color: metric.color,
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}>{metric.num}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP 1 — QUIZ INVITE ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0e0a02 0%, #1c1304 60%, #0a0800 100%)',
        borderTop: '1px solid rgba(245,158,11,0.12)',
        borderBottom: '1px solid rgba(245,158,11,0.12)',
        padding: '3.5rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>🎯 FREE 2-MINUTE ASSESSMENT</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Not Sure Where to Start?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 480 }}>
                Take our personalised wellness quiz. In 2 minutes, you'll know exactly which herbs and protocols your body needs most right now.
              </p>
            </div>
            <Link href="/quiz" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0a0600',
              padding: '1rem 2.5rem',
              borderRadius: 100,
              fontWeight: 800,
              textDecoration: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 25px rgba(245,158,11,0.3)',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              flexShrink: 0,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 35px rgba(245,158,11,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 25px rgba(245,158,11,0.3)'; }}
            >
              Take the Free Quiz →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WELLNESS CONCERN EXPLORER ===== */}
      <section style={{ background: 'linear-gradient(180deg, #040609 0%, #060814 40%, #080a18 100%)', padding: '6rem 0 4rem 0', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-tag" style={{ marginBottom: '1rem' }}>🔍 WHAT BRINGS YOU HERE TODAY?</div>
              <h2 className="section-title">
                Tell Us What You're <span className="gold-gradient-text">Struggling With</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Choose a concern below. We'll show you exactly what's happening inside your body — and how nature can help.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {(Object.keys(wellnessConcerns) as Array<keyof typeof wellnessConcerns>).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedConcern(key)}
                  style={{
                    padding: '0.7rem 1.4rem',
                    borderRadius: 100,
                    border: `1px solid ${selectedConcern === key ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                    background: selectedConcern === key ? 'rgba(229,197,117,0.12)' : 'rgba(255,255,255,0.03)',
                    color: selectedConcern === key ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {key === 'sleep' ? '🌙 Sleep Issues' : key === 'burnout' ? '⚡ Burnout & Fatigue' : key === 'hair' ? '✨ Hair Loss' : key === 'skin' ? '🌸 Dull Skin' : '🌿 Gut Problems'}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '3rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(229,197,117,0.15)',
              borderRadius: 24,
              padding: '2.5rem',
              backdropFilter: 'blur(10px)'
            }} className="editorial-lead-card">
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                  WHAT'S REALLY HAPPENING
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                  {concern.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.93rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {concern.pathway}
                </p>
                
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                    🔬 WHAT THE RESEARCH SHOWS
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{concern.study}"</p>
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  {selectedConcern === 'sleep' ? '🌙' : selectedConcern === 'burnout' ? '⚡' : selectedConcern === 'hair' ? '✨' : selectedConcern === 'skin' ? '🌸' : '🌿'}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Our Recommended Remedy
                </h4>
                <p style={{ color: 'var(--gold-light)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {concern.stack}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Crafted from 100% natural plants, doctor-reviewed and clinically tested for real results.
                </p>
                <button
                  onClick={() => { addToCart(concern.product); setCartOpen(true); }}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                    color: 'var(--darkest)',
                    borderRadius: 100,
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(229,197,117,0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  🛒 Add to My Wellness Plan
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA STRIP 2 — LONGEVITY HUB ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #050a08 0%, #071510 50%, #030705 100%)',
        borderTop: '1px solid rgba(16,185,129,0.1)',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
        padding: '3.5rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.4))' }}>⏳</div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>🌿 LONGEVITY HUB</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                  Science-Backed Protocols to Live Longer, Better
                </h3>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/longevity-hub" style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#34d399',
                padding: '0.85rem 1.75rem',
                borderRadius: 100,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.88rem',
                display: 'inline-block',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.1)'; }}
              >
                Explore Longevity Hub →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* ===== EDITORIAL BLOG JOURNAL — 9-ARTICLE EXPANDED GRID ===== */}
      {/* ========================================================== */}
      <section id="featured-articles" style={{ padding: '7rem 0', background: 'linear-gradient(180deg, #04060d 0%, #060912 50%, #080b18 100%)' }}>
        <div className="container">
          
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <div className="section-tag" style={{ marginBottom: '1rem' }}>📖 THE WELLNESS JOURNAL</div>
              <h2 className="section-title">
                Real Science, <span className="gold-gradient-text">Simply Explained</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                No confusing jargon. Just honest, evidence-based wellness writing that helps you understand your body and make better choices every day.
              </p>
            </div>
          </Reveal>

          {/* LEAD ARTICLE — full-width */}
          <Reveal>
            <Link href="/blog/1" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                gap: '0',
                background: 'linear-gradient(135deg, rgba(13,36,24,0.8) 0%, rgba(21,62,42,0.6) 100%)',
                border: '1px solid rgba(229,197,117,0.2)',
                borderRadius: 24,
                marginBottom: '2.5rem',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(229,197,117,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(180deg, #e5c575, #c9a84c)' }} />

                <div style={{ padding: '3rem 3rem 3rem 3.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{ background: 'rgba(229,197,117,0.12)', border: '1px solid rgba(229,197,117,0.25)', borderRadius: 100, padding: '0.3rem 0.9rem', fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      🌙 Sleep & Hormones
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>7 min read</span>
                  </div>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                    lineHeight: 1.25,
                    fontWeight: 900, color: 'white', marginBottom: '0.5rem'
                  }}>
                    Why You Wake Up at 3 AM
                  </h3>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    The hidden cortisol secret most doctors don't mention
                  </p>

                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                    Waking at 2–4 AM is not bad luck — it's your stress hormones spiking at the wrong time. Learn how your body clock works, and the gentle plant-based remedies that help it reset naturally and permanently.
                  </p>

                  <div style={{ background: 'rgba(229,197,117,0.06)', border: '1px dashed rgba(229,197,117,0.25)', borderRadius: 14, padding: '1.1rem', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      ✨ What you'll learn in this article:
                    </div>
                    <ul style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', paddingLeft: '1rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li>Why 3 AM waking is almost always a hormone problem, not a sleep problem</li>
                      <li>How Ashwagandha reduces stress hormones by up to 28% in clinical trials</li>
                      <li>The simple evening routine that resets your sleep within 7 days</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(229,197,117,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(229,197,117,0.3)', fontSize: '1.1rem' }}>👩‍⚕️</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>Dr. Sarah Chen, MD</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Stanford Integrative Endocrinologist</div>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  padding: '3rem 2rem', gap: '1.5rem', borderLeft: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(229,197,117,0.3))' }}>🌙</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                      Recommended Protocol
                    </div>
                    <p style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Botanical Sleep Drops</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5 }}>Ashwagandha KSM-66 · Brahmi · Passionflower</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                    <span style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(229,197,117,0.25)', color: 'var(--gold-light)', borderRadius: 100, padding: '0.7rem 1rem', fontSize: '0.82rem', fontWeight: 700 }}>
                      📖 Read Full Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* 6-CARD BLOG GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }} className="three-col-grid">
            {editorialArticles.slice(1).map((article, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Link href={`/blog/${article.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{
                    background: article.bgGradient,
                    border: `1px solid ${article.borderColor}`,
                    borderRadius: 20,
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    minHeight: 280,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 40px ${article.color}20`;
                    (e.currentTarget as HTMLElement).style.borderColor = article.color + '55';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = article.borderColor;
                  }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', filter: `drop-shadow(0 0 12px ${article.color}50)` }}>{article.icon}</span>
                        <span style={{ background: `${article.color}18`, border: `1px solid ${article.color}30`, borderRadius: 100, padding: '0.2rem 0.65rem', fontSize: '0.65rem', color: article.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {article.category}
                        </span>
                      </div>
                      
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'white', fontWeight: 800, marginBottom: '0.35rem', lineHeight: 1.3 }}>
                        {article.title}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', color: `${article.color}99`, fontStyle: 'italic', marginBottom: '0.85rem' }}>
                        {article.subtitle}
                      </p>
                      
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                        {article.excerpt}
                      </p>
                    </div>

                    <div style={{ borderTop: `1px solid ${article.color}18`, paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{article.author}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{article.readTime}</div>
                      </div>
                      <span style={{ color: article.color, fontSize: '0.8rem', fontWeight: 700 }}>
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link href="/blog" style={{
                background: 'transparent',
                border: '1px solid rgba(229,197,117,0.3)',
                color: 'var(--gold-light)',
                padding: '0.85rem 2.25rem',
                borderRadius: 100,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.88rem',
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(229,197,117,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                📚 Browse All Wellness Articles →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA STRIP 3 — APOTHECARY TEASER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0c0800 0%, #1a1000 50%, #0e0900 100%)',
        padding: '4rem 0',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)'
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>🏺 THE APOTHECARY IS OPEN</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Every Remedy. Clinically Verified. Naturally Pure.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Doctor-formulated botanical blends made with third-party tested, pharmaceutical-grade herbs. No fillers. No synthetic shortcuts.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shop" style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                color: '#0a0700',
                padding: '0.95rem 2.25rem',
                borderRadius: 100,
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '0.92rem',
                boxShadow: '0 4px 25px rgba(201,168,76,0.25)',
                display: 'inline-block',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                🏺 Shop The Apothecary
              </Link>
              <Link href="/case-studies" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
                padding: '0.95rem 2rem',
                borderRadius: 100,
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.92rem',
                display: 'inline-block',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              >
                Read Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOP THE APOTHECARY — PRODUCT GRID ===== */}
      <section style={{ background: 'linear-gradient(180deg, #060509 0%, #09060f 40%, #0c0714 100%)', padding: '7rem 0', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
        <div className="container">
          
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <div className="section-tag" style={{ marginBottom: '1rem' }}>🌿 THE APOTHECARY</div>
              <h2 className="section-title">
                Nature's Best, <span className="gold-gradient-text">Scientifically Verified</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Every product in our apothecary is made from 100% natural botanicals, third-party lab tested, and doctor-formulated. Hover over any card to see exactly what's inside.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="three-col-grid">
            {clinicalProducts.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{ position: 'relative', height: '400px', cursor: 'pointer', perspective: '1000px' }}
                  onMouseEnter={() => setFlippedProduct(i)}
                  onMouseLeave={() => setFlippedProduct(null)}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)', transform: flippedProduct === i ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                    {/* Front */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: p.gradient, borderRadius: 20, padding: '2rem', border: '1px solid rgba(229,197,117,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '2.8rem' }}>{p.icon}</span>
                          <span style={{ background: p.tagColor + '22', color: p.tagColor, border: `1px solid ${p.tagColor}44`, padding: '0.25rem 0.75rem', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em' }}>{p.tag}</span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 800 }}>{p.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', lineHeight: 1.65 }}>{p.desc}</p>
                        <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '0.4rem 0.7rem', fontSize: '0.7rem', color: 'var(--gold-light)', display: 'inline-block' }}>
                          🌿 {p.extracts}
                        </div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <div>
                            <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gold)' }}>{p.price}</span>
                            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{p.originalPrice}</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>★ {p.rating} ({p.reviews})</div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(p.name); setCartOpen(true); }} style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: 100, padding: '0.6rem 1.25rem', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                          Add to Wellness Plan
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.5rem' }}>Hover to see what's inside →</div>
                      </div>
                    </div>
                    
                    {/* Back */}
                    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #0a1a0f, #1a3d2e)', borderRadius: 20, padding: '2rem', border: '1px solid rgba(229,197,117,0.25)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>🔬 What's Inside</div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>{p.name}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
                          {[
                            { label: 'Purity Tested:', value: '✅ NABL Verified' },
                            { label: 'Key Botanicals:', value: p.extracts },
                            { label: 'Heavy Metals:', value: '✅ Undetected (0.00%)' },
                            { label: 'Manufacturing:', value: '✅ GMP & ISO 22000' },
                            { label: 'No Additives:', value: '✅ Zero Synthetic Fillers' }
                          ].map((row, ri) => (
                            <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: ri < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingBottom: '0.4rem', gap: '0.5rem' }}>
                              <span style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>{row.label}</span>
                              <span style={{ color: 'white', fontWeight: 600, textAlign: 'right' }}>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/shop" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#000', padding: '0.75rem', borderRadius: 100, fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>
                        View Full Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/shop" style={{ display: 'inline-block', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--darkest)', padding: '0.9rem 2.25rem', borderRadius: 100, fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(229,197,117,0.2)', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                🛍️ Explore The Full Apothecary →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CIRCADIAN HORMONE SIMULATOR ===== */}
      <section style={{ background: 'linear-gradient(180deg, #020608 0%, #030a0e 50%, #040c0f 100%)', padding: '7rem 0', borderTop: '1px solid rgba(56,189,248,0.1)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }} className="editorial-lead-card">
              <div>
                <div className="section-tag" style={{ marginBottom: '1rem' }}>🕐 INTERACTIVE TOOL</div>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                  See How Your Daily Habits Affect Your <span className="gold-gradient-text">Sleep & Energy</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.93rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Adjust the sliders below to see exactly how your morning sunlight, screen time, and coffee habits shape your cortisol and melatonin curves throughout the day.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '2rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>☀️ Morning Sunlight</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{sunExposure} minutes</span>
                    </div>
                    <input type="range" min={5} max={45} step={5} value={sunExposure} onChange={e => setSunExposure(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>More morning sun = better energy all day and deeper sleep at night.</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>📱 Screen Time Before Bed</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{screenTime} hours</span>
                    </div>
                    <input type="range" min={0} max={4} step={0.5} value={screenTime} onChange={e => setScreenTime(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Blue light delays melatonin and keeps cortisol elevated into the night.</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>☕ Last Coffee of the Day</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{caffeineCutoff > 12 ? `${caffeineCutoff - 12} PM` : `${caffeineCutoff} AM`}</span>
                    </div>
                    <input type="range" min={8} max={20} step={1} value={caffeineCutoff} onChange={e => setCaffeineCutoff(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--gold)' }} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Late caffeine blocks the sleep hormone signal for up to 10 hours after drinking.</span>
                  </div>
                </div>

                <Link href="/tools" style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(229,197,117,0.35)', color: 'var(--gold-light)', padding: '0.75rem 1.75rem', borderRadius: 100, fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(229,197,117,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  🧰 Explore All Wellness Tools →
                </Link>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(229,197,117,0.2)', borderRadius: 24, padding: '2rem', height: 400 }}>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', textAlign: 'center' }}>
                  Your 24-Hour Hormone Map
                </h4>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={dynamicCircadianData}>
                    <defs>
                      <linearGradient id="cortisolHomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="melatoninHomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" stroke="rgba(255,255,255,0.25)" style={{ fontSize: '10px' }} />
                    <YAxis stroke="rgba(255,255,255,0.25)" style={{ fontSize: '10px' }} />
                    <RechartsTooltip contentStyle={{ background: '#0d2418', border: '1px solid rgba(229,197,117,0.3)', borderRadius: 8, color: 'white', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="Cortisol" stroke="#ef4444" fillOpacity={1} fill="url(#cortisolHomeGrad)" strokeWidth={2.5} name="Cortisol (Stress)" />
                    <Area type="monotone" dataKey="Melatonin" stroke="#3b82f6" fillOpacity={1} fill="url(#melatoninHomeGrad)" strokeWidth={2.5} name="Melatonin (Sleep)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', fontSize: '0.72rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span><strong style={{ color: '#ef4444' }}>—</strong> Cortisol</span>
                  <span><strong style={{ color: '#3b82f6' }}>—</strong> Melatonin</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== OUR WELLNESS EXPERTS ===== */}
      <section style={{ background: 'linear-gradient(180deg, #070509 0%, #0d0814 50%, #0f091a 100%)', padding: '7rem 0', borderTop: '1px solid rgba(192,132,252,0.1)' }}>
        <div className="container">
          
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <div className="section-tag" style={{ marginBottom: '1rem' }}>👩‍⚕️ OUR ADVISORY BOARD</div>
              <h2 className="section-title">
                Guided by Real <span className="gold-gradient-text">Medical Experts</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0.75rem auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Every article, product, and protocol at Ojas Sanctuary is reviewed and approved by our board of practising integrative medicine doctors and Ayurvedic physicians.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="three-col-grid">
            {medicalBoard.map((member, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{
                  padding: '2.5rem 2rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(229,197,117,0.12)',
                  borderRadius: 20,
                  transition: 'border-color 0.25s ease, transform 0.25s ease'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,197,117,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,197,117,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem', width: 60, height: 60, borderRadius: '50%', background: 'rgba(229,197,117,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(229,197,117,0.25)' }}>
                    {member.img}
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.2rem' }}>{member.name}</h4>
                  <div style={{ color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{member.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: 1.4 }}>{member.credentials}</div>
                  
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GEO-TARGETED WELLNESS ADVISOR ===== */}
      <section style={{ background: 'linear-gradient(180deg, #050909 0%, #060e0e 50%, #040b0a 100%)', padding: '5rem 0', borderTop: '1px solid rgba(52,211,153,0.1)' }}>
        <div className="container">
          <Reveal>
            <GeoOptimizer />
          </Reveal>
        </div>
      </section>

      {/* ===== CTA STRIP 4 — CASE STUDIES ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #070410 0%, #0d0620 50%, #080316 100%)',
        padding: '3.5rem 0',
        borderTop: '1px solid rgba(139,92,246,0.15)',
        borderBottom: '1px solid rgba(139,92,246,0.1)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>📋 REAL RESULTS FROM REAL PEOPLE</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Documented Wellness Transformations
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: 440 }}>
                Read our detailed case studies — real people, real struggles, real outcomes. Tracked over 8–24 weeks with their consent.
              </p>
            </div>
            <Link href="/case-studies" style={{
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.35)',
              color: '#c4b5fd',
              padding: '0.9rem 2rem',
              borderRadius: 100,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-block',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.22)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.12)'; }}
            >
              Read Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SIGNUP ===== */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #06040c 0%, #030208 100%)',
        borderTop: '1px solid rgba(229,197,117,0.1)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '650px' }}>
          <Reveal>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Join 50,000+ Wellness Seekers
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.93rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Get our free weekly wellness letter — simple, science-backed tips on sleep, gut health, skin, and longevity. No jargon, no spam. Just genuinely useful guidance.
            </p>
            <form onSubmit={e => { e.preventDefault(); alert('Welcome to the Ojas Sanctuary community! 🌿'); }} style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '480px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Your email address..."
                required
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(229,197,117,0.22)',
                  borderRadius: 100,
                  color: 'white',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                color: 'var(--darkest)',
                border: 'none',
                borderRadius: 100,
                padding: '0.85rem 1.75rem',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                Join Free →
              </button>
            </form>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', marginTop: '1rem' }}>
              🔒 Zero spam. Unsubscribe anytime. Your privacy is sacred to us.
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .editorial-lead-card { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; }
        @media (max-width: 1024px) {
          .three-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .editorial-lead-card { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 2rem !important; }
          .hero-side-card { display: none !important; }
        }
        @media (max-width: 640px) {
          .three-col-grid { grid-template-columns: 1fr !important; }
          .two-col-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
