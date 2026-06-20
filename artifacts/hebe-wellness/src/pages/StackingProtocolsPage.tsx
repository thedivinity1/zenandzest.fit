import { useTheme } from '../context/ThemeContext';
﻿import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Layers, Check, Clock, ShieldAlert } from 'lucide-react';

const stackingSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How do adaptogenic stacks work for wellness protocols?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Adaptogenic stacks combine botanical compounds with synergistic timing to target specific biological pathways. Morning cortisol stacks use Ashwagandha to buffer ACTH receptors, afternoon focus stacks enhance BDNF via Brahmi, and evening sleep stacks activate GABA-A receptors for delta-wave sleep. Proper timing ensures optimal biochemical synergy."
    }
  }]
};

interface StackingProtocol {
  name: string;
  focus: string;
  scientificTarget: string;
  morning: string;
  afternoon: string;
  evening: string;
  lifestyleAdvice: string[];
  productStack: string;
}

const protocols: Record<string, StackingProtocol> = {
  'sleep': {
    name: 'Circadian Sleep & HPA Axis Restoration Stack',
    focus: 'Insomnia, light sleep, high night cortisol spikes, racing mind.',
    scientificTarget: 'Upregulation of GABA-A receptors, calming night cortisol surges, and increasing sleep slow-wave delta cycles.',
    morning: 'No direct sleep compounds. Focus on a 15-minute natural light CAR (Cortisol Awakening Response) pulse.',
    afternoon: 'Cut off caffeine by 12:00 PM. Take 150mg standardized Ashwagandha to buffer afternoon stress.',
    evening: 'Take 2 drops of Botanical Sleep Drops + 300mg Magnesium Glycinate 1 hour before bed. Block blue screens.',
    lifestyleAdvice: [
      'Maintain an absolute dark room (blackout curtains) to prompt natural melatonin synthesis.',
      'Maintain ambient room temperature at 17-19°C (63-66°F) to mimic natural temperature drops.',
      'Perform a 5-minute physiological sigh breathing pattern before sleeping.'
    ],
    productStack: 'Botanical Sleep Drops'
  },
  'cortisol': {
    name: 'Adrenal Burnout & Stress Resilience Stack',
    focus: 'Chronic exhaustion, anxiety, afternoon energy slumps, brain fog.',
    scientificTarget: 'Modulating the Hypothalamic-Pituitary-Adrenal (HPA) feedback loop, preventing adrenal cellular exhaustion.',
    morning: 'Take 1 cap of Botanical Adrenal Recovery with breakfast (contains standardized KSM-66 Ashwagandha + Rhodiola).',
    afternoon: 'Take 100mg L-Theanine with green tea to buffer the caffeine adrenaline spike.',
    evening: 'Take 150mg Magnesium Glycinate to lower systemic cortisol before sleeping.',
    lifestyleAdvice: [
      'Engage in 20-30 minutes of Zone 2 cardio daily to lower systemic biological cortisol baselines.',
      'Eliminate high-density simple sugars that create rapid insulin/cortisol spikes.',
      'Practice 5 minutes of somatic grounding or silent meditation at 3:00 PM.'
    ],
    productStack: 'Botanical Adrenal Recovery'
  },
  'focus': {
    name: 'Cognitive Focus & BDNF Neuroplasticity Stack',
    focus: 'Brain fog, lack of attention span, low memory retention.',
    scientificTarget: 'Increasing Brain-Derived Neurotrophic Factor (BDNF) expression and supporting acetylcholinesterase inhibition.',
    morning: 'Take 1 cap of Neuroplasticity Brahmi extract with water (standardized to 50% Bacosides).',
    afternoon: 'Take 100mg CoQ10 + PQQ to support micro-cellular brain mitochondrial ATP yields.',
    evening: 'Rest brain cells from blue screen stress. No heavy reading 2 hours before sleeping.',
    lifestyleAdvice: [
      'Perform 16:8 intermittent fasting windows to trigger natural BDNF cognitive upregulation.',
      'Execute high-intensity interval training (HIIT) once a week to upregulate cerebral blood flow.',
      'Practice deep non-sleep deep rest (NSDR) for 20 minutes in the afternoon.'
    ],
    productStack: 'Neuroplasticity Brahmi Extract'
  },
  'metabolic': {
    name: 'Metabolic Purity & AMPK Longevity Stack',
    focus: 'Insulin resistance, post-meal energy slumps, sluggish gut.',
    scientificTarget: 'Activating AMP-activated protein kinase (AMPK) to clear glucose and support sirtuin pathways.',
    morning: 'Take 1 cap of Gut Restoration Berberine HCL (standardized to 97%) 20 minutes before breakfast.',
    afternoon: 'Take 1 cap of Gut Restoration Berberine HCL 20 minutes before lunch.',
    evening: 'Take Triphala Tannin complex with warm water to clear gut mucosal toxins (Ama).',
    lifestyleAdvice: [
      'Walk briskly for 10-15 minutes immediately after meals to trigger postprandial glucose clearing.',
      'Restrict carbohydrate intake to under 100g per day, emphasizing dietary fibers and healthy fats.',
      'Maintain an overnight 12-to-14 hour metabolic fasting window.'
    ],
    productStack: 'Gut Restoration Capsule'
  }
};

export default function StackingProtocolsPage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  const [goal, setGoal] = useState<string>('sleep');
  const { addToCart, setCartOpen } = useCart();

  const selected = protocols[goal];

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stackingSchema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Adaptogen Stacking Protocols</div>
          <h1 className="section-title">Standardized <span className="gold-gradient-text">Stack Library</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Adaptogenic stacks combine botanical compounds with precise timing to target biological pathways. Morning cortisol stacks buffer ACTH receptors, afternoon focus stacks enhance BDNF via Brahmi, and evening sleep stacks activate GABA-A receptors for delta-wave restoration.
          </p>
        </ScrollAnimator>

        {/* Goal Selector Tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {Object.keys(protocols).map((key) => (
            <button
              key={key}
              onClick={() => setGoal(key)}
              style={{
                padding: '0.75rem 1.5rem',
                background: goal === key ? 'var(--gold)' : 'rgba(255,255,255,0.02)',
                border: '1px solid',
                borderColor: goal === key ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                borderRadius: '100px',
                color: goal === key ? 'var(--darkest)' : 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {key.toUpperCase()} Stack
            </button>
          ))}
        </div>

        {/* Selected Protocol Display */}
        {selected && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Hour by Hour Schedule */}
            <ScrollAnimator>
              <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 900, marginBottom: '0.5rem' }}>
                  {selected.name}
                </h2>
                
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
                  <strong>Indications:</strong> {selected.focus} <br />
                  <strong>Scientific Objective:</strong> {selected.scientificTarget}
                </div>

                <h4 style={{ color: fg('white', '#0f172a'), fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                  🕒 Hour-by-Hour Stacking Schedule
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '64px', width: '80px', flexShrink: 0 }}>
                      <Clock size={16} color="var(--gold)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: fg('white', '#0f172a'), marginTop: '0.25rem' }}>MORNING</span>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {selected.morning}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '64px', width: '80px', flexShrink: 0 }}>
                      <Clock size={16} color="var(--gold)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: fg('white', '#0f172a'), marginTop: '0.25rem' }}>AFTERNOON</span>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {selected.afternoon}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '64px', width: '80px', flexShrink: 0 }}>
                      <Clock size={16} color="var(--gold)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: fg('white', '#0f172a'), marginTop: '0.25rem' }}>EVENING</span>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {selected.evening}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px dashed rgba(201,168,76,0.3)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--gold-light)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <Layers size={14} /> Critical Stacking Synergy
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Adaptogens have synergistic feedback loops. Ashwagandha buffers high stress (cortisol), preventing cortisol from destroying the delicate skin crocin cells and gut mucosal lining.
                  </p>
                </div>
              </div>
            </ScrollAnimator>

            {/* Lifestyle Advice & Store Checkout */}
            <ScrollAnimator>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Clinical Lifestyle Guidance */}
                <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: fg('white', '#0f172a'), fontWeight: 800, marginBottom: '1.25rem' }}>
                    Clinical Lifestyle Habits
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selected.lifestyleAdvice.map((advice, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', alignItems: 'start' }}>
                        <Check size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                        <span>{advice}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instant Stack Buy */}
                <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Recommended Formulation</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: fg('white', '#0f172a'), fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>
                    {selected.productStack}
                  </h3>
                  <button
                    onClick={() => { addToCart(selected.productStack); setCartOpen(true); }}
                    style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    🛒 Add Stack to Cart
                  </button>
                </div>

              </div>
            </ScrollAnimator>

          </div>
        )}

      </div>
    </div>
  );
}
