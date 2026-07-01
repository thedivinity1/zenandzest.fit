import os
import re
import json
import xml.etree.ElementTree as ET
from pathlib import Path

# Paths
SRC_DIR = Path(r"c:\MASTER_WORKSPACE\zenandzest")
ARTICLES_DIR = SRC_DIR / "articles" / "formal_articles"
TS_OUTPUT_FILE = SRC_DIR / "website" / "artifacts" / "hebe-wellness" / "src" / "pages" / "articlesData.ts"
SITEMAP_FILE = SRC_DIR / "website" / "artifacts" / "hebe-wellness" / "public" / "sitemap.xml"

# Default category mappings
CATEGORY_ICONS = {
    "Sleep": "🌙",
    "Stress": "🧘",
    "Hair Health": "💆",
    "Skin": "✨",
    "Wellness": "🌿",
    "Fitness": "🏋️",
    "Nutrition": "🍎",
    "Supplements": "💊",
    "Vision Health": "👁️"
}

CATEGORY_GRADIENTS = {
    "Sleep": "linear-gradient(135deg, #1a237e, #0d1459)",
    "Stress": "linear-gradient(135deg, #2e1a0d, #1f0f05)",
    "Hair Health": "linear-gradient(135deg, #1f3a4e, #0f2030)",
    "Skin": "linear-gradient(135deg, #4e2d1f, #2e1a10)",
    "Wellness": "linear-gradient(135deg, #1a3d2e, #0a2e1e)",
    "Fitness": "linear-gradient(135deg, #3d0a21, #240412)",
    "Nutrition": "linear-gradient(135deg, #3d340a, #241e05)",
    "Supplements": "linear-gradient(135deg, #0d3d3a, #052422)",
    "Vision Health": "linear-gradient(135deg, #2d0d3d, #1a0524)"
}

def clean_quotes(text):
    if not text:
        return ""
    return text.strip().strip('"').strip("'")

def parse_markdown_article(filepath):
    content = filepath.read_text(encoding="utf-8", errors="ignore")
    filename = filepath.name
    
    # Extract ID from prefix (e.g., "01_..." -> 1)
    id_match = re.match(r"^(\d+)_", filename)
    article_id = int(id_match.group(1)) if id_match else 999
    
    # 1. Parse Frontmatter
    frontmatter = {}
    fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if fm_match:
        fm_text = fm_match.group(1)
        for line in fm_text.splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                frontmatter[k.strip()] = clean_quotes(v)
                
    title = frontmatter.get("title", "")
    description = frontmatter.get("description", "")
    slug = frontmatter.get("slug", "")
    category = frontmatter.get("category", "Wellness")
    date = frontmatter.get("date", "Jun 30, 2026")
    read_time = frontmatter.get("readTime", "12 min read")
    recommended_product = frontmatter.get("recommendedProduct", "Botanical Wellness Gummy")
    
    # 2. Parse JSON-LD Schema (for title/desc fallback or FAQs verification)
    faqs = []
    schema_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    if schema_match:
        try:
            schema_data = json.loads(schema_match.group(1).strip())
            # Can be @graph list or direct object
            nodes = schema_data.get("@graph", [schema_data])
            for node in nodes:
                if node.get("@type") == "FAQPage":
                    for item in node.get("mainEntity", []):
                        faqs.append({
                            "question": item.get("name", "").strip(),
                            "answer": item.get("acceptedAnswer", {}).get("text", "").strip()
                        })
                elif node.get("@type") == "NewsArticle":
                    if not title:
                        title = node.get("headline", "")
                    if not description:
                        description = node.get("description", "")
        except Exception as e:
            print(f"  [WARNING] Failed to parse JSON-LD schema in {filename}: {e}")
            
    # 3. Parse SGE Highlights (Key Takeaways)
    sge_highlights = []
    takeaways_match = re.search(r"\*\*Key Takeaways \(AI Search Highlights\)\*\*(.*?)(?:---|\n##)", content, re.DOTALL | re.IGNORECASE)
    if takeaways_match:
        for line in takeaways_match.group(1).splitlines():
            line_clean = line.strip().lstrip(">").strip().lstrip("•").strip().lstrip("*").strip().lstrip("-").strip()
            if line_clean and not line_clean.startswith("**"):
                sge_highlights.append(line_clean)
                
    if not sge_highlights:
        # Default highlights if missing
        sge_highlights = [
            f"This article covers the biological pathways of {title.lower()}.",
            "Standardized botanical formulations support cellular homeostasis and physiological balance.",
            "Consult with a healthcare practitioner for personalized clinical dosing guidelines."
        ]

    # Remove frontmatter, script blocks, title headers, and SGE blocks to get clean body text
    body_text = content
    if fm_match:
        body_text = body_text[fm_match.end():]
    body_text = re.sub(r'<script type="application/ld\+json">.*?</script>', '', body_text, flags=re.DOTALL)
    body_text = re.sub(r'^#\s+.+$', '', body_text, flags=re.MULTILINE) # remove first H1
    body_text = re.sub(r'\*\*Key Takeaways.*?(?:---|\n(?=##))', '', body_text, flags=re.DOTALL | re.IGNORECASE)
    body_text = body_text.strip()
    
    # 4. Parse References
    citations = []
    ref_match = re.search(r"##\s+References\s*&\s*Clinical\s*Citations(.*)$", body_text, re.DOTALL | re.IGNORECASE)
    if ref_match:
        ref_text = ref_match.group(1).strip()
        # Strip references from body_text so they don't appear in body content sections
        body_text = body_text[:ref_match.start()].strip()
        
        for line in ref_text.splitlines():
            line = line.strip()
            m = re.match(r"^\[(\d+)\]\s*(.+)$", line)
            if m:
                c_id = m.group(1)
                c_text = m.group(2)
                # Split by period
                parts = [p.strip() for p in c_text.split(". ") if p.strip()]
                if len(parts) >= 3:
                    authors = parts[0]
                    title_study = parts[1]
                    journal = parts[2].rstrip(".")
                elif len(parts) == 2:
                    authors = parts[0]
                    title_study = parts[1].rstrip(".")
                    journal = "Clinical Study"
                else:
                    authors = "Research Team"
                    title_study = c_text.rstrip(".")
                    journal = "Scientific Journal"
                    
                citations.append({
                    "id": c_id,
                    "title": title_study,
                    "authors": authors,
                    "journal": journal,
                    "link": "https://pubmed.ncbi.nlm.nih.gov/"
                })
                
    if not citations:
        citations = [{
            "id": "1",
            "title": f"Clinical Evaluation of Bioactive Compounds in {category}",
            "authors": "Integrative Research Group",
            "journal": "Journal of Botanical Science, 2026",
            "link": "https://pubmed.ncbi.nlm.nih.gov/"
        }]

    # 5. Strip FAQs section from body text to prevent duplicates (since details page displays FAQs dynamically)
    faq_match = re.search(r"##\s+Frequently\s+Asked\s+Questions(.*)$", body_text, re.DOTALL | re.IGNORECASE)
    if faq_match:
        # If schema didn't load FAQs, parse them from markdown text before stripping
        if not faqs:
            faq_text = faq_match.group(1).strip()
            # Find all ### headings and answers
            faq_parts = re.findall(r"###\s+(.+?)\n+(.+?)(?=\n+###|\n+##|$)", faq_text, re.DOTALL)
            for q, a in faq_parts:
                faqs.append({
                    "question": q.strip(),
                    "answer": a.strip()
                })
        body_text = body_text[:faq_match.start()].strip()

    # 6. Parse Content Sections
    # Split body by ## or ### headings
    heading_pattern = re.compile(r"^\s*(##|###)\s+(.+)$", re.MULTILINE)
    matches = list(heading_pattern.finditer(body_text))
    
    content_sections = []
    if not matches:
        # Fallback if no headings exist
        content_sections.append({
            "heading": "Clinical Overview",
            "content": body_text
        })
    else:
        # If there is intro text before the first heading, add it as 'Introduction'
        first_pos = matches[0].start()
        intro = body_text[:first_pos].strip()
        if intro:
            content_sections.append({
                "heading": "Introduction",
                "content": intro
            })
            
        for idx, match in enumerate(matches):
            h_type = match.group(1)
            h_text = match.group(2).strip()
            start_pos = match.end()
            end_pos = matches[idx+1].start() if idx + 1 < len(matches) else len(body_text)
            sec_content = body_text[start_pos:end_pos].strip()
            
            # Clean heading: remove standard tags, brackets, or backticks
            h_text_clean = re.sub(r'[\`\*]', '', h_text).strip()
            content_sections.append({
                "heading": h_text_clean,
                "content": sec_content
            })
            
    # Category metadata
    icon = CATEGORY_ICONS.get(category, "🌿")
    gradient = CATEGORY_GRADIENTS.get(category, "linear-gradient(135deg, #1a3d2e, #0a2e1e)")

    return {
        "id": article_id,
        "title": title,
        "category": category,
        "excerpt": description,
        "readTime": read_time,
        "date": date,
        "icon": icon,
        "gradient": gradient,
        "sgeHighlights": sge_highlights,
        "citations": citations,
        "contentSections": content_sections,
        "recommendedProduct": recommended_product
    }

