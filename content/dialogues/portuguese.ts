import type { RawDialogue } from "./types";

// Conversas dos testes (português do Brasil). As falas alternam A, B, A, B…
// Cada pergunta: [pergunta, resposta correta, errada, errada].
const data: Record<string, RawDialogue> = {
  // ---------------- Nível 1 ----------------
  "1-1": {
    swap: true,
    lines: [
      "Bom dia! Eu me chamo Tom. Qual é o seu nome?",
      "Bom dia, Tom. Eu sou a Ana. Muito prazer.",
      "Muito prazer. Você é estudante?",
      "Sim, sou estudante. Moro em Kolwezi. E você?",
      "Eu sou professor. Moro em Lubumbashi.",
      "Ótimo! Até amanhã, Ana.",
    ],
    q: [
      ["Como se chama a pessoa B?", "Ana", "Tom", "Emma"],
      ["Qual é a profissão de Ana?", "Ela é estudante", "Ela é professora", "Ela é médica"],
      ["Onde Tom mora?", "Em Lubumbashi", "Em Kolwezi", "Em Kinshasa"],
    ],
  },
  "1-2": {
    swap: true,
    lines: [
      "Olá. Pode soletrar o seu nome, por favor?",
      "Posso. É S, A, R, A, H. Sarah.",
      "Obrigado. E o seu sobrenome?",
      "É B, R, O, W, N. Brown.",
      "Perfeito. Sarah Brown. Agora, qual é o seu e-mail?",
      "É sarah ponto brown arroba mail ponto com.",
    ],
    q: [
      ["Como Sarah soletra o nome dela?", "S-A-R-A-H", "S-A-R-R-A", "Z-A-R-A-H"],
      ["Qual é o sobrenome de Sarah?", "Brown", "Black", "Green"],
      ["O que a pessoa A pede no final?", "O e-mail dela", "O telefone dela", "A idade dela"],
    ],
  },
  "1-3": {
    lines: [
      "Oi! Quantos anos você tem?",
      "Tenho quatorze anos. E você?",
      "Eu tenho quinze. Qual é o seu número de telefone?",
      "É zero oito um, dois três quatro, cinco seis sete.",
      "Obrigado. Eu ligo para você no sábado.",
      "Combinado! Me ligue de manhã.",
    ],
    q: [
      ["Quantos anos a pessoa B tem?", "Quatorze", "Quinze", "Dezesseis"],
      ["Quantos anos a pessoa A tem?", "Quinze", "Quatorze", "Treze"],
      ["Quando a pessoa A vai ligar?", "No sábado", "Na segunda-feira", "No domingo"],
    ],
  },
  "1-4": {
    lines: [
      "Quem é o homem nesta foto?",
      "É o meu pai. Ele se chama David.",
      "E a mulher ao lado dele?",
      "É a minha mãe. Eu também tenho duas irmãs e um irmão.",
      "Quantos anos o seu irmão tem?",
      "Ele tem dez. As minhas irmãs têm doze e dezessete.",
    ],
    q: [
      ["Quem é David?", "O pai de quem fala", "O irmão de quem fala", "O tio de quem fala"],
      ["Quantas irmãs tem quem fala?", "Duas", "Uma", "Três"],
      ["Quantos anos o irmão tem?", "Dez", "Doze", "Dezessete"],
    ],
  },
  "1-5": {
    lines: [
      "Com licença, onde está a minha mochila?",
      "Está em cima da mesa, ao lado do telefone.",
      "Obrigado. E as minhas chaves?",
      "As suas chaves estão na caixa azul, embaixo da cadeira.",
      "Ah, sim, estou vendo. E o meu caderno?",
      "Está na cama. Você sempre esquece!",
    ],
    q: [
      ["Onde está a mochila?", "Em cima da mesa", "Embaixo da cadeira", "Na cama"],
      ["Onde estão as chaves?", "Na caixa azul", "Em cima da mesa", "Na mochila"],
      ["Onde está o caderno?", "Na cama", "Em cima da mesa", "Embaixo da cadeira"],
    ],
  },
  "1-6": {
    lines: [
      "Olá! Eu quero comprar uma jaqueta.",
      "Claro. De que cor o senhor gosta?",
      "Gosto de verde. Mas não um verde escuro, um verde claro.",
      "Temos esta jaqueta verde clara. É grande e muito macia.",
      "É bonita. Vocês têm também em preto?",
      "Temos, sim. A preta é mais barata.",
    ],
    q: [
      ["O que o cliente quer comprar?", "Uma jaqueta", "Uma mochila", "Sapatos"],
      ["Que cor ele prefere primeiro?", "Verde claro", "Verde escuro", "Vermelho"],
      ["Qual jaqueta é mais barata?", "A preta", "A verde", "A azul"],
    ],
  },
  "1-7": {
    lines: [
      "Quando é o seu aniversário?",
      "É no dia doze de março. E o seu?",
      "O meu é no dia três de julho.",
      "Que dia da semana é doze de março este ano?",
      "É sexta-feira. Podemos fazer uma festa!",
      "Boa ideia! Vou convidar todos os nossos amigos.",
    ],
    q: [
      ["Quando é o aniversário da pessoa B?", "Doze de março", "Três de julho", "Doze de maio"],
      ["Quando é o aniversário da pessoa A?", "Três de julho", "Doze de março", "Três de junho"],
      ["Em que dia é a festa?", "Sexta-feira", "Sábado", "Domingo"],
    ],
  },
  "1-8": {
    lines: [
      "A que horas você acorda todos os dias?",
      "Eu acordo às seis. Depois me lavo e tomo o café da manhã.",
      "A que horas você vai para a escola?",
      "Saio de casa às sete e a aula começa às oito.",
      "E à noite?",
      "Faço a lição de casa, janto e vou dormir às nove.",
    ],
    q: [
      ["A que horas a pessoa acorda?", "Às seis", "Às sete", "Às oito"],
      ["A que horas a aula começa?", "Às oito", "Às sete", "Às nove"],
      ["O que essa pessoa faz antes de dormir?", "A lição de casa e o jantar", "Assistir à televisão", "Jogar futebol"],
    ],
  },
  "1-9": {
    lines: [
      "Boa tarde. O que o senhor deseja comer?",
      "Eu quero arroz com frango, por favor.",
      "E para beber?",
      "Um copo de água. E o meu amigo quer suco de laranja.",
      "Alguma sobremesa?",
      "Sim, uma banana para mim, por favor. É só isso.",
    ],
    q: [
      ["O que o cliente pede para comer?", "Arroz com frango", "Peixe e pão", "Sopa"],
      ["O que o amigo bebe?", "Suco de laranja", "Água", "Leite"],
      ["Qual é a sobremesa?", "Uma banana", "Um bolo", "Um sorvete"],
    ],
  },
  "1-10": {
    lines: [
      "Com licença, onde fica o banco, por favor?",
      "Siga em frente e depois vire à esquerda no mercado.",
      "É longe?",
      "Não, são cinco minutos a pé. Fica ao lado da farmácia.",
      "E tem uma agência dos correios por aqui?",
      "Tem, sim. Os correios ficam em frente ao banco.",
    ],
    q: [
      ["O que a pessoa A procura primeiro?", "O banco", "O mercado", "A escola"],
      ["Onde essa pessoa deve virar à esquerda?", "No mercado", "Na farmácia", "Nos correios"],
      ["Onde ficam os correios?", "Em frente ao banco", "Ao lado do mercado", "Atrás da farmácia"],
    ],
  },
  "1-11": {
    lines: [
      "O que você gosta de fazer no tempo livre?",
      "Eu adoro jogar futebol com os meus amigos. E você?",
      "Eu prefiro ler livros e ouvir música.",
      "Você gosta de nadar?",
      "Não muito, mas gosto de dançar aos domingos.",
      "Então vamos dançar juntos no próximo domingo!",
    ],
    q: [
      ["O que a primeira pessoa adora?", "Jogar futebol", "Ler", "Nadar"],
      ["O que a segunda pessoa prefere?", "Ler e ouvir música", "Futebol", "Cozinhar"],
      ["O que eles planejam para domingo?", "Dançar juntos", "Jogar futebol", "Ir nadar"],
    ],
  },
  "1-12": {
    lines: [
      "Olá! É o seu primeiro dia na escola?",
      "É sim. Eu me chamo Pedro. Tenho doze anos.",
      "Bem-vindo, Pedro! Eu sou a Graça. Onde você mora?",
      "Moro perto do mercado, numa casa verde.",
      "A minha aula começa às oito. Você gosta de português?",
      "Gosto, é a minha matéria favorita. Vamos sentar juntos!",
    ],
    q: [
      ["De quem é o primeiro dia?", "De Pedro", "De Graça", "Do professor"],
      ["Onde Pedro mora?", "Perto do mercado", "Perto do banco", "Perto da escola"],
      ["Qual é a matéria favorita de Pedro?", "Português", "Matemática", "Música"],
    ],
  },
  "1-final": {
    lines: [
      "Oi, eu sou a Júlia. Sou nova neste bairro.",
      "Bem-vinda, Júlia! Eu sou o Marcos. De onde você é?",
      "Sou de Lubumbashi. Tenho dezesseis anos. E você?",
      "Tenho dezessete. Moro com a minha mãe, o meu pai e os meus dois irmãos.",
      "Você tem hobbies? Eu adoro basquete aos sábados.",
      "Eu gosto de desenhar e cozinhar. Amanhã quero cozinhar arroz com peixe.",
      "Que legal! Posso pegar o seu telefone?",
      "Claro. É zero nove nove, um um um, dois dois dois.",
    ],
    q: [
      ["De onde Júlia é?", "De Lubumbashi", "De Kolwezi", "De Kinshasa"],
      ["Quantos anos Marcos tem?", "Dezessete", "Dezesseis", "Quinze"],
      ["O que Marcos adora aos sábados?", "Basquete", "Cozinhar", "Desenhar"],
      ["O que Júlia quer cozinhar amanhã?", "Arroz com peixe", "Frango com pão", "Sopa"],
    ],
  },

  // ---------------- Nível 2 ----------------
  "2-1": {
    lines: [
      "Você terminou o relatório que eu pedi?",
      "Ainda não. Estou trabalhando nele desde hoje cedo.",
      "Se você tivesse me avisado antes, eu teria ajudado.",
      "Eu sei, mas achei que conseguiria terminar sozinha.",
      "Bom, me mande quando estiver pronto e eu reviso a gramática.",
      "Obrigada. Mando antes do almoço.",
    ],
    q: [
      ["A pessoa B terminou o relatório?", "Não, ainda não", "Sim, terminou", "Nem começou"],
      ["O que a pessoa A teria feito antes?", "Teria ajudado", "Teria escrito sozinho", "Teria cancelado"],
      ["O que a pessoa A vai revisar?", "A gramática", "Os números", "As imagens"],
    ],
  },
  "2-2": {
    lines: [
      "O que você fez no fim de semana passado?",
      "Visitei os meus avós. Cozinhamos juntos e assistimos a filmes antigos.",
      "Que lindo. Eu fiquei em casa e terminei um livro.",
      "O que você vai fazer no próximo fim de semana?",
      "Vou viajar para Likasi para ver um jogo de futebol.",
      "Então provavelmente vou com você, se houver um ingresso para mim.",
    ],
    q: [
      ["O que a primeira pessoa fez no fim de semana passado?", "Visitou os avós", "Terminou um livro", "Foi a um jogo"],
      ["O que a segunda pessoa fez?", "Ficou em casa lendo", "Viajou", "Cozinhou para amigos"],
      ["Onde será o jogo?", "Em Likasi", "Em Kolwezi", "Em Kinshasa"],
    ],
  },
  "2-3": {
    swap: true,
    lines: [
      "Olá, acho que ainda não nos conhecemos. Eu sou o Daniel.",
      "Muito prazer, Daniel. Eu sou a Rosa. Como você conhece a anfitriã?",
      "Estudamos juntos na universidade. E você?",
      "Trabalho com ela na clínica. E você, o que faz?",
      "Sou engenheiro. Projeto sistemas de água para os vilarejos.",
      "Que interessante. Conte-me mais!",
    ],
    q: [
      ["Como Daniel conhece a anfitriã?", "Estudaram juntos", "São vizinhos", "Trabalham juntos"],
      ["Onde Rosa trabalha?", "Numa clínica", "Numa escola", "Num banco"],
      ["O que Daniel faz?", "Projeta sistemas de água", "Constrói casas", "Ensina português"],
    ],
  },
  "2-4": {
    lines: [
      "Você pode ler este e-mail antes de eu enviá-lo ao gerente?",
      "Claro. A primeira frase está um pouco longa. Tente encurtá-la.",
      "Começo com «Prezado senhor» ou com o nome dele?",
      "Use o nome dele, senhor Lewis. E termine com «Atenciosamente».",
      "E o assunto?",
      "Seja claro: «Pedido de reunião na quinta-feira».",
    ],
    q: [
      ["Para que serve o e-mail?", "Pedir uma reunião", "Reclamar de um preço", "Agradecer"],
      ["Como o e-mail deve começar?", "Com o nome do gerente", "Com «Oi, amigo»", "Sem saudação"],
      ["Em que dia é a reunião?", "Quinta-feira", "Terça-feira", "Sexta-feira"],
    ],
  },
  "2-5": {
    lines: [
      "Atenção, por favor. O trem para Lubumbashi está atrasado quarenta minutos.",
      "Você ouviu? O nosso trem sai às três e dez.",
      "Então temos tempo para um café. Qual é a plataforma?",
      "O aviso disse plataforma quatro.",
      "Vamos esperar na lanchonete, então. Estou com fome de qualquer jeito.",
      "Boa ideia. Vamos para a plataforma às três.",
    ],
    q: [
      ["Quanto o trem está atrasado?", "Quarenta minutos", "Dez minutos", "Uma hora"],
      ["De qual plataforma o trem sai?", "Plataforma quatro", "Plataforma dois", "Plataforma cinco"],
      ["O que eles decidem fazer?", "Esperar na lanchonete", "Pegar um táxi", "Voltar para casa"],
    ],
  },
  "2-6": {
    lines: [
      "Você leu a reportagem sobre a nova biblioteca da cidade?",
      "Li. Diz que ela abrirá em setembro e terá internet grátis.",
      "Gosto que os estudantes também possam pegar tablets emprestados.",
      "O autor também diz que ficará aberta até as dez da noite todos os dias.",
      "Acho que vou estudar lá. É mais silenciosa que a minha casa.",
      "Eu também. Espero que haja lugares suficientes!",
    ],
    q: [
      ["Quando a biblioteca vai abrir?", "Em setembro", "Em janeiro", "Em junho"],
      ["O que os estudantes podem pegar emprestado?", "Tablets", "Notebooks", "Telefones"],
      ["Até que horas ela ficará aberta?", "Até as dez da noite", "Até as seis da tarde", "Até a meia-noite"],
    ],
  },
  "2-7": {
    lines: [
      "O que você achou do filme de ontem à noite?",
      "Sinceramente, fiquei decepcionado. A história era previsível.",
      "Sério? Eu achei emocionante, e a música era maravilhosa.",
      "Na minha opinião, os atores não eram convincentes.",
      "Discordo. A atriz principal estava fantástica, e o final me surpreendeu.",
      "Bem, temos gostos diferentes. Da próxima vez, você escolhe o filme.",
    ],
    q: [
      ["O que a primeira pessoa sentiu sobre o filme?", "Decepção", "Alegria", "Tédio por causa da música"],
      ["Do que a segunda pessoa mais gostou?", "Da música e da atriz", "Do preço", "Do cinema"],
      ["O que combinam no final?", "O outro escolhe da próxima vez", "Rever o filme", "Ler o livro"],
    ],
  },
  "2-8": {
    lines: [
      "Escute bem: a palavra é «carro», com erre forte, não «caro».",
      "Carro. Assim está melhor?",
      "Quase. Faça o som sair do fundo da garganta, mais forte.",
      "Carrro... carrro. Sinto a diferença.",
      "Muito bem. Agora repita a frase: «O carro rápido rodou na rua».",
      "O carro rápido rodou na rua. Estava correto?",
    ],
    q: [
      ["Que palavra a professora corrige?", "Carro", "Caro", "Rua"],
      ["De onde deve sair o som do erre forte?", "Do fundo da garganta", "Dos lábios", "Dos dentes"],
      ["O que o aluno deve repetir?", "Uma frase inteira", "O alfabeto", "Um número"],
    ],
  },
  "2-9": {
    lines: [
      "Com licença, esta sopa está fria. Eu pedi quente.",
      "Sinto muito, senhora. Vou trazer outra agora mesmo.",
      "Obrigada. E pode trazer a conta, por favor?",
      "Claro. A senhora vai pagar com cartão ou em dinheiro?",
      "Com cartão. O serviço está incluído?",
      "Sim, está incluído. Obrigado pela paciência.",
    ],
    q: [
      ["Qual é o problema?", "A sopa está fria", "A comida está muito salgada", "A mesa está suja"],
      ["O que o garçom vai fazer?", "Trazer outra sopa", "Dar um desconto", "Chamar o gerente"],
      ["Como a cliente vai pagar?", "Com cartão", "Em dinheiro", "Pelo telefone"],
    ],
  },
  "2-10": {
    lines: [
      "Bom dia, senhor Okafor. Obrigado por vir ao nosso escritório.",
      "Obrigado por me receber. Gostaria de apresentar o novo produto da nossa empresa.",
      "Pode começar. Temos trinta minutos antes da próxima reunião.",
      "É uma lâmpada solar. Dura dez horas e custa muito pouco.",
      "Em quanto tempo vocês entregam duzentas lâmpadas?",
      "Em três semanas. Amanhã envio uma proposta por escrito.",
    ],
    q: [
      ["Qual é o produto?", "Uma lâmpada solar", "Um telefone", "Uma bomba de água"],
      ["Quantas lâmpadas o cliente quer?", "Duzentas", "Cem", "Doze"],
      ["Quando o senhor Okafor vai enviar a proposta?", "Amanhã", "No mês que vem", "Hoje"],
    ],
  },
  "2-11": {
    lines: [
      "Acredito que trabalhar em casa é melhor. A gente economiza tempo e dinheiro.",
      "Entendo o seu ponto, mas discordo. Em casa é difícil se concentrar.",
      "Depende da pessoa. Eu rendo mais sem barulho.",
      "Mas as equipes se comunicam melhor quando se veem todos os dias.",
      "Poderíamos combinar os dois: três dias no escritório e dois em casa.",
      "É um acordo justo. Eu aceito.",
    ],
    q: [
      ["O que a primeira pessoa prefere?", "Trabalhar em casa", "Trabalhar no escritório", "Não trabalhar"],
      ["Por que a segunda discorda?", "É difícil se concentrar em casa", "Custa caro demais", "Não há internet"],
      ["Que acordo eles fazem?", "Três dias no escritório, dois em casa", "Cinco dias em casa", "Cinco dias no escritório"],
    ],
  },
  "2-12": {
    lines: [
      "Amanhã tenho uma entrevista de emprego. Pode me ajudar a treinar?",
      "Claro. Primeira pergunta: por que quer trabalhar nesta empresa?",
      "Porque ela ajuda os jovens a aprender habilidades, e eu gosto de ensinar.",
      "Bom. Agora, qual é o seu maior ponto forte?",
      "Sou paciente e trabalho bem em equipe.",
      "Excelente. Fique calmo, sorria e fale devagar amanhã.",
    ],
    q: [
      ["Para que a pessoa A se prepara?", "Para uma entrevista de emprego", "Para uma prova", "Para uma viagem"],
      ["Por que essa pessoa quer trabalhar na empresa?", "Ela ajuda os jovens a aprender", "Ela paga mais", "Fica perto de casa"],
      ["Que conselho o amigo dá no final?", "Ficar calmo e falar devagar", "Chegar atrasado", "Falar muito rápido"],
    ],
  },
  "2-final": {
    lines: [
      "Você está livre neste fim de semana? Quero planejar um passeio.",
      "Estou livre no sábado. Aonde você quer ir?",
      "Eu estava pensando no lago. Poderíamos sair cedo de manhã.",
      "É longe? Da última vez viajei três horas e fiquei exausto.",
      "São só noventa minutos de ônibus. Podemos levar sanduíches e suco.",
      "Na minha opinião, também devíamos levar um chapéu. Fez muito calor no ano passado.",
      "Boa observação. Vamos convidar a Maria e o João?",
      "Vamos, mas perguntemos a eles hoje à noite. O ônibus sai às sete.",
    ],
    q: [
      ["Aonde eles querem ir?", "Ao lago", "À montanha", "Ao mercado"],
      ["Quanto tempo dura a viagem de ônibus?", "Noventa minutos", "Três horas", "Trinta minutos"],
      ["O que devem levar além da comida?", "Um chapéu", "Um guarda-chuva", "Uma câmera"],
      ["A que horas o ônibus sai?", "Às sete", "Às seis", "Às oito"],
    ],
  },

  // ---------------- Nível 3 ----------------
  "3-1": {
    lines: [
      "Se assinarmos o contrato hoje, quando vocês poderiam iniciar a entrega?",
      "Se confirmarem o pedido até o meio-dia, poderíamos começar na segunda-feira.",
      "E se a remessa atrasasse, vocês ofereceriam uma compensação?",
      "Sim. Se atrasasse mais de uma semana, daríamos cinco por cento de desconto.",
      "É aceitável. A menos que haja outras condições, vamos assinar.",
      "Enviarei a versão final esta tarde.",
    ],
    q: [
      ["Quando a entrega poderia começar se o pedido for confirmado até o meio-dia?", "Na segunda-feira", "Na sexta-feira", "No mês que vem"],
      ["O que é oferecido por um atraso de mais de uma semana?", "Cinco por cento de desconto", "Reembolso total", "Um produto grátis"],
      ["Quando a versão final será enviada?", "Esta tarde", "Amanhã de manhã", "Na semana que vem"],
    ],
  },
  "3-2": {
    lines: [
      "O senhor deve entregar o formulário de conformidade até o fim do mês.",
      "Preciso anexar também as demonstrações financeiras?",
      "Sim, deve incluí-las. Não precisa enviar as faturas antigas.",
      "Posso enviar por meio eletrônico, ou ele precisa ser assinado em papel?",
      "Pode enviar por meio eletrônico, mas o diretor deve assiná-lo antes.",
      "Entendido. Devo conseguir terminar até quinta-feira.",
    ],
    q: [
      ["Para quando é o formulário?", "Fim do mês", "Semana que vem", "Amanhã"],
      ["O que não é necessário?", "As faturas antigas", "As demonstrações financeiras", "Uma assinatura"],
      ["Quem deve assinar o formulário?", "O diretor", "O contador", "O cliente"],
    ],
  },
  "3-3": {
    lines: [
      "O nosso preço é de trinta mil dólares pelo pacote completo.",
      "Isso passa do nosso orçamento. Poderíamos oferecer vinte e quatro mil.",
      "Não posso baixar tanto, mas posso incluir treinamento gratuito para a sua equipe.",
      "Interessante. E se pagarmos metade agora e metade em sessenta dias?",
      "Posso aceitar, com uma taxa de dois por cento sobre o segundo pagamento.",
      "Então temos um acordo em vinte e oito mil. Vamos colocar por escrito.",
    ],
    q: [
      ["Qual foi o primeiro preço?", "Trinta mil dólares", "Vinte e quatro mil", "Vinte e oito mil"],
      ["Que extra o vendedor oferece?", "Treinamento gratuito", "Entrega gratuita", "Um segundo produto"],
      ["Qual é o preço final?", "Vinte e oito mil dólares", "Trinta mil dólares", "Vinte e quatro mil dólares"],
    ],
  },
  "3-4": {
    lines: [
      "Vamos ensaiar a sua apresentação. Você tem dez minutos. Comece quando estiver pronto.",
      "Bom dia a todos. Hoje vou mostrar os resultados de vendas do nosso ano.",
      "Ótimo começo. Lembre-se de fazer uma pausa depois de cada número importante.",
      "Devo usar primeiro o gráfico do segundo slide?",
      "Sim, depois passe para a tabela. Mantenha os slides simples e olhe para o público.",
      "Entendido. Também vou preparar respostas para perguntas sobre custos.",
    ],
    q: [
      ["Quanto dura a apresentação?", "Dez minutos", "Trinta minutos", "Uma hora"],
      ["Qual é o tema?", "Os resultados de vendas do ano", "Um novo funcionário", "A mudança do escritório"],
      ["O que o treinador aconselha?", "Slides simples e olhar para o público", "Ler cada palavra", "Evitar gráficos"],
    ],
  },
  "3-5": {
    lines: [
      "Obrigado a todos por virem. O primeiro item da pauta é o orçamento.",
      "Proponho aumentar o orçamento de treinamento em dez por cento.",
      "Quem é a favor? Levante a mão, por favor.",
      "Sete a favor, um contra. A proposta está aprovada.",
      "Eu redijo a ata e a distribuo amanhã de manhã.",
      "Inclua também a data da próxima reunião: dia quinze, às nove.",
    ],
    q: [
      ["Qual é o primeiro item da pauta?", "O orçamento", "A contratação", "O novo escritório"],
      ["Qual é o resultado da votação?", "Sete a favor, um contra", "Cinco a favor, três contra", "Todos contra"],
      ["Quando é a próxima reunião?", "Dia quinze, às nove", "Dia cinco, às nove", "Dia quinze, às dez"],
    ],
  },
  "3-6": {
    lines: [
      "Estou escrevendo o relatório trimestral. Como devo estruturá-lo?",
      "Comece com um resumo executivo de meia página, com os principais resultados.",
      "Depois a análise, com tabelas, e por fim as suas recomendações.",
      "A proposta do novo armazém deve ficar dentro do relatório?",
      "Não, faça um documento separado. Inclua custos, cronograma e riscos.",
      "Certo. Envio os dois documentos até sexta-feira.",
    ],
    q: [
      ["Como o relatório deve começar?", "Com um resumo executivo", "Com as recomendações", "Com as tabelas"],
      ["O que deve ser um documento separado?", "A proposta do armazém", "O resumo", "As tabelas"],
      ["Quando os documentos serão enviados?", "Até sexta-feira", "Até segunda-feira", "Hoje"],
    ],
  },
  "3-7": {
    lines: [
      "Alô, vocês me ouvem? A sua tela está congelada aqui.",
      "Ouço você, mas a imagem está lenta. Vou desligar a minha câmera.",
      "Melhorou. Pode compartilhar a sua apresentação agora?",
      "Posso, estou compartilhando. Vê o primeiro slide?",
      "Vejo, com clareza. Silencie o seu microfone enquanto eu faço uma pergunta, por favor.",
      "Desculpe, eu estava digitando. Pode falar.",
    ],
    q: [
      ["Qual é o problema no começo?", "A imagem está congelada ou lenta", "Ninguém ouve", "A chamada foi cancelada"],
      ["O que a pessoa desliga?", "A câmera", "O microfone", "A tela"],
      ["Por que pedem para silenciar o microfone?", "Será feita uma pergunta", "Há eco", "A reunião acabou"],
    ],
  },
  "3-8": {
    lines: [
      "Olá, sou a Amina, de uma empresa de logística. É a sua primeira conferência?",
      "Não, é a terceira. Sou o Pedro, trabalho com energia renovável.",
      "Interessante. Transportamos painéis solares com frequência. Poderíamos trabalhar juntos.",
      "Eu adoraria. Você tem um cartão de visita?",
      "Claro. Vamos tomar um café amanhã e conversar com calma.",
      "Perfeito. Escrevo para você hoje à noite para confirmar o horário.",
    ],
    q: [
      ["O que a empresa de Amina faz?", "Logística", "Banco", "Educação"],
      ["Qual conferência é esta para Pedro?", "A terceira", "A primeira", "A segunda"],
      ["O que Amina vai fazer hoje à noite?", "Escrever um e-mail para Pedro", "Ligar para Pedro", "Redigir um relatório"],
    ],
  },
  "3-9": {
    lines: [
      "A remessa está cinco dias atrasada e o cliente está muito insatisfeito.",
      "O que causou o atraso?",
      "Um problema na alfândega. Os documentos estavam incompletos.",
      "Precisamos de duas soluções: primeiro, corrigir os documentos hoje; segundo, enviar uma parte por avião.",
      "O frete aéreo é caro. Quanto custaria?",
      "Cerca de dois mil dólares. Acho que vale a pena para manter o cliente.",
    ],
    q: [
      ["Quanto a remessa está atrasada?", "Cinco dias", "Dois dias", "Um mês"],
      ["O que causou o atraso?", "Documentos incompletos na alfândega", "Uma greve", "O mau tempo"],
      ["Quanto custaria o frete aéreo?", "Cerca de dois mil dólares", "Cerca de quinhentos dólares", "Cerca de vinte mil dólares"],
    ],
  },
  "3-10": {
    lines: [
      "O meu sócio me convidou para jantar, mas não sei como me comportar.",
      "Na cultura deles, é educado chegar um pouco atrasado, nunca na hora exata.",
      "E devo levar um presente?",
      "Um presente pequeno é bem-vindo, como frutas ou doces. Evite dar algo caro.",
      "É falta de educação recusar a comida?",
      "É, é melhor experimentar um pouco de tudo e agradecer.",
    ],
    q: [
      ["Quando o convidado deve chegar?", "Um pouco atrasado", "Muito cedo", "Na hora exata"],
      ["Que presente é bem-vindo?", "Frutas ou doces", "Dinheiro", "Um relógio caro"],
      ["Qual é o conselho sobre a comida?", "Experimentar um pouco de tudo", "Recusar educadamente", "Comer antes de ir"],
    ],
  },
  "3-11": {
    lines: [
      "Dois membros da minha equipe estão em conflito e isso afeta o grupo todo.",
      "Primeiro, converse com cada um separadamente e ouça sem julgar.",
      "Depois reúna os dois e foque nas soluções, não nos culpados.",
      "E se não chegarem a um acordo?",
      "Defina metas claras, divida as responsabilidades e acompanhe o progresso toda semana.",
      "Obrigado. Vou marcar a reunião para quarta-feira.",
    ],
    q: [
      ["Qual é o problema?", "Dois membros da equipe estão em conflito", "As vendas caíram", "Um gerente pediu demissão"],
      ["O que o responsável deve fazer primeiro?", "Conversar com cada um separadamente", "Demitir um deles", "Ignorar"],
      ["Quando será a reunião?", "Quarta-feira", "Segunda-feira", "Sexta-feira"],
    ],
  },
  "3-12": {
    lines: [
      "Obrigado por nos receber. Queremos renovar o nosso contrato por mais dois anos.",
      "Ficamos felizes em saber. Posso sugerir algumas mudanças nas condições?",
      "Claro. As nossas prioridades são entrega mais rápida e um relatório mensal.",
      "Podemos garantir a entrega em dez dias, e enviarei um relatório todo mês.",
      "Em troca, aceitaríamos um pequeno aumento no preço.",
      "É justo. Vamos fechar os detalhes e assinar na semana que vem.",
    ],
    q: [
      ["O que o cliente quer fazer?", "Renovar o contrato por dois anos", "Cancelar o contrato", "Comprar um produto novo"],
      ["Qual é o prazo de entrega garantido?", "Dez dias", "Dois dias", "Um mês"],
      ["O que o cliente aceita em troca?", "Um pequeno aumento de preço", "Um atraso maior", "Menos serviço"],
    ],
  },
  "3-final": {
    lines: [
      "Bom dia. Vamos revisar os resultados do último trimestre.",
      "As vendas subiram doze por cento, principalmente graças aos novos clientes do norte.",
      "Se mantivermos esse ritmo, conseguiremos atingir a meta anual?",
      "Sim, desde que contratemos mais duas pessoas para o atendimento ao cliente.",
      "Quais são os principais riscos para o próximo trimestre?",
      "O aumento dos custos de transporte e um possível atraso do nosso principal fornecedor.",
      "Então proponho contatar um segundo fornecedor e preparar um plano de contingência.",
      "De acordo. Vou apresentar o plano ao conselho no dia vinte.",
    ],
    q: [
      ["Quanto as vendas subiram?", "Doze por cento", "Dois por cento", "Vinte por cento"],
      ["O que é preciso para atingir a meta anual?", "Mais duas pessoas no atendimento", "Um escritório novo", "Um preço menor"],
      ["Que risco é mencionado?", "O aumento dos custos de transporte", "Um novo concorrente", "Uma greve"],
      ["Quando o plano será apresentado ao conselho?", "No dia vinte", "No dia dez", "No ano que vem"],
    ],
  },
};

export default data;
