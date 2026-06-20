import os

base_dir = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech"

old_ga = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-60TFS60E2F"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-60TFS60E2F');
    </script>"""

new_ga = """    <!-- Google tag (gtag.js) - Delayed for Performance -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const script = document.createElement('script');
                script.src = "https://www.googletagmanager.com/gtag/js?id=G-60TFS60E2F";
                script.async = true;
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-60TFS60E2F');
            }, 3000); // Delay loading GA by 3 seconds to let the main thread render the page first
        });
    </script>"""

# Some files might have slightly different indentation or newlines, so we use string replacement 
# and handle potential variations if needed. But the previous injection was exactly like `old_ga`.

# Wait, let's just use regex or a robust replacement.
import re

old_ga_pattern = re.compile(
    r'<!-- Google tag \(gtag\.js\) -->\s*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-60TFS60E2F"></script>\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\s*\{\s*dataLayer\.push\(arguments\);\s*\}\s*gtag\(\'js\', new Date\(\)\);\s*gtag\(\'config\', \'G-60TFS60E2F\'\);\s*</script>',
    re.DOTALL
)

count = 0
for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if old_ga_pattern.search(content):
                content = old_ga_pattern.sub(new_ga, content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Updated GA tracking to delayed loading in {count} HTML files.")
