document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN INICIAL ---
    const PREGUNTA = "¿Que dia fue cuando nos vimos por primera vez?";
    const RESPUESTA_CORRECTA = "31 de agosto";
    const PISTA = "Es un dia de agosto :)";

    // CAMBIO IMPORTANTE: La playlist ahora tiene el nombre de la canción y la ruta.
    const playlist = [
        { src: "assets/musica/HUMBE - AMOR DE CINE (Visualizer).mp3", name: "HUMBE - AMOR DE CINE" },
        { src: "assets/musica/Taiu, Milo j - Rara Vez.mp3", name: "Taiu, Milo j - Rara Vez" },
        { src: "assets/musica/Sabino - Tú.mp3", name: "Sabino - Tú" },
        { src: "assets/musica/MILO J - M.A.I (Video Oficial).mp3", name: "MILO J - M.A.I" },
        { src: "assets/musica/LATIN MAFIA, Humbe - Patadas de Ahogado.mp3", name: "LATIN MAFIA, Humbe - Patadas de Ahogado" },
        { src: "assets/musica/Humbe - Confieso.mp3", name: "Humbe - Confieso" }
    ];

    const recuerdos = [
        { mes: "Septiembre 2024", foto: "assets/fotos/septiembre_2024.jpeg", texto: "Aquí comenzó todo. Recuerdo que estaba muy nervioso en nuestra primera cita, pero el mirarte llegar me hizo quedar perdidamente enamorado de ti." },
        { mes: "Octubre 2024", foto: "assets/fotos/octubre_2024.jpeg", texto: "Nuestro primer mes juntos, el picnic que organizaste para nosotros fue increible y disfrute mucho la comida que preparaste ese dia." },
        { mes: "Noviembre 2024", foto: "assets/fotos/noviembre.jpeg", texto: "Ir a ver nuestra primer pelicula al cine fue algo hermoso, pasearnos por las tiendas y disfrutando el momento." },
        { mes: "Diciembre 2024", foto: "assets/fotos/diciembre.jpeg", texto: "Nuestra primera Navidad juntos. Fue mágica y me di cuenta de lo mucho que significas para mí, que me mostraras las tradiciones de juventino y pintar cuadros juntos son recuerdos muy valiosos para mi." },
        { mes: "Enero 2025", foto: "assets/fotos/enero.jpeg", texto: "Recibiendo el año nuevo junto a ti y pensando en todos los momentos que quiero vivir a tu lado." },
        { mes: "Febrero 2025", foto: "assets/fotos/febrero.jpeg", texto: "Nuestro primer San Valentín. EL regalo hecho por ti fue maravilloso, el probar ese pastel hecho por ti ha sido lo mas delicioso que he probado en mi vida." },
        { mes: "Marzo 2025", foto: "assets/fotos/marzo.jpeg", texto: "Recordarte con flores lo hermosa y importante que eres para mi, a pesar de la distancia nunca dejo de pensar en ti." },
        { mes: "Abril 2025", foto: "assets/fotos/abril.jpeg", texto: "Se que en este mes hubo problemas y discusiones y el recordarlo me da la seguridad de que tu eres la persona con la que quiero estar toda mi vida, que a pesar de los malos momentos siempre te voy a amar." },
        { mes: "Mayo 2025", foto: "assets/fotos/mayo.jpeg", texto: "Gracias por darme el mejor cumpleaños de todos, gracias por todos los regalos y gracias por estar para mi en un dia tan especial, amo y atesoro todo lo que haces por mi." },
        { mes: "Junio 2025", foto: "assets/fotos/junio.jpeg", texto: "La distancia nunca sera un inpedimento para demostrarte mi amor y darnos tiempo de calidad en pareja." },
        { mes: "Julio 2025", foto: "assets/fotos/julio.jpeg", texto: "El compartir mis gustos junto a ti y yo aprender de los tuyos es algo que siempre atesorare y amare el saber todo de ti, jamas juzgarte." },
        { mes: "Agosto 2025", foto: "assets/fotos/agosto.jpeg", texto: "Gracias por darte el tiempo de compartir momentos conmigo a distancia, disfrutar de un simple juego y hablar me hace sentir mas cerca de ti." },
        { mes: "Septiembre 2025", foto: "assets/fotos/1_año.jpeg", texto: "Y aquí estamos, un año después. El mejor año de mi vida. Gracias por tanto amor. gracias por hacerme feliz, te sigo amando y mirando como el primer dia que te conoci, ¡Feliz aniversario!" }
    ];

    const fallingTexts = ["Te Amo", "Mi Amor", "Siempre Juntos", "Mi Cielito", "Mi Vida", "Contigo", "♥", "Mi Felicidad"];
    const fallingTextsContainer = document.querySelector('.falling-texts-background');
    // --- FIN DE LA CONFIGURACIÓN ---


    // Elementos del DOM
    const accessScreen = document.getElementById('access-screen');
    const mainContent = document.getElementById('main-content');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');
    const hintLink = document.getElementById('hint-link');
    const music = document.getElementById('background-music');
    
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');

    const infoButton = document.getElementById('info-button');
    const infoModal = document.getElementById('info-modal');
    const infoCloseButton = document.getElementById('info-close-button');

    const prevSongButton = document.getElementById('prev-song-button');
    const nextSongButton = document.getElementById('next-song-button');

    // Nuevos elementos para el reproductor
    const songTitle = document.getElementById('song-title');
    const seekBar = document.getElementById('seek-bar');

    let currentSongIndex = 0;

    // --- LÓGICA DE MÚSICA ACTUALIZADA ---
    const playSongAtIndex = (index) => {
        if (index >= playlist.length) {
            index = 0; 
        }
        if (index < 0) {
            index = playlist.length - 1; 
        }

        currentSongIndex = index;
        const song = playlist[currentSongIndex];

        music.src = song.src;
        songTitle.textContent = song.name;

        music.play().catch(error => console.log("Error al reproducir la canción:", error));
    };

    // Event listeners para la barra de progreso
    music.addEventListener('timeupdate', () => {
        if (music.duration) {
            const progress = (music.currentTime / music.duration) * 100;
            seekBar.value = progress;
        }
    });

    seekBar.addEventListener('input', () => {
        if (music.duration) {
            const newTime = (seekBar.value / 100) * music.duration;
            music.currentTime = newTime;
        }
    });
    
    music.addEventListener('ended', () => {
        playSongAtIndex(currentSongIndex + 1);
    });

    prevSongButton.addEventListener('click', () => {
        playSongAtIndex(currentSongIndex - 1);
    });

    nextSongButton.addEventListener('click', () => {
        playSongAtIndex(currentSongIndex + 1);
    });
    // --- FIN DE LA LÓGICA DE MÚSICA ---


    questionText.textContent = PREGUNTA;

    const checkAnswer = () => {
        if (answerInput.value.trim().toLowerCase() === RESPUESTA_CORRECTA.toLowerCase()) {
            accessScreen.style.display = 'none';
            mainContent.style.display = 'block';
            playSongAtIndex(0); 
            createFallingTextAnimation(); 
        } else {
            alert("Respuesta incorrecta. ¡Inténtalo de nuevo!");
        }
    };
    
    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    hintLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert(PISTA);
    });

    const timeline = document.getElementById('timeline');
    recuerdos.forEach(recuerdo => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        const bubble = document.createElement('div');
        bubble.className = 'timeline-bubble';
        bubble.addEventListener('click', () => openModal(recuerdo.foto, recuerdo.texto));
        const content = document.createElement('div');
        content.className = 'timeline-content';
        const month = document.createElement('h3');
        month.className = 'timeline-month';
        month.textContent = recuerdo.mes;
        content.appendChild(month);
        item.appendChild(bubble);
        item.appendChild(content);
        timeline.appendChild(item);
    });

    function openModal(imageSrc, text) {
        modalImage.src = imageSrc;
        modalText.textContent = text;
        modal.style.display = 'flex';
    }
    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    infoButton.addEventListener('click', () => {
        infoModal.style.display = 'flex';
    });
    infoCloseButton.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === infoModal) {
            infoModal.style.display = 'none';
        }
    });

    function createFallingTextAnimation() {
        const numberOfTexts = 40; 
        const animateText = (textElement) => {
            textElement.textContent = fallingTexts[Math.floor(Math.random() * fallingTexts.length)];
            textElement.style.left = `${Math.random() * 100}vw`;
            textElement.style.animationDuration = `${Math.random() * 8 + 7}s`;
            textElement.style.fontSize = `${Math.random() * 1 + 1}em`;
            textElement.classList.remove('falling-text');
            void textElement.offsetWidth; 
            textElement.classList.add('falling-text');
        };
        for (let i = 0; i < numberOfTexts; i++) {
            const text = document.createElement('span');
            text.addEventListener('animationend', () => {
                animateText(text);
            });
            fallingTextsContainer.appendChild(text);
            setTimeout(() => {
                animateText(text);
            }, Math.random() * 5000);
        }
    }
});