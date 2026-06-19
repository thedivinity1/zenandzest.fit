import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Activity, Heart, Shield, RefreshCw } from 'lucide-react';

const zone2Schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is Zone 2 cardio and how does it promote longevity?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Zone 2 cardio is aerobic exercise at 60-70% of heart rate reserve, where lactate production matches clearing. This intensity triggers PGC-1α pathways for mitochondrial biogenesis, increases cellular ATP efficiency, and improves VO2 max - the strongest predictor of all-cause mortality with up to 5-fold mortality risk reduction."
    }
  }]
};

export default function Zone2CardioPage() {
  const [age, setAge] = useState<number>(35);
  const [rhr, setRhr] = useState<number>(65);
  const [vo2Goal, setVo2Goal] = useState<number>(45);
  const { addToCart, setCartOpen } = useCart();

  // Tanaka Formula for Max Heart Rate: MHR = 208 - (0.7 * Age)
  const mhr = Math.round(208 - (0.7 * age));
  // Heart Rate Reserve: HRR = MHR - RHR
  const hrr = mhr - rhr;
  // Karvonen Zone 2: 60% to 70% of HRR + RHR
  const zone2Low = Math.round((hrr * 0.6) + rhr);
  const zone2High = Math.round((hrr * 0.7) + rhr);

  // Biological VO2 Max Healthspan impact simulation
  const estimatedHealthspanBonus = ((vo2Goal - 30) * 0.4).toFixed(1);

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zone2Schema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Performance & Aerobic Capacity</div>
          <h1 className="section-title">Zone 2 Cardio <span className="gold-gradient-text">Longevity Planner</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Zone 2 cardio is exercise performed at 60–70% of heart rate reserve, where lactate clearance keeps pace with production. This metabolic zone is optimal for triggering PGC-1α pathways and mitochondrial biogenesis, which directly improves VO2 max—the single most powerful biological predictor of longevity.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Scientific Foundation */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '1.25rem', fontWeight: 900 }}>
                Mitochondriogenesis & VO2 Max
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Longevity science identifies **VO2 Max** (maximal oxygen consumption) as one of the single strongest predictors of all-cause mortality. Zone 2 training—aerobic exercise at a intensity where lactate production matches clearing—is the ultimate way to trigger **mitochondrial biogenesis** via **PGC-1α pathways**.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Activity size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Mitochondrial Volume Density</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Zone 2 training specifically forces Type I (slow-twitch) muscle fibers to generate ATP exclusively from fat oxidation, maximizing mitochondrial efficiency.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Heart size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>VO2 Max Healthspan Multiplier</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Moving from the lowest quartile of cardiorespiratory fitness to the highest reduces all-cause mortality risk by up to **5-fold (500%)**.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', width: '48px' }}>
                    <Shield size={24} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Lactate Clearance Pathways</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Upregulates **MCT-1 transporters**, allowing skeletal muscle to recycle lactic acid into fuel and preserving muscle glycogen reserves.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Longevity Reference:</span>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  "Association of Cardiorespiratory Fitness and All-Cause Mortality Among Adults undergoing exercise testing." *JAMA Network Open*, 2026.
                </p>
              </div>
            </div>
          </ScrollAnimator>

          {/* HR & Training Calculator */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', marginBottom: '1.5rem', fontWeight: 900 }}>
                Metabolic Zone Calculator
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Chronological Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Resting Heart Rate (RHR) (BPM)</label>
                  <input
                    type="number"
                    value={rhr}
                    onChange={(e) => setRhr(Math.max(30, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Target VO2 Max Goal (mL/kg/min)</label>
                  <input
                    type="number"
                    value={vo2Goal}
                    onChange={(e) => setVo2Goal(Math.max(10, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                  />
                </div>
              </div>

              {/* Calculator Results */}
              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Target Zone & Projections
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Calculated MHR</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>{mhr} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>bpm</span></div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Est. Healthspan Gain</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', marginTop: '0.25rem' }}>+{estimatedHealthspanBonus} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>yrs</span></div>
                  </div>
                </div>

                <div style={{ background: 'var(--darkest)', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Target Zone 2 Heart Rate Range</span>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gold)', margin: '0.25rem 0' }}>
                    {zone2Low} - {zone2High}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Beats Per Minute (BPM)</span>
                </div>
              </div>

              {/* Mitochondrial Supplement Recommendation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => { addToCart('Mitochondria & ATP Stack'); setCartOpen(true); }}
                  style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🛒 Shop Mitochondria CoQ10/Rhodiola Stack
                </button>
              </div>

            </div>
          </ScrollAnimator>

        </div>

      </div>
    </div>
  );
}
