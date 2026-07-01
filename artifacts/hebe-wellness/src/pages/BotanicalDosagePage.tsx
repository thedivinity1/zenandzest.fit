import { useTheme } from '../context/ThemeContext';
﻿import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { Calculator, Award, Info, AlertTriangle } from 'lucide-react';

const dosageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How do you calculate the right botanical supplement dosage?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Compare raw powder active percentages (typically 0.1-1.5%) with standardized extract percentages (typically 5-50%). Use the formula: equivalent extract dose = (raw grams × 1000 × raw percentage) ÷ extract percentage. Always stay below danger thresholds and verify therapeutic windows with NABL-certified HPLC validation."
    }
  }]
};

interface HerbDosageDetail {
  name: string;
  activeBioactive: string;
  rawPurityPct: number; // e.g. 0.2% active constituent
  standardPurityPct: number; // e.g. 5.0% active constituent
  maxRecommendedDoseMg: number;
  dangerDoseMg: number;
}

const herbDb: Record<string, HerbDosageDetail> = {
  'ashwagandha': {
    name: 'KSM-66 Ashwagandha (Withania somnifera)',
    activeBioactive: 'Withanolides',
    rawPurityPct: 0.25,
    standardPurityPct: 5.0,
    maxRecommendedDoseMg: 600,
    dangerDoseMg: 2000
  },
  'saffron': {
    name: 'Kashmiri Saffron (Crocus sativus)',
    activeBioactive: 'Crocin Carotenoid',
    rawPurityPct: 0.12,
    standardPurityPct: 3.0,
    maxRecommendedDoseMg: 45,
    dangerDoseMg: 200
  },
  'brahmi': {
    name: 'Wayanad Brahmi (Bacopa monnieri)',
    activeBioactive: 'Bacosides A & B',
    rawPurityPct: 1.5,
    standardPurityPct: 50.0,
    maxRecommendedDoseMg: 500,
    dangerDoseMg: 1500
  }
};

