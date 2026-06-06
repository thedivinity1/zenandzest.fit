# Skill: Technical SEO Audits & Crawlability

**Description**: Enables the agent to perform deep technical SEO and crawlability audits across the codebase. Ensures that search engine and AI crawlers can cleanly discover, access, and parse all pages without errors, timeouts, or redirection loops.

---

## Technical Audit Checklists

### 1. Robots.txt Validator (Skill 1)
* **Objective**: Ensure that critical AI search engine agents and web crawlers are allowed to crawl site assets, while preventing scraping of non-public folders.
* **Audit Rules**:
  - Locate `robots.txt` in the public directory (e.g., `public/robots.txt`).
  - Verify that `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Applebot-Extended`, and `Google-Extended` are explicitly configured.
  - Flag any general `Disallow: /` statements affecting search crawlers.
  - Maintain a modern list of user-agents for generative engines.

### 2. XML Sitemap Crawler (Skill 2)
* **Objective**: Keep the XML sitemap synchronized with the actual codebase pages and components.
* **Audit Rules**:
  - Scan `public/sitemap.xml`.
  - Extract all `<loc>` entries.
  - Verify that each route corresponds to an existing component or static route file in the codebase (e.g. inside `src/pages/` or `app/`).
  - Flag any dead or orphaned sitemap references.

### 3. Canonical Tag Auditor (Skill 3)
* **Objective**: Avoid duplicate content issues by ensuring every indexable page declares its authoritative URL.
* **Audit Rules**:
  - Audit React/HTML templates to confirm the presence of `<link rel="canonical" href="https://example.com/current-page" />`.
  - Ensure dynamic canonical components use absolute URLs and correctly strip query parameters unless required for indexing.

### 4. Hreflang Multi-Language Mapper (Skill 4)
* **Objective**: Ensure search engines serve the correct regional version of a page.
* **Audit Rules**:
  - Scan the HTML header layout for `<link rel="alternate" hreflang="x" href="y" />` tags.
  - Verify that matching regional URLs are active and cross-reference each other bi-directionally.
  - Ensure the fallback `hreflang="x-default"` is declared.

### 5. Page Speed & DOM Weight Auditor (Skill 5)
* **Objective**: Optimize DOM complexity and asset payload to prevent crawler timeouts (AI indexers typically timeout at 3 seconds).
* **Audit Rules**:
  - Analyze React DOM trees for excessive nesting depth (flag depth > 15 levels).
  - Check for lazy-loading on images (`loading="lazy"`) and deferral of heavy interactive JS widgets.
  - Verify that critical text content loads in the initial HTML payload or is ready immediately on hydration.

### 6. Mobile Viewport Validator (Skill 6)
* **Objective**: Ensure correct rendering across mobile viewports, which is critical for mobile-first indexing.
* **Audit Rules**:
  - Check the document head configuration for `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
  - Check for responsive styling constraints, ensuring element widths do not overflow standard viewport dimensions.

### 7. Broken Link Finder (Skill 7)
* **Objective**: Cleanse the codebase of broken internal and external links that deplete crawl budget.
* **Audit Rules**:
  - Scan all source files for `<a>` tags and `href` declarations.
  - Verify that all relative internal paths resolve to actual pages.
  - For external URLs, check for standard HTTP 200 responses and alert on 404/500 errors.

### 8. SSL & Security Header Auditor (Skill 8)
* **Objective**: Validate secure serving infrastructure preferred by modern search indexes.
* **Audit Rules**:
  - Ensure all HTTP requests redirect to HTTPS.
  - Audit security headers (HSTS, Content Security Policy, X-Frame-Options) to ensure security and prevent site spoofing.

---

## Actionable CLI Commands & Tools
When running technical audits, execute these CLI utilities:
- **Scan Local Links & Assets**: Use custom scraper tools or Python-based linting scripts (e.g. `python seo_linter.py`) to parse internal links.
- **Inspect robots.txt**: Run `cat public/robots.txt` (or equivalent shell commands) to verify agent blocks.
- **Verify Production Build**: Run `npm run build` or `pnpm build` to check for compilation/bundling issues.
