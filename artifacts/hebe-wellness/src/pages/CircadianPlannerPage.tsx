import { useTheme } from '../context/ThemeContext';
﻿import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Sun, Moon, Coffee, ShieldAlert, Award, Clock } from 'lucide-react';

const circadianSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does circadian rhythm affect burnout and HPA axis?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Misaligned circadian rhythms disrupt the HPA axis by altering cortisol release, which can lead directly to systemic burnout and metabolic fatigue."
    }
  }]
};

export default function CircadianPlannerPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  const [wakingTime, setWakingTime] = useState<string>('06:00');
  const { addToCart, setCartOpen } = useCart();

  // Helper to add hours to waking time
  const getCircadianHour = (timeStr: string, addHours: number): string => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    date.setHours(date.getHours() + addHours);
    return date.toTimeString().slice(0, 5);
  };

  // Circadian window schedules
  const carPulseWindow = `${wakingTime} - ${getCircadianHour(wakingTime, 1)}`;
  const caffeineCutoff = getCircadianHour(wakingTime, 6);
  const eveningDimWindow = getCircadianHour(wakingTime, 14);
  const melatoninPriming = getCircadianHour(wakingTime, 15.5);
  const bedTime = getCircadianHour(wakingTime, 16.5);

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(circadianSchema) }} />
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Circadian Mastery & Wellness</div>
          <h1 className="section-title">Circadian Rhythm <span className="gold-gradient-text">Mastery Planner</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> A stable circadian rhythm is the foundation of longevity and wellness. Align your sleep-wake schedule with your central master pacemaker (Suprachiasmatic Nucleus) using light pulses, caffeine cutoffs, and melatonin priming to prevent burnout and support the HPA axis.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Inputs Panel */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: fg('white', '#0f172a'), marginBottom: '1.25rem', fontWeight: 800 }}>
                Set Sleep Parameters
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.5rem' }}>Target Waking Hour</label>
                <input
                  type="time"
                  value={wakingTime}
                  onChange={(e) => setWakingTime(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: bg('var(--darkest)', '#f8fafc'), border: bg('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), borderRadius: '10px', color: fg('white', '#0f172a'), fontSize: '1.1rem', textAlign: 'center' }}
                />
              </div>

              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px dashed rgba(201,168,76,0.3)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--gold-light)', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Award size={14} /> The SCN Pacemaker
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Waking and light exposure at a fixed time anchors your body's temperature and cortisol curves, driving high daytime alertness and strong melatonin release at night.
                </p>
              </div>

              <button
                onClick={() => { addToCart('Botanical Sleep Drops'); setCartOpen(true); }}
                style={{ width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}
              >
                🛒 Add Botanical Sleep Drops
              </button>
            </div>
          </ScrollAnimator>

          {/* Timeline Planner */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', fontWeight: 900, marginBottom: '1.5rem' }}>
                Your Personalized Biological Day
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Visual timeline vertical line */}
                <div style={{ position: 'absolute', top: '0.5rem', bottom: '0.5rem', left: '6px', width: '2px', background: 'rgba(201,168,76,0.2)' }} />

                {/* CAR Pulse */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-29px', top: '2px', background: 'var(--gold-dark)', border: '2px solid var(--darkest)', borderRadius: '100px', width: '14px', height: '14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sun size={16} color="var(--gold-light)" /> Cortisol CAR Pulse Window
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 700 }}>{carPulseWindow}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Get 10-15 minutes of outdoor sunlight exposure. This triggers high morning cortisol release, resetting your biological clock.
                  </p>
                </div>

                {/* Caffeine Cutoff */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-29px', top: '2px', background: 'rgba(255,255,255,0.3)', border: '2px solid var(--darkest)', borderRadius: '100px', width: '14px', height: '14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Coffee size={16} color="rgba(255,255,255,0.5)" /> Caffeine Clearance Boundary
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Before {caffeineCutoff}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Adenosine receptors must clear. Eliminate caffeine past this boundary to guarantee high night delta-sleep efficiency.
                  </p>
                </div>

                {/* Evening Dim Window */}
                <div>
                  <div style={{ position: 'absolute', left: '-29px', top: '2px', background: 'rgba(255,255,255,0.3)', border: '2px solid var(--darkest)', borderRadius: '100px', width: '14px', height: '14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="rgba(255,255,255,0.5)" /> Dim Lighting / Blue Screens Off
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{eveningDimWindow}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Block blue screens and dim household lighting. Avoid resetting SCN photoreceptors and destroying your natural melatonin curve.
                  </p>
                </div>

                {/* Melatonin Priming */}
                <div>
                  <div style={{ position: 'absolute', left: '-29px', top: '2px', background: 'var(--gold-dark)', border: '2px solid var(--darkest)', borderRadius: '100px', width: '14px', height: '14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Moon size={16} color="var(--gold)" /> Melatonin & Sleep Drops Dose
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', fontWeight: 700 }}>{melatoninPriming}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Natural melatonin synthesis hits peak. Take 2 drops of Botanical Sleep Drops to support GABA-A neural pathways and prepare for restorative sleep.
                  </p>
                </div>

                {/* Bed time */}
                <div>
                  <div style={{ position: 'absolute', left: '-29px', top: '2px', background: 'var(--gold)', border: '2px solid var(--darkest)', borderRadius: '100px', width: '14px', height: '14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.95rem' }}>💤 Target Sleep Window</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 800 }}>{bedTime}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Ambient temperature set to 18°C. Sleep window begins. Ensure complete room darkness.
                  </p>
                </div>

              </div>
            </div>
          </ScrollAnimator>
        </div>

      </div>
    </div>
  );
}
