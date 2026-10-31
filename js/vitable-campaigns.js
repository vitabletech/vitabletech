/*
 * VitableTech self-promotion campaign system.
 * Change enabled, maxPerPage, placement selectors, and campaign weights here.
 * Campaigns rotate randomly without repeating within the same page view.
 */
(function () {
    'use strict';

    // GA4 is already configured on the site; this stub lets global conversion
    // events queue safely before its intentionally delayed network request.
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    function trackSiteEvent(name, link) {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', name, {
            link_url: link.href,
            link_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
            page_location: location.href,
            page_path: location.pathname
        });
    }

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link || link.hasAttribute('data-vt-promo-click')) return;
        const href = link.getAttribute('href') || '';
        if (/^tel:/i.test(href)) return trackSiteEvent('phone_click', link);
        if (/^mailto:/i.test(href)) return trackSiteEvent('email_click', link);
        if (/^https?:\/\/(?:www\.)?wa\.me\//i.test(link.href)) return trackSiteEvent('whatsapp_click', link);
        if (/contact\.html(?:[?#]|$)/i.test(href) || href === '#contact-form') return trackSiteEvent('contact_cta_click', link);

        const target = new URL(link.href, location.href);
        const isVitableProduct = target.hostname.endsWith('.vitabletech.in') && target.hostname !== 'www.vitabletech.in';
        const isProductCatalogue = /projects\.html$/i.test(target.pathname) && target.hash === '#products';
        const productSection = link.closest('#top-products, #products, #open-source');
        if (isVitableProduct || isProductCatalogue || productSection) trackSiteEvent('product_demo_click', link);
    });

    document.addEventListener('submit', (event) => {
        const form = event.target;
        if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;
        if (typeof window.gtag === 'function') window.gtag('event', 'contact_form_submit', {
            form_id: form.id,
            page_location: location.href,
            page_path: location.pathname
        });
    }, true);

    const settings = {
        enabled: true,
        maxPerPage: 2,
        placements: [
            { name: 'article-sidebar', insert: 'prepend' },
            { name: 'after-hero', insert: 'after' },
            { name: 'mid-content', insert: 'after' }
        ]
    };

    const campaigns = [
        { type: 'brand', name: 'VitableTech', eyebrow: 'Software built around your business', description: 'Custom software, AI systems, SaaS products, mobile apps and cloud solutions for growing teams.', href: 'contact.html?campaign=vt-brand', cta: 'Start a project', image: 'images/campaigns/turn-ideas-into-software.webp', theme: 'blue', weight: 2 },
        { type: 'brand', name: 'AI & Workflow Engineering', eyebrow: 'Make AI useful for business', description: 'Plan practical AI agents, RAG systems and workflow automation with an engineering team.', href: 'services/ai-machine-learning.html?campaign=vt-ai', cta: 'Explore AI services', image: 'images/campaigns/ai-workflow-campaign.webp', theme: 'violet', weight: 1 },
        { type: 'brand', name: 'Custom Software Development', eyebrow: 'From idea to working software', description: 'Build web platforms, internal systems and SaaS products around the way your business works.', href: 'services/custom-software.html?campaign=vt-custom-software', cta: 'Discuss your software', image: 'images/campaigns/make-ai-useful.webp', theme: 'cyan', weight: 1 },

        { type: 'product', name: 'Legal Research Desk', eyebrow: 'Legal research & documents', description: 'Explore a focused workspace for legal research and document workflows.', href: 'https://legalresearchdesk.vitabletech.in/', cta: 'Explore Legal Research Desk', theme: 'violet' },
        { type: 'product', name: 'Apna Design', eyebrow: 'Design resources', description: 'Discover design resources and templates for creative projects.', href: 'https://apna.design/', cta: 'Explore Apna Design', theme: 'pink' },
        { type: 'product', name: 'Interview Questions', eyebrow: 'Interview preparation', description: 'Browse technical interview preparation resources for developers.', href: 'https://interview-questions.vitabletech.in/', cta: 'Practice interview questions', theme: 'blue' },
        { type: 'product', name: 'BloggerDev', eyebrow: 'Developer publishing', description: 'Explore developer-focused blogging tools and templates.', href: 'https://bloggerdev.vitabletech.in/', cta: 'Explore BloggerDev', theme: 'orange' },
        { type: 'product', name: 'SocialHub', eyebrow: 'Social media publishing', description: 'Plan, manage and publish content across social platforms from one workspace.', href: 'https://socialhub.vitabletech.in/', cta: 'Explore SocialHub', theme: 'blue' },
        { type: 'product', name: 'SnippetMaster', eyebrow: 'Developer productivity', description: 'Keep reusable code snippets and commands close to your development workflow.', href: 'https://snippetmaster.vitabletech.in/', cta: 'Explore SnippetMaster', theme: 'amber' },
        { type: 'product', name: 'CareerBuddy', eyebrow: 'Career companion', description: 'Get support with career planning, professional profiles, resumes and applications.', href: 'https://careerbuddy.vitabletech.in/', cta: 'Explore CareerBuddy', theme: 'violet' },
        { type: 'product', name: 'GBP Tools', eyebrow: 'Google Business Profile', description: 'Explore tools and developer resources for Google Business Profile workflows.', href: 'https://gbp.vitabletech.in/', cta: 'Explore GBP Tools', theme: 'emerald' },
        { type: 'product', name: 'Ludo Player for VS Code', eyebrow: 'Developer tools', description: 'Take a quick break with the Ludo Player extension for Visual Studio Code.', href: 'projects.html#products', cta: 'See developer products', theme: 'pink' },
        { type: 'product', name: 'Fake Developer Mode', eyebrow: 'VS Code extension', description: 'Discover a playful developer extension from the VitableTech ecosystem.', href: 'projects.html#products', cta: 'See developer products', theme: 'cyan' },

        { type: 'service', name: 'Custom Software Development', eyebrow: 'Software tailored to your workflow', description: 'Design and build secure business platforms, portals and SaaS products.', href: 'services/custom-software.html?campaign=service-custom-software', cta: 'Discuss your requirements', theme: 'blue' },
        { type: 'service', name: 'Web Development', eyebrow: 'Websites & web applications', description: 'Create fast, responsive websites and web applications designed around your goals.', href: 'services/web-development.html?campaign=service-web-development', cta: 'Plan a website', theme: 'cyan' },
        { type: 'service', name: 'UI/UX & Figma Design', eyebrow: 'Product design', description: 'Turn user needs into clear journeys, prototypes and reusable interface systems.', href: 'services/ui-ux.html?campaign=service-ui-ux', cta: 'Explore design services', theme: 'violet' },
        { type: 'service', name: 'Mobile App Development', eyebrow: 'iOS & Android apps', description: 'Plan and build mobile products connected to your business systems.', href: 'services/mobile-app.html?campaign=service-mobile-app', cta: 'Discuss an app', theme: 'blue' },
        { type: 'service', name: 'AI & Machine Learning', eyebrow: 'Practical AI engineering', description: 'Explore AI assistants, RAG, data workflows and machine learning integrations.', href: 'services/ai-machine-learning.html?campaign=service-ai', cta: 'Explore AI services', theme: 'violet' },
        { type: 'service', name: 'E-commerce Development', eyebrow: 'Online commerce', description: 'Build commerce experiences with product catalogues, payments and custom integrations.', href: 'services/ecommerce.html?campaign=service-ecommerce', cta: 'Plan an e-commerce site', theme: 'emerald' },
        { type: 'service', name: 'DevOps & Cloud', eyebrow: 'Cloud infrastructure', description: 'Improve deployment workflows, cloud architecture, observability and reliability.', href: 'services/devops-cloud.html?campaign=service-devops', cta: 'Discuss cloud services', theme: 'cyan' },
        { type: 'service', name: 'Maintenance & Support', eyebrow: 'Ongoing engineering support', description: 'Keep websites and software updated, monitored and working as your needs change.', href: 'services/maintenance-support.html?campaign=service-support', cta: 'Explore support options', theme: 'amber' },
        { type: 'service', name: 'EDI & Supply Chain', eyebrow: 'Connected operations', description: 'Connect trading partners and streamline electronic data interchange workflows.', href: 'services/edi-supply-chain.html?campaign=service-edi', cta: 'Discuss EDI workflows', theme: 'emerald' },
        { type: 'service', name: 'IT Outsourcing', eyebrow: 'Extend your engineering team', description: 'Add engineering capacity for product development, delivery and ongoing operations.', href: 'services/it-outsourcing.html?campaign=service-outsourcing', cta: 'Explore team options', theme: 'blue' }
    ];

    const themeColors = {
        blue: ['#2563eb', '#38bdf8'], cyan: ['#0891b2', '#67e8f9'], violet: ['#7c3aed', '#c4b5fd'],
        pink: ['#db2777', '#f9a8d4'], orange: ['#ea580c', '#fdba74'], amber: ['#d97706', '#fcd34d'],
        emerald: ['#059669', '#6ee7b7']
    };

    function rootPath() {
        return new URL('../'.repeat(location.pathname.split('/').filter(Boolean).length), location.origin).pathname;
    }

    function campaignUrl(campaign) {
        return /^https?:/i.test(campaign.href) ? campaign.href : rootPath() + campaign.href;
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
    }

    function promoArtwork(campaign) {
        const kind = campaign.type === 'service' ? 'SERVICE' : campaign.type === 'product' ? 'PRODUCT' : 'VITABLETECH';
        return `<div class="vt-promo__art" aria-hidden="true">
            <svg class="vt-promo__art-scene" viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" focusable="false">
                <circle cx="535" cy="78" r="145" fill="var(--vt-promo-b)" opacity=".18"/>
                <circle cx="105" cy="355" r="155" fill="var(--vt-promo-a)" opacity=".22"/>
                <rect x="352" y="52" width="225" height="166" rx="18" fill="#081226" stroke="white" stroke-opacity=".28" stroke-width="3" transform="rotate(8 352 52)"/>
                <rect x="374" y="78" width="182" height="103" rx="10" fill="url(#vt-art-gradient)" transform="rotate(8 374 78)"/>
                <path d="M409 145h33v-34h26v34h30" fill="none" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
                <rect x="390" y="194" width="105" height="12" rx="6" fill="white" opacity=".55" transform="rotate(8 390 194)"/>
                <rect x="470" y="218" width="67" height="12" rx="6" fill="var(--vt-promo-b)" opacity=".95" transform="rotate(8 470 218)"/>
                <defs><linearGradient id="vt-art-gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--vt-promo-a)"/><stop offset="1" stop-color="var(--vt-promo-b)"/></linearGradient></defs>
            </svg>
            <span class="vt-promo__art-copy"><small>VITABLETECH · ${kind}</small><strong>${escapeHtml(campaign.name)}</strong><span>Designed for real work</span></span>
        </div>`;
    }

    function promoMarkup(campaign, slotName) {
        const colors = themeColors[campaign.theme] || themeColors.blue;
        const artwork = promoArtwork(campaign);
        const image = campaign.image ? `<img class="vt-promo__image" src="${rootPath()}${campaign.image}" alt="${escapeHtml(campaign.name)} campaign" loading="lazy" decoding="async"><div class="vt-promo__fallback" hidden>${artwork}</div>` : artwork;
        const external = /^https?:/i.test(campaign.href);
        return `<aside class="vt-promo vt-promo--${campaign.type}" style="--vt-promo-a:${colors[0]};--vt-promo-b:${colors[1]}" aria-label="Featured ${campaign.type} from VitableTech" data-vt-promo="${campaign.type}" data-vt-campaign="${campaign.name}" data-vt-slot="${slotName}">
            <div class="vt-promo__visual">${image}<span class="vt-promo__label">VitableTech spotlight</span></div>
            <div class="vt-promo__body"><p class="vt-promo__eyebrow">${campaign.eyebrow}</p><h2>${campaign.name}</h2><p class="vt-promo__description">${campaign.description}</p><a href="${campaignUrl(campaign)}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''} data-vt-promo-click="${campaign.name}">${campaign.cta}<span aria-hidden="true"> ↗</span></a></div>
        </aside>`;
    }

    function addStyles() {
        if (document.getElementById('vt-promo-styles')) return;
        const style = document.createElement('style');
        style.id = 'vt-promo-styles';
        style.textContent = `
            .vt-promo{display:grid;grid-template-columns:minmax(120px,25%) 1fr;max-width:1050px;margin:2rem auto;padding:1rem;gap:1.25rem;overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:1.35rem;background:linear-gradient(120deg,rgba(15,23,42,.98),rgba(15,23,42,.82));box-shadow:0 18px 45px rgba(2,6,23,.22);color:#e2e8f0;font-family:inherit}
            .vt-promo__visual{position:relative;min-height:150px;border-radius:1rem;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--vt-promo-b),transparent 65%),transparent 55%),linear-gradient(135deg,var(--vt-promo-a),#0f172a 75%)}
            .vt-promo__image{width:100%;height:100%;min-height:150px;max-height:210px;object-fit:cover;position:absolute;inset:0}
            .vt-promo__art{position:absolute;inset:0;overflow:hidden;display:flex;align-items:flex-end;padding:1.25rem;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--vt-promo-b),transparent 58%),transparent 55%),linear-gradient(135deg,var(--vt-promo-a),#0f172a 78%);isolation:isolate}
            .vt-promo__art-scene{position:absolute;inset:0;width:100%;height:100%;z-index:-1}
            .vt-promo__art-copy{display:grid;gap:.3rem;max-width:78%;padding:.8rem .95rem;border:1px solid rgba(255,255,255,.18);border-radius:.9rem;background:rgba(2,6,23,.74);box-shadow:0 12px 30px rgba(0,0,0,.2);backdrop-filter:blur(10px);color:#fff}
            .vt-promo__art-copy small{color:var(--vt-promo-b);font-size:.58rem;font-weight:850;letter-spacing:.12em}
            .vt-promo__art-copy strong{font-size:clamp(.85rem,1.35vw,1.15rem);line-height:1.2}
            .vt-promo__art-copy>span{color:#cbd5e1;font-size:.7rem}
            .vt-promo__fallback{position:absolute;inset:0}
            .vt-promo__label{position:absolute;top:.7rem;left:.7rem;border-radius:999px;padding:.3rem .6rem;background:rgba(2,6,23,.78);border:1px solid rgba(255,255,255,.15);font-size:.62rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff}
            .vt-promo__body{align-self:center;padding:.5rem .8rem .5rem 0}.vt-promo__eyebrow{margin:0 0 .45rem;color:var(--vt-promo-b);font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.13em}
            .vt-promo__body h2{margin:0;color:#fff;font-size:clamp(1.2rem,2vw,1.65rem);font-weight:850;line-height:1.2}.vt-promo__description{margin:.55rem 0 1rem;color:#cbd5e1;font-size:.92rem;line-height:1.55}
            .vt-promo__body a{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:.7rem 1.1rem;background:linear-gradient(100deg,var(--vt-promo-a),color-mix(in srgb,var(--vt-promo-b),var(--vt-promo-a) 25%));color:#fff;font-size:.82rem;font-weight:800;text-decoration:none;box-shadow:0 8px 24px color-mix(in srgb,var(--vt-promo-a),transparent 65%);transition:transform .2s ease,filter .2s ease}
            .vt-promo__body a:hover{transform:translateY(-2px);filter:brightness(1.1)}.vt-promo__body a:focus-visible{outline:3px solid #fff;outline-offset:3px}
            main aside .vt-promo{display:block;margin:0 0 1.5rem;padding:.9rem;border-radius:1.2rem}.vt-promo--sidebar .vt-promo__visual{min-height:130px}.vt-promo--sidebar .vt-promo__image{min-height:130px}.vt-promo--sidebar .vt-promo__body{padding:.9rem .2rem .2rem}.vt-promo--sidebar .vt-promo__body h2{font-size:1.25rem}.vt-promo--sidebar .vt-promo__description{font-size:.85rem}.vt-promo--sidebar .vt-promo__body a{width:100%;box-sizing:border-box}
            @media(max-width:640px){.vt-promo{grid-template-columns:1fr;margin:1.25rem .85rem;padding:.75rem;gap:.2rem}.vt-promo__visual{min-height:135px}.vt-promo__image{min-height:135px;max-height:170px}.vt-promo__body{padding:.85rem .35rem .4rem}.vt-promo__description{font-size:.86rem}.vt-promo--sidebar{margin:.5rem 0 1rem}}
            @media(prefers-reduced-motion:reduce){.vt-promo__body a{transition:none}}
        `;
        document.head.appendChild(style);
    }

    function shuffle(items) {
        const result = items.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function weightedPick(items) {
        const total = items.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 1), 0);
        let cursor = Math.random() * total;
        for (const item of items) {
            cursor -= Math.max(0, Number(item.weight) || 1);
            if (cursor <= 0) return item;
        }
        return items[items.length - 1];
    }

    function eligible(campaign, slot) {
        // Do not promote a product/service on its own detail page.
        try {
            const target = new URL(campaignUrl(campaign));
            const current = location.hostname + location.pathname;
            const destination = target.hostname + target.pathname;
            return current !== destination;
        } catch (_) { return true; }
    }

    function render() {
        if (!settings.enabled) return;
        addStyles();
        const available = shuffle(campaigns);
        const used = new Set();
        let count = 0;

        settings.placements.forEach((placement) => {
            if (count >= settings.maxPerPage) return;
            const sections = Array.from(document.querySelectorAll('body section'));
            let anchor;
            if (placement.name === 'article-sidebar') anchor = document.querySelector('main aside');
            if (placement.name === 'after-hero') {
                anchor = document.querySelector('main > section:first-of-type') || sections.find((section) => section.querySelector('h1')) || sections[0];
            }
            if (placement.name === 'mid-content') {
                anchor = document.querySelector('main > section:nth-of-type(4)') || sections[3] || sections[Math.floor(sections.length / 2)];
            }
            let insert = placement.insert;
            if (!anchor && placement.name === 'after-hero') {
                anchor = document.querySelector('main') || document.querySelector('body > header') || document.body;
                insert = anchor.matches('main, body') ? 'beforeend' : 'afterend';
            }
            if (!anchor && placement.name === 'mid-content') {
                anchor = document.querySelector('footer') || document.querySelector('main') || document.body;
                insert = anchor.matches('footer') ? 'beforebegin' : 'beforeend';
            }
            if (!anchor || anchor.closest('[data-vt-promo]')) return;
            const pool = available.filter((item) => !used.has(item.name) && eligible(item, placement.name));
            if (!pool.length) return;
            const campaign = weightedPick(pool);
            used.add(campaign.name);
            const wrapper = document.createElement('div');
            wrapper.className = placement.name === 'article-sidebar' ? 'vt-promo--sidebar' : 'vt-promo-placement';
            wrapper.innerHTML = promoMarkup(campaign, placement.name);
            wrapper.querySelectorAll('.vt-promo__image').forEach((image) => image.addEventListener('error', () => {
                const fallback = image.nextElementSibling;
                image.remove();
                if (fallback) fallback.hidden = false;
            }, { once: true }));
            if (placement.insert === 'prepend') {
                wrapper.firstElementChild.classList.add('vt-promo--sidebar');
                anchor.prepend(wrapper.firstElementChild);
            }
            else anchor.insertAdjacentElement(['beforebegin', 'beforeend', 'afterbegin', 'afterend'].includes(insert) ? insert : 'afterend', wrapper);
            count++;
        });

        document.addEventListener('click', (event) => {
            const link = event.target.closest('[data-vt-promo-click]');
            if (!link) return;
            const promo = link.closest('[data-vt-promo]');
            const detail = { campaign: link.dataset.vtPromoClick, slot: promo?.dataset.vtSlot || 'unknown', page: location.pathname };
            if (typeof window.gtag === 'function') window.gtag('event', 'promo_click', detail);
            window.dispatchEvent(new CustomEvent('vitable:promo-click', { detail }));
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
    else render();
})();
