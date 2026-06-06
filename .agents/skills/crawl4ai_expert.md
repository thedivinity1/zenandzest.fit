# Skill: Crawl4AI Integration & Scraper Expert

**Description**: Guides the agent in configuring, running, and integrating Crawl4AI (a high-performance asynchronous web crawler) to extract web pages, run LLM data extraction strategies, and compile clean Markdown for RAG models.

## Core Capabilities
- Configures Crawl4AI's `AsyncWebCrawler` for local or cloud scraping.
- Implements LLM-based and CSS-based schema extraction strategies.
- Optimizes crawler execution parameters (concurrency, dynamic waits, user-agents).
- Integrates Crawl4AI with agentic MCP interfaces for live URL exploration.

---

## Technical Implementation Standards: Crawl4AI

Crawl4AI runs on an asynchronous Python engine utilizing Playwright. Scraper scripts should follow these conventions:

### 1. Basic Async Crawl:
```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def quick_crawl(url):
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url)
        # Returns clean markdown by default
        return result.markdown
```

### 2. Schema-Based AI Extraction (LLM Strategy):
When we need structured fields (e.g. metadata, schemas, citations) from a page, use the `LLMExtractionStrategy`:

```python
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import LLMExtractionStrategy
from pydantic import BaseModel, Field

class PageSchema(BaseModel):
    title: str = Field(description="The primary heading or title of the page")
    summary: str = Field(description="A concise summary of the content")
    has_schema: bool = Field(description="Whether the page contains schema.org JSON-LD")

async def structured_crawl(url):
    strategy = LLMExtractionStrategy(
        provider="openai/gpt-4o",  # or gemini, anthropic
        schema=PageSchema.schema(),
        instruction="Extract the page title, a 2-sentence summary, and whether JSON-LD schemas are present."
    )
    
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(
            url=url,
            extraction_strategy=strategy,
            bypass_cache=True
        )
        return result.extracted_content
```

---

## Performance & Optimization Guidelines

1. **Caching Management:** Crawl4AI caches crawled pages by default. Set `bypass_cache=True` in development or auditing scripts to ensure live updates are scanned.
2. **Dynamic Content Waits:** For pages built with React or heavy JS libraries, configure the crawler to wait for specific DOM elements (e.g. `css:#root` or `wait_for_selector`) before extracting text.
3. **Token Reduction:** Enable text cleaning filters inside Crawl4AI options to strip out script tags, styles, and empty spaces prior to LLM processing.

---

## Verification & Audit Checklist

### P0 Issues (Fix Immediately):
- [ ] Crawl4AI running synchronously blocking event loops.
- [ ] Missing error handling for page timeouts or dynamic element failures.
- [ ] Large batch crawls running without concurrency limits (can trigger server IP blocks).

### P1 Issues (Recommended Improvements):
- [ ] Not leveraging proxy rotations or rotating user-agents for large audits.
- [ ] Cache enabled when scanning for real-time content revisions.
- [ ] HTML structures parsed directly rather than converting to Markdown.

---

## Execution Workflow (For Agents)

When setting up a Crawl4AI-based web exploration task:
1. **Initialize Async Loop:** Ensure the script runs within an async context (`asyncio.run()`).
2. **Set User-Agent:** Configure a realistic user-agent string to prevent immediate blocks.
3. **Clean output:** Use the default markdown extraction properties to obtain clean text.
4. **Error Catching:** Implement try-except statements covering request failures or DNS timeouts.
