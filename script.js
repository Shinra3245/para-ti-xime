document.getElementById('btnSorpresa').addEventListener('click', function() {
    // 1. Efecto visual de fondo
    document.body.style.transition = "background-color 1.5s ease";
    document.body.style.backgroundColor = "#fce4ec";
    
    // 2. Mensaje de alerta
    alert("¡Eres la persona más especial del mundo! ❤️");

    // 3. Mostrar los botones hacia las otras páginas
    const linkMuro = document.getElementById('linkMuro');
    const linkMaquina = document.getElementById('linkMaquina');

    // Hacemos visibles los enlaces al Muro y a la Máquina
    if (linkMuro) {
        linkMuro.style.display = "inline-block";
        linkMuro.style.animation = "fadeIn 1s ease-in";
    }

    if (linkMaquina) {
        linkMaquina.style.display = "inline-block";
        linkMaquina.style.animation = "fadeIn 1.5s ease-in";
    }
    
    // 4. Ocultar el botón inicial
    this.style.display = "none";
});