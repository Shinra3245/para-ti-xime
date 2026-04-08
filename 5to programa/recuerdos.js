const recuerdos = [
    { img: 'resources/foto1.jpeg', texto: 'Nuestra primera cita ' },
    { img: 'resources/foto2.jpeg', texto: 'Cuando nos encontrabamos en aquel cafe disfrutando el momento' },
    { img: 'resources/foto3.jpeg', texto: 'En galerias paseando y riendo' },
    { img: 'resources/foto4.jpeg', texto: 'Cuando vimos la pelicula de Venom' }
];

const lever = document.getElementById('lever');
const card = document.getElementById('memory-card');
const img = document.getElementById('memory-img');
const txt = document.getElementById('memory-text');

lever.addEventListener('click', () => {
    // Animación de agitar (opcional: podrías agregar una clase CSS de vibración)
    lever.innerText = "¡Saliendo...!";
    
    setTimeout(() => {
        const azar = recuerdos[Math.floor(Math.random() * recuerdos.length)];
        img.src = azar.img;
        txt.innerText = azar.texto;
        
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('show'), 10);
        lever.innerText = "GIRAR PALANCA";
    }, 800);
});

function closeMemory() {
    card.classList.remove('show');
    setTimeout(() => card.classList.add('hidden'), 500);
}