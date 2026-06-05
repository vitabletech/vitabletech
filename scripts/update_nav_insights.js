const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    let updated = false;

    if (!html.includes('>Insights<')) {
        // Add to Desktop menu (after Contact)
        const desktopLink = `<a href="insights.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Insights</a>`;
        html = html.replace(/(<a href="contact\.html"\s*class="[^"]*">Contact<\/a>\s*)(<\/div>)/i, `$1${desktopLink}\n                $2`);
        
        // Add to Mobile menu
        const mobileLink = `<a href="insights.html" class="block py-2 text-gray-700 hover:text-primary font-medium">Insights</a>`;
        html = html.replace(/(<a href="contact\.html" class="block py-2[^"]*">Contact<\/a>\s*)(<\/div>)/i, `$1${mobileLink}\n            $2`);

        // Add to Footer Quick Links
        const footerLink = `<li><a href="insights.html" class="text-gray-300 hover:text-white transition-colors">Insights</a></li>`;
        html = html.replace(/(<li><a href="contact\.html"[^>]*>Contact<\/a>\s*<\/li>\s*)(<\/ul>)/i, `$1${footerLink}\n                    $2`);
        
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(path.join(dir, file), html);
        console.log(`Updated nav in ${file}`);
    }
});
