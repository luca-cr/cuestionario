const opcionesContainer = document.querySelector('.opciones-container');
const textboxContainer = document.getElementById('textbox-container');
let textboxVisible = false; // Cambiamos el nombre para indicar que un párrafo estará visible

opcionesContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-opcion')) {
        if (!textboxVisible) {
            const respuestaParrafo = document.createElement('p');
            respuestaParrafo.classList.add('alert', 'alert-info'); // Clases de Bootstrap para un estilo informativo
            respuestaParrafo.textContent = `Seleccionaste: ${event.target.textContent}`;
            textboxContainer.appendChild(respuestaParrafo);
            textboxVisible = true;
        }
    }
});