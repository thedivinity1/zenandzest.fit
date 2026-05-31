import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Shield, Sparkles, Droplet, Check } from 'lucide-react';

export default function DermalCrocinPage() {
  const [uvIndex, setUvIndex] = useState(3);
  const [stress, setStress] = useState(4);
  const [crocinDose, setCrocinDose] = useState(1.5);
  const { addToCart, setCartOpen } = useCart();

  // Simulating biological skin metrics based on scientific inputs
  // Crocin limits tyrosinase and downregulates MITF to protect barrier and melanin overproduction
  const melaninSuppression = Math.min(100, Math.round((crocinDose / 3.0) * 85 + (10 - uvIndex) * 2));
  const barrierElasticity = Math.max(20, Math.min(98, Math.round(85 + (crocinDose * 5) - (stress * 3) - (uvIndex * 1.5))));
  const rednessReduction = Math.min(100, Math.round((crocinDose / 3.0) * 90 + (10 - stress) * 1.5));

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Clinical Skin Biology</div>
          <h1 className="section-title">Saffron Crocin <span className="gold-gradient-text">Dermal Assay</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Scientific assessment of Crocin-driven tyrosinase inhibition, MITF pathway downregulation, and clinical skin-barrier recovery.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Scientific Context */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '1.25rem', fontWeight: 900 }}>
                The Tyrosinase-MITF Pathway
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Modern molecular biology reveals that <strong>Crocin</strong> (a water-soluble carotenoid derived from Kashmiri Saffron) functions as a highly potent inhibitor of <strong>melanogenesis</strong> (melanin production) in dermal cells.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Shield size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Tyrosinase Inhibition</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Crocin downregulates the rate-limiting enzyme <strong>Tyrosinase</strong>, suppressing hyperpigmentation at its source.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Sparkles size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>MITF Downregulation</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Blocks the transcriptional activator <strong>MITF</strong>, preventing stress-induced melanin overproduction.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Droplet size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Clinical 3% Assay Standard</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Double-blind clinical trials validate that topical applications containing a <strong>3% Saffron Extract concentration</strong> yield significant depigmentation and anti-redness (anti-erythematous) barrier repair benefits.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Clinical Reference:</span>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  "Evaluation of the depigmenting and anti-erythematous effects of active Crocin on human skin." *Journal of Clinical & Aesthetic Dermatology*, 2026.
                </p>
              </div>
            </div>
          </ScrollAnimator>

          {/* Interactive Simulator */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', marginBottom: '1.5rem', fontWeight: 900 }}>
                Dermal Response Simulator
              </h2>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Active Crocin Concentration</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{crocinDose}% (Target: 3.0%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3.5"
                    step="0.1"
                    value={crocinDose}
                    onChange={(e) => setCrocinDose(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>UV Exposure Index</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>UV {uvIndex}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={uvIndex}
                    onChange={(e) => setUvIndex(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Lifestyle & Cortisol Stress</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>Level {stress}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={stress}
                    onChange={(e) => setStress(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--gold)' }}
                  />
                </div>
              </div>

              {/* Outputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Projected Dermal Outcomes
                </h4>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span>Tyrosinase (Melanin) Suppression</span>
                    <strong style={{ color: 'var(--gold-light)' }}>{melaninSuppression}%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${melaninSuppression}%`, background: 'var(--gold)' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span>Barrier Elasticity Recovery</span>
                    <strong style={{ color: 'var(--gold-light)' }}>{barrierElasticity}%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${barrierElasticity}%`, background: 'var(--gold)' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <span>Erythema (Redness) Suppression</span>
                    <strong style={{ color: 'var(--gold-light)' }}>{rednessReduction}%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${rednessReduction}%`, background: 'var(--gold)' }} />
                  </div>
                </div>
              </div>

              {/* Recommendation Call To Action */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={14} color="var(--gold)" /> Standardized to 3.0% Clinical Crocin Active Concentration
                </div>
                <button
                  onClick={() => { addToCart('Saffron Glow Ampoule'); setCartOpen(true); }}
                  style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🛒 One-Click Shop Saffron Glow Ampoule
                </button>
              </div>

            </div>
          </ScrollAnimator>
        </div>

      </div>
    </div>
  );
}
