// ══════════════════════════════════════════
//  BHAVANI PORTFOLIO — ENHANCED SCRIPT
// ══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

  /* ─── PAGE LOADER ─── */
  setTimeout(() => {
    document.getElementById("page-loader").classList.add("hidden");
  }, 1600);

  /* ─── LOAD PROFILE DATA ─── */
  fetch('/api/profile')
    .then(r => r.json())
    .then(data => {
      // Name with typewriter
      const nameEl = document.getElementById('name');
      if (nameEl && data.name) typewriterEffect(nameEl, data.name);

      // Projects
      if (data.projects) renderProjects(data.projects);
    })
    .catch(() => {
      // Fallback: render from static data
      const nameEl = document.getElementById('name');
      if (nameEl) typewriterEffect(nameEl, "Bhavani Baskaran");
      renderProjects(STATIC_PROJECTS);
    });

  /* ─── STATIC FALLBACK DATA ─── */
  const STATIC_PROJECTS = [
    {
      title: "Personal Portfolio Website",
      duration: "2026",
      description: "A dynamic full-stack personal portfolio website built using HTML, CSS, JavaScript, and Node.js. Implements modular architecture, asynchronous callbacks, and JSON data handling to dynamically render profile details.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "JSON"],
      github: "https://github.com/Bhavani-1010/personal-profile.git",
      icon: "💻"
    },
    {
      title: "Student's Internal Marks Management System",
      duration: "2024 – 2025",
      description: "A secure, centralized web-based system designed to streamline student internal assessment management with an intuitive interface for teachers. Robust security ensures data integrity across sessions.",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      github: "https://github.com/Bhavani-1010/students-internal-marks-management-system.git",
      icon: "📊"
    },
    {
      title: "Password-Protected Image Steganography",
      duration: "Jan – Feb 2025",
      description: "A secure steganography system to hide and retrieve confidential messages within images using pixel manipulation techniques and password-based authentication for enhanced data security.",
      tech: ["Python", "OpenCV", "Pickle", "File Storage"],
      github: "https://github.com/Bhavani-1010/CYBER-PROJECT.git",
      icon: "🔐"
    }
  ];

  /* ─── TYPEWRITER EFFECT ─── */
  function typewriterEffect(el, text) {
    el.innerHTML = '';
    el.classList.add('typewriter');
    let i = 0;
    const speed = 60;
    function type() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, speed);
      } else {
        el.classList.remove('typewriter');
      }
    }
    type();
  }

  /* ─── RENDER PROJECTS ─── */
  function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';
    projects.forEach((p, idx) => {
      const techHTML = (p.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('');
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.style.animationDelay = `${idx * 0.1}s`;
      card.innerHTML = `
        <div class="project-top">
          <span class="project-icon">${p.icon || '🛠️'}</span>
          <a href="${p.github}" target="_blank" class="project-link" title="View on GitHub" onclick="event.stopPropagation()">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <div>
          <div class="project-duration-badge">${p.duration || ''}</div>
          <div class="project-title">${p.title}</div>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="tech-stack">${techHTML}</div>
      `;
      card.addEventListener('click', () => window.open(p.github, '_blank'));
      container.appendChild(card);
    });
    // Re-apply reveal
    observeReveal();
  }

  /* ─── RENDER CERTIFICATIONS ─── */
  const certifications = [
    { title: "Software Engineering Job Simulation", issuer: "Accenture Forage",     year: "2025", file: "certificates/accenture_cert1.pdf",  icon: "🏢" },
    { title: "Application Security Course",         issuer: "Great Learning",       year: "2024", file: "certificates/appsec_cert2.jpg",      icon: "🔒" },
    { title: "Cyber Security Internship",           issuer: "AICTE Edunet / IBM",   year: "2025", file: "certificates/cyber_cert3.pdf",       icon: "🛡️" },
    { title: "Introduction to Data Science",        issuer: "Infosys Springboard",  year: "2024", file: "certificates/infosys_cert4.pdf",     icon: "📈" },
    { title: "SDLC Fundamentals",                   issuer: "Great Learning",       year: "2024", file: "certificates/sdlc_cert5.png",        icon: "⚙️" },
    { title: "Software Testing",                    issuer: "Great Learning",       year: "2024", file: "certificates/swtesting_cert6.jpg",   icon: "🧪" }
  ];

  const certContainer = document.getElementById('certContainer');
  if (certContainer) {
    certifications.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card reveal';
      card.innerHTML = `
        <div class="cert-front-content">
          <div class="cert-icon">${cert.icon}</div>
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer}</div>
        </div>
        <div class="cert-footer">
          <span class="cert-year">${cert.year}</span>
          <a href="${cert.file}" target="_blank" class="cert-view-link">
            View <i class="fas fa-external-link-alt" style="font-size:10px"></i>
          </a>
        </div>
      `;
      certContainer.appendChild(card);
    });
  }

  /* ─── STAR RATING ─── */
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('ratingValue');

  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
    star.addEventListener('mouseleave', () => {
      const current = parseInt(ratingInput?.value || 0);
      stars.forEach((s, i) => s.classList.toggle('active', i < current));
    });
    star.addEventListener('click', () => {
      const val = idx + 1;
      if (ratingInput) ratingInput.value = val;
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
  });

  /* ─── FEEDBACK FORM ─── */
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = feedbackForm.querySelector('.feedback-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      btn.disabled = true;

      const formData = {
        name:    feedbackForm.name.value,
        email:   feedbackForm.email.value,
        message: feedbackForm.message.value,
        rating:  ratingInput?.value || ''
      };

      try {
        const resp = await fetch('/submit-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await resp.json();
        showToast(result.message || 'Feedback submitted! Thank you 🎉');
        feedbackForm.reset();
        stars.forEach(s => s.classList.remove('active'));
      } catch {
        showToast('Feedback received! Thank you 🎉');
        feedbackForm.reset();
        stars.forEach(s => s.classList.remove('active'));
      } finally {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Feedback';
        btn.disabled = false;
      }
    });
  }

  /* ─── SHOW TOAST ─── */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ─── AVERAGE RATING DISPLAY ─── */
  fetch('/api/feedbacks').then(r => r.json()).then(data => {
    if (!data || !data.length) return;
    const avg = data.reduce((a, f) => a + parseFloat(f.rating || 0), 0) / data.length;
    const el = document.getElementById('avgRating');
    if (el) {
      const stars = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
      el.innerHTML = `${stars} &nbsp; ${avg.toFixed(1)} / 5 &nbsp;(${data.length} reviews)`;
    }
  }).catch(() => {});

  /* ─── NAVBAR: scroll behavior ─── */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll progress
    if (scrollProgress) scrollProgress.style.width = `${(scrollY / docH) * 100}%`;

    // Navbar class
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 50);

    // Back to top
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 400);

    // Active nav link
    updateActiveNav();
  }, { passive: true });

  /* ─── ACTIVE NAV LINK ─── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ─── MOBILE NAV TOGGLE ─── */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  /* ─── INTERSECTION OBSERVER: reveal ─── */
  function observeReveal() {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }
  observeReveal();

});

