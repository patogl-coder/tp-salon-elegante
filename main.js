// ==============================================================================
//           JAVASCRIPT PRINCIPAL - SALÓN ELEGANTE
// ==============================================================================

// ==============================================================================
// 1. DATA ARRAY: INFO CLAVE PARA CARGA DINÁMICA (¡Requisito Académico!)
// ==============================================================================

const datosServicios = [
    { 
        titulo: "Casamientos", 
        descripcion: "Organizamos casamientos elegantes y personalizadas.", 
        imagen: "images/boda.jpg",
        enlace_texto: "Reservar",
        value_select: "Casamientos"
    },
    { 
        titulo: "Fiestas de 15", 
        descripcion: "Un momento inolvidable para celebrar en grande.", 
        imagen: "images/quince.jpg",
        enlace_texto: "Reservar",
        value_select: "Fiestas de 15"
    },
    { 
        titulo: "Cumpleaños", 
        descripcion: "Ambiente ideal para festejar con amigos y familia.", 
        imagen: "images/cumpleaños.jpg",
        enlace_texto: "Reservar",
        value_select: "Cumpleaños"
    },
    { 
        titulo: "Eventos Corporativos", 
        descripcion: "Salón equipado para presentaciones y reuniones.", 
        imagen: "images/empresa.jpg",
        enlace_texto: "Reservar",
        value_select: "Eventos Corporativos"
    }
];

// Función para crear las tarjetas leyendo el Array
function cargarServicios() {
    // Busca dónde va el carrusel en el HTML
    const track = document.querySelector('.carousel-track');
    let htmlContent = '';

    datosServicios.forEach(servicio => {
        // Acá generamos el HTML de cada tarjeta
        htmlContent += `
            <div class="card slide" 
                 style="background-image: url(${servicio.imagen}); background-size: cover; background-position: center;">
                <h3>${servicio.titulo}</h3>
                <p>${servicio.descripcion}</p>
                <a href="#formulario" class="btn">Reservar</a>
            </div>
        `;
    });
    
    // Lo tiramos adentro del track para que aparezca
    track.innerHTML = htmlContent;
}


// ==============================================================================
// 2. LÓGICA DEL CARRUSEL E INTERACCIÓN (Solo en index.html)
// ==============================================================================

// Hacemos este IF para que el script no rompa en las páginas 'nosotros.html' o 'contacto.html'
if (document.querySelector('.carousel')) {
    
    // Primero, cargamos los servicios para que existan en el HTML
    cargarServicios(); 

    // Ahora sí, definimos las variables y seleccionamos los elementos que acabamos de crear
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-track .card.slide'); // Las tarjetas que se insertaron
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carousel = document.querySelector('.carousel'); 

    let currentIndex = 0;

    /**
     * Función que mueve el carrusel (el efecto de desplazamiento)
     */
    function updateCarousel() {
      const width = carousel.clientWidth;
      
      track.style.transform = `translateX(-${currentIndex * width}px)`;
      
      // Deshabilita los botones si llegamos al principio o al final
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === slides.length - 1;
    }

    // Evento del botón "Siguiente"
    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Evento del botón "Anterior"
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Ajuste al cambiar el tamaño de la pantalla
    window.addEventListener('resize', updateCarousel);
    
    // ======================================
    // LÓGICA DE AUTOCOMPLETADO DEL FORMULARIO
    // ======================================

    const reservaBtns = document.querySelectorAll('.card.slide .btn');
    const eventoSelect = document.getElementById('evento');
    const formularioSection = document.getElementById('formulario');

    // Le ponemos el evento click a cada botón de reserva
    reservaBtns.forEach(button => {
        
        const card = button.closest('.card.slide'); 
        const eventTitle = card.querySelector('h3').textContent.trim();
        
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // Buscamos la opción en el select que coincida con el título
            for (let i = 0; i < eventoSelect.options.length; i++) {
                if (eventoSelect.options[i].text.trim() === eventTitle) {
                    eventoSelect.value = eventoSelect.options[i].value;
                    break;
                }
            }
            
            // Scroll animado hacia el formulario
            formularioSection.scrollIntoView({ behavior: 'smooth' });
            
            // Dejamos el cursor en el primer campo
            document.getElementById('nombre').focus();
        });
    });

    // Esto inicializa el carrusel una vez que todo el contenido está cargado y listo
    updateCarousel();

} // Cierre del IF que controla la lógica del carrusel


// ==============================================================================
// 3. LÓGICA DE VALIDACIÓN Y ENVÍO DEL FORMULARIO (Funciona en todas las páginas)
// ==============================================================================

const form = document.getElementById('form-reserva');
const resultado = document.getElementById('resultado');

// Chequeamos que el formulario exista antes de añadir el evento
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // Capturamos todos los datos (el .trim() es para limpiar espacios en blanco)
        const data = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            evento: document.getElementById('evento').value,
            fecha: document.getElementById('fecha').value,
            mensaje: document.getElementById('mensaje').value.trim()
        };

        // Validación: Si falta alguno de estos, mostramos un error
        if (data.nombre === "" || data.email === "" || data.evento === "") {
            resultado.textContent = "¡Ey! Por favor, completa los campos Nombre, Email y Tipo de Evento.";
            resultado.style.color = "#ff5252"; // Rojo de error
            return;
        }
        
        // Simulación de Envío (¡Acá iría el código real de envío a un servidor!)
        
        // Mensaje de éxito
        const eventoTexto = form.querySelector(`#evento option[value="${data.evento}"]`).textContent;

        resultado.innerHTML = `
            ¡Gracias, <strong>${data.nombre.split(' ')[0]}</strong>! 
            Tu solicitud para <strong>${eventoTexto}</strong> fue enviada. ¡Te contactamos pronto!
        `;
        resultado.style.color = "#128712"; // Verde de éxito
        form.reset(); // Vaciamos el formulario
        
        // Ocultamos el mensaje después de 7 segundos
        setTimeout(() => {
            resultado.textContent = '';
        }, 7000);
    });
}