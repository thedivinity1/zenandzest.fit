import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Clock, Info, CheckCircle2, ChevronRight } from 'lucide-react';

const sleepDebtSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much sleep debt is dangerous and how do you repay it?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Sleep debt exceeding 4 hours weekly triggers HPA axis stress and impairs glymphatic brain clearing. Repayment requires extending sleep by 30-45 minutes nightly plus NSDR sessions. Severe debt (>10 hours) may take 3 weeks to recover. Sleep drops and magnesium glycinate support delta slow-wave cycle restoration."
    }
  }]
};

export default function SleepDebtPage() {
  const [targetHours, setTargetHours] = useState<number>(8);
  const [sleepLogs, setSleepLogs] = useState<number[]>([6, 5.5, 7, 6.5, 5, 6, 7]); // Last 7 days
  const { addToCart, setCartOpen } = useCart();

  const handleLogChange = (idx: number, hours: number) => {
    const next = [...sleepLogs];
    next[idx] = Math.max(0, Math.min(24, hours));
    setSleepLogs(next);
  };

  // Calculations
  const totalActual = sleepLogs.reduce((a, b) => a + b, 0);
  const totalTarget = targetHours * 7;
  const sleepDebt = Math.max(0, totalTarget - totalActual);

  // Recommendations
  let severity = 'Low Debt';
  let color = '#4caf50';
  let repaymentWeeks = 1;
  let repaymentAdvice = 'Your sleep debt is minimal. Maintain a stable circadian window and dim screens 1 hour before sleeping to preserve delta slow-wave efficiency.';

  if (sleepDebt > 10) {
    severity = 'Severe Sleep Deficit ⚠️';
    color = '#f44336';
    repaymentWeeks = 3;
    repaymentAdvice = 'You are experiencing chronic cortical sleep deprivation. High systemic cortisol levels are impairing DNA repair and metabolic clearance. We suggest extending your sleep window by 45 minutes nightly, taking 2 drops of Botanical Sleep Drops, and doing a 20-minute Non-Sleep Deep Rest (NSDR) session daily.';
  } else if (sleepDebt > 4) {
    severity = 'Moderate Sleep Deficit';
    color = '#ff9800';
    repaymentWeeks = 2;
    repaymentAdvice = 'You have accumulated a moderate sleep deficit. Upregulate slow-wave delta cycles by taking Magnesium Glycinate and standardizing your waking window to reset your hypothalamic-pituitary axis.';
  }

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepDebtSchema) }} />
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Circadian & Delta Sleep Recovery</div>
          <h1 className="section-title">Sleep Debt <span className="gold-gradient-text">Optimizer</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Log your weekly sleep hours and calculate your biological sleep deficit. Design a structured recovery schedule to restore brain cell clearing (glymphatic pathway).
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Logs Inputs */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'white', marginBottom: '1.25rem', fontWeight: 800 }}>
                Weekly Sleep Logs
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Target Sleep Hours Per Night</label>
                <input
                  type="number"
                  min="5"
                  max="10"
                  value={targetHours}
                  onChange={(e) => setTargetHours(Math.max(1, parseInt(e.target.value) || 0))}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block' }}>Actual Sleep Hours Logged (Last 7 Days)</label>
                {sleepLogs.map((hours, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Day {idx + 1}</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="24"
                      value={hours}
                      onChange={(e) => handleLogChange(idx, parseFloat(e.target.value) || 0)}
                      style={{ width: '80px', padding: '0.4rem', background: 'var(--darkest)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', textAlign: 'center', fontSize: '0.85rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>

          {/* Calculations & Advice */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 900, marginBottom: '1.5rem' }}>
                Biological Sleep Debt Report
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Logged Sleep</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>{totalActual} <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>hrs</span></div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Sleep Deficit</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: color, marginTop: '0.25rem' }}>{sleepDebt} <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>hrs</span></div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Deficit Level:</span>
                  <strong style={{ color: color }}>{severity}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>Est. Repayment Window:</span>
                  <strong style={{ color: 'white' }}>{repaymentWeeks} Weeks</strong>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {repaymentAdvice}
              </p>

              {/* Repayment Action List */}
              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                  🛡 Recovery Actions:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    <ChevronRight size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} /> Add 30-45 mins of sleep extension per night.
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    <ChevronRight size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} /> Execute 20 minutes of NSDR or Yoga Nidra in the afternoon.
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    <ChevronRight size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} /> Take Botanical Sleep Drops 1 hour before bedtime.
                  </div>
                </div>
              </div>

              {/* Shop Sleep Drops */}
              <button
                onClick={() => { addToCart('Botanical Sleep Drops'); setCartOpen(true); }}
                style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
              >
                🛒 Shop Botanical Sleep Drops
              </button>

            </div>
          </ScrollAnimator>

        </div>

      </div>
    </div>
  );
}
