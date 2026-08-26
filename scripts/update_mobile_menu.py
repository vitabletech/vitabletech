import glob
import os
import re

BASE_DIR = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

html_files = glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
print(f"Auditing mobile drawer in {len(html_files)} HTML files...")

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

    # Mobile Drawer HTML Template
    mobile_drawer_html = f'''<!-- MOBILE MENU OVERLAY -->
    <div id="mobile-menu"
        class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl hidden flex-col justify-between p-6 transition-all duration-300">
        <div class="flex items-center justify-between pb-6 border-b border-white/10">
            <div class="flex items-center gap-3">
                <img loading="lazy" src="{prefix}images/logo.svg" alt="VitableTech Logo" class="h-8 w-8" />
                <span class="font-extrabold text-xl text-white">VitableTech</span>
            </div>
            <button id="close-mobile-menu-btn" class="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="flex flex-col gap-3 py-8">
            <a href="{prefix}index.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">Home</a>
            <a href="{prefix}about.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">About</a>
            <a href="{prefix}services/index.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">Services</a>
            <a href="{prefix}projects.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">Projects & Work</a>
            <a href="{prefix}insights.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">Insights & Blog</a>
            <a href="{prefix}pricing.html" class="px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10">Pricing</a>
            <a href="{prefix}contact.html" class="mt-4 px-6 py-3.5 rounded-xl text-center font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg">Start Your Project →</a>
        </div>
        <div class="pt-6 border-t border-white/10 text-center text-xs text-gray-400">
            <p>© 2026 VitableTech Global Enterprise SaaS</p>
        </div>
    </div>'''

    drawer_pattern = re.compile(r'<!-- MOBILE MENU OVERLAY -->[\s\S]*?</div>\s*</div>', re.IGNORECASE)
    if drawer_pattern.search(content):
        new_content = drawer_pattern.sub(mobile_drawer_html, content)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated_count += 1

print(f"Updated mobile drawer overlay across {updated_count} HTML files!")
