/* ============================================================
   Hazem Darwesh — Portfolio JavaScript
   Features:
     1. Navbar scroll effect + active link highlighting
     2. Mobile hamburger menu
     3. Scroll-reveal animations (IntersectionObserver)
     4. Contact form validation + feedback
     5. Footer year auto-update
============================================================ */

/* ── 1. NAVBAR: scroll effect + active section tracking ──── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add .scrolled class after user scrolls down 40px
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveLink();
  }, { passive: true });

  // Highlight the nav link matching the visible section
  function highlightActiveLink() {
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - var_navH() - 30;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  }

  // Helper: get current navbar height from CSS variable
  function var_navH() {
    return parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 64;
  }
})();


/* ── 2. MOBILE MENU: hamburger toggle ─────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Toggle menu open/close
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close menu when a nav link is clicked (smooth scroll then close)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── 3. SCROLL REVEAL: animate elements on scroll ─────────── */
(function initScrollReveal() {
  // All elements with class .reveal will animate in
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop observing (animation runs once)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,   // trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ── 4. CONTACT FORM: validation + user feedback ──────────── */
(function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // --- Basic validation ---
    if (!name || !email || !message) {
      showFeedback('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

      form.action = "https://formspree.io/f/mwvwwydk";
      form.method = "POST";
      form.submit(); 


    showFeedback('Message sent! I\'ll get back to you soon.', 'success');
    form.reset();
  });

  // Helper: validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Helper: show feedback message then clear after 5s
  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className   = `form-feedback ${type}`;
    setTimeout(() => {
      feedback.textContent = '';
      feedback.className   = 'form-feedback';
    }, 5000);
  }
})();


/* ── 5. FOOTER YEAR: keep copyright year current ──────────── */
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
