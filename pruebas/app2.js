// --- ELEMENTOS DEL DOM ---
const prayerDisplay = document.getElementById('prayer-display');
const startBtn = document.getElementById('start-btn');
const statusDiv = document.getElementById('status');

// --- TEXTO DE LA ORACIÓN ---
const textoOracionCorrecta = "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.";
let oracionCorrectaPalabras = []; // Array para guardar las palabras

// --- CONFIGURACIÓN DE SPEECH RECOGNITION ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isListening = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.continuous = true; // Queremos que siga escuchando
    recognition.interimResults = true; // ¡Esta es la clave para el tiempo real!

    // Evento que se dispara continuamente con los resultados
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        statusDiv.textContent = `Escuchando: "${transcript}"`;
        validarEnTiempoReal(transcript);
    };

} else {
    statusDiv.textContent = "Lo siento, tu navegador no soporta esta función.";
    startBtn.disabled = true;
}

// --- FUNCIONES PRINCIPALES ---

// 1. Función para preparar la pantalla con la oración
function setupPrayer() {
    // Limpiamos el contenedor por si acaso
    prayerDisplay.innerHTML = '';
    
    // Convertimos el string de la oración en un array de palabras
    // y quitamos los signos de puntuación para una comparación más fácil.
    oracionCorrectaPalabras = textoOracionCorrecta.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');

    // Creamos un <span> para cada palabra y lo añadimos al display
    oracionCorrectaPalabras.forEach(palabra => {
        const palabraSpan = document.createElement('span');
        palabraSpan.textContent = palabra + ' '; // Añadimos un espacio
        palabraSpan.classList.add('word'); // Clase por defecto (gris)
        prayerDisplay.appendChild(palabraSpan);
    });
}

// 2. Función que compara y colorea en tiempo real
function validarEnTiempoReal(textoHablado) {
    const palabrasHabladas = textoHablado.trim().toLowerCase().split(' ');
    const palabrasEnPantalla = prayerDisplay.querySelectorAll('span.word');

    palabrasEnPantalla.forEach((spanPalabra, index) => {
        // Reseteamos las clases de color
        spanPalabra.classList.remove('correct', 'incorrect');

        const palabraHabladaActual = palabrasHabladas[index];
        const palabraCorrectaActual = spanPalabra.textContent.trim().toLowerCase();

        if (palabraHabladaActual) {
            if (palabraHabladaActual === palabraCorrectaActual) {
                spanPalabra.classList.add('correct'); // Verde si coincide
            } else {
                spanPalabra.classList.add('incorrect'); // Rojo si no coincide
            }
        }
    });
}

// 3. Control del botón de Iniciar/Detener
startBtn.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        startBtn.textContent = '🎙️ Empezar a Rezar';
        statusDiv.textContent = "Práctica detenida. ¡Buen trabajo!";
        isListening = false;
    } else {
        recognition.start();
        startBtn.textContent = '🛑 Detener';
        statusDiv.textContent = "Habla ahora...";
        isListening = true;
    }
});

// --- INICIALIZACIÓN ---
// Llamamos a esta función al cargar la página para que todo esté listo.
window.onload = setupPrayer;