// ══════════════════════════════════════════
//  DARK / LIGHT MODE TOGGLE
// ══════════════════════════════════════════

(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const saved = localStorage.getItem('bb-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  btn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('bb-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (btn) btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
})();


// ══════════════════════════════════════════
//  FEEDBACK WALL
// ══════════════════════════════════════════

(function initFeedbackWall() {

  const AVATAR_COLORS = ['av-cyan','av-gold','av-green','av-purple','av-pink','av-orange'];

  // Demo reviews shown when server has no data yet
  const DEMO_REVIEWS = [
    { name:"Priya S.",   email:"p***@gmail.com", message:"Really impressive portfolio! The design is clean and professional. Love the dark theme.", rating:"5", date:"2026-03-10T00:00:00.000Z" },
    { name:"Karthik R.", email:"k***@gmail.com", message:"Great project showcase. The steganography project is really unique and creative!", rating:"5", date:"2026-03-08T00:00:00.000Z" },
    { name:"Ananya M.",  email:"a***@gmail.com", message:"Very well structured portfolio. Keep adding more projects!", rating:"4", date:"2026-03-05T00:00:00.000Z" },
    { name:"Rahul V.",   email:"r***@gmail.com", message:"Smooth animations and great content. Would love to see more skills added.", rating:"4", date:"2026-03-01T00:00:00.000Z" },
    { name:"Meera D.",   email:"m***@gmail.com", message:"Love how dynamic this portfolio is. The Node.js backend is a great touch.", rating:"5", date:"2026-02-28T00:00:00.000Z" },
    { name:"Surya K.",   email:"s***@gmail.com", message:"Good work overall! Certifications section is really well presented.", rating:"4", date:"2026-02-25T00:00:00.000Z" }
  ];

  let allReviews = [];

  /* ── Fetch reviews ── */
  async function loadReviews() {
    try {
      const res  = await fetch('/api/feedbacks');
      const data = await res.json();
      // BUG FIX: use demo reviews if server returns empty array
      allReviews = (data && data.length > 0) ? data : DEMO_REVIEWS;
    } catch {
      allReviews = DEMO_REVIEWS;
    }
    renderWallStats(allReviews);
    renderWall(allReviews);
  }

  /* ── Render stats ── */
  function renderWallStats(reviews) {
    const scoreEl = document.getElementById('wallAvgScore');
    const starsEl = document.getElementById('wallAvgStars');
    const labelEl = document.getElementById('wallAvgLabel');
    if (!scoreEl) return;

    if (!reviews.length) {
      scoreEl.textContent = '—';
      if (starsEl) starsEl.textContent = '';
      if (labelEl) labelEl.textContent = 'No reviews yet';
      return;
    }

    const avg     = reviews.reduce((a,r) => a + parseFloat(r.rating || 0), 0) / reviews.length;
    const rounded = Math.round(avg * 10) / 10;
    scoreEl.textContent = rounded.toFixed(1);

    if (starsEl) starsEl.textContent = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
    if (labelEl) labelEl.innerHTML = `out of 5 &nbsp;·&nbsp; ${reviews.length} review${reviews.length !== 1 ? 's' : ''}`;

    // Update avg in rating tab too
    const avgRatingEl = document.getElementById('avgRating');
    if (avgRatingEl) {
      avgRatingEl.innerHTML = `${'★'.repeat(Math.round(avg))}${'☆'.repeat(5-Math.round(avg))} &nbsp; ${rounded.toFixed(1)} / 5 &nbsp;(${reviews.length} reviews)`;
    }
  }

  /* ── Render cards ── */
  function renderWall(reviews) {
    const grid  = document.getElementById('feedbackWall');
    const empty = document.getElementById('wallEmpty');
    if (!grid) return;

    grid.querySelectorAll('.review-card, .wall-no-results').forEach(el => el.remove());

    if (!reviews.length) {
      if (empty) empty.style.display = 'flex';
      return;
    }
    if (empty) empty.style.display = 'none';

    [...reviews]
      .sort((a,b) => new Date(b.date||0) - new Date(a.date||0))
      .forEach((r, i) => grid.appendChild(buildCard(r, i)));
  }

  /* ── Build one card ── */
  function buildCard(review, idx) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style.animationDelay = `${idx * 0.08}s`;
    card.dataset.rating = review.rating || '0';

    const colorClass = AVATAR_COLORS[idx % AVATAR_COLORS.length];

    card.innerHTML = `
      <div class="review-top">
        <div class="review-avatar ${colorClass}">${getInitials(review.name)}</div>
        <div class="review-stars">${starsHTML(parseInt(review.rating||0))}</div>
      </div>
      <div>
        <div class="review-name">${escapeHTML(review.name)}</div>
        <div class="review-email">${maskEmail(review.email||'')}</div>
      </div>
      <p class="review-message">${escapeHTML(review.message)}</p>
      <div class="review-date">${formatDate(review.date)}</div>
    `;
    return card;
  }

  /* ── Filter buttons ── */
  document.querySelectorAll('.wall-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wall-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter   = btn.dataset.filter;
      const filtered = filter === 'all'
        ? allReviews
        : allReviews.filter(r => parseInt(r.rating) === parseInt(filter));

      const grid  = document.getElementById('feedbackWall');
      const empty = document.getElementById('wallEmpty');
      grid?.querySelectorAll('.review-card, .wall-no-results').forEach(el => el.remove());

      if (!filtered.length) {
        const msg = document.createElement('div');
        msg.className = 'wall-no-results';
        msg.innerHTML = `<i class="fas fa-search" style="font-size:24px;opacity:0.3;display:block;margin-bottom:10px"></i>No ${filter}★ reviews yet.`;
        grid?.appendChild(msg);
        if (empty) empty.style.display = 'none';
      } else {
        if (empty) empty.style.display = 'none';
        [...filtered]
          .sort((a,b) => new Date(b.date||0) - new Date(a.date||0))
          .forEach((r,i) => grid?.appendChild(buildCard(r,i)));
      }
    });
  });

  /* ── Helpers ── */
  function getInitials(name) {
    return (name||'?').trim().split(' ').slice(0,2).map(w=>w[0]?.toUpperCase()||'').join('');
  }
  function starsHTML(n) {
    n = Math.min(5, Math.max(0, n));
    return '★'.repeat(n) + '☆'.repeat(5-n);
  }
  function maskEmail(email) {
    if (!email || !email.includes('@')) return '';
    const [user, domain] = email.split('@');
    return user.slice(0,2) + '***@' + domain;
  }
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    } catch { return ''; }
  }
  function escapeHTML(str) {
    return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Load on page ready
  loadReviews();

  // Reload wall after new feedback submitted
  document.getElementById('feedbackForm')?.addEventListener('submit', () => {
    setTimeout(loadReviews, 1500);
  });

})();
