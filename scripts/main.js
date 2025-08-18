// Função principal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuração do formulário WhatsApp
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const mensagem = document.getElementById('mensagem')?.value || '';
            
            const numeroWhatsapp = "5581997881621";
            const texto = `Olá, meu nome é ${nome} (${email}).%0A%0A${encodeURIComponent(mensagem)}`;
            
            // Abre o WhatsApp em uma nova janela
            window.location.href = `https://wa.me/${numeroWhatsapp}?text=${texto}`;
        });
    }

    // 2. Configuração do menu flutuante
    const menuItems = document.querySelectorAll('.floating-menu a');
    if (menuItems.length > 0) {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (current && item.getAttribute('href').includes(current)) {
                    item.classList.add('active');
                }
            });
        });

        // Ativa item conforme hash na URL
        const currentSection = window.location.hash;
        if (currentSection) {
            const activeItem = document.querySelector(`.floating-menu a[href="${currentSection}"]`);
            if (activeItem) activeItem.classList.add('active');
        }
    }

    // 3. Configuração do tema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Alternar tema';
    themeToggle.setAttribute('aria-label', 'Alternar entre tema claro e escuro');
    themeToggle.classList.add('btn', 'primary-btn');
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('themePreference', newTheme);
    });

    // Carrega tema salvo
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

});