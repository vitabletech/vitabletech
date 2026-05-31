(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'94426978d7077eda',t:'MTc0Nzk4MDg1NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

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

// Section Lazy Loader
document.addEventListener('DOMContentLoaded', () => {
    // Select all sections except the first one (hero section)
    const sections = document.querySelectorAll('section:not(:first-of-type)');
    
    // Add loader to each section
    sections.forEach(section => {
        // Ensure section is positioned relative for absolute loader
        if (getComputedStyle(section).position === 'static') {
            section.classList.add('relative');
        }
        
        const loader = document.createElement('div');
        loader.className = 'section-lazy-loader absolute inset-0 z-40 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm transition-opacity duration-700';
        loader.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-primary mb-2"></div>
                <span class="text-sm text-gray-500 font-medium tracking-wider">Loading Section...</span>
            </div>
        `;
        
        section.appendChild(loader);
    });

    // Intersection Observer to trigger lazy load
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const loader = section.querySelector('.section-lazy-loader');
                
                if (loader) {
                    // Fade out loader
                    loader.style.opacity = '0';
                    // Remove after transition
                    setTimeout(() => {
                        if (loader.parentNode === section) {
                            section.removeChild(loader);
                        }
                    }, 700); 
                }
                
                // Stop observing this section
                observer.unobserve(section);
            }
        });
    }, {
        rootMargin: '100px 0px', // Start loading slightly before it enters the viewport
        threshold: 0.1
    });

    // Start observing sections
    sections.forEach(section => {
        observer.observe(section);
    });
});
