const fs = require('fs');
const path = require('path');

const insightsPath = path.join(__dirname, '../insights.html');
let html = fs.readFileSync(insightsPath, 'utf8');

// Mapping of files to date and category
const metadata = {
  "listmonk-self-hosted-newsletter-developer-guide.html": { date: "2026-10-03", category: "devops" },
  "what-is-dpdp-vs-gdpr-indian-startups-freelancers-guide.html": { date: "2026-09-29", category: "strategy" },
  "how-to-host-local-wordpress-publicly-cloudflare-tunnel.html": { date: "2026-09-29", category: "devops" },
  "how-to-publish-chatgpt-plugin-mcp-app.html": { date: "2026-09-29", category: "ai" },
  "free-custom-domain-email-cloudflare-gmail.html": { date: "2026-09-13", category: "devops" },
  "chatgpt-hidden-features-tips-tricks.html": { date: "2026-09-12", category: "ai" },
  "custom-software-development-cost-in-india-2026.html": { date: "2026-08-25", category: "strategy" },
  "erp-development-cost-in-india-2026.html": { date: "2026-08-20", category: "strategy" },
  "crm-development-cost-in-india-2026.html": { date: "2026-08-15", category: "strategy" },
  "erp-vs-custom-software-which-is-better.html": { date: "2026-08-10", category: "strategy" },
  "how-to-build-an-ai-powered-crm.html": { date: "2026-08-05", category: "ai" },
  "coolify-self-hosted-heroku-alternative.html": { date: "2026-07-25", category: "devops" },
  "pocketbase-self-hosted-backend-guide.html": { date: "2026-07-25", category: "devops" },
  "trigger-dev-background-jobs-guide.html": { date: "2026-07-25", category: "devops" },
  "papercups-open-source-live-chat.html": { date: "2026-07-25", category: "devops" },
  "htmx-vs-react-frontend-paradigm.html": { date: "2026-07-25", category: "strategy" },
  "databasement-database-backup-manager.html": { date: "2026-07-25", category: "devops" },
  "httpsms-android-sms-gateway.html": { date: "2026-07-25", category: "devops" },
  "paperdraw-system-design-simulator.html": { date: "2026-07-25", category: "strategy" },
  "chatgpt-slash-commands-list.html": { date: "2026-07-25", category: "ai" },
  "meta-graph-api-permanent-access-token.html": { date: "2026-07-19", category: "devops" },
  "meta-sdk-graph-api-wrapper.html": { date: "2026-07-19", category: "devops" },
  "openwa-docker-setup-guide.html": { date: "2026-07-19", category: "devops" },
  "openwa-whatsapp-api-gateway-plugins.html": { date: "2026-07-19", category: "devops" },
  "automate-google-business-profile-node-sdk.html": { date: "2026-06-01", category: "devops" },
  "website-development-cost-in-gwalior.html": { date: "2026-06-01", category: "strategy" },
  "custom-software-development-benefits.html": { date: "2026-06-01", category: "strategy" },
  "ecommerce-seo-strategies-2026.html": { date: "2026-06-01", category: "strategy" }
};

// Extract grid
const gridStartMarker = '<div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
const gridEndMarker = '</div>\n        </div>\n    </section>';

const gridStartIndex = html.indexOf(gridStartMarker);
if (gridStartIndex === -1) {
  console.error('Could not find gridStartMarker');
  process.exit(1);
}

const gridEndIndex = html.indexOf(gridEndMarker, gridStartIndex);
if (gridEndIndex === -1) {
  console.error('Could not find gridEndMarker');
  process.exit(1);
}

const beforeGrid = html.substring(0, gridStartIndex + gridStartMarker.length);
const gridContent = html.substring(gridStartIndex + gridStartMarker.length, gridEndIndex);
const afterGrid = html.substring(gridEndIndex);

// Parse all cards
const cardRegex = /<a\s+href="([^"]+)"([\s\S]*?)<\/a>/g;
let match;
const cards = [];

