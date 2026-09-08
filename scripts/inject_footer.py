import os
import re
import glob

# Configuration
LOCATIONS = [
    "USA", "UK", "London", "England", "Australia", 
    "Canada", "Bangalore", "Noida", "Delhi NCR", "Pune", "Mumbai"
]

BASE_DIR = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech'

def slugify(text):
    text = text.lower()
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

def get_footer_html():
    footer_links_html = """
                <!-- Global Locations -->
                <div class="col-span-1 md:col-span-2 lg:col-span-5 pt-8 mt-8 border-t border-white/10">
                    <h4 class="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Locations We Serve</h4>
                    <div class="flex flex-wrap gap-3 text-xs font-medium text-gray-400">"""
                    
    for loc in LOCATIONS:
        loc_slug = slugify(loc)
        footer_links_html += f'\n                        <a href="/locations/software-company-in-{loc_slug}.html" class="hover:text-cyan-400 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">{loc}</a>'
        
    footer_links_html += """
                    </div>
                </div>"""
    return footer_links_html

def inject_footer_links(footer_html):
    html_files = glob.glob(os.path.join(BASE_DIR, '**', '*.html'), recursive=True)
    count = 0
    for filepath in html_files:
        if 'node_modules' in filepath or '.git' in filepath:
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "Locations We Serve" in content:
            continue # Already injected
            
        if "<!-- Bottom Copyright & Legal -->" in content:
            content = content.replace("<!-- Bottom Copyright & Legal -->", footer_html + "\n\n            <!-- Bottom Copyright & Legal -->")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            
    print(f"Injected footer into {count} files.")

if __name__ == "__main__":
    html = get_footer_html()
    inject_footer_links(html)
