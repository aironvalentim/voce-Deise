// ==============================
// Utilidades
// ==============================
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function hasIPhoneNotch() {
  return /iPhone/.test(navigator.userAgent) && !window.MSStream &&
         (window.screen.height >= 812 || window.screen.width >= 812);
}

// Scroll suave
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // easeInOutCubic
    const easeInOut = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + (distance * easeInOut));

    if (progress < 1) requestAnimationFrame(scrollStep);
  }

  requestAnimationFrame(scrollStep);
}

// ==============================
// Header, Menu Mobile e Navegação
// ==============================
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');

  if (!mobileMenuToggle || !mobileMenu || !mobileMenuContainer || !closeMenu) return;

  const openMobileMenu = () => {
    mobileMenuContainer.style.display = 'block';
    setTimeout(() => {
      mobileMenu.classList.add('active');
      document.body.classList.add('menu-open');
    }, 10);
  };

  const closeMobileMenuFn = () => {
    mobileMenu.classList.remove('active');
    setTimeout(() => {
      mobileMenuContainer.style.display = 'none';
      document.body.classList.remove('menu-open');
    }, 300);
  };

  mobileMenuToggle.addEventListener('click', openMobileMenu, { passive: true });
  closeMenu.addEventListener('click', closeMobileMenuFn, { passive: true });

  // Fechar clicando fora
  mobileMenuContainer.addEventListener('click', (e) => {
    if (e.target === mobileMenuContainer) closeMobileMenuFn();
  }, { passive: true });

  // Fechar ao clicar em links do menu + scroll suave
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        closeMobileMenuFn();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
          const targetPosition = Math.max(0, targetEl.offsetTop - headerHeight);
          setTimeout(() => smoothScrollTo(targetPosition, 800), 350);
        }
      }
    });
  });
}

function initializeScrollEffects() {
  const floatingTop = document.querySelector('.floating-top');
  const header = document.querySelector('.main-header');
  const headerLogo = document.querySelector('.header-logo');

  window.addEventListener('scroll', () => {
    if (floatingTop) {
      if (window.pageYOffset > 300) floatingTop.classList.add('visible');
      else floatingTop.classList.remove('visible');
    }

    if (header) {
      if (window.scrollY > 50) {
        header.style.background = 'var(--secondary-color)';
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        if (headerLogo) headerLogo.style.height = '50px';
      } else {
        header.style.background = 'linear-gradient(to right, var(--secondary-color) 0%, var(--dark-color) 100%)';
        header.style.boxShadow = 'var(--shadow-md)';
        if (headerLogo) headerLogo.style.height = '60px';
      }
    }

    adjustFloatingElements();
  });

  // Scroll suave para âncoras internas (fora do menu)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('mobile-cta') && !anchor.classList.contains('header-cta')) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        const targetPosition = Math.max(0, targetElement.offsetTop - headerHeight);

        smoothScrollTo(targetPosition, 800);

        if (history.pushState) history.pushState(null, null, targetId);
        else window.location.hash = targetId;
      }, { passive: true });
    }
  });
}

// ==============================
// Animações de Entrada
// ==============================
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll, { passive: true });
  animateOnScroll();
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
  const screenPosition = window.innerHeight / 1.2;

  elements.forEach(element => {
    const rectTop = element.getBoundingClientRect().top;
    if (rectTop < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// ==============================
// Formulário de Contato
// ==============================
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const mensagem = document.getElementById('mensagem')?.value?.trim();

    if (nome && email && mensagem) {
      const texto = `Olá, meu nome é ${nome} (${email}).%0A%0A${mensagem}`;
      window.open(`https://wa.me/5511988607756?text=${encodeURIComponent(texto)}`, '_blank');

      contactForm.reset();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada';
        submitBtn.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    }
  });
}

// ==============================
// Flutuantes / Layout
// ==============================
function adjustFloatingElements() {
  const floatingNav = document.querySelector('.floating-nav');
  const floatingTopBtn = document.querySelector('.floating-top');
  const floatingWhatsapp = document.querySelector('.floating-whatsapp');

  const mobile = window.innerWidth <= 768;

  if (mobile) {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const nearBottom = scrollPosition > documentHeight - viewportHeight - 100;

    if (floatingNav) floatingNav.style.bottom = nearBottom ? '8rem' : '7rem';
    if (floatingTopBtn) floatingTopBtn.style.bottom = nearBottom ? '10rem' : '9rem';
    if (floatingWhatsapp) floatingWhatsapp.style.bottom = nearBottom ? '1.5rem' : '1.2rem';
  } else {
    // No desktop, use apenas o CSS, não altere via JS
    if (floatingNav) floatingNav.style.bottom = '';
    if (floatingTopBtn) floatingTopBtn.style.bottom = '';
    if (floatingWhatsapp) floatingWhatsapp.style.bottom = '';
  }

  if (isIOS() && hasIPhoneNotch()) {
    if (floatingWhatsapp) floatingWhatsapp.style.bottom = mobile ? '2rem' : '';
    if (floatingNav) floatingNav.style.bottom = mobile ? '9rem' : '';
    if (floatingTopBtn) floatingTopBtn.style.bottom = mobile ? '12rem' : '';
  }
}

// ==============================
// Boot
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  initializeMobileMenu();
  initializeContactForm();
  initializeScrollEffects();
  initializeAnimations();

  // Forçar foco para evitar bug de “esperar toque” no mobile
  //window.focus();

  window.addEventListener('load', () => {
    adjustFloatingElements();
    setTimeout(initializeAnimations, 100);
  });
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    adjustFloatingElements();
    window.dispatchEvent(new Event('resize'));
  }, 300);
});
