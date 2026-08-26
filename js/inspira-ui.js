/**
 * Inspira UI & Aceternity UI Vanilla JavaScript Interactive Engine
 * Provides 60fps micro-interactions, mouse spotlight tracking, magnetic physics, and animated counters.
 */

document.addEventListener("DOMContentLoaded", () => {
    initMouseSpotlight();
    initMagneticButtons();
    initAnimatedCounters();
    initStickyNavbar();
    initTestimonialCarousel();
    initTechCloudParallax();
    // Aceternity UI & Magic UI Award-Winning Interactions
    initContainerScroll();
    initMagicDock();
    initHoverLens();
    initLinkPreviews();
    initLiquidGlassFilter();
});

function initLiquidGlassFilter() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("style", "position: absolute; width: 0; height: 0; pointer-events: none;");
    svg.innerHTML = `
        <filter id="liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    `;
    document.body.appendChild(svg);
}
/**
 * 1. Mouse Spotlight Tracking
 * Tracks cursor position relative to cards for radial glow effects without layout shift.
 */
function initMouseSpotlight() {
    const cards = document.querySelectorAll(".spotlight-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/**
 * 2. Magnetic Buttons
 * Creates an elastic magnetic pull towards the cursor on hover.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll(".magnetic-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            // Apply gentle pull (30% of cursor distance)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.03)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0px, 0px) scale(1)";
            btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        });

        btn.addEventListener("mouseenter", () => {
            btn.style.transition = "transform 0.1s ease-out";
        });
    });
}

/**
 * 3. Animated Number Counters
 * Uses IntersectionObserver to trigger smooth number increment animations.
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll("[data-counter-target]");
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute("data-counter-target"));
                const suffix = el.getAttribute("data-counter-suffix") || "";
                const prefix = el.getAttribute("data-counter-prefix") || "";
                const duration = 2000; // 2 seconds
                const start = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out expo
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentVal = Math.floor(easeProgress * target);
                    
                    el.textContent = prefix + currentVal + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = prefix + target + suffix;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach((counter) => observer.observe(counter));
}

/**
 * 4. Sticky & Shrinking Navbar
 * Dynamically adjusts navbar blur, padding, and border opacity on scroll.
 */
function initStickyNavbar() {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("py-2.5", "bg-slate-950/85", "shadow-[0_10px_30px_rgba(0,0,0,0.5)]", "border-white/15");
            navbar.classList.remove("py-5", "bg-slate-950/40", "border-white/5");
        } else {
            navbar.classList.add("py-5", "bg-slate-950/40", "border-white/5");
            navbar.classList.remove("py-2.5", "bg-slate-950/85", "shadow-[0_10px_30px_rgba(0,0,0,0.5)]", "border-white/15");
        }
    }, { passive: true });
}

/**
 * 5. Testimonial Glass Carousel
 * Manages auto-rotation and manual slide navigation for testimonials.
 */
function initTestimonialCarousel() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.getElementById("testi-prev");
    const nextBtn = document.getElementById("testi-next");
    const dots = document.querySelectorAll(".testi-dot");
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove("opacity-0", "translate-x-8", "pointer-events-none", "z-0");
                slide.classList.add("opacity-100", "translate-x-0", "z-10");
            } else {
                slide.classList.remove("opacity-100", "translate-x-0", "z-10");
                slide.classList.add("opacity-0", "translate-x-8", "pointer-events-none", "z-0");
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("bg-primary", "w-8");
                dot.classList.remove("bg-white/20", "w-2.5");
            } else {
                dot.classList.add("bg-white/20", "w-2.5");
                dot.classList.remove("bg-primary", "w-8");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });
    
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentIndex = i;
            showSlide(currentIndex);
            resetTimer();
        });
    });

    function startTimer() {
        timer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    const container = document.getElementById("testimonial-container");
    if (container) {
        container.addEventListener("mouseenter", () => clearInterval(timer));
        container.addEventListener("mouseleave", startTimer);
    }

    showSlide(0);
    startTimer();
}

/**
 * 6. Tech Stack Cloud Parallax
 * Applies gentle depth parallax tilt when moving mouse across the tech cloud.
 */
