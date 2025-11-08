// --- CONFIGURACIÓN ---
const PASSWORD = "014"; 
let currentCode = [0, 0, 0];
// ---------------------

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (music.paused) {
        music.play();
        playIcon.classList.remove('active'); // Oculta el icono de play
        pauseIcon.classList.add('active');    // Muestra el icono de pause
    } else {
        music.pause();
        playIcon.classList.add('active');     // Muestra el icono de play
        pauseIcon.classList.remove('active'); // Oculta el icono de pause
    }
}


// Función para mostrar la página correcta y ocultar las demás
function showPage(pageId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla deseada
    const page = document.getElementById(pageId);
    page.classList.add('active');
}

// Función para mostrar la pista
function showHint() {
    const hintText = document.getElementById('hint-text');
    hintText.classList.remove('hidden'); // Muestra el texto de la pista
}

function changeDigit(index, direction) {
    let currentValue = currentCode[index];
    currentValue += direction; // Suma 1 o resta 1

    // Crea un bucle de 0 a 9
    if (currentValue > 9) {
        currentValue = 0;
    }
    if (currentValue < 0) {
        currentValue = 9;
    }

    // Actualiza el array y la pantalla
    currentCode[index] = currentValue;
    document.getElementById(`digit-display-${index}`).innerText = currentValue;
}

// Función para revisar la contraseña
function checkPassword() {
    // Lee el código desde nuestro array, no desde los inputs
    const code = currentCode.join(""); // Convierte [0, 1, 4] en "014"
    
    if (code === PASSWORD) {
        // ¡Correcto! Muestra la carta
        showPage('letter-screen');
    } else {
        // ¡Incorrecto!
        alert('¡Contraseña incorrecta, mi amor! Intenta de nuevo. (Pista: 1 año y 2 meses son...)');
    }
    
    // Resetea el código al fallar
    currentCode = [0, 0, 0];
    document.getElementById('digit-display-0').innerText = 0;
    document.getElementById('digit-display-1').innerText = 0;
    document.getElementById('digit-display-2').innerText = 0;
}



// Función para el botón de "Volver al inicio" en la carta
function startOver() {
    showPage('welcome-screen');
    
    // Resetea el código al volver al inicio
    currentCode = [0, 0, 0];
    document.getElementById('digit-display-0').innerText = 0;
    document.getElementById('digit-display-1').innerText = 0;
    document.getElementById('digit-display-2').innerText = 0;

    document.getElementById('hint-text').classList.add('hidden');
}

// Asegurarse de que la pantalla de bienvenida se muestre al cargar
document.addEventListener('DOMContentLoaded', () => {
    showPage('welcome-screen');
});