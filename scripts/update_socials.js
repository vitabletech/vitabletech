const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    let changed = false;

    // Fix floating social bar links (Facebook and Instagram)
    if (html.includes('<a href="#" target="_blank"')) {
        let newHtml = html.replace(/<a href="#" target="_blank"([^>]*)>\s*<i class="fab fa-facebook-f/g, '<a href="https://www.facebook.com/vitabletech" target="_blank"$1>\n            <i class="fab fa-facebook-f');
        newHtml = newHtml.replace(/<a href="#" target="_blank"([^>]*)>\s*<i class="fab fa-instagram/g, '<a href="https://www.instagram.com/vitabletech" target="_blank"$1>\n            <i class="fab fa-instagram');
        if (newHtml !== html) {
            html = newHtml;
            changed = true;
        }
    }

    // Replace footer social links block
    const footerSocialMatch = html.match(/<div class="flex space-x-4">([\s\S]*?)<\/div>/);
    if (footerSocialMatch && footerSocialMatch[0].includes('fa-github') && footerSocialMatch[0].includes('fa-youtube')) {
        const newFooterSocials = `<div class="flex flex-wrap gap-4">
                        <a target="_blank" href="https://github.com/vitabletech" class="text-gray-300 hover:text-white transition-colors text-xl">
                            <i class="fab fa-github"></i>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/company/vitabletech/" class="text-gray-300 hover:text-white transition-colors text-xl">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a target="_blank" href="https://www.youtube.com/@vitabletech" class="text-gray-300 hover:text-white transition-colors text-xl">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a target="_blank" href="https://www.instagram.com/vitabletech" class="text-gray-300 hover:text-white transition-colors text-xl">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a target="_blank" href="https://www.facebook.com/vitabletech" class="text-gray-300 hover:text-white transition-colors text-xl">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </div>`;
        html = html.replace(footerSocialMatch[0], newFooterSocials);
        changed = true;
    }
    
    // Check if phone or email is wrong somewhere and fix if necessary (the user provided correct ones, which we likely already had, but just in case)
    // Email: info@vitabletech.in (already correct)
    // Phone: +91 6280 671 085 (already correct)

    if (changed) {
        fs.writeFileSync(path.join(dir, file), html);
        console.log(`Updated socials in ${file}`);
    }
});
