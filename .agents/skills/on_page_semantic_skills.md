# Skill: On-Page & Semantic SEO

**Description**: Guides the agent in auditing and optimizing on-page copy, metadata, heading hierarchies, semantic density, and content silos. Enables the agent to construct semantically rich, accessible, and structured copy that search engine algorithms and semantic search engines understand.

---

## On-Page Audit & Optimization Checklists

### 1. Keyword Density & Stuffing Linter (Skill 9)
* **Objective**: Maintain optimal keyword concentration while avoiding spam filters or manual actions.
* **Audit Rules**:
  - Target keyword density should remain between **1.0% and 2.5%** of the total word count.
  - If a primary keyword exceeds 2.5%, recommend contextually appropriate synonyms or rephrase sentences.
  - Flag consecutive repetitive phrases that read unnaturally.

### 2. H1/H2 Heading Hierarchist (Skill 10)
* **Objective**: Maintain a clear structure so search engines and assistive technologies can parse the content hierarchy.
* **Audit Rules**:
  - Exactly **one `<h1>`** element must be present per page.
  - Heading tags must follow a strict sequential hierarchy (e.g., `<h1>` followed by `<h2>`, followed by `<h3>`).
  - Never skip levels (do not jump from `<h1>` directly to `<h3>` or `<h4>`).

### 3. Image Alt Attribute Auditor (Skill 11)
* **Objective**: Ensure image crawlers can index visual assets and enhance accessibility.
* **Audit Rules**:
  - Scan all `<img>` elements (and custom React `Image` components).
  - Ensure every image has a descriptive, non-empty `alt` attribute.
  - Avoid generic descriptions like `alt="image"` or `alt="photo"`. Instead, use entity-rich keywords (e.g., `alt="HPLC purity laboratory test showing herbal extract clearance"`).

### 4. Open Graph Metadata Syncer (Skill 12)
* **Objective**: Align social media metadata with primary SEO meta tags to ensure consistent previews.
* **Audit Rules**:
  - Ensure all layout headers include valid Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card`.
  - The descriptions should match the meta description length limits (under 160 characters).

### 5. TF-IDF & LSI Semantic Enricher (Skills 13 & 14)
* **Objective**: Enhance semantic depth by integrating highly correlated Latent Semantic Indexing (LSI) keywords and TF-IDF terms.
* **Audit Rules**:
  - Identify the primary entity of the page (e.g., "circadian rhythm", "HPA Axis").
  - Ingest related high-affinity terms (e.g. "cortisol secretion", "suprachiasmatic nucleus", "light exposure") and integrate them naturally into body copy.
  - Ensure synonyms are used to prevent repetitive keyword stuffing.

### 6. Readability & Flesch-Kincaid Auditor (Skill 15)
* **Objective**: Ensure the reading level matches the target audience demographics.
* **Audit Rules**:
  - Check readability indices. Aim for a **Flesch Reading Ease score of 60–70** (plain English, high accessibility) for general content.
  - Keep sentences under 25 words on average and limit dense paragraphs to a maximum of 4–5 sentences.

### 7. Duplicate Content & Orphan Page Scanner (Skills 16 & 17)
* **Objective**: Eliminate duplicate rendering blocks and locate hidden pages.
* **Audit Rules**:
  - Compare copy blocks across pages to flag duplicate boilerplate blocks.
  - Run link-graph analyses to identify "orphan pages"—pages that are indexable but have zero internal links pointing to them.
  - Ensure every page has at least one incoming crawl path.

### 8. Topical Authority Mapper / Content Silo Builder (Skill 18)
* **Objective**: Structure internal linking to establish clear parent-child relationships (Hub & Spoke / Silos).
* **Audit Rules**:
  - Ensure spoke articles (deep subtopic pages) link back to the parent pillar page using keyword-rich anchor text.
  - Prevent random cross-silo linking; route authority upward to pillar pages to distribute equity.

---

## Actionable Execution Rules
- **Anchor Text Audits**: Avoid using generic link texts like "click here" or "read more". Always use descriptive anchor text (e.g. "[mitochondrial health guide](/blog/mitochondrial-health)").
- **Header Metadata Integrity**: Ensure that meta title and description tags are dynamically populated based on page props in React.
