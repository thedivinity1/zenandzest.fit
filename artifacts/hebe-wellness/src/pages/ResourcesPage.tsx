import { useState } from 'react';

const glossaryTerms = [
  { term: 'Adaptogen', definition: 'A natural substance that helps the body adapt to physical, chemical, and biological stress. Adaptogens modulate the stress response without causing dependence or significant side effects.', category: 'A' },
  { term: 'Anagen Phase', definition: 'The active growth phase of the hair follicle cycle, lasting 2-7 years. Longer anagen phases result in longer, denser hair. Plant botanicals like Bhringraj are proven to extend this phase.', category: 'A' },
  { term: 'BDNF', definition: 'Brain-Derived Neurotrophic Factor — a protein that supports the growth and maintenance of neurons. Critical for learning, memory, and mood regulation. Lion\'s Mane mushroom is clinically shown to increase BDNF.', category: 'B' },
  { term: 'Bioavailability', definition: 'The proportion of a substance that enters the bloodstream when introduced into the body. Standardized botanical extracts have significantly higher bioavailability than raw plant powders.', category: 'B' },
  { term: 'Botanical Complex', definition: 'A proprietary blend of plant-derived bioactive compounds, typically standardized to a specific concentration of active constituents for consistent therapeutic effect.', category: 'B' },
  { term: 'Cortisol', definition: 'The primary stress hormone produced by the adrenal cortex. Chronically elevated cortisol damages the hippocampus, breaks down muscle, stores abdominal fat, and suppresses immunity.', category: 'C' },
  { term: 'Circadian Rhythm', definition: 'The 24-hour internal biological clock that regulates sleep-wake cycles, hormone secretion, body temperature, and metabolic processes. Disruption is linked to disease, obesity, and cognitive decline.', category: 'C' },
  { term: 'Curcumin', definition: 'The primary bioactive compound in Turmeric (Curcuma longa). A potent NF-κB inhibitor and master anti-inflammatory compound. Requires piperine or nanoparticle formulation for adequate bioavailability.', category: 'C' },
  { term: 'DHT (Dihydrotestosterone)', definition: 'A potent androgen derived from testosterone via 5-alpha reductase enzyme. DHT miniaturizes hair follicles causing androgenic alopecia. Plant botanicals like Saw Palmetto and Bhringraj inhibit this enzyme.', category: 'D' },
  { term: 'Endocannabinoid System', definition: 'A complex cell-signaling system throughout the human body involving endogenous cannabinoids, cannabinoid receptors (CB1, CB2), and metabolic enzymes. Regulates mood, sleep, appetite, pain, and immune function.', category: 'E' },
  { term: 'Entourage Effect', definition: 'The synergistic interaction between all compounds in a whole-plant botanical extract, which produces a greater therapeutic effect than isolated single compounds.', category: 'E' },
  { term: 'FSSAI', definition: 'Food Safety and Standards Authority of India — the regulatory body governing food and food supplement safety and labeling standards in India. All My Zen and Zest products are FSSAI compliant.', category: 'F' },
  { term: 'GMP Certification', definition: 'Good Manufacturing Practice — an internationally recognized quality assurance system ensuring products are consistently produced and controlled according to quality standards. Required for pharmaceutical-grade botanical production.', category: 'G' },
  { term: 'HPA Axis', definition: 'Hypothalamic-Pituitary-Adrenal Axis — the body\'s central stress response system. Chronic HPA activation leads to burnout, adrenal fatigue, insomnia, and hormonal dysfunction. Adaptogens directly modulate HPA signaling.', category: 'H' },
  { term: 'Herbal Extract', definition: 'A concentrated preparation made by extracting the active compounds from plant material using solvents (water, alcohol, or supercritical CO2). Standardized extracts guarantee minimum levels of key bioactive compounds.', category: 'H' },
  { term: 'KSM-66', definition: 'The most clinically studied ashwagandha root extract (by Ixoreal Biomed), standardized to minimum 5% withanolides. Has 24 published clinical trials supporting efficacy for stress, sleep, testosterone, and cognitive function.', category: 'K' },
  { term: 'Microbiome', definition: 'The trillions of microorganisms (bacteria, fungi, viruses) inhabiting the gut. The gut microbiome produces neurotransmitters, regulates immunity, influences metabolism, and communicates with the brain via the gut-brain axis.', category: 'M' },
  { term: 'Ministry of Ayush', definition: 'Indian government ministry responsible for the development of traditional medicine systems including Ayurveda, Yoga, Unani, Siddha, and Homeopathy. Sets manufacturing and quality standards for Ayurvedic products in India.', category: 'M' },
  { term: 'NGF', definition: 'Nerve Growth Factor — a protein critical for the development, maintenance, and survival of neurons. Low NGF is linked to neurodegeneration. Lion\'s Mane mushroom is the only known food source to stimulate NGF production.', category: 'N' },
  { term: 'Nootropic', definition: 'A substance that improves cognitive function including memory, focus, creativity, and motivation. Plant-based nootropics like Bacopa Monnieri and Lion\'s Mane work through NGF stimulation and acetylcholine enhancement.', category: 'N' },
  { term: 'Phytonutrient', definition: 'Bioactive chemical compounds found naturally in plants. Unlike macronutrients, phytonutrients are not essential for basic survival but provide significant health-promoting and disease-preventing benefits.', category: 'P' },
  { term: 'Phytocannabinoid', definition: 'Cannabis-derived or plant-derived compounds that interact with the endocannabinoid system. Unlike cannabinoids, plant botanicals contain multiple terpenes and phytochemicals that work through similar receptor pathways without psychoactive effects.', category: 'P' },
  { term: 'Rasayana', definition: 'A classical Ayurvedic concept of rejuvenation therapy — substances, formulations, and practices that reverse aging, enhance vitality, and build ojas (life force). Ashwagandha, Brahmi, and Shatavari are primary Rasayana herbs.', category: 'R' },
  { term: 'Standardized Extract', definition: 'A botanical preparation guaranteed to contain a minimum percentage of the key active compound. For example, Ashwagandha standardized to 5% withanolides means every dose contains exactly that concentration.', category: 'S' },
  { term: 'Terpene', definition: 'Aromatic compounds found in plants that contribute to scent, flavor, and a wide range of therapeutic properties including anti-inflammatory, anxiolytic, and antimicrobial effects. Over 20,000 terpenes exist in nature.', category: 'T' },
  { term: 'Withanolide', definition: 'The primary bioactive compounds in Ashwagandha (Withania somnifera) responsible for its adaptogenic, anti-inflammatory, and anxiolytic effects. High-quality extracts are standardized to 5% withanolides.', category: 'W' },
];

