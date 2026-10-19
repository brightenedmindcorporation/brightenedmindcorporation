import type { PlacementContent } from "./types";

const content: PlacementContent = {
  levels: {
    1: [
      ["Yo ___ estudiante.", "soy", "eres", "es"],
      ["Ella ___ dos hermanos.", "tiene", "tienes", "tengo"],
      ["¿Qué día viene después del lunes?", "Martes", "Domingo", "Miércoles"],
      ["Elige la frase correcta.", "Nosotros vivimos en Kolwezi.", "Nosotros vive en Kolwezi.", "Nosotros vives en Kolwezi."],
      ["¿___ te llamas?", "Cómo", "Cuándo", "Dónde"],
      ["Me gusta ___ café.", "el", "la", "los"],
    ],
    2: [
      ["Ayer nosotros ___ al mercado.", "fuimos", "vamos", "iremos"],
      ["Mi hermana es ___ alta que yo.", "más", "muy", "tan"],
      ["Cuando llegué, ellos ___ la cena.", "preparaban", "prepararán", "preparar"],
      ["Compré una manzana y ___ regalé a mi madre.", "se la", "me la", "te la"],
      ["Es importante que tú ___ puntual.", "seas", "eres", "serás"],
      ["Todavía no ___ el informe.", "he terminado", "terminaría", "terminando"],
    ],
    3: [
      ["Si tuviera más tiempo, ___ chino.", "aprendería", "aprenderé", "aprendo"],
      ["El informe ___ por el director.", "fue revisado", "revisó", "revisaba"],
      ["Es posible que ___ mañana.", "llueva", "llueve", "lloverá"],
      ["El libro ___ te hablé está sobre la mesa.", "del que", "que", "cual"],
      ["Cuando ___ terminado, te llamaré.", "haya", "he", "había"],
      ["No creo que él ___ la verdad.", "diga", "dice", "dirá"],
    ],
  },
  reading: {
    title: "Un sábado en el mercado",
    paragraphs: [
      "Cada sábado, Ana y su hermano José van al gran mercado de Kolwezi. Salen de casa a las siete, porque las mejores verduras se venden temprano. Ana lleva una cesta grande y José sostiene la lista que escribió su madre.",
      "En el mercado, Ana compra tomates, cebollas y pescado, mientras José busca unas sandalias nuevas. El vendedor pide doce dólares, pero José cree que el precio es demasiado alto. Después de una conversación amable, paga nueve dólares y el vendedor le regala un pequeño detalle. De regreso, los niños están cansados pero contentos, y prometen volver la semana próxima.",
    ],
    q: [
      ["¿Por qué salen temprano?", "Las mejores verduras se venden temprano.", "El mercado cierra a las ocho.", "Su madre los espera en el mercado."],
      ["¿Qué quiere comprar José?", "Unas sandalias", "Pescado", "Una cesta"],
      ["¿Cuánto paga José al final?", "Nueve dólares", "Doce dólares", "Tres dólares"],
      ["¿Cómo están los niños al volver?", "Cansados pero contentos", "Enfadados", "Aburridos y tristes"],
    ],
  },
  readAloud:
    "Me llamo María y trabajo en un hospital pequeño. Cada mañana tomo el autobús a las seis y media. Por la noche me gusta preparar la cena para mi familia.",
  listening: {
    lines: [
      "Buenas tardes, quisiera reservar una mesa para el viernes por la noche.",
      "Por supuesto. ¿Para cuántas personas?",
      "Para cinco personas, a eso de las ocho. Uno de mis amigos es vegetariano.",
      "Ningún problema. Tenemos dos platos vegetarianos. ¿Me dice su nombre, por favor?",
      "Sí, es Okoye. O, K, O, Y, E.",
      "Gracias. Su mesa queda reservada el viernes a las ocho, para cinco personas.",
    ],
    q: [
      ["¿Para qué día es la reserva?", "El viernes", "El sábado", "El jueves"],
      ["¿Cuántas personas vendrán?", "Cinco", "Cuatro", "Seis"],
      ["¿Qué dice la persona sobre uno de sus amigos?", "Es vegetariano.", "Llega tarde.", "No puede venir."],
      ["¿A qué hora es la reserva?", "A las ocho", "A las siete", "A las nueve"],
    ],
  },
};

export default content;
