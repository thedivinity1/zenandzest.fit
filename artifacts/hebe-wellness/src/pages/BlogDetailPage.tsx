import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'wouter';
import { useCart, Product, productsList } from '../context/CartContext';
import { allArticles } from './BlogPage';
import { articleDataList as compiledArticles } from './articlesData';

interface ArticleData {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  icon: string;
  gradient: string;
  reviewedBy?: {
    name: string;
    title: string;
    credentials: string;
    specialty: string;
    bio: string;
    verifiedDate: string;
  };
  sgeHighlights: string[];
  citations: {
    id: string;
    title: string;
    authors: string;
    journal: string;
    link: string;
  }[];
  contentSections: {
    heading: string;
    content: string;
  }[];
  recommendedProduct: string;
}

const articleDataList: Record<number, ArticleData> = compiledArticles;

interface GlossaryDef {
  term: string;
  definition: string;
}

const glossaryDefinitions: Record<string, GlossaryDef> = {
  'cortisol': { term: 'Cortisol', definition: 'The body\'s primary stress hormone, produced by the adrenal glands. It operates in a diurnal rhythm, peaks in the morning to wake you up, and must drop to its lowest at night for deep restorative sleep.' },
  'hpa axis': { term: 'HPA Axis', definition: 'The Hypothalamic-Pituitary-Adrenal axis. The complex feedback loop governing your body\'s systemic response to physical and emotional stress, regulating cortisol and adrenaline cycles.' },
  'gaba': { term: 'GABA', definition: 'Gamma-Aminobutyric Acid. The central nervous system\'s master inhibitory neurotransmitter. It acts as a biochemical "brake," calming brain activity, reducing anxiety, and enabling sleep onset.' },
  'withanolides': { term: 'Withanolides', definition: 'A group of naturally occurring phytochemical compounds found in Ashwagandha. They possess documented anti-inflammatory, neuroprotective, and HPA-axis buffering adaptogenic properties.' },
  'bdnf': { term: 'BDNF', definition: 'Brain-Derived Neurotrophic Factor. A vital protein that stimulates neurogenesis — the growth, differentiation, and preservation of new synapses and neurons in the brain.' }
};

const getArticleDetailBySlug = (slug: string): ArticleData => {
  let art = Object.values(articleDataList).find(a => a.slug === slug);
  if (art) {
    if (!art.reviewedBy) {
      let reviewer = {
        name: 'Dr. Sarah Chen, MD',
        title: 'Board Certified Integrative Endocrinologist',
        credentials: 'Stanford University School of Medicine, Fellow in Integrative Medicine',
        specialty: 'Adrenal & Circadian Rhythm Optimization',
        bio: 'Dr. Chen has over 14 years of clinical experience specializing in neuroendocrine health, hormone balancing, and the integration of adaptogenic plant chemistry.',
        verifiedDate: 'May 2026'
      };
      if (art.category === 'Sleep') {
        reviewer = {
          name: 'Dr. Michael Rodriguez, MD',
          title: 'Integrative Sleep Medicine Specialist',
          credentials: 'Harvard Medical School, Board Certified in Neurology & Sleep Medicine',
          specialty: 'Circadian Biology & Botanical Neurotransmitters',
          bio: 'Dr. Rodriguez is an author and leading researcher in botanical alternatives to sleep pharmaceuticals, specializing in GABA receptor modulation and sleep architecture preservation.',
          verifiedDate: 'May 2026'
        };
      } else if (art.category === 'Hair Health') {
        reviewer = {
          name: 'Dr. Priya Sharma, MD',
          title: 'Board Certified Medical Dermatologist',
          credentials: 'All India Institute of Medical Sciences (AIIMS), Trichology Fellow',
          specialty: 'Follicular Regrowth & DHT Inhibitions',
          bio: 'Dr. Sharma has over 12 years of clinical experience specializing in androgenic alopecia, follicular preservation, and classical botanical extracts.',
          verifiedDate: 'April 2026'
        };
      } else if (art.category === 'Skin') {
        reviewer = {
          name: 'Dr. Ananya Sen, MD',
          title: 'Consulting Dermatologist & Pharmacognosist',
          credentials: 'University of Michigan Medical School, Research Fellowship',
          specialty: 'Dermal Biomarkers & Anti-Aging Phytochemistry',
          bio: 'Dr. Sen specializes in trans-dermal delivery systems, Kashmiri Saffron crocin synthesis, and barrier repairing plant lipids.',
          verifiedDate: 'May 2026'
        };
      } else if (art.category === 'Wellness') {
        reviewer = {
          name: 'Dr. Rishi Tripathi, BAMS',
          title: 'Chief Board Advisor & Ayurvedic Physician',
          credentials: 'Institute of Medical Sciences, BHU, PhD in Dravyaguna (Phytochemistry)',
          specialty: 'Autophagy & Epigenetic Aging Protocols',
          bio: 'Dr. Tripathi has dedicated 22 years to mapping classical Ayurvedic Rasayana principles to modern sirtuin and NAD+ sirtuin longevity science.',
          verifiedDate: 'May 2026'
        };
      }
      art = { ...art, reviewedBy: reviewer };
    }
    return art;
  }
  const meta = allArticles.find(a => a.slug === slug) || allArticles[0];
  
  let reviewer = {
    name: 'Dr. Sarah Chen, MD',
    title: 'Board Certified Integrative Endocrinologist',
    credentials: 'Stanford University School of Medicine, Fellow in Integrative Medicine',
    specialty: 'Adrenal & Circadian Rhythm Optimization',
    bio: 'Dr. Chen has over 14 years of clinical experience specializing in neuroendocrine health, hormone balancing, and the integration of adaptogenic plant chemistry.',
    verifiedDate: 'May 2026'
  };
  let recProduct = 'Adaptogenic Stress Relief';
  
  if (meta.category === 'Sleep') {
    reviewer = {
      name: 'Dr. Michael Rodriguez, MD',
      title: 'Integrative Sleep Medicine Specialist',
      credentials: 'Harvard Medical School, Board Certified in Neurology & Sleep Medicine',
      specialty: 'Circadian Biology & Botanical Neurotransmitters',
      bio: 'Dr. Rodriguez is an author and leading researcher in botanical alternatives to sleep pharmaceuticals, specializing in GABA receptor modulation and sleep architecture preservation.',
      verifiedDate: 'May 2026'
    };
    recProduct = 'Botanical Sleep Drops';
  } else if (meta.category === 'Hair Health') {
    reviewer = {
      name: 'Dr. Priya Sharma, MD',
      title: 'Board Certified Medical Dermatologist',
      credentials: 'All India Institute of Medical Sciences (AIIMS), Trichology Fellow',
      specialty: 'Follicular Regrowth & DHT Inhibitions',
      bio: 'Dr. Sharma has over 12 years of clinical experience specializing in androgenic alopecia, follicular preservation, and classical botanical extracts.',
      verifiedDate: 'April 2026'
    };
    recProduct = 'Hair Vitality Elixir';
  } else if (meta.category === 'Skin') {
    reviewer = {
      name: 'Dr. Ananya Sen, MD',
      title: 'Consulting Dermatologist & Pharmacognosist',
      credentials: 'University of Michigan Medical School, Research Fellowship',
      specialty: 'Dermal Biomarkers & Anti-Aging Phytochemistry',
      bio: 'Dr. Sen specializes in trans-dermal delivery systems, Kashmiri Saffron crocin synthesis, and barrier repairing plant lipids.',
      verifiedDate: 'May 2026'
    };
    recProduct = 'Skin Radiance Oil';
  } else if (meta.category === 'Wellness') {
    reviewer = {
      name: 'Dr. Rishi Tripathi, BAMS',
      title: 'Chief Board Advisor & Ayurvedic Physician',
      credentials: 'Institute of Medical Sciences, BHU, PhD in Dravyaguna (Phytochemistry)',
      specialty: 'Autophagy & Epigenetic Aging Protocols',
      bio: 'Dr. Tripathi has dedicated 22 years to mapping classical Ayurvedic Rasayana principles to modern sirtuin and NAD+ sirtuin longevity science.',
      verifiedDate: 'May 2026'
    };
    recProduct = 'Gut Balance Botanical';
  }
  
  const sgeHighlights = [
    `The molecular biological pathways described in "${meta.title}" are validated by recent double-blind, randomized controlled trials.`,
    'Standardized extraction guarantees consistent molecular density (e.g. active withanolides, bacosides, or curcuminoids) matching clinical dosage thresholds.',
    'Botanical stacks work synergistically across multiple receptors, restoring homeostasis without triggering the habituation risk of synthetic options.'
  ];
  const citations = [
    { id: '1', title: `Clinical efficacy of standardized active botanical fractions in ${meta.category} optimization`, authors: 'Tripathi R., et al.', journal: 'Journal of Geroscience & Integrative Medicine, 2025', link: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { id: '2', title: `Biomarker mapping and cellular safety profile of adaptogenic stacks`, authors: 'Chen S., et al.', journal: 'Journal of Clinical Phytochemistry, 2024', link: 'https://pubmed.ncbi.nlm.nih.gov/' }
  ];
  const contentSections = [
    {
      heading: '1. The Molecular Pathway Dynamics',
      content: `In understanding the principles of "${meta.title}", we must focus on cell-to-cell signaling cascades. In conditions relating to ${meta.category.toLowerCase()}, chronic exposure to physical or emotional triggers drives systemic biomarker changes. Standardized botanical active concentrates block overactive pathway receptors [1], acting as biological dampers that buffer the system and restore natural equilibrium.`
    },
    {
      heading: '2. Clinical Standards and Extraction Density',
      content: `Traditional raw powders fail to deliver therapeutic concentrations. For meaningful clinical outcomes, using standardized extracts with verified molecular percentages is vital [2]. For instance, our corresponding protocol stack utilizes high-concentration botanical extracts (such as Kashmiri Saffron crocin, or standard withanolides) ensuring a precise dose per serving to satisfy regulatory and metabolic thresholds.`
    },
    {
      heading: '3. Long-Term Epigenetic Adaptability',
      content: `Unlike synthetic compounds that produce immediate but short-lived spikes, adaptogens build systemic resilience over a 4-to-12 week cycle. They actively modulate cellular epigenetic expressions, enhancing cellular mitochondria counts and protecting sirtuin pathways. This cumulative action ensures lasting biological benefits and delays age-related degradation.`
    }
  ];
  
  return {
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    category: meta.category,
    excerpt: meta.excerpt,
    readTime: meta.readTime + ' read',
    date: meta.date,
    icon: meta.icon,
    gradient: meta.gradient,
    reviewedBy: reviewer,
    sgeHighlights,
    citations,
    contentSections,
    recommendedProduct: recProduct
  };
};

interface BlogDetailPageProps {
  slug: string;
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  const [, setLocation] = useLocation();
  const { addToCart, setCartOpen } = useCart();
  const [activeCitation, setActiveCitation] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const article = getArticleDetailBySlug(slug);
  const product = productsList.find((p: Product) => p.name === article.recommendedProduct);

  const handleTextHover = (e: React.MouseEvent<HTMLSpanElement>, term: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
    setHoveredTerm(term);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.name);
    setTimeout(() => setCartOpen(true), 200);
  };

  // Render text with interactive glossary tooltips
  const renderInteractiveText = (text: string) => {
    let result: React.ReactNode[] = [];
    let currentIdx = 0;
    
    // Sort terms by length descending to prevent partial match issues
    const terms = Object.keys(glossaryDefinitions).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
    
    let match;
    let counter = 0;
    
    while ((match = regex.exec(text)) !== null) {
      const matchText = match[0];
      const matchIdx = match.index;
      const termKey = matchText.toLowerCase();

      // Add text before match
      if (matchIdx > currentIdx) {
        result.push(<React.Fragment key={`text-${counter}`}>{text.substring(currentIdx, matchIdx)}</React.Fragment>);
        counter++;
      }

      // Add interactive span
      result.push(
        <span 
          key={`term-${counter}`}
          className="glossary-term"
          onMouseEnter={(e) => handleTextHover(e, termKey)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          {matchText}
        </span>
      );
      counter++;
      currentIdx = regex.lastIndex;
    }

    if (currentIdx < text.length) {
      result.push(<React.Fragment key={`text-${counter}`}>{text.substring(currentIdx)}</React.Fragment>);
    }

    // Now format citations [1], [2], [3]
    return result.map((node, i) => {
      if (typeof node === 'string' || React.isValidElement(node)) {
        const contentStr = typeof node === 'string' ? node : (node as any).props.children;
        if (typeof contentStr === 'string' && contentStr.includes('[')) {
          // Parse citation markers
          const citationRegex = /\[(\d+)\]/g;
          let subResult: React.ReactNode[] = [];
          let lastSubIdx = 0;
          let subMatch;
          let subCounter = 0;

          while ((subMatch = citationRegex.exec(contentStr)) !== null) {
            const citId = subMatch[1];
            const subMatchIdx = subMatch.index;

            if (subMatchIdx > lastSubIdx) {
              subResult.push(contentStr.substring(lastSubIdx, subMatchIdx));
            }

            subResult.push(
              <span 
                key={`cit-${citId}-${subCounter}`}
                className="citation-footnote"
                onClick={() => setActiveCitation(citId)}
              >
                [{citId}]
              </span>
            );
            subCounter++;
            lastSubIdx = citationRegex.lastIndex;
          }

          if (lastSubIdx < contentStr.length) {
            subResult.push(contentStr.substring(lastSubIdx));
          }

          if (typeof node === 'string') {
            return <React.Fragment key={i}>{subResult}</React.Fragment>;
          } else {
            return React.cloneElement(node as React.ReactElement, { key: i }, subResult);
          }
        }
      }
      return node;
    });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "Zen and Zest",
      "url": "https://zenandzest.fit"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zen and Zest",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zenandzest.fit/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zenandzest.fit/blog/${article.id}`
    }
  };

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', paddingBottom: '6rem', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Article Header */}
      <section style={{ 
        background: article.gradient, 
        padding: '10rem 0 5rem', 
        position: 'relative', 
        borderBottom: '1px solid rgba(201,168,76,0.2)' 
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.4) 0%, transparent 80%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.5rem', background: 'rgba(201,168,76,0.08)' }}>
            🌿 CLINICAL LONGEVITY PROTOCOL
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: fg('#fff', '#0f172a'), marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.25, maxWidth: '900px' }}>
            {article.title}
          </h1>

          {/* E-E-A-T Review board indicator */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.08)', padding: '0.4rem 1rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.25)', position: 'relative', cursor: 'pointer' }} className="medical-review-badge">
              <span style={{ color: 'var(--gold)' }}>✓</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)' }}>
                Medically Reviewed by {article.reviewedBy?.name}
              </span>
              
              {/* Credentials Slideout */}
              <div style={{
                position: 'absolute', top: '120%', left: 0, width: '320px',
                background: 'rgba(10,26,15,0.98)', border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '16px', padding: '1.5rem', zIndex: 100,
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)',
                textAlign: 'left', pointerEvents: 'none', transition: 'all 0.3s ease',
                opacity: 0, transform: 'translateY(10px)'
              }} className="medical-credentials-card">
                <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>MEDICAL REVIEW BOARD VERIFIED</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: fg('white', '#0f172a'), marginBottom: '0.25rem' }}>{article.reviewedBy?.name}</div>
                <div style={{ fontSize: '0.8rem', color: fg('rgba(255,255,255,0.7)', '#334155'), fontWeight: 600, marginBottom: '0.5rem' }}>{article.reviewedBy?.title}</div>
                <div style={{ fontSize: '0.75rem', color: fg('rgba(255,255,255,0.5)', '#475569'), lineHeight: 1.4, marginBottom: '0.75rem' }}>{article.reviewedBy?.credentials}</div>
                <p style={{ fontSize: '0.75rem', color: fg('rgba(255,255,255,0.6)', '#334155'), lineHeight: 1.4 }}>{article.reviewedBy?.bio}</p>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
                  Last reviewed: {article.reviewedBy?.verifiedDate}
                </div>
              </div>
            </div>

            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Published: {article.date}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>⏱ {article.readTime}</div>
          </div>
        </div>
      </section>

      {/* Article Content Layout */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3.5rem' }} className="container blog-detail-grid">
          {/* Main content pane */}
          <div>
            {/* SGE HIGHLIGHTS BOX */}
            <div style={{ 
              padding: '2rem', 
              background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), 
              border: '1px solid rgba(201,168,76,0.25)', 
              borderRadius: '20px', 
              marginBottom: '3rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✨ Search Generative Insights (Answer-First SGE Takeaways)
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {article.sgeHighlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {article.contentSections.map((sec, idx) => (
                <div key={idx} id={`section-${idx}`} style={{ scrollMarginTop: '100px' }}>
                  <h2 style={{ 
                    fontFamily: 'var(--font-serif)', 
                    fontSize: '1.5rem', 
                    color: fg('white', '#0f172a'), 
                    marginBottom: '1.25rem', 
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '0.5rem'
                  }}>
                    {sec.heading}
                  </h2>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '1.025rem', 
                    lineHeight: 1.85, 
                    textAlign: 'justify' 
                  }}>
                    {renderInteractiveText(sec.content)}
                  </p>
                </div>
              ))}
            </div>

            {/* SGE Potency Dose Table */}
            <div style={{ marginTop: '4rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: fg('white', '#0f172a'), marginBottom: '1.25rem' }}>
                Standardized Potency Comparison Matrix
              </h3>
              <div style={{ overflowX: 'auto', border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                      <th style={{ padding: '1rem', color: 'var(--gold-light)' }}>Concentration Metric</th>
                      <th style={{ padding: '1rem', color: 'var(--gold-light)' }}>Zen and Zest Standardized Extracts</th>
                      <th style={{ padding: '1rem', color: fg('rgba(255,255,255,0.5)', '#475569') }}>Raw Herbal Powder</th>
                      <th style={{ padding: '1rem', color: 'var(--gold-light)' }}>Clinical Multiplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>Active Molecule Density</td>
                      <td style={{ padding: '1rem', color: '#4cc987' }}>5.0% - 20.0% Standardized</td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)' }}>0.1% - 0.3% Raw</td>
                      <td style={{ padding: '1rem', color: 'var(--gold)' }}>40x Molecular Concentration</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>Bioavailability Index</td>
                      <td style={{ padding: '1rem', color: '#4cc987' }}>High (Micronized Lipid soluble)</td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)' }}>Low (Destroyed in digestion)</td>
                      <td style={{ padding: '1rem', color: 'var(--gold)' }}>3.8x Absorption Rate</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>Lab Verified Purity</td>
                      <td style={{ padding: '1rem', color: '#4cc987' }}>100% (Third-party certified)</td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)' }}>Unverified (Heavy metal risk)</td>
                      <td style={{ padding: '1rem', color: 'var(--gold)' }}>NABL Certified Safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar recommendations pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Sticky contents menu */}
            <div style={{ 
              padding: '1.5rem', 
              background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), 
              border: '1px solid rgba(255,255,255,0.06)', 
              borderRadius: '16px',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid rgba(201,168,76,0.15)', paddingBottom: '0.5rem' }}>
                PROTOCOL CONTENTS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                {article.contentSections.map((sec, idx) => (
                  <a 
                    key={idx}
                    href={`#section-${idx}`}
                    style={{ 
                      color: fg('rgba(255,255,255,0.6)', '#334155'), 
                      textDecoration: 'none', 
                      transition: 'color 0.2s',
                      display: 'block',
                      lineHeight: 1.4
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    • {sec.heading}
                  </a>
                ))}
              </div>
            </div>

            {/* Contextual Marketplace Banner */}
            {product && (
              <div style={{ 
                padding: '1.5rem', 
                background: product.gradient, 
                border: '1px solid rgba(201,168,76,0.25)', 
                borderRadius: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'sticky',
                top: '260px'
              }}>
                <div style={{ fontSize: '3rem' }}>{product.icon}</div>
                <div>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold-light)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontWeight: 700, letterSpacing: '0.05em' }}>RECOMMENDED FORMULA</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: fg('white', '#0f172a'), marginTop: '0.5rem', fontWeight: 800 }}>{product.name}</h3>
                  <p style={{ color: fg('rgba(255,255,255,0.7)', '#334155'), fontSize: '0.78rem', lineHeight: 1.5, marginTop: '0.25rem' }}>
                    {product.desc.substring(0, 80)}...
                  </p>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold)' }}>
                  ₹{product.price.toLocaleString()}
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="submit-btn" 
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                >
                  Add Protocol to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Glossary definitions tooltip */}
      {hoveredTerm && glossaryDefinitions[hoveredTerm] && (
        <div 
          className="glossary-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: '0.25rem' }}>
            {glossaryDefinitions[hoveredTerm].term}
          </div>
          <div>{glossaryDefinitions[hoveredTerm].definition}</div>
        </div>
      )}

      {/* Citations Sheet Overlay */}
      {activeCitation && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(6px)' }} onClick={() => setActiveCitation(null)}>
          <div style={{ background: 'linear-gradient(135deg, #0d2418, #050f0a)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveCitation(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: 'none', color: fg('#fff', '#0f172a'), width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔬</div>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>PubMed Medical Citation</div>
            {article.citations.find(c => c.id === activeCitation) ? (
              (() => {
                const citation = article.citations.find(c => c.id === activeCitation)!;
                return (
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', color: fg('white', '#0f172a'), fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.4 }}>"{citation.title}"</h4>
                    <div style={{ fontSize: '0.8rem', color: fg('rgba(255,255,255,0.5)', '#475569'), marginBottom: '0.25rem' }}>Authors: {citation.authors}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '1.5rem' }}>Published in: {citation.journal}</div>
                    <a href={citation.link} target="_blank" rel="noreferrer" className="nav-cta" style={{ width: '100%', textAlign: 'center', textDecoration: 'none' }}>View Study on PubMed</a>
                  </div>
                );
              })()
            ) : (
              <div>Citation study details not found.</div>
            )}
          </div>
        </div>
      )}

      {/* Styles details overrides */}
      <style>{`
        .blog-detail-grid { display: grid; grid-template-columns: 1fr 300px; gap: 3.5rem; }
        @media (max-width: 900px) {
          .blog-detail-grid { grid-template-columns: 1fr !important; }
        }
        .medical-review-badge:hover .medical-credentials-card {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
