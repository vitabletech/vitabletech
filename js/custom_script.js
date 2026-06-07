
// Go To Top functionality
document.addEventListener('DOMContentLoaded', () => {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (goToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                goToTopBtn.classList.remove('opacity-0', 'invisible');
                goToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                goToTopBtn.classList.add('opacity-0', 'invisible');
                goToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        goToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Clear App Cache functionality
window.clearAppCache = function() {
    if (confirm('Are you sure you want to clear the app cache? This will reload the page.')) {
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) caches.delete(name);
            });
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                    registration.unregister();
                }
            });
        }
        localStorage.clear();
        sessionStorage.clear();
        alert('Cache cleared successfully!');
        window.location.reload(true);
    }
};

// --- PWA Update System ---
(function initPwaUpdateSystem() {
    if (!('serviceWorker' in navigator)) return;

    let newWorker;
    let updatePopupInjected = false;

    // 1. Inject Update Notification UI
    function injectUpdateUI() {
        if (updatePopupInjected) return;
        updatePopupInjected = true;

        const popupHTML = `
            <div id="pwa-update-popup" style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 16px; max-width: 300px; border-left: 4px solid #3b82f6;">
                <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">Update Available</h4>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">A new version of this app is available. Update now to get the latest features.</p>
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button id="pwa-update-ignore" style="padding: 6px 12px; border: none; background: #e5e7eb; color: #374151; border-radius: 4px; cursor: pointer; font-size: 14px;">Ignore</button>
                    <button id="pwa-update-btn" style="padding: 6px 12px; border: none; background: #3b82f6; color: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;">Update Now</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        document.getElementById('pwa-update-btn').addEventListener('click', () => {
            if (newWorker) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
            } else {
                // Fallback reload if SW update triggered via version.json
                window.location.reload(true);
            }
        });

        document.getElementById('pwa-update-ignore').addEventListener('click', () => {
            document.getElementById('pwa-update-popup').style.display = 'none';
        });
    }

    function showUpdateUI() {
        injectUpdateUI();
        document.getElementById('pwa-update-popup').style.display = 'block';
    }

    // 2. Register Service Worker and listen for updates
    navigator.serviceWorker.register('/sw.js').then(registration => {
        // Handle updates triggered by browser
        registration.addEventListener('updatefound', () => {
            newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // New update available
                        showUpdateUI();
                    }
                }
            });
        });

        // 3. Periodic Version Check (every 1 hour)
        setInterval(() => {
            registration.update();
            checkForVersionJsonUpdate();
        }, 1000 * 60 * 60);

        // Run check on load as well
        setTimeout(checkForVersionJsonUpdate, 5000);
    });

    // Handle the reload when the new worker activates
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
    });

    // 4. Fallback checking via version.json
    async function checkForVersionJsonUpdate() {
        try {
            // Append timestamp to bypass browser cache
            const response = await fetch('/version.json?t=' + new Date().getTime());
            if (!response.ok) return;
            const data = await response.json();
            
            const currentVersion = localStorage.getItem('app_version');
            if (currentVersion && currentVersion !== data.version) {
                // Version changed!
                showUpdateUI();
            }
            // Store new version
            localStorage.setItem('app_version', data.version);
        } catch (e) {
            console.error('Failed to check version.json', e);
        }
    }
})();
