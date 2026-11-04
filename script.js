/* ===================================================================
   Indumini Adarshya - Portfolio Interactive Scripts
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initProjectFilters();
  initModals();
  initCopyButtons();
  initMobileNav();
  initScrollSpy();
  initContactForm();
});

/* -------------------------------------------------------------------
   1. Theme Management (Dark / Light)
------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }
}

/* -------------------------------------------------------------------
   2. Typing Effect in Hero
------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full-Stack Developer (Java & Node.js)',
    'Agentic AI Engineer (LangGraph & RAG)',
    'Microservices & Cloud Architect',
    'Cybersecurity Enthusiast (70+ THM Labs)',
    'BSc (Hons) IT Undergraduate'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 500);
}

/* -------------------------------------------------------------------
   3. Project Category Filter
------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   4. Modals (Project Detail & Interview Cheat Sheet)
------------------------------------------------------------------- */
const projectDetailsData = {
  'ai-agent': {
    title: 'AI Interview Preparation Assistant (Agentic AI)',
    badge: 'LangGraph Multi-Agent Architecture',
    tagline: 'Autonomous 4-agent interview coaching system with RAG and dynamic scoring',
    liveUrl: 'https://interviewagent-g93odkwv5wvnvohdfupdyz.streamlit.app/',
    repoUrl: 'https://github.com/indumini186',
    architecture: `
      <ul>
        <li><strong>LangGraph State Orchestration:</strong> Orchestrates state flow across 4 specialized worker agents (<code>resume_analyzer</code> &rarr; <code>question_generator</code> &rarr; <code>answer_evaluator</code> &rarr; <code>learning_coach</code>).</li>
        <li><strong>Structured JSON Decomposition:</strong> Parses unstructured PDF/DOCX resumes into structured candidate profiles and maps skill gaps.</li>
        <li><strong>Vector RAG Tool-Use:</strong> Employs <code>FAISS</code> and <code>ChromaDB</code> vector databases to retrieve real-time domain-specific questions, STAR method frameworks, and system design patterns.</li>
        <li><strong>Self-Critique & Reflection:</strong> Evaluates answers across 7 dimensions (STAR method compliance, technical depth, clarity, action verbs, etc.) and generates ideal model answers.</li>
        <li><strong>Cloud Deployment:</strong> Fully deployed on Streamlit Cloud with Groq & OpenRouter ultra-low latency LLM inference.</li>
      </ul>
    `,
    techList: ['Python 3.11', 'LangGraph', 'Groq API', 'OpenRouter', 'FAISS', 'ChromaDB', 'Streamlit', 'RAG']
  },
  'multi-converter': {
    title: 'Multi-Converter Microservices Monorepo',
    badge: 'Enterprise Microservices & BFF Pattern',
    tagline: 'Distributed high-precision Currency and Temperature conversion suite',
    repoUrl: 'https://github.com/indumini186/Multi-Converter',
    architecture: `
      <ul>
        <li><strong>Backend-for-Frontend (BFF) Gateway:</strong> Built with Node.js and Express to unify API contracts, mask internal service topologies, and handle CORS.</li>
        <li><strong>Credential Security:</strong> Implements zero-trust API Key injection server-side (<code>X-API-Key</code>), guaranteeing internal microservices are isolated from public network traffic.</li>
        <li><strong>Distributed Microservices:</strong> Core business logic distributed across independent Java 17 + Spring Boot services for Temperature and Currency calculations.</li>
        <li><strong>Audit Logging & Safety Alerts:</strong> Full MongoDB integration storing conversion histories, timestamped audits, and automated safety warnings for extreme temperature thresholds.</li>
        <li><strong>DevOps Containerization:</strong> Standardized multi-container deployment using Docker and Docker Compose for instant reproducible spins.</li>
      </ul>
    `,
    techList: ['Java 17', 'Spring Boot 3.5', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'Docker Compose', 'REST APIs', 'Postman']
  },
  'hiring-website': {
    title: 'Modern Hiring Website – Job Portal',
    badge: 'Full-Stack Web & Automated CI/CD',
    tagline: 'End-to-end job portal with automated ATS candidate scoring and CI/CD',
    liveUrl: 'https://modern-hiring-website.vercel.app/',
    repoUrl: 'https://github.com/Bawan2001/Modern-Hiring-Website',
    architecture: `
      <ul>
        <li><strong>Automated ATS Resume Scoring:</strong> Built-in algorithmic ATS evaluator that parses and matches applicant skills against job requirements to rank candidates automatically.</li>
        <li><strong>Role-Based Access Control (RBAC):</strong> Granular permissions separating job seeker profiles from corporate recruiter and employer dashboards.</li>
        <li><strong>Backend & Persistence:</strong> Python Flask REST backend with SQLAlchemy ORM, SQLite/PostgreSQL schemas, and Jinja2 templating.</li>
        <li><strong>CI/CD Deployment:</strong> Fully automated continuous integration and deployment pipeline powered by GitHub Actions, containerized with Docker, and deployed on Vercel.</li>
      </ul>
    `,
    techList: ['Python', 'Flask', 'SQLAlchemy', 'Docker', 'GitHub Actions (CI/CD)', 'Vercel', 'JavaScript', 'HTML5/CSS3']
  },
  'hospital-management': {
    title: 'Distributed Hospital Appointment Management System',
    badge: 'Healthcare Microservices & Spring Cloud',
    tagline: 'Scalable hospital microservices backend for doctor scheduling and patient bookings',
    repoUrl: 'https://github.com/Bawan2001/Hostpital-Appoinment-Management-System',
    architecture: `
      <ul>
        <li><strong>Microservices Architecture:</strong> Decoupled services handling doctor profile management, specialty-based scheduling, and patient appointment queues.</li>
        <li><strong>Inter-Service Communication:</strong> Spring Cloud integration facilitating resilient inter-microservice discovery and synchronous/asynchronous data exchanges.</li>
        <li><strong>NoSQL Data Persistence:</strong> High-throughput MongoDB schemas optimized for rapid doctor availability lookups and booking histories.</li>
        <li><strong>Container Infrastructure:</strong> Containerized using Docker for microservice isolation and horizontal scaling.</li>
      </ul>
    `,
    techList: ['Java 21', 'Spring Boot', 'Spring Cloud', 'MongoDB', 'Docker', 'REST APIs']
  }
};

