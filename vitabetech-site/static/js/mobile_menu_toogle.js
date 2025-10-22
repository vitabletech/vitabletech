const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // In a real implementation, you would send the form data to a server
  // For this demo, we'll just show the success message
  formSuccess.classList.remove("hidden");
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.classList.add("hidden");
  }, 5000);
});
