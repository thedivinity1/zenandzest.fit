# Skill: GEO and AI SEO Auditor

**Description**: Audits web pages and projects for Generative Engine Optimization (GEO) readiness. Enables the agent to perform expert-level SEO optimization tailored for AI engines like Perplexity, ChatGPT, Claude, and Google AI Overviews.

## Core Capabilities
- Verifies the presence of `llms.txt` for AI crawlers.
- Audits JSON-LD schema (FAQ, WebSite, Organization).
- Checks for "Answer-First" semantic structure in React/HTML pages.
- Validates E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) entity signals.
- Reviews page speed implications for AI engine rendering.
- Validates mobile-first content structure.

## E-E-A-T Validation Checklist

### Experience Signals
- [ ] Clinical credentials displayed (MD, BAMS, PhD)
- [ ] Peer-reviewed publication counts
- [ ] Real-world case study data with biomarkers
- [ ] Batch testing certificates (NABL, HPLC validation)

### Expertise Evidence
- [ ] Technical terminology accuracy (HPA Axis, not "adrenal fatigue")
- [ ] Standardized extract percentages verified
- [ ] Clinical marker references (8-OHdG, LC3-II, qPCR)
- [ ] Research citations with dates and journals

### Authoritativeness Indicators
- [ ] Medical advisory board with named experts
- [ ] Double-blind trial mentions
- [ ] Heavy metal testing results (<1ppm clearance)
- [ ] Extraction method superiority documentation

### Trustworthiness Markers
- [ ] Full ingredient transparency
- [ ] Batch certificate database access
- [ ] Adverse event handling documentation
- [ ] Third-party laboratory verification

## Structured Data Audit

### Required Files
- `public/llms.txt` - AI crawler summary with entity relationships
- `public/llms-full.txt` - Extended knowledge graph for comprehensive crawling
- `public/.well-known/aeo.json` - AEO protocol declaration with authoritative claims
- `public/schema.jsonld` - Organization and WebSite schema markup

### Page-Level Requirements
- FAQPage schema with minimum 1 question per major topic page
- Answer-First block within first 100 words of content
- Entity-specific schema matching page topic (HPA Axis, Mitochondrial Health, etc.)
- dangerouslySetInnerHTML script injection pattern (matching CircadianPlannerPage.tsx)

### Content Structure Verification
- Clear question-answer format in FAQ schema
- Scientifically accurate terminology
- Citations and clinical markers included
- Structured lists and tables preferred over dense paragraphs

## Page Speed GEO Considerations

### Critical Rendering Factors
- Initial content visible within 2 seconds (AI engines timeout at 3s)
- Bundle size under 500KB for critical path
- Schema JSON injected before heavy interactive components
- Critical above-fold content contains Answer-First statement

### Lazy Loading Strategy
- Non-critical images lazy-loaded
- Analytics scripts deferred
- Interactive calculators loaded after initial render
- ScrollAnimator animations don't block content delivery

## Mobile-First GEO Optimization

### Content Hierarchy
- H1 tags contain primary entity keywords
- Answer-First statements visible without scrolling
- FAQ schema questions match voice search patterns
- Touch targets minimum 48px for interactive elements

### AI Engine Mobile Rendering
- Content width respects viewport boundaries
- Font sizes readable without zoom (16px base minimum)
- Schema markup valid for mobile crawlers
- Image alt text describes entity relationships

## Entity Consistency Checks

### Brand Authority Mapping
- Organization schema matches about page content
- WebSite schema references same URLs as navigation
- Social profile links consistent across pages
- Product categories map to actual formulations

### Scientific Accuracy Verification
- All biomarker values within physiological ranges
- Clinical markers match cited research
- Dosage recommendations align with safety thresholds
- Terminology consistent (HPA Axis Dysfunction, not "adrenal fatigue")

## Knowledge Graph Optimization

### Entity Relationships
- Products link to scientific targets
- Tools reference underlying biomarkers
- Team members connect to specialty domains
- Research citations link to specific interventions

### Cross-Reference Integrity
- All internal links resolve to existing pages
- Schema entities reference each other appropriately
- Content hierarchy supports topic clustering
- Authority signals distributed across pillar pages

## Execution Workflow (For Agents)

When a user requests SEO optimization or a GEO audit, follow this standard operating procedure:

1. **Entity Foundation**:
   - Create or verify `llms.txt` at the public root to provide AI crawlers with a markdown-friendly summary of the site's entities.
   - Inject `<script type="application/ld+json">` schemas (Organization, WebSite, FAQPage) into page components using `dangerouslySetInnerHTML`.

2. **Content Structure ("Answer-First")**:
   - Ensure the first 100 words of a page or component answer the core intent directly (e.g., using `<strong>Answer-First:</strong>` blocks).
   - Use clear `<h1>` and `<h2>` hierarchies. Avoid deeply nested, complex DOM trees without clear semantic tags.
   - Favor tables, bulleted lists, and step-by-step guides, as AI models parse these heavily for synthesis.

3. **Keyword & Topic Clustering (Entity-Based)**:
   - Shift from generic, high-competition keywords to intent-driven clusters (e.g., instead of "Adrenal Fatigue", use "HPA Axis Dysfunction"; instead of "Anti-Aging", use "Skin Longevity").
   - Create Hub & Spoke structures where cluster pages link back to a central Pillar page.

4. **Technical Readiness**:
   - Ensure meta descriptions and Open Graph (`og:`) tags accurately reflect the AI-focused entity keywords.
   - Verify that critical content is not hidden behind complex client-side JavaScript that requires excessive rendering time.

5. **Verification**:
   - Run `npm run build` to ensure no TypeScript/React errors are introduced.
   - Validate schema JSON structure using online tools.
   - Confirm llms.txt readability with standard LLM parsing.

## GEO Scoring Rubric

### High Priority (P0) Issues
- Missing FAQ schema on tool/assessment pages
- Absent Answer-First statements on core content
- Invalid or missing Organization schema
- Broken internal linking between related entities

### Medium Priority (P1) Issues
- Incomplete llms.txt with missing sections
- Unresolved AEO declaration file
- Generic terminology instead of entity-specific
- Missing clinical credential visibility

### Low Priority (P2) Issues
- Meta description length optimization
- Image alt text improvements
- Minor schema property enhancements
- Additional FAQ question opportunities
