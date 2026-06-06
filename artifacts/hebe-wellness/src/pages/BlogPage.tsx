import { useState } from 'react';
import { Link } from 'wouter';

export const allArticles = [
  { id: 1, title: 'Why You Wake Up at 3 AM: The Science of Cortisol & Circadian Disruption', category: 'Sleep', excerpt: 'Waking between 2-4 AM is a hallmark of elevated cortisol and HPA axis dysregulation. Here is exactly what is happening in your body and how to fix it with botanical science.', readTime: '7 min', date: 'Apr 1, 2026', icon: '🌙', gradient: 'linear-gradient(135deg, #1a237e, #0d1459)' },
  { id: 2, title: '5 Botanical Ingredients Clinically Proven to Improve Sleep Quality', category: 'Sleep', excerpt: 'Clinical trials confirm these 5 plant compounds — Ashwagandha, Valerian, L-Theanine, Magnolia Bark, and Glycine — outperform many conventional sleep aids without dependency.', readTime: '6 min', date: 'Mar 25, 2026', icon: '🌿', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 3, title: 'Sleep Debt: How to Calculate Yours & Why It Is Destroying Your Health', category: 'Sleep', excerpt: 'Chronic sleep debt impairs cognition, metabolic health, and immunity in compounding ways. Understand your deficit and the botanical tools that accelerate recovery.', readTime: '8 min', date: 'Mar 18, 2026', icon: '😴', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { id: 4, title: 'Melatonin vs. Plant Botanicals: What Science Says About Long-Term Sleep Support', category: 'Sleep', excerpt: 'Synthetic melatonin works short-term but disrupts endogenous production. Discover why botanical sleep stacks offer more sustainable circadian support.', readTime: '9 min', date: 'Mar 10, 2026', icon: '🔬', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 5, title: 'Ashwagandha for Sleep: A Deep Dive into KSM-66 Clinical Data', category: 'Sleep', excerpt: 'KSM-66 Ashwagandha has 12 clinical trials specifically on sleep outcomes. We break down the mechanisms, optimal dosing, and timing for maximum benefit.', readTime: '10 min', date: 'Mar 3, 2026', icon: '🌱', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 6, title: 'The Blue Light Problem: How Screens Destroy Your Sleep Architecture', category: 'Sleep', excerpt: 'Blue light suppresses melatonin for 3+ hours post-exposure. Combined with cortisol elevation from social media, modern screens are biologically designed to keep you awake.', readTime: '5 min', date: 'Feb 24, 2026', icon: '📱', gradient: 'linear-gradient(135deg, #1a237e, #0d1459)' },
  { id: 7, title: 'Magnesium & Sleep: Why 70% of Indians Are Deficient in This Critical Mineral', category: 'Sleep', excerpt: 'Magnesium glycinate is the most underused sleep tool. At therapeutic doses it activates GABA receptors, relaxes muscles, and reduces cortisol for deeper sleep.', readTime: '7 min', date: 'Feb 17, 2026', icon: '⚗️', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 8, title: 'Sleep Stages Explained: Why Light Sleep Won\'t Restore You', category: 'Sleep', excerpt: 'REM and Deep Sleep are where cellular repair, memory consolidation, and hormonal restoration happen. Learn how botanicals extend these restorative stages.', readTime: '8 min', date: 'Feb 10, 2026', icon: '🧠', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 9, title: 'Brahmi for Sleep: How Bacopa Monnieri Quiets the Racing Mind', category: 'Sleep', excerpt: 'Brahmi reduces cortisol, modulates GABA, and significantly reduces anxiety-driven insomnia. 16 clinical trials confirm its anxiolytic effects without sedation.', readTime: '6 min', date: 'Feb 3, 2026', icon: '🍃', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 10, title: 'The Perfect Sleep Environment: Temperature, Darkness & Botanical Rituals', category: 'Sleep', excerpt: 'Core body temperature must drop 1-2°C for deep sleep onset. Combined with botanical protocols, environmental optimization can transform your sleep architecture.', readTime: '6 min', date: 'Jan 27, 2026', icon: '🌡️', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 11, title: 'Cortisol: The Stress Hormone Making You Fat, Tired & Anxious', category: 'Stress', excerpt: 'Chronically elevated cortisol rewires your brain, destroys muscle, stores belly fat, and annihilates your immune system. Here\'s the botanical reset protocol.', readTime: '9 min', date: 'Apr 2, 2026', icon: '⚡', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 12, title: 'The Burnout Biology: What\'s Actually Happening When You\'re Burned Out', category: 'Stress', excerpt: 'Burnout is not a mindset issue — it\'s a measurable biological state of HPA axis exhaustion, neuroinflammation, and mitochondrial dysfunction.', readTime: '10 min', date: 'Mar 26, 2026', icon: '🔥', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { id: 13, title: 'Rhodiola vs. Ashwagandha: Which Adaptogen Is Right for Your Stress Profile?', category: 'Stress', excerpt: 'Both are adaptogens but they work through different mechanisms. Rhodiola is stimulating; Ashwagandha is calming. The right choice depends on your cortisol pattern.', readTime: '7 min', date: 'Mar 19, 2026', icon: '🌿', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 14, title: 'HPA Axis 101: Understanding Your Body\'s Master Stress System', category: 'Stress', excerpt: 'The Hypothalamic-Pituitary-Adrenal axis is the control center of your stress response. Understanding it is the first step to healing burnout and chronic stress.', readTime: '11 min', date: 'Mar 12, 2026', icon: '🧬', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 15, title: 'L-Theanine + Ashwagandha Stack: The Anti-Anxiety Protocol Used by High Performers', category: 'Stress', excerpt: 'L-Theanine elevates alpha brain waves within 45 minutes, paired with Ashwagandha\'s cortisol-modulating effects equals calm focus without drowsiness.', readTime: '7 min', date: 'Mar 5, 2026', icon: '🧠', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { id: 16, title: 'Anxiety & the Gut: How 95% of Your Serotonin Lives in Your Belly', category: 'Stress', excerpt: 'The gut-brain axis bidirectional communication means gut inflammation directly causes anxiety. Plant botanical gut support reduces psychiatric symptoms measurably.', readTime: '8 min', date: 'Feb 26, 2026', icon: '🦠', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 17, title: 'Breathwork & Botanical Synergy: Combining Pranayama with Adaptogen Science', category: 'Stress', excerpt: 'Cyclic sighing reduces cortisol faster than meditation. When combined with adaptogenic support, the nervous system reset is profoundly amplified.', readTime: '6 min', date: 'Feb 19, 2026', icon: '🧘', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 18, title: 'Social Media, Dopamine & Anxiety: The Neurochemistry of the Scroll Loop', category: 'Stress', excerpt: 'Variable ratio reward schedules in social media hijack the dopamine system identically to gambling. Here\'s the neurochemical toll and botanical countermeasures.', readTime: '8 min', date: 'Feb 12, 2026', icon: '📱', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 19, title: 'Shatavari for Stress: The Women\'s Adaptogen in Ancient Ayurvedic Texts', category: 'Stress', excerpt: 'Shatavari is the most powerful female adaptogen in Ayurveda — balancing estrogen, reducing cortisol, and addressing stress-induced hormonal disruption.', readTime: '7 min', date: 'Feb 5, 2026', icon: '🌸', gradient: 'linear-gradient(135deg, #4e1f2d, #2e0f1a)' },
  { id: 20, title: 'The Anti-Inflammation Protocol for Chronic Stress: A Clinical Perspective', category: 'Stress', excerpt: 'Chronic stress drives systemic neuroinflammation. The IL-6, TNF-alpha cascade from prolonged HPA activation is measurable — and reversible with targeted botanicals.', readTime: '10 min', date: 'Jan 29, 2026', icon: '🔬', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 21, title: 'DHT, Hair Loss & The Plant Botanicals That Actually Block It', category: 'Hair Health', excerpt: 'Dihydrotestosterone is the root cause of 95% of androgenic alopecia. These plant botanicals inhibit 5α-reductase enzyme activity without systemic side effects.', readTime: '9 min', date: 'Apr 3, 2026', icon: '✨', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 22, title: 'Rosemary Oil vs. Minoxidil: What the Clinical Trial Actually Found', category: 'Hair Health', excerpt: 'The landmark comparative study directly compared rosemary oil to 2% Minoxidil over 6 months. The results challenge pharmaceutical assumptions about natural remedies.', readTime: '8 min', date: 'Mar 27, 2026', icon: '🌾', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 23, title: 'Bhringraj: The "King of Herbs" for Hair Loss Explained by Science', category: 'Hair Health', excerpt: 'Eclipta alba has been used for millennia for hair restoration. Modern research reveals its DHT-blocking, follicle-stimulating, and scalp anti-inflammatory mechanisms.', readTime: '7 min', date: 'Mar 20, 2026', icon: '🌱', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 24, title: 'The Hair Growth Cycle: Anagen, Catagen, Telogen & How Botanicals Extend Growth', category: 'Hair Health', excerpt: 'Hair cycles through 3 phases. Stress, DHT, and nutritional deficiency shorten the anagen phase. These botanicals measurably extend active growth periods.', readTime: '8 min', date: 'Mar 13, 2026', icon: '🔄', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 25, title: 'Telogen Effluvium: The Stress-Triggered Hair Loss Affecting Millions', category: 'Hair Health', excerpt: 'Stress-induced telogen effluvium can cause 300-500 hairs to fall daily 3 months after the trigger. Here\'s the biology and the botanical recovery protocol.', readTime: '9 min', date: 'Mar 6, 2026', icon: '😰', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 26, title: 'Scalp Health: Why Your Microbiome Determines Your Hair Density', category: 'Hair Health', excerpt: 'The scalp microbiome directly regulates follicle health. Malassezia overgrowth, sebum dysregulation, and inflammation are the hidden root causes of hair loss.', readTime: '7 min', date: 'Feb 27, 2026', icon: '🦠', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 27, title: 'Saw Palmetto for Hair Loss: Clinical Evidence vs. Marketing Claims', category: 'Hair Health', excerpt: 'Saw Palmetto extract inhibits 5α-reductase at therapeutic doses. Four randomized controlled trials demonstrate significant hair count improvements.', readTime: '6 min', date: 'Feb 20, 2026', icon: '🌿', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 28, title: 'Iron Deficiency & Hair Loss: The Missing Link Most Dermatologists Miss', category: 'Hair Health', excerpt: 'Ferritin below 70 ng/mL is a leading modifiable cause of hair loss in Indian women. Dietary and botanical iron optimization can reverse this in 3-6 months.', readTime: '7 min', date: 'Feb 13, 2026', icon: '🩸', gradient: 'linear-gradient(135deg, #4e1f2d, #2e0f1a)' },
  { id: 29, title: 'Biotin Truth: Why You\'re Wasting Money on High-Dose Biotin Supplements', category: 'Hair Health', excerpt: 'Unless you have a clinical biotin deficiency (rare), high-dose biotin will not regrow hair. Here\'s what actually works according to the clinical evidence.', readTime: '6 min', date: 'Feb 6, 2026', icon: '💊', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 30, title: 'Hair Oiling Science: Coconut vs. Castor vs. Bhringraj Oil — What Works?', category: 'Hair Health', excerpt: 'A rigorous comparison of penetrating vs. coating oils, their effect on cortex proteins, and the traditional Ayurvedic oiling practice backed by modern dermatology.', readTime: '8 min', date: 'Jan 30, 2026', icon: '💧', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 31, title: 'Saffron & Skin Brightening: The Science Behind India\'s Most Precious Botanical', category: 'Skin', excerpt: 'Kashmir saffron contains crocin, safranal, and picrocrocin — compounds with documented melanin-inhibiting and antioxidant properties that outperform many synthetic brighteners.', readTime: '8 min', date: 'Apr 4, 2026', icon: '🌸', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 32, title: 'Turmeric & Curcumin: The Anti-Inflammatory Compound Dermatologists Are Raving About', category: 'Skin', excerpt: 'Curcumin inhibits NF-κB, reduces PGE2 synthesis, and outperforms hydrocortisone for inflammatory skin conditions in multiple trials. The bioavailability problem, solved.', readTime: '9 min', date: 'Mar 28, 2026', icon: '🟡', gradient: 'linear-gradient(135deg, #4e3a1f, #2e2010)' },
  { id: 33, title: 'Inside-Out Beauty: How Gut Health Determines Your Skin Quality', category: 'Skin', excerpt: 'The gut-skin axis is one of dermatology\'s most exciting frontiers. Gut dysbiosis drives acne, eczema, psoriasis, and premature aging through systemic inflammation.', readTime: '7 min', date: 'Mar 21, 2026', icon: '🦠', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 34, title: 'The Indian Skin Microbiome: How Your Unique Biology Demands Different Skincare', category: 'Skin', excerpt: 'Indian skin has distinct melanin density, moisture retention, and microbiome composition. Products designed for Western skin may actively harm darker skin tones.', readTime: '8 min', date: 'Mar 14, 2026', icon: '🇮🇳', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 35, title: 'Rosehip Seed Oil: Clinical Evidence for Scar Reduction, Brightening & Anti-Aging', category: 'Skin', excerpt: 'Rosehip oil is rich in trans-retinoic acid, linoleic acid, and beta-carotene. Three RCTs confirm significant improvements in hyperpigmentation, scars, and fine lines.', readTime: '7 min', date: 'Mar 7, 2026', icon: '🌹', gradient: 'linear-gradient(135deg, #4e1f2d, #2e0f1a)' },
  { id: 36, title: 'Niacinamide vs. Botanical Vitamin C: Which Is Better for Skin Brightening?', category: 'Skin', excerpt: 'Both work on melanin synthesis but through different pathways. For Indian skin with PIH and melasma, the combination is demonstrably superior to either alone.', readTime: '6 min', date: 'Feb 28, 2026', icon: '✨', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 37, title: 'Acne & Androgens: Why Your Hormonal Breakouts Need a Botanical Solution', category: 'Skin', excerpt: 'Hormonal acne is driven by sebum hypersecretion from androgen signaling. Spearmint, Saw Palmetto, and Berberine have clinical evidence for hormonal acne reduction.', readTime: '8 min', date: 'Feb 21, 2026', icon: '🧬', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { id: 38, title: 'Collagen & Plant Botanicals: Which Ingredients Stimulate Your Own Production?', category: 'Skin', excerpt: 'Collagen supplements are hydrolyzed peptides that serve as building blocks, but Vitamin C, Gotu Kola, and Aloe Vera stimulate endogenous fibroblast collagen production.', readTime: '7 min', date: 'Feb 14, 2026', icon: '💪', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 39, title: 'Sun Damage & Pigmentation: The Botanical Defense Protocol for Indian Climate', category: 'Skin', excerpt: 'UVA penetrates glass and year-round Indian sun causes cumulative DNA damage. This botanical-forward photoprotection and repair protocol addresses root causes.', readTime: '8 min', date: 'Feb 7, 2026', icon: '☀️', gradient: 'linear-gradient(135deg, #4e3a1f, #2e2010)' },
  { id: 40, title: 'Adaptogens for Skin: How Stress Creates Inflammation and Premature Aging', category: 'Skin', excerpt: 'Stress-induced cortisol degrades collagen, impairs the skin barrier, and triggers inflammatory pathways. Adaptogens address skin aging at its actual hormonal root cause.', readTime: '7 min', date: 'Jan 31, 2026', icon: '⚡', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { id: 41, title: 'Circadian Biology: Why Meal Timing Matters More Than What You Eat', category: 'Wellness', excerpt: 'Time-restricted eating aligned with circadian rhythms improves metabolic markers, gut health, and cognitive function independent of caloric intake.', readTime: '9 min', date: 'Apr 5, 2026', icon: '⏰', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 42, title: "Lion's Mane Mushroom: The Neurotrophic Superfood Backed by Neuroscience", category: 'Wellness', excerpt: "Lion's Mane stimulates Nerve Growth Factor and BDNF — the two proteins responsible for neurogenesis. Clinical trials show significant cognitive improvements in multiple cohorts.", readTime: '10 min', date: 'Mar 29, 2026', icon: '🍄', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 43, title: 'Berberine: Nature\'s Metformin & Why Indian Doctors Are Starting to Prescribe It', category: 'Wellness', excerpt: 'Berberine activates AMPK, improves insulin sensitivity, and reduces blood sugar with comparable efficacy to Metformin in 7 head-to-head clinical trials.', readTime: '11 min', date: 'Mar 22, 2026', icon: '🔶', gradient: 'linear-gradient(135deg, #4e3a1f, #2e2010)' },
  { id: 44, title: 'The Mitochondria Protocol: How to Optimize Cellular Energy Production', category: 'Wellness', excerpt: 'Mitochondrial dysfunction is the underlying biology of fatigue, brain fog, and accelerated aging. CoQ10, PQQ, and botanical mitochondrial activators explained.', readTime: '10 min', date: 'Mar 15, 2026', icon: '⚡', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { id: 45, title: 'Fasting & Ayurveda: Why Ancient Indian Wisdom Predicted Autophagy', category: 'Wellness', excerpt: 'Intermittent fasting activates autophagy — cellular self-cleaning. Ayurveda\'s Ekadashi fasting protocol anticipates Nobel Prize-winning autophagy science by millennia.', readTime: '9 min', date: 'Mar 8, 2026', icon: '🕉️', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 46, title: 'Zone 2 Cardio & Botanical Recovery: The Performance Protocol for Longevity', category: 'Wellness', excerpt: 'Zone 2 cardio at 60-70% max heart rate stimulates mitochondrial biogenesis. Combined with adaptogenic recovery support, this is the science of cellular longevity.', readTime: '8 min', date: 'Mar 1, 2026', icon: '🏃', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { id: 47, title: 'The Microbiome Revolution: How Gut Bacteria Control Mood, Immunity & Weight', category: 'Wellness', excerpt: 'Your 38 trillion gut bacteria produce neurotransmitters, regulate immunity, and control metabolic hormones. The botanical tools to optimize your inner ecosystem.', readTime: '10 min', date: 'Feb 22, 2026', icon: '🦠', gradient: 'linear-gradient(135deg, #1f3a4e, #0f2030)' },
  { id: 48, title: 'Cold Therapy + Botanical Stacks: How to Build a Resilience Protocol', category: 'Wellness', excerpt: 'Cold water immersion activates norepinephrine 300%, improves mood, and reduces inflammation. These botanical adaptogens amplify the hormetic stress response.', readTime: '7 min', date: 'Feb 15, 2026', icon: '🧊', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
  { id: 49, title: 'Longevity Science & Ayurveda: How Ancient Rasayana Herbs Map to Modern Geroscience', category: 'Wellness', excerpt: 'Sirtuin activation, NAD+ optimization, telomere protection — modern longevity science keeps rediscovering what Charaka Samhita documented 2,000 years ago.', readTime: '12 min', date: 'Feb 8, 2026', icon: '♾️', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { id: 50, title: 'Building Your Daily Wellness Protocol: A Complete Guide for Indian Lifestyles', category: 'Wellness', excerpt: 'A practical, evidence-based daily ritual integrating plant botanicals, lifestyle practices, and mindfulness tools designed specifically for the Indian urban professional.', readTime: '11 min', date: 'Feb 1, 2026', icon: '📋', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
];

export const catTagColors: Record<string, string> = {
  Sleep: '#1a237e', Stress: '#4e1f0a', 'Hair Health': '#1f3a4e', Skin: '#4e2d1f', Wellness: '#1a3d2e',
};

const categories = ['All', 'Sleep', 'Stress', 'Hair Health', 'Skin', 'Wellness'];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who writes the articles in the wellness journal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every article is written or reviewed by board-certified Ayurvedic doctors (BAMS), endocrinologists, Preventative Medicine MDs, and expert botanical researchers."
      }
    }
  ]
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allArticles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3d2e 50%, #0a1a0f 100%)', padding: '5rem 0 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.5rem', background: 'rgba(201,168,76,0.08)' }}>THE WELLNESS JOURNAL</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 900 }}>
            Science Meets <span style={{ color: 'var(--gold)' }}>Ancient Wisdom</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.75 }}>
            <strong>Answer-First:</strong> Our wellness journal publishes peer-reviewed articles tracking the clinical efficacy of botanical adaptogens and Ayurvedic constitution mappings. Learn from board-certified endocrinologists and research scientists about cortisol balance, sleep architecture, and skin resilience.
          </p>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search 50 articles..." style={{ width: '100%', padding: '0.875rem 1.25rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section style={{ background: 'var(--mid-dark)', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '70px', zIndex: 100, backdropFilter: 'blur(12px)' }}>
        <div className="container" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '0.45rem 1.1rem', borderRadius: '100px', border: `1px solid ${activeCategory === cat ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`, background: activeCategory === cat ? 'var(--gold)' : 'transparent', color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.7)', fontWeight: activeCategory === cat ? 700 : 400, fontSize: '0.83rem', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>Showing {filtered.length} of 50 articles</div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <div>No articles found. Try a different search term.</div>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map((a) => (
                <Link key={a.id} href={`/blog/${a.id}`} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div className="blog-card" style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <div style={{ height: '160px', background: a.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      {a.icon}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.25))' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>{a.readTime}</div>
                    </div>
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ background: `${catTagColors[a.category] || '#1a3d2e'}55`, color: 'var(--gold-light)', padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em' }}>{a.category.toUpperCase()}</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem' }}>{a.date}</span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#fff', lineHeight: 1.5, marginBottom: '0.75rem', fontWeight: 700, flex: 1 }}>{a.title}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.83rem', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.25rem' }}>{a.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', fontSize: '0.83rem', fontWeight: 600 }}>Read Article →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0a1f12, #1a3d2e)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Get New Articles <span style={{ color: 'var(--gold)' }}>Before Anyone Else</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', lineHeight: 1.75 }}>Join 50,000+ subscribers. New clinical insights delivered every week.</p>
          <div style={{ display: 'flex', gap: 0, maxWidth: '440px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '0.875rem 1.25rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRight: 'none', borderRadius: '100px 0 0 100px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
            <button style={{ padding: '0.875rem 1.5rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', border: 'none', borderRadius: '0 100px 100px 0', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Subscribe →</button>
          </div>
        </div>
      </section>

      <style>{`
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem; }
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
