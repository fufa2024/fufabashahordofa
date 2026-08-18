/* =========================================================================
   FUFA BASHA HORDOFA — PORTFOLIO SCRIPTS
   Vanilla ES6. No dependencies beyond Bootstrap (bundled) and AOS (CDN).
   ========================================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     0. THEME (persisted, applied ASAP to avoid flash — see inline head script)
     --------------------------------------------------------------------- */
  const THEME_KEY = 'fufa-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle i').forEach((icon) => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  function initThemeToggle() {
    const current = localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(current);

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(now);
        localStorage.setItem(THEME_KEY, now);
      });
    });
  }

  /* ---------------------------------------------------------------------
     1. PRELOADER
     --------------------------------------------------------------------- */
  function initPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    window.addEventListener('load', () => {
      setTimeout(() => pre.classList.add('loaded'), 300);
    });
  }

  /* ---------------------------------------------------------------------
     2. SCROLL PROGRESS BAR + BACK TO TOP + STICKY NAV SHADOW
     --------------------------------------------------------------------- */
  function initScrollFx() {
    const bar = document.getElementById('scroll-progress');
    const backBtn = document.getElementById('back-to-top');
    const nav = document.querySelector('.navbar-fufa');

    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (backBtn) backBtn.classList.toggle('show', scrolled > 480);
      if (nav) nav.style.boxShadow = scrolled > 20 ? 'var(--shadow-sm)' : 'none';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backBtn) {
      backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  }

  /* ---------------------------------------------------------------------
     3. ACTIVE NAV LINK BASED ON CURRENT PAGE
     --------------------------------------------------------------------- */
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-fufa .nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    // Close mobile menu on link click
    const collapseEl = document.getElementById('mainNav');
    if (collapseEl && window.bootstrap) {
      document.querySelectorAll('#mainNav .nav-link').forEach((l) => {
        l.addEventListener('click', () => {
          const inst = window.bootstrap.Collapse.getInstance(collapseEl);
          if (inst && collapseEl.classList.contains('show')) inst.hide();
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     4. TYPING EFFECT (hero subtitle)
     --------------------------------------------------------------------- */
  function initTypingEffect() {
    const el = document.getElementById('typing-role');
    if (!el) return;
    const roles = JSON.parse(el.dataset.roles || '[]');
    if (!roles.length) return;
    let roleIdx = 0, charIdx = 0, deleting = false;

    const tick = () => {
      const word = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
      } else {
        charIdx--;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    };
    tick();
  }

  /* ---------------------------------------------------------------------
     5. ANIMATED STAT COUNTERS
     --------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val + (suffix ? '' : '');
        el.innerHTML = val + (suffix ? `<span class="plus">${suffix}</span>` : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------------------------------------------------------------------
     6. SKILL BARS
     --------------------------------------------------------------------- */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill[data-level]');
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.level + '%';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => io.observe(b));
  }

  /* ---------------------------------------------------------------------
     7. PARTICLE BACKGROUND (lightweight canvas — data-point field)
     --------------------------------------------------------------------- */
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, points, animId;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function makePoints() {
      const count = Math.min(60, Math.floor((w * h) / 24000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function getColor() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      return dark ? 'rgba(148,163,184,' : 'rgba(37,99,235,';
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const color = getColor();
      points.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + '0.5)';
        ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = color + (0.12 * (1 - d / 120)) + ')';
            ctx.stroke();
          }
        }
      });
      if (!prefersReduced) animId = requestAnimationFrame(draw);
    }

    resize();
    makePoints();
    draw();
    window.addEventListener('resize', () => { resize(); makePoints(); });
  }

  /* ---------------------------------------------------------------------
     8. PUBLICATIONS TABLE — search + sort
     --------------------------------------------------------------------- */
  function initPublications() {
    const input = document.getElementById('pub-search-input');
    const tbody = document.getElementById('pub-tbody');
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    if (input) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        rows.forEach((r) => {
          r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    document.querySelectorAll('.table-fufa th[data-sort]').forEach((th) => {
      let asc = true;
      th.addEventListener('click', () => {
        const idx = Array.from(th.parentNode.children).indexOf(th);
        const sorted = rows.slice().sort((a, b) => {
          const av = a.children[idx].textContent.trim();
          const bv = b.children[idx].textContent.trim();
          return asc ? av.localeCompare(bv, undefined, { numeric: true }) : bv.localeCompare(av, undefined, { numeric: true });
        });
        asc = !asc;
        sorted.forEach((r) => tbody.appendChild(r));
      });
    });
  }

  /* ---------------------------------------------------------------------
     9. PORTFOLIO FILTER + MODAL PREVIEW
     --------------------------------------------------------------------- */
  function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });

    const modalEl = document.getElementById('portfolioModal');
    if (modalEl && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalEl);
      document.querySelectorAll('[data-modal-title]').forEach((card) => {
        card.addEventListener('click', () => {
          modalEl.querySelector('.modal-title').textContent = card.dataset.modalTitle;
          modalEl.querySelector('.modal-body-desc').textContent = card.dataset.modalDesc;
          modalEl.querySelector('.modal-body-tools').textContent = card.dataset.modalTools;
          modal.show();
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     10. BLOG CATEGORY FILTER
     --------------------------------------------------------------------- */
  function initBlogFilter() {
    const buttons = document.querySelectorAll('.blog-filter-btn');
    const cards = document.querySelectorAll('.blog-card-item');
    if (!buttons.length) return;
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        cards.forEach((c) => {
          c.style.display = cat === 'all' || c.dataset.category === cat ? '' : 'none';
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     11. CONTACT FORM (static — no backend; validates + shows confirmation)
     --------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      const feedback = document.getElementById('form-feedback');
      form.reset();
      form.classList.remove('was-validated');
      if (feedback) {
        feedback.classList.remove('d-none');
        setTimeout(() => feedback.classList.add('d-none'), 6000);
      }
    });
  }

  /* ---------------------------------------------------------------------
     12. NEWSLETTER FORM (footer, static)
     --------------------------------------------------------------------- */
  function initNewsletterForm() {
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input && input.value) {
          input.value = '';
          input.placeholder = 'Subscribed — thank you!';
          setTimeout(() => { input.placeholder = 'Enter your email'; }, 3000);
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     13. YEAR STAMP
     --------------------------------------------------------------------- */
  function stampYear() {
    document.querySelectorAll('.current-year').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------------------
     INIT
     --------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initPreloader();
    initScrollFx();
    initActiveNav();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initParticles();
    initPublications();
    initPortfolioFilter();
    initBlogFilter();
    initContactForm();
    initNewsletterForm();
    stampYear();

    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
    }
  });
})();
