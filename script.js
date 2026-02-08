// 1. CONFIGURACIÓN DEL TIMER
// Nota: Los meses en JS van de 0 a 11 (Enero=0, Octubre=9)
const startDate = new Date(2025, 9, 8); 

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerText = `${days} días, ${hours}h y ${mins}m juntos`;
    }
}

setInterval(updateTimer, 60000);
updateTimer();

// 2. NAVEGACIÓN ENTRE PANTALLAS
function showScreen(screenId) {
    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.add('hidden');
    
    const target = document.getElementById(screenId);
    if(target) target.classList.remove('hidden');
}

// 3. LÓGICA DEL REPRODUCTOR DE MÚSICA
let currentSongIndex = 0;

function showSong(index) {
    // 1. Elementos de Canciones
    const songs = document.querySelectorAll('.song-card');
    // 2. Elementos de Dedicatorias (NUEVO)
    const dedications = document.querySelectorAll('.dedication-text');

    if (songs.length === 0) return;

    // A. OCULTAR TODO (Canciones y Dedicatorias)
    songs.forEach(song => song.classList.remove('active'));
    dedications.forEach(d => d.classList.remove('active')); // Ocultamos textos

    // B. Lógica del índice (Carrusel Infinito)
    if (index >= songs.length) currentSongIndex = 0;
    else if (index < 0) currentSongIndex = songs.length - 1;
    else currentSongIndex = index;

    // C. MOSTRAR CANCIÓN ACTUAL
    const activeCard = songs[currentSongIndex];
    activeCard.classList.add('active');

    // D. MOSTRAR DEDICATORIA ACTUAL (NUEVO)
    // Verificamos si existe una dedicatoria para este número de canción
    if (dedications[currentSongIndex]) {
        dedications[currentSongIndex].classList.add('active');
    }

    // E. Resetear Karaoke (Lógica que ya tenías)
    const lyricsContainer = activeCard.querySelector('.lyrics-container');
    if (lyricsContainer) lyricsContainer.classList.remove('playing');
    
    prepareKaraoke(activeCard);
    restartAnimation(activeCard);
}

function nextSong() {
    showSong(currentSongIndex + 1);
}

function prevSong() {
    showSong(currentSongIndex - 1);
}

// 4. LÓGICA KARAOKE
function prepareKaraoke(card) {
    const textElement = card.querySelector('.karaoke-text');
    const container = card.querySelector('.lyrics-container');
    
    if (!textElement || textElement.dataset.prepared) return;

    // Aseguramos que el contenedor no tenga la clase 'playing'
    if(container) container.classList.remove('playing');

    const text = textElement.innerText;
    textElement.innerHTML = '';
    
    const speed = parseFloat(textElement.dataset.speed) || 0.4; 

    const words = text.split(' ');
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        span.className = 'word';
        
        // --- CORRECCIÓN IMPORTANTE AQUÍ ---
        // Agregamos la palabra 'paused' directamente en la definición de la animación
        // para que JS no la arranque automáticamente.
        span.style.animation = `highlight 0.5s forwards paused ${index * speed}s`; 
        
        textElement.appendChild(span);
    });

    textElement.dataset.prepared = "true";
}

function restartAnimation(card) {
    // Esta función fuerza al navegador a "rebobinar" la animación a gris
    const words = card.querySelectorAll('.word');
    words.forEach(word => {
        const originalAnim = word.style.animation;
        word.style.animation = 'none';
        word.offsetHeight; /* hack para forzar repintado */
        word.style.animation = originalAnim;
    });
}

// 5. DETECTOR DE CLICS EN SPOTIFY (El Truco)
function monitorSpotifyClick() {
    window.addEventListener('blur', () => {
        // Damos un pequeño respiro para que el navegador decida quién tiene el foco
        setTimeout(() => {
            const activeElement = document.activeElement;
            const activeCard = document.querySelector('.song-card.active');

            // Verificamos si hay una tarjeta activa
            if (activeCard) {
                const iframe = activeCard.querySelector('iframe');
                
                // SI el elemento activo es el IFRAME de nuestra tarjeta actual...
                if (activeElement === iframe) {
                    const lyricsContainer = activeCard.querySelector('.lyrics-container');
                    if (lyricsContainer) {
                        console.log("Clic detectado en Spotify -> Iniciando Karaoke"); // Para depurar
                        lyricsContainer.classList.add('playing');
                    }
                }
            }
        }, 200); // Aumenté un poco el tiempo a 200ms para ser más seguro
    });
}

// Inicializar todo al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSong(0); // Mostrar primera canción
    monitorSpotifyClick(); // Activar el espía de clics
});