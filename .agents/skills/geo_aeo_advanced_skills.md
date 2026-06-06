# Skill: Advanced GEO & AEO (Generative & Answer Engine Optimization)

**Description**: Contains advanced, state-of-the-art strategies, tools, and configurations for optimizing website visibility across generative search engines (like ChatGPT, Perplexity, and Google AI Overviews) based on the latest academic research and industry tools.

---

## 1. Advanced AEO & GEO Toolchain Reference
When auditing or optimizing site visibility, utilize and reference these key open-source GEO projects:
*   **awesome-generative-engine-optimization**: The master directory of research papers, benchmarks, and optimization strategies for generative search.
*   **geo-optimizer**: A pluggable framework to register custom content transformations and check how well LLMs retrieve and cite modified content.
*   **codex-seo**: A modular GEO skill suite integrating firecrawl/markdown ingest workflows with schema validation.
*   **aperture**: A self-hosted AI visibility monitor to query and track brand citation share on Perplexity, ChatGPT Search, and Google AI Overviews.
*   **dualmark**: A framework to maintain synchronous clean Markdown copies ("twins") alongside traditional HTML templates for seamless parser ingestion.

---

## 2. Universal AI Agent Context (`ai.txt` Specification)
Create and place an `ai.txt` file at the root directory of the site (`/ai.txt`) conforming to the **aitxt.ing** standard.

### Syntax Rules:
1.  **YAML Front Matter**: Include metadata at the top of the file between `---` markers:
    ```yaml
    ---
    updated: YYYY-MM-DD
    scope: /
    ---
    ```
2.  **Clear Assertions**: Structure facts using Markdown headers (`#`, `##`) and bullet lists.
3.  **Positive Context Silo**: Explicitly declare **What We Offer** and **What We Do Not Offer** to prevent LLM hallucinations or false inferences.
4.  **Instructions for AI**: Add a specific section `## Guidance for AI Assistants` to instruct agents on how to interpret, cite, and direct users to specific page routes.

---

## 3. GEO Citation Optimization Checklist
To maximize citation rates by generative engines, ensure content meets these requirements:
*   **Answer-First Statement**: Place a bold, high-density summary (2-3 sentences) at the very top of each page or section. AI crawlers favor content that provides immediate answers to user intents.
*   ** Verifiable Statistics & Entity Proof**: Include specific metrics, batch IDs, and chemical values. AI search systems prioritize quantitative, verifiable data when compiling answers.
*   **Structured Metadata Graph**: Embed JSON-LD schemas (`Organization`, `FAQPage`, `MedicalWebPage`, `Product`) containing absolute canonical URLs and social profiles to verify entity ownership.
*   **Markdown Twins**: Compile and serve clean Markdown versions (`llms.txt`, `llms-full.txt`) that link to primary routes to make crawling low-cost and high-fidelity for LLM crawlers.
