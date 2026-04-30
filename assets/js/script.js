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



const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
let counter = 0;
let interval;

// --- NUEVA FUNCIÓN DE INICIALIZACIÓN ---
const initSlider = () => {
    // 1. Forzamos que solo el primero sea visible al cargar
    slides.forEach((s, i) => {
        if (i === 0) s.classList.add('active');
        else s.classList.remove('active');
    });

    // 2. Creamos los puntos (Dots)
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    // 3. Iniciamos el auto-play
    startAutoPlay();
};

// 2. FUNCIONES DE NAVEGACIÓN (Corregidas para evitar solapamientos)
const updateUI = () => {
    slides.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = "0"; // Refuerzo visual
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    
    slides[counter].classList.add('active');
    slides[counter].style.opacity = "1"; // Refuerzo visual
    if(dots[counter]) dots[counter].classList.add('active');
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
const startAutoPlay = () => {
    clearInterval(interval); // Limpiamos cualquier intervalo previo por seguridad
    interval = setInterval(nextSlide, 9000);
};

const resetAutoPlay = () => { 
    clearInterval(interval); 
    startAutoPlay(); 
};

// 4. EVENTOS (Encapsulados en un chequeo de existencia)
const setupEvents = () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Swipe para móvil
    if (slider) {
        let touchStartX = 0;
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        slider.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) { nextSlide(); resetAutoPlay(); }
            else if (touchEndX - touchStartX > swipeThreshold) { prevSlide(); resetAutoPlay(); }
        }, {passive: true});
    }
};

// --- EJECUCIÓN AL CARGAR EL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    setupEvents();
});


document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const successMsg = document.getElementById('mensaje-exito');

    // Ocultar formulario
    form.classList.add('fade-out');

    setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';

        // Esperar a que el avión vuele y luego resetear (5 segundos total)
        setTimeout(() => {
            successMsg.style.opacity = '0';
            successMsg.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                successMsg.style.display = 'none';
                successMsg.style.opacity = '1';
                form.reset();
                form.style.display = 'block';
                setTimeout(() => form.classList.remove('fade-out'), 50);
            }, 500);
        }, 6000);
    }, 400);
});
