import glob
import os
import re

BASE_DIR = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

html_files = glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
print(f"Injecting native mobile drawer & bottom nav across {len(html_files)} HTML files...")

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

    # Active page key for bottom nav and drawer
    def is_active(target_file):
        return (rel_path == target_file or base_name == target_file)

    def get_drawer_class(target_file):
        if is_active(target_file):
            return "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group"
        return "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-blue-500/15 hover:border-cyan-400/30 transition-all group"

    def get_bottom_nav_class(target_file):
        if is_active(target_file):
            return "flex flex-col items-center py-1.5 px-3 rounded-xl transition-all text-cyan-400 font-bold scale-105 active glass-nav-item"
        return "flex flex-col items-center py-1.5 px-3 rounded-xl transition-all text-gray-400 hover:text-white glass-nav-item"

    # 1. Native Mobile Drawer & Backdrop HTML
    mobile_drawer_block = f'''
    <!-- iOS Native Backdrop Overlay -->
    <div id="mobile-drawer-backdrop"
        class="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] hidden transition-opacity duration-300 opacity-0">
    </div>

    <!-- iOS Native Side Drawer / Full Screen Mobile Menu -->
    <aside id="mobile-drawer"
        class="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-slate-950/98 border-l border-white/15 backdrop-blur-3xl z-[100] shadow-[0_0_50px_rgba(0,0,0,0.9)] transform translate-x-full transition-transform duration-300 ease-out flex flex-col justify-between">

        <!-- Drawer Header -->
        <div class="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 flex items-center justify-center shadow-lg">
                    <img loading="lazy" src="{prefix}images/logo.svg" alt="Logo" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-white text-base tracking-tight leading-none">Vitable<span class="text-cyan-400">Tech</span></span>
                    <span class="text-[9px] uppercase tracking-widest text-gray-400 mt-0.5">Enterprise SaaS</span>
                </div>
            </div>
            <button id="close-drawer-btn" aria-label="Close Mobile Menu"
                class="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all active:scale-90">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Drawer Navigation Links -->
        <nav class="flex-1 overflow-y-auto py-5 px-4 space-y-1 custom-scrollbar">
            <a href="{prefix}index.html" class="{get_drawer_class('index.html')}">
                <i class="fas fa-home text-cyan-400 w-5 text-center"></i>
                <span>Home</span>
            </a>
            <a href="{prefix}about.html" class="{get_drawer_class('about.html')}">
                <i class="fas fa-info-circle text-cyan-400 w-5 text-center"></i>
                <span>About</span>
            </a>
            <a href="{prefix}services/index.html" class="{get_drawer_class('services/index.html')}">
                <i class="fas fa-layer-group text-cyan-400 w-5 text-center"></i>
                <span>Services</span>
            </a>
            <a href="{prefix}projects.html" class="{get_drawer_class('projects.html')}">
                <i class="fas fa-briefcase text-cyan-400 w-5 text-center"></i>
                <span>Projects & Work</span>
            </a>
            <a href="{prefix}insights.html" class="{get_drawer_class('insights.html')}">
                <i class="fas fa-lightbulb text-cyan-400 w-5 text-center"></i>
                <span>Insights & Blog</span>
            </a>
            <a href="{prefix}pricing.html" class="{get_drawer_class('pricing.html')}">
                <i class="fas fa-tags text-cyan-400 w-5 text-center"></i>
                <span>Pricing</span>
            </a>
        </nav>

        <!-- Drawer Footer CTA -->
        <div class="p-5 border-t border-white/10 bg-white/[0.02] space-y-3">
            <a href="{prefix}contact.html"
                class="w-full shiny-btn py-3.5 rounded-xl font-bold text-sm text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 border border-white/20 active:scale-[0.98] transition-transform">
                <span>Start Your Project</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
            <div class="text-center">
                <span class="text-[10px] text-gray-500 font-medium">Headquartered in Gwalior, India</span>
            </div>
        </div>
    </aside>

    <!-- iOS Native Bottom Navigation Bar -->
    <nav id="ios-bottom-nav"
        class="md:hidden fixed bottom-0 left-0 w-full z-[80] pb-safe pt-2 px-2 liquid-glass-dark border-t-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="{prefix}index.html" class="{get_bottom_nav_class('index.html')}">
                <i class="fas fa-home text-lg"></i>
                <span class="text-[10px] mt-1 tracking-tight">Home</span>
            </a>
            <a href="{prefix}services/index.html" class="{get_bottom_nav_class('services/index.html')}">
                <i class="fas fa-layer-group text-lg"></i>
                <span class="text-[10px] mt-1 tracking-tight">Services</span>
            </a>
            <a href="{prefix}projects.html" class="{get_bottom_nav_class('projects.html')}">
                <i class="fas fa-briefcase text-lg"></i>
                <span class="text-[10px] mt-1 tracking-tight">Work</span>
            </a>
            <a href="{prefix}insights.html" class="{get_bottom_nav_class('insights.html')}">
                <i class="fas fa-lightbulb text-lg"></i>
                <span class="text-[10px] mt-1 tracking-tight">Insights</span>
            </a>
            <button id="bottom-nav-menu-btn" aria-label="Open Menu"
                class="flex flex-col items-center py-1.5 px-3 rounded-xl text-gray-400 hover:text-white transition-all active:scale-95 focus:outline-none glass-nav-item">
                <i class="fas fa-bars text-lg text-cyan-400"></i>
                <span class="text-[10px] mt-1 tracking-tight text-cyan-400 font-semibold">Menu</span>
            </button>
        </div>
    </nav>
    
    <script>
        function initMobileNavigation() {{
            const mobileBtn = document.getElementById("mobile-menu-btn");
            const bottomMenuBtn = document.getElementById("bottom-nav-menu-btn");
            const drawer = document.getElementById("mobile-drawer");
            const backdrop = document.getElementById("mobile-drawer-backdrop");
            const closeBtn = document.getElementById("close-drawer-btn");

            function openDrawer() {{
                const d = document.getElementById("mobile-drawer");
                const b = document.getElementById("mobile-drawer-backdrop");
                if (!d || !b) return;
                b.classList.remove("hidden");
                setTimeout(() => b.classList.remove("opacity-0"), 10);
                d.classList.remove("translate-x-full");
                document.body.style.overflow = "hidden";
            }}

            function closeDrawer() {{
                const d = document.getElementById("mobile-drawer");
                const b = document.getElementById("mobile-drawer-backdrop");
                if (!d || !b) return;
                d.classList.add("translate-x-full");
                b.classList.add("opacity-0");
                setTimeout(() => {{
                    b.classList.add("hidden");
                    document.body.style.overflow = "";
                }}, 300);
            }}

            if (mobileBtn) mobileBtn.addEventListener("click", openDrawer);
            if (bottomMenuBtn) bottomMenuBtn.addEventListener("click", openDrawer);
            if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
            if (backdrop) backdrop.addEventListener("click", closeDrawer);
            if (drawer) {{
                drawer.querySelectorAll("a").forEach(link => {{
                    link.addEventListener("click", closeDrawer);
                }});
            }}
        }}

        if (document.readyState === 'loading') {{
            document.addEventListener('DOMContentLoaded', initMobileNavigation);
        }} else {{
            initMobileNavigation();
        }}
    </script>'''

    # Clean existing drawer/bottom nav blocks if present
    content = re.sub(r'<!-- iOS Native Backdrop Overlay -->[\s\S]*?</body>', mobile_drawer_block + '\n</body>', content)
    
    # If not previously present, insert before </body>
    if "mobile-drawer" not in content:
        content = content.replace("</body>", mobile_drawer_block + "\n</body>")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    updated_count += 1

print(f"Successfully injected native mobile navigation across {updated_count} HTML files!")
