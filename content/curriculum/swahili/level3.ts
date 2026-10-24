import type { LevelCurriculum } from "../types";

// New content authored for Phase 4, written entirely in Swahili, mirroring
// the English Level 3 business-language topic plan.
export const swahiliLevel3: LevelCurriculum = {
  langCode: "SW",
  langLabel: "Swahili",
  langSlug: "swahili",
  level: 3,
  levelTitle: "Kiwango cha 3 - Kiswahili cha Biashara",
  levelSubtitle: "Mawasiliano ya kikazi, mawasilisho, na Kiswahili cha mahali pa kazi.",

  lessons: [
    {
      id: 1,
      title: "Masharti kwa Biashara",
      subtitle: "Tumia sentensi za masharti kuzungumzia uwezekano na matokeo kazini.",
      sections: [
        { heading: "Sharti la Kwanza (uwezekano halisi)", body: ["Kama + wakati uliopo, -ta- + kitenzi.", "Kama tukimaliza ripoti mapema, tutaituma leo.", "Kama mteja akipiga simu, nitajibu mara moja."] },
        { heading: "Sharti la Pili (lisilowezekana au la kudhani)", body: ["Kama + wakati uliopita, nge- + kitenzi.", "Kama ningekuwa na muda zaidi, ningepitia pendekezo tena.", "Kama angekuwa meneja, angebadilisha ratiba."] },
        { heading: "Matumizi ya Kibiashara", body: ["Masharti ni ya kawaida katika mazungumzo na mipango.", "Kama mkipunguza bei, tutatia saini mkataba.", "Kama soko likikua, tungefikiria kupanua."] },
      ],
      speakText: `Sharti la kwanza, kwa uwezekano halisi. Kama tukimaliza ripoti mapema, tutaituma leo.

Sharti la pili, kwa jambo lisilowezekana au la kudhani. Kama ningekuwa na muda zaidi, ningepitia pendekezo tena.

Matumizi ya kibiashara. Masharti ni ya kawaida katika mazungumzo na mipango. Kama mkipunguza bei, tutatia saini mkataba.`,
      videoTopic: "Linganisha sharti la kwanza na la pili katika mazungumzo ya kibiashara.",
      videoUrl: "https://www.youtube.com/watch?v=rAici_jRgY0",
      readingTitle: "Mazungumzo katika Shirika la Brightened Mind",
      reading: [
        "Wakati wa mkutano, msambazaji alisema, “Kama mkiagiza vitu vingi zaidi, tutatoa punguzo.”",
        "Meneja alijibu, “Kama tungekuwa na bajeti kubwa zaidi robo hii, tungeagiza mara mbili sasa hivi.”",
        "Pande zote mbili ziliendelea kuzungumza hadi walifikia makubaliano yaliyowafaa wote.",
        "Kufikia mwisho wa mkutano, walikuwa wametia saini mkataba mpya.",
      ],
      readingSpeakText: `Mazungumzo katika Shirika la Brightened Mind. Wakati wa mkutano, msambazaji alisema, kama mkiagiza vitu vingi zaidi, tutatoa punguzo.`,
      exercises: ["Andika sentensi ya sharti la kwanza kuhusu mwisho wa muda wa kazi.", "Andika sentensi ya sharti la pili kuhusu cheo cha kudhani.", "Andika upya 'Tutapanua kama soko likikua' kwa mpangilio tofauti.", "Eleza tofauti kati ya sharti la kwanza na la pili."],
      speakingTopic: "Eleza uamuzi kazini ukitumia sentensi ya sharti la kwanza na la pili.",
    },
    {
      id: 2,
      title: "Vitenzi Saidizi kwa Biashara",
      subtitle: "Tumia vitenzi saidizi kueleza wajibu, ushauri, na uwezekano kitaalamu.",
      sections: [
        { heading: "Wajibu na Ulazima", body: ["Lazima: wajibu mkubwa.", "Wafanyakazi wote lazima watume ripoti ifikapo Ijumaa.", "Lazima utie saini mkataba kabla ya kuanza."] },
        { heading: "Ushauri na Pendekezo", body: ["Inafaa / Ungependa: kutoa ushauri.", "Inafaa ukague tena namba kabla ya kutuma.", "Tungependa kumjulisha mteja kuhusu uchelewaji."] },
        { heading: "Uwezekano", body: ["Huenda / Yamkini: kitu kinawezekana lakini si uhakika.", "Huenda mwisho wa muda ukabadilika wiki ijayo.", "Tunaweza kufikiria msambazaji mwingine."] },
      ],
      speakText: `Wajibu na ulazima. Lazima unaonyesha wajibu mkubwa. Wafanyakazi wote lazima watume ripoti ifikapo Ijumaa.

Ushauri na pendekezo. Inafaa na ungependa vinatumika kutoa ushauri. Inafaa ukague tena namba kabla ya kutuma.

Uwezekano. Huenda na yamkini vinaonyesha kitu kinawezekana lakini si uhakika.`,
      videoTopic: "Sikia tofauti kati ya wajibu, ushauri, na uwezekano mahali pa kazi.",
      videoUrl: "https://www.youtube.com/watch?v=iLH1loVEIBU",
      readingTitle: "Maandalizi ya Ukaguzi",
      reading: [
        "Meneja wa fedha alisema, “Lazima tumalize nyaraka za ukaguzi ifikapo Jumatatu.”",
        "Aliongeza, “Inafaa pia mtayarishe muhtasari mfupi kwa mkurugenzi.”",
        "Mfanyakazi mmoja aliuliza kama mwisho wa muda ungeweza kubadilika, lakini meneja alisema haikuwezekana.",
        "Mwishowe, timu ilimaliza kila kitu kwa wakati na kuepuka msongo wa dakika za mwisho.",
      ],
      readingSpeakText: `Maandalizi ya ukaguzi. Meneja wa fedha alisema, lazima tumalize nyaraka za ukaguzi ifikapo Jumatatu.`,
      exercises: ["Andika sentensi moja kwa 'lazima' kuhusu wajibu kazini.", "Andika sentensi moja kwa 'inafaa' kutoa ushauri kwa mfanyakazi mwenzako.", "Andika sentensi moja kwa 'huenda' kuhusu mpango usio wa uhakika.", "Eleza tofauti kati ya 'lazima' na 'inafaa'."],
      speakingTopic: "Mpe mfanyakazi mwenzako ushauri na wajibu mkali kwa kutumia vitenzi saidizi.",
    },
    {
      id: 3,
      title: "Lugha ya Majadiliano ya Biashara",
      subtitle: "Jifunze maneno yanayotumika kujadili bei, mwisho wa muda, na makubaliano.",
      sections: [
        { heading: "Kuanzisha Majadiliano", body: ["Tungependa kujadili masharti ya mkataba.", "Tuzungumzie kile tunachoweza kutoa kwa kila mmoja."] },
        { heading: "Kutoa Ofa", body: ["Tunaweza kukupa punguzo la asilimia 10 kwa agizo kubwa zaidi.", "Ofa yetu bora ni...", "Tuko tayari kuongeza mwisho wa muda kwa wiki moja."] },
        { heading: "Kujibu na Kukubaliana Kati", body: ["Hilo linaonekana la busara, lakini unaweza pia...", "Tunaweza kukutana katikati.", "Tutafute suluhisho linalofaa pande zote mbili."] },
        { heading: "Kukamilisha Mkataba", body: ["Nadhani tumefikia makubaliano.", "Tuandike hili kwa maandishi.", "Tunatarajia kufanya kazi nawe."] },
      ],
      speakText: `Kuanzisha majadiliano. Tungependa kujadili masharti ya mkataba.

Kutoa ofa. Tunaweza kukupa punguzo la asilimia kumi kwa agizo kubwa zaidi.

Kujibu na kukubaliana kati. Hilo linaonekana la busara, lakini unaweza pia... Tunaweza kukutana katikati.

Kukamilisha mkataba. Nadhani tumefikia makubaliano. Tuandike hili kwa maandishi.`,
      videoTopic: "Tazama majadiliano kamili kuanzia mwanzo hadi kukamilika kwa mkataba.",
      videoUrl: "https://www.youtube.com/watch?v=VI7j9Sr64ic",
      readingTitle: "Kukamilisha Mkataba",
      reading: [
        "Makampuni mawili yalijadiliana kwa karibu saa mbili kuhusu bei ya vifaa vipya.",
        "Mwanzoni, mnunuzi alisema bei ilikuwa juu mno, lakini muuzaji alitoa punguzo la asilimia 10 kwa agizo kubwa zaidi.",
        "Mnunuzi alijibu, “Hilo linaonekana la busara, lakini unaweza pia kujumuisha usafirishaji bure?”",
        "Muuzaji alikubali, na pande zote mbili zilipeana mikono zikisema, “Tunatarajia kufanya kazi nawe.”",
      ],
      readingSpeakText: `Kukamilisha mkataba. Makampuni mawili yalijadiliana kwa karibu saa mbili kuhusu bei ya vifaa vipya.`,
      exercises: ["Andika sentensi ya kuanzisha majadiliano.", "Andika sentensi ya kutoa ofa yenye punguzo.", "Andika sentensi ya kukubaliana kati ya misimamo miwili.", "Andika sentensi ya kumalizia majadiliano yaliyofanikiwa."],
      speakingTopic: "Igiza majadiliano mafupi kuhusu bei na muda wa utoaji na mwenzako.",
    },
    {
      id: 4,
      title: "Ujuzi wa Mawasilisho",
      subtitle: "Jifunze lugha ya kupanga na kutoa mawasilisho ya kitaalamu wazi.",
      sections: [
        { heading: "Kuanzisha Mawasilisho", body: ["Habari za asubuhi kwa wote, asante kwa kuwepo.", "Leo, nitazungumzia...", "Mawasilisho yatachukua dakika 15, yakifuatiwa na maswali."] },
        { heading: "Kupanga Mambo Yako", body: ["Kwanza, nitaeleza... Kisha, nitaendelea na... Mwishowe, nitahitimisha kwa...", "Twendeni slaidi inayofuata.", "Kama mnavyoona kwenye chati hii..."] },
        { heading: "Kumalizia Mawasilisho", body: ["Kwa muhtasari, mambo makuu ni...", "Asante kwa umakini wenu.", "Kuna maswali yoyote?"] },
      ],
      speakText: `Kuanzisha mawasilisho. Habari za asubuhi kwa wote, asante kwa kuwepo. Leo, nitazungumzia...

Kupanga mambo yako. Kwanza, nitaeleza... Kisha, nitaendelea na... Mwishowe, nitahitimisha kwa...

Kumalizia mawasilisho. Kwa muhtasari, mambo makuu ni... Asante kwa umakini wenu. Kuna maswali yoyote?`,
      videoTopic: "Tazama mawasilisho mafupi na yaliyopangwa vizuri ya kitaalamu.",
      videoUrl: "https://www.youtube.com/watch?v=RCQFm5scVIU",
      readingTitle: "Mawasilisho ya Kwanza ya Linda",
      reading: [
        "Linda alikuwa na wasiwasi kabla ya mawasilisho yake ya kwanza kwa timu ya uongozi.",
        "Alianza kwa kusema, “Habari za asubuhi kwa wote, asante kwa kuwepo.”",
        "Alipanga mazungumzo yake vizuri: kwanza tatizo, kisha suluhisho lake, na mwishowe matokeo.",
        "Mwishoni, alisema, “Kwa muhtasari, mambo makuu ni kupunguza gharama na kuharakisha utoaji. Asante kwa umakini wenu. Kuna maswali yoyote?”",
        "Timu ilivutiwa na jinsi mawasilisho yake yalivyokuwa wazi na yaliyopangwa.",
      ],
      readingSpeakText: `Mawasilisho ya kwanza ya Linda. Linda alikuwa na wasiwasi kabla ya mawasilisho yake ya kwanza kwa timu ya uongozi.`,
      exercises: ["Andika sentensi ya kuanzisha mawasilisho kuhusu kazi yako.", "Andika maneno matatu ya mpito kuunganisha mambo.", "Andika sentensi ya kumalizia inayoalika maswali.", "Panga mawasilisho ya dakika 1 kuhusu mradi unaoupenda."],
      speakingTopic: "Toa mawasilisho mafupi ya dakika 1 kuhusu mada unayoichagua.",
    },
    {
      id: 5,
      title: "Mikutano Rasmi na Kumbukumbu",
      subtitle: "Jifunze kushiriki mikutanoni na kuandika muhtasari wa yaliyojadiliwa.",
      sections: [
        { heading: "Wakati wa Mkutano", body: ["Tuanze?", "Je, kila mtu ananisikia vizuri?", "Ningependa kutoa hoja.", "Tunaweza kurudi kwenye hili baadaye?"] },
        { heading: "Kuomba Nafasi ya Kuzungumza", body: ["Naweza kusema jambo?", "Kama naweza kuongeza...", "Samahani kukatiza, lakini..."] },
        { heading: "Kuandika Kumbukumbu za Mkutano", body: ["Kumbukumbu zinaandika yaliyojadiliwa na kuamuliwa.", "Waliohudhuria: ni akina nani waliokuwepo.", "Ajenda: orodha ya mada zilizojadiliwa.", "Hatua za kuchukua: kazi zilizogawiwa, pamoja na mwenye jukumu na mwisho wa muda."] },
      ],
      speakText: `Wakati wa mkutano. Tuanze? Je, kila mtu ananisikia vizuri? Ningependa kutoa hoja.

Kuomba nafasi ya kuzungumza. Naweza kusema jambo? Kama naweza kuongeza... Samahani kukatiza, lakini...

Kuandika kumbukumbu za mkutano. Kumbukumbu zinaandika yaliyojadiliwa na kuamuliwa.`,
      videoTopic: "Ona jinsi mkutano rasmi unavyoendeshwa kutoka mwanzo hadi mwisho.",
      videoUrl: "https://www.youtube.com/watch?v=LJK8x23Vkus",
      readingTitle: "Mkutano wa Jumatatu",
      reading: [
        "Saa tatu asubuhi, kiongozi wa timu alisema, “Tuanze?” na kila mtu alikubaliana.",
        "Wakati wa majadiliano, Peter alisema, “Kama naweza kuongeza, nadhani tunapaswa pia kupitia bajeti.”",
        "Baada ya mkutano, katibu aliandika kumbukumbu, akiorodhesha waliohudhuria, ajenda, na hatua tatu za kuchukua zenye mwisho wa muda.",
        "Kila mtu alipokea nakala ya kumbukumbu kwa barua pepe siku hiyo hiyo.",
      ],
      readingSpeakText: `Mkutano wa Jumatatu. Saa tatu asubuhi, kiongozi wa timu alisema, tuanze? Na kila mtu alikubaliana.`,
      exercises: ["Andika sentensi ya kukatiza mkutano kwa heshima.", "Andika sentensi ya kuomba kuongeza jambo.", "Orodhesha sehemu nne za kumbukumbu za mkutano.", "Andika mfano mmoja wa hatua ya kuchukua yenye mwenye jukumu na mwisho wa muda."],
      speakingTopic: "Endesha mkutano mfupi wa kujifanya na mwenzako na jizoeze kuomba nafasi ya kuzungumza kwa heshima.",
    },
    {
      id: 6,
      title: "Uandishi wa Kibiashara: Ripoti na Mapendekezo",
      subtitle: "Jifunze muundo wa ripoti au pendekezo la kitaalamu.",
      sections: [
        { heading: "Muundo wa Ripoti", body: ["Utangulizi: lengo la ripoti.", "Matokeo: ukweli na takwimu.", "Hitimisho: muhtasari wa yaliyopatikana.", "Mapendekezo: hatua zinazopendekezwa."] },
        { heading: "Maneno ya Muhimu", body: ["Lengo la ripoti hii ni...", "Takwimu zinaonyesha kuwa...", "Kutokana na matokeo haya, tunapendekeza...", "Kwa kuhitimisha, ..."] },
      ],
      speakText: `Muundo wa ripoti. Utangulizi unaeleza lengo la ripoti. Matokeo yanaonyesha ukweli na takwimu. Hitimisho linatoa muhtasari. Mapendekezo yanatoa hatua zinazopendekezwa.

Maneno ya muhimu. Lengo la ripoti hii ni... Takwimu zinaonyesha kuwa... Kutokana na matokeo haya, tunapendekeza...`,
      videoTopic: "Ona jinsi ripoti ya kibiashara inavyopangwa kuanzia utangulizi hadi mapendekezo.",
      videoUrl: "https://www.youtube.com/watch?v=odbsGjQFDu0",
      readingTitle: "Ripoti Kuhusu Kuridhika kwa Wateja",
      reading: [
        "Lengo la ripoti hii ni kutathmini kuridhika kwa wateja katika robo iliyopita.",
        "Takwimu zinaonyesha kuwa asilimia 85 ya wateja waliridhika na huduma, ongezeko kutoka mwaka jana.",
        "Hata hivyo, baadhi ya wateja walitaja kuwa muda wa kujibu ungeweza kuwa haraka zaidi.",
        "Kutokana na matokeo haya, tunapendekeza kuajiri wafanyakazi wawili zaidi wa huduma kwa wateja.",
        "Kwa kuhitimisha, kuridhika kwa wateja kunaboreka, lakini mabadiliko madogo yanaweza kufanya vizuri zaidi.",
      ],
      readingSpeakText: `Ripoti kuhusu kuridhika kwa wateja. Lengo la ripoti hii ni kutathmini kuridhika kwa wateja katika robo iliyopita.`,
      exercises: ["Andika sentensi ya utangulizi kwa ripoti kuhusu kazi yako.", "Andika sentensi ya matokeo ukitumia 'Takwimu zinaonyesha kuwa...'.", "Andika pendekezo ukitumia 'tunapendekeza'.", "Andika hitimisho fupi (sentensi 2) la ripoti ya kudhani."],
      speakingTopic: "Toa muhtasari wa ripoti ya kudhani kuhusu utendaji wa timu yako.",
    },
    {
      id: 7,
      title: "Kiswahili cha Simu na Mikutano ya Video",
      subtitle: "Jifunze maneno ya simu na mikutano ya video ya kitaalamu.",
      sections: [
        { heading: "Kuanza Simu", body: ["Habari, huyu ni ... kutoka Shirika la Brightened Mind.", "Ninapiga simu kuhusu...", "Je, huu ni wakati mzuri wa kuzungumza?"] },
        { heading: "Wakati wa Simu", body: ["Unaweza kurudia hilo, tafadhali?", "Samahani, mtandao hauko wazi sana.", "Niruhusu nikague hilo na nikujibu baadaye.", "Unanisikia vizuri?"] },
        { heading: "Kumalizia Simu", body: ["Asante kwa muda wako.", "Nitakutumia barua pepe kuthibitisha.", "Tuonane baadaye. Kwaheri."] },
      ],
      speakText: `Kuanza simu. Habari, huyu ni... kutoka Shirika la Brightened Mind. Ninapiga simu kuhusu... Je, huu ni wakati mzuri wa kuzungumza?

Wakati wa simu. Unaweza kurudia hilo, tafadhali? Samahani, mtandao hauko wazi sana.

Kumalizia simu. Asante kwa muda wako. Nitakutumia barua pepe kuthibitisha.`,
      videoTopic: "Sikiliza simu ya kitaalamu kuanzia mwanzo hadi mwisho.",
      videoUrl: "https://www.youtube.com/watch?v=THbepS5Q7Ss",
      readingTitle: "Simu kwa Mteja",
      reading: [
        "“Habari, huyu ni Sara kutoka Shirika la Brightened Mind. Ninapiga simu kuhusu agizo lako la hivi karibuni.”",
        "Mtandao wa mteja haukuwa wazi sana, kwa hiyo Sara alisema, “Samahani, mtandao hauko wazi sana, unaweza kurudia hilo, tafadhali?”",
        "Baada ya kutatua tatizo, Sara alisema, “Asante kwa muda wako, nitakutumia barua pepe kuthibitisha kila kitu.”",
        "Mteja alimshukuru, na walimaliza simu kwa heshima.",
      ],
      readingSpeakText: `Simu kwa mteja. Habari, huyu ni Sara kutoka Shirika la Brightened Mind. Ninapiga simu kuhusu agizo lako la hivi karibuni.`,
      exercises: ["Andika jinsi utakavyoanzisha simu ya kitaalamu.", "Andika sentensi ya kumuomba mtu arudie.", "Andika sentensi ya kumalizia simu kwa heshima.", "Jizoeze mazungumzo mafupi ya simu na mwenzako."],
      speakingTopic: "Igiza simu ukijitambulisha na kueleza sababu ya kupiga simu.",
    },
    {
      id: 8,
      title: "Mitandao na Mazungumzo ya Kawaida",
      subtitle: "Jifunze kutoa maoni mazuri ya kitaalamu kwenye mazungumzo yasiyo rasmi.",
      sections: [
        { heading: "Kuanzisha Mazungumzo ya Kawaida", body: ["Kwa hiyo, unawajuaje waandaaji?", "Unafanya kazi gani?", "Umeshawahi kuja tukio kama hili hapo awali?"] },
        { heading: "Kubadilishana Mawasiliano", body: ["Ilikuwa vizuri kuzungumza nawe. Naweza kupata kadi yako ya biashara?", "Tuunganishwe LinkedIn.", "Nitakutumia barua pepe wiki ijayo."] },
        { heading: "Mada Salama dhidi ya za Kuepuka", body: ["Salama: kazi, mwelekeo wa sekta, tukio lenyewe, safari.", "Epuka: mshahara, siasa, matatizo binafsi, dini."] },
      ],
      speakText: `Kuanzisha mazungumzo ya kawaida. Kwa hiyo, unawajuaje waandaaji? Unafanya kazi gani?

Kubadilishana mawasiliano. Ilikuwa vizuri kuzungumza nawe. Naweza kupata kadi yako ya biashara? Tuunganishwe LinkedIn.

Mada salama dhidi ya za kuepuka. Salama ni kazi, mwelekeo wa sekta, na safari. Epuka mshahara na siasa.`,
      videoTopic: "Ona mazungumzo ya kawaida ya kitaalamu kwenye tukio la biashara.",
      videoUrl: "https://www.youtube.com/watch?v=zTeT25PtnFk",
      readingTitle: "Kukutana na Mtu Mpya Mkutanoni",
      reading: [
        "Mkutanoni, Michael alijitambulisha kwa mgeni aliyesimama karibu na meza ya kahawa.",
        "Aliuliza, “Unafanya kazi gani?” na waligundua walifanya kazi katika sekta zinazofanana.",
        "Walizungumza kuhusu mwelekeo wa sekta na safari kwa dakika kumi hivi.",
        "Kabla ya kuondoka, Michael alisema, “Ilikuwa vizuri kuzungumza nawe, naweza kupata kadi yako ya biashara? Tuunganishwe LinkedIn.”",
      ],
      readingSpeakText: `Kukutana na mtu mpya mkutanoni. Mkutanoni, Michael alijitambulisha kwa mgeni aliyesimama karibu na meza ya kahawa.`,
      exercises: ["Andika maswali mawili ya mazungumzo ya kawaida kwenye tukio la kibiashara.", "Andika sentensi ya kuomba mawasiliano ya mtu.", "Orodhesha mada mbili salama na mbili za kuepuka.", "Jizoeze mazungumzo mafupi ya mitandao na mwenzako."],
      speakingTopic: "Jizoeze kujitambulisha na kufanya mazungumzo ya kawaida kwenye tukio la kubuni la mitandao.",
    },
    {
      id: 9,
      title: "Utatuzi wa Matatizo na Kufanya Maamuzi",
      subtitle: "Jifunze lugha ya kutambua matatizo na kufanya maamuzi kazini.",
      sections: [
        { heading: "Kutambua Tatizo", body: ["Tumekumbana na tatizo na...", "Tatizo kuu linaonekana kuwa...", "Hili limesababisha ucheleweshaji kwenye..."] },
        { heading: "Kupendekeza Suluhisho", body: ["Chaguo moja lingekuwa...", "Tunaweza kujaribu...", "Vipi kama tuka...?"] },
        { heading: "Kufanya Uamuzi", body: ["Twende na chaguo hili.", "Nadhani hiyo ndiyo njia bora.", "Tumeamua kuendelea na..."] },
      ],
      speakText: `Kutambua tatizo. Tumekumbana na tatizo na... Tatizo kuu linaonekana kuwa... Hili limesababisha ucheleweshaji kwenye...

Kupendekeza suluhisho. Chaguo moja lingekuwa... Tunaweza kujaribu... Vipi kama tuka...?

Kufanya uamuzi. Twende na chaguo hili. Tumeamua kuendelea na...`,
      videoTopic: "Tazama timu ikitambua tatizo na kukubaliana kuhusu suluhisho pamoja.",
      videoUrl: "https://www.youtube.com/watch?v=VVwvu8RF0ak",
      readingTitle: "Tatizo la Usafirishaji",
      reading: [
        "Timu ya usafirishaji ilisema, “Tumekumbana na tatizo na lori la usafirishaji. Tatizo kuu linaonekana kuwa hitilafu ya injini.”",
        "Meneja aliuliza mapendekezo, na mfanyakazi mmoja alisema, “Vipi kama tukaajiri lori kwa usafirishaji wa leo?”",
        "Baada ya majadiliano mafupi, meneja alisema, “Twende na chaguo hili. Tumeamua kuajiri lori mara moja.”",
        "Usafirishaji ulikamilika kwa wakati kutokana na uamuzi wa haraka.",
      ],
      readingSpeakText: `Tatizo la usafirishaji. Timu ya usafirishaji ilisema, tumekumbana na tatizo na lori la usafirishaji.`,
      exercises: ["Andika sentensi ya kutambua tatizo kazini.", "Andika suluhisho mbili zilizopendekezwa ukitumia 'Tunaweza kujaribu' na 'Vipi kama tuka'.", "Andika sentensi ya kufanya uamuzi wa mwisho.", "Eleza tatizo ulilolitatua hivi karibuni ukitumia maneno ya somo hili."],
      speakingTopic: "Eleza tatizo la kazini na pendekeza suluhisho mbili zinazowezekana.",
    },
    {
      id: 10,
      title: "Mawasiliano Baina ya Tamaduni",
      subtitle: "Jifunze kuwasiliana kwa heshima na ufanisi na wenzako wa kimataifa.",
      sections: [
        { heading: "Kwa Nini Ufahamu wa Tamaduni ni Muhimu", body: ["Tamaduni tofauti zina kanuni tofauti kuhusu muda, urasmi, na uwazi.", "Kufahamu tofauti hizi husaidia kuepuka kutoelewana."] },
        { heading: "Maneno Muhimu", body: ["Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?", "Nataka kuhakikisha nimekuelewa vizuri.", "Tafadhali niambie nikisema jambo lisilo wazi."] },
        { heading: "Vidokezo vya Mawasiliano Wazi", body: ["Zungumza kwa uwazi na epuka misemo ngumu.", "Hakikisha uelewa kwa maswali rahisi ya ziada.", "Kuwa na subira na mtindo wa mawasiliano wa wengine."] },
      ],
      speakText: `Kwa nini ufahamu wa tamaduni ni muhimu. Tamaduni tofauti zina kanuni tofauti kuhusu muda, urasmi, na uwazi.

Maneno muhimu. Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako? Nataka kuhakikisha nimekuelewa vizuri.

Vidokezo vya mawasiliano wazi. Zungumza kwa uwazi na epuka misemo ngumu.`,
      videoTopic: "Ona jinsi timu ya kimataifa inavyowasiliana kwa uwazi baina ya tamaduni.",
      readingTitle: "Kufanya Kazi na Timu ya Kimataifa",
      reading: [
        "Shirika la Brightened Mind lilipoanza kufanya kazi na washirika nje ya nchi, timu iligundua tofauti za kitamaduni.",
        "Katika baadhi ya mikutano, wenzao walikuwa wazi sana, wakati wengine walipendelea kujadili mambo polepole zaidi.",
        "Kuepuka kutoelewana, kiongozi wa timu mara nyingi aliuliza, “Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?”",
        "Tabia hii rahisi ilisaidia timu nzima kuwasiliana kwa heshima na ufanisi zaidi.",
      ],
      readingSpeakText: `Kufanya kazi na timu ya kimataifa. Shirika la Brightened Mind lilipoanza kufanya kazi na washirika nje ya nchi, timu iligundua tofauti za kitamaduni.`,
      exercises: ["Andika sentensi ya kuuliza kuhusu mtindo wa kazi wa utamaduni mwingine.", "Andika sentensi ya kuhakiki uelewa wako kwa heshima.", "Orodhesha vidokezo viwili vya mawasiliano wazi baina ya tamaduni.", "Eleza wakati ulipowasiliana na mtu kutoka tamaduni tofauti."],
      speakingTopic: "Zungumzia jinsi utakavyowasiliana kwa heshima na mfanyakazi mwenzako wa kimataifa.",
    },
    {
      id: 11,
      title: "Msamiati wa Uongozi na Usimamizi",
      subtitle: "Jifunze msamiati muhimu unaotumiwa na wasimamizi na viongozi kazini.",
      sections: [
        { heading: "Msamiati Muhimu", body: ["Kugawa: kumpa mtu mwingine kazi.", "Kuhamasisha: kumtia mtu moyo kufanya kazi vizuri.", "Maoni: maneno kuhusu utendaji wa mtu.", "Uwajibikaji: kuwa na jukumu la vitendo na matokeo yako."] },
        { heading: "Kutoa Maoni", body: ["Ninathamini sana juhudi ulizoweka kwenye hili.", "Eneo moja unaloweza kuboresha ni...", "Tuweke lengo wazi kwa wakati ujao."] },
        { heading: "Kuongoza Timu", body: ["Ningependa kukugawia kazi hii.", "Kazi nzuri ya kuhamasisha timu wiki hii.", "Sote tunahitaji kuwajibika kwa mwisho wa muda wetu."] },
      ],
      speakText: `Msamiati muhimu. Kugawa kunamaanisha kumpa mtu mwingine kazi. Kuhamasisha kunamaanisha kumtia mtu moyo. Maoni ni maneno kuhusu utendaji. Uwajibikaji ni kuwa na jukumu la matokeo yako.

Kutoa maoni. Ninathamini sana juhudi ulizoweka kwenye hili. Eneo moja unaloweza kuboresha ni...

Kuongoza timu. Ningependa kukugawia kazi hii.`,
      videoTopic: "Ona meneja akitoa maoni wazi na ya heshima kwa mfanyakazi mwenzake.",
      videoUrl: "https://www.youtube.com/watch?v=Il8XlDl77bw",
      readingTitle: "Kiongozi Mpya wa Timu",
      reading: [
        "Joseph alipokuwa kiongozi wa timu, alijifunza kugawa kazi badala ya kufanya kila kitu peke yake.",
        "Pia alijifunza kutoa maoni wazi, akisema mambo kama, “Ninathamini sana juhudi ulizoweka kwenye hili. Eneo moja unaloweza kuboresha ni kutimiza mwisho wa muda.”",
        "Timu yake ilihamasika zaidi kwa sababu walijisikia kuaminiwa na kuwajibika kwa kazi yao wenyewe.",
        "Ndani ya miezi michache, utendaji wa timu uliboreka kwa kiasi kikubwa.",
      ],
      readingSpeakText: `Kiongozi mpya wa timu. Joseph alipokuwa kiongozi wa timu, alijifunza kugawa kazi badala ya kufanya kila kitu peke yake.`,
      exercises: ["Fafanua 'kugawa', 'kuhamasisha', 'maoni', na 'uwajibikaji' kwa maneno yako.", "Andika sentensi ya maoni mazuri kwa mfanyakazi mwenzako.", "Andika sentensi ya maoni ya kujenga kwa heshima.", "Eleza kiongozi mzuri unayemjua ukitumia msamiati wa somo hili."],
      speakingTopic: "Mpe mfanyakazi mwenzako wa kudhani maoni kuhusu kazi yake ya hivi karibuni.",
    },
    {
      id: 12,
      title: "Mapitio ya Mwisho na Mazungumzo Halisi ya Kibiashara",
      subtitle: "Pitia kila kitu kilichojifunzwa Kiwango cha 3 na jizoeze mazungumzo kamili ya kitaalamu.",
      sections: [
        {
          heading: "Mambo Muhimu Tuliyojifunza",
          body: [
            "Kutumia masharti na vitenzi saidizi kitaalamu",
            "Kujadiliana bei na makubaliano",
            "Kutoa mawasilisho wazi",
            "Kushiriki mikutanoni na kuandika kumbukumbu",
            "Kuandika ripoti na mapendekezo",
            "Kushughulikia simu na mikutano ya video",
            "Kujenga mitandao na kufanya mazungumzo ya kawaida",
            "Kutatua matatizo na kufanya maamuzi",
            "Kuwasiliana baina ya tamaduni",
            "Kutumia msamiati wa uongozi na usimamizi",
          ],
        },
        {
          heading: "Mfano wa Mazungumzo Halisi",
          body: [
            "A: Habari za asubuhi. Asante kwa kujiunga na simu hii.",
            "B: Habari za asubuhi, nina furaha kuwepo. Ninapiga simu kuhusu pendekezo ulilotuma.",
            "A: Bila shaka. Unafikiriaje?",
            "B: Kwa ujumla, linaonekana zuri. Kama mngeweza kuongeza mwisho wa muda wa utoaji kwa wiki moja, tungetia saini mara moja.",
            "A: Hilo linasikika la busara. Niruhusu nikague na timu yangu na nikujibu leo.",
            "B: Vizuri sana, asante kwa muda wako. Ninatarajia kufanya kazi pamoja.",
          ],
        },
      ],
      speakText: `Mambo muhimu tuliyojifunza Kiwango cha 3 ni pamoja na kutumia masharti na vitenzi saidizi kitaalamu, kujadiliana, kutoa mawasilisho, kushiriki mikutanoni, kuandika ripoti, kushughulikia simu, kujenga mitandao, kutatua matatizo, kuwasiliana baina ya tamaduni, na msamiati wa uongozi.

Mfano wa mazungumzo halisi.

Habari za asubuhi. Asante kwa kujiunga na simu hii.
Habari za asubuhi, nina furaha kuwepo. Ninapiga simu kuhusu pendekezo ulilotuma.`,
      videoTopic: "Pitia mada zote za Kiwango cha 3 kupitia mazungumzo kamili ya kibiashara.",
      videoUrl: "https://www.youtube.com/watch?v=lIzE9GG4ueU",
      readingTitle: "Kukamilisha Mpango",
      reading: [
        "Baada ya kumaliza Viwango vya 1, 2, na 3, Chantal sasa anaweza kuongoza mikutano, kuandika ripoti za kitaalamu, na kujadiliana na wateja wa kimataifa kwa kujiamini.",
        "Anakumbuka alivyokuwa na shida na salamu rahisi alipoanza, na sasa anatoa mawasilisho kamili kwa Kiswahili.",
        "Chantal anasema kujizoeza mazungumzo halisi, si sheria za sarufi tu, ndiko kulikomfanya atofautiane zaidi.",
        "Sasa yuko tayari kutumia Kiswahili kwa kujiamini katika kazi yake katika Shirika la Brightened Mind.",
      ],
      readingSpeakText: `Kukamilisha mpango. Baada ya kumaliza Viwango vya 1, 2, na 3, Chantal sasa anaweza kuongoza mikutano, kuandika ripoti za kitaalamu, na kujadiliana na wateja wa kimataifa kwa kujiamini.`,
      exercises: ["Andika mazungumzo mafupi ya kitaalamu yakitumia angalau mada tatu za Kiwango cha 3.", "Jizoeze mazungumzo ya mfano kwa sauti na mwenzako.", "Andika aya fupi kuhusu safari yako ya kujifunza Kiswahili.", "Toa mawasilisho ya muhtasari wa dakika 1 kuhusu ulichojifunza katika viwango vyote vitatu."],
      speakingTopic: "Fanya simu kamili ya kitaalamu: salimia, jadili pendekezo, jadiliana, na malizia kwa heshima.",
    },
  ],

  quizzes: [
    {
      lessonId: 1,
      title: "Jaribio 1",
      subtitle: "Masharti kwa Biashara",
      passingScore: 7,
      questions: [
        { question: "Lipi ni sentensi ya sharti la kwanza?", options: ["Kama tukimaliza mapema, tutaituma leo", "Kama ningekuwa tajiri, ningesafiri", "Kama ilinyesha jana"], answer: "Kama tukimaliza mapema, tutaituma leo" },
        { question: "Lipi ni sentensi ya sharti la pili?", options: ["Kama ningekuwa na muda zaidi, ningepitia tena", "Kama ukipiga simu, nitajibu", "Kama tukishinda, tunasherehekea"], answer: "Kama ningekuwa na muda zaidi, ningepitia tena" },
        { question: "Kiambishi gani kinafuata 'kama' kwenye sharti la kwanza?", options: ["wakati uliopo", "wakati uliopita", "nge-"], answer: "wakati uliopo" },
        { question: "Kiambishi gani kinafuata 'kama' kwenye sharti la pili?", options: ["wakati uliopita", "wakati uliopo", "-ta-"], answer: "wakati uliopita" },
        { question: "Masharti ni ya kawaida katika shughuli gani ya kibiashara?", options: ["Majadiliano na mipango", "Kusafisha ofisi", "Mapumziko ya chakula cha mchana"], answer: "Majadiliano na mipango" },
        { question: "Msambazaji alitoa nini kwenye mazungumzo?", options: ["Punguzo kwa agizo kubwa zaidi", "Zawadi ya bure", "Hakuna chochote"], answer: "Punguzo kwa agizo kubwa zaidi" },
        { question: "Meneja alisema nini kuhusu bajeti?", options: ["Kama wangekuwa na bajeti kubwa zaidi, wangeagiza mara mbili", "Hawakuwa na bajeti kabisa", "Bajeti haikuwa na kikomo"], answer: "Kama wangekuwa na bajeti kubwa zaidi, wangeagiza mara mbili" },
        { question: "Nini kilitokea mwisho wa mkutano?", options: ["Walitia saini mkataba mpya", "Walighairi mpango", "Hakuna kilichoamuliwa"], answer: "Walitia saini mkataba mpya" },
        { question: "Chagua sentensi sahihi inayotumia 'ningekuwa'.", options: ["Kama ningekuwa meneja, ningebadilisha ratiba", "Kama ningekuwa meneja ningebadilisha ratiba kesho", "Ningekuwa meneja kama ratiba"], answer: "Kama ningekuwa meneja, ningebadilisha ratiba" },
        { question: "Kwa nini masharti ni muhimu kwa Kiswahili cha biashara?", options: ["Husaidia kujadili uwezekano na matokeo", "Hutumika tu kupika", "Hayana matumizi halisi"], answer: "Husaidia kujadili uwezekano na matokeo" },
      ],
    },
    {
      lessonId: 2,
      title: "Jaribio 2",
      subtitle: "Vitenzi Saidizi kwa Biashara",
      passingScore: 7,
      questions: [
        { question: "Neno gani linaonyesha wajibu mkubwa?", options: ["lazima", "huenda", "inafaa"], answer: "lazima" },
        { question: "Neno gani linatumika kutoa ushauri?", options: ["inafaa", "lazima", "nitafanya"], answer: "inafaa" },
        { question: "Neno gani linaonyesha uwezekano?", options: ["huenda", "lazima", "ulihitaji"], answer: "huenda" },
        { question: "Chagua sentensi sahihi.", options: ["Wafanyakazi wote lazima watume ripoti ifikapo Ijumaa", "Wafanyakazi huenda watume lazima", "Lazima huenda wafanyakazi watume"], answer: "Wafanyakazi wote lazima watume ripoti ifikapo Ijumaa" },
        { question: "Chagua sentensi ya ushauri.", options: ["Inafaa ukague tena namba", "Lazima ukague kamwe", "Huenda ukague kila wakati"], answer: "Inafaa ukague tena namba" },
        { question: "Meneja wa fedha alisema nini lazima lifanyike?", options: ["Kumaliza nyaraka za ukaguzi ifikapo Jumatatu", "Kufunga ofisi", "Kuanza likizo"], answer: "Kumaliza nyaraka za ukaguzi ifikapo Jumatatu" },
        { question: "Meneja alipendekeza nini kingine?", options: ["Kutayarisha muhtasari mfupi kwa mkurugenzi", "Kughairi ukaguzi", "Kuchelewesha kazi"], answer: "Kutayarisha muhtasari mfupi kwa mkurugenzi" },
        { question: "Je, mwisho wa muda ulibadilika?", options: ["Hapana, haikuwezekana", "Ndiyo, mara moja", "Mwisho wa muda haukutajwa"], answer: "Hapana, haikuwezekana" },
        { question: "Timu ilimaliza kazi lini?", options: ["Kwa wakati", "Kuchelewa sana", "Kamwe"], answer: "Kwa wakati" },
        { question: "Tofauti kati ya 'lazima' na 'inafaa' ni ipi?", options: ["'Lazima' ni wajibu mkubwa, 'inafaa' ni ushauri", "Zina maana sawa kabisa", "'Inafaa' ni wajibu mkubwa zaidi"], answer: "'Lazima' ni wajibu mkubwa, 'inafaa' ni ushauri" },
      ],
    },
    {
      lessonId: 3,
      title: "Jaribio 3",
      subtitle: "Lugha ya Majadiliano ya Biashara",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanaanzisha majadiliano?", options: ["Tungependa kujadili masharti ya mkataba", "Kwaheri milele", "Sitaki kuzungumza"], answer: "Tungependa kujadili masharti ya mkataba" },
        { question: "Maneno gani yanatoa ofa?", options: ["Tunaweza kukupa punguzo la asilimia 10", "Tunakataa kabisa", "Hakuna makubaliano"], answer: "Tunaweza kukupa punguzo la asilimia 10" },
        { question: "Maneno gani yanaonyesha kukubaliana kati?", options: ["Tunaweza kukutana katikati", "Hatutakubaliana kamwe", "Chukua au achana nayo"], answer: "Tunaweza kukutana katikati" },
        { question: "Maneno gani yanamalizia mkataba?", options: ["Tuandike hili kwa maandishi", "Tusahau hili lililotokea", "Sikubaliani kabisa"], answer: "Tuandike hili kwa maandishi" },
        { question: "Makampuni mawili yalijadiliana kwa muda gani?", options: ["Karibu saa mbili", "Dakika tano", "Wiki nzima"], answer: "Karibu saa mbili" },
        { question: "Mnunuzi alifikiriaje kuhusu bei mwanzoni?", options: ["Ilikuwa juu mno", "Ilikuwa chini mno", "Ilikuwa nzuri kabisa"], answer: "Ilikuwa juu mno" },
        { question: "Muuzaji alitoa punguzo gani?", options: ["Asilimia 10 kwa agizo kubwa zaidi", "Asilimia 50 kwa kila mtu", "Hakuna punguzo"], answer: "Asilimia 10 kwa agizo kubwa zaidi" },
        { question: "Mnunuzi aliomba nini kingine?", options: ["Usafirishaji bure", "Nembo mpya", "Mkutano mrefu zaidi"], answer: "Usafirishaji bure" },
        { question: "Majadiliano yalimalizikaje?", options: ["Pande zote zilipeana mikono na kukubaliana", "Mkataba ulisambaratika", "Hawakuzungumza tena"], answer: "Pande zote zilipeana mikono na kukubaliana" },
        { question: "Maneno gani walitumia mwishoni?", options: ["Tunatarajia kufanya kazi nawe", "Hatutaki kukutana tena", "Hii ilikuwa upotevu wa muda"], answer: "Tunatarajia kufanya kazi nawe" },
      ],
    },
    {
      lessonId: 4,
      title: "Jaribio 4",
      subtitle: "Ujuzi wa Mawasilisho",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanaanzisha mawasilisho?", options: ["Habari za asubuhi kwa wote, asante kwa kuwepo", "Kwaheri kwa wote", "Sina la kusema"], answer: "Habari za asubuhi kwa wote, asante kwa kuwepo" },
        { question: "Maneno gani yanaendelea hadi hoja mpya?", options: ["Twendeni slaidi inayofuata", "Mwisho", "Hakuna jambo"], answer: "Twendeni slaidi inayofuata" },
        { question: "Maneno gani yanamalizia mawasilisho?", options: ["Kwa muhtasari, mambo makuu ni...", "Nilisahau nitakalosema", "Twende tena mwanzo"], answer: "Kwa muhtasari, mambo makuu ni..." },
        { question: "Maneno gani yanaalika maswali?", options: ["Kuna maswali yoyote?", "Hakuna maswali yanaruhusiwa", "Hiyo ndiyo yote, kwaheri"], answer: "Kuna maswali yoyote?" },
        { question: "Nani alikuwa na wasiwasi kabla ya mawasilisho yake ya kwanza?", options: ["Linda", "Sara", "Clara"], answer: "Linda" },
        { question: "Linda alipanga hotuba yake vipi?", options: ["Tatizo, kisha suluhisho, kisha matokeo", "Bila mpangilio", "Vicheshi tu"], answer: "Tatizo, kisha suluhisho, kisha matokeo" },
        { question: "Mambo makuu Linda aliyomfupisha yalikuwa yapi?", options: ["Kupunguza gharama na kuharakisha utoaji", "Mapambo ya ofisi", "Menyu ya chakula cha mchana"], answer: "Kupunguza gharama na kuharakisha utoaji" },
        { question: "Timu ilijisikiaje kuhusu mawasilisho ya Linda?", options: ["Walivutiwa na jinsi yalivyokuwa wazi", "Walichanganyikiwa", "Waliondoka chumbani"], answer: "Walivutiwa na jinsi yalivyokuwa wazi" },
        { question: "Mawasilisho yanapaswa kuwa na nini mwanzoni?", options: ["Wazo wazi la kile kitakachojadiliwa", "Hakuna kitu, anza ovyo ovyo", "Hitimisho tu"], answer: "Wazo wazi la kile kitakachojadiliwa" },
        { question: "Maneno gani yanasaidia kueleza chati?", options: ["Kama mnavyoona kwenye chati hii...", "Sielewi chati hii", "Chati hazina maana"], answer: "Kama mnavyoona kwenye chati hii..." },
      ],
    },
    {
      lessonId: 5,
      title: "Jaribio 5",
      subtitle: "Mikutano Rasmi na Kumbukumbu",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanaanzisha mkutano?", options: ["Tuanze?", "Mkutano umefutwa", "Kwaheri"], answer: "Tuanze?" },
        { question: "Maneno gani yanakatiza kwa heshima?", options: ["Samahani kukatiza, lakini...", "Nyamaza", "Acha kuzungumza sasa"], answer: "Samahani kukatiza, lakini..." },
        { question: "Maneno gani yanaomba kuongeza jambo?", options: ["Kama naweza kuongeza...", "Ninakataa kuzungumza", "Hii ni upuuzi"], answer: "Kama naweza kuongeza..." },
        { question: "Kumbukumbu za mkutano zinaandika nini?", options: ["Yaliyojadiliwa na kuamuliwa", "Vicheshi tu vilivyosemwa", "Hakuna chochote muhimu"], answer: "Yaliyojadiliwa na kuamuliwa" },
        { question: "'Hatua za kuchukua' ni nini?", options: ["Kazi zilizogawiwa, pamoja na mwenye jukumu na mwisho wa muda", "Vitafunwa vilivyohudumiwa mkutanoni", "Jina la mkutano"], answer: "Kazi zilizogawiwa, pamoja na mwenye jukumu na mwisho wa muda" },
        { question: "Mkutano wa Jumatatu ulianza saa ngapi?", options: ["Saa tatu asubuhi", "Adhuhuri", "Saa sita jioni"], answer: "Saa tatu asubuhi" },
        { question: "Peter alipendekeza nini kupitiwa?", options: ["Bajeti", "Menyu", "Nembo"], answer: "Bajeti" },
        { question: "Nani aliandika kumbukumbu?", options: ["Katibu", "Peter", "Hakuna aliyeandika"], answer: "Katibu" },
        { question: "Kumbukumbu zilijumuisha nini?", options: ["Waliohudhuria, ajenda, na hatua za kuchukua", "Tarehe tu", "Vicheshi tu"], answer: "Waliohudhuria, ajenda, na hatua za kuchukua" },
        { question: "Timu ilipokeaje kumbukumbu?", options: ["Kwa barua pepe siku hiyo hiyo", "Hawakuzipokea kamwe", "Kwa posta mwezi mmoja baadaye"], answer: "Kwa barua pepe siku hiyo hiyo" },
      ],
    },
    {
      lessonId: 6,
      title: "Jaribio 6",
      subtitle: "Uandishi wa Kibiashara: Ripoti na Mapendekezo",
      passingScore: 7,
      questions: [
        { question: "Sehemu ya kwanza ya ripoti ni ipi?", options: ["Utangulizi", "Mapendekezo", "Matokeo"], answer: "Utangulizi" },
        { question: "Sehemu gani inatoa ukweli na takwimu?", options: ["Matokeo", "Utangulizi", "Hitimisho"], answer: "Matokeo" },
        { question: "Sehemu gani inapendekeza hatua zijazo?", options: ["Mapendekezo", "Matokeo", "Utangulizi"], answer: "Mapendekezo" },
        { question: "Maneno gani yanaanzisha lengo la ripoti?", options: ["Lengo la ripoti hii ni...", "Hapo zamani za kale...", "Mwisho."], answer: "Lengo la ripoti hii ni..." },
        { question: "Maneno gani yanatoa takwimu?", options: ["Takwimu zinaonyesha kuwa...", "Nadhani labda...", "Nani anajua..."], answer: "Takwimu zinaonyesha kuwa..." },
        { question: "Ripoti ilihusu nini?", options: ["Kuridhika kwa wateja", "Likizo za wafanyakazi", "Samani za ofisi"], answer: "Kuridhika kwa wateja" },
        { question: "Ni asilimia ngapi ya wateja walioridhika?", options: ["85%", "15%", "50%"], answer: "85%" },
        { question: "Baadhi ya wateja walitaja nini?", options: ["Muda wa kujibu ungeweza kuwa haraka zaidi", "Bei zilikuwa chini mno", "Hakuna chochote"], answer: "Muda wa kujibu ungeweza kuwa haraka zaidi" },
        { question: "Ripoti ilipendekeza nini?", options: ["Kuajiri wafanyakazi wawili zaidi wa huduma kwa wateja", "Kufunga kampuni", "Kupunguza wafanyakazi"], answer: "Kuajiri wafanyakazi wawili zaidi wa huduma kwa wateja" },
        { question: "Hitimisho la ripoti lilikuwa lipi?", options: ["Kuridhika kunaboreka lakini mabadiliko madogo yanaweza kusaidia", "Kila kitu kilikuwa kamili", "Kila kitu kilikuwa kibaya"], answer: "Kuridhika kunaboreka lakini mabadiliko madogo yanaweza kusaidia" },
      ],
    },
    {
      lessonId: 7,
      title: "Jaribio 7",
      subtitle: "Kiswahili cha Simu na Mikutano ya Video",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanaanzisha simu ya kitaalamu?", options: ["Habari, huyu ni... kutoka...", "Nani wewe?", "Hutaki nini?"], answer: "Habari, huyu ni... kutoka..." },
        { question: "Maneno gani yanaomba mtu arudie?", options: ["Unaweza kurudia hilo, tafadhali?", "Sijali ulichosema", "Nyamaza"], answer: "Unaweza kurudia hilo, tafadhali?" },
        { question: "Maneno gani yanamalizia simu kwa heshima?", options: ["Asante kwa muda wako", "Ninakata simu sasa", "Vyovyote vile"], answer: "Asante kwa muda wako" },
        { question: "Maneno gani yanakagua mtandao?", options: ["Unanisikia vizuri?", "Sijali kama unanisikia", "Simu hii ni ya kuchosha"], answer: "Unanisikia vizuri?" },
        { question: "Nani alimpigia simu mteja?", options: ["Sara", "Linda", "Clara"], answer: "Sara" },
        { question: "Simu ilihusu nini?", options: ["Agizo la hivi karibuni la mteja", "Mahojiano ya kazi", "Malalamiko ya kelele"], answer: "Agizo la hivi karibuni la mteja" },
        { question: "Tatizo gani lilitokea wakati wa simu?", options: ["Mtandao haukuwa wazi sana", "Simu ilikatika", "Hakuna aliyejibu"], answer: "Mtandao haukuwa wazi sana" },
        { question: "Sara alisema atafanya nini baada ya simu?", options: ["Kutuma barua pepe kuthibitisha", "Kupiga simu tena baada ya dakika 5", "Hakuna kitu"], answer: "Kutuma barua pepe kuthibitisha" },
        { question: "Simu ilimalizikaje?", options: ["Kwa heshima, na shukrani kutoka pande zote", "Mteja alikata simu kwa hasira", "Haikutatuliwa kamwe"], answer: "Kwa heshima, na shukrani kutoka pande zote" },
        { question: "Maneno gani yanafaa ukikosa kuelewa jambo?", options: ["Samahani, mtandao hauko wazi sana", "Nimeelewa kila kitu vizuri", "Tafadhali acha kupiga simu"], answer: "Samahani, mtandao hauko wazi sana" },
      ],
    },
    {
      lessonId: 8,
      title: "Jaribio 8",
      subtitle: "Mitandao na Mazungumzo ya Kawaida",
      passingScore: 7,
      questions: [
        { question: "Lipi ni swali zuri la mazungumzo ya kawaida?", options: ["Unafanya kazi gani?", "Unapata pesa ngapi?", "Kwa nini uko hapa?"], answer: "Unafanya kazi gani?" },
        { question: "Maneno gani yanaomba mawasiliano?", options: ["Naweza kupata kadi yako ya biashara?", "Nipe simu yako sasa", "Sihitaji mawasiliano yako"], answer: "Naweza kupata kadi yako ya biashara?" },
        { question: "Mada gani kwa ujumla ni salama kwa mazungumzo ya kawaida?", options: ["Mwelekeo wa sekta", "Mshahara", "Matatizo binafsi"], answer: "Mwelekeo wa sekta" },
        { question: "Mada gani kwa kawaida inapaswa kuepukwa?", options: ["Siasa", "Tukio lenyewe", "Safari"], answer: "Siasa" },
        { question: "Michael alikutana na mtu mpya wapi?", options: ["Mkutanoni", "Uwanja wa michezo", "Mkahawani"], answer: "Mkutanoni" },
        { question: "Swali gani Michael aliuliza?", options: ["Unafanya kazi gani?", "Una miaka mingapi?", "Unaishi wapi?"], answer: "Unafanya kazi gani?" },
        { question: "Waligundua walikuwa na nini sawa?", options: ["Walifanya kazi katika sekta zinazofanana", "Walikuwa majirani", "Walisoma pamoja"], answer: "Walifanya kazi katika sekta zinazofanana" },
        { question: "Walizungumza kuhusu nini kwa dakika kumi?", options: ["Mwelekeo wa sekta na safari", "Hali ya hewa pekee", "Hakuna kitu"], answer: "Mwelekeo wa sekta na safari" },
        { question: "Michael aliomba nini kabla ya kuondoka?", options: ["Kadi ya biashara", "Pesa", "Zawadi"], answer: "Kadi ya biashara" },
        { question: "Jukwaa gani Michael alipendekeza kuunganishwa?", options: ["LinkedIn", "Jukwaa lolote la nasibu", "Hakuna jukwaa"], answer: "LinkedIn" },
      ],
    },
    {
      lessonId: 9,
      title: "Jaribio 9",
      subtitle: "Utatuzi wa Matatizo na Kufanya Maamuzi",
      passingScore: 7,
      questions: [
        { question: "Maneno gani yanatambua tatizo?", options: ["Tumekumbana na tatizo na...", "Kila kitu ni kamili", "Hakuna matatizo hapa"], answer: "Tumekumbana na tatizo na..." },
        { question: "Maneno gani yanapendekeza suluhisho?", options: ["Vipi kama tuka...?", "Nakataa kufikiri", "Hakuna kinachoweza kufanywa"], answer: "Vipi kama tuka...?" },
        { question: "Maneno gani yanafanya uamuzi wa mwisho?", options: ["Twende na chaguo hili", "Labda siku nyingine", "Siwezi kuamua kamwe"], answer: "Twende na chaguo hili" },
        { question: "Timu ya usafirishaji ilikumbana na tatizo gani?", options: ["Hitilafu ya injini ya lori", "Mfanyakazi aliyekosekana", "Ofisi iliyofungwa"], answer: "Hitilafu ya injini ya lori" },
        { question: "Mfanyakazi mmoja alipendekeza suluhisho gani?", options: ["Kuajiri lori kwa usafirishaji wa leo", "Kughairi usafirishaji wote", "Kusubiri mwezi mmoja"], answer: "Kuajiri lori kwa usafirishaji wa leo" },
        { question: "Meneja aliamua nini?", options: ["Kuajiri lori mara moja", "Kutofanya chochote", "Kumfukuza timu"], answer: "Kuajiri lori mara moja" },
        { question: "Je, usafirishaji ulikamilika kwa wakati?", options: ["Ndiyo, kutokana na uamuzi wa haraka", "Hapana, vyote viliwa chelewa", "Maandiko hayasemi"], answer: "Ndiyo, kutokana na uamuzi wa haraka" },
        { question: "Maneno gani yanaonyesha kitu kilisababisha ucheleweshaji?", options: ["Hili limesababisha ucheleweshaji kwenye...", "Kila kitu kiko kwa wakati", "Hakuna ucheleweshaji wowote"], answer: "Hili limesababisha ucheleweshaji kwenye..." },
        { question: "Maneno gani yanatoa chaguo?", options: ["Chaguo moja lingekuwa...", "Hakuna chaguo lolote", "Acha kupendekeza"], answer: "Chaguo moja lingekuwa..." },
        { question: "Kwa nini lugha hii ni muhimu kazini?", options: ["Husaidia kutambua matatizo na kukubaliana kwa haraka kuhusu suluhisho", "Inatumika tu mikahawani", "Haina matumizi halisi"], answer: "Husaidia kutambua matatizo na kukubaliana kwa haraka kuhusu suluhisho" },
      ],
    },
    {
      lessonId: 10,
      title: "Jaribio 10",
      subtitle: "Mawasiliano Baina ya Tamaduni",
      passingScore: 7,
      questions: [
        { question: "Kwa nini ufahamu wa tamaduni ni muhimu kazini?", options: ["Husaidia kuepuka kutoelewana", "Hauna matumizi halisi", "Unahusu likizo tu"], answer: "Husaidia kuepuka kutoelewana" },
        { question: "Maneno gani yanasaidia kuelewa mtindo wa tamaduni nyingine?", options: ["Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?", "Njia yako si sahihi", "Sijali utamaduni wako"], answer: "Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?" },
        { question: "Maneno gani yanahakiki uelewa kwa heshima?", options: ["Nataka kuhakikisha nimekuelewa vizuri", "Husemi maana", "Sahau hilo"], answer: "Nataka kuhakikisha nimekuelewa vizuri" },
        { question: "Kidokezo kimoja cha mawasiliano wazi ni kipi?", options: ["Epuka misemo ngumu", "Zungumza haraka iwezekanavyo", "Tumia lugha ngumu tu"], answer: "Epuka misemo ngumu" },
        { question: "Tofauti gani timu iligundua?", options: ["Tofauti za uwazi na kasi ya mikutano", "Hakuna tofauti kabisa", "Tofauti za chakula tu"], answer: "Tofauti za uwazi na kasi ya mikutano" },
        { question: "Kiongozi wa timu mara nyingi aliuliza nini?", options: ["Jinsi mambo yanavyofanyika katika nchi ya mfanyakazi mwenzake", "Hakuwahi kuuliza maswali", "Kuhusu hali ya hewa tu"], answer: "Jinsi mambo yanavyofanyika katika nchi ya mfanyakazi mwenzake" },
        { question: "Tabia hii ilisaidia timu kufanya nini?", options: ["Kuwasiliana kwa heshima na ufanisi zaidi", "Kuepuka kuwasiliana kabisa", "Kupuuza tofauti za kitamaduni"], answer: "Kuwasiliana kwa heshima na ufanisi zaidi" },
        { question: "Unapaswa kuwa vipi unapowasiliana baina ya tamaduni?", options: ["Mwenye subira na heshima", "Mwenye haraka na mkali", "Kimya kabisa"], answer: "Mwenye subira na heshima" },
        { question: "Nini kinasaidia kuhakiki uelewa kwenye mazungumzo?", options: ["Maswali rahisi ya ziada", "Kupuuza mzungumzaji", "Kubadilisha mada mara moja"], answer: "Maswali rahisi ya ziada" },
        { question: "Tamaduni tofauti zinaweza kuwa na kanuni tofauti kuhusu nini?", options: ["Muda, urasmi, na uwazi", "Mavazi pekee", "Hakuna kitu muhimu"], answer: "Muda, urasmi, na uwazi" },
      ],
    },
    {
      lessonId: 11,
      title: "Jaribio 11",
      subtitle: "Msamiati wa Uongozi na Usimamizi",
      passingScore: 7,
      questions: [
        { question: "'Kugawa' linamaanisha nini?", options: ["Kumpa mtu mwingine kazi", "Kupuuza kazi", "Kughairi mkutano"], answer: "Kumpa mtu mwingine kazi" },
        { question: "'Kuhamasisha' linamaanisha nini?", options: ["Kumtia mtu moyo kufanya kazi vizuri", "Kumkatisha tamaa mtu", "Kumfukuza mtu"], answer: "Kumtia mtu moyo kufanya kazi vizuri" },
        { question: "'Maoni' linamaanisha nini?", options: ["Maneno kuhusu utendaji wa mtu", "Aina ya chumba cha mikutano", "Likizo ya kampuni"], answer: "Maneno kuhusu utendaji wa mtu" },
        { question: "'Uwajibikaji' linamaanisha nini?", options: ["Kuwa na jukumu la matendo na matokeo yako", "Kuepuka jukumu", "Kufanya kazi peke yako daima"], answer: "Kuwa na jukumu la matendo na matokeo yako" },
        { question: "Joseph alijifunza kufanya nini kama kiongozi wa timu?", options: ["Kugawa kazi badala ya kufanya kila kitu peke yake", "Kufanya kila kazi peke yake", "Kuepuka kutoa maoni"], answer: "Kugawa kazi badala ya kufanya kila kitu peke yake" },
        { question: "Joseph alitoa aina gani ya maoni?", options: ["Wazi na ya kujenga", "Ya ukali tu", "Hakuwahi kutoa maoni"], answer: "Wazi na ya kujenga" },
        { question: "Kwa nini timu ilihamasika zaidi?", options: ["Walijisikia kuaminiwa na kuwajibika", "Walipewa likizo zaidi", "Walipunguziwa kazi"], answer: "Walijisikia kuaminiwa na kuwajibika" },
        { question: "Nini kilitokea kwa utendaji wa timu?", options: ["Uliboreka kwa kiasi kikubwa", "Ulizorota", "Ulibaki sawa kabisa"], answer: "Uliboreka kwa kiasi kikubwa" },
        { question: "Maneno gani yanatoa maoni chanya?", options: ["Ninathamini sana juhudi ulizoweka kwenye hili", "Haufanyi kazi vizuri kamwe", "Sijali kazi yako"], answer: "Ninathamini sana juhudi ulizoweka kwenye hili" },
        { question: "Maneno gani yanahusu uwajibikaji?", options: ["Sote tunahitaji kuwajibika kwa mwisho wa muda wetu", "Mwisho wa muda hauhusu mtu yeyote", "Ni wewe pekee mwenye jukumu"], answer: "Sote tunahitaji kuwajibika kwa mwisho wa muda wetu" },
      ],
    },
    {
      lessonId: 12,
      title: "Jaribio 12",
      subtitle: "Mapitio ya Mwisho na Mazungumzo Halisi ya Kibiashara",
      passingScore: 7,
      questions: [
        { question: "Somo la 1 lilihusu sarufi ipi?", options: ["Masharti", "Rangi", "Namba"], answer: "Masharti" },
        { question: "Somo la 3 lilihusu nini?", options: ["Lugha ya majadiliano ya biashara", "Msamiati wa upishi", "Michezo"], answer: "Lugha ya majadiliano ya biashara" },
        { question: "Ujuzi gani Somo la 4 lililenga?", options: ["Ujuzi wa mawasilisho", "Kilimo", "Kuendesha gari"], answer: "Ujuzi wa mawasilisho" },
        { question: "Chantal alikuwa na shida na nini alipoanza?", options: ["Salamu rahisi", "Mahesabu magumu", "Kuandika nyimbo"], answer: "Salamu rahisi" },
        { question: "Chantal anaweza kufanya nini sasa?", options: ["Kuongoza mikutano, kuandika ripoti, na kujadiliana na wateja wa kimataifa", "Hakuna kitu kipya", "Kusema salamu tu"], answer: "Kuongoza mikutano, kuandika ripoti, na kujadiliana na wateja wa kimataifa" },
        { question: "Nini kilimfanya Chantal atofautiane zaidi kwa mujibu wa maandiko?", options: ["Kujizoeza mazungumzo halisi", "Kusoma vitabu vya sarufi pekee", "Kuepuka kuzungumza Kiswahili kazini"], answer: "Kujizoeza mazungumzo halisi" },
        { question: "Katika simu ya mfano, mzungumzaji B aliomba nini?", options: ["Kuongeza mwisho wa muda wa utoaji kwa wiki moja", "Punguzo la asilimia 50", "Kughairi mkataba"], answer: "Kuongeza mwisho wa muda wa utoaji kwa wiki moja" },
        { question: "Mzungumzaji A alijibuje ombi hilo?", options: ["Alikubali kukagua na timu yake na kujibu leo", "Alikataa mara moja", "Alikata simu"], answer: "Alikubali kukagua na timu yake na kujibu leo" },
        { question: "Simu ya mfano ilimalizikaje?", options: ["Kwa heshima, wakitarajia kufanya kazi pamoja", "Kwa ugomvi", "Bila azimio lolote"], answer: "Kwa heshima, wakitarajia kufanya kazi pamoja" },
        { question: "Chantal yuko tayari kufanya nini sasa?", options: ["Kutumia Kiswahili kwa kujiamini kazini", "Kuacha kazi yake", "Kuepuka Kiswahili cha biashara"], answer: "Kutumia Kiswahili kwa kujiamini kazini" },
      ],
    },
  ],

  finalQuiz: {
    title: "Jaribio la Mwisho - Kiwango cha 3",
    subtitle: "Jaribio hili linahusisha masomo yote ya Kiwango cha 3.",
    passingScore: 15,
    questions: [
      { question: "Lipi ni sentensi ya sharti la kwanza?", options: ["Kama tukimaliza mapema, tutaituma leo", "Kama ningekuwa na mbawa, ningeruka", "Kama ilinyesha"], answer: "Kama tukimaliza mapema, tutaituma leo" },
      { question: "Neno gani linaonyesha wajibu mkubwa?", options: ["lazima", "huenda", "inaweza"], answer: "lazima" },
      { question: "Maneno gani yanatoa ofa ya majadiliano?", options: ["Tunaweza kukupa punguzo", "Tunakataa kuzungumza", "Hakuna ofa"], answer: "Tunaweza kukupa punguzo" },
      { question: "Maneno gani yanaanzisha mawasilisho?", options: ["Habari za asubuhi kwa wote, asante kwa kuwepo", "Kwaheri", "Sina la kusema"], answer: "Habari za asubuhi kwa wote, asante kwa kuwepo" },
      { question: "Maneno gani yanaanzisha mkutano?", options: ["Tuanze?", "Mkutano umefutwa", "Hakuna maoni"], answer: "Tuanze?" },
      { question: "Sehemu ya kwanza ya ripoti ya biashara ni ipi?", options: ["Utangulizi", "Mapendekezo", "Hitimisho"], answer: "Utangulizi" },
      { question: "Maneno gani yanaanzisha simu ya kitaalamu?", options: ["Habari, huyu ni... kutoka...", "Nani wewe", "Hutaki nini"], answer: "Habari, huyu ni... kutoka..." },
      { question: "Mada gani ni salama kwa mazungumzo ya kawaida?", options: ["Mwelekeo wa sekta", "Mshahara", "Siasa"], answer: "Mwelekeo wa sekta" },
      { question: "Maneno gani yanatambua tatizo?", options: ["Tumekumbana na tatizo na...", "Kila kitu ni kamili", "Hakuna matatizo"], answer: "Tumekumbana na tatizo na..." },
      { question: "Maneno gani yanasaidia mawasiliano baina ya tamaduni?", options: ["Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?", "Njia yako si sahihi", "Sijali utamaduni wako"], answer: "Unaweza kunisaidia kuelewa jinsi hili linavyofanyika nchini kwako?" },
      { question: "'Kugawa' linamaanisha nini?", options: ["Kumpa mtu mwingine kazi", "Kupuuza kazi", "Kughairi mkutano"], answer: "Kumpa mtu mwingine kazi" },
      { question: "Msambazaji alitoa nini kwenye Somo la 1?", options: ["Punguzo kwa agizo kubwa zaidi", "Zawadi ya bure", "Hakuna chochote"], answer: "Punguzo kwa agizo kubwa zaidi" },
      { question: "Linda alipanga hotuba yake vipi?", options: ["Tatizo, kisha suluhisho, kisha matokeo", "Bila mpangilio", "Vicheshi tu"], answer: "Tatizo, kisha suluhisho, kisha matokeo" },
      { question: "Kumbukumbu za mkutano zinajumuisha nini?", options: ["Waliohudhuria, ajenda, na hatua za kuchukua", "Tarehe tu", "Vicheshi tu"], answer: "Waliohudhuria, ajenda, na hatua za kuchukua" },
      { question: "Ripoti ya wateja ilionyesha asilimia ngapi ya kuridhika?", options: ["85%", "15%", "50%"], answer: "85%" },
      { question: "Sara alisema atafanya nini baada ya simu na mteja?", options: ["Kutuma barua pepe kuthibitisha", "Kupiga simu tena mara moja", "Hakuna kitu"], answer: "Kutuma barua pepe kuthibitisha" },
      { question: "Michael aliomba nini kwa mtu mpya aliyekutana naye?", options: ["Kadi ya biashara", "Pesa", "Zawadi"], answer: "Kadi ya biashara" },
      { question: "Timu ya usafirishaji ilichagua suluhisho gani?", options: ["Kuajiri lori mara moja", "Kusubiri mwezi mmoja", "Kughairi usafirishaji"], answer: "Kuajiri lori mara moja" },
      { question: "Nini kilisaidia timu ya Joseph kuhamasika zaidi?", options: ["Kujisikia kuaminiwa na kuwajibika", "Kupewa likizo zaidi", "Kupunguziwa kazi"], answer: "Kujisikia kuaminiwa na kuwajibika" },
      { question: "Nini kilimfanya Chantal atofautiane zaidi kwa mujibu wa maandiko ya mwisho?", options: ["Kujizoeza mazungumzo halisi", "Kusoma vitabu vya sarufi pekee", "Kuepuka Kiswahili kazini"], answer: "Kujizoeza mazungumzo halisi" },
    ],
  },
};
