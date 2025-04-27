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
    const whatsappNumber = '573228082810'; // Número de WhatsApp proporcionado
    const whatsappMessage = encodeURIComponent('Hola! Estoy interesado en Glamping Café Ginebra.'); // Mensaje actualizado
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    const instagramURL = 'https://www.instagram.com/glampingcafeginebra'; // URL de Instagram

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

    // Inicializar AOS (Animate On Scroll)
    // Asegúrate de que la librería AOS esté incluida en tu HTML
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Duración de la animación en ms
            once: true // Si la animación debe ocurrir solo una vez
        });
    } else {
        console.warn('AOS library not found. Skipping initialization.');
    }

    // --- Chatbot FAQ ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // Base de datos de Preguntas Frecuentes (FAQs)
    const faqs = [
        {
            "pregunta": "¿Dónde están ubicados?",
            "respuesta": "Nos encontramos en la vereda Guaseque, Támara, Casanare, Colombia, a aproximadamente 2 horas de Yopal."
        },
        {
            "pregunta": "¿Cómo puedo hacer una reserva?",
            "respuesta": `Puedes hacer una reserva contactándonos directamente por <a href="${whatsappURL}" target="_blank" rel="noopener noreferrer">WhatsApp</a> o a través de nuestro perfil de <a href="${instagramURL}" target="_blank" rel="noopener noreferrer">Instagram</a>.`
        },
        {
            "pregunta": "¿Se permite llevar mascotas?",
            "respuesta": "Sí, somos pet-friendly. Aceptamos mascotas siempre y cuando estén bajo la supervisión constante de sus dueños."
        },
        {
            "pregunta": "¿Qué tipo de actividades ofrecen?",
            "respuesta": "Ofrecemos experiencias únicas como senderismo por paisajes cafeteros, fogatas nocturnas bajo las estrellas y la oportunidad de conocer el proceso del café artesanal."
        },
        {
            "pregunta": "¿Hay WiFi disponible?",
            "respuesta": "Queremos que te desconectes para conectar con la naturaleza. Por eso, no ofrecemos servicio de WiFi en el glamping."
        },
        {
            "pregunta": "¿Cuál es el precio?",
            "respuesta": `El precio puede variar según la temporada y el número de personas. Por favor, contáctanos por <a href="${whatsappURL}" target="_blank">WhatsApp</a> para darte una cotización precisa.`
        },
        {
            "pregunta": "¿Qué incluye la estadía?",
            "respuesta": "La estadía generalmente incluye alojamiento en el glamping, desayuno y acceso a las áreas comunes. Algunas actividades pueden tener costo adicional. Confirma los detalles al reservar."
        }
    ];

    // Función para añadir mensajes al chat
    function appendMessage(text, className) {
        if (!chatbotMessages) return; // Add check
        const messageElement = document.createElement('div');
        messageElement.classList.add(className, 'message', 'mb-2'); // Added margin bottom
        messageElement.innerHTML = text; // Usar innerHTML para permitir enlaces
        chatbotMessages.appendChild(messageElement);
        // Scroll automático al último mensaje
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Mostrar/Ocultar Chatbot
    if (chatbotToggle && chatbotWindow && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
            chatbotToggle.style.display = 'none'; // Ocultar botón al abrir
            // Saludo inicial si el chat está vacío
            if (chatbotMessages && chatbotMessages.children.length === 0) {
                 setTimeout(() => {
                     appendMessage('¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', 'bot-message');
                 }, 300);
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
            chatbotToggle.style.display = 'block'; // Mostrar botón al cerrar
        });
    } else {
        console.warn('Chatbot toggle/window/close elements not found.');
    }

    // Enviar mensaje y buscar respuesta
    const sendMessage = () => {
        if (!chatbotInput || !chatbotMessages) {
             console.warn('Chatbot input or messages element not found.');
             return;
        }
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;
        const userMessageLower = userMessage.toLowerCase();

        // Mostrar mensaje del usuario
        appendMessage(userMessage, 'user-message'); // Show original case message
        chatbotInput.value = '';
        chatbotInput.focus(); // Keep focus on input

        // Buscar respuesta en FAQs (búsqueda simple por inclusión)
        let foundAnswer = null;
        let bestMatchScore = 0;

        for (const faq of faqs) {
            const questionLower = faq.pregunta.toLowerCase();
            let currentScore = 0;

            // Simple keyword matching (increase score for each match)
            const keywords = questionLower.replace(/¿|\?|¡|!/g, '').split(' ');
            keywords.forEach(keyword => {
                if (keyword.length > 2 && userMessageLower.includes(keyword)) {
                    currentScore++;
                }
            });

            // Prioritize if user message is very similar to question
            if (userMessageLower.includes(questionLower.substring(0, Math.max(10, Math.floor(questionLower.length * 0.6))))) {
                 currentScore += 2; // Boost score for partial start match
            }
            if (questionLower.includes(userMessageLower.substring(0, Math.max(10, Math.floor(userMessageLower.length * 0.6))))) {
                 currentScore += 1; // Lower boost if question contains user message start
            }

            if (currentScore > bestMatchScore) {
                bestMatchScore = currentScore;
                foundAnswer = faq.respuesta;
            }
        }

        // Mostrar respuesta del bot
        setTimeout(() => {
            if (foundAnswer && bestMatchScore > 0) { // Require at least some match
                appendMessage(foundAnswer, 'bot-message');
            } else {
                // Use the WhatsApp URL variable defined earlier
                const defaultMessage = `No estoy seguro de entender tu pregunta. 🤔 Puedes intentar reformularla o contactarnos directamente por <a href="${whatsappURL}" target="_blank">WhatsApp</a>.`;
                appendMessage(defaultMessage, 'bot-message');
            }
        }, 600); // Simular tiempo de respuesta
    };

    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission if it's inside a form
                sendMessage();
            }
        });
    } else {
         console.warn('Chatbot send button or input element not found.');
    }

    // Opcional: Saludo inicial si el chatbot está visible al cargar la página
    // (El código en chatbotToggle click ya maneja el saludo al abrir)
    // if (chatbotWindow && chatbotMessages && window.getComputedStyle(chatbotWindow).display === 'flex') {
    //     if (chatbotMessages.children.length === 0) {
    //          setTimeout(() => {
    //              appendMessage('¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', 'bot-message');
    //          }, 1000);
    //     }
    // }

});