// Utility: select
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// Header behavior
const header = $('.site-header');
let lastScrollY = window.scrollY;
function onScroll() {
  const y = window.scrollY;
  header.style.borderBottomColor = y > 6 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)';
  lastScrollY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const menuToggle = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Reveal on scroll
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Tilt effect for cards
$$('.tilt').forEach(card => {
  const strength = 10;
  function handleMove(e) {
    const rect = card.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;
    const x = (e.clientX - midX) / (rect.width / 2);
    const y = (e.clientY - midY) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
  }
  function reset() { card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)'; }
  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) handleMove(e.touches[0]);
  }, { passive: true });
  card.addEventListener('touchend', reset);
});

// Testimonials carousel
(function initCarousel() {
  const carousel = $('[data-carousel]');
  if (!carousel) return;
  const track = $('[data-track]', carousel);
  const prev = $('[data-prev]', carousel);
  const next = $('[data-next]', carousel);
  let index = 0;

  function update() {
    const width = track.clientWidth;
    track.scrollTo({ left: index * width, behavior: 'smooth' });
  }
  prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
  next.addEventListener('click', () => { index = Math.min(track.children.length - 1, index + 1); update(); });

  // Auto advance
  setInterval(() => {
    index = (index + 1) % track.children.length;
    update();
  }, 5000);

  // Resize sync
  window.addEventListener('resize', update);
})();

// Footer year
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());