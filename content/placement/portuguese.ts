import type { PlacementContent } from "./types";

const content: PlacementContent = {
  levels: {
    1: [
      ["Eu ___ estudante.", "sou", "és", "é"],
      ["Ela ___ dois irmãos.", "tem", "tens", "tenho"],
      ["Que dia vem depois de segunda-feira?", "Terça-feira", "Domingo", "Quarta-feira"],
      ["Escolha a frase correta.", "Nós moramos em Kolwezi.", "Nós mora em Kolwezi.", "Nós moras em Kolwezi."],
      ["___ é o seu nome?", "Qual", "Quem", "Onde"],
      ["Eu gosto ___ café.", "de", "em", "a"],
    ],
    2: [
      ["Ontem nós ___ ao mercado.", "fomos", "vamos", "iremos"],
      ["Minha irmã é ___ alta do que eu.", "mais", "muito", "tão"],
      ["Quando cheguei, eles ___ o jantar.", "preparavam", "prepararão", "preparar"],
      ["Eu ___ liguei ontem à noite.", "te", "tu", "ti"],
      ["É importante que você ___ pontual.", "seja", "é", "será"],
      ["Ainda não ___ o relatório.", "terminei", "terminava", "terminarei"],
    ],
    3: [
      ["Se eu tivesse mais tempo, ___ chinês.", "aprenderia", "aprenderei", "aprendo"],
      ["O relatório ___ pelo diretor.", "foi revisado", "revisou", "revisava"],
      ["Espero que ele ___ a verdade.", "diga", "diz", "dirá"],
      ["O livro ___ falei está na mesa.", "de que", "que", "onde"],
      ["Quando você ___ terminado, me ligue.", "tiver", "tem", "teve"],
      ["Embora ___ cansado, ele continuou.", "estivesse", "estava", "estará"],
    ],
  },
  reading: {
    title: "Um sábado no mercado",
    paragraphs: [
      "Todo sábado, Ana e o irmão José vão ao grande mercado de Kolwezi. Eles saem de casa às sete horas, porque as melhores verduras são vendidas cedo. Ana leva uma cesta grande e José segura a lista que a mãe escreveu.",
      "No mercado, Ana compra tomates, cebolas e peixe, enquanto José procura sandálias novas. O vendedor pede doze dólares, mas José acha o preço alto demais. Depois de uma conversa amigável, ele paga nove dólares e o vendedor dá um pequeno presente. Na volta, as crianças estão cansadas, mas felizes, e prometem voltar na semana que vem.",
    ],
    q: [
      ["Por que eles saem cedo?", "As melhores verduras são vendidas cedo.", "O mercado fecha às oito.", "A mãe espera por eles no mercado."],
      ["O que José quer comprar?", "Sandálias", "Peixe", "Uma cesta"],
      ["Quanto José paga no final?", "Nove dólares", "Doze dólares", "Três dólares"],
      ["Como as crianças estão na volta?", "Cansadas, mas felizes", "Zangadas", "Entediadas e tristes"],
    ],
  },
  readAloud:
    "Meu nome é Maria e trabalho em um hospital pequeno. Toda manhã pego o ônibus às seis e meia. À noite, gosto de preparar o jantar para a minha família.",
  listening: {
    lines: [
      "Boa tarde, gostaria de reservar uma mesa para sexta-feira à noite.",
      "Claro. Para quantas pessoas?",
      "Para cinco pessoas, por volta das oito horas. Um dos meus amigos é vegetariano.",
      "Sem problema. Temos dois pratos vegetarianos. Pode me dizer o seu nome, por favor?",
      "Sim, é Okoye. O, K, O, Y, E.",
      "Obrigado. A sua mesa está reservada para sexta-feira às oito, para cinco pessoas.",
    ],
    q: [
      ["Para que dia é a reserva?", "Sexta-feira", "Sábado", "Quinta-feira"],
      ["Quantas pessoas vêm?", "Cinco", "Quatro", "Seis"],
      ["O que a pessoa diz sobre um dos amigos?", "Ele é vegetariano.", "Ele chega atrasado.", "Ele não pode vir."],
      ["A que horas é a reserva?", "Às oito", "Às sete", "Às nove"],
    ],
  },
};

export default content;
