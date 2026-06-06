import fs from 'fs';
import path from 'path';
import { STRATEGIST_PROMPT, WRITER_PROMPT, EDITOR_PROMPT } from './prompts.js';

// Configuration
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-3-5-sonnet-20241022';
const OUTPUT_DIR = path.resolve('../src/pages/blog-content'); // Simulated output directory

if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY environment variable.");
  process.exit(1);
}

// Utility: Call Claude API
async function callClaude(systemPrompt, userPrompt, maxTokens = 4000) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API Error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Phase 1: Strategist
async function generateBrief(topic) {
  console.log(`[Strategist] Generating brief for topic: "${topic}"...`);
  
  const userPrompt = `Topic: ${topic}. Generate a comprehensive GEO/SEO brief in strict JSON format.`;
  const responseText = await callClaude(STRATEGIST_PROMPT, userPrompt, 2000);
  
  // Extract JSON from response (in case Claude wraps it in markdown blocks)
  const jsonMatch = responseText.match(/\{.*\}/s);
  if (!jsonMatch) throw new Error("Failed to parse JSON from Strategist output.");
  
  return JSON.parse(jsonMatch[0]);
}

// Phase 2: Writer (Section by Section)
async function draftSection(brief, sectionOutline) {
  console.log(`[Writer] Drafting section: "${sectionOutline.heading}"...`);
  
  const userPrompt = `
Brief Context:
Title: ${brief.title}
Target Keywords: ${brief.keywords.join(', ')}
Required Entities: ${brief.required_entities.join(', ')}

Section to Write:
Heading: ${sectionOutline.heading}
Talking Points:
${sectionOutline.points.map(p => `- ${p}`).join('\n')}

Write the section now following the GEO principles.
`;
  
  return await callClaude(WRITER_PROMPT, userPrompt, 2500);
}

// Phase 3: Editor
async function polishDraft(draft) {
  console.log(`[Editor] Polishing full draft...`);
  const userPrompt = `Review and polish the following draft:\n\n${draft}`;
  return await callClaude(EDITOR_PROMPT, userPrompt, 4000);
}

// Phase 4: Publisher
function publishToDisk(brief, polishedContent) {
  console.log(`[Publisher] Saving article to disk...`);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${dateStr}-${brief.slug}.md`;
  const filePath = path.join(OUTPUT_DIR, filename);
  
  const mdxContent = `---
title: "${brief.title}"
date: "${dateStr}"
seo_keywords: "${brief.keywords.join(', ')}"
intent: "${brief.intent}"
---

# ${brief.title}

${polishedContent}
`;

  fs.writeFileSync(filePath, mdxContent, 'utf-8');
  console.log(`[Success] Article published to ${filePath}`);
  return filePath;
}

// Main Orchestrator
async function runPipeline(topic) {
  try {
    console.log(`=== STARTING AI/GEO SEO PIPELINE ===`);
    
    // 1. Generate Brief
    const brief = await generateBrief(topic);
    console.log(`Brief created with ${brief.outline.length} sections.`);
    
    // 2. Draft Sections
    let fullDraft = '';
    for (const section of brief.outline) {
      const sectionContent = await draftSection(brief, section);
      fullDraft += `## ${section.heading}\n\n${sectionContent}\n\n`;
    }
    
    // 3. Edit & Polish
    const polishedContent = await polishDraft(fullDraft);
    
    // 4. Publish
    const savedPath = publishToDisk(brief, polishedContent);
    
    console.log(`=== PIPELINE COMPLETE ===`);
    console.log(`Verify the output at: ${savedPath}`);
    
  } catch (err) {
    console.error("Pipeline failed:", err);
  }
}

// Check if script is run directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const topic = process.argv[2] || "The role of Akkermansia muciniphila in metabolic longevity and GLP-1 regulation";
  runPipeline(topic);
}
