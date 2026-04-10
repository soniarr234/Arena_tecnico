const menuBtn = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body; // Añadimos la referencia al body

// Función para cerrar todo (limpia el código)
const closeMenu = () => {
    menuBtn.classList.remove('is-active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
};

// Abrir/Cerrar al dar clic al botón
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic se propague al body inmediatamente
    menuBtn.classList.toggle('is-active'); // Cambia hamburguesa por X
    navLinks.classList.toggle('active'); // Despliega el menú
    body.classList.toggle('menu-open'); // Activa la capa oscura y bloquea scroll
});

// CERRAR AL HACER CLIC FUERA (en la zona oscura)
body.addEventListener('click', (e) => {
    // Si el menú está abierto y el clic NO fue dentro del menú ni en el botón...
    if (body.classList.contains('menu-open') && 
        !navLinks.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        closeMenu();
    }
});

// Cerrar al hacer clic en un enlace del menú
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});



const slider = document.getElementById('slider'); // Necesitamos el contenedor para el swipe
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
let counter = 0;
let interval;

// 1. CREAR PUNTOS INDICADORES
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

// 2. FUNCIONES DE NAVEGACIÓN
const updateUI = () => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[counter].classList.add('active');
    dots[counter].classList.add('active');
};

const nextSlide = () => {
    counter = (counter < slides.length - 1) ? counter + 1 : 0;
    updateUI();
};

const prevSlide = () => {
    counter = (counter > 0) ? counter - 1 : slides.length - 1;
    updateUI();
};

const goToSlide = (index) => {
    counter = index;
    updateUI();
    resetAutoPlay();
};

// 3. AUTO-REPRODUCCIÓN
const startAutoPlay = () => interval = setInterval(nextSlide, 5000);
const resetAutoPlay = () => { 
    clearInterval(interval); 
    startAutoPlay(); 
};

// 4. EVENTOS DE FLECHAS (Solo funcionan si existen en el HTML)
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

// 5. CONTROL TÁCTIL (SWIPE) PARA MÓVIL
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

const handleSwipe = () => {
    const swipeThreshold = 50; // Sensibilidad: píxeles mínimos para mover
    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide(); // Deslizar a la izquierda
        resetAutoPlay();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide(); // Deslizar a la derecha
        resetAutoPlay();
    }
};

// INICIAR CARRUSEL
startAutoPlay();
