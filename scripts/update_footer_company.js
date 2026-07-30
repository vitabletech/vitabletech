const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scripts') {
                arrayOfFiles = getAllHtmlFiles(path.join(dirPath, file), arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

const allHtmlFiles = getAllHtmlFiles(dir);

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const relPathFromRoot = path.relative(dir, file);
    const depth = relPathFromRoot.split(path.sep).length - 1;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);

    // Match newsletter block with or without "Col 4: Newsletter Box" comment
    const oldNewsletterRegex = /(?:<!-- Col 4: Newsletter Box -->\s*)?<!--\s*<div class="space-y-4">\s*<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Stay Ahead[\s\S]*?<\/form>\s*<\/div>\s*-->/i;
    
    // Some files might have it uncommented
    const oldNewsletterUncommentedRegex = /(?:<!-- Col 4: Newsletter Box -->\s*)?<div class="space-y-4">\s*<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Stay Ahead[\s\S]*?<\/form>\s*<\/div>/i;
    
    const newCompanyCol = `<!-- Col 4: Company -->
                <div class="space-y-4">
                    <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Company</h4>
                    <ul class="space-y-2.5 text-xs font-medium text-gray-400">
                        <li><a href="${prefix}about.html" class="hover:text-cyan-400 transition-colors">About Us</a></li>
                        <li><a href="${prefix}contact.html" class="hover:text-cyan-400 transition-colors">Contact Us</a></li>
                        <li><a href="${prefix}pricing.html" class="hover:text-cyan-400 transition-colors">Pricing & Plans</a></li>
                        <li><a href="${prefix}faq.html" class="hover:text-cyan-400 transition-colors">Help & FAQ</a></li>
                        <li><a href="${prefix}policies/privacy-policy.html" class="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="${prefix}policies/terms-and-conditions.html" class="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                        <li><a href="${prefix}policies/return-refund-policy.html" class="hover:text-cyan-400 transition-colors">Refund Policy</a></li>
                    </ul>
                </div>`;

    let updated = false;
    if (content.match(oldNewsletterRegex)) {
        content = content.replace(oldNewsletterRegex, newCompanyCol);
        updated = true;
    } else if (content.match(oldNewsletterUncommentedRegex)) {
        content = content.replace(oldNewsletterUncommentedRegex, newCompanyCol);
        updated = true;
    }
    
    // Wait, in index.html I already replaced it with `./about.html` etc.
    // If the depth > 0, it should be updated to `../about.html` instead.
    // Let's just do a find/replace if it matches the fixed one to fix prefix
    
    const existingCompanyRegex = /<!-- Col 4: Company -->\s*<div class="space-y-4">\s*<h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Company<\/h4>[\s\S]*?<\/div>/i;
    if (content.match(existingCompanyRegex)) {
        content = content.replace(existingCompanyRegex, newCompanyCol);
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(file, content);
        console.log(`Updated footer in ${relPathFromRoot}`);
    }
});
