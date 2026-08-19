// Double-Barrel Films — interactivity
document.addEventListener('DOMContentLoaded', () => {

  /* footer year --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* mobile nav toggle ----------------------------------------------------*/
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* scroll reveal ----------------------------------------------------------
     Tag key blocks with .reveal, then fade/rise them in as they enter view.
  */
  const revealTargets = document.querySelectorAll(
    '.section-head, .film-card, .about-photo, .about-content, .package-card, .contact-inner'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* film lightbox ----------------------------------------------------------
     Clicking a film card opens a simple modal "player" frame with the
     film's title/description — wire this up to real video embeds later.
  */
  const lightbox = document.getElementById('filmLightbox');
  const lightboxCaption = document.getElementById('filmLightboxCaption');
  const lightboxClose = document.getElementById('filmLightboxClose');
  const filmCards = document.querySelectorAll('.film-card');

  const openLightbox = (caption) => {
    if (!lightbox) return;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  filmCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(card.dataset.film);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* contact form (front-end only — wire to a real endpoint later) --------*/
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();

      if (!name || !email) {
        status.textContent = 'Please fill in your name and email so we can reply.';
        return;
      }

      // Placeholder confirmation — replace with a real fetch() to your
      // form backend (Formspree, Netlify Forms, your own API, etc.)
      status.textContent = `Thank you, ${name.split(' ')[0]} — we'll be in touch within 48 hours.`;
      form.reset();
    });
  }

  /* header shrink/hide on scroll direction --------------------------------*/
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (!header) return;

    if (currentY > lastScrollY && currentY > 160) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    header.style.transition = 'transform 0.35s ease';
    lastScrollY = currentY;
  }, { passive: true });

});
