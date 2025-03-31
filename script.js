const preguntaElement = document.querySelector('.pregunta');
const opcionesContainer = document.querySelector('.opciones-container');
const textboxContainer = document.getElementById('textbox-container');
const siguientePreguntaBtn = document.getElementById('siguiente-pregunta-btn');
const verificarBtn = document.createElement('button'); // Crear botón de verificar
verificarBtn.textContent = 'Verificar';
verificarBtn.classList.add('btn', 'btn-primary', 'mt-3');
verificarBtn.style.display = 'none'; // Ocultar inicialmente

let currentQuestionIndex = 0;
let quizData = [
    {
        pregunta: "¿Cuál es un beneficio clave de AWS mencionado en los objetivos de aprendizaje?",
        opciones: ["Mayor complejidad en la gestión de la infraestructura", "Pasar de gasto inicial a gasto variable", "Necesidad de predecir la capacidad con anticipación", "Mayor tiempo para obtener nuevos recursos"],
        correctAnswers: ["Pasar de gasto inicial a gasto variable"]
    },
    {
        pregunta: "¿Cuáles son dos diferencias principales entre la entrega bajo demanda y las implementaciones en la nube según los objetivos?",
        opciones: ["La ubicación física de los servidores", "El modelo de precios utilizado", "La necesidad de administrar la infraestructura subyacente", "La velocidad de acceso a los recursos"],
        correctAnswers: ["La necesidad de administrar la infraestructura subyacente", "La velocidad de acceso a los recursos"]
    },
    {
        pregunta: "¿Qué describe mejor el modelo de precios de pago por uso en AWS?",
        opciones: ["Se paga una tarifa fija mensual por todos los servicios", "Se paga solo por los recursos informáticos que se consumen", "Se requiere un contrato a largo plazo para obtener los mejores precios", "Los precios se basan en la cantidad de datos almacenados, independientemente del uso"],
        correctAnswers: ["Se paga solo por los recursos informáticos que se consumen"]
    },
    {
        pregunta: "A nivel básico, ¿cuál es un beneficio principal de Amazon EC2?",
        opciones: ["Almacenamiento de objetos altamente duradero", "Capacidad de computación escalable en la nube", "Base de datos relacional totalmente administrada", "Red virtual privada aislada"],
        correctAnswers: ["Capacidad de computación escalable en la nube"]
    },
    {
        pregunta: "¿Cuáles de los siguientes son dos tipos de instancias de Amazon EC2?",
        opciones: ["Instancias de almacenamiento optimizado", "Instancias aceleradas por hardware", "Instancias optimizadas para impresión", "Instancias de memoria optimizada"],
        correctAnswers: ["Instancias de almacenamiento optimizado", "Instancias de memoria optimizada"]
    },
    {
        pregunta: "¿Cuál de las siguientes es una opción de facturación de Amazon EC2 mencionada en los objetivos?",
        opciones: ["Instancias bajo demanda", "Instancias reservadas", "Instancias spot", "Instancias dedicadas a un solo cliente"],
        correctAnswers: ["Instancias bajo demanda"]
    },
    {
        pregunta: "¿Cuál es el principal beneficio de Amazon EC2 Auto Scaling?",
        opciones: ["Aumentar automáticamente la capacidad de almacenamiento", "Ajustar automáticamente la capacidad de computación en respuesta a la demanda", "Optimizar automáticamente los costos de la base de datos", "Mejorar automáticamente la seguridad de la red"],
        correctAnswers: ["Ajustar automáticamente la capacidad de computación en respuesta a la demanda"]
    },
    {
        pregunta: "¿Cuál es el principal beneficio de Elastic Load Balancing (ELB)?",
        opciones: ["Aumentar la velocidad de transferencia de datos", "Distribuir el tráfico de entrada entre múltiples instancias", "Mejorar la durabilidad del almacenamiento de objetos", "Mejorar la disponibilidad de las aplicaciones"],
        correctAnswers: ["Distribuir el tráfico de entrada entre múltiples instancias"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un ejemplo de uso común de Elastic Load Balancing?",
        opciones: ["Almacenamiento de copias de seguridad de bases de datos", "Entrega de contenido estático a usuarios finales", "Distribución del tráfico web entre múltiples servidores", "Ejecución de código en respuesta a eventos"],
        correctAnswers: ["Distribución del tráfico web entre múltiples servidores"]
    },
    {
        pregunta: "¿Cuál es la principal diferencia entre Amazon Simple Notification Service (SNS) y Amazon Simple Queue Service (SQS)?",
        opciones: ["SNS se utiliza para colas de mensajes, mientras que SQS se utiliza para notificaciones push", "SNS permite enviar mensajes a múltiples suscriptores", "SQS es un sistema de colas de mensajes uno a uno", "SNS garantiza la entrega de mensajes exactamente una vez"],
        correctAnswers: ["SNS permite enviar mensajes a múltiples suscriptores", "SQS es un sistema de colas de mensajes uno a uno"]
    },
    {
        pregunta: "¿Cuáles de los siguientes son dos opciones de computación adicionales de AWS, además de EC2 y Lambda?",
        opciones: ["Amazon S3 Glacier", "Amazon DynamoDB Accelerator (DAX)", "Amazon Elastic Container Service (ECS)", "AWS Fargate"],
        correctAnswers: ["Amazon Elastic Container Service (ECS)", "AWS Fargate"]
    },
    {
        pregunta: "¿Cuáles son dos beneficios clave de la infraestructura global de AWS?",
        opciones: ["Dependencia de una única ubicación geográfica", "Alta disponibilidad", "Baja latencia para los usuarios", "Mayor complejidad en la administración de recursos"],
        correctAnswers: ["Alta disponibilidad", "Baja latencia para los usuarios"]
    },
    {
        pregunta: "¿Cuál es el principal beneficio de utilizar las ubicaciones periféricas (Edge Locations) y Amazon CloudFront?",
        opciones: ["Reducir los costos de almacenamiento de datos", "Mejorar el rendimiento al almacenar en caché el contenido cerca de los usuarios", "Aumentar la capacidad de procesamiento de las instancias EC2", "Proporcionar seguridad DDoS a nivel de red"],
        correctAnswers: ["Mejorar el rendimiento al almacenar en caché el contenido cerca de los usuarios"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un método común para aprovisionar servicios de AWS mencionado en los objetivos?",
        opciones: ["Correo electrónico", "Consola de administración de AWS", "Llamada telefónica", "AWS Command Line Interface (CLI)"],
        correctAnswers: ["Consola de administración de AWS"]
    },
    {
        pregunta: "¿Cuál es la diferencia fundamental entre los recursos de redes públicas y privadas en AWS?",
        opciones: ["Los recursos públicos son más seguros que los privados", "Los recursos públicos son accesibles desde internet, mientras que los privados no lo son directamente", "Los recursos privados son más caros que los públicos", "Los recursos públicos ofrecen mayor rendimiento que los privados"],
        correctAnswers: ["Los recursos públicos son accesibles desde internet, mientras que los privados no lo son directamente"]
    },
    {
        pregunta: "¿Cuáles son dos beneficios de AWS Direct Connect?",
        opciones: ["Proporcionar acceso a internet de alta velocidad para instancias EC2", "Reducir los costos de red", "Aumentar el ancho de banda", "Cifrar automáticamente todos los datos en tránsito"],
        correctAnswers: ["Reducir los costos de red", "Aumentar el ancho de banda"]
    },
    {
        pregunta: "¿Cuál es una ventaja clave de los despliegues híbridos según los objetivos?",
        opciones: ["Eliminar por completo la necesidad de infraestructura local", "Permitir la integración de recursos basados en la nube con aplicaciones de TI heredadas", "Garantizar que todos los datos se almacenen exclusivamente en la nube", "Manejar picos de demanda utilizando la nube"],
        correctAnswers: ["Permitir la integración de recursos basados en la nube con aplicaciones de TI heredadas"]
    },
    {
        pregunta: "¿Cuál de las siguientes es una capa de seguridad comúnmente utilizada en una estrategia de TI?",
        opciones: ["Seguridad del navegador", "Seguridad física", "Seguridad del dispositivo personal", "Seguridad de la red"],
        correctAnswers: ["Seguridad física"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un servicio que los clientes utilizan para interactuar con la red global de AWS?",
        opciones: ["Amazon S3 Glacier", "AWS Management Console", "AWS CodeDeploy", "AWS Software Development Kits (SDKs)"],
        correctAnswers: ["AWS Management Console"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon Elastic Block Store (EBS)?",
        opciones: ["Almacenamiento de objetos para datos no estructurados", "Almacenamiento de bloques persistente", "Almacenamiento de archivos compartidos para múltiples instancias", "Capacidad de crear snapshots para copias de seguridad"],
        correctAnswers: ["Almacenamiento de bloques persistente"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon Simple Storage Solution (S3)?",
        opciones: ["Almacenamiento de bloques de alto rendimiento", "Durabilidad de 99.999999999%", "Almacenamiento de archivos compartidos con semántica POSIX completa", "Escalabilidad masiva"],
        correctAnswers: ["Durabilidad de 99.999999999%"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon Elastic File System (EFS)?",
        opciones: ["Almacenamiento de objetos de bajo costo", "Almacenamiento de archivos compartidos y escalable", "Integración con Amazon EC2", "Acceso a través de internet pública"],
        correctAnswers: ["Almacenamiento de archivos compartidos y escalable"]
    },
    {
        pregunta: "¿Cuál de las siguientes es una solución de almacenamiento de AWS?",
        opciones: ["Amazon Redshift", "Amazon S3 Glacier", "Amazon Aurora", "Amazon ElastiCache"],
        correctAnswers: ["Amazon S3 Glacier"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon Relational Database Service (RDS)?",
        opciones: ["Base de datos NoSQL totalmente administrada", "Facilidad de administración", "Escalabilidad automática para bases de datos NoSQL", "Soporte para múltiples motores de bases de datos relacionales"],
        correctAnswers: ["Facilidad de administración"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon DynamoDB?",
        opciones: ["Base de datos relacional totalmente administrada", "Rendimiento rápido y predecible", "Escalabilidad vertical", "Esquema flexible"],
        correctAnswers: ["Rendimiento rápido y predecible"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un servicio de base de datos de AWS?",
        opciones: ["Amazon S3", "Amazon EC2", "Amazon Neptune", "Amazon CloudWatch"],
        correctAnswers: ["Amazon Neptune"]
    },
    {
        pregunta: "¿Cuáles son dos beneficios del modelo de responsabilidad compartida?",
        opciones: ["AWS se encarga de toda la seguridad", "Define las responsabilidades de seguridad", "Los clientes no tienen ninguna responsabilidad", "Reduce la complejidad de la seguridad"],
        correctAnswers: ["Define las responsabilidades de seguridad", "Reduce la complejidad de la seguridad"]
    },
    {
        pregunta: "¿Cuál es un beneficio de la autenticación multifactor (MFA)?",
        opciones: ["Cifra los datos en reposo", "Aumenta la seguridad de la cuenta", "Optimiza los costos", "Mejora el rendimiento de las aplicaciones"],
        correctAnswers: ["Aumenta la seguridad de la cuenta"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un nivel de seguridad principal de AWS Identity and Access Management (IAM)?",
        opciones: ["Instancias", "Usuarios", "Regiones", "Roles"],
        correctAnswers: ["Usuarios"]
    },
    {
        pregunta: "¿Cuál es uno de los principales beneficios de AWS Organizations?",
        opciones: ["Gestionar y consolidar múltiples cuentas de AWS", "Implementar automáticamente parches de seguridad", "Optimizar el rendimiento de las bases de datos", "Distribuir automáticamente el tráfico a través de múltiples regiones"],
        correctAnswers: ["Gestionar y consolidar múltiples cuentas de AWS"]
    },
    {
        pregunta: "A nivel básico, ¿qué describe una característica de las políticas de seguridad en AWS?",
        opciones: ["Definen quién tiene acceso", "Cifran los datos en tránsito", "Definen a qué recursos se puede acceder", "Monitorizan el rendimiento"],
        correctAnswers: ["Definen quién tiene acceso"]
    },
    {
        pregunta: "¿Cuál es un beneficio de la conformidad de AWS?",
        opciones: ["Garantiza el cumplimiento automático", "Proporciona confianza en los estándares", "Reduce la necesidad de seguridad del cliente", "Elimina todos los riesgos de seguridad"],
        correctAnswers: ["Proporciona confianza en los estándares"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un servicio de seguridad adicional de AWS a nivel básico?",
        opciones: ["Amazon Comprehend", "AWS Shield", "AWS CodeCommit", "Amazon GuardDuty"],
        correctAnswers: ["AWS Shield"]
    },
    {
        pregunta: "¿Cuál es una estrategia fundamental para supervisar su entorno de AWS mencionada en los objetivos?",
        opciones: ["Deshabilitar el registro", "Utilizar Amazon CloudWatch", "Depender solo de alertas de correo electrónico", "Utilizar AWS CloudTrail"],
        correctAnswers: ["Utilizar Amazon CloudWatch"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de Amazon CloudWatch?",
        opciones: ["Proporcionar almacenamiento de objetos duradero y escalable", "Permitir la ejecución de código sin servidores", "Monitorizar recursos y aplicaciones en tiempo real", "Gestionar las identidades y el acceso a los recursos de AWS"],
        correctAnswers: ["Monitorizar recursos y aplicaciones en tiempo real"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de AWS CloudTrail?",
        opciones: ["Detectar automáticamente amenazas de seguridad en su entorno de AWS", "Registrar las llamadas a la API realizadas en su cuenta de AWS", "Optimizar los costos de su infraestructura de AWS", "Mejorar el rendimiento de sus aplicaciones web"],
        correctAnswers: ["Registrar las llamadas a la API realizadas en su cuenta de AWS"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de AWS Trusted Advisor?",
        opciones: ["Proporcionar recomendaciones para optimizar costos, seguridad, tolerancia a fallos, rendimiento y límites de servicio", "Automatizar la implementación de aplicaciones en AWS", "Gestionar la configuración de su red virtual privada", "Cifrar automáticamente los datos en tránsito hacia y desde AWS"],
        correctAnswers: ["Proporcionar recomendaciones para optimizar costos, seguridad, tolerancia a fallos, rendimiento y límites de servicio"]
    },
    {
        pregunta: "¿Cuál es un beneficio del nivel gratuito de AWS?",
        opciones: ["Acceso ilimitado a todos los servicios de AWS de forma gratuita", "Un período de prueba gratuito de todos los servicios de AWS", "Permite a los clientes explorar y probar los servicios de AWS de forma gratuita hasta ciertos límites", "Proporciona descuentos significativos en todos los servicios de AWS durante el primer año"],
        correctAnswers: ["Permite a los clientes explorar y probar los servicios de AWS de forma gratuita hasta ciertos límites"]
    },
    {
        pregunta: "¿Cuál es un beneficio principal de AWS Organizations y la facturación unificada?",
        opciones: ["Simplificar la gestión de facturas para múltiples cuentas de AWS", "Mejorar la seguridad de una única cuenta de AWS", "Aumentar el rendimiento de las aplicaciones en AWS", "Reducir la latencia de acceso a los servicios de AWS"],
        correctAnswers: ["Simplificar la gestión de facturas para múltiples cuentas de AWS"]
    },
    {
        pregunta: "¿Cuál es un beneficio de AWS Budgets?",
        opciones: ["Optimizar automáticamente los precios de las instancias EC2", "Establecer límites de gasto y recibir alertas cuando se superan", "Mejorar la disponibilidad de las aplicaciones en múltiples zonas de disponibilidad", "Simplificar la implementación de código en AWS Lambda"],
        correctAnswers: ["Establecer límites de gasto y recibir alertas cuando se superan"]
    },
    {
        pregunta: "¿Cuál es un beneficio de AWS Cost Explorer?",
        opciones: ["Automatizar la creación de informes de costos detallados", "Visualizar y analizar los costos y el uso de AWS a lo largo del tiempo", "Predecir con precisión los costos futuros de AWS", "Optimizar automáticamente la configuración de los servicios de AWS para reducir costos"],
        correctAnswers: ["Visualizar y analizar los costos y el uso de AWS a lo largo del tiempo"]
    },
    {
        pregunta: "¿Cuál es el principal beneficio de la calculadora de precios de AWS?",
        opciones: ["Monitorizar los costos en tiempo real", "Estimar el costo de usar los servicios de AWS", "Generar informes de costos detallados", "Aplicar descuentos automáticamente a su factura de AWS"],
        correctAnswers: ["Estimar el costo de usar los servicios de AWS"]
    },
    {
        pregunta: "¿Qué distingue principalmente los diferentes planes de AWS Support?",
        opciones: ["La velocidad de la red y la capacidad de almacenamiento", "Los tipos de servicios a los que se puede acceder", "El tiempo de respuesta y el nivel de acceso a soporte técnico", "Las opciones de facturación y los descuentos disponibles"],
        correctAnswers: ["El tiempo de respuesta y el nivel de acceso a soporte técnico"]
    },
    {
        pregunta: "¿Cuál es un beneficio de AWS Marketplace?",
        opciones: ["Proporcionar acceso gratuito a todos los servicios de AWS", "Permitir a los clientes comprar y utilizar software de terceros que se ejecuta en AWS", "Ofrecer descuentos exclusivos en los servicios de computación de AWS", "Gestionar la infraestructura física de los clientes en sus instalaciones"],
        correctAnswers: ["Permitir a los clientes comprar y utilizar software de terceros que se ejecuta en AWS"]
    },
    {
        pregunta: "¿Qué es el AWS Cloud Adoption Framework (AWS CAF)?",
        opciones: ["Un conjunto de herramientas para optimizar los costos de AWS", "Una guía para ayudar a las organizaciones a desarrollar e implementar estrategias de migración a la nube", "Un servicio para automatizar la implementación de aplicaciones en AWS", "Un marco de seguridad para proteger las cargas de trabajo en la nube"],
        correctAnswers: ["Una guía para ayudar a las organizaciones a desarrollar e implementar estrategias de migración a la nube"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un factor clave en una estrategia de migración a la nube según los objetivos?",
        opciones: ["La marca del proveedor de hardware", "El modelo operativo", "La ubicación física del centro de datos", "El color de los servidores"],
        correctAnswers: ["El modelo operativo"]
    },
    {
        pregunta: "¿Cuál es un beneficio de las soluciones de migración de datos de AWS como AWS Snowcone y AWS Snowball?",
        opciones: ["Proporcionar almacenamiento ilimitado en la nube", "Permitir la migración de grandes cantidades de datos de forma segura y eficiente", "Optimizar automáticamente el rendimiento de las bases de datos", "Garantizar la conformidad con todas las regulaciones globales"],
        correctAnswers: ["Permitir la migración de grandes cantidades de datos de forma segura y eficiente"]
    },
    {
        pregunta: "¿Qué describe mejor el amplio abanico de soluciones innovadoras que ofrece AWS?",
        opciones: ["Se limita principalmente a servicios de computación y almacenamiento", "Cubre una amplia gama de servicios, incluyendo inteligencia artificial, machine learning, IoT y más", "Requiere que los clientes construyan la mayoría de las soluciones desde cero", "Se centra principalmente en soluciones para pequeñas empresas"],
        correctAnswers: ["Cubre una amplia gama de servicios, incluyendo inteligencia artificial, machine learning, IoT y más"]
    },
    {
        pregunta: "¿Cuál de los siguientes es uno de los seis pilares del Marco de Buena Arquitectura de AWS?",
        opciones: ["Facilidad de uso", "Máximo rendimiento", "Excelencia operativa", "Mínimo costo"],
        correctAnswers: ["Excelencia operativa"]
    },
    {
        pregunta: "¿Cuál de los siguientes es un beneficio fundamental de la computación en la nube?",
        opciones: ["Mayor gasto inicial", "Escalabilidad bajo demanda", "Control físico total sobre el hardware", "Pago por uso"],
        correctAnswers: ["Escalabilidad bajo demanda"]
    }
];

// Función para mezclar el array de preguntas (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let opcionesSeleccionadas = [];

function mostrarPregunta() {
    const currentQuestion = quizData[currentQuestionIndex];
    preguntaElement.textContent = currentQuestion.pregunta;

    // Añadir aviso si la pregunta tiene 2 respuestas correctas
    const numCorrectAnswers = currentQuestion.correctAnswers.length;
    const avisoElement = document.getElementById('aviso-seleccion');
    if (avisoElement) {
        avisoElement.remove(); // Eliminar aviso anterior si existe
    }
    if (numCorrectAnswers === 2) {
        const nuevoAviso = document.createElement('p');
        nuevoAviso.id = 'aviso-seleccion';
        nuevoAviso.classList.add('text-info', 'mt-1');
        nuevoAviso.textContent = 'Selecciona 2!!';
        preguntaElement.appendChild(nuevoAviso);
    }

    opcionesContainer.innerHTML = ''; // Limpiar las opciones anteriores
    textboxContainer.innerHTML = ''; // Limpiar feedback anterior
    opcionesSeleccionadas = []; // Resetear las opciones seleccionadas para la nueva pregunta
    verificarBtn.style.display = 'none'; // Ocultar el botón de verificar al mostrar nueva pregunta
    siguientePreguntaBtn.style.display = 'none'; // Ocultar el botón de siguiente pregunta hasta verificar

    const maxSelecciones = numCorrectAnswers === 2 ? 2 : 1;

    currentQuestion.opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-outline-primary', 'btn-opcion', 'mb-2'); // Añadir margen inferior
        button.textContent = opcion;
        button.addEventListener('click', () => seleccionarOpcion(button, opcion, maxSelecciones));
        opcionesContainer.appendChild(button);
    });

    opcionesContainer.appendChild(verificarBtn); // Añadir el botón de verificar al contenedor de opciones
}

function seleccionarOpcion(button, opcion, maxSelecciones) {
    if (opcionesSeleccionadas.length < maxSelecciones && !opcionesSeleccionadas.includes(opcion)) {
        opcionesSeleccionadas.push(opcion);
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
    } else if (opcionesSeleccionadas.includes(opcion)) {
        const index = opcionesSeleccionadas.indexOf(opcion);
        opcionesSeleccionadas.splice(index, 1);
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    }

    if (opcionesSeleccionadas.length === maxSelecciones && maxSelecciones > 0) {
        verificarBtn.style.display = 'block'; // Mostrar el botón de verificar cuando se alcanza el número máximo de selecciones
    } else {
        verificarBtn.style.display = 'none'; // Ocultar si no se alcanza el número máximo
    }
}

function verificarRespuesta() {
    const currentQuestion = quizData[currentQuestionIndex];
    textboxContainer.innerHTML = ''; // Limpiar feedback anterior
    const feedbackElement = document.createElement('p');
    feedbackElement.classList.add('mt-3');
    const numCorrectAnswers = currentQuestion.correctAnswers.length;

    let todasCorrectas = false;
    let todasSeleccionadasSonCorrectas = false;

    if (numCorrectAnswers === 1) {
        todasCorrectas = currentQuestion.correctAnswers.includes(opcionesSeleccionadas[0]);
        todasSeleccionadasSonCorrectas = opcionesSeleccionadas.length === 1 && currentQuestion.correctAnswers.includes(opcionesSeleccionadas[0]);
    } else if (numCorrectAnswers === 2) {
        todasCorrectas = currentQuestion.correctAnswers.every(correctAnswer => opcionesSeleccionadas.includes(correctAnswer));
        todasSeleccionadasSonCorrectas = opcionesSeleccionadas.length === 2 && opcionesSeleccionadas.every(seleccionada => currentQuestion.correctAnswers.includes(seleccionada));
    }

    if ((numCorrectAnswers === 1 && todasCorrectas) || (numCorrectAnswers === 2 && todasCorrectas && todasSeleccionadasSonCorrectas)) {
        feedbackElement.textContent = "¡Correcto!";
        feedbackElement.classList.add('text-success');
        siguientePreguntaBtn.style.display = 'block'; // Mostrar el botón de siguiente pregunta
    } else {
        feedbackElement.textContent = `Incorrecto. Las respuestas correctas son: ${currentQuestion.correctAnswers.join(' y ')}`;
        feedbackElement.classList.add('text-danger');
        siguientePreguntaBtn.style.display = 'block'; // Mostrar el botón de siguiente pregunta para intentar de nuevo o avanzar
    }
    textboxContainer.appendChild(feedbackElement);
    verificarBtn.style.display = 'none'; // Ocultar el botón de verificar después de la verificación
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

verificarBtn.addEventListener('click', verificarRespuesta);
siguientePreguntaBtn.addEventListener('click', siguientePregunta);

// Mezclar las preguntas al cargar la página
shuffleArray(quizData);

// Cargar la primera pregunta al cargar la página
mostrarPregunta();