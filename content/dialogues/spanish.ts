import type { RawDialogue } from "./types";

// Conversaciones de los exámenes (español). Las líneas alternan A, B, A, B…
// Cada pregunta: [pregunta, respuesta correcta, incorrecta, incorrecta].
const data: Record<string, RawDialogue> = {
  // ---------------- Nivel 1 ----------------
  "1-1": {
    swap: true,
    lines: [
      "¡Buenos días! Me llamo Tom. ¿Cómo te llamas?",
      "Buenos días, Tom. Soy Ana. Mucho gusto.",
      "Mucho gusto. ¿Eres estudiante?",
      "Sí, soy estudiante. Vivo en Kolwezi. ¿Y tú?",
      "Yo soy profesor. Vivo en Lubumbashi.",
      "¡Muy bien! Hasta mañana, Ana.",
    ],
    q: [
      ["¿Cómo se llama la persona B?", "Ana", "Tom", "Emma"],
      ["¿Cuál es la profesión de Ana?", "Es estudiante", "Es profesora", "Es médica"],
      ["¿Dónde vive Tom?", "En Lubumbashi", "En Kolwezi", "En Kinshasa"],
    ],
  },
  "1-2": {
    swap: true,
    lines: [
      "Hola. ¿Puede deletrear su nombre, por favor?",
      "Sí. Es S, A, R, A, H. Sarah.",
      "Gracias. ¿Y su apellido?",
      "Es B, R, O, W, N. Brown.",
      "Perfecto. Sarah Brown. Ahora, ¿cuál es su correo electrónico?",
      "Es sarah punto brown arroba mail punto com.",
    ],
    q: [
      ["¿Cómo deletrea Sarah su nombre?", "S-A-R-A-H", "S-A-R-R-A", "Z-A-R-A-H"],
      ["¿Cuál es el apellido de Sarah?", "Brown", "Black", "Green"],
      ["¿Qué pide la persona A al final?", "Su correo electrónico", "Su número de teléfono", "Su edad"],
    ],
  },
  "1-3": {
    lines: [
      "¡Hola! ¿Cuántos años tienes?",
      "Tengo catorce años. ¿Y tú?",
      "Yo tengo quince. ¿Cuál es tu número de teléfono?",
      "Es el cero ocho uno, dos tres cuatro, cinco seis siete.",
      "Gracias. Te llamaré el sábado.",
      "¡Perfecto! Llámame por la mañana.",
    ],
    q: [
      ["¿Cuántos años tiene la persona B?", "Catorce", "Quince", "Dieciséis"],
      ["¿Cuántos años tiene la persona A?", "Quince", "Catorce", "Trece"],
      ["¿Cuándo llamará la persona A?", "El sábado", "El lunes", "El domingo"],
    ],
  },
  "1-4": {
    lines: [
      "¿Quién es el hombre de esta foto?",
      "Es mi padre. Se llama David.",
      "¿Y la mujer que está a su lado?",
      "Es mi madre. También tengo dos hermanas y un hermano.",
      "¿Cuántos años tiene tu hermano?",
      "Tiene diez. Mis hermanas tienen doce y diecisiete.",
    ],
    q: [
      ["¿Quién es David?", "El padre de quien habla", "El hermano de quien habla", "El tío de quien habla"],
      ["¿Cuántas hermanas tiene quien habla?", "Dos", "Una", "Tres"],
      ["¿Cuántos años tiene el hermano?", "Diez", "Doce", "Diecisiete"],
    ],
  },
  "1-5": {
    lines: [
      "Perdón, ¿dónde está mi mochila?",
      "Está sobre la mesa, al lado del teléfono.",
      "Gracias. ¿Y mis llaves?",
      "Tus llaves están en la caja azul, debajo de la silla.",
      "Ah sí, las veo. ¿Y mi cuaderno?",
      "Está en la cama. ¡Siempre lo olvidas!",
    ],
    q: [
      ["¿Dónde está la mochila?", "Sobre la mesa", "Debajo de la silla", "En la cama"],
      ["¿Dónde están las llaves?", "En la caja azul", "Sobre la mesa", "En la mochila"],
      ["¿Dónde está el cuaderno?", "En la cama", "Sobre la mesa", "Debajo de la silla"],
    ],
  },
  "1-6": {
    lines: [
      "¡Hola! Quiero comprar una chaqueta.",
      "Claro. ¿Qué color le gusta?",
      "Me gusta el verde. Pero no un verde oscuro, un verde claro.",
      "Tenemos esta chaqueta verde claro. Es grande y muy suave.",
      "Es bonita. ¿La tienen también en negro?",
      "Sí. La negra es más barata.",
    ],
    q: [
      ["¿Qué quiere comprar el cliente?", "Una chaqueta", "Una mochila", "Zapatos"],
      ["¿Qué color prefiere primero?", "Verde claro", "Verde oscuro", "Rojo"],
      ["¿Qué chaqueta es más barata?", "La negra", "La verde", "La azul"],
    ],
  },
  "1-7": {
    lines: [
      "¿Cuándo es tu cumpleaños?",
      "Es el doce de marzo. ¿Y el tuyo?",
      "El mío es el tres de julio.",
      "¿Qué día es el doce de marzo este año?",
      "Es viernes. ¡Podemos hacer una fiesta!",
      "¡Buena idea! Invitaré a todos nuestros amigos.",
    ],
    q: [
      ["¿Cuándo es el cumpleaños de la persona B?", "El doce de marzo", "El tres de julio", "El doce de mayo"],
      ["¿Cuándo es el cumpleaños de la persona A?", "El tres de julio", "El doce de marzo", "El tres de junio"],
      ["¿Qué día es la fiesta?", "Viernes", "Sábado", "Domingo"],
    ],
  },
  "1-8": {
    lines: [
      "¿A qué hora te despiertas todos los días?",
      "Me despierto a las seis. Luego me lavo y desayuno.",
      "¿A qué hora vas a la escuela?",
      "Salgo de casa a las siete y la clase empieza a las ocho.",
      "¿Y por la noche?",
      "Hago mi tarea, ceno y me acuesto a las nueve.",
    ],
    q: [
      ["¿A qué hora se despierta la persona?", "A las seis", "A las siete", "A las ocho"],
      ["¿A qué hora empieza la clase?", "A las ocho", "A las siete", "A las nueve"],
      ["¿Qué hace antes de dormir?", "La tarea y la cena", "Ver televisión", "Jugar al fútbol"],
    ],
  },
  "1-9": {
    lines: [
      "Buenas tardes. ¿Qué desea comer?",
      "Quiero arroz con pollo, por favor.",
      "¿Y para beber?",
      "Un vaso de agua. Y mi amigo quiere jugo de naranja.",
      "¿Algo de postre?",
      "Sí, una banana para mí, por favor. Eso es todo.",
    ],
    q: [
      ["¿Qué pide el cliente para comer?", "Arroz con pollo", "Pescado y pan", "Sopa"],
      ["¿Qué bebe el amigo?", "Jugo de naranja", "Agua", "Leche"],
      ["¿Cuál es el postre?", "Una banana", "Un pastel", "Un helado"],
    ],
  },
  "1-10": {
    lines: [
      "Perdone, ¿dónde está el banco, por favor?",
      "Siga derecho y luego gire a la izquierda en el mercado.",
      "¿Está lejos?",
      "No, a cinco minutos a pie. Está al lado de la farmacia.",
      "¿Y hay una oficina de correos cerca?",
      "Sí, el correo está enfrente del banco.",
    ],
    q: [
      ["¿Qué busca primero la persona A?", "El banco", "El mercado", "La escuela"],
      ["¿Dónde debe girar a la izquierda?", "En el mercado", "En la farmacia", "En el correo"],
      ["¿Dónde está el correo?", "Enfrente del banco", "Al lado del mercado", "Detrás de la farmacia"],
    ],
  },
  "1-11": {
    lines: [
      "¿Qué te gusta hacer en tu tiempo libre?",
      "Me encanta jugar al fútbol con mis amigos. ¿Y a ti?",
      "Yo prefiero leer libros y escuchar música.",
      "¿Te gusta nadar?",
      "No mucho, pero me gusta bailar los domingos.",
      "¡Entonces bailemos juntos el próximo domingo!",
    ],
    q: [
      ["¿Qué le encanta a la primera persona?", "Jugar al fútbol", "Leer", "Nadar"],
      ["¿Qué prefiere la segunda persona?", "Leer y la música", "El fútbol", "Cocinar"],
      ["¿Qué planean para el domingo?", "Bailar juntos", "Jugar al fútbol", "Ir a nadar"],
    ],
  },
  "1-12": {
    lines: [
      "¡Hola! ¿Es tu primer día en la escuela?",
      "Sí. Me llamo Pedro. Tengo doce años.",
      "¡Bienvenido, Pedro! Yo soy Gracia. ¿Dónde vives?",
      "Vivo cerca del mercado, en una casa verde.",
      "Mi clase empieza a las ocho. ¿Te gusta el español?",
      "Sí, es mi materia favorita. ¡Sentémonos juntos!",
    ],
    q: [
      ["¿De quién es el primer día?", "De Pedro", "De Gracia", "Del profesor"],
      ["¿Dónde vive Pedro?", "Cerca del mercado", "Cerca del banco", "Cerca de la escuela"],
      ["¿Cuál es la materia favorita de Pedro?", "El español", "Las matemáticas", "La música"],
    ],
  },
  "1-final": {
    lines: [
      "Hola, soy Julia. Soy nueva en este barrio.",
      "¡Bienvenida, Julia! Yo soy Marcos. ¿De dónde eres?",
      "Soy de Lubumbashi. Tengo dieciséis años. ¿Y tú?",
      "Tengo diecisiete. Vivo con mi madre, mi padre y mis dos hermanos.",
      "¿Tienes pasatiempos? A mí me encanta el baloncesto los sábados.",
      "Me gusta dibujar y cocinar. Mañana quiero cocinar arroz con pescado.",
      "¡Suena genial! ¿Me das tu número de teléfono?",
      "Claro. Es el cero nueve nueve, uno uno uno, dos dos dos.",
    ],
    q: [
      ["¿De dónde es Julia?", "De Lubumbashi", "De Kolwezi", "De Kinshasa"],
      ["¿Cuántos años tiene Marcos?", "Diecisiete", "Dieciséis", "Quince"],
      ["¿Qué le encanta a Marcos los sábados?", "El baloncesto", "Cocinar", "Dibujar"],
      ["¿Qué quiere cocinar Julia mañana?", "Arroz con pescado", "Pollo con pan", "Sopa"],
    ],
  },

  // ---------------- Nivel 2 ----------------
  "2-1": {
    lines: [
      "¿Terminaste el informe que te pedí?",
      "Todavía no. He estado trabajando en él desde esta mañana.",
      "Si me lo hubieras dicho antes, te habría ayudado.",
      "Lo sé, pero pensé que podía terminarlo sola.",
      "Bueno, mándamelo cuando esté listo y revisaré la gramática.",
      "Gracias. Te lo envío antes del almuerzo.",
    ],
    q: [
      ["¿Terminó la persona B el informe?", "No, todavía no", "Sí, lo terminó", "No lo ha empezado"],
      ["¿Qué habría hecho la persona A antes?", "Ayudarla", "Escribirlo él mismo", "Cancelarlo"],
      ["¿Qué revisará la persona A?", "La gramática", "Los números", "Las imágenes"],
    ],
  },
  "2-2": {
    lines: [
      "¿Qué hiciste el fin de semana pasado?",
      "Visité a mis abuelos. Cocinamos juntos y vimos películas antiguas.",
      "Qué bonito. Yo me quedé en casa y terminé un libro.",
      "¿Qué vas a hacer el próximo fin de semana?",
      "Voy a viajar a Likasi para ver un partido de fútbol.",
      "Entonces probablemente iré contigo, si hay una entrada para mí.",
    ],
    q: [
      ["¿Qué hizo la primera persona el fin de semana pasado?", "Visitó a sus abuelos", "Terminó un libro", "Fue a un partido"],
      ["¿Qué hizo la segunda persona?", "Se quedó en casa leyendo", "Viajó", "Cocinó para amigos"],
      ["¿Dónde será el partido?", "En Likasi", "En Kolwezi", "En Kinshasa"],
    ],
  },
  "2-3": {
    swap: true,
    lines: [
      "Hola, creo que no nos conocemos. Soy Daniel.",
      "Mucho gusto, Daniel. Soy Rosa. ¿Cómo conoces a la anfitriona?",
      "Estudiamos juntos en la universidad. ¿Y tú?",
      "Trabajo con ella en la clínica. ¿A qué te dedicas?",
      "Soy ingeniero. Diseño sistemas de agua para los pueblos.",
      "Qué interesante. ¡Cuéntame más!",
    ],
    q: [
      ["¿Cómo conoce Daniel a la anfitriona?", "Estudiaron juntos", "Son vecinos", "Trabajan juntos"],
      ["¿Dónde trabaja Rosa?", "En una clínica", "En una escuela", "En un banco"],
      ["¿A qué se dedica Daniel?", "Diseña sistemas de agua", "Construye casas", "Enseña español"],
    ],
  },
  "2-4": {
    lines: [
      "¿Podrías revisar este correo antes de enviarlo al gerente?",
      "Claro. La primera frase es un poco larga. Intenta acortarla.",
      "¿Empiezo con «Estimado señor» o con su nombre?",
      "Usa su nombre, señor Lewis. Y termina con «Atentamente».",
      "¿Y el asunto?",
      "Hazlo claro: «Solicitud de reunión el jueves».",
    ],
    q: [
      ["¿Para qué es el correo?", "Pedir una reunión", "Quejarse de un precio", "Dar las gracias"],
      ["¿Cómo debe empezar el correo?", "Con el nombre del gerente", "Con «Hola amigo»", "Sin saludo"],
      ["¿Qué día es la reunión?", "El jueves", "El martes", "El viernes"],
    ],
  },
  "2-5": {
    lines: [
      "Atención, por favor. El tren a Lubumbashi lleva un retraso de cuarenta minutos.",
      "¿Oíste? Nuestro tren saldrá a las tres y diez.",
      "Entonces tenemos tiempo para un café. ¿Qué andén es?",
      "El anuncio dijo andén cuatro.",
      "Esperemos en la cafetería, entonces. De todos modos tengo hambre.",
      "Buena idea. Iremos al andén a las tres.",
    ],
    q: [
      ["¿Cuánto retraso lleva el tren?", "Cuarenta minutos", "Diez minutos", "Una hora"],
      ["¿De qué andén sale el tren?", "Andén cuatro", "Andén dos", "Andén cinco"],
      ["¿Qué deciden hacer?", "Esperar en la cafetería", "Tomar un taxi", "Volver a casa"],
    ],
  },
  "2-6": {
    lines: [
      "¿Leíste el artículo sobre la nueva biblioteca de la ciudad?",
      "Sí. Dice que abrirá en septiembre y tendrá internet gratis.",
      "Me gusta que los estudiantes también puedan pedir prestadas tabletas.",
      "El autor también dice que estará abierta hasta las diez cada noche.",
      "Creo que estudiaré allí. Es más tranquilo que mi casa.",
      "Yo también. ¡Ojalá haya suficientes asientos!",
    ],
    q: [
      ["¿Cuándo abrirá la biblioteca?", "En septiembre", "En enero", "En junio"],
      ["¿Qué pueden pedir prestado los estudiantes?", "Tabletas", "Computadoras portátiles", "Teléfonos"],
      ["¿Hasta qué hora estará abierta?", "Hasta las diez de la noche", "Hasta las seis de la tarde", "Hasta medianoche"],
    ],
  },
  "2-7": {
    lines: [
      "¿Qué te pareció la película de anoche?",
      "Sinceramente, me decepcionó. La historia era previsible.",
      "¿De verdad? A mí me pareció emocionante, y la música era maravillosa.",
      "En mi opinión, los actores no eran convincentes.",
      "No estoy de acuerdo. La actriz principal estuvo fantástica, y el final me sorprendió.",
      "Bueno, tenemos gustos distintos. La próxima vez eliges tú la película.",
    ],
    q: [
      ["¿Qué sintió la primera persona sobre la película?", "Decepción", "Alegría", "Aburrimiento por la música"],
      ["¿Qué le gustó más a la segunda persona?", "La música y la actriz", "El precio", "El cine"],
      ["¿En qué quedan al final?", "La otra elegirá la próxima vez", "Verla otra vez", "Leer el libro"],
    ],
  },
  "2-8": {
    lines: [
      "Escucha bien: se dice «perro», con erre fuerte, no «pero».",
      "Perro. ¿Así está mejor?",
      "Casi. Haz vibrar la lengua contra el paladar varias veces.",
      "Perrrro... perrrro. Siento la diferencia.",
      "Muy bien. Ahora repite la frase: «El perro rojo corre rápido».",
      "El perro rojo corre rápido. ¿Estuvo correcto?",
    ],
    q: [
      ["¿Qué palabra corrige la profesora?", "Perro", "Pero", "Rojo"],
      ["¿Qué debe vibrar para la erre fuerte?", "La lengua", "Los labios", "La garganta"],
      ["¿Qué debe repetir el alumno?", "Una frase completa", "El alfabeto", "Un número"],
    ],
  },
  "2-9": {
    lines: [
      "Perdone, esta sopa está fría. La pedí caliente.",
      "Lo siento mucho, señora. Le traigo otra enseguida.",
      "Gracias. ¿Y nos puede traer la cuenta, por favor?",
      "Por supuesto. ¿Va a pagar con tarjeta o en efectivo?",
      "Con tarjeta. ¿El servicio está incluido?",
      "Sí, está incluido. Gracias por su paciencia.",
    ],
    q: [
      ["¿Cuál es el problema?", "La sopa está fría", "La comida está muy salada", "La mesa está sucia"],
      ["¿Qué hará el camarero?", "Traer otra sopa", "Hacer un descuento", "Llamar al gerente"],
      ["¿Cómo pagará la clienta?", "Con tarjeta", "En efectivo", "Por teléfono"],
    ],
  },
  "2-10": {
    lines: [
      "Buenos días, señor Okafor. Gracias por venir a nuestra oficina.",
      "Gracias por recibirme. Quisiera presentarle el nuevo producto de nuestra empresa.",
      "Adelante. Tenemos treinta minutos antes de la próxima reunión.",
      "Es una lámpara solar. Dura diez horas y cuesta muy poco.",
      "¿Cuándo pueden entregar doscientas lámparas?",
      "En tres semanas. Mañana le enviaré una oferta por escrito.",
    ],
    q: [
      ["¿Cuál es el producto?", "Una lámpara solar", "Un teléfono", "Una bomba de agua"],
      ["¿Cuántas lámparas quiere el cliente?", "Doscientas", "Cien", "Doce"],
      ["¿Cuándo enviará el señor Okafor la oferta?", "Mañana", "El mes próximo", "Hoy"],
    ],
  },
  "2-11": {
    lines: [
      "Creo que trabajar desde casa es mejor. Se ahorra tiempo y dinero.",
      "Entiendo tu punto, pero no estoy de acuerdo. En casa es difícil concentrarse.",
      "Depende de la persona. Yo soy más productivo sin ruido.",
      "Pero los equipos se comunican mejor si se ven cada día.",
      "Podríamos combinar ambas: tres días en la oficina y dos en casa.",
      "Es un compromiso justo. Puedo aceptarlo.",
    ],
    q: [
      ["¿Qué prefiere la primera persona?", "Trabajar desde casa", "Trabajar en la oficina", "No trabajar"],
      ["¿Por qué no está de acuerdo la segunda?", "Es difícil concentrarse en casa", "Cuesta demasiado", "No hay internet"],
      ["¿Qué acuerdo encuentran?", "Tres días en la oficina, dos en casa", "Cinco días en casa", "Cinco días en la oficina"],
    ],
  },
  "2-12": {
    lines: [
      "Mañana tengo una entrevista de trabajo. ¿Me ayudas a practicar?",
      "Claro. Primera pregunta: ¿por qué quiere trabajar en esta empresa?",
      "Porque ayuda a los jóvenes a aprender habilidades, y me gusta enseñar.",
      "Bien. Ahora, ¿cuál es su mayor fortaleza?",
      "Soy paciente y trabajo bien en equipo.",
      "Excelente. Mantén la calma, sonríe y habla despacio mañana.",
    ],
    q: [
      ["¿Para qué se prepara la persona A?", "Para una entrevista de trabajo", "Para un examen", "Para un viaje"],
      ["¿Por qué quiere trabajar en la empresa?", "Ayuda a los jóvenes a aprender", "Paga más", "Está cerca de su casa"],
      ["¿Qué consejo le da el amigo al final?", "Mantener la calma y hablar despacio", "Llegar tarde", "Hablar muy rápido"],
    ],
  },
  "2-final": {
    lines: [
      "¿Estás libre este fin de semana? Quisiera planear una excursión.",
      "Sí, estoy libre el sábado. ¿A dónde quieres ir?",
      "Pensaba en el lago. Podríamos salir temprano por la mañana.",
      "¿Está lejos? La última vez viajé tres horas y terminé agotado.",
      "Son solo noventa minutos en autobús. Podemos llevar bocadillos y jugo.",
      "En mi opinión, también deberíamos llevar un sombrero. El año pasado hizo mucho calor.",
      "Buen punto. ¿Invitamos a María y a Juan?",
      "Sí, pero preguntémosles esta noche. El autobús sale a las siete.",
    ],
    q: [
      ["¿A dónde quieren ir?", "Al lago", "A la montaña", "Al mercado"],
      ["¿Cuánto dura el viaje en autobús?", "Noventa minutos", "Tres horas", "Treinta minutos"],
      ["¿Qué deben llevar además de comida?", "Un sombrero", "Un paraguas", "Una cámara"],
      ["¿A qué hora sale el autobús?", "A las siete", "A las seis", "A las ocho"],
    ],
  },

  // ---------------- Nivel 3 ----------------
  "3-1": {
    lines: [
      "Si firmamos el contrato hoy, ¿cuándo podrían empezar la entrega?",
      "Si confirman el pedido antes del mediodía, podríamos empezar el lunes.",
      "¿Y si el envío se retrasara, ofrecerían una compensación?",
      "Sí. Si se retrasara más de una semana, daríamos un cinco por ciento de descuento.",
      "Es aceptable. A menos que haya otras condiciones, firmaremos.",
      "Les enviaré la versión final esta tarde.",
    ],
    q: [
      ["¿Cuándo podría empezar la entrega si confirman antes del mediodía?", "El lunes", "El viernes", "El mes próximo"],
      ["¿Qué se ofrece por un retraso de más de una semana?", "Un cinco por ciento de descuento", "Un reembolso total", "Un producto gratis"],
      ["¿Cuándo se enviará la versión final?", "Esta tarde", "Mañana por la mañana", "La semana próxima"],
    ],
  },
  "3-2": {
    lines: [
      "Debe presentar el formulario de cumplimiento antes de fin de mes.",
      "¿Tengo que adjuntar también los estados financieros?",
      "Sí, debería incluirlos. No necesita enviar las facturas antiguas.",
      "¿Puedo enviarlo por vía electrónica, o debe firmarse en papel?",
      "Puede enviarlo por vía electrónica, pero el director debe firmarlo antes.",
      "Entendido. Debería poder terminar para el jueves.",
    ],
    q: [
      ["¿Para cuándo es el formulario?", "Fin de mes", "La semana próxima", "Mañana"],
      ["¿Qué no es necesario?", "Las facturas antiguas", "Los estados financieros", "Una firma"],
      ["¿Quién debe firmar el formulario?", "El director", "El contador", "El cliente"],
    ],
  },
  "3-3": {
    lines: [
      "Nuestro precio es de treinta mil dólares por todo el paquete.",
      "Eso supera nuestro presupuesto. Podríamos ofrecer veinticuatro mil.",
      "No puedo bajar tanto, pero puedo incluir capacitación gratuita para su personal.",
      "Interesante. ¿Y si pagamos la mitad ahora y la mitad en sesenta días?",
      "Podría aceptarlo, con un dos por ciento de cargo en el segundo pago.",
      "Entonces tenemos un trato en veintiocho mil. Pongámoslo por escrito.",
    ],
    q: [
      ["¿Cuál fue el primer precio?", "Treinta mil dólares", "Veinticuatro mil", "Veintiocho mil"],
      ["¿Qué extra ofrece el vendedor?", "Capacitación gratuita", "Entrega gratuita", "Un segundo producto"],
      ["¿Cuál es el precio final?", "Veintiocho mil dólares", "Treinta mil dólares", "Veinticuatro mil dólares"],
    ],
  },
  "3-4": {
    lines: [
      "Ensayemos su presentación. Tiene diez minutos. Empiece cuando esté listo.",
      "Buenos días a todos. Hoy les mostraré nuestros resultados de ventas del año.",
      "Buen comienzo. Recuerde hacer una pausa después de cada cifra clave.",
      "¿Uso primero el gráfico de la segunda diapositiva?",
      "Sí, y luego pase a la tabla. Mantenga las diapositivas simples y mire al público.",
      "Entendido. También prepararé respuestas para preguntas sobre los costos.",
    ],
    q: [
      ["¿Cuánto dura la presentación?", "Diez minutos", "Treinta minutos", "Una hora"],
      ["¿Cuál es el tema?", "Los resultados de ventas del año", "Un empleado nuevo", "El traslado de oficina"],
      ["¿Qué aconseja el entrenador?", "Diapositivas simples y mirar al público", "Leer cada palabra", "Evitar los gráficos"],
    ],
  },
  "3-5": {
    lines: [
      "Gracias a todos por venir. El primer punto del orden del día es el presupuesto.",
      "Propongo aumentar el presupuesto de capacitación en un diez por ciento.",
      "¿Quién está a favor? Levanten la mano, por favor.",
      "Siete a favor, uno en contra. Se aprueba la propuesta.",
      "Yo redactaré el acta y la distribuiré mañana por la mañana.",
      "Agregue también la fecha de la próxima reunión: el quince a las nueve.",
    ],
    q: [
      ["¿Cuál es el primer punto del orden del día?", "El presupuesto", "La contratación", "La nueva oficina"],
      ["¿Cuál es el resultado de la votación?", "Siete a favor, uno en contra", "Cinco a favor, tres en contra", "Todos en contra"],
      ["¿Cuándo es la próxima reunión?", "El quince a las nueve", "El cinco a las nueve", "El quince a las diez"],
    ],
  },
  "3-6": {
    lines: [
      "Estoy redactando el informe trimestral. ¿Cómo debo estructurarlo?",
      "Empieza con un resumen ejecutivo de media página, con los resultados principales.",
      "Luego el análisis, con tablas, y al final tus recomendaciones.",
      "¿La propuesta del nuevo almacén debe ir dentro del informe?",
      "No, hazla en un documento aparte. Incluye costos, un calendario y los riesgos.",
      "Bien. Les enviaré ambos documentos para el viernes.",
    ],
    q: [
      ["¿Cómo debe empezar el informe?", "Con un resumen ejecutivo", "Con las recomendaciones", "Con las tablas"],
      ["¿Qué debe ser un documento aparte?", "La propuesta del almacén", "El resumen", "Las tablas"],
      ["¿Cuándo se enviarán los documentos?", "Para el viernes", "Para el lunes", "Hoy"],
    ],
  },
  "3-7": {
    lines: [
      "Hola, ¿me escuchan? Su pantalla está congelada de mi lado.",
      "Lo oigo, pero la imagen va lenta. Apago mi cámara.",
      "Mejor. ¿Puede compartir ahora su presentación?",
      "Sí, la comparto. ¿Ve la primera diapositiva?",
      "Sí, con claridad. Silencie su micrófono mientras hago una pregunta, por favor.",
      "Disculpe, estaba escribiendo. Adelante.",
    ],
    q: [
      ["¿Cuál es el problema al comienzo?", "La imagen está congelada o lenta", "Nadie oye", "Se cancela la llamada"],
      ["¿Qué apaga la persona?", "La cámara", "El micrófono", "La pantalla"],
      ["¿Por qué le piden silenciar el micrófono?", "Se hará una pregunta", "Hay eco", "La reunión terminó"],
    ],
  },
  "3-8": {
    lines: [
      "Hola, soy Amina, de una empresa de logística. ¿Es su primera conferencia?",
      "No, es la tercera. Soy Pedro, trabajo en energías renovables.",
      "Interesante. Transportamos paneles solares a menudo. Podríamos trabajar juntos.",
      "Me encantaría. ¿Tiene tarjeta de presentación?",
      "Por supuesto. Tomemos un café mañana y hablemos con detalle.",
      "Perfecto. Esta noche le escribo para confirmar la hora.",
    ],
    q: [
      ["¿A qué se dedica la empresa de Amina?", "A la logística", "A la banca", "A la educación"],
      ["¿Qué conferencia es esta para Pedro?", "La tercera", "La primera", "La segunda"],
      ["¿Qué hará Amina esta noche?", "Escribirle un correo a Pedro", "Llamar a Pedro", "Redactar un informe"],
    ],
  },
  "3-9": {
    lines: [
      "El envío lleva cinco días de retraso y el cliente está muy molesto.",
      "¿Qué causó el retraso?",
      "Un problema en la aduana. Los documentos estaban incompletos.",
      "Necesitamos dos soluciones: primero, corregir los documentos hoy; segundo, enviar una parte por avión.",
      "El flete aéreo es caro. ¿Cuánto costaría?",
      "Unos dos mil dólares. Creo que vale la pena para conservar al cliente.",
    ],
    q: [
      ["¿Cuánto retraso lleva el envío?", "Cinco días", "Dos días", "Un mes"],
      ["¿Qué causó el retraso?", "Documentos incompletos en la aduana", "Una huelga", "El mal tiempo"],
      ["¿Cuánto costaría el flete aéreo?", "Unos dos mil dólares", "Unos quinientos dólares", "Unos veinte mil dólares"],
    ],
  },
  "3-10": {
    lines: [
      "Mi socio me invitó a cenar, pero no sé cómo comportarme.",
      "En su cultura es educado llegar un poco tarde, nunca puntual en punto.",
      "¿Y debo llevar un regalo?",
      "Se agradece un detalle pequeño, como fruta o dulces. Evita regalar algo caro.",
      "¿Es de mala educación rechazar la comida?",
      "Sí, es mejor probar un poco de todo y dar las gracias.",
    ],
    q: [
      ["¿Cuándo debe llegar el invitado?", "Un poco tarde", "Muy temprano", "Puntual en punto"],
      ["¿Qué regalo se agradece?", "Fruta o dulces", "Dinero", "Un reloj caro"],
      ["¿Cuál es el consejo sobre la comida?", "Probar un poco de todo", "Rechazar con educación", "Comer antes de ir"],
    ],
  },
  "3-11": {
    lines: [
      "Dos miembros de mi equipo están en conflicto y afecta a todo el grupo.",
      "Primero, habla con cada uno por separado y escucha sin juzgar.",
      "Luego reúnelos y céntrate en las soluciones, no en los culpables.",
      "¿Y si no logran ponerse de acuerdo?",
      "Fija metas claras, reparte responsabilidades y revisa el avance cada semana.",
      "Gracias. Programaré la reunión para el miércoles.",
    ],
    q: [
      ["¿Cuál es el problema?", "Dos miembros del equipo están en conflicto", "Bajan las ventas", "Renunció un gerente"],
      ["¿Qué debe hacer primero el responsable?", "Hablar con cada uno por separado", "Despedir a uno", "Ignorarlo"],
      ["¿Cuándo será la reunión?", "El miércoles", "El lunes", "El viernes"],
    ],
  },
  "3-12": {
    lines: [
      "Gracias por recibirnos. Queremos renovar nuestro contrato por dos años más.",
      "Nos alegra oírlo. ¿Puedo sugerir algunos cambios en las condiciones?",
      "Por supuesto. Nuestras prioridades son una entrega más rápida y un informe mensual.",
      "Podemos garantizar la entrega en diez días, y les enviaré un informe cada mes.",
      "A cambio, aceptaríamos un pequeño aumento de precio.",
      "Es justo. Cerremos los detalles y firmemos la semana próxima.",
    ],
    q: [
      ["¿Qué quiere hacer el cliente?", "Renovar el contrato por dos años", "Cancelar el contrato", "Comprar un producto nuevo"],
      ["¿Cuál es el plazo de entrega garantizado?", "Diez días", "Dos días", "Un mes"],
      ["¿Qué acepta el cliente a cambio?", "Un pequeño aumento de precio", "Un retraso mayor", "Menos servicio"],
    ],
  },
  "3-final": {
    lines: [
      "Buenos días. Revisemos los resultados del último trimestre.",
      "Las ventas subieron un doce por ciento, sobre todo gracias a los nuevos clientes del norte.",
      "Si mantenemos este ritmo, ¿alcanzaremos la meta anual?",
      "Sí, siempre que contratemos a dos personas más para atención al cliente.",
      "¿Cuáles son los principales riesgos para el próximo trimestre?",
      "El aumento de los costos de transporte y un posible retraso de nuestro proveedor principal.",
      "Entonces propongo contactar a un segundo proveedor y preparar un plan de contingencia.",
      "De acuerdo. Presentaré el plan a la junta el día veinte.",
    ],
    q: [
      ["¿Cuánto subieron las ventas?", "Un doce por ciento", "Un dos por ciento", "Un veinte por ciento"],
      ["¿Qué se necesita para alcanzar la meta anual?", "Dos personas más en atención al cliente", "Una oficina nueva", "Un precio más bajo"],
      ["¿Qué riesgo se menciona?", "El aumento de los costos de transporte", "Un nuevo competidor", "Una huelga"],
      ["¿Cuándo se presentará el plan a la junta?", "El día veinte", "El día diez", "El año próximo"],
    ],
  },
};

export default data;
