# Skill: Structured Data & Schema Markup Expert

**Description**: Guides the agent in auditing, validating, and injecting schema.org JSON-LD structures into codebases, ensuring maximum semantic discoverability for AI search engines, RAG pipelines, and crawlers.

## Core Capabilities
- Evaluates HTML and React component trees for structural schema.org markup.
- Generates compliant, highly nested JSON-LD schema blocks (Organization, WebSite, FAQPage, MedicalEntity, Product).
- Cross-references page entities to establish domain and organizational authority.
- Audits and fixes schema formatting errors (syntax, missing properties, invalid schemas).

---

## Technical Standards: React/Next.js JSON-LD Injection

In React and TypeScript codebases, JSON-LD must be injected directly into the DOM using the `<script type="application/ld+json">` tag combined with `dangerouslySetInnerHTML`. 

### Standard Injection Syntax:
```tsx
const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Core question text here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Precise, authoritative answer text detailing the biomarkers and facts."
      }
    }
  ]
};

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
    />
    {/* Page components follow */}
  </>
);
```

---

## Highly Recommended Schema Hierarchies

### 1. Organization Schema
Must include essential entity associations to establish E-E-A-T signals:
- `@context`: `https://schema.org`
- `@type`: `Organization`
- `name`: Official business name.
- `url`: Primary website domain.
- `logo`: Path to organizational logo.
- `sameAs`: Array of verified social media URLs and Wikipedia/Wikidata entries representing the brand's entity.
- `contactPoint`: Customer support phone, email, and contact options.

### 2. FAQPage Schema
Ideal for tool, index, and landing pages to ensure Q&A contents are directly scraped by Perplexity and Google:
- Keep the `acceptedAnswer.text` rich in key terms (biomarkers, dosage, clinical indications).
- The text must exactly match or directly synthesize content visible on the page to prevent indexing penalties.

---

## Verification & Validation Rules

### P0 Issues (Fix Immediately):
- [ ] Schema blocks with invalid JSON syntax (missing quotes, trailing commas, unescaped double quotes).
- [ ] Schema `@type` using invalid schema.org terms.
- [ ] Multiple root-level `Organization` or `WebSite` schemas declared across different pages with mismatched variables.

### P1 Issues (Recommended Improvements):
- [ ] Page-level FAQs lack matching `<script type="application/ld+json">` structured markup.
- [ ] Organization schema lacks the `sameAs` array for external credentials.
- [ ] Missing connection links (e.g. `Product` schema missing links to its manufacturer `Organization` entity).

---

## Execution Workflow (For Agents)

When implementing structured data modifications:
1. **Identify Primary Entities:** Read the page content to identify what core entity it describes (e.g. a company, a product, a health condition, or a Q&A checklist).
2. **Draft the JSON-LD:** Construct the nested JSON object according to schema.org guidelines.
3. **Escaping Strings:** Ensure all quotes inside variables are properly escaped to prevent parsing breaks.
4. **Validation Test:** Run the constructed JSON through standard JSON validation rules inside the workspace auditor.
5. **DOM Verification:** Run a build verification to check that the script loads correctly without throwing React hydration mismatches.
