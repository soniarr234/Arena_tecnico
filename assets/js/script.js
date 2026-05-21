/* ========================================================================================================================
                                            VARIABLES GLOBALES PARA EL CARRUSEL DEL MODAL
   ======================================================================================================================= */
let currentProjectGallery = [];
let currentImgIndex = 0;

/* ========================================================================================================================
                                            MENÚ MÓVIL (HAMBURGER)
   ======================================================================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuBtn && navLinks) {
        const closeMenu = () => {
            menuBtn.classList.remove('is-active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        };

        // Abrir/Cerrar al dar clic al botón
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            menuBtn.classList.toggle('is-active'); 
            navLinks.classList.toggle('active'); 
            body.classList.toggle('menu-open'); 
        });

        // Cerrar al hacer clic fuera (en la zona oscura)
        body.addEventListener('click', (e) => {
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
    }
});

/* ========================================================================================================================
                                            SLIDER PRINCIPAL (Control de errores añadido)
   ======================================================================================================================= */
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots-container');
let counter = 0;
let interval;

const initSlider = () => {
    // Si no existen diapositivas o contenedor de puntos en la página actual, salimos sin romper el script
    if (slides.length === 0 || !dotsContainer) return;

    slides.forEach((s, i) => {
        if (i === 0) s.classList.add('active');
        else s.classList.remove('active');
    });

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    startAutoPlay();
};

const updateUI = () => {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    
    if(slides[counter]) slides[counter].classList.add('active');
    if(dots[counter]) dots[counter].classList.add('active');
};

const nextSlide = () => {
    if (slides.length === 0) return;
    counter = (counter < slides.length - 1) ? counter + 1 : 0;
    updateUI();
};

const prevSlide = () => {
    if (slides.length === 0) return;
    counter = (counter > 0) ? counter - 1 : slides.length - 1;
    updateUI();
};

const goToSlide = (index) => {
    counter = index;
    updateUI();
    resetAutoPlay();
};

const startAutoPlay = () => {
    if (slides.length === 0) return;
    clearInterval(interval); 
    interval = setInterval(nextSlide, 9000);
};

const resetAutoPlay = () => { 
    clearInterval(interval); 
    startAutoPlay(); 
};

const setupEvents = () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

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

// Carga del Slider en el DOM
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    setupEvents();
});

