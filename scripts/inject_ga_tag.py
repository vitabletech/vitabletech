import os
import re

base_dir = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

ga_tag = """
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-60TFS60E2F"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-60TFS60E2F');
    </script>"""

html_files = []
for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if GA tag already exists
    if 'G-60TFS60E2F' in content:
        # We already have a tag here. Let's move it to immediately after <head> if it's not already there.
        # To avoid duplicating or breaking things, we'll just skip files that already have the tag.
        continue
    
    # We need to insert the GA tag immediately after the <head> element.
    # We use regex to find <head> or <head ...>
    head_pattern = re.compile(r'(<head[^>]*>)', re.IGNORECASE)
    
    if head_pattern.search(content):
        # Insert GA tag right after the match
        new_content = head_pattern.sub(r'\1' + ga_tag, content, count=1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Added Google Analytics tag to {count} files.")
