document.addEventListener('DOMContentLoaded', () => {
    // Elementos de las pantallas
    const homeScreen = document.getElementById('home-screen');
    const lettersScreen = document.getElementById('letters-screen');

    // Botones de navegación
    const toLettersBtn = document.getElementById('to-letters-btn');
    const toHomeBtn = document.getElementById('to-home-btn');

    // Elementos de las cartas
    const letterCards = document.querySelectorAll('.letter-card');

    // --- NAVEGACIÓN ENTRE PANTALLAS ---

    toLettersBtn.addEventListener('click', () => {
        homeScreen.classList.remove('active');
        lettersScreen.classList.add('active');
    });

    toHomeBtn.addEventListener('click', () => {
        lettersScreen.classList.remove('active');
        homeScreen.classList.add('active');
    });

    // --- LÓGICA DEL ACORDEÓN DE CARTAS ---

    letterCards.forEach(card => {
        // Asigna el color de fondo desde el atributo data-color
        card.style.backgroundColor = card.dataset.color;

        card.addEventListener('click', () => {
            // Si la tarjeta clickeada ya está activa, no hacer nada
            if (card.classList.contains('active')) {
                return;
            }

            // Quita la clase 'active' de todas las demás tarjetas
            letterCards.forEach(otherCard => otherCard.classList.remove('active'));

            // Añade la clase 'active' solo a la tarjeta clickeada
            card.classList.add('active');
        });
    });
});