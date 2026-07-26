import os

css_dir = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech/css"
file_path = os.path.join(css_dir, "fa-purged.css")

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences of font-display:block; with font-display:swap;
if "font-display:block;" in content:
    content = content.replace("font-display:block;", "font-display:swap;")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed font-display in fa-purged.css")
else:
    print("No font-display:block found")

# Also check input.css
input_css = os.path.join(css_dir, "input.css")
if os.path.exists(input_css):
    with open(input_css, 'r', encoding='utf-8') as f:
        content = f.read()
    if "font-display:block;" in content:
        content = content.replace("font-display:block;", "font-display:swap;")
        with open(input_css, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed font-display in input.css")
