import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';

/* ===== ZEN AND ZEST SVG LOGO ===== */
function ZenZestLogo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const gold = light ? '#c9a84c' : '#e5c575';
  const accent = light ? '#1a3d2e' : '#e5c575';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer enso circle — open at top right for "zen" incompleteness */}
      <circle cx="50" cy="50" r="42" stroke={gold} strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeDasharray="240 25" strokeDashoffset="15"/>
      {/* Lotus petals */}
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.9"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.85" transform="rotate(45 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.85" transform="rotate(-45 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.7" transform="rotate(90 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.7" transform="rotate(-90 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.5" transform="rotate(135 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.5" transform="rotate(-135 50 58)"/>
      {/* Lotus center */}
      <circle cx="50" cy="50" r="12" fill={light ? '#1a3d2e' : '#050908'}/>
      <circle cx="50" cy="50" r="8" fill={gold}/>
      {/* Spark/flame (zest) — top right sparkle */}
      <path d="M72 26 C76 20 78 13 73 7 C82 15 84 26 77 34 C82 26 84 15 77 8 C88 19 89 32 80 40 C77 43 70 45 65 42 C72 36 75 28 72 26Z" fill={accent} opacity="0.95"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, setCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/longevity-hub', label: 'Longevity Hub' },
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/shop', label: 'The Apothecary' },
    { href: 'https://wa.me/919876543210', label: 'WhatsApp', external: true },
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

  // Dynamic colors based on theme
  const navBg = isDark ? 'rgba(8, 15, 12, 0.95)' : 'rgba(254, 252, 247, 0.96)';
  const navBorder = isDark ? '1px solid rgba(229, 197, 117, 0.15)' : '1px solid rgba(26, 61, 46, 0.15)';
  const navTextColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 31, 23, 0.85)';
  const dropdownBg = isDark ? 'rgba(8, 15, 12, 0.98)' : 'rgba(254, 252, 247, 0.98)';
  const dropdownBorder = isDark ? 'rgba(229, 197, 117, 0.25)' : 'rgba(26, 61, 46, 0.2)';
  const dropdownLinkColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(15,31,23,0.8)';
  const mobileMenuBg = isDark ? 'rgba(8, 15, 12, 0.98)' : 'rgba(254, 252, 247, 0.98)';
  const mobileMenuBorder = isDark ? 'rgba(229, 197, 117, 0.15)' : 'rgba(26, 61, 46, 0.15)';
  const cartBtnBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(26, 61, 46, 0.07)';
  const cartBtnBorder = isDark ? 'rgba(229, 197, 117, 0.25)' : 'rgba(201, 168, 76, 0.35)';
  const cartBtnColor = isDark ? 'var(--gold-light)' : 'var(--forest-green)';

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="navbar" style={{ background: navBg, borderBottom: navBorder }}>
        <div className="container flex-between" style={{ height: 70 }}>
          {/* === LOGO === */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <ZenZestLogo size={44} light={!isDark} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 900,
                fontSize: '1.2rem',
                color: isDark ? 'var(--gold-light)' : 'var(--forest-green)',
                letterSpacing: '0.02em',
                lineHeight: 1.1
              }}>
                Zen and Zest
              </span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(229, 197, 117, 0.6)' : 'rgba(26, 61, 46, 0.55)',
                lineHeight: 1
              }}>
                zenandzest.fit
              </span>
            </div>
          </Link>

          {/* === DESKTOP NAV === */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
            <Link href={navLinks[0].href} className="nav-link" style={{ color: navTextColor }}>
              {navLinks[0].label}
            </Link>

            {/* Longevity Hub Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/longevity-hub"
                style={{
                  background: 'none', border: 'none', color: navTextColor,
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  padding: '0.5rem 0', textDecoration: 'none', transition: 'color 0.2s'
                }}
              >
                Longevity Hub <ChevronDown size={14} />
              </Link>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  background: dropdownBg, backdropFilter: 'blur(20px)',
                  border: `1px solid ${dropdownBorder}`,
                  borderRadius: '16px', width: '450px', padding: '1.25rem',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
                  boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.12)',
                  zIndex: 999
                }}>
                  {portalLinks.map(portal => (
                    <Link
                      key={portal.href}
                      href={portal.href}
                      style={{
                        color: dropdownLinkColor, textDecoration: 'none', fontSize: '0.8rem',
                        padding: '0.4rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', gap: '0.35rem'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = isDark ? 'rgba(229,197,117,0.1)' : 'rgba(26,61,46,0.08)';
                        e.currentTarget.style.color = isDark ? 'var(--gold-light)' : 'var(--forest-green)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = dropdownLinkColor;
                      }}
                    >
                      <Sparkles size={10} color="var(--gold)" /> {portal.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Rest of nav links */}
            {navLinks.slice(1).filter(link => link.href !== '/longevity-hub').map(link => (
              <Link key={link.href} href={link.href} className="nav-link" target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} style={{
                color: link.href === '/shop' ? 'var(--gold)' : navTextColor,
                fontWeight: link.href === '/shop' ? 700 : 600,
                display: 'flex', alignItems: 'center', gap: '0.3rem'
              }}>
                {link.external && '💬 '}
                {link.label}
              </Link>
            ))}
          </div>

          {/* === RIGHT CONTROLS === */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(26,61,46,0.08)',
                border: isDark ? '1px solid rgba(229,197,117,0.2)' : '1px solid rgba(26,61,46,0.18)',
                borderRadius: '100px',
                color: isDark ? 'var(--gold-light)' : 'var(--forest-green)',
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
                flexShrink: 0
              }}
              id="theme-toggle-btn"
              aria-label="Toggle light/dark mode"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isDark
                  ? 'rgba(229,197,117,0.15)'
                  : 'rgba(26,61,46,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) rotate(12deg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = isDark
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(26,61,46,0.08)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: cartBtnBg, border: `1px solid ${cartBtnBorder}`,
                borderRadius: '100px', color: cartBtnColor, fontWeight: 600,
                fontSize: '0.85rem', padding: '0.5rem 1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isDark
                  ? 'rgba(229, 197, 117, 0.1)'
                  : 'rgba(26, 61, 46, 0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = cartBtnBg;
              }}
              className="nav-cart-btn"
            >
              🛒 Cart ({cartCount})
            </button>

            <Link href="/consult" className="nav-cta nav-cta-desktop" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)',
              color: 'var(--darkest)'
            }}>
              Free Consult
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none', border: 'none', color: isDark ? 'white' : 'var(--forest-green)',
                cursor: 'pointer', fontSize: '1.5rem', display: 'none', padding: '0.25rem'
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
        <div className="mobile-menu" style={{
          overflowY: 'auto', maxHeight: '80vh',
          background: mobileMenuBg,
          borderBottom: `1px solid ${mobileMenuBorder}`
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link" style={{
              fontSize: '1rem', padding: '0.5rem 0',
              color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(15,31,23,0.85)'
            }}>
              {link.label}
            </Link>
          ))}

          <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, margin: '0.75rem 0', paddingTop: '0.75rem' }}>
            <span style={{
              fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.08em',
              textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem'
            }}>
              Longevity Hub Pages
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {portalLinks.map(portal => (
                <Link key={portal.href} href={portal.href} className="nav-link" style={{
                  fontSize: '0.75rem', padding: '0.25rem 0',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,31,23,0.7)'
                }}>
                  {portal.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme toggle in mobile menu */}
          <button
            onClick={toggleTheme}
            style={{
              background: isDark ? 'rgba(229,197,117,0.1)' : 'rgba(26,61,46,0.08)',
              border: `1px solid ${isDark ? 'rgba(229,197,117,0.3)' : 'rgba(26,61,46,0.2)'}`,
              borderRadius: '100px',
              color: isDark ? 'var(--gold)' : 'var(--forest-green)',
              padding: '0.6rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
              width: '100%', justifyContent: 'center', marginTop: '0.5rem'
            }}
          >
            {isDark ? <><Sun size={15} /> Switch to Light Mode</> : <><Moon size={15} /> Switch to Dark Mode</>}
          </button>

          <Link href="/consult" className="nav-cta" style={{
            textAlign: 'center', marginTop: '0.75rem',
            background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)',
            color: 'var(--darkest)'
          }}>
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
