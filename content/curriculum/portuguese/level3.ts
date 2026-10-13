import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in Portuguese,
// mirroring the English/Swahili/Spanish Level 3 business-language plan.
export const portugueseLevel3: LevelCurriculum = {
  langCode: "PT",
  langLabel: "Portugais",
  langSlug: "portuguese",
  level: 3,
  levelTitle: "Nível 3 - Português Empresarial",
  levelSubtitle: "Comunicação profissional, apresentações e português do trabalho.",

  lessons: [
    {
      id: 1,
      title: "Condicionais para os Negócios",
      subtitle: "Use frases condicionais para falar sobre possibilidades e consequências no trabalho.",
      sections: [
        { heading: "Primeiro Condicional (possibilidade real)", body: ["Se + presente, futuro simples.", "Se terminarmos o relatório cedo, vamos enviá-lo hoje.", "Se o cliente ligar, vou responder imediatamente."] },
        { heading: "Segundo Condicional (improvável ou hipotético)", body: ["Se + imperfeito do subjuntivo, futuro do pretérito.", "Se eu tivesse mais tempo, revisaria a proposta de novo.", "Se ela fosse a gerente, mudaria o horário."] },
        { heading: "Usos Empresariais", body: ["Condicionais são comuns em negociações e planejamento.", "Se você baixar o preço, assinaremos o contrato.", "Se o mercado crescesse, consideraríamos expandir."] },
      ],
      speakText: `Primeiro condicional, para uma possibilidade real. Se terminarmos o relatório cedo, vamos enviá-lo hoje.

Segundo condicional, para algo improvável ou hipotético. Se eu tivesse mais tempo, revisaria a proposta de novo.

Usos empresariais. Condicionais são comuns em negociações e planejamento.`,
      videoTopic: "Comparar o primeiro e o segundo condicional em uma negociação empresarial.",
      videoUrl: "https://www.youtube.com/watch?v=lMJ8vgmShc0",
      readingTitle: "Uma Negociação na Empresa Brightened Mind",
      reading: [
        "Durante a reunião, o fornecedor disse, “Se você pedir mais unidades, vamos oferecer um desconto.”",
        "A gerente respondeu, “Se tivéssemos um orçamento maior neste trimestre, pediríamos o dobro agora mesmo.”",
        "Ambos os lados continuaram negociando até chegar a um acordo que convinha a todos.",
        "No final da reunião, tinham assinado um novo contrato.",
      ],
      readingSpeakText: `Uma negociação na empresa Brightened Mind. Durante a reunião, o fornecedor disse, se você pedir mais unidades, vamos oferecer um desconto.`,
      exercises: ["Escreva uma frase de primeiro condicional sobre um prazo de trabalho.", "Escreva uma frase de segundo condicional sobre uma promoção hipotética.", "Reescreva 'Vamos expandir se o mercado crescer' com outra ordem.", "Explique a diferença entre o primeiro e o segundo condicional."],
      speakingTopic: "Descreva uma decisão no trabalho usando uma frase de primeiro condicional e outra de segundo.",
    },
    {
      id: 2,
      title: "Verbos Modais para os Negócios",
      subtitle: "Use verbos modais para expressar obrigação, conselho e possibilidade profissionalmente.",
      sections: [
        { heading: "Obrigação e Necessidade", body: ["Dever / Ter que: uma obrigação forte.", "Toda a equipe deve enviar o relatório até sexta-feira.", "Você tem que assinar o contrato antes de começar."] },
        { heading: "Conselho e Sugestão", body: ["Deveria: para dar conselhos.", "Você deveria checar os números de novo antes de enviar.", "Nós deveríamos avisar o cliente sobre o atraso."] },
        { heading: "Possibilidade", body: ["Poderia / É possível que: algo é possível mas não certo.", "O prazo poderia mudar na semana que vem.", "Poderíamos considerar outro fornecedor."] },
      ],
      speakText: `Obrigação e necessidade. Dever e ter que expressam uma obrigação forte. Toda a equipe deve enviar o relatório até sexta-feira.

Conselho e sugestão. Deveria se usa para dar conselhos. Você deveria checar os números de novo.

Possibilidade. Poderia e é possível que mostram que algo é possível mas não certo.`,
      videoTopic: "Ouvir a diferença entre obrigação, conselho e possibilidade no trabalho.",
      videoUrl: "https://www.youtube.com/watch?v=pVv3L0vLRYo",
      readingTitle: "Preparativos para a Auditoria",
      reading: [
        "A gerente financeira disse, “Devemos terminar os documentos da auditoria até segunda-feira.”",
        "Ela acrescentou, “Vocês também deveriam preparar um resumo curto para o diretor.”",
        "Um funcionário perguntou se o prazo poderia mudar, mas a gerente disse que era pouco provável.",
        "No final, a equipe terminou tudo a tempo e evitou o estresse de última hora.",
      ],
      readingSpeakText: `Preparativos para a auditoria. A gerente financeira disse, devemos terminar os documentos da auditoria até segunda-feira.`,
      exercises: ["Escreva uma frase com 'dever' sobre uma obrigação no trabalho.", "Escreva uma frase com 'deveria' dando conselho a um colega.", "Escreva uma frase com 'poderia' sobre um plano incerto.", "Explique a diferença entre 'dever' e 'deveria'."],
      speakingTopic: "Dê a um colega um conselho e uma obrigação firme usando verbos modais.",
    },
    {
      id: 3,
      title: "Linguagem de Negociação",
      subtitle: "Aprenda frases para negociar preços, prazos e acordos.",
      sections: [
        { heading: "Abrir uma Negociação", body: ["Gostaríamos de discutir os termos do contrato.", "Vamos falar sobre o que podemos oferecer um ao outro."] },
        { heading: "Fazer uma Oferta", body: ["Podemos oferecer um desconto de 10% para um pedido maior.", "Nossa melhor oferta é...", "Estamos dispostos a estender o prazo em uma semana."] },
        { heading: "Responder e Chegar a um Meio-Termo", body: ["Isso parece razoável, mas você também poderia...?", "Podemos chegar a um meio-termo.", "Vamos encontrar uma solução que funcione para os dois lados."] },
        { heading: "Fechar um Acordo", body: ["Acho que temos um acordo.", "Vamos colocar isso por escrito.", "Esperamos trabalhar com vocês."] },
      ],
      speakText: `Abrir uma negociação. Gostaríamos de discutir os termos do contrato.

Fazer uma oferta. Podemos oferecer um desconto de dez por cento para um pedido maior.

Responder e chegar a um meio-termo. Isso parece razoável, mas você também poderia...? Podemos chegar a um meio-termo.

Fechar um acordo. Acho que temos um acordo. Vamos colocar isso por escrito.`,
      videoTopic: "Ver uma negociação completa do início até o fechamento do acordo.",
      videoUrl: "https://www.youtube.com/watch?v=YaJWvc1KmRc",
      readingTitle: "Fechando o Acordo",
      reading: [
        "Duas empresas negociaram por quase duas horas sobre o preço do novo equipamento.",
        "No início, o comprador disse que o preço estava alto demais, mas o vendedor ofereceu um desconto de 10% para um pedido maior.",
        "O comprador respondeu, “Isso parece razoável, mas você também poderia incluir frete grátis?”",
        "O vendedor concordou, e os dois lados apertaram as mãos dizendo, “Esperamos trabalhar com vocês.”",
      ],
      readingSpeakText: `Fechando o acordo. Duas empresas negociaram por quase duas horas sobre o preço do novo equipamento.`,
      exercises: ["Escreva uma frase para abrir uma negociação.", "Escreva uma frase fazendo uma oferta com desconto.", "Escreva uma frase chegando a um meio-termo entre duas posições.", "Escreva uma frase para fechar uma negociação bem-sucedida."],
      speakingTopic: "Encene uma negociação curta sobre preço e prazo de entrega com um colega.",
    },
    {
      id: 4,
      title: "Habilidades de Apresentação",
      subtitle: "Aprenda a linguagem para estruturar e dar uma apresentação profissional clara.",
      sections: [
        { heading: "Abrir uma Apresentação", body: ["Bom dia a todos, obrigado por estarem aqui.", "Hoje, vou falar sobre...", "A apresentação vai durar uns 15 minutos, seguida de perguntas."] },
        { heading: "Organizar seus Pontos", body: ["Primeiro, vou explicar... Depois, vou passar para... Por fim, vou concluir com...", "Vamos para o próximo slide.", "Como vocês podem ver neste gráfico..."] },
        { heading: "Encerrar uma Apresentação", body: ["Resumindo, os pontos principais são...", "Obrigado pela atenção de vocês.", "Alguma pergunta?"] },
      ],
      speakText: `Abrir uma apresentação. Bom dia a todos, obrigado por estarem aqui. Hoje, vou falar sobre...

Organizar seus pontos. Primeiro, vou explicar... Depois, vou passar para... Por fim, vou concluir com...

Encerrar uma apresentação. Resumindo, os pontos principais são... Obrigado pela atenção de vocês. Alguma pergunta?`,
      videoTopic: "Ver uma apresentação profissional curta e bem estruturada.",
      videoUrl: "https://www.youtube.com/watch?v=jjfMilsjbjo",
      readingTitle: "A Primeira Apresentação de Linda",
      reading: [
        "Linda estava nervosa antes de sua primeira apresentação para a equipe de direção.",
        "Ela começou dizendo, “Bom dia a todos, obrigado por estarem aqui.”",
        "Ela estruturou sua fala claramente: primeiro o problema, depois a solução dela, e por fim os resultados.",
        "No final, ela disse, “Resumindo, os pontos principais são a redução de custos e a entrega mais rápida. Obrigado pela atenção de vocês. Alguma pergunta?”",
        "A equipe ficou impressionada com o quão clara e organizada foi a apresentação dela.",
      ],
      readingSpeakText: `A primeira apresentação de Linda. Linda estava nervosa antes de sua primeira apresentação para a equipe de direção.`,
      exercises: ["Escreva uma frase de abertura para uma apresentação sobre seu trabalho.", "Escreva três frases de transição para passar entre pontos.", "Escreva uma frase de encerramento que convide perguntas.", "Planeje uma apresentação de 1 minuto sobre seu projeto favorito."],
      speakingTopic: "Dê uma apresentação curta de 1 minuto sobre um tema à sua escolha.",
    },
    {
      id: 5,
      title: "Reuniões Formais e Atas",
      subtitle: "Aprenda a participar de reuniões e a escrever um resumo do que foi discutido.",
      sections: [
        { heading: "Durante uma Reunião", body: ["Podemos começar?", "Todos conseguem me ouvir bem?", "Gostaria de levantar um ponto.", "Podemos voltar a isso mais tarde?"] },
        { heading: "Pedir a Palavra", body: ["Posso dizer algo?", "Se eu puder acrescentar...", "Desculpe interromper, mas..."] },
        { heading: "Escrever Atas de Reunião", body: ["As atas registram o que foi discutido e decidido.", "Presentes: quem estava lá.", "Pauta: a lista de assuntos tratados.", "Tarefas pendentes: as tarefas atribuídas, com o responsável e o prazo."] },
      ],
      speakText: `Durante uma reunião. Podemos começar? Todos conseguem me ouvir bem? Gostaria de levantar um ponto.

Pedir a palavra. Posso dizer algo? Se eu puder acrescentar... Desculpe interromper, mas...

Escrever atas de reunião. As atas registram o que foi discutido e decidido.`,
      videoTopic: "Ver como uma reunião formal se desenvolve do início ao fim.",
      videoUrl: "https://www.youtube.com/watch?v=Z30r06x0ieQ",
      readingTitle: "A Reunião de Segunda-Feira",
      reading: [
        "Às 9 horas, o líder da equipe disse, “Podemos começar?” e todos concordaram.",
        "Durante a discussão, Pedro disse, “Se eu puder acrescentar, acho que também deveríamos revisar o orçamento.”",
        "Depois da reunião, a secretária escreveu as atas, listando os presentes, a pauta e três tarefas pendentes com prazos.",
        "Todos receberam uma cópia das atas por e-mail no mesmo dia.",
      ],
      readingSpeakText: `A reunião de segunda-feira. Às nove horas, o líder da equipe disse, podemos começar? E todos concordaram.`,
      exercises: ["Escreva uma frase para interromper uma reunião educadamente.", "Escreva uma frase para pedir para acrescentar um ponto.", "Liste as quatro partes de uma ata de reunião.", "Escreva um exemplo de tarefa pendente com responsável e prazo."],
      speakingTopic: "Conduza uma reunião curta simulada com um colega e pratique pedir a palavra educadamente.",
    },
    {
      id: 6,
      title: "Escrita Empresarial: Relatórios e Propostas",
      subtitle: "Aprenda a estrutura de um relatório ou proposta profissional.",
      sections: [
        { heading: "Estrutura de um Relatório", body: ["Introdução: o propósito do relatório.", "Resultados: os fatos e dados.", "Conclusão: um resumo do que foi encontrado.", "Recomendações: próximos passos sugeridos."] },
        { heading: "Frases Úteis", body: ["O propósito deste relatório é...", "Os dados mostram que...", "Com base nesses resultados, recomendamos...", "Em conclusão, ..."] },
      ],
      speakText: `Estrutura de um relatório. A introdução explica o propósito do relatório. Os resultados apresentam os fatos e dados. A conclusão resume o que foi encontrado. As recomendações sugerem próximos passos.

Frases úteis. O propósito deste relatório é... Os dados mostram que... Com base nesses resultados, recomendamos...`,
      videoTopic: "Ver como um relatório empresarial se organiza da introdução às recomendações.",
      videoUrl: "https://www.youtube.com/watch?v=-quTpulii5U",
      readingTitle: "Um Relatório sobre a Satisfação do Cliente",
      reading: [
        "O propósito deste relatório é avaliar a satisfação do cliente durante o último trimestre.",
        "Os dados mostram que 85% dos clientes ficaram satisfeitos com o serviço, um aumento em relação ao ano passado.",
        "No entanto, alguns clientes mencionaram que os tempos de resposta poderiam ser mais rápidos.",
        "Com base nesses resultados, recomendamos contratar mais dois funcionários de atendimento ao cliente.",
        "Em conclusão, a satisfação do cliente está melhorando, mas pequenas mudanças poderiam torná-la ainda melhor.",
      ],
      readingSpeakText: `Um relatório sobre a satisfação do cliente. O propósito deste relatório é avaliar a satisfação do cliente durante o último trimestre.`,
      exercises: ["Escreva uma introdução de uma frase para um relatório sobre seu trabalho.", "Escreva uma frase de resultados usando 'Os dados mostram que...'.", "Escreva uma recomendação usando 'recomendamos'.", "Escreva uma conclusão curta (2 frases) de um relatório imaginário."],
      speakingTopic: "Resuma um relatório imaginário sobre o desempenho da sua equipe.",
    },
    {
      id: 7,
      title: "Português para Ligações e Videochamadas",
      subtitle: "Aprenda frases para ligações telefônicas e videochamadas profissionais.",
      sections: [
        { heading: "Iniciar uma Ligação", body: ["Alô, aqui é o/a... da empresa Brightened Mind.", "Estou ligando sobre...", "É um bom momento para falar?"] },
        { heading: "Durante a Ligação", body: ["Você poderia repetir isso, por favor?", "Desculpe, a ligação não está muito clara.", "Deixe-me verificar isso e te respondo depois.", "Você consegue me ouvir bem?"] },
        { heading: "Encerrar uma Ligação", body: ["Obrigado pelo seu tempo.", "Vou te enviar um e-mail para confirmar.", "Falamos em breve. Tchau."] },
      ],
      speakText: `Iniciar uma ligação. Alô, aqui é o... da empresa Brightened Mind. Estou ligando sobre... É um bom momento para falar?

Durante a ligação. Você poderia repetir isso, por favor? Desculpe, a ligação não está muito clara.

Encerrar uma ligação. Obrigado pelo seu tempo. Vou te enviar um e-mail para confirmar.`,
      videoTopic: "Ouvir uma ligação profissional do início ao fim.",
      videoUrl: "https://www.youtube.com/watch?v=2Y1TNGgy5jA",
      readingTitle: "Uma Ligação para um Cliente",
      reading: [
        "“Alô, aqui é a Sara da empresa Brightened Mind. Estou ligando sobre o seu pedido recente.”",
        "A conexão do cliente não estava muito clara, então Sara disse, “Desculpe, a ligação não está muito clara, você poderia repetir isso, por favor?”",
        "Depois de resolver o problema, Sara disse, “Obrigado pelo seu tempo, vou te enviar um e-mail para confirmar tudo.”",
        "O cliente agradeceu, e eles encerraram a ligação educadamente.",
      ],
      readingSpeakText: `Uma ligação para um cliente. Alô, aqui é a Sara da empresa Brightened Mind. Estou ligando sobre o seu pedido recente.`,
      exercises: ["Escreva como você iniciaria uma ligação profissional.", "Escreva uma frase para pedir que alguém repita.", "Escreva uma frase para encerrar uma ligação educadamente.", "Pratique um diálogo telefônico curto com um colega."],
      speakingTopic: "Encene uma ligação telefônica se apresentando e explicando o motivo da ligação.",
    },
    {
      id: 8,
      title: "Networking e Conversa Informal",
      subtitle: "Aprenda a causar uma boa impressão profissional em conversas informais.",
      sections: [
        { heading: "Iniciar uma Conversa Informal", body: ["Então, como você conhece os organizadores?", "O que você faz da vida?", "Você já veio a um desses eventos antes?"] },
        { heading: "Trocar Informações de Contato", body: ["Foi ótimo falar com você. Posso pegar seu cartão de visita?", "Vamos nos conectar no LinkedIn.", "Vou te mandar um e-mail na semana que vem."] },
        { heading: "Temas Seguros vs. Temas a Evitar", body: ["Seguros: trabalho, tendências do setor, o próprio evento, viagens.", "Evitar: salário, política, problemas pessoais, religião."] },
      ],
      speakText: `Iniciar uma conversa informal. Então, como você conhece os organizadores? O que você faz da vida?

Trocar informações de contato. Foi ótimo falar com você. Posso pegar seu cartão de visita? Vamos nos conectar no LinkedIn.

Temas seguros versus temas a evitar. Seguros: trabalho, tendências do setor. Evitar: salário, política.`,
      videoTopic: "Ver uma conversa informal natural em um evento de negócios.",
      videoUrl: "https://www.youtube.com/watch?v=8fZI_dyC9F8",
      readingTitle: "Conhecendo Alguém Novo em uma Conferência",
      reading: [
        "Na conferência, Miguel se apresentou a um estranho que estava perto da mesa de café.",
        "Ele perguntou, “O que você faz da vida?” e descobriram que trabalhavam em setores parecidos.",
        "Conversaram sobre tendências do setor e viagens por uns dez minutos.",
        "Antes de sair, Miguel disse, “Foi ótimo falar com você, posso pegar seu cartão de visita? Vamos nos conectar no LinkedIn.”",
      ],
      readingSpeakText: `Conhecendo alguém novo em uma conferência. Na conferência, Miguel se apresentou a um estranho que estava perto da mesa de café.`,
      exercises: ["Escreva duas perguntas de conversa informal para um evento de negócios.", "Escreva uma frase para pedir as informações de contato de alguém.", "Liste dois temas seguros e dois temas a evitar.", "Pratique uma conversa curta de networking com um colega."],
      speakingTopic: "Pratique se apresentar e fazer conversa informal em um evento de networking imaginário.",
    },
    {
      id: 9,
      title: "Resolução de Problemas e Tomada de Decisão",
      subtitle: "Aprenda a linguagem para identificar problemas e tomar decisões no trabalho.",
      sections: [
        { heading: "Identificar um Problema", body: ["Tivemos um problema com...", "O principal problema parece ser...", "Isso causou um atraso em..."] },
        { heading: "Sugerir Soluções", body: ["Uma opção seria...", "Poderíamos tentar...", "E se nós...?"] },
        { heading: "Tomar uma Decisão", body: ["Vamos com essa opção.", "Acho que esse é o melhor caminho a seguir.", "Decidimos seguir em frente com..."] },
      ],
      speakText: `Identificar um problema. Tivemos um problema com... O principal problema parece ser... Isso causou um atraso em...

Sugerir soluções. Uma opção seria... Poderíamos tentar... E se nós...?

Tomar uma decisão. Vamos com essa opção. Decidimos seguir em frente com...`,
      videoTopic: "Ver uma equipe identificar um problema e concordar com uma solução juntos.",
      videoUrl: "https://www.youtube.com/watch?v=9D4ZltpqwEs",
      readingTitle: "Um Problema de Entrega",
      reading: [
        "A equipe de logística disse, “Tivemos um problema com o caminhão de entrega. O principal problema parece ser uma falha mecânica.”",
        "O gerente pediu sugestões, e um funcionário disse, “E se alugarmos um caminhão para as entregas de hoje?”",
        "Após uma breve discussão, o gerente disse, “Vamos com essa opção. Decidimos alugar um caminhão imediatamente.”",
        "As entregas foram concluídas no prazo graças à decisão rápida.",
      ],
      readingSpeakText: `Um problema de entrega. A equipe de logística disse, tivemos um problema com o caminhão de entrega.`,
      exercises: ["Escreva uma frase identificando um problema no trabalho.", "Escreva duas soluções sugeridas usando 'Poderíamos tentar' e 'E se nós'.", "Escreva uma frase tomando uma decisão final.", "Descreva um problema que você resolveu recentemente usando a linguagem desta lição."],
      speakingTopic: "Descreva um problema no trabalho e proponha duas possíveis soluções.",
    },
    {
      id: 10,
      title: "Comunicação Intercultural",
      subtitle: "Aprenda a se comunicar de forma respeitosa e eficaz com colegas internacionais.",
      sections: [
        { heading: "Por Que a Consciência Cultural Importa", body: ["Culturas diferentes têm normas diferentes sobre tempo, formalidade e franqueza.", "Estar ciente dessas diferenças ajuda a evitar mal-entendidos."] },
        { heading: "Frases Úteis", body: ["Você poderia me ajudar a entender como isso é feito normalmente no seu país?", "Quero ter certeza de que entendi bem.", "Por favor, me avise se eu disser algo que não fique claro."] },
        { heading: "Dicas para uma Comunicação Clara", body: ["Fale com clareza e evite expressões complicadas.", "Verifique o entendimento com perguntas simples de acompanhamento.", "Seja paciente e respeitoso com estilos de comunicação diferentes."] },
      ],
      speakText: `Por que a consciência cultural importa. Culturas diferentes têm normas diferentes sobre tempo, formalidade e franqueza.

Frases úteis. Você poderia me ajudar a entender como isso é feito normalmente no seu país?

Dicas para uma comunicação clara. Fale com clareza e evite expressões complicadas.`,
      videoTopic: "Ver como uma equipe internacional se comunica com clareza entre culturas.",
      videoUrl: "https://www.youtube.com/watch?v=D2l5wedNLsw",
      readingTitle: "Trabalhando com uma Equipe Internacional",
      reading: [
        "Quando a empresa Brightened Mind começou a trabalhar com parceiros no exterior, a equipe notou algumas diferenças culturais.",
        "Em algumas reuniões, os colegas eram muito diretos, enquanto em outras preferiam discutir as coisas mais devagar.",
        "Para evitar mal-entendidos, o líder da equipe frequentemente perguntava, “Você poderia me ajudar a entender como isso é feito normalmente no seu país?”",
        "Esse hábito simples ajudou toda a equipe a se comunicar de forma mais respeitosa e eficaz.",
      ],
      readingSpeakText: `Trabalhando com uma equipe internacional. Quando a empresa Brightened Mind começou a trabalhar com parceiros no exterior, a equipe notou algumas diferenças culturais.`,
      exercises: ["Escreva uma frase perguntando sobre o estilo de trabalho de outra cultura.", "Escreva uma frase para verificar seu entendimento educadamente.", "Liste duas dicas para uma comunicação clara entre culturas.", "Descreva uma vez em que você se comunicou com alguém de uma origem diferente."],
      speakingTopic: "Fale sobre como você se comunicaria respeitosamente com um colega internacional.",
    },
    {
      id: 11,
      title: "Vocabulário de Liderança e Gestão",
      subtitle: "Aprenda vocabulário chave usado por gerentes e líderes no trabalho.",
      sections: [
        { heading: "Vocabulário Chave", body: ["Delegar: dar uma tarefa a outra pessoa.", "Motivar: incentivar alguém a trabalhar bem.", "Feedback: comentários sobre o desempenho de alguém.", "Responsabilidade: assumir suas ações e resultados."] },
        { heading: "Dar Feedback", body: ["Eu realmente aprecio o esforço que você colocou nisso.", "Uma área que você poderia melhorar é...", "Vamos definir uma meta clara para a próxima vez."] },
        { heading: "Liderar uma Equipe", body: ["Gostaria de delegar essa tarefa a você.", "Bom trabalho motivando a equipe essa semana.", "Todos nós precisamos ser responsáveis pelos nossos prazos."] },
      ],
      speakText: `Vocabulário chave. Delegar significa dar uma tarefa a outra pessoa. Motivar significa incentivar alguém a trabalhar bem. Feedback são comentários sobre o desempenho. Responsabilidade é assumir seus resultados.

Dar feedback. Eu realmente aprecio o esforço que você colocou nisso.

Liderar uma equipe. Gostaria de delegar essa tarefa a você.`,
      videoTopic: "Ver um gerente dando feedback claro e respeitoso a um membro da equipe.",
      videoUrl: "https://www.youtube.com/watch?v=RTiZj49XN-c",
      readingTitle: "Um Novo Líder de Equipe",
      reading: [
        "Quando José se tornou líder de equipe, aprendeu a delegar tarefas em vez de fazer tudo sozinho.",
        "Ele também aprendeu a dar feedback claro, dizendo coisas como, “Eu realmente aprecio o esforço que você colocou nisso. Uma área que você poderia melhorar é cumprir os prazos.”",
        "A equipe dele ficou mais motivada porque se sentia confiável e responsável pelo próprio trabalho.",
        "Em poucos meses, o desempenho da equipe melhorou significativamente.",
      ],
      readingSpeakText: `Um novo líder de equipe. Quando José se tornou líder de equipe, aprendeu a delegar tarefas em vez de fazer tudo sozinho.`,
      exercises: ["Defina 'delegar', 'motivar', 'feedback' e 'responsabilidade' com suas próprias palavras.", "Escreva uma frase de feedback positivo para um colega.", "Escreva uma frase de feedback construtivo educada.", "Descreva um bom líder que você conhece usando o vocabulário da lição."],
      speakingTopic: "Dê feedback a um membro imaginário da sua equipe sobre o trabalho recente dele.",
    },
    {
      id: 12,
      title: "Revisão Final e Conversa Real de Negócios",
      subtitle: "Revise tudo o que aprendeu no Nível 3 e pratique uma conversa profissional completa.",
      sections: [
        {
          heading: "O que Aprendemos",
          body: [
            "Usar condicionais e verbos modais profissionalmente",
            "Negociar preços e acordos",
            "Dar apresentações claras",
            "Participar de reuniões e escrever atas",
            "Escrever relatórios e propostas",
            "Lidar com ligações e videochamadas",
            "Fazer networking e conversa informal",
            "Resolver problemas e tomar decisões",
            "Comunicar-se entre culturas",
            "Usar vocabulário de liderança e gestão",
          ],
        },
        {
          heading: "Exemplo de Conversa Real",
          body: [
            "A: Bom dia. Obrigado por participar desta ligação.",
            "B: Bom dia, fico feliz em estar aqui. Estou ligando sobre a proposta que você enviou.",
            "A: Claro. O que você acha?",
            "B: No geral, parece sólida. Se você pudesse estender o prazo de entrega em uma semana, assinaríamos imediatamente.",
            "A: Isso parece razoável. Deixe-me verificar com minha equipe e te responder hoje.",
            "B: Perfeito, obrigado pelo seu tempo. Espero que trabalhemos juntos.",
          ],
        },
      ],
      speakText: `As coisas importantes que aprendemos no Nível 3 incluem usar condicionais e verbos modais profissionalmente, negociar, dar apresentações, participar de reuniões, escrever relatórios, lidar com ligações, fazer networking, resolver problemas, comunicar-se entre culturas, e vocabulário de liderança.

Exemplo de conversa real.

Bom dia. Obrigado por participar desta ligação.
Bom dia, fico feliz em estar aqui. Estou ligando sobre a proposta que você enviou.`,
      videoTopic: "Revisar todos os temas do Nível 3 através de uma conversa de negócios completa.",
      videoUrl: "https://www.youtube.com/watch?v=hNC9ydxjSlU",
      readingTitle: "Completando o Programa",
      reading: [
        "Depois de terminar os Níveis 1, 2 e 3, Chantal agora pode liderar reuniões, escrever relatórios profissionais e negociar com clientes internacionais com confiança.",
        "Ela se lembra de ter dificuldades com saudações simples quando começou, e agora dá apresentações completas em português.",
        "Chantal diz que praticar conversas reais, não só regras de gramática, fez a maior diferença.",
        "Agora ela está pronta para usar o português com confiança na carreira dela na empresa Brightened Mind.",
      ],
      readingSpeakText: `Completando o programa. Depois de terminar os Níveis 1, 2 e 3, Chantal agora pode liderar reuniões, escrever relatórios profissionais e negociar com clientes internacionais com confiança.`,
      exercises: ["Escreva um diálogo profissional curto usando pelo menos três temas do Nível 3.", "Pratique a conversa de exemplo em voz alta com um colega.", "Escreva um parágrafo curto sobre sua jornada aprendendo português.", "Dê uma apresentação resumo de 1 minuto sobre o que você aprendeu nos três níveis."],
      speakingTopic: "Faça uma ligação profissional completa: cumprimente, discuta uma proposta, negocie e encerre educadamente.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Teste 1",
      subtitle: "Condicionais para os Negócios",
      passingScore: 7,
      questions: [
        { question: "Qual é uma frase de primeiro condicional?", options: ["Se terminarmos cedo, vamos enviar hoje", "Se eu fosse rico, viajaria", "Se choveu ontem"], answer: "Se terminarmos cedo, vamos enviar hoje" },
        { question: "Qual é uma frase de segundo condicional?", options: ["Se eu tivesse mais tempo, revisaria de novo", "Se você ligar, vou responder", "Se ganharmos, celebramos"], answer: "Se eu tivesse mais tempo, revisaria de novo" },
        { question: "Qual tempo segue 'se' no primeiro condicional?", options: ["presente", "imperfeito do subjuntivo", "futuro do pretérito"], answer: "presente" },
        { question: "Qual tempo segue 'se' no segundo condicional?", options: ["imperfeito do subjuntivo", "presente", "futuro"], answer: "imperfeito do subjuntivo" },
        { question: "Condicionais são comuns em qual atividade empresarial?", options: ["Negociações e planejamento", "Limpar o escritório", "Pausas para o almoço"], answer: "Negociações e planejamento" },
        { question: "O que o fornecedor ofereceu na conversa?", options: ["Um desconto por um pedido maior", "Um presente grátis", "Nada"], answer: "Um desconto por um pedido maior" },
        { question: "O que a gerente disse sobre o orçamento?", options: ["Se tivessem um orçamento maior, pediriam o dobro", "Não tinham orçamento", "O orçamento era ilimitado"], answer: "Se tivessem um orçamento maior, pediriam o dobro" },
        { question: "O que aconteceu no final da reunião?", options: ["Assinaram um novo contrato", "Cancelaram o acordo", "Nada foi decidido"], answer: "Assinaram um novo contrato" },
        { question: "Escolha a frase correta com 'tivesse'.", options: ["Se eu tivesse mais tempo, revisaria de novo", "Se eu tivesse mais tempo revisarei de novo", "Tivesse se mais tempo"], answer: "Se eu tivesse mais tempo, revisaria de novo" },
        { question: "Por que os condicionais são importantes no português empresarial?", options: ["Ajudam a discutir possibilidades e consequências", "Só se usam para cozinhar", "Não têm uso real"], answer: "Ajudam a discutir possibilidades e consequências" },
      ],
    },
    {
      lessonId: 2,
      title: "Teste 2",
      subtitle: "Verbos Modais para os Negócios",
      passingScore: 7,
      questions: [
        { question: "Qual verbo expressa uma obrigação forte?", options: ["dever", "poderia", "deveria"], answer: "dever" },
        { question: "Qual verbo se usa para dar conselhos?", options: ["deveria", "dever", "vou"], answer: "deveria" },
        { question: "Qual verbo mostra possibilidade?", options: ["poderia", "deve", "precisava"], answer: "poderia" },
        { question: "Escolha a frase correta.", options: ["Toda a equipe deve enviar o relatório até sexta-feira", "Toda a equipe poderia enviar deve", "Deve poderia a equipe enviar"], answer: "Toda a equipe deve enviar o relatório até sexta-feira" },
        { question: "Escolha a frase de conselho.", options: ["Você deveria checar os números de novo", "Você deve checar nunca", "Você poderia checar sempre"], answer: "Você deveria checar os números de novo" },
        { question: "O que a gerente financeira disse que era necessário?", options: ["Terminar os documentos da auditoria até segunda-feira", "Fechar o escritório", "Começar as férias"], answer: "Terminar os documentos da auditoria até segunda-feira" },
        { question: "O que mais ela sugeriu?", options: ["Preparar um resumo curto para o diretor", "Cancelar a auditoria", "Atrasar o trabalho"], answer: "Preparar um resumo curto para o diretor" },
        { question: "O prazo mudou?", options: ["Não, era pouco provável", "Sim, imediatamente", "O prazo nunca foi mencionado"], answer: "Não, era pouco provável" },
        { question: "Quando a equipe terminou o trabalho?", options: ["A tempo", "Muito tarde", "Nunca"], answer: "A tempo" },
        { question: "Qual é a diferença entre 'dever' e 'deveria'?", options: ["'Dever' é uma obrigação forte, 'deveria' é um conselho", "Significam exatamente a mesma coisa", "'Deveria' é mais forte"], answer: "'Dever' é uma obrigação forte, 'deveria' é um conselho" },
      ],
    },
    {
      lessonId: 3,
      title: "Teste 3",
      subtitle: "Linguagem de Negociação",
      passingScore: 7,
      questions: [
        { question: "Qual frase abre uma negociação?", options: ["Gostaríamos de discutir os termos do contrato", "Adeus para sempre", "Não quero falar"], answer: "Gostaríamos de discutir os termos do contrato" },
        { question: "Qual frase faz uma oferta?", options: ["Podemos oferecer um desconto de 10%", "Recusamos completamente", "Não há acordo"], answer: "Podemos oferecer um desconto de 10%" },
        { question: "Qual frase mostra chegar a um meio-termo?", options: ["Podemos chegar a um meio-termo", "Nunca vamos concordar", "É pegar ou largar"], answer: "Podemos chegar a um meio-termo" },
        { question: "Qual frase fecha um acordo?", options: ["Vamos colocar isso por escrito", "Vamos esquecer que isso aconteceu", "Não concordo de jeito nenhum"], answer: "Vamos colocar isso por escrito" },
        { question: "Por quanto tempo as duas empresas negociaram?", options: ["Quase duas horas", "Cinco minutos", "A semana toda"], answer: "Quase duas horas" },
        { question: "O que o comprador achou do preço no início?", options: ["Estava alto demais", "Estava baixo demais", "Estava perfeito"], answer: "Estava alto demais" },
        { question: "Qual desconto o vendedor ofereceu?", options: ["10% para um pedido maior", "50% para todos", "Nenhum desconto"], answer: "10% para um pedido maior" },
        { question: "O que mais o comprador pediu?", options: ["Frete grátis", "Um novo logotipo", "Uma reunião mais longa"], answer: "Frete grátis" },
        { question: "Como a negociação terminou?", options: ["Os dois lados apertaram as mãos e concordaram", "O acordo desmoronou", "Nunca mais falaram"], answer: "Os dois lados apertaram as mãos e concordaram" },
        { question: "Qual frase usaram no final?", options: ["Esperamos trabalhar com vocês", "Não queremos nos encontrar de novo", "Isso foi uma perda de tempo"], answer: "Esperamos trabalhar com vocês" },
      ],
    },
    {
      lessonId: 4,
      title: "Teste 4",
      subtitle: "Habilidades de Apresentação",
      passingScore: 7,
      questions: [
        { question: "Qual frase abre uma apresentação?", options: ["Bom dia a todos, obrigado por estarem aqui", "Adeus a todos", "Não tenho nada a dizer"], answer: "Bom dia a todos, obrigado por estarem aqui" },
        { question: "Qual frase avança para um novo ponto?", options: ["Vamos para o próximo slide", "O fim", "Nada"], answer: "Vamos para o próximo slide" },
        { question: "Qual frase encerra uma apresentação?", options: ["Resumindo, os pontos principais são...", "Esqueci o que ia dizer", "Vamos começar de novo"], answer: "Resumindo, os pontos principais são..." },
        { question: "Qual frase convida a perguntas?", options: ["Alguma pergunta?", "Não são permitidas perguntas", "É isso, tchau"], answer: "Alguma pergunta?" },
        { question: "Quem estava nervosa antes de sua primeira apresentação?", options: ["Linda", "Sara", "Clara"], answer: "Linda" },
        { question: "Como Linda estruturou a fala dela?", options: ["Problema, depois solução, depois resultados", "Sem nenhuma ordem", "Só piadas"], answer: "Problema, depois solução, depois resultados" },
        { question: "Quais foram os pontos principais que Linda resumiu?", options: ["Redução de custos e entrega mais rápida", "Decoração do escritório", "Cardápio do almoço"], answer: "Redução de custos e entrega mais rápida" },
        { question: "Como a equipe se sentiu sobre a apresentação de Linda?", options: ["Impressionada com o quão clara foi", "Confusa", "Saiu da sala"], answer: "Impressionada com o quão clara foi" },
        { question: "O que uma apresentação deve ter no início?", options: ["Uma ideia clara do que será discutido", "Nada, começar sem ordem", "Apenas a conclusão"], answer: "Uma ideia clara do que será discutido" },
        { question: "Qual frase ajuda a explicar um gráfico?", options: ["Como vocês podem ver neste gráfico...", "Não entendo este gráfico", "Gráficos não servem para nada"], answer: "Como vocês podem ver neste gráfico..." },
      ],
    },
    {
      lessonId: 5,
      title: "Teste 5",
      subtitle: "Reuniões Formais e Atas",
      passingScore: 7,
      questions: [
        { question: "Qual frase inicia uma reunião?", options: ["Podemos começar?", "A reunião foi cancelada", "Tchau"], answer: "Podemos começar?" },
        { question: "Qual frase interrompe educadamente?", options: ["Desculpe interromper, mas...", "Cale-se", "Pare de falar agora"], answer: "Desculpe interromper, mas..." },
        { question: "Qual frase pede para acrescentar algo?", options: ["Se eu puder acrescentar...", "Recuso-me a falar", "Isso é absurdo"], answer: "Se eu puder acrescentar..." },
        { question: "O que as atas de uma reunião registram?", options: ["O que foi discutido e decidido", "Só as piadas contadas", "Nada importante"], answer: "O que foi discutido e decidido" },
        { question: "O que são 'tarefas pendentes'?", options: ["Tarefas atribuídas, com responsável e prazo", "Lanches servidos na reunião", "O nome da reunião"], answer: "Tarefas atribuídas, com responsável e prazo" },
        { question: "A que horas começou a reunião de segunda-feira?", options: ["Às 9 horas", "Ao meio-dia", "Às 18 horas"], answer: "Às 9 horas" },
        { question: "O que Pedro sugeriu revisar?", options: ["O orçamento", "O cardápio", "O logotipo"], answer: "O orçamento" },
        { question: "Quem escreveu as atas?", options: ["A secretária", "Pedro", "Ninguém"], answer: "A secretária" },
        { question: "O que as atas incluíam?", options: ["Presentes, pauta e tarefas pendentes", "Só a data", "Só piadas"], answer: "Presentes, pauta e tarefas pendentes" },
        { question: "Como a equipe recebeu as atas?", options: ["Por e-mail no mesmo dia", "Nunca receberam", "Por correio um mês depois"], answer: "Por e-mail no mesmo dia" },
      ],
    },
    {
      lessonId: 6,
      title: "Teste 6",
      subtitle: "Escrita Empresarial: Relatórios e Propostas",
      passingScore: 7,
      questions: [
        { question: "Qual é a primeira parte de um relatório?", options: ["Introdução", "Recomendações", "Resultados"], answer: "Introdução" },
        { question: "Qual seção apresenta fatos e dados?", options: ["Resultados", "Introdução", "Conclusão"], answer: "Resultados" },
        { question: "Qual seção sugere próximos passos?", options: ["Recomendações", "Resultados", "Introdução"], answer: "Recomendações" },
        { question: "Qual frase apresenta o propósito de um relatório?", options: ["O propósito deste relatório é...", "Era uma vez...", "Fim."], answer: "O propósito deste relatório é..." },
        { question: "Qual frase apresenta dados?", options: ["Os dados mostram que...", "Acho que talvez...", "Quem sabe..."], answer: "Os dados mostram que..." },
        { question: "Sobre o que era o relatório?", options: ["Satisfação do cliente", "Férias dos funcionários", "Móveis de escritório"], answer: "Satisfação do cliente" },
        { question: "Que porcentagem de clientes estava satisfeita?", options: ["85%", "15%", "50%"], answer: "85%" },
        { question: "O que alguns clientes mencionaram?", options: ["Os tempos de resposta poderiam ser mais rápidos", "Os preços estavam baixos demais", "Nada"], answer: "Os tempos de resposta poderiam ser mais rápidos" },
        { question: "O que o relatório recomendou?", options: ["Contratar mais dois funcionários de atendimento ao cliente", "Fechar a empresa", "Reduzir o quadro de funcionários"], answer: "Contratar mais dois funcionários de atendimento ao cliente" },
        { question: "Qual foi a conclusão do relatório?", options: ["A satisfação está melhorando mas pequenas mudanças poderiam ajudar", "Tudo estava perfeito", "Tudo estava terrível"], answer: "A satisfação está melhorando mas pequenas mudanças poderiam ajudar" },
      ],
    },
    {
      lessonId: 7,
      title: "Teste 7",
      subtitle: "Português para Ligações e Videochamadas",
      passingScore: 7,
      questions: [
        { question: "Qual frase inicia uma ligação profissional?", options: ["Alô, aqui é o/a... da...", "Quem é você?", "O que você quer?"], answer: "Alô, aqui é o/a... da..." },
        { question: "Qual frase pede para alguém repetir?", options: ["Você poderia repetir isso, por favor?", "Não me importo com o que você disse", "Cale-se"], answer: "Você poderia repetir isso, por favor?" },
        { question: "Qual frase encerra uma ligação educadamente?", options: ["Obrigado pelo seu tempo", "Vou desligar agora", "Tanto faz"], answer: "Obrigado pelo seu tempo" },
        { question: "Qual frase verifica a conexão?", options: ["Você consegue me ouvir bem?", "Não me importo se você me ouve", "Essa ligação é chata"], answer: "Você consegue me ouvir bem?" },
        { question: "Quem ligou para o cliente?", options: ["Sara", "Linda", "Clara"], answer: "Sara" },
        { question: "Sobre o que era a ligação?", options: ["O pedido recente do cliente", "Uma entrevista de emprego", "Uma reclamação de barulho"], answer: "O pedido recente do cliente" },
        { question: "Qual problema aconteceu durante a ligação?", options: ["A ligação não estava muito clara", "A ligação caiu", "Ninguém atendeu"], answer: "A ligação não estava muito clara" },
        { question: "O que Sara disse que faria depois da ligação?", options: ["Enviar um e-mail para confirmar", "Ligar de novo em 5 minutos", "Nada"], answer: "Enviar um e-mail para confirmar" },
        { question: "Como a ligação terminou?", options: ["Educadamente, com agradecimento dos dois lados", "O cliente desligou bravo", "Nunca foi resolvida"], answer: "Educadamente, com agradecimento dos dois lados" },
        { question: "Qual frase é útil se você não entendeu algo?", options: ["Desculpe, a ligação não está muito clara", "Entendi tudo perfeitamente", "Por favor, pare de ligar"], answer: "Desculpe, a ligação não está muito clara" },
      ],
    },
    {
      lessonId: 8,
      title: "Teste 8",
      subtitle: "Networking e Conversa Informal",
      passingScore: 7,
      questions: [
        { question: "Qual é uma boa pergunta de conversa informal?", options: ["O que você faz da vida?", "Quanto dinheiro você ganha?", "Por que você está aqui?"], answer: "O que você faz da vida?" },
        { question: "Qual frase pede informações de contato?", options: ["Posso pegar seu cartão de visita?", "Me dê seu telefone agora", "Não preciso do seu contato"], answer: "Posso pegar seu cartão de visita?" },
        { question: "Qual tema é geralmente seguro para conversa informal?", options: ["Tendências do setor", "Salário", "Problemas pessoais"], answer: "Tendências do setor" },
        { question: "Qual tema geralmente deve ser evitado?", options: ["Política", "O próprio evento", "Viagens"], answer: "Política" },
        { question: "Onde Miguel conheceu alguém novo?", options: ["Em uma conferência", "Em um campo esportivo", "Em um restaurante"], answer: "Em uma conferência" },
        { question: "Qual pergunta Miguel fez?", options: ["O que você faz da vida?", "Quantos anos você tem?", "Onde você mora?"], answer: "O que você faz da vida?" },
        { question: "O que eles descobriram que tinham em comum?", options: ["Trabalhavam em setores parecidos", "Eram vizinhos", "Estudaram juntos"], answer: "Trabalhavam em setores parecidos" },
        { question: "Sobre o que conversaram por dez minutos?", options: ["Tendências do setor e viagens", "Só o clima", "Nada"], answer: "Tendências do setor e viagens" },
        { question: "O que Miguel pediu antes de sair?", options: ["Um cartão de visita", "Dinheiro", "Um presente"], answer: "Um cartão de visita" },
        { question: "Qual plataforma Miguel sugeriu para se conectar?", options: ["LinkedIn", "Qualquer plataforma aleatória", "Nenhuma plataforma"], answer: "LinkedIn" },
      ],
    },
    {
      lessonId: 9,
      title: "Teste 9",
      subtitle: "Resolução de Problemas e Tomada de Decisão",
      passingScore: 7,
      questions: [
        { question: "Qual frase identifica um problema?", options: ["Tivemos um problema com...", "Tudo está perfeito", "Não há problemas aqui"], answer: "Tivemos um problema com..." },
        { question: "Qual frase sugere uma solução?", options: ["E se nós...?", "Me recuso a pensar", "Nada pode ser feito"], answer: "E se nós...?" },
        { question: "Qual frase toma uma decisão final?", options: ["Vamos com essa opção", "Talvez outro dia", "Nunca consigo decidir"], answer: "Vamos com essa opção" },
        { question: "Com qual problema a equipe de logística se deparou?", options: ["Uma falha mecânica no caminhão de entrega", "Um funcionário ausente", "Um escritório fechado"], answer: "Uma falha mecânica no caminhão de entrega" },
        { question: "Qual solução um funcionário sugeriu?", options: ["Alugar um caminhão para as entregas de hoje", "Cancelar todas as entregas", "Esperar um mês"], answer: "Alugar um caminhão para as entregas de hoje" },
        { question: "O que o gerente decidiu?", options: ["Alugar um caminhão imediatamente", "Não fazer nada", "Demitir a equipe"], answer: "Alugar um caminhão imediatamente" },
        { question: "As entregas foram concluídas a tempo?", options: ["Sim, graças à decisão rápida", "Não, todas atrasaram", "O texto não diz"], answer: "Sim, graças à decisão rápida" },
        { question: "Qual frase mostra que algo causou um atraso?", options: ["Isso causou um atraso em...", "Tudo está no prazo", "Não há nenhum atraso"], answer: "Isso causou um atraso em..." },
        { question: "Qual frase oferece uma opção?", options: ["Uma opção seria...", "Não há opções", "Pare de sugerir coisas"], answer: "Uma opção seria..." },
        { question: "Por que essa linguagem é importante no trabalho?", options: ["Ajuda a identificar problemas e concordar com soluções rapidamente", "Só se usa em restaurantes", "Não tem uso real"], answer: "Ajuda a identificar problemas e concordar com soluções rapidamente" },
      ],
    },
    {
      lessonId: 10,
      title: "Teste 10",
      subtitle: "Comunicação Intercultural",
      passingScore: 7,
      questions: [
        { question: "Por que a consciência cultural importa no trabalho?", options: ["Ajuda a evitar mal-entendidos", "Não tem uso real", "Serve só para férias"], answer: "Ajuda a evitar mal-entendidos" },
        { question: "Qual frase ajuda a entender o estilo de outra cultura?", options: ["Você poderia me ajudar a entender como isso é feito no seu país?", "Seu jeito está errado", "Não me importo com sua cultura"], answer: "Você poderia me ajudar a entender como isso é feito no seu país?" },
        { question: "Qual frase verifica o entendimento educadamente?", options: ["Quero ter certeza de que entendi bem", "Não faz sentido o que você diz", "Esqueça isso"], answer: "Quero ter certeza de que entendi bem" },
        { question: "Qual é uma dica para uma comunicação clara?", options: ["Evitar expressões complicadas", "Falar o mais rápido possível", "Usar apenas gírias"], answer: "Evitar expressões complicadas" },
        { question: "Qual diferença a equipe notou?", options: ["Diferenças de franqueza e ritmo das reuniões", "Nenhuma diferença", "Só diferenças de comida"], answer: "Diferenças de franqueza e ritmo das reuniões" },
        { question: "O que o líder da equipe frequentemente perguntava?", options: ["Como as coisas são feitas no país do colega", "Nunca fazia perguntas", "Só sobre o clima"], answer: "Como as coisas são feitas no país do colega" },
        { question: "O que esse hábito ajudou a equipe a fazer?", options: ["Comunicar-se de forma mais respeitosa e eficaz", "Evitar se comunicar completamente", "Ignorar as diferenças culturais"], answer: "Comunicar-se de forma mais respeitosa e eficaz" },
        { question: "Como você deveria ser ao se comunicar entre culturas?", options: ["Paciente e respeitoso", "Apressado e rude", "Completamente calado"], answer: "Paciente e respeitoso" },
        { question: "O que ajuda a verificar o entendimento em uma conversa?", options: ["Perguntas simples de acompanhamento", "Ignorar quem fala", "Mudar de assunto imediatamente"], answer: "Perguntas simples de acompanhamento" },
        { question: "Sobre o que as culturas podem ter normas diferentes?", options: ["Tempo, formalidade e franqueza", "Só roupas", "Nada importante"], answer: "Tempo, formalidade e franqueza" },
      ],
    },
    {
      lessonId: 11,
      title: "Teste 11",
      subtitle: "Vocabulário de Liderança e Gestão",
      passingScore: 7,
      questions: [
        { question: "O que significa 'delegar'?", options: ["Dar uma tarefa a outra pessoa", "Ignorar uma tarefa", "Cancelar uma reunião"], answer: "Dar uma tarefa a outra pessoa" },
        { question: "O que significa 'motivar'?", options: ["Incentivar alguém a trabalhar bem", "Desanimar alguém", "Demitir alguém"], answer: "Incentivar alguém a trabalhar bem" },
        { question: "O que significa 'feedback'?", options: ["Comentários sobre o desempenho de alguém", "Um tipo de sala de reuniões", "Um feriado da empresa"], answer: "Comentários sobre o desempenho de alguém" },
        { question: "O que significa 'responsabilidade'?", options: ["Assumir suas ações e resultados", "Evitar a responsabilidade", "Trabalhar sempre sozinho"], answer: "Assumir suas ações e resultados" },
        { question: "O que José aprendeu a fazer como líder de equipe?", options: ["Delegar tarefas em vez de fazer tudo sozinho", "Fazer tudo sozinho", "Evitar dar feedback"], answer: "Delegar tarefas em vez de fazer tudo sozinho" },
        { question: "Que tipo de feedback José deu?", options: ["Claro e construtivo", "Só severo", "Nunca deu feedback"], answer: "Claro e construtivo" },
        { question: "Por que a equipe ficou mais motivada?", options: ["Se sentiram confiáveis e responsáveis", "Receberam mais férias", "Tiveram menos trabalho"], answer: "Se sentiram confiáveis e responsáveis" },
        { question: "O que aconteceu com o desempenho da equipe?", options: ["Melhorou significativamente", "Piorou", "Ficou exatamente igual"], answer: "Melhorou significativamente" },
        { question: "Qual frase dá feedback positivo?", options: ["Eu realmente aprecio o esforço que você colocou nisso", "Você nunca faz nada certo", "Não me importo com o seu trabalho"], answer: "Eu realmente aprecio o esforço que você colocou nisso" },
        { question: "Qual frase trata sobre responsabilidade?", options: ["Todos nós precisamos ser responsáveis pelos nossos prazos", "Os prazos não importam para ninguém", "Só você é responsável"], answer: "Todos nós precisamos ser responsáveis pelos nossos prazos" },
      ],
    },
    {
      lessonId: 12,
      title: "Teste 12",
      subtitle: "Revisão Final e Conversa Real de Negócios",
      passingScore: 7,
      questions: [
        { question: "Qual gramática foi revisada na Lição 1?", options: ["Condicionais", "Cores", "Números"], answer: "Condicionais" },
        { question: "Sobre o que era a Lição 3?", options: ["Linguagem de negociação", "Vocabulário de culinária", "Esportes"], answer: "Linguagem de negociação" },
        { question: "Qual habilidade a Lição 4 focou?", options: ["Habilidades de apresentação", "Jardinagem", "Dirigir"], answer: "Habilidades de apresentação" },
        { question: "Com o que Chantal tinha dificuldades no início?", options: ["Saudações simples", "Cálculos complicados", "Escrever músicas"], answer: "Saudações simples" },
        { question: "O que Chantal pode fazer agora?", options: ["Liderar reuniões, escrever relatórios e negociar com clientes internacionais", "Nada novo", "Só dizer saudações"], answer: "Liderar reuniões, escrever relatórios e negociar com clientes internacionais" },
        { question: "O que fez a maior diferença para Chantal segundo o texto?", options: ["Praticar conversas reais", "Ler só livros de gramática", "Evitar falar português no trabalho"], answer: "Praticar conversas reais" },
        { question: "Na ligação de exemplo, o que a pessoa B pediu?", options: ["Estender o prazo de entrega em uma semana", "Um desconto de 50%", "Cancelar o contrato"], answer: "Estender o prazo de entrega em uma semana" },
        { question: "Como a pessoa A respondeu ao pedido?", options: ["Aceitou verificar com a equipe e responder hoje", "Recusou imediatamente", "Desligou a ligação"], answer: "Aceitou verificar com a equipe e responder hoje" },
        { question: "Como a ligação de exemplo terminou?", options: ["Educadamente, esperando trabalhar juntos", "Em uma discussão", "Sem nenhuma resolução"], answer: "Educadamente, esperando trabalhar juntos" },
        { question: "O que Chantal está pronta para fazer agora?", options: ["Usar o português com confiança no trabalho", "Deixar o emprego dela", "Evitar o português empresarial"], answer: "Usar o português com confiança no trabalho" },
      ],
    },
  ],

  finalQuiz: {
    title: "Teste Final - Nível 3",
    subtitle: "Este teste cobre todas as lições do Nível 3.",
    passingScore: 15,
    questions: [
      { question: "Qual é uma frase de primeiro condicional?", options: ["Se terminarmos cedo, vamos enviar hoje", "Se eu tivesse asas, voaria", "Se choveu"], answer: "Se terminarmos cedo, vamos enviar hoje" },
      { question: "Qual verbo expressa uma obrigação forte?", options: ["dever", "poderia", "pode"], answer: "dever" },
      { question: "Qual frase faz uma oferta em uma negociação?", options: ["Podemos oferecer um desconto", "Recusamos falar", "Não há oferta"], answer: "Podemos oferecer um desconto" },
      { question: "Qual frase abre uma apresentação?", options: ["Bom dia a todos, obrigado por estarem aqui", "Adeus", "Não tenho nada a dizer"], answer: "Bom dia a todos, obrigado por estarem aqui" },
      { question: "Qual frase inicia uma reunião?", options: ["Podemos começar?", "A reunião foi cancelada", "Nenhuma opinião"], answer: "Podemos começar?" },
      { question: "Qual é a primeira parte de um relatório empresarial?", options: ["Introdução", "Recomendações", "Conclusão"], answer: "Introdução" },
      { question: "Qual frase inicia uma ligação profissional?", options: ["Alô, aqui é o/a... da...", "Quem é você?", "O que você quer?"], answer: "Alô, aqui é o/a... da..." },
      { question: "Qual tema é seguro para conversa informal?", options: ["Tendências do setor", "Salário", "Política"], answer: "Tendências do setor" },
      { question: "Qual frase identifica um problema?", options: ["Tivemos um problema com...", "Tudo está perfeito", "Não há problemas"], answer: "Tivemos um problema com..." },
      { question: "Qual frase ajuda com a comunicação intercultural?", options: ["Você poderia me ajudar a entender como isso é feito no seu país?", "Seu jeito está errado", "Não me importo com sua cultura"], answer: "Você poderia me ajudar a entender como isso é feito no seu país?" },
      { question: "O que significa 'delegar'?", options: ["Dar uma tarefa a outra pessoa", "Ignorar uma tarefa", "Cancelar uma reunião"], answer: "Dar uma tarefa a outra pessoa" },
      { question: "O que o fornecedor ofereceu na Lição 1?", options: ["Um desconto por um pedido maior", "Um presente grátis", "Nada"], answer: "Um desconto por um pedido maior" },
      { question: "Como Linda estruturou sua apresentação?", options: ["Problema, depois solução, depois resultados", "Sem nenhuma ordem", "Só piadas"], answer: "Problema, depois solução, depois resultados" },
      { question: "O que as atas da reunião incluíam?", options: ["Presentes, pauta e tarefas pendentes", "Só a data", "Só piadas"], answer: "Presentes, pauta e tarefas pendentes" },
      { question: "Que porcentagem de clientes estava satisfeita no relatório?", options: ["85%", "15%", "50%"], answer: "85%" },
      { question: "O que Sara disse que faria depois da ligação com o cliente?", options: ["Enviar um e-mail para confirmar", "Ligar de novo imediatamente", "Nada"], answer: "Enviar um e-mail para confirmar" },
      { question: "O que Miguel pediu à pessoa que conheceu?", options: ["Um cartão de visita", "Dinheiro", "Um presente"], answer: "Um cartão de visita" },
      { question: "Qual solução a equipe de logística escolheu?", options: ["Alugar um caminhão imediatamente", "Esperar um mês", "Cancelar as entregas"], answer: "Alugar um caminhão imediatamente" },
      { question: "O que ajudou a equipe de José a se motivar mais?", options: ["Sentirem-se confiáveis e responsáveis", "Receber mais férias", "Ter menos trabalho"], answer: "Sentirem-se confiáveis e responsáveis" },
      { question: "O que fez a maior diferença para Chantal no final?", options: ["Praticar conversas reais", "Ler só livros de gramática", "Evitar o português no trabalho"], answer: "Praticar conversas reais" },
    ],
  },
};
