import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';
import { useCart } from '../context/CartContext';
import { Sun, Moon, Sunrise, Coffee, Layers, CheckCircle2 } from 'lucide-react';

interface RitualItem {
  id: string;
  name: string;
  duration: number; // mins
  phase: 'morning' | 'afternoon' | 'evening';
  biochemicalTarget: string;
}

const morningRituals: RitualItem[] = [
  { id: 'car', name: 'Outdoor Sunlight CAR Pulse', duration: 15, phase: 'morning', biochemicalTarget: 'Resets Suprachiasmatic Nucleus, stabilizes daytime cortisol' },
  { id: 'ashwa_m', name: 'Standardized Ashwagandha Dose', duration: 1, phase: 'morning', biochemicalTarget: 'Upregulates adrenal tolerance, buffers early cortisol surges' },
  { id: 'hydrate', name: 'Warm Celtic Salt Lemon Water', duration: 3, phase: 'morning', biochemicalTarget: 'Rehydrates cellular membrane electrolyte structures' }
];

const afternoonRituals: RitualItem[] = [
  { id: 'walk', name: '10-Min Postprandial Walk', duration: 10, phase: 'afternoon', biochemicalTarget: 'Triggers AMPK pathways, lowers post-meal insulin spikes' },
  { id: 'caff_cutoff', name: 'Complete Caffeine Cutoff', duration: 1, phase: 'afternoon', biochemicalTarget: 'Allows cerebral adenosine levels to build for night delta sleep' },
  { id: 'nsdr', name: '20-Min Non-Sleep Deep Rest (NSDR)', duration: 20, phase: 'afternoon', biochemicalTarget: 'Upregulates autonomic nervous system parasympathetic tone' }
];

const eveningRituals: RitualItem[] = [
  { id: 'blue_block', name: 'Blue Screen Block Glasses On', duration: 1, phase: 'evening', biochemicalTarget: 'Prevents pineal photoreceptors from resetting night melatonin curves' },
  { id: 'sleep_drops', name: 'Botanical Sleep Drops (GABA-A active)', duration: 2, phase: 'evening', biochemicalTarget: 'Upregulates GABA neural transmitters, quiets racing thoughts' },
  { id: 'mag_gly', name: '300mg Magnesium Glycinate', duration: 1, phase: 'evening', biochemicalTarget: 'Relaxes muscular skeletal structures, supports delta sleep cycles' }
];

export default function WellnessBuilderPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['car', 'caff_cutoff', 'sleep_drops']);
  const { addToCart, setCartOpen } = useCart();

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Calculations
  const allRituals = [...morningRituals, ...afternoonRituals, ...eveningRituals];
  const selectedRituals = allRituals.filter(r => selectedIds.includes(r.id));
  const totalMins = selectedRituals.reduce((a, b) => a + b.duration, 0);

  // Biochemical synergies checks
  const hasAshwaAndSleep = selectedIds.includes('ashwa_m') && selectedIds.includes('sleep_drops');
  const hasSunAndCaff = selectedIds.includes('car') && selectedIds.includes('caff_cutoff');

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh', padding: '8rem 0 6rem 0', color: 'white' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <ScrollAnimator style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Circadian Ritual Customizer</div>
          <h1 className="section-title">Circadian Ritual <span className="gold-gradient-text">Builder</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '680px', margin: '0.75rem auto 0', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Build your personalized, hour-by-hour circadian morning and evening ritual program. Secure high daily energy yields and deep night slow-wave delta cycles.
          </p>
        </ScrollAnimator>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Builder Columns */}
          <ScrollAnimator>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Morning */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sunrise size={20} color="var(--gold-light)" /> Morning Activation Protocols
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {morningRituals.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      style={{
                        background: selectedIds.includes(item.id) ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.01)',
                        border: '1px solid',
                        borderColor: selectedIds.includes(item.id) ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'start',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input type="checkbox" checked={selectedIds.includes(item.id)} readOnly style={{ accentColor: 'var(--gold)', marginTop: '0.15rem' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{item.name} <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>({item.duration}m)</span></div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{item.biochemicalTarget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Afternoon */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Coffee size={20} color="var(--gold)" /> Afternoon Pacing Boundary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {afternoonRituals.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      style={{
                        background: selectedIds.includes(item.id) ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.01)',
                        border: '1px solid',
                        borderColor: selectedIds.includes(item.id) ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'start',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input type="checkbox" checked={selectedIds.includes(item.id)} readOnly style={{ accentColor: 'var(--gold)', marginTop: '0.15rem' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{item.name} <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>({item.duration}m)</span></div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{item.biochemicalTarget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Moon size={20} color="var(--gold-dark)" /> Evening Restorative Sleep Prep
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {eveningRituals.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      style={{
                        background: selectedIds.includes(item.id) ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.01)',
                        border: '1px solid',
                        borderColor: selectedIds.includes(item.id) ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'start',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input type="checkbox" checked={selectedIds.includes(item.id)} readOnly style={{ accentColor: 'var(--gold)', marginTop: '0.15rem' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{item.name} <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>({item.duration}m)</span></div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{item.biochemicalTarget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollAnimator>

          {/* Routine Summary */}
          <ScrollAnimator>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '24px', padding: '2rem', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'white', fontWeight: 900, marginBottom: '1.25rem' }}>
                Your Compiled Protocol
              </h2>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Scheduled Routine Time:</span>
                <strong style={{ color: 'var(--gold-light)' }}>{totalMins} Mins / Day</strong>
              </div>

              {/* Synergies Panel */}
              <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px dashed rgba(201,168,76,0.25)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  <Layers size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Biochemical Synergy Auditing:
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                  {hasAshwaAndSleep && (
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#85e89d' }}>
                      <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> <strong>Ashwagandha-Sleep Synergy Confirmed:</strong> Morning cortisol mitigation enhances night GABA receptor affinity scores.
                    </div>
                  )}

                  {hasSunAndCaff && (
                    <div style={{ display: 'flex', gap: '0.5rem', color: '#85e89d' }}>
                      <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> <strong>SCN-Caffeine Boundary Confirmed:</strong> Adenosine pathways fully preserved for deep slow-wave delta cycles.
                    </div>
                  )}

                  {selectedIds.length === 0 && (
                    <div style={{ color: '#ffb454' }}>
                      Please select one or more daily rituals to activate the biochemical synergy auditor reports.
                    </div>
                  )}

                  {selectedIds.length > 0 && !hasAshwaAndSleep && !hasSunAndCaff && (
                    <div>
                      Routines compiled. Select "Outdoor Sunlight CAR Pulse" and "Complete Caffeine Cutoff" to unlock biological sleep synergy metrics.
                    </div>
                  )}
                </div>
              </div>

              {/* Quick shop formulation based on selections */}
              {selectedIds.includes('sleep_drops') ? (
                <button
                  onClick={() => { addToCart('Botanical Sleep Drops'); setCartOpen(true); }}
                  style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🛒 One-Click Shop Botanical Sleep Drops
                </button>
              ) : (
                <button
                  onClick={() => { addToCart('Botanical Adrenal Recovery'); setCartOpen(true); }}
                  style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', border: 'none', borderRadius: '100px', color: 'var(--darkest)', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  🛒 Shop Adrenal Recovery Stack
                </button>
              )}

            </div>
          </ScrollAnimator>
        </div>

      </div>
    </div>
  );
}
