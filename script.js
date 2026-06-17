// ============================================================
//  Tema claro / oscuro
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============================================================
//  Menú móvil
// ============================================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    menuToggle.querySelector('i').classList.toggle('fa-bars', !open);
    menuToggle.querySelector('i').classList.toggle('fa-xmark', open);
});

// Cerrar el menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

// ============================================================
//  Smooth scroll para enlaces internos
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
//  Navbar: sombra al hacer scroll + barra de progreso
// ============================================================
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
});

// ============================================================
//  Enlace activo según la sección visible
// ============================================================
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = navLinks.querySelectorAll('a');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ============================================================
//  Scroll reveal (aparición de elementos)
// ============================================================
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
//  Copiar correo al portapapeles
// ============================================================
const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('email-to-copy');

if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText.innerText).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
        }).catch(err => console.error('Error al copiar: ', err));
    });
}
