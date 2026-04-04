import { useState } from 'react';
import ScrollAnimator from '../components/ScrollAnimator';

const experts = [
  { emoji: '🩺', name: 'Dr. Priya Sharma', specialty: 'Integrative Medicine & Phytotherapy', available: 'Next available: Today 4PM', slots: ['4:00 PM', '5:30 PM', '7:00 PM'] },
  { emoji: '👨‍🔬', name: 'Dr. Kiran Mehta', specialty: 'Clinical Pharmacognosy & Botanical Research', available: 'Next available: Tomorrow 10AM', slots: ['10:00 AM', '11:30 AM', '2:00 PM'] },
  { emoji: '🌿', name: 'Vaidya Anand Joshi', specialty: 'Classical Ayurveda & Panchakarma', available: 'Next available: Today 6PM', slots: ['6:00 PM', '7:30 PM'] },
  { emoji: '🧠', name: 'Dr. Meera Krishnan', specialty: 'Neuroscience & Gut-Brain Axis', available: 'Next available: Tomorrow 2PM', slots: ['2:00 PM', '3:30 PM', '5:00 PM'] },
];

const concerns = ['Sleep Disorders', 'Chronic Stress', 'Hair Loss', 'Skin Health', 'Digestive Issues', 'Hormonal Imbalance', 'Cognitive Performance', 'Weight Management', 'Immunity', 'General Wellness'];

export default function ConsultPage() {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const toggleConcern = (concern: string) => {
    setSelectedConcerns(prev =>
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="consult-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="section-tag">Free Expert Consultation</div>
          <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Talk to a Real <span className="gold-gradient-text">Ayurvedic Expert</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            45-minute one-on-one with our board-certified Ayurvedic physicians. 100% free. No obligation. Real answers.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '⏱️', label: '45 minutes' },
              { icon: '💚', label: '100% Free' },
              { icon: '📱', label: 'Video call' },
              { icon: '🔒', label: 'Confidential' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section style={{ background: 'var(--darkest)', padding: '6rem 0' }}>
        <div className="container">
          {!submitted ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'start' }}>
              {/* Expert Selection */}
              <div>
                <ScrollAnimator>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                    Choose Your Expert
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {experts.map((expert, i) => (
                      <div
                        key={i}
                        onClick={() => { setSelectedExpert(i); setSelectedSlot(null); }}
                        style={{
                          padding: '1.25rem', borderRadius: 14, cursor: 'pointer',
                          border: `1px solid ${selectedExpert === i ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)'}`,
                          background: selectedExpert === i ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.03)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '2.5rem' }}>{expert.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{expert.name}</div>
                            <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>{expert.specialty}</div>
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{expert.available}</div>
                          </div>
                          {selectedExpert === i && (
                            <div style={{
                              width: 20, height: 20, borderRadius: '50%',
                              background: 'var(--gold)', flexShrink: 0,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '0.7rem', color: 'var(--darkest)', fontWeight: 900
                            }}>✓</div>
                          )}
                        </div>

                        {/* Time slots */}
                        {selectedExpert === i && (
                          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {expert.slots.map(slot => (
                              <button
                                key={slot}
                                onClick={(e) => { e.stopPropagation(); setSelectedSlot(slot); }}
                                style={{
                                  padding: '0.35rem 0.85rem',
                                  borderRadius: '100px',
                                  border: `1px solid ${selectedSlot === slot ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
                                  background: selectedSlot === slot ? 'var(--gold)' : 'transparent',
                                  color: selectedSlot === slot ? 'var(--darkest)' : 'rgba(255,255,255,0.6)',
                                  fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollAnimator>
              </div>

              {/* Form */}
              <ScrollAnimator>
                <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                    Your Details
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input required className="form-input" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Mobile Number *</label>
                      <input required className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Email Address *</label>
                    <input required type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Primary Health Concerns</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {concerns.map(concern => (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => toggleConcern(concern)}
                          style={{
                            padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.8rem',
                            border: `1px solid ${selectedConcerns.includes(concern) ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
                            background: selectedConcerns.includes(concern) ? 'rgba(201,168,76,0.15)' : 'transparent',
                            color: selectedConcerns.includes(concern) ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                            cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500
                          }}
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Tell us more about your health journey</label>
                    <textarea
                      className="form-input"
                      rows={4}
                      placeholder="Any medical history, current medications, specific symptoms or questions for the consultation..."
                      style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {selectedExpert !== null && selectedSlot && (
                    <div style={{
                      padding: '1rem', borderRadius: 10, marginBottom: '1.5rem',
                      background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        Selected Appointment
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                        {experts[selectedExpert].name} · {selectedSlot}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="submit-btn">
                    Book My Free Consultation →
                  </button>
                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '1rem' }}>
                    No credit card. No spam. 100% free. Our team will confirm within 2 hours.
                  </p>
                </form>
              </ScrollAnimator>
            </div>
          ) : (
            /* Success */
            <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Consultation <span className="gold-gradient-text">Booked!</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Thank you, {form.name}! A confirmation has been sent to {form.email}. Our team will reach out within 2 hours to confirm your appointment.
              </p>
              <div style={{
                padding: '1.5rem', borderRadius: 14,
                background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)',
                marginBottom: '2rem'
              }}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>What to Expect</div>
                {[
                  'Confirmation call within 2 hours',
                  'Personalized intake form via WhatsApp',
                  '45-minute one-on-one video consultation',
                  'Written protocol and product recommendations',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', textAlign: 'left' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={() => setSubmitted(false)} className="hero-cta-secondary" style={{ display: 'inline-block' }}>
                Book Another Consultation
              </button>
            </div>
          )}
        </div>

        <style>{`@media(max-width:900px){section .container>div:first-child{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--forest-green)', padding: '5rem 0' }}>
        <div className="container">
          <ScrollAnimator style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Common <span className="gold-gradient-text">Questions</span></h2>
          </ScrollAnimator>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'Is the consultation really free?', a: 'Yes, 100% free. No credit card required. No hidden charges. We believe everyone deserves access to expert Ayurvedic guidance.' },
              { q: 'What happens during the consultation?', a: 'A 45-minute one-on-one video call with a board-certified expert. They\'ll assess your constitution (Prakriti), current symptoms, lifestyle, and create a personalized botanical protocol.' },
              { q: 'Do I need to buy anything?', a: 'No obligation whatsoever. The consultation is genuinely free. You may receive product recommendations, but the choice to purchase is entirely yours.' },
              { q: 'How qualified are the experts?', a: 'All our experts hold BAMS, MD Ayurveda, or equivalent qualifications with 10+ years clinical experience. Several have additional conventional medical degrees.' },
              { q: 'Can I get a second opinion on my current medication?', a: 'Our experts can provide complementary botanical perspectives, but for prescription medications, please consult your prescribing physician first.' },
            ].map((faq, i) => (
              <ScrollAnimator key={i} className={`stagger-${i + 1}`}>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12, padding: '1.5rem'
                }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                    {faq.q}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
