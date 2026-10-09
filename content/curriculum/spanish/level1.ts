import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan,
// written entirely in Spanish (immersive method, matching the pattern
// already used for the English, French, and Swahili courses).
export const spanishLevel1: LevelCurriculum = {
  langCode: "ES",
  langLabel: "Espagnol",
  langSlug: "spanish",
  level: 1,
  levelTitle: "Nivel 1 - Español Principiante",
  levelSubtitle: "Construye una base sólida para comprender y hablar español cotidiano.",

  lessons: [
    {
      id: 1,
      title: "Saludos y Presentaciones",
      subtitle: "Aprende a saludar y presentarte en español.",
      sections: [
        { heading: "Saludos Comunes", body: ["Hola", "Buenos días", "Buenas tardes", "Buenas noches", "¿Cómo estás?", "Bien, gracias."] },
        { heading: "Presentarse", body: ["Me llamo...", "Tengo... años", "Vivo en...", "Soy estudiante", "Mucho gusto"] },
      ],
      speakText: `Los saludos son importantes cuando conocemos a alguien.

Saludos comunes: Hola. Buenos días. Buenas tardes. Buenas noches. ¿Cómo estás? Bien, gracias.

Presentarse: Me llamo... Tengo... años. Vivo en... Soy estudiante. Mucho gusto.`,
      videoTopic: "Cómo presentarte en español.",
      readingTitle: "¡Hola!",
      reading: [
        "Me llamo Sofia. Tengo 12 años. Vivo en Kolwezi. Soy estudiante.",
        "Cada mañana, digo “Buenos días” a mis profesores y amigos.",
        "Me gusta conocer gente nueva. Cuando conozco a alguien por primera vez, digo: “Hola, me llamo Sofia. Mucho gusto.”",
      ],
      readingSpeakText: `¡Hola! Me llamo Sofia. Tengo doce años. Vivo en Kolwezi. Soy estudiante.

Cada mañana, digo buenos días a mis profesores y amigos.`,
      exercises: ["Hola, me llamo ...", "Tengo ... años", "Vivo en ...", "Soy ..."],
      speakingTopic: "Preséntate ante la clase en tres frases.",
    },
    {
      id: 2,
      title: "El Alfabeto y la Pronunciación",
      subtitle: "Aprende el alfabeto español y practica la pronunciación.",
      sections: [
        { heading: "El Alfabeto Español", body: ["El alfabeto español tiene 27 letras.", "A B C D E F G H I J K L M", "N Ñ O P Q R S T U V W X Y Z"] },
        { heading: "Las Vocales", body: ["A", "E", "I", "O", "U"] },
        { heading: "Ejemplo", body: ["Usamos las letras para deletrear nombres y palabras.", "Me llamo David.", "D - A - V - I - D"] },
      ],
      speakText: `El alfabeto español tiene veintisiete letras.

A, B, C, D, E, F, G, H, I, J, K, L, M, N, eñe, O, P, Q, R, S, T, U, V, W, X, Y, Z.

Las vocales son: A, E, I, O, U.

Ejemplo: me llamo David. D, A, V, I, D.`,
      videoTopic: "Recitar el alfabeto español de la A a la Z.",
      readingTitle: "Hola, me llamo Ana.",
      reading: ["Estoy aprendiendo español en la escuela.", "Hoy estoy aprendiendo el alfabeto.", "Practico todos los días y me gusta aprender palabras nuevas.", "Puedo deletrear mi nombre: A - N - A."],
      readingSpeakText: `Hola, me llamo Ana. Estoy aprendiendo español en la escuela. Hoy estoy aprendiendo el alfabeto.`,
      exercises: ["Recita el alfabeto de la A a la Z.", "Deletrea tu nombre en español.", "Deletrea tu correo electrónico.", "Practica la pronunciación de las vocales."],
      speakingTopic: "Preséntate y deletrea tu nombre completo.",
    },
    {
      id: 3,
      title: "Números e Información Personal",
      subtitle: "Aprende los números y cómo compartir tu información personal.",
      sections: [
        { heading: "Números del 1 al 10", body: ["1 - Uno", "2 - Dos", "3 - Tres", "4 - Cuatro", "5 - Cinco", "6 - Seis", "7 - Siete", "8 - Ocho", "9 - Nueve", "10 - Diez"] },
        { heading: "Información Personal", body: ["Preguntas importantes:", "¿Cómo te llamas?", "¿Cuántos años tienes?", "¿Dónde vives?", "¿Cuál es tu número de teléfono?"] },
        { heading: "Ejemplo de Respuestas", body: ["Me llamo David.", "Tengo 15 años.", "Vivo en Kinshasa.", "Mi número de teléfono es 123456789."] },
      ],
      speakText: `Números del uno al diez: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.

Información personal: ¿Cómo te llamas? ¿Cuántos años tienes? ¿Dónde vives?

Ejemplo de respuestas: me llamo David. Tengo quince años. Vivo en Kinshasa.`,
      videoTopic: "Aprender los números y presentarse.",
      readingTitle: "Hola, me llamo Sara.",
      reading: ["Tengo 14 años.", "Vivo en Kinshasa.", "Mi número de teléfono es 987654321."],
      readingSpeakText: `Hola, me llamo Sara. Tengo catorce años. Vivo en Kinshasa. Mi número de teléfono es nueve ocho siete seis cinco cuatro tres dos uno.`,
      exercises: ["Cuenta del 1 al 10 en español.", "Escribe tu nombre en español.", "Di tu edad en español.", "Escribe tu número de teléfono en español."],
      speakingTopic: "Preséntate con tu información personal.",
    },
    {
      id: 4,
      title: "La Familia",
      subtitle: "Aprende los miembros de la familia y cómo hablar de ella.",
      sections: [
        { heading: "Miembros de la Familia", body: ["Padre", "Madre", "Hermano", "Hermana", "Tío", "Tía", "Abuelo", "Abuela", "Primo", "Padres"] },
        { heading: "Frases Útiles", body: ["Este es mi padre.", "Mi madre es muy amable.", "Tengo un hermano y dos hermanas.", "Quiero a mi familia."] },
        { heading: "Ejemplo", body: ["Vivo con mi familia.", "Mi padre trabaja en una oficina.", "Mi madre es profesora.", "Somos felices juntos."] },
      ],
      speakText: `Miembros de la familia: padre, madre, hermano, hermana, tío, tía, abuelo, abuela, primo, padres.

Frases útiles: este es mi padre. Mi madre es muy amable. Tengo un hermano y dos hermanas.

Ejemplo: vivo con mi familia. Mi padre trabaja en una oficina.`,
      videoTopic: "Aprender el vocabulario de la familia.",
      readingTitle: "Me llamo Juan.",
      reading: ["Vivo con mis padres y mi hermana.", "Mi padre es médico.", "Mi madre es muy cariñosa.", "Me encanta pasar tiempo con mi familia."],
      readingSpeakText: `Me llamo Juan. Vivo con mis padres y mi hermana. Mi padre es médico. Mi madre es muy cariñosa.`,
      exercises: ["Nombra cinco miembros de la familia en español.", "Describe a tu familia con frases simples.", "Di quién vive en tu casa.", "Practica decir las relaciones familiares en voz alta."],
      speakingTopic: "Habla de tu familia y de las personas cercanas a ti.",
    },
    {
      id: 5,
      title: "Objetos Cotidianos",
      subtitle: "Aprende los objetos que usamos todos los días.",
      sections: [
        { heading: "Objetos Comunes", body: ["Libro", "Bolígrafo", "Silla", "Mesa", "Teléfono", "Mochila", "Computadora", "Botella", "Cuaderno", "Llave"] },
        { heading: "Frases Útiles", body: ["Este es mi libro.", "Escribo con un bolígrafo.", "La silla es azul.", "Mi teléfono está en la mesa."] },
        { heading: "Describir Objetos", body: ["Podemos describir objetos por color, tamaño y uso.", "El libro es pequeño.", "La computadora es nueva.", "La mochila es pesada."] },
      ],
      speakText: `Objetos comunes: libro, bolígrafo, silla, mesa, teléfono, mochila, computadora, botella, cuaderno, llave.

Frases útiles: este es mi libro. Escribo con un bolígrafo. La silla es azul.`,
      videoTopic: "Aprender objetos comunes y su pronunciación.",
      readingTitle: "Me llamo Pedro.",
      reading: ["Cada día voy a la escuela con mi mochila y mi cuaderno.", "Uso un bolígrafo para escribir en mi libro.", "Mi teléfono está en mi mochila.", "Me siento en una silla y estudio cada mañana."],
      readingSpeakText: `Me llamo Pedro. Cada día voy a la escuela con mi mochila y mi cuaderno.`,
      exercises: ["Nombra cinco objetos a tu alrededor.", "Describe tu mochila escolar.", "Escribe tres frases con nombres de objetos.", "Practica la pronunciación."],
      speakingTopic: "Habla de los objetos que usas todos los días.",
    },
    {
      id: 6,
      title: "Colores y Descripciones",
      subtitle: "Aprende los colores y cómo describir personas y objetos.",
      sections: [
        { heading: "Colores Comunes", body: ["Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco", "Naranja", "Marrón", "Rosa", "Morado"] },
        { heading: "Describir Objetos", body: ["La mochila es roja.", "El teléfono es negro.", "La silla es azul.", "El cuaderno es verde."] },
        { heading: "Describir Personas", body: ["Ella es alta.", "Él es bajo.", "Ella está feliz.", "Él es fuerte.", "Ella es amable."] },
      ],
      speakText: `Colores comunes: rojo, azul, verde, amarillo, negro, blanco, naranja, marrón, rosa, morado.

Describir objetos: la mochila es roja. El teléfono es negro.

Describir personas: ella es alta. Él es bajo. Ella está feliz.`,
      videoTopic: "Aprender los colores y practicar descripciones.",
      readingTitle: "Me llamo Lisa.",
      reading: ["Tengo una mochila escolar azul.", "Mi cuaderno es verde y mi teléfono es negro.", "Estoy feliz y soy amable.", "Mi hermano pequeño es bajo pero muy fuerte."],
      readingSpeakText: `Me llamo Lisa. Tengo una mochila escolar azul. Mi cuaderno es verde y mi teléfono es negro.`,
      exercises: ["Nombra cinco colores en español.", "Describe tu teléfono.", "Descríbete en dos frases.", "Usa tres adjetivos en frases."],
      speakingTopic: "Descríbete a ti mismo y tres objetos a tu alrededor.",
    },
    {
      id: 7,
      title: "Días, Meses y Fechas",
      subtitle: "Aprende a hablar de días, meses y fechas importantes.",
      sections: [
        { heading: "Días de la Semana", body: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] },
        { heading: "Meses del Año", body: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] },
        { heading: "Frases Útiles", body: ["Hoy es lunes.", "Mi cumpleaños es en julio.", "La escuela empieza en septiembre.", "Voy a la iglesia los domingos."] },
      ],
      speakText: `Días de la semana: lunes, martes, miércoles, jueves, viernes, sábado, domingo.

Meses del año: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre.

Frases útiles: hoy es lunes. Mi cumpleaños es en julio.`,
      videoTopic: "Aprender los días, los meses y cómo decir las fechas.",
      readingTitle: "Me llamo Kevin.",
      reading: [
        "Hoy es viernes 12 de junio. Me levanto temprano cada mañana.",
        "Voy a la escuela de lunes a viernes y descanso los sábados.",
        "Mi mes favorito es julio porque es el mes de mi cumpleaños.",
        "Cada domingo, voy a la iglesia con mis padres.",
      ],
      readingSpeakText: `Me llamo Kevin. Hoy es viernes doce de junio. Me levanto temprano cada mañana.`,
      exercises: ["Di todos los días de la semana.", "Di todos los meses del año.", "Di la fecha de tu cumpleaños.", "Di qué día es hoy."],
      speakingTopic: "Habla de tu cumpleaños y de tus actividades semanales.",
    },
    {
      id: 8,
      title: "Rutinas Diarias",
      subtitle: "Aprende a hablar de tus actividades y hábitos diarios.",
      sections: [
        { heading: "Actividades Diarias Comunes", body: ["Despertarse", "Cepillarse los dientes", "Ducharse", "Desayunar", "Ir a la escuela", "Estudiar", "Almorzar", "Jugar con amigos", "Hacer la tarea", "Dormir"] },
        { heading: "Frases Útiles", body: ["Me despierto a las 6.", "Me cepillo los dientes cada mañana.", "Voy a la escuela a las 7.", "Hago la tarea por la noche."] },
      ],
      speakText: `Actividades diarias: despertarse, cepillarse los dientes, ducharse, desayunar, ir a la escuela, estudiar, almorzar, jugar con amigos, hacer la tarea, dormir.

Frases útiles: me despierto a las seis. Voy a la escuela a las siete.`,
      videoTopic: "Aprender el vocabulario de las rutinas diarias.",
      readingTitle: "Me llamo Daniel.",
      reading: [
        "Cada día me despierto a las 6 de la mañana.",
        "Me cepillo los dientes y me ducho antes del desayuno.",
        "A las 7, voy a la escuela y estudio con mis compañeros.",
        "Por la tarde, juego al fútbol con mis amigos.",
        "Por la noche, hago la tarea y duermo a las 9.",
      ],
      readingSpeakText: `Me llamo Daniel. Cada día me despierto a las seis de la mañana.`,
      exercises: ["Describe tu rutina matutina.", "Di a qué hora te despiertas.", "Escribe tres frases sobre tus actividades diarias.", "Habla de lo que haces después de la escuela."],
      speakingTopic: "Habla de tu rutina diaria de la mañana a la noche.",
    },
    {
      id: 9,
      title: "Comida y Bebidas",
      subtitle: "Aprende el vocabulario de comidas, bebidas y comidas del día.",
      sections: [
        { heading: "Alimentos Comunes", body: ["Arroz", "Pan", "Carne", "Pescado", "Huevos", "Pollo", "Plátano", "Manzana"] },
        { heading: "Bebidas Comunes", body: ["Agua", "Leche", "Jugo", "Té", "Café"] },
        { heading: "Frases Útiles", body: ["Bebo agua todos los días.", "Mi comida favorita es el arroz.", "Como pan en el desayuno.", "Comemos pollo en la cena."] },
      ],
      speakText: `Alimentos comunes: arroz, pan, carne, pescado, huevos, pollo, plátano, manzana.

Bebidas comunes: agua, leche, jugo, té, café.

Frases útiles: bebo agua todos los días. Mi comida favorita es el arroz.`,
      videoTopic: "Aprender el vocabulario de comidas y bebidas.",
      readingTitle: "Me llamo Emma.",
      reading: ["Cada mañana como pan y huevos en el desayuno.", "En la escuela, bebo agua y a veces jugo de frutas.", "Mi comida favorita es el arroz con pollo.", "Por la noche, mi familia come pescado y verduras juntos."],
      readingSpeakText: `Me llamo Emma. Cada mañana como pan y huevos en el desayuno.`,
      exercises: ["Nombra cinco alimentos en español.", "Nombra tres bebidas en español.", "Di qué comes en el desayuno.", "Describe tu comida favorita."],
      speakingTopic: "Habla de tu comida favorita y de lo que bebes todos los días.",
    },
    {
      id: 10,
      title: "Lugares en la Ciudad",
      subtitle: "Aprende el vocabulario de los lugares que se encuentran en una ciudad.",
      sections: [
        { heading: "Lugares Comunes en la Ciudad", body: ["Escuela", "Hospital", "Mercado", "Banco", "Restaurante", "Iglesia", "Comisaría", "Estación de autobuses", "Biblioteca", "Parque"] },
        { heading: "Frases Útiles", body: ["Voy a la escuela cada mañana.", "Mi madre trabaja en el hospital.", "Compramos comida en el mercado.", "Los niños juegan en el parque."] },
        { heading: "Preguntar por Direcciones", body: ["¿Dónde está el hospital?", "¿Cómo llego al banco?", "El mercado está cerca de la iglesia.", "La biblioteca está al lado de la escuela."] },
      ],
      speakText: `Lugares comunes en la ciudad: escuela, hospital, mercado, banco, restaurante, iglesia, comisaría, estación de autobuses, biblioteca, parque.

Preguntar por direcciones: ¿dónde está el hospital? ¿cómo llego al banco?`,
      videoTopic: "Aprender el vocabulario de lugares y direcciones.",
      readingTitle: "El miércoles pasado, Miguel fue al centro con su padre.",
      reading: [
        "Primero, se detuvieron en el banco porque su padre necesitaba retirar dinero.",
        "Después del banco, caminaron hasta el mercado para comprar fruta y verdura fresca.",
        "Mientras caminaban, Miguel vio un gran hospital cerca de la comisaría.",
        "Antes de volver a casa, se sentaron en un pequeño restaurante y almorzaron juntos.",
      ],
      readingSpeakText: `El miércoles pasado, Miguel fue al centro con su padre. Primero, se detuvieron en el banco.`,
      exercises: ["Nombra cinco lugares de tu ciudad.", "Di dónde compra la gente comida.", "Describe lugares cerca de tu casa.", "Haz frases con el vocabulario de la ciudad."],
      speakingTopic: "Describe los lugares que visitas a menudo en la ciudad.",
    },
    {
      id: 11,
      title: "Pasatiempos e Intereses",
      subtitle: "Aprende a hablar de tus pasatiempos y tiempo libre.",
      sections: [
        { heading: "Pasatiempos Comunes", body: ["Leer libros", "Jugar al fútbol", "Escuchar música", "Ver películas", "Dibujar", "Bailar", "Cantar", "Cocinar", "Nadar", "Jugar videojuegos"] },
        { heading: "Frases Útiles", body: ["Mi pasatiempo favorito es leer.", "Me gusta jugar al fútbol.", "A ella le gusta escuchar música.", "Vemos películas los fines de semana."] },
        { heading: "Hablar de Intereses", body: ["¿Qué te gusta hacer?", "Me gusta pasar tiempo con mis amigos.", "Mi pasatiempo me ayuda a relajarme."] },
      ],
      speakText: `Pasatiempos comunes: leer libros, jugar al fútbol, escuchar música, ver películas, dibujar, bailar, cantar, cocinar, nadar, jugar videojuegos.

Frases útiles: mi pasatiempo favorito es leer. Me gusta jugar al fútbol.`,
      videoTopic: "Aprender el vocabulario de pasatiempos y tiempo libre.",
      readingTitle: "El sábado por la tarde, Jaime visitó a su primo Daniel.",
      reading: [
        "Cuando llegó, Daniel estaba sentado afuera leyendo un libro sobre animales.",
        "Después de leer, los dos chicos decidieron jugar al fútbol en el parque del barrio.",
        "Más tarde, volvieron a casa a escuchar música mientras la hermana de Daniel dibujaba en la sala.",
        "Jaime dijo que había disfrutado el día porque hacer actividades divertidas lo hacía feliz.",
      ],
      readingSpeakText: `El sábado por la tarde, Jaime visitó a su primo Daniel. Cuando llegó, Daniel estaba sentado afuera leyendo un libro.`,
      exercises: ["Nombra tres pasatiempos que te gustan.", "Habla de lo que haces en tu tiempo libre.", "Haz frases con el vocabulario de los pasatiempos.", "Describe tu actividad favorita del fin de semana."],
      speakingTopic: "Habla de tu pasatiempo favorito y explica por qué te gusta.",
    },
    {
      id: 12,
      title: "Repaso Final y Conversación Real",
      subtitle: "Repasa todo lo aprendido y practica una conversación real en español.",
      sections: [
        {
          heading: "Lo que Hemos Aprendido",
          body: [
            "Saludar cortésmente",
            "Presentarse",
            "Hablar de la edad y la información personal",
            "Hablar de los miembros de la familia",
            "Nombrar objetos cotidianos",
            "Usar colores y descripciones",
            "Hablar de fechas y meses",
            "Describir rutinas diarias",
            "Hablar de comida y bebidas",
            "Describir lugares en la ciudad",
            "Hablar de pasatiempos e intereses",
          ],
        },
        {
          heading: "Ejemplo de Conversación Real",
          body: [
            "A: ¡Hola! Me llamo David. ¿Cómo te llamas?",
            "B: Hola David, me llamo Sara. Mucho gusto.",
            "A: Mucho gusto también. ¿Cuántos años tienes?",
            "B: Tengo 15 años. Vivo cerca del mercado de la ciudad.",
            "A: Genial. ¿Qué te gusta hacer en tu tiempo libre?",
            "B: Me gusta leer libros y escuchar música.",
            "A: ¿Cuál es tu comida favorita?",
            "B: Me encanta el arroz con pollo.",
          ],
        },
      ],
      speakText: `Lo importante que hemos aprendido: saludar cortésmente, presentarse, hablar de la edad, hablar de la familia, nombrar objetos cotidianos, usar colores, hablar de fechas, describir rutinas, hablar de comida, describir lugares en la ciudad, y hablar de pasatiempos.

Ejemplo de conversación real.

Hola, me llamo David. ¿Cómo te llamas?
Hola David, me llamo Sara. Mucho gusto.`,
      videoTopic: "Repasar la conversación básica y el vocabulario del Nivel 1.",
      readingTitle: "El domingo pasado, Kevin viajó con su familia para visitar a su tío en la ciudad.",
      reading: [
        "Antes de salir, comió pan y bebió té en el desayuno.",
        "Al llegar, Kevin saludó a todos cortésmente y se presentó a algunos visitantes que nunca había conocido.",
        "Más tarde, fue al mercado con su primo y ayudó a comprar verduras, pescado y arroz para el almuerzo.",
        "Al final del día, Kevin dijo que había disfrutado pasar tiempo en familia y hacer actividades que le gustaban.",
      ],
      readingSpeakText: `El domingo pasado, Kevin viajó con su familia para visitar a su tío en la ciudad. Antes de salir, comió pan y bebió té en el desayuno.`,
      exercises: ["Preséntate en español.", "Habla de tu familia.", "Describe tu comida favorita.", "Describe tu rutina diaria.", "Habla de tus pasatiempos."],
      speakingTopic: "Preséntate y describe un día normal de tu vida.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Examen 1",
      subtitle: "Saludos y Presentaciones",
      passingScore: 7,
      questions: [
        { question: "¿Cómo saludas a alguien?", options: ["Hola", "Silla", "Agua"], answer: "Hola" },
        { question: "¿Cómo te presentas?", options: ["Me llamo Juan", "Buenas noches", "Banco"], answer: "Me llamo Juan" },
        { question: "¿Cómo se llama la chica del texto?", options: ["Juan", "Sofia", "Ana"], answer: "Sofia" },
        { question: "¿Cuántos años tiene Sofia?", options: ["20 años", "13 años", "12 años"], answer: "12 años" },
        { question: "¿Dónde vive Sofia?", options: ["Kolwezi", "Kinshasa", "París"], answer: "Kolwezi" },
        { question: "Elige una presentación:", options: ["Me llamo Sofia", "La escuela es grande", "Silla azul"], answer: "Me llamo Sofia" },
        { question: "¿Qué dice Sofia por la mañana?", options: ["Adiós", "Buenos días", "Hola"], answer: "Buenos días" },
        { question: "Elige una palabra de saludo:", options: ["Hola", "Pollo", "Lunes"], answer: "Hola" },
        { question: "¿Qué dice cuando conoce a alguien nuevo?", options: ["Mucho gusto", "Hola, me llamo Sofia, mucho gusto", "Hola, bienvenido"], answer: "Hola, me llamo Sofia, mucho gusto" },
        { question: "¿Qué decimos para presentarnos?", options: ["Me llamo...", "Gira a la izquierda", "Como arroz"], answer: "Me llamo..." },
      ],
    },
    {
      lessonId: 2,
      title: "Examen 2",
      subtitle: "El Alfabeto y la Pronunciación",
      passingScore: 7,
      questions: [
        { question: "¿Cuántas letras tiene el alfabeto español?", options: ["24", "27", "30"], answer: "27" },
        { question: "¿Cuál de estas es una vocal?", options: ["B", "E", "T"], answer: "E" },
        { question: "¿Cómo se deletrea el nombre David?", options: ["D-A-V-I-D", "D-A-B-I-D", "D-E-V-I-D"], answer: "D-A-V-I-D" },
        { question: "¿Para qué usamos las letras?", options: ["Para deletrear nombres y palabras", "Para cocinar", "Para jugar al fútbol"], answer: "Para deletrear nombres y palabras" },
        { question: "¿Cómo se llama la chica del texto?", options: ["Sara", "Ana", "Emma"], answer: "Ana" },
        { question: "¿Qué está aprendiendo Ana hoy?", options: ["El alfabeto", "Los números", "Los colores"], answer: "El alfabeto" },
        { question: "¿Dónde aprende español Ana?", options: ["En casa", "En la escuela", "En el mercado"], answer: "En la escuela" },
        { question: "¿Cómo deletrea Ana su nombre?", options: ["A-N-A", "A-N-N-A", "A-N-E"], answer: "A-N-A" },
        { question: "¿Qué le gusta a Ana?", options: ["Aprender palabras nuevas", "Dormir", "Ver televisión"], answer: "Aprender palabras nuevas" },
        { question: "¿Cuántas vocales hay en español?", options: ["5", "10", "20"], answer: "5" },
      ],
    },
    {
      lessonId: 3,
      title: "Examen 3",
      subtitle: "Números e Información Personal",
      passingScore: 7,
      questions: [
        { question: "¿Cómo se dice el número 5 en español?", options: ["Siete", "Cinco", "Cuatro"], answer: "Cinco" },
        { question: "¿Cómo se dice el número 8 en español?", options: ["Tres", "Diez", "Ocho"], answer: "Ocho" },
        { question: "¿Qué pregunta pide la edad?", options: ["¿Cómo te llamas?", "¿Cuántos años tienes?", "¿Dónde está el libro?"], answer: "¿Cuántos años tienes?" },
        { question: "¿Qué frase es correcta?", options: ["David mi es nombre", "Me llamo David", "Es David yo"], answer: "Me llamo David" },
        { question: "¿Cómo se llama la chica del texto?", options: ["María", "Sara", "Ana"], answer: "Sara" },
        { question: "¿Cuántos años tiene Sara?", options: ["18 años", "14 años", "10 años"], answer: "14 años" },
        { question: "¿Dónde vive Sara?", options: ["Londres", "París", "Kinshasa"], answer: "Kinshasa" },
        { question: "¿Cuál es el número de teléfono de Sara?", options: ["123456789", "987654321", "555666777"], answer: "987654321" },
        { question: "¿Qué información es información personal?", options: ["Silla azul", "Fútbol", "Número de teléfono"], answer: "Número de teléfono" },
        { question: "¿Cómo se cuenta del 1 al 3 en español?", options: ["Uno, dos, tres", "Uno, tres, dos", "Dos, uno, tres"], answer: "Uno, dos, tres" },
      ],
    },
    {
      lessonId: 4,
      title: "Examen 4",
      subtitle: "La Familia",
      passingScore: 7,
      questions: [
        { question: "¿Qué palabra significa padre varón?", options: ["Hermano", "Padre", "Tío"], answer: "Padre" },
        { question: "¿Quién es tu padre mujer?", options: ["Madre", "Hermana", "Prima"], answer: "Madre" },
        { question: "¿Qué frase es correcta?", options: ["Mi madre es amable", "Amable madre mi es", "Es madre mi amable"], answer: "Mi madre es amable" },
        { question: "¿Quiénes son tus padres?", options: ["Padre y Madre", "Profesor y Médico", "Hermano y Amigo"], answer: "Padre y Madre" },
        { question: "¿Qué palabra significa el hermano de tu padre?", options: ["Primo", "Tío", "Abuela"], answer: "Tío" },
        { question: "¿Cómo se llama el chico del texto?", options: ["David", "Juan", "Marco"], answer: "Juan" },
        { question: "¿Con quién vive Juan?", options: ["Sus amigos", "Sus padres y su hermana", "Su profesor"], answer: "Sus padres y su hermana" },
        { question: "¿Cuál es la profesión del padre de Juan?", options: ["Médico", "Conductor", "Agricultor"], answer: "Médico" },
        { question: "¿Cómo se describe a la madre de Juan?", options: ["Estricta", "Muy cariñosa", "Enojada"], answer: "Muy cariñosa" },
        { question: "¿Qué le gusta hacer a Juan?", options: ["Jugar solo al fútbol", "Pasar tiempo con su familia", "Ver televisión todo el día"], answer: "Pasar tiempo con su familia" },
      ],
    },
    {
      lessonId: 5,
      title: "Examen 5",
      subtitle: "Objetos Cotidianos",
      passingScore: 7,
      questions: [
        { question: "¿Qué objeto usamos para escribir?", options: ["Botella", "Bolígrafo", "Silla"], answer: "Bolígrafo" },
        { question: "¿Qué objeto podemos usar para llamar a alguien?", options: ["Teléfono", "Libro", "Mesa"], answer: "Teléfono" },
        { question: "¿Dónde llevan los estudiantes sus libros normalmente?", options: ["Mochila", "Botella", "Llave"], answer: "Mochila" },
        { question: "¿Qué frase es correcta?", options: ["Este es mi libro", "Libro este mi es", "Es este libro mi"], answer: "Este es mi libro" },
        { question: "¿Qué puede ser pesado?", options: ["La mochila", "Una sonrisa", "El aire"], answer: "La mochila" },
        { question: "¿Cómo se llama el chico del texto?", options: ["Pedro", "Daniel", "Tom"], answer: "Pedro" },
        { question: "¿Adónde va Pedro cada día?", options: ["La escuela", "El hospital", "El mercado"], answer: "La escuela" },
        { question: "¿Qué usa Pedro para escribir?", options: ["Un bolígrafo", "Una botella", "Una computadora"], answer: "Un bolígrafo" },
        { question: "¿Dónde está el teléfono de Pedro?", options: ["En su mochila", "En el techo", "Bajo la silla"], answer: "En su mochila" },
        { question: "¿En qué se sienta Pedro?", options: ["Una silla", "Una mesa", "Una botella"], answer: "Una silla" },
      ],
    },
    {
      lessonId: 6,
      title: "Examen 6",
      subtitle: "Colores y Descripciones",
      passingScore: 7,
      questions: [
        { question: "¿Cuál de estos es un color?", options: ["Médico", "Azul", "Mesa"], answer: "Azul" },
        { question: "¿Qué frase es correcta?", options: ["Mochila es la roja", "La mochila es roja", "Roja mochila la es"], answer: "La mochila es roja" },
        { question: "¿Qué adjetivo describe el tamaño?", options: ["Botella", "Grande", "Lunes"], answer: "Grande" },
        { question: "¿Qué color es a menudo opuesto al negro?", options: ["Verde", "Blanco", "Naranja"], answer: "Blanco" },
        { question: "¿Qué adjetivo describe a una persona?", options: ["Cuaderno", "Ventana", "Amable"], answer: "Amable" },
        { question: "¿Cómo se llama la chica del texto?", options: ["Sara", "Lisa", "Ana"], answer: "Lisa" },
        { question: "¿De qué color es la mochila escolar de Lisa?", options: ["Amarilla", "Azul", "Negra"], answer: "Azul" },
        { question: "¿De qué color es el teléfono de Lisa?", options: ["Rojo", "Verde", "Negro"], answer: "Negro" },
        { question: "¿Cómo se describe a Lisa?", options: ["Triste y callada", "Feliz y amable", "Enojada y cansada"], answer: "Feliz y amable" },
        { question: "¿Cómo es el hermano pequeño de Lisa?", options: ["Tranquilo y triste", "Bajo y fuerte", "Alto y débil"], answer: "Bajo y fuerte" },
      ],
    },
    {
      lessonId: 7,
      title: "Examen 7",
      subtitle: "Días, Meses y Fechas",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es un día de la semana?", options: ["Profesor", "Martes", "Botella"], answer: "Martes" },
        { question: "¿Cuál es un mes?", options: ["Viernes", "Julio", "Ventana"], answer: "Julio" },
        { question: "¿Cuántos días hay en una semana?", options: ["Diez", "Siete", "Cinco"], answer: "Siete" },
        { question: "¿Qué frase es correcta?", options: ["Lunes hoy es", "Hoy es lunes", "Es lunes hoy"], answer: "Hoy es lunes" },
        { question: "¿Qué pregunta es sobre el cumpleaños?", options: ["¿Dónde está tu mochila?", "¿Cuándo es tu cumpleaños?", "¿De qué color es tu teléfono?"], answer: "¿Cuándo es tu cumpleaños?" },
        { question: "¿Cómo se llama el chico del texto?", options: ["Kevin", "Juan", "Pedro"], answer: "Kevin" },
        { question: "¿Qué día es en la historia?", options: ["Domingo", "Viernes", "Martes"], answer: "Viernes" },
        { question: "¿Cuál es el mes favorito de Kevin?", options: ["Junio", "Julio", "Diciembre"], answer: "Julio" },
        { question: "¿Cuándo es el cumpleaños de Kevin?", options: ["25 de julio", "12 de junio", "10 de agosto"], answer: "25 de julio" },
        { question: "¿Qué hace Kevin cada domingo?", options: ["Se queda en casa", "Va a la iglesia", "Juega al fútbol"], answer: "Va a la iglesia" },
      ],
    },
    {
      lessonId: 8,
      title: "Examen 8",
      subtitle: "Rutinas Diarias",
      passingScore: 7,
      questions: [
        { question: "¿Qué hace la gente generalmente primero por la mañana?", options: ["Despertarse", "Dormir", "Jugar al fútbol"], answer: "Despertarse" },
        { question: "¿Qué actividad ocurre en el baño?", options: ["Cepillarse los dientes", "Estudiar matemáticas", "Ver televisión"], answer: "Cepillarse los dientes" },
        { question: "¿Qué frase es correcta?", options: ["Voy a la escuela", "Escuela voy a la", "Vamos escuela a"], answer: "Voy a la escuela" },
        { question: "¿Cuándo hacen la tarea generalmente los estudiantes?", options: ["Por la noche", "A medianoche", "Antes del desayuno"], answer: "Por la noche" },
        { question: "¿Cómo se llama el chico del texto?", options: ["Pedro", "Daniel", "Kevin"], answer: "Daniel" },
        { question: "¿A qué hora se despierta Daniel?", options: ["A las 6", "A las 21", "Al mediodía"], answer: "A las 6" },
        { question: "¿Qué hace Daniel antes del desayuno?", options: ["Se cepilla los dientes y se ducha", "Juega al fútbol", "Hace la tarea"], answer: "Se cepilla los dientes y se ducha" },
        { question: "¿Qué hace Daniel por la tarde?", options: ["Duerme", "Juega al fútbol con amigos", "Va a la iglesia"], answer: "Juega al fútbol con amigos" },
        { question: "¿A qué hora duerme Daniel?", options: ["A las 6", "A las 21", "A las 14"], answer: "A las 21" },
      ],
    },
    {
      lessonId: 9,
      title: "Examen 9",
      subtitle: "Comida y Bebidas",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es una bebida?", options: ["Pan", "Jugo", "Pescado"], answer: "Jugo" },
        { question: "¿Cómo se llama la chica del texto?", options: ["Sara", "Emma", "Lisa"], answer: "Emma" },
        { question: "¿Qué come Emma en el desayuno?", options: ["Arroz y pollo", "Pan y huevos", "Pescado y verduras"], answer: "Pan y huevos" },
        { question: "¿Qué bebe Emma en la escuela?", options: ["Café", "Agua y a veces jugo", "Leche"], answer: "Agua y a veces jugo" },
        { question: "¿Cuál es la comida favorita de Emma?", options: ["Arroz con pollo", "Pan con té", "Plátano con leche"], answer: "Arroz con pollo" },
        { question: "¿Qué come la familia de Emma por la noche?", options: ["Solo pan", "Pescado y verduras", "Pizza"], answer: "Pescado y verduras" },
        { question: "¿Cuál es una fruta?", options: ["Plátano", "Cuaderno", "Silla"], answer: "Plátano" },
        { question: "¿Qué bebe Emma antes de dormir?", options: ["Café", "Agua", "Té"], answer: "Agua" },
        { question: "¿Qué nos dan la comida y las bebidas?", options: ["Energía y salud", "Dinero", "Tarea"], answer: "Energía y salud" },
        { question: "¿Qué frase es correcta?", options: ["Ella bebió jugo de frutas", "Jugo de frutas ella bebió", "Bebió ella jugo frutas"], answer: "Ella bebió jugo de frutas" },
      ],
    },
    {
      lessonId: 10,
      title: "Examen 10",
      subtitle: "Lugares en la Ciudad",
      passingScore: 7,
      questions: [
        { question: "¿Dónde compra la gente comida normalmente?", options: ["Mercado", "Biblioteca", "Hospital"], answer: "Mercado" },
        { question: "¿Qué lugar ayuda a las personas enfermas?", options: ["Banco", "Hospital", "Restaurante"], answer: "Hospital" },
        { question: "¿Dónde pueden jugar los niños?", options: ["Comisaría", "Parque", "Banco"], answer: "Parque" },
        { question: "¿Dónde guarda la gente su dinero?", options: ["Restaurante", "Escuela", "Banco"], answer: "Banco" },
        { question: "¿Quién fue a la ciudad con Miguel?", options: ["Su padre", "Su profesor", "Su hermana"], answer: "Su padre" },
        { question: "¿Por qué se detuvo el padre de Miguel en el banco?", options: ["Para retirar dinero", "Para comprar comida", "Para ver a un médico"], answer: "Para retirar dinero" },
        { question: "¿Qué compraron en el mercado?", options: ["Libros", "Fruta y verdura", "Zapatos"], answer: "Fruta y verdura" },
        { question: "¿Qué vio Miguel cerca de la comisaría?", options: ["Un hospital", "Una escuela", "Un parque"], answer: "Un hospital" },
        { question: "¿Dónde se sentaron antes de volver a casa?", options: ["En un restaurante", "En un parque", "En el banco"], answer: "En un restaurante" },
        { question: "¿Qué frase es correcta?", options: ["El mercado está cerca de la iglesia", "Cerca iglesia mercado el está", "Está cerca el mercado iglesia"], answer: "El mercado está cerca de la iglesia" },
      ],
    },
    {
      lessonId: 11,
      title: "Examen 11",
      subtitle: "Pasatiempos e Intereses",
      passingScore: 7,
      questions: [
        { question: "¿Cuál es un pasatiempo?", options: ["Hospital", "Dibujar", "Cocina (el lugar)"], answer: "Dibujar" },
        { question: "¿Qué frase es correcta?", options: ["Me gusta jugar al fútbol", "Jugar fútbol me gusta al", "Fútbol me gusta jugar al"], answer: "Me gusta jugar al fútbol" },
        { question: "¿Para qué sirven a menudo los pasatiempos?", options: ["Para relajarse", "Para cultivar comida", "Para cambiar el clima"], answer: "Para relajarse" },
        { question: "¿Cuál es una actividad de tiempo libre?", options: ["Nadar", "Comisaría", "Cuaderno"], answer: "Nadar" },
        { question: "¿Qué pregunta es sobre intereses?", options: ["¿Qué te gusta hacer?", "¿Dónde está el mercado?", "¿Cuántos años tienes?"], answer: "¿Qué te gusta hacer?" },
        { question: "¿A quién visitó Jaime el sábado?", options: ["A su primo Daniel", "A su profesor", "A su tío"], answer: "A su primo Daniel" },
        { question: "¿Qué estaba haciendo Daniel cuando llegó Jaime?", options: ["Jugando al fútbol", "Leyendo un libro", "Cocinando"], answer: "Leyendo un libro" },
        { question: "¿Dónde jugaron al fútbol los chicos?", options: ["En la escuela", "En el parque del barrio", "En el restaurante"], answer: "En el parque del barrio" },
        { question: "¿Qué estaba haciendo la hermana de Daniel?", options: ["Dibujando", "Nadando", "Viendo televisión"], answer: "Dibujando" },
        { question: "¿Cuál es el pasatiempo favorito de Daniel?", options: ["Leer libros", "Escuchar música", "Jugar videojuegos"], answer: "Leer libros" },
      ],
    },
    {
      lessonId: 12,
      title: "Examen 12",
      subtitle: "Repaso Final y Conversación Real",
      passingScore: 7,
      questions: [
        { question: "¿Cómo saludas cortésmente a alguien?", options: ["Hola", "Plátano", "Ventana"], answer: "Hola" },
        { question: "¿Qué frase se presenta correctamente?", options: ["Me llamo Daniel", "Daniel mi nombre", "Nombre Daniel soy yo"], answer: "Me llamo Daniel" },
        { question: "¿Cuál es un pasatiempo?", options: ["Leer libros", "Hospital", "Botella"], answer: "Leer libros" },
        { question: "¿Dónde compra la gente verduras?", options: ["Aeropuerto", "Mercado", "Biblioteca"], answer: "Mercado" },
        { question: "¿Cuál es una bebida?", options: ["Arroz", "Té", "Pollo"], answer: "Té" },
        { question: "¿Quién viajó con Kevin?", options: ["Su familia", "Su profesor", "Sus compañeros"], answer: "Su familia" },
        { question: "¿Qué comió Kevin antes de salir?", options: ["Pescado y arroz", "Pan y té", "Pollo y jugo"], answer: "Pan y té" },
        { question: "¿Adónde fue Kevin con su primo?", options: ["Al mercado", "Al hospital", "A la biblioteca"], answer: "Al mercado" },
        { question: "¿Qué hicieron por la tarde?", options: ["Jugaron al fútbol y escucharon música", "Fueron a la escuela", "Vieron televisión"], answer: "Jugaron al fútbol y escucharon música" },
        { question: "¿Qué dijo Kevin al final del día?", options: ["Que disfrutó pasar tiempo en familia", "Que estuvo enojado todo el día", "Que quería irse temprano"], answer: "Que disfrutó pasar tiempo en familia" },
      ],
    },
  ],

  finalQuiz: {
    title: "Examen Final - Nivel 1",
    subtitle: "Este examen cubre todas las lecciones del Nivel 1.",
    passingScore: 15,
    questions: [
      { question: "¿Cómo saludas a alguien por la mañana?", options: ["Buenos días", "Adiós", "Pollo"], answer: "Buenos días" },
      { question: "Elige la presentación correcta.", options: ["Me llamo Alex", "Alex mi nombre", "Nombre Alex soy"], answer: "Me llamo Alex" },
      { question: "¿Qué letra viene después de la G?", options: ["H", "J", "F"], answer: "H" },
      { question: "¿Cómo se escribe el número 15?", options: ["Cincuenta", "Quince", "Cinco"], answer: "Quince" },
      { question: "¿Quién es la hija de tu padre?", options: ["Tu hermana", "Tu profesor", "Tu tío"], answer: "Tu hermana" },
      { question: "¿Cuál es un objeto cotidiano?", options: ["Botella", "Hospital", "Profesor"], answer: "Botella" },
      { question: "¿Cuál es un color?", options: ["Azul", "Jueves", "Cuaderno"], answer: "Azul" },
      { question: "¿Qué mes viene después de abril?", options: ["Mayo", "Enero", "Julio"], answer: "Mayo" },
      { question: "¿Qué se hace normalmente después de despertarse?", options: ["Cepillarse los dientes", "Ir a dormir", "Cenar"], answer: "Cepillarse los dientes" },
      { question: "¿Cuál es una bebida?", options: ["Té", "Arroz", "Pollo"], answer: "Té" },
      { question: "¿Dónde guarda la gente su dinero?", options: ["Escuela", "Banco", "Restaurante"], answer: "Banco" },
      { question: "¿Cuál es un pasatiempo?", options: ["Nadar", "Hospital", "Ventana"], answer: "Nadar" },
      { question: "Elige la frase correcta.", options: ["Me gusta leer libros", "Libros leer me gusta", "Gusta libros me leer"], answer: "Me gusta leer libros" },
      { question: "¿Adónde va la gente cuando está enferma?", options: ["Hospital", "Biblioteca", "Mercado"], answer: "Hospital" },
      { question: "¿Qué día viene antes del viernes?", options: ["Jueves", "Domingo", "Lunes"], answer: "Jueves" },
      { question: "Lectura: Sara come pan y bebe leche. ¿Qué bebe Sara?", options: ["Té", "Leche", "Café"], answer: "Leche" },
      { question: "Lectura: Kevin juega al fútbol cada sábado. ¿Cuál es el pasatiempo de Kevin?", options: ["Lectura", "Fútbol", "Cocina"], answer: "Fútbol" },
      { question: "Elige la respuesta correcta: Yo ___ a la escuela cada día.", options: ["voy", "va", "yendo"], answer: "voy" },
      { question: "Si alguien dice « Mucho gusto », ¿qué puedes responder?", options: ["Mucho gusto también", "Cuaderno azul", "Estoy durmiendo"], answer: "Mucho gusto también" },
      {
        question: "¿Qué estudiante está listo para el Nivel 2?",
        options: [
          "Un estudiante que entiende y usa correctamente el español básico",
          "Un estudiante que responde al azar",
          "Un estudiante que se salta cada lección",
        ],
        answer: "Un estudiante que entiende y usa correctamente el español básico",
      },
    ],
  },
};