export default function BotanicalDosagePage() {
  const { isDark } = useTheme();
  const bg = (dark: string, light: string) => isDark ? dark : light;
  const fg = (dark: string, light: string) => isDark ? dark : light;

  const [selectedHerb, setSelectedHerb] = useState<string>('ashwagandha');
  const [rawGrams, setRawGrams] = useState<number>(3); // 3 grams of raw powder

  const herb = herbDb[selectedHerb];

  // Calculated variables
  const rawActiveYieldMg = Math.round((rawGrams * 1000) * (herb.rawPurityPct / 100));
  const equivalentExtractMg = Math.round((rawActiveYieldMg / (herb.standardPurityPct / 100)));
  const concentrationRatio = Math.round(herb.standardPurityPct / herb.rawPurityPct);

  const isHighDose = equivalentExtractMg > herb.maxRecommendedDoseMg;
  const isDangerDose = equivalentExtractMg > herb.dangerDoseMg;

  return (
    <div style={{ background: bg('var(--darkest)', '#f8fafc'), minHeight: '100vh', padding: '8rem 0 6rem 0', color: fg('white', '#0f172a') }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dosageSchema) }} />
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Molecular Potency & Safety</div>
          <h1 className="section-title">Molecular Potency <span className="gold-gradient-text">Dose Auditor</span></h1>
          <p style={{ color: fg('rgba(255,255,255,0.6)', '#334155'), maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            <strong>Answer-First:</strong> Active botanical dosage calculations compare raw plant powders (0.1–1.5% active yields) with standardized extracts (5–50% purity levels). Standardizing ensures consistent, therapeutic dosages without risk of toxicity or heavy metal exposure.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Interactive Calculator */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: fg('white', '#0f172a'), marginBottom: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={22} color="var(--gold)" /> Potency Calculator
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: fg('rgba(255,255,255,0.6)', '#475569'), display: 'block', marginBottom: '0.5rem' }}>Select Botanical Ingredient</label>
                  <select
                    value={selectedHerb}
                    onChange={(e) => setSelectedHerb(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: bg('var(--darkest)', '#f8fafc'), border: bg('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), borderRadius: '10px', color: fg('white', '#0f172a') }}
                  >
                    <option value="ashwagandha">KSM-66 Ashwagandha</option>
                    <option value="saffron">Kashmiri Saffron</option>
                    <option value="brahmi">Wayanad Brahmi</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: fg('rgba(255,255,255,0.6)', '#475569'), display: 'block', marginBottom: '0.5rem' }}>Daily Raw Powder Dosage (Grams)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="20"
                    value={rawGrams}
                    onChange={(e) => setRawGrams(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    style={{ width: '100%', padding: '0.75rem', background: bg('rgba(255,255,255,0.03)', 'rgba(0,0,0,0.03)'), border: bg('1px solid rgba(255,255,255,0.1)', '1px solid rgba(0,0,0,0.1)'), borderRadius: '10px', color: fg('white', '#0f172a') }}
                  />
                </div>
              </div>

              {/* Calculations Output */}
              <div style={{ background: bg('rgba(201,168,76,0.05)', 'var(--lm-gold-pale)'), border: bg('1px solid rgba(201,168,76,0.2)', '1px solid rgba(196,127,23,0.25)'), borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: isDark ? 'var(--gold)' : 'var(--lm-gold-deep)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Audited Molecular Yields
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'), paddingBottom: '0.5rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.6)', '#475569') }}>Bioactive Molecular Compound:</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>{herb.activeBioactive}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'), paddingBottom: '0.5rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.6)', '#475569') }}>Active Compound Yield in Raw Powder:</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>{rawActiveYieldMg} mg</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'), paddingBottom: '0.5rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.6)', '#475569') }}>Concentration Potency Ratio:</span>
                    <strong style={{ color: isDark ? 'var(--gold)' : 'var(--lm-gold-deep)' }}>{concentrationRatio}x Stronger</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.6)', '#475569') }}>Equiv. Standardized Extract Dose:</span>
                    <strong style={{ color: isDark ? 'var(--gold-light)' : 'var(--lm-accent)', fontSize: '1.1rem' }}>{equivalentExtractMg} mg</strong>
                  </div>
                </div>
              </div>

              {/* Safety Alerts */}
              {isDangerDose ? (
                <div style={{ background: bg('rgba(244,67,54,0.1)', 'rgba(239,68,68,0.08)'), border: bg('1px solid rgba(244,67,54,0.3)', '1px solid rgba(239,68,68,0.25)'), borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.75rem', color: bg('#ff7b72', '#b91c1c'), fontSize: '0.82rem', alignItems: 'start' }}>
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                  <div>
                    <strong>Toxicity Risk:</strong> This dosage yields an active molecule payload of {rawActiveYieldMg}mg, crossing the biological danger threshold ({herb.dangerDoseMg}mg equivalent extract) for this plant. Please reduce raw powder dosage immediately.
                  </div>
                </div>
              ) : isHighDose ? (
                <div style={{ background: bg('rgba(255,152,0,0.1)', 'rgba(245,158,11,0.08)'), border: bg('1px solid rgba(255,152,0,0.3)', '1px solid rgba(245,158,11,0.25)'), borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.75rem', color: bg('#ffb454', '#b45309'), fontSize: '0.82rem', alignItems: 'start' }}>
                  <Info size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                  <div>
                    <strong>High Dose Advisory:</strong> This equivalent dose ({equivalentExtractMg}mg) exceeds the standard recommended therapeutic window of {herb.maxRecommendedDoseMg}mg. Maintain safety hydration protocols.
                  </div>
                </div>
              ) : (
                <div style={{ background: bg('rgba(76,175,80,0.08)', 'var(--lm-accent-ultra)'), border: bg('1px solid rgba(76,175,80,0.2)', '1px solid rgba(26,92,58,0.2)'), borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.75rem', color: bg('#85e89d', 'var(--lm-accent)'), fontSize: '0.82rem', alignItems: 'start' }}>
                  <Award size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                  <div>
                    <strong>Optimal Dose:</strong> This dose is within the safe, scientifically validated, therapeutic clinical window. Excellent for cellular longevity.
                  </div>
                </div>
              )}

            </div>
          </ScrollAnimator>

          {/* Scientific Educational Table */}
          <ScrollAnimator>
            <div style={{ background: bg('rgba(255,255,255,0.02)', 'rgba(0,0,0,0.02)'), border: bg('1px solid rgba(255,255,255,0.08)', '1px solid rgba(0,0,0,0.08)'), borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: isDark ? 'var(--gold)' : 'var(--lm-gold-deep)', marginBottom: '1.25rem', fontWeight: 900 }}>
                Why Standardized Extracts Matter
              </h2>
              <p style={{ color: fg('rgba(255,255,255,0.8)', '#334155'), fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Standard agricultural powders consist of ground dry root or leaf. The actual concentration of the active longevity compounds (like withanolides or bacosides) fluctuates widely based on rainfall, soil quality, and storage duration, rendering therapeutic dosing impossible.
              </p>
              
              <p style={{ color: fg('rgba(255,255,255,0.65)', '#475569'), fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                **Standardized extracts** guarantee an exact, repeatable, biochemical dose in every capsule, backed by HPLC validation, ensuring that you achieve physiological results without toxic variations.
              </p>

              <div style={{ background: bg('rgba(255,255,255,0.03)', 'rgba(0,0,0,0.02)'), borderRadius: '16px', padding: '1.25rem', border: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.05)') }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isDark ? 'var(--gold)' : 'var(--lm-gold-deep)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  Active Purity Comparison
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'), paddingBottom: '0.4rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.7)', '#475569') }}>KSM-66 Withanolides:</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>5.0% vs. 0.25% in raw root</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: bg('1px solid rgba(255,255,255,0.05)', '1px solid rgba(0,0,0,0.06)'), paddingBottom: '0.4rem' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.7)', '#475569') }}>Wayanad Brahmi Bacosides:</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>50.0% vs. 1.5% in raw leaf</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: fg('rgba(255,255,255,0.7)', '#475569') }}>Kashmiri Crocin:</span>
                    <strong style={{ color: fg('white', '#0f172a') }}>3.0% vs. 0.12% in raw saffron</strong>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimator>

        </div>

      </div>
    </div>
  );
}
