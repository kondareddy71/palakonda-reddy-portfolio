// Mobile navigation
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// Reveal sections as they enter the viewport. Fall back to visible content if unsupported.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Dynamic footer year
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Contact form: browser validation runs before the form submits to FormSubmit.
// FormSubmit requires email verification the first time. After verification, submissions
// are delivered to the configured inbox. This static site does not store messages itself.
const contactForm = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');
if (contactForm && formNote) {
  contactForm.addEventListener('submit', (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      contactForm.reportValidity();
      return;
    }
    formNote.textContent = 'Sending your message…';
  });
}

// A missing resume file should be replaced with your latest PDF before publishing.
const resumeButton = document.querySelector('#resumeButton');
if (resumeButton) {
  resumeButton.addEventListener('click', (event) => {
    const resumePath = new URL(resumeButton.getAttribute('href'), window.location.href);
    if (resumePath.pathname.endsWith('/assets/resume.pdf') && !resumeButton.dataset.fileConfirmed) {
      // The browser handles the download link; this is only a reminder during local setup.
      // Remove this listener if you do not want the reminder.
      const note = document.querySelector('#formNote');
      if (note) note.textContent = 'Reminder: add your latest PDF as assets/resume.pdf for the resume download to work.';
    }
  });
}