const researchCitations = [
  { author: 'Chandrasekhar K. et al.', year: 2012, title: 'A Prospective, Randomized Double-Blind, Placebo-Controlled Study of Safety and Efficacy of High-Concentration Full-Spectrum Root Extract of Ashwagandha in Reducing Stress and Anxiety in Adults', journal: 'Indian Journal of Psychological Medicine', doi: '10.4103/0253-7176.106022', category: 'Stress' },
  { author: 'Panahi Y. et al.', year: 2015, title: 'Rosemary oil vs minoxidil 2% for the treatment of androgenetic alopecia: a randomized comparative trial', journal: 'Skinmed', doi: '13:15-21', category: 'Hair' },
  { author: 'Mori K. et al.', year: 2009, title: 'Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment: a double-blind placebo-controlled clinical trial', journal: 'Phytotherapy Research', doi: '10.1002/ptr.2634', category: 'Brain' },
  { author: 'Yin J. et al.', year: 2008, title: 'Efficacy of berberine in patients with type 2 diabetes mellitus', journal: 'Metabolism', doi: '10.1016/j.metabol.2008.01.013', category: 'Metabolic' },
  { author: 'Lopresti AL. et al.', year: 2019, title: 'An investigation into the stress-relieving and pharmacological actions of an ashwagandha extract: A randomized, double-blind, placebo-controlled study', journal: 'Medicine', doi: '10.1097/MD.0000000000017186', category: 'Stress' },
  { author: 'Tripathi YB. et al.', year: 2013, title: 'Eclipta alba: A traditional ayurvedic herbal plant and its medicinal benefits for hair growth', journal: 'Journal of Ethnopharmacology', doi: 'Review', category: 'Hair' },
  { author: 'Aguiar S. & Borowski T.', year: 2013, title: 'Neuropharmacological review of the nootropic herb Bacopa monnieri', journal: 'Rejuvenation Research', doi: '10.1089/rej.2012.1431', category: 'Brain' },
  { author: 'Srivastava JK. et al.', year: 2018, title: 'Crocus sativus L. (Saffron) and its derivatives: an overview', journal: 'Phytochemistry Reviews', doi: 'Review', category: 'Mood' },
];

