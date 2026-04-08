document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE ANIMACIÓN DE FLORES (RAMO) ---
    const flowerSvg = document.getElementById('flower-bouquet');
    
    if (flowerSvg) {
        const numFlowers = 15; // Un ramo grande de 15 flores
        const colors = ['#ff6b81', '#ffffff', '#ff9ff3', '#feca57', '#48dbfb', '#ff9f43'];
        
        let svgContent = '';
        
        for (let i = 0; i < numFlowers; i++) {
            // Posiciones aleatorias para hacer un ramo
            // Centroide alrededor de (200, 180) para las flores, 
            // y base del tallo cerca de (200, 380)
            const xOffset = (Math.random() - 0.5) * 180; // +/- 90
            const yOffset = (Math.random() - 0.5) * 120; // +/- 60
            
            const baseX = 200 + (Math.random() - 0.5) * 40; // Base ligeramente dispersa
            const baseY = 380;
            
            const headX = 200 + xOffset;
            const headY = 160 + yOffset;
            
            // Puntos de control para la curva del tallo
            const cp1X = baseX + (headX - baseX) / 2 + (Math.random() - 0.5) * 50;
            const cp1Y = baseY - 80;
            const cp2X = headX - (headX - baseX) / 2 + (Math.random() - 0.5) * 50;
            const cp2Y = headY + 80;
            
            const stemPath = `M${baseX},${baseY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${headX},${headY}`;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const delay = 0.5 + i * 0.2; // Escalonamiento de la animación
            
            let petalsPath = '';
            const numPetals = 6;
            for (let p = 0; p < numPetals; p++) {
                const angle = (p * 360) / numPetals;
                const angleRad = (angle * Math.PI) / 180;
                
                // Calculamos hacia dónde va el pétalo
                const petalDist = 30 + Math.random() * 10;
                const pEndXP1 = headX + Math.cos(angleRad - 0.2) * petalDist;
                const pEndYP1 = headY + Math.sin(angleRad - 0.2) * petalDist;
                
                const pEndXP2 = headX + Math.cos(angleRad + 0.2) * petalDist;
                const pEndYP2 = headY + Math.sin(angleRad + 0.2) * petalDist;
                
                const pEndX = headX + Math.cos(angleRad) * (petalDist + 5);
                const pEndY = headY + Math.sin(angleRad) * (petalDist + 5);
                
                // Curva de Bezier para el pétalo
                petalsPath += `<path d="M${headX},${headY} C${pEndXP1},${pEndYP1} ${pEndXP2},${pEndYP2} ${pEndX},${pEndY}" style="stroke: ${color}; stroke-width: ${color === '#ffffff' ? 4 : 3}; animation-delay: ${delay + 1 + p * 0.1}s"></path>`;
            }
            
            svgContent += `
                <g class="flower" id="flower-dyn-${i}">
                    <path class="stem" d="${stemPath}" style="animation-delay: ${delay}s"></path>
                    <g class="petals">
                        ${petalsPath}
                    </g>
                    <circle class="center" cx="${headX}" cy="${headY}" r="${6 + Math.random()*4}" style="animation-delay: ${delay + 2}s"></circle>
                </g>
            `;
        }
        
        flowerSvg.innerHTML = svgContent;
    }

    // Elementos de las pantallas
    const homeScreen = document.getElementById('home-screen');
    const lettersScreen = document.getElementById('letters-screen');

    // Botones de navegación
    const toLettersBtn = document.getElementById('to-letters-btn');
    const toHomeBtn = document.getElementById('to-home-btn');

    // Elementos de las cartas
    const letterCards = document.querySelectorAll('.letter-card');

    // --- NAVEGACIÓN ENTRE PANTALLAS ---
    if (toLettersBtn && toHomeBtn) {
        toLettersBtn.addEventListener('click', () => {
            homeScreen.classList.remove('active');
            lettersScreen.classList.add('active');
        });

        toHomeBtn.addEventListener('click', () => {
            lettersScreen.classList.remove('active');
            homeScreen.classList.add('active');
        });
    }

    // --- LÓGICA DEL ACORDEÓN DE CARTAS ---
    if (letterCards) {
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
    }
});