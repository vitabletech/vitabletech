import glob
import os
import re

BASE_DIR = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

html_files = glob.glob(os.path.join(BASE_DIR, "**/*.html"), recursive=True)
print(f"Injecting floating Back to Top button into {len(html_files)} HTML files...")

back_to_top_block = '''
    <!-- FLOATING BACK TO TOP BUTTON -->
    <button id="back-to-top-btn" aria-label="Scroll Back to Top"
        class="fixed bottom-20 md:bottom-8 right-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-white/20 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none flex items-center justify-center group">
        <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    </button>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const backToTopBtn = document.getElementById('back-to-top-btn');
            if (backToTopBtn) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                        backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    } else {
                        backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                        backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    }
                });
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        });
    </script>
'''

updated_count = 0

for full_path in html_files:
    if "node_modules" in full_path or "Vitable Logo" in full_path:
        continue
        
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if 'http-equiv="refresh"' in content and len(content) < 1000:
        continue

    # Remove existing back to top block if present
    content = re.sub(r'<!-- FLOATING BACK TO TOP BUTTON -->[\s\S]*?</script>', '', content)

    # Insert before </body>
    if "</body>" in content:
        content = content.replace("</body>", back_to_top_block + "\n</body>")
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        updated_count += 1

print(f"Successfully injected Back to Top button across {updated_count} HTML files!")