function initTechCloudParallax() {
    const cloud = document.getElementById("tech-cloud-container");
    if (!cloud) return;

    const badges = cloud.querySelectorAll(".tech-badge");
    
    cloud.addEventListener("mousemove", (e) => {
        const rect = cloud.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        badges.forEach((badge, index) => {
            const speed = 5 + (index % 5) * 3;
            badge.style.transform = `translate(${deltaX * speed}px, ${deltaY * speed}px) scale(${1 + (index % 3) * 0.02})`;
        });
    });

    cloud.addEventListener("mouseleave", () => {
        badges.forEach((badge) => {
            badge.style.transform = "translate(0px, 0px) scale(1)";
        });
    });
}


/**
 * 8. Container Scroll Animation (Aceternity UI 3D Scroll Transformation)
 * Rotates and zooms hero cards/dashboards from a tilted 3D perspective to flat 2D as user scrolls.
 */
function initContainerScroll() {
    const targets = document.querySelectorAll(".container-scroll-target, .hero-showcase, [data-container-scroll], #hero-dashboard-preview, header + section .spotlight-card");
    if (!targets.length) return;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const maxScroll = 600;
        const p = Math.min(scrollY / maxScroll, 1);
        const easeP = 1 - Math.pow(1 - p, 3);

        targets.forEach(target => {
            const rotateX = 15 * (1 - easeP);
            const scale = 0.92 + (0.08 * easeP);
            const translateY = 30 * (1 - easeP);
            
            target.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
            target.style.transition = "transform 0.1s ease-out, box-shadow 0.3s ease";
            target.style.boxShadow = `0 ${20 + 30 * easeP}px ${50 + 50 * easeP}px rgba(6,182,212,${0.1 + 0.2 * easeP})`;
        });
    }, { passive: true });

    window.dispatchEvent(new Event("scroll"));
}

/**
 * 9. Magic Dock (macOS Magnification Physics)
 * Dynamically magnifies navigation bar and bottom bar icons based on cursor proximity.
 */
