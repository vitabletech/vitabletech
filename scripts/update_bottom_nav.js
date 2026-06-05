const fs = require('fs');
const path = require('path');

const dir = '/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech';

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

    const enhancedNav = `<!-- Mobile Bottom Navigation Bar -->
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-[60] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border-t border-white/50 backdrop-blur-xl bg-white/85 transition-all duration-300 rounded-t-2xl">
        <div class="flex justify-around items-center px-1 py-2" id="mobile-bottom-nav">
            <a href="${prefix}index.html" data-nav="home" class="flex flex-col items-center text-gray-500 hover:text-primary active:scale-90 transition-all duration-300 touch-manipulation group w-[20%]">
                <div class="relative w-12 h-8 flex items-center justify-center rounded-full transition-colors icon-container">
                    <i class="fas fa-home text-[22px] group-hover:transform group-hover:-translate-y-1 transition-transform"></i>
                </div>
                <span class="text-[10px] font-semibold mt-1 transition-colors nav-text">Home</span>
            </a>
            <a href="${prefix}services/index.html" data-nav="services" class="flex flex-col items-center text-gray-500 hover:text-primary active:scale-90 transition-all duration-300 touch-manipulation group w-[20%]">
                <div class="relative w-12 h-8 flex items-center justify-center rounded-full transition-colors icon-container">
                    <i class="fas fa-layer-group text-[22px] group-hover:transform group-hover:-translate-y-1 transition-transform"></i>
                </div>
                <span class="text-[10px] font-semibold mt-1 transition-colors nav-text">Services</span>
            </a>
            <a href="${prefix}projects.html" data-nav="projects" class="flex flex-col items-center text-gray-500 hover:text-primary active:scale-90 transition-all duration-300 touch-manipulation group w-[20%]">
                <div class="relative w-12 h-8 flex items-center justify-center rounded-full transition-colors icon-container">
                    <i class="fas fa-briefcase text-[22px] group-hover:transform group-hover:-translate-y-1 transition-transform"></i>
                </div>
                <span class="text-[10px] font-semibold mt-1 transition-colors nav-text">Projects</span>
            </a>
            <a href="${prefix}blog/index.html" data-nav="blog" class="flex flex-col items-center text-gray-500 hover:text-primary active:scale-90 transition-all duration-300 touch-manipulation group w-[20%]">
                <div class="relative w-12 h-8 flex items-center justify-center rounded-full transition-colors icon-container">
                    <i class="fas fa-newspaper text-[22px] group-hover:transform group-hover:-translate-y-1 transition-transform"></i>
                </div>
                <span class="text-[10px] font-semibold mt-1 transition-colors nav-text">Blog</span>
            </a>
            <a href="${prefix}contact.html" data-nav="contact" class="flex flex-col items-center text-gray-500 hover:text-primary active:scale-90 transition-all duration-300 touch-manipulation group w-[20%]">
                <div class="relative w-12 h-8 flex items-center justify-center rounded-full transition-colors icon-container">
                    <i class="fas fa-envelope text-[22px] group-hover:transform group-hover:-translate-y-1 transition-transform"></i>
                </div>
                <span class="text-[10px] font-semibold mt-1 transition-colors nav-text">Contact</span>
            </a>
        </div>
    </nav>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('#mobile-bottom-nav a');
            navLinks.forEach(link => {
                const navType = link.getAttribute('data-nav');
                let isActive = false;
                if (navType === 'home' && (currentPath.endsWith('/') || currentPath.endsWith('index.html') && !currentPath.includes('services') && !currentPath.includes('blog'))) {
                    isActive = true;
                } else if (navType !== 'home' && currentPath.includes(navType)) {
                    isActive = true;
                }
                if (isActive) {
                    link.classList.remove('text-gray-500');
                    link.classList.add('text-primary');
                    const iconContainer = link.querySelector('.icon-container');
                    if (iconContainer) iconContainer.classList.add('bg-primary', 'bg-opacity-10');
                    const icon = link.querySelector('i');
                    if (icon) icon.classList.add('-translate-y-1');
                }
            });
        });
    </script>`;

    const navRegex = /<!-- Mobile Bottom Navigation Bar -->[\s\S]*?<\/nav>/i;
    
    if (content.match(navRegex)) {
        content = content.replace(navRegex, enhancedNav);
    } else {
        // If for some reason it's missing, add it before PWA script or body end
        content = content.replace('</body>', enhancedNav + '\n</body>');
    }

    // Clean up any old script tags we might have injected before if we re-run
    content = content.replace(/(<script>[\s\S]*?id="mobile-bottom-nav"[\s\S]*?<\/script>)\s*<script>[\s\S]*?id="mobile-bottom-nav"[\s\S]*?<\/script>/gi, '$1');

    fs.writeFileSync(file, content);
    console.log(`Updated mobile nav in ${relPathFromRoot}`);
});
