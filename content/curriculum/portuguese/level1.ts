import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan,
// written entirely in Portuguese (immersive method, matching the pattern
// already used for the English, French, Swahili, and Spanish courses).
export const portugueseLevel1: LevelCurriculum = {
  langCode: "PT",
  langLabel: "Portugais",
  langSlug: "portuguese",
  level: 1,
  levelTitle: "Nível 1 - Português Iniciante",
  levelSubtitle: "Construa uma base sólida para compreender e falar português do dia a dia.",

  lessons: [
    {
      id: 1,
      title: "Cumprimentos e Apresentações",
      subtitle: "Aprenda a cumprimentar e se apresentar em português.",
      sections: [
        { heading: "Cumprimentos Comuns", body: ["Olá / Oi", "Bom dia", "Boa tarde", "Boa noite", "Como vai?", "Bem, obrigado."] },
        { heading: "Apresentar-se", body: ["Meu nome é...", "Tenho... anos", "Moro em...", "Sou estudante", "Muito prazer"] },
      ],
      speakText: `Cumprimentar é importante quando conhecemos alguém.

Cumprimentos comuns: Olá. Oi. Bom dia. Boa tarde. Boa noite. Como vai? Bem, obrigado.

Apresentar-se: Meu nome é... Tenho... anos. Moro em... Sou estudante. Muito prazer.`,
      videoTopic: "Como se apresentar em português.",
      videoUrl: "https://www.youtube.com/watch?v=6naONfjkOCg",
      readingTitle: "Olá!",
      reading: [
        "Meu nome é Sofia. Tenho 12 anos. Moro em Kolwezi. Sou estudante.",
        "Todas as manhãs, digo “Bom dia” aos meus professores e amigos.",
        "Gosto de conhecer pessoas novas. Quando conheço alguém pela primeira vez, digo: “Olá, meu nome é Sofia. Muito prazer.”",
      ],
      readingSpeakText: `Olá! Meu nome é Sofia. Tenho doze anos. Moro em Kolwezi. Sou estudante.

Todas as manhãs, digo bom dia aos meus professores e amigos.`,
      exercises: ["Olá, meu nome é ...", "Tenho ... anos", "Moro em ...", "Sou ..."],
      speakingTopic: "Apresente-se à turma em três frases.",
    },
    {
      id: 2,
      title: "O Alfabeto e a Pronúncia",
      subtitle: "Aprenda o alfabeto português e pratique a pronúncia.",
      sections: [
        { heading: "O Alfabeto Português", body: ["O alfabeto português tem 23 letras tradicionalmente (ou 26 com K, W, Y).", "A B C D E F G H I J K L M", "N O P Q R S T U V W X Y Z"] },
        { heading: "As Vogais", body: ["A", "E", "I", "O", "U"] },
        { heading: "Exemplo", body: ["Usamos as letras para soletrar nomes e palavras.", "Meu nome é David.", "D - A - V - I - D"] },
      ],
      speakText: `O alfabeto português tem vinte e três letras tradicionalmente.

A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.

As vogais são: A, E, I, O, U.

Exemplo: meu nome é David. D, A, V, I, D.`,
      videoTopic: "Recitar o alfabeto português de A a Z.",
      videoUrl: "https://www.youtube.com/watch?v=jv1sguzvzj4",
      readingTitle: "Olá, meu nome é Ana.",
      reading: ["Estou aprendendo português na escola.", "Hoje estou aprendendo o alfabeto.", "Pratico todos os dias e gosto de aprender palavras novas.", "Sei soletrar meu nome: A - N - A."],
      readingSpeakText: `Olá, meu nome é Ana. Estou aprendendo português na escola. Hoje estou aprendendo o alfabeto.`,
      exercises: ["Recite o alfabeto de A a Z.", "Soletre seu nome em português.", "Soletre seu e-mail.", "Pratique a pronúncia das vogais."],
      speakingTopic: "Apresente-se e soletre seu nome completo.",
    },
    {
      id: 3,
      title: "Números e Informações Pessoais",
      subtitle: "Aprenda os números e como compartilhar suas informações pessoais.",
      sections: [
        { heading: "Números de 1 a 10", body: ["1 - Um", "2 - Dois", "3 - Três", "4 - Quatro", "5 - Cinco", "6 - Seis", "7 - Sete", "8 - Oito", "9 - Nove", "10 - Dez"] },
        { heading: "Informações Pessoais", body: ["Perguntas importantes:", "Qual é o seu nome?", "Quantos anos você tem?", "Onde você mora?", "Qual é o seu número de telefone?"] },
        { heading: "Exemplo de Respostas", body: ["Meu nome é David.", "Tenho 15 anos.", "Moro em Kinshasa.", "Meu número de telefone é 123456789."] },
      ],
      speakText: `Números de um a dez: um, dois, três, quatro, cinco, seis, sete, oito, nove, dez.

Informações pessoais: Qual é o seu nome? Quantos anos você tem? Onde você mora?

Exemplo de respostas: meu nome é David. Tenho quinze anos. Moro em Kinshasa.`,
      videoTopic: "Aprender os números e se apresentar.",
      videoUrl: "https://www.youtube.com/watch?v=Lq5FJG8e2fU",
      readingTitle: "Olá, meu nome é Sara.",
      reading: ["Tenho 14 anos.", "Moro em Kinshasa.", "Meu número de telefone é 987654321."],
      readingSpeakText: `Olá, meu nome é Sara. Tenho catorze anos. Moro em Kinshasa. Meu número de telefone é nove oito sete seis cinco quatro três dois um.`,
      exercises: ["Conte de 1 a 10 em português.", "Escreva seu nome em português.", "Diga sua idade em português.", "Escreva seu número de telefone em português."],
      speakingTopic: "Apresente-se com suas informações pessoais.",
    },
    {
      id: 4,
      title: "A Família",
      subtitle: "Aprenda os membros da família e como falar sobre ela.",
      sections: [
        { heading: "Membros da Família", body: ["Pai", "Mãe", "Irmão", "Irmã", "Tio", "Tia", "Avô", "Avó", "Primo", "Pais"] },
        { heading: "Frases Úteis", body: ["Este é o meu pai.", "Minha mãe é muito gentil.", "Tenho um irmão e duas irmãs.", "Eu amo minha família."] },
        { heading: "Exemplo", body: ["Moro com minha família.", "Meu pai trabalha em um escritório.", "Minha mãe é professora.", "Nós somos felizes juntos."] },
      ],
      speakText: `Membros da família: pai, mãe, irmão, irmã, tio, tia, avô, avó, primo, pais.

Frases úteis: este é o meu pai. Minha mãe é muito gentil. Tenho um irmão e duas irmãs.`,
      videoTopic: "Aprender o vocabulário da família.",
      videoUrl: "https://www.youtube.com/watch?v=2I9PMKHPtbk",
      readingTitle: "Meu nome é João.",
      reading: ["Moro com meus pais e minha irmã.", "Meu pai é médico.", "Minha mãe é muito carinhosa.", "Eu adoro passar tempo com minha família."],
      readingSpeakText: `Meu nome é João. Moro com meus pais e minha irmã. Meu pai é médico. Minha mãe é muito carinhosa.`,
      exercises: ["Nomeie cinco membros da família em português.", "Descreva sua família em frases simples.", "Diga quem mora na sua casa.", "Pratique dizer as relações familiares em voz alta."],
      speakingTopic: "Fale sobre sua família e as pessoas próximas a você.",
    },
    {
      id: 5,
      title: "Objetos do Dia a Dia",
      subtitle: "Aprenda os objetos que usamos todos os dias.",
      sections: [
        { heading: "Objetos Comuns", body: ["Livro", "Caneta", "Cadeira", "Mesa", "Telefone", "Mochila", "Computador", "Garrafa", "Caderno", "Chave"] },
        { heading: "Frases Úteis", body: ["Este é o meu livro.", "Eu escrevo com uma caneta.", "A cadeira é azul.", "Meu telefone está na mesa."] },
        { heading: "Descrever Objetos", body: ["Podemos descrever objetos pela cor, tamanho e uso.", "O livro é pequeno.", "O computador é novo.", "A mochila é pesada."] },
      ],
      speakText: `Objetos comuns: livro, caneta, cadeira, mesa, telefone, mochila, computador, garrafa, caderno, chave.

Frases úteis: este é o meu livro. Eu escrevo com uma caneta. A cadeira é azul.`,
      videoTopic: "Aprender objetos comuns e sua pronúncia.",
      videoUrl: "https://www.youtube.com/watch?v=2zo5rbQhGDg",
      readingTitle: "Meu nome é Pedro.",
      reading: ["Todos os dias vou à escola com minha mochila e meu caderno.", "Uso uma caneta para escrever no meu livro.", "Meu telefone está na minha mochila.", "Sento em uma cadeira e estudo toda manhã."],
      readingSpeakText: `Meu nome é Pedro. Todos os dias vou à escola com minha mochila e meu caderno.`,
      exercises: ["Nomeie cinco objetos ao seu redor.", "Descreva sua mochila escolar.", "Escreva três frases com nomes de objetos.", "Pratique a pronúncia."],
      speakingTopic: "Fale sobre os objetos que você usa todos os dias.",
    },
    {
      id: 6,
      title: "Cores e Descrições",
      subtitle: "Aprenda as cores e como descrever pessoas e objetos.",
      sections: [
        { heading: "Cores Comuns", body: ["Vermelho", "Azul", "Verde", "Amarelo", "Preto", "Branco", "Laranja", "Marrom", "Rosa", "Roxo"] },
        { heading: "Descrever Objetos", body: ["A mochila é vermelha.", "O telefone é preto.", "A cadeira é azul.", "O caderno é verde."] },
        { heading: "Descrever Pessoas", body: ["Ela é alta.", "Ele é baixo.", "Ela está feliz.", "Ele é forte.", "Ela é gentil."] },
      ],
      speakText: `Cores comuns: vermelho, azul, verde, amarelo, preto, branco, laranja, marrom, rosa, roxo.

Descrever objetos: a mochila é vermelha. O telefone é preto.

Descrever pessoas: ela é alta. Ele é baixo. Ela está feliz.`,
      videoTopic: "Aprender as cores e praticar descrições.",
      videoUrl: "https://www.youtube.com/watch?v=tkuNDi7fX0Q",
      readingTitle: "Meu nome é Lisa.",
      reading: ["Tenho uma mochila escolar azul.", "Meu caderno é verde e meu telefone é preto.", "Estou feliz e sou gentil.", "Meu irmão pequeno é baixo mas muito forte."],
      readingSpeakText: `Meu nome é Lisa. Tenho uma mochila escolar azul. Meu caderno é verde e meu telefone é preto.`,
      exercises: ["Nomeie cinco cores em português.", "Descreva o seu telefone.", "Descreva-se em duas frases.", "Use três adjetivos em frases."],
      speakingTopic: "Descreva-se e três objetos ao seu redor.",
    },
    {
      id: 7,
      title: "Dias, Meses e Datas",
      subtitle: "Aprenda a falar sobre dias, meses e datas importantes.",
      sections: [
        { heading: "Dias da Semana", body: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"] },
        { heading: "Meses do Ano", body: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] },
        { heading: "Frases Úteis", body: ["Hoje é segunda-feira.", "Meu aniversário é em julho.", "A escola começa em setembro.", "Vou à igreja aos domingos."] },
      ],
      speakText: `Dias da semana: segunda-feira, terça-feira, quarta-feira, quinta-feira, sexta-feira, sábado, domingo.

Meses do ano: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro.

Frases úteis: hoje é segunda-feira. Meu aniversário é em julho.`,
      videoTopic: "Aprender os dias, os meses e como dizer as datas.",
      videoUrl: "https://www.youtube.com/watch?v=_YVTxDkklGw",
      readingTitle: "Meu nome é Kevin.",
      reading: [
        "Hoje é sexta-feira, 12 de junho. Acordo cedo todas as manhãs.",
        "Vou à escola de segunda a sexta-feira e descanso aos sábados.",
        "Meu mês favorito é julho, porque é o mês do meu aniversário.",
        "Todos os domingos, vou à igreja com meus pais.",
      ],
      readingSpeakText: `Meu nome é Kevin. Hoje é sexta-feira, doze de junho. Acordo cedo todas as manhãs.`,
      exercises: ["Diga todos os dias da semana.", "Diga todos os meses do ano.", "Diga a data do seu aniversário.", "Diga que dia é hoje."],
      speakingTopic: "Fale sobre seu aniversário e suas atividades semanais.",
    },
    {
      id: 8,
      title: "Rotinas Diárias",
      subtitle: "Aprenda a falar sobre suas atividades e hábitos diários.",
      sections: [
        { heading: "Atividades Diárias Comuns", body: ["Acordar", "Escovar os dentes", "Tomar banho", "Tomar café da manhã", "Ir à escola", "Estudar", "Almoçar", "Brincar com amigos", "Fazer a lição de casa", "Dormir"] },
        { heading: "Frases Úteis", body: ["Acordo às 6 horas.", "Escovo os dentes toda manhã.", "Vou à escola às 7 horas.", "Faço a lição de casa à noite."] },
      ],
      speakText: `Atividades diárias: acordar, escovar os dentes, tomar banho, tomar café da manhã, ir à escola, estudar, almoçar, brincar com amigos, fazer a lição de casa, dormir.

Frases úteis: acordo às seis horas. Vou à escola às sete horas.`,
      videoTopic: "Aprender o vocabulário das rotinas diárias.",
      videoUrl: "https://www.youtube.com/watch?v=FMm7foSrFEM",
      readingTitle: "Meu nome é Daniel.",
      reading: [
        "Todos os dias acordo às 6 horas da manhã.",
        "Escovo os dentes e tomo banho antes do café da manhã.",
        "Às 7 horas, vou à escola e estudo com meus colegas.",
        "À tarde, jogo futebol com meus amigos.",
        "À noite, faço a lição de casa e durmo às 21 horas.",
      ],
      readingSpeakText: `Meu nome é Daniel. Todos os dias acordo às seis horas da manhã.`,
      exercises: ["Descreva sua rotina matinal.", "Diga a que horas você acorda.", "Escreva três frases sobre suas atividades diárias.", "Fale sobre o que você faz depois da escola."],
      speakingTopic: "Fale sobre sua rotina diária da manhã à noite.",
    },
    {
      id: 9,
      title: "Comida e Bebidas",
      subtitle: "Aprenda o vocabulário de comidas, bebidas e refeições.",
      sections: [
        { heading: "Alimentos Comuns", body: ["Arroz", "Pão", "Carne", "Peixe", "Ovos", "Frango", "Banana", "Maçã"] },
        { heading: "Bebidas Comuns", body: ["Água", "Leite", "Suco", "Chá", "Café"] },
        { heading: "Frases Úteis", body: ["Bebo água todos os dias.", "Minha comida favorita é o arroz.", "Como pão no café da manhã.", "Nós comemos frango no jantar."] },
      ],
      speakText: `Alimentos comuns: arroz, pão, carne, peixe, ovos, frango, banana, maçã.

Bebidas comuns: água, leite, suco, chá, café.

Frases úteis: bebo água todos os dias. Minha comida favorita é o arroz.`,
      videoTopic: "Aprender o vocabulário de comidas e bebidas.",
      videoUrl: "https://www.youtube.com/watch?v=keeZo5HfXwc",
      readingTitle: "Meu nome é Emma.",
      reading: ["Toda manhã como pão e ovos no café da manhã.", "Na escola, bebo água e às vezes suco de frutas.", "Minha comida favorita é arroz com frango.", "À noite, minha família come peixe e legumes juntos."],
      readingSpeakText: `Meu nome é Emma. Toda manhã como pão e ovos no café da manhã.`,
      exercises: ["Nomeie cinco alimentos em português.", "Nomeie três bebidas em português.", "Diga o que você come no café da manhã.", "Descreva sua refeição favorita."],
      speakingTopic: "Fale sobre sua comida favorita e o que você bebe todos os dias.",
    },
    {
      id: 10,
      title: "Lugares na Cidade",
      subtitle: "Aprenda o vocabulário dos lugares encontrados em uma cidade.",
      sections: [
        { heading: "Lugares Comuns na Cidade", body: ["Escola", "Hospital", "Mercado", "Banco", "Restaurante", "Igreja", "Delegacia", "Estação de ônibus", "Biblioteca", "Parque"] },
        { heading: "Frases Úteis", body: ["Vou à escola todas as manhãs.", "Minha mãe trabalha no hospital.", "Compramos comida no mercado.", "As crianças brincam no parque."] },
        { heading: "Perguntar o Caminho", body: ["Onde fica o hospital?", "Como eu chego ao banco?", "O mercado fica perto da igreja.", "A biblioteca fica ao lado da escola."] },
      ],
      speakText: `Lugares comuns na cidade: escola, hospital, mercado, banco, restaurante, igreja, delegacia, estação de ônibus, biblioteca, parque.

Perguntar o caminho: onde fica o hospital? Como eu chego ao banco?`,
      videoTopic: "Aprender o vocabulário de lugares e direções.",
      videoUrl: "https://www.youtube.com/watch?v=pnKi8yITHM8",
      readingTitle: "Na quarta-feira passada, Michael foi ao centro com o pai dele.",
      reading: [
        "Primeiro, pararam no banco porque o pai dele precisava sacar dinheiro.",
        "Depois do banco, caminharam até o mercado para comprar frutas e legumes frescos.",
        "Enquanto caminhavam, Michael viu um grande hospital perto da delegacia.",
        "Antes de voltar para casa, sentaram-se em um pequeno restaurante e almoçaram juntos.",
      ],
      readingSpeakText: `Na quarta-feira passada, Michael foi ao centro com o pai dele. Primeiro, pararam no banco.`,
      exercises: ["Nomeie cinco lugares da sua cidade.", "Diga onde as pessoas compram comida.", "Descreva lugares perto da sua casa.", "Faça frases com o vocabulário da cidade."],
      speakingTopic: "Descreva os lugares que você visita frequentemente na cidade.",
    },
    {
      id: 11,
      title: "Lazer e Interesses",
      subtitle: "Aprenda a falar sobre seus passatempos e tempo livre.",
      sections: [
        { heading: "Passatempos Comuns", body: ["Ler livros", "Jogar futebol", "Ouvir música", "Assistir filmes", "Desenhar", "Dançar", "Cantar", "Cozinhar", "Nadar", "Jogar videogame"] },
        { heading: "Frases Úteis", body: ["Meu passatempo favorito é ler.", "Eu gosto de jogar futebol.", "Ela gosta de ouvir música.", "Assistimos filmes nos fins de semana."] },
        { heading: "Falar sobre Interesses", body: ["O que você gosta de fazer?", "Eu gosto de passar tempo com meus amigos.", "Meu passatempo me ajuda a relaxar."] },
      ],
      speakText: `Passatempos comuns: ler livros, jogar futebol, ouvir música, assistir filmes, desenhar, dançar, cantar, cozinhar, nadar, jogar videogame.

Frases úteis: meu passatempo favorito é ler. Eu gosto de jogar futebol.`,
      videoTopic: "Aprender o vocabulário de lazer e tempo livre.",
      videoUrl: "https://www.youtube.com/watch?v=rZlSS6GhAKo",
      readingTitle: "No sábado à tarde, Tiago visitou seu primo Daniel.",
      reading: [
        "Quando chegou, Daniel estava sentado lá fora lendo um livro sobre animais.",
        "Depois de ler, os dois meninos decidiram jogar futebol no parque do bairro.",
        "Mais tarde, voltaram para casa para ouvir música enquanto a irmã de Daniel desenhava na sala.",
        "Tiago disse que tinha gostado do dia porque fazer atividades divertidas o deixava feliz.",
      ],
      readingSpeakText: `No sábado à tarde, Tiago visitou seu primo Daniel. Quando chegou, Daniel estava sentado lá fora lendo um livro.`,
      exercises: ["Nomeie três passatempos que você gosta.", "Fale sobre o que você faz no seu tempo livre.", "Faça frases com o vocabulário de lazer.", "Descreva sua atividade favorita de fim de semana."],
      speakingTopic: "Fale sobre seu passatempo favorito e explique por que você gosta dele.",
    },
    {
      id: 12,
      title: "Revisão Final e Conversa Real",
      subtitle: "Revise tudo o que aprendeu e pratique uma conversa real em português.",
      sections: [
        {
          heading: "O que Aprendemos",
          body: [
            "Cumprimentar educadamente",
            "Apresentar-se",
            "Falar sobre idade e informações pessoais",
            "Falar sobre membros da família",
            "Nomear objetos do dia a dia",
            "Usar cores e descrições",
            "Falar sobre datas e meses",
            "Descrever rotinas diárias",
            "Falar sobre comida e bebidas",
            "Descrever lugares na cidade",
            "Falar sobre lazer e interesses",
          ],
        },
        {
          heading: "Exemplo de Conversa Real",
          body: [
            "A: Olá! Meu nome é David. Qual é o seu nome?",
            "B: Oi David, meu nome é Sara. Muito prazer.",
            "A: Muito prazer também. Quantos anos você tem?",
            "B: Tenho 15 anos. Moro perto do mercado da cidade.",
            "A: Legal. O que você gosta de fazer no seu tempo livre?",
            "B: Gosto de ler livros e ouvir música.",
            "A: Qual é a sua comida favorita?",
            "B: Eu adoro arroz com frango.",
          ],
        },
      ],
      speakText: `As coisas importantes que aprendemos: cumprimentar educadamente, apresentar-se, falar sobre idade, falar sobre a família, nomear objetos do dia a dia, usar cores, falar sobre datas, descrever rotinas, falar sobre comida, descrever lugares na cidade, e falar sobre lazer.

Exemplo de conversa real.

Olá, meu nome é David. Qual é o seu nome?
Oi David, meu nome é Sara. Muito prazer.`,
      videoTopic: "Revisar a conversa básica e o vocabulário do Nível 1.",
      videoUrl: "https://www.youtube.com/watch?v=JoaGC5BIh9s",
      readingTitle: "No domingo passado, Kevin viajou com a família para visitar o tio na cidade.",
      reading: [
        "Antes de sair, comeu pão e bebeu chá no café da manhã.",
        "Ao chegar, Kevin cumprimentou todos educadamente e se apresentou a alguns visitantes que nunca tinha conhecido.",
        "Mais tarde, foi ao mercado com o primo e ajudou a comprar legumes, peixe e arroz para o almoço.",
        "No final do dia, Kevin disse que tinha gostado de passar tempo em família e fazer atividades que amava.",
      ],
      readingSpeakText: `No domingo passado, Kevin viajou com a família para visitar o tio na cidade. Antes de sair, comeu pão e bebeu chá no café da manhã.`,
      exercises: ["Apresente-se em português.", "Fale sobre sua família.", "Descreva sua comida favorita.", "Descreva sua rotina diária.", "Fale sobre seus passatempos."],
      speakingTopic: "Apresente-se e descreva um dia normal da sua vida.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Teste 1",
      subtitle: "Cumprimentos e Apresentações",
      passingScore: 7,
      questions: [
        { question: "Como você cumprimenta alguém?", options: ["Olá", "Cadeira", "Água"], answer: "Olá" },
        { question: "Como você se apresenta?", options: ["Meu nome é João", "Boa noite", "Banco"], answer: "Meu nome é João" },
        { question: "Qual é o nome da menina no texto?", options: ["João", "Sofia", "Ana"], answer: "Sofia" },
        { question: "Quantos anos Sofia tem?", options: ["20 anos", "13 anos", "12 anos"], answer: "12 anos" },
        { question: "Onde Sofia mora?", options: ["Kolwezi", "Kinshasa", "Paris"], answer: "Kolwezi" },
        { question: "Escolha uma apresentação:", options: ["Meu nome é Sofia", "A escola é grande", "Cadeira azul"], answer: "Meu nome é Sofia" },
        { question: "O que Sofia diz de manhã?", options: ["Tchau", "Bom dia", "Olá"], answer: "Bom dia" },
        { question: "Escolha uma palavra de cumprimento:", options: ["Olá", "Frango", "Segunda-feira"], answer: "Olá" },
        { question: "O que ela diz quando conhece alguém novo?", options: ["Muito prazer", "Olá, meu nome é Sofia, muito prazer", "Olá, bem-vindo"], answer: "Olá, meu nome é Sofia, muito prazer" },
        { question: "O que dizemos para nos apresentar?", options: ["Meu nome é...", "Vire à esquerda", "Eu como arroz"], answer: "Meu nome é..." },
      ],
    },
    {
      lessonId: 2,
      title: "Teste 2",
      subtitle: "O Alfabeto e a Pronúncia",
      passingScore: 7,
      questions: [
        { question: "Quantas letras tem o alfabeto português tradicionalmente?", options: ["23", "26", "30"], answer: "23" },
        { question: "Qual destas é uma vogal?", options: ["B", "E", "T"], answer: "E" },
        { question: "Como se soletra o nome David?", options: ["D-A-V-I-D", "D-A-B-I-D", "D-E-V-I-D"], answer: "D-A-V-I-D" },
        { question: "Para que usamos as letras?", options: ["Para soletrar nomes e palavras", "Para cozinhar", "Para jogar futebol"], answer: "Para soletrar nomes e palavras" },
        { question: "Qual é o nome da menina no texto?", options: ["Sara", "Ana", "Emma"], answer: "Ana" },
        { question: "O que Ana está aprendendo hoje?", options: ["O alfabeto", "Os números", "As cores"], answer: "O alfabeto" },
        { question: "Onde Ana aprende português?", options: ["Em casa", "Na escola", "No mercado"], answer: "Na escola" },
        { question: "Como Ana soletra o nome dela?", options: ["A-N-A", "A-N-N-A", "A-N-E"], answer: "A-N-A" },
        { question: "O que Ana gosta de fazer?", options: ["Aprender palavras novas", "Dormir", "Assistir televisão"], answer: "Aprender palavras novas" },
        { question: "Quantas vogais existem em português?", options: ["5", "10", "20"], answer: "5" },
      ],
    },
    {
      lessonId: 3,
      title: "Teste 3",
      subtitle: "Números e Informações Pessoais",
      passingScore: 7,
      questions: [
        { question: "Como se diz o número 5 em português?", options: ["Sete", "Cinco", "Quatro"], answer: "Cinco" },
        { question: "Como se diz o número 8 em português?", options: ["Três", "Dez", "Oito"], answer: "Oito" },
        { question: "Qual pergunta pede a idade?", options: ["Qual é o seu nome?", "Quantos anos você tem?", "Onde está o livro?"], answer: "Quantos anos você tem?" },
        { question: "Qual frase está correta?", options: ["David meu é nome", "Meu nome é David", "É David eu"], answer: "Meu nome é David" },
        { question: "Qual é o nome da menina no texto?", options: ["Maria", "Sara", "Ana"], answer: "Sara" },
        { question: "Quantos anos Sara tem?", options: ["18 anos", "14 anos", "10 anos"], answer: "14 anos" },
        { question: "Onde Sara mora?", options: ["Londres", "Paris", "Kinshasa"], answer: "Kinshasa" },
        { question: "Qual é o número de telefone de Sara?", options: ["123456789", "987654321", "555666777"], answer: "987654321" },
        { question: "Qual informação é uma informação pessoal?", options: ["Cadeira azul", "Futebol", "Número de telefone"], answer: "Número de telefone" },
        { question: "Como se conta de 1 a 3 em português?", options: ["Um, dois, três", "Um, três, dois", "Dois, um, três"], answer: "Um, dois, três" },
      ],
    },
    {
      lessonId: 4,
      title: "Teste 4",
      subtitle: "A Família",
      passingScore: 7,
      questions: [
        { question: "Qual palavra significa pai homem?", options: ["Irmão", "Pai", "Tio"], answer: "Pai" },
        { question: "Quem é seu pai mulher?", options: ["Mãe", "Irmã", "Prima"], answer: "Mãe" },
        { question: "Qual frase está correta?", options: ["Minha mãe é gentil", "Gentil minha mãe é", "É mãe minha gentil"], answer: "Minha mãe é gentil" },
        { question: "Quem são seus pais?", options: ["Pai e Mãe", "Professor e Médico", "Irmão e Amigo"], answer: "Pai e Mãe" },
        { question: "Qual palavra significa o irmão do seu pai?", options: ["Primo", "Tio", "Avó"], answer: "Tio" },
        { question: "Qual é o nome do menino no texto?", options: ["David", "João", "Marco"], answer: "João" },
        { question: "Com quem João mora?", options: ["Com os amigos", "Com os pais e a irmã", "Com o professor"], answer: "Com os pais e a irmã" },
        { question: "Qual é a profissão do pai de João?", options: ["Médico", "Motorista", "Agricultor"], answer: "Médico" },
        { question: "Como a mãe de João é descrita?", options: ["Severa", "Muito carinhosa", "Brava"], answer: "Muito carinhosa" },
        { question: "O que João gosta de fazer?", options: ["Jogar futebol sozinho", "Passar tempo com a família", "Assistir televisão o dia todo"], answer: "Passar tempo com a família" },
      ],
    },
    {
      lessonId: 5,
      title: "Teste 5",
      subtitle: "Objetos do Dia a Dia",
      passingScore: 7,
      questions: [
        { question: "Qual objeto usamos para escrever?", options: ["Garrafa", "Caneta", "Cadeira"], answer: "Caneta" },
        { question: "Qual objeto podemos usar para ligar para alguém?", options: ["Telefone", "Livro", "Mesa"], answer: "Telefone" },
        { question: "Onde os estudantes normalmente carregam livros?", options: ["Mochila", "Garrafa", "Chave"], answer: "Mochila" },
        { question: "Qual frase está correta?", options: ["Este é o meu livro", "Livro este meu é", "É este livro meu"], answer: "Este é o meu livro" },
        { question: "O que pode ser pesado?", options: ["A mochila", "Um sorriso", "O ar"], answer: "A mochila" },
        { question: "Qual é o nome do menino no texto?", options: ["Pedro", "Daniel", "Tom"], answer: "Pedro" },
        { question: "Para onde Pedro vai todos os dias?", options: ["Escola", "Hospital", "Mercado"], answer: "Escola" },
        { question: "O que Pedro usa para escrever?", options: ["Caneta", "Garrafa", "Computador"], answer: "Caneta" },
        { question: "Onde está o telefone de Pedro?", options: ["Na mochila dele", "No telhado", "Debaixo da cadeira"], answer: "Na mochila dele" },
        { question: "Em que Pedro senta?", options: ["Cadeira", "Mesa", "Garrafa"], answer: "Cadeira" },
      ],
    },
    {
      lessonId: 6,
      title: "Teste 6",
      subtitle: "Cores e Descrições",
      passingScore: 7,
      questions: [
        { question: "Qual destas é uma cor?", options: ["Médico", "Azul", "Mesa"], answer: "Azul" },
        { question: "Qual frase está correta?", options: ["Mochila é a vermelha", "A mochila é vermelha", "Vermelha mochila a é"], answer: "A mochila é vermelha" },
        { question: "Qual adjetivo descreve tamanho?", options: ["Garrafa", "Grande", "Segunda-feira"], answer: "Grande" },
        { question: "Qual cor é frequentemente oposta ao preto?", options: ["Verde", "Branco", "Laranja"], answer: "Branco" },
        { question: "Qual adjetivo descreve uma pessoa?", options: ["Caderno", "Janela", "Gentil"], answer: "Gentil" },
        { question: "Qual é o nome da menina no texto?", options: ["Sara", "Lisa", "Ana"], answer: "Lisa" },
        { question: "De que cor é a mochila escolar de Lisa?", options: ["Amarela", "Azul", "Preta"], answer: "Azul" },
        { question: "De que cor é o telefone de Lisa?", options: ["Vermelho", "Verde", "Preto"], answer: "Preto" },
        { question: "Como Lisa é descrita?", options: ["Triste e quieta", "Feliz e gentil", "Brava e cansada"], answer: "Feliz e gentil" },
        { question: "Como é o irmão pequeno de Lisa?", options: ["Calmo e triste", "Baixo e forte", "Alto e fraco"], answer: "Baixo e forte" },
      ],
    },
    {
      lessonId: 7,
      title: "Teste 7",
      subtitle: "Dias, Meses e Datas",
      passingScore: 7,
      questions: [
        { question: "Qual é um dia da semana?", options: ["Professor", "Terça-feira", "Garrafa"], answer: "Terça-feira" },
        { question: "Qual é um mês?", options: ["Sexta-feira", "Julho", "Janela"], answer: "Julho" },
        { question: "Quantos dias tem uma semana?", options: ["Dez", "Sete", "Cinco"], answer: "Sete" },
        { question: "Qual frase está correta?", options: ["Segunda-feira hoje é", "Hoje é segunda-feira", "É segunda-feira hoje"], answer: "Hoje é segunda-feira" },
        { question: "Qual pergunta é sobre aniversário?", options: ["Onde fica a sua mochila?", "Quando é o seu aniversário?", "De que cor é o seu telefone?"], answer: "Quando é o seu aniversário?" },
        { question: "Qual é o nome do menino no texto?", options: ["Kevin", "João", "Pedro"], answer: "Kevin" },
        { question: "Que dia é na história?", options: ["Domingo", "Sexta-feira", "Terça-feira"], answer: "Sexta-feira" },
        { question: "Qual é o mês favorito de Kevin?", options: ["Junho", "Julho", "Dezembro"], answer: "Julho" },
        { question: "Quando é o aniversário de Kevin?", options: ["25 de julho", "12 de junho", "10 de agosto"], answer: "25 de julho" },
        { question: "O que Kevin faz todos os domingos?", options: ["Fica em casa", "Vai à igreja", "Joga futebol"], answer: "Vai à igreja" },
      ],
    },
    {
      lessonId: 8,
      title: "Teste 8",
      subtitle: "Rotinas Diárias",
      passingScore: 7,
      questions: [
        { question: "O que as pessoas geralmente fazem primeiro pela manhã?", options: ["Acordar", "Dormir", "Jogar futebol"], answer: "Acordar" },
        { question: "Qual atividade acontece no banheiro?", options: ["Escovar os dentes", "Estudar matemática", "Assistir televisão"], answer: "Escovar os dentes" },
        { question: "Qual frase está correta?", options: ["Vou à escola", "Escola vou à", "Vamos escola à"], answer: "Vou à escola" },
        { question: "Quando os estudantes geralmente fazem a lição de casa?", options: ["À noite", "À meia-noite", "Antes do café da manhã"], answer: "À noite" },
        { question: "Qual é o nome do menino no texto?", options: ["Pedro", "Daniel", "Kevin"], answer: "Daniel" },
        { question: "A que horas Daniel acorda?", options: ["Às 6 horas", "Às 21 horas", "Ao meio-dia"], answer: "Às 6 horas" },
        { question: "O que Daniel faz antes do café da manhã?", options: ["Escova os dentes e toma banho", "Joga futebol", "Faz a lição de casa"], answer: "Escova os dentes e toma banho" },
        { question: "O que Daniel faz à tarde?", options: ["Dorme", "Joga futebol com amigos", "Vai à igreja"], answer: "Joga futebol com amigos" },
        { question: "A que horas Daniel dorme?", options: ["Às 6 horas", "Às 21 horas", "Às 14 horas"], answer: "Às 21 horas" },
      ],
    },
    {
      lessonId: 9,
      title: "Teste 9",
      subtitle: "Comida e Bebidas",
      passingScore: 7,
      questions: [
        { question: "Qual é uma bebida?", options: ["Pão", "Suco", "Peixe"], answer: "Suco" },
        { question: "Qual é o nome da menina no texto?", options: ["Sara", "Emma", "Lisa"], answer: "Emma" },
        { question: "O que Emma come no café da manhã?", options: ["Arroz e frango", "Pão e ovos", "Peixe e legumes"], answer: "Pão e ovos" },
        { question: "O que Emma bebe na escola?", options: ["Café", "Água e às vezes suco", "Leite"], answer: "Água e às vezes suco" },
        { question: "Qual é a comida favorita de Emma?", options: ["Arroz com frango", "Pão com chá", "Banana com leite"], answer: "Arroz com frango" },
        { question: "O que a família de Emma come à noite?", options: ["Só pão", "Peixe e legumes", "Pizza"], answer: "Peixe e legumes" },
        { question: "Qual é uma fruta?", options: ["Banana", "Caderno", "Cadeira"], answer: "Banana" },
        { question: "O que Emma bebe antes de dormir?", options: ["Café", "Água", "Chá"], answer: "Água" },
        { question: "O que a comida e as bebidas nos dão?", options: ["Energia e saúde", "Dinheiro", "Lição de casa"], answer: "Energia e saúde" },
        { question: "Qual frase está correta?", options: ["Ela bebeu suco de frutas", "Suco de frutas ela bebeu", "Bebeu ela suco frutas"], answer: "Ela bebeu suco de frutas" },
      ],
    },
    {
      lessonId: 10,
      title: "Teste 10",
      subtitle: "Lugares na Cidade",
      passingScore: 7,
      questions: [
        { question: "Onde as pessoas normalmente compram comida?", options: ["Mercado", "Biblioteca", "Hospital"], answer: "Mercado" },
        { question: "Qual lugar ajuda pessoas doentes?", options: ["Banco", "Hospital", "Restaurante"], answer: "Hospital" },
        { question: "Onde as crianças podem brincar?", options: ["Delegacia", "Parque", "Banco"], answer: "Parque" },
        { question: "Onde as pessoas guardam seu dinheiro?", options: ["Restaurante", "Escola", "Banco"], answer: "Banco" },
        { question: "Quem foi à cidade com Michael?", options: ["O pai dele", "O professor dele", "A irmã dele"], answer: "O pai dele" },
        { question: "Por que o pai de Michael parou no banco?", options: ["Para sacar dinheiro", "Para comprar comida", "Para ver um médico"], answer: "Para sacar dinheiro" },
        { question: "O que compraram no mercado?", options: ["Livros", "Frutas e legumes", "Sapatos"], answer: "Frutas e legumes" },
        { question: "O que Michael viu perto da delegacia?", options: ["Um hospital", "Uma escola", "Um parque"], answer: "Um hospital" },
        { question: "Onde sentaram antes de voltar para casa?", options: ["Em um restaurante", "Em um parque", "No banco"], answer: "Em um restaurante" },
        { question: "Qual frase está correta?", options: ["O mercado fica perto da igreja", "Perto igreja mercado fica", "Fica perto o mercado igreja"], answer: "O mercado fica perto da igreja" },
      ],
    },
    {
      lessonId: 11,
      title: "Teste 11",
      subtitle: "Lazer e Interesses",
      passingScore: 7,
      questions: [
        { question: "Qual é um passatempo?", options: ["Hospital", "Desenhar", "Cozinha (o lugar)"], answer: "Desenhar" },
        { question: "Qual frase está correta?", options: ["Eu gosto de jogar futebol", "Jogar futebol eu gosto", "Futebol eu gosto jogar"], answer: "Eu gosto de jogar futebol" },
        { question: "Para que servem frequentemente os passatempos?", options: ["Para relaxar", "Para plantar comida", "Para mudar o clima"], answer: "Para relaxar" },
        { question: "Qual é uma atividade de tempo livre?", options: ["Nadar", "Delegacia", "Caderno"], answer: "Nadar" },
        { question: "Qual pergunta é sobre interesses?", options: ["O que você gosta de fazer?", "Onde fica o mercado?", "Quantos anos você tem?"], answer: "O que você gosta de fazer?" },
        { question: "Quem Tiago visitou no sábado?", options: ["O primo dele Daniel", "O professor dele", "O tio dele"], answer: "O primo dele Daniel" },
        { question: "O que Daniel estava fazendo quando Tiago chegou?", options: ["Jogando futebol", "Lendo um livro", "Cozinhando"], answer: "Lendo um livro" },
        { question: "Onde os meninos jogaram futebol?", options: ["Na escola", "No parque do bairro", "No restaurante"], answer: "No parque do bairro" },
        { question: "O que a irmã de Daniel estava fazendo?", options: ["Desenhando", "Nadando", "Assistindo televisão"], answer: "Desenhando" },
        { question: "Qual é o passatempo favorito de Daniel?", options: ["Ler livros", "Ouvir música", "Jogar videogame"], answer: "Ler livros" },
      ],
    },
    {
      lessonId: 12,
      title: "Teste 12",
      subtitle: "Revisão Final e Conversa Real",
      passingScore: 7,
      questions: [
        { question: "Como você cumprimenta alguém educadamente?", options: ["Olá", "Banana", "Janela"], answer: "Olá" },
        { question: "Qual frase se apresenta corretamente?", options: ["Meu nome é Daniel", "Daniel meu nome", "Nome Daniel sou eu"], answer: "Meu nome é Daniel" },
        { question: "Qual é um passatempo?", options: ["Ler livros", "Hospital", "Garrafa"], answer: "Ler livros" },
        { question: "Onde as pessoas compram legumes?", options: ["Aeroporto", "Mercado", "Biblioteca"], answer: "Mercado" },
        { question: "Qual é uma bebida?", options: ["Arroz", "Chá", "Frango"], answer: "Chá" },
        { question: "Quem viajou com Kevin?", options: ["A família dele", "O professor dele", "Os colegas dele"], answer: "A família dele" },
        { question: "O que Kevin comeu antes de sair?", options: ["Peixe e arroz", "Pão e chá", "Frango e suco"], answer: "Pão e chá" },
        { question: "Para onde Kevin foi com o primo?", options: ["Mercado", "Hospital", "Biblioteca"], answer: "Mercado" },
        { question: "O que fizeram à tarde?", options: ["Jogaram futebol e ouviram música", "Foram à escola", "Assistiram televisão"], answer: "Jogaram futebol e ouviram música" },
        { question: "O que Kevin disse no final do dia?", options: ["Que gostou de passar tempo em família", "Que ficou bravo o dia todo", "Que queria ir embora cedo"], answer: "Que gostou de passar tempo em família" },
      ],
    },
  ],

  finalQuiz: {
    title: "Teste Final - Nível 1",
    subtitle: "Este teste cobre todas as lições do Nível 1.",
    passingScore: 15,
    questions: [
      { question: "Como você cumprimenta alguém de manhã?", options: ["Bom dia", "Tchau", "Frango"], answer: "Bom dia" },
      { question: "Escolha a apresentação correta.", options: ["Meu nome é Alex", "Alex meu nome", "Nome Alex sou"], answer: "Meu nome é Alex" },
      { question: "Qual letra vem depois de G?", options: ["H", "J", "F"], answer: "H" },
      { question: "Como se escreve o número 15?", options: ["Cinquenta", "Quinze", "Cinco"], answer: "Quinze" },
      { question: "Quem é a filha do seu pai?", options: ["Sua irmã", "Seu professor", "Seu tio"], answer: "Sua irmã" },
      { question: "Qual é um objeto do dia a dia?", options: ["Garrafa", "Hospital", "Professor"], answer: "Garrafa" },
      { question: "Qual é uma cor?", options: ["Azul", "Quinta-feira", "Caderno"], answer: "Azul" },
      { question: "Qual mês vem depois de abril?", options: ["Maio", "Janeiro", "Julho"], answer: "Maio" },
      { question: "O que geralmente se faz depois de acordar?", options: ["Escovar os dentes", "Ir dormir", "Jantar"], answer: "Escovar os dentes" },
      { question: "Qual é uma bebida?", options: ["Chá", "Arroz", "Frango"], answer: "Chá" },
      { question: "Onde as pessoas guardam seu dinheiro?", options: ["Escola", "Banco", "Restaurante"], answer: "Banco" },
      { question: "Qual é um passatempo?", options: ["Nadar", "Hospital", "Janela"], answer: "Nadar" },
      { question: "Escolha a frase correta.", options: ["Eu gosto de ler livros", "Livros ler eu gosto", "Gosto livros eu ler"], answer: "Eu gosto de ler livros" },
      { question: "Para onde as pessoas vão quando estão doentes?", options: ["Hospital", "Biblioteca", "Mercado"], answer: "Hospital" },
      { question: "Qual dia vem antes de sexta-feira?", options: ["Quinta-feira", "Domingo", "Segunda-feira"], answer: "Quinta-feira" },
      { question: "Leitura: Sara come pão e bebe leite. O que Sara bebe?", options: ["Chá", "Leite", "Café"], answer: "Leite" },
      { question: "Leitura: Kevin joga futebol todo sábado. Qual é o passatempo de Kevin?", options: ["Leitura", "Futebol", "Culinária"], answer: "Futebol" },
      { question: "Escolha a resposta correta: Eu ___ à escola todos os dias.", options: ["vou", "vai", "indo"], answer: "vou" },
      { question: "Se alguém diz « Muito prazer », o que você pode responder?", options: ["Muito prazer também", "Caderno azul", "Estou dormindo"], answer: "Muito prazer também" },
      {
        question: "Qual estudante está pronto para o Nível 2?",
        options: [
          "Um estudante que entende e usa corretamente o português básico",
          "Um estudante que responde aleatoriamente",
          "Um estudante que pula todas as lições",
        ],
        answer: "Um estudante que entende e usa corretamente o português básico",
      },
    ],
  },
};
