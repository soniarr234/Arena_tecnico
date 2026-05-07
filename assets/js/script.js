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
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    
    if(slides[counter]) slides[counter].classList.add('active');
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


/* ========================================================================================================================
                                            GESTIÓN DEL FORMULARIO (EmailJS)
   ======================================================================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit');
    const successMsg = document.getElementById('success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. Desactivar botón para evitar múltiples clics
            const originalBtnContent = btnSubmit.innerHTML;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>ENVIANDO...</span>';

            // 2. Enviar vía EmailJS
            // service_yw5zhtr, template_y4sozo6 (Tus IDs proporcionados)
            emailjs.sendForm('service_yw5zhtr', 'template_y4sozo6', this)
                .then(() => {
                    // --- ÉXITO: EJECUTAR TUS ANIMACIONES ---
                    contactForm.classList.add('fade-out');

                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        successMsg.style.display = 'block';

                        // Resetear el formulario después de la animación (6 segundos)
                        setTimeout(() => {
                            successMsg.style.opacity = '0';
                            successMsg.style.transition = 'opacity 0.5s ease';

                            setTimeout(() => {
                                successMsg.style.display = 'none';
                                successMsg.style.opacity = '1';
                                contactForm.reset();
                                contactForm.style.display = 'block';
                                btnSubmit.disabled = false;
                                btnSubmit.innerHTML = originalBtnContent;
                                setTimeout(() => contactForm.classList.remove('fade-out'), 50);
                            }, 500);
                        }, 5000);
                    }, 400);

                }, (error) => {
                    // --- ERROR: NOTIFICAR AL USUARIO ---
                    console.error('EmailJS Error:', error);
                    alert('Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = originalBtnContent;
                });
        });
    }
});






/* ========================================================================================================================
                                            DATOS DE LOS PROYECTOS (Base de datos)
   ======================================================================================================================== */
const projectsData = {
    'promocion-residencial-carabanchel': {
        title: 'Promoción residencial en Carabanchel',
        desc: 'Dirección facultativa, coordinación de seguridad y salud y servicios de Project Manager en Carabanchel (Madrid).',
        cost: '4.000.000€',
        promotor: '3SUCCES AML INVESTMENT S.L.U',
        contratista: 'PGM',
        mainImg: 'assets/img/img1_carrousel.webp',
        gallery: [
            'assets/img/img1_carrousel.webp',
            'assets/img/img2_carrousel.webp',
            'assets/img/img3_carrousel.webp'
        ]
    },
    
    'palacio-rincon': {
        title: 'Palacio El Rincón',
        desc: 'Dirección facultativa, coordinación de seguridad y Project Manager para obras de rehabilitación de Palacio El Ricón.',
        cost: '2.500.000€',
        promotor: 'El Rincón Estate, S.L.',
        contratista: 'Antana',
        mainImg: 'assets/img/img2_carrousel.webp',
        gallery: [
            'assets/img/img1_carrousel.webp',
            'assets/img/img2_carrousel.webp',
            'assets/img/img3_carrousel.webp'
        ]
    },

    'fachada-jorge-juan': {
        title: 'Rehabilitación de Fachada Protegida en Jorge Juan',
        desc: 'Redacción de proyecto de rehabilitación de fachada singular en edificio con protección en Calle Jorge Juan (Madrid).',
        cost: '80.000€',
        promotor: 'Comunidad de propietarios',
        mainImg: 'assets/img/img3_carrousel.webp',
        gallery: [
            'assets/img/img1_carrousel.webp',
            'assets/img/img2_carrousel.webp',
            'assets/img/img3_carrousel.webp'
        ]
    },

    'edificio-larra': {
        title: 'Edificio histórico Larra',
        desc: 'Dirección facultativa, coordinación de seguridad y salud para obras de rehabilitación de Edificio histórico Larra 12-4 (Madrid).',
        cost: '1.500.000€',
        promotor: 'Ephimera S.L',
        contratista: 'Contrucciones AG',
        mainImg: 'assets/img/img4_carrousel.webp',
        gallery: [
            'assets/img/img1_carrousel.webp',
            'assets/img/img2_carrousel.webp',
            'assets/img/img3_carrousel.webp'
        ]
    },
};

/* ========================================================================================================================
                                            GENERACIÓN AUTOMÁTICA DE TARJETAS
   ======================================================================================================================== */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Limpiar contenedor

    Object.keys(projectsData).forEach(id => {
        const project = projectsData[id];
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => openModal(id);

        card.innerHTML = `
            <img src="${project.mainImg}" alt="${project.title}" loading="lazy">
            <h3>${project.title}</h3>
        `;
        grid.appendChild(card);
    });
}

/* ========================================================================================================================
                                            GESTIÓN DEL MODAL (VENTANA EMERGENTE)
   ======================================================================================================================== */
function openModal(id) {
    const data = projectsData[id];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const body = document.getElementById('modal-body');

    // Generar miniaturas de la galería
    const thumbnailsHTML = data.gallery.map((img, index) => 
        `<img src="${img}" class="modal-thumb ${index === 0 ? 'active' : ''}" 
              onclick="changeModalMainImage('${img}', this)" alt="Vista previa">`
    ).join('');

    body.innerHTML = `
        <div class="modal-body-wrapper">
            <div class="modal-image-container">
                <img src="${data.mainImg}" id="modal-main-img" class="modal-header-img">
                <div class="modal-thumbnails">
                    ${thumbnailsHTML}
                </div>
            </div>
            <div class="modal-info">
                <h2>${data.title}</h2>
                <p>${data.desc}</p>
                <div class="project-specs">
                    <div class="spec-item"><span>PEM</span><strong>${data.cost}</strong></div>
                    <div class="spec-item"><span>Promotor</span><strong>${data.promotor}</strong></div>
                    <div class="spec-item"><span>Contratista</span><strong>${data.contratista}</strong></div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Bloquear scroll de la página
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Devolver scroll
    }
}

// Cambiar la imagen principal al clicar en miniatura
function changeModalMainImage(src, element) {
    document.getElementById('modal-main-img').src = src;
    
    // Resaltar miniatura activa
    document.querySelectorAll('.modal-thumb').forEach(thumb => thumb.classList.remove('active'));
    if(element) element.classList.add('active');
}

/* ========================================================================================================================
                                            EVENTOS Y CARGA INICIAL
   ======================================================================================================================== */

// Cerrar modal al hacer clic fuera de la caja blanca
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});

// Al cargar la página
window.onload = () => {
    // 1. Dibujar todas las tarjetas
    renderProjects();

    // 2. Comprobar si venimos de otra página con un ID (ej: inicio)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    if (projectId && projectsData[projectId]) {
        openModal(projectId);
    }
};
