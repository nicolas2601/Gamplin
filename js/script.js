document.addEventListener('DOMContentLoaded', function() {

    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Duración de la animación
        once: true // La animación ocurre solo una vez
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('bg-dark-transparent'); // Asegura que la clase transparente se quite
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('bg-dark-transparent'); // Vuelve a añadir la transparencia si está arriba
        }
    });

    // --- Smooth Scrolling for Navbar Links ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Solo previene el default y hace scroll si es un enlace interno (#)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Cierra el menú de navegación en móviles después de hacer clic
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const toggler = document.querySelector('.navbar-toggler');
                        toggler.click(); // Simula un clic en el toggler para cerrar
                    }

                    // Actualiza la clase 'active' (opcional, Bootstrap puede manejarlo con scrollspy)
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // --- EmailJS Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formStatus.innerHTML = '<div class="alert alert-info">Enviando...</div>';

            // Configuración de EmailJS - Obtén estos IDs desde https://dashboard.emailjs.com/admin
            const serviceID = 'service_olry6gl'; // Reemplazar con tu Service ID válido
            const templateID = 'service_olry6gl'; // Reemplazar con tu Template ID válido

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    formStatus.innerHTML = '<div class="alert alert-success">¡Mensaje enviado con éxito! Gracias por contactarnos.</div>';
                    contactForm.reset(); // Limpia el formulario
                }, (err) => {
                    formStatus.innerHTML = `<div class="alert alert-danger">Error al enviar el mensaje: ${JSON.stringify(err)}</div>`;
                    console.error('Error de EmailJS:', err);
                });
        });
    }

    // --- Chatbot FAQ Functionality ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-user-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // Base de conocimientos simple para el chatbot
    const faq = {
        "hola": "¡Hola! ¿En qué puedo ayudarte sobre Glamping Café Ginebra?",
        "precio": "El precio por noche varía según la temporada y disponibilidad. Por favor, contáctanos directamente para una cotización precisa.",
        "ubicacion": "Estamos ubicados en la Vereda El Banco, Támara, Casanare. Puedes ver el mapa en la sección de Contacto.",
        "servicios": "Ofrecemos alojamiento en domo geodésico de lujo, café de origen, opciones de almuerzo típico (con reserva) y actividades al aire libre como senderismo.",
        "reservar": "Puedes enviarnos un mensaje a través del formulario de contacto o contactarnos directamente por WhatsApp para hacer tu reserva.",
        "mascotas": "Actualmente no permitimos mascotas para garantizar la tranquilidad de todos nuestros huéspedes. ¡Gracias por tu comprensión!",
        "jacuzzi": "Sí, nuestro domo cuenta con jacuzzi privado para que te relajes.",
        "cafe": "¡Claro! Servimos delicioso café de origen de Támara. Puedes disfrutarlo durante tu estadía.",
        "gracias": "¡De nada! Si tienes más preguntas, no dudes en consultar."
        // Añade más preguntas y respuestas
    };

    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', sender); // sender puede ser 'user' o 'bot'
        messageDiv.textContent = message;
        chatbotBody.appendChild(messageDiv);
        // Scroll automático al último mensaje
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();
        let bestMatch = "Lo siento, no entendí tu pregunta. ¿Puedes reformularla? También puedes contactarnos directamente por WhatsApp.";
        let highestScore = 0;

        // Busca la mejor coincidencia basada en palabras clave
        for (const keyword in faq) {
            const keywords = keyword.split(' ');
            let currentScore = 0;
            keywords.forEach(kw => {
                if (lowerCaseMessage.includes(kw)) {
                    currentScore++;
                }
            });

            // Simple ponderación: si la pregunta del usuario es exactamente la palabra clave, puntaje alto
            if (lowerCaseMessage === keyword) {
                currentScore += keywords.length * 2; // Bonus por coincidencia exacta
            }

            if (currentScore > highestScore) {
                highestScore = currentScore;
                bestMatch = faq[keyword];
            }
        }

        // Si no hay una coincidencia razonable, usa la respuesta por defecto
        if (highestScore < 1 && lowerCaseMessage.length > 3) { // Evita responder a mensajes muy cortos sin coincidencia
             bestMatch = "No estoy seguro de cómo responder a eso. Para información detallada, por favor contáctanos por WhatsApp o usa el formulario.";
        }

        return bestMatch;
    }

    if (chatbotToggle && chatbotWindow && chatbotClose && chatbotSend && chatbotInput) {
        chatbotToggle.addEventListener('click', () => {
            const isDisplayed = chatbotWindow.style.display === 'block';
            chatbotWindow.style.display = isDisplayed ? 'none' : 'block';
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });

        chatbotSend.addEventListener('click', () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addChatMessage(userMessage, 'user');
                chatbotInput.value = ''; // Limpia el input

                // Simula una pequeña demora antes de la respuesta del bot
                setTimeout(() => {
                    const botResponse = getBotResponse(userMessage);
                    addChatMessage(botResponse, 'bot');
                }, 500);
            }
        });

        // Permite enviar con la tecla Enter
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatbotSend.click();
            }
        });
    }

    // --- WhatsApp Button Visibility ---
    const whatsappButton = document.getElementById('whatsapp-float-button');
    if (whatsappButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Muestra el botón después de hacer scroll 300px
                whatsappButton.style.opacity = '1';
                whatsappButton.style.visibility = 'visible';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.visibility = 'hidden';
            }
        });
        // Estado inicial (oculto)
        whatsappButton.style.opacity = '0';
        whatsappButton.style.visibility = 'hidden';
        whatsappButton.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';
    }

    // --- Review Form Handling ---
    const reviewForm = document.getElementById('review-form');
    const reviewStatus = document.getElementById('review-status');
    const dynamicReviewsContainer = document.getElementById('dynamic-reviews-container');
    const noReviewsMessage = document.getElementById('no-reviews-message');
    const reviewsKey = 'glampingReviews';

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
        if (dynamicReviewsContainer && noReviewsMessage) {
            dynamicReviewsContainer.innerHTML = ''; // Limpia el contenedor
            if (reviews.length === 0) {
                noReviewsMessage.style.display = 'block';
            } else {
                noReviewsMessage.style.display = 'none';
                reviews.forEach(review => {
                    const reviewElement = createReviewElement(review);
                    dynamicReviewsContainer.appendChild(reviewElement);
                });
            }
        }
    }

    function createReviewElement(review) {
        const col = document.createElement('div');
        col.classList.add('col-lg-6', 'mb-4'); // Ajusta las clases según tu diseño

        const card = document.createElement('div');
        card.classList.add('card', 'review-card', 'shadow-sm', 'h-100');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const header = document.createElement('div');
        header.classList.add('d-flex', 'align-items-center', 'mb-3');

        const nameRatingDiv = document.createElement('div');
        const nameEl = document.createElement('h6');
        nameEl.classList.add('card-subtitle', 'mb-1');
        nameEl.textContent = review.name;
        const ratingEl = document.createElement('div');
        ratingEl.classList.add('text-warning'); // Clase para estrellas
        ratingEl.innerHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        nameRatingDiv.appendChild(nameEl);
        nameRatingDiv.appendChild(ratingEl);
        header.appendChild(nameRatingDiv);

        const textEl = document.createElement('p');
        textEl.classList.add('card-text', 'fst-italic');
        textEl.textContent = `"${review.text}"`;

        cardBody.appendChild(header);
        cardBody.appendChild(textEl);
        card.appendChild(cardBody);
        col.appendChild(card);

        return col;
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('review-name').value;
            const text = document.getElementById('review-text').value;
            const rating = parseInt(document.getElementById('review-rating').value);

            if (name && text && rating) {
                const newReview = { name, text, rating, date: new Date().toISOString() };
                const reviews = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
                reviews.push(newReview);
                localStorage.setItem(reviewsKey, JSON.stringify(reviews));

                if (reviewStatus) reviewStatus.innerHTML = '<div class="alert alert-success">¡Gracias por tu reseña!</div>';
                reviewForm.reset();
                loadReviews(); // Recarga las reseñas para mostrar la nueva
            } else {
                if (reviewStatus) reviewStatus.innerHTML = '<div class="alert alert-danger">Por favor, completa todos los campos.</div>';
            }
        });
    }

    // Carga inicial de reseñas (si el contenedor existe)
    if (dynamicReviewsContainer) {
        loadReviews();
    }

});

// Manejo del botón 'Escribir Reseña'
document.getElementById('show-review-form').addEventListener('click', function() {
    const form = document.getElementById('review-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});