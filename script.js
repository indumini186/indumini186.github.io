/**
 * Indumini Adarshya - Professional Developer Portfolio Interactive Logic
 * Inspired by modern tech portfolio design system with dark/light themes,
 * project filters, dynamic architectural modals, clipboard copies, and mail handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Color Theme Toggle (Dark / Light) with LocalStorage
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // ------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. Navbar Scrollspy & Scroll Shadow
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section ScrollSpy
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Interactive Project Filtering
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
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

  // ------------------------------------------------------------------------
  // 5. Toast Notification System
  // ------------------------------------------------------------------------
  function showToast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // ------------------------------------------------------------------------
  // 6. 1-Click Copy to Clipboard Handler
  // ------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
        showToast('Copied to clipboard!');
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. Interactive Project Architecture Modal System
  // ------------------------------------------------------------------------
  const projectDetails = {
    'ai-interview': {
      title: 'AI Interview Preparation Assistant (Agentic AI)',
      category: 'Agentic AI • RAG • Personal Project',
      description: 'An intelligent, autonomous 4-agent interview coaching system with resume analysis, role-tailored question generation, 7-metric answer evaluation, and personalized study roadmaps.',
      architecture: [
        'LangGraph State Orchestration: Coordinates state flow across 4 worker agents (resume_analyzer -> question_generator -> answer_evaluator -> learning_coach) with shared StateGraph memory.',
        'Dynamic Vector RAG Tool-Use: Employs FAISS and ChromaDB vector databases to retrieve real-time domain-specific questions, STAR method frameworks, and system design patterns.',
        'Reflection & Self-Critique Engine: Evaluates candidate answers across 7 scoring dimensions (STAR compliance, technical depth, clarity, action verbs, etc.) and generates ideal model answers.',
        'Low-Latency LLM Inference: Integrated with Groq (Llama-3 70B) and OpenRouter models, deployed live on Streamlit Cloud.'
      ],
      techStack: ['Python 3.11', 'LangGraph', 'Groq API', 'OpenRouter', 'FAISS', 'ChromaDB', 'Streamlit', 'RAG'],
      repoLink: 'https://github.com/indumini186',
      liveLink: 'https://interviewagent-g93odkwv5wvnvohdfupdyz.streamlit.app/'
    },
    'multi-converter': {
      title: 'Multi-Converter Microservices Monorepo',
      category: 'Distributed Systems • Spring Boot • BFF Pattern',
      description: 'A production-grade, distributed microservices suite for Currency (USD/LKR) and Temperature (°C/°F) conversions with decoupled BFF gateway and MongoDB audit logging.',
      architecture: [
        'Backend-For-Frontend (BFF) Gateway: Node.js Express BFF handles client routing, masks internal service ports, and injects confidential credentials (X-API-Key) server-to-server.',
        'Core Spring Boot Microservices: Independent Java 17 Spring Boot microservices for high-precision Currency and Temperature computation with strict input validation.',
        'Automated Safety Alerts & Auditing: MongoDB integration for persistent conversion logging, timestamped audit trials, and automated alerts for extreme temperatures.',
        'DevOps Containerization: Full Docker and Docker Compose containerization for rapid local development and scalable multi-container orchestration.'
      ],
      techStack: ['Java 17', 'Spring Boot 3.5', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'Docker Compose', 'REST APIs', 'Postman'],
      repoLink: 'https://github.com/indumini186/Multi-Converter',
      liveLink: ''
    },
    'modern-hiring': {
      title: 'Modern Hiring Website – Job Portal with CI/CD',
      category: 'Full-Stack Web • DevOps • Group Project',
      description: 'An end-to-end recruitment platform with role-based access control, job posting workflows, an algorithmic ATS resume scoring engine, and automated CI/CD.',
      architecture: [
        'Role-Based Access Control (RBAC): Secure authentication separating Job Seeker dashboards from Employer / Recruiter management consoles.',
        'Algorithmic ATS Resume Scoring: Parses and computes keyword match percentages between candidate profiles and job requirements for automated applicant ranking.',
        'Backend & Persistence: Python Flask RESTful backend with SQLAlchemy ORM and SQLite schemas with optimized query performance.',
        'Automated CI/CD Pipeline: GitHub Actions workflow with Docker builds and automated deployments directly to Vercel production hosting.'
      ],
      techStack: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Docker', 'GitHub Actions (CI/CD)', 'Vercel', 'JavaScript', 'HTML5/CSS3'],
      repoLink: 'https://github.com/Bawan2001/Modern-Hiring-Website',
      liveLink: 'https://modern-hiring-website.vercel.app/'
    },
    'hospital-management': {
      title: 'Distributed Hospital Appointment Management System',
      category: 'Microservices • Healthcare • Spring Cloud',
      description: 'A scalable microservices platform designed for modern hospital management, doctor scheduling, and patient appointment booking.',
      architecture: [
        'Decoupled Microservices: Independent services managing doctor profiles, specialty-based searches, and real-time appointment availability slots.',
        'Spring Cloud Inter-Service Communication: Service registry and resilient discovery ensuring high availability and fault isolation across services.',
        'NoSQL Persistence: MongoDB integration storing high-throughput appointment records, doctor schedules, and patient history.',
        'Container Orchestration: Containerized via Docker for seamless multi-environment portability and scalability.'
      ],
      techStack: ['Java 21', 'Spring Boot', 'Spring Cloud', 'MongoDB', 'Docker', 'REST APIs'],
      repoLink: 'https://github.com/Bawan2001/Hostpital-Appoinment-Management-System',
      liveLink: ''
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const openDetailButtons = document.querySelectorAll('.open-details-btn');

  function openModal(projectId) {
    const details = projectDetails[projectId];
    if (!details || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.5px;">
          ${details.category}
        </span>
        <h3 style="font-size: 1.6rem; font-weight: 800; margin: 6px 0 12px; color: var(--text-primary); line-height: 1.3;">
          ${details.title}
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
          ${details.description}
        </p>
      </div>

      <h4 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 12px;">
        <i class="fa-solid fa-layer-group"></i> Architecture &amp; Engineering Highlights
      </h4>
      <ul style="padding-left: 18px; margin-bottom: 24px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65; list-style: disc;">
        ${details.architecture.map(item => `<li style="margin-bottom: 10px;">${item}</li>`).join('')}
      </ul>

      <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
        Technologies Used
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px;">
        ${details.techStack.map(tag => `<span style="font-size: 0.76rem; font-family: var(--font-mono); background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 4px; color: var(--text-secondary);">${tag}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
        ${details.liveLink ? `
          <a href="${details.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Demo
          </a>
        ` : ''}
        <a href="${details.repoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <i class="fa-brands fa-github"></i> View GitHub Repository
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  openDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 8. Contact Form Submission Handler
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill out all required fields (*).';
          formFeedback.classList.remove('hidden');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';
      }

      const mailtoUri = `mailto:induminiadarsha95@gmail.com?subject=${encodeURIComponent(subject || 'IT Internship Opportunity')}&body=${encodeURIComponent(`Hi Indumini,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong><i class="fa-solid fa-check"></i> Thank you, ${name}!</strong><br>
            Your inquiry has been prepared. If your email client does not open automatically, 
            <a href="${mailtoUri}" style="text-decoration: underline; color: inherit; font-weight: bold;">click here to launch your mail client</a> 
            or reach me directly at <strong>induminiadarsha95@gmail.com</strong>.
          `;
          formFeedback.classList.remove('hidden');
        }

        window.location.href = mailtoUri;

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        }

        contactForm.reset();
        showToast('Message inquiry prepared! Opening mail client...');
      }, 600);
    });
  }

  // Set current copyright year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
