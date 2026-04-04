import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { Link } from 'wouter';

const categories = ['All', 'Sleep', 'Stress', 'Hair', 'Skin', 'Nutrition', 'Ayurveda'];

const categoryColors: Record<string, { bg: string; color: string }> = {
  Sleep: { bg: '#e8eaf6', color: '#1a237e' },
  Stress: { bg: '#fce4ec', color: '#880e4f' },
  Hair: { bg: '#f3e5f5', color: '#4a148c' },
  Skin: { bg: '#fff8e1', color: '#e65100' },
  Nutrition: { bg: '#e8f5e9', color: '#1b5e20' },
  Ayurveda: { bg: '#fff3e0', color: '#7b4f12' },
};

const articles = [
  { id: 1, title: 'The Science Behind Vijaya Botanical Complex: What Research Says', category: 'Ayurveda', readTime: '8 min', excerpt: 'Emerging clinical research reveals how plant-derived terpenes modulate the human endocannabinoid system to restore balance across multiple biological systems.', date: 'March 28, 2026', icon: '🔬' },
  { id: 2, title: 'Why You Can\'t Sleep: The Hidden Cortisol-Melatonin Conflict', category: 'Sleep', readTime: '6 min', excerpt: 'Chronic stress dysregulates the HPA axis, suppressing melatonin production. Here\'s how plant botanicals can restore this crucial hormonal balance.', date: 'March 25, 2026', icon: '🌙' },
  { id: 3, title: 'Ashwagandha vs. Rhodiola: Which Adaptogen Is Right for You?', category: 'Stress', readTime: '7 min', excerpt: 'Both are powerful adaptogens, but they work on different biological pathways. Here\'s how to choose based on your stress phenotype and cortisol pattern.', date: 'March 22, 2026', icon: '⚡' },
  { id: 4, title: 'The DHT-Hair Loss Connection: How Bhringraj Fights Back', category: 'Hair', readTime: '5 min', excerpt: 'Dihydrotestosterone (DHT) miniaturizes follicles. Clinical evidence shows Bhringraj\'s 5-alpha reductase inhibition is comparable to pharmaceutical interventions.', date: 'March 20, 2026', icon: '💆' },
  { id: 5, title: 'Turmeric Bioavailability: Why Most Curcumin Supplements Fail', category: 'Nutrition', readTime: '6 min', excerpt: 'Curcumin\'s poor bioavailability has been the Achilles heel of turmeric supplementation. Black pepper piperine and lipid formulations change everything.', date: 'March 18, 2026', icon: '🟡' },
  { id: 6, title: 'Skin Microbiome 101: Why Your Glow Starts in Your Gut', category: 'Skin', readTime: '7 min', excerpt: 'The gut-skin axis is one of the most exciting frontiers in dermatology. Here\'s what the microbiome research says about botanical approaches to clear skin.', date: 'March 15, 2026', icon: '✨' },
  { id: 7, title: 'Lion\'s Mane Mushroom: The Neurogenesis Superfood', category: 'Nutrition', readTime: '8 min', excerpt: 'Hericenones and erinacines are the active compounds that stimulate NGF production. The cognitive implications for aging populations are profound.', date: 'March 12, 2026', icon: '🍄' },
  { id: 8, title: 'Prakriti Assessment: Understanding Your Ayurvedic Body Type', category: 'Ayurveda', readTime: '10 min', excerpt: 'Vata, Pitta, or Kapha — your Prakriti determines your biological tendencies and ideal wellness protocol. Here\'s a comprehensive self-assessment guide.', date: 'March 10, 2026', icon: '🌿' },
  { id: 9, title: 'Berberine vs. Metformin: The Plant Compound That Rivals Pharmaceuticals', category: 'Nutrition', readTime: '9 min', excerpt: 'Three clinical trials comparing berberine to Metformin showed comparable blood sugar reduction with significantly fewer gastrointestinal side effects.', date: 'March 8, 2026', icon: '🔶' },
  { id: 10, title: 'The Stress-Hair Loss Cycle: Breaking Free with Adaptogens', category: 'Hair', readTime: '6 min', excerpt: 'Telogen effluvium, the stress-induced hair loss condition, affects millions of Indians. Here\'s the botanical protocol our trichologists recommend.', date: 'March 5, 2026', icon: '🌱' },
  { id: 11, title: 'Sleep Architecture: The 4 Stages and How Botanicals Support Each', category: 'Sleep', readTime: '7 min', excerpt: 'From NREM to REM, each sleep stage serves a distinct biological function. Our botanical formulations support the full sleep architecture.', date: 'March 3, 2026', icon: '😴' },
  { id: 12, title: 'Saffron: The Most Expensive Spice With the Best Antidepressant Data', category: 'Ayurveda', readTime: '8 min', excerpt: 'Clinical trials show Kashmiri saffron at 30mg/day produces antidepressant effects comparable to fluoxetine, with superior safety profiles.', date: 'March 1, 2026', icon: '🌸' },
  { id: 13, title: 'Gut Health Foundations: The Ayurvedic Approach to Digestive Wellness', category: 'Nutrition', readTime: '7 min', excerpt: 'Agni — the Ayurvedic concept of digestive fire — maps remarkably well to modern gastroenterology. Here\'s the science-backed approach to restoring it.', date: 'Feb 27, 2026', icon: '🔥' },
  { id: 14, title: 'Post-COVID Hair Loss: A Botanical Recovery Protocol', category: 'Hair', readTime: '6 min', excerpt: 'Telogen effluvium post-infection affects up to 22% of COVID survivors. Our Bhringraj + Iron + Biotin botanical protocol has shown promising results.', date: 'Feb 25, 2026', icon: '💪' },
  { id: 15, title: 'How to Read a Certificate of Analysis: A Consumer Guide', category: 'Ayurveda', readTime: '5 min', excerpt: 'Third-party testing is non-negotiable for supplement safety. Here\'s how to read a COA, what markers matter, and red flags to watch for.', date: 'Feb 22, 2026', icon: '📋' },
  { id: 16, title: 'Brahmi for Students: Cognitive Enhancement Without the Crash', category: 'Stress', readTime: '6 min', excerpt: 'Bacosides A and B modulate acetylcholine neurotransmission. Clinical data on Brahmi\'s effect on cognitive processing speed and memory consolidation.', date: 'Feb 20, 2026', icon: '🧠' },
  { id: 17, title: 'Women\'s Hormonal Health: Shatavari and the Rasayana Tradition', category: 'Ayurveda', readTime: '8 min', excerpt: 'Asparagus racemosus has been used for women\'s reproductive health for millennia. Modern phytochemistry validates the Rasayana tradition.', date: 'Feb 18, 2026', icon: '🌺' },
  { id: 18, title: 'The Gut Microbiome and Sleep: A Bidirectional Relationship', category: 'Sleep', readTime: '7 min', excerpt: 'New research confirms gut bacteria influence melatonin and serotonin production. Probiotic and prebiotic interventions are showing promise for sleep quality.', date: 'Feb 15, 2026', icon: '🦠' },
  { id: 19, title: 'Rosemary for Hair: Why This Mediterranean Herb Rivals Minoxidil', category: 'Hair', readTime: '5 min', excerpt: 'A landmark 2023 trial found rosemary oil comparable to 2% Minoxidil for hair growth with significantly less scalp irritation and no systemic absorption.', date: 'Feb 13, 2026', icon: '🌾' },
  { id: 20, title: 'Anti-Inflammatory Diet for Glowing Skin: The Plant-Based Approach', category: 'Skin', readTime: '7 min', excerpt: 'Chronic low-grade inflammation is the root cause of acne, eczema, and premature aging. Here\'s the dietary and botanical protocol that addresses the root cause.', date: 'Feb 10, 2026', icon: '🥗' },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: 21 + i,
    title: [
      'The Circadian Rhythm Reset Protocol for Night Shift Workers',
      'Moringa vs. Spirulina: The Superfood Showdown',
      'Triphala: Ayurveda\'s Master Cleanser Meets Modern Research',
      'Building Stress Resilience: The Long-Term Adaptogen Protocol',
      'Collagen Synthesis and Plant Botanicals: What the Science Says',
      'The Magnesium-Sleep Connection: How to Get More From Your Night',
      'Vijaya Botanical Complex for Athletes: Performance and Recovery',
      'Understanding Vata Imbalance: Signs, Causes, and Corrections',
      'The Science of Oil Pulling: Ancient Practice, Modern Evidence',
      'Seasonal Wellness: Adapting Your Protocol to India\'s Climate',
    ][i % 10],
    category: categories.slice(1)[i % 6] as string,
    readTime: `${5 + (i % 5)} min`,
    excerpt: 'Evidence-based insights from our network of Ayurvedic physicians and clinical researchers...',
    date: `Feb ${10 - (i % 10)}, 2026`,
    icon: ['🌿', '⭐', '🍵', '💊', '🌱', '🔬', '💆', '🌙', '⚡', '✨'][i % 10],
  })),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="blog-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag">The Wellness Journal</div>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            Science Meets <span className="gold-gradient-text">Ancient Wisdom</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Evidence-based articles from our network of Ayurvedic physicians and botanical researchers. No fluff — just science.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: 'var(--darkest)', padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ background: 'var(--darkest)', padding: '4rem 0 6rem' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Showing {filtered.length} articles {activeCategory !== 'All' ? `in ${activeCategory}` : ''}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {filtered.map((article, i) => {
              const catColor = categoryColors[article.category] || { bg: '#e8f5e9', color: '#1a3d2e' };
              return (
                <ScrollAnimator key={article.id} className={`stagger-${(i % 3) + 1}`}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{
                      height: 100, background: 'linear-gradient(135deg, var(--forest-green) 0%, var(--darkest) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.5rem'
                    }}>
                      {article.icon}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span className="category-pill" style={{ background: catColor.bg, color: catColor.color }}>
                          {article.category}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{article.readTime} read</span>
                      </div>
                      <h3 style={{
                        fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700,
                        color: 'white', lineHeight: 1.4, marginBottom: '0.75rem'
                      }}>
                        {article.title}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.825rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {article.excerpt}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>{article.date}</span>
                        <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>Read →</span>
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              );
            })}
          </div>
        </div>

        <style>{`
          @media(max-width:900px){
            .container>div>div>div { }
          }
          @media(max-width:700px){
            section[style] .container > p + div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
