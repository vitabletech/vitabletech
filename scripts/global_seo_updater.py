import os
import re
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content

    # Update Title (specifically in index.html, but also others if they have it)
    content = re.sub(r'\|\s*Gwalior HQ', '| Global IT & AI Engineering (US, UK, AUS, India)', content)

    # Update Meta Descriptions
    # Look for "Headquartered in India, India." and replace
    new_desc_addition = "headquartered in India. Serving USA, UK, Australia, Canada, and top cities (Bangalore, Noida, Delhi NCR, Pune, Mumbai)."
    content = content.replace("Headquartered in India, India.", new_desc_addition)
    
    # Update Keywords
    new_keywords = ", software company Bangalore, AI agency USA, web development London, custom software Australia, app development Delhi NCR"
    # Find keyword meta tag and append if not already there
    keyword_pattern = re.compile(r'(<meta\s+(?:name|property)="keywords"\s+content=")([^"]*)(")')
    
    def keyword_replacer(match):
        prefix = match.group(1)
        existing = match.group(2)
        suffix = match.group(3)
        if "AI agency USA" not in existing:
            return f"{prefix}{existing}{new_keywords}{suffix}"
        return match.group(0)

    content = keyword_pattern.sub(keyword_replacer, content)

    # Update Body text specifically referring to Gwalior
    content = content.replace("Gwalior Headquarters", "India Headquarters")
    content = content.replace("Headquartered in India", "Headquartered in India")
    content = content.replace("HQ in India, India", "HQ in India")
    content = content.replace("HQ in India", "HQ in India")
    content = content.replace("Gwalior •", "India •") # For the client marquee
    
    schema_pattern = r'"addressLocality":\s*"Gwalior"'
    content = re.sub(schema_pattern, '"addressLocality": "India"', content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    base_dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech'
    # Find all html files
    html_files = glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True)
    
    count = 0
    for filepath in html_files:
        if 'node_modules' in filepath or '.git' in filepath:
            continue
        process_file(filepath)
        count += 1
    print(f"Processed {count} HTML files.")

if __name__ == "__main__":
    main()
