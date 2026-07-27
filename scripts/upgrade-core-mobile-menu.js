const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const coreFiles = [
    { file: 'index.html', dirType: 'root', activeKey: 'home' },
    { file: 'about.html', dirType: 'root', activeKey: 'about' },
    { file: 'projects.html', dirType: 'root', activeKey: 'projects' },
    { file: 'products.html', dirType: 'root', activeKey: 'products' },
    { file: 'clients.html', dirType: 'root', activeKey: 'clients' },
    { file: 'contact.html', dirType: 'root', activeKey: 'contact' },
    { file: 'pricing.html', dirType: 'root', activeKey: 'pricing' },
    { file: 'insights.html', dirType: 'root', activeKey: 'insights' },
    { file: 'faq.html', dirType: 'root', activeKey: null },
    { file: 'services/custom-software.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/ui-ux.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/web-development.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/mobile-app.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/devops-cloud.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/maintenance-support.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/ecommerce.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/ai-machine-learning.html', dirType: 'services', activeKey: 'services' },
    { file: 'services/edi-supply-chain.html', dirType: 'services', activeKey: 'services' }
];

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

function getDrawerSection(file, dirType, activeKey) {
    const contactUrl = dirType === 'services' ? '../contact.html' : './contact.html';
    const logoUrl = dirType === 'services' ? '../images/logo.svg' : './images/logo.svg';

    const mobileLinks = menuItems.map(item => {
        let url = dirType === 'services' ? item.servicesUrl : item.rootUrl;
        if (file === 'index.html' && item.key === 'home') url = '#home';
        if (file === 'index.html' && item.key === 'services') url = '#services';

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
        return `                <a href="${url}" class="${className}">\n                    <i class="fas ${iconClass} ${iconColor} w-5 text-center"></i>\n                    <span>${item.name}</span>\n                </a>`;
    }).join('\n');

    return `                <!-- Mobile Menu Button -->
                <div class="lg:hidden flex items-center">
                    <button id="mobile-menu-btn" aria-label="Toggle Navigation Menu"
                        class="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 focus:outline-none transition-colors active:scale-95">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>

        </div>

        <!-- iOS Native Backdrop Overlay -->
        <div id="mobile-drawer-backdrop"
            class="fixed inset-0 bg-black/70 backdrop-blur-md z-[90] hidden transition-opacity duration-300 opacity-0"></div>

        <!-- iOS Native Side Drawer / Mobile Menu -->
        <aside id="mobile-drawer"
            class="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-slate-950/95 border-l border-white/15 backdrop-blur-3xl z-[100] shadow-[0_0_50px_rgba(0,0,0,0.8)] transform translate-x-full transition-transform duration-300 ease-out flex flex-col justify-between">
            
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
${mobileLinks}
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
    </header>`;
}

const newScriptBlock = `        // iOS Native Side Drawer Controller
        const mobileBtn = document.getElementById("mobile-menu-btn");
        const drawer = document.getElementById("mobile-drawer");
        const backdrop = document.getElementById("mobile-drawer-backdrop");
        const closeBtn = document.getElementById("close-drawer-btn");

        function openDrawer() {
            if (!drawer || !backdrop) return;
            backdrop.classList.remove("hidden");
            setTimeout(() => backdrop.classList.remove("opacity-0"), 10);
            drawer.classList.remove("translate-x-full");
            document.body.style.overflow = "hidden";
        }

        function closeDrawer() {
            if (!drawer || !backdrop) return;
            drawer.classList.add("translate-x-full");
            backdrop.classList.add("opacity-0");
            setTimeout(() => {
                backdrop.classList.add("hidden");
                document.body.style.overflow = "";
            }, 300);
        }

        if (mobileBtn) mobileBtn.addEventListener("click", openDrawer);
        if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
        if (backdrop) backdrop.addEventListener("click", closeDrawer);
        if (drawer) {
            drawer.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", closeDrawer);
            });
        }`;

let count = 0;
for (const entry of coreFiles) {
    const filePath = path.join(rootDir, entry.file);
    if (!fs.existsSync(filePath)) {
        console.error(`Missing file: ${filePath}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace from <!-- Mobile Menu Button --> down to </header>
    const mobileMenuRegex = /<!--\s*Mobile Menu Button\s*-->[\s\S]*?<\/header>/i;
    if (mobileMenuRegex.test(content)) {
        content = content.replace(mobileMenuRegex, getDrawerSection(entry.file, entry.dirType, entry.activeKey));
    } else {
        console.error(`Could not match mobile menu section in ${entry.file}`);
    }

    // 2. Replace old mobile menu script logic
    const oldScriptRegex = /(?:\/\/\s*Mobile Menu Toggle logic|const\s+mobileBtn\s*=\s*document\.getElementById\("mobile-menu-btn"\);)[\s\S]*?(?=\s*<\/script>)/i;
    if (oldScriptRegex.test(content)) {
        content = content.replace(oldScriptRegex, "\n" + newScriptBlock + "\n    ");
    } else {
        console.warn(`Could not match old script logic in ${entry.file}, checking if already updated...`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Successfully upgraded core mobile menu in ${entry.file}`);
}

console.log(`Completed upgrading mobile menu on ${count} core pages.`);
