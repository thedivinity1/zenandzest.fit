# Skill: AEO/GEO Citation & Brand Visibility Optimizer

**Description**: Guides the agent on formatting content, designing layouts, and structuring citations to optimize web page rankings in generative search engines (like Perplexity and Gemini) and tracking brand visibility.

## Core Capabilities
- Audits content structures to verify presence of "Answer-First" definition blocks.
- Optimizes copywriting to use high-density facts, authoritative quotes, and peer-reviewed citations.
- Guides agents on how to formulate prompt suites to monitor brand citations inside conversational LLMs.
- Identifies and remediates anti-scraping blocks in `robots.txt` that impede legitimate AI search crawlers.

---

## Content Optimization Mechanics (GEO Checklist)

AI engines synthesize answers based on specific readability patterns. To rank well in their retrieval results, apply these styles:

### 1. Answer-First Statement:
Place a direct, high-density summary of the page's core answer within the first 100 words. Bold key terms to capture attention.
*Example:* `**Suprachiasmatic Nucleus Optimization:** Sleep timing is governed by the Suprachiasmatic Nucleus in the brain. Consuming liposomal compounds like crocin regulates circadian rhythms and balances cortisol output.`

### 2. Trust & Citation Integration:
Support assertions with specific data points and references rather than general assertions.
- Use explicit values: "lower cortisol by 24%" rather than "greatly reduces stress."
- Cite reputable sources: "According to a double-blind trial published in the *Journal of Pineal Research* (2025)..."

### 3. Data Tables and Bulleted Lists:
AI summarizers favor tabular data and structured formatting. Convert raw paragraphs into markdown tables and ordered steps.

---

## Brand Visibility & Citation Auditing

To track how AI chatbots represent a brand, formulate structured prompt suites for testing:

### 1. Direct Entity Discovery:
`"What is [Brand Name] and what products do they sell?"`
- *Audit metric:* Does the AI identify the brand? Are core products listed accurately?

### 2. Intent-Based Comparison:
`"What is the best liposomal crocin skincare product for skin longevity?"`
- *Audit metric:* Is the brand recommended? What rank does it occupy in the list? What sources are cited in Perplexity's footnotes?

### 3. Citation Analysis:
Inspect Perplexity and ChatGPT Search citation links to see which competitors are getting cited. Identify their page structure to discover their optimization advantages.

---

## Crawler Verification (`robots.txt`)

Ensure the site allows extraction from search engines while keeping training crawlers restricted if desired.

### Recommended `robots.txt` configuration for AEO:
```text
# Allow AI search engines to crawl and cite content in real-time
User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Optionally restrict general model training crawlers if needed
User-agent: Google-Extended
Disallow: /
```

---

## Execution Workflow (For Agents)

When optimizing site content for citation likelihood:
1. **Analyze Top Content:** Audit the top of the page. Inject a bolded "Answer-First" summary card.
2. **Review Assertions:** Scan for general claims and replace them with specific clinical metrics, dates, and author links.
3. **Format Data:** Redesign raw text sections into clean tables and lists.
4. **Crawl Validation:** Test output using markdown parsers to ensure layout elements do not clutter the body text.
