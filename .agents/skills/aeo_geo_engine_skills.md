# Skill: Generative Engine Optimization (GEO) & AEO

**Description**: Guides the agent in optimizing web content specifically for AI-powered search engines, conversational search agents, and Retrieval-Augmented Generation (RAG) pipelines. Ensures content is easily retrieved, summarized, and cited by engines like Perplexity, Gemini, ChatGPT, and Google AI Overviews.

---

## AI-Search Optimization Checklists

### 1. "Answer-First" Layout Placement (Skill 19)
* **Objective**: Place the direct answer above-fold so LLM scrapers can immediately extract the core insight.
* **Audit Rules**:
  - Insert a high-visibility summary block within the **first 100 words** of the page.
  - The block should contain a bolded definition or direct response to the primary user query intent.
  - *Example*: `**Summary**: Epigenetic clocks measure biological age by analyzing DNA methylation patterns across specific genomic loci.`

### 2. Footnotes & Scholarly Citations (Skill 20)
* **Objective**: Build credibility in RAG contexts by structurally attributing assertions.
* **Audit Rules**:
  - Anchor scientific claims with inline bracketed footnotes (e.g. `[1]`, `[2]`).
  - Provide a dedicated `## References` section at the bottom of the page linking to high-authority domains (e.g., PubMed, NCBI, Nature).

### 3. LLM Summarizability & Token Density (Skill 21)
* **Objective**: Optimize content formatting to decrease token overhead and prevent context window fragmentation.
* **Audit Rules**:
  - Avoid verbose filler text. Draft paragraphs that are dense with factual information.
  - Ensure that key definitions are contained within contiguous text blocks rather than dispersed throughout the document.

### 4. RAG Chunking Optimization (Skill 22)
* **Objective**: Format page content to align with standard vector database chunking sizes (e.g., 500-1000 characters).
* **Audit Rules**:
  - Use distinct markdown header boundaries (`##`, `###`) to guide splitter scripts.
  - Keep each section self-contained so that a single extracted chunk retains all necessary context, including the primary topic name.

### 5. Chatbot Sentiment Auditing (Skill 23)
* **Objective**: Monitor brand associations across conversational LLMs.
* **Audit Rules**:
  - Periodically prompt AI models (using Web Search or Brave tools) to evaluate brand sentiments.
  - Remediate negative semantic correlations by publishing clear, corrective entity metadata.

### 6. Perplexity Citation Ranker (Skill 24)
* **Objective**: Align content layout with parameters heavily weighted by Perplexity's indexes.
* **Audit Rules**:
  - Include explicit author credentials, publication dates, and last-updated stamps.
  - Embed research-backed statistics and structured data.

### 7. Zero-Click Snippet Planning (Skill 25)
* **Objective**: Format information to occupy Google's featured snippets and chatbot direct summaries.
* **Audit Rules**:
  - Extract step-by-step guides into ordered lists (`1.`, `2.`, `3.`).
  - Convert comparative data points into clean markdown tables instead of long narrative paragraphs.

### 8. Conversational Q&A Voice Search (Skill 26)
* **Objective**: Optimize headers to mirror conversational, long-tail search queries.
* **Audit Rules**:
  - Frame subheadings (`<h2>`, `<h3>`) as natural questions (e.g., `## How does HPA axis dysfunction affect sleep quality?`).
  - Follow the question immediately with a direct, single-paragraph answer.

---

## System Guidelines for Agents
1. **Fact Density Over Prose**: When generating content, prioritize factual precision. AI synthesis engines prioritize pages with verified data and specific measurements.
2. **Visual Block Design**: Design pages with prominent visual boxes for summary callouts, making them easily targetable by CSS selectors.