while ((match = cardRegex.exec(gridContent)) !== null) {
  const fullCard = match[0];
  const href = match[1];
  const body = match[2];
  const filename = path.basename(href);
  
  const titleMatch = body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const meta = metadata[filename] || { date: "2026-06-01", category: "strategy" };

  // Clean existing data attributes if any
  let cleanCard = fullCard.replace(/\s+data-date="[^"]*"/g, '')
                          .replace(/\s+data-category="[^"]*"/g, '')
                          .replace(/\s+data-title="[^"]*"/g, '');

  // Inject data attributes right after <a href="..."
  const escapedTitle = title.replace(/"/g, '&quot;');
  cleanCard = cleanCard.replace(
    `<a href="${href}"`,
    `<a href="${href}" data-date="${meta.date}" data-category="${meta.category}" data-title="${escapedTitle}"`
  );

  cards.push({
    filename,
    href,
    date: meta.date,
    category: meta.category,
    title,
    cardHtml: cleanCard
  });
}

// Check if chatgpt-hidden-features card is missing
const hasHiddenFeatures = cards.some(c => c.filename === 'chatgpt-hidden-features-tips-tricks.html');
if (!hasHiddenFeatures) {
  const hiddenCardHtml = `
                <!-- Blog Card: ChatGPT Hidden Features -->
                <a href="./blog/chatgpt-hidden-features-tips-tricks.html" data-date="2026-09-12" data-category="ai" data-title="25+ ChatGPT Hidden Features, Tips &amp; Tricks Most Users Don't Know (2026)"
                    class="group block bg-slate-900/60 rounded-3xl border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col">
                    <div class="relative h-56 overflow-hidden">
                        <img src="./images/blog-images/chatgpt-hidden-features.jpg"
                            alt="25+ ChatGPT Hidden Features, Tips &amp; Tricks (2026)"
                            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>
                    <div class="p-6 md:p-8 flex flex-col flex-grow">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">AI &amp; Prompts</span>
                            <span class="text-[10px] font-bold text-violet-400 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">Power User Guide</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-tight">
                            25+ ChatGPT Hidden Features, Tips &amp; Tricks Most Users Don't Know (2026)</h3>
                        <p class="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">Unlock the full power of ChatGPT with 25+ secret features, keyboard shortcuts, memory controls, and power-user hacks.</p>
                        <div class="mt-auto flex items-center justify-between text-xs font-semibold text-gray-500">
                            <span>Read Article <i class="fas fa-arrow-right ml-1 text-cyan-400 group-hover:translate-x-1 transition-transform"></i></span>
                        </div>
                    </div>
                </a>`;
  cards.push({
    filename: 'chatgpt-hidden-features-tips-tricks.html',
    href: './blog/chatgpt-hidden-features-tips-tricks.html',
    date: '2026-09-12',
    category: 'ai',
    title: "25+ ChatGPT Hidden Features, Tips & Tricks Most Users Don't Know (2026)",
    cardHtml: hiddenCardHtml
  });
}

// Sort cards by date descending (Newest first)
cards.sort((a, b) => {
  if (b.date !== a.date) {
    return b.date.localeCompare(a.date);
  }
  return a.title.localeCompare(b.title);
});

console.log('Total sorted cards:', cards.length);
console.log('Top 3 cards:');
cards.slice(0, 3).forEach((c, i) => console.log(`${i + 1}. [${c.date}] ${c.title}`));

const newGridContent = '\n' + cards.map(c => c.cardHtml.trim()).join('\n\n') + '\n            ';

let updatedHtml = beforeGrid + newGridContent + afterGrid;

// Update total articles count in the UI badge
updatedHtml = updatedHtml.replace(
  /<span id="total-articles-count">[^<]*<\/span>/,
  `<span id="total-articles-count">${cards.length}</span>`
);

// Now upgrade the search & sorting script at the bottom
const oldScriptRegex = /<!-- Search Script -->[\s\S]*?<\/script>/;
const newScript = `<!-- Search & Sorting Script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('blog-search-input');
            const searchSuggestions = document.getElementById('blog-search-suggestions');
            const sortSelect = document.getElementById('blog-sort-select');
            const filterButtons = document.querySelectorAll('.blog-filter-btn');
            const totalCountBadge = document.getElementById('total-articles-count');
            const grid = document.getElementById('blog-grid');
            
            if (!grid) return;

            // Cache all card elements
            let cards = Array.from(grid.querySelectorAll(':scope > a'));

            let currentCategory = 'all';
            let currentSort = sortSelect ? sortSelect.value : 'newest';
            let currentQuery = '';

            function updateUI() {
                // 1. Sort cards array
                cards.sort((a, b) => {
                    if (currentSort === 'newest') {
                        return (b.dataset.date || '').localeCompare(a.dataset.date || '');
                    } else if (currentSort === 'oldest') {
                        return (a.dataset.date || '').localeCompare(b.dataset.date || '');
                    } else if (currentSort === 'title') {
                        return (a.dataset.title || '').localeCompare(b.dataset.title || '');
                    }
                    return 0;
                });

                // 2. Re-append in sorted order to grid
                cards.forEach(card => grid.appendChild(card));

                // 3. Filter by category & search query
                let visibleCount = 0;
                searchSuggestions.innerHTML = '';

                cards.forEach(card => {
                    const title = (card.dataset.title || card.querySelector('h3')?.textContent || '').toLowerCase();
                    const text = (card.querySelector('p')?.textContent || '').toLowerCase();
                    const tag = (card.textContent || '').toLowerCase();
                    const category = card.dataset.category || '';

                    const matchesCategory = (currentCategory === 'all' || category === currentCategory);
                    const matchesQuery = !currentQuery || title.includes(currentQuery) || text.includes(currentQuery) || tag.includes(currentQuery);

                    if (matchesCategory && matchesQuery) {
                        card.style.display = 'flex';
                        visibleCount++;

                        if (currentQuery && visibleCount <= 5) {
                            const li = document.createElement('li');
                            li.className = 'p-3 hover:bg-white/10 cursor-pointer text-sm text-gray-200 transition-colors flex items-center justify-between';
                            li.innerHTML = \`<span>\${card.dataset.title || card.querySelector('h3')?.textContent || ''}</span><i class="fas fa-arrow-right text-xs text-cyan-400"></i>\`;
                            li.addEventListener('click', () => {
                                window.location.href = card.getAttribute('href');
                            });
                            searchSuggestions.appendChild(li);
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (totalCountBadge) {
                    totalCountBadge.textContent = visibleCount;
                }

                if (currentQuery && visibleCount > 0) {
                    searchSuggestions.classList.remove('hidden');
                } else {
                    searchSuggestions.classList.add('hidden');
                }
            }

            // Search input listener
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    currentQuery = e.target.value.toLowerCase().trim();
                    updateUI();
                });

                document.addEventListener('click', (e) => {
                    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                        searchSuggestions.classList.add('hidden');
                    }
                });
            }

            // Sort dropdown listener
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    currentSort = e.target.value;
                    updateUI();
                });
            }

            // Category filter buttons listener
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => {
                        b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'shadow-[0_0_15px_rgba(6,182,212,0.3)]');
                        b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10');
                    });

                    btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
                    btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'border-cyan-400', 'shadow-[0_0_15px_rgba(6,182,212,0.3)]');

                    currentCategory = btn.getAttribute('data-filter') || 'all';
                    updateUI();
                });
            });

            // Initial call to ensure exact order
            updateUI();
        });
    </script>`;

updatedHtml = updatedHtml.replace(oldScriptRegex, newScript);

fs.writeFileSync(insightsPath, updatedHtml, 'utf8');
console.log('insights.html successfully updated with proper sorting, category filtering, and Listmonk as #1 card!');