function initModals() {
  // General Modal Containers
  const projectModal = document.getElementById('project-detail-modal');
  const cheatModal = document.getElementById('cheat-sheet-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  // Trigger buttons
  const cheatTrigger = document.getElementById('open-cheat-sheet-btn');
  const detailTriggers = document.querySelectorAll('.view-project-details');

  // Open Cheat Sheet
  if (cheatTrigger && cheatModal) {
    cheatTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      cheatModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Open Project Details
  detailTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-badge').textContent = data.badge;
      document.getElementById('modal-project-tagline').textContent = data.tagline;
      document.getElementById('modal-project-architecture').innerHTML = data.architecture;

      // Tech Stack Chips
      const techContainer = document.getElementById('modal-project-tech');
      techContainer.innerHTML = '';
      data.techList.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techContainer.appendChild(span);
      });

      // Links
      const liveBtn = document.getElementById('modal-project-live');
      if (data.liveUrl) {
        liveBtn.href = data.liveUrl;
        liveBtn.style.display = 'inline-flex';
      } else {
        liveBtn.style.display = 'none';
      }

      const repoBtn = document.getElementById('modal-project-repo');
      if (data.repoUrl) {
        repoBtn.href = data.repoUrl;
        repoBtn.style.display = 'inline-flex';
      } else {
        repoBtn.style.display = 'none';
      }

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeAllModals();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    if (projectModal) projectModal.classList.remove('active');
    if (cheatModal) cheatModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------------
   5. Copy to Clipboard & Toast Notifications
------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Copied to clipboard!');
      });
    });
  });
}

function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}

/* -------------------------------------------------------------------
   6. Mobile Navigation
------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* -------------------------------------------------------------------
   7. Scroll Spy for Active Navigation
------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* -------------------------------------------------------------------
   8. Contact Form Handling
------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Indumini,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Direct mailto trigger
    window.location.href = `mailto:induminiadarsha95@gmail.com?subject=${subject}&body=${body}`;

    showToast('Redirecting to your email client to send message...');
    form.reset();
  });
}
