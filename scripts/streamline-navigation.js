const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');

// Find all html files excluding node_modules
const htmlFiles = glob.sync('**/*.html', {
    cwd: rootDir,
    ignore: ['node_modules/**', 'Vitable Logo/**']
});

console.log(`Found ${htmlFiles.length} HTML files to update navbar links...`);

let updatedCount = 0;

htmlFiles.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Skip redirect stub files
    if (content.includes('http-equiv="refresh"') && content.length < 1000) {
        return;
    }

    // Determine path prefix based on directory depth
    let prefix = './';
    if (relPath.startsWith('blog/') || relPath.startsWith('services/') || relPath.startsWith('policies/')) {
        prefix = '../';
    }

    // Active page helper
    const baseName = path.basename(relPath);
    
    function getLinkClass(targetFile) {
        const isCurrent = (relPath === targetFile || baseName === targetFile);
        if (isCurrent) {
            return `px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 border border-white/15 transition-all duration-200 shadow-sm`;
        }
        return `px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200`;
    }

    // Streamlined Nav HTML
    const newNavHtml = `<nav
                    class="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
                    <a href="${prefix}index.html"
                        class="${getLinkClass('index.html')}">Home</a>
                    <a href="${prefix}about.html"
                        class="${getLinkClass('about.html')}">About</a>
                    <a href="${prefix}services/index.html"
                        class="${getLinkClass('services/index.html')}">Services</a>
                    <a href="${prefix}projects.html"
                        class="${getLinkClass('projects.html')}">Projects & Work</a>
                    <a href="${prefix}insights.html"
                        class="${getLinkClass('insights.html')}">Insights & Blog</a>
                    <a href="${prefix}pricing.html"
                        class="${getLinkClass('pricing.html')}">Pricing</a>
                </nav>`;

    // Replace desktop <nav ...> ... </nav> block
    const navRegex = /<nav\s+class="hidden lg:flex[\s\S]*?<\/nav>/i;
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newNavHtml);
        fs.writeFileSync(fullPath, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Successfully updated navigation bar across ${updatedCount} HTML files!`);
