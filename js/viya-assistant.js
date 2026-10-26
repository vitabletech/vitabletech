(function () {
    const root = document.getElementById('viya-assistant');
    if (!root) return;

    const avatarWrap = root.querySelector('.viya-avatar-wrap');
    const avatar = root.querySelector('.viya-avatar');
    const closeButton = root.querySelector('.viya-close');
    const intro = root.querySelector('.viya-intro');
    const questions = root.querySelector('.viya-questions-wrap');
    const answer = root.querySelector('.viya-answer');
    const answerText = root.querySelector('.viya-answer-text');
    const answerAction = root.querySelector('.viya-action');
    const backButton = root.querySelector('.viya-back');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let reactionTimer;
    let pointerFrame;
    let isReacting = false;
    let contextTimer;
    let activeContext;

    window.setTimeout(() => root.classList.add('has-seen-invite'), 6500);

    const answers = {
        services: {
            text: 'We design and build custom ERP, CRM, SaaS platforms, web and mobile apps, AI-enabled workflows, integrations, and automation for real business operations.',
            label: 'Explore services', href: './services/index.html', reaction: 4
        },
        work: {
            text: 'See live platforms we have delivered for trading, real estate, diamonds, communications, logistics, communities, and more—using only publicly shareable project details.',
            label: 'View client work', href: './portfolio.html', reaction: 1
        },
        products: {
            text: 'Our products include SocialHub, a Google Business Profile SDK, CareerBuddy, and SnippetMaster. Each solves a focused workflow with a practical, scalable product experience.',
            label: 'See all products', href: './projects.html#products', reaction: 2
        },
        process: {
            text: 'We start with discovery, map the workflow, design the experience, build in clear milestones, test the real use cases, launch, and continue improving with you.',
            label: 'See how we work', href: './index.html#workflow', reaction: 0
        },
        budget: {
            text: 'Cost depends on scope, integrations, roles, security, and delivery timeline. Share your goal and we will recommend a practical first version before proposing a budget.',
            label: 'Discuss your project', href: './contact.html', reaction: 5
        },
        human: {
            text: 'Absolutely. Tell our team what you want to build and the business problem behind it. A real person will review your message and reply.',
            label: 'Talk to our team', href: './contact.html', reaction: 8
        }
    };

    function setFrame(frame) {
        const column = frame % 3;
        const row = Math.floor(frame / 3);
        avatar.style.backgroundPosition = `${column * 50}% ${row * 50}%`;
    }

    function setOpen(open) {
        root.classList.toggle('is-open', open);
        avatarWrap.setAttribute('aria-expanded', String(open));
        if (open) closeButton.focus({ preventScroll: true });
    }

    function react(frame) {
        clearTimeout(reactionTimer);
        isReacting = true;
        avatar.style.backgroundImage = 'url("./images/mascots/viya-real-reactions.webp?v=1")';
        setFrame(frame);
        avatar.classList.remove('is-reacting');
        void avatar.offsetWidth;
        avatar.classList.add('is-reacting');
        reactionTimer = window.setTimeout(() => {
            avatar.style.backgroundImage = 'url("./images/mascots/viya-real-directions.webp?v=1")';
            setFrame(4);
            avatar.classList.remove('is-reacting');
            isReacting = false;
        }, reducedMotion ? 650 : 1250);
    }

    function showQuestions() {
        answer.classList.remove('is-visible');
        questions.hidden = false;
        intro.hidden = false;
    }

    function contextualMessage(element) {
        const text = element.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
        const href = element.getAttribute('href') || '';
        const section = element.closest('section');
        const sectionId = section ? section.id : '';

        if (element.matches('#contact-form button[type="submit"]')) {
            return 'Ready to get started? This prepares your project message for our team on WhatsApp.';
        }
        if (text.includes('book a free consultation') || href.includes('contact.html')) {
            return 'Have a project in mind? This takes you to a real person on our team.';
        }
        if (href.includes('wa.me')) return 'Prefer a quick chat? This opens a conversation with our team on WhatsApp.';
        if (sectionId === 'top-clients' || href.includes('portfolio.html')) return 'Explore real client platforms and publicly shareable project work.';
        if (sectionId === 'top-products' || href.includes('projects.html')) return 'See products designed, built, and operated by VitableTech.';
        if (sectionId === 'what-we-build' || sectionId === 'services') return 'This capability can be shaped around your workflow—not forced into a template.';
        if (sectionId === 'products' || sectionId === 'open-source') return 'Take a closer look at what our engineers build and share in public.';
        if (sectionId === 'blog' || href.includes('insights.html')) return 'Open a practical guide written from real engineering experience.';
        if (href.includes('pricing.html')) return 'Compare the available engagement and pricing options.';
        return 'This is worth exploring—I can help you find the next useful step.';
    }

    function moveToContext(element) {
        if (!finePointer || root.classList.contains('is-open')) return;
        clearTimeout(contextTimer);
        clearTimeout(reactionTimer);
        activeContext = element;

        const current = root.getBoundingClientRect();
        const target = element.getBoundingClientRect();
        const avatarBounds = avatarWrap.getBoundingClientRect();
        const avatarWidth = avatarBounds.width;
        const avatarHeight = avatarBounds.height;
        const roomOnLeft = target.left > avatarWidth + 24;
        const left = roomOnLeft
            ? target.left - avatarWidth - 14
            : Math.min(window.innerWidth - avatarWidth - 10, target.right + 14);
        const top = Math.max(76, Math.min(window.innerHeight - avatarHeight - 12, target.bottom - avatarHeight));

        root.style.left = `${current.left}px`;
        root.style.top = `${current.top}px`;
        root.classList.add('is-contextual');
        root.classList.toggle('context-right', !roomOnLeft);
        root.querySelector('.viya-invite').textContent = contextualMessage(element);
        avatar.style.backgroundImage = 'url("./images/mascots/viya-real-reactions.webp?v=1")';
        setFrame(roomOnLeft ? 2 : 0);
        isReacting = true;

        window.requestAnimationFrame(() => {
            root.style.left = `${left}px`;
            root.style.top = `${top}px`;
        });
    }

    function returnHome(immediate) {
        if (!activeContext && !root.classList.contains('is-contextual')) return;
        clearTimeout(contextTimer);
        activeContext = null;
        const delay = immediate ? 0 : 320;
        contextTimer = window.setTimeout(() => {
            const bounds = root.getBoundingClientRect();
            const homeLeft = window.innerWidth - bounds.width - 22;
            const homeTop = window.innerHeight - bounds.height - 20;
            root.style.left = `${Math.max(5, homeLeft)}px`;
            root.style.top = `${Math.max(5, homeTop)}px`;
            avatar.style.backgroundImage = 'url("./images/mascots/viya-real-directions.webp?v=1")';
            setFrame(4);
            isReacting = false;
            window.setTimeout(() => {
                if (activeContext) return;
                root.classList.remove('is-contextual', 'context-right');
                root.style.removeProperty('left');
                root.style.removeProperty('top');
            }, reducedMotion ? 0 : 430);
        }, delay);
    }

    avatarWrap.addEventListener('click', () => {
        if (!root.classList.contains('is-open')) {
            setOpen(true);
            react(1);
        } else {
            react(Math.floor(Math.random() * 9));
        }
    });
    avatarWrap.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            avatarWrap.click();
        }
    });
    closeButton.addEventListener('click', () => setOpen(false));
    backButton.addEventListener('click', showQuestions);

    root.querySelectorAll('.viya-question').forEach((button) => {
        button.addEventListener('click', () => {
            const item = answers[button.dataset.answer];
            if (!item) return;
            intro.hidden = true;
            questions.hidden = true;
            answerText.textContent = item.text;
            answerAction.textContent = item.label + ' →';
            answerAction.href = item.href;
            answer.classList.add('is-visible');
            react(item.reaction);
        });
    });

    if (finePointer && !reducedMotion) {
        window.addEventListener('pointermove', (event) => {
            if (isReacting || pointerFrame) return;
            pointerFrame = window.requestAnimationFrame(() => {
                const bounds = avatarWrap.getBoundingClientRect();
                const dx = event.clientX - (bounds.left + bounds.width / 2);
                const dy = event.clientY - (bounds.top + bounds.height * .3);
                const column = dx < -90 ? 0 : dx > 90 ? 2 : 1;
                const row = dy < -70 ? 0 : dy > 100 ? 2 : 1;
                setFrame(row * 3 + column);
                pointerFrame = null;
            });
        }, { passive: true });
    }

    const contextSelector = [
        '#home a', '#top-clients a', '#top-products a', '#what-we-build a',
        '#services a', '#products a', '#open-source a', '#blog a', '#cta a',
        'header a[href*="contact.html"]', 'header a[href*="pricing.html"]',
        '#contact-form button[type="submit"]', '#contact-form a', 'a[href^="mailto:"]', 'a[href*="wa.me"]'
    ].join(',');

    document.querySelectorAll(contextSelector).forEach((element) => {
        if (element.closest('#viya-assistant') || element.closest('#ios-bottom-nav')) return;
        element.addEventListener('mouseenter', () => moveToContext(element));
        element.addEventListener('focus', () => moveToContext(element));
        element.addEventListener('mouseleave', () => returnHome(false));
        element.addEventListener('blur', () => returnHome(false));
    });

    window.addEventListener('scroll', () => returnHome(true), { passive: true });
    window.addEventListener('resize', () => returnHome(true));
})();
