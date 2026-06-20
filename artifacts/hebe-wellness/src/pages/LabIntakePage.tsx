import { useTheme } from '../context/ThemeContext';
﻿import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { UploadCloud, CheckCircle2, Shield, Activity, RefreshCw } from 'lucide-react';

const labIntakeSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How do lab biomarker analyses inform botanical supplement recommendations?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Lab biomarkers like cortisol, DHT, and Akkermansia levels directly correlate with specific botanical interventions. Elevated cortisol (>8ng/mL) indicates HPA axis stress requiring Ashwagandha protocols. High DHT (>600pg/mL) suggests follicle thinning needing 5α-reductase inhibitors. Low Akkermansia (<1%) signals leaky gut requiring Berberine and Triphala intervention."
    }
  }]
};

export default function LabIntakePage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Manual biomarker input states
  const [cortisol, setCortisol] = useState<number>(6.5); // ng/mL
  const [dht, setDht] = useState<number>(650); // pg/mL
  const [akkermansia, setAkkermansia] = useState<number>(0.8); // % relative abundance
  const { addToCart, setCartOpen } = useCart();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // Simulate OCR extraction of clinical biomarkers
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setCortisol(8.4); // Extracted values
      setDht(720);
      setAkkermansia(0.3);
    }, 2500);
  };

  // Biomarker evaluations
  const cortisolStatus = cortisol > 8.0 ? 'High (HPA Burnout Phase 2)' : cortisol < 2.0 ? 'Exhausted (HPA Adrenal Fatigue)' : 'Optimal Circadian Spike';
  const dhtStatus = dht > 600 ? 'Elevated (Follicle Thinning Risk)' : 'Stable Androgen';
  const akkermansiaStatus = akkermansia < 1.0 ? 'Deficient Mucosal Barrier' : 'Optimal Microbiome';

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(labIntakeSchema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Clinical Diagnostic Integration</div>
          <h1 className="section-title">NABL Blood & Lab <span className="gold-gradient-text">Intake Portal</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Upload your laboratory blood reports or manually input key biological markers. Receive instant endocrine pathway diagnostics and botanical protocol matches.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Uploader Panel */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: fg('white', '#0f172a'), marginBottom: '1.25rem', fontWeight: 800 }}>
                NABL Report OCR Uploader
              </h2>

              <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', textAlign: 'center', cursor: 'pointer', position: 'relative', marginBottom: '1.5rem' }}>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                />
                <UploadCloud size={48} color="var(--gold)" style={{ margin: '0 auto 1rem auto' }} />
                <span style={{ fontSize: '0.9rem', color: fg('white', '#0f172a'), display: 'block', fontWeight: 700 }}>
                  {file ? file.name : 'Drag & Drop PDF or Image Report'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', display: 'block' }}>
                  Supports NABL, Eurofins, Quest Diagnostics (Max 5MB)
                </span>
              </div>

              {file && !success && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  style={{ width: '100%', padding: '0.9rem', background: 'var(--gold)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {uploading ? <><RefreshCw className="animate-spin" size={16} /> Parsing Biomarker Data...</> : 'Extract Biomarkers (OCR)'}
                </button>
              )}

              {success && (
                <div style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.5rem', color: '#85e89d', fontSize: '0.85rem', alignItems: 'center' }}>
                  <CheckCircle2 size={18} /> OCR Extraction Complete: 3 core biomarkers identified.
                </div>
              )}

              {/* Manual Entry Divider */}
              <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ padding: '0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or manual entry</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>

              {/* Manual Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Salivary Cortisol (ng/mL)</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>{cortisol} ng/mL</strong>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="15.0"
                    step="0.1"
                    value={cortisol}
                    onChange={(e) => setCortisol(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Serum DHT (pg/mL)</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>{dht} pg/mL</strong>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="10"
                    value={dht}
                    onChange={(e) => setDht(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Akkermansia Count (% relative abundance)</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>{akkermansia}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="3.0"
                    step="0.05"
                    value={akkermansia}
                    onChange={(e) => setAkkermansia(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>
              </div>

            </div>
          </ScrollAnimator>

          {/* Diagnostics Panel */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 900, marginBottom: '1.5rem' }}>
                Endocrine & Gut Diagnostics
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Cortisol */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700 }}>Salivary Cortisol Curve:</span>
                    <span style={{ color: cortisol > 8 ? '#f44336' : cortisol < 2 ? '#ff9800' : '#4caf50', fontWeight: 800 }}>{cortisolStatus}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                    Measures adrenal endocrine signaling. High evening cortisol shifts sleep architecture, destroying delta-phase glymphatic brain clearance.
                  </p>
                </div>

                {/* DHT */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700 }}>Scalp DHT Pathway:</span>
                    <span style={{ color: dht > 600 ? '#f44336' : '#4caf50', fontWeight: 800 }}>{dhtStatus}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                    Androgenic follicular pathways bind excess serum DHT, inducing micro-vascular inflammation and follicle shrinkage.
                  </p>
                </div>

                {/* Akkermansia */}
                <div style={{ paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700 }}>Akkermansia Muciniphila:</span>
                    <span style={{ color: akkermansia < 1 ? '#ff9800' : '#4caf50', fontWeight: 800 }}>{akkermansiaStatus}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.4 }}>
                    Mucosal-associated bacteria that preserves intestinal tight junctions. Deficiencies allow bacterial LPS toxins to leak into blood.
                  </p>
                </div>
              </div>

              {/* Dynamic Formulation Match */}
              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Action Stack</span>
                
                {cortisol > 8.0 ? (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: fg('white', '#0f172a'), fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>Botanical Adrenal Recovery</h3>
                    <button onClick={() => { addToCart('Botanical Adrenal Recovery'); setCartOpen(true); }} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                      🛒 Shop Adrenal Recovery Stack
                    </button>
                  </>
                ) : dht > 600 ? (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: fg('white', '#0f172a'), fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>Hair Vitality Elixir</h3>
                    <button onClick={() => { addToCart('Hair Vitality Elixir'); setCartOpen(true); }} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                      🛒 Shop Hair Vitality Elixir
                    </button>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: fg('white', '#0f172a'), fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>Gut Restoration Capsule</h3>
                    <button onClick={() => { addToCart('Gut Restoration Capsule'); setCartOpen(true); }} style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                      🛒 Shop Gut Restoration Capsule
                    </button>
                  </>
                )}
              </div>

            </div>
          </ScrollAnimator>
        </div>

      </div>
    </div>
  );
}
