/* ============================================================
   Sentinel Landing Page — main.js
   Pure JavaScript: no external libraries
   ============================================================ */

'use strict';

// ============================================================
// 1. Scroll-aware Navigation
// ============================================================
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

// ============================================================
// 2. Mobile Hamburger Menu
// ============================================================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMobileMenu() {
  if (!hamburger || !mobileMenu) return;
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', '모바일 메뉴 닫기');
}

function closeMobileMenu() {
  if (!hamburger || !mobileMenu) return;
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', '모바일 메뉴 열기');
}

function toggleMobileMenu() {
  const isOpen = mobileMenu && mobileMenu.classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });
}

// ============================================================
// 3. IntersectionObserver — Scroll Animations
// ============================================================
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  // Fallback: make visible immediately if IntersectionObserver is unsupported
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger children inside the same parent if multiple are visible at once
          const delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Assign stagger delays to sibling fade-up elements within the same grid/flex container
  const parents = new Set();
  elements.forEach(function (el) {
    if (el.parentElement) parents.add(el.parentElement);
  });

  parents.forEach(function (parent) {
    const siblings = parent.querySelectorAll('.fade-up');
    siblings.forEach(function (el, idx) {
      el.dataset.delay = idx * 100;
    });
  });

  elements.forEach(function (el) { observer.observe(el); });
})();

// ============================================================
// 4. Modal — Early Access
// ============================================================
const modalOverlay = document.getElementById('modal-overlay');
const modalEl      = document.getElementById('modal');
const modalClose   = document.getElementById('modal-close');

// Elements to return focus to after modal closes
let focusTrigger = null;

function openModal(triggerEl) {
  if (!modalOverlay) return;
  focusTrigger = triggerEl || document.activeElement;

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus first focusable element in modal
  const firstFocusable = modalEl && modalEl.querySelector('input, button, [tabindex]');
  if (firstFocusable) {
    setTimeout(function () { firstFocusable.focus(); }, 50);
  }
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to the trigger
  if (focusTrigger && typeof focusTrigger.focus === 'function') {
    focusTrigger.focus();
  }
}

// Close on overlay click (outside modal box)
if (modalOverlay) {
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

// Close button
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Focus trap inside modal
if (modalEl) {
  modalEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    const focusable = modalEl.querySelectorAll(
      'input, button, a[href], select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// Expose openModal globally for inline onclick handlers
window.openModal      = openModal;
window.closeModal     = closeModal;
window.closeMobileMenu = closeMobileMenu;

// ============================================================
// 5. Waitlist Form — inline CTA section
// ============================================================
(function initWaitlistForm() {
  const form        = document.getElementById('waitlist-form');
  const errorEl     = document.getElementById('waitlist-error');
  const successEl   = document.getElementById('waitlist-success');
  const formWrap    = document.getElementById('waitlist-form-wrap');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email      = emailInput ? emailInput.value.trim() : '';

    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errorEl) {
        errorEl.textContent = '유효한 이메일 주소를 입력해주세요.';
        errorEl.style.display = 'block';
      }
      if (emailInput) emailInput.focus();
      return;
    }

    if (errorEl) errorEl.style.display = 'none';
    simulateWaitlistSubmit(email, formWrap, successEl);
  });
})();

// ============================================================
// 6. Modal Form — waitlist via modal
// ============================================================
(function initModalForm() {
  const form      = document.getElementById('modal-form');
  const errorEl   = document.getElementById('modal-error');
  const successEl = document.getElementById('modal-success');
  const formWrap  = document.getElementById('modal-form-wrap');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email      = emailInput ? emailInput.value.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errorEl) {
        errorEl.textContent = '유효한 이메일 주소를 입력해주세요.';
        errorEl.style.display = 'block';
      }
      if (emailInput) emailInput.focus();
      return;
    }

    if (errorEl) errorEl.style.display = 'none';
    simulateWaitlistSubmit(email, formWrap, successEl);
  });
})();

// ============================================================
// Helper: simulate form submission (no backend in this build)
// ============================================================
function simulateWaitlistSubmit(email, formWrap, successEl) {
  // In a real deployment, replace with fetch('/api/waitlist', ...) call
  // For the static mission build, we simulate a successful response.
  setTimeout(function () {
    if (formWrap)  formWrap.style.display = 'none';
    if (successEl) successEl.style.display = 'block';
    console.info('[Sentinel] Waitlist signup:', email);
  }, 400);
}

// ============================================================
// 7. Smooth scroll for anchor links (keyboard & click)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL without re-scrolling
    if (history.pushState) {
      history.pushState(null, '', '#' + targetId);
    }
  });
});
