const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const menuItems = [
    { name: 'Home', rootUrl: './index.html', servicesUrl: '../index.html', key: 'home' },
    { name: 'About', rootUrl: './about.html', servicesUrl: '../about.html', key: 'about' },
    { name: 'Services', rootUrl: './services/index.html', servicesUrl: './index.html', key: 'services' },
    { name: 'Latest Products', rootUrl: './products.html', servicesUrl: '../products.html', key: 'products' },
    { name: 'Projects', rootUrl: './projects.html', servicesUrl: '../projects.html', key: 'projects' },
    { name: 'Clients', rootUrl: './clients.html', servicesUrl: '../clients.html', key: 'clients' },
    { name: 'Contact', rootUrl: './contact.html', servicesUrl: '../contact.html', key: 'contact' },
    { name: 'Pricing', rootUrl: './pricing.html', servicesUrl: '../pricing.html', key: 'pricing' },
    { name: 'Blog', rootUrl: './blog/index.html', servicesUrl: '../blog/index.html', key: 'blog' },
    { name: 'Insights', rootUrl: './insights.html', servicesUrl: '../insights.html', key: 'insights' }
];

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', 'scripts', '.gemini'].includes(file)) {
                getAllHtmlFiles(fullPath, arrayOfFiles);
            }
        } else if (file.endsWith('.html')) {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

function getDirType(relFile) {
    if (relFile.startsWith('services/')) return 'services';
    if (relFile.startsWith('blog/')) return 'blog';
    if (relFile.startsWith('policies/')) return 'policies';
    return 'root';
}

function getActiveKey(relFile, dirType) {
    if (dirType === 'services') return 'services';
    if (dirType === 'blog') return 'blog';
    if (dirType === 'policies') return null;
    if (relFile === 'index.html') return 'home';
    if (relFile === 'about.html') return 'about';
    if (relFile === 'projects.html') return 'projects';
    if (relFile === 'products.html') return 'products';
    if (relFile === 'clients.html') return 'clients';
    if (relFile === 'contact.html') return 'contact';
    if (relFile === 'pricing.html') return 'pricing';
    if (relFile === 'insights.html') return 'insights';
    if (relFile === 'faq.html') return null;
    return null;
}

function getUrls(relFile, dirType) {
    const isRoot = dirType === 'root';
    const isServices = dirType === 'services';
    const isBlog = dirType === 'blog';

    return menuItems.map(item => {
        let url = isRoot ? item.rootUrl : item.servicesUrl;
        if (isServices && item.key === 'services') url = './index.html';
        if (isBlog && item.key === 'blog') url = './index.html';

        if (relFile === 'index.html' && item.key === 'home') url = '#home';
        if (relFile === 'index.html' && item.key === 'services') url = '#services';
        if (relFile === 'services/index.html' && item.key === 'services') url = '#services';
        if (relFile === 'blog/index.html' && item.key === 'blog') url = '#blog';

        return { ...item, url };
    });
}

function getDrawerAndBottomNavHtml(relFile, dirType, activeKey) {
    const contactUrl = dirType === 'root' ? './contact.html' : '../contact.html';
    const logoUrl = dirType === 'root' ? './images/logo.svg' : '../images/logo.svg';
    const links = getUrls(relFile, dirType);

    const mobileLinksHtml = links.map(item => {
        const icons = {
            home: 'fa-home',
            about: 'fa-info-circle',
            services: 'fa-layer-group',
            products: 'fa-cube',
            projects: 'fa-briefcase',
            clients: 'fa-handshake',
            contact: 'fa-envelope',
            pricing: 'fa-tag',
            blog: 'fa-newspaper',
            insights: 'fa-chart-line'
        };
        const iconClass = icons[item.key] || 'fa-arrow-right';
        const isActive = activeKey === item.key;
        const className = isActive
            ? "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 shadow-sm transition-all"
            : "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all border border-transparent hover:border-white/5";
        const iconColor = isActive ? "text-cyan-300" : "text-cyan-400 group-hover:text-cyan-300";
        return `            <a href="${item.url}" class="${className}">\n                <i class="fas ${iconClass} ${iconColor} w-5 text-center"></i>\n                <span>${item.name}</span>\n            </a>`;
    }).join('\n');

    const homeUrl = links.find(l => l.key === 'home').url;
    const servicesUrl = links.find(l => l.key === 'services').url;
    const projectsUrl = links.find(l => l.key === 'projects').url;
    const blogUrl = links.find(l => l.key === 'blog').url;

    return `    <!-- iOS Native Backdrop Overlay (Placed outside header to prevent backdrop-blur containing block clipping) -->
    <div id="mobile-drawer-backdrop"
        class="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] hidden transition-opacity duration-300 opacity-0"></div>

    <!-- iOS Native Side Drawer / Full Screen Mobile Menu -->
    <aside id="mobile-drawer"
        class="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-slate-950/98 border-l border-white/15 backdrop-blur-3xl z-[100] shadow-[0_0_50px_rgba(0,0,0,0.9)] transform translate-x-full transition-transform duration-300 ease-out flex flex-col justify-between">
        
        <!-- Drawer Header -->
        <div class="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 flex items-center justify-center shadow-lg">
                    <img loading="lazy" src="${logoUrl}" alt="Logo" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-white text-base tracking-tight leading-none">Vitable<span class="text-cyan-400">Tech</span></span>
                    <span class="text-[9px] uppercase tracking-widest text-gray-400 mt-0.5">Enterprise SaaS</span>
                </div>
            </div>
            <button id="close-drawer-btn" aria-label="Close Mobile Menu"
                class="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all active:scale-90">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Drawer Navigation Links -->
        <nav class="flex-1 overflow-y-auto py-5 px-4 space-y-1 custom-scrollbar">
${mobileLinksHtml}
        </nav>

        <!-- Drawer Footer CTA -->
        <div class="p-5 border-t border-white/10 bg-white/[0.02] space-y-3">
            <a href="${contactUrl}"
                class="w-full shiny-btn py-3.5 rounded-xl font-bold text-sm text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 border border-white/20 active:scale-[0.98] transition-transform">
                <span>Start Your Project</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
            <div class="text-center">
                <span class="text-[10px] text-gray-500 font-medium">Headquartered in Gwalior, India</span>
            </div>
        </div>
    </aside>

    <!-- iOS Native Bottom Navigation Bar -->
    <nav id="ios-bottom-nav" class="md:hidden fixed bottom-0 left-0 w-full z-[80] pb-safe pt-2 px-2 bg-slate-950/95 backdrop-blur-2xl border-t border-white/15 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
        <div class="flex justify-around items-center max-w-md mx-auto">
            <a href="${homeUrl}" class="flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${activeKey === 'home' ? 'text-cyan-400 font-bold scale-105' : 'text-gray-400 hover:text-white'}">
                <i class="fas fa-home text-lg ${activeKey === 'home' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}"></i>
                <span class="text-[10px] mt-1 tracking-tight">Home</span>
            </a>
            <a href="${servicesUrl}" class="flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${activeKey === 'services' ? 'text-cyan-400 font-bold scale-105' : 'text-gray-400 hover:text-white'}">
                <i class="fas fa-layer-group text-lg ${activeKey === 'services' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}"></i>
                <span class="text-[10px] mt-1 tracking-tight">Services</span>
            </a>
            <a href="${projectsUrl}" class="flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${activeKey === 'projects' ? 'text-cyan-400 font-bold scale-105' : 'text-gray-400 hover:text-white'}">
                <i class="fas fa-briefcase text-lg ${activeKey === 'projects' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}"></i>
                <span class="text-[10px] mt-1 tracking-tight">Projects</span>
            </a>
            <a href="${blogUrl}" class="flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${activeKey === 'blog' ? 'text-cyan-400 font-bold scale-105' : 'text-gray-400 hover:text-white'}">
                <i class="fas fa-newspaper text-lg ${activeKey === 'blog' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}"></i>
                <span class="text-[10px] mt-1 tracking-tight">Blog</span>
            </a>
            <button id="bottom-nav-menu-btn" aria-label="Open Menu" class="flex flex-col items-center py-1.5 px-3 rounded-xl text-gray-400 hover:text-white transition-all active:scale-95 focus:outline-none">
                <i class="fas fa-bars text-lg text-cyan-400"></i>
                <span class="text-[10px] mt-1 tracking-tight text-cyan-400 font-semibold">Menu</span>
            </button>
        </div>
    </nav>`;
}

const newScriptBlock = `        // iOS Native Side Drawer & Bottom Nav Controller (DOMContentLoaded for bulletproof element binding)
        function initMobileNavigation() {
            const mobileBtn = document.getElementById("mobile-menu-btn");
            const bottomMenuBtn = document.getElementById("bottom-nav-menu-btn");
            const drawer = document.getElementById("mobile-drawer");
            const backdrop = document.getElementById("mobile-drawer-backdrop");
            const closeBtn = document.getElementById("close-drawer-btn");

            function openDrawer() {
                const d = document.getElementById("mobile-drawer");
                const b = document.getElementById("mobile-drawer-backdrop");
                if (!d || !b) return;
                b.classList.remove("hidden");
                setTimeout(() => b.classList.remove("opacity-0"), 10);
                d.classList.remove("translate-x-full");
                document.body.style.overflow = "hidden";
            }

            function closeDrawer() {
                const d = document.getElementById("mobile-drawer");
                const b = document.getElementById("mobile-drawer-backdrop");
                if (!d || !b) return;
                d.classList.add("translate-x-full");
                b.classList.add("opacity-0");
                setTimeout(() => {
                    b.classList.add("hidden");
                    document.body.style.overflow = "";
                }, 300);
            }

            if (mobileBtn) mobileBtn.addEventListener("click", openDrawer);
            if (bottomMenuBtn) bottomMenuBtn.addEventListener("click", openDrawer);
            if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
            if (backdrop) backdrop.addEventListener("click", closeDrawer);
            if (drawer) {
                drawer.querySelectorAll("a").forEach(link => {
                    link.addEventListener("click", closeDrawer);
                });
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMobileNavigation);
        } else {
            initMobileNavigation();
        }`;

const files = getAllHtmlFiles(rootDir);
let count = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const relFile = path.relative(rootDir, filePath);
    const dirType = getDirType(relFile);
    const activeKey = getActiveKey(relFile, dirType);

    // 1. Remove existing drawer/backdrop from inside header or anywhere else
    const drawerRegex = /(?:<!--\s*iOS Native Backdrop Overlay[\s\S]*?-->\s*)?<div\s+id="mobile-drawer-backdrop"[\s\S]*?<\/aside>\s*(<\/header>)?/gi;
    content = content.replace(drawerRegex, (match, p1) => p1 ? p1 : '');

    // 2. Remove existing bottom nav
    const bottomNavRegex = /(?:<!--\s*(?:iOS Native |Mobile )?Bottom Navigation Bar\s*-->\s*)?<nav\s+(?:id="ios-bottom-nav"|class="md:hidden fixed bottom-0)[\s\S]*?<\/nav>/gi;
    content = content.replace(bottomNavRegex, '');

    // 3. Inject new full-screen drawer and bottom nav before </body>
    const toInject = getDrawerAndBottomNavHtml(relFile, dirType, activeKey);
    if (content.includes('</body>')) {
        content = content.replace('</body>', '\n' + toInject + '\n</body>');
    }

    // 4. Update JS Controller
    const scriptRegex = /(?:\/\/\s*(?:iOS Native Side Drawer|Mobile Menu Toggle)|const\s+mobileBtn\s*=\s*document\.getElementById\("mobile-menu-btn"\);|function\s+initMobileNavigation\(\))[\s\S]*?(?=\s*<\/script>)/i;
    if (scriptRegex.test(content)) {
        content = content.replace(scriptRegex, "\n" + newScriptBlock + "\n    ");
    } else {
        console.warn(`Could not match script block in ${relFile}`);
    }

    // 5. Update goToTopBtn position on mobile so it doesn't overlap with bottom nav
    content = content.replace(/fixed (?:bottom-20 md:)?bottom-6 right-6/g, 'fixed bottom-20 md:bottom-6 right-6');

    // 6. Ensure footer has pb-24 on mobile so content isn't covered by bottom nav
    content = content.replace(/(<footer[^>]*class="[^"]*)(?:pb-24 md:)?pb-12([^"]*")/i, '$1pb-24 md:pb-12$2');

    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Successfully fixed mobile navigation on ${relFile}`);
});

console.log(`Completed mobile navigation fix across ${count} HTML files.`);
