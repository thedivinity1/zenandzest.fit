# Skill: LLMs.txt Configuration & Optimization Expert

**Description**: Guides the agent in creating, validating, and updating standard-compliant `llms.txt` and `llms-full.txt` files to optimize website consumption for Large Language Models (LLMs) and search crawlers.

## Core Capabilities
- Audits existing website root configurations for `llms.txt` and `llms-full.txt` files.
- Generates clean, structured, standard-compliant `llms.txt` syllabuses.
- Validates syntax and links inside AI crawler instructions.
- Optimizes page descriptions to minimize token consumption and maximize ingestion relevance.

---

## Technical Specifications: Standard `llms.txt`

The file must sit at the domain root (e.g., `public/llms.txt`) and be formatted in standard Markdown. The structure should follow this pattern:

```markdown
# [Project Name or Brand Title]

> [Short 1-2 sentence description explaining what the project or brand does.]

## Section Name
- [Link Title](relative/path/to/page.md): Description of what this page covers and the entities defined inside.
- [Another Link](relative/path/to/other.md): Description of the tools or biomarkers detailed on this page.
```

### Key Formatting Rules:
1. **Plain Text and Markdown Only:** Do not include HTML formatting tags (like `<div>` or `<span>`).
2. **Relative Links Preferred:** Links to other documents should be relative to the domain (e.g. `/docs/api.md` or `src/pages/DermalCrocinPage.tsx`).
3. **No tracking variables:** Clean all tracking metrics (like `?utm_source=ai`) from URLs.

---

## Detailed Ingestion Guidelines

### Section Types:
- **`# Summary` / Header:** Primary brand focus, clinical credentials, and overall site mission.
- **`## Core Modules / Pages`:** Directory listing the main sections of the website.
- **`## API References` (If applicable):** Structural endpoints, payloads, and parameter definitions.
- **`## Optional / Advanced Details`:** Links to `llms-full.txt` or extended research compilations.

### LLMs-full.txt Requirements:
For large sites, the agent should create an `llms-full.txt` containing the consolidated plain-text Markdown bodies of all pages on the site, separated by horizontal lines (`---`), allowing crawlers to ingest the entire knowledge base in a single request.

---

## Verification & Audit Checklist

### P0 Issues (Fix Immediately):
- [ ] No `llms.txt` file present at the public root of the repository.
- [ ] Broken internal relative links within the `llms.txt` list.
- [ ] Presence of heavy DOM strings or layout CSS inside the crawler markdown.

### P1 Issues (Recommended Improvements):
- [ ] `llms.txt` does not reference or link to the extended `llms-full.txt` file.
- [ ] Descriptions for links are missing or vague (e.g., listing a page name with no entity explanations).
- [ ] Markdown files linked in the text contain absolute developer environment links (`localhost:5173`).

---

## Execution Workflow (For Agents)

When optimizing or generating an `llms.txt` configuration:
1. **Analyze Sitemaps:** Scan the codebase directory to extract all user-accessible routes.
2. **Entity Summarization:** Write a 1-sentence description for each route explaining what entity or tool it represents.
3. **Write public/llms.txt:** Create the root file using the standard Markdown syntax defined above.
4. **Link to Full Version:** Include a reference link at the bottom pointing to `llms-full.txt`.
5. **Verify Formatting:** Verify that the generated file contains no HTML tags or stray styling code.
