// --- ELEMENTOS DEL DOM ---
const prayerDisplay = document.getElementById('prayer-display');
const startBtn = document.getElementById('start-btn');
const statusDiv = document.getElementById('status');

// --- TEXTO DE LA ORACIÓN ---
const textoOracionCorrecta = "Padre nuestro que estás en el cielo santificado sea tu Nombre venga a nosotros tu Reino hágase tu voluntad en la tierra como en el cielo Danos hoy nuestro pan de cada día perdona nuestras ofensas como también nosotros perdonamos a los que nos ofenden no nos dejes caer en la tentación y líbranos del mal Amén";
// OJO: Le he quitado las comas y puntos para una comparación más sencilla.
const oracionCorrectaPalabras = textoOracionCorrecta.toLowerCase().split(' ');

// --- CONFIGURACIÓN DE SPEECH RECOGNITION ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isListening = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.continuous = true;
    recognition.interimResults = true;

    // Este evento es el núcleo de la nueva lógica
    recognition.onresult = (event) => {
        // Limpiamos la pantalla en cada actualización para redibujar todo
        prayerDisplay.innerHTML = '';
        
        let transcriptCompleto = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcriptCompleto += event.results[i][0].transcript;
        }
        
        // Dividimos el texto escuchado en palabras
        const palabrasHabladas = transcriptCompleto.trim().toLowerCase().split(' ');

        // Creamos y validamos cada palabra sobre la marcha
        palabrasHabladas.forEach((palabraHablada, index) => {
            if (palabraHablada === '') return; // Ignorar si está vacío

            const palabraSpan = document.createElement('span');
            palabraSpan.textContent = palabraHablada + ' ';

            // Comparamos la palabra hablada con la palabra que debería ir en esa posición
            if (oracionCorrectaPalabras[index] && palabraHablada === oracionCorrectaPalabras[index]) {
                palabraSpan.classList.add('correct'); // Verde
            } else {
                palabraSpan.classList.add('incorrect'); // Rojo
            }
            
            prayerDisplay.appendChild(palabraSpan);
        });
    };

} else {
    statusDiv.textContent = "Lo siento, tu navegador no soporta esta función.";
    startBtn.disabled = true;
}

// --- CONTROL DEL BOTÓN ---
startBtn.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        startBtn.textContent = '🎙️ Empezar de Nuevo';
        statusDiv.textContent = "Práctica detenida. ¡Buen trabajo!";
        isListening = false;
    } else {
        // Limpiamos la pantalla antes de empezar una nueva grabación
        prayerDisplay.innerHTML = ''; 
        recognition.start();
        startBtn.textContent = '🛑 Detener';
        statusDiv.textContent = "Habla ahora...";
        isListening = true;
    }
});