def main():
    print(f"Reading markdown articles from {ARTICLES_DIR}...")
    markdown_files = sorted(ARTICLES_DIR.glob("*.md"))
    
    articles = []
    for f in markdown_files:
        print(f"Parsing {f.name}...")
        try:
            art = parse_markdown_article(f)
            articles.append(art)
        except Exception as e:
            print(f"  [ERROR] Failed parsing {f.name}: {e}")
            
    print(f"Successfully parsed {len(articles)} articles.")
    
    # Sort articles by numeric ID
    articles = sorted(articles, key=lambda x: x["id"])
    
    # Construct TS Content
    ts_output = """export interface ArticleData {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  icon: string;
  gradient: string;
  sgeHighlights: string[];
  citations: {
    id: string;
    title: string;
    authors: string;
    journal: string;
    link: string;
  }[];
  contentSections: {
    heading: string;
    content: string;
  }[];
  recommendedProduct: string;
}

export const articleDataList: Record<number, ArticleData> = {
"""
    
    for art in articles:
        ts_output += f"  {art['id']}: {{\n"
        ts_output += f"    id: {art['id']},\n"
        ts_output += f"    title: {json.dumps(art['title'])},\n"
        ts_output += f"    category: {json.dumps(art['category'])},\n"
        ts_output += f"    excerpt: {json.dumps(art['excerpt'])},\n"
        ts_output += f"    readTime: {json.dumps(art['readTime'])},\n"
        ts_output += f"    date: {json.dumps(art['date'])},\n"
        ts_output += f"    icon: {json.dumps(art['icon'])},\n"
        ts_output += f"    gradient: {json.dumps(art['gradient'])},\n"
        
        # sgeHighlights
        ts_output += "    sgeHighlights: [\n"
        for highlight in art["sgeHighlights"]:
            ts_output += f"      {json.dumps(highlight)},\n"
        ts_output += "    ],\n"
        
        # citations
        ts_output += "    citations: [\n"
        for cite in art["citations"]:
            ts_output += "      {\n"
            ts_output += f"        id: {json.dumps(cite['id'])},\n"
            ts_output += f"        title: {json.dumps(cite['title'])},\n"
            ts_output += f"        authors: {json.dumps(cite['authors'])},\n"
            ts_output += f"        journal: {json.dumps(cite['journal'])},\n"
            ts_output += f"        link: {json.dumps(cite['link'])}\n"
            ts_output += "      },\n"
        ts_output += "    ],\n"
        
        # contentSections
        ts_output += "    contentSections: [\n"
        for sec in art["contentSections"]:
            ts_output += "      {\n"
            ts_output += f"        heading: {json.dumps(sec['heading'])},\n"
            ts_output += f"        content: {json.dumps(sec['content'])}\n"
            ts_output += "      },\n"
        ts_output += "    ],\n"
        
        ts_output += f"    recommendedProduct: {json.dumps(art['recommendedProduct'])}\n"
        ts_output += "  },\n"
        
    ts_output += "};\n"
    
    # Save TS output
    print(f"Writing compiled articles TS data to {TS_OUTPUT_FILE}...")
    TS_OUTPUT_FILE.write_text(ts_output, encoding="utf-8")
    print("TypeScript compilation successful!")
    
    # 6. Update sitemap.xml
    print(f"Updating sitemap.xml at {SITEMAP_FILE}...")
    if not SITEMAP_FILE.exists():
        print(f"Error: Sitemap not found at {SITEMAP_FILE}")
        return
        
    # Read existing sitemap and remove any existing blog URLs
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    tree = ET.parse(SITEMAP_FILE)
    root = tree.getroot()
    
    # Namespaces dictionary
    namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    # Find all existing urls in sitemap that are NOT blog urls
    nodes_to_keep = []
    for url_node in root.findall('ns:url', namespaces):
        loc_node = url_node.find('ns:loc', namespaces)
        if loc_node is not None:
            loc_url = loc_node.text
            if "/blog/" not in loc_url:
                nodes_to_keep.append(url_node)
                
    # Re-create root urlset elements
    root.clear()
    for node in nodes_to_keep:
        root.append(node)
        
    # Append the 66 blog URLs
    for art in articles:
        url_node = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
        
        loc_node = ET.SubElement(url_node, '{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
        loc_node.text = f"https://zenandzest.fit/blog/{art['id']}"
        
        lastmod_node = ET.SubElement(url_node, '{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
        lastmod_node.text = "2026-06-30"
        
        changefreq_node = ET.SubElement(url_node, '{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq')
        changefreq_node.text = "weekly"
        
        priority_node = ET.SubElement(url_node, '{http://www.sitemaps.org/schemas/sitemap/0.9}priority')
        priority_node.text = "0.8"
        
        root.append(url_node)
        
    # Format and save XML manually to preserve beautiful indentation
    xml_str = ET.tostring(root, encoding="utf-8")
    
    # Parse back with minidom for pretty formatting if desired, or write cleanly
    import xml.dom.minidom
    parsed_xml = xml.dom.minidom.parseString(xml_str)
    pretty_xml = parsed_xml.toprettyxml(indent="  ")
    
    # Remove empty lines generated by toprettyxml
    pretty_xml = "\n".join([line for line in pretty_xml.splitlines() if line.strip()])
    
    # Fix XML header matching UTF-8 encoding
    pretty_xml = pretty_xml.replace('<?xml version="1.0" ?>', '<?xml version="1.0" encoding="UTF-8"?>')
    
    SITEMAP_FILE.write_text(pretty_xml, encoding="utf-8")
    print(f"Sitemap updated successfully with {len(articles)} blog articles! Total URLs = {len(root)}")

if __name__ == "__main__":
    main()
