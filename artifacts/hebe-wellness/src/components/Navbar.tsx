import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="navbar">
        <div className="container flex-between" style={{ height: 70 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div className="nav-logo-badge">H</div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--gold)',
              letterSpacing: '0.02em'
            }}>
              Hebe Wellness
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/consult" className="nav-cta" style={{ display: 'inline-block' }}>
              Free Consult
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.5rem',
                display: 'none',
                padding: '0.25rem'
              }}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link" style={{ fontSize: '1rem', padding: '0.5rem 0' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/consult" className="nav-cta" style={{ textAlign: 'center' }}>
            Free Consult
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
