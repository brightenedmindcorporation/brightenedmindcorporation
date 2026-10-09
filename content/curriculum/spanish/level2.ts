import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in Spanish, mirroring
// the English/Swahili Level 2 topic plan.
export const spanishLevel2: LevelCurriculum = {
  langCode: "ES",
  langLabel: "Espagnol",
  langSlug: "spanish",
  level: 2,
  levelTitle: "Nivel 2 - Español Intermedio",
  levelSubtitle: "Desarrolla fluidez con gramática, conversación y español de la vida real.",

  lessons: [
    {
      id: 1,
      title: "Repaso de Gramática Intermedia",
      subtitle: "Repasa la estructura de la oración y la concordancia.",
      sections: [
        { heading: "Partes de una Oración", body: ["Cada oración necesita un sujeto y un verbo.", "Sujeto = de quién o de qué habla la oración.", "Verbo = la acción o el estado.", "Ejemplo: Sara (sujeto) lee (verbo) un libro (objeto)."] },
        { heading: "Concordancia", body: ["Un sujeto singular lleva un verbo singular.", "Ella trabaja en un hospital.", "Un sujeto plural lleva un verbo plural.", "Ellos trabajan en un hospital."] },
        { heading: "Errores Comunes", body: ["Incorrecto: Los niños juega afuera.", "Correcto: Los niños juegan afuera.", "Incorrecto: Él van a la escuela.", "Correcto: Él va a la escuela."] },
      ],
      speakText: `Cada oración necesita un sujeto y un verbo.

Sujeto significa de quién o de qué habla la oración. Verbo significa la acción.

Ejemplo: Sara lee un libro.

Concordancia. Un sujeto singular lleva un verbo singular: ella trabaja en un hospital.

Errores comunes. Incorrecto: los niños juega afuera. Correcto: los niños juegan afuera.`,
      videoTopic: "Repasar la estructura de la oración y la concordancia con ejemplos.",
      readingTitle: "Me llamo Grace.",
      reading: [
        "Ahora estoy estudiando español de nivel intermedio.",
        "Cada día, practico construir oraciones correctas.",
        "Mi profesora dice que una buena oración siempre tiene un sujeto claro y un verbo que concuerda.",
        "La semana pasada cometi muchos errores, pero esta semana reviso mi gramática con cuidado antes de hablar.",
      ],
      readingSpeakText: `Me llamo Grace. Ahora estoy estudiando español de nivel intermedio. Cada día, practico construir oraciones correctas.`,
      exercises: ["Identifica el sujeto y el verbo en tres oraciones de un periódico.", "Corrige esta oración: Los estudiantes está listos.", "Escribe dos oraciones con 'yo' y dos con 'ella'.", "Explica por qué 'Él van' es incorrecto."],
      speakingTopic: "Explica con tus propias palabras qué son el sujeto y el verbo.",
    },
    {
      id: 2,
      title: "Pasado y Futuro",
      subtitle: "Aprende a hablar de lo que ya pasó y de lo que pasará.",
      sections: [
        { heading: "Pretérito", body: ["Se usa para acciones terminadas en el pasado.", "Verbos regulares: trabajé, caminé, jugué.", "Verbos irregulares: ir → fui, comer → comí, ver → vi.", "Ayer, visité a mi abuela."] },
        { heading: "Pretérito Imperfecto", body: ["Se usa para una acción en progreso en el pasado.", "A las 8 de la noche, yo estudiaba español.", "Mientras ella cocinaba, sonó el teléfono."] },
        { heading: "Futuro con 'ir a' y el Futuro Simple", body: ["'Ir a' se usa para planes ya decididos.", "Voy a visitar París el año que viene.", "El futuro simple se usa para predicciones o decisiones rápidas.", "Creo que lloverá mañana.", "Te ayudaré con la tarea."] },
      ],
      speakText: `El pretérito se usa para acciones terminadas en el pasado. Ayer, visité a mi abuela.

El pretérito imperfecto se usa para una acción en progreso en el pasado. A las ocho de la noche, yo estudiaba español.

Futuro con ir a y el futuro simple. Voy a visitar París el año que viene. Creo que lloverá mañana.`,
      videoTopic: "Comparar el pretérito, el imperfecto y las dos formas de futuro.",
      readingTitle: "El año pasado, Tomás viajó a Lubumbashi por primera vez.",
      reading: [
        "Mientras esperaba el autobús, se encontró con un viejo amigo de la escuela.",
        "Hablaron casi una hora y recordaron su infancia juntos.",
        "Tomás dijo que va a visitar Lubumbashi otra vez el próximo verano.",
        "También dijo que invitará a su amigo a ir con él esta vez.",
      ],
      readingSpeakText: `El año pasado, Tomás viajó a Lubumbashi por primera vez. Mientras esperaba el autobús, se encontró con un viejo amigo de la escuela.`,
      exercises: ["Escribe tres oraciones sobre lo que hiciste ayer usando el pretérito.", "Escribe una oración usando el imperfecto.", "Escribe una oración sobre tus planes para el año que viene usando 'ir a'.", "Haz una predicción rápida sobre el clima."],
      speakingTopic: "Habla de algo que hiciste el fin de semana pasado y algo que harás el próximo.",
    },
    {
      id: 3,
      title: "Práctica de Conversación",
      subtitle: "Practica hacer preguntas y mantener una conversación de forma natural.",
      sections: [
        { heading: "Tipos de Preguntas", body: ["Preguntas de Sí/No: ¿Te gusta el café?", "Preguntas con Qué, Dónde, Cuándo, Quién, Por qué, Cómo.", "¿A qué te dedicas?", "¿De dónde eres?"] },
        { heading: "Mantener una Conversación", body: ["Muestra interés: ¿En serio? ¡Qué interesante! Cuéntame más.", "Haz una pregunta de seguimiento en vez de solo responder.", "A: Fui al mercado esta mañana. B: Ah, qué bien, ¿qué compraste?"] },
        { heading: "Estar de Acuerdo y en Desacuerdo Cortésmente", body: ["Estoy de acuerdo contigo.", "Es un buen punto, pero creo que...", "No estoy segura de estar de acuerdo. En mi opinión..."] },
      ],
      speakText: `Tipos de preguntas. Preguntas de sí o no: ¿te gusta el café? Preguntas con qué, dónde, cuándo, quién.

Mantener una conversación. Muestra interés: ¿en serio? Cuéntame más.

Estar de acuerdo y en desacuerdo cortésmente. Estoy de acuerdo contigo. Es un buen punto, pero creo que...`,
      videoTopic: "Practicar preguntas de seguimiento en una conversación real.",
      readingTitle: "El viernes pasado, Pablo conoció a una nueva compañera de trabajo llamada Clara.",
      reading: [
        "Le preguntó, “¿De dónde eres?” y ella dijo que era de Goma.",
        "Pablo luego hizo una pregunta de seguimiento: “¿Cuánto tiempo llevas viviendo aquí?”",
        "Clara dijo que estaba de acuerdo en que la ciudad era muy amigable, pero añadió que el tráfico podía ser difícil.",
        "Pablo dijo que ese era un buen punto, y ambos se rieron.",
      ],
      readingSpeakText: `El viernes pasado, Pablo conoció a una nueva compañera de trabajo llamada Clara. Le preguntó, ¿de dónde eres?`,
      exercises: ["Escribe tres preguntas con Qué/Dónde que podrías hacerle a un nuevo compañero de trabajo.", "Practica un diálogo corto donde estés de acuerdo y luego en desacuerdo cortésmente.", "Escribe una pregunta de seguimiento para: 'Vi una película anoche.'", "Representa presentarte y hacer dos preguntas."],
      speakingTopic: "Ten una conversación corta con un compañero usando al menos dos preguntas de seguimiento.",
    },
    {
      id: 4,
      title: "Habilidades de Escritura",
      subtitle: "Aprende a organizar ideas en párrafos claros usando conectores.",
      sections: [
        { heading: "Estructura del Párrafo", body: ["Un párrafo tiene una idea principal.", "Oración temática: presenta la idea principal.", "Oraciones de apoyo: dan detalles y ejemplos.", "Oración de conclusión: cierra la idea."] },
        { heading: "Palabras Conectoras", body: ["Adición: y, también, además.", "Contraste: pero, sin embargo, aunque.", "Causa y efecto: porque, así que, por lo tanto.", "Secuencia: primero, luego, después, finalmente."] },
        { heading: "Párrafo de Ejemplo", body: ["Me encanta aprender español porque me abre muchas oportunidades. Primero, puedo comunicarme con más gente. Además, entiendo mejor las películas y las canciones. Sin embargo, aprender un idioma nuevo requiere tiempo y paciencia. Por lo tanto, practico todos los días."] },
      ],
      speakText: `Un párrafo tiene una idea principal. La oración temática presenta la idea principal. Las oraciones de apoyo dan detalles.

Palabras conectoras. Adición: y, también. Contraste: pero, sin embargo. Causa y efecto: porque, por lo tanto.`,
      videoTopic: "Ver cómo las palabras conectoras unen ideas en un párrafo.",
      readingTitle: "Por Qué Me Gusta Leer",
      reading: [
        "Me gusta leer porque me ayuda a relajarme después de un día largo.",
        "Primero, elijo un lugar tranquilo en mi casa.",
        "Luego, leo durante unos treinta minutos.",
        "Aunque a veces me quedo dormida, siempre aprendo algo nuevo.",
        "Por lo tanto, leer se ha convertido en uno de mis hábitos favoritos.",
      ],
      readingSpeakText: `Por qué me gusta leer. Me gusta leer porque me ayuda a relajarme después de un día largo.`,
      exercises: ["Escribe una oración temática sobre tu pasatiempo favorito.", "Añade dos oraciones de apoyo con detalles.", "Usa 'porque' y 'sin embargo' en dos oraciones diferentes.", "Escribe un párrafo corto (4-5 oraciones) sobre tu día típico."],
      speakingTopic: "Describe tu pasatiempo favorito usando una oración temática clara y detalles de apoyo.",
    },
    {
      id: 5,
      title: "Habilidades de Escucha",
      subtitle: "Aprende estrategias para entender el español hablado más fácilmente.",
      sections: [
        { heading: "Estrategias de Escucha", body: ["Escucha las palabras clave, no cada palabra.", "Presta atención al tema principal primero.", "Usa el contexto para adivinar el significado de palabras nuevas.", "Está bien pedirle a alguien que repita: '¿Puedes repetir eso, por favor?'"] },
        { heading: "Frases Útiles para Escuchar", body: ["No entendí eso.", "¿Puedes hablar más despacio, por favor?", "Perdón, ¿qué dijiste?", "Entonces, si entiendo bien, quieres decir que..."] },
        { heading: "Seguir Direcciones", body: ["Gira a la izquierda / Gira a la derecha.", "Sigue derecho.", "Está a tu izquierda / derecha.", "Toma la segunda calle a la derecha."] },
      ],
      speakText: `Estrategias de escucha. Escucha las palabras clave, no cada palabra. Presta atención al tema principal primero.

Está bien pedirle a alguien que repita: ¿puedes repetir eso, por favor?

Seguir direcciones. Gira a la izquierda. Gira a la derecha. Sigue derecho.`,
      videoTopic: "Practicar seguir direcciones habladas por la ciudad.",
      readingTitle: "Marie le preguntó a un desconocido cómo llegar a la oficina de correos.",
      reading: [
        "El hombre dijo, “Sigue derecho, luego gira a la izquierda en el mercado.”",
        "Marie no entendió todo, así que dijo, “Perdón, ¿puedes repetir eso, por favor?”",
        "El hombre repitió despacio: “Sigue derecho, gira a la izquierda en el mercado, y la oficina de correos está a tu derecha.”",
        "Marie le agradeció y encontró la oficina de correos fácilmente.",
      ],
      readingSpeakText: `Marie le preguntó a un desconocido cómo llegar a la oficina de correos. El hombre dijo, sigue derecho, luego gira a la izquierda en el mercado.`,
      exercises: ["Escribe tres frases que puedas usar cuando no entiendes a alguien.", "Da direcciones desde tu casa hasta el mercado más cercano.", "Practica escuchar a alguien hablar y luego resume lo que dijo.", "Explica para qué se usa 'si entiendo bien'."],
      speakingTopic: "Dale a un compañero direcciones desde la escuela hasta tu casa.",
    },
    {
      id: 6,
      title: "Comprensión de Lectura",
      subtitle: "Aprende técnicas para entender textos más largos de manera más efectiva.",
      sections: [
        { heading: "Lectura Rápida y Búsqueda de Datos", body: ["Lectura rápida: leer rápido para entender la idea general.", "Búsqueda de datos: buscar rápidamente información específica, como una fecha o un nombre.", "Lee el título y la primera oración de cada párrafo antes de leer en detalle."] },
        { heading: "Usar Pistas de Contexto", body: ["No necesitas entender cada palabra para entender un texto.", "Usa las palabras alrededor de una palabra desconocida para adivinar su significado.", "Ejemplo: 'El clima era gelido, así que todos llevaban abrigos pesados.' Gelido probablemente significa muy frío."] },
      ],
      speakText: `La lectura rápida significa leer rápido para entender la idea general.

La búsqueda de datos significa buscar rápidamente información específica, como una fecha o un nombre.

Usar pistas de contexto. No necesitas entender cada palabra para entender un texto.`,
      videoTopic: "Practicar la lectura rápida de un artículo corto para encontrar la idea principal.",
      readingTitle: "El Mercado de Kolwezi",
      reading: [
        "Cada sábado, cientos de personas se reúnen en el mercado central de Kolwezi.",
        "Los vendedores venden de todo, desde verduras frescas hasta ropa hecha a mano.",
        "El ambiente es animado, con música sonando y vendedores gritando sus precios.",
        "Muchas familias llegan temprano por la mañana antes de que se llene demasiado.",
        "Hacia el mediodía, el mercado está lleno de colores, ruido y el olor de comida fresca.",
      ],
      readingSpeakText: `El mercado de Kolwezi. Cada sábado, cientos de personas se reúnen en el mercado central de Kolwezi.`,
      exercises: ["Lee el texto rápidamente en 10 segundos y di de qué trata.", "Busca en el texto qué día ocurre el mercado.", "Adivina el significado de 'animado' por el contexto.", "Escribe dos oraciones describiendo un mercado que conozcas."],
      speakingTopic: "Describe un mercado o lugar concurrido que hayas visitado.",
    },
    {
      id: 7,
      title: "Ampliación de Vocabulario",
      subtitle: "Amplía tu vocabulario con sinónimos, antónimos y familias de palabras.",
      sections: [
        { heading: "Sinónimos (significado similar)", body: ["Feliz = contento, alegre", "Grande = enorme, inmenso", "Inteligente = listo, agudo", "Rápido = veloz, raudo"] },
        { heading: "Antónimos (significado opuesto)", body: ["Caliente ↔ Frío", "Fácil ↔ Difícil", "Temprano ↔ Tarde", "Empezar ↔ Terminar"] },
        { heading: "Familias de Palabras", body: ["Tener éxito (verbo) → éxito (sustantivo) → exitoso (adjetivo) → exitosamente (adverbio).", "Decidir (verbo) → decisión (sustantivo) → decisivo (adjetivo)."] },
        { heading: "Colocaciones (palabras que van juntas)", body: ["Tomar una decisión (no 'hacer una decisión')", "Tomar una foto", "Hacer la tarea", "Desayunar"] },
      ],
      speakText: `Sinónimos, palabras con significado similar. Feliz significa contento o alegre. Grande significa enorme o inmenso.

Antónimos, palabras con significado opuesto. Caliente y frío. Fácil y difícil.

Familias de palabras. Tener éxito, éxito, exitoso, exitosamente.

Colocaciones son palabras que van juntas. Tomar una decisión. Tomar una foto. Hacer la tarea.`,
      videoTopic: "Construir vocabulario a través de sinónimos, antónimos y pares de palabras comunes.",
      readingTitle: "Construyendo un Vocabulario Más Amplio",
      reading: [
        "Aprender palabras nuevas todos los días es una de las mejores formas de mejorar tu español rápidamente.",
        "En lugar de memorizar palabras sueltas, intenta aprenderlas en grupos, como sinónimos o familias de palabras.",
        "Por ejemplo, si aprendes 'decidir', aprende también 'decisión' y 'decisivo'.",
        "De esta manera, una palabra nueva en realidad te enseña tres o cuatro.",
      ],
      readingSpeakText: `Construyendo un vocabulario más amplio. Aprender palabras nuevas todos los días es una de las mejores formas de mejorar tu español rápidamente.`,
      exercises: ["Encuentra un sinónimo de 'feliz' y 'rápido'.", "Encuentra un antónimo de 'empezar' y 'fácil'.", "Escribe el sustantivo y el adjetivo de 'tener éxito'.", "Usa 'tomar una decisión' y 'tomar una foto' en dos oraciones."],
      speakingTopic: "Describe tu día usando al menos tres palabras nuevas de esta lección.",
    },
    {
      id: 8,
      title: "Dominio de la Pronunciación",
      subtitle: "Mejora el acento, la entonación y los sonidos que se confunden frecuentemente.",
      sections: [
        { heading: "Acento de las Palabras", body: ["Las palabras en español tienen una sílaba tónica (más fuerte).", "FOtografía, fotoGRAfo, fotográfico. ¡El acento se mueve!", "Acentuar la sílaba equivocada puede confundir al oyente."] },
        { heading: "Entonación", body: ["Las preguntas de Sí/No suelen subir al final: ¿Vienes? ↗", "Las preguntas con Qué/Dónde suelen bajar al final: ¿Adónde vas? ↘"] },
        { heading: "Sonidos que se Confunden Frecuentemente", body: ["R vs RR: pero vs perro.", "B vs V: suenan casi igual en español, pero hay que distinguirlos al escribir.", "LL vs Y: calle vs mayo."] },
      ],
      speakText: `Acento de las palabras. Las palabras en español tienen una sílaba tónica. Fotografía, fotógrafo, fotográfico.

Entonación. Las preguntas de sí o no suelen subir al final: ¿vienes?

Sonidos que se confunden frecuentemente. Pero versus perro.`,
      videoTopic: "Escuchar la diferencia entre la entonación ascendente y descendente.",
      readingTitle: "Por Qué Importa la Pronunciación",
      reading: [
        "La buena gramática es importante, pero una pronunciación clara ayuda a la gente a entenderte de inmediato.",
        "Muchos estudiantes se enfocan solo en sonidos individuales y olvidan el acento de las palabras.",
        "Una palabra con el acento equivocado puede sonar como una palabra completamente diferente.",
        "Practicar un poco cada día, incluso cinco minutos, hace una gran diferencia con el tiempo.",
      ],
      readingSpeakText: `Por qué importa la pronunciación. La buena gramática es importante, pero una pronunciación clara ayuda a la gente a entenderte de inmediato.`,
      exercises: ["Practica decir 'fotografía', 'fotógrafo' y 'fotográfico' en voz alta.", "Di una pregunta de Sí/No con entonación ascendente.", "Di una pregunta con Qué/Dónde con entonación descendente.", "Practica las palabras 'pero' y 'perro'."],
      speakingTopic: "Lee el texto de lectura en voz alta prestando atención al acento de las palabras.",
    },
    {
      id: 9,
      title: "Español para Situaciones Reales",
      subtitle: "Aprende frases útiles para situaciones cotidianas de la vida real.",
      sections: [
        { heading: "En un Restaurante", body: ["¿Podría ver el menú, por favor?", "Quisiera el pollo, por favor.", "¿Podríamos tener la cuenta, por favor?", "¿Está incluido el servicio?"] },
        { heading: "En el Aeropuerto", body: ["¿Dónde está el mostrador de facturación?", "Quisiera un asiento junto a la ventana, por favor.", "¿A qué hora embarca el vuelo?", "¿Dónde está la recogida de equipaje?"] },
        { heading: "En una Entrevista de Trabajo", body: ["Hábleme de usted.", "¿Cuáles son sus fortalezas?", "¿Por qué quiere trabajar aquí?", "Soy una persona trabajadora y confiable."] },
      ],
      speakText: `En un restaurante. ¿Podría ver el menú, por favor? Quisiera el pollo, por favor.

En el aeropuerto. ¿Dónde está el mostrador de facturación? Quisiera un asiento junto a la ventana.

En una entrevista de trabajo. Hábleme de usted. ¿Cuáles son sus fortalezas?`,
      videoTopic: "Practicar diálogos reales en un restaurante, aeropuerto y entrevista de trabajo.",
      readingTitle: "La Entrevista de Trabajo de Ana",
      reading: [
        "Ana llegó temprano a su entrevista de trabajo y saludó al gerente cortésmente.",
        "Cuando el gerente le preguntó, “Hábleme de usted”, Ana habló con confianza sobre sus estudios y experiencia.",
        "Explicó que su principal fortaleza era ser trabajadora y confiable.",
        "Al final, Ana hizo su propia pregunta: “¿Cómo es un día típico en este puesto?”",
        "El gerente quedó impresionado por su preparación.",
      ],
      readingSpeakText: `La entrevista de trabajo de Ana. Ana llegó temprano a su entrevista de trabajo y saludó al gerente cortésmente.`,
      exercises: ["Escribe un diálogo corto de restaurante pidiendo comida.", "Escribe dos preguntas que podrías hacer en el mostrador de facturación.", "Responde la pregunta de entrevista '¿Cuáles son sus fortalezas?' sobre ti mismo.", "Practica el diálogo completo de la entrevista con un compañero."],
      speakingTopic: "Representa una entrevista de trabajo con un compañero, haciendo y respondiendo preguntas comunes.",
    },
    {
      id: 10,
      title: "Español Empresarial Básico",
      subtitle: "Aprende vocabulario profesional para correos electrónicos y reuniones.",
      sections: [
        { heading: "Escribir un Correo Profesional", body: ["Estimado Sr. Kasongo, (saludo)", "Le escribo para consultar sobre... (propósito)", "Por favor, avíseme si necesita más información. (cierre)", "Atentamente, (despedida)"] },
        { heading: "Frases Útiles para Reuniones", body: ["Empecemos.", "¿Podría aclarar ese punto?", "Me gustaría añadir algo.", "Pasemos al siguiente punto.", "En resumen, acordamos que..."] },
        { heading: "Vocabulario Profesional", body: ["Plazo: la fecha límite en que algo debe terminarse.", "Colega: una persona con la que trabajas.", "Cliente: una persona o empresa a la que das servicio.", "Informe: un resumen escrito de información."] },
      ],
      speakText: `Escribir un correo profesional. Estimado Sr. Kasongo. Le escribo para consultar sobre... Atentamente.

Frases útiles para reuniones. Empecemos. ¿Podría aclarar ese punto? Me gustaría añadir algo.

Vocabulario profesional. Plazo significa la fecha límite. Colega significa una persona con la que trabajas.`,
      videoTopic: "Ver cómo se estructura un correo profesional y una conversación de reunión.",
      readingTitle: "La Primera Semana de David en un Nuevo Trabajo",
      reading: [
        "Durante su primera reunión, David escuchó a su jefa decir, “Empecemos.”",
        "Escuchó con atención y, cuando no entendió un punto, dijo, “¿Podría aclarar eso, por favor?”",
        "Más tarde ese día, David escribió su primer correo profesional a un cliente, empezando con “Estimada Sra. Tshisekedi” y terminando con “Atentamente.”",
        "Su colega le dijo que el correo era claro y estaba bien escrito.",
      ],
      readingSpeakText: `La primera semana de David en un nuevo trabajo. Durante su primera reunión, David escuchó a su jefa decir, empecemos.`,
      exercises: ["Escribe un correo profesional corto preguntando sobre una oferta de trabajo.", "Escribe dos frases que podrías usar para participar en una reunión.", "Usa 'plazo', 'colega' y 'cliente' cada uno en una oración.", "Practica decir '¿Podría aclarar ese punto?' en voz alta."],
      speakingTopic: "Explica qué hace que un correo suene profesional.",
    },
    {
      id: 11,
      title: "Debates y Argumentos",
      subtitle: "Aprende a expresar y defender tu opinión respetuosamente.",
      sections: [
        { heading: "Dar tu Opinión", body: ["En mi opinión, ...", "Personalmente creo que ...", "Desde mi punto de vista, ...", "Por lo que a mí respecta, ..."] },
        { heading: "Estar de Acuerdo y en Desacuerdo Formalmente", body: ["Estoy completamente de acuerdo con ese punto.", "Entiendo tu punto, pero tengo una opinión diferente.", "Me temo que tengo que estar en desacuerdo.", "Eso es cierto, sin embargo, también deberíamos considerar..."] },
        { heading: "Apoyar un Argumento", body: ["Por ejemplo, ...", "Esto se respalda con el hecho de que ...", "Los estudios muestran que ...", "En conclusión, creo que ..."] },
      ],
      speakText: `Dar tu opinión. En mi opinión... Personalmente creo que... Desde mi punto de vista...

Estar de acuerdo y en desacuerdo formalmente. Estoy completamente de acuerdo con ese punto. Entiendo tu punto, pero tengo una opinión diferente.

Apoyar un argumento. Por ejemplo... Los estudios muestran que... En conclusión, creo que...`,
      videoTopic: "Ver un debate corto y respetuoso usando frases de opinión y argumento.",
      readingTitle: "Un Debate en Clase",
      reading: [
        "En clase, los estudiantes debatieron si los teléfonos deberían permitirse en la escuela.",
        "José dijo, “En mi opinión, los teléfonos nos ayudan a aprender porque podemos buscar información rápidamente.”",
        "Grace respondió, “Entiendo tu punto, pero tengo una opinión diferente. Los teléfonos pueden ser muy distractores durante las clases.”",
        "El profesor dijo que ambos argumentos estaban bien respaldados y animó a la clase a seguir discutiendo con respeto.",
      ],
      readingSpeakText: `Un debate en clase. En clase, los estudiantes debatieron si los teléfonos deberían permitirse en la escuela.`,
      exercises: ["Da tu opinión sobre aprender español usando 'En mi opinión...'.", "Practica estar en desacuerdo cortésmente con la opinión de un compañero.", "Escribe un argumento respaldado por 'Por ejemplo...'.", "Escribe una conclusión corta usando 'En conclusión, creo que...'."],
      speakingTopic: "Debate un tema simple (como la vida en la ciudad frente a la vida en el campo) con un compañero.",
    },
    {
      id: 12,
      title: "Repaso Final y Conversación de la Vida Real",
      subtitle: "Repasa todo lo aprendido en el Nivel 2 y practica una conversación más larga de la vida real.",
      sections: [
        {
          heading: "Lo que Hemos Aprendido",
          body: [
            "Repasar la estructura de la oración y la concordancia",
            "Usar correctamente el pasado y el futuro",
            "Mantener conversaciones con preguntas de seguimiento",
            "Escribir párrafos organizados con conectores",
            "Estrategias de escucha y pedir aclaraciones",
            "Lectura rápida y búsqueda de datos para la comprensión lectora",
            "Ampliar el vocabulario con sinónimos y familias de palabras",
            "Mejorar la pronunciación, el acento y la entonación",
            "Usar español en restaurantes, aeropuertos y entrevistas",
            "Escribir correos profesionales y hablar en reuniones",
            "Dar opiniones y debatir con respeto",
          ],
        },
        {
          heading: "Ejemplo de Conversación de la Vida Real",
          body: [
            "A: Hola, me enteré de que empezaste un nuevo trabajo. ¿Cómo va?",
            "B: Va bien, ¡gracias! Estaba nerviosa al principio, pero mis colegas son muy amables.",
            "A: Qué bueno escuchar eso. ¿Qué haces exactamente?",
            "B: Escribo informes y respondo correos de clientes. Es un reto, pero estoy aprendiendo mucho.",
            "A: En mi opinión, esa es una habilidad muy útil de tener.",
            "B: Estoy de acuerdo. Seguiré mejorando mi español también para el trabajo.",
          ],
        },
      ],
      speakText: `Lo importante que hemos aprendido en el Nivel 2 incluye repasar la estructura de la oración, usar el pasado y el futuro, mantener conversaciones, escribir párrafos, estrategias de escucha, comprensión lectora, ampliación de vocabulario, pronunciación, español para situaciones reales, español empresarial, y debatir con respeto.

Ejemplo de conversación de la vida real.

Hola, me enteré de que empezaste un nuevo trabajo. ¿Cómo va?
Va bien, ¡gracias! Estaba nerviosa al principio, pero mis colegas son muy amables.`,
      videoTopic: "Repasar todos los temas del Nivel 2 a través de una conversación extendida.",
      readingTitle: "Un Año de Progreso",
      reading: [
        "Hace un año, Patrick apenas podía presentarse en español.",
        "Después de terminar el Nivel 1 y el Nivel 2, ahora puede mantener una conversación completa sobre su trabajo, sus opiniones y su vida diaria.",
        "Escribe correos profesionales en el trabajo y se siente seguro en las reuniones.",
        "Patrick dice que la clave de su progreso fue practicar un poco todos los días.",
        "Ahora está emocionado por empezar el Nivel 3 y seguir mejorando.",
      ],
      readingSpeakText: `Un año de progreso. Hace un año, Patrick apenas podía presentarse en español.`,
      exercises: ["Preséntate usando al menos dos puntos de gramática del Nivel 2.", "Escribe un párrafo corto sobre tu progreso aprendiendo español.", "Practica la conversación de ejemplo en voz alta con un compañero.", "Da tu opinión sobre la utilidad de aprender español para el trabajo."],
      speakingTopic: "Ten una conversación completa sobre tus estudios, tus opiniones y tus planes futuros.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Examen 1",
      subtitle: "Repaso de Gramática Intermedia",
      passingScore: 7,
      questions: [
        { question: "¿Qué necesita toda oración?", options: ["Un sujeto y un verbo", "Solo un adjetivo", "Solo un signo de interrogación"], answer: "Un sujeto y un verbo" },
        { question: "En 'Sara lee un libro', ¿cuál es el objeto?", options: ["Sara", "lee", "un libro"], answer: "un libro" },
        { question: "Elige la oración correcta.", options: ["Los niños juega afuera", "Los niños juegan afuera", "Los niños jugando afuera"], answer: "Los niños juegan afuera" },
        { question: "Elige la oración correcta.", options: ["Él van a la escuela", "Él va a la escuela", "Él ir a la escuela"], answer: "Él va a la escuela" },
        { question: "¿Qué forma verbal corresponde a un sujeto plural?", options: ["La forma singular", "La forma plural", "No se necesita verbo"], answer: "La forma plural" },
        { question: "¿Qué está estudiando Grace?", options: ["Español de nivel intermedio", "Matemáticas", "Historia"], answer: "Español de nivel intermedio" },
        { question: "¿Qué hace Grace todos los días?", options: ["Practica construir oraciones correctas", "Duerme todo el día", "Evita la gramática"], answer: "Practica construir oraciones correctas" },
        { question: "¿Qué dice la profesora de Grace que necesita una buena oración?", options: ["Un sujeto claro y un verbo que concuerda", "Solo palabras largas", "Ninguna puntuación"], answer: "Un sujeto claro y un verbo que concuerda" },
        { question: "¿Cómo se siente Grace sobre su progreso?", options: ["Orgullosa", "Enojada", "Cansada"], answer: "Orgullosa" },
        { question: "¿Qué cambió entre la semana pasada y esta para Grace?", options: ["Dejó de estudiar", "Ahora revisa su gramática con cuidado", "Se cambió de escuela"], answer: "Ahora revisa su gramática con cuidado" },
      ],
    },
    {
      lessonId: 2,
      title: "Examen 2",
      subtitle: "Pasado y Futuro",
      passingScore: 7,
      questions: [
        { question: "¿Qué tiempo verbal describe una acción terminada en el pasado?", options: ["El pretérito", "El futuro simple", "El presente continuo"], answer: "El pretérito" },
        { question: "¿Cuál es la forma del pretérito de 'ir'?", options: ["ira", "fui", "yendo"], answer: "fui" },
        { question: "¿Qué oración usa correctamente el imperfecto?", options: ["Yo estudiaba a las 8", "Yo estudio a las 8 ayer", "Yo estudiaré a las 8"], answer: "Yo estudiaba a las 8" },
        { question: "¿Qué forma usamos para un plan ya decidido?", options: ["ir a", "fui", "era"], answer: "ir a" },
        { question: "¿Qué forma usamos para una decisión rápida o predicción?", options: ["el futuro simple", "fui", "estaba yendo"], answer: "el futuro simple" },
        { question: "¿Adónde viajó Tomás el año pasado?", options: ["Lubumbashi", "París", "Kinshasa"], answer: "Lubumbashi" },
        { question: "¿Con quién se encontró Tomás mientras esperaba el autobús?", options: ["Un desconocido", "Un viejo amigo de la escuela", "Su profesor"], answer: "Un viejo amigo de la escuela" },
        { question: "¿Qué van a hacer Tomás y su amigo el próximo verano?", options: ["Visitar Lubumbashi de nuevo", "Mudarse a otra ciudad", "Dejar de ser amigos"], answer: "Visitar Lubumbashi de nuevo" },
        { question: "¿Qué oración es correcta para un plan futuro?", options: ["Voy a visitar París el año que viene", "Fui a visitar París el año que viene", "Visito París el año pasado"], answer: "Voy a visitar París el año que viene" },
        { question: "¿Cuánto tiempo hablaron?", options: ["Casi una hora", "Cinco minutos", "Toda la semana"], answer: "Casi una hora" },
      ],
    },
    {
      lessonId: 3,
      title: "Examen 3",
      subtitle: "Práctica de Conversación",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es una pregunta de Sí/No?", options: ["¿Te gusta el café?", "¿A qué te dedicas?", "¿De dónde eres?"], answer: "¿Te gusta el café?" },
        { question: "¿Cuál es una pregunta con Qué/Dónde?", options: ["¿De dónde eres?", "¿Te gusta el café?", "¿Estás de acuerdo?"], answer: "¿De dónde eres?" },
        { question: "¿Cuál es una buena forma de mantener una conversación?", options: ["Hacer una pregunta de seguimiento", "Quedarse callado", "Cambiar de tema inmediatamente"], answer: "Hacer una pregunta de seguimiento" },
        { question: "¿Qué frase está en desacuerdo cortésmente?", options: ["No estoy segura de estar de acuerdo", "Estoy completamente de acuerdo", "Eso es totalmente correcto"], answer: "No estoy segura de estar de acuerdo" },
        { question: "¿Qué frase muestra interés en una conversación?", options: ["Cuéntame más", "No me importa", "Deja de hablar"], answer: "Cuéntame más" },
        { question: "¿A quién conoció Pablo en el trabajo?", options: ["Clara", "Grace", "Ana"], answer: "Clara" },
        { question: "¿De dónde es Clara?", options: ["Goma", "Kinshasa", "Lubumbashi"], answer: "Goma" },
        { question: "¿Qué pregunta de seguimiento hizo Pablo?", options: ["¿Cuánto tiempo llevas viviendo aquí?", "¿Cómo te llamas?", "¿Te gusta el café?"], answer: "¿Cuánto tiempo llevas viviendo aquí?" },
        { question: "¿Qué dijo Clara sobre la ciudad?", options: ["Era amigable pero el tráfico podía ser difícil", "Era aburrida", "La odiaba"], answer: "Era amigable pero el tráfico podía ser difícil" },
        { question: "¿Cómo respondió Pablo al comentario de Clara sobre el tráfico?", options: ["Dijo que era un buen punto", "No estuvo de acuerdo con fuerza", "Dejó la conversación"], answer: "Dijo que era un buen punto" },
      ],
    },
    {
      lessonId: 4,
      title: "Examen 4",
      subtitle: "Habilidades de Escritura",
      passingScore: 7,
      questions: [
        { question: "¿Qué hace una oración temática?", options: ["Presenta la idea principal", "Termina el párrafo", "Enumera datos al azar"], answer: "Presenta la idea principal" },
        { question: "¿Qué palabra muestra contraste?", options: ["sin embargo", "también", "primero"], answer: "sin embargo" },
        { question: "¿Qué palabra muestra causa y efecto?", options: ["porque", "y", "luego"], answer: "porque" },
        { question: "¿Qué palabra muestra secuencia?", options: ["primero", "pero", "aunque"], answer: "primero" },
        { question: "¿Qué hace una oración de conclusión?", options: ["Cierra la idea", "Empieza el párrafo", "Hace una pregunta"], answer: "Cierra la idea" },
        { question: "¿Por qué le gusta leer a la escritora?", options: ["Le ayuda a relajarse después de un día largo", "La hace cansarse", "No tiene otro pasatiempo"], answer: "Le ayuda a relajarse después de un día largo" },
        { question: "¿Cuánto tiempo suele leer?", options: ["Unos treinta minutos", "Dos horas", "Cinco minutos"], answer: "Unos treinta minutos" },
        { question: "¿Qué conector se usa antes de 'a veces se queda dormida'?", options: ["Aunque", "Porque", "Primero"], answer: "Aunque" },
        { question: "¿En qué se ha convertido la lectura para ella?", options: ["Uno de sus hábitos favoritos", "Una pérdida de tiempo", "Su trabajo"], answer: "Uno de sus hábitos favoritos" },
        { question: "¿Qué oración usa correctamente 'por lo tanto'?", options: ["Practico todos los días, por lo tanto estoy mejorando", "Por lo tanto me gustan las manzanas", "Practico por lo tanto yo estudiante"], answer: "Practico todos los días, por lo tanto estoy mejorando" },
      ],
    },
    {
      lessonId: 5,
      title: "Examen 5",
      subtitle: "Habilidades de Escucha",
      passingScore: 7,
      questions: [
        { question: "¿Qué debes escuchar primero?", options: ["Las palabras clave y el tema principal", "Cada palabra individualmente", "Solo la última palabra"], answer: "Las palabras clave y el tema principal" },
        { question: "¿Qué puedes hacer si no entiendes?", options: ["Pedirle a la persona que repita", "Fingir que entendiste", "Irte"], answer: "Pedirle a la persona que repita" },
        { question: "¿Qué frase pide a alguien hablar más despacio?", options: ["¿Puedes hablar más despacio, por favor?", "Cállate", "Sé todo"], answer: "¿Puedes hablar más despacio, por favor?" },
        { question: "¿Qué frase verifica tu comprensión?", options: ["Entonces, si entiendo bien, quieres decir que...", "No me importa lo que quieres decir", "Olvídalo"], answer: "Entonces, si entiendo bien, quieres decir que..." },
        { question: "¿Qué frase da una dirección?", options: ["Gira a la izquierda", "Estoy de acuerdo", "Mucho gusto"], answer: "Gira a la izquierda" },
        { question: "¿Qué le pidió Marie al desconocido?", options: ["Direcciones a la oficina de correos", "La hora", "Dinero"], answer: "Direcciones a la oficina de correos" },
        { question: "¿Qué dijo Marie cuando no entendió?", options: ["Perdón, ¿puedes repetir eso, por favor?", "No quiero saber", "Adiós"], answer: "Perdón, ¿puedes repetir eso, por favor?" },
        { question: "¿Dónde está la oficina de correos según el hombre?", options: ["A la derecha, después de girar a la izquierda en el mercado", "Detrás de la escuela", "Cerca de la casa de Marie"], answer: "A la derecha, después de girar a la izquierda en el mercado" },
        { question: "¿Cómo respondió el hombre a la solicitud de Marie?", options: ["Repitió las direcciones despacio", "Se negó a ayudar", "Se fue"], answer: "Repitió las direcciones despacio" },
        { question: "¿Qué hizo Marie después de recibir las direcciones?", options: ["Encontró la oficina de correos fácilmente", "Se perdió", "Volvió a casa en su lugar"], answer: "Encontró la oficina de correos fácilmente" },
      ],
    },
    {
      lessonId: 6,
      title: "Examen 6",
      subtitle: "Comprensión de Lectura",
      passingScore: 7,
      questions: [
        { question: "¿Qué es la lectura rápida?", options: ["Leer rápido para entender la idea general", "Leer cada palabra despacio", "No leer en absoluto"], answer: "Leer rápido para entender la idea general" },
        { question: "¿Qué es la búsqueda de datos?", options: ["Buscar rápidamente información específica", "Memorizar un texto", "Traducir un texto"], answer: "Buscar rápidamente información específica" },
        { question: "¿Qué puede ayudarte a adivinar el significado de una palabra desconocida?", options: ["Pistas de contexto", "Adivinar al azar sin el texto", "Ignorar la oración"], answer: "Pistas de contexto" },
        { question: "En 'el clima era gelido, así que todos llevaban abrigos pesados', ¿qué significa probablemente 'gelido'?", options: ["Muy frío", "Muy caluroso", "Muy colorido"], answer: "Muy frío" },
        { question: "¿Qué debes leer primero para encontrar la idea principal rápidamente?", options: ["El título y la primera oración de cada párrafo", "Solo la última palabra", "El número de página"], answer: "El título y la primera oración de cada párrafo" },
        { question: "¿Dónde ocurre el mercado?", options: ["Kolwezi", "Goma", "Lubumbashi"], answer: "Kolwezi" },
        { question: "¿Qué día ocurre el mercado?", options: ["Sábado", "Lunes", "Domingo"], answer: "Sábado" },
        { question: "¿Qué venden los vendedores en el mercado?", options: ["Verduras y ropa hecha a mano", "Solo zapatos", "Solo libros"], answer: "Verduras y ropa hecha a mano" },
        { question: "¿Cómo es el ambiente del mercado?", options: ["Animado, con música y vendedores gritando", "Silencioso y vacío", "Peligroso"], answer: "Animado, con música y vendedores gritando" },
        { question: "¿Cuándo llegan muchas familias al mercado?", options: ["Temprano por la mañana", "Tarde en la noche", "Nunca"], answer: "Temprano por la mañana" },
      ],
    },
    {
      lessonId: 7,
      title: "Examen 7",
      subtitle: "Ampliación de Vocabulario",
      passingScore: 7,
      questions: [
        { question: "¿Qué palabra es sinónimo de 'feliz'?", options: ["contento", "frío", "lento"], answer: "contento" },
        { question: "¿Qué palabra es antónimo de 'fácil'?", options: ["difícil", "simple", "rápido"], answer: "difícil" },
        { question: "¿Cuál es la forma sustantiva de 'tener éxito'?", options: ["éxito", "exitosamente", "teniendo éxito"], answer: "éxito" },
        { question: "¿Cuál es la colocación correcta?", options: ["tomar una decisión", "hacer una decisión", "llevar una decisión"], answer: "tomar una decisión" },
        { question: "¿Cuál es la colocación correcta?", options: ["hacer la tarea", "tomar la tarea", "llevar la tarea"], answer: "hacer la tarea" },
        { question: "¿Por qué deberías aprender palabras en grupos?", options: ["Una palabra nueva te enseña tres o cuatro", "Es más rápido olvidarlas", "Es obligatorio por ley"], answer: "Una palabra nueva te enseña tres o cuatro" },
        { question: "¿Qué es un ejemplo de familia de palabras del texto?", options: ["decidir, decisión, decisivo", "rojo, azul, verde", "uno, dos, tres"], answer: "decidir, decisión, decisivo" },
        { question: "¿Cuál es la forma más rápida de mejorar el vocabulario según el texto?", options: ["Aprender palabras nuevas todos los días", "Nunca repasar palabras viejas", "Evitar palabras nuevas"], answer: "Aprender palabras nuevas todos los días" },
        { question: "¿Qué palabra es sinónimo de 'grande'?", options: ["enorme", "pequeño", "tarde"], answer: "enorme" },
        { question: "¿Qué palabra es antónimo de 'empezar'?", options: ["terminar", "comenzar", "abrir"], answer: "terminar" },
      ],
    },
    {
      lessonId: 8,
      title: "Examen 8",
      subtitle: "Dominio de la Pronunciación",
      passingScore: 7,
      questions: [
        { question: "¿Qué es el acento de una palabra?", options: ["La sílaba que se dice más fuerte", "Un tipo de puntuación", "Una regla de gramática"], answer: "La sílaba que se dice más fuerte" },
        { question: "¿Qué suele pasar con la entonación en una pregunta de Sí/No?", options: ["Sube al final", "Siempre baja", "Se mantiene plana"], answer: "Sube al final" },
        { question: "¿Qué suele pasar con la entonación en una pregunta con Qué/Dónde?", options: ["Baja al final", "Sube muchísimo", "Desaparece"], answer: "Baja al final" },
        { question: "¿Cuál es un par de sonidos que se confunden frecuentemente?", options: ["pero / perro", "gato / perro", "feliz / triste"], answer: "pero / perro" },
        { question: "¿Qué puede pasar si acentuas la sílaba equivocada?", options: ["Puede confundir al oyente", "No cambia nada", "La palabra se vuelve más corta"], answer: "Puede confundir al oyente" },
        { question: "Según el texto, ¿qué más es muy importante además de la gramática?", options: ["Una pronunciación clara", "Solo la ortografía", "Solo la cantidad de palabras"], answer: "Una pronunciación clara" },
        { question: "¿Qué olvidan muchos estudiantes?", options: ["El acento de las palabras", "Los tiempos verbales", "La puntuación"], answer: "El acento de las palabras" },
        { question: "¿Cómo puede sonar una palabra con el acento equivocado?", options: ["Como una palabra completamente diferente", "Como una palabra más larga", "Sin ninguna diferencia"], answer: "Como una palabra completamente diferente" },
        { question: "¿Cuántos minutos de práctica diaria sugiere el texto que pueden ayudar?", options: ["Incluso cinco minutos", "Cinco horas", "Ninguna práctica"], answer: "Incluso cinco minutos" },
        { question: "¿Qué par muestra una diferencia de sonido entre LL y Y?", options: ["calle / mayo", "pero / perro", "uno / dos"], answer: "calle / mayo" },
      ],
    },
    {
      lessonId: 9,
      title: "Examen 9",
      subtitle: "Español para Situaciones Reales",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase se usa en un restaurante?", options: ["¿Podría ver el menú, por favor?", "¿Dónde está el mostrador de facturación?", "Hábleme de usted"], answer: "¿Podría ver el menú, por favor?" },
        { question: "¿Qué frase se usa en un aeropuerto?", options: ["Quisiera un asiento junto a la ventana, por favor", "¿Podríamos tener la cuenta, por favor?", "¿Cuáles son sus fortalezas?"], answer: "Quisiera un asiento junto a la ventana, por favor" },
        { question: "¿Qué frase es común en una entrevista de trabajo?", options: ["Hábleme de usted", "¿Está incluido el servicio?", "¿Dónde está la recogida de equipaje?"], answer: "Hábleme de usted" },
        { question: "¿Qué hace Ana al principio de su entrevista?", options: ["Saluda al gerente cortésmente", "Llega tarde", "Se niega a responder preguntas"], answer: "Saluda al gerente cortésmente" },
        { question: "¿Qué dice Ana que es su principal fortaleza?", options: ["Ser trabajadora y confiable", "Ser la mecanógrafa más rápida", "Ser muy callada"], answer: "Ser trabajadora y confiable" },
        { question: "¿Qué pregunta le hace Ana al gerente?", options: ["¿Cómo es un día típico en este puesto?", "¿Cuánto es el salario?", "¿Puedo irme temprano?"], answer: "¿Cómo es un día típico en este puesto?" },
        { question: "¿Cómo se sintió el gerente sobre Ana?", options: ["Impresionado por su preparación", "Molesto", "Confundido"], answer: "Impresionado por su preparación" },
        { question: "¿Qué frase usarías para pedir comida?", options: ["Quisiera el pollo, por favor", "¿Dónde está la recogida de equipaje?", "¿Cuáles son sus fortalezas?"], answer: "Quisiera el pollo, por favor" },
        { question: "¿Qué frase pregunta sobre un vuelo?", options: ["¿A qué hora embarca el vuelo?", "¿Podríamos tener la cuenta?", "Hábleme de usted"], answer: "¿A qué hora embarca el vuelo?" },
        { question: "¿Qué oración describe una cualidad positiva para una entrevista?", options: ["Soy una persona trabajadora y confiable", "Siempre llego tarde", "No me gusta trabajar"], answer: "Soy una persona trabajadora y confiable" },
      ],
    },
    {
      lessonId: 10,
      title: "Examen 10",
      subtitle: "Español Empresarial Básico",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase es un saludo de correo profesional?", options: ["Estimado Sr. Kasongo,", "¡Oye!", "¡Qué tal!"], answer: "Estimado Sr. Kasongo," },
        { question: "¿Qué frase es una despedida de correo profesional?", options: ["Atentamente,", "Adiós adiós,", "Nos vemos,"], answer: "Atentamente," },
        { question: "¿Qué frase inicia una reunión?", options: ["Empecemos", "Dejemos de reunirnos para siempre", "Me voy ahora"], answer: "Empecemos" },
        { question: "¿Qué frase pide aclaración en una reunión?", options: ["¿Podría aclarar ese punto?", "No me importa", "Eso está mal"], answer: "¿Podría aclarar ese punto?" },
        { question: "¿Qué significa 'plazo'?", options: ["La fecha límite en que algo debe terminarse", "Un tipo de correo electrónico", "Una sala de reuniones"], answer: "La fecha límite en que algo debe terminarse" },
        { question: "¿Qué escuchó David decir a su jefa para iniciar la reunión?", options: ["Empecemos", "Adiós a todos", "No hay reunión hoy"], answer: "Empecemos" },
        { question: "¿Qué dijo David cuando no entendió un punto?", options: ["¿Podría aclarar eso, por favor?", "No entiendo nada, nunca", "No dijo nada"], answer: "¿Podría aclarar eso, por favor?" },
        { question: "¿A quién le escribió David su primer correo profesional?", options: ["A un cliente", "A su madre", "A un desconocido"], answer: "A un cliente" },
        { question: "¿Cómo terminó David su correo?", options: ["Atentamente", "Adiós", "Nos vemos"], answer: "Atentamente" },
        { question: "¿Qué pensó su colega del correo?", options: ["Que era claro y estaba bien escrito", "Que era confuso", "Que era demasiado corto"], answer: "Que era claro y estaba bien escrito" },
      ],
    },
    {
      lessonId: 11,
      title: "Examen 11",
      subtitle: "Debates y Argumentos",
      passingScore: 7,
      questions: [
        { question: "¿Qué frase da una opinión?", options: ["En mi opinión,...", "Empecemos", "¿Dónde está el banco?"], answer: "En mi opinión,..." },
        { question: "¿Qué frase está en desacuerdo cortésmente?", options: ["Me temo que tengo que estar en desacuerdo", "Estás completamente equivocado", "No me importa lo que pienses"], answer: "Me temo que tengo que estar en desacuerdo" },
        { question: "¿Qué frase apoya un argumento con un ejemplo?", options: ["Por ejemplo,...", "Adiós,...", "Tal vez,..."], answer: "Por ejemplo,..." },
        { question: "¿Qué frase se usa para concluir un argumento?", options: ["En conclusión, creo que...", "Empecemos", "¿Puedes repetir eso?"], answer: "En conclusión, creo que..." },
        { question: "¿Qué debatían los estudiantes?", options: ["Si los teléfonos deberían permitirse en la escuela", "Qué comer para el almuerzo", "Qué deporte es mejor"], answer: "Si los teléfonos deberían permitirse en la escuela" },
        { question: "¿Cuál fue la opinión de José?", options: ["Los teléfonos ayudan a los estudiantes a aprender", "Los teléfonos deben prohibirse para siempre", "Los teléfonos son muy caros"], answer: "Los teléfonos ayudan a los estudiantes a aprender" },
        { question: "¿Cuál fue la opinión de Grace?", options: ["Los teléfonos pueden ser muy distractores", "Los teléfonos siempre ayudan", "No tenía opinión"], answer: "Los teléfonos pueden ser muy distractores" },
        { question: "¿Cómo estuvo Grace en desacuerdo con José?", options: ["Cortésmente, diciendo 'Entiendo tu punto, pero...'", "Gritando", "Saliendo de la clase"], answer: "Cortésmente, diciendo 'Entiendo tu punto, pero...'" },
        { question: "¿Qué pensó el profesor del debate?", options: ["Ambos argumentos estaban bien respaldados", "Ambos estudiantes estaban equivocados", "El debate no tenía sentido"], answer: "Ambos argumentos estaban bien respaldados" },
        { question: "¿Qué animó el profesor a hacer a la clase?", options: ["Seguir discutiendo con respeto", "Dejar de hablar por completo", "Estar de acuerdo de inmediato"], answer: "Seguir discutiendo con respeto" },
      ],
    },
    {
      lessonId: 12,
      title: "Examen 12",
      subtitle: "Repaso Final y Conversación de la Vida Real",
      passingScore: 7,
      questions: [
        { question: "¿Qué tema de gramática se repasó en la Lección 1?", options: ["Estructura de la oración y concordancia", "Colores", "Números"], answer: "Estructura de la oración y concordancia" },
        { question: "¿Qué tiempos se enseñaron en la Lección 2?", options: ["Pasado y futuro", "Solo el presente", "Ningún tiempo"], answer: "Pasado y futuro" },
        { question: "¿Qué habilidad ayuda a hacer preguntas de seguimiento?", options: ["Mantener una conversación", "Terminar las conversaciones rápido", "Evitar a la gente"], answer: "Mantener una conversación" },
        { question: "¿Qué podía hacer Patrick hace un año?", options: ["Apenas presentarse", "Dar discursos avanzados", "Enseñar español"], answer: "Apenas presentarse" },
        { question: "¿Qué puede hacer Patrick ahora?", options: ["Mantener una conversación completa sobre su trabajo y opiniones", "Todavía nada", "Solo conducir"], answer: "Mantener una conversación completa sobre su trabajo y opiniones" },
        { question: "¿Qué dice Patrick que fue la clave de su progreso?", options: ["Practicar un poco todos los días", "Estudiar una vez al año", "Dejar de estudiar"], answer: "Practicar un poco todos los días" },
        { question: "En la conversación de ejemplo, ¿qué hace el hablante B en el trabajo?", options: ["Escribe informes y responde correos de clientes", "Canta", "Nada"], answer: "Escribe informes y responde correos de clientes" },
        { question: "¿Cómo se sintió el hablante B al principio del nuevo trabajo?", options: ["Nerviosa", "Cansada", "Enojada"], answer: "Nerviosa" },
        { question: "¿Qué hará más el hablante B?", options: ["Mejorar su español para el trabajo", "Dejar el trabajo", "Evitar el español"], answer: "Mejorar su español para el trabajo" },
        { question: "¿Qué está emocionado de empezar Patrick?", options: ["El Nivel 3", "El Nivel 1 de nuevo", "Otra materia diferente"], answer: "El Nivel 3" },
      ],
    },
  ],

  finalQuiz: {
    title: "Examen Final - Nivel 2",
    subtitle: "Este examen cubre todas las lecciones del Nivel 2.",
    passingScore: 15,
    questions: [
      { question: "Elige la oración correcta.", options: ["Ella trabaja todos los días", "Ella trabajan todos los días", "Ella trabajando todos los días"], answer: "Ella trabaja todos los días" },
      { question: "¿Qué tiempo verbal muestra el pasado?", options: ["El pretérito", "El futuro simple", "El presente"], answer: "El pretérito" },
      { question: "¿Qué forma muestra un plan decidido?", options: ["ir a", "fui", "estaba"], answer: "ir a" },
      { question: "¿Qué pregunta de seguimiento es buena después de 'Fui al mercado'?", options: ["¿Qué compraste?", "Adiós", "No me importa"], answer: "¿Qué compraste?" },
      { question: "¿Qué palabra muestra contraste en la escritura?", options: ["sin embargo", "y", "luego"], answer: "sin embargo" },
      { question: "¿Qué deberías hacer si no entiendes a alguien hablando?", options: ["Pedirle que repita o hable despacio", "Fingir que entendiste", "Irte en silencio"], answer: "Pedirle que repita o hable despacio" },
      { question: "¿Para qué se usa la búsqueda de datos?", options: ["Para encontrar información específica rápidamente", "Para memorizar cada palabra", "Para escribir correos"], answer: "Para encontrar información específica rápidamente" },
      { question: "¿Qué palabra es sinónimo de 'feliz'?", options: ["contento", "frío", "tarde"], answer: "contento" },
      { question: "¿Qué par muestra sonidos que se confunden frecuentemente?", options: ["pero / perro", "rojo / azul", "uno / dos"], answer: "pero / perro" },
      { question: "¿Qué frase se usa para pedir comida en un restaurante?", options: ["Quisiera el pollo, por favor", "¿Dónde está el banco?", "Empecemos"], answer: "Quisiera el pollo, por favor" },
      { question: "¿Qué frase es una despedida de correo profesional?", options: ["Atentamente,", "Adiós adiós,", "Nos vemos,"], answer: "Atentamente," },
      { question: "¿Qué frase está en desacuerdo cortésmente en un debate?", options: ["Me temo que tengo que estar en desacuerdo", "Estás equivocado", "No me importa"], answer: "Me temo que tengo que estar en desacuerdo" },
      { question: "¿Qué palabra completa correctamente: 'Practico todos los días, ___ estoy mejorando.'", options: ["por lo tanto", "pero", "o"], answer: "por lo tanto" },
      { question: "¿Cuál es la colocación correcta?", options: ["tomar una decisión", "hacer una decisión", "llevar una decisión"], answer: "tomar una decisión" },
      { question: "¿Qué suele pasar con la entonación en una pregunta con Qué/Dónde?", options: ["Baja al final", "Sube muchísimo", "Desaparece"], answer: "Baja al final" },
      { question: "¿Qué planeaba hacer Tomás el próximo verano?", options: ["Visitar Lubumbashi de nuevo", "Mudarse a otro país", "Dejar de viajar"], answer: "Visitar Lubumbashi de nuevo" },
      { question: "¿Qué dijo Ana que era su principal fortaleza en la entrevista?", options: ["Ser trabajadora y confiable", "Ser la más rápida jugando fútbol", "Tener muchos autos"], answer: "Ser trabajadora y confiable" },
      { question: "¿Qué pensó la colega de David sobre su correo?", options: ["Que era claro y estaba bien escrito", "Que era malo", "Que era demasiado largo"], answer: "Que era claro y estaba bien escrito" },
      { question: "¿Qué pensó el profesor del debate de la clase?", options: ["Ambos argumentos estaban bien respaldados", "No tenía sentido", "Solo un estudiante tenía razón"], answer: "Ambos argumentos estaban bien respaldados" },
      { question: "¿Qué ayudó a Patrick a progresar más?", options: ["Practicar un poco todos los días", "Estudiar una vez al año", "Evitar hablar español"], answer: "Practicar un poco todos los días" },
    ],
  },
};
