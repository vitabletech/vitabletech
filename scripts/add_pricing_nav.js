const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Desktop Menu
    const desktopRegex = /<a href="insights\.html"([^>]+)>Insights<\/a>/;
    if (content.match(desktopRegex) && !content.includes('href="pricing.html"')) {
        content = content.replace(desktopRegex, `<a href="pricing.html"$1>Pricing</a>\n                    <a href="insights.html"$1>Insights</a>`);
        changed = true;
    }

    // 2. Mobile Menu
    const mobileRegex = /<a href="insights\.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Insights<\/a>/;
    if (content.match(mobileRegex) && !content.includes('href="pricing.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Pricing</a>')) {
        content = content.replace(mobileRegex, `<a href="pricing.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Pricing</a>\n                <a href="insights.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Insights</a>`);
        changed = true;
    }

    // 3. Footer Menu
    const footerRegex = /<li><a href="privacy-policy\.html"([\s\S]*?)>Privacy Policy<\/a><\/li>/;
    // Check if pricing is already in the footer quick links
    if (content.match(footerRegex)) {
        // It's possible pricing is already added in step 1 if the script ran multiple times, but let's just check the footer specifically
        const footerAreaMatch = content.match(/<h3 class="text-xl font-bold mb-4">Quick Links<\/h3>([\s\S]*?)<\/ul>/);
        if (footerAreaMatch && !footerAreaMatch[1].includes('pricing.html')) {
             content = content.replace(footerRegex, `<li><a href="pricing.html"$1>Pricing</a></li>\n                        <li><a href="privacy-policy.html"$1>Privacy Policy</a></li>`);
             changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log('Updated ' + file);
        count++;
    }
}
console.log('Total files updated: ' + count);
