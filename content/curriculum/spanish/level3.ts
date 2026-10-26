import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in Spanish, mirroring
// the English/Swahili Level 3 business-language topic plan.
export const spanishLevel3: LevelCurriculum = {
  langCode: "ES",
  langLabel: "Espagnol",
  langSlug: "spanish",
  level: 3,
  levelTitle: "Nivel 3 - Español de Negocios",
  levelSubtitle: "Comunicación profesional, presentaciones y español del trabajo.",

  lessons: [
    {
      id: 1,
      title: "Condicionales para los Negocios",
      subtitle: "Usa oraciones condicionales para hablar de posibilidades y consecuencias en el trabajo.",
      sections: [
        { heading: "Primer Condicional (posibilidad real)", body: ["Si + presente, futuro simple.", "Si terminamos el informe temprano, lo enviaremos hoy.", "Si el cliente llama, responderé de inmediato."] },
        { heading: "Segundo Condicional (poco probable o hipotético)", body: ["Si + imperfecto de subjuntivo, condicional.", "Si tuviera más tiempo, revisaría la propuesta otra vez.", "Si ella fuera la gerente, cambiaría el horario."] },
        { heading: "Usos Empresariales", body: ["Los condicionales son comunes en negociaciones y planificación.", "Si baja el precio, firmaremos el contrato.", "Si el mercado creciera, consideraríamos expandirnos."] },
      ],
      speakText: `Primer condicional, para una posibilidad real. Si terminamos el informe temprano, lo enviaremos hoy.

Segundo condicional, para algo poco probable o hipotético. Si tuviera más tiempo, revisaría la propuesta otra vez.

Usos empresariales. Los condicionales son comunes en negociaciones y planificación.`,
      videoTopic: "Comparar el primer y el segundo condicional en una negociación empresarial.",
      videoUrl: "https://www.youtube.com/watch?v=aI-pzmJ8ftY",
      readingTitle: "Una Negociación en la Empresa Brightened Mind",
      reading: [
        "Durante la reunión, el proveedor dijo, “Si pide más unidades, le ofreceremos un descuento.”",
        "La gerente respondió, “Si tuviéramos un presupuesto mayor este trimestre, pediríamos el doble ahora mismo.”",
        "Ambas partes siguieron negociando hasta llegar a un acuerdo que convino a todos.",
        "Al final de la reunión, habían firmado un nuevo contrato.",
      ],
      readingSpeakText: `Una negociación en la empresa Brightened Mind. Durante la reunión, el proveedor dijo, si pide más unidades, le ofreceremos un descuento.`,
      exercises: ["Escribe una oración de primer condicional sobre un plazo de trabajo.", "Escribe una oración de segundo condicional sobre un ascenso hipotético.", "Reescribe 'Nos expandiremos si el mercado crece' con otro orden.", "Explica la diferencia entre el primer y el segundo condicional."],
      speakingTopic: "Describe una decisión laboral usando una oración de primer condicional y otra de segundo.",
    },
    {
      id: 2,
      title: "Verbos Modales para los Negocios",
      subtitle: "Usa verbos modales para expresar obligación, consejo y posibilidad profesionalmente.",
      sections: [
        { heading: "Obligación y Necesidad", body: ["Deber / Tener que: una obligación fuerte.", "Todo el personal debe enviar el informe antes del viernes.", "Tienes que firmar el contrato antes de empezar."] },
        { heading: "Consejo y Sugerencia", body: ["Deberías: para dar consejos.", "Deberías revisar los números otra vez antes de enviarlo.", "Deberíamos informar al cliente sobre el retraso."] },
        { heading: "Posibilidad", body: ["Podría / Es posible que: algo es posible pero no seguro.", "El plazo podría cambiar la semana que viene.", "Podríamos considerar otro proveedor."] },
      ],
      speakText: `Obligación y necesidad. Deber y tener que expresan una obligación fuerte. Todo el personal debe enviar el informe antes del viernes.

Consejo y sugerencia. Deberías se usa para dar consejos. Deberías revisar los números otra vez.

Posibilidad. Podría y es posible que muestran que algo es posible pero no seguro.`,
      videoTopic: "Escuchar la diferencia entre obligación, consejo y posibilidad en el trabajo.",
      videoUrl: "https://www.youtube.com/watch?v=gdZNvl7TKyY",
      readingTitle: "Preparativos para la Auditoría",
      reading: [
        "La gerente financiera dijo, “Debemos terminar los documentos de la auditoría antes del lunes.”",
        "Añadió, “También deberían preparar un resumen corto para el director.”",
        "Un empleado preguntó si el plazo podría cambiar, pero la gerente dijo que era poco probable.",
        "Al final, el equipo terminó todo a tiempo y evitó el estrés de último momento.",
      ],
      readingSpeakText: `Preparativos para la auditoría. La gerente financiera dijo, debemos terminar los documentos de la auditoría antes del lunes.`,
      exercises: ["Escribe una oración con 'deber' sobre una obligación laboral.", "Escribe una oración con 'deberías' dando consejo a un colega.", "Escribe una oración con 'podría' sobre un plan incierto.", "Explica la diferencia entre 'deber' y 'deberías'."],
      speakingTopic: "Dale a un colega un consejo y una obligación firme usando verbos modales.",
    },
    {
      id: 3,
      title: "Lenguaje de Negociación",
      subtitle: "Aprende frases para negociar precios, plazos y acuerdos.",
      sections: [
        { heading: "Abrir una Negociación", body: ["Nos gustaría discutir los términos del contrato.", "Hablemos de lo que podemos ofrecernos mutuamente."] },
        { heading: "Hacer una Oferta", body: ["Podemos ofrecerle un descuento del 10% por un pedido mayor.", "Nuestra mejor oferta es...", "Estamos dispuestos a extender el plazo una semana."] },
        { heading: "Responder y Llegar a un Punto Medio", body: ["Eso parece razonable, pero ¿también podría...?", "Podemos llegar a un punto medio.", "Busquemos una solución que funcione para ambas partes."] },
        { heading: "Cerrar un Trato", body: ["Creo que tenemos un acuerdo.", "Pongámoslo por escrito.", "Esperamos trabajar con usted."] },
      ],
      speakText: `Abrir una negociación. Nos gustaría discutir los términos del contrato.

Hacer una oferta. Podemos ofrecerle un descuento del diez por ciento por un pedido mayor.

Responder y llegar a un punto medio. Eso parece razonable, pero ¿también podría...? Podemos llegar a un punto medio.

Cerrar un trato. Creo que tenemos un acuerdo. Pongámoslo por escrito.`,
      videoTopic: "Ver una negociación completa desde el inicio hasta el cierre del trato.",
      videoUrl: "https://www.youtube.com/watch?v=EJ1DFJntu2A",
      readingTitle: "Cerrando el Trato",
      reading: [
        "Dos empresas negociaron durante casi dos horas sobre el precio del nuevo equipo.",
        "Al principio, el comprador dijo que el precio era demasiado alto, pero el vendedor ofreció un descuento del 10% por un pedido mayor.",
        "El comprador respondió, “Eso parece razonable, pero ¿también podría incluir el envío gratis?”",
        "El vendedor aceptó, y ambas partes se dieron la mano diciendo, “Esperamos trabajar con usted.”",
      ],
      readingSpeakText: `Cerrando el trato. Dos empresas negociaron durante casi dos horas sobre el precio del nuevo equipo.`,
      exercises: ["Escribe una oración para abrir una negociación.", "Escribe una oración haciendo una oferta con descuento.", "Escribe una oración llegando a un punto medio entre dos posturas.", "Escribe una oración para cerrar una negociación exitosa."],
      speakingTopic: "Representa una negociación corta sobre precio y tiempo de entrega con un compañero.",
    },
    {
      id: 4,
      title: "Habilidades de Presentación",
      subtitle: "Aprende el lenguaje para estructurar y dar una presentación profesional clara.",
      sections: [
        { heading: "Abrir una Presentación", body: ["Buenos días a todos, gracias por estar aquí.", "Hoy, voy a hablar de...", "La presentación durará unos 15 minutos, seguida de preguntas."] },
        { heading: "Organizar tus Puntos", body: ["Primero, explicaré... Luego, pasaré a... Finalmente, concluiré con...", "Pasemos a la siguiente diapositiva.", "Como pueden ver en este gráfico..."] },
        { heading: "Cerrar una Presentación", body: ["Para resumir, los puntos clave son...", "Gracias por su atención.", "¿Hay alguna pregunta?"] },
      ],
      speakText: `Abrir una presentación. Buenos días a todos, gracias por estar aquí. Hoy, voy a hablar de...

Organizar tus puntos. Primero, explicaré... Luego, pasaré a... Finalmente, concluiré con...

Cerrar una presentación. Para resumir, los puntos clave son... Gracias por su atención. ¿Hay alguna pregunta?`,
      videoTopic: "Ver una presentación profesional corta y bien estructurada.",
      videoUrl: "https://www.youtube.com/watch?v=nq8smHf6YZ0",
      readingTitle: "La Primera Presentación de Linda",
      reading: [
        "Linda estaba nerviosa antes de su primera presentación ante el equipo directivo.",
        "Empezó diciendo, “Buenos días a todos, gracias por estar aquí.”",
        "Estructuró su charla con claridad: primero el problema, luego su solución, y finalmente los resultados.",
        "Al final, dijo, “Para resumir, los puntos clave son la reducción de costos y la entrega más rápida. Gracias por su atención. ¿Hay alguna pregunta?”",
        "El equipo quedó impresionado por lo clara y organizada que fue su presentación.",
      ],
      readingSpeakText: `La primera presentación de Linda. Linda estaba nerviosa antes de su primera presentación ante el equipo directivo.`,
      exercises: ["Escribe una frase de apertura para una presentación sobre tu trabajo.", "Escribe tres frases de transición para pasar entre puntos.", "Escribe una frase de cierre que invite a preguntas.", "Planifica una presentación de 1 minuto sobre tu proyecto favorito."],
      speakingTopic: "Da una presentación corta de 1 minuto sobre un tema de tu elección.",
    },
    {
      id: 5,
      title: "Reuniones Formales y Actas",
      subtitle: "Aprende a participar en reuniones y a escribir un resumen de lo discutido.",
      sections: [
        { heading: "Durante una Reunión", body: ["¿Empezamos?", "¿Me escuchan bien todos?", "Me gustaría plantear un punto.", "¿Podemos volver a esto más tarde?"] },
        { heading: "Pedir la Palabra", body: ["¿Puedo decir algo?", "Si puedo añadir...", "Disculpa que interrumpa, pero..."] },
        { heading: "Escribir Actas de Reunión", body: ["Las actas registran lo discutido y decidido.", "Asistentes: quiénes estuvieron presentes.", "Orden del día: la lista de temas tratados.", "Tareas pendientes: las tareas asignadas, con el responsable y el plazo."] },
      ],
      speakText: `Durante una reunión. ¿Empezamos? ¿Me escuchan bien todos? Me gustaría plantear un punto.

Pedir la palabra. ¿Puedo decir algo? Si puedo añadir... Disculpa que interrumpa, pero...

Escribir actas de reunión. Las actas registran lo discutido y decidido.`,
      videoTopic: "Ver cómo se desarrolla una reunión formal de principio a fin.",
      videoUrl: "https://www.youtube.com/watch?v=0xa5ZRX7B7Q",
      readingTitle: "La Reunión del Lunes",
      reading: [
        "A las 9 de la mañana, el líder del equipo dijo, “¿Empezamos?” y todos estuvieron de acuerdo.",
        "Durante la discusión, Pedro dijo, “Si puedo añadir, creo que también deberíamos revisar el presupuesto.”",
        "Después de la reunión, la secretaria escribió las actas, listando a los asistentes, el orden del día y tres tareas pendientes con plazos.",
        "Todos recibieron una copia de las actas por correo electrónico ese mismo día.",
      ],
      readingSpeakText: `La reunión del lunes. A las nueve de la mañana, el líder del equipo dijo, ¿empezamos? Y todos estuvieron de acuerdo.`,
      exercises: ["Escribe una frase para interrumpir una reunión cortésmente.", "Escribe una frase para pedir añadir un punto.", "Enumera las cuatro partes de las actas de una reunión.", "Escribe un ejemplo de tarea pendiente con responsable y plazo."],
      speakingTopic: "Dirige una reunión corta simulada con un compañero y practica pedir la palabra cortésmente.",
    },
    {
      id: 6,
      title: "Escritura Empresarial: Informes y Propuestas",
      subtitle: "Aprende la estructura de un informe o propuesta profesional.",
      sections: [
        { heading: "Estructura de un Informe", body: ["Introducción: el propósito del informe.", "Resultados: los hechos y datos.", "Conclusión: un resumen de lo encontrado.", "Recomendaciones: próximos pasos sugeridos."] },
        { heading: "Frases Útiles", body: ["El propósito de este informe es...", "Los datos muestran que...", "Según estos resultados, recomendamos...", "En conclusión, ..."] },
      ],
      speakText: `Estructura de un informe. La introducción explica el propósito del informe. Los resultados presentan los hechos y datos. La conclusión resume lo encontrado. Las recomendaciones sugieren próximos pasos.

Frases útiles. El propósito de este informe es... Los datos muestran que... Según estos resultados, recomendamos...`,
      videoTopic: "Ver cómo se organiza un informe empresarial desde la introducción hasta las recomendaciones.",
      videoUrl: "https://www.youtube.com/watch?v=HATatgvgKAs",
      readingTitle: "Un Informe sobre la Satisfacción del Cliente",
      reading: [
        "El propósito de este informe es evaluar la satisfacción del cliente durante el último trimestre.",
        "Los datos muestran que el 85% de los clientes estuvieron satisfechos con el servicio, un aumento respecto al año pasado.",
        "Sin embargo, algunos clientes mencionaron que los tiempos de respuesta podrían ser más rápidos.",
        "Según estos resultados, recomendamos contratar a dos empleados más de atención al cliente.",
        "En conclusión, la satisfacción del cliente está mejorando, pero pequeños cambios podrían hacerla aún mejor.",
      ],
      readingSpeakText: `Un informe sobre la satisfacción del cliente. El propósito de este informe es evaluar la satisfacción del cliente durante el último trimestre.`,
      exercises: ["Escribe una introducción de una oración para un informe sobre tu trabajo.", "Escribe una oración de resultados usando 'Los datos muestran que...'.", "Escribe una recomendación usando 'recomendamos'.", "Escribe una conclusión corta (2 oraciones) de un informe imaginario."],
      speakingTopic: "Resume un informe imaginario sobre el desempeño de tu equipo.",
    },
    {
      id: 7,
      title: "Español para Llamadas y Videollamadas",
      subtitle: "Aprende frases para llamadas telefónicas y videollamadas profesionales.",
      sections: [
        { heading: "Iniciar una Llamada", body: ["Hola, le habla... de la empresa Brightened Mind.", "Le llamo por...", "¿Es un buen momento para hablar?"] },
        { heading: "Durante la Llamada", body: ["¿Podría repetir eso, por favor?", "Lo siento, la línea no se escucha muy bien.", "Déjeme revisar eso y le respondo después.", "¿Me escucha bien?"] },
        { heading: "Terminar una Llamada", body: ["Gracias por su tiempo.", "Le enviaré un correo para confirmar.", "Hablamos pronto. Adiós."] },
      ],
      speakText: `Iniciar una llamada. Hola, le habla... de la empresa Brightened Mind. Le llamo por... ¿Es un buen momento para hablar?

Durante la llamada. ¿Podría repetir eso, por favor? Lo siento, la línea no se escucha muy bien.

Terminar una llamada. Gracias por su tiempo. Le enviaré un correo para confirmar.`,
      videoTopic: "Escuchar una llamada profesional de principio a fin.",
      videoUrl: "https://www.youtube.com/watch?v=C33qoX1u4EA",
      readingTitle: "Una Llamada a un Cliente",
      reading: [
        "“Hola, le habla Sara de la empresa Brightened Mind. Le llamo por su pedido reciente.”",
        "La conexión del cliente no era muy clara, así que Sara dijo, “Lo siento, la línea no se escucha muy bien, ¿podría repetir eso, por favor?”",
        "Después de resolver el problema, Sara dijo, “Gracias por su tiempo, le enviaré un correo para confirmar todo.”",
        "El cliente le agradeció, y terminaron la llamada cortésmente.",
      ],
      readingSpeakText: `Una llamada a un cliente. Hola, le habla Sara de la empresa Brightened Mind. Le llamo por su pedido reciente.`,
      exercises: ["Escribe cómo iniciarías una llamada profesional.", "Escribe una frase para pedirle a alguien que repita.", "Escribe una frase para terminar una llamada cortésmente.", "Practica un diálogo telefónico corto con un compañero."],
      speakingTopic: "Representa una llamada telefónica presentándote y explicando el motivo de tu llamada.",
    },
    {
      id: 8,
      title: "Networking y Conversación Informal",
      subtitle: "Aprende a causar una buena impresión profesional en conversaciones informales.",
      sections: [
        { heading: "Iniciar una Conversación Informal", body: ["Entonces, ¿cómo conoces a los organizadores?", "¿A qué te dedicas?", "¿Has estado antes en uno de estos eventos?"] },
        { heading: "Intercambiar Información de Contacto", body: ["Fue un placer hablar contigo. ¿Podría tener tu tarjeta de visita?", "Conectémonos en LinkedIn.", "Te escribiré por correo la semana que viene."] },
        { heading: "Temas Seguros vs. Temas a Evitar", body: ["Seguros: el trabajo, las tendencias del sector, el evento mismo, los viajes.", "A evitar: el salario, la política, los problemas personales, la religión."] },
      ],
      speakText: `Iniciar una conversación informal. Entonces, ¿cómo conoces a los organizadores? ¿A qué te dedicas?

Intercambiar información de contacto. Fue un placer hablar contigo. ¿Podría tener tu tarjeta de visita? Conectémonos en LinkedIn.

Temas seguros versus temas a evitar. Seguros: el trabajo, las tendencias del sector. A evitar: el salario, la política.`,
      videoTopic: "Ver una conversación informal natural en un evento de negocios.",
      videoUrl: "https://www.youtube.com/watch?v=fw0fEIBNN30",
      readingTitle: "Conociendo a Alguien Nuevo en una Conferencia",
      reading: [
        "En la conferencia, Miguel se presentó a un desconocido que estaba cerca de la mesa de café.",
        "Le preguntó, “¿A qué te dedicas?” y descubrieron que trabajaban en sectores similares.",
        "Hablaron sobre las tendencias del sector y los viajes durante unos diez minutos.",
        "Antes de irse, Miguel dijo, “Fue un placer hablar contigo, ¿podría tener tu tarjeta de visita? Conectémonos en LinkedIn.”",
      ],
      readingSpeakText: `Conociendo a alguien nuevo en una conferencia. En la conferencia, Miguel se presentó a un desconocido que estaba cerca de la mesa de café.`,
      exercises: ["Escribe dos preguntas de conversación informal para un evento de negocios.", "Escribe una frase para pedir la información de contacto de alguien.", "Enumera dos temas seguros y dos temas a evitar.", "Practica una conversación corta de networking con un compañero."],
      speakingTopic: "Practica presentarte y hacer conversación informal en un evento de networking imaginario.",
    },
    {
      id: 9,
      title: "Resolución de Problemas y Toma de Decisiones",
      subtitle: "Aprende el lenguaje para identificar problemas y tomar decisiones en el trabajo.",
      sections: [
        { heading: "Identificar un Problema", body: ["Hemos tenido un problema con...", "El problema principal parece ser...", "Esto ha causado un retraso en..."] },
        { heading: "Sugerir Soluciones", body: ["Una opción sería...", "Podríamos intentar...", "¿Qué tal si...?"] },
        { heading: "Tomar una Decisión", body: ["Vayamos con esta opción.", "Creo que ese es el mejor curso de acción.", "Hemos decidido seguir adelante con..."] },
      ],
      speakText: `Identificar un problema. Hemos tenido un problema con... El problema principal parece ser... Esto ha causado un retraso en...

Sugerir soluciones. Una opción sería... Podríamos intentar... ¿Qué tal si...?

Tomar una decisión. Vayamos con esta opción. Hemos decidido seguir adelante con...`,
      videoTopic: "Ver a un equipo identificar un problema y acordar una solución juntos.",
      videoUrl: "https://www.youtube.com/watch?v=yafHNmVp-Og",
      readingTitle: "Un Problema de Entrega",
      reading: [
        "El equipo de logística dijo, “Hemos tenido un problema con el camión de reparto. El problema principal parece ser un fallo mecánico.”",
        "El gerente pidió sugerencias, y un empleado dijo, “¿Qué tal si alquilamos un camión para las entregas de hoy?”",
        "Tras una breve discusión, el gerente dijo, “Vayamos con esta opción. Hemos decidido alquilar un camión de inmediato.”",
        "Las entregas se completaron a tiempo gracias a la decisión rápida.",
      ],
      readingSpeakText: `Un problema de entrega. El equipo de logística dijo, hemos tenido un problema con el camión de reparto.`,
      exercises: ["Escribe una oración identificando un problema en el trabajo.", "Escribe dos soluciones sugeridas usando 'Podríamos intentar' y '¿Qué tal si'.", "Escribe una oración tomando una decisión final.", "Describe un problema que resolviste recientemente usando el lenguaje de esta lección."],
      speakingTopic: "Describe un problema laboral y propone dos posibles soluciones.",
    },
    {
      id: 10,
      title: "Comunicación Intercultural",
      subtitle: "Aprende a comunicarte de forma respetuosa y eficaz con colegas internacionales.",
      sections: [
        { heading: "Por Qué Importa la Conciencia Cultural", body: ["Culturas diferentes tienen normas diferentes sobre el tiempo, la formalidad y la franqueza.", "Ser consciente de estas diferencias ayuda a evitar malentendidos."] },
        { heading: "Frases Útiles", body: ["¿Podría ayudarme a entender cómo se hace esto normalmente en su país?", "Quiero asegurarme de haber entendido bien.", "Por favor, avíseme si digo algo que no quede claro."] },
        { heading: "Consejos para una Comunicación Clara", body: ["Habla con claridad y evita modismos complicados.", "Verifica la comprensión con preguntas simples de seguimiento.", "Sé paciente y respetuoso con los diferentes estilos de comunicación."] },
      ],
      speakText: `Por qué importa la conciencia cultural. Culturas diferentes tienen normas diferentes sobre el tiempo, la formalidad y la franqueza.

Frases útiles. ¿Podría ayudarme a entender cómo se hace esto normalmente en su país?

Consejos para una comunicación clara. Habla con claridad y evita modismos complicados.`,
      videoTopic: "Ver cómo un equipo internacional se comunica con claridad entre culturas.",
      videoUrl: "https://www.youtube.com/watch?v=HCaTtjFch6g",
      readingTitle: "Trabajando con un Equipo Internacional",
      reading: [
        "Cuando la empresa Brightened Mind empezó a trabajar con socios en el extranjero, el equipo notó algunas diferencias culturales.",
        "En algunas reuniones, los colegas eran muy directos, mientras que en otras preferian discutir las cosas más despacio.",
        "Para evitar malentendidos, el líder del equipo a menudo preguntaba, “¿Podría ayudarme a entender cómo se hace esto normalmente en su país?”",
        "Este hábito sencillo ayudó a todo el equipo a comunicarse de forma más respetuosa y eficaz.",
      ],
      readingSpeakText: `Trabajando con un equipo internacional. Cuando la empresa Brightened Mind empezó a trabajar con socios en el extranjero, el equipo notó algunas diferencias culturales.`,
      exercises: ["Escribe una oración preguntando sobre el estilo de trabajo de otra cultura.", "Escribe una oración para verificar tu comprensión cortésmente.", "Enumera dos consejos para una comunicación clara entre culturas.", "Describe una ocasión en la que te comunicaste con alguien de un origen diferente."],
      speakingTopic: "Habla de cómo te comunicarías respetuosamente con un colega internacional.",
    },
    {
      id: 11,
      title: "Vocabulario de Liderazgo y Gestión",
      subtitle: "Aprende vocabulario clave usado por gerentes y líderes en el trabajo.",
      sections: [
        { heading: "Vocabulario Clave", body: ["Delegar: dar una tarea a otra persona.", "Motivar: animar a alguien a trabajar bien.", "Retroalimentación: comentarios sobre el desempeño de alguien.", "Responsabilidad: hacerse cargo de tus acciones y resultados."] },
        { heading: "Dar Retroalimentación", body: ["Realmente aprecio el esfuerzo que pusiste en esto.", "Un área que podrías mejorar es...", "Pongamos una meta clara para la próxima vez."] },
        { heading: "Liderar un Equipo", body: ["Me gustaría delegarte esta tarea.", "Buen trabajo motivando al equipo esta semana.", "Todos necesitamos ser responsables de nuestros plazos."] },
      ],
      speakText: `Vocabulario clave. Delegar significa dar una tarea a otra persona. Motivar significa animar a alguien a trabajar bien. Retroalimentación son comentarios sobre el desempeño. Responsabilidad es hacerse cargo de tus resultados.

Dar retroalimentación. Realmente aprecio el esfuerzo que pusiste en esto.

Liderar un equipo. Me gustaría delegarte esta tarea.`,
      videoTopic: "Ver a un gerente dar retroalimentación clara y respetuosa a un miembro del equipo.",
      videoUrl: "https://www.youtube.com/watch?v=Ku2CcLh6ZiE",
      readingTitle: "Un Nuevo Líder de Equipo",
      reading: [
        "Cuando José se convirtió en líder de equipo, aprendió a delegar tareas en lugar de hacerlo todo él mismo.",
        "También aprendió a dar retroalimentación clara, diciendo cosas como, “Realmente aprecio el esfuerzo que pusiste en esto. Un área que podrías mejorar es cumplir los plazos.”",
        "Su equipo se volvió más motivado porque se sentían confiados y responsables de su propio trabajo.",
        "En pocos meses, el desempeño del equipo mejoró significativamente.",
      ],
      readingSpeakText: `Un nuevo líder de equipo. Cuando José se convirtió en líder de equipo, aprendió a delegar tareas en lugar de hacerlo todo él mismo.`,
      exercises: ["Define 'delegar', 'motivar', 'retroalimentación' y 'responsabilidad' con tus propias palabras.", "Escribe una oración de retroalimentación positiva para un colega.", "Escribe una oración de retroalimentación constructiva cortés.", "Describe a un buen líder que conozcas usando el vocabulario de la lección."],
      speakingTopic: "Dale a un miembro imaginario de tu equipo retroalimentación sobre su trabajo reciente.",
    },
    {
      id: 12,
      title: "Repaso Final y Conversación Real de Negocios",
      subtitle: "Repasa todo lo aprendido en el Nivel 3 y practica una conversación profesional completa.",
      sections: [
        {
          heading: "Lo que Hemos Aprendido",
          body: [
            "Usar condicionales y verbos modales profesionalmente",
            "Negociar precios y acuerdos",
            "Dar presentaciones claras",
            "Participar en reuniones y escribir actas",
            "Escribir informes y propuestas",
            "Manejar llamadas y videollamadas",
            "Hacer networking y conversación informal",
            "Resolver problemas y tomar decisiones",
            "Comunicarse entre culturas",
            "Usar vocabulario de liderazgo y gestión",
          ],
        },
        {
          heading: "Ejemplo de Conversación Real",
          body: [
            "A: Buenos días. Gracias por unirse a esta llamada.",
            "B: Buenos días, encantado de estar aquí. Le llamo por la propuesta que envió.",
            "A: Por supuesto. ¿Qué opina?",
            "B: En general, parece sólida. Si pudieran extender el plazo de entrega una semana, firmaríamos de inmediato.",
            "A: Eso suena razonable. Déjeme revisarlo con mi equipo y le respondo hoy.",
            "B: Perfecto, gracias por su tiempo. Espero que trabajemos juntos.",
          ],
        },
      ],
      speakText: `Lo importante que hemos aprendido en el Nivel 3 incluye usar condicionales y verbos modales profesionalmente, negociar, dar presentaciones, participar en reuniones, escribir informes, manejar llamadas, hacer networking, resolver problemas, comunicarse entre culturas, y vocabulario de liderazgo.

Ejemplo de conversación real.

Buenos días. Gracias por unirse a esta llamada.
Buenos días, encantado de estar aquí. Le llamo por la propuesta que envió.`,
      videoTopic: "Repasar todos los temas del Nivel 3 a través de una conversación de negocios completa.",
      videoUrl: "https://www.youtube.com/watch?v=ougsRwg2ItA",
      readingTitle: "Completando el Programa",
      reading: [
        "Después de terminar los Niveles 1, 2 y 3, Chantal ahora puede dirigir reuniones, escribir informes profesionales y negociar con clientes internacionales con confianza.",
        "Recuerda tener dificultades con saludos simples cuando empezó, y ahora da presentaciones completas en español.",
        "Chantal dice que practicar conversaciones reales, no solo reglas de gramática, marcó la mayor diferencia.",
        "Ahora está lista para usar el español con confianza en su carrera en la empresa Brightened Mind.",
      ],
      readingSpeakText: `Completando el programa. Después de terminar los Niveles 1, 2 y 3, Chantal ahora puede dirigir reuniones, escribir informes profesionales y negociar con clientes internacionales con confianza.`,
      exercises: ["Escribe un diálogo profesional corto usando al menos tres temas del Nivel 3.", "Practica la conversación de ejemplo en voz alta con un compañero.", "Escribe un párrafo corto sobre tu viaje de aprendizaje del español.", "Da una presentación resumen de 1 minuto sobre lo que aprendiste en los tres niveles."],
      speakingTopic: "Haz una llamada profesional completa: saluda, discute una propuesta, negocia y cierra cortésmente.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Examen 1",
      subtitle: "Condicionales para los Negocios",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es una oración de primer condicional?", options: ["Si terminamos temprano, lo enviaremos hoy", "Si fuera rico, viajaría", "Si llovió ayer"], answer: "Si terminamos temprano, lo enviaremos hoy" },
        { question: "¿Cuál es una oración de segundo condicional?", options: ["Si tuviera más tiempo, lo revisaría de nuevo", "Si llamas, responderé", "Si ganamos, celebramos"], answer: "Si tuviera más tiempo, lo revisaría de nuevo" },
        { question: "¿Qué tiempo sigue a 'si' en el primer condicional?", options: ["presente", "imperfecto de subjuntivo", "condicional"], answer: "presente" },
        { question: "¿Qué tiempo sigue a 'si' en el segundo condicional?", options: ["imperfecto de subjuntivo", "presente", "futuro"], answer: "imperfecto de subjuntivo" },
        { question: "¿Los condicionales son comunes en qué actividad empresarial?", options: ["Negociaciones y planificación", "Limpiar la oficina", "Pausas para el almuerzo"], answer: "Negociaciones y planificación" },
        { question: "¿Qué ofreció el proveedor en la conversación?", options: ["Un descuento por un pedido mayor", "Un regalo gratis", "Nada"], answer: "Un descuento por un pedido mayor" },
        { question: "¿Qué dijo la gerente sobre el presupuesto?", options: ["Si tuvieran un presupuesto mayor, pedirían el doble", "No tenían presupuesto", "El presupuesto era ilimitado"], answer: "Si tuvieran un presupuesto mayor, pedirían el doble" },
        { question: "¿Qué pasó al final de la reunión?", options: ["Firmaron un nuevo contrato", "Cancelaron el trato", "No se decidió nada"], answer: "Firmaron un nuevo contrato" },
        { question: "Elige la oración correcta con 'tuviera'.", options: ["Si tuviera más tiempo, lo revisaría otra vez", "Si tuviera más tiempo revisaré otra vez", "Tuviera si más tiempo"], answer: "Si tuviera más tiempo, lo revisaría otra vez" },
        { question: "¿Por qué son importantes los condicionales en el español de negocios?", options: ["Ayudan a discutir posibilidades y consecuencias", "Solo se usan para cocinar", "No tienen un uso real"], answer: "Ayudan a discutir posibilidades y consecuencias" },
      ],
    },
    {
      lessonId: 2,
      title: "Examen 2",
      subtitle: "Verbos Modales para los Negocios",
      passingScore: 7,
      questions: [
        { question: "¿Qué verbo expresa una obligación fuerte?", options: ["deber", "podría", "deberías"], answer: "deber" },
        { question: "¿Qué verbo se usa para dar consejos?", options: ["deberías", "deber", "voy a"], answer: "deberías" },
        { question: "¿Qué verbo muestra posibilidad?", options: ["podría", "debe", "necesitaba"], answer: "podría" },
        { question: "Elige la oración correcta.", options: ["Todo el personal debe enviar el informe antes del viernes", "Todo el personal podría enviar debe", "Debe podría el personal enviar"], answer: "Todo el personal debe enviar el informe antes del viernes" },
        { question: "Elige la oración de consejo.", options: ["Deberías revisar los números otra vez", "Debes revisar nunca", "Podrías revisar siempre"], answer: "Deberías revisar los números otra vez" },
        { question: "¿Qué dijo la gerente financiera que era necesario?", options: ["Terminar los documentos de la auditoría antes del lunes", "Cerrar la oficina", "Empezar las vacaciones"], answer: "Terminar los documentos de la auditoría antes del lunes" },
        { question: "¿Qué más sugirió la gerente?", options: ["Preparar un resumen corto para el director", "Cancelar la auditoría", "Retrasar el trabajo"], answer: "Preparar un resumen corto para el director" },
        { question: "¿Cambió el plazo?", options: ["No, era poco probable", "Sí, de inmediato", "El plazo nunca se mencionó"], answer: "No, era poco probable" },
        { question: "¿Cuándo terminó el equipo el trabajo?", options: ["A tiempo", "Muy tarde", "Nunca"], answer: "A tiempo" },
        { question: "¿Cuál es la diferencia entre 'deber' y 'deberías'?", options: ["'Deber' es una obligación fuerte, 'deberías' es un consejo", "Significan exactamente lo mismo", "'Deberías' es más fuerte"], answer: "'Deber' es una obligación fuerte, 'deberías' es un consejo" },
      ],
    },
    {
      lessonId: 3,
      title: "Examen 3",
      subtitle: "Lenguaje de Negociación",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase abre una negociación?", options: ["Nos gustaría discutir los términos del contrato", "Adiós para siempre", "No quiero hablar"], answer: "Nos gustaría discutir los términos del contrato" },
        { question: "¿Qué frase hace una oferta?", options: ["Podemos ofrecerle un descuento del 10%", "Nos negamos por completo", "No hay acuerdo"], answer: "Podemos ofrecerle un descuento del 10%" },
        { question: "¿Qué frase muestra llegar a un punto medio?", options: ["Podemos llegar a un punto medio", "Nunca estaremos de acuerdo", "Lo tomas o lo dejas"], answer: "Podemos llegar a un punto medio" },
        { question: "¿Qué frase cierra un trato?", options: ["Pongámoslo por escrito", "Olvidemos que esto pasó", "No estoy de acuerdo en absoluto"], answer: "Pongámoslo por escrito" },
        { question: "¿Durante cuánto tiempo negociaron las dos empresas?", options: ["Casi dos horas", "Cinco minutos", "Toda la semana"], answer: "Casi dos horas" },
        { question: "¿Qué pensó el comprador del precio al principio?", options: ["Era demasiado alto", "Era demasiado bajo", "Era perfecto"], answer: "Era demasiado alto" },
        { question: "¿Qué descuento ofreció el vendedor?", options: ["10% por un pedido mayor", "50% para todos", "Ningún descuento"], answer: "10% por un pedido mayor" },
        { question: "¿Qué pidió además el comprador?", options: ["Envío gratis", "Un nuevo logo", "Una reunión más larga"], answer: "Envío gratis" },
        { question: "¿Cómo terminó la negociación?", options: ["Ambas partes se dieron la mano y acordaron", "El trato se derrumbó", "Nunca volvieron a hablar"], answer: "Ambas partes se dieron la mano y acordaron" },
        { question: "¿Qué frase usaron al final?", options: ["Esperamos trabajar con usted", "No queremos volver a reunirnos", "Esto fue una pérdida de tiempo"], answer: "Esperamos trabajar con usted" },
      ],
    },
    {
      lessonId: 4,
      title: "Examen 4",
      subtitle: "Habilidades de Presentación",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase abre una presentación?", options: ["Buenos días a todos, gracias por estar aquí", "Adiós a todos", "No tengo nada que decir"], answer: "Buenos días a todos, gracias por estar aquí" },
        { question: "¿Qué frase avanza a un nuevo punto?", options: ["Pasemos a la siguiente diapositiva", "El final", "Nada"], answer: "Pasemos a la siguiente diapositiva" },
        { question: "¿Qué frase cierra una presentación?", options: ["Para resumir, los puntos clave son...", "Olvidé lo que iba a decir", "Empecemos de nuevo"], answer: "Para resumir, los puntos clave son..." },
        { question: "¿Qué frase invita a preguntas?", options: ["¿Hay alguna pregunta?", "No se permiten preguntas", "Eso es todo, adiós"], answer: "¿Hay alguna pregunta?" },
        { question: "¿Quién estaba nerviosa antes de su primera presentación?", options: ["Linda", "Sara", "Clara"], answer: "Linda" },
        { question: "¿Cómo estructuró Linda su charla?", options: ["Problema, luego solución, luego resultados", "Sin ningún orden", "Solo chistes"], answer: "Problema, luego solución, luego resultados" },
        { question: "¿Cuáles fueron los puntos clave que Linda resumió?", options: ["Reducción de costos y entrega más rápida", "Decoración de la oficina", "Menú del almuerzo"], answer: "Reducción de costos y entrega más rápida" },
        { question: "¿Cómo se sintió el equipo sobre la presentación de Linda?", options: ["Impresionados por lo clara que fue", "Confundidos", "Se fueron de la sala"], answer: "Impresionados por lo clara que fue" },
        { question: "¿Qué debe tener una presentación al principio?", options: ["Una idea clara de lo que se tratará", "Nada, empezar sin orden", "Solo la conclusión"], answer: "Una idea clara de lo que se tratará" },
        { question: "¿Qué frase ayuda a explicar un gráfico?", options: ["Como pueden ver en este gráfico...", "No entiendo este gráfico", "Los gráficos no sirven"], answer: "Como pueden ver en este gráfico..." },
      ],
    },
    {
      lessonId: 5,
      title: "Examen 5",
      subtitle: "Reuniones Formales y Actas",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase inicia una reunión?", options: ["¿Empezamos?", "La reunión se cancela", "Adiós"], answer: "¿Empezamos?" },
        { question: "¿Qué frase interrumpe cortésmente?", options: ["Disculpa que interrumpa, pero...", "Cállate", "Deja de hablar ahora"], answer: "Disculpa que interrumpa, pero..." },
        { question: "¿Qué frase pide añadir algo?", options: ["Si puedo añadir...", "Me niego a hablar", "Esto es absurdo"], answer: "Si puedo añadir..." },
        { question: "¿Qué registran las actas de una reunión?", options: ["Lo discutido y decidido", "Solo los chistes dichos", "Nada importante"], answer: "Lo discutido y decidido" },
        { question: "¿Qué son las 'tareas pendientes'?", options: ["Tareas asignadas, con responsable y plazo", "Aperitivos servidos en la reunión", "El nombre de la reunión"], answer: "Tareas asignadas, con responsable y plazo" },
        { question: "¿A qué hora empezó la reunión del lunes?", options: ["A las 9 de la mañana", "Al mediodía", "A las 6 de la tarde"], answer: "A las 9 de la mañana" },
        { question: "¿Qué sugirió Pedro revisar?", options: ["El presupuesto", "El menú", "El logo"], answer: "El presupuesto" },
        { question: "¿Quién escribió las actas?", options: ["La secretaria", "Pedro", "Nadie"], answer: "La secretaria" },
        { question: "¿Qué incluían las actas?", options: ["Asistentes, orden del día y tareas pendientes", "Solo la fecha", "Solo chistes"], answer: "Asistentes, orden del día y tareas pendientes" },
        { question: "¿Cómo recibió el equipo las actas?", options: ["Por correo electrónico ese mismo día", "Nunca las recibieron", "Por correo postal un mes después"], answer: "Por correo electrónico ese mismo día" },
      ],
    },
    {
      lessonId: 6,
      title: "Examen 6",
      subtitle: "Escritura Empresarial: Informes y Propuestas",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es la primera parte de un informe?", options: ["Introducción", "Recomendaciones", "Resultados"], answer: "Introducción" },
        { question: "¿Qué sección presenta hechos y datos?", options: ["Resultados", "Introducción", "Conclusión"], answer: "Resultados" },
        { question: "¿Qué sección sugiere próximos pasos?", options: ["Recomendaciones", "Resultados", "Introducción"], answer: "Recomendaciones" },
        { question: "¿Qué frase presenta el propósito de un informe?", options: ["El propósito de este informe es...", "Había una vez...", "Fin."], answer: "El propósito de este informe es..." },
        { question: "¿Qué frase presenta datos?", options: ["Los datos muestran que...", "Creo que tal vez...", "Quién sabe..."], answer: "Los datos muestran que..." },
        { question: "¿Sobre qué trataba el informe?", options: ["La satisfacción del cliente", "Las vacaciones de los empleados", "El mobiliario de oficina"], answer: "La satisfacción del cliente" },
        { question: "¿Qué porcentaje de clientes estaban satisfechos?", options: ["85%", "15%", "50%"], answer: "85%" },
        { question: "¿Qué mencionaron algunos clientes?", options: ["Los tiempos de respuesta podrían ser más rápidos", "Los precios eran demasiado bajos", "Nada"], answer: "Los tiempos de respuesta podrían ser más rápidos" },
        { question: "¿Qué recomendó el informe?", options: ["Contratar a dos empleados más de atención al cliente", "Cerrar la empresa", "Reducir personal"], answer: "Contratar a dos empleados más de atención al cliente" },
        { question: "¿Cuál fue la conclusión del informe?", options: ["La satisfacción está mejorando pero pequeños cambios podrían ayudar", "Todo era perfecto", "Todo era terrible"], answer: "La satisfacción está mejorando pero pequeños cambios podrían ayudar" },
      ],
    },
    {
      lessonId: 7,
      title: "Examen 7",
      subtitle: "Español para Llamadas y Videollamadas",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase inicia una llamada profesional?", options: ["Hola, le habla... de...", "¿Quién eres?", "¿Qué quieres?"], answer: "Hola, le habla... de..." },
        { question: "¿Qué frase pide a alguien que repita?", options: ["¿Podría repetir eso, por favor?", "No me importa lo que dijiste", "Cállate"], answer: "¿Podría repetir eso, por favor?" },
        { question: "¿Qué frase termina una llamada cortésmente?", options: ["Gracias por su tiempo", "Voy a colgar ahora", "Como sea"], answer: "Gracias por su tiempo" },
        { question: "¿Qué frase verifica la conexión?", options: ["¿Me escucha bien?", "No me importa si me escuchas", "Esta llamada es aburrida"], answer: "¿Me escucha bien?" },
        { question: "¿Quién llamó al cliente?", options: ["Sara", "Linda", "Clara"], answer: "Sara" },
        { question: "¿Sobre qué era la llamada?", options: ["El pedido reciente del cliente", "Una entrevista de trabajo", "Una queja por ruido"], answer: "El pedido reciente del cliente" },
        { question: "¿Qué problema ocurrió durante la llamada?", options: ["La línea no se escuchaba bien", "La llamada se cortó", "Nadie respondió"], answer: "La línea no se escuchaba bien" },
        { question: "¿Qué dijo Sara que haría después de la llamada?", options: ["Enviar un correo para confirmar", "Llamar de nuevo en 5 minutos", "Nada"], answer: "Enviar un correo para confirmar" },
        { question: "¿Cómo terminó la llamada?", options: ["Cortésmente, con agradecimiento de ambas partes", "El cliente colgó enojado", "Nunca se resolvió"], answer: "Cortésmente, con agradecimiento de ambas partes" },
        { question: "¿Qué frase es útil si no entiendes algo?", options: ["Lo siento, la línea no se escucha muy bien", "Entendí todo perfectamente", "Por favor deje de llamar"], answer: "Lo siento, la línea no se escucha muy bien" },
      ],
    },
    {
      lessonId: 8,
      title: "Examen 8",
      subtitle: "Networking y Conversación Informal",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es una buena pregunta de conversación informal?", options: ["¿A qué te dedicas?", "¿Cuánto dinero ganas?", "¿Por qué estás aquí?"], answer: "¿A qué te dedicas?" },
        { question: "¿Qué frase pide información de contacto?", options: ["¿Podría tener tu tarjeta de visita?", "Dame tu teléfono ahora", "No necesito tu contacto"], answer: "¿Podría tener tu tarjeta de visita?" },
        { question: "¿Qué tema es generalmente seguro para conversación informal?", options: ["Las tendencias del sector", "El salario", "Los problemas personales"], answer: "Las tendencias del sector" },
        { question: "¿Qué tema se debería evitar generalmente?", options: ["La política", "El evento mismo", "Los viajes"], answer: "La política" },
        { question: "¿Dónde conoció Miguel a alguien nuevo?", options: ["En una conferencia", "En un campo deportivo", "En un restaurante"], answer: "En una conferencia" },
        { question: "¿Qué pregunta hizo Miguel?", options: ["¿A qué te dedicas?", "¿Cuántos años tienes?", "¿Dónde vives?"], answer: "¿A qué te dedicas?" },
        { question: "¿Qué descubrieron que tenían en común?", options: ["Trabajaban en sectores similares", "Eran vecinos", "Estudiaron juntos"], answer: "Trabajaban en sectores similares" },
        { question: "¿Sobre qué hablaron durante diez minutos?", options: ["Las tendencias del sector y los viajes", "Solo el clima", "Nada"], answer: "Las tendencias del sector y los viajes" },
        { question: "¿Qué pidió Miguel antes de irse?", options: ["Una tarjeta de visita", "Dinero", "Un regalo"], answer: "Una tarjeta de visita" },
        { question: "¿Qué plataforma sugirió Miguel para conectar?", options: ["LinkedIn", "Cualquier plataforma al azar", "Ninguna plataforma"], answer: "LinkedIn" },
      ],
    },
    {
      lessonId: 9,
      title: "Examen 9",
      subtitle: "Resolución de Problemas y Toma de Decisiones",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase identifica un problema?", options: ["Hemos tenido un problema con...", "Todo está perfecto", "No hay problemas aquí"], answer: "Hemos tenido un problema con..." },
        { question: "¿Qué frase sugiere una solución?", options: ["¿Qué tal si...?", "Me niego a pensar", "Nada se puede hacer"], answer: "¿Qué tal si...?" },
        { question: "¿Qué frase toma una decisión final?", options: ["Vayamos con esta opción", "Tal vez algún otro día", "Nunca puedo decidir"], answer: "Vayamos con esta opción" },
        { question: "¿Con qué problema se encontró el equipo de logística?", options: ["Un fallo mecánico en el camión de reparto", "Un empleado ausente", "Una oficina cerrada"], answer: "Un fallo mecánico en el camión de reparto" },
        { question: "¿Qué solución sugirió un empleado?", options: ["Alquilar un camión para las entregas de hoy", "Cancelar todas las entregas", "Esperar un mes"], answer: "Alquilar un camión para las entregas de hoy" },
        { question: "¿Qué decidió el gerente?", options: ["Alquilar un camión de inmediato", "No hacer nada", "Despedir al equipo"], answer: "Alquilar un camión de inmediato" },
        { question: "¿Se completaron las entregas a tiempo?", options: ["Sí, gracias a la decisión rápida", "No, todas se retrasaron", "El texto no lo dice"], answer: "Sí, gracias a la decisión rápida" },
        { question: "¿Qué frase muestra que algo causó un retraso?", options: ["Esto ha causado un retraso en...", "Todo va a tiempo", "No hay ningún retraso"], answer: "Esto ha causado un retraso en..." },
        { question: "¿Qué frase ofrece una opción?", options: ["Una opción sería...", "No hay opciones", "Deja de sugerir cosas"], answer: "Una opción sería..." },
        { question: "¿Por qué es importante este lenguaje en el trabajo?", options: ["Ayuda a identificar problemas y acordar soluciones rápido", "Solo se usa en restaurantes", "No tiene un uso real"], answer: "Ayuda a identificar problemas y acordar soluciones rápido" },
      ],
    },
    {
      lessonId: 10,
      title: "Examen 10",
      subtitle: "Comunicación Intercultural",
      passingScore: 7,
      questions: [
        { question: "¿Por qué importa la conciencia cultural en el trabajo?", options: ["Ayuda a evitar malentendidos", "No tiene un uso real", "Solo se trata de vacaciones"], answer: "Ayuda a evitar malentendidos" },
        { question: "¿Qué frase ayuda a entender el estilo de otra cultura?", options: ["¿Podría ayudarme a entender cómo se hace esto en su país?", "Tu forma está equivocada", "No me importa tu cultura"], answer: "¿Podría ayudarme a entender cómo se hace esto en su país?" },
        { question: "¿Qué frase verifica la comprensión cortésmente?", options: ["Quiero asegurarme de haber entendido bien", "No tiene sentido lo que dices", "Olvídalo"], answer: "Quiero asegurarme de haber entendido bien" },
        { question: "¿Cuál es un consejo para una comunicación clara?", options: ["Evitar modismos complicados", "Hablar lo más rápido posible", "Usar solo jerga"], answer: "Evitar modismos complicados" },
        { question: "¿Qué diferencia notó el equipo?", options: ["Diferencias en franqueza y ritmo de las reuniones", "Ninguna diferencia", "Solo diferencias de comida"], answer: "Diferencias en franqueza y ritmo de las reuniones" },
        { question: "¿Qué preguntaba a menudo el líder del equipo?", options: ["Cómo se hacen las cosas en el país de su colega", "Nunca hacía preguntas", "Solo sobre el clima"], answer: "Cómo se hacen las cosas en el país de su colega" },
        { question: "¿Qué ayudó a hacer este hábito al equipo?", options: ["Comunicarse de forma más respetuosa y eficaz", "Evitar comunicarse por completo", "Ignorar las diferencias culturales"], answer: "Comunicarse de forma más respetuosa y eficaz" },
        { question: "¿Cómo deberías ser al comunicarte entre culturas?", options: ["Paciente y respetuoso", "Apresurado y brusco", "Completamente callado"], answer: "Paciente y respetuoso" },
        { question: "¿Qué ayuda a verificar la comprensión en una conversación?", options: ["Preguntas simples de seguimiento", "Ignorar al hablante", "Cambiar de tema de inmediato"], answer: "Preguntas simples de seguimiento" },
        { question: "¿Sobre qué pueden tener normas diferentes las culturas?", options: ["El tiempo, la formalidad y la franqueza", "Solo la ropa", "Nada importante"], answer: "El tiempo, la formalidad y la franqueza" },
      ],
    },
    {
      lessonId: 11,
      title: "Examen 11",
      subtitle: "Vocabulario de Liderazgo y Gestión",
      passingScore: 7,
      questions: [
        { question: "¿Qué significa 'delegar'?", options: ["Dar una tarea a otra persona", "Ignorar una tarea", "Cancelar una reunión"], answer: "Dar una tarea a otra persona" },
        { question: "¿Qué significa 'motivar'?", options: ["Animar a alguien a trabajar bien", "Desanimar a alguien", "Despedir a alguien"], answer: "Animar a alguien a trabajar bien" },
        { question: "¿Qué significa 'retroalimentación'?", options: ["Comentarios sobre el desempeño de alguien", "Un tipo de sala de reuniones", "Un día festivo de la empresa"], answer: "Comentarios sobre el desempeño de alguien" },
        { question: "¿Qué significa 'responsabilidad'?", options: ["Hacerse cargo de tus acciones y resultados", "Evitar la responsabilidad", "Trabajar siempre solo"], answer: "Hacerse cargo de tus acciones y resultados" },
        { question: "¿Qué aprendió a hacer José como líder de equipo?", options: ["Delegar tareas en lugar de hacerlo todo él mismo", "Hacer todo él solo", "Evitar dar retroalimentación"], answer: "Delegar tareas en lugar de hacerlo todo él mismo" },
        { question: "¿Qué tipo de retroalimentación dio José?", options: ["Clara y constructiva", "Solo severa", "Nunca dio retroalimentación"], answer: "Clara y constructiva" },
        { question: "¿Por qué se volvió más motivado el equipo?", options: ["Se sintieron confiados y responsables", "Les dieron más vacaciones", "Les redujeron el trabajo"], answer: "Se sintieron confiados y responsables" },
        { question: "¿Qué pasó con el desempeño del equipo?", options: ["Mejoró significativamente", "Empeoró", "Se mantuvo exactamente igual"], answer: "Mejoró significativamente" },
        { question: "¿Qué frase da retroalimentación positiva?", options: ["Realmente aprecio el esfuerzo que pusiste en esto", "Nunca haces nada bien", "No me importa tu trabajo"], answer: "Realmente aprecio el esfuerzo que pusiste en esto" },
        { question: "¿Qué frase trata sobre la responsabilidad?", options: ["Todos necesitamos ser responsables de nuestros plazos", "Los plazos no le importan a nadie", "Solo tú eres responsable"], answer: "Todos necesitamos ser responsables de nuestros plazos" },
      ],
    },
    {
      lessonId: 12,
      title: "Examen 12",
      subtitle: "Repaso Final y Conversación Real de Negocios",
      passingScore: 7,
      questions: [
        { question: "¿Qué gramática se repasó en la Lección 1?", options: ["Condicionales", "Colores", "Números"], answer: "Condicionales" },
        { question: "¿Sobre qué trataba la Lección 3?", options: ["Lenguaje de negociación", "Vocabulario de cocina", "Deportes"], answer: "Lenguaje de negociación" },
        { question: "¿Qué habilidad se enfocó la Lección 4?", options: ["Habilidades de presentación", "Jardinería", "Conducir"], answer: "Habilidades de presentación" },
        { question: "¿Con qué tenía dificultades Chantal al empezar?", options: ["Saludos simples", "Cálculos complicados", "Escribir canciones"], answer: "Saludos simples" },
        { question: "¿Qué puede hacer Chantal ahora?", options: ["Dirigir reuniones, escribir informes y negociar con clientes internacionales", "Nada nuevo", "Solo decir saludos"], answer: "Dirigir reuniones, escribir informes y negociar con clientes internacionales" },
        { question: "¿Qué marcó la mayor diferencia para Chantal según el texto?", options: ["Practicar conversaciones reales", "Leer solo libros de gramática", "Evitar hablar español en el trabajo"], answer: "Practicar conversaciones reales" },
        { question: "En la llamada de ejemplo, ¿qué pidió el hablante B?", options: ["Extender el plazo de entrega una semana", "Un descuento del 50%", "Cancelar el contrato"], answer: "Extender el plazo de entrega una semana" },
        { question: "¿Cómo respondió el hablante A a la petición?", options: ["Aceptó revisarlo con su equipo y responder hoy", "Se negó de inmediato", "Colgó la llamada"], answer: "Aceptó revisarlo con su equipo y responder hoy" },
        { question: "¿Cómo terminó la llamada de ejemplo?", options: ["Cortésmente, esperando trabajar juntos", "En una discusión", "Sin ninguna resolución"], answer: "Cortésmente, esperando trabajar juntos" },
        { question: "¿Qué está lista Chantal para hacer ahora?", options: ["Usar el español con confianza en el trabajo", "Dejar su trabajo", "Evitar el español de negocios"], answer: "Usar el español con confianza en el trabajo" },
      ],
    },
  ],

  finalQuiz: {
    title: "Examen Final - Nivel 3",
    subtitle: "Este examen cubre todas las lecciones del Nivel 3.",
    passingScore: 15,
    questions: [
      { question: "¿Cuál es una oración de primer condicional?", options: ["Si terminamos temprano, lo enviaremos hoy", "Si tuviera alas, volaría", "Si llovió"], answer: "Si terminamos temprano, lo enviaremos hoy" },
      { question: "¿Qué verbo expresa una obligación fuerte?", options: ["deber", "podría", "puede"], answer: "deber" },
      { question: "¿Qué frase hace una oferta en una negociación?", options: ["Podemos ofrecerle un descuento", "Nos negamos a hablar", "No hay oferta"], answer: "Podemos ofrecerle un descuento" },
      { question: "¿Qué frase abre una presentación?", options: ["Buenos días a todos, gracias por estar aquí", "Adiós", "No tengo nada que decir"], answer: "Buenos días a todos, gracias por estar aquí" },
      { question: "¿Qué frase inicia una reunión?", options: ["¿Empezamos?", "La reunión se cancela", "Ninguna opinión"], answer: "¿Empezamos?" },
      { question: "¿Cuál es la primera parte de un informe empresarial?", options: ["Introducción", "Recomendaciones", "Conclusión"], answer: "Introducción" },
      { question: "¿Qué frase inicia una llamada profesional?", options: ["Hola, le habla... de...", "¿Quién eres?", "¿Qué quieres?"], answer: "Hola, le habla... de..." },
      { question: "¿Qué tema es seguro para conversación informal?", options: ["Las tendencias del sector", "El salario", "La política"], answer: "Las tendencias del sector" },
      { question: "¿Qué frase identifica un problema?", options: ["Hemos tenido un problema con...", "Todo está perfecto", "No hay problemas"], answer: "Hemos tenido un problema con..." },
      { question: "¿Qué frase ayuda con la comunicación intercultural?", options: ["¿Podría ayudarme a entender cómo se hace esto en su país?", "Tu forma está equivocada", "No me importa tu cultura"], answer: "¿Podría ayudarme a entender cómo se hace esto en su país?" },
      { question: "¿Qué significa 'delegar'?", options: ["Dar una tarea a otra persona", "Ignorar una tarea", "Cancelar una reunión"], answer: "Dar una tarea a otra persona" },
      { question: "¿Qué ofreció el proveedor en la Lección 1?", options: ["Un descuento por un pedido mayor", "Un regalo gratis", "Nada"], answer: "Un descuento por un pedido mayor" },
      { question: "¿Cómo estructuró Linda su presentación?", options: ["Problema, luego solución, luego resultados", "Sin ningún orden", "Solo chistes"], answer: "Problema, luego solución, luego resultados" },
      { question: "¿Qué incluían las actas de la reunión?", options: ["Asistentes, orden del día y tareas pendientes", "Solo la fecha", "Solo chistes"], answer: "Asistentes, orden del día y tareas pendientes" },
      { question: "¿Qué porcentaje de clientes estaban satisfechos en el informe?", options: ["85%", "15%", "50%"], answer: "85%" },
      { question: "¿Qué dijo Sara que haría después de la llamada con el cliente?", options: ["Enviar un correo para confirmar", "Volver a llamar de inmediato", "Nada"], answer: "Enviar un correo para confirmar" },
      { question: "¿Qué pidió Miguel a la persona que conoció?", options: ["Una tarjeta de visita", "Dinero", "Un regalo"], answer: "Una tarjeta de visita" },
      { question: "¿Qué solución eligió el equipo de logística?", options: ["Alquilar un camión de inmediato", "Esperar un mes", "Cancelar las entregas"], answer: "Alquilar un camión de inmediato" },
      { question: "¿Qué ayudó al equipo de José a motivarse más?", options: ["Sentirse confiados y responsables", "Recibir más vacaciones", "Tener menos trabajo"], answer: "Sentirse confiados y responsables" },
      { question: "¿Qué marcó la mayor diferencia para Chantal al final?", options: ["Practicar conversaciones reales", "Leer solo libros de gramática", "Evitar el español en el trabajo"], answer: "Practicar conversaciones reales" },
    ],
  },
};
