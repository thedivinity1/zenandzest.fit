import { Link } from 'wouter';
import { useTheme } from '../context/ThemeContext';

/* ===== ZEN AND ZEST SVG LOGO (Footer variant) ===== */
function FooterLogo({ size = 36, light = false }: { size?: number; light?: boolean }) {
  const gold = '#c9a84c';
  const accent = light ? '#1a3d2e' : '#e5c575';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke={gold} strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeDasharray="240 25" strokeDashoffset="15"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.9"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.85" transform="rotate(45 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.85" transform="rotate(-45 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.7" transform="rotate(90 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.7" transform="rotate(-90 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.5" transform="rotate(135 50 58)"/>
      <ellipse cx="50" cy="58" rx="8" ry="18" fill={gold} opacity="0.5" transform="rotate(-135 50 58)"/>
      <circle cx="50" cy="50" r="12" fill={light ? '#1a3d2e' : '#050908'}/>
      <circle cx="50" cy="50" r="8" fill={gold}/>
      <path d="M72 26 C76 20 78 13 73 7 C82 15 84 26 77 34 C82 26 84 15 77 8 C88 19 89 32 80 40 C77 43 70 45 65 42 C72 36 75 28 72 26Z" fill={accent} opacity="0.95"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { isDark } = useTheme();

  const footerBg = isDark ? 'var(--darkest)' : '#f0f7f1';
  const footerBorder = isDark ? '1px solid rgba(201, 168, 76, 0.15)' : '1px solid rgba(26, 61, 46, 0.12)';
  const textColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,31,23,0.55)';
  const headingColor = isDark ? 'var(--gold)' : 'var(--forest-green)';
  const linkColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,31,23,0.55)';
  const certBg = isDark ? 'rgba(229,197,117,0.06)' : 'rgba(26,61,46,0.06)';
  const certBorder = isDark ? 'rgba(229,197,117,0.15)' : 'rgba(26,61,46,0.15)';
  const certColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,31,23,0.65)';
  const disclaimerBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const disclaimerColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,31,23,0.45)';
  const socialBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,61,46,0.07)';
  const logoText = isDark ? 'var(--gold-light)' : 'var(--forest-green)';
  const domainText = isDark ? 'rgba(229,197,117,0.6)' : 'rgba(26,61,46,0.5)';

  return (
    <footer className="footer" style={{ borderTop: footerBorder, background: footerBg }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
              <FooterLogo size={40} light={!isDark} />
              <div>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  color: logoText, fontWeight: 900, fontSize: '1.15rem', lineHeight: 1.1
                }}>
                  Zen and Zest
                </div>
                <div style={{
                  fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: domainText
                }}>
                  zenandzest.fit
                </div>
              </div>
            </div>
            <p style={{ color: textColor, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              India's premier botanical wellness collective, combining ancient Ayurvedic wisdom with modern life-extending science.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%', background: socialBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', textDecoration: 'none', transition: 'background 0.2s', cursor: 'pointer'
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 style={{ color: headingColor, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              The Apothecary
            </h4>
            {['Botanical Sleep Drops', 'Adaptogenic Stress Relief', 'Hair Vitality Elixir', 'Skin Radiance Oil', 'Gut Balance Botanical'].map(p => (
              <Link key={p} href="/shop" className="footer-link" style={{ color: linkColor }}>{p}</Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: headingColor, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Resources
            </h4>
            {[
              { label: 'Blog', href: '/blog' },
              { label: 'Wellness Tools', href: '/tools' },
              { label: 'Wellness Quiz', href: '/quiz' },
              { label: 'Knowledge Library', href: '/resources' },
              { label: 'About Us', href: '/about' },
              { label: 'Consult an Expert', href: '/consult' }
            ].map(link => (
              <Link key={link.href} href={link.href} className="footer-link" style={{ color: linkColor }}>{link.label}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: headingColor, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Legal &amp; Trust
            </h4>
            {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Lab Reports', 'FSSAI Certificate', 'Shipping Policy'].map(l => (
              <a key={l} href="#" className="footer-link" style={{ color: linkColor }}>{l}</a>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          padding: '1.5rem 0',
          borderTop: `1px solid ${disclaimerBorder}`,
          borderBottom: `1px solid ${disclaimerBorder}`,
          marginBottom: '2rem'
        }}>
          {[
            { icon: '🏛️', text: 'Ministry of Ayush Licensed' },
            { icon: '🔬', text: 'NABL Accredited Labs' },
            { icon: '✅', text: 'FSSAI Certified' },
            { icon: '🌿', text: 'GMP Manufactured' },
            { icon: '🛡️', text: 'ISO 9001:2015' }
          ].map((cert, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', background: certBg,
              border: `1px solid ${certBorder}`, borderRadius: '100px',
              fontSize: '0.8rem', color: certColor
            }}>
              <span>{cert.icon}</span>
              <span>{cert.text}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer" style={{ color: disclaimerColor, borderTopColor: disclaimerBorder }}>
          <p>
            <strong style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,31,23,0.5)' }}>Disclaimer:</strong> The products and statements on this website have not been evaluated by the Food Safety and Standards Authority of India (FSSAI) for treating, curing, or preventing any disease. Zen and Zest products are food supplements and are not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult a qualified healthcare professional before starting any supplement regimen. Individual results may vary.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            FSSAI License No.: 10019022003840 · Registered Address: Zen and Zest Pvt. Ltd., Gurugram, Haryana 122002, India
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            © {year} Zen and Zest Pvt. Ltd. All rights reserved. Botanical formulations are compliant with all applicable Indian laws and regulations.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
