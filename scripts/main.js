document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuContainer.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenuContainer.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        });
        
        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!link.classList.contains('mobile-cta')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    mobileMenu.classList.remove('active');
                    setTimeout(() => {
                        mobileMenuContainer.style.display = 'none';
                    }, 300);
                    document.body.style.overflow = '';
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.main-header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (nome && email && mensagem) {
                const texto = `Olá, meu nome é ${nome} (${email}).%0A%0A${mensagem}`;
                window.open(`https://wa.me/5581997881621?text=${encodeURIComponent(texto)}`, '_blank');
                
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
    
    // Botão flutuante para topo
    const floatingTop = document.querySelector('.floating-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            floatingTop.classList.add('visible');
        } else {
            floatingTop.classList.remove('visible');
        }
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
    
    // Efeito de destaque no header ao rolar
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'var(--secondary-color)';
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            document.querySelector('.header-logo').style.height = '50px';
        } else {
            header.style.background = 'linear-gradient(to right, var(--secondary-color) 0%, var(--dark-color) 100%)';
            header.style.boxShadow = 'var(--shadow-md)';
            document.querySelector('.header-logo').style.height = '60px';
        }
    });
    
    // Animação de elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar estado inicial para animações
    const animatedElements = document.querySelectorAll('.benefit-card, .module-card, .about-image, .contact-item, .highlight-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar na carga inicial
    animateOnScroll();
    
    // Verificar durante o scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});