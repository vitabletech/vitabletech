const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const socialBar = `
    <!-- Floating Social Media Bar -->
    <div class="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2 p-2">
        <a href="https://github.com/vitabletech" target="_blank" class="w-10 h-10 bg-gray-800 text-white rounded-r-lg flex items-center justify-center hover:w-12 transition-all duration-300 shadow-lg">
            <i class="fab fa-github text-xl"></i>
        </a>
        <a href="#" target="_blank" class="w-10 h-10 bg-blue-600 text-white rounded-r-lg flex items-center justify-center hover:w-12 transition-all duration-300 shadow-lg">
            <i class="fab fa-facebook-f text-xl"></i>
        </a>
        <a href="https://www.youtube.com/@vitabletech" target="_blank" class="w-10 h-10 bg-red-600 text-white rounded-r-lg flex items-center justify-center hover:w-12 transition-all duration-300 shadow-lg">
            <i class="fab fa-youtube text-xl"></i>
        </a>
        <a href="https://wa.me/916280671085" target="_blank" class="w-10 h-10 bg-green-500 text-white rounded-r-lg flex items-center justify-center hover:w-12 transition-all duration-300 shadow-lg">
            <i class="fab fa-whatsapp text-xl"></i>
        </a>
        <a href="#" target="_blank" class="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white rounded-r-lg flex items-center justify-center hover:w-12 transition-all duration-300 shadow-lg">
            <i class="fab fa-instagram text-xl"></i>
        </a>
    </div>
`;

for (const file of files) {
    if (file === 'T&C.html' || file === 'privacy-policy.html') continue; // Skip if they already exist
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Add social bar
    if (!content.includes('Floating Social Media Bar')) {
        content = content.replace(/<body[^>]*>/i, match => match + '\n' + socialBar);
    }
    
    // 2. Add footer links
    const contactLinkRegex = /(<li>\s*<a href="contact\.html"[^>]*>Contact<\/a>\s*<\/li>)/i;
    if (content.match(contactLinkRegex) && !content.includes('T&C.html')) {
        const newLinks = `\n                        <li><a href="T&C.html" class="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
                        <li><a href="privacy-policy.html" class="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>`;
        content = content.replace(contactLinkRegex, `$1${newLinks}`);
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated ' + file);
}
