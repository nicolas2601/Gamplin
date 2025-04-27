// Custom JavaScript for Gamplin Támara

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"], footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar.fixed-top')?.offsetHeight || 56;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Initialize animations or other JS functionalities here
    console.log('Gamplin Rental Site Ready!');

    // Example: Smooth scroll for navigation links (requires Bootstrap 5 JS)
    // Add smooth scrolling to all links
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // --- Anime.js Animations ---

    // Hero Section - Fade in elements
    anime.timeline({ easing: 'easeOutExpo', duration: 1000 })
        .add({
            targets: '.hero-section .anime-target',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(250, { start: 300 }) // Stagger animation for each element, start after 300ms
        });

    // About Section - Scroll Animation
    const aboutSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '#about .anime-scroll-target',
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    duration: 1200,
                    easing: 'easeOutCubic',
                    delay: 100
                });
                aboutSectionObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.25 }); // Trigger when 25% visible

    const aboutSectionTarget = document.querySelector('#about .anime-scroll-target');
    if (aboutSectionTarget) {
        aboutSectionObserver.observe(aboutSectionTarget);
    }

    // --- WhatsApp Button Functionality ---
    const whatsappNumber = '573502328517'; // <-- IMPORTANTE: Reemplaza con el número real (ej: 573101234567)
    const whatsappMessage = encodeURIComponent('Hola! Estoy interesado en el alquiler del gamplin en Támara.');
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const setupWhatsAppButton = (buttonId) => {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Previene comportamiento por defecto si es un enlace <a>
                window.open(whatsappURL, '_blank');
            });
            // Si es un enlace <a>, también actualiza el href para accesibilidad y SEO
            if (btn.tagName === 'A') {
                btn.href = whatsappURL;
                btn.target = '_blank'; // Asegura que abra en nueva pestaña
                btn.rel = 'noopener noreferrer'; // Buenas prácticas de seguridad
            }
        }
    };

    setupWhatsAppButton('whatsapp-button'); // Botón en sección contacto
    setupWhatsAppButton('whatsapp-float-button'); // Botón flotante
    setupWhatsAppButton('footer-whatsapp-link'); // Enlace en footer

    // --- Form Submission Handling (Formspree Recommendation) ---
    // El formulario HTML ya está configurado con el atributo 'action' apuntando a Formspree.
    // Formspree manejará el envío directamente.
    // Asegúrate de reemplazar 'TU_ENDPOINT_FORMSPREE' en index.html con tu URL real de Formspree.
    // Puedes añadir un listener para mostrar un mensaje de 'enviando' o 'éxito' si lo deseas,
    // pero Formspree redirigirá a una página de agradecimiento por defecto.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
         console.log('Formulario de contacto listo. Asegúrate de configurar el endpoint de Formspree en index.html.');
         // Opcional: Añadir feedback visual al enviar
         contactForm.addEventListener('submit', function() {
            // Podrías deshabilitar el botón de envío aquí para prevenir doble click
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if(submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }
            // Formspree se encargará del resto gracias al atributo 'action'
         });
    }

    // Inicializar Tooltips de Bootstrap (para el botón flotante)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Asegurar que el botón flotante tenga el tooltip configurado
    const floatButton = document.getElementById('whatsapp-float-button');
    if (floatButton && !floatButton.getAttribute('data-bs-original-title')) { // Verifica si el tooltip ya fue inicializado
        floatButton.setAttribute('data-bs-toggle', 'tooltip');
        floatButton.setAttribute('data-bs-placement', 'left');
        floatButton.setAttribute('title', 'Contactar por WhatsApp');
        new bootstrap.Tooltip(floatButton); // Inicializa el tooltip si no lo estaba
    }

});