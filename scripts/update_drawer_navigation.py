import glob
import os
import re

BASE_DIR = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

html_files = glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
print(f"Updating mobile-drawer in {len(html_files)} HTML files...")

updated_count = 0

for full_path in html_files:
    if "node_modules" in full_path or "Vitable Logo" in full_path:
        continue
    
    rel_path = os.path.relpath(full_path, BASE_DIR)
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if 'http-equiv="refresh"' in content and len(content) < 1000:
        continue
        
    prefix = "./"
    if rel_path.startswith("blog/") or rel_path.startswith("services/") or rel_path.startswith("policies/"):
        prefix = "../"
        
    base_name = os.path.basename(rel_path)

    # Simplified Drawer Nav HTML
    drawer_nav_html = f'''<nav class="flex-1 overflow-y-auto py-5 px-4 space-y-1 custom-scrollbar">
            <a href="{prefix}index.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-home text-cyan-400 w-5 text-center"></i>
                <span>Home</span>
            </a>
            <a href="{prefix}about.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-info-circle text-cyan-400 w-5 text-center"></i>
                <span>About</span>
            </a>
            <a href="{prefix}services/index.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-layer-group text-cyan-400 w-5 text-center"></i>
                <span>Services</span>
            </a>
            <a href="{prefix}projects.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-briefcase text-cyan-400 w-5 text-center"></i>
                <span>Projects & Work</span>
            </a>
            <a href="{prefix}insights.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-lightbulb text-cyan-400 w-5 text-center"></i>
                <span>Insights & Blog</span>
            </a>
            <a href="{prefix}pricing.html"
                class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group">
                <i class="fas fa-tags text-cyan-400 w-5 text-center"></i>
                <span>Pricing</span>
            </a>
        </nav>'''

    nav_pattern = re.compile(r'<nav class="flex-1 overflow-y-auto py-5 px-4 space-y-1 custom-scrollbar">[\s\S]*?</nav>', re.IGNORECASE)
    if nav_pattern.search(content):
        new_content = nav_pattern.sub(drawer_nav_html, content)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated_count += 1

print(f"Successfully updated mobile drawer nav in {updated_count} HTML files!")
