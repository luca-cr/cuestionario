const preguntaElement = document.querySelector('.pregunta');
const opcionesContainer = document.querySelector('.opciones-container');
const textboxContainer = document.getElementById('textbox-container');
const siguientePreguntaBtn = document.getElementById('siguiente-pregunta-btn');

let currentQuestionIndex = 0;
let quizData = [
    {
        pregunta: "¿Qué servicio de AWS se utiliza para almacenamiento de objetos escalable?",
        opciones: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon DynamoDB"],
        correctAnswer: "Amazon S3"
    },
    {
        pregunta: "¿Cuál de los siguientes NO es un tipo de instancia de EC2?",
        opciones: ["Instancias de propósito general", "Instancias optimizadas para cómputo", "Instancias optimizadas para red", "Instancias optimizadas para impresión"],
        correctAnswer: "Instancias optimizadas para impresión"
    },
    {
        pregunta: "¿Qué servicio de AWS proporciona una base de datos relacional administrada?",
        opciones: ["Amazon S3", "Amazon EC2", "Amazon RDS", "Amazon Lambda"],
        correctAnswer: "Amazon RDS"
    },
    {
        pregunta: "¿Cuál es la función principal de Amazon VPC?",
        opciones: ["Almacenamiento de archivos en la nube", "Red virtual privada aislada", "Ejecución de código sin servidores", "Entrega de contenido a nivel global"],
        correctAnswer: "Red virtual privada aislada"
    },
    {
        pregunta: "¿Qué servicio de AWS permite ejecutar código sin necesidad de aprovisionar o administrar servidores?",
        opciones: ["Amazon EC2", "Amazon ECS", "Amazon EKS", "AWS Lambda"],
        correctAnswer: "AWS Lambda"
    }
];

function mostrarPregunta() {
    const currentQuestion = quizData[currentQuestionIndex];
    preguntaElement.textContent = currentQuestion.pregunta;
    opcionesContainer.innerHTML = ''; // Limpiar las opciones anteriores
    textboxContainer.innerHTML = ''; // Limpiar feedback anterior

    currentQuestion.opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-opcion', 'mb-2'); // Añadir margen inferior
        button.textContent = opcion;
        button.addEventListener('click', () => verificarRespuesta(opcion));
        opcionesContainer.appendChild(button);
    });
}

function verificarRespuesta(respuestaSeleccionada) {
    const currentQuestion = quizData[currentQuestionIndex];
    textboxContainer.innerHTML = ''; // Limpiar feedback anterior
    const feedbackElement = document.createElement('p');
    feedbackElement.classList.add('mt-3');

    if (respuestaSeleccionada === currentQuestion.correctAnswer) {
        feedbackElement.textContent = "¡Correcto!";
        feedbackElement.classList.add('text-success');
    } else {
        feedbackElement.textContent = `Incorrecto. La respuesta correcta es: ${currentQuestion.correctAnswer}`;
        feedbackElement.classList.add('text-danger');
    }
    textboxContainer.appendChild(feedbackElement);
}

function siguientePregunta() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        mostrarPregunta();
    } else {
        preguntaElement.textContent = "¡Has completado el quiz!";
        opcionesContainer.innerHTML = '';
        textboxContainer.innerHTML = '';
        siguientePreguntaBtn.style.display = 'none'; // Ocultar el botón al final
    }
}

siguientePreguntaBtn.addEventListener('click', siguientePregunta);

// Cargar la primera pregunta al cargar la página
mostrarPregunta();