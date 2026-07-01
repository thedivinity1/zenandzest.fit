import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { Link } from 'wouter';
import { articleDataList } from './articlesData';

export const allArticles = [
  ...Object.values(articleDataList).map(art => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    category: art.category,
    excerpt: art.excerpt,
    readTime: art.readTime.replace(' read', ''),
    date: art.date,
    icon: art.icon,
    gradient: art.gradient
  }))
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
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allArticles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh' }}>
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
                <Link key={a.id} href={`/blog/${a.slug}`} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div className="blog-card" style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <div style={{ height: '160px', background: a.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      {a.icon}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.25))' }} />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: bg('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), borderRadius: '100px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: fg('rgba(255,255,255,0.7)', '#334155') }}>{a.readTime}</div>
                    </div>
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ background: `${catTagColors[a.category] || '#1a3d2e'}55`, color: 'var(--gold-light)', padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em' }}>{a.category.toUpperCase()}</span>
                        <span style={{ color: fg('rgba(255,255,255,0.3)', '#64748b'), fontSize: '0.72rem' }}>{a.date}</span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: fg('#fff', '#0f172a'), lineHeight: 1.5, marginBottom: '0.75rem', fontWeight: 700, flex: 1 }}>{a.title}</h2>
                      <p style={{ color: fg('rgba(255,255,255,0.48)', '#475569'), fontSize: '0.83rem', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.25rem' }}>{a.excerpt}</p>
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
          <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), marginBottom: '2rem', lineHeight: 1.75 }}>Join 50,000+ subscribers. New clinical insights delivered every week.</p>
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
