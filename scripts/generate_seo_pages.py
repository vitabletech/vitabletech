import os
import re
import glob

# Configuration
LOCATIONS = [
    "USA", "UK", "London", "England", "Australia", 
    "Canada", "Bangalore", "Noida", "Delhi NCR", "Pune", "Mumbai"
]

SERVICES = {
    "software-company": "Custom Software & AI Engineering",
    "digital-marketing": "Digital Marketing",
    "ui-ux-design": "Figma UI UX Design",
    "app-development": "App Development",
    "erp-development": "ERP Development",
    "crm-development": "CRM Development",
    "cms-development": "CMS Development"
}

BASE_DIR = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech'
LOCATIONS_DIR = os.path.join(BASE_DIR, 'locations')

if not os.path.exists(LOCATIONS_DIR):
    os.makedirs(LOCATIONS_DIR)

def slugify(text):
    text = text.lower()
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

def generate_pages():
    with open(os.path.join(BASE_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        template = f.read()

    # Step 1: Fix relative paths in template to work from one level deep
    template = template.replace('href="./', 'href="../')
    template = template.replace('src="./', 'src="../')
    
    # We also need to fix links that might be absolute or specifically structured
    # e.g., href="https://vitabletech.in" doesn't need fixing.
    
    generated_urls = []

    for loc in LOCATIONS:
        loc_slug = slugify(loc)
        for srv_id, srv_title in SERVICES.items():
            page_slug = f"{srv_id}-in-{loc_slug}.html"
            page_path = os.path.join(LOCATIONS_DIR, page_slug)
            
            content = template
            
            # Update Title
            content = re.sub(
                r'<title>.*?</title>',
                f'<title>Top {srv_title} Company in {loc} | VitableTech</title>',
                content
            )
            content = re.sub(
                r'<meta name="title" content=".*?">',
                f'<meta name="title" content="Top {srv_title} Company in {loc} | VitableTech">',
                content
            )
            
            # Update Description
            desc = f"Looking for {srv_title} in {loc}? VitableTech engineers scalable solutions, enterprise applications, and cloud architectures for businesses in {loc}."
            content = re.sub(
                r'<meta name="description"\s+content=".*?">',
                f'<meta name="description" content="{desc}">',
                content,
                flags=re.DOTALL
            )
            content = re.sub(
                r'<meta property="og:description"\s+content=".*?">',
                f'<meta property="og:description" content="{desc}">',
                content,
                flags=re.DOTALL
            )
            content = re.sub(
                r'<meta property="twitter:description"\s+content=".*?">',
                f'<meta property="twitter:description" content="{desc}">',
                content,
                flags=re.DOTALL
            )
            
            # Update canonical
            content = re.sub(
                r'<link rel="canonical" href=".*?">',
                f'<link rel="canonical" href="https://vitabletech.in/locations/{page_slug}">',
                content
            )

            # Update H1
            # Build Intelligent <br.../> <span ...>Software That</span> <br.../> Powers the Future.
            # We'll replace the text inside the H1 tags. It's multi-line.
            h1_pattern = re.compile(r'(<h1[^>]*>)(.*?)(</h1>)', re.DOTALL)
            new_h1_inner = f'\n                        Top {srv_title} <br class="hidden sm:inline" />\n                        <span\n                            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 animate-pulse-slow">Company in</span> <br class="hidden sm:inline" />\n                        {loc}.\n                    '
            content = h1_pattern.sub(r'\1' + new_h1_inner + r'\3', content)

            # Update Hero subtitle
            subtitle_pattern = re.compile(r'(<p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">)(.*?)(</p>)', re.DOTALL)
            new_subtitle = f'\n                        We engineer custom {srv_title} solutions, AI-driven architectures, and high-performance digital products tailored for brands and enterprises in {loc}.\n                    '
            content = subtitle_pattern.sub(r'\1' + new_subtitle + r'\3', content)
            
            # Update Hero Announcement Bar
            content = content.replace(" Global Engineering — HQ in India", f" {srv_title} — {loc}")

            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            generated_urls.append(f"https://vitabletech.in/locations/{page_slug}")
            
    print(f"Generated {len(generated_urls)} location-service pages.")
    
    # Generate Footer Injection HTML
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
                
    return generated_urls, footer_links_html

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
            
        # Find where to inject. The footer grid ends before <!-- Copyright & Legal -->
        # Let's just find the end of the grid: <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        # Or simpler: inject right before the closing </div> of the grid, or after the Col 4 Company div.
        # Looking at index.html, Company div ends, then there is a </div> that closes the grid, then there is Copyright & Legal.
        
        # Let's inject before "<!-- Copyright & Legal -->"
        if "<!-- Copyright & Legal -->" in content:
            content = content.replace("<!-- Copyright & Legal -->", footer_html + "\n\n            <!-- Copyright & Legal -->")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            
    print(f"Injected footer into {count} files.")

def update_sitemap(urls):
    sitemap_path = os.path.join(BASE_DIR, 'sitemap.xml')
    if not os.path.exists(sitemap_path):
        return
        
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "</urlset>" in content:
        url_nodes = ""
        for url in urls:
            url_nodes += f"""
<url>
  <loc>{url}</loc>
  <priority>0.70</priority>
</url>"""
        content = content.replace("</urlset>", url_nodes + "\n</urlset>")
        
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Updated sitemap.xml")

if __name__ == "__main__":
    urls, footer_html = generate_pages()
    inject_footer_links(footer_html)
    update_sitemap(urls)
