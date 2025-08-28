// Referencias a los elementos del HTML
const prayerBox = document.getElementById('prayer-box');
const statusDiv = document.getElementById('status');

// El texto completo y correcto de la oración que queremos validar.
const textoOracionCorrecta = "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.";

// Comprobamos si el navegador es compatible con la Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // Configuración del reconocimiento de voz
    recognition.lang = 'es-MX'; // ¡Importante! Especificar el idioma a español de México
    recognition.continuous = false; // Solo queremos capturar una frase/oración, no de forma continua
    recognition.interimResults = false; // No queremos resultados parciales, solo el final

    // Evento que se dispara cuando el usuario hace clic en el recuadro
    prayerBox.addEventListener('click', () => {
        statusDiv.textContent = "🎙️ Escuchando...";
        prayerBox.style.backgroundColor = '#e3f2fd'; // Color azul claro para indicar que está escuchando
        recognition.start();
    });

    // Evento que se dispara cuando el reconocimiento de voz tiene un resultado
    recognition.onresult = (event) => {
        // Obtenemos el texto que el usuario dijo
        const spokenText = event.results[0][0].transcript;
        statusDiv.textContent = `Dijiste: "${spokenText}"`;
        
        // Comparamos el texto dicho con el texto correcto
        validarOracion(spokenText);
    };

    // Evento que se dispara si hay un error
    recognition.onerror = (event) => {
        statusDiv.textContent = "Hubo un error al escucharte. Inténtalo de nuevo.";
        prayerBox.style.backgroundColor = '#fff'; // Volver al color original
    };

} else {
    // Si el navegador no es compatible
    statusDiv.textContent = "Tu navegador no soporta el reconocimiento de voz. Prueba con Google Chrome.";
    prayerBox.style.display = 'none'; // Ocultamos el recuadro
}

// Función para comparar los textos
function validarOracion(textoHablado) {
    // Para hacer la comparación más flexible, vamos a "limpiar" ambos textos:
    // 1. Convertimos todo a minúsculas.
    // 2. Quitamos los signos de puntuación (comas, puntos, etc.).
    const normalizar = (texto) => texto.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    const textoHabladoNormalizado = normalizar(textoHablado);
    const textoCorrectoNormalizado = normalizar(textoOracionCorrecta);

    // Comparamos los textos ya "limpios"
    if (textoHabladoNormalizado === textoCorrectoNormalizado) {
        prayerBox.style.backgroundColor = '#c8e6c9'; // Verde
        statusDiv.textContent = "¡Excelente! Oración correcta. ✅";
    } else {
        prayerBox.style.backgroundColor = '#ffcdd2'; // Rojo
        statusDiv.textContent = "Casi, pero hubo un error. ¡Inténtalo de nuevo! ❌";
    }
}
