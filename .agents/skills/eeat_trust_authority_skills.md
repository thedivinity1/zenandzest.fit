# Skill: E-E-A-T & Trust Authority Signals

**Description**: Guides the agent in auditing and building Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) signals across pages and structured data. Focuses on entity mapping, professional credentials, clinical metrics, laboratory verifications, and external knowledge graph connections.

---

## E-E-A-T Optimization Checklists

### 1. Medical Advisory Board & Entity Mapping (Skill 27)
* **Objective**: Establish the credibility of the authors and reviewers of the content.
* **Audit Rules**:
  - Every health, wellness, or scientific page should prominently display the author's name, credentials (e.g., MD, PhD, LAc), and medical review status.
  - The author's name must link to an author profile page detailing their biography and publications.
  - In structured data, map the author entity to external authority sources like ORCID, Wikipedia, or medical registration boards.

### 2. Clinical Marker & Biomarker Integration (Skill 28)
* **Objective**: Support general health claims with precise, measurable biometric markers.
* **Audit Rules**:
  - Replace vague health assertions with specific biomarkers (e.g., instead of "reduces inflammation", use "helps maintain healthy C-Reactive Protein [hs-CRP] levels").
  - Reference relevant clinical measurements, hormone outputs (cortisol, DHEA), and cellular pathways (AMPK activation, mTOR regulation).

### 3. HPLC & Lab Test Schema Builder (Skill 29)
* **Objective**: Verify product quality and safety by publishing batch testing results.
* **Audit Rules**:
  - Create structured tables detailing batch numbers, active component percentages (e.g., crocin concentration), and heavy metal clearance levels.
  - Link directly to Certificate of Analysis (CoA) PDF files.
  - Represent test results using structured markup to ensure readability by search engine crawlers.

### 4. SameAs External Entity Mapping (Skill 30)
* **Objective**: Link local site entities to authoritative profiles in external knowledge bases.
* **Audit Rules**:
  - In `Organization` and `Person` schema definitions, populate the `sameAs` array.
  - Include links to verified social media profiles, official company registries, Crunchbase, Wikipedia, Wikidata, and scientific indices.

### 5. Quality Certification Indexer (Skill 31)
* **Objective**: Highlight manufacturing, sourcing, and operational compliance.
* **Audit Rules**:
  - Verify that About and Sourcing pages detail certifications (e.g., Good Manufacturing Practices [GMP], FDA-registered facility status, ISO standards).
  - Use structured bullet lists to detail audit credentials, issuing bodies, and registration dates.

---

## Schema Injection Templates for E-E-A-T

### Person (Author) Schema Example:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Sarah Jenkins, MD",
  "jobTitle": "Chief Medical Advisor",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Stanford University School of Medicine"
  },
  "sameAs": [
    "https://orcid.org/0000-0000-0000-0000",
    "https://www.linkedin.com/in/dr-sarah-jenkins"
  ]
}
```
