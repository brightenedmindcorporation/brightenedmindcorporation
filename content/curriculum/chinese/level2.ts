import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, mirroring the English/Swahili/Spanish
// Level 2 topic plan: grammar, tenses, conversation, writing, listening,
// reading, vocabulary, pronunciation, situational, business basics, debate, review.
export const chineseLevel2: LevelCurriculum = {
  langCode: "ZH",
  langLabel: "Chinois",
  langSlug: "chinese",
  level: 2,
  levelTitle: "第二级 - 中级汉语 (Niveau 2 - Chinois Intermédiaire)",
  levelSubtitle: "Développez votre aisance avec la grammaire, la conversation et le chinois de la vie réelle.",

  lessons: [
    {
      id: 1,
      title: "语法复习：主语谓语宾语 (Révision de Grammaire : Sujet-Verbe-Objet)",
      subtitle: "Revoyez la structure de base de la phrase chinoise.",
      sections: [
        { heading: "句子结构 (Structure de phrase)", body: ["汉语语序是：主语 + 谓语 + 宾语 (Sujet + Verbe + Objet).", "我 (sujet) 吃 (verbe) 米饭 (objet)。 - Je mange du riz.", "汉语动词不变形，不需要和主语一致。(Les verbes chinois ne changent jamais de forme.)"] },
        { heading: "常见错误 (Erreurs courantes)", body: ["错：米饭我吃。对：我吃米饭。(Faux : Riz je mange. Correct : Je mange du riz.)", "很小心：汉语没有动词时态变化，而是用时间词或助词。(Le chinois n'a pas de conjugaison ; on utilise des mots de temps ou des particules.)"] },
        { heading: "习价语 (Expressions utiles)", body: ["我觉得... (wǒ juéde...) - Je pense que...", "我想... (wǒ xiǎng...) - Je veux...", "我需要... (wǒ xūyào...) - J'ai besoin de..."] },
      ],
      speakText: `汉语语序是主语、谓语、宾语。我吃米饭。

汉语动词不变形。没有时态变化。

我觉得。我想。我需要。`,
      videoTopic: "中文句子结构和常见错误讲解。",
      videoUrl: "https://www.youtube.com/watch?v=Slcag8GIMhM",
      readingTitle: "我叫格雷斯。(Je m'appelle Grace.)",
      reading: [
        "现在我在学中级汉语。(Maintenant j'apprends le chinois de niveau intermédiaire.)",
        "每天我都练习组正确的句子。(Chaque jour, je m'entraîne à former des phrases correctes.)",
        "我的老师说好的句子有清楚的主语和谓语。(Mon professeur dit qu'une bonne phrase a toujours un sujet clair et un verbe.)",
      ],
      readingSpeakText: `我叫格雷斯。现在我在学中级汉语。每天我都练习组正确的句子。`,
      exercises: ["找出三个句子中的主语和谓语。(Trouvez sujet et verbe dans trois phrases.)", "改正：米饭我吃。(Corrigez cette phrase.)", "用«我想»写两个句子。(Écrivez deux phrases avec « je veux ».)"],
      speakingTopic: "用你自己的话解释什么是主语和谓语。(Expliquez avec vos propres mots ce que sont le sujet et le verbe.)",
    },
    {
      id: 2,
      title: "过去和将来 (Passé et Futur)",
      subtitle: "Apprenez à parler de ce qui s'est passé et de ce qui arrivera.",
      sections: [
        { heading: "了 表示完成 (le « le » pour l'action accomplie)", body: ["动词 + 了 表示动作已经完成。", "昨天我去了市场。(zuótiān wǒ qùle shìchǎng.) - Hier, je suis allé au marché.", "我吃了晚餐。(wǒ chīle wǎnchān.) - J'ai mangé le dîner."] },
        { heading: "过 表示经验 (le « guo » pour l'expérience)", body: ["我去过中国。(wǒ qùguo Zhōngguó.) - Je suis déjà allé en Chine.", "你吃过寿司吗？(nǐ chīguo shùusī ma?) - As-tu déjà mangé des sushis ?"] },
        { heading: "将要和会 (Futur avec « jiangyao » et « hui »)", body: ["我将要去巴黎。(wǒ jiāngyào qù Bālí.) - Je vais aller à Paris.", "明天会下雨。(míngtiān huì xiàyǔ.) - Il pleuvra demain."] },
      ],
      speakText: `了表示完成。昨天我去了市场。

过表示经验。我去过中国。

将要和会表示将来。我将要去巴黎。明天会下雨。`,
      videoTopic: "比较«了»、«过»和«会»的用法。",
      videoUrl: "https://www.youtube.com/watch?v=lJsxzeIcYAQ",
      readingTitle: "去年，托马斯第一次去了卢本达里。(L'an dernier, Thomas est allé à Lubumbashi pour la première fois.)",
      reading: [
        "在等巴士时，他遇到了一个老朋友。(En attendant le bus, il a rencontré un vieil ami.)",
        "他们聊了快一个小时。(Ils ont discuté pendant presque une heure.)",
        "托马斯说他明年会再次去卢本达里。(Thomas a dit qu'il ira à nouveau à Lubumbashi l'an prochain.)",
      ],
      readingSpeakText: `去年，托马斯第一次去了卢本达里。在等巴士时，他遇到了一个老朋友。`,
      exercises: ["用«了»写三个关于昨天的句子。(Écrivez trois phrases sur hier avec « le ».)", "用«过»写一个句子。(Écrivez une phrase avec « guo ».)", "用«将要»说你明年的计划。(Parlez de vos projets pour l'an prochain avec « jiangyao ».)"],
      speakingTopic: "说一件你上周做过的事和一件你下周会做的事。(Parlez d'une chose faite la semaine dernière et d'une chose à faire la semaine prochaine.)",
    },
    {
      id: 3,
      title: "对话练习 (Pratique de la Conversation)",
      subtitle: "Pratiquez les questions et les conversations naturelles.",
      sections: [
        { heading: "问题类型 (Types de questions)", body: ["是不是问题：你喜欢咖啡吗？(Question oui/non)", "什么、哪里、什么时候、谁、为什么、怎么 - mots interrogatifs.", "你做什么工作？(nǐ zuò shénme gōngzuò?) - Que fais-tu comme travail ?"] },
        { heading: "保持对话 (Maintenir la conversation)", body: ["表示兴趣：是吗？真有趣！说来听听。", "问追问问题而不是只回答。A：我今天早上去了市场。B：哦，你买了什么？"] },
        { heading: "礼貌地赞成和反对 (Accord et désaccord poli)", body: ["我同意你。(wǒ tóngyì nǐ.) - Je suis d'accord avec toi.", "这是个好观点，但我觉得... - C'est un bon point, mais je pense que..."] },
      ],
      speakText: `是不是问题：你喜欢咖啡吗？什么、哪里、谁、为什么。

保持对话。真有趣！说来听听。

礼貌地赞成和反对。我同意你。这是个好观点，但我觉得。`,
      videoTopic: "在对话中练习追问问题。",
      videoUrl: "https://www.youtube.com/watch?v=H7oZTMGH0X4",
      readingTitle: "上个星期五，保罗认识了一位新同事克拉。(Vendredi dernier, Paul a rencontré une nouvelle collègue, Clara.)",
      reading: [
        "他问：«你从哪里来？»她说她来自高马。(Il a demandé : « D'où viens-tu ? » Elle a dit qu'elle venait de Goma.)",
        "保罗然后问了一个追问问题：«你在这里住多久了？» (Paul a ensuite posé une question de suivi.)",
        "克拉说这个城市很友好，但交通有点难。(Clara a dit que la ville était très amicale, mais que la circulation était un peu difficile.)",
      ],
      readingSpeakText: `上个星期五，保罗认识了一位新同事克拉。他问：你从哪里来？`,
      exercises: ["写三个可以问新同事的问题。(Écrivez trois questions pour un nouveau collègue.)", "练习一个先同意再反对的对话。(Pratiquez un dialogue avec accord puis désaccord poli.)"],
      speakingTopic: "和同学进行一次短对话，至少问两个追问问题。(Ayez une courte conversation avec deux questions de suivi.)",
    },
    {
      id: 4,
      title: "写作技巧 (Techniques d'Écriture)",
      subtitle: "Apprenez à organiser des idées en paragraphes clairs.",
      sections: [
        { heading: "段落结构 (Structure du paragraphe)", body: ["一个段落有一个主要观点。", "主题句：介绍主要观点。", "支持句：给出详节和例子。", "结论句：总结观点。"] },
        { heading: "连接词 (Mots de liaison)", body: ["增加：和、也、而且。", "对比：但是、不过、虽然。", "因果：因为、所以。", "顺序：首先、然后、最后。"] },
        { heading: "段落例子 (Exemple de paragraphe)", body: ["我喜欢学习汉语，因为它带给我很多机会。首先，我可以和更多人交流。然后，我更好地理解中国电影。但是，学新语言需要时间和耐心。所以，我每天都练习。"] },
      ],
      speakText: `一个段落有一个主要观点。主题句介绍观点。支持句给出详节。

连接词。增加：和、也。对比：但是、虽然。因果：因为、所以。`,
      videoTopic: "观察连接词如何在段落中连接观点。",
      videoUrl: "https://www.youtube.com/watch?v=NrLhdYJO1Y4",
      readingTitle: "我为什么喜欢阅读 (Pourquoi j'aime lire)",
      reading: [
        "我喜欢阅读，因为它帮我在漫长的一天后放松。(J'aime lire car cela m'aide à me détendre après une longue journée.)",
        "首先，我在家里找一个安静的地方。(D'abord, je trouve un endroit calme chez moi.)",
        "然后，我读大概三十分钟。(Ensuite, je lis environ trente minutes.)",
        "虽然有时我会睡着，但我每次都学到新的东西。(Même si je m'endors parfois, j'apprends toujours quelque chose.)",
      ],
      readingSpeakText: `我喜欢阅读，因为它帮我在漫长的一天后放松。首先，我在家里找一个安静的地方。`,
      exercises: ["写一个关于你最喜欢的爱好的主题句。(Écrivez une phrase thème sur votre loisir préféré.)", "用«因为»和«虽然»写两个句子。(Écrivez deux phrases avec « parce que » et « bien que ».)", "写一个关于你典型一天的短段落。(Écrivez un court paragraphe sur une journée typique.)"],
      speakingTopic: "用清楚的主题句和支持详节描述你最喜欢的爱好。(Décrivez votre loisir préféré avec une phrase thème claire.)",
    },
    {
      id: 5,
      title: "听力练习 (Compétences d'Écoute)",
      subtitle: "Apprenez des stratégies pour mieux comprendre le chinois parlé.",
      sections: [
        { heading: "听力技巧 (Techniques d'écoute)", body: ["先听关键词，而不是每个字。(Écoutez les mots-clés, pas chaque mot.)", "预测说话人接下来会说什么。(Anticipez ce que le locuteur va dire.)", "实际口语汉语速度很快，不要气馅。(Le chinois parlé réel est rapide, ne vous découragez pas.)"] },
        { heading: "常见口语表达 (Expressions parlées courantes)", body: ["真的吗？(zhēn de ma?) - Vraiment ?", "我昏。(wǒ mí - populaire pour « je ne comprends pas »)—不，我不昋。(je ne comprends pas)", "等等！(dĕngdĕng!) - Attends !"] },
        { heading: "听录音建议 (Conseils d'écoute)", body: ["听歌和播客。(Écoutez des chansons et des podcasts.)", "重复听同一段对话。(Écoutez le même dialogue plusieurs fois.)"] },
      ],
      speakText: `先听关键词，而不是每个字。预测说话人接下来会说什么。

真的吗？我不昋。等等！

听歌和播客。重复听同一段对话。`,
      videoTopic: "听力策略和常见口语表达。",
      videoUrl: "https://www.youtube.com/watch?v=WASYoPoZU_0",
      readingTitle: "我叫费利克斯。(Je m'appelle Félix.)",
      reading: [
        "刚开始学汉语时，我很难理解快速的对话。(Au début, j'avais du mal à comprendre les dialogues rapides.)",
        "现在，我每天都听中文播客。(Maintenant, j'écoute un podcast chinois chaque jour.)",
        "我学到了先听关键词，这帮了我很大。(J'ai appris à écouter les mots-clés, et cela m'a beaucoup aidé.)",
      ],
      readingSpeakText: `我叫费利克斯。刚开始学汉语时，我很难理解快速的对话。`,
      exercises: ["写出三个常见的口语表达。(Écrivez trois expressions parlées courantes.)", "解释为什么关键词比每个字更重要。(Expliquez pourquoi les mots-clés sont plus importants que chaque mot.)"],
      speakingTopic: "说出你在听中文时遇到的一个困难，和你怎么克服它。(Parlez d'une difficulté d'écoute et de comment vous l'avez surmontée.)",
    },
    {
      id: 6,
      title: "阅读理解 (Compréhension de Lecture)",
      subtitle: "Pratiquez la lecture de textes plus longs et la recherche d'informations.",
      sections: [
        { heading: "阅读技巧 (Techniques de lecture)", body: ["浏览：先快速浏览文本的大意。(Survol : lisez d'abord pour saisir l'idée générale.)", "扫读：寻找特定的信息。(Lecture rapide : cherchez une information précise.)", "根据上下文猜测新词。(Devinez les mots nouveaux grace au contexte.)"] },
        { heading: "文本结构 (Structure du texte)", body: ["开头通常介绍主题。(L'introduction présente souvent le sujet.)", "中间部分给出详节。(Le milieu donne des détails.)", "结尾总结或给出结论。(La fin résume ou conclut.)"] },
      ],
      speakText: `浏览，快速抓住大意。扫读，寻找特定信息。根据上下文猜测新词。

开头介绍主题。中间给出详节。结尾总结。`,
      videoTopic: "在真实文本中练习浏览和扫读。",
      videoUrl: "https://www.youtube.com/watch?v=Of41QzrUvCI",
      readingTitle: "一封来自学校的通知 (Une annonce de l'école)",
      reading: [
        "亲爱的家长，学校将在下个星期五舞办一场文化活动。(Chers parents, l'école organisera un événement culturel vendredi prochain.)",
        "活动将从下午三点开始，在学校操场举行。(L'événement commencera à 15h, sur le terrain de l'école.)",
        "请带孩子们准时到达，并穿着传统服装。(Veuillez amener vos enfants à l'heure, en tenue traditionnelle.)",
      ],
      readingSpeakText: `亲爱的家长，学校将在下个星期五舞办一场文化活动。`,
      exercises: ["活动几点开始？(À quelle heure commence l'événement ?)", "家长应该让孩子穿什么？(Que doivent porter les enfants ?)", "找出文本中的一个新词并猜测它的意思。(Trouvez un mot nouveau et devinez son sens.)"],
      speakingTopic: "总结这片通知的主要内容。(Résumez l'idée principale de cette annonce.)",
    },
    {
      id: 7,
      title: "词汇扩展：情感和意见 (Vocabulaire Élargi : Émotions et Opinions)",
      subtitle: "Exprimez vos sentiments et vos opinions avec plus de précision.",
      sections: [
        { heading: "情感词汇 (Vocabulaire des émotions)", body: ["兴奋 (xīngfèn) - Excité", "焦虑 (jiāolǔ) - Anxieux", "失望 (shīwàng) - Décu", "自豪 (zìháo) - Fier", "愚蠢（小心！） - N'utilisez pas ce mot pour quelqu'un !"] },
        { heading: "表达意见 (Exprimer une opinion)", body: ["我觉得... (wǒ juéde...) - Je pense que...", "在我看来... (zài wǒ kànlái...) - À mon avis...", "我对...有保留意见。(wǒ duì... yǒu bǎoliú yìjiàn.) - J'ai des réserves sur..."] },
      ],
      speakText: `兴奋、焦虑、失望、自豪。

我觉得。在我看来。我对此有保留意见。`,
      videoTopic: "实际情境中表达情感和意见。",
      videoUrl: "https://www.youtube.com/watch?v=-UJZSUjJuCo",
      readingTitle: "考试前，苏纳感到非常焦虑。(Avant l'examen, Sonia était très anxieuse.)",
      reading: [
        "但当她看到成绩时，她感到非常兴奋和自豪。(Mais en voyant son résultat, elle a ressenti excitation et fierté.)",
        "她的朋友没有通过，感到有些失望。(Son amie n'a pas réussi, et s'est sentie un peu déçue.)",
      ],
      readingSpeakText: `考试前，苏纳感到非常焦虑。但当她看到成绩时，她感到非常兴奋和自豪。`,
      exercises: ["用四个情感词写句子。(Écrivez des phrases avec quatre mots d'émotion.)", "用«我觉得»表达你对学中文的意见。(Donnez votre opinion sur l'apprentissage du chinois.)"],
      speakingTopic: "描述你最近感到兴奋或焦虑的一件事。(Décrivez quelque chose qui vous a rendu excité ou anxieux récemment.)",
    },
    {
      id: 8,
      title: "发音和语调 (Prononciation et Intonation)",
      subtitle: "Affinez votre prononciation et le rythme naturel du chinois.",
      sections: [
        { heading: "困难音 (Sons difficiles)", body: ["zh/ch/sh 和 z/c/s 的区别。(Différence entre les sons rétroflères et non-rétroflères.)", "叫 (jiào) vs 小 (xiǎo) — 注意声调。(Attention aux tons similaires.)"] },
        { heading: "轻声 (Le ton neutre)", body: ["在轻声中，音节发得很轻。(Dans le ton neutre, la syllabe se prononce légèrement.)", "吗、吧、了、的 - 常见的轻声字。"] },
        { heading: "语调节奏 (Rythme de phrase)", body: ["口语汉语速度很快，但有自己的节奏。", "多听多说，节奏会变得自然。"] },
      ],
      speakText: `zh、ch、sh和z、c、s的区别非常重要。

在轻声中，音节发得很轻。吗、吧、了、的。

多听多说，节奏会变得自然。`,
      videoTopic: "练习困难音和轻声。",
      videoUrl: "https://www.youtube.com/watch?v=hWN-JVxNYZE",
      readingTitle: "我叫费恩—我在学发音。(Je m'appelle Faith et j'apprends la prononciation.)",
      reading: [
        "我尝试区分zh和z的发音。(J'essaie de distinguer les sons zh et z.)",
        "我跟老师重复说轻声字。(Je répète les mots en ton neutre après mon professeur.)",
        "每天练习让我的发音更清晰。(S'entraîner chaque jour rend ma prononciation plus claire.)",
      ],
      readingSpeakText: `我叫费恩—我在学发音。我尝试区分zh和z的发音。`,
      exercises: ["大声说zh、ch、sh和z、c、s。(Prononcez à voix haute.)", "找出五个常见的轻声字。(Trouvez cinq mots courants en ton neutre.)"],
      speakingTopic: "总结你自己的发音难点。(Expliquez vos propres difficultés de prononciation.)",
    },
    {
      id: 9,
      title: "情景对话：餐厅和店铺 (Situations : Restaurant et Magasins)",
      subtitle: "Pratiquez le chinois pour les situations de la vie quotidienne.",
      sections: [
        { heading: "在餐厅 (Au restaurant)", body: ["我要订一个位子。(wǒ yào dìng yí ge wèizi.) - Je veux réserver une table.", "请给我菜单。(qǐng gěi wǒ càidān.) - La carte, s'il vous plaît.", "结账，谢谢。(jiézhàng, xièxie.) - L'addition, merci."] },
        { heading: "在商店 (Dans un magasin)", body: ["这个多少钱？(zhè ge duōshǎo qián?) - Combien ça coûte ?", "可以便宜一些吗？(kěyǐ piányí yìxiē ma?) - Pouvez-vous baisser le prix ?", "我只是看看。(wǒ zhǐ shì kànkan.) - Je regarde seulement."] },
      ],
      speakText: `我要订一个位子。请给我菜单。结账，谢谢。

这个多少钱？可以便宜一些吗？我只是看看。`,
      videoTopic: "在餐厅和商店里的对话示例。",
      videoUrl: "https://www.youtube.com/watch?v=Vp1gs9bNR0Y",
      readingTitle: "昨天，姆姆和哥哥去餐厅吃饭。(Hier, Marie et son frère sont allés manger au restaurant.)",
      reading: [
        "服务员给他们菜单，姆姆说：«我要一个鱼。» (Le serveur leur a donné la carte, Marie a dit : « Je veux un poisson. »)",
        "吃完以后，哥哥说：«结账，谢谢。» (Après avoir mangé, le frère a dit : « L'addition, merci. »)",
      ],
      readingSpeakText: `昨天，姆姆和哥哥去餐厅吃饭。服务员给他们菜单。`,
      exercises: ["角角演练一个点餐对话。(Jouez un dialogue de commande au restaurant.)", "角角演练一个讨价对话。(Jouez un dialogue de négociation de prix.)"],
      speakingTopic: "角角演练在餐厅订餐和付账。(Jouez une commande et un paiement au restaurant.)",
    },
    {
      id: 10,
      title: "商业汉语基础 (Bases du Chinois des Affaires)",
      subtitle: "Apprenez le vocabulaire de base pour le travail et les affaires.",
      sections: [
        { heading: "商业词汇 (Vocabulaire des affaires)", body: ["会议 (huìyì) - Réunion", "客户 (kèhù) - Client", "邮件 (yóujiàn) - Email", "截止日期 (jiézhǐ rìqī) - Date limite", "预算 (yùsuàn) - Budget"] },
        { heading: "商业邮件语言 (Langage des emails professionnels)", body: ["尊敬的... (zūnjìng de...) - Cher...", "谢谢您的回复。(xièxie nín de huífù.) - Merci pour votre réponse.", "期待您的回应。(qīdài nín de huíyìng.) - Dans l'attente de votre réponse."] },
      ],
      speakText: `会议、客户、邮件、截止日期、预算。

尊敬的。谢谢您的回复。期待您的回应。`,
      videoTopic: "简单商业会议和邮件语言。",
      videoUrl: "https://www.youtube.com/watch?v=sex51Ozy0Es",
      readingTitle: "李先生于上周和客户开了会。(M. Li a eu une réunion avec un client la semaine dernière.)",
      reading: [
        "会后，他写了一封邮件感谢客户。(Après la réunion, il a écrit un email pour remercier le client.)",
        "邮件中，他说项目的截止日期是下个月。(Dans l'email, il a dit que la date limite du projet était le mois prochain.)",
      ],
      readingSpeakText: `李先生于上周和客户开了会。会后，他写了一封邮件感谢客户。`,
      exercises: ["写出五个商业词汇。(Écrivez cinq mots d'affaires.)", "写一封简单的商业邮件。(Écrivez un court email professionnel.)"],
      speakingTopic: "角角演练一个和客户的简短会议。(Jouez une courte réunion avec un client.)",
    },
    {
      id: 11,
      title: "辩论和表达观点 (Débat et Expression d'Opinions)",
      subtitle: "Apprenez à structurer et défendre une opinion.",
      sections: [
        { heading: "提出观点 (Présenter un point de vue)", body: ["我认为... 因为... (wǒ rènwéi... yīnwèi...) - Je crois que... parce que...", "根据我的经验... (gēnjù wǒ de jīngyàn...) - D'après mon expérience..."] },
        { heading: "反驳观点 (Réfuter un point de vue)", body: ["我理解你的观点，但是... - Je comprends ton point, mais...", "这个说法没有考虑到... - Cet argument ne tient pas compte de..."] },
        { heading: "辩论主题示例 (Exemples de sujets de débat)", body: ["孩子应该有手机吗？(Les enfants devraient-ils avoir un téléphone ?)", "线上学习比现场学习更好吗？(L'apprentissage en ligne est-il meilleur qu'en présentiel ?)"] },
      ],
      speakText: `我认为... 因为... 根据我的经验...

我理解你的观点，但是。这个说法没有考虑到。`,
      videoTopic: "观察一场关于教育的简单辩论。",
      videoUrl: "https://www.youtube.com/watch?v=V5hL-RYQYMg",
      readingTitle: "在班上，学生们辩论孩子是否应该有手机。(En classe, les élèves débattaient si les enfants devraient avoir un téléphone.)",
      reading: [
        "林说：«我认为孩子需要手机，因为安全很重要。» (Lin a dit : « Je crois que les enfants ont besoin d'un téléphone, car la sécurité est importante. »)",
        "娜回应：«我理解你的观点，但是过度使用手机会影响学习。» (Nana a répondu : « Je comprends ton point, mais trop utiliser un téléphone affecte les études. »)",
      ],
      readingSpeakText: `在班上，学生们辩论孩子是否应该有手机。林说：我认为孩子需要手机。`,
      exercises: ["选择一个辩论主题，写两个支持的理由。(Choisissez un sujet de débat et donnez deux arguments pour.)", "写一个反驳观点。(Écrivez une réfutation.)"],
      speakingTopic: "选择一个主题，参加简单辩论。(Choisissez un sujet et participez à un débat simple.)",
    },
    {
      id: 12,
      title: "期末复习和对话 (Révision Finale et Conversation)",
      subtitle: "Revoyez tout ce que vous avez appris au Niveau 2.",
      sections: [
        {
          heading: "我们学到的 (Ce que nous avons appris)",
          body: [
            "语法：句子结构、过去和将来 (Grammaire : structure, passé, futur)",
            "对话和写作技巧 (Conversation et écriture)",
            "听力和阅读策略 (Écoute et lecture)",
            "情感词汇和发音 (Vocabulaire des émotions et prononciation)",
            "情景对话和商业汉语 (Situations et chinois des affaires)",
            "辩论和观点表达 (Débat et opinions)",
          ],
        },
        {
          heading: "对话示例 (Exemple de conversation)",
          body: [
            "A：你对线上学习有什么看法？ (Que penses-tu de l'apprentissage en ligne ?)",
            "B：我觉得它很方便，但我更喜欢现场学习。(Je pense que c'est pratique, mais je préfère le présentiel.)",
            "A：我理解你的观点，但现场学习成本更高。(Je comprends ton point, mais le présentiel coûte plus cher.)",
          ],
        },
      ],
      speakText: `我们学到了语法、对话技巧、写作、听力、阅读、情感词汇、发音、情景对话、商业汉语和辩论。

你对线上学习有什么看法？我觉得它很方便，但我更喜欢现场学习。`,
      videoTopic: "复习第二级的语法和对话技巧。",
      videoUrl: "https://www.youtube.com/watch?v=08wCm-hzVZc",
      readingTitle: "上个月，苏竒参加了一个关于教育的辩论比赛。(Le mois dernier, Suzanne a participé à un concours de débat sur l'éducation.)",
      reading: [
        "她准备了很多观点和例子。(Elle a préparé beaucoup d'arguments et d'exemples.)",
        "比赛时，她礼貌地反驳了对手的观点。(Pendant le concours, elle a poliment réfuté le point de vue de son adversaire.)",
        "最后，她得到了很好的成绩。(À la fin, elle a obtenu un très bon résultat.)",
      ],
      readingSpeakText: `上个月，苏竒参加了一个关于教育的辩论比赛。她准备了很多观点和例子。`,
      exercises: ["用汉语表达你对一个话题的观点。(Exprimez votre opinion sur un sujet.)", "写一个包含«了»、«过»和«将要»的段落。(Écrivez un paragraphe avec « le », « guo » et « jiangyao ».)"],
      speakingTopic: "选择一个主题，表达你的观点并回应一个反对观点。(Choisissez un sujet, exprimez votre opinion et répondez à une objection.)",
    },
  ],

  quizzes: [
    { lessonId: 1, title: "测验 1", subtitle: "语法复习", passingScore: 7, questions: [
      { question: "汉语语序是什么？(Quel est l'ordre des mots en chinois ?)", options: ["主语+谓语+宾语 (sujet-verbe-objet)", "宾语+主语+谓语", "谓语+主语+宾语"], answer: "主语+谓语+宾语 (sujet-verbe-objet)" },
      { question: "汉语动词会因主语改变吗？(Les verbes chinois changent-ils selon le sujet ?)", options: ["不会 (Non)", "会 (Oui)", "有时会"], answer: "不会 (Non)" },
      { question: "«我觉得»是什么意思？", options: ["Je pense que", "Je veux", "Je suis"], answer: "Je pense que" },
      { question: "哪个句子正确？(Quelle phrase est correcte ?)", options: ["我吃米饭。", "米饭我吃。", "吃我米饭。"], answer: "我吃米饭。" },
      { question: "«我需要»是什么意思？", options: ["J'ai besoin de", "Je veux", "Je pense"], answer: "J'ai besoin de" },
      { question: "课文中的女孩叫什么？(Comment s'appelle la fille du texte ?)", options: ["格雷斯 (Grace)", "莉莎", "安娜"], answer: "格雷斯 (Grace)" },
      { question: "格雷斯每天做什么？(Que fait Grace chaque jour ?)", options: ["练习组句子 (s'entraîner à former des phrases)", "睡觉", "做饭"], answer: "练习组句子 (s'entraîner à former des phrases)" },
      { question: "好的句子需要什么？(De quoi a besoin une bonne phrase ?)", options: ["清楚的主语和谓语 (sujet et verbe clairs)", "只需要宾语", "什么都不需要"], answer: "清楚的主语和谓语 (sujet et verbe clairs)" },
      { question: "«我想»是什么意思？", options: ["Je veux", "Je suis", "J'ai"], answer: "Je veux" },
      { question: "汉语没有什么？(Que n'a pas le chinois ?)", options: ["动词变形 (conjugaison des verbes)", "主语", "宾语"], answer: "动词变形 (conjugaison des verbes)" },
    ]},
    { lessonId: 2, title: "测验 2", subtitle: "过去和将来", passingScore: 7, questions: [
      { question: "«了»表示什么？", options: ["已完成的动作 (action accomplie)", "将来的动作", "正在进行的动作"], answer: "已完成的动作 (action accomplie)" },
      { question: "«过»表示什么？", options: ["经验 (expérience)", "未来", "现在"], answer: "经验 (expérience)" },
      { question: "«我将要去巴黎»是什么时态？", options: ["将来 (futur)", "过去", "现在"], answer: "将来 (futur)" },
      { question: "课文中的男人叫什么？(Comment s'appelle l'homme du texte ?)", options: ["托马斯 (Thomas)", "大卫", "凯文"], answer: "托马斯 (Thomas)" },
      { question: "托马斯在等公交车时遇到了谁？(Qui a-t-il rencontré ?)", options: ["一个老朋友 (un vieil ami)", "他的老师", "他的妹妹"], answer: "一个老朋友 (un vieil ami)" },
      { question: "托马斯计划什么时候再去卢本达里？(Quand prévoit-il de retourner ?)", options: ["明年 (l'an prochain)", "今天", "上周"], answer: "明年 (l'an prochain)" },
      { question: "«我去过中国»是什么意思？", options: ["Je suis déjà allé en Chine", "Je vais en Chine", "J'aime la Chine"], answer: "Je suis déjà allé en Chine" },
      { question: "«明天会下雨»是什么时态？", options: ["将来 (futur)", "过去", "完成"], answer: "将来 (futur)" },
      { question: "«我吃了晚餐»是什么意思？", options: ["J'ai mangé le dîner", "Je vais manger le dîner", "Je mange le dîner"], answer: "J'ai mangé le dîner" },
      { question: "托马斯会邀请谁一起去？(Qui invitera-t-il ?)", options: ["他的朋友 (son ami)", "他的学生", "他的老板"], answer: "他的朋友 (son ami)" },
    ]},
    { lessonId: 3, title: "测验 3", subtitle: "对话练习", passingScore: 7, questions: [
      { question: "«你做什么工作？»是什么意思？", options: ["Que fais-tu comme travail ?", "Où habites-tu ?", "Quel âge as-tu ?"], answer: "Que fais-tu comme travail ?" },
      { question: "«我同意你»是什么意思？", options: ["Je suis d'accord avec toi", "Je ne suis pas d'accord", "Je ne sais pas"], answer: "Je suis d'accord avec toi" },
      { question: "课文中的女孩叫什么？(Comment s'appelle la fille du texte ?)", options: ["克拉 (Clara)", "苏竒", "安娜"], answer: "克拉 (Clara)" },
      { question: "克拉从哪里来？(D'où vient Clara ?)", options: ["高马 (Goma)", "巴黎", "伦敦"], answer: "高马 (Goma)" },
      { question: "克拉觉得这个城市怎么样？", options: ["很友好，但交通难 (amicale mais circulation difficile)", "很无趣", "很危险"], answer: "很友好，但交通难 (amicale mais circulation difficile)" },
      { question: "哪个是追问问题的例子？(Lequel est un exemple de question de suivi ?)", options: ["你在这里住多久了？", "你好", "再见"], answer: "你在这里住多久了？" },
      { question: "«这是个好观点，但我觉得...»用于什么？", options: ["礼貌地表达反对 (exprimer poliment un désaccord)", "问候", "说再见"], answer: "礼貌地表达反对 (exprimer poliment un désaccord)" },
      { question: "«是吗？真有趣！»表达什么？", options: ["兴趣 (intérêt)", "生气", "悲伤"], answer: "兴趣 (intérêt)" },
      { question: "保罗和克拉是什么关系？(Quelle est la relation entre Paul et Clara ?)", options: ["同事 (collègues)", "兄妹", "邻居"], answer: "同事 (collègues)" },
      { question: "常见问题词有哪些？(Quels sont les mots interrogatifs courants ?)", options: ["什么、哪里、谁 (quoi, où, qui)", "和、但是", "一、二"], answer: "什么、哪里、谁 (quoi, où, qui)" },
    ]},
    { lessonId: 4, title: "测验 4", subtitle: "写作技巧", passingScore: 7, questions: [
      { question: "主题句的作用是什么？(À quoi sert la phrase thème ?)", options: ["介绍主要观点 (présenter l'idée principale)", "结束段落", "提供例子"], answer: "介绍主要观点 (présenter l'idée principale)" },
      { question: "«因为»属于哪一类连接词？", options: ["因果 (cause et effet)", "对比", "增加"], answer: "因果 (cause et effet)" },
      { question: "«但是»属于哪一类连接词？", options: ["对比 (contraste)", "增加", "顺序"], answer: "对比 (contraste)" },
      { question: "课文的标题是什么？(Quel est le titre du texte ?)", options: ["我为什么喜欢阅读 (Pourquoi j'aime lire)", "我的家庭", "我的工作"], answer: "我为什么喜欢阅读 (Pourquoi j'aime lire)" },
      { question: "作者为什么喜欢阅读？(Pourquoi aime-t-elle lire ?)", options: ["帮她放松 (ça l'aide à se détendre)", "让她发胖", "让她哭"], answer: "帮她放松 (ça l'aide à se détendre)" },
      { question: "她每次阅读大概多久？(Combien de temps lit-elle environ ?)", options: ["三十分钟 (trente minutes)", "一小时", "五分钟"], answer: "三十分钟 (trente minutes)" },
      { question: "«虽然»表示什么？", options: ["对比/让步 (concession/contraste)", "因果", "增加"], answer: "对比/让步 (concession/contraste)" },
      { question: "支持句的作用是什么？(À quoi servent les phrases de soutien ?)", options: ["给出详节和例子 (donner des détails et exemples)", "结束段落", "开始段落"], answer: "给出详节和例子 (donner des détails et exemples)" },
      { question: "«所以»属于哪一类连接词？", options: ["因果 (cause et effet)", "增加", "对比"], answer: "因果 (cause et effet)" },
      { question: "«首先、然后、最后»属于哪一类？", options: ["顺序 (séquence)", "因果", "对比"], answer: "顺序 (séquence)" },
    ]},
    { lessonId: 5, title: "测验 5", subtitle: "听力练习", passingScore: 7, questions: [
      { question: "听力技巧建议先做什么？(Que conseille-t-on de faire en priorité pour l'écoute ?)", options: ["听关键词 (écouter les mots-clés)", "听每个字", "闭眼"], answer: "听关键词 (écouter les mots-clés)" },
      { question: "«真的吗？»表达什么？", options: ["惊讶/确认 (surprise/confirmation)", "告别", "爱"], answer: "惊讶/确认 (surprise/confirmation)" },
      { question: "课文中的人叫什么？(Comment s'appelle la personne du texte ?)", options: ["费利克斯 (Félix)", "莉莎", "凯文"], answer: "费利克斯 (Félix)" },
      { question: "费利克斯现在每天做什么？(Que fait-il chaque jour maintenant ?)", options: ["听中文播客 (il écoute un podcast chinois)", "看电视", "坐公交车"], answer: "听中文播客 (il écoute un podcast chinois)" },
      { question: "«等等！»是什么意思？", options: ["Attends !", "Au revoir", "Merci"], answer: "Attends !" },
      { question: "实际口语汉语速度怎么样？(Comment est le chinois parlé réel ?)", options: ["很快 (rapide)", "很慢", "没有声音"], answer: "很快 (rapide)" },
      { question: "多听什么有帮助？(Qu'est-ce qui aide à écouter plus ?)", options: ["歌和播客 (chansons et podcasts)", "书本", "数字"], answer: "歌和播客 (chansons et podcasts)" },
      { question: "«我不昋»是什么意思？", options: ["Je ne comprends pas", "Je comprends", "Je sais"], answer: "Je ne comprends pas" },
      { question: "听到难段子应该怎么做？(Que faire face à un passage difficile ?)", options: ["重复听 (l'écouter plusieurs fois)", "放弃", "念诌"], answer: "重复听 (l'écouter plusieurs fois)" },
      { question: "费利克斯刚开始学中文时怎么样？(Comment était-il au début ?)", options: ["难理解快速对话 (il avait du mal à comprendre)", "很容易", "很没趣"], answer: "难理解快速对话 (il avait du mal à comprendre)" },
    ]},
    { lessonId: 6, title: "测验 6", subtitle: "阅读理解", passingScore: 7, questions: [
      { question: "«浏览»是什么意思？", options: ["快速抓住大意 (survoler)", "慢慢读", "背诵"], answer: "快速抓住大意 (survoler)" },
      { question: "«扫读»用于什么？", options: ["寻找特定信息 (chercher une information précise)", "写文章", "睡觉"], answer: "寻找特定信息 (chercher une information précise)" },
      { question: "活动几点开始？(À quelle heure commence l'événement de l'annonce ?)", options: ["下午三点 (15h)", "上午九点", "晚上七点"], answer: "下午三点 (15h)" },
      { question: "孩子们应该穿什么？(Que doivent porter les enfants ?)", options: ["传统服装 (tenue traditionnelle)", "制服", "注音服"], answer: "传统服装 (tenue traditionnelle)" },
      { question: "文本开头通常有什么？(Que contient généralement le début d'un texte ?)", options: ["主题 (le sujet)", "结论", "问题"], answer: "主题 (le sujet)" },
      { question: "活动在哪里举行？(Où a lieu l'événement ?)", options: ["学校操场 (terrain de l'école)", "图书馆", "市场"], answer: "学校操场 (terrain de l'école)" },
      { question: "«根据上下文猜测»是什么意思？", options: ["Deviner grace au contexte", "Traduire mot à mot", "Ignorer le mot"], answer: "Deviner grace au contexte" },
      { question: "文本结尾通常有什么？(Que contient généralement la fin d'un texte ?)", options: ["总结或结论 (résumé ou conclusion)", "主题", "开头"], answer: "总结或结论 (résumé ou conclusion)" },
      { question: "这封通知是写给谁的？(À qui s'adresse cette annonce ?)", options: ["家长 (les parents)", "老师", "客户"], answer: "家长 (les parents)" },
      { question: "活动的主题是什么？(Quel est le thème de l'événement ?)", options: ["文化 (culture)", "体育", "科学"], answer: "文化 (culture)" },
    ]},
    { lessonId: 7, title: "测验 7", subtitle: "词汇扩展", passingScore: 7, questions: [
      { question: "«兴奋»是什么意思？", options: ["Excité", "Triste", "Fatigué"], answer: "Excité" },
      { question: "«焦虑»是什么意思？", options: ["Anxieux", "Heureux", "Calme"], answer: "Anxieux" },
      { question: "«在我看来...»用于什么？", options: ["表达意见 (exprimer une opinion)", "问候", "说再见"], answer: "表达意见 (exprimer une opinion)" },
      { question: "课文中的女孩叫什么？(Comment s'appelle la fille du texte ?)", options: ["苏纳 (Sonia)", "克拉", "莉莎"], answer: "苏纳 (Sonia)" },
      { question: "考试前苏纳感觉怎么样？(Comment se sentait-elle avant l'examen ?)", options: ["焦虑 (anxieuse)", "兴奋", "愤怒"], answer: "焦虑 (anxieuse)" },
      { question: "苏纳看到成绩后感到怎么样？(Comment s'est-elle sentie après avoir vu son résultat ?)", options: ["兴奋和自豪 (excitée et fière)", "失望", "焦虑"], answer: "兴奋和自豪 (excitée et fière)" },
      { question: "«失望»是什么意思？", options: ["Déçu", "Content", "Fier"], answer: "Déçu" },
      { question: "苏纳的朋友为什么失望？(Pourquoi son amie est-elle déçue ?)", options: ["没有通过考试 (elle n'a pas réussi l'examen)", "天气不好", "迟到了"], answer: "没有通过考试 (elle n'a pas réussi l'examen)" },
      { question: "«自豪»是什么意思？", options: ["Fier", "Honteux", "Triste"], answer: "Fier" },
      { question: "«我对…有保留意见»是什么意思？", options: ["J'ai des réserves sur...", "Je suis très content de...", "Je ne sais rien de..."], answer: "J'ai des réserves sur..." },
    ]},
    { lessonId: 8, title: "测验 8", subtitle: "发音和语调", passingScore: 7, questions: [
      { question: "zh/ch/sh和z/c/s的区别是什么？", options: ["发音部位不同 (position de la bouche différente)", "声调不同", "意思一样"], answer: "发音部位不同 (position de la bouche différente)" },
      { question: "«轻声»是什么？", options: ["发音很轻的音节 (une syllabe qui se prononce légèrement)", "最重的声调", "没有声音"], answer: "发音很轻的音节 (une syllabe qui se prononce légèrement)" },
      { question: "哪个字通常是轻声？", options: ["的 (de)", "学", "读"], answer: "的 (de)" },
      { question: "课文中的女孩叫什么？(Comment s'appelle la fille du texte ?)", options: ["费恩 (Faith)", "莉莎", "安娜"], answer: "费恩 (Faith)" },
      { question: "费恩在做什么？(Que fait Faith ?)", options: ["区分zh和z的发音 (distinguer zh et z)", "学数字", "学做饭"], answer: "区分zh和z的发音 (distinguer zh et z)" },
      { question: "多练习会怎么样？(Que se passe-t-il en s'entraînant beaucoup ?)", options: ["发音更清晰 (la prononciation devient plus claire)", "忘记汉语", "变得更难"], answer: "发音更清晰 (la prononciation devient plus claire)" },
      { question: "«吗»是什么类型的字？", options: ["轻声字 (un mot en ton neutre)", "重声字", "生词"], answer: "轻声字 (un mot en ton neutre)" },
      { question: "口语汉语的速度和节奏怎么样？", options: ["很快，有自己的节奏 (rapide, avec son propre rythme)", "很慢", "没有节奏"], answer: "很快，有自己的节奏 (rapide, avec son propre rythme)" },
      { question: "跟老师重复说话有什么好处？(Quel est l'avantage de répéter après le professeur ?)", options: ["改善发音 (améliorer la prononciation)", "节省时间", "没有好处"], answer: "改善发音 (améliorer la prononciation)" },
      { question: "«等等！»和«我不昋»是什么？", options: ["口语表达 (expressions parlées)", "语法规则", "颜色"], answer: "口语表达 (expressions parlées)" },
    ]},
    { lessonId: 9, title: "测验 9", subtitle: "情景对话", passingScore: 7, questions: [
      { question: "«我要订一个位子»是什么意思？", options: ["Je veux réserver une table", "Je veux annuler", "Je veux payer"], answer: "Je veux réserver une table" },
      { question: "«这个多少钱？»是什么意思？", options: ["Combien ça coûte ?", "Où est-ce ?", "Quand ça ferme ?"], answer: "Combien ça coûte ?" },
      { question: "«结账，谢谢»用于哪里？(Où utilise-t-on cette phrase ?)", options: ["餐厅 (au restaurant)", "医院", "学校"], answer: "餐厅 (au restaurant)" },
      { question: "课文中谁要了鱼？(Qui a commandé un poisson ?)", options: ["姆姆 (Marie)", "哥哥", "服务员"], answer: "姆姆 (Marie)" },
      { question: "«可以便宜一些吗？»用于什么？", options: ["讨价 (négocier le prix)", "问时间", "问地址"], answer: "讨价 (négocier le prix)" },
      { question: "«我只是看看»是什么意思？", options: ["Je regarde seulement", "Je vais acheter", "Je suis pressé"], answer: "Je regarde seulement" },
      { question: "姆姆和哥哥去了哪里？(Où sont-ils allés ?)", options: ["餐厅 (restaurant)", "市场", "银行"], answer: "餐厅 (restaurant)" },
      { question: "«请给我菜单»是什么意思？", options: ["La carte, s'il vous plaît", "L'addition s'il vous plaît", "Un verre d'eau s'il vous plaît"], answer: "La carte, s'il vous plaît" },
      { question: "谁给了姆姆和哥哥菜单？(Qui leur a donné la carte ?)", options: ["服务员 (le serveur)", "老师", "医生"], answer: "服务员 (le serveur)" },
      { question: "讨价常用语是什么？(Quelle est l'expression courante pour négocier ?)", options: ["可以便宜一些吗？", "结账，谢谢", "再见"], answer: "可以便宜一些吗？" },
    ]},
    { lessonId: 10, title: "测验 10", subtitle: "商业汉语基础", passingScore: 7, questions: [
      { question: "«会议»是什么意思？", options: ["Réunion", "Client", "Budget"], answer: "Réunion" },
      { question: "«客户»是什么意思？", options: ["Client", "Employé", "Professeur"], answer: "Client" },
      { question: "«截止日期»是什么意思？", options: ["Date limite", "Date de début", "Anniversaire"], answer: "Date limite" },
      { question: "李先生上周做什么了？(Qu'a fait M. Li la semaine dernière ?)", options: ["和客户开了会 (il a eu une réunion avec un client)", "写了书", "去了市场"], answer: "和客户开了会 (il a eu une réunion avec un client)" },
      { question: "李先生会后做什么？(Qu'a-t-il fait après la réunion ?)", options: ["写邮件感谢客户 (il a écrit un email de remerciement)", "回家睡觉", "买东西"], answer: "写邮件感谢客户 (il a écrit un email de remerciement)" },
      { question: "项目的截止日期是什么时候？(Quelle est la date limite du projet ?)", options: ["下个月 (le mois prochain)", "今天", "明年"], answer: "下个月 (le mois prochain)" },
      { question: "«期待您的回应»用于什么？", options: ["邮件结尾语 (formule de clôture d'email)", "开会开头", "质问"], answer: "邮件结尾语 (formule de clôture d'email)" },
      { question: "«预算»是什么意思？", options: ["Budget", "Email", "Réunion"], answer: "Budget" },
      { question: "«尊敬的…»用于什么？", options: ["邮件开头 (début d'un email)", "邮件结尾", "问候朋友"], answer: "邮件开头 (début d'un email)" },
      { question: "«邮件»是什么意思？", options: ["Email", "Téléphone", "Lettre papier"], answer: "Email" },
    ]},
    { lessonId: 11, title: "测验 11", subtitle: "辩论和表达观点", passingScore: 7, questions: [
      { question: "«我认为...因为...»用于什么？", options: ["提出观点和理由 (présenter un point de vue et une raison)", "问候", "告别"], answer: "提出观点和理由 (présenter un point de vue et une raison)" },
      { question: "«我理解你的观点，但是...»用于什么？", options: ["礼貌地反驳 (réfuter poliment)", "赞成", "问候"], answer: "礼貌地反驳 (réfuter poliment)" },
      { question: "学生们在辩论什么？(Sur quoi débattaient les élèves ?)", options: ["孩子是否应该有手机 (si les enfants devraient avoir un téléphone)", "天气", "体育"], answer: "孩子是否应该有手机 (si les enfants devraient avoir un téléphone)" },
      { question: "林的观点是什么？(Quel est le point de vue de Lin ?)", options: ["安全很重要 (la sécurité est importante)", "手机很贵", "手机没用"], answer: "安全很重要 (la sécurité est importante)" },
      { question: "娜那的反驳是什么？(Quelle est la réfutation de Nana ?)", options: ["过度使用会影响学习 (trop utiliser affecte les études)", "安全没有用", "手机很便宜"], answer: "过度使用会影响学习 (trop utiliser affecte les études)" },
      { question: "«根据我的经验»是什么意思？", options: ["D'après mon expérience", "Selon les journaux", "Je ne sais pas"], answer: "D'après mon expérience" },
      { question: "«这个说法没有考虑到...»用于什么？", options: ["指出论点的缺点 (signaler une faiblesse d'un argument)", "赞成观点", "表示感谢"], answer: "指出论点的缺点 (signaler une faiblesse d'un argument)" },
      { question: "辩论需要什么？(De quoi a-t-on besoin pour débattre ?)", options: ["观点和理由 (point de vue et raisons)", "音乐", "颜色"], answer: "观点和理由 (point de vue et raisons)" },
      { question: "另一个辩论主题示例是什么？(Quel est l'autre exemple de sujet de débat ?)", options: ["线上学习是否更好 (si l'apprentissage en ligne est meilleur)", "哪里买面包", "怎么做饭"], answer: "线上学习是否更好 (si l'apprentissage en ligne est meilleur)" },
      { question: "辩论时应该怎么样？(Comment doit-on se comporter en débat ?)", options: ["礼貌 (poli)", "生气", "沉默"], answer: "礼貌 (poli)" },
    ]},
    { lessonId: 12, title: "测验 12", subtitle: "期末复习和对话", passingScore: 7, questions: [
      { question: "课文中的女孩叫什么？(Comment s'appelle la fille du texte ?)", options: ["苏竒 (Suzanne)", "苏纳", "克拉"], answer: "苏竒 (Suzanne)" },
      { question: "苏竒参加了什么？(À quoi a-t-elle participé ?)", options: ["辩论比赛 (un concours de débat)", "足球比赛", "音乐会"], answer: "辩论比赛 (un concours de débat)" },
      { question: "她怎么准备的？(Comment s'est-elle préparée ?)", options: ["准备观点和例子 (préparer arguments et exemples)", "什么也没做", "只是睡觉"], answer: "准备观点和例子 (préparer arguments et exemples)" },
      { question: "她怎么对待对手？(Comment a-t-elle traité son adversaire ?)", options: ["礼貌地反驳 (elle a réfuté poliment)", "念诌对手", "忽视对手"], answer: "礼貌地反驳 (elle a réfuté poliment)" },
      { question: "最后她的成绩怎么样？(Quel a été son résultat final ?)", options: ["很好 (très bon)", "很差", "一般"], answer: "很好 (très bon)" },
      { question: "本级所学的语法重点有哪些？(Quels points de grammaire ont été vus ce niveau ?)", options: ["«了»、«过»和«将要»", "颜色词", "数字"], answer: "«了»、«过»和«将要»" },
      { question: "«我更喜欢现场学习»是什么意思？", options: ["Je préfère l'apprentissage en présentiel", "Je préfère l'apprentissage en ligne", "Je n'aime pas apprendre"], answer: "Je préfère l'apprentissage en présentiel" },
      { question: "本级学了哪些技能？(Quelles compétences a-t-on apprises ce niveau ?)", options: ["对话、写作、听力、阅读、辩论 (conversation, écriture, écoute, lecture, débat)", "只有数字", "只有颜色"], answer: "对话、写作、听力、阅读、辩论 (conversation, écriture, écoute, lecture, débat)" },
      { question: "在对话中，«我理解你的观点，但是...»用于什么？", options: ["礼貌地表达不同意见 (exprimer poliment un désaccord)", "表示完全同意", "打断对方"], answer: "礼貌地表达不同意见 (exprimer poliment un désaccord)" },
      { question: "本级的主题是什么？(Quel est le thème général de ce niveau ?)", options: ["中级汉语技能 (compétences intermédiaires en chinois)", "初级问候", "商业谈判技巧"], answer: "中级汉语技能 (compétences intermédiaires en chinois)" },
    ]},
  ],

  finalQuiz: {
    title: "期末测验 - 第二级 (Quiz Final - Niveau 2)",
    subtitle: "本测验涵盖第二级所有课程。(Ce quiz couvre toutes les leçons du Niveau 2.)",
    passingScore: 15,
    questions: [
      { question: "汉语语序是什么？", options: ["主语+谓语+宾语", "宾语+谓语+主语", "谓语+宾语+主语"], answer: "主语+谓语+宾语" },
      { question: "«了»用于什么？", options: ["已完成的动作", "将来的计划", "现在进行的事"], answer: "已完成的动作" },
      { question: "«过»用于什么？", options: ["表示经验", "表示将来", "表示疑问"], answer: "表示经验" },
      { question: "«我同意你»是什么意思？", options: ["Je suis d'accord avec toi", "Je ne te crois pas", "Je ne te comprends pas"], answer: "Je suis d'accord avec toi" },
      { question: "«因为»和«所以»属于哪类连接词？", options: ["因果", "对比", "增加"], answer: "因果" },
      { question: "听力技巧中最重要的是什么？", options: ["听关键词", "闭眼", "忘记单词"], answer: "听关键词" },
      { question: "«浏览»和«扫读»的区别是什么？", options: ["浏览找大意，扫读找特定信息", "它们一样", "扫读比浏览慢"], answer: "浏览找大意，扫读找特定信息" },
      { question: "«兴奋»和«焦虑»是什么类型的词？", options: ["情感词 (mots d'émotion)", "颜色词", "数字词"], answer: "情感词 (mots d'émotion)" },
      { question: "zh/ch/sh和z/c/s的区别在哪里？", options: ["发音部位 (position de prononciation)", "声调", "意思"], answer: "发音部位 (position de prononciation)" },
      { question: "«这个多少钱？»在哪种情境中使用？", options: ["在商店 (dans un magasin)", "在医院", "在学校"], answer: "在商店 (dans un magasin)" },
      { question: "«会议»和«客户»属于哪个领域的词汇？", options: ["商业 (affaires)", "家庭", "体育"], answer: "商业 (affaires)" },
      { question: "«我认为...因为...»在辩论中用于什么？", options: ["提出观点和理由", "问候", "说再见"], answer: "提出观点和理由" },
      { question: "选择正确的句子。", options: ["我是学生。", "学生是我。", "是学生我。"], answer: "我是学生。" },
      { question: "杧生在邮件中用«尊敬的...»庚于什么位置？", options: ["开头 (au début)", "中间", "结尾"], answer: "开头 (au début)" },
      { question: "阅读：克拉说城市很友好但交通难。她的观点是什么？", options: ["友好但交通难 (amicale mais circulation difficile)", "完全完美", "很无趣"], answer: "友好但交通难 (amicale mais circulation difficile)" },
      { question: "阅读：李先生在会后写了什么？(Qu'a écrit M. Li après la réunion ?)", options: ["感谢邮件 (un email de remerciement)", "一本书", "一封信"], answer: "感谢邮件 (un email de remerciement)" },
      { question: "«这个说法没有考虑到...»在辩论中指什么？", options: ["指出对方论点的缺点 (signaler une faille dans l'argument adverse)", "表示完全同意", "问对方感觉"], answer: "指出对方论点的缺点 (signaler une faille dans l'argument adverse)" },
      { question: "«等等！»在对话中用于什么？", options: ["请对方暂停 (demander à l'autre d'attendre)", "表示再见", "表示感谢"], answer: "请对方暂停 (demander à l'autre d'attendre)" },
      { question: "执行辩论最重要的是什么？(Qu'est-ce qui est le plus important dans un débat ?)", options: ["观点和礼貌 (point de vue et politesse)", "音量", "速度"], answer: "观点和礼貌 (point de vue et politesse)" },
      {
        question: "哪个学生准备好进入第三级了？(Quel élève est prêt pour le Niveau 3 ?)",
        options: [
          "能辩论、写段落、理解读写材料的学生",
          "只会打招呼的学生",
          "跳过所有练习的学生",
        ],
        answer: "能辩论、写段落、理解读写材料的学生",
      },
    ],
  },
};
