import re
import os

path = r'c:\MASTER_WORKSPACE\zenandzest\website\artifacts\hebe-wellness\src\pages\articlesData.ts'
if not os.path.exists(path):
    print("articlesData.ts not found!")
    exit(1)

with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find all blocks: X: { id: X, title: "...", category: "..." }
# Let's search using regex
blocks = re.findall(r'(\d+)\s*:\s*\{\s*id:\s*(\d+),\s*title:\s*\"([^\"]+)\",\s*category:\s*\"([^\"]+)\"', content)
print(f"Total parsed dynamically: {len(blocks)}")
for b in blocks:
    print(f"Key {b[0]} / ID {b[1]}: {b[2]} ({b[3]})")

