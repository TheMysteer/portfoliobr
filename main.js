// Textos para animação
const texts = ['Back-end Developer', 'ML Enginner', 'IA Enginner'];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function typeText() {
    const currentText = texts[index];
    const element = document.getElementById('changing-text');
    
    if (isDeleting) {
        element.textContent = currentText.substring(0, charIndex-1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            typeText();
            return;
        }
    } else {
        element.textContent = currentText.substring(0, charIndex+1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, pauseTime);
        return;
    }

    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('changing-text');
    if (element) {
        // Remover qualquer cursor existente antes
        const oldCursor = document.getElementById('cursor');
        if (oldCursor) {
            oldCursor.remove();
        }
        
        // Criar o cursor
        const cursor = document.createElement('span');
        cursor.id = 'cursor';
        cursor.innerHTML = '|';
        element.parentNode.insertBefore(cursor, element.nextSibling);
        
        // Estilos iniciais
        element.style.fontSize = '4rem';
        element.style.color = '#3B82F6';
        element.style.fontWeight = '800';
        element.style.fontFamily = 'Segoe UI';
        
        // Iniciar animação
        typeText();
    }

    // Observador de seções
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        threshold: 0.3 // Quando 30% da seção estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                // Adiciona active no link correspondente
                document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
            }
        });
    }, observerOptions);

    // Observa todas as seções
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Tema escuro/claro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute(
        'data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Alterna entre as imagens do sol e da lua
    themeIcon.src = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'imagens/icons/moon.png' 
        : 'imagens/icons/sunny.png';
});

// Observador para animações das tecnologias
const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Quando o elemento sai da vista, remove a classe de animação
        if (!entry.isIntersecting) {
            entry.target.classList.remove('animate');
            return;
        }
        
        // Quando o elemento entra na vista, adiciona a classe de animação
        entry.target.classList.add('animate');
    });
}, {
    threshold: 0.1 // Começa a animação quando 10% do elemento está visível
});

// Aplicar o observador a todos os tech-items
document.querySelectorAll('.tech-item').forEach(item => {
    techObserver.observe(item);
});

// Adicionar ao código existente
document.querySelectorAll('.skill-item').forEach(item => {
    techObserver.observe(item);
});
