document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos imediatamente
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
    initializeTouchImprovements();
    
    // Executar ajustes após o carregamento completo
    window.addEventListener('load', function() {
        adjustFloatingElements();
        setTimeout(initializeAnimations, 100);
    });
});

// Inicializar menu mobile
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        // Adicionar event listeners
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        closeMenu.addEventListener('click', closeMobileMenu);
        
        // Fechar menu ao clicar fora dele
        mobileMenuContainer.addEventListener('click', function(e) {
            if (e.target === mobileMenuContainer) {
                closeMobileMenu();
            }
        });
        
        // Fechar menu ao clicar em um link (exceto CTA)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            if (!link.classList.contains('mobile-cta')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeMobileMenu();
                    
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.main-header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        // Pequeno delay para garantir que o menu fechou
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                });
            }
        });
    }
}

// Alternar menu mobile
function toggleMobileMenu() {
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Pequeno delay para garantir que o display block foi aplicado
    setTimeout(() => {
        mobileMenu.classList.add('active');
    }, 10);
}

// Fechar menu mobile
function closeMobileMenu() {
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        mobileMenuContainer.style.display = 'none';
    }, 300);
}

// Inicializar formulário de contato
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (nome && email && mensagem) {
                const texto = `Olá, meu nome é ${nome} (${email}).%0A%0A${mensagem}`;
                window.open(`https://wa.me/5511988607756?text=${encodeURIComponent(texto)}`, '_blank');
                
                // Resetar formulário
                contactForm.reset();
                
                // Feedback visual
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
}

// Inicializar efeitos de scroll
function initializeScrollEffects() {
    const floatingTop = document.querySelector('.floating-top');
    const header = document.querySelector('.main-header');
    
    // Botão flutuante para topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            floatingTop.classList.add('visible');
        } else {
            floatingTop.classList.remove('visible');
        }
        
        // Efeito de destaque no header ao rolar
        if (window.scrollY > 50) {
            header.style.background = 'var(--secondary-color)';
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            document.querySelector('.header-logo').style.height = '50px';
        } else {
            header.style.background = 'linear-gradient(to right, var(--secondary-color) 0%, var(--dark-color) 100%)';
            header.style.boxShadow = 'var(--shadow-md)';
            document.querySelector('.header-logo').style.height = '60px';
        }
        
        // Ajustar elementos flutuantes
        adjustFloatingElements();
        
        // Executar animações durante o scroll
        animateOnScroll();
    });
    
    // Suavizar scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('mobile-cta') && !anchor.classList.contains('header-cta')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        }
    });
}

// Inicializar animações
function initializeAnimations() {
    // Configurar estado inicial para animações
    const animatedElements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar durante o scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Verificar na carga inicial
    animateOnScroll();
}

// Animação de elementos ao rolar
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Ajustar elementos flutuantes para não cobrir conteúdo
function adjustFloatingElements() {
    const floatingNav = document.querySelector('.floating-nav');
    const floatingTopBtn = document.querySelector('.floating-top');
    const floatingWhatsapp = document.querySelector('.floating-whatsapp');
    
    if (window.innerWidth <= 768) {
        // Ajuste adicional para mobile baseado na posição de scroll
        const scrollPosition = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        // Se estiver perto do final da página, ajustar posição
        if (scrollPosition > documentHeight - viewportHeight - 100) {
            floatingNav.style.bottom = '8rem';
            floatingTopBtn.style.bottom = '10rem';
            if (floatingWhatsapp) {
                floatingWhatsapp.style.bottom = '1.5rem';
            }
        } else {
            floatingNav.style.bottom = '7rem';
            floatingTopBtn.style.bottom = '9rem';
            if (floatingWhatsapp) {
                floatingWhatsapp.style.bottom = '1.2rem';
            }
        }
    } else {
        // Reset para desktop
        floatingNav.style.bottom = '1.5rem';
        floatingTopBtn.style.bottom = '11rem';
        if (floatingWhatsapp) {
            floatingWhatsapp.style.bottom = '2rem';
        }
    }
}

// Inicializar melhorias para touch
function initializeTouchImprovements() {
    // Detectar dispositivos touch
    document.addEventListener('touchstart', function() {
        document.body.classList.add('touch-device');
    }, { once: true });
    
    // Prevenir comportamentos padrão indesejados em toque
    document.addEventListener('touchmove', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
    
    // Melhorar acessibilidade em dispositivos móveis
    if ('ontouchstart' in window) {
        // Aumentar área de toque para botões em dispositivos móveis
        document.querySelectorAll('.btn').forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        });
        
        // Ajustar elementos flutuantes no redimensionamento
        window.addEventListener('resize', adjustFloatingElements);
    }
}