/* ========================================================================================================================
                                            GESTIÓN DEL FORMULARIO (EmailJS)
   ======================================================================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit');
    const successMsg = document.getElementById('success-msg');

    if (contactForm && btnSubmit) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const originalBtnContent = btnSubmit.innerHTML;
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span>ENVIANDO...</span>';

            emailjs.sendForm('service_yw5zhtr', 'template_y4sozo6', this)
                .then(() => {
                    contactForm.classList.add('fade-out');

                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        if(successMsg) successMsg.style.display = 'block';

                        setTimeout(() => {
                            if(successMsg) {
                                successMsg.style.opacity = '0';
                                successMsg.style.transition = 'opacity 0.5s ease';
                            }

                            setTimeout(() => {
                                if(successMsg) {
                                    successMsg.style.display = 'none';
                                    successMsg.style.opacity = '1';
                                }
                                contactForm.reset();
                                contactForm.style.display = 'block';
                                btnSubmit.disabled = false;
                                btnSubmit.innerHTML = originalBtnContent;
                                setTimeout(() => contactForm.classList.remove('fade-out'), 50);
                            }, 500);
                        }, 5000);
                    }, 400);

                }, (error) => {
                    console.error('EmailJS Error:', error);
                    alert('Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = originalBtnContent;
                });
        });
    }
});

const projectsData = {

    'palacio-rincon': {
        title: 'Palacio El Rincón',
        desc: 'Dirección facultativa, coordinación de seguridad y Project Manager para obras de rehabilitación de Palacio El Ricón.',
        cost: '2.500.000€',
        promotor: 'El Rincón Estate, S.L.',
        contratista: 'Antana',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262075/IMG-20260514-WA0002_likvxs.jpg',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262075/IMG-20260514-WA0002_likvxs.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262077/IMG-20260514-WA0000_gxtnun.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262076/IMG-20260514-WA0004_gpi80o.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262076/IMG-20260514-WA0003_swxfe7.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262076/IMG-20260514-WA0001_t4r7n5.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262076/IMG-20260514-WA0021_upgibi.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262076/IMG-20260514-WA0020_pscdcs.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262074/IMG-20260514-WA0023_sn1tma.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262074/IMG-20260514-WA0022_y8dyrp.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262072/IMG-20260514-WA0026_e7n1zo.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262071/IMG-20260514-WA0030_qoiz9g.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262071/IMG-20260514-WA0027_wdan1t.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262071/IMG-20260514-WA0024_mukkfa.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262071/IMG-20260514-WA0025_ahmgbn.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262070/IMG-20260514-WA0028_wtf0dm.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262069/IMG-20260514-WA0029_sppwq5.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262068/IMG-20260514-WA0032_jja49h.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262067/IMG-20260514-WA0044_r7k7px.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262067/IMG-20260514-WA0033_mvn8t4.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262066/IMG-20260514-WA0034_qcjnhb.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262066/IMG-20260514-WA0031_yvrbj1.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262066/IMG-20260514-WA0037_oaihqp.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262065/IMG-20260514-WA0035_b7qo5d.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262065/IMG-20260514-WA0036_tjo8uo.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262064/IMG-20260514-WA0040_cu7bij.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262064/IMG-20260514-WA0038_tcqnsf.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262064/IMG-20260514-WA0043_umsuzy.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262063/IMG-20260514-WA0039_zkeihq.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262063/IMG-20260514-WA0041_dii4yj.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262063/IMG-20260514-WA0042_ueba5s.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262061/IMG-20260514-WA0046_a65iix.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262061/IMG-20260514-WA0045_fnypju.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262061/IMG-20260514-WA0047_lpr8jm.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779262061/IMG-20260514-WA0048_ftzprb.jpg',
        ]
    },

    'edificio-larra': {
        title: 'Edificio histórico Larra',
        desc: 'Dirección facultativa, coordinación de seguridad y salud para obras de rehabilitación de Edificio histórico Larra 12-4 (Madrid).',
        cost: '1.500.000€',
        promotor: 'Ephimera S.L',
        contratista: 'Contrucciones AG',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0010_vvlgwf.jpg',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0010_vvlgwf.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0006_d0pwr2.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0007_hgmxcj.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261428/IMG-20260514-WA0011_cr3vz3.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0005_hjzzvo.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261429/IMG-20260514-WA0009_ocvjyw.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261427/IMG-20260514-WA0008_jpcdzz.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261427/IMG-20260514-WA0012_agoy4a.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261427/IMG-20260514-WA0014_xnvblr.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261427/IMG-20260514-WA0019_wfcdva.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261426/IMG-20260514-WA0015_ltrypi.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261426/IMG-20260514-WA0013_kugytr.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261426/IMG-20260514-WA0016_uq8qjl.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261426/IMG-20260514-WA0018_tth7sh.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779261426/IMG-20260514-WA0017_ap1ueu.jpg'
        ]
    },

    'promocion-residencial-carabanchel': {
        title: 'Promoción residencial en Carabanchel',
        desc: 'Dirección facultativa, coordinación de seguridad y salud y servicios de Project Manager en Carabanchel (Madrid).',
        cost: '4.000.000€',
        promotor: '3SUCCES AML INVESTMENT S.L.U',
        contratista: 'PGM',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779266796/img1_carrousel_exbt3p.png',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779266796/img1_carrousel_exbt3p.png',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343309/IMG-20260520-WA0026_kqkm2q.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343308/IMG-20260520-WA0024_prhvz9.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343309/IMG-20260520-WA0022_duaw2f.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343309/IMG-20260520-WA0023_jo9ovu.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343309/IMG-20260520-WA0027_o9pik1.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343309/IMG-20260520-WA0021_w008ij.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779343310/IMG-20260520-WA0025_vhoxrd.jpg',
        ]
    },
    
    'fachada-jorge-juan': {
        title: 'Rehabilitación de Fachada Protegida en Jorge Juan',
        desc: 'Redacción de proyecto de rehabilitación de fachada singular en edificio con protección en Calle Jorge Juan (Madrid).',
        cost: '80.000€',
        promotor: 'Comunidad de propietarios',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779266798/img3_carrousel_loesic.png',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779266798/img3_carrousel_loesic.png'
        ]
    },

    'vivienda-unifamiliar-cotos': {
        title: 'Vivienda unifamiliar en Cotos de Monterrey',
        desc: 'Dirección facultativa, coordinación de seguridad y salud y servicios de Project Manager en Cotos de Monterrey (Madrid).',
        cost: '500.000€',
        promotor: 'Particular',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779293350/IMG-20260520-WA0015_wxxkmj.jpg',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779293350/IMG-20260520-WA0015_wxxkmj.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779293350/IMG-20260520-WA0018_tpsahn.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779293350/IMG-20260520-WA0017_knuibz.jpg',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779293350/IMG-20260520-WA0016_zmhmil.jpg'
        ]
    },

    'vivienda-unifamiliar-hinojosa': {
        title: 'Vivienda unifamiliar en Hinojosa de San Vicente',
        desc: 'Dirección facultativa, coordinación de seguridad y salud y servicios de Project Manager en Hinojosa de San Vicente (Toledo).',
        cost: '100.000€',
        promotor: 'Particular',
        mainImg: 'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779364480/file_0000000065d0720ab57db29cdfd82cb6_k5ihe3.png',
        gallery: [
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779364480/file_0000000065d0720ab57db29cdfd82cb6_k5ihe3.png',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779364478/file_0000000076f8720aa923fad41079653a_jhjqtu.png',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779364479/file_000000009d1c71f48ec0c22f36d09dbe_zqv8xz.png',
            'https://res.cloudinary.com/djeqw1kqi/image/upload/q_auto/f_auto/v1779364479/file_00000000dbfc7246a7daa9254b7b9e0f_clvjvt.png'
        ]
    },
};

/* ========================================================================================================================
                                            GENERACIÓN AUTOMÁTICA DE PROYECTOS Y MODAL
   ======================================================================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Pintar proyectos
    renderProjectGrid();

    // Comprobar parámetros URL
    const urlParams = new URLSearchParams(window.location.search);
    const proyectoId = urlParams.get('id');

    if (proyectoId && projectsData[proyectoId]) {
        setTimeout(() => {
            openModal(proyectoId);
        }, 100);
    }
});

function renderProjectGrid() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = Object.keys(projectsData).map(key => {
        const project = projectsData[key];
        return `
            <div class="project-card" onclick="openModal('${key}')">
                <img src="${project.mainImg}" alt="${project.title}">
                <h3>${project.title}</h3>
            </div>
        `;
    }).join('');
}

function openModal(projectKey) {
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const project = projectsData[projectKey];

    if (!project || !modal || !modalBody) return;

    currentProjectGallery = project.gallery || [project.mainImg];
    currentImgIndex = 0;

    modalBody.innerHTML = `
        <div class="modal-body-wrapper">
            <div class="modal-image-container">
                <!-- Foto principal limpia sin flechas -->
                <img src="${currentProjectGallery[0]}" class="modal-header-img" id="modalMainImage" alt="${project.title}">
                
                <!-- Las flechas ahora envuelven horizontalmente al contenedor de miniaturas de abajo -->
                <div class="thumbnails-slider-wrapper">
                    <button class="thumb-arrow prev-thumb" id="prevThumbBtn" onclick="scrollThumbnails(-1); event.stopPropagation();">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    
                    <div class="modal-thumbnails" id="modalThumbnails">
                        ${currentProjectGallery.map((imgUrl, index) => `
                            <img src="${imgUrl}" 
                                class="modal-thumb ${index === 0 ? 'active' : ''}" 
                                alt="Miniatura ${index + 1}"
                                data-index="${index}"
                                onclick="cambiarImagenPrincipal(this, ${index}); event.stopPropagation();">
                        `).join('')}
                    </div>
                    
                    <button class="thumb-arrow next-thumb" id="nextThumbBtn" onclick="scrollThumbnails(1); event.stopPropagation();">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>

            <div class="modal-info">
                <h2>${project.title}</h2>
                <p>${project.desc}</p>
                <div class="project-specs">
                    <div class="spec-item"><span>Importe M.E.</span><strong>${project.cost}</strong></div>
                    <div class="spec-item"><span>Promotor</span><strong>${project.promotor}</strong></div>
                    ${project.contratista ? `
                        <div class="spec-item"><span>Contratista</span><strong>${project.contratista}</strong></div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("project-modal");
    if (modal && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.replaceState({}, document.title, url.pathname);
    }
}

function cambiarImagenPrincipal(thumbElement, index) {
    currentImgIndex = index;
    const nuevaSrc = currentProjectGallery[currentImgIndex];
    
    const mainImg = document.getElementById("modalMainImage");
    if (mainImg) mainImg.src = nuevaSrc;

    const thumbs = document.querySelectorAll(".modal-thumb");
    thumbs.forEach(t => t.classList.remove("active"));
    
    if (thumbElement) {
        thumbElement.classList.add("active");
    } else {
        const activeThumb = document.querySelector(`.modal-thumb[data-index="${index}"]`);
        if (activeThumb) activeThumb.classList.add("active");
    }
}

// Nueva función de desplazamiento para la fila inferior de miniaturas
function scrollThumbnails(direction) {
    const container = document.getElementById("modalThumbnails");
    if (!container) return;
    
    const scrollAmount = 200; // Píxeles que se desplazará en cada clic
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth' // Desplazamiento animado suave
    });
}

// Mantenemos la navegación con teclado físico para cambiar la foto grande de arriba cómodamente
function navigateModalImage(direction) {
    if (currentProjectGallery.length <= 1) return;
    currentImgIndex += direction;

    if (currentImgIndex >= currentProjectGallery.length) currentImgIndex = 0;
    else if (currentImgIndex < 0) currentImgIndex = currentProjectGallery.length - 1;

    cambiarImagenPrincipal(null, currentImgIndex);
    
    // Auto-scrollear la miniatura activa en vista si se usan las flechas del teclado
    const activeThumb = document.querySelector(`.modal-thumb[data-index="${currentImgIndex}"]`);
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Evento global unificado para clics y cierre del modal de forma segura sin pisar al menú
document.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (modal && modal.style.display === 'block' && e.target === modal) {
        closeModal();
    }
});

// Soporte teclado físico
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('project-modal');
    if (modal && modal.style.display === 'block') {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") navigateModalImage(1);
        if (e.key === "ArrowLeft") navigateModalImage(-1);
    }
});
