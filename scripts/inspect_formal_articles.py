import os
import re

dir_path = r'c:\MASTER_WORKSPACE\zenandzest\articles\formal_articles'
if not os.path.exists(dir_path):
    print("Directory not found!")
    exit(1)

files = sorted(os.listdir(dir_path))
count = 0
for f in files:
    if f.endswith('.md') and any(f.startswith(f"{i:02d}_") for i in range(1, 11)):
        path = os.path.join(dir_path, f)
        with open(path, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
        
        # Parse title from frontmatter or first H1
        title_match = re.search(r'title:\s*\"([^\"]+)\"', content)
        if not title_match:
            title_match = re.search(r'title:\s*\'([^\'\n]+)\'', content)
        title = title_match.group(1) if title_match else 'No Title'
        
        category_match = re.search(r'category:\s*\"([^\"]+)\"', content)
        if not category_match:
            category_match = re.search(r'category:\s*\'([^\'\n]+)\'', content)
        category = category_match.group(1) if category_match else 'Wellness'
        
        slug_match = re.search(r'slug:\s*\"([^\"]+)\"', content)
        if not slug_match:
            slug_match = re.search(r'slug:\s*\'([^\'\n]+)\'', content)
        slug = slug_match.group(1) if slug_match else 'no-slug'
        
        print(f'{f}: {title} | category={category} | slug={slug}')
        count += 1
print('Total:', count)