function initMagicDock() {
    const docks = document.querySelectorAll("#ios-bottom-nav > div, #main-navbar nav, .xl\\:flex.flex-col.gap-3");
    
    docks.forEach(dock => {
        const items = dock.querySelectorAll("a, button");
        if (!items.length) return;

        dock.addEventListener("mousemove", (e) => {
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
                const maxDist = 80;

                if (dist < maxDist) {
                    const scale = 1 + (1 - dist / maxDist) * 0.35;
                    item.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 8}px)`;
                    item.style.zIndex = "20";
                } else {
                    item.style.transform = "scale(1) translateY(0px)";
                    item.style.zIndex = "1";
                }
            });
        });

        dock.addEventListener("mouseleave", () => {
            items.forEach(item => {
                item.style.transform = "scale(1) translateY(0px)";
                item.style.zIndex = "1";
            });
        });
    });
}

/**
 * 10. Hover Lens (Aceternity UI Spotlight Lens Effect)
 * Projects an interactive magnifying spotlight lens onto cards when hovered.
 */
function initHoverLens() {
    const cards = document.querySelectorAll(".spotlight-card, .lens-card, [data-lens]");
    cards.forEach(card => {
        card.style.position = card.style.position || "relative";
        card.style.overflow = "hidden";

        let lens = card.querySelector(".magic-lens");
        if (!lens) {
            lens = document.createElement("div");
            lens.className = "magic-lens absolute w-48 h-48 rounded-full bg-radial-gradient from-cyan-400/25 via-blue-500/10 to-transparent border border-cyan-300/30 shadow-[0_0_35px_rgba(6,182,212,0.5)] pointer-events-none opacity-0 transition-opacity duration-300 z-10 blur-[1px]";
            card.appendChild(lens);
        }

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            lens.style.left = `${x - 96}px`;
            lens.style.top = `${y - 96}px`;
            lens.style.opacity = "1";
        });

        card.addEventListener("mouseleave", () => {
            lens.style.opacity = "0";
        });
    });
}

/**
 * 11. Link Preview (Aceternity UI Hover Tooltip Card Preview)
 * Pops up a glassmorphic preview card with title and summary when hovering internal links.
 */
function initLinkPreviews() {
    if (window.innerWidth <= 768 || ('ontouchstart' in window)) return;

    let previewEl = document.getElementById("magic-link-preview");
    if (!previewEl) {
        previewEl = document.createElement("div");
        previewEl.id = "magic-link-preview";
        previewEl.className = "fixed z-[99999] pointer-events-none opacity-0 scale-95 transition-all duration-200 bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.9)] w-72 text-left";
        document.body.appendChild(previewEl);
    }

    const previewData = {
        "about": { title: "About VitableTech", desc: "Global AI & software engineering company headquartered in Gwalior, India.", icon: "fa-info-circle", color: "text-blue-400" },
        "services": { title: "Enterprise Services", desc: "Custom software, AI/ML, DevOps, UI/UX, and cloud architecture engineering.", icon: "fa-layer-group", color: "text-cyan-400" },
        "products": { title: "Latest Products", desc: "Explore our proprietary SaaS platforms, developer SDKs, and automation tools.", icon: "fa-cube", color: "text-purple-400" },
        "projects": { title: "Featured Projects", desc: "Award-winning enterprise deployments and digital transformation case studies.", icon: "fa-briefcase", color: "text-emerald-400" },
        "clients": { title: "Global Clients", desc: "Trusted by Fortune 500 brands, high-growth startups, and enterprises worldwide.", icon: "fa-handshake", color: "text-amber-400" },
        "contact": { title: "Start Your Project", desc: "Book your free 30-minute consultation with our lead AI & system architects.", icon: "fa-envelope", color: "text-pink-400" },
        "pricing": { title: "Transparent Pricing", desc: "Flexible enterprise retainers, milestone-based delivery, and dedicated squads.", icon: "fa-wallet", color: "text-cyan-300" },
        "blog": { title: "Engineering Blog", desc: "Technical tutorials, system design breakdowns, and AI engineering benchmarks.", icon: "fa-newspaper", color: "text-indigo-400" },
        "insights": { title: "Market Insights", desc: "Research reports and strategic tech intelligence for enterprise leaders.", icon: "fa-chart-line", color: "text-teal-400" }
    };

    let hoverTimeout = null;

    document.addEventListener("mouseover", (e) => {
        const link = e.target.closest("a[href]");
        if (!link) return;
        const href = link.getAttribute("href") || "";
        
        let matchedKey = null;
        for (const key in previewData) {
            if (href.includes(key) && !href.startsWith("#") && !link.closest("#main-navbar nav, #ios-bottom-nav, aside")) {
                matchedKey = key;
                break;
            }
        }

        if (matchedKey) {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                const data = previewData[matchedKey];
                const rect = link.getBoundingClientRect();
                
                previewEl.innerHTML = `
                    <div class="flex items-center gap-2.5 mb-1.5">
                        <div class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                            <i class="fas ${data.icon} ${data.color} text-xs"></i>
                        </div>
                        <span class="font-bold text-white text-sm tracking-tight">${data.title}</span>
                    </div>
                    <p class="text-xs text-gray-300 leading-relaxed">${data.desc}</p>
                    <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-cyan-400 font-semibold">
                        <span>Click to explore</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                `;

                let left = rect.left + rect.width / 2 - 144;
                let top = rect.top - previewEl.offsetHeight - 12;

                if (left < 10) left = 10;
                if (left + 288 > window.innerWidth - 10) left = window.innerWidth - 298;
                if (top < 10) top = rect.bottom + 12;

                previewEl.style.left = `${left}px`;
                previewEl.style.top = `${top}px`;
                previewEl.classList.remove("opacity-0", "scale-95");
                previewEl.classList.add("opacity-100", "scale-100");
            }, 250);
        }
    });

    document.addEventListener("mouseout", (e) => {
        const link = e.target.closest("a[href]");
        if (link) {
            clearTimeout(hoverTimeout);
            previewEl.classList.add("opacity-0", "scale-95");
            previewEl.classList.remove("opacity-100", "scale-100");
        }
    });
}
