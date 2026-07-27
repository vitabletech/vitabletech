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
});

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
