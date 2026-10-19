import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, mirroring the English/Swahili/Spanish
// Level 3 topic plan: conditionals, modals, negotiation, presentations,
// meetings, reports, calls, networking, problem-solving, cross-cultural, leadership, review.
export const chineseLevel3: LevelCurriculum = {
  langCode: "ZH",
  langLabel: "Chinois",
  langSlug: "chinese",
  level: 3,
  levelTitle: "第三级 - 高级汉语 (Niveau 3 - Chinois Avancé)",
  levelSubtitle: "Maîtrisez le chinois professionnel : négociation, présentations et leadership interculturel.",

  lessons: [
    {
      id: 1,
      title: "假设句 (Phrases Conditionnelles)",
      subtitle: "Apprenez à exprimer des conditions et leurs conséquences.",
      sections: [
        { heading: "如果...就... (Si... alors...)", body: ["如果你努力，你就会成功。(rúguǒ nǐ nǔlì, nǐ jiù huì chénggōng.) - Si tu travailles dur, tu réussiras.", "如果下雨，我们就取消野餐。- Si il pleut, nous annulerons le pique-nique."] },
        { heading: "要是...的话 (Si jamais...)", body: ["要是你有问题的话，告诉我。(yàoshì nǐ yǒu wèntí de huà, gàosu wǒ.) - Si jamais tu as un problème, dis-moi.", "要不是他帮我，我现在还在这里。- Si ce n'est pas lui qui m'a aidé, je serais encore ici."] },
        { heading: "假设过去 (Conditionnel sur le passé)", body: ["如果我知道，我就会告诉你。(Si j'avais su, je te l'aurais dit.)", "要是我早点出发，我就不会迟到。- Si j'étais parti plus tôt, je ne serais pas en retard."] },
      ],
      speakText: `如果你努力，你就会成功。如果下雨，我们就取消野餐。

要是你有问题的话，告诉我。

如果我知道，我就会告诉你。`,
      videoTopic: "汉语假设句的三种用法。",
      videoUrl: "https://www.youtube.com/watch?v=Ot0Z5tuFV0A",
      readingTitle: "文德正在准备面试。(Winfred se prépare pour un entretien.)",
      reading: [
        "他的朋友说：«如果你准备得好，你就一定会成功。» (Son ami a dit : « Si tu te prépares bien, tu réussiras sûrement. »)",
        "文德回答：«要是我紧张的话，你能帮我吗？» (Winfred a répondu : « Si jamais je suis nerveux, peux-tu m'aider ? »)",
        "朋友笑着说：«当然，如果你需要，我会在这里。» (L'ami a souri : « Bien sûr, si tu as besoin, je serai là. »)",
      ],
      readingSpeakText: `文德正在准备面试。他的朋友说：如果你准备得好，你就一定会成功。`,
      exercises: ["用«如果...就...»写三个句子。(Écrivez trois phrases avec « si... alors... ».)", "用«要是...的话»写一个句子。", "解释«如果我知道，我就会告诉你»的意思。"],
      speakingTopic: "说出如果你中了彩票，你会做什么。(Dites ce que vous feriez si vous gagniez à la loterie.)",
    },
    {
      id: 2,
      title: "能态动词 (Verbes Modaux)",
      subtitle: "Exprimez la capacité, la permission et l'obligation.",
      sections: [
        { heading: "可以、能 (Capacité/permission)", body: ["我可以进来吗？(wǒ kěyǐ jìnlái ma?) - Puis-je entrer ?", "我能说两种语言。(wǒ néng shuō liǎng zhǒng yǔyán.) - Je peux parler deux langues."] },
        { heading: "应该、必须 (Obligation)", body: ["你应该休息。(nǐ yīnggāi xiǔxí.) - Tu devrais te reposer.", "我们必须完成报告。(wǒmen bìxū wánchéng bàogao.) - Nous devons terminer le rapport."] },
        { heading: "可能、一定 (Possibilité)", body: ["他可能会迟到。(tā kĕnéng huì chí dào.) - Il pourrait être en retard.", "这一定是一个好机会。- Ce doit sûrement être une bonne opportunité."] },
      ],
      speakText: `我可以进来吗？我能说两种语言。

你应该休息。我们必须完成报告。

他可能会迟到。`,
      videoTopic: "能态动词在工作场合的使用。",
      videoUrl: "https://www.youtube.com/watch?v=Ivg92WvmQ84",
      readingTitle: "会议前，经理对团队说话。(Avant la réunion, le manager a parlé à l'équipe.)",
      reading: [
        "«我们必须在星期五前完成这个项目。» (« Nous devons terminer ce projet avant vendredi. »)",
        "«如果有问题，你们可以随时问我。» (« Si vous avez un problème, vous pouvez me demander à tout moment. »)",
        "«这很重要，因为客户可能会提前检查。» (« C'est important, car le client pourrait vérifier en avance. »)",
      ],
      readingSpeakText: `会议前，经理对团队说话。我们必须在星期五前完成这个项目。`,
      exercises: ["用«应该»和«必须»各写一个句子。", "用«可能»描述一个不确定的情况。", "解释«可以»和«能»的区别。"],
      speakingTopic: "说出你工作中必须做和应该做的事。(Parlez de ce que vous devez faire et devriez faire au travail.)",
    },
    {
      id: 3,
      title: "商业谈判 (Négociation Professionnelle)",
      subtitle: "Apprenez les phrases clés pour négocier en chinois.",
      sections: [
        { heading: "提出报价 (Faire une offre)", body: ["我们的报价是... (wǒmen de bàojià shì...) - Notre offre est de...", "这是我们能接受的最低价格。(c'est le prix le plus bas que nous pouvons accepter.)"] },
        { heading: "回应和讨价 (Répondre et négocier)", body: ["这个价格有点高。我们可以谈谈吗？(Ce prix est un peu élevé. Peut-on en discuter ?)", "如果你们能降价，我们就签约。(Si vous baissez le prix, nous signerons.)"] },
        { heading: "达成协议 (Conclure un accord)", body: ["好，我们成交了。(hǎo, wǒmen chéngjiāo le.) - D'accord, c'est conclu.", "很高兴和你们合作。- Content de collaborer avec vous."] },
      ],
      speakText: `我们的报价是。这是我们能接受的最低价格。

这个价格有点高。我们可以谈谈吗？

好，我们成交了。`,
      videoTopic: "观察一场商业谈判。",
      videoUrl: "https://www.youtube.com/watch?v=idzETSmJ310",
      readingTitle: "李经理和一家工厂谈判价格。(Mme Li a négocié le prix avec une usine.)",
      reading: [
        "工厂的报价比预算高。(L'offre de l'usine était plus élevée que le budget.)",
        "李经理说：«如果你们能降价十个点，我们就签约。» (Mme Li a dit : « Si vous baissez de dix pourcent, nous signerons. »)",
        "经过讨论，双方最后达成了协议。(Après discussion, les deux parties ont finalement trouvé un accord.)",
      ],
      readingSpeakText: `李经理和一家工厂谈判价格。工厂的报价比预算高。`,
      exercises: ["写一个讨价对话。(Écrivez un dialogue de négociation de prix.)", "用«如果...就...»写一个谈判策略。", "解释«成交»的意思。"],
      speakingTopic: "角角演练一个谈判价格的场景。(Jouez une scène de négociation de prix.)",
    },
    {
      id: 4,
      title: "做演讲 (Faire une Présentation)",
      subtitle: "Apprenez à structurer et donner une présentation professionnelle.",
      sections: [
        { heading: "开场 (Introduction)", body: ["大家好，今天我要介绍。(dàjiā hǎo, jīntiān wǒ yào jièshào...) - Bonjour à tous, aujourd'hui je vais présenter...", "我今天的演讲分三部分。- Ma présentation a trois parties."] },
        { heading: "主体和过渡 (Corps et transitions)", body: ["首先... 第二... 最后... - D'abord... ensuite... enfin...", "让我们来看下一个点。(voyons le point suivant.)"] },
        { heading: "结束和问答 (Conclusion et questions)", body: ["总结一下，... (zǒngjié yìxià...) - Pour résumer...", "谢谢大家，有什么问题吗？(Merci à tous, avez-vous des questions ?)"] },
      ],
      speakText: `大家好，今天我要介绍。我今天的演讲分三部分。

首先。第二。最后。

总结一下。谢谢大家，有什么问题吗？`,
      videoTopic: "观察一个结构化的商业演讲。",
      videoUrl: "https://www.youtube.com/watch?v=LXMSjugP4Jk",
      readingTitle: "李白第一次在公司做演讲。(C'était la première fois que Li Bai faisait une présentation dans son entreprise.)",
      reading: [
        "他很焦虑，但他认真准备了每个部分。(Il était nerveux, mais il avait soigneusement préparé chaque partie.)",
        "演讲时，他说：«我今天的演讲分三部分。» (Pendant la présentation, il a dit : « Ma présentation a trois parties. »)",
        "最后，他回答了观众的问题，得到了很多赞赏。(À la fin, il a répondu aux questions du public et a reçu beaucoup de compliments.)",
      ],
      readingSpeakText: `李白第一次在公司做演讲。他很焦虑，但他认真准备了每个部分。`,
      exercises: ["写一个演讲开场。(Écrivez une introduction de présentation.)", "用«首先、第二、最后»写三个要点。", "写一个结束语。"],
      speakingTopic: "做一个两分钟的演讲，介绍你的工作或学校。(Faites une présentation de deux minutes sur votre travail ou école.)",
    },
    {
      id: 5,
      title: "会议汉语 (Chinois pour les Réunions)",
      subtitle: "Participez activement à des réunions professionnelles en chinois.",
      sections: [
        { heading: "开会 (Ouvrir la réunion)", body: ["我们开始吧。(wǒmen kāishǐ ba.) - Commençons.", "今天的议题是... (jīntiān de yìtí shì...) - L'ordre du jour est..."] },
        { heading: "参与讨论 (Participer à la discussion)", body: ["我可以补充一点吗？(wǒ kĕyǐ bǔchōng yìdiǎn ma?) - Puis-je ajouter quelque chose ?", "我对这个观点有不同的看法。- J'ai un avis différent sur ce point."] },
        { heading: "结束会议 (Conclure la réunion)", body: ["我们下次会议再讨论。(Nous en discuterons à la prochaine réunion.)", "谢谢大家的参与。- Merci pour votre participation."] },
      ],
      speakText: `我们开始吧。今天的议题是。

我可以补充一点吗？我对这个观点有不同的看法。

我们下次会议再讨论。谢谢大家的参与。`,
      videoTopic: "观察一场商业会议。",
      videoUrl: "https://www.youtube.com/watch?v=ikib5kEnHfk",
      readingTitle: "周一早上，团队开了一个会。(Lundi matin, l'équipe a eu une réunion.)",
      reading: [
        "经理说：«我们开始吧。今天的议题是新项目。» (Le manager a dit : « Commençons. L'ordre du jour est le nouveau projet. »)",
        "一位同事问：«我可以补充一点吗？»并提出了一个好建议。(Un collègue a demandé : « Puis-je ajouter quelque chose ? » et a proposé une bonne idée.)",
        "会议最后，经理感谢了大家的参与。(À la fin, le manager a remercié tout le monde.)",
      ],
      readingSpeakText: `周一早上，团队开了一个会。经理说：我们开始吧。`,
      exercises: ["写出开会和结束会议的常用语。", "用«我可以补充一点吗？»写一个对话。"],
      speakingTopic: "角角演练主持一场简单的团队会议。(Jouez l'animation d'une réunion d'équipe simple.)",
    },
    {
      id: 6,
      title: "写报告 (Rédiger des Rapports)",
      subtitle: "Apprenez à structurer un rapport professionnel clair.",
      sections: [
        { heading: "报告结构 (Structure du rapport)", body: ["摘要：简要概述。(résumé : aperçu bref.)", "背景：解释情况。(contexte : expliquer la situation.)", "发现：呈现数据和事实。(constats : présenter les données.)", "建议：提出下一步。(recommandations : proposer les prochaines étapes.)"] },
        { heading: "正式语言 (Langage formel)", body: ["据数据显示。(jù shùjì xiǛnshì.) - Selon les données.", "因此，我们建议... (yīncǐ, wǒmen jiànyì...) - Par conséquent, nous recommandons..."] },
      ],
      speakText: `摘要、背景、发现、建议。

据数据显示。因此，我们建议。`,
      videoTopic: "如何写一份清楚的商业报告。",
      readingTitle: "费雷拟的销售报告 (Le rapport de ventes de Féréol)",
      reading: [
        "据数据显示，这个月的销售额增加了10%。(Selon les données, les ventes de ce mois ont augmenté de 10%.)",
        "因此，我们建议下个月增加广告预算。(Par conséquent, nous recommandons d'augmenter le budget publicitaire le mois prochain.)",
      ],
      readingSpeakText: `费雷拟写了销售报告。据数据显示，这个月的销售额增加了10%。`,
      exercises: ["写一个摘要。(Écrivez un résumé.)", "用«因此，我们建议»写一个建议。"],
      speakingTopic: "口头汇报一个简单的报告。(Présentez oralement un rapport simple.)",
    },
    {
      id: 7,
      title: "电话沟通 (Communication Téléphonique)",
      subtitle: "Apprenez à gérer un appel professionnel en chinois.",
      sections: [
        { heading: "接电话 (Répondre au téléphone)", body: ["您好，这里是... (nín hǎo, zhèlǐ shì...) - Bonjour, ici...", "请问您是哪位？(qǐngwèn nín shì nǎwèi?) - Qui est à l'appareil ?"] },
        { heading: "转投和留言 (Transférer et laisser un message)", body: ["请等一下，我给您转接。(qǐng dĕng yìxià, wǒ gĕi nín zhuǎnjiē.) - Attendez, je vous transfère.", "您要留个话吗？(nín yào liú ge huà ma?) - Voulez-vous laisser un message ?"] },
        { heading: "结束通话 (Terminer l'appel)", body: ["谢谢您的来电。(xièxie nín de láidiàn.) - Merci de votre appel.", "再见，祝您愉快。- Au revoir, bonne journée."] },
      ],
      speakText: `您好，这里是。请问您是哪位？

请等一下，我给您转接。您要留个话吗？

谢谢您的来电。再见。`,
      videoTopic: "观察一个商业电话对话。",
      videoUrl: "https://www.youtube.com/watch?v=aCPHICLeJR4",
      readingTitle: "秘书每天接很多电话。(La secrétaire reçoit beaucoup d'appels chaque jour.)",
      reading: [
        "有一天，一位客户打电话来找经理。(Un jour, un client a appelé pour parler au manager.)",
        "秘书说：«请等一下，我给您转接。»但经理正在开会。(La secrétaire a dit : « Attendez, je vous transfère. » Mais le manager était en réunion.)",
        "秘书问：«您要留个话吗？»客户留下了电话号码。(Elle a demandé : « Voulez-vous laisser un message ? » Le client a laissé son numéro.)",
      ],
      readingSpeakText: `秘书每天接很多电话。有一天，一位客户打电话来找经理。`,
      exercises: ["写一个接电话的对话。", "用«您要留个话吗？»写一个对话。"],
      speakingTopic: "角角演练一个商业电话，包含转接和留言。(Jouez un appel professionnel avec transfert et message.)",
    },
    {
      id: 8,
      title: "人际交往 (Réseautage Professionnel)",
      subtitle: "Apprenez à créer des liens professionnels en chinois.",
      sections: [
        { heading: "介绍自己 (Se présenter professionnellement)", body: ["我是...公司的... (wǒ shì... gōngsī de...) - Je travaille chez... en tant que...", "我主要负责... (wǒ zhǔyào fùzé...) - Je suis principalement responsable de..."] },
        { heading: "交换联系方式 (Échanger les coordonnées)", body: ["我们交换一下名片吧。(wǒmen jiāohuàn yìxià míngpiàn ba.) - Échangeons nos cartes de visite.", "我们以后可以保持联系。- Restons en contact."] },
        { heading: "延续对话 (Faire durer la conversation)", body: ["我很感兴趣听听你的项目。(ça m'intéresse d'en savoir plus sur ton projet.)", "我们找个时间喷喷吧。- Trouvons un moment pour en discuter."] },
      ],
      speakText: `我是公司的。我主要负责。

我们交换一下名片吧。我们以后可以保持联系。

我很感兴趣听听你的项目。`,
      videoTopic: "观察一场商业社交活动中的对话。",
      videoUrl: "https://www.youtube.com/watch?v=k_kABOwJxXk",
      readingTitle: "在一个商业论坛上，玛丽认识了一个新合作伙伴。(Lors d'un forum d'affaires, Marie a rencontré un nouveau partenaire potentiel.)",
      reading: [
        "她说：«我是进出口公司的，我主要负责市场营销。» (Elle a dit : « Je travaille dans une entreprise d'import-export, je suis responsable du marketing. »)",
        "他们聊得很开心，最后交换了名片。(Ils ont beaucoup discuté et ont finalement échangé leurs cartes de visite.)",
        "玛丽说：«我们以后可以保持联系。» (Marie a dit : « Restons en contact. »)",
      ],
      readingSpeakText: `在一个商业论坛上，玛丽认识了一个新合作伙伴。她说：我是进出口公司的。`,
      exercises: ["用汉语介绍你的工作。", "写一个交换名片的对话。"],
      speakingTopic: "角角演练在商业活动中认识新朋友。(Jouez une rencontre dans un événement professionnel.)",
    },
    {
      id: 9,
      title: "解决问题 (Résolution de Problèmes)",
      subtitle: "Apprenez à discuter de problèmes et de solutions.",
      sections: [
        { heading: "描述问题 (Décrire un problème)", body: ["问题是... (wèntí shì...) - Le problème est...", "这导致了... (zhè dǎozhì le...) - Cela a causé..."] },
        { heading: "提出解决方法 (Proposer des solutions)", body: ["我们可以试试... (wǒmen kĕyǐ shìshi...) - Nous pourrions essayer...", "最好的解决办法是... - La meilleure solution est de..."] },
        { heading: "判断结果 (Évaluer les résultats)", body: ["这个办法有效。(zhè ge bànfǎ yǒuxiào.) - Cette solution fonctionne.", "我们需要调整计划。- Nous devons ajuster le plan."] },
      ],
      speakText: `问题是。这导致了。

我们可以试试。最好的解决办法是。

这个办法有效。我们需要调整计划。`,
      videoTopic: "观察团队如何讨论和解决问题。",
      readingTitle: "工厂的机器出问题了。(Une machine de l'usine est tombée en panne.)",
      reading: [
        "经理说：«问题是机器停止了，这导致了生产延迟。» (Le manager a dit : « Le problème est que la machine s'est arrêtée, ce qui a causé un retard de production. »)",
        "工程师说：«我们可以试试更换零件。» (L'ingénieur a dit : « Nous pourrions essayer de remplacer la pièce. »)",
        "经过修复，机器重新运转，经理说：«这个办法有效。» (Après réparation, la machine a redémarré et le manager a dit : « Cette solution fonctionne. »)",
      ],
      readingSpeakText: `工厂的机器出问题了。经理说：问题是机器停止了。`,
      exercises: ["描述一个工作中的问题。", "用«我们可以试试»提出一个解决方法。"],
      speakingTopic: "说出一个问题和你提出的解决方法。(Décrivez un problème et la solution que vous proposez.)",
    },
    {
      id: 10,
      title: "跨文化沟通 (Communication Interculturelle)",
      subtitle: "Comprenez les différences culturelles dans la communication professionnelle.",
      sections: [
        { heading: "文化差异 (Différences culturelles)", body: ["不同国家对时间和礼貌有不同的理解。(Chaque pays a sa propre conception du temps et de la politesse.)", "在中国，保持面子很重要。(En Chine, préserver la face est très important.)"] },
        { heading: "尊重差异 (Respecter les différences)", body: ["我理解你们的传统。(wǒ lǐjiĕ nǐmen de chuángtǒng.) - Je comprends votre tradition.", "请告诉我正确的做法。- Dites-moi la bonne façon de faire."] },
        { heading: "常见误会 (Malentendus courants)", body: ["直接拒绝可能被视为不礼貌。(Un refus direct peut être vu comme impoli.)", "沉默有时表示在思考，不是拒绝。- Le silence signifie parfois réflexion, pas refus."] },
      ],
      speakText: `不同国家对时间和礼貌有不同的理解。在中国，保持面子很重要。

我理解你们的传统。请告诉我正确的做法。

直接拒绝可能被视为不礼貌。`,
      videoTopic: "中国商业文化的基本习俱。",
      videoUrl: "https://www.youtube.com/watch?v=nK0l1xoaupQ",
      readingTitle: "活德和中国合作伙伴第一次合作。(Harold travaillait pour la première fois avec un partenaire chinois.)",
      reading: [
        "他不理解为什么合作伙伴从不直接说«不»。(Il ne comprenait pas pourquoi son partenaire ne disait jamais directement « non ».)",
        "一位朋友解释：«在中国文化中，保持面子很重要，直接拒绝可能伤害关系。» (Un ami lui a expliqué : « Dans la culture chinoise, préserver la face est important ; un refus direct peut nuire à la relation. »)",
        "从那以后，活德学习尊重这种文化差异。(Depuis, Harold a appris à respecter cette différence culturelle.)",
      ],
      readingSpeakText: `活德和中国合作伙伴第一次合作。他不理解为什么合作伙伴从不直接说不。`,
      exercises: ["解释为什么面子在中国文化中很重要。", "写一个关于文化差异的例子。"],
      speakingTopic: "说出你自己国家和中国文化的一个差异。(Parlez d'une différence entre votre culture et la culture chinoise.)",
    },
    {
      id: 11,
      title: "领导力和团队管理 (Leadership et Gestion d'Équipe)",
      subtitle: "Apprenez le vocabulaire et les phrases du leadership.",
      sections: [
        { heading: "激励团队 (Motiver l'équipe)", body: ["大家做得很棒！(dàjiā zuò de hĕn bàng!) - Vous faites tous du très bon travail !", "我对团队充满信心。(wǒ duì tuándì chōngmǎn xìnxīn.) - J'ai pleinement confiance en l'équipe."] },
        { heading: "分配任务 (Déléguer des tâches)", body: ["请你负责这部分。(qǐng nǐ fùzé zhè bùfen.) - Tu es responsable de cette partie.", "我们每个人都有自己的角色。- Chacun a son propre rôle."] },
        { heading: "反馈和赞赏 (Feedback et reconnaissance)", body: ["这个地方可以改进。(zhè ge dìfāng kĕyǐ gǎijìn.) - Ceci peut être amélioré.", "感谢你的努力。- Merci pour ton travail acharné."] },
      ],
      speakText: `大家做得很棒！我对团队充满信心。

请你负责这部分。我们每个人都有自己的角色。

这个地方可以改进。感谢你的努力。`,
      videoTopic: "观察一位领导如何激励和分配任务。",
      readingTitle: "陈经理领导一个大项目。(Mme Chen dirigeait un grand projet.)",
      reading: [
        "她对团队说：«大家做得很棒，我对团队充满信心。» (Elle a dit à l'équipe : « Vous faites tous du très bon travail, j'ai pleinement confiance en l'équipe. »)",
        "她按特长分配了任务，并在每周给出反馈。(Elle a délégué les tâches selon les forces de chacun et a donné des retours chaque semaine.)",
        "项目成功完成后，她感谢了每一个人的努力。(Après la réussite du projet, elle a remercié chacun pour ses efforts.)",
      ],
      readingSpeakText: `陈经理领导一个大项目。她对团队说：大家做得很棒。`,
      exercises: ["用汉语激励你的团队。(Motivez votre équipe en chinois.)", "写一个分配任务的句子。"],
      speakingTopic: "角角演练一个团队领导给反馈的场景。(Jouez une scène de leader donnant un retour.)",
    },
    {
      id: 12,
      title: "期末复习和对话 (Révision Finale et Conversation Professionnelle)",
      subtitle: "Revoyez tout ce que vous avez appris au Niveau 3.",
      sections: [
        {
          heading: "我们学到的 (Ce que nous avons appris)",
          body: [
            "假设句和能态动词 (Conditionnels et verbes modaux)",
            "商业谈判和演讲 (Négociation et présentations)",
            "会议和报告 (Réunions et rapports)",
            "电话沟通和人际交往 (Téléphone et réseautage)",
            "解决问题和跨文化沟通 (Résolution de problèmes et interculturel)",
            "领导力和团队管理 (Leadership et gestion d'équipe)",
          ],
        },
        {
          heading: "对话示例 (Exemple de conversation professionnelle)",
          body: [
            "A：我们的报价是五万元。(Notre offre est de 50 000 yuans.)",
            "B：这个价格有点高。我们可以谈谈吗？(Ce prix est un peu élevé. Peut-on en discuter ?)",
            "A：如果你们能在下周完成付款，我们可以降价。(Si vous pouvez finaliser le paiement la semaine prochaine, nous pouvons baisser le prix.)",
            "B：好，我们成交了。(D'accord, c'est conclu.)",
          ],
        },
      ],
      speakText: `我们学到了假设句、能态动词、商业谈判、演讲、会议、报告、电话沟通、人际交往、解决问题、跨文化沟通和领导力。

我们的报价是五万元。这个价格有点高。我们可以谈谈吗？好，我们成交了。`,
      videoTopic: "复习第三级的商业汉语技能。",
      videoUrl: "https://www.youtube.com/watch?v=y1AixywOYcg",
      readingTitle: "莱论已经学了三年汉语。(Léon apprend le chinois depuis trois ans.)",
      reading: [
        "现在他可以自在地谈判、开会和做演讲。(Maintenant il peut négocier, animer des réunions et faire des présentations avec aisance.)",
        "他说：«如果我没有每天练习，我就不会有今天的进步。» (Il a dit : « Si je n'avais pas pratiqué tous les jours, je n'aurais pas les progrès d'aujourd'hui. »)",
        "他的下一个目标是带领一个国际团队。(Son prochain objectif est de diriger une équipe internationale.)",
      ],
      readingSpeakText: `莱论已经学了三年汉语。现在他可以自在地谈判、开会和做演讲。`,
      exercises: ["用汉语进行一个商业谈判的对话。(Faites un dialogue de négociation en chinois.)", "写一个包含假设句和能态动词的段落。", "总结你在本级学到的最重要的三个技能。"],
      speakingTopic: "做一个关于你自己领导力经历或解决问题经历的简短演讲。(Faites une courte présentation sur votre expérience de leadership ou de résolution de problème.)",
    },
  ],

  quizzes: [
    { lessonId: 1, title: "测验 1", subtitle: "假设句", passingScore: 7, questions: [
      { question: "«如果...就...»用于什么？", options: ["条件和结果 (condition et conséquence)", "问候", "赞成"], answer: "条件和结果 (condition et conséquence)" },
      { question: "«要是...的话»是什么意思？", options: ["Si jamais...", "Parce que...", "Bien que..."], answer: "Si jamais..." },
      { question: "课文中的人叫什么？(Comment s'appelle la personne du texte ?)", options: ["文德 (Winfred)", "李白", "托马斯"], answer: "文德 (Winfred)" },
      { question: "文德在准备什么？(À quoi se prépare Winfred ?)", options: ["面试 (un entretien)", "考试", "比赛"], answer: "面试 (un entretien)" },
      { question: "如果文德紧张，谁会帮他？(Qui l'aidera s'il est nerveux ?)", options: ["他的朋友 (son ami)", "他的老师", "他的老板"], answer: "他的朋友 (son ami)" },
      { question: "«如果我知道，我就会告诉你»是哪种假设？", options: ["关于过去的假设 (conditionnel passé)", "关于将来的假设", "不是假设"], answer: "关于过去的假设 (conditionnel passé)" },
      { question: "«要不是他帮我，我现在还在这里»意味着什么？", options: ["他帮了我 (il m'a vraiment aidé)", "他没帮我", "我自己解决的"], answer: "他帮了我 (il m'a vraiment aidé)" },
      { question: "如果下雨，会发生什么？(Selon le texte, que se passe-t-il s'il pleut ?)", options: ["取消野餐 (annuler le pique-nique)", "继续野餐", "换个地方"], answer: "取消野餐 (annuler le pique-nique)" },
      { question: "假设句常用于哪种场合？(Quand utilise-t-on les phrases conditionnelles ?)", options: ["讨论条件和结果 (discuter de conditions et de résultats)", "说再见", "爱心"], answer: "讨论条件和结果 (discuter de conditions et de résultats)" },
      { question: "文德的朋友怎么回应？(Comment l'ami de Winfred a-t-il répondu ?)", options: ["«当然，我会在这里。»", "«我不能帮你。»", "«我不知道。»"], answer: "«当然，我会在这里。»" },
    ]},
    { lessonId: 2, title: "测验 2", subtitle: "能态动词", passingScore: 7, questions: [
      { question: "«可以»和«能»表示什么？", options: ["能力或允许 (capacité ou permission)", "义务", "可能性"], answer: "能力或允许 (capacité ou permission)" },
      { question: "«应该»和«必须»表示什么？", options: ["义务 (obligation)", "能力", "允许"], answer: "义务 (obligation)" },
      { question: "«可能»表示什么？", options: ["可能性 (possibilité)", "义务", "命令"], answer: "可能性 (possibilité)" },
      { question: "经理在会议前说什么？(Qu'a dit le manager avant la réunion ?)", options: ["我们必须在星期五前完成项目 (nous devons terminer avant vendredi)", "会议取消了", "没有项目"], answer: "我们必须在星期五前完成项目 (nous devons terminer avant vendredi)" },
      { question: "«我们必须完成报告»是什么意思？", options: ["Nous devons terminer le rapport", "Nous voudrions terminer le rapport", "Nous pourrions terminer le rapport"], answer: "Nous devons terminer le rapport" },
      { question: "如果有问题，团队可以做什么？(Que peut faire l'équipe en cas de problème ?)", options: ["随时问经理 (demander au manager à tout moment)", "睡觉", "回家"], answer: "随时问经理 (demander au manager à tout moment)" },
      { question: "«他可能会迟到»表达什么？", options: ["不确定的可能性 (une possibilité incertaine)", "完全确定", "义务"], answer: "不确定的可能性 (une possibilité incertaine)" },
      { question: "«你应该休息»是建议还是命令？", options: ["建议 (une suggestion)", "命令", "问题"], answer: "建议 (une suggestion)" },
      { question: "客户可能会做什么？(Selon le texte, que pourrait faire le client ?)", options: ["提前检查 (vérifier en avance)", "取消订单", "换公司"], answer: "提前检查 (vérifier en avance)" },
      { question: "«我能说两种语言»是什么意思？", options: ["Je peux parler deux langues", "J'aime deux langues", "Je dois parler deux langues"], answer: "Je peux parler deux langues" },
    ]},
    { lessonId: 3, title: "测验 3", subtitle: "商业谈判", passingScore: 7, questions: [
      { question: "«我们的报价是...»用于什么？", options: ["提出价格 (faire une offre)", "问候", "表示同意"], answer: "提出价格 (faire une offre)" },
      { question: "«这个价格有点高»是什么意思？", options: ["Ce prix est un peu élevé", "Ce prix est très bas", "Ce prix est parfait"], answer: "Ce prix est un peu élevé" },
      { question: "«成交»是什么意思？", options: ["Conclure un accord", "Annuler un accord", "Refuser une offre"], answer: "Conclure un accord" },
      { question: "李经理和谁谈判？(Avec qui Mme Li négocie-t-elle ?)", options: ["一家工厂 (une usine)", "一个客户", "一个学校"], answer: "一家工厂 (une usine)" },
      { question: "工厂的报价怎么样？(Comment était l'offre de l'usine ?)", options: ["比预算高 (plus élevée que le budget)", "比预算低", "和预算一样"], answer: "比预算高 (plus élevée que le budget)" },
      { question: "李经理要求什么？(Que demande Mme Li ?)", options: ["降价十个点 (baisser de dix pourcent)", "增加数量", "取消订单"], answer: "降价十个点 (baisser de dix pourcent)" },
      { question: "最后双方达成什么？(Qu'ont finalement trouvé les deux parties ?)", options: ["协议 (un accord)", "争议", "没有结果"], answer: "协议 (un accord)" },
      { question: "«这是我们能接受的最低价格»用于什么场合？", options: ["讨价 (négociation)", "问候", "告别"], answer: "讨价 (négociation)" },
      { question: "«很高兴和你们合作»表达什么？", options: ["合作的温暖结语 (une formule chaleureuse de clôture de collaboration)", "拒绝合作", "讨价"], answer: "合作的温暖结语 (une formule chaleureuse de clôture de collaboration)" },
      { question: "谈判里常用的问句是什么？(Quelle question est courante en négociation ?)", options: ["我们可以谈谈吗？", "你住在哪里？", "你喜欢做什么？"], answer: "我们可以谈谈吗？" },
    ]},
    { lessonId: 4, title: "测验 4", subtitle: "做演讲", passingScore: 7, questions: [
      { question: "«首先、第二、最后»用于什么？", options: ["排列要点 (ordonner les points)", "提问", "表达爱意"], answer: "排列要点 (ordonner les points)" },
      { question: "«总结一下»用于哪个部分？", options: ["结束 (conclusion)", "开场", "中间"], answer: "结束 (conclusion)" },
      { question: "课文中的人叫什么？(Comment s'appelle la personne du texte ?)", options: ["李白 (Li Bai)", "文德", "李经理"], answer: "李白 (Li Bai)" },
      { question: "李白做什么？(Que fait Li Bai ?)", options: ["第一次做公司演讲 (sa première présentation au travail)", "去旅行", "开会"], answer: "第一次做公司演讲 (sa première présentation au travail)" },
      { question: "他的演讲有几部分？(Combien de parties a sa présentation ?)", options: ["三部分 (trois)", "四部分", "一部分"], answer: "三部分 (trois)" },
      { question: "演讲前李白感觉怎么样？(Comment se sentait-il avant ?)", options: ["焦虑 (nerveux)", "平静", "兴奋"], answer: "焦虑 (nerveux)" },
      { question: "演讲最后李白做什么？(Que fait-il à la fin ?)", options: ["回答问题 (répondre aux questions)", "回家", "开始演讲"], answer: "回答问题 (répondre aux questions)" },
      { question: "«让我们来看下一个点»用于什么？", options: ["过渡到下一个要点 (transition vers le point suivant)", "结束演讲", "欢迎观众"], answer: "过渡到下一个要点 (transition vers le point suivant)" },
      { question: "演讲开场常用语是什么？(Quelle est l'expression d'ouverture courante ?)", options: ["大家好，今天我要介绍", "谢谢大家", "再见"], answer: "大家好，今天我要介绍" },
      { question: "观众对李白的演讲有什么反应？(Comment le public a-t-il réagi ?)", options: ["给了很多赞赏 (beaucoup de compliments)", "很失望", "没有反应"], answer: "给了很多赞赏 (beaucoup de compliments)" },
    ]},
    { lessonId: 5, title: "测验 5", subtitle: "会议汉语", passingScore: 7, questions: [
      { question: "«我们开始吧»用于什么？", options: ["开启会议 (ouvrir une réunion)", "结束会议", "问候"], answer: "开启会议 (ouvrir une réunion)" },
      { question: "«我可以补充一点吗？»用于什么？", options: ["参与讨论 (participer à la discussion)", "结束会议", "拒绝"], answer: "参与讨论 (participer à la discussion)" },
      { question: "会议中经理说了什么？(Qu'a dit le manager en réunion ?)", options: ["今天的议题是新项目 (l'ordre du jour est le nouveau projet)", "会议取消了", "没有议题"], answer: "今天的议题是新项目 (l'ordre du jour est le nouveau projet)" },
      { question: "同事做了什么？(Qu'a fait le collègue ?)", options: ["提出了建议 (proposé une idée)", "离开了会议", "追问问题"], answer: "提出了建议 (proposé une idée)" },
      { question: "会议最后经理做什么？(Que fait le manager à la fin ?)", options: ["感谢大家 (remercie tout le monde)", "生气", "取消项目"], answer: "感谢大家 (remercie tout le monde)" },
      { question: "«我们下次会议再讨论»是什么意思？", options: ["Nous en discuterons à la prochaine réunion", "Nous ne discuterons jamais de cela", "La réunion est annulée"], answer: "Nous en discuterons à la prochaine réunion" },
      { question: "«我对这个观点有不同的看法»用于什么？", options: ["礼貌地表达不同意见 (exprimer poliment un désaccord)", "同意对方", "问候"], answer: "礼貌地表达不同意见 (exprimer poliment un désaccord)" },
      { question: "会议中«议题»是什么意思？", options: ["Ordre du jour", "Conclusion", "Salutation"], answer: "Ordre du jour" },
      { question: "会议开始时常说的话是什么？", options: ["我们开始吧", "我们结束了", "再见"], answer: "我们开始吧" },
      { question: "讨论时表达不同观点应该怎么样？(Comment exprimer un désaccord en discussion ?)", options: ["礼貌地 (poliment)", "生气地", "沉默地"], answer: "礼貌地 (poliment)" },
    ]},
    { lessonId: 6, title: "测验 6", subtitle: "写报告", passingScore: 7, questions: [
      { question: "报告结构包含哪四部分？(Quelles sont les quatre parties du rapport ?)", options: ["摘要、背景、发现、建议", "开头、中间、结尾", "问题、答案"], answer: "摘要、背景、发现、建议" },
      { question: "«据数据显示»是什么意思？", options: ["Selon les données", "Selon mon avis", "Selon la rumeur"], answer: "Selon les données" },
      { question: "费雷拟的销售额怎么样？(Comment étaient les ventes de Féréol ?)", options: ["增加了10% (augmentées de 10%)", "减少10%", "没变化"], answer: "增加了10% (augmentées de 10%)" },
      { question: "费雷拟建议什么？(Que recommande Féréol ?)", options: ["增加广告预算 (augmenter le budget publicitaire)", "减少广告", "停止销售"], answer: "增加广告预算 (augmenter le budget publicitaire)" },
      { question: "«因此，我们建议...»用于哪个部分？", options: ["建议 (recommandations)", "背景", "摘要"], answer: "建议 (recommandations)" },
      { question: "«摘要»是什么？", options: ["简要概述 (un résumé bref)", "详细数据", "结论"], answer: "简要概述 (un résumé bref)" },
      { question: "«背景»在报告中庚于什么位置？", options: ["摘要后面 (après le résumé)", "报告最后", "没有固定位置"], answer: "摘要后面 (après le résumé)" },
      { question: "报告的«发现»部分包含什么？", options: ["数据和事实 (données et faits)", "感想", "愚蠢的想法"], answer: "数据和事实 (données et faits)" },
      { question: "商业报告语言应该怎么样？(Comment doit être le langage d'un rapport professionnel ?)", options: ["正式 (formel)", "随便", "滑稽"], answer: "正式 (formel)" },
      { question: "«建议»是什么意思？", options: ["Recommandation", "Problème", "Conclusion négative"], answer: "Recommandation" },
    ]},
    { lessonId: 7, title: "测验 7", subtitle: "电话沟通", passingScore: 7, questions: [
      { question: "«请问您是哪位？»是什么意思？", options: ["Qui est à l'appareil ?", "Comment ça va ?", "Où êtes-vous ?"], answer: "Qui est à l'appareil ?" },
      { question: "«您要留个话吗？»用于什么？", options: ["问是否留言 (demander si on veut laisser un message)", "转接电话", "挂电话"], answer: "问是否留言 (demander si on veut laisser un message)" },
      { question: "谁每天接很多电话？(Qui reçoit beaucoup d'appels chaque jour ?)", options: ["秘书 (la secrétaire)", "客户", "经理"], answer: "秘书 (la secrétaire)" },
      { question: "客户想找谁？(Qui le client veut-il contacter ?)", options: ["经理 (le manager)", "秘书", "工程师"], answer: "经理 (le manager)" },
      { question: "经理在做什么？(Que faisait le manager ?)", options: ["开会 (en réunion)", "吃饭", "休假"], answer: "开会 (en réunion)" },
      { question: "客户最后留下了什么？(Qu'a laissé le client ?)", options: ["电话号码 (son numéro de téléphone)", "邮件地址", "名片"], answer: "电话号码 (son numéro de téléphone)" },
      { question: "«请等一下，我给您转接»是什么意思？", options: ["Attendez, je vous transfère", "Au revoir", "Merci de votre appel"], answer: "Attendez, je vous transfère" },
      { question: "电话开头常用语是什么？(Quelle expression utilise-t-on au début d'un appel ?)", options: ["您好，这里是...", "再见", "谢谢您的来电"], answer: "您好，这里是..." },
      { question: "电话结尾常用语是什么？(Quelle expression utilise-t-on à la fin d'un appel ?)", options: ["谢谢您的来电", "请问您是哪位", "请等一下"], answer: "谢谢您的来电" },
      { question: "本课的主题是什么？(Quel est le thème de cette leçon ?)", options: ["商业电话沟通 (communication téléphonique professionnelle)", "餐厅对话", "家庭关系"], answer: "商业电话沟通 (communication téléphonique professionnelle)" },
    ]},
    { lessonId: 8, title: "测验 8", subtitle: "人际交往", passingScore: 7, questions: [
      { question: "«我主要负责...»用于什么？", options: ["介绍工作职责 (présenter ses responsabilités)", "问候", "告别"], answer: "介绍工作职责 (présenter ses responsabilités)" },
      { question: "«我们交换一下名片吧»是什么意思？", options: ["Échangeons nos cartes de visite", "Au revoir", "Enchanté"], answer: "Échangeons nos cartes de visite" },
      { question: "玛丽在哪里认识了新伙伴？(Où Marie a-t-elle rencontré son nouveau partenaire ?)", options: ["商业论坛 (un forum d'affaires)", "学校", "医院"], answer: "商业论坛 (un forum d'affaires)" },
      { question: "玛丽负责什么？(De quoi Marie est-elle responsable ?)", options: ["市场营销 (marketing)", "会计", "采购"], answer: "市场营销 (marketing)" },
      { question: "他们最后做了什么？(Qu'ont-ils finalement fait ?)", options: ["交换了名片 (échangé leurs cartes de visite)", "争论了", "离开了"], answer: "交换了名片 (échangé leurs cartes de visite)" },
      { question: "«我很感兴趣听听你的项目»用于什么？", options: ["延续对话 (faire durer la conversation)", "结束对话", "拒绝"], answer: "延续对话 (faire durer la conversation)" },
      { question: "«我们以后可以保持联系»是什么意思？", options: ["Restons en contact", "Au revoir pour toujours", "Je ne te connais pas"], answer: "Restons en contact" },
      { question: "«我是...公司的...»用于什么？", options: ["介绍工作单位 (présenter son entreprise)", "说再见", "问问题"], answer: "介绍工作单位 (présenter son entreprise)" },
      { question: "玛丽在哪个行业工作？(Dans quel secteur travaille Marie ?)", options: ["进出口 (import-export)", "医疗", "教育"], answer: "进出口 (import-export)" },
      { question: "本课主题是什么？(Quel est le thème de cette leçon ?)", options: ["人际交往 (réseautage)", "商业谈判", "电话沟通"], answer: "人际交往 (réseautage)" },
    ]},
    { lessonId: 9, title: "测验 9", subtitle: "解决问题", passingScore: 7, questions: [
      { question: "«问题是...»用于什么？", options: ["描述问题 (décrire un problème)", "赞成", "问候"], answer: "描述问题 (décrire un problème)" },
      { question: "«我们可以试试...»用于什么？", options: ["提出解决方法 (proposer une solution)", "描述问题", "拒绝"], answer: "提出解决方法 (proposer une solution)" },
      { question: "工厂发生了什么？(Que s'est-il passé à l'usine ?)", options: ["机器停止 (une machine s'est arrêtée)", "工人请假", "销售下滑"], answer: "机器停止 (une machine s'est arrêtée)" },
      { question: "这导致了什么？(Qu'est-ce que cela a causé ?)", options: ["生产延迟 (un retard de production)", "销售增加", "没有影响"], answer: "生产延迟 (un retard de production)" },
      { question: "工程师提出了什么？(Que propose l'ingénieur ?)", options: ["更换零件 (remplacer la pièce)", "关闭工厂", "换工人"], answer: "更换零件 (remplacer la pièce)" },
      { question: "修复后结果怎么样？(Quel a été le résultat après la réparation ?)", options: ["办法有效 (la solution a fonctionné)", "没有改善", "更糟了"], answer: "办法有效 (la solution a fonctionné)" },
      { question: "«我们需要调整计划»是什么意思？", options: ["Nous devons ajuster le plan", "Le plan est parfait", "Nous annulons le plan"], answer: "Nous devons ajuster le plan" },
      { question: "«这导致了...»用于什么？", options: ["解释问题的结果 (expliquer la conséquence d'un problème)", "表达感谢", "问候"], answer: "解释问题的结果 (expliquer la conséquence d'un problème)" },
      { question: "«最好的解决办法是...»用于什么？", options: ["建议最佳方法 (recommander la meilleure méthode)", "油问", "表达怀疑"], answer: "建议最佳方法 (recommander la meilleure méthode)" },
      { question: "本课的主题是什么？(Quel est le thème de cette leçon ?)", options: ["解决问题 (résolution de problèmes)", "会议技巧", "人际交往"], answer: "解决问题 (résolution de problèmes)" },
    ]},
    { lessonId: 10, title: "测验 10", subtitle: "跨文化沟通", passingScore: 7, questions: [
      { question: "在中国文化中，什么很重要？(Qu'est-ce qui est important dans la culture chinoise ?)", options: ["保持面子 (préserver la face)", "快速拒绝", "大声讲话"], answer: "保持面子 (préserver la face)" },
      { question: "«我理解你们的传统»是什么意思？", options: ["Je comprends votre tradition", "Je ne comprends rien", "Je refuse votre tradition"], answer: "Je comprends votre tradition" },
      { question: "活德和谁合作？(Avec qui Harold travaille-t-il ?)", options: ["一个中国合作伙伴 (un partenaire chinois)", "他的老师", "他的家人"], answer: "一个中国合作伙伴 (un partenaire chinois)" },
      { question: "活德不理解什么？(Que ne comprend pas Harold ?)", options: ["为什么对方不直接说«不» (pourquoi son partenaire ne dit jamais non directement)", "对方的名字", "对方的工作"], answer: "为什么对方不直接说«不» (pourquoi son partenaire ne dit jamais non directement)" },
      { question: "朋友怎么解释？(Comment l'ami explique-t-il ?)", options: ["直接拒绝可能伤害关系 (un refus direct peut nuire à la relation)", "这是意外", "没有原因"], answer: "直接拒绝可能伤害关系 (un refus direct peut nuire à la relation)" },
      { question: "«沉默有时表示在思考»意味着什么？", options: ["沉默不一定是拒绝 (le silence n'est pas forcément un refus)", "沉默是生气", "沉默是同意"], answer: "沉默不一定是拒绝 (le silence n'est pas forcément un refus)" },
      { question: "从那以后活德学习什么？(Qu'apprend Harold depuis lors ?)", options: ["尊重文化差异 (respecter les différences culturelles)", "忽视差异", "放弃合作"], answer: "尊重文化差异 (respecter les différences culturelles)" },
      { question: "«请告诉我正确的做法»用于什么？", options: ["请求帮助和尊重 (demander de l'aide avec respect)", "拒绝帮助", "批评对方"], answer: "请求帮助和尊重 (demander de l'aide avec respect)" },
      { question: "本课的主题是什么？(Quel est le thème de cette leçon ?)", options: ["跨文化沟通 (communication interculturelle)", "电话沟通", "解决问题"], answer: "跨文化沟通 (communication interculturelle)" },
      { question: "为什么了解文化差异很重要？(Pourquoi est-il important de comprendre les différences culturelles ?)", options: ["避免误会和保护关系 (éviter les malentendus et protéger les relations)", "让人印象深刻", "没有特别理由"], answer: "避免误会和保护关系 (éviter les malentendus et protéger les relations)" },
    ]},
    { lessonId: 11, title: "测验 11", subtitle: "领导力和团队管理", passingScore: 7, questions: [
      { question: "«大家做得很棒！»用于什么？", options: ["激励团队 (motiver l'équipe)", "批评团队", "解雇员工"], answer: "激励团队 (motiver l'équipe)" },
      { question: "«请你负责这部分»用于什么？", options: ["分配任务 (déléguer une tâche)", "请求帮助", "赞成团队"], answer: "分配任务 (déléguer une tâche)" },
      { question: "陈经理领导什么？(Que dirige Mme Chen ?)", options: ["一个大项目 (un grand projet)", "一个学校", "一个家庭"], answer: "一个大项目 (un grand projet)" },
      { question: "她对团队说什么？(Que dit-elle à l'équipe ?)", options: ["大家做得很棒 (vous faites tous du bon travail)", "大家做得不好", "我们失败了"], answer: "大家做得很棒 (vous faites tous du bon travail)" },
      { question: "她如何分配任务？(Comment délègue-t-elle les tâches ?)", options: ["按特长分配 (selon les forces de chacun)", "随机分配", "自己做所有事"], answer: "按特长分配 (selon les forces de chacun)" },
      { question: "她每周做什么？(Que fait-elle chaque semaine ?)", options: ["给出反馈 (donner des retours)", "改变计划", "解雇人"], answer: "给出反馈 (donner des retours)" },
      { question: "项目成功后她做什么？(Que fait-elle après la réussite du projet ?)", options: ["感谢每一个人 (remercier chacun)", "批评团队", "离开公司"], answer: "感谢每一个人 (remercier chacun)" },
      { question: "«这个地方可以改进»用于什么？", options: ["给出建设性反馈 (donner un retour constructif)", "赞美", "批判"], answer: "给出建设性反馈 (donner un retour constructif)" },
      { question: "«我们每个人都有自己的角色»意味着什么？", options: ["团队成员分工明确 (les tâches de l'équipe sont clairement divisées)", "没有角色", "每个人做同样的事"], answer: "团队成员分工明确 (les tâches de l'équipe sont clairement divisées)" },
      { question: "本课的主题是什么？(Quel est le thème de cette leçon ?)", options: ["领导力和团队管理 (leadership et gestion d'équipe)", "跨文化沟通", "电话技巧"], answer: "领导力和团队管理 (leadership et gestion d'équipe)" },
    ]},
    { lessonId: 12, title: "测验 12", subtitle: "期末复习和对话", passingScore: 7, questions: [
      { question: "莱论已经学了多久汉语？(Depuis combien de temps Léon apprend le chinois ?)", options: ["三年 (trois ans)", "一个月", "十年"], answer: "三年 (trois ans)" },
      { question: "现在他可以做什么？(Que peut-il faire maintenant ?)", options: ["谈判、开会和做演讲 (négocier, animer des réunions et présenter)", "只会问候", "什么都不会"], answer: "谈判、开会和做演讲 (négocier, animer des réunions et présenter)" },
      { question: "莱论的下一个目标是什么？(Quel est son prochain objectif ?)", options: ["带领国际团队 (diriger une équipe internationale)", "停止学习", "换工作"], answer: "带领国际团队 (diriger une équipe internationale)" },
      { question: "本级包含哪个语法点？(Quel point de grammaire est couvert ce niveau ?)", options: ["假设句和能态动词 (conditionnels et verbes modaux)", "颜色词", "数字"], answer: "假设句和能态动词 (conditionnels et verbes modaux)" },
      { question: "«成交»在商业谈判中是什么意思？", options: ["达成协议 (conclure un accord)", "取消协议", "开始谈判"], answer: "达成协议 (conclure un accord)" },
      { question: "对话中A提出了什么报价？(Quelle offre A a-t-il proposée ?)", options: ["五万元 (50 000 yuans)", "一万元", "十万元"], answer: "五万元 (50 000 yuans)" },
      { question: "B认为价格怎么样？(Que pense B du prix ?)", options: ["有点高 (un peu élevé)", "很便宜", "没有说"], answer: "有点高 (un peu élevé)" },
      { question: "如果付款时间合适，A会做什么？(Que fera A si le paiement se fait à temps ?)", options: ["降价 (baisser le prix)", "涨价", "取消协议"], answer: "降价 (baisser le prix)" },
      { question: "本级所学的技能有哪些？(Quelles compétences a-t-on apprises ce niveau ?)", options: ["谈判、演讲、领导力等 (négociation, présentation, leadership, etc.)", "只有颜色", "只有数字"], answer: "谈判、演讲、领导力等 (négociation, présentation, leadership, etc.)" },
      { question: "莱论说进步的原因是什么？(Quelle est la raison de ses progrès selon lui ?)", options: ["每天练习 (pratiquer tous les jours)", "运气", "天赋"], answer: "每天练习 (pratiquer tous les jours)" },
    ]},
  ],

  finalQuiz: {
    title: "期末测验 - 第三级 (Quiz Final - Niveau 3)",
    subtitle: "本测验涵盖第三级所有课程。(Ce quiz couvre toutes les leçons du Niveau 3.)",
    passingScore: 15,
    questions: [
      { question: "«如果...就...»用于什么？", options: ["条件和结果", "问候", "赞成"], answer: "条件和结果" },
      { question: "«应该»和«必须»表示什么？", options: ["义务", "能力", "可能性"], answer: "义务" },
      { question: "«我们的报价是...»用于什么场合？", options: ["商业谈判 (négociation)", "电话沟通", "人际交往"], answer: "商业谈判 (négociation)" },
      { question: "«首先、第二、最后»用于什么？", options: ["排列演讲要点 (ordonner les points de la présentation)", "谈判价格", "表达感情"], answer: "排列演讲要点 (ordonner les points de la présentation)" },
      { question: "«我们开始吧»用于哪里？", options: ["开启会议 (ouvrir une réunion)", "结束会议", "讨价"], answer: "开启会议 (ouvrir une réunion)" },
      { question: "报告的四个部分是什么？", options: ["摘要、背景、发现、建议", "开头、中间、结尾", "问题和答案"], answer: "摘要、背景、发现、建议" },
      { question: "«请问您是哪位？»是什么意思？", options: ["Qui est à l'appareil ?", "Où êtes-vous ?", "Comment ça va ?"], answer: "Qui est à l'appareil ?" },
      { question: "«我们交换一下名片吧»用于哪种场合？", options: ["人际交往 (réseautage)", "家庭对话", "会议结束"], answer: "人际交往 (réseautage)" },
      { question: "«我们可以试试...»用于什么？", options: ["提出解决方法 (proposer une solution)", "描述问题", "拒绝帮助"], answer: "提出解决方法 (proposer une solution)" },
      { question: "在中国文化中，什么很重要？", options: ["保持面子 (préserver la face)", "快速拒绝", "大声讲话"], answer: "保持面子 (préserver la face)" },
      { question: "«大家做得很棒！»用于什么？", options: ["激励团队 (motiver l'équipe)", "批评团队", "解雇员工"], answer: "激励团队 (motiver l'équipe)" },
      { question: "文德在准备什么？(Rappel : à quoi se prépare Winfred ?)", options: ["面试 (un entretien)", "考试", "比赛"], answer: "面试 (un entretien)" },
      { question: "李经理讨价时要求什么？", options: ["降价十个点", "增加数量", "取消订单"], answer: "降价十个点" },
      { question: "李白的演讲有几部分？", options: ["三部分", "五部分", "一部分"], answer: "三部分" },
      { question: "陈经理如何分配任务？", options: ["按特长分配", "随机分配", "自己做完"], answer: "按特长分配" },
      { question: "活德为什么困惑？(Rappel : pourquoi Harold était-il confus ?)", options: ["对方不直接说«不»", "对方太善谈", "对方说英语"], answer: "对方不直接说«不»" },
      { question: "工厂的问题是什么？(Rappel : quel était le problème à l'usine ?)", options: ["机器停止", "工人请假", "没有原料"], answer: "机器停止" },
      { question: "«因此，我们建议...»在报告中用于什么部分？", options: ["建议 (recommandations)", "背景", "摘要"], answer: "建议 (recommandations)" },
      { question: "莱论的下一个目标是什么？(Rappel : quel est le prochain objectif de Léon ?)", options: ["带领国际团队", "换工作", "停止学习"], answer: "带领国际团队" },
      {
        question: "哪个学生已经掉成了高级汉语使用者？(Quel élève est devenu un utilisateur avancé du chinois ?)",
        options: [
          "能谈判、主持会议、做演讲并领导团队的学生",
          "只会打招呼的学生",
          "从不练习的学生",
        ],
        answer: "能谈判、主持会议、做演讲并领导团队的学生",
      },
    ],
  },
};