const downloadGuides = [
  { icon: '📖', title: 'The Complete Adaptogen Bible', subtitle: '48-page clinical guide', desc: 'Complete reference guide to all major adaptogens with dosing protocols, contraindications, and stacking strategies. Curated by our clinical team.', pages: '48 pages', tag: 'Most Downloaded', gradient: 'linear-gradient(135deg, #1a3d2e, #0a2e1e)' },
  { icon: '🌙', title: 'Sleep Optimization Protocol', subtitle: '32-page protocol guide', desc: 'Evidence-based sleep hygiene combined with botanical support strategies. Includes the complete sleep architecture optimization protocol.', pages: '32 pages', tag: 'Sleep', gradient: 'linear-gradient(135deg, #1a237e, #0d1459)' },
  { icon: '⚡', title: 'Stress Reset Handbook', subtitle: '28-page clinical guide', desc: 'Complete HPA axis reset protocol combining botanical adaptogens, breathwork, sleep optimization, and lifestyle medicine.', pages: '28 pages', tag: 'Stress', gradient: 'linear-gradient(135deg, #2d1f4e, #1a0f2e)' },
  { icon: '✨', title: 'Hair & Skin Botanical Guide', subtitle: '36-page science guide', desc: 'The complete ingredient science behind natural hair restoration and skin health. Includes evidence ratings for 30+ ingredients.', pages: '36 pages', tag: 'Beauty', gradient: 'linear-gradient(135deg, #4e2d1f, #2e1a0f)' },
  { icon: '🦠', title: 'Gut Health Mastery Guide', subtitle: '40-page microbiome guide', desc: 'The definitive guide to healing your gut microbiome using plant botanicals, prebiotics, dietary strategies, and lifestyle medicine.', pages: '40 pages', tag: 'Gut Health', gradient: 'linear-gradient(135deg, #2d4e1f, #1a2e0f)' },
  { icon: '🧠', title: 'Cognitive Performance Protocol', subtitle: '24-page nootropic guide', desc: 'Science-backed nootropic stack protocols for focus, memory, creativity, and long-term neurological health using plant botanicals.', pages: '24 pages', tag: 'Brain', gradient: 'linear-gradient(135deg, #1f2d4e, #0f1a30)' },
];

const videoLibrary = [
  { title: 'Introduction to Adaptogens', duration: '14:32', thumbnail: '🌿', category: 'Foundations', views: '24.1K' },
  { title: 'How Ashwagandha Works: The Science', duration: '22:15', thumbnail: '🔬', category: 'Science', views: '18.7K' },
  { title: 'Building Your Morning Botanical Ritual', duration: '18:44', thumbnail: '☀️', category: 'Lifestyle', views: '31.2K' },
  { title: 'Understanding Sleep Architecture', duration: '26:08', thumbnail: '🌙', category: 'Sleep', views: '15.9K' },
  { title: 'Hair Loss: The Complete Botanical Guide', duration: '34:21', thumbnail: '✨', category: 'Hair', views: '42.8K' },
  { title: 'The HPA Axis & Burnout Recovery', duration: '28:55', thumbnail: '⚡', category: 'Stress', views: '22.3K' },
];

const resourcesSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are the wellness guides in the library free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All our clinical-grade wellness guides, research citations, and glossaries are 100% free to view and download with no email or registration required."
      }
    }
  ]
};

