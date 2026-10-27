import type { LevelCurriculum } from "../types";

// New content authored for Phase 4 of the site restructuring plan,
// written entirely in Swahili, mirroring the English Level 2 topic plan
// adapted to Swahili grammar (tense markers -li-/-na-/-ta-, noun classes).
export const swahiliLevel2: LevelCurriculum = {
  langCode: "SW",
  langLabel: "Swahili",
  langSlug: "swahili",
  level: 2,
  levelTitle: "Kiwango cha 2 - Kiswahili cha Kati",
  levelSubtitle: "Jenga ufasaha kupitia sarufi, mazungumzo, na Kiswahili cha maisha halisi.",

  lessons: [
    {
      id: 1,
      title: "Mapitio ya Sarufi ya Kati",
      subtitle: "Pitia muundo wa sentensi na ngeli za nomino.",
      sections: [
        {
          heading: "Muundo wa Sentensi",
          body: ["Kila sentensi ina kiima (subject) na kitenzi (verb).", "Kiima = mtu au kitu sentensi inayohusu.", "Kitenzi = tendo.", "Mfano: Mtoto (kiima) anasoma (kitenzi) kitabu (yambwa)."],
        },
        {
          heading: "Ngeli za Nomino",
          body: ["Nomino za Kiswahili zina ngeli tofauti zenye viambishi tofauti.", "M-/WA-: mtu, watu (mtu mmoja, watu wengi).", "KI-/VI-: kitabu, vitabu.", "Kiambishi cha ngeli kinabadilisha pia kivumishi na kitenzi."],
        },
        {
          heading: "Makosa ya Kawaida",
          body: ["Si sahihi: Mtoto wanasoma.", "Sahihi: Mtoto anasoma.", "Si sahihi: Watoto anacheza.", "Sahihi: Watoto wanacheza."],
        },
      ],
      speakText: `Kila sentensi ina kiima na kitenzi.

Kiima ni mtu au kitu sentensi inayohusu. Kitenzi ni tendo.

Mfano: Mtoto anasoma kitabu.

Ngeli za nomino. Nomino za Kiswahili zina ngeli tofauti. M wa: mtu, watu. Ki vi: kitabu, vitabu.

Makosa ya kawaida. Si sahihi: Mtoto wanasoma. Sahihi: Mtoto anasoma.`,
      videoTopic: "Pitia muundo wa sentensi na ngeli za nomino kwa mifano.",
      videoUrl: "https://www.youtube.com/watch?v=9HhmyO5XXMA",
      readingTitle: "Jina langu ni Grace.",
      reading: [
        "Ninasoma Kiswahili cha kati sasa.",
        "Kila siku, ninajizoeza kujenga sentensi sahihi.",
        "Mwalimu wangu anasema sentensi nzuri daima ina kiima wazi na kitenzi kinachooana nacho.",
        "Wiki iliyopita nilifanya makosa mengi, lakini wiki hii ninaangalia sarufi yangu kwa makini kabla ya kuzungumza.",
      ],
      readingSpeakText: `Jina langu ni Grace. Ninasoma Kiswahili cha kati sasa. Kila siku, ninajizoeza kujenga sentensi sahihi.`,
      exercises: ["Tambua kiima na kitenzi katika sentensi tatu.", "Sahihisha: Watoto ni tayari (jibu: watoto wako tayari).", "Andika sentensi mbili kwa 'mimi' na mbili kwa 'yeye'.", "Eleza kwa nini 'Mtoto wanasoma' si sahihi."],
      speakingTopic: "Eleza kwa maneno yako kiima na kitenzi ni nini.",
    },
    {
      id: 2,
      title: "Nyakati: Wakati Uliopita na Ujao",
      subtitle: "Jifunze kuzungumzia mambo yaliyotokea na yatakayotokea.",
      sections: [
        {
          heading: "Wakati Uliopita (-li-)",
          body: ["Kiambishi -li- kinaonyesha tendo lililotokea.", "Nilisoma kitabu jana.", "Alienda sokoni asubuhi."],
        },
        {
          heading: "Wakati Uliopo (-na-)",
          body: ["Kiambishi -na- kinaonyesha tendo linaloendelea sasa.", "Ninasoma sasa hivi.", "Anapika chakula cha jioni."],
        },
        {
          heading: "Wakati Ujao (-ta-)",
          body: ["Kiambishi -ta- kinaonyesha tendo litakalotokea.", "Nitakwenda shuleni kesho.", "Nadhani kutanyesha mvua kesho."],
        },
      ],
      speakText: `Wakati uliopita unatumia kiambishi li. Nilisoma kitabu jana.

Wakati uliopo unatumia kiambishi na. Ninasoma sasa hivi.

Wakati ujao unatumia kiambishi ta. Nitakwenda shuleni kesho. Nadhani kutanyesha mvua kesho.`,
      videoTopic: "Linganisha wakati uliopita, uliopo, na ujao.",
      readingTitle: "Mwaka jana, Thomas alisafiri Lubumbashi kwa mara ya kwanza.",
      reading: [
        "Alipokuwa akisubiri basi, alikutana na rafiki yake wa zamani wa shule.",
        "Walizungumza kwa karibu saa moja na kukumbuka utoto wao pamoja.",
        "Thomas alisema atakwenda Lubumbashi tena kiangazi kijacho.",
        "Pia alisema atamwalika rafiki yake aje naye wakati huu.",
      ],
      readingSpeakText: `Mwaka jana, Thomas alisafiri Lubumbashi kwa mara ya kwanza. Alipokuwa akisubiri basi, alikutana na rafiki yake wa zamani.`,
      exercises: ["Andika sentensi tatu kuhusu ulichofanya jana kwa -li-.", "Andika sentensi moja kwa -na-.", "Andika sentensi moja kuhusu mipango yako ya mwaka ujao kwa -ta-.", "Tabiri hali ya hewa kwa -ta-."],
      speakingTopic: "Zungumzia ulichofanya wikendi iliyopita na utakalofanya wikendi ijayo.",
    },
    {
      id: 3,
      title: "Mazoezi ya Mazungumzo",
      subtitle: "Jizoeze kuuliza maswali na kuendeleza mazungumzo kwa kawaida.",
      sections: [
        { heading: "Aina za Maswali", body: ["Maswali ya Ndiyo/Hapana: Unapenda kahawa?", "Maswali ya Nini, Wapi, Lini, Nani, Kwa nini, Vipi.", "Unafanya kazi gani?", "Unatoka wapi?"] },
        { heading: "Kuendeleza Mazungumzo", body: ["Onyesha hamu: Kweli? Inavutia! Niambie zaidi.", "Uliza swali la ziada badala ya kujibu tu.", "A: Nilienda sokoni asubuhi. B: Aa vizuri, ulinunua nini?"] },
        { heading: "Kukubaliana na Kutokubaliana kwa Heshima", body: ["Nakubaliana nawe.", "Hilo ni jambo zuri, lakini nadhani...", "Sijui kama nakubaliana. Kwa maoni yangu..."] },
      ],
      speakText: `Aina za maswali. Maswali ya ndiyo au hapana: unapenda kahawa? Maswali ya nini, wapi, lini, nani.

Kuendeleza mazungumzo. Onyesha hamu: kweli? Inavutia! Niambie zaidi.

Kukubaliana na kutokubaliana kwa heshima. Nakubaliana nawe. Hilo ni jambo zuri, lakini nadhani...`,
      videoTopic: "Jizoeze maswali ya ziada katika mazungumzo halisi.",
      videoUrl: "https://www.youtube.com/watch?v=vVdqEV-mLkE",
      readingTitle: "Ijumaa iliyopita, Paulo alikutana na mfanyakazi mwenzake mpya aitwaye Clara kazini.",
      reading: [
        "Alimuuliza, “Unatoka wapi?” naye akasema alitoka Goma.",
        "Paulo kisha akauliza swali la ziada: “Umekaa hapa kwa muda gani?”",
        "Clara alisema alikubaliana kuwa mji ulikuwa rafiki sana, lakini aliongeza kuwa msongamano wa magari ulikuwa mgumu.",
        "Paulo alisema hilo lilikuwa jambo zuri, na wote wawili walicheka.",
      ],
      readingSpeakText: `Ijumaa iliyopita, Paulo alikutana na mfanyakazi mwenzake mpya aitwaye Clara kazini. Alimuuliza, unatoka wapi?`,
      exercises: ["Andika maswali matatu ya Nini/Wapi/Lini unayoweza kumuuliza mfanyakazi mwenzako mpya.", "Jizoeze mazungumzo mafupi ya kukubaliana kisha kutokubaliana kwa heshima.", "Andika swali la ziada kwa: 'Niliangalia filamu jana usiku.'", "Igiza kujitambulisha na kuuliza maswali mawili."],
      speakingTopic: "Fanya mazungumzo mafupi na mwenzako ukitumia maswali mawili ya ziada.",
    },
    {
      id: 4,
      title: "Ujuzi wa Kuandika",
      subtitle: "Jifunze kupanga mawazo kwenye aya wazi kwa kutumia maneno ya kuunganisha.",
      sections: [
        { heading: "Muundo wa Aya", body: ["Aya ina wazo kuu moja.", "Sentensi ya mada: inaanzisha wazo kuu.", "Sentensi za kuunga mkono: zinatoa maelezo na mifano.", "Sentensi ya hitimisho: inafunga wazo."] },
        { heading: "Maneno ya Kuunganisha", body: ["Kuongeza: na, pia, zaidi ya hayo.", "Kutofautisha: lakini, hata hivyo, ingawa.", "Sababu na matokeo: kwa sababu, hivyo, kwa hiyo.", "Mfuatano: kwanza, kisha, baada ya hapo, mwishowe."] },
        { heading: "Mfano wa Aya", body: ["Ninapenda kujifunza Kiswahili kwa sababu kinanifungulia fursa nyingi. Kwanza, ninaweza kuwasiliana na watu wengi zaidi. Pia, ninaelewa vizuri zaidi nyimbo na habari. Hata hivyo, kujifunza lugha mpya kunahitaji muda na uvumilivu. Kwa hiyo, ninajizoeza kila siku."] },
      ],
      speakText: `Aya ina wazo kuu moja. Sentensi ya mada inaanzisha wazo kuu. Sentensi za kuunga mkono zinatoa maelezo.

Maneno ya kuunganisha. Kuongeza: na, pia. Kutofautisha: lakini, hata hivyo. Sababu na matokeo: kwa sababu, hivyo.`,
      videoTopic: "Ona jinsi maneno ya kuunganisha yanavyounganisha mawazo kwenye aya.",
      readingTitle: "Kwa Nini Ninapenda Kusoma",
      reading: [
        "Ninapenda kusoma kwa sababu kunanisaidia kupumzika baada ya siku ndefu.",
        "Kwanza, ninachagua mahali patulivu nyumbani.",
        "Kisha, ninasoma kwa dakika thelathini hivi.",
        "Ingawa wakati mwingine ninalala, daima ninajifunza kitu kipya.",
        "Kwa hiyo, kusoma kumekuwa moja ya tabia ninazozipenda zaidi.",
      ],
      readingSpeakText: `Kwa nini ninapenda kusoma. Ninapenda kusoma kwa sababu kunanisaidia kupumzika baada ya siku ndefu.`,
      exercises: ["Andika sentensi ya mada kuhusu burudani unayopenda.", "Ongeza sentensi mbili za kuunga mkono zenye maelezo.", "Tumia 'kwa sababu' na 'hata hivyo' katika sentensi mbili tofauti.", "Andika aya fupi (sentensi 4-5) kuhusu siku yako ya kawaida."],
      speakingTopic: "Eleza burudani unayopenda zaidi ukitumia sentensi ya mada wazi na maelezo ya kuunga mkono.",
    },
    {
      id: 5,
      title: "Ujuzi wa Kusikiliza",
      subtitle: "Jifunze mbinu za kuelewa Kiswahili kinachozungumzwa kwa urahisi zaidi.",
      sections: [
        { heading: "Mbinu za Kusikiliza", body: ["Sikiliza maneno muhimu, si kila neno.", "Zingatia mada kuu kwanza.", "Tumia muktadha kukisia maana ya neno jipya.", "Ni sawa kumuomba mtu arudie: 'Unaweza kusema tena, tafadhali?'"] },
        { heading: "Maneno ya Muhimu kwa Kusikiliza", body: ["Sikuelewa hilo.", "Unaweza kuzungumza polepole zaidi, tafadhali?", "Samahani, umesema nini?", "Kwa hiyo, kama nimeelewa vizuri, unamaanisha..."] },
        { heading: "Kufuata Maelekezo", body: ["Pinda kushoto / Pinda kulia.", "Nenda moja kwa moja.", "Iko upande wako wa kushoto / kulia.", "Chukua barabara ya pili upande wa kulia."] },
      ],
      speakText: `Mbinu za kusikiliza. Sikiliza maneno muhimu, si kila neno. Zingatia mada kuu kwanza.

Ni sawa kumuomba mtu arudie: unaweza kusema tena, tafadhali?

Kufuata maelekezo. Pinda kushoto. Pinda kulia. Nenda moja kwa moja.`,
      videoTopic: "Jizoeze kufuata maelekezo ya mdomo mjini.",
      readingTitle: "Marie alimuuliza mgeni njia ya kuelekea posta.",
      reading: [
        "Mwanaume alisema, “Nenda moja kwa moja, kisha pinda kushoto sokoni.”",
        "Marie hakuelewa kila kitu, kwa hiyo alisema, “Samahani, unaweza kusema tena, tafadhali?”",
        "Mwanaume alirudia polepole: “Nenda moja kwa moja, pinda kushoto sokoni, na posta iko upande wako wa kulia.”",
        "Marie alimshukuru na akaipata posta kwa urahisi.",
      ],
      readingSpeakText: `Marie alimuuliza mgeni njia ya kuelekea posta. Mwanaume alisema, nenda moja kwa moja, kisha pinda kushoto sokoni.`,
      exercises: ["Andika maneno matatu unayoweza kutumia usipoelewa mtu.", "Toa maelekezo kutoka nyumbani kwako hadi sokoni lililo karibu.", "Jizoeze kusikiliza mtu akizungumza kisha ueleze alichosema.", "Eleza 'kama nimeelewa vizuri' inatumika kwa nini."],
      speakingTopic: "Mpe mwenzako maelekezo kutoka shuleni hadi nyumbani kwako.",
    },
    {
      id: 6,
      title: "Ufahamu wa Kusoma",
      subtitle: "Jifunze mbinu za kuelewa maandiko marefu zaidi kwa ufanisi.",
      sections: [
        { heading: "Kusoma kwa Haraka na Kutafuta", body: ["Kusoma kwa haraka: kusoma haraka kuelewa wazo la jumla.", "Kutafuta: kutafuta haraka taarifa maalum, kama tarehe au jina.", "Soma kichwa cha habari na sentensi ya kwanza ya kila aya kabla ya kusoma kwa kina."] },
        { heading: "Kutumia Vidokezo vya Muktadha", body: ["Si lazima kuelewa kila neno ili kuelewa maandiko.", "Tumia maneno yanayozunguka neno usilolijua kukisia maana yake.", "Mfano: 'Hali ya hewa ilikuwa baridi sana, kwa hiyo kila mtu alivaa koti nzito.' Neno 'baridi sana' linamaanisha baridi kali."] },
      ],
      speakText: `Kusoma kwa haraka kunamaanisha kusoma haraka kuelewa wazo la jumla.

Kutafuta kunamaanisha kutafuta haraka taarifa maalum, kama tarehe au jina.

Kutumia vidokezo vya muktadha. Si lazima kuelewa kila neno ili kuelewa maandiko.`,
      videoTopic: "Jizoeze kusoma kwa haraka makala fupi kutafuta wazo kuu.",
      readingTitle: "Soko la Kolwezi",
      reading: [
        "Kila Jumamosi, mamia ya watu hukusanyika katika soko kuu la Kolwezi.",
        "Wauzaji wanauza kila kitu kuanzia mboga mpya hadi nguo zilizotengenezwa kwa mikono.",
        "Hali ya soko ni ya furaha, kukiwa na muziki na wauzaji wakipiga kelele bei zao.",
        "Familia nyingi huja mapema asubuhi kabla halijajaa sana.",
        "Kufikia adhuhuri, soko linakuwa limejaa rangi, kelele, na harufu ya chakula kipya.",
      ],
      readingSpeakText: `Soko la Kolwezi. Kila Jumamosi, mamia ya watu hukusanyika katika soko kuu la Kolwezi.`,
      exercises: ["Soma maandiko haraka kwa sekunde 10 kisha sema yanahusu nini.", "Tafuta maandiko kutafuta siku soko linafanyika.", "Kisia maana ya 'hali ya furaha' kutokana na muktadha.", "Andika sentensi mbili zinazoelezea soko unalolijua."],
      speakingTopic: "Eleza soko au mahali penye shughuli nyingi ulipowahi kutembelea.",
    },
    {
      id: 7,
      title: "Kuongeza Msamiati",
      subtitle: "Ongeza msamiati wako kwa visawe, vinyume, na familia za maneno.",
      sections: [
        { heading: "Visawe (maana zinazofanana)", body: ["Furaha = raha, shangwe", "Kubwa = -kubwa sana, -kubwa mno", "Mjanja = -enye akili, -erevu", "Haraka = -epesi, -a kasi"] },
        { heading: "Vinyume (maana kinyume)", body: ["Moto ↔ Baridi", "Rahisi ↔ Gumu", "Mapema ↔ Kuchelewa", "Anza ↔ Maliza"] },
        { heading: "Familia za Maneno", body: ["Fanikiwa (kitenzi) → mafanikio (nomino) → -enye mafanikio (kivumishi).", "Amua (kitenzi) → uamuzi (nomino)."] },
      ],
      speakText: `Visawe, maneno yenye maana zinazofanana. Furaha inamaanisha raha au shangwe. Kubwa inamaanisha -kubwa sana.

Vinyume, maneno yenye maana kinyume. Moto na baridi. Rahisi na gumu. Mapema na kuchelewa.

Familia za maneno. Fanikiwa, mafanikio, -enye mafanikio.`,
      videoTopic: "Jenga msamiati kupitia visawe, vinyume, na jozi za maneno.",
      videoUrl: "https://www.youtube.com/watch?v=Q0Yo_1o_anE",
      readingTitle: "Kujenga Msamiati Mkubwa",
      reading: [
        "Kujifunza maneno mapya kila siku ni mojawapo ya njia bora za kuboresha Kiswahili chako haraka.",
        "Badala ya kukariri maneno peke yake, jaribu kuyajifunza katika makundi, kama visawe au familia za maneno.",
        "Kwa mfano, ukijifunza 'amua', jifunze pia 'uamuzi'.",
        "Kwa njia hii, neno jipya moja linakufundisha maneno matatu au manne.",
      ],
      readingSpeakText: `Kujenga msamiati mkubwa. Kujifunza maneno mapya kila siku ni mojawapo ya njia bora za kuboresha Kiswahili chako haraka.`,
      exercises: ["Tafuta kisawe cha 'furaha' na 'haraka'.", "Tafuta kinyume cha 'anza' na 'rahisi'.", "Andika nomino na kivumishi vya 'fanikiwa'.", "Tumia 'amua' na 'uamuzi' katika sentensi mbili."],
      speakingTopic: "Eleza siku yako ukitumia angalau maneno matatu mapya kutoka somo hili.",
    },
    {
      id: 8,
      title: "Umahiri wa Matamshi",
      subtitle: "Boresha mkazo wa maneno na sauti zinazochanganywa mara kwa mara.",
      sections: [
        { heading: "Mkazo wa Maneno", body: ["Maneno ya Kiswahili mara nyingi hukazwa kwenye silabi ya pili kutoka mwisho.", "Mfano: kiTAbu, waLImu, shuLEni.", "Mkazo usio sahihi unaweza kumchanganya msikilizaji."] },
        { heading: "Toni ya Sauti", body: ["Maswali ya Ndiyo/Hapana mara nyingi hupanda mwishoni: Unakuja? ↗", "Maswali ya Nini/Wapi/Lini mara nyingi hushuka mwishoni: Unaenda wapi? ↘"] },
        { heading: "Sauti Zinazochanganywa Mara kwa Mara", body: ["Ch dhidi ya Sh: chakula dhidi ya shule.", "L dhidi ya R: lala dhidi ya rara (si neno, lakini sauti zinafanana kwa wanaojifunza)."] },
      ],
      speakText: `Mkazo wa maneno. Maneno ya Kiswahili mara nyingi hukazwa kwenye silabi ya pili kutoka mwisho. Kitabu, walimu, shuleni.

Toni ya sauti. Maswali ya ndiyo au hapana mara nyingi hupanda mwishoni: unakuja?

Sauti zinazochanganywa mara kwa mara. Chakula dhidi ya shule.`,
      videoTopic: "Sikia tofauti kati ya toni inayopanda na inayoshuka.",
      readingTitle: "Kwa Nini Matamshi ni Muhimu",
      reading: [
        "Sarufi nzuri ni muhimu, lakini matamshi wazi husaidia watu kukuelewa mara moja.",
        "Wanafunzi wengi huzingatia tu sauti moja moja na kusahau mkazo wa neno.",
        "Neno lenye mkazo usio sahihi linaweza kusikika kama neno tofauti kabisa.",
        "Kujizoeza kidogo kila siku, hata dakika tano, kunaleta tofauti kubwa baada ya muda.",
      ],
      readingSpeakText: `Kwa nini matamshi ni muhimu. Sarufi nzuri ni muhimu, lakini matamshi wazi husaidia watu kukuelewa mara moja.`,
      exercises: ["Jizoeze kusema 'kitabu', 'walimu', na 'shuleni' kwa sauti.", "Sema swali la Ndiyo/Hapana kwa toni inayopanda.", "Sema swali la Nini/Wapi kwa toni inayoshuka.", "Jizoeze maneno 'chakula' na 'shule'."],
      speakingTopic: "Soma maandiko ya somo hili kwa sauti ukizingatia mkazo wa maneno.",
    },
    {
      id: 9,
      title: "Kiswahili cha Mazingira Mbalimbali",
      subtitle: "Jifunze maneno muhimu kwa hali halisi za kila siku.",
      sections: [
        { heading: "Mkahawani", body: ["Naomba menyu, tafadhali?", "Ningependa kuku, tafadhali.", "Tunaweza kupata bili, tafadhali?", "Huduma imejumuishwa?"] },
        { heading: "Uwanja wa Ndege", body: ["Kaunta ya kujisajili iko wapi?", "Ningependa kiti cha dirishani, tafadhali.", "Ndege itapaa saa ngapi?", "Sehemu ya mizigo iko wapi?"] },
        { heading: "Mahojiano ya Kazi", body: ["Niambie kuhusu wewe mwenyewe.", "Nguvu zako ni zipi?", "Kwa nini unataka kufanya kazi hapa?", "Mimi ni mtu mchapakazi na wa kuaminika."] },
      ],
      speakText: `Mkahawani. Naomba menyu, tafadhali? Ningependa kuku, tafadhali. Tunaweza kupata bili?

Uwanja wa ndege. Kaunta ya kujisajili iko wapi? Ningependa kiti cha dirishani.

Mahojiano ya kazi. Niambie kuhusu wewe mwenyewe. Nguvu zako ni zipi?`,
      videoTopic: "Jizoeze mazungumzo halisi mkahawani, uwanja wa ndege, na mahojiano ya kazi.",
      readingTitle: "Mahojiano ya Kazi ya Anna",
      reading: [
        "Anna alifika mapema kwa mahojiano yake ya kazi na kumsalimia meneja kwa heshima.",
        "Meneja aliposema, “Niambie kuhusu wewe mwenyewe”, Anna alizungumza kwa kujiamini kuhusu masomo na uzoefu wake.",
        "Alieleza kuwa nguvu yake kuu ilikuwa ni kuwa mchapakazi na wa kuaminika.",
        "Mwishoni, Anna aliuliza swali lake mwenyewe: “Siku ya kawaida kazini inaonekanaje?”",
      ],
      readingSpeakText: `Mahojiano ya kazi ya Anna. Anna alifika mapema kwa mahojiano yake ya kazi na kumsalimia meneja kwa heshima.`,
      exercises: ["Andika mazungumzo mafupi ya kuagiza chakula mkahawani.", "Andika maswali mawili unayoweza kuuliza kaunta ya kujisajili uwanja wa ndege.", "Jibu swali la mahojiano 'Nguvu zako ni zipi?' kukuhusu.", "Jizoeze mazungumzo kamili ya mahojiano na mwenzako."],
      speakingTopic: "Igiza mahojiano ya kazi na mwenzako, mkiuliza na kujibu maswali ya kawaida.",
    },
    {
      id: 10,
      title: "Misingi ya Kiswahili cha Biashara",
      subtitle: "Jifunze msamiati wa kikazi kwa barua pepe na mikutano.",
      sections: [
        { heading: "Kuandika Barua Pepe ya Kikazi", body: ["Mpendwa Bwana Kasongo, (salamu)", "Ninaandika kuuliza kuhusu... (lengo)", "Tafadhali nijulishe kama unahitaji taarifa zaidi. (kufunga)", "Wako, (kuhitimisha)"] },
        { heading: "Maneno Muhimu ya Mkutano", body: ["Tuanze.", "Unaweza kufafanua hilo?", "Ningependa kuongeza jambo.", "Tuendelee na kipengele kinachofuata.", "Kwa muhtasari, tulikubaliana kuwa..."] },
        { heading: "Msamiati wa Kikazi", body: ["Mwisho wa muda: tarehe ambayo kitu lazima kimalizike.", "Mfanyakazi mwenzako: mtu unayefanya naye kazi.", "Mteja: mtu au kampuni unayemhudumia.", "Ripoti: muhtasari ulioandikwa wa taarifa."] },
      ],
      speakText: `Kuandika barua pepe ya kikazi. Mpendwa Bwana Kasongo. Ninaandika kuuliza kuhusu... Tafadhali nijulishe kama unahitaji taarifa zaidi.

Maneno muhimu ya mkutano. Tuanze. Unaweza kufafanua hilo? Ningependa kuongeza jambo.

Msamiati wa kikazi. Mwisho wa muda ni tarehe ambayo kitu lazima kimalizike.`,
      videoTopic: "Ona jinsi barua pepe ya kikazi na mazungumzo ya mkutano yanavyopangwa.",
      readingTitle: "Wiki ya Kwanza ya David Kazini Mpya",
      reading: [
        "Katika mkutano wake wa kwanza, David alimsikia meneja wake akisema, “Tuanze.”",
        "Alisikiliza kwa makini na, aliposhindwa kuelewa jambo, alisema, “Unaweza kufafanua hilo, tafadhali?”",
        "Baadaye siku hiyo, David aliandika barua pepe yake ya kwanza ya kikazi kwa mteja, akianza na “Mpendwa Bi. Tshisekedi” na kumaliza na “Wako.”",
        "Mfanyakazi mwenzake alimwambia barua pepe hiyo ilikuwa wazi na iliyoandikwa vizuri.",
      ],
      readingSpeakText: `Wiki ya kwanza ya David kazini mpya. Katika mkutano wake wa kwanza, David alimsikia meneja wake akisema, tuanze.`,
      exercises: ["Andika barua pepe fupi ya kikazi ukiuliza kuhusu nafasi ya kazi.", "Andika sentensi mbili unazoweza kutumia kuzungumza kwenye mkutano.", "Tumia 'mwisho wa muda', 'mfanyakazi mwenzako', na 'mteja' kila moja katika sentensi.", "Jizoeze kusema 'Unaweza kufafanua hilo?' kwa sauti."],
      speakingTopic: "Eleza nini kinachofanya barua pepe isikike ya kikazi.",
    },
    {
      id: 11,
      title: "Majadiliano na Hoja",
      subtitle: "Jifunze kutoa na kutetea maoni yako kwa heshima.",
      sections: [
        { heading: "Kutoa Maoni Yako", body: ["Kwa maoni yangu, ...", "Mimi binafsi ninaamini kuwa ...", "Kwa upande wangu, ...", "Kwa jinsi ninavyoona, ..."] },
        { heading: "Kukubaliana na Kutokubaliana Rasmi", body: ["Nakubaliana kabisa na hilo.", "Naelewa hoja yako, lakini nina mtazamo tofauti.", "Samahani, lakini sikubaliani.", "Hilo ni kweli, hata hivyo, tunapaswa pia kuzingatia..."] },
        { heading: "Kuunga Mkono Hoja", body: ["Kwa mfano, ...", "Hili linaungwa mkono na ukweli kwamba ...", "Utafiti unaonyesha kuwa ...", "Kwa kuhitimisha, naamini kuwa ..."] },
      ],
      speakText: `Kutoa maoni yako. Kwa maoni yangu... Mimi binafsi ninaamini kuwa... Kwa upande wangu...

Kukubaliana na kutokubaliana rasmi. Nakubaliana kabisa na hilo. Naelewa hoja yako, lakini nina mtazamo tofauti.

Kuunga mkono hoja. Kwa mfano... Utafiti unaonyesha kuwa... Kwa kuhitimisha, naamini kuwa...`,
      videoTopic: "Tazama majadiliano mafupi na ya heshima yakitumia maneno ya maoni na hoja.",
      readingTitle: "Majadiliano Darasani",
      reading: [
        "Darasani, wanafunzi walijadili kama simu zinapaswa kuruhusiwa shuleni.",
        "Joseph alisema, “Kwa maoni yangu, simu zinatusaidia kujifunza kwa sababu tunaweza kutafuta taarifa haraka.”",
        "Grace alijibu, “Naelewa hoja yako, lakini nina mtazamo tofauti. Simu zinaweza kuvuruga sana wakati wa masomo.”",
        "Mwalimu alisema hoja zote mbili ziliungwa mkono vizuri na akahimiza darasa kuendelea kujadiliana kwa heshima.",
      ],
      readingSpeakText: `Majadiliano darasani. Darasani, wanafunzi walijadili kama simu zinapaswa kuruhusiwa shuleni.`,
      exercises: ["Toa maoni yako kuhusu kujifunza Kiswahili ukitumia 'Kwa maoni yangu...'.", "Jizoeze kutokubaliana kwa heshima na maoni ya mwenzako.", "Andika hoja moja iliyoungwa mkono na 'Kwa mfano...'.", "Andika hitimisho fupi ukitumia 'Kwa kuhitimisha, naamini kuwa...'."],
      speakingTopic: "Jadili mada rahisi (kama maisha ya mjini dhidi ya kijijini) na mwenzako.",
    },
    {
      id: 12,
      title: "Mapitio ya Mwisho na Mazungumzo ya Maisha Halisi",
      subtitle: "Pitia kila kitu kilichojifunzwa Kiwango cha 2 na jizoeze mazungumzo marefu zaidi ya maisha halisi.",
      sections: [
        {
          heading: "Mambo Muhimu Tuliyojifunza",
          body: [
            "Kupitia muundo wa sentensi na ngeli za nomino",
            "Kutumia nyakati za wakati uliopita na ujao kwa usahihi",
            "Kuendeleza mazungumzo kwa maswali ya ziada",
            "Kuandika aya zilizopangwa kwa maneno ya kuunganisha",
            "Mbinu za kusikiliza na kuomba ufafanuzi",
            "Kusoma kwa haraka na kutafuta kwa ufahamu wa kusoma",
            "Kuongeza msamiati kwa visawe na familia za maneno",
            "Kuboresha matamshi, mkazo, na toni",
            "Kutumia Kiswahili mikahawani, uwanja wa ndege, na mahojiano",
            "Kuandika barua pepe za kikazi na kuzungumza mikutanoni",
            "Kutoa maoni na kujadiliana kwa heshima",
          ],
        },
        {
          heading: "Mfano wa Mazungumzo ya Maisha Halisi",
          body: [
            "A: Habari, nilisikia umeanza kazi mpya. Inaendeleaje?",
            "B: Inaenda vizuri, asante! Nilikuwa na wasiwasi mwanzoni, lakini wenzangu wa kazi ni rafiki sana.",
            "A: Hilo ni vizuri kusikia. Unafanya kazi gani hasa?",
            "B: Ninaandika ripoti na kujibu barua pepe za wateja. Ni changamoto, lakini ninajifunza mengi.",
            "A: Kwa maoni yangu, hilo ni ujuzi muhimu sana kuwa nao.",
            "B: Nakubaliana. Nitaendelea kuboresha Kiswahili changu kwa kazi pia.",
          ],
        },
      ],
      speakText: `Mambo muhimu tuliyojifunza Kiwango cha 2 ni pamoja na kupitia muundo wa sentensi, kutumia nyakati, kuendeleza mazungumzo, kuandika aya, mbinu za kusikiliza, ufahamu wa kusoma, kuongeza msamiati, matamshi, Kiswahili cha mazingira mbalimbali, Kiswahili cha biashara, na kujadiliana kwa heshima.

Mfano wa mazungumzo ya maisha halisi.

Habari, nilisikia umeanza kazi mpya. Inaendeleaje?
Inaenda vizuri, asante! Nilikuwa na wasiwasi mwanzoni, lakini wenzangu wa kazi ni rafiki sana.`,
      videoTopic: "Pitia mada zote za Kiwango cha 2 kupitia mazungumzo marefu moja.",
      readingTitle: "Mwaka Mmoja wa Maendeleo",
      reading: [
        "Mwaka mmoja uliopita, Patrick hakuweza hata kujitambulisha kwa Kiswahili vizuri.",
        "Baada ya kumaliza Kiwango cha 1 na Kiwango cha 2, sasa anaweza kufanya mazungumzo kamili kuhusu kazi yake, maoni yake, na maisha yake ya kila siku.",
        "Anaandika barua pepe za kikazi mahali pa kazi na anajiamini mikutanoni.",
        "Patrick anasema siri ya maendeleo yake ilikuwa kujizoeza kidogo kila siku bila kukosa.",
        "Sasa ana hamu ya kuanza Kiwango cha 3 na kuendelea kuboresha.",
      ],
      readingSpeakText: `Mwaka mmoja wa maendeleo. Mwaka mmoja uliopita, Patrick hakuweza hata kujitambulisha kwa Kiswahili vizuri.`,
      exercises: ["Jitambulishe ukitumia angalau mambo mawili ya sarufi ya Kiwango cha 2.", "Andika aya fupi kuhusu maendeleo yako ya kujifunza Kiswahili.", "Jizoeze mazungumzo ya mfano kwa sauti na mwenzako.", "Toa maoni yako kuhusu umuhimu wa kujifunza Kiswahili kwa kazi."],
      speakingTopic: "Fanya mazungumzo kamili kuhusu masomo yako, maoni yako, na mipango yako ya baadaye.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Jaribio 1",
      subtitle: "Mapitio ya Sarufi ya Kati",
      passingScore: 7,
      questions: [
        { question: "Kila sentensi inahitaji nini?", options: ["Kiima na kitenzi", "Kivumishi tu", "Alama ya swali tu"], answer: "Kiima na kitenzi" },
        { question: "Katika 'Mtoto anasoma kitabu', yambwa ni ipi?", options: ["Mtoto", "anasoma", "kitabu"], answer: "kitabu" },
        { question: "Chagua sentensi sahihi.", options: ["Mtoto wanasoma", "Mtoto anasoma", "Mtoto kusoma"], answer: "Mtoto anasoma" },
        { question: "Chagua sentensi sahihi.", options: ["Watoto anacheza", "Watoto wanacheza", "Watoto kucheza"], answer: "Watoto wanacheza" },
        { question: "Ngeli ya M-/WA- inahusu nini?", options: ["Watu", "Vitabu", "Rangi"], answer: "Watu" },
        { question: "Grace anasoma nini?", options: ["Kiswahili cha kati", "Hisabati", "Historia"], answer: "Kiswahili cha kati" },
        { question: "Grace anafanya nini kila siku?", options: ["Anajizoeza kujenga sentensi sahihi", "Analala siku nzima", "Anaepuka sarufi"], answer: "Anajizoeza kujenga sentensi sahihi" },
        { question: "Mwalimu wa Grace anasema sentensi nzuri inahitaji nini?", options: ["Kiima wazi na kitenzi kinachooana", "Maneno marefu tu", "Hakuna alama za uakifishaji"], answer: "Kiima wazi na kitenzi kinachooana" },
        { question: "Grace anajisikiaje kuhusu maendeleo yake?", options: ["Ana fahari", "Ana hasira", "Amechoka"], answer: "Ana fahari" },
        { question: "Nini kilibadilika kati ya wiki iliyopita na hii kwa Grace?", options: ["Aliacha kusoma", "Sasa anaangalia sarufi yake kwa makini", "Alihamia shule nyingine"], answer: "Sasa anaangalia sarufi yake kwa makini" },
      ],
    },
    {
      lessonId: 2,
      title: "Jaribio 2",
      subtitle: "Nyakati: Wakati Uliopita na Ujao",
      passingScore: 7,
      questions: [
        { question: "Kiambishi gani kinaonyesha wakati uliopita?", options: ["-li-", "-ta-", "-na-"], answer: "-li-" },
        { question: "Kiambishi gani kinaonyesha wakati ujao?", options: ["-ta-", "-li-", "-ki-"], answer: "-ta-" },
        { question: "Sentensi gani inatumia wakati uliopo vizuri?", options: ["Ninasoma sasa hivi", "Nilisoma sasa hivi", "Nitasoma sasa hivi"], answer: "Ninasoma sasa hivi" },
        { question: "Thomas alisafiri wapi mwaka jana?", options: ["Lubumbashi", "Paris", "Kinshasa"], answer: "Lubumbashi" },
        { question: "Thomas alikutana na nani akisubiri basi?", options: ["Mgeni", "Rafiki yake wa zamani wa shule", "Mwalimu wake"], answer: "Rafiki yake wa zamani wa shule" },
        { question: "Thomas na rafiki yake watafanya nini kiangazi kijacho?", options: ["Kutembelea Lubumbashi tena", "Kuhama mji mwingine", "Kuacha kuwa marafiki"], answer: "Kutembelea Lubumbashi tena" },
        { question: "Sentensi gani ni sahihi kwa mpango wa baadaye?", options: ["Nitakwenda Paris mwaka ujao", "Nilikwenda Paris mwaka ujao", "Ninakwenda Paris mwaka jana"], answer: "Nitakwenda Paris mwaka ujao" },
        { question: "Sentensi gani inatumia -ta- vizuri kwa utabiri?", options: ["Nadhani kutanyesha mvua kesho", "Nadhani kulinyesha mvua kesho", "Nadhani kunanyesha mvua kesho"], answer: "Nadhani kutanyesha mvua kesho" },
        { question: "Walizungumza kwa muda gani?", options: ["Karibu saa moja", "Dakika tano", "Wiki nzima"], answer: "Karibu saa moja" },
        { question: "Walikumbuka nini pamoja?", options: ["Utoto wao", "Kazi zao", "Masomo ya chuo"], answer: "Utoto wao" },
      ],
    },
    {
      lessonId: 3,
      title: "Jaribio 3",
      subtitle: "Mazoezi ya Mazungumzo",
      passingScore: 7,
      questions: [
        { question: "Lipi ni swali la Ndiyo/Hapana?", options: ["Unapenda kahawa?", "Unafanya kazi gani?", "Unatoka wapi?"], answer: "Unapenda kahawa?" },
        { question: "Lipi ni swali la Nini/Wapi?", options: ["Unatoka wapi?", "Unapenda kahawa?", "Unakubaliana?"], answer: "Unatoka wapi?" },
        { question: "Njia gani nzuri ya kuendeleza mazungumzo?", options: ["Uliza swali la ziada", "Kaa kimya", "Badilisha mada mara moja"], answer: "Uliza swali la ziada" },
        { question: "Maneno gani yanatokubaliana kwa heshima?", options: ["Sijui kama nakubaliana", "Nakubaliana kabisa", "Hilo ni sahihi kabisa"], answer: "Sijui kama nakubaliana" },
        { question: "Maneno gani yanaonyesha hamu kwenye mazungumzo?", options: ["Niambie zaidi", "Sijali", "Acha kuzungumza"], answer: "Niambie zaidi" },
        { question: "Paulo alikutana na nani kazini?", options: ["Clara", "Grace", "Anna"], answer: "Clara" },
        { question: "Clara anatoka wapi?", options: ["Goma", "Kinshasa", "Lubumbashi"], answer: "Goma" },
        { question: "Swali gani la ziada Paulo aliuliza?", options: ["Umekaa hapa kwa muda gani?", "Jina lako nani?", "Unapenda kahawa?"], answer: "Umekaa hapa kwa muda gani?" },
        { question: "Clara alisema nini kuhusu mji?", options: ["Ulikuwa rafiki lakini msongamano wa magari ulikuwa mgumu", "Ulikuwa mchovu", "Alichukia mji"], answer: "Ulikuwa rafiki lakini msongamano wa magari ulikuwa mgumu" },
        { question: "Paulo alijibuje maoni ya Clara kuhusu msongamano?", options: ["Alisema hilo lilikuwa jambo zuri", "Hakukubaliana vikali", "Aliondoka mazungumzoni"], answer: "Alisema hilo lilikuwa jambo zuri" },
      ],
    },
    {
      lessonId: 4,
      title: "Jaribio 4",
      subtitle: "Ujuzi wa Kuandika",
      passingScore: 7,
      questions: [
        { question: "Sentensi ya mada inafanya nini?", options: ["Inaanzisha wazo kuu", "Inamaliza aya", "Inaorodhesha mambo ya ovyo"], answer: "Inaanzisha wazo kuu" },
        { question: "Neno gani linaonyesha utofauti?", options: ["hata hivyo", "pia", "kwanza"], answer: "hata hivyo" },
        { question: "Neno gani linaonyesha sababu na matokeo?", options: ["kwa sababu", "na", "kisha"], answer: "kwa sababu" },
        { question: "Neno gani linaonyesha mfuatano?", options: ["kwanza", "lakini", "ingawa"], answer: "kwanza" },
        { question: "Sentensi ya hitimisho inafanya nini?", options: ["Inafunga wazo", "Inaanza aya", "Inauliza swali"], answer: "Inafunga wazo" },
        { question: "Kwa nini mwandishi anapenda kusoma?", options: ["Kunamsaidia kupumzika baada ya siku ndefu", "Kunamfanya achoke", "Hana burudani nyingine"], answer: "Kunamsaidia kupumzika baada ya siku ndefu" },
        { question: "Kawaida anasoma kwa muda gani?", options: ["Dakika thelathini hivi", "Saa mbili", "Dakika tano"], answer: "Dakika thelathini hivi" },
        { question: "Neno gani la kuunganisha linatumika kabla ya 'wakati mwingine analala'?", options: ["Ingawa", "Kwa sababu", "Kwanza"], answer: "Ingawa" },
        { question: "Kusoma kumekuwa nini kwake?", options: ["Moja ya tabia anazozipenda zaidi", "Upotevu wa muda", "Kazi yake"], answer: "Moja ya tabia anazozipenda zaidi" },
        { question: "Sentensi gani inatumia 'kwa hiyo' vizuri?", options: ["Ninajizoeza kila siku, kwa hiyo ninaendelea vizuri", "Kwa hiyo ninapenda, tufaha", "Ninajizoeza kwa hiyo mimi mwanafunzi"], answer: "Ninajizoeza kila siku, kwa hiyo ninaendelea vizuri" },
      ],
    },
    {
      lessonId: 5,
      title: "Jaribio 5",
      subtitle: "Ujuzi wa Kusikiliza",
      passingScore: 7,
      questions: [
        { question: "Unapaswa kusikiliza nini kwanza?", options: ["Maneno muhimu na mada kuu", "Kila neno moja moja", "Neno la mwisho pekee"], answer: "Maneno muhimu na mada kuu" },
        { question: "Unaweza kufanya nini usipoelewa?", options: ["Muombe mtu arudie", "Jifanye umeelewa", "Ondoka"], answer: "Muombe mtu arudie" },
        { question: "Maneno gani yanaomba mtu azungumze polepole?", options: ["Unaweza kuzungumza polepole zaidi, tafadhali?", "Nyamaza", "Ninajua kila kitu"], answer: "Unaweza kuzungumza polepole zaidi, tafadhali?" },
        { question: "Maneno gani yanathibitisha uelewa wako?", options: ["Kwa hiyo, kama nimeelewa vizuri, unamaanisha...", "Sijali unamaanisha nini", "Acha"], answer: "Kwa hiyo, kama nimeelewa vizuri, unamaanisha..." },
        { question: "Maneno gani yanatoa maelekezo?", options: ["Pinda kushoto", "Nakubaliana", "Nimefurahi kukutana nawe"], answer: "Pinda kushoto" },
        { question: "Marie aliomba nini kwa mgeni?", options: ["Maelekezo ya posta", "Saa", "Pesa"], answer: "Maelekezo ya posta" },
        { question: "Marie alisema nini alipokosa kuelewa?", options: ["Samahani, unaweza kusema tena, tafadhali?", "Sitaki kujua", "Kwaheri"], answer: "Samahani, unaweza kusema tena, tafadhali?" },
        { question: "Posta iko wapi kwa mujibu wa mwanaume?", options: ["Upande wa kulia, baada ya kupinda kushoto sokoni", "Nyuma ya shule", "Karibu na nyumba ya Marie"], answer: "Upande wa kulia, baada ya kupinda kushoto sokoni" },
        { question: "Mwanaume alijibuje ombi la Marie?", options: ["Alirudia maelekezo polepole", "Alikataa kusaidia", "Aliondoka"], answer: "Alirudia maelekezo polepole" },
        { question: "Marie alifanya nini baada ya kupata maelekezo?", options: ["Aliipata posta kwa urahisi", "Alipotea", "Alirudi nyumbani badala yake"], answer: "Aliipata posta kwa urahisi" },
      ],
    },
    {
      lessonId: 6,
      title: "Jaribio 6",
      subtitle: "Ufahamu wa Kusoma",
      passingScore: 7,
      questions: [
        { question: "Kusoma kwa haraka ni nini?", options: ["Kusoma haraka kuelewa wazo la jumla", "Kusoma kila neno polepole", "Kutokusoma kabisa"], answer: "Kusoma haraka kuelewa wazo la jumla" },
        { question: "Kutafuta ni nini?", options: ["Kutafuta haraka taarifa maalum", "Kukariri maandiko", "Kutafsiri maandiko"], answer: "Kutafuta haraka taarifa maalum" },
        { question: "Nini kinaweza kukusaidia kukisia maana ya neno usilolijua?", options: ["Vidokezo vya muktadha", "Kubahatisha bila maandiko", "Kupuuza sentensi"], answer: "Vidokezo vya muktadha" },
        { question: "Katika 'hali ya hewa ilikuwa baridi sana, kwa hiyo kila mtu alivaa koti nzito', 'baridi sana' linamaanisha nini?", options: ["Baridi kali", "Joto kali", "Rangi nyingi"], answer: "Baridi kali" },
        { question: "Unapaswa kusoma nini kwanza kupata wazo kuu haraka?", options: ["Kichwa cha habari na sentensi ya kwanza ya kila aya", "Neno la mwisho pekee", "Namba ya ukurasa"], answer: "Kichwa cha habari na sentensi ya kwanza ya kila aya" },
        { question: "Soko linafanyika wapi?", options: ["Kolwezi", "Goma", "Lubumbashi"], answer: "Kolwezi" },
        { question: "Soko linafanyika siku gani?", options: ["Jumamosi", "Jumatatu", "Jumapili"], answer: "Jumamosi" },
        { question: "Wauzaji wanauza nini sokoni?", options: ["Mboga na nguo za mikono", "Viatu tu", "Vitabu tu"], answer: "Mboga na nguo za mikono" },
        { question: "Hali ya soko ikoje?", options: ["Ya furaha, kukiwa na muziki na wauzaji wakipiga kelele", "Kimya na tupu", "Hatari"], answer: "Ya furaha, kukiwa na muziki na wauzaji wakipiga kelele" },
        { question: "Familia nyingi huja lini sokoni?", options: ["Mapema asubuhi", "Usiku wa manane", "Kamwe"], answer: "Mapema asubuhi" },
      ],
    },
    {
      lessonId: 7,
      title: "Jaribio 7",
      subtitle: "Kuongeza Msamiati",
      passingScore: 7,
      questions: [
        { question: "Neno gani ni kisawe cha 'furaha'?", options: ["shangwe", "baridi", "haraka"], answer: "shangwe" },
        { question: "Neno gani ni kinyume cha 'rahisi'?", options: ["gumu", "sahili", "haraka"], answer: "gumu" },
        { question: "Nomino ya 'fanikiwa' ni ipi?", options: ["mafanikio", "-enye mafanikio", "kufanikiwa"], answer: "mafanikio" },
        { question: "Ipi ni mfano wa familia ya maneno kwenye maandiko?", options: ["amua, uamuzi", "nyekundu, bluu, kijani", "moja, mbili, tatu"], answer: "amua, uamuzi" },
        { question: "Njia gani bora ya kuboresha msamiati haraka kwa mujibu wa maandiko?", options: ["Kujifunza maneno mapya kila siku", "Kutosoma kamwe", "Kuepuka maneno mapya"], answer: "Kujifunza maneno mapya kila siku" },
        { question: "Kwa nini kujifunza maneno katika makundi ni vizuri?", options: ["Neno jipya moja linakufundisha matatu au manne", "Ni ngumu zaidi", "Ni kinyume cha sheria"], answer: "Neno jipya moja linakufundisha matatu au manne" },
        { question: "Neno gani ni kisawe cha 'kubwa'?", options: ["-kubwa sana", "-dogo", "-a kuchelewa"], answer: "-kubwa sana" },
        { question: "Neno gani ni kinyume cha 'anza'?", options: ["maliza", "fanya", "fungua"], answer: "maliza" },
        { question: "Visawe vina maana gani?", options: ["Maana zinazofanana", "Maana kinyume", "Hakuna maana"], answer: "Maana zinazofanana" },
        { question: "Vinyume vina maana gani?", options: ["Maana kinyume", "Maana zinazofanana", "Maana sawa kabisa"], answer: "Maana kinyume" },
      ],
    },
    {
      lessonId: 8,
      title: "Jaribio 8",
      subtitle: "Umahiri wa Matamshi",
      passingScore: 7,
      questions: [
        { question: "Mkazo wa neno ni nini?", options: ["Silabi inayosemwa kwa nguvu zaidi", "Aina ya uakifishaji", "Kanuni ya sarufi"], answer: "Silabi inayosemwa kwa nguvu zaidi" },
        { question: "Maneno ya Kiswahili mara nyingi hukazwa wapi?", options: ["Silabi ya pili kutoka mwisho", "Silabi ya kwanza kila wakati", "Herufi ya mwisho"], answer: "Silabi ya pili kutoka mwisho" },
        { question: "Toni ya swali la Ndiyo/Hapana kawaida hufanya nini mwishoni?", options: ["Hupanda", "Hushuka kila wakati", "Haibadiliki"], answer: "Hupanda" },
        { question: "Toni ya swali la Nini/Wapi kawaida hufanya nini mwishoni?", options: ["Hushuka", "Hupanda sana", "Hutoweka"], answer: "Hushuka" },
        { question: "Nini kinaweza kutokea ukikaza silabi isiyo sahihi?", options: ["Msikilizaji anaweza kuchanganyikiwa", "Hakuna kinachobadilika", "Neno linakuwa fupi zaidi"], answer: "Msikilizaji anaweza kuchanganyikiwa" },
        { question: "Kwa mujibu wa maandiko, nini kingine ni muhimu zaidi ya sarufi?", options: ["Matamshi wazi", "Tahajia tu", "Idadi ya maneno tu"], answer: "Matamshi wazi" },
        { question: "Wanafunzi wengi husahau nini?", options: ["Mkazo wa neno", "Nyakati za vitenzi", "Alama za uakifishaji"], answer: "Mkazo wa neno" },
        { question: "Neno lenye mkazo usio sahihi linaweza kusikika vipi?", options: ["Kama neno tofauti kabisa", "Kama neno refu zaidi", "Hakuna tofauti"], answer: "Kama neno tofauti kabisa" },
        { question: "Mazoezi ya dakika ngapi kwa siku yanaweza kusaidia kwa mujibu wa maandiko?", options: ["Hata dakika tano", "Masaa matano", "Hakuna mazoezi"], answer: "Hata dakika tano" },
        { question: "Lipi ni jozi ya sauti zinazochanganywa mara kwa mara?", options: ["chakula / shule", "nyekundu / bluu", "moja / mbili"], answer: "chakula / shule" },
      ],
    },
    {
      lessonId: 9,
      title: "Jaribio 9",
      subtitle: "Kiswahili cha Mazingira Mbalimbali",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanatumika mkahawani?", options: ["Naomba menyu, tafadhali?", "Kaunta ya kujisajili iko wapi?", "Niambie kuhusu wewe mwenyewe"], answer: "Naomba menyu, tafadhali?" },
        { question: "Maneno gani yanatumika uwanja wa ndege?", options: ["Ningependa kiti cha dirishani, tafadhali", "Naomba bili, tafadhali?", "Nguvu zako ni zipi?"], answer: "Ningependa kiti cha dirishani, tafadhali" },
        { question: "Maneno gani ni ya kawaida kwenye mahojiano ya kazi?", options: ["Niambie kuhusu wewe mwenyewe", "Huduma imejumuishwa?", "Sehemu ya mizigo iko wapi?"], answer: "Niambie kuhusu wewe mwenyewe" },
        { question: "Anna anafanya nini mwanzoni mwa mahojiano yake?", options: ["Anamsalimia meneja kwa heshima", "Anachelewa", "Anakataa kujibu maswali"], answer: "Anamsalimia meneja kwa heshima" },
        { question: "Anna anasema nguvu yake kuu ni ipi?", options: ["Kuwa mchapakazi na wa kuaminika", "Kuwa mwepesi wa kuandika", "Kuwa mtulivu sana"], answer: "Kuwa mchapakazi na wa kuaminika" },
        { question: "Anna anauliza swali gani kwa meneja?", options: ["Siku ya kawaida kazini inaonekanaje?", "Mshahara ni kiasi gani?", "Naweza kuondoka mapema?"], answer: "Siku ya kawaida kazini inaonekanaje?" },
        { question: "Meneja alijisikiaje kuhusu Anna?", options: ["Alivutiwa na maandalizi yake", "Alikasirika", "Alichanganyikiwa"], answer: "Alivutiwa na maandalizi yake" },
        { question: "Maneno gani yanatumika kuagiza chakula?", options: ["Ningependa kuku, tafadhali", "Sehemu ya mizigo iko wapi?", "Nguvu zako ni zipi?"], answer: "Ningependa kuku, tafadhali" },
        { question: "Maneno gani yanauliza kuhusu ndege?", options: ["Ndege itapaa saa ngapi?", "Naomba bili?", "Niambie kuhusu wewe mwenyewe"], answer: "Ndege itapaa saa ngapi?" },
        { question: "Sentensi gani inaelezea sifa nzuri kwa mahojiano?", options: ["Mimi ni mtu mchapakazi na wa kuaminika", "Mimi daima nachelewa", "Sipendi kufanya kazi"], answer: "Mimi ni mtu mchapakazi na wa kuaminika" },
      ],
    },
    {
      lessonId: 10,
      title: "Jaribio 10",
      subtitle: "Misingi ya Kiswahili cha Biashara",
      passingScore: 7,
      questions: [
        { question: "Maneno gani ni salamu ya barua pepe ya kikazi?", options: ["Mpendwa Bwana Kasongo,", "Vipi!", "Sasa!"], answer: "Mpendwa Bwana Kasongo," },
        { question: "Maneno gani ni kumalizia barua pepe ya kikazi?", options: ["Wako,", "Kwaheri kabisa,", "Baadaye,"], answer: "Wako," },
        { question: "Maneno gani yanaanzisha mkutano?", options: ["Tuanze", "Tumeacha kabisa", "Ninaondoka sasa"], answer: "Tuanze" },
        { question: "Maneno gani yanaomba ufafanuzi mkutanoni?", options: ["Unaweza kufafanua hilo?", "Sijali", "Hilo ni kosa"], answer: "Unaweza kufafanua hilo?" },
        { question: "'Mwisho wa muda' linamaanisha nini?", options: ["Tarehe ambayo kitu lazima kimalizike", "Aina ya barua pepe", "Chumba cha mikutano"], answer: "Tarehe ambayo kitu lazima kimalizike" },
        { question: "David alimsikia meneja wake akisema nini kuanzisha mkutano?", options: ["Tuanze", "Kwaherini wote", "Hakuna mkutano leo"], answer: "Tuanze" },
        { question: "David alisema nini aliposhindwa kuelewa jambo?", options: ["Unaweza kufafanua hilo, tafadhali?", "Sielewi chochote, kamwe", "Hakusema chochote"], answer: "Unaweza kufafanua hilo, tafadhali?" },
        { question: "David aliandikia nani barua pepe yake ya kwanza ya kikazi?", options: ["Mteja", "Mama yake", "Mgeni"], answer: "Mteja" },
        { question: "David alimalizaje barua pepe yake?", options: ["Wako", "Kwaheri", "Tuonane"], answer: "Wako" },
        { question: "Mfanyakazi mwenzake alifikiriaje kuhusu barua pepe hiyo?", options: ["Ilikuwa wazi na iliyoandikwa vizuri", "Ilikuwa ya kuchanganya", "Ilikuwa fupi mno"], answer: "Ilikuwa wazi na iliyoandikwa vizuri" },
      ],
    },
    {
      lessonId: 11,
      title: "Jaribio 11",
      subtitle: "Majadiliano na Hoja",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanatoa maoni?", options: ["Kwa maoni yangu,...", "Tuanze", "Hospitali iko wapi?"], answer: "Kwa maoni yangu,..." },
        { question: "Maneno gani yanatokubaliana kwa heshima?", options: ["Samahani, lakini sikubaliani", "Wewe si sahihi kabisa", "Sijali unachofikiri"], answer: "Samahani, lakini sikubaliani" },
        { question: "Maneno gani yanaunga mkono hoja kwa mfano?", options: ["Kwa mfano,...", "Kwaheri,...", "Labda,..."], answer: "Kwa mfano,..." },
        { question: "Maneno gani yanatumika kuhitimisha hoja?", options: ["Kwa kuhitimisha, naamini kuwa...", "Tuanze", "Unaweza kurudia?"], answer: "Kwa kuhitimisha, naamini kuwa..." },
        { question: "Wanafunzi walijadili nini?", options: ["Kama simu zinapaswa kuruhusiwa shuleni", "Chakula cha mchana", "Michezo gani ni bora"], answer: "Kama simu zinapaswa kuruhusiwa shuleni" },
        { question: "Maoni ya Joseph yalikuwa yapi?", options: ["Simu zinasaidia wanafunzi kujifunza", "Simu zinapaswa kupigwa marufuku milele", "Simu ni ghali mno"], answer: "Simu zinasaidia wanafunzi kujifunza" },
        { question: "Maoni ya Grace yalikuwa yapi?", options: ["Simu zinaweza kuvuruga sana", "Simu daima zinasaidia", "Hakuwa na maoni"], answer: "Simu zinaweza kuvuruga sana" },
        { question: "Grace alitokubalianaje na Joseph?", options: ["Kwa heshima, akisema 'Naelewa hoja yako, lakini...'", "Kwa kupiga kelele", "Kwa kuondoka darasani"], answer: "Kwa heshima, akisema 'Naelewa hoja yako, lakini...'" },
        { question: "Mwalimu alifikiriaje kuhusu majadiliano?", options: ["Hoja zote mbili ziliungwa mkono vizuri", "Wanafunzi wote wawili walikosea", "Majadiliano hayakuwa na maana"], answer: "Hoja zote mbili ziliungwa mkono vizuri" },
        { question: "Mwalimu alihimiza darasa kufanya nini?", options: ["Kuendelea kujadiliana kwa heshima", "Kuacha kuzungumza kabisa", "Kukubaliana mara moja"], answer: "Kuendelea kujadiliana kwa heshima" },
      ],
    },
    {
      lessonId: 12,
      title: "Jaribio 12",
      subtitle: "Mapitio ya Mwisho na Mazungumzo ya Maisha Halisi",
      passingScore: 7,
      questions: [
        { question: "Somo la 1 lilihusu mada gani ya sarufi?", options: ["Muundo wa sentensi na ngeli za nomino", "Rangi", "Namba"], answer: "Muundo wa sentensi na ngeli za nomino" },
        { question: "Nyakati gani zilifundishwa Somo la 2?", options: ["Wakati uliopita na ujao", "Wakati uliopo pekee", "Hakuna nyakati"], answer: "Wakati uliopita na ujao" },
        { question: "Ujuzi gani unasaidia kuuliza maswali ya ziada?", options: ["Kuendeleza mazungumzo", "Kumaliza mazungumzo haraka", "Kuepuka watu"], answer: "Kuendeleza mazungumzo" },
        { question: "Patrick alikuwa anawezaje mwaka mmoja uliopita?", options: ["Hakuweza hata kujitambulisha vizuri", "Alikuwa mahiri sana", "Alikuwa mwalimu"], answer: "Hakuweza hata kujitambulisha vizuri" },
        { question: "Patrick anaweza kufanya nini sasa?", options: ["Kufanya mazungumzo kamili kuhusu kazi na maoni yake", "Bado hajui chochote", "Kuendesha gari tu"], answer: "Kufanya mazungumzo kamili kuhusu kazi na maoni yake" },
        { question: "Patrick anasema siri ya maendeleo yake ni ipi?", options: ["Kujizoeza kidogo kila siku", "Kusoma mara moja kwa mwaka", "Kuacha kusoma"], answer: "Kujizoeza kidogo kila siku" },
        { question: "Katika mazungumzo ya mfano, mzungumzaji B anafanya kazi gani?", options: ["Kuandika ripoti na kujibu barua pepe za wateja", "Kuimba", "Hakuna kazi"], answer: "Kuandika ripoti na kujibu barua pepe za wateja" },
        { question: "Mzungumzaji B alijisikiaje mwanzoni mwa kazi mpya?", options: ["Na wasiwasi", "Amechoka", "Na hasira"], answer: "Na wasiwasi" },
        { question: "Mzungumzaji B atafanya nini zaidi?", options: ["Kuboresha Kiswahili chake kwa kazi", "Kuacha kazi", "Kuepuka Kiswahili"], answer: "Kuboresha Kiswahili chake kwa kazi" },
        { question: "Patrick ana hamu ya kuanza nini?", options: ["Kiwango cha 3", "Kiwango cha 1 tena", "Somo lingine tofauti"], answer: "Kiwango cha 3" },
      ],
    },
  ],

  finalQuiz: {
    title: "Jaribio la Mwisho - Kiwango cha 2",
    subtitle: "Jaribio hili linahusisha masomo yote ya Kiwango cha 2.",
    passingScore: 15,
    questions: [
      { question: "Chagua sentensi sahihi.", options: ["Yeye anafanya kazi kila siku", "Yeye wanafanya kazi kila siku", "Yeye kufanya kazi kila siku"], answer: "Yeye anafanya kazi kila siku" },
      { question: "Kiambishi -li- kinaonyesha nini?", options: ["Wakati uliopita", "Wakati ujao", "Wakati uliopo"], answer: "Wakati uliopita" },
      { question: "Kiambishi gani kinaonyesha mpango uliopangwa?", options: ["-ta-", "-li-", "-ki-"], answer: "-ta-" },
      { question: "Swali gani la ziada ni zuri baada ya 'Nilienda sokoni'?", options: ["Ulinunua nini?", "Kwaheri", "Sijali"], answer: "Ulinunua nini?" },
      { question: "Neno gani linaonyesha utofauti kwenye uandishi?", options: ["hata hivyo", "na", "kisha"], answer: "hata hivyo" },
      { question: "Unapaswa kufanya nini usipomwelewa mtu anayezungumza?", options: ["Muombe arudie au azungumze polepole", "Jifanye umeelewa", "Ondoke kimya kimya"], answer: "Muombe arudie au azungumze polepole" },
      { question: "Kutafuta kunatumika kwa ajili ya nini?", options: ["Kupata taarifa maalum haraka", "Kukariri kila neno", "Kuandika barua pepe"], answer: "Kupata taarifa maalum haraka" },
      { question: "Neno gani ni kisawe cha 'furaha'?", options: ["shangwe", "baridi", "kuchelewa"], answer: "shangwe" },
      { question: "Jozi gani inaonyesha sauti zinazochanganywa mara kwa mara?", options: ["chakula / shule", "nyekundu / bluu", "moja / mbili"], answer: "chakula / shule" },
      { question: "Maneno gani yanatumika kuagiza chakula mkahawani?", options: ["Ningependa kuku, tafadhali", "Hospitali iko wapi?", "Tuanze"], answer: "Ningependa kuku, tafadhali" },
      { question: "Maneno gani ni kumalizia barua pepe ya kikazi?", options: ["Wako,", "Kwaheri kabisa,", "Baadaye,"], answer: "Wako," },
      { question: "Maneno gani yanatokubaliana kwa heshima kwenye mjadala?", options: ["Samahani, lakini sikubaliani", "Wewe si sahihi", "Sijali"], answer: "Samahani, lakini sikubaliani" },
      { question: "Neno gani sahihi linakamilisha: 'Ninajizoeza kila siku, ___ ninaendelea vizuri.'", options: ["kwa hiyo", "lakini", "au"], answer: "kwa hiyo" },
      { question: "Mkazo wa maneno ya Kiswahili mara nyingi uko wapi?", options: ["Silabi ya pili kutoka mwisho", "Herufi ya kwanza kila wakati", "Hauko popote"], answer: "Silabi ya pili kutoka mwisho" },
      { question: "Toni ya swali la Nini/Wapi kawaida hufanya nini mwishoni?", options: ["Hushuka", "Hupanda sana", "Hutoweka"], answer: "Hushuka" },
      { question: "Thomas alipanga kufanya nini kiangazi kijacho?", options: ["Kutembelea Lubumbashi tena", "Kuhama nchi nyingine", "Kuacha kusafiri"], answer: "Kutembelea Lubumbashi tena" },
      { question: "Anna alisema nguvu yake kuu ni ipi kwenye mahojiano?", options: ["Kuwa mchapakazi na wa kuaminika", "Kuwa mwepesi wa kucheza mpira", "Kuwa na magari mengi"], answer: "Kuwa mchapakazi na wa kuaminika" },
      { question: "Mfanyakazi mwenzake David alifikiriaje kuhusu barua pepe yake?", options: ["Ilikuwa wazi na iliyoandikwa vizuri", "Ilikuwa mbaya", "Ilikuwa ndefu mno"], answer: "Ilikuwa wazi na iliyoandikwa vizuri" },
      { question: "Mwalimu alifikiriaje kuhusu majadiliano ya darasa?", options: ["Hoja zote mbili ziliungwa mkono vizuri", "Hazikuwa na maana", "Mwanafunzi mmoja tu alikuwa sahihi"], answer: "Hoja zote mbili ziliungwa mkono vizuri" },
      { question: "Nini kilimsaidia Patrick kufanya maendeleo zaidi?", options: ["Kujizoeza kidogo kila siku", "Kusoma mara moja kwa mwaka", "Kuepuka kuzungumza Kiswahili"], answer: "Kujizoeza kidogo kila siku" },
    ],
  },
};
