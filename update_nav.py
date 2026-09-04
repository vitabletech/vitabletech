import os
import glob
import re

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Desktop Nav update: Look for Projects & Work link and add Portfolio right after it
    # <a href="./projects.html" ...>Projects & Work</a>
    
    # We will use regex to find the Projects & Work <a> tag and insert Portfolio.
    # Note: the href might be ./projects.html or ../projects.html depending on depth.
    
    pattern_desktop = r'(<a href="[^"]*projects\.html"[^>]*>Projects & Work</a>)'
    
    def replace_desktop(match):
        original = match.group(1)
        # Calculate depth for relative links
        if '../' in original:
            href = '../portfolio.html'
        else:
            href = './portfolio.html'
            
        new_link = f'\n                    <a href="{href}" class="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">Live Portfolio</a>'
        return original + new_link
        
    updated = re.sub(pattern_desktop, replace_desktop, content)
    
    if updated != content:
        with open(filepath, 'w') as f:
            f.write(updated)
        print(f"Updated {filepath}")

# Find all html files
for ext in ['html']:
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith(f'.{ext}') and file != 'portfolio.html':
                update_file(os.path.join(root, file))

print("Done")
