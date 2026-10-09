import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in Portuguese,
// mirroring the English/Swahili/Spanish Level 2 topic plan.
export const portugueseLevel2: LevelCurriculum = {
  langCode: "PT",
  langLabel: "Portugais",
  langSlug: "portuguese",
  level: 2,
  levelTitle: "Nível 2 - Português Intermediário",
  levelSubtitle: "Desenvolva fluência com gramática, conversação e português do dia a dia.",

  lessons: [
    {
      id: 1,
      title: "Revisão de Gramática Intermediária",
      subtitle: "Revise a estrutura da frase e a concordância verbal.",
      sections: [
        { heading: "Partes de uma Frase", body: ["Toda frase precisa de um sujeito e um verbo.", "Sujeito = de quem ou do que a frase fala.", "Verbo = a ação ou o estado.", "Exemplo: Sara (sujeito) lê (verbo) um livro (objeto)."] },
        { heading: "Concordância Verbal", body: ["Um sujeito singular leva um verbo singular.", "Ela trabalha em um hospital.", "Um sujeito plural leva um verbo plural.", "Eles trabalham em um hospital."] },
        { heading: "Erros Comuns", body: ["Errado: As crianças brinca lá fora.", "Certo: As crianças brincam lá fora.", "Errado: Ele vai à escola amanhã, ontem.", "Certo: Ele vai à escola amanhã."] },
      ],
      speakText: `Toda frase precisa de um sujeito e um verbo.

Sujeito significa de quem ou do que a frase fala. Verbo significa a ação.

Exemplo: Sara lê um livro.

Concordância verbal. Um sujeito singular leva um verbo singular: ela trabalha em um hospital.

Erros comuns. Errado: as crianças brinca lá fora. Certo: as crianças brincam lá fora.`,
      videoTopic: "Revisar a estrutura da frase e a concordância verbal com exemplos.",
      readingTitle: "Meu nome é Grace.",
      reading: [
        "Agora estou estudando português de nível intermediário.",
        "Todos os dias, pratico construir frases corretas.",
        "Minha professora diz que uma boa frase sempre tem um sujeito claro e um verbo que concorda.",
        "Na semana passada cometi muitos erros, mas esta semana reviso minha gramática com cuidado antes de falar.",
      ],
      readingSpeakText: `Meu nome é Grace. Agora estou estudando português de nível intermediário. Todos os dias, pratico construir frases corretas.`,
      exercises: ["Identifique o sujeito e o verbo em três frases de um jornal.", "Corrija esta frase: Os estudantes está prontos.", "Escreva duas frases com 'eu' e duas com 'ela'.", "Explique por que 'As crianças brinca' está errado."],
      speakingTopic: "Explique com suas próprias palavras o que são o sujeito e o verbo.",
    },
    {
      id: 2,
      title: "Passado e Futuro",
      subtitle: "Aprenda a falar sobre o que já aconteceu e o que vai acontecer.",
      sections: [
        { heading: "Pretérito Perfeito", body: ["Usado para ações terminadas no passado.", "Verbos regulares: trabalhei, caminhei, joguei.", "Verbos irregulares: ir → fui, comer → comi, ver → vi.", "Ontem, visitei minha avó."] },
        { heading: "Pretérito Imperfeito", body: ["Usado para uma ação em andamento no passado.", "Às 20 horas de ontem, eu estudava português.", "Enquanto ela cozinhava, o telefone tocou."] },
        { heading: "Futuro com 'ir' e o Futuro Simples", body: ["'Ir' + infinitivo é usado para planos já decididos.", "Vou visitar Paris ano que vem.", "O futuro simples é usado para previsões ou decisões rápidas.", "Acho que vai chover amanhã.", "Vou te ajudar com a lição de casa."] },
      ],
      speakText: `O pretérito perfeito é usado para ações terminadas no passado. Ontem, visitei minha avó.

O pretérito imperfeito é usado para uma ação em andamento no passado. Às vinte horas de ontem, eu estudava português.

Futuro com ir e o futuro simples. Vou visitar Paris ano que vem. Acho que vai chover amanhã.`,
      videoTopic: "Comparar o pretérito perfeito, o imperfeito e as duas formas de futuro.",
      readingTitle: "No ano passado, Tomás viajou para Lubumbashi pela primeira vez.",
      reading: [
        "Enquanto esperava o ônibus, encontrou um velho amigo da escola.",
        "Conversaram por quase uma hora e lembraram a infância juntos.",
        "Tomás disse que vai visitar Lubumbashi novamente no próximo verão.",
        "Também disse que vai convidar o amigo para ir com ele dessa vez.",
      ],
      readingSpeakText: `No ano passado, Tomás viajou para Lubumbashi pela primeira vez. Enquanto esperava o ônibus, encontrou um velho amigo da escola.`,
      exercises: ["Escreva três frases sobre o que você fez ontem usando o pretérito perfeito.", "Escreva uma frase usando o imperfeito.", "Escreva uma frase sobre seus planos para o ano que vem usando 'ir'.", "Faça uma previsão rápida sobre o tempo."],
      speakingTopic: "Fale sobre algo que você fez no fim de semana passado e algo que fará no próximo.",
    },
    {
      id: 3,
      title: "Prática de Conversação",
      subtitle: "Pratique fazer perguntas e manter uma conversa naturalmente.",
      sections: [
        { heading: "Tipos de Perguntas", body: ["Perguntas de Sim/Não: Você gosta de café?", "Perguntas com O quê, Onde, Quando, Quem, Por quê, Como.", "O que você faz da vida?", "De onde você é?"] },
        { heading: "Manter uma Conversa", body: ["Mostre interesse: Sério? Que interessante! Conte mais.", "Faça uma pergunta de acompanhamento em vez de só responder.", "A: Fui ao mercado de manhã. B: Ah legal, o que você comprou?"] },
        { heading: "Concordar e Discordar Educadamente", body: ["Eu concordo com você.", "É um bom ponto, mas eu acho que...", "Não tenho certeza se concordo. Na minha opinião..."] },
      ],
      speakText: `Tipos de perguntas. Perguntas de sim ou não: você gosta de café? Perguntas com o quê, onde, quando, quem.

Manter uma conversa. Mostre interesse: sério? Conte mais.

Concordar e discordar educadamente. Eu concordo com você. É um bom ponto, mas eu acho que...`,
      videoTopic: "Praticar perguntas de acompanhamento em uma conversa real.",
      readingTitle: "Na sexta-feira passada, Paulo conheceu uma nova colega de trabalho chamada Clara.",
      reading: [
        "Ele perguntou, “De onde você é?” e ela disse que era de Goma.",
        "Paulo então fez uma pergunta de acompanhamento: “Há quanto tempo você mora aqui?”",
        "Clara disse que concordava que a cidade era muito amigável, mas acrescentou que o trânsito podia ser difícil.",
        "Paulo disse que esse era um bom ponto, e os dois riram.",
      ],
      readingSpeakText: `Na sexta-feira passada, Paulo conheceu uma nova colega de trabalho chamada Clara. Ele perguntou, de onde você é?`,
      exercises: ["Escreva três perguntas com O quê/Onde que você poderia fazer a um novo colega de trabalho.", "Pratique um diálogo curto onde você concorda e depois discorda educadamente.", "Escreva uma pergunta de acompanhamento para: 'Eu vi um filme ontem à noite.'", "Encene se apresentar e fazer duas perguntas."],
      speakingTopic: "Tenha uma conversa curta com um colega usando pelo menos duas perguntas de acompanhamento.",
    },
    {
      id: 4,
      title: "Habilidades de Escrita",
      subtitle: "Aprenda a organizar ideias em parágrafos claros usando conectores.",
      sections: [
        { heading: "Estrutura do Parágrafo", body: ["Um parágrafo tem uma ideia principal.", "Frase de tópico: apresenta a ideia principal.", "Frases de apoio: dão detalhes e exemplos.", "Frase de conclusão: fecha a ideia."] },
        { heading: "Palavras Conectivas", body: ["Adição: e, também, além disso.", "Contraste: mas, porém, embora.", "Causa e efeito: porque, então, portanto.", "Sequência: primeiro, depois, em seguida, finalmente."] },
        { heading: "Parágrafo de Exemplo", body: ["Eu adoro aprender português porque me abre muitas oportunidades. Primeiro, posso me comunicar com mais pessoas. Além disso, entendo melhor os filmes e as músicas. Porém, aprender um idioma novo exige tempo e paciência. Portanto, pratico todos os dias."] },
      ],
      speakText: `Um parágrafo tem uma ideia principal. A frase de tópico apresenta a ideia principal. As frases de apoio dão detalhes.

Palavras conectivas. Adição: e, também. Contraste: mas, porém. Causa e efeito: porque, portanto.`,
      videoTopic: "Ver como as palavras conectivas unem ideias em um parágrafo.",
      readingTitle: "Por que Gosto de Ler",
      reading: [
        "Eu gosto de ler porque me ajuda a relaxar depois de um dia longo.",
        "Primeiro, escolho um lugar tranquilo na minha casa.",
        "Depois, leio por uns trinta minutos.",
        "Embora às vezes eu adormeça, sempre aprendo algo novo.",
        "Portanto, ler se tornou um dos meus hábitos favoritos.",
      ],
      readingSpeakText: `Por que gosto de ler. Eu gosto de ler porque me ajuda a relaxar depois de um dia longo.`,
      exercises: ["Escreva uma frase de tópico sobre seu passatempo favorito.", "Acrescente duas frases de apoio com detalhes.", "Use 'porque' e 'porém' em duas frases diferentes.", "Escreva um parágrafo curto (4-5 frases) sobre seu dia típico."],
      speakingTopic: "Descreva seu passatempo favorito usando uma frase de tópico clara e detalhes de apoio.",
    },
    {
      id: 5,
      title: "Habilidades de Escuta",
      subtitle: "Aprenda estratégias para entender o português falado mais facilmente.",
      sections: [
        { heading: "Estratégias de Escuta", body: ["Escute as palavras-chave, não cada palavra.", "Preste atenção ao tema principal primeiro.", "Use o contexto para adivinhar o significado de palavras novas.", "Está certo pedir para alguém repetir: 'Você pode repetir, por favor?'"] },
        { heading: "Frases Úteis para Escutar", body: ["Não entendi isso.", "Você pode falar mais devagar, por favor?", "Desculpe, o que você disse?", "Então, se entendi bem, você quer dizer que..."] },
        { heading: "Seguir Direções", body: ["Vire à esquerda / Vire à direita.", "Siga em frente.", "Fica à sua esquerda / direita.", "Pegue a segunda rua à direita."] },
      ],
      speakText: `Estratégias de escuta. Escute as palavras-chave, não cada palavra. Preste atenção ao tema principal primeiro.

Está certo pedir para alguém repetir: você pode repetir, por favor?

Seguir direções. Vire à esquerda. Vire à direita. Siga em frente.`,
      videoTopic: "Praticar seguir direções faladas pela cidade.",
      readingTitle: "Marie perguntou a um estranho o caminho para os correios.",
      reading: [
        "O homem disse, “Siga em frente, depois vire à esquerda no mercado.”",
        "Marie não entendeu tudo, então disse, “Desculpe, você pode repetir, por favor?”",
        "O homem repetiu devagar: “Siga em frente, vire à esquerda no mercado, e os correios ficam à sua direita.”",
        "Marie agradeceu e encontrou os correios facilmente.",
      ],
      readingSpeakText: `Marie perguntou a um estranho o caminho para os correios. O homem disse, siga em frente, depois vire à esquerda no mercado.`,
      exercises: ["Escreva três frases que você pode usar quando não entende alguém.", "Dê direções da sua casa até o mercado mais próximo.", "Pratique escutar alguém falar e depois resuma o que foi dito.", "Explique para que serve 'se entendi bem'."],
      speakingTopic: "Dê a um colega direções da escola até a sua casa.",
    },
    {
      id: 6,
      title: "Compreensão de Leitura",
      subtitle: "Aprenda técnicas para entender textos mais longos de forma mais eficaz.",
      sections: [
        { heading: "Leitura Rápida e Busca de Informações", body: ["Leitura rápida: ler rapidamente para entender a ideia geral.", "Busca de informações: procurar rapidamente uma informação específica, como uma data ou um nome.", "Leia o título e a primeira frase de cada parágrafo antes de ler em detalhe."] },
        { heading: "Usar Pistas do Contexto", body: ["Você não precisa entender cada palavra para entender um texto.", "Use as palavras ao redor de uma palavra desconhecida para adivinhar seu significado.", "Exemplo: 'O clima estava gélido, então todos usavam casacos pesados.' Gélido provavelmente significa muito frio."] },
      ],
      speakText: `Leitura rápida significa ler rapidamente para entender a ideia geral.

Busca de informações significa procurar rapidamente uma informação específica, como uma data ou um nome.

Usar pistas do contexto. Você não precisa entender cada palavra para entender um texto.`,
      videoTopic: "Praticar a leitura rápida de um artigo curto para encontrar a ideia principal.",
      readingTitle: "O Mercado de Kolwezi",
      reading: [
        "Todo sábado, centenas de pessoas se reúnem no mercado central de Kolwezi.",
        "Os vendedores vendem de tudo, desde legumes frescos até roupas feitas à mão.",
        "O ambiente é animado, com música tocando e vendedores gritando seus preços.",
        "Muitas famílias chegam cedo pela manhã antes de ficar muito lotado.",
        "Por volta do meio-dia, o mercado fica cheio de cores, barulho e o cheiro de comida fresca.",
      ],
      readingSpeakText: `O mercado de Kolwezi. Todo sábado, centenas de pessoas se reúnem no mercado central de Kolwezi.`,
      exercises: ["Leia o texto rapidamente em 10 segundos e diga do que se trata.", "Procure no texto em que dia o mercado acontece.", "Adivinhe o significado de 'animado' pelo contexto.", "Escreva duas frases descrevendo um mercado que você conhece."],
      speakingTopic: "Descreva um mercado ou lugar movimentado que você já visitou.",
    },
    {
      id: 7,
      title: "Ampliação de Vocabulário",
      subtitle: "Amplie seu vocabulário com sinônimos, antônimos e famílias de palavras.",
      sections: [
        { heading: "Sinônimos (significado semelhante)", body: ["Feliz = contente, alegre", "Grande = enorme, imenso", "Inteligente = esperto, perspicaz", "Rápido = veloz, célere"] },
        { heading: "Antônimos (significado oposto)", body: ["Quente ↔ Frio", "Fácil ↔ Difícil", "Cedo ↔ Tarde", "Começar ↔ Terminar"] },
        { heading: "Famílias de Palavras", body: ["Ter sucesso (verbo) → sucesso (substantivo) → bem-sucedido (adjetivo).", "Decidir (verbo) → decisão (substantivo) → decisivo (adjetivo)."] },
        { heading: "Colocações (palavras que andam juntas)", body: ["Tomar uma decisão (não 'fazer uma decisão')", "Tirar uma foto", "Fazer a lição de casa", "Tomar café da manhã"] },
      ],
      speakText: `Sinônimos, palavras com significado semelhante. Feliz significa contente ou alegre. Grande significa enorme ou imenso.

Antônimos, palavras com significado oposto. Quente e frio. Fácil e difícil.

Famílias de palavras. Ter sucesso, sucesso, bem-sucedido.

Colocações são palavras que andam juntas. Tomar uma decisão. Tirar uma foto. Fazer a lição de casa.`,
      videoTopic: "Construir vocabulário através de sinônimos, antônimos e pares de palavras comuns.",
      readingTitle: "Construindo um Vocabulário Mais Amplo",
      reading: [
        "Aprender palavras novas todos os dias é uma das melhores formas de melhorar seu português rapidamente.",
        "Em vez de memorizar palavras soltas, tente aprendê-las em grupos, como sinônimos ou famílias de palavras.",
        "Por exemplo, se você aprende 'decidir', aprenda também 'decisão' e 'decisivo'.",
        "Dessa forma, uma palavra nova na verdade te ensina três ou quatro.",
      ],
      readingSpeakText: `Construindo um vocabulário mais amplo. Aprender palavras novas todos os dias é uma das melhores formas de melhorar seu português rapidamente.`,
      exercises: ["Encontre um sinônimo de 'feliz' e 'rápido'.", "Encontre um antônimo de 'começar' e 'fácil'.", "Escreva o substantivo e o adjetivo de 'ter sucesso'.", "Use 'tomar uma decisão' e 'tirar uma foto' em duas frases."],
      speakingTopic: "Descreva o seu dia usando pelo menos três palavras novas desta lição.",
    },
    {
      id: 8,
      title: "Dominância da Pronúncia",
      subtitle: "Melhore a entonação e os sons que se confundem com frequência.",
      sections: [
        { heading: "A Tônica das Palavras", body: ["As palavras em português têm uma sílaba tônica (mais forte).", "FOtografia, fotoGRAfo, fotográfico. A tônica se move!", "Colocar a tônica na sílaba errada pode confundir quem escuta."] },
        { heading: "Entonação", body: ["Perguntas de Sim/Não geralmente sobem no final: Você vem? ↗", "Perguntas com O quê/Onde geralmente descem no final: Para onde você vai? ↘"] },
        { heading: "Sons que se Confundem com Frequência", body: ["São vs São: são (verbo) vs são (adjetivo, como em 'pão') soam parecidos para iniciantes.", "R vs RR: caro vs carro.", "ÃO vs AM: mão vs falam."] },
      ],
      speakText: `A tônica das palavras. As palavras em português têm uma sílaba tônica. Fotografia, fotógrafo, fotográfico.

Entonação. Perguntas de sim ou não geralmente sobem no final: você vem?

Sons que se confundem com frequência. Caro versus carro.`,
      videoTopic: "Ouvir a diferença entre a entonação ascendente e descendente.",
      readingTitle: "Por que a Pronúncia Importa",
      reading: [
        "A boa gramática é importante, mas uma pronúncia clara ajuda as pessoas a te entenderem imediatamente.",
        "Muitos estudantes focam apenas em sons individuais e esquecem a tônica das palavras.",
        "Uma palavra com a tônica errada pode soar como uma palavra completamente diferente.",
        "Praticar um pouco todos os dias, mesmo que cinco minutos, faz uma grande diferença com o tempo.",
      ],
      readingSpeakText: `Por que a pronúncia importa. A boa gramática é importante, mas uma pronúncia clara ajuda as pessoas a te entenderem imediatamente.`,
      exercises: ["Pratique dizer 'fotografia', 'fotógrafo' e 'fotográfico' em voz alta.", "Diga uma pergunta de Sim/Não com entonação ascendente.", "Diga uma pergunta com O quê/Onde com entonação descendente.", "Pratique as palavras 'caro' e 'carro'."],
      speakingTopic: "Leia o texto de leitura em voz alta prestando atenção à tônica das palavras.",
    },
    {
      id: 9,
      title: "Português para Situações Reais",
      subtitle: "Aprenda frases úteis para situações cotidianas da vida real.",
      sections: [
        { heading: "No Restaurante", body: ["Posso ver o cardápio, por favor?", "Eu gostaria do frango, por favor.", "Podemos pegar a conta, por favor?", "O serviço está incluído?"] },
        { heading: "No Aeroporto", body: ["Onde fica o balcão de check-in?", "Eu gostaria de um assento na janela, por favor.", "A que horas embarca o voo?", "Onde fica a esteira de bagagem?"] },
        { heading: "Em uma Entrevista de Emprego", body: ["Fale sobre você.", "Quais são seus pontos fortes?", "Por que você quer trabalhar aqui?", "Eu sou uma pessoa trabalhadora e confiável."] },
      ],
      speakText: `No restaurante. Posso ver o cardápio, por favor? Eu gostaria do frango, por favor.

No aeroporto. Onde fica o balcão de check-in? Eu gostaria de um assento na janela.

Em uma entrevista de emprego. Fale sobre você. Quais são seus pontos fortes?`,
      videoTopic: "Praticar diálogos reais em um restaurante, aeroporto e entrevista de emprego.",
      readingTitle: "A Entrevista de Emprego de Ana",
      reading: [
        "Ana chegou cedo para a entrevista de emprego e cumprimentou o gerente educadamente.",
        "Quando o gerente perguntou, “Fale sobre você”, Ana falou com confiança sobre seus estudos e experiência.",
        "Ela explicou que seu principal ponto forte era ser trabalhadora e confiável.",
        "No final, Ana fez sua própria pergunta: “Como é um dia típico nessa função?”",
        "O gerente ficou impressionado com a preparação dela.",
      ],
      readingSpeakText: `A entrevista de emprego de Ana. Ana chegou cedo para a entrevista de emprego e cumprimentou o gerente educadamente.`,
      exercises: ["Escreva um diálogo curto de restaurante pedindo comida.", "Escreva duas perguntas que você poderia fazer no balcão de check-in.", "Responda à pergunta de entrevista 'Quais são seus pontos fortes?' sobre você.", "Pratique o diálogo completo da entrevista com um colega."],
      speakingTopic: "Encene uma entrevista de emprego com um colega, fazendo e respondendo perguntas comuns.",
    },
    {
      id: 10,
      title: "Português Empresarial Básico",
      subtitle: "Aprenda vocabulário profissional para e-mails e reuniões.",
      sections: [
        { heading: "Escrever um E-mail Profissional", body: ["Prezado Sr. Kasongo, (saudação)", "Escrevo para perguntar sobre... (propósito)", "Por favor, avise-me se precisar de mais informações. (encerramento)", "Atenciosamente, (despedida)"] },
        { heading: "Frases Úteis para Reuniões", body: ["Vamos começar.", "Você poderia esclarecer esse ponto?", "Eu gostaria de acrescentar algo.", "Vamos para o próximo item.", "Resumindo, concordamos que..."] },
        { heading: "Vocabulário Profissional", body: ["Prazo: a data em que algo deve ser concluído.", "Colega: uma pessoa com quem você trabalha.", "Cliente: uma pessoa ou empresa para quem você presta serviço.", "Relatório: um resumo escrito de informações."] },
      ],
      speakText: `Escrever um e-mail profissional. Prezado Sr. Kasongo. Escrevo para perguntar sobre... Atenciosamente.

Frases úteis para reuniões. Vamos começar. Você poderia esclarecer esse ponto? Eu gostaria de acrescentar algo.

Vocabulário profissional. Prazo significa a data em que algo deve ser concluído.`,
      videoTopic: "Ver como se estrutura um e-mail profissional e uma conversa de reunião.",
      readingTitle: "A Primeira Semana de David em um Novo Emprego",
      reading: [
        "Durante sua primeira reunião, David ouviu sua gerente dizer, “Vamos começar.”",
        "Ele escutou com atenção e, quando não entendeu um ponto, disse, “Você poderia esclarecer isso, por favor?”",
        "Mais tarde naquele dia, David escreveu seu primeiro e-mail profissional para um cliente, começando com “Prezada Sra. Tshisekedi” e terminando com “Atenciosamente.”",
        "Sua colega disse que o e-mail estava claro e bem escrito.",
      ],
      readingSpeakText: `A primeira semana de David em um novo emprego. Durante sua primeira reunião, David ouviu sua gerente dizer, vamos começar.`,
      exercises: ["Escreva um e-mail profissional curto perguntando sobre uma vaga de emprego.", "Escreva duas frases que você poderia usar para participar de uma reunião.", "Use 'prazo', 'colega' e 'cliente' cada um em uma frase.", "Pratique dizer 'Você poderia esclarecer esse ponto?' em voz alta."],
      speakingTopic: "Explique o que faz um e-mail soar profissional.",
    },
    {
      id: 11,
      title: "Debates e Argumentos",
      subtitle: "Aprenda a expressar e defender sua opinião respeitosamente.",
      sections: [
        { heading: "Dar sua Opinião", body: ["Na minha opinião, ...", "Eu pessoalmente acredito que ...", "Do meu ponto de vista, ...", "No que me diz respeito, ..."] },
        { heading: "Concordar e Discordar Formalmente", body: ["Eu concordo completamente com esse ponto.", "Entendo seu ponto, mas tenho uma opinião diferente.", "Receio que tenha que discordar.", "Isso é verdade, porém, também deveríamos considerar..."] },
        { heading: "Apoiar um Argumento", body: ["Por exemplo, ...", "Isso é apoiado pelo fato de que ...", "Pesquisas mostram que ...", "Em conclusão, acredito que ..."] },
      ],
      speakText: `Dar sua opinião. Na minha opinião... Eu pessoalmente acredito que... Do meu ponto de vista...

Concordar e discordar formalmente. Eu concordo completamente com esse ponto. Entendo seu ponto, mas tenho uma opinião diferente.

Apoiar um argumento. Por exemplo... Pesquisas mostram que... Em conclusão, acredito que...`,
      videoTopic: "Ver um debate curto e respeitoso usando frases de opinião e argumento.",
      readingTitle: "Um Debate em Sala de Aula",
      reading: [
        "Na aula, os estudantes debateram se os celulares deveriam ser permitidos na escola.",
        "José disse, “Na minha opinião, os celulares nos ajudam a aprender porque podemos buscar informações rapidamente.”",
        "Grace respondeu, “Entendo seu ponto, mas tenho uma opinião diferente. Os celulares podem ser muito distrativos durante as aulas.”",
        "O professor disse que os dois argumentos eram bem fundamentados e incentivou a turma a continuar discutindo com respeito.",
      ],
      readingSpeakText: `Um debate em sala de aula. Na aula, os estudantes debateram se os celulares deveriam ser permitidos na escola.`,
      exercises: ["Dê sua opinião sobre aprender português usando 'Na minha opinião...'.", "Pratique discordar educadamente da opinião de um colega.", "Escreva um argumento apoiado por 'Por exemplo...'.", "Escreva uma conclusão curta usando 'Em conclusão, acredito que...'."],
      speakingTopic: "Debata um tema simples (como vida na cidade versus vida no campo) com um colega.",
    },
    {
      id: 12,
      title: "Revisão Final e Conversa da Vida Real",
      subtitle: "Revise tudo o que aprendeu no Nível 2 e pratique uma conversa mais longa da vida real.",
      sections: [
        {
          heading: "O que Aprendemos",
          body: [
            "Revisar a estrutura da frase e a concordância verbal",
            "Usar corretamente o passado e o futuro",
            "Manter conversas com perguntas de acompanhamento",
            "Escrever parágrafos organizados com conectores",
            "Estratégias de escuta e pedir esclarecimentos",
            "Leitura rápida e busca de informações para compreensão de leitura",
            "Ampliar o vocabulário com sinônimos e famílias de palavras",
            "Melhorar a pronúncia, a tônica e a entonação",
            "Usar português em restaurantes, aeroportos e entrevistas",
            "Escrever e-mails profissionais e falar em reuniões",
            "Dar opiniões e debater com respeito",
          ],
        },
        {
          heading: "Exemplo de Conversa da Vida Real",
          body: [
            "A: Oi, soube que você começou um novo emprego. Como está sendo?",
            "B: Está indo bem, obrigada! Eu estava nervosa no início, mas meus colegas são muito simpáticos.",
            "A: Que bom saber disso. O que você faz exatamente?",
            "B: Escrevo relatórios e respondo e-mails de clientes. É desafiador, mas estou aprendendo muito.",
            "A: Na minha opinião, essa é uma habilidade muito útil de se ter.",
            "B: Concordo. Vou continuar melhorando meu português para o trabalho também.",
          ],
        },
      ],
      speakText: `As coisas importantes que aprendemos no Nível 2 incluem revisar a estrutura da frase, usar o passado e o futuro, manter conversas, escrever parágrafos, estratégias de escuta, compreensão de leitura, ampliação de vocabulário, pronúncia, português para situações reais, português empresarial, e debater com respeito.

Exemplo de conversa da vida real.

Oi, soube que você começou um novo emprego. Como está sendo?
Está indo bem, obrigada! Eu estava nervosa no início, mas meus colegas são muito simpáticos.`,
      videoTopic: "Revisar todos os temas do Nível 2 através de uma conversa estendida.",
      readingTitle: "Um Ano de Progresso",
      reading: [
        "Há um ano, Patrick mal conseguia se apresentar em português.",
        "Depois de terminar o Nível 1 e o Nível 2, agora ele pode manter uma conversa completa sobre o trabalho dele, as opiniões dele e a vida diária dele.",
        "Ele escreve e-mails profissionais no trabalho e se sente confiante em reuniões.",
        "Patrick diz que a chave para seu progresso foi praticar um pouco todos os dias.",
        "Agora ele está animado para começar o Nível 3 e continuar melhorando.",
      ],
      readingSpeakText: `Um ano de progresso. Há um ano, Patrick mal conseguia se apresentar em português.`,
      exercises: ["Apresente-se usando pelo menos dois pontos de gramática do Nível 2.", "Escreva um parágrafo curto sobre seu progresso aprendendo português.", "Pratique a conversa de exemplo em voz alta com um colega.", "Dê sua opinião sobre a utilidade de aprender português para o trabalho."],
      speakingTopic: "Tenha uma conversa completa sobre seus estudos, suas opiniões e seus planos futuros.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Teste 1",
      subtitle: "Revisão de Gramática Intermediária",
      passingScore: 7,
      questions: [
        { question: "O que toda frase precisa?", options: ["Um sujeito e um verbo", "Apenas um adjetivo", "Apenas um ponto de interrogação"], answer: "Um sujeito e um verbo" },
        { question: "Em 'Sara lê um livro', qual é o objeto?", options: ["Sara", "lê", "um livro"], answer: "um livro" },
        { question: "Escolha a frase correta.", options: ["As crianças brinca lá fora", "As crianças brincam lá fora", "As crianças brincando lá fora"], answer: "As crianças brincam lá fora" },
        { question: "Escolha a frase correta.", options: ["Ele vai à escola amanhã", "Ele vão à escola amanhã", "Ele ir à escola amanhã"], answer: "Ele vai à escola amanhã" },
        { question: "Qual forma verbal corresponde a um sujeito plural?", options: ["A forma singular", "A forma plural", "Nenhum verbo é necessário"], answer: "A forma plural" },
        { question: "O que Grace está estudando?", options: ["Português de nível intermediário", "Matemática", "História"], answer: "Português de nível intermediário" },
        { question: "O que Grace faz todos os dias?", options: ["Pratica construir frases corretas", "Dorme o dia todo", "Evita a gramática"], answer: "Pratica construir frases corretas" },
        { question: "O que a professora de Grace diz que uma boa frase precisa?", options: ["Um sujeito claro e um verbo que concorda", "Apenas palavras longas", "Nenhuma pontuação"], answer: "Um sujeito claro e um verbo que concorda" },
        { question: "Como Grace se sente sobre seu progresso?", options: ["Orgulhosa", "Brava", "Cansada"], answer: "Orgulhosa" },
        { question: "O que mudou entre a semana passada e esta para Grace?", options: ["Ela parou de estudar", "Agora ela revisa sua gramática com cuidado", "Ela mudou de escola"], answer: "Agora ela revisa sua gramática com cuidado" },
      ],
    },
    {
      lessonId: 2,
      title: "Teste 2",
      subtitle: "Passado e Futuro",
      passingScore: 7,
      questions: [
        { question: "Qual tempo verbal descreve uma ação terminada no passado?", options: ["O pretérito perfeito", "O futuro simples", "O presente contínuo"], answer: "O pretérito perfeito" },
        { question: "Qual é a forma no pretérito perfeito de 'ir'?", options: ["ia", "fui", "indo"], answer: "fui" },
        { question: "Qual frase usa corretamente o imperfeito?", options: ["Eu estudava às 20 horas", "Eu estudo às 20 horas ontem", "Eu vou estudar às 20 horas"], answer: "Eu estudava às 20 horas" },
        { question: "Qual forma usamos para um plano já decidido?", options: ["ir + infinitivo", "fui", "estava"], answer: "ir + infinitivo" },
        { question: "Qual forma usamos para uma decisão rápida ou previsão?", options: ["o futuro simples", "fui", "estava indo"], answer: "o futuro simples" },
        { question: "Para onde Tomás viajou no ano passado?", options: ["Lubumbashi", "Paris", "Kinshasa"], answer: "Lubumbashi" },
        { question: "Com quem Tomás se encontrou enquanto esperava o ônibus?", options: ["Um estranho", "Um velho amigo da escola", "O professor dele"], answer: "Um velho amigo da escola" },
        { question: "O que Tomás e o amigo vão fazer no próximo verão?", options: ["Visitar Lubumbashi novamente", "Mudar para outra cidade", "Parar de ser amigos"], answer: "Visitar Lubumbashi novamente" },
        { question: "Qual frase está correta para um plano futuro?", options: ["Vou visitar Paris ano que vem", "Fui visitar Paris ano que vem", "Visito Paris ano passado"], answer: "Vou visitar Paris ano que vem" },
        { question: "Por quanto tempo eles conversaram?", options: ["Quase uma hora", "Cinco minutos", "A semana toda"], answer: "Quase uma hora" },
      ],
    },
    {
      lessonId: 3,
      title: "Teste 3",
      subtitle: "Prática de Conversação",
      passingScore: 7,
      questions: [
        { question: "Qual é uma pergunta de Sim/Não?", options: ["Você gosta de café?", "O que você faz da vida?", "De onde você é?"], answer: "Você gosta de café?" },
        { question: "Qual é uma pergunta com O quê/Onde?", options: ["De onde você é?", "Você gosta de café?", "Você concorda?"], answer: "De onde você é?" },
        { question: "Qual é uma boa forma de manter uma conversa?", options: ["Fazer uma pergunta de acompanhamento", "Ficar quieto", "Mudar de assunto imediatamente"], answer: "Fazer uma pergunta de acompanhamento" },
        { question: "Qual frase discorda educadamente?", options: ["Não tenho certeza se concordo", "Eu concordo completamente", "Isso está totalmente correto"], answer: "Não tenho certeza se concordo" },
        { question: "Qual frase mostra interesse em uma conversa?", options: ["Conte mais", "Não me importo", "Pare de falar"], answer: "Conte mais" },
        { question: "Quem Paulo conheceu no trabalho?", options: ["Clara", "Grace", "Ana"], answer: "Clara" },
        { question: "De onde Clara é?", options: ["Goma", "Kinshasa", "Lubumbashi"], answer: "Goma" },
        { question: "Qual pergunta de acompanhamento Paulo fez?", options: ["Há quanto tempo você mora aqui?", "Qual é o seu nome?", "Você gosta de café?"], answer: "Há quanto tempo você mora aqui?" },
        { question: "O que Clara disse sobre a cidade?", options: ["Era amigável mas o trânsito podia ser difícil", "Era chata", "Ela odiava"], answer: "Era amigável mas o trânsito podia ser difícil" },
        { question: "Como Paulo respondeu ao comentário de Clara sobre o trânsito?", options: ["Disse que era um bom ponto", "Não concordou com força", "Saiu da conversa"], answer: "Disse que era um bom ponto" },
      ],
    },
    {
      lessonId: 4,
      title: "Teste 4",
      subtitle: "Habilidades de Escrita",
      passingScore: 7,
      questions: [
        { question: "O que faz uma frase de tópico?", options: ["Apresenta a ideia principal", "Termina o parágrafo", "Lista fatos aleatórios"], answer: "Apresenta a ideia principal" },
        { question: "Qual palavra mostra contraste?", options: ["porém", "também", "primeiro"], answer: "porém" },
        { question: "Qual palavra mostra causa e efeito?", options: ["porque", "e", "depois"], answer: "porque" },
        { question: "Qual palavra mostra sequência?", options: ["primeiro", "mas", "embora"], answer: "primeiro" },
        { question: "O que faz uma frase de conclusão?", options: ["Fecha a ideia", "Começa o parágrafo", "Faz uma pergunta"], answer: "Fecha a ideia" },
        { question: "Por que a escritora gosta de ler?", options: ["Ajuda a relaxar depois de um dia longo", "A deixa cansada", "Não tem outro passatempo"], answer: "Ajuda a relaxar depois de um dia longo" },
        { question: "Por quanto tempo ela costuma ler?", options: ["Uns trinta minutos", "Duas horas", "Cinco minutos"], answer: "Uns trinta minutos" },
        { question: "Qual conector é usado antes de 'ela às vezes adormece'?", options: ["Embora", "Porque", "Primeiro"], answer: "Embora" },
        { question: "No que a leitura se tornou para ela?", options: ["Um dos seus hábitos favoritos", "Uma perda de tempo", "O trabalho dela"], answer: "Um dos seus hábitos favoritos" },
        { question: "Qual frase usa corretamente 'portanto'?", options: ["Eu pratico todos os dias, portanto estou melhorando", "Portanto eu gosto de maçãs", "Pratico portanto eu estudante"], answer: "Eu pratico todos os dias, portanto estou melhorando" },
      ],
    },
    {
      lessonId: 5,
      title: "Teste 5",
      subtitle: "Habilidades de Escuta",
      passingScore: 7,
      questions: [
        { question: "O que você deve escutar primeiro?", options: ["As palavras-chave e o tema principal", "Cada palavra individualmente", "Apenas a última palavra"], answer: "As palavras-chave e o tema principal" },
        { question: "O que você pode fazer se não entender?", options: ["Pedir para a pessoa repetir", "Fingir que entendeu", "Ir embora"], answer: "Pedir para a pessoa repetir" },
        { question: "Qual frase pede para alguém falar mais devagar?", options: ["Você pode falar mais devagar, por favor?", "Fique quieto", "Eu sei tudo"], answer: "Você pode falar mais devagar, por favor?" },
        { question: "Qual frase verifica sua compreensão?", options: ["Então, se entendi bem, você quer dizer que...", "Não me importo com o que você quer dizer", "Esqueça isso"], answer: "Então, se entendi bem, você quer dizer que..." },
        { question: "Qual frase dá uma direção?", options: ["Vire à esquerda", "Eu concordo", "Muito prazer"], answer: "Vire à esquerda" },
        { question: "O que Marie pediu ao estranho?", options: ["Direções para os correios", "As horas", "Dinheiro"], answer: "Direções para os correios" },
        { question: "O que Marie disse quando não entendeu?", options: ["Desculpe, você pode repetir, por favor?", "Não quero saber", "Tchau"], answer: "Desculpe, você pode repetir, por favor?" },
        { question: "Onde ficam os correios segundo o homem?", options: ["À direita, depois de virar à esquerda no mercado", "Atrás da escola", "Perto da casa de Marie"], answer: "À direita, depois de virar à esquerda no mercado" },
        { question: "Como o homem respondeu ao pedido de Marie?", options: ["Repetiu as direções devagar", "Recusou-se a ajudar", "Foi embora"], answer: "Repetiu as direções devagar" },
        { question: "O que Marie fez depois de receber as direções?", options: ["Encontrou os correios facilmente", "Se perdeu", "Voltou para casa em vez disso"], answer: "Encontrou os correios facilmente" },
      ],
    },
    {
      lessonId: 6,
      title: "Teste 6",
      subtitle: "Compreensão de Leitura",
      passingScore: 7,
      questions: [
        { question: "O que é a leitura rápida?", options: ["Ler rapidamente para entender a ideia geral", "Ler cada palavra devagar", "Não ler de jeito nenhum"], answer: "Ler rapidamente para entender a ideia geral" },
        { question: "O que é a busca de informações?", options: ["Procurar rapidamente uma informação específica", "Memorizar um texto", "Traduzir um texto"], answer: "Procurar rapidamente uma informação específica" },
        { question: "O que pode ajudar a adivinhar o significado de uma palavra desconhecida?", options: ["Pistas do contexto", "Adivinhar aleatoriamente sem o texto", "Ignorar a frase"], answer: "Pistas do contexto" },
        { question: "Em 'o clima estava gélido, então todos usavam casacos pesados', o que 'gélido' provavelmente significa?", options: ["Muito frio", "Muito quente", "Muito colorido"], answer: "Muito frio" },
        { question: "O que você deve ler primeiro para encontrar a ideia principal rapidamente?", options: ["O título e a primeira frase de cada parágrafo", "Apenas a última palavra", "O número da página"], answer: "O título e a primeira frase de cada parágrafo" },
        { question: "Onde o mercado acontece?", options: ["Kolwezi", "Goma", "Lubumbashi"], answer: "Kolwezi" },
        { question: "Em que dia o mercado acontece?", options: ["Sábado", "Segunda-feira", "Domingo"], answer: "Sábado" },
        { question: "O que os vendedores vendem no mercado?", options: ["Legumes e roupas feitas à mão", "Só sapatos", "Só livros"], answer: "Legumes e roupas feitas à mão" },
        { question: "Como é o ambiente do mercado?", options: ["Animado, com música e vendedores gritando", "Silencioso e vazio", "Perigoso"], answer: "Animado, com música e vendedores gritando" },
        { question: "Quando muitas famílias chegam ao mercado?", options: ["Cedo pela manhã", "Tarde da noite", "Nunca"], answer: "Cedo pela manhã" },
      ],
    },
    {
      lessonId: 7,
      title: "Teste 7",
      subtitle: "Ampliação de Vocabulário",
      passingScore: 7,
      questions: [
        { question: "Qual palavra é sinônimo de 'feliz'?", options: ["contente", "frio", "lento"], answer: "contente" },
        { question: "Qual palavra é antônimo de 'fácil'?", options: ["difícil", "simples", "rápido"], answer: "difícil" },
        { question: "Qual é a forma substantiva de 'ter sucesso'?", options: ["sucesso", "bem-sucedido", "tendo sucesso"], answer: "sucesso" },
        { question: "Qual é a colocação correta?", options: ["tomar uma decisão", "fazer uma decisão", "levar uma decisão"], answer: "tomar uma decisão" },
        { question: "Qual é a colocação correta?", options: ["fazer a lição de casa", "tomar a lição de casa", "levar a lição de casa"], answer: "fazer a lição de casa" },
        { question: "Por que você deve aprender palavras em grupos?", options: ["Uma palavra nova te ensina três ou quatro", "É mais rápido esquecê-las", "É obrigatório por lei"], answer: "Uma palavra nova te ensina três ou quatro" },
        { question: "O que é um exemplo de família de palavras do texto?", options: ["decidir, decisão, decisivo", "vermelho, azul, verde", "um, dois, três"], answer: "decidir, decisão, decisivo" },
        { question: "Qual é a forma mais rápida de melhorar o vocabulário segundo o texto?", options: ["Aprender palavras novas todos os dias", "Nunca revisar palavras antigas", "Evitar palavras novas"], answer: "Aprender palavras novas todos os dias" },
        { question: "Qual palavra é sinônimo de 'grande'?", options: ["enorme", "pequeno", "tarde"], answer: "enorme" },
        { question: "Qual palavra é antônimo de 'começar'?", options: ["terminar", "iniciar", "abrir"], answer: "terminar" },
      ],
    },
    {
      lessonId: 8,
      title: "Teste 8",
      subtitle: "Dominância da Pronúncia",
      passingScore: 7,
      questions: [
        { question: "O que é a tônica de uma palavra?", options: ["A sílaba dita mais forte", "Um tipo de pontuação", "Uma regra de gramática"], answer: "A sílaba dita mais forte" },
        { question: "O que geralmente acontece com a entonação em uma pergunta de Sim/Não?", options: ["Sobe no final", "Sempre desce", "Fica plana"], answer: "Sobe no final" },
        { question: "O que geralmente acontece com a entonação em uma pergunta com O quê/Onde?", options: ["Desce no final", "Sobe muito", "Desaparece"], answer: "Desce no final" },
        { question: "Qual par mostra sons que se confundem com frequência?", options: ["caro / carro", "vermelho / azul", "feliz / triste"], answer: "caro / carro" },
        { question: "O que pode acontecer se você colocar a tônica na sílaba errada?", options: ["Pode confundir quem escuta", "Nada muda", "A palavra fica mais curta"], answer: "Pode confundir quem escuta" },
        { question: "Segundo o texto, o que mais é muito importante além da gramática?", options: ["Uma pronúncia clara", "Apenas a ortografia", "Apenas a quantidade de palavras"], answer: "Uma pronúncia clara" },
        { question: "O que muitos estudantes esquecem?", options: ["A tônica das palavras", "Os tempos verbais", "A pontuação"], answer: "A tônica das palavras" },
        { question: "Como pode soar uma palavra com a tônica errada?", options: ["Como uma palavra completamente diferente", "Como uma palavra mais longa", "Sem nenhuma diferença"], answer: "Como uma palavra completamente diferente" },
        { question: "Quantos minutos de prática diária o texto sugere que podem ajudar?", options: ["Até cinco minutos", "Cinco horas", "Nenhuma prática"], answer: "Até cinco minutos" },
        { question: "Qual par mostra uma diferença de som?", options: ["caro / carro", "vermelho / azul", "um / dois"], answer: "caro / carro" },
      ],
    },
    {
      lessonId: 9,
      title: "Teste 9",
      subtitle: "Português para Situações Reais",
      passingScore: 7,
      questions: [
        { question: "Qual frase é usada em um restaurante?", options: ["Posso ver o cardápio, por favor?", "Onde fica o balcão de check-in?", "Fale sobre você"], answer: "Posso ver o cardápio, por favor?" },
        { question: "Qual frase é usada em um aeroporto?", options: ["Eu gostaria de um assento na janela, por favor", "Podemos pegar a conta, por favor?", "Quais são seus pontos fortes?"], answer: "Eu gostaria de um assento na janela, por favor" },
        { question: "Qual frase é comum em uma entrevista de emprego?", options: ["Fale sobre você", "O serviço está incluído?", "Onde fica a esteira de bagagem?"], answer: "Fale sobre você" },
        { question: "O que Ana faz no início da entrevista dela?", options: ["Cumprimenta o gerente educadamente", "Chega atrasada", "Recusa-se a responder perguntas"], answer: "Cumprimenta o gerente educadamente" },
        { question: "O que Ana diz que é seu principal ponto forte?", options: ["Ser trabalhadora e confiável", "Ser a datilógrafa mais rápida", "Ser muito quieta"], answer: "Ser trabalhadora e confiável" },
        { question: "Qual pergunta Ana faz ao gerente?", options: ["Como é um dia típico nessa função?", "Quanto é o salário?", "Posso sair mais cedo?"], answer: "Como é um dia típico nessa função?" },
        { question: "Como o gerente se sentiu sobre Ana?", options: ["Impressionado com a preparação dela", "Irritado", "Confuso"], answer: "Impressionado com a preparação dela" },
        { question: "Qual frase você usaria para pedir comida?", options: ["Eu gostaria do frango, por favor", "Onde fica a esteira de bagagem?", "Quais são seus pontos fortes?"], answer: "Eu gostaria do frango, por favor" },
        { question: "Qual frase pergunta sobre um voo?", options: ["A que horas embarca o voo?", "Podemos pegar a conta?", "Fale sobre você"], answer: "A que horas embarca o voo?" },
        { question: "Qual frase descreve uma qualidade positiva para uma entrevista?", options: ["Eu sou uma pessoa trabalhadora e confiável", "Eu sempre chego atrasado", "Não gosto de trabalhar"], answer: "Eu sou uma pessoa trabalhadora e confiável" },
      ],
    },
    {
      lessonId: 10,
      title: "Teste 10",
      subtitle: "Português Empresarial Básico",
      passingScore: 7,
      questions: [
        { question: "Qual frase é uma saudação de e-mail profissional?", options: ["Prezado Sr. Kasongo,", "E aí!", "Opa!"], answer: "Prezado Sr. Kasongo," },
        { question: "Qual frase é uma despedida de e-mail profissional?", options: ["Atenciosamente,", "Tchau tchau,", "Até mais,"], answer: "Atenciosamente," },
        { question: "Qual frase inicia uma reunião?", options: ["Vamos começar", "Vamos parar para sempre", "Estou saindo agora"], answer: "Vamos começar" },
        { question: "Qual frase pede esclarecimento em uma reunião?", options: ["Você poderia esclarecer esse ponto?", "Não me importo", "Isso está errado"], answer: "Você poderia esclarecer esse ponto?" },
        { question: "O que significa 'prazo'?", options: ["A data em que algo deve ser concluído", "Um tipo de e-mail", "Uma sala de reuniões"], answer: "A data em que algo deve ser concluído" },
        { question: "O que David ouviu sua gerente dizer para iniciar a reunião?", options: ["Vamos começar", "Adeus a todos", "Não há reunião hoje"], answer: "Vamos começar" },
        { question: "O que David disse quando não entendeu um ponto?", options: ["Você poderia esclarecer isso, por favor?", "Não entendo nada, nunca", "Ele não disse nada"], answer: "Você poderia esclarecer isso, por favor?" },
        { question: "Para quem David escreveu seu primeiro e-mail profissional?", options: ["Um cliente", "A mãe dele", "Um estranho"], answer: "Um cliente" },
        { question: "Como David terminou o e-mail dele?", options: ["Atenciosamente", "Tchau", "Até mais"], answer: "Atenciosamente" },
        { question: "O que a colega dele achou do e-mail?", options: ["Que estava claro e bem escrito", "Que estava confuso", "Que era curto demais"], answer: "Que estava claro e bem escrito" },
      ],
    },
    {
      lessonId: 11,
      title: "Teste 11",
      subtitle: "Debates e Argumentos",
      passingScore: 7,
      questions: [
        { question: "Qual frase dá uma opinião?", options: ["Na minha opinião,...", "Vamos começar", "Onde fica o banco?"], answer: "Na minha opinião,..." },
        { question: "Qual frase discorda educadamente?", options: ["Receio que tenha que discordar", "Você está totalmente errado", "Não me importo com o que você pensa"], answer: "Receio que tenha que discordar" },
        { question: "Qual frase apoia um argumento com um exemplo?", options: ["Por exemplo,...", "Adeus,...", "Talvez,..."], answer: "Por exemplo,..." },
        { question: "Qual frase é usada para concluir um argumento?", options: ["Em conclusão, acredito que...", "Vamos começar", "Você pode repetir isso?"], answer: "Em conclusão, acredito que..." },
        { question: "O que os estudantes debatiam?", options: ["Se os celulares deveriam ser permitidos na escola", "O que comer no almoço", "Qual esporte é melhor"], answer: "Se os celulares deveriam ser permitidos na escola" },
        { question: "Qual foi a opinião de José?", options: ["Os celulares ajudam os estudantes a aprender", "Os celulares devem ser proibidos para sempre", "Os celulares são muito caros"], answer: "Os celulares ajudam os estudantes a aprender" },
        { question: "Qual foi a opinião de Grace?", options: ["Os celulares podem ser muito distrativos", "Os celulares sempre ajudam", "Ela não tinha opinião"], answer: "Os celulares podem ser muito distrativos" },
        { question: "Como Grace discordou de José?", options: ["Educadamente, dizendo 'Entendo seu ponto, mas...'", "Gritando", "Saindo da sala"], answer: "Educadamente, dizendo 'Entendo seu ponto, mas...'" },
        { question: "O que o professor achou do debate?", options: ["Ambos os argumentos eram bem fundamentados", "Ambos os estudantes estavam errados", "O debate não fazia sentido"], answer: "Ambos os argumentos eram bem fundamentados" },
        { question: "O que o professor incentivou a turma a fazer?", options: ["Continuar discutindo com respeito", "Parar de falar completamente", "Concordar imediatamente"], answer: "Continuar discutindo com respeito" },
      ],
    },
    {
      lessonId: 12,
      title: "Teste 12",
      subtitle: "Revisão Final e Conversa da Vida Real",
      passingScore: 7,
      questions: [
        { question: "Qual tema de gramática foi revisado na Lição 1?", options: ["Estrutura da frase e concordância verbal", "Cores", "Números"], answer: "Estrutura da frase e concordância verbal" },
        { question: "Quais tempos foram ensinados na Lição 2?", options: ["Passado e futuro", "Apenas o presente", "Nenhum tempo"], answer: "Passado e futuro" },
        { question: "Qual habilidade ajuda a fazer perguntas de acompanhamento?", options: ["Manter uma conversa", "Terminar conversas rapidamente", "Evitar pessoas"], answer: "Manter uma conversa" },
        { question: "O que Patrick mal conseguia fazer há um ano?", options: ["Se apresentar", "Dar discursos avançados", "Ensinar português"], answer: "Se apresentar" },
        { question: "O que Patrick pode fazer agora?", options: ["Manter uma conversa completa sobre trabalho e opiniões", "Ainda nada", "Apenas dirigir"], answer: "Manter uma conversa completa sobre trabalho e opiniões" },
        { question: "O que Patrick diz que foi a chave para seu progresso?", options: ["Praticar um pouco todos os dias", "Estudar uma vez por ano", "Parar de estudar"], answer: "Praticar um pouco todos os dias" },
        { question: "Na conversa de exemplo, o que a pessoa B faz no trabalho?", options: ["Escreve relatórios e responde e-mails de clientes", "Canta", "Nada"], answer: "Escreve relatórios e responde e-mails de clientes" },
        { question: "Como a pessoa B se sentiu no início do novo emprego?", options: ["Nervosa", "Cansada", "Brava"], answer: "Nervosa" },
        { question: "O que a pessoa B vai fazer mais?", options: ["Melhorar o português dela para o trabalho", "Deixar o emprego", "Evitar o português"], answer: "Melhorar o português dela para o trabalho" },
        { question: "O que Patrick está animado para começar?", options: ["O Nível 3", "O Nível 1 de novo", "Outra matéria diferente"], answer: "O Nível 3" },
      ],
    },
  ],

  finalQuiz: {
    title: "Teste Final - Nível 2",
    subtitle: "Este teste cobre todas as lições do Nível 2.",
    passingScore: 15,
    questions: [
      { question: "Escolha a frase correta.", options: ["Ela trabalha todos os dias", "Ela trabalham todos os dias", "Ela trabalhando todos os dias"], answer: "Ela trabalha todos os dias" },
      { question: "Qual tempo verbal mostra o passado?", options: ["O pretérito perfeito", "O futuro simples", "O presente"], answer: "O pretérito perfeito" },
      { question: "Qual forma mostra um plano decidido?", options: ["ir + infinitivo", "fui", "estava"], answer: "ir + infinitivo" },
      { question: "Qual pergunta de acompanhamento é boa depois de 'Fui ao mercado'?", options: ["O que você comprou?", "Tchau", "Não me importo"], answer: "O que você comprou?" },
      { question: "Qual palavra mostra contraste na escrita?", options: ["porém", "e", "depois"], answer: "porém" },
      { question: "O que você deveria fazer se não entender alguém falando?", options: ["Pedir para repetir ou falar mais devagar", "Fingir que entendeu", "Ir embora em silêncio"], answer: "Pedir para repetir ou falar mais devagar" },
      { question: "Para que serve a busca de informações?", options: ["Para encontrar informações específicas rapidamente", "Para memorizar cada palavra", "Para escrever e-mails"], answer: "Para encontrar informações específicas rapidamente" },
      { question: "Qual palavra é sinônimo de 'feliz'?", options: ["contente", "frio", "tarde"], answer: "contente" },
      { question: "Qual par mostra sons que se confundem com frequência?", options: ["caro / carro", "vermelho / azul", "um / dois"], answer: "caro / carro" },
      { question: "Qual frase é usada para pedir comida em um restaurante?", options: ["Eu gostaria do frango, por favor", "Onde fica o banco?", "Vamos começar"], answer: "Eu gostaria do frango, por favor" },
      { question: "Qual frase é uma despedida de e-mail profissional?", options: ["Atenciosamente,", "Tchau tchau,", "Até mais,"], answer: "Atenciosamente," },
      { question: "Qual frase discorda educadamente em um debate?", options: ["Receio que tenha que discordar", "Você está errado", "Não me importo"], answer: "Receio que tenha que discordar" },
      { question: "Qual palavra completa corretamente: 'Eu pratico todos os dias, ___ estou melhorando.'", options: ["portanto", "mas", "ou"], answer: "portanto" },
      { question: "Qual é a colocação correta?", options: ["tomar uma decisão", "fazer uma decisão", "levar uma decisão"], answer: "tomar uma decisão" },
      { question: "O que geralmente acontece com a entonação em uma pergunta com O quê/Onde?", options: ["Desce no final", "Sobe muito", "Desaparece"], answer: "Desce no final" },
      { question: "O que Tomás planejava fazer no próximo verão?", options: ["Visitar Lubumbashi novamente", "Mudar de país", "Parar de viajar"], answer: "Visitar Lubumbashi novamente" },
      { question: "O que Ana disse que era seu principal ponto forte na entrevista?", options: ["Ser trabalhadora e confiável", "Ser a jogadora de futebol mais rápida", "Ter muitos carros"], answer: "Ser trabalhadora e confiável" },
      { question: "O que a colega de David achou do e-mail dele?", options: ["Que estava claro e bem escrito", "Que estava ruim", "Que estava longo demais"], answer: "Que estava claro e bem escrito" },
      { question: "O que o professor achou do debate da turma?", options: ["Ambos os argumentos eram bem fundamentados", "Não fazia sentido", "Apenas um estudante estava certo"], answer: "Ambos os argumentos eram bem fundamentados" },
      { question: "O que ajudou Patrick a progredir mais?", options: ["Praticar um pouco todos os dias", "Estudar uma vez por ano", "Evitar falar português"], answer: "Praticar um pouco todos os dias" },
    ],
  },
};
