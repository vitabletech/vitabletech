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
