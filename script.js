const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// 1. Revisar si hay una preferencia guardada
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// 2. Función para alternar temas
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Cambiar icono
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Opcional: Smooth Scroll para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionalidad para copiar el correo al portapapeles
const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('email-to-copy');

const copytxt = document.getElementById('copytxt');

if (copytxt) {
    copytxt.addEventListener('mouseenter', () => {
        copytxt.style.color = '#1f6dc6';
    });

    copytxt.addEventListener('mouseleave', () => {
        copytxt.style.color = '';
    });
}

if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
        const textToCopy = emailText.innerText;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Cambiar el texto del botón temporalmente para dar feedback
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '¡Copiado!';
            copyBtn.style.backgroundColor = '#3b82f6';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    });
}