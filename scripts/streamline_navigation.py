import glob
import os
import re

BASE_DIR = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

html_files = glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
print(f"Found {len(html_files)} HTML files...")

updated_count = 0

for full_path in html_files:
    if "node_modules" in full_path or "Vitable Logo" in full_path:
        continue
    
    rel_path = os.path.relpath(full_path, BASE_DIR)
    
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Skip redirect stubs
    if 'http-equiv="refresh"' in content and len(content) < 1000:
        continue
        
    prefix = "./"
    if rel_path.startswith("blog/") or rel_path.startswith("services/") or rel_path.startswith("policies/"):
        prefix = "../"
        
    base_name = os.path.basename(rel_path)
    
    def get_link_class(target_file):
        is_current = (rel_path == target_file or base_name == target_file)
        if is_current:
            return "px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 border border-white/15 transition-all duration-200 shadow-sm"
        return "px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200"

    new_nav = f'''<nav
                    class="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
                    <a href="{prefix}index.html"
                        class="{get_link_class('index.html')}">Home</a>
                    <a href="{prefix}about.html"
                        class="{get_link_class('about.html')}">About</a>
                    <a href="{prefix}services/index.html"
                        class="{get_link_class('services/index.html')}">Services</a>
                    <a href="{prefix}projects.html"
                        class="{get_link_class('projects.html')}">Projects & Work</a>
                    <a href="{prefix}insights.html"
                        class="{get_link_class('insights.html')}">Insights & Blog</a>
                    <a href="{prefix}pricing.html"
                        class="{get_link_class('pricing.html')}">Pricing</a>
                </nav>'''

    nav_pattern = re.compile(r'<nav\s+class="hidden lg:flex[\s\S]*?</nav>', re.IGNORECASE)
    if nav_pattern.search(content):
        new_content = nav_pattern.sub(new_nav, content)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated_count += 1

print(f"Successfully updated navigation bar across {updated_count} HTML files!")
