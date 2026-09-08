const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 10 items menu
const menuItems = [
    { name: 'Home', serviceUrl: '../index.html', key: 'home' },
    { name: 'About', serviceUrl: '../about.html', key: 'about' },
    { name: 'Services', serviceUrl: '../services/index.html', serviceSelfUrl: './index.html', key: 'services' },
    { name: 'Latest Products', serviceUrl: '../products.html', key: 'products' },
    { name: 'Projects', serviceUrl: '../projects.html', key: 'projects' },
    { name: 'Clients', serviceUrl: '../clients.html', key: 'clients' },
    { name: 'Contact', serviceUrl: '../contact.html', key: 'contact' },
    { name: 'Pricing', serviceUrl: '../pricing.html', key: 'pricing' },
    { name: 'Blog', serviceUrl: '../blog/index.html', blogSelfUrl: './index.html', key: 'blog' },
    { name: 'Insights', serviceUrl: '../insights.html', key: 'insights' }
];

const filesToUpgrade = [
    { file: 'services/index.html', dirType: 'services', activeKey: 'services' },
    { file: 'blog/index.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/automate-google-business-profile-node-sdk.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/chatgpt-slash-commands-list.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/coolify-self-hosted-heroku-alternative.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/custom-software-development-benefits.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/databasement-database-backup-manager.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/ecommerce-seo-strategies-2026.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/htmx-vs-react-frontend-paradigm.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/httpsms-android-sms-gateway.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/meta-graph-api-permanent-access-token.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/meta-sdk-graph-api-wrapper.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/openwa-docker-setup-guide.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/openwa-whatsapp-api-gateway-plugins.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/papercups-open-source-live-chat.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/paperdraw-system-design-simulator.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/pocketbase-self-hosted-backend-guide.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/trigger-dev-background-jobs-guide.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'blog/website-development-cost-in-gwalior.html', dirType: 'blog', activeKey: 'blog' },
    { file: 'policies/privacy-policy.html', dirType: 'policies', activeKey: null },
    { file: 'policies/terms-and-conditions.html', dirType: 'policies', activeKey: null },
    { file: 'policies/return-refund-policy.html', dirType: 'policies', activeKey: null }
];

function getTopSection(dirType, activeKey) {
    const links = menuItems.map(item => {
        let url = item.serviceUrl;
        if (dirType === 'services' && item.key === 'services') url = item.serviceSelfUrl;
        if (dirType === 'blog' && item.key === 'blog' && item.blogSelfUrl) url = item.blogSelfUrl;

        const isActive = activeKey === item.key;
        const className = isActive
            ? "px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 border border-white/15 transition-all duration-200 shadow-sm"
            : "px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200";
        return `                    <a href="${url}"\n                        class="${className}">${item.name}</a>`;
    }).join('\n');

    const mobileLinks = menuItems.map(item => {
        let url = item.serviceUrl;
        if (dirType === 'services' && item.key === 'services') url = item.serviceSelfUrl;
        if (dirType === 'blog' && item.key === 'blog' && item.blogSelfUrl) url = item.blogSelfUrl;

        const icons = {
            home: 'fa-home',
            about: 'fa-info-circle',
            services: 'fa-layer-group',
            products: 'fa-cube',
            projects: 'fa-briefcase',
            clients: 'fa-handshake',
            contact: 'fa-envelope',
            pricing: 'fa-wallet',
            blog: 'fa-newspaper',
            insights: 'fa-chart-line'
        };
        const iconClass = icons[item.key] || 'fa-arrow-right';

        const isActive = activeKey === item.key;
        const className = isActive
            ? "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 shadow-sm transition-all"
            : "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all border border-transparent hover:border-white/5";
        const iconColor = isActive ? "text-cyan-300" : "text-cyan-400 group-hover:text-cyan-300";
        return `            <a href="${url}" class="${className}">\n                <i class="fas ${iconClass} ${iconColor} w-5 text-center"></i>\n                <span>${item.name}</span>\n            </a>`;
    }).join('\n');

    return `    <!-- Announcement Bar -->
    <div
        class="bg-gradient-to-r from-blue-900 via-primary to-violet-900 text-white py-2.5 overflow-hidden relative z-[100] border-b border-white/10 shadow-lg">
        <div class="whitespace-nowrap animate-marquee flex items-center text-xs md:text-sm font-medium tracking-wide">
            <span class="mx-8 flex items-center gap-2.5">
                <span
                    class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold">🌐</span>
                <span class="text-white font-semibold">Global Engineering Partner:</span> Headquartered in India,
                delivering cutting-edge software & AI architectures across USA, Japan, India & worldwide.
                <a href="../contact.html"
                    class="underline decoration-cyan-400 underline-offset-4 text-cyan-300 font-semibold hover:text-white transition-colors ml-1">Book
                    Global Consultation →</a>
            </span>
            <span class="mx-8 flex items-center gap-2.5">
                <span
                    class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-400/20 text-violet-300 text-xs font-bold">🚀</span>
                <span class="text-white font-semibold">Open Source Innovation:</span> Explore our trending VS Code
                extensions and developer tools powering engineering workflows globally.
                <a href="../projects.html"
                    class="underline decoration-violet-400 underline-offset-4 text-violet-300 font-semibold hover:text-white transition-colors ml-1">Explore
                    Repos →</a>
            </span>
        </div>
    </div>

    <!-- Floating Social Media Bar (Desktop Left) -->
    <div
        class="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3 p-2.5 liquid-glass-dark rounded-r-2xl border-l-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <a href="https://github.com/vitabletech" target="_blank" aria-label="Visit our GitHub"
            class="w-10 h-10 bg-slate-900/80 text-gray-300 hover:text-white rounded-xl flex items-center justify-center border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 group">
            <i class="fab fa-github text-lg group-hover:rotate-6 transition-transform"></i>
            <span class="sr-only">GitHub</span>
        </a>
        <a href="https://www.facebook.com/vitabletech" target="_blank" aria-label="Visit our Facebook"
            class="w-10 h-10 bg-slate-900/80 text-gray-300 hover:text-white rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 group">
            <i class="fab fa-facebook-f text-lg group-hover:rotate-6 transition-transform"></i>
            <span class="sr-only">Facebook</span>
        </a>
        <a href="https://www.youtube.com/@vitabletech" target="_blank" aria-label="Visit our YouTube"
            class="w-10 h-10 bg-slate-900/80 text-gray-300 hover:text-white rounded-xl flex items-center justify-center border border-white/10 hover:border-red-500/50 hover:bg-red-600/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 group">
            <i class="fab fa-youtube text-lg group-hover:rotate-6 transition-transform"></i>
            <span class="sr-only">YouTube</span>
        </a>
        <a href="https://wa.me/916280671085" target="_blank" aria-label="Contact us on WhatsApp"
            class="w-10 h-10 bg-slate-900/80 text-gray-300 hover:text-white rounded-xl flex items-center justify-center border border-white/10 hover:border-green-500/50 hover:bg-green-600/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 group">
            <i class="fab fa-whatsapp text-lg group-hover:rotate-6 transition-transform"></i>
            <span class="sr-only">WhatsApp</span>
        </a>
        <a href="https://www.instagram.com/vitabletech" target="_blank" aria-label="Visit our Instagram"
            class="w-10 h-10 bg-slate-900/80 text-gray-300 hover:text-white rounded-xl flex items-center justify-center border border-white/10 hover:border-pink-500/50 hover:bg-pink-600/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300 group">
            <i class="fab fa-instagram text-xl group-hover:rotate-6 transition-transform"></i>
            <span class="sr-only">Instagram</span>
        </a>
    </div>

    <!-- HEADER / LIQUID GLASS NAVBAR -->
    <header id="main-navbar"
        class="sticky top-0 z-50 transition-all duration-300 py-5 bg-slate-950/50 backdrop-blur-2xl border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">

                <!-- Liquid Logo -->
                <a href="../index.html#home"
                    class="flex items-center gap-3.5 group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl p-1">
                    <div
                        class="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent p-0.5 shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-500 flex items-center justify-center overflow-hidden liquid-shine">
                        <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                            <img loading="eager" fetchpriority="high" src="../images/logo.svg" alt="VitableTech Logo"
                                class="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300"
                                width="24" height="24" onerror="this.style.display='none'" />
                            <span
                                class="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                                style="display:none;">VT</span>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="font-extrabold text-xl tracking-tight leading-none flex items-center gap-1">
                            <span class="text-white group-hover:text-cyan-300 transition-colors">Vitable</span><span
                                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Tech</span>
                        </div>
                        <span
                            class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold group-hover:text-gray-300 transition-colors mt-0.5">Global
                            Enterprise SaaS</span>
                    </div>
                </a>

                <!-- Desktop Navigation Menu -->
                <nav
                    class="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
${links}
                </nav>

                <!-- Right Action / Primary CTA -->
                <div class="hidden sm:flex items-center gap-4">
                    <a href="../contact.html"
                        class="shiny-btn magnetic-btn px-6 py-2.5 rounded-full font-semibold text-xs text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center gap-2 border border-white/20 bg-white/10">
                        <span>Start Your Project</span>
                        <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <!-- Mobile Menu Button -->
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
                        <img loading="lazy" src="../images/logo.svg" alt="Logo" class="w-5 h-5" />
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
                <a href="../contact.html"
                    class="w-full shiny-btn py-3.5 rounded-xl font-bold text-sm text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 border border-white/20 active:scale-[0.98] transition-transform">
                    <span>Start Your Project</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                <div class="text-center">
                    <span class="text-[10px] text-gray-500 font-medium">Headquartered in India, India</span>
                </div>
            </div>
        </aside>
    </header>`;
}

function getFooterSection(dirType) {
    const sPrefix = dirType === 'services' ? './' : '../services/';
    const pPrefix = dirType === 'policies' ? './' : '../policies/';
    const bPrefix = dirType === 'blog' ? './' : '../blog/';

    return `    <!-- FOOTER (Dark Premium Glass) -->
    <footer class="liquid-glass-dark border-t border-white/10 pt-20 pb-12 relative overflow-hidden mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
                <div class="lg:col-span-2 space-y-6">
                    <a href="../index.html#home" class="flex items-center gap-3">
                        <img loading="lazy" src="../images/logo.svg" alt="VitableTech Logo" class="h-10 w-10" width="40"
                            height="40" onerror="this.style.display='none'" />
                        <div>
                            <span class="text-2xl font-bold tracking-tight text-white">Vitable<span
                                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Tech</span></span>
                            <span class="block text-xs text-gray-400 font-medium">Global Enterprise SaaS Architecture</span>
                        </div>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Empowering businesses with custom software, web applications, and cutting-edge AI digital
                        solutions globally.
                    </p>
                    <div class="flex items-center gap-3 pt-2">
                        <a href="https://github.com/vitabletech" target="_blank" aria-label="GitHub"
                            class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"><i
                                class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/company/vitabletech/" target="_blank" aria-label="LinkedIn"
                            class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all"><i
                                class="fab fa-linkedin-in"></i></a>
                        <a href="https://x.com/vitabletech" target="_blank" aria-label="Twitter X"
                            class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-violet-400/50 hover:bg-violet-500/10 transition-all"><i
                                class="fab fa-twitter"></i></a>
                        <a href="https://www.youtube.com/@vitabletech" target="_blank" aria-label="YouTube"
                            class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-red-400/50 hover:bg-red-500/10 transition-all"><i
                                class="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div class="space-y-4">
                    <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Services</h4>
                    <ul class="space-y-2.5 text-xs font-medium text-gray-400">
                        <li><a href="${sPrefix}custom-software.html" class="hover:text-cyan-400 transition-colors">Custom Software Dev</a></li>
                        <li><a href="${sPrefix}ai-machine-learning.html" class="hover:text-cyan-400 transition-colors">AI & Machine Learning</a></li>
                        <li><a href="${sPrefix}web-development.html" class="hover:text-cyan-400 transition-colors">Website Development</a></li>
                        <li><a href="${sPrefix}mobile-app.html" class="hover:text-cyan-400 transition-colors">Mobile App Dev</a></li>
                        <li><a href="${sPrefix}ui-ux.html" class="hover:text-cyan-400 transition-colors">UI/UX Design</a></li>
                        <li><a href="${sPrefix}ecommerce.html" class="hover:text-cyan-400 transition-colors">E-Commerce Solutions</a></li>
                        <li><a href="${sPrefix}devops-cloud.html" class="hover:text-cyan-400 transition-colors">DevOps & Cloud</a></li>
                    </ul>
                </div>

                <div class="space-y-4">
                    <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Ecosystem</h4>
                    <ul class="space-y-2.5 text-xs font-medium text-gray-400">
                        <li><a href="../products.html" class="hover:text-cyan-400 transition-colors">Ludo Player VS Code</a></li>
                        <li><a href="../products.html" class="hover:text-cyan-400 transition-colors">Fake Developer Mode</a></li>
                        <li><a href="../products.html" class="hover:text-cyan-400 transition-colors">ANSI Spectrum Tool</a></li>
                        <li><a href="../projects.html" class="hover:text-cyan-400 transition-colors">PlannerBuddy App</a></li>
                        <li><a href="../projects.html" class="hover:text-cyan-400 transition-colors">SnippetMaster Vault</a></li>
                        <li><a href="../projects.html" class="hover:text-cyan-400 transition-colors">GitHub Repositories</a></li>
                        <li><a href="../insights.html" class="hover:text-cyan-400 transition-colors">Tech Insights & Blog</a></li>
                    </ul>
                </div>

                <!-- <div class="space-y-4">
                    <h4 class="text-sm font-extrabold text-white uppercase tracking-wider">Stay Ahead</h4>
                    <p class="text-xs text-gray-400 leading-relaxed">
                        Subscribe to our engineering newsletter for AI architecture breakdowns, open-source releases,
                        and global tech updates.
                    </p>
                    <form
                        onsubmit="event.preventDefault(); alert('Thank you for subscribing to VitableTech Engineering Updates!');"
                        class="space-y-2.5">
                        <div class="relative">
                            <input type="email" required placeholder="Enter your business email..."
                                class="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner" />
                        </div>
                        <button type="submit"
                            class="w-full shiny-btn py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2">
                            <span>Subscribe to Newsletter</span> <span>→</span>
                        </button>
                    </form>
                </div> -->
            </div>

            <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                <div>
                    &copy; 2026 VitableTech. All rights reserved. Headquartered in India, India — Delivering Global
                    Engineering Excellence.
                </div>
                <div class="flex items-center gap-6">
                    <a href="${pPrefix}privacy-policy.html" class="hover:text-gray-300 transition-colors">Privacy Policy</a>
                    <a href="${pPrefix}terms-and-conditions.html" class="hover:text-gray-300 transition-colors">Terms of Service</a>
                    <a href="${pPrefix}return-refund-policy.html" class="hover:text-gray-300 transition-colors">Refund Policy</a>
                    <a href="../sitemap.xml" class="hover:text-gray-300 transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>

    <button id="goToTopBtn" aria-label="Go to top"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-110 flex items-center justify-center opacity-0 invisible transition-all duration-300 border border-white/20">
        ↑
    </button>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 });
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
        }

        const goToTopBtn = document.getElementById("goToTopBtn");
        if (goToTopBtn) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    goToTopBtn.classList.remove("opacity-0", "invisible");
                    goToTopBtn.classList.add("opacity-100", "visible");
                } else {
                    goToTopBtn.classList.add("opacity-0", "invisible");
                    goToTopBtn.classList.remove("opacity-100", "visible");
                }
            });
            goToTopBtn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    </script>
    <script src="../js/custom_script.js"></script>
</body>
</html>`;
}

let count = 0;
for (const entry of filesToUpgrade) {
    const filePath = path.join(rootDir, entry.file);
    if (!fs.existsSync(filePath)) {
        console.error(`Missing file: ${filePath}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Upgrade body tag
    content = content.replace(/<body[^>]*>/i, '<body class="font-sans text-gray-300 bg-dark overflow-x-hidden selection:bg-primary/30 selection:text-white">');

    // 2. Upgrade sections FIRST so outer containers get calm dark backgrounds without card hover glow
    content = content.replace(/<section([^>]*)bg-white([^>]*)>/ig, '<section$1bg-slate-900/40 border-y border-white/5$2>');
    content = content.replace(/<section([^>]*)bg-gray-50([^>]*)>/ig, '<section$1bg-dark$2>');

    // 3. Upgrade internal colors & card styles for dark theme using lookahead regex so opacity modifiers like /10 aren't matched
    content = content.replace(/bg-white(?=[\s"'])/g, 'bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all');
    content = content.replace(/bg-gray-50(?=[\s"'])/g, 'bg-dark');
    content = content.replace(/bg-gray-100(?=[\s"'])/g, 'bg-slate-900/60 border border-white/10');
    content = content.replace(/bg-gray-200(?=[\s"'])/g, 'bg-white/10');
    
    // Replace text colors
    content = content.replace(/text-gray-900(?=[\s"'])/g, 'text-white');
    content = content.replace(/text-gray-800(?=[\s"'])/g, 'text-gray-100');
    content = content.replace(/text-gray-700(?=[\s"'])/g, 'text-gray-300');
    content = content.replace(/text-gray-600(?=[\s"'])/g, 'text-gray-400');
    content = content.replace(/text-gray-500(?=[\s"'])/g, 'text-gray-400');
    content = content.replace(/text-blue-600(?=[\s"'])/g, 'text-cyan-400');
    
    // Replace border colors
    content = content.replace(/border-gray-200(?=[\s"'])/g, 'border-white/10');
    content = content.replace(/border-gray-300(?=[\s"'])/g, 'border-white/10');
    content = content.replace(/border-gray-100(?=[\s"'])/g, 'border-white/10');

    // Fix the multi-anchor bug on card 1 in services/index.html specifically
    if (entry.file === 'services/index.html') {
        const multiAnchorRegex = /<a href="\.\.\/services\/edi-supply-chain\.html"[\s\S]*?<a href="\.\.\/services\/custom-software\.html" class="absolute inset-0 z-10"><span class="sr-only">Custom Software<\/span><\/a>/i;
        content = content.replace(multiAnchorRegex, '<a href="../services/custom-software.html" class="absolute inset-0 z-10"><span class="sr-only">Custom Software</span></a>');
    }

    // 4. Replace top section (from Announcement bar or Navigation down to </nav> or </header>)
    const topSectionRegex = /(?:<!--\s*Announcement Bar\s*-->|<div\s+class="bg-gradient-to-r\s+from-primary-dark[\s\S]*?)<\/nav>/i;
    if (topSectionRegex.test(content)) {
        content = content.replace(topSectionRegex, getTopSection(entry.dirType, entry.activeKey));
    } else {
        const headerRegex = /(?:<!--\s*Announcement Bar\s*-->|<div\s+class="bg-gradient-to-r\s+from-[\s\S]*?)<\/header>/i;
        if (headerRegex.test(content)) {
            content = content.replace(headerRegex, getTopSection(entry.dirType, entry.activeKey));
        } else {
            console.error(`Could not match top section in ${entry.file}`);
        }
    }

    // 5. Replace old footer (from <!-- Footer --> or <footer down to </html>)
    const footerRegex = /(?:<!--\s*Footer[\s\S]*?-->\s*)?<footer[\s\S]*?<\/html>/i;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, getFooterSection(entry.dirType));
    } else {
        console.error(`Could not match footer in ${entry.file}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Successfully upgraded ${entry.file}`);
}

console.log(`Completed upgrading all ${count} remaining pages.`);
