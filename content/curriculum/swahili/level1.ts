import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan,
// written entirely in Swahili (immersive method, matching the pattern
// already used for the English and French courses).
export const swahiliLevel1: LevelCurriculum = {
  langCode: "SW",
  langLabel: "Swahili",
  langSlug: "swahili",
  level: 1,
  levelTitle: "Kiwango cha 1 - Kiswahili cha Mwanzo",
  levelSubtitle: "Jenga msingi imara wa kuelewa na kuzungumza Kiswahili cha kila siku.",

  lessons: [
    {
      id: 1,
      title: "Kusalimiana na Kujitambulisha",
      subtitle: "Jifunze kusalimiana na kujitambulisha kwa Kiswahili.",
      sections: [
        { heading: "Salamu za Kawaida", body: ["Habari / Jambo", "Habari za asubuhi", "Habari za mchana", "Habari za jioni", "Nzuri, asante"] },
        { heading: "Kujitambulisha", body: ["Jina langu ni...", "Nina miaka...", "Ninaishi...", "Mimi ni mwanafunzi", "Nimefurahi kukutana nawe"] },
      ],
      speakText: `Salamu ni muhimu tunapokutana na watu.

Salamu za kawaida: Habari. Jambo. Habari za asubuhi. Habari za mchana. Habari za jioni. Nzuri, asante.

Kujitambulisha: Jina langu ni... Nina miaka... Ninaishi... Mimi ni mwanafunzi. Nimefurahi kukutana nawe.`,
      videoTopic: "Jinsi ya kujitambulisha kwa Kiswahili.",
      readingTitle: "Habari!",
      reading: [
        "Jina langu ni Amani. Nina miaka 12. Ninaishi Kolwezi. Mimi ni mwanafunzi.",
        "Kila asubuhi, ninasema “Habari” kwa walimu na marafiki zangu.",
        "Ninapenda kukutana na watu wapya. Ninapokutana na mtu kwa mara ya kwanza, ninasema: “Habari, jina langu ni Amani. Nimefurahi kukutana nawe.”",
      ],
      readingSpeakText: `Habari! Jina langu ni Amani. Nina miaka kumi na mbili. Ninaishi Kolwezi. Mimi ni mwanafunzi.

Kila asubuhi, ninasema habari kwa walimu na marafiki zangu.`,
      exercises: ["Habari, jina langu ni ...", "Nina miaka ...", "Ninaishi ...", "Mimi ni ..."],
      speakingTopic: "Jitambulishe mbele ya darasa kwa sentensi tatu.",
    },
    {
      id: 2,
      title: "Alfabeti na Matamshi",
      subtitle: "Jifunze alfabeti ya Kiswahili na fanya mazoezi ya matamshi.",
      sections: [
        { heading: "Alfabeti ya Kiswahili", body: ["Alfabeti ya Kiswahili ina herufi 24 (hakuna Q wala X).", "A B C D E F G H I J K L M", "N O P R S T U V W Y Z"] },
        { heading: "Irabu (Vowels)", body: ["A", "E", "I", "O", "U"] },
        { heading: "Mfano", body: ["Tunatumia herufi kuandika majina na maneno.", "Jina langu ni Juma.", "J - U - M - A"] },
      ],
      speakText: `Alfabeti ya Kiswahili ina herufi ishirini na nne.

A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T, U, V, W, Y, Z.

Irabu ni: A, E, I, O, U.

Tunatumia herufi kuandika majina na maneno. Mfano: jina langu ni Juma. J, U, M, A.`,
      videoTopic: "Kusoma alfabeti ya Kiswahili kuanzia A hadi Z.",
      readingTitle: "Habari, jina langu ni Neema.",
      reading: [
        "Ninajifunza Kiswahili shuleni.",
        "Leo ninajifunza alfabeti.",
        "Ninajizoeza kila siku na ninapenda kujifunza maneno mapya.",
        "Ninaweza kuandika jina langu: N - E - E - M - A.",
      ],
      readingSpeakText: `Habari, jina langu ni Neema. Ninajifunza Kiswahili shuleni. Leo ninajifunza alfabeti.`,
      exercises: ["Soma alfabeti kuanzia A hadi Z.", "Andika jina lako kwa herufi.", "Andika anwani yako ya barua pepe.", "Fanya mazoezi ya matamshi ya irabu."],
      speakingTopic: "Jitambulishe na uandike jina lako kamili kwa herufi.",
    },
    {
      id: 3,
      title: "Namba na Taarifa Binafsi",
      subtitle: "Jifunze namba na jinsi ya kutoa taarifa zako binafsi.",
      sections: [
        { heading: "Namba 1 hadi 10", body: ["1 - Moja", "2 - Mbili", "3 - Tatu", "4 - Nne", "5 - Tano", "6 - Sita", "7 - Saba", "8 - Nane", "9 - Tisa", "10 - Kumi"] },
        { heading: "Taarifa Binafsi", body: ["Maswali muhimu:", "Jina lako nani?", "Una miaka mingapi?", "Unaishi wapi?", "Namba yako ya simu ni ngapi?"] },
        { heading: "Mfano wa Majibu", body: ["Jina langu ni Juma.", "Nina miaka 15.", "Ninaishi Kinshasa.", "Namba yangu ya simu ni 123456789."] },
      ],
      speakText: `Namba moja hadi kumi: moja, mbili, tatu, nne, tano, sita, saba, nane, tisa, kumi.

Taarifa binafsi: Jina lako nani? Una miaka mingapi? Unaishi wapi?

Mfano wa majibu: Jina langu ni Juma. Nina miaka kumi na tano. Ninaishi Kinshasa.`,
      videoTopic: "Kujifunza namba na kujitambulisha.",
      readingTitle: "Habari, jina langu ni Furaha.",
      reading: ["Nina miaka 14.", "Ninaishi Kinshasa.", "Namba yangu ya simu ni 987654321."],
      readingSpeakText: `Habari, jina langu ni Furaha. Nina miaka kumi na nne. Ninaishi Kinshasa.`,
      exercises: ["Hesabu kuanzia 1 hadi 10 kwa Kiswahili.", "Andika jina lako kwa Kiswahili.", "Sema umri wako kwa Kiswahili.", "Andika namba yako ya simu kwa Kiswahili."],
      speakingTopic: "Jitambulishe kwa taarifa zako binafsi.",
    },
    {
      id: 4,
      title: "Familia",
      subtitle: "Jifunze wanafamilia na jinsi ya kuzungumzia familia yako.",
      sections: [
        { heading: "Wanafamilia", body: ["Baba", "Mama", "Kaka", "Dada", "Mjomba", "Shangazi", "Babu", "Bibi", "Binamu", "Wazazi"] },
        { heading: "Sentensi za Muhimu", body: ["Huyu ni baba yangu.", "Mama yangu ni mpole sana.", "Nina kaka mmoja na dada wawili.", "Ninapenda familia yangu."] },
        { heading: "Mfano", body: ["Ninaishi na familia yangu.", "Baba yangu anafanya kazi ofisini.", "Mama yangu ni mwalimu.", "Tunafurahi pamoja."] },
      ],
      speakText: `Wanafamilia: Baba, Mama, Kaka, Dada, Mjomba, Shangazi, Babu, Bibi, Binamu, Wazazi.

Sentensi za muhimu: Huyu ni baba yangu. Mama yangu ni mpole sana. Nina kaka mmoja na dada wawili.

Mfano: Ninaishi na familia yangu. Baba yangu anafanya kazi ofisini.`,
      videoTopic: "Kujifunza msamiati wa familia.",
      readingTitle: "Jina langu ni Yosefu.",
      reading: ["Ninaishi na wazazi wangu na dada yangu.", "Baba yangu ni daktari.", "Mama yangu ni mpole sana.", "Ninapenda kutumia muda na familia yangu."],
      readingSpeakText: `Jina langu ni Yosefu. Ninaishi na wazazi wangu na dada yangu. Baba yangu ni daktari.`,
      exercises: ["Taja wanafamilia watano kwa Kiswahili.", "Eleza familia yako kwa sentensi rahisi.", "Sema nani anaishi nyumbani kwako.", "Jizoeze kusema uhusiano wa kifamilia kwa sauti."],
      speakingTopic: "Zungumzia familia yako na watu walio karibu nawe.",
    },
    {
      id: 5,
      title: "Vitu vya Kila Siku",
      subtitle: "Jifunze vitu tunavyotumia kila siku.",
      sections: [
        { heading: "Vitu vya Kawaida", body: ["Kitabu", "Kalamu", "Kiti", "Meza", "Simu", "Mkoba", "Kompyuta", "Chupa", "Daftari", "Ufunguo"] },
        { heading: "Sentensi za Muhimu", body: ["Hiki ni kitabu changu.", "Ninaandika kwa kalamu.", "Kiti ni cha bluu.", "Simu yangu iko mezani."] },
        { heading: "Kueleza Vitu", body: ["Tunaweza kueleza vitu kwa rangi, ukubwa, na matumizi.", "Kitabu ni kidogo.", "Kompyuta ni mpya.", "Mkoba ni mzito."] },
      ],
      speakText: `Vitu vya kawaida: Kitabu, Kalamu, Kiti, Meza, Simu, Mkoba, Kompyuta, Chupa, Daftari, Ufunguo.

Sentensi za muhimu: Hiki ni kitabu changu. Ninaandika kwa kalamu. Kiti ni cha bluu.`,
      videoTopic: "Kujifunza vitu vya kawaida na matamshi yake.",
      readingTitle: "Jina langu ni Petro.",
      reading: ["Kila siku ninakwenda shuleni na mkoba na daftari langu.", "Ninatumia kalamu kuandika kwenye kitabu changu.", "Simu yangu iko mkobani.", "Ninakaa kwenye kiti na kusoma kila asubuhi."],
      readingSpeakText: `Jina langu ni Petro. Kila siku ninakwenda shuleni na mkoba na daftari langu.`,
      exercises: ["Taja vitu vitano karibu nawe.", "Eleza mkoba wako wa shule.", "Andika sentensi tatu kwa majina ya vitu.", "Jizoeze matamshi."],
      speakingTopic: "Zungumzia vitu unavyotumia kila siku.",
    },
    {
      id: 6,
      title: "Rangi na Maelezo",
      subtitle: "Jifunze rangi na jinsi ya kueleza watu na vitu.",
      sections: [
        { heading: "Rangi za Kawaida", body: ["Nyekundu", "Bluu", "Kijani", "Njano", "Nyeusi", "Nyeupe", "Chungwa", "Kahawia", "Pinki", "Zambarau"] },
        { heading: "Kueleza Vitu", body: ["Mkoba ni mwekundu.", "Simu ni nyeusi.", "Kiti ni cha bluu.", "Daftari ni kijani."] },
        { heading: "Kueleza Watu", body: ["Yeye ni mrefu.", "Yeye ni mfupi.", "Yeye ana furaha.", "Yeye ni mwenye nguvu.", "Yeye ni mkarimu."] },
      ],
      speakText: `Rangi za kawaida: Nyekundu, Bluu, Kijani, Njano, Nyeusi, Nyeupe, Chungwa, Kahawia, Pinki, Zambarau.

Kueleza vitu: Mkoba ni mwekundu. Simu ni nyeusi. Kiti ni cha bluu.

Kueleza watu: Yeye ni mrefu. Yeye ni mfupi. Yeye ana furaha.`,
      videoTopic: "Kujifunza rangi na kufanya mazoezi ya maelezo.",
      readingTitle: "Jina langu ni Zawadi.",
      reading: ["Nina mkoba wa shule wa bluu.", "Daftari langu ni kijani na simu yangu ni nyeusi.", "Nina furaha na ni mkarimu.", "Kaka yangu mdogo ni mfupi lakini mwenye nguvu sana."],
      readingSpeakText: `Jina langu ni Zawadi. Nina mkoba wa shule wa bluu. Daftari langu ni kijani na simu yangu ni nyeusi.`,
      exercises: ["Taja rangi tano kwa Kiswahili.", "Eleza simu yako.", "Jieleze mwenyewe kwa sentensi mbili.", "Tumia vivumishi vitatu kwenye sentensi."],
      speakingTopic: "Jieleze mwenyewe na vitu vitatu karibu nawe.",
    },
    {
      id: 7,
      title: "Siku, Miezi, na Tarehe",
      subtitle: "Jifunze kuzungumzia siku, miezi, na tarehe muhimu.",
      sections: [
        { heading: "Siku za Wiki", body: ["Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi", "Jumapili"] },
        { heading: "Miezi ya Mwaka", body: ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"] },
        { heading: "Sentensi za Muhimu", body: ["Leo ni Jumatatu.", "Siku yangu ya kuzaliwa ni Julai.", "Shule inaanza Septemba.", "Ninaenda kanisani Jumapili."] },
      ],
      speakText: `Siku za wiki: Jumatatu, Jumanne, Jumatano, Alhamisi, Ijumaa, Jumamosi, Jumapili.

Miezi ya mwaka: Januari, Februari, Machi, Aprili, Mei, Juni, Julai, Agosti, Septemba, Oktoba, Novemba, Desemba.

Sentensi za muhimu: Leo ni Jumatatu. Siku yangu ya kuzaliwa ni Julai.`,
      videoTopic: "Kujifunza siku, miezi, na jinsi ya kusema tarehe.",
      readingTitle: "Jina langu ni Kevin.",
      reading: [
        "Leo ni Ijumaa, tarehe 12 Juni. Ninaamka mapema kila asubuhi.",
        "Ninakwenda shuleni kuanzia Jumatatu hadi Ijumaa na ninapumzika Jumamosi.",
        "Mwezi ninaopenda zaidi ni Julai, kwa sababu ndiyo mwezi wa siku yangu ya kuzaliwa.",
        "Kila Jumapili, ninaenda kanisani na wazazi wangu.",
      ],
      readingSpeakText: `Jina langu ni Kevin. Leo ni Ijumaa, tarehe kumi na mbili Juni. Ninaamka mapema kila asubuhi.`,
      exercises: ["Taja siku zote za wiki.", "Taja miezi yote ya mwaka.", "Sema tarehe ya siku yako ya kuzaliwa.", "Sema leo ni siku gani."],
      speakingTopic: "Zungumzia siku yako ya kuzaliwa na shughuli zako za wiki.",
    },
    {
      id: 8,
      title: "Shughuli za Kila Siku",
      subtitle: "Jifunze kuzungumzia shughuli na tabia zako za kila siku.",
      sections: [
        { heading: "Shughuli za Kawaida", body: ["Kuamka", "Kupiga mswaki", "Kuoga", "Kula kifungua kinywa", "Kwenda shuleni", "Kusoma", "Kula chakula cha mchana", "Kucheza na marafiki", "Kufanya kazi za nyumbani", "Kulala"] },
        { heading: "Sentensi za Muhimu", body: ["Ninaamka saa 12 asubuhi.", "Ninapiga mswaki kila asubuhi.", "Ninakwenda shuleni saa moja asubuhi.", "Ninafanya kazi za nyumbani jioni."] },
      ],
      speakText: `Shughuli za kawaida: Kuamka, Kupiga mswaki, Kuoga, Kula kifungua kinywa, Kwenda shuleni, Kusoma, Kula chakula cha mchana, Kucheza na marafiki, Kufanya kazi za nyumbani, Kulala.

Sentensi za muhimu: Ninaamka saa kumi na mbili asubuhi. Ninakwenda shuleni saa moja asubuhi.`,
      videoTopic: "Kujifunza msamiati wa shughuli za kila siku.",
      readingTitle: "Jina langu ni Danieli.",
      reading: [
        "Kila siku ninaamka saa kumi na mbili asubuhi.",
        "Ninapiga mswaki na kuoga kabla ya kifungua kinywa.",
        "Saa moja asubuhi, ninakwenda shuleni na kusoma na wenzangu.",
        "Mchana, ninacheza mpira wa miguu na marafiki zangu.",
        "Jioni, ninafanya kazi za nyumbani na kulala saa tatu usiku.",
      ],
      readingSpeakText: `Jina langu ni Danieli. Kila siku ninaamka saa kumi na mbili asubuhi.`,
      exercises: ["Eleza shughuli zako za asubuhi.", "Sema unaamka saa ngapi.", "Andika sentensi tatu kuhusu shughuli zako za kila siku.", "Zungumzia unachofanya baada ya shule."],
      speakingTopic: "Zungumzia shughuli zako za kila siku kuanzia asubuhi hadi usiku.",
    },
    {
      id: 9,
      title: "Chakula na Vinywaji",
      subtitle: "Jifunze msamiati wa chakula, vinywaji, na milo.",
      sections: [
        { heading: "Vyakula vya Kawaida", body: ["Wali", "Mkate", "Nyama", "Samaki", "Mayai", "Kuku", "Ndizi", "Tofaa"] },
        { heading: "Vinywaji vya Kawaida", body: ["Maji", "Maziwa", "Juisi", "Chai", "Kahawa"] },
        { heading: "Sentensi za Muhimu", body: ["Ninakunywa maji kila siku.", "Chakula ninachopenda zaidi ni wali.", "Ninakula mkate kifungua kinywa.", "Tunakula kuku chakula cha jioni."] },
      ],
      speakText: `Vyakula vya kawaida: Wali, Mkate, Nyama, Samaki, Mayai, Kuku, Ndizi, Tofaa.

Vinywaji vya kawaida: Maji, Maziwa, Juisi, Chai, Kahawa.

Sentensi za muhimu: Ninakunywa maji kila siku. Chakula ninachopenda zaidi ni wali.`,
      videoTopic: "Kujifunza msamiati wa chakula na vinywaji.",
      readingTitle: "Jina langu ni Esta.",
      reading: [
        "Kila asubuhi ninakula mkate na mayai kifungua kinywa.",
        "Shuleni, ninakunywa maji na wakati mwingine juisi.",
        "Chakula ninachopenda zaidi ni wali na kuku.",
        "Jioni, familia yangu inakula samaki na mboga pamoja.",
      ],
      readingSpeakText: `Jina langu ni Esta. Kila asubuhi ninakula mkate na mayai kifungua kinywa.`,
      exercises: ["Taja vyakula vitano kwa Kiswahili.", "Taja vinywaji vitatu kwa Kiswahili.", "Sema unachokula kifungua kinywa.", "Eleza mlo unaoupenda zaidi."],
      speakingTopic: "Zungumzia chakula unachopenda na unachokunywa kila siku.",
    },
    {
      id: 10,
      title: "Maeneo Mjini",
      subtitle: "Jifunze msamiati wa maeneo yanayopatikana mjini.",
      sections: [
        { heading: "Maeneo ya Kawaida Mjini", body: ["Shule", "Hospitali", "Soko", "Benki", "Mkahawa", "Kanisa", "Kituo cha polisi", "Kituo cha mabasi", "Maktaba", "Bustani"] },
        { heading: "Sentensi za Muhimu", body: ["Ninakwenda shuleni kila asubuhi.", "Mama yangu anafanya kazi hospitalini.", "Tunanunua chakula sokoni.", "Watoto wanacheza bustanini."] },
        { heading: "Kuuliza Njia", body: ["Hospitali iko wapi?", "Nifikeje benki?", "Soko liko karibu na kanisa.", "Maktaba iko karibu na shule."] },
      ],
      speakText: `Maeneo ya kawaida mjini: Shule, Hospitali, Soko, Benki, Mkahawa, Kanisa, Kituo cha polisi, Kituo cha mabasi, Maktaba, Bustani.

Kuuliza njia: Hospitali iko wapi? Nifikeje benki? Soko liko karibu na kanisa.`,
      videoTopic: "Kujifunza msamiati wa maeneo na njia.",
      readingTitle: "Jumatano iliyopita, Michael alikwenda mjini na baba yake.",
      reading: [
        "Kwanza, walisimama benki kwa sababu baba yake alihitaji kutoa pesa.",
        "Baada ya benki, walitembea hadi sokoni kununua matunda na mboga mpya.",
        "Walipokuwa wakitembea, Michael aliona hospitali kubwa karibu na kituo cha polisi.",
        "Kabla ya kurudi nyumbani, walikaa kwenye mkahawa mdogo na kula chakula cha mchana pamoja.",
      ],
      readingSpeakText: `Jumatano iliyopita, Michael alikwenda mjini na baba yake. Kwanza, walisimama benki.`,
      exercises: ["Taja maeneo matano ya mji wako.", "Sema watu wananunua chakula wapi.", "Eleza maeneo karibu na nyumbani kwako.", "Tunga sentensi kwa msamiati wa mji."],
      speakingTopic: "Eleza maeneo unayotembelea mara kwa mara mjini.",
    },
    {
      id: 11,
      title: "Burudani na Mambo ya Kupenda",
      subtitle: "Jifunze kuzungumzia burudani na muda wako wa mapumziko.",
      sections: [
        { heading: "Burudani za Kawaida", body: ["Kusoma vitabu", "Kucheza mpira wa miguu", "Kusikiliza muziki", "Kuangalia filamu", "Kuchora", "Kucheza ngoma", "Kuimba", "Kupika", "Kuogelea", "Kucheza michezo ya video"] },
        { heading: "Sentensi za Muhimu", body: ["Burudani ninayopenda zaidi ni kusoma.", "Ninapenda kucheza mpira wa miguu.", "Yeye anapenda kusikiliza muziki.", "Tunaangalia filamu wikendi."] },
      ],
      speakText: `Burudani za kawaida: Kusoma vitabu, Kucheza mpira wa miguu, Kusikiliza muziki, Kuangalia filamu, Kuchora, Kucheza ngoma, Kuimba, Kupika, Kuogelea, Kucheza michezo ya video.

Sentensi za muhimu: Burudani ninayopenda zaidi ni kusoma. Ninapenda kucheza mpira wa miguu.`,
      videoTopic: "Kujifunza msamiati wa burudani na muda wa mapumziko.",
      readingTitle: "Jumamosi mchana, James alimtembelea binamu yake Danieli.",
      reading: [
        "Alipofika, Danieli alikuwa amekaa nje akisoma kitabu kuhusu wanyama.",
        "Baada ya kusoma, wavulana hao wawili waliamua kucheza mpira wa miguu bustanini.",
        "Baadaye, walirudi nyumbani kusikiliza muziki huku dada yake Danieli akichora sebuleni.",
        "James alisema alifurahia siku hiyo kwa sababu kufanya shughuli za kufurahisha kulimfanya awe na furaha.",
      ],
      readingSpeakText: `Jumamosi mchana, James alimtembelea binamu yake Danieli. Alipofika, Danieli alikuwa amekaa nje akisoma kitabu.`,
      exercises: ["Taja burudani tatu unazopenda.", "Zungumzia unachofanya wakati wa mapumziko.", "Tunga sentensi kwa msamiati wa burudani.", "Eleza shughuli yako ya wikendi unayopenda zaidi."],
      speakingTopic: "Zungumzia burudani unayopenda zaidi na kwa nini unaipenda.",
    },
    {
      id: 12,
      title: "Mapitio ya Mwisho na Mazungumzo Halisi",
      subtitle: "Pitia kila kitu ulichojifunza na jizoeze mazungumzo halisi ya Kiswahili.",
      sections: [
        {
          heading: "Mambo Muhimu Tuliyojifunza",
          body: [
            "Kusalimiana kwa heshima",
            "Kujitambulisha",
            "Kuzungumzia umri na taarifa binafsi",
            "Kuzungumzia wanafamilia",
            "Kutaja vitu vya kila siku",
            "Kutumia rangi na maelezo",
            "Kuzungumzia tarehe na miezi",
            "Kueleza shughuli za kila siku",
            "Kuzungumzia chakula na vinywaji",
            "Kueleza maeneo mjini",
            "Kuzungumzia burudani na mambo ya kupenda",
          ],
        },
        {
          heading: "Mfano wa Mazungumzo Halisi",
          body: [
            "A: Habari! Jina langu ni David. Jina lako nani?",
            "B: Habari David, jina langu ni Sara. Nimefurahi kukutana nawe.",
            "A: Nami nimefurahi. Una miaka mingapi?",
            "B: Nina miaka 15. Ninaishi karibu na soko la mji.",
            "A: Vizuri. Unapenda kufanya nini wakati wa mapumziko?",
            "B: Ninapenda kusoma vitabu na kusikiliza muziki.",
            "A: Chakula unachopenda zaidi ni kipi?",
            "B: Ninapenda sana wali na kuku.",
          ],
        },
      ],
      speakText: `Mambo muhimu tuliyojifunza: kusalimiana kwa heshima, kujitambulisha, kuzungumzia umri, kuzungumzia familia, kutaja vitu vya kila siku, kutumia rangi, kuzungumzia tarehe, kueleza shughuli za kila siku, kuzungumzia chakula, kueleza maeneo mjini, na kuzungumzia burudani.

Mfano wa mazungumzo halisi.

Habari, jina langu ni David. Jina lako nani?
Habari David, jina langu ni Sara. Nimefurahi kukutana nawe.`,
      videoTopic: "Kupitia mazungumzo ya msingi na msamiati wa Kiwango cha 1.",
      readingTitle: "Jumapili iliyopita, Kevin alisafiri na familia yake kumtembelea mjomba wake mjini.",
      reading: [
        "Kabla ya kuondoka, alikula mkate na kunywa chai kifungua kinywa.",
        "Alipofika, Kevin aliwasalimia wote kwa heshima na kujitambulisha kwa wageni ambao hakuwahi kukutana nao.",
        "Baadaye, alikwenda sokoni na binamu yake na kusaidia kununua mboga, samaki, na wali kwa chakula cha mchana.",
        "Mwisho wa siku, Kevin alisema alifurahia kutumia muda na familia na kufanya shughuli alizozipenda.",
      ],
      readingSpeakText: `Jumapili iliyopita, Kevin alisafiri na familia yake kumtembelea mjomba wake mjini. Kabla ya kuondoka, alikula mkate na kunywa chai kifungua kinywa.`,
      exercises: ["Jitambulishe kwa Kiswahili.", "Zungumzia familia yako.", "Eleza chakula unachopenda zaidi.", "Eleza shughuli zako za kila siku.", "Zungumzia burudani zako."],
      speakingTopic: "Jitambulishe na eleza siku ya kawaida ya maisha yako.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Jaribio 1",
      subtitle: "Kusalimiana na Kujitambulisha",
      passingScore: 7,
      questions: [
        { question: "Unamsalimiaje mtu?", options: ["Habari", "Kiti", "Maji"], answer: "Habari" },
        { question: "Unajitambulishaje?", options: ["Jina langu ni Juma", "Habari za usiku", "Benki"], answer: "Jina langu ni Juma" },
        { question: "Jina la mtoto kwenye hadithi ni nani?", options: ["Juma", "Amani", "Neema"], answer: "Amani" },
        { question: "Amani ana miaka mingapi?", options: ["Miaka 20", "Miaka 13", "Miaka 12"], answer: "Miaka 12" },
        { question: "Amani anaishi wapi?", options: ["Kolwezi", "Kinshasa", "Paris"], answer: "Kolwezi" },
        { question: "Chagua kujitambulisha:", options: ["Jina langu ni Amani", "Shule ni kubwa", "Kiti cha bluu"], answer: "Jina langu ni Amani" },
        { question: "Amani anasema nini asubuhi?", options: ["Kwaheri", "Habari", "Jambo"], answer: "Habari" },
        { question: "Chagua neno la salamu:", options: ["Habari", "Kuku", "Jumatatu"], answer: "Habari" },
        { question: "Anasema nini anapokutana na mtu mpya?", options: ["Nimefurahi kukutana nawe", "Habari, jina langu ni Amani, nimefurahi kukutana nawe", "Habari, karibu"], answer: "Habari, jina langu ni Amani, nimefurahi kukutana nawe" },
        { question: "Tunasema nini kwa kujitambulisha?", options: ["Jina langu ni...", "Pinda kushoto", "Ninakula wali"], answer: "Jina langu ni..." },
      ],
    },
    {
      lessonId: 2,
      title: "Jaribio 2",
      subtitle: "Alfabeti na Matamshi",
      passingScore: 7,
      questions: [
        { question: "Alfabeti ya Kiswahili ina herufi ngapi?", options: ["24", "26", "28"], answer: "24" },
        { question: "Ni herufi gani ni irabu?", options: ["B", "E", "T"], answer: "E" },
        { question: "Jina Juma linaandikwaje kwa herufi?", options: ["J-U-M-A", "J-U-M-O", "J-O-M-A"], answer: "J-U-M-A" },
        { question: "Herufi zinatumika kwa nini?", options: ["Kuandika majina na maneno", "Kupika", "Kucheza mpira"], answer: "Kuandika majina na maneno" },
        { question: "Jina la msichana kwenye hadithi ni nani?", options: ["Furaha", "Neema", "Zawadi"], answer: "Neema" },
        { question: "Neema anajifunza nini leo?", options: ["Alfabeti", "Namba", "Rangi"], answer: "Alfabeti" },
        { question: "Neema anajifunza Kiswahili wapi?", options: ["Nyumbani", "Shuleni", "Sokoni"], answer: "Shuleni" },
        { question: "Neema anaandikaje jina lake?", options: ["N-E-E-M-A", "N-E-M-A", "N-E-E-M-E"], answer: "N-E-E-M-A" },
        { question: "Neema anapenda nini?", options: ["Kujifunza maneno mapya", "Kulala", "Kuangalia televisheni"], answer: "Kujifunza maneno mapya" },
        { question: "Kuna irabu ngapi kwa Kiswahili?", options: ["5", "10", "20"], answer: "5" },
      ],
    },
    {
      lessonId: 3,
      title: "Jaribio 3",
      subtitle: "Namba na Taarifa Binafsi",
      passingScore: 7,
      questions: [
        { question: "Namba 5 inasemwaje kwa Kiswahili?", options: ["Saba", "Tano", "Nne"], answer: "Tano" },
        { question: "Namba 8 inasemwaje kwa Kiswahili?", options: ["Tatu", "Kumi", "Nane"], answer: "Nane" },
        { question: "Swali gani linauliza umri?", options: ["Jina lako nani?", "Una miaka mingapi?", "Kitabu kiko wapi?"], answer: "Una miaka mingapi?" },
        { question: "Sentensi gani ni sahihi?", options: ["Juma jina langu", "Jina langu ni Juma", "Ni Juma jina"], answer: "Jina langu ni Juma" },
        { question: "Jina la msichana kwenye hadithi ni nani?", options: ["Furaha", "Neema", "Zawadi"], answer: "Furaha" },
        { question: "Furaha ana miaka mingapi?", options: ["Miaka 18", "Miaka 14", "Miaka 10"], answer: "Miaka 14" },
        { question: "Furaha anaishi wapi?", options: ["London", "Paris", "Kinshasa"], answer: "Kinshasa" },
        { question: "Namba ya simu ya Furaha ni ngapi?", options: ["123456789", "987654321", "555666777"], answer: "987654321" },
        { question: "Taarifa gani ni taarifa binafsi?", options: ["Kiti cha bluu", "Mpira wa miguu", "Namba ya simu"], answer: "Namba ya simu" },
        { question: "Unahesabuje 1 hadi 3 kwa Kiswahili?", options: ["Moja, mbili, tatu", "Moja, tatu, mbili", "Mbili, moja, tatu"], answer: "Moja, mbili, tatu" },
      ],
    },
    {
      lessonId: 4,
      title: "Jaribio 4",
      subtitle: "Familia",
      passingScore: 7,
      questions: [
        { question: "Neno gani linamaanisha mzazi wa kiume?", options: ["Kaka", "Baba", "Mjomba"], answer: "Baba" },
        { question: "Nani ni mzazi wako wa kike?", options: ["Mama", "Dada", "Binamu"], answer: "Mama" },
        { question: "Sentensi gani ni sahihi?", options: ["Mama yangu ni mpole", "Mpole mama yangu ni", "Ni mama mpole yangu"], answer: "Mama yangu ni mpole" },
        { question: "Wazazi wako ni akina nani?", options: ["Baba na Mama", "Mwalimu na Daktari", "Kaka na Rafiki"], answer: "Baba na Mama" },
        { question: "Neno gani linamaanisha kaka wa baba yako?", options: ["Binamu", "Mjomba", "Babu"], answer: "Mjomba" },
        { question: "Jina la mvulana kwenye hadithi ni nani?", options: ["David", "Yosefu", "Marko"], answer: "Yosefu" },
        { question: "Yosefu anaishi na nani?", options: ["Marafiki zake", "Wazazi wake na dada yake", "Mwalimu wake"], answer: "Wazazi wake na dada yake" },
        { question: "Baba yake Yosefu anafanya kazi gani?", options: ["Daktari", "Dereva", "Mkulima"], answer: "Daktari" },
        { question: "Mama yake Yosefu anaelezwaje?", options: ["Mkali", "Mpole sana", "Mwenye hasira"], answer: "Mpole sana" },
        { question: "Yosefu anapenda kufanya nini?", options: ["Kucheza peke yake", "Kutumia muda na familia yake", "Kuangalia televisheni siku nzima"], answer: "Kutumia muda na familia yake" },
      ],
    },
    {
      lessonId: 5,
      title: "Jaribio 5",
      subtitle: "Vitu vya Kila Siku",
      passingScore: 7,
      questions: [
        { question: "Kitu gani tunatumia kuandika?", options: ["Chupa", "Kalamu", "Kiti"], answer: "Kalamu" },
        { question: "Kitu gani tunaweza kutumia kupiga simu?", options: ["Simu", "Kitabu", "Meza"], answer: "Simu" },
        { question: "Wanafunzi hubeba vitabu wapi kawaida?", options: ["Mkoba", "Chupa", "Ufunguo"], answer: "Mkoba" },
        { question: "Sentensi gani ni sahihi?", options: ["Hiki ni kitabu changu", "Kitabu hiki changu ni", "Ni hiki kitabu changu"], answer: "Hiki ni kitabu changu" },
        { question: "Ni kitu gani kinaweza kuwa kizito?", options: ["Mkoba", "Tabasamu", "Hewa"], answer: "Mkoba" },
        { question: "Jina la mvulana kwenye hadithi ni nani?", options: ["Petro", "Danieli", "Tom"], answer: "Petro" },
        { question: "Petro anaenda wapi kila siku?", options: ["Shule", "Hospitali", "Soko"], answer: "Shule" },
        { question: "Petro anatumia nini kuandika?", options: ["Kalamu", "Chupa", "Kompyuta"], answer: "Kalamu" },
        { question: "Simu ya Petro iko wapi?", options: ["Mkobani", "Darini", "Chini ya kiti"], answer: "Mkobani" },
        { question: "Petro anakaa wapi?", options: ["Kiti", "Meza", "Chupa"], answer: "Kiti" },
      ],
    },
    {
      lessonId: 6,
      title: "Jaribio 6",
      subtitle: "Rangi na Maelezo",
      passingScore: 7,
      questions: [
        { question: "Ni ipi ni rangi?", options: ["Daktari", "Bluu", "Meza"], answer: "Bluu" },
        { question: "Sentensi gani ni sahihi?", options: ["Mkoba ni mwekundu", "Mwekundu mkoba ni", "Ni mkoba mwekundu"], answer: "Mkoba ni mwekundu" },
        { question: "Kivumishi gani kinaeleza ukubwa?", options: ["Chupa", "Mkubwa", "Jumatatu"], answer: "Mkubwa" },
        { question: "Rangi gani mara nyingi ni kinyume cha nyeusi?", options: ["Kijani", "Nyeupe", "Chungwa"], answer: "Nyeupe" },
        { question: "Kivumishi gani kinaeleza mtu?", options: ["Daftari", "Dirisha", "Mkarimu"], answer: "Mkarimu" },
        { question: "Jina la msichana kwenye hadithi ni nani?", options: ["Furaha", "Zawadi", "Neema"], answer: "Zawadi" },
        { question: "Mkoba wa Zawadi wa shule ni rangi gani?", options: ["Njano", "Bluu", "Nyeusi"], answer: "Bluu" },
        { question: "Simu ya Zawadi ni rangi gani?", options: ["Nyekundu", "Kijani", "Nyeusi"], answer: "Nyeusi" },
        { question: "Zawadi anaelezwaje?", options: ["Mwenye huzuni na kimya", "Mwenye furaha na mkarimu", "Mwenye hasira na uchovu"], answer: "Mwenye furaha na mkarimu" },
        { question: "Kaka mdogo wa Zawadi ni vipi?", options: ["Mtulivu na mwenye huzuni", "Mfupi na mwenye nguvu", "Mrefu na dhaifu"], answer: "Mfupi na mwenye nguvu" },
      ],
    },
    {
      lessonId: 7,
      title: "Jaribio 7",
      subtitle: "Siku, Miezi, na Tarehe",
      passingScore: 7,
      questions: [
        { question: "Ni ipi ni siku ya wiki?", options: ["Mwalimu", "Jumanne", "Chupa"], answer: "Jumanne" },
        { question: "Ni ipi ni mwezi?", options: ["Ijumaa", "Julai", "Dirisha"], answer: "Julai" },
        { question: "Wiki ina siku ngapi?", options: ["Kumi", "Saba", "Tano"], answer: "Saba" },
        { question: "Sentensi gani ni sahihi?", options: ["Jumatatu leo ni", "Leo ni Jumatatu", "Ni Jumatatu leo"], answer: "Leo ni Jumatatu" },
        { question: "Swali gani linauliza kuhusu siku ya kuzaliwa?", options: ["Mkoba wako uko wapi?", "Siku yako ya kuzaliwa ni lini?", "Simu yako ni rangi gani?"], answer: "Siku yako ya kuzaliwa ni lini?" },
        { question: "Jina la mvulana kwenye hadithi ni nani?", options: ["Kevin", "Juma", "Petro"], answer: "Kevin" },
        { question: "Ni siku gani kwenye hadithi?", options: ["Jumapili", "Ijumaa", "Jumanne"], answer: "Ijumaa" },
        { question: "Mwezi anaopenda Kevin ni upi?", options: ["Juni", "Julai", "Desemba"], answer: "Julai" },
        { question: "Siku ya kuzaliwa ya Kevin ni lini?", options: ["Julai 25", "Juni 12", "Agosti 10"], answer: "Julai 25" },
        { question: "Kevin anafanya nini kila Jumapili?", options: ["Anabaki nyumbani", "Anaenda kanisani", "Anacheza mpira wa miguu"], answer: "Anaenda kanisani" },
      ],
    },
    {
      lessonId: 8,
      title: "Jaribio 8",
      subtitle: "Shughuli za Kila Siku",
      passingScore: 7,
      questions: [
        { question: "Watu kawaida hufanya nini kwanza asubuhi?", options: ["Kuamka", "Kulala", "Kucheza mpira"], answer: "Kuamka" },
        { question: "Shughuli gani hufanyika bafuni?", options: ["Kupiga mswaki", "Kusoma hesabu", "Kuangalia televisheni"], answer: "Kupiga mswaki" },
        { question: "Sentensi gani ni sahihi?", options: ["Ninakwenda shuleni", "Shuleni ninakwenda", "Kwenda shuleni ninaenda"], answer: "Ninakwenda shuleni" },
        { question: "Wanafunzi kawaida hufanya kazi za nyumbani lini?", options: ["Jioni", "Usiku wa manane", "Kabla ya kifungua kinywa"], answer: "Jioni" },
        { question: "Jina la mvulana kwenye hadithi ni nani?", options: ["Petro", "Danieli", "Kevin"], answer: "Danieli" },
        { question: "Danieli anaamka saa ngapi?", options: ["Saa 12 asubuhi", "Saa 3 usiku", "Saa 6 mchana"], answer: "Saa 12 asubuhi" },
        { question: "Danieli anafanya nini kabla ya kifungua kinywa?", options: ["Anapiga mswaki na kuoga", "Anacheza mpira wa miguu", "Anafanya kazi za nyumbani"], answer: "Anapiga mswaki na kuoga" },
        { question: "Danieli anafanya nini mchana?", options: ["Analala", "Anacheza mpira wa miguu na marafiki", "Anaenda kanisani"], answer: "Anacheza mpira wa miguu na marafiki" },
        { question: "Danieli analala saa ngapi?", options: ["Saa 12", "Saa 3 usiku", "Saa 8 mchana"], answer: "Saa 3 usiku" },
      ],
    },
    {
      lessonId: 9,
      title: "Jaribio 9",
      subtitle: "Chakula na Vinywaji",
      passingScore: 7,
      questions: [
        { question: "Ni ipi ni kinywaji?", options: ["Mkate", "Juisi", "Samaki"], answer: "Juisi" },
        { question: "Jina la msichana kwenye hadithi ni nani?", options: ["Sara", "Esta", "Lisa"], answer: "Esta" },
        { question: "Esta anakula nini kifungua kinywa?", options: ["Wali na kuku", "Mkate na mayai", "Samaki na mboga"], answer: "Mkate na mayai" },
        { question: "Esta anakunywa nini shuleni?", options: ["Kahawa", "Maji na wakati mwingine juisi", "Maziwa"], answer: "Maji na wakati mwingine juisi" },
        { question: "Chakula anachopenda zaidi Esta ni kipi?", options: ["Wali na kuku", "Mkate na chai", "Ndizi na maziwa"], answer: "Wali na kuku" },
        { question: "Familia ya Esta inakula nini jioni?", options: ["Mkate tu", "Samaki na mboga", "Pizza"], answer: "Samaki na mboga" },
        { question: "Ni ipi ni tunda?", options: ["Ndizi", "Daftari", "Kiti"], answer: "Ndizi" },
        { question: "Esta anakunywa nini kabla ya kulala?", options: ["Kahawa", "Maji", "Chai"], answer: "Maji" },
        { question: "Chakula na vinywaji vinatupatia nini?", options: ["Nguvu na afya", "Pesa", "Kazi za nyumbani"], answer: "Nguvu na afya" },
        { question: "Sentensi gani ni sahihi?", options: ["Alikunywa juisi ya matunda", "Juisi ya matunda alikunywa", "Alikunywa matunda juisi"], answer: "Alikunywa juisi ya matunda" },
      ],
    },
    {
      lessonId: 10,
      title: "Jaribio 10",
      subtitle: "Maeneo Mjini",
      passingScore: 7,
      questions: [
        { question: "Watu kawaida hununua chakula wapi?", options: ["Soko", "Maktaba", "Hospitali"], answer: "Soko" },
        { question: "Mahali gani panasaidia watu wagonjwa?", options: ["Benki", "Hospitali", "Mkahawa"], answer: "Hospitali" },
        { question: "Watoto wanaweza kucheza wapi?", options: ["Kituo cha polisi", "Bustani", "Benki"], answer: "Bustani" },
        { question: "Watu huweka pesa zao wapi?", options: ["Mkahawa", "Shule", "Benki"], answer: "Benki" },
        { question: "Nani alikwenda mjini na Michael?", options: ["Baba yake", "Mwalimu wake", "Dada yake"], answer: "Baba yake" },
        { question: "Kwa nini baba yake Michael alisimama benki?", options: ["Kutoa pesa", "Kununua chakula", "Kuona daktari"], answer: "Kutoa pesa" },
        { question: "Walinunua nini sokoni?", options: ["Vitabu", "Matunda na mboga", "Viatu"], answer: "Matunda na mboga" },
        { question: "Michael aliona nini karibu na kituo cha polisi?", options: ["Hospitali", "Shule", "Bustani"], answer: "Hospitali" },
        { question: "Walikaa wapi kabla ya kurudi nyumbani?", options: ["Mkahawani", "Bustanini", "Benki"], answer: "Mkahawani" },
        { question: "Sentensi gani ni sahihi?", options: ["Soko liko karibu na kanisa", "Karibu kanisa soko liko", "Liko karibu soko kanisa"], answer: "Soko liko karibu na kanisa" },
      ],
    },
    {
      lessonId: 11,
      title: "Jaribio 11",
      subtitle: "Burudani na Mambo ya Kupenda",
      passingScore: 7,
      questions: [
        { question: "Ni ipi ni burudani?", options: ["Hospitali", "Kuchora", "Jikoni (mahali)"], answer: "Kuchora" },
        { question: "Sentensi gani ni sahihi?", options: ["Ninapenda kucheza mpira wa miguu", "Kucheza mpira ninapenda wa miguu", "Mpira ninapenda kucheza wa miguu"], answer: "Ninapenda kucheza mpira wa miguu" },
        { question: "Burudani mara nyingi husaidia nini?", options: ["Kupumzika", "Kuotesha chakula", "Kubadilisha hali ya hewa"], answer: "Kupumzika" },
        { question: "Ni ipi ni shughuli ya muda wa mapumziko?", options: ["Kuogelea", "Kituo cha polisi", "Daftari"], answer: "Kuogelea" },
        { question: "Swali gani linahusu mambo ya kupenda?", options: ["Unapenda kufanya nini?", "Soko liko wapi?", "Una miaka mingapi?"], answer: "Unapenda kufanya nini?" },
        { question: "James alimtembelea nani Jumamosi?", options: ["Binamu yake Danieli", "Mwalimu wake", "Mjomba wake"], answer: "Binamu yake Danieli" },
        { question: "Danieli alikuwa akifanya nini James alipofika?", options: ["Akicheza mpira wa miguu", "Akisoma kitabu", "Akipika"], answer: "Akisoma kitabu" },
        { question: "Wavulana walicheza mpira wa miguu wapi?", options: ["Shuleni", "Bustani ya mtaa", "Mkahawani"], answer: "Bustani ya mtaa" },
        { question: "Dada yake Danieli alikuwa akifanya nini?", options: ["Akichora", "Akiogelea", "Akiangalia televisheni"], answer: "Akichora" },
        { question: "Burudani anayopenda zaidi Danieli ni ipi?", options: ["Kusoma vitabu", "Kusikiliza muziki", "Kucheza michezo ya video"], answer: "Kusoma vitabu" },
      ],
    },
    {
      lessonId: 12,
      title: "Jaribio 12",
      subtitle: "Mapitio ya Mwisho na Mazungumzo Halisi",
      passingScore: 7,
      questions: [
        { question: "Unamsalimiaje mtu kwa heshima?", options: ["Habari", "Ndizi", "Dirisha"], answer: "Habari" },
        { question: "Sentensi gani inajitambulisha vizuri?", options: ["Jina langu ni Danieli", "Danieli jina langu", "Jina Danieli ni mimi"], answer: "Jina langu ni Danieli" },
        { question: "Ni ipi ni burudani?", options: ["Kusoma vitabu", "Hospitali", "Chupa"], answer: "Kusoma vitabu" },
        { question: "Watu hununua mboga wapi?", options: ["Uwanja wa ndege", "Soko", "Maktaba"], answer: "Soko" },
        { question: "Ni ipi ni kinywaji?", options: ["Wali", "Chai", "Kuku"], answer: "Chai" },
        { question: "Nani alisafiri na Kevin?", options: ["Familia yake", "Mwalimu wake", "Wenzake"], answer: "Familia yake" },
        { question: "Kevin alikula nini kabla ya kuondoka?", options: ["Samaki na wali", "Mkate na chai", "Kuku na juisi"], answer: "Mkate na chai" },
        { question: "Kevin alikwenda wapi na binamu yake?", options: ["Soko", "Hospitali", "Maktaba"], answer: "Soko" },
        { question: "Walifanya nini mchana?", options: ["Walicheza mpira na kusikiliza muziki", "Walikwenda shuleni", "Waliangalia televisheni"], answer: "Walicheza mpira na kusikiliza muziki" },
        { question: "Kevin alisema nini mwisho wa siku?", options: ["Alifurahia kutumia muda na familia", "Alikasirika siku nzima", "Alitaka kuondoka mapema"], answer: "Alifurahia kutumia muda na familia" },
      ],
    },
  ],

  finalQuiz: {
    title: "Jaribio la Mwisho - Kiwango cha 1",
    subtitle: "Jaribio hili linahusisha masomo yote ya Kiwango cha 1.",
    passingScore: 15,
    questions: [
      { question: "Unamsalimiaje mtu asubuhi?", options: ["Habari", "Kwaheri", "Kuku"], answer: "Habari" },
      { question: "Chagua kujitambulisha sahihi.", options: ["Jina langu ni Alex", "Alex jina langu", "Jina Alex ni mimi"], answer: "Jina langu ni Alex" },
      { question: "Herufi gani inafuata G?", options: ["H", "J", "F"], answer: "H" },
      { question: "Namba 15 inaandikwaje?", options: ["Hamsini", "Kumi na tano", "Tano"], answer: "Kumi na tano" },
      { question: "Nani ni binti wa baba yako?", options: ["Dada yako", "Mwalimu wako", "Mjomba wako"], answer: "Dada yako" },
      { question: "Ni ipi ni kitu cha kila siku?", options: ["Chupa", "Hospitali", "Mwalimu"], answer: "Chupa" },
      { question: "Ni ipi ni rangi?", options: ["Bluu", "Alhamisi", "Daftari"], answer: "Bluu" },
      { question: "Mwezi gani unafuata Aprili?", options: ["Mei", "Januari", "Julai"], answer: "Mei" },
      { question: "Watu kawaida hufanya nini baada ya kuamka?", options: ["Kupiga mswaki", "Kwenda kulala", "Kula chakula cha jioni"], answer: "Kupiga mswaki" },
      { question: "Ni ipi ni kinywaji?", options: ["Chai", "Wali", "Kuku"], answer: "Chai" },
      { question: "Watu huweka pesa zao wapi?", options: ["Shule", "Benki", "Mkahawa"], answer: "Benki" },
      { question: "Ni ipi ni burudani?", options: ["Kuogelea", "Hospitali", "Dirisha"], answer: "Kuogelea" },
      { question: "Chagua sentensi sahihi.", options: ["Ninapenda kusoma vitabu", "Vitabu kusoma ninapenda", "Ninapenda vitabu kusoma"], answer: "Ninapenda kusoma vitabu" },
      { question: "Watu huenda wapi wanapokuwa wagonjwa?", options: ["Hospitali", "Maktaba", "Soko"], answer: "Hospitali" },
      { question: "Siku gani inakuja kabla ya Ijumaa?", options: ["Alhamisi", "Jumapili", "Jumatatu"], answer: "Alhamisi" },
      { question: "Usomaji: Sara anakula mkate na kunywa maziwa. Sara anakunywa nini?", options: ["Chai", "Maziwa", "Kahawa"], answer: "Maziwa" },
      { question: "Usomaji: Kevin anacheza mpira wa miguu kila Jumamosi. Burudani ya Kevin ni ipi?", options: ["Kusoma", "Mpira wa miguu", "Kupika"], answer: "Mpira wa miguu" },
      { question: "Chagua jibu sahihi: Mimi ___ shuleni kila siku.", options: ["ninaenda", "anaenda", "kwenda"], answer: "ninaenda" },
      { question: "Mtu akisema “Nimefurahi kukutana nawe”, unaweza kujibu nini?", options: ["Nami nimefurahi", "Daftari la bluu", "Ninalala"], answer: "Nami nimefurahi" },
      {
        question: "Ni mwanafunzi gani aliye tayari kwa Kiwango cha 2?",
        options: [
          "Mwanafunzi anayeelewa na kutumia Kiswahili cha msingi kwa usahihi",
          "Mwanafunzi anayejibu ovyo ovyo",
          "Mwanafunzi anayeruka kila somo",
        ],
        answer: "Mwanafunzi anayeelewa na kutumia Kiswahili cha msingi kwa usahihi",
      },
    ],
  },
};
