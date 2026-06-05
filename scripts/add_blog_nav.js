const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Check if Blog already exists
    if (content.includes('href="blog.html"')) {
        console.log(`Skipping ${file}, blog link already exists.`);
        continue;
    }

    // 1. Add to Desktop Menu
    const desktopInsightsRegex = /(<a href="insights\.html"[^>]*>Insights<\/a>)/i;
    if (content.match(desktopInsightsRegex)) {
        content = content.replace(desktopInsightsRegex, `<a href="blog.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Blog</a>\n                    $1`);
    }

    // 2. Add to Mobile Menu
    const mobileInsightsRegex = /(<a href="insights\.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Insights<\/a>)/i;
    if (content.match(mobileInsightsRegex)) {
        content = content.replace(mobileInsightsRegex, `<a href="blog.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Blog</a>\n                $1`);
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated nav in ' + file);
}
