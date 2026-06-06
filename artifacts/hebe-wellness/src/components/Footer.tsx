import { Link } from 'wouter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(229, 197, 117, 0.15)', background: 'var(--darkest)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div className="nav-logo-badge" style={{ background: 'linear-gradient(135deg, #e5c575 0%, #c9a84c 50%, #d97706 100%)', color: 'var(--darkest)' }}>Z</div>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--gold-light)', fontWeight: 700, fontSize: '1.2rem' }}>
                My Zen and Zest
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              India's premier botanical wellness collective, combining ancient Ayurvedic wisdom with modern life-extending science.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              The Apothecary
            </h4>
            {['Botanical Sleep Drops', 'Adaptogenic Stress Relief', 'Hair Vitality Elixir', 'Skin Radiance Oil', 'Gut Balance Botanical'].map(p => (
              <Link key={p} href="/shop" className="footer-link">{p}</Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
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
              <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Legal & Trust
            </h4>
            {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Lab Reports', 'FSSAI Certificate', 'Shipping Policy'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          padding: '1.5rem 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              padding: '0.5rem 1rem',
              background: 'rgba(229,197,117,0.06)',
              border: '1px solid rgba(229,197,117,0.15)',
              borderRadius: '100px',
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)'
            }}>
              <span>{cert.icon}</span>
              <span>{cert.text}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Disclaimer:</strong> The products and statements on this website have not been evaluated by the Food Safety and Standards Authority of India (FSSAI) for treating, curing, or preventing any disease. My Zen and Zest products are food supplements and are not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult a qualified healthcare professional before starting any supplement regimen. Individual results may vary.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            FSSAI License No.: 10019022003840 · Registered Address: My Zen and Zest Pvt. Ltd., Gurugram, Haryana 122002, India
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            © {year} My Zen and Zest Pvt. Ltd. All rights reserved. Botanical formulations are compliant with all applicable Indian laws and regulations.
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
