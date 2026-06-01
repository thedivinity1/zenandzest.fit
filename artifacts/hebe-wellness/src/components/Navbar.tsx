import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../context/CartContext';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, setCartOpen } = useCart();

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
    setDropdownOpen(false);
  }, [location]);

  // Restructured nav links order: Home, Longevity Hub (dropdown), Tools, Blog, Quiz, Case Studies, The Apothecary
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/shop', label: 'The Apothecary' },
  ];

  const portalLinks = [
    { href: '/prakriti-test', label: 'Prakriti Test' },
    { href: '/geroscience-map', label: 'Aging Hallmarks' },
    { href: '/mitochondria-tool', label: 'Mitochondria ATP' },
    { href: '/hpa-burnout', label: 'HPA Burnout' },
    { href: '/dht-block', label: 'Scalp DHT Block' },
    { href: '/gut-restoration', label: 'Gut Akkermansia' },
    { href: '/dermal-crocin', label: 'Saffron Dermal' },
    { href: '/zone2-cardio', label: 'Zone 2 Cardio' },
    { href: '/clinical-trials', label: 'NABL Lab Audits' },
    { href: '/medical-board', label: 'Advisory Council' },
    { href: '/sourcing-index', label: 'CO2 Sourcing' },
    { href: '/rasayana-geroscience', label: 'Rasayana Biology' },
    { href: '/stacking-protocols', label: 'Adaptogen Stacks' },
    { href: '/botanical-dosage', label: 'Dose Auditor' },
    { href: '/epigenetic-clock', label: 'Epigenetic Age' },
    { href: '/circadian-planner', label: 'SCN Planner' },
    { href: '/sleep-debt', label: 'Sleep Deficit' },
    { href: '/wellness-builder', label: 'Ritual Builder' },
    { href: '/lab-intake', label: 'Blood Report Uploader' },
    { href: '/clinical-cases', label: 'Biomarker Archive' }
  ];

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="navbar" style={{ background: 'rgba(8, 15, 12, 0.95)', borderBottom: '1px solid rgba(229, 197, 117, 0.15)' }}>
        <div className="container flex-between" style={{ height: 70 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div className="nav-logo-badge" style={{ background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)', color: 'var(--darkest)' }}>O</div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--gold-light)',
              letterSpacing: '0.02em'
            }}>
              Ojas Sanctuary
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
            {/* Render Home (navLinks[0]) */}
            <Link href={navLinks[0].href} className="nav-link">
              {navLinks[0].label}
            </Link>

            {/* Longevity Hub Dropdown immediately after Home */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 0'
                }}
              >
                Longevity Hub <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(8, 15, 12, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(229, 197, 117, 0.25)',
                  borderRadius: '16px',
                  width: '450px',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  zIndex: 999
                }}>
                  {portalLinks.map(portal => (
                    <Link 
                      key={portal.href} 
                      href={portal.href} 
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(229,197,117,0.1)';
                        e.currentTarget.style.color = 'var(--gold-light)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                      }}
                    >
                      <Sparkles size={10} color="var(--gold)" /> {portal.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Render rest of navLinks: Tools, Blog, Quiz, Case Studies, The Apothecary */}
            {navLinks.slice(1).map(link => (
              <Link key={link.href} href={link.href} className="nav-link" style={{
                color: link.href === '/shop' ? 'var(--gold-light)' : 'rgba(255,255,255,0.85)',
                fontWeight: link.href === '/shop' ? 700 : 600
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(229, 197, 117, 0.25)',
                borderRadius: '100px',
                color: 'var(--gold-light)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(229, 197, 117, 0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)'; }}
              className="nav-cart-btn"
            >
              🛒 Cart ({cartCount})
            </button>
            <Link href="/consult" className="nav-cta nav-cta-desktop" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)', color: 'var(--darkest)' }}>
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
        <div className="mobile-menu" style={{ overflowY: 'auto', maxHeight: '80vh', background: 'rgba(8, 15, 12, 0.98)', borderBottom: '1px solid rgba(229, 197, 117, 0.15)' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link" style={{ fontSize: '1rem', padding: '0.5rem 0' }}>
              {link.label}
            </Link>
          ))}
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.75rem 0', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Longevity Hub Pages
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {portalLinks.map(portal => (
                <Link key={portal.href} href={portal.href} className="nav-link" style={{ fontSize: '0.75rem', padding: '0.25rem 0' }}>
                  {portal.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/consult" className="nav-cta" style={{ textAlign: 'center', marginTop: '1rem', background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)', color: 'var(--darkest)' }}>
            Free Consult
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 500px) {
          .nav-cta-desktop { display: none !important; }
          .nav-cart-btn { padding: 0.4rem 0.6rem !important; font-size: 0.75rem !important; }
        }
      `}</style>
    </>
  );
}