export default function ResourcesPage() {
  const [activeSection, setActiveSection] = useState<'guides' | 'research' | 'glossary' | 'video'>('guides');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('All');
  const [downloadedGuides, setDownloadedGuides] = useState<number[]>([]);

  const alphabet = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];
  const filteredGlossary = glossaryTerms.filter(t => {
    const matchLetter = activeLetter === 'All' || t.category === activeLetter;
    const matchSearch = !glossarySearch || t.term.toLowerCase().includes(glossarySearch.toLowerCase()) || t.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    return matchLetter && matchSearch;
  });

  return (
    <div style={{ background: 'var(--darkest)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }} />
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3d2e 50%, #0a1a0f 100%)', padding: '5rem 0 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1.5rem', background: 'rgba(201,168,76,0.08)' }}>KNOWLEDGE LIBRARY</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 900 }}>
            Free Wellness <span style={{ color: 'var(--gold)' }}>Knowledge Library</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.75 }}>
            <strong>Answer-First:</strong> Our wellness resources library provides free access to clinical-grade download guides, peer-reviewed research citations, a comprehensive biological and botanical glossary, and an educational video learning library curated by our medical board.
          </p>
        </div>
      </section>

      {/* Section Nav */}
      <div style={{ background: 'var(--mid-dark)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {([
            { id: 'guides', label: '📖 Free Guides', icon: '📖' },
            { id: 'research', label: '🔬 Research Citations', icon: '🔬' },
            { id: 'glossary', label: '📚 Glossary', icon: '📚' },
            { id: 'video', label: '🎥 Video Library', icon: '🎥' },
          ] as const).map(tab => (
            <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{ padding: '1.1rem 1.75rem', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeSection === tab.id ? 'var(--gold)' : 'transparent'}`, color: activeSection === tab.id ? 'var(--gold)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: activeSection === tab.id ? 700 : 400, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">

          {/* GUIDES */}
          {activeSection === 'guides' && (
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '0.5rem' }}>Free Download <span style={{ color: 'var(--gold)' }}>Guides</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Clinical-grade wellness guides curated by our medical team. No email required.</p>
              </div>
              <div className="res-grid">
                {downloadGuides.map((guide, i) => (
                  <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                    <div style={{ height: '120px', background: guide.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
                      {guide.icon}
                      <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', color: 'var(--gold-light)', fontWeight: 600 }}>{guide.tag}</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#fff', marginBottom: '0.25rem' }}>{guide.title}</div>
                      <div style={{ color: 'var(--gold)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{guide.pages}</div>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{guide.desc}</p>
                      <button onClick={() => setDownloadedGuides(prev => prev.includes(i) ? prev : [...prev, i])} style={{ width: '100%', padding: '0.625rem', background: downloadedGuides.includes(i) ? 'rgba(74,222,128,0.1)' : 'rgba(201,168,76,0.1)', border: `1px solid ${downloadedGuides.includes(i) ? 'rgba(74,222,128,0.3)' : 'rgba(201,168,76,0.3)'}`, borderRadius: '10px', color: downloadedGuides.includes(i) ? '#4ade80' : 'var(--gold)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}>
                        {downloadedGuides.includes(i) ? '✓ Downloaded' : 'Download Free →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESEARCH */}
          {activeSection === 'research' && (
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '0.5rem' }}>Research <span style={{ color: 'var(--gold)' }}>Citations Library</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Every claim we make is backed by peer-reviewed science. Here are key references.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {researchCitations.map((cite, i) => (
                  <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '0.975rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>{cite.title}</div>
                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{cite.author} ({cite.year}) · <span style={{ fontStyle: 'italic' }}>{cite.journal}</span></div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '0.25rem' }}>DOI: {cite.doi}</div>
                      </div>
                      <span style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{cite.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>This is a partial list. We maintain over 150 research citations. <span style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: 600 }}>Request full bibliography →</span></div>
              </div>
            </div>
          )}

          {/* GLOSSARY */}
          {activeSection === 'glossary' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '0.5rem' }}>Botanical & Wellness <span style={{ color: 'var(--gold)' }}>Glossary</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>A-Z reference guide to botanical, Ayurvedic, and clinical wellness terminology.</p>
                <input type="text" value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)} placeholder="Search terms..." style={{ width: '100%', maxWidth: '400px', padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
                {alphabet.map(l => (
                  <button key={l} onClick={() => setActiveLetter(l)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: `1px solid ${activeLetter === l ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, background: activeLetter === l ? 'rgba(201,168,76,0.15)' : 'transparent', color: activeLetter === l ? 'var(--gold)' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: activeLetter === l ? 700 : 400 }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {filteredGlossary.map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>{item.term}</span>
                      <span style={{ background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{item.category}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.7, marginTop: '0.5rem' }}>{item.definition}</p>
                  </div>
                ))}
                {filteredGlossary.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.4)' }}>No terms found. Try a different search.</div>
                )}
              </div>
            </div>
          )}

          {/* VIDEO */}
          {activeSection === 'video' && (
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', marginBottom: '0.5rem' }}>Video <span style={{ color: 'var(--gold)' }}>Learning Library</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>In-depth video explanations from our clinical team. Science made accessible.</p>
              </div>
              <div className="res-grid">
                {videoLibrary.map((video, i) => (
                  <div key={i} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                    <div style={{ height: '160px', background: 'linear-gradient(135deg, #0a1a0f, #1a3d2e)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', position: 'relative' }}>
                      <span style={{ fontSize: '3rem' }}>{video.thumbnail}</span>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(201,168,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', paddingLeft: '4px' }}>▶</div>
                      </div>
                      <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', color: '#fff' }}>{video.duration}</div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <span style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700 }}>{video.category}</span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.975rem', color: '#fff', marginTop: '0.75rem', lineHeight: 1.4 }}>{video.title}</h3>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{video.views} views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .res-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 1024px) { .res-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .res-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
