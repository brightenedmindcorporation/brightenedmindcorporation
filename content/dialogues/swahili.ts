import type { RawDialogue } from "./types";

// Mazungumzo ya majaribio (Kiswahili). Mistari inabadilishana A, B, A, B…
// Kila swali: [swali, jibu sahihi, si sahihi, si sahihi].
// Saa zinafuata mfumo wa Kiswahili (saa moja asubuhi = saa 7 kamili).
const data: Record<string, RawDialogue> = {
  // ---------------- Kiwango cha 1 ----------------
  "1-1": {
    lines: [
      "Habari za asubuhi! Jina langu ni Tom. Wewe unaitwa nani?",
      "Nzuri, Tom. Mimi ni Ana. Nimefurahi kukutana nawe.",
      "Nami nimefurahi. Wewe ni mwanafunzi?",
      "Ndiyo, mimi ni mwanafunzi. Ninaishi Kolwezi. Na wewe?",
      "Mimi ni mwalimu. Ninaishi Lubumbashi.",
      "Vizuri sana! Tuonane kesho, Ana.",
    ],
    q: [
      ["Mtu B anaitwa nani?", "Ana", "Tom", "Emma"],
      ["Kazi ya Ana ni ipi?", "Ni mwanafunzi", "Ni mwalimu", "Ni daktari"],
      ["Tom anaishi wapi?", "Lubumbashi", "Kolwezi", "Kinshasa"],
    ],
  },
  "1-2": {
    lines: [
      "Hujambo. Unaweza kutamka herufi za jina lako, tafadhali?",
      "Ndiyo. Ni S, A, R, A, H. Sarah.",
      "Asante. Na jina la ukoo?",
      "Ni B, R, O, W, N. Brown.",
      "Vizuri. Sarah Brown. Sasa, anwani yako ya barua pepe ni ipi?",
      "Ni sarah nukta brown at mail nukta com.",
    ],
    q: [
      ["Sarah anatamka vipi herufi za jina lake?", "S-A-R-A-H", "S-A-R-R-A", "Z-A-R-A-H"],
      ["Jina la ukoo la Sarah ni lipi?", "Brown", "Black", "Green"],
      ["Mwishoni mtu A anaomba nini?", "Barua pepe yake", "Namba yake ya simu", "Umri wake"],
    ],
  },
  "1-3": {
    lines: [
      "Habari! Una miaka mingapi?",
      "Nina miaka kumi na minne. Na wewe?",
      "Mimi nina miaka kumi na mitano. Namba yako ya simu ni ipi?",
      "Ni sifuri nane moja, mbili tatu nne, tano sita saba.",
      "Asante. Nitakupigia simu Jumamosi.",
      "Sawa! Nipigie asubuhi.",
    ],
    q: [
      ["Mtu B ana miaka mingapi?", "Kumi na minne", "Kumi na mitano", "Kumi na sita"],
      ["Mtu A ana miaka mingapi?", "Kumi na mitano", "Kumi na minne", "Kumi na mitatu"],
      ["Mtu A atapiga simu lini?", "Jumamosi", "Jumatatu", "Jumapili"],
    ],
  },
  "1-4": {
    lines: [
      "Mwanaume aliye kwenye picha hii ni nani?",
      "Ni baba yangu. Anaitwa Daudi.",
      "Na mwanamke aliye karibu naye?",
      "Ni mama yangu. Pia nina dada wawili na kaka mmoja.",
      "Kaka yako ana miaka mingapi?",
      "Ana miaka kumi. Dada zangu wana miaka kumi na mbili na kumi na saba.",
    ],
    q: [
      ["Daudi ni nani?", "Baba wa anayezungumza", "Kaka wa anayezungumza", "Mjomba wa anayezungumza"],
      ["Anayezungumza ana dada wangapi?", "Wawili", "Mmoja", "Watatu"],
      ["Kaka ana miaka mingapi?", "Kumi", "Kumi na mbili", "Kumi na saba"],
    ],
  },
  "1-5": {
    lines: [
      "Samahani, begi langu liko wapi?",
      "Liko juu ya meza, karibu na simu.",
      "Asante. Na funguo zangu?",
      "Funguo zako ziko kwenye sanduku la buluu, chini ya kiti.",
      "Ah ndiyo, ninaziona. Na daftari langu?",
      "Liko kitandani. Wewe huliacha kila mara!",
    ],
    q: [
      ["Begi liko wapi?", "Juu ya meza", "Chini ya kiti", "Kitandani"],
      ["Funguo ziko wapi?", "Kwenye sanduku la buluu", "Juu ya meza", "Ndani ya begi"],
      ["Daftari liko wapi?", "Kitandani", "Juu ya meza", "Chini ya kiti"],
    ],
  },
  "1-6": {
    lines: [
      "Hujambo! Ninataka kununua koti.",
      "Sawa. Unapenda rangi gani?",
      "Ninapenda kijani. Lakini si kijani kilichokolea, ni kijani hafifu.",
      "Tuna koti hili la kijani hafifu. Ni kubwa na laini sana.",
      "Ni zuri. Mnalo pia la rangi nyeusi?",
      "Ndiyo. Jeusi ni la bei nafuu zaidi.",
    ],
    q: [
      ["Mteja anataka kununua nini?", "Koti", "Begi", "Viatu"],
      ["Anapendelea rangi gani kwanza?", "Kijani hafifu", "Kijani kilichokolea", "Nyekundu"],
      ["Koti lipi ni la bei nafuu zaidi?", "Jeusi", "La kijani", "La buluu"],
    ],
  },
  "1-7": {
    lines: [
      "Siku yako ya kuzaliwa ni lini?",
      "Ni tarehe kumi na mbili Machi. Na yako?",
      "Yangu ni tarehe tatu Julai.",
      "Tarehe kumi na mbili Machi ni siku gani mwaka huu?",
      "Ni Ijumaa. Tunaweza kufanya sherehe!",
      "Wazo zuri! Nitawaalika marafiki zetu wote.",
    ],
    q: [
      ["Siku ya kuzaliwa ya mtu B ni lini?", "Tarehe kumi na mbili Machi", "Tarehe tatu Julai", "Tarehe kumi na mbili Mei"],
      ["Siku ya kuzaliwa ya mtu A ni lini?", "Tarehe tatu Julai", "Tarehe kumi na mbili Machi", "Tarehe tatu Juni"],
      ["Sherehe ni siku gani?", "Ijumaa", "Jumamosi", "Jumapili"],
    ],
  },
  "1-8": {
    lines: [
      "Unaamka saa ngapi kila siku?",
      "Ninaamka saa kumi na mbili asubuhi. Kisha ninaoga na kunywa chai.",
      "Unakwenda shuleni saa ngapi?",
      "Ninaondoka nyumbani saa moja asubuhi na darasa linaanza saa mbili.",
      "Na jioni?",
      "Ninafanya kazi za nyumbani, ninakula chakula cha jioni na kulala saa tatu usiku.",
    ],
    q: [
      ["Mtu huyu anaamka saa ngapi?", "Saa kumi na mbili asubuhi", "Saa moja asubuhi", "Saa mbili asubuhi"],
      ["Darasa linaanza saa ngapi?", "Saa mbili asubuhi", "Saa moja asubuhi", "Saa tatu asubuhi"],
      ["Anafanya nini kabla ya kulala?", "Kazi za nyumbani na chakula cha jioni", "Kutazama televisheni", "Kucheza mpira"],
    ],
  },
  "1-9": {
    lines: [
      "Habari za mchana. Ungependa kula nini?",
      "Ningependa wali na kuku, tafadhali.",
      "Na kinywaji?",
      "Glasi ya maji. Na rafiki yangu anataka juisi ya chungwa.",
      "Kitindamlo chochote?",
      "Ndiyo, ndizi moja kwangu, tafadhali. Ni hayo tu.",
    ],
    q: [
      ["Mteja anaagiza nini cha kula?", "Wali na kuku", "Samaki na mkate", "Supu"],
      ["Rafiki anakunywa nini?", "Juisi ya chungwa", "Maji", "Maziwa"],
      ["Kitindamlo ni nini?", "Ndizi", "Keki", "Aiskrimu"],
    ],
  },
  "1-10": {
    lines: [
      "Samahani, benki iko wapi, tafadhali?",
      "Nenda moja kwa moja, kisha ugeukie kushoto sokoni.",
      "Ni mbali?",
      "Hapana, ni dakika tano kwa miguu. Iko karibu na duka la dawa.",
      "Na kuna posta karibu na hapa?",
      "Ndiyo, posta iko mkabala na benki.",
    ],
    q: [
      ["Mtu A anatafuta nini kwanza?", "Benki", "Soko", "Shule"],
      ["Anapaswa kugeukia kushoto wapi?", "Sokoni", "Kwenye duka la dawa", "Posta"],
      ["Posta iko wapi?", "Mkabala na benki", "Karibu na soko", "Nyuma ya duka la dawa"],
    ],
  },
  "1-11": {
    lines: [
      "Unapenda kufanya nini wakati wa mapumziko?",
      "Ninapenda sana kucheza mpira wa miguu na marafiki zangu. Na wewe?",
      "Mimi ninapendelea kusoma vitabu na kusikiliza muziki.",
      "Unapenda kuogelea?",
      "Si sana, lakini ninapenda kucheza ngoma Jumapili.",
      "Basi tucheze ngoma pamoja Jumapili ijayo!",
    ],
    q: [
      ["Mtu wa kwanza anapenda sana nini?", "Kucheza mpira wa miguu", "Kusoma", "Kuogelea"],
      ["Mtu wa pili anapendelea nini?", "Kusoma na muziki", "Mpira wa miguu", "Kupika"],
      ["Wanapanga kufanya nini Jumapili?", "Kucheza ngoma pamoja", "Kucheza mpira", "Kwenda kuogelea"],
    ],
  },
  "1-12": {
    lines: [
      "Hujambo! Hii ni siku yako ya kwanza shuleni?",
      "Ndiyo. Jina langu ni Petro. Nina miaka kumi na mbili.",
      "Karibu, Petro! Mimi ni Neema. Unaishi wapi?",
      "Ninaishi karibu na soko, kwenye nyumba ya kijani.",
      "Darasa langu linaanza saa mbili asubuhi. Unapenda Kiswahili?",
      "Ndiyo, ni somo ninalolipenda zaidi. Tukae pamoja!",
    ],
    q: [
      ["Ni siku ya kwanza ya nani?", "Ya Petro", "Ya Neema", "Ya mwalimu"],
      ["Petro anaishi wapi?", "Karibu na soko", "Karibu na benki", "Karibu na shule"],
      ["Somo analolipenda zaidi Petro ni lipi?", "Kiswahili", "Hisabati", "Muziki"],
    ],
  },
  "1-final": {
    lines: [
      "Hujambo, mimi ni Yulia. Mimi ni mgeni katika mtaa huu.",
      "Karibu, Yulia! Mimi ni Marko. Unatoka wapi?",
      "Ninatoka Lubumbashi. Nina miaka kumi na sita. Na wewe?",
      "Nina miaka kumi na saba. Ninaishi na mama, baba na kaka zangu wawili.",
      "Una mambo unayopenda? Mimi ninapenda sana mpira wa kikapu Jumamosi.",
      "Ninapenda kuchora na kupika. Kesho ninataka kupika wali na samaki.",
      "Inaonekana vizuri! Naweza kupata namba yako ya simu?",
      "Bila shaka. Ni sifuri tisa tisa, moja moja moja, mbili mbili mbili.",
    ],
    q: [
      ["Yulia anatoka wapi?", "Lubumbashi", "Kolwezi", "Kinshasa"],
      ["Marko ana miaka mingapi?", "Kumi na saba", "Kumi na sita", "Kumi na mitano"],
      ["Marko anapenda sana nini Jumamosi?", "Mpira wa kikapu", "Kupika", "Kuchora"],
      ["Yulia anataka kupika nini kesho?", "Wali na samaki", "Kuku na mkate", "Supu"],
    ],
  },

  // ---------------- Kiwango cha 2 ----------------
  "2-1": {
    lines: [
      "Umemaliza ripoti niliyokuomba?",
      "Bado. Nimekuwa nikiifanyia kazi tangu asubuhi.",
      "Ungeniambia mapema, ningekusaidia.",
      "Najua, lakini nilidhani ningeimaliza peke yangu.",
      "Basi, nitumie ikiwa tayari, nami nitakagua sarufi.",
      "Asante. Nitaituma kabla ya chakula cha mchana.",
    ],
    q: [
      ["Mtu B amemaliza ripoti?", "Hapana, bado", "Ndiyo, amemaliza", "Hajaanza"],
      ["Mtu A angefanya nini mapema?", "Kumsaidia", "Kuiandika mwenyewe", "Kuifuta"],
      ["Mtu A atakagua nini?", "Sarufi", "Namba", "Picha"],
    ],
  },
  "2-2": {
    lines: [
      "Ulifanya nini wikendi iliyopita?",
      "Nilitembelea babu na bibi yangu. Tulipika pamoja na kutazama filamu za zamani.",
      "Inapendeza. Mimi nilibaki nyumbani na nikamaliza kitabu.",
      "Utafanya nini wikendi ijayo?",
      "Nitasafiri kwenda Likasi kutazama mechi ya mpira wa miguu.",
      "Basi labda nitaenda nawe, ikiwa kuna tiketi ya kunifaa.",
    ],
    q: [
      ["Mtu wa kwanza alifanya nini wikendi iliyopita?", "Alitembelea babu na bibi", "Alimaliza kitabu", "Alienda kwenye mechi"],
      ["Mtu wa pili alifanya nini?", "Alibaki nyumbani akisoma", "Alisafiri", "Alipika kwa marafiki"],
      ["Mechi itakuwa wapi?", "Likasi", "Kolwezi", "Kinshasa"],
    ],
  },
  "2-3": {
    lines: [
      "Hujambo, nadhani hatujakutana. Mimi ni Daudi.",
      "Nimefurahi, Daudi. Mimi ni Rosa. Unamjuaje mwenyeji wa sherehe?",
      "Tulisoma pamoja chuo kikuu. Na wewe?",
      "Ninafanya kazi naye kwenye zahanati. Wewe unafanya kazi gani?",
      "Mimi ni mhandisi. Ninabuni mifumo ya maji kwa vijiji.",
      "Inavutia kweli. Niambie zaidi!",
    ],
    q: [
      ["Daudi anamjuaje mwenyeji?", "Walisoma pamoja", "Ni majirani", "Wanafanya kazi pamoja"],
      ["Rosa anafanya kazi wapi?", "Kwenye zahanati", "Shuleni", "Benki"],
      ["Daudi anafanya kazi gani?", "Anabuni mifumo ya maji", "Anajenga nyumba", "Anafundisha Kiswahili"],
    ],
  },
  "2-4": {
    lines: [
      "Unaweza kusoma barua pepe hii kabla sijamtumia meneja?",
      "Bila shaka. Sentensi ya kwanza ni ndefu kidogo. Jaribu kuifupisha.",
      "Nianze na «Mheshimiwa» au na jina lake?",
      "Tumia jina lake, Bw. Lewis. Na maliza kwa «Wako mwaminifu».",
      "Na kichwa cha barua?",
      "Kiwe wazi: «Ombi la mkutano Alhamisi».",
    ],
    q: [
      ["Barua pepe ni ya nini?", "Kuomba mkutano", "Kulalamika kuhusu bei", "Kushukuru"],
      ["Barua pepe inapaswa kuanza vipi?", "Kwa jina la meneja", "Kwa «Habari rafiki»", "Bila salamu"],
      ["Mkutano ni siku gani?", "Alhamisi", "Jumanne", "Ijumaa"],
    ],
  },
  "2-5": {
    lines: [
      "Tahadhari tafadhali. Treni ya kwenda Lubumbashi imechelewa kwa dakika arobaini.",
      "Umesikia? Treni yetu itaondoka saa tisa na dakika kumi.",
      "Basi tuna wakati wa kunywa kahawa. Ni jukwaa gani?",
      "Tangazo lilisema jukwaa la nne.",
      "Tusubiri mgahawani basi. Nina njaa hata hivyo.",
      "Wazo zuri. Tutaenda jukwaani saa tisa.",
    ],
    q: [
      ["Treni imechelewa kwa muda gani?", "Dakika arobaini", "Dakika kumi", "Saa moja"],
      ["Treni inaondokea jukwaa gani?", "Jukwaa la nne", "Jukwaa la pili", "Jukwaa la tano"],
      ["Wanaamua kufanya nini?", "Kusubiri mgahawani", "Kuchukua teksi", "Kurudi nyumbani"],
    ],
  },
  "2-6": {
    lines: [
      "Umesoma makala kuhusu maktaba mpya ya mji?",
      "Ndiyo. Inasema itafunguliwa Septemba na itakuwa na intaneti ya bure.",
      "Ninapenda kwamba wanafunzi wanaweza pia kukopa tableti.",
      "Mwandishi anasema pia itakuwa wazi hadi saa nne usiku kila siku.",
      "Nadhani nitasoma huko. Ni tulivu kuliko nyumbani kwangu.",
      "Mimi pia. Natumaini kutakuwa na viti vya kutosha!",
    ],
    q: [
      ["Maktaba itafunguliwa lini?", "Septemba", "Januari", "Juni"],
      ["Wanafunzi wanaweza kukopa nini?", "Tableti", "Kompyuta mpakato", "Simu"],
      ["Itakuwa wazi hadi saa ngapi?", "Saa nne usiku", "Saa kumi na mbili jioni", "Usiku wa manane"],
    ],
  },
  "2-7": {
    lines: [
      "Ulijisikiaje kuhusu filamu ya jana usiku?",
      "Kwa kweli, nilikatishwa tamaa. Hadithi ilikuwa rahisi kuikisia.",
      "Kweli? Mimi niliiona ya kusisimua, na muziki ulikuwa mzuri sana.",
      "Kwa maoni yangu, waigizaji hawakuwa wa kushawishi.",
      "Sikubaliani. Mwigizaji mkuu alikuwa mzuri mno, na mwisho ulinishangaza.",
      "Basi, tuna ladha tofauti. Wakati ujao wewe utachagua filamu.",
    ],
    q: [
      ["Mtu wa kwanza alijisikiaje kuhusu filamu?", "Alikatishwa tamaa", "Alifurahi", "Alichoshwa na muziki"],
      ["Mtu wa pili alipenda nini zaidi?", "Muziki na mwigizaji", "Bei", "Sinema"],
      ["Wanakubaliana nini mwishoni?", "Mwingine atachagua wakati ujao", "Kuiangalia tena", "Kusoma kitabu"],
    ],
  },
  "2-8": {
    lines: [
      "Sikiliza vizuri: neno ni «ng'ombe», si «ngombe».",
      "Ng'ombe. Je, ni bora zaidi?",
      "Karibu. Sauti ya «ng'» inatoka nyuma ya pua na koo, bila kusema «g» kwa nguvu.",
      "Ng'ombe... ng'ombe. Ninahisi tofauti.",
      "Vizuri. Sasa rudia sentensi: «Ng'ombe wa baba ni mkubwa».",
      "Ng'ombe wa baba ni mkubwa. Je, ilikuwa sahihi?",
    ],
    q: [
      ["Mwalimu anasahihisha neno gani?", "Ng'ombe", "Ngombe", "Baba"],
      ["Sauti ya «ng'» inatoka wapi?", "Nyuma ya pua na koo", "Kati ya midomo", "Kwenye meno"],
      ["Mwanafunzi anapaswa kurudia nini?", "Sentensi nzima", "Alfabeti", "Namba"],
    ],
  },
  "2-9": {
    lines: [
      "Samahani, supu hii ni baridi. Niliagiza ya moto.",
      "Pole sana, mama. Nitakuletea nyingine mara moja.",
      "Asante. Na tunaweza kupata bili, tafadhali?",
      "Bila shaka. Mtalipa kwa kadi au pesa taslimu?",
      "Kwa kadi. Huduma imejumuishwa?",
      "Ndiyo, imejumuishwa. Asante kwa uvumilivu wenu.",
    ],
    q: [
      ["Tatizo ni nini?", "Supu ni baridi", "Chakula kina chumvi nyingi", "Meza ni chafu"],
      ["Mhudumu atafanya nini?", "Kuleta supu nyingine", "Kutoa punguzo", "Kumwita meneja"],
      ["Mteja atalipa vipi?", "Kwa kadi", "Kwa pesa taslimu", "Kwa simu"],
    ],
  },
  "2-10": {
    lines: [
      "Habari za asubuhi, Bw. Okafor. Asante kwa kuja ofisini kwetu.",
      "Asante kwa kunikaribisha. Ningependa kuwasilisha bidhaa mpya ya kampuni yetu.",
      "Tafadhali anza. Tuna dakika thelathini kabla ya mkutano unaofuata.",
      "Ni taa ya jua. Hudumu saa kumi na inagharimu kidogo sana.",
      "Mnaweza kuwasilisha taa mia mbili baada ya muda gani?",
      "Baada ya wiki tatu. Kesho nitakutumia ofa iliyoandikwa.",
    ],
    q: [
      ["Bidhaa ni nini?", "Taa ya jua", "Simu", "Pampu ya maji"],
      ["Mteja anataka taa ngapi?", "Mia mbili", "Mia moja", "Kumi na mbili"],
      ["Bw. Okafor atatuma ofa lini?", "Kesho", "Mwezi ujao", "Leo"],
    ],
  },
  "2-11": {
    lines: [
      "Naamini kufanya kazi nyumbani ni bora. Unaokoa wakati na pesa.",
      "Naelewa hoja yako, lakini sikubaliani. Nyumbani ni vigumu kuzingatia.",
      "Inategemea mtu. Mimi ninazalisha zaidi bila kelele.",
      "Lakini timu huwasiliana vizuri zaidi zinapokutana kila siku.",
      "Tunaweza kuchanganya yote mawili: siku tatu ofisini, siku mbili nyumbani.",
      "Ni makubaliano ya haki. Naweza kuyakubali.",
    ],
    q: [
      ["Mtu wa kwanza anapendelea nini?", "Kufanya kazi nyumbani", "Kufanya kazi ofisini", "Kutofanya kazi"],
      ["Kwa nini mtu wa pili hakubali?", "Ni vigumu kuzingatia nyumbani", "Inagharimu sana", "Hakuna intaneti"],
      ["Wanafikia makubaliano gani?", "Siku tatu ofisini, mbili nyumbani", "Siku tano nyumbani", "Siku tano ofisini"],
    ],
  },
  "2-12": {
    lines: [
      "Kesho nina mahojiano ya kazi. Unaweza kunisaidia kufanya mazoezi?",
      "Bila shaka. Swali la kwanza: kwa nini unataka kufanya kazi katika kampuni hii?",
      "Kwa sababu inawasaidia vijana kujifunza ujuzi, nami ninapenda kufundisha.",
      "Vizuri. Sasa, nguvu yako kubwa ni ipi?",
      "Nina subira, na ninafanya kazi vizuri kwenye timu.",
      "Bora kabisa. Tulia, tabasamu na ongea polepole kesho.",
    ],
    q: [
      ["Mtu A anajiandaa kwa nini?", "Mahojiano ya kazi", "Mtihani", "Safari"],
      ["Kwa nini anataka kufanya kazi katika kampuni?", "Inawasaidia vijana kujifunza", "Inalipa zaidi", "Iko karibu na nyumbani"],
      ["Rafiki anashauri nini mwishoni?", "Kutulia na kuongea polepole", "Kuchelewa", "Kuongea haraka sana"],
    ],
  },
  "2-final": {
    lines: [
      "Uko huru wikendi hii? Ningependa kupanga safari ndogo.",
      "Ndiyo, niko huru Jumamosi. Unataka kwenda wapi?",
      "Nilikuwa nafikiria ziwa. Tunaweza kuondoka asubuhi mapema.",
      "Ni mbali? Mara ya mwisho nilisafiri saa tatu na nilichoka sana.",
      "Ni dakika tisini tu kwa basi. Tunaweza kubeba sandwichi na juisi.",
      "Kwa maoni yangu, tunapaswa pia kubeba kofia. Mwaka jana kulikuwa na joto kali.",
      "Hoja nzuri. Tuwaalike Maria na Juma?",
      "Ndiyo, lakini tuwaulize usiku huu. Basi linaondoka saa moja asubuhi.",
    ],
    q: [
      ["Wanataka kwenda wapi?", "Ziwani", "Mlimani", "Sokoni"],
      ["Safari ya basi inachukua muda gani?", "Dakika tisini", "Saa tatu", "Dakika thelathini"],
      ["Wanapaswa kubeba nini mbali na chakula?", "Kofia", "Mwavuli", "Kamera"],
      ["Basi linaondoka saa ngapi?", "Saa moja asubuhi", "Saa kumi na mbili asubuhi", "Saa mbili asubuhi"],
    ],
  },

  // ---------------- Kiwango cha 3 ----------------
  "3-1": {
    lines: [
      "Tukisaini mkataba leo, mngeweza kuanza kuwasilisha lini?",
      "Mkithibitisha oda kabla ya adhuhuri, tungeweza kuanza Jumatatu.",
      "Na ikiwa shehena ingechelewa, mngetoa fidia?",
      "Ndiyo. Ingechelewa zaidi ya wiki moja, tungetoa punguzo la asilimia tano.",
      "Inakubalika. Isipokuwa kama kuna masharti mengine, tutasaini.",
      "Nitatuma toleo la mwisho mchana huu.",
    ],
    q: [
      ["Uwasilishaji ungeanza lini oda ikithibitishwa kabla ya adhuhuri?", "Jumatatu", "Ijumaa", "Mwezi ujao"],
      ["Nini kinatolewa kwa ucheleweshaji wa zaidi ya wiki?", "Punguzo la asilimia tano", "Marejesho kamili", "Bidhaa ya bure"],
      ["Toleo la mwisho litatumwa lini?", "Mchana huu", "Kesho asubuhi", "Wiki ijayo"],
    ],
  },
  "3-2": {
    lines: [
      "Lazima uwasilishe fomu ya utii kabla ya mwisho wa mwezi.",
      "Je, ni lazima pia niambatishe taarifa za fedha?",
      "Ndiyo, unapaswa kuziingiza. Huhitaji kutuma ankara za zamani.",
      "Naweza kuituma kwa njia ya kielektroniki, au lazima isainiwe kwenye karatasi?",
      "Unaweza kuituma kielektroniki, lakini mkurugenzi lazima aisaini kwanza.",
      "Nimeelewa. Napaswa kuweza kumaliza kufikia Alhamisi.",
    ],
    q: [
      ["Fomu inatakiwa lini?", "Mwisho wa mwezi", "Wiki ijayo", "Kesho"],
      ["Nini hakihitajiki?", "Ankara za zamani", "Taarifa za fedha", "Sahihi"],
      ["Nani lazima asaini fomu?", "Mkurugenzi", "Mhasibu", "Mteja"],
    ],
  },
  "3-3": {
    lines: [
      "Bei yetu ni dola elfu thelathini kwa kifurushi chote.",
      "Hiyo ni zaidi ya bajeti yetu. Tunaweza kutoa dola elfu ishirini na nne.",
      "Siwezi kushuka kiasi hicho, lakini naweza kujumuisha mafunzo ya bure kwa wafanyakazi wenu.",
      "Inavutia. Je, tukilipa nusu sasa na nusu baada ya siku sitini?",
      "Naweza kukubali, kwa ada ya asilimia mbili kwenye malipo ya pili.",
      "Basi tumekubaliana dola elfu ishirini na nane. Tuandike.",
    ],
    q: [
      ["Bei ya kwanza ilikuwa ipi?", "Dola elfu thelathini", "Dola elfu ishirini na nne", "Dola elfu ishirini na nane"],
      ["Muuzaji anatoa ziada gani?", "Mafunzo ya bure", "Usafirishaji wa bure", "Bidhaa ya pili"],
      ["Bei ya mwisho ni ipi?", "Dola elfu ishirini na nane", "Dola elfu thelathini", "Dola elfu ishirini na nne"],
    ],
  },
  "3-4": {
    lines: [
      "Tufanye mazoezi ya mawasilisho yako. Una dakika kumi. Anza ukiwa tayari.",
      "Habari za asubuhi nyote. Leo nitawaonyesha matokeo ya mauzo ya mwaka.",
      "Mwanzo mzuri. Kumbuka kusimama kidogo baada ya kila namba muhimu.",
      "Nitumie kwanza grafu ya slaidi ya pili?",
      "Ndiyo, kisha nenda kwenye jedwali. Weka slaidi rahisi na waangalie wasikilizaji.",
      "Nimeelewa. Pia nitaandaa majibu ya maswali kuhusu gharama.",
    ],
    q: [
      ["Mawasilisho yanachukua muda gani?", "Dakika kumi", "Dakika thelathini", "Saa moja"],
      ["Mada ni nini?", "Matokeo ya mauzo ya mwaka", "Mfanyakazi mpya", "Kuhama ofisi"],
      ["Mkufunzi anashauri nini?", "Slaidi rahisi na kuwaangalia wasikilizaji", "Kusoma kila neno", "Kuepuka grafu"],
    ],
  },
  "3-5": {
    lines: [
      "Asanteni nyote kwa kuja. Jambo la kwanza kwenye ajenda ni bajeti.",
      "Napendekeza tuongeze bajeti ya mafunzo kwa asilimia kumi.",
      "Nani anaunga mkono? Tafadhali inueni mkono.",
      "Saba wanaunga mkono, mmoja anapinga. Pendekezo limepitishwa.",
      "Nitaandika kumbukumbu na kuzisambaza kesho asubuhi.",
      "Ongeza pia tarehe ya mkutano ujao: tarehe kumi na tano saa tatu asubuhi.",
    ],
    q: [
      ["Jambo la kwanza kwenye ajenda ni lipi?", "Bajeti", "Kuajiri", "Ofisi mpya"],
      ["Matokeo ya kura ni yapi?", "Saba wanaunga, mmoja anapinga", "Watano wanaunga, watatu wanapinga", "Wote wanapinga"],
      ["Mkutano ujao ni lini?", "Tarehe kumi na tano saa tatu asubuhi", "Tarehe tano saa tatu asubuhi", "Tarehe kumi na tano saa nne asubuhi"],
    ],
  },
  "3-6": {
    lines: [
      "Ninaandika ripoti ya robo mwaka. Nipangeje muundo wake?",
      "Anza na muhtasari mkuu wa nusu ukurasa, wenye matokeo makuu.",
      "Kisha uchambuzi, wenye majedwali, na mwishowe mapendekezo yako.",
      "Pendekezo la ghala jipya liwe ndani ya ripoti?",
      "Hapana, lifanye hati tofauti. Jumuisha gharama, ratiba na hatari.",
      "Vizuri. Nitawatumia hati zote mbili kufikia Ijumaa.",
    ],
    q: [
      ["Ripoti inapaswa kuanza vipi?", "Kwa muhtasari mkuu", "Kwa mapendekezo", "Kwa majedwali"],
      ["Nini kinapaswa kuwa hati tofauti?", "Pendekezo la ghala", "Muhtasari", "Majedwali"],
      ["Hati zitatumwa lini?", "Kufikia Ijumaa", "Kufikia Jumatatu", "Leo"],
    ],
  },
  "3-7": {
    lines: [
      "Halo, mnanisikia? Skrini yenu imeganda upande wangu.",
      "Ninakusikia, lakini picha ni ya polepole. Nitazima kamera yangu.",
      "Bora zaidi. Unaweza kushiriki mawasilisho yako sasa?",
      "Ndiyo, ninashiriki sasa. Unaiona slaidi ya kwanza?",
      "Ndiyo, wazi kabisa. Tafadhali nyamazisha maikrofoni yako ninapouliza swali.",
      "Samahani, nilikuwa ninaandika. Endelea.",
    ],
    q: [
      ["Tatizo mwanzoni ni lipi?", "Picha imeganda au ni ya polepole", "Hakuna anayesikia", "Simu imeghairiwa"],
      ["Mtu huyu anazima nini?", "Kamera", "Maikrofoni", "Skrini"],
      ["Kwa nini anaombwa kunyamazisha maikrofoni?", "Swali litaulizwa", "Kuna mwangwi", "Mkutano umeisha"],
    ],
  },
  "3-8": {
    lines: [
      "Hujambo, mimi ni Amina kutoka kampuni ya usafirishaji. Huu ni mkutano wako wa kwanza?",
      "Hapana, ni wa tatu. Mimi ni Petro, ninafanya kazi ya nishati mbadala.",
      "Inavutia. Mara nyingi tunasafirisha paneli za jua. Tunaweza kufanya kazi pamoja.",
      "Ningependa sana. Una kadi ya biashara?",
      "Bila shaka. Tunywe kahawa kesho tujadili kwa kina.",
      "Vizuri. Nitakuandikia usiku huu kuthibitisha wakati.",
    ],
    q: [
      ["Kampuni ya Amina inafanya nini?", "Usafirishaji", "Benki", "Elimu"],
      ["Huu ni mkutano wa ngapi kwa Petro?", "Wa tatu", "Wa kwanza", "Wa pili"],
      ["Amina atafanya nini usiku huu?", "Kumwandikia Petro barua pepe", "Kumpigia Petro simu", "Kuandika ripoti"],
    ],
  },
  "3-9": {
    lines: [
      "Shehena imechelewa kwa siku tano na mteja amekasirika sana.",
      "Nini kilisababisha ucheleweshaji?",
      "Tatizo kwenye forodha. Nyaraka hazikuwa kamili.",
      "Tunahitaji suluhisho mbili: kwanza, kurekebisha nyaraka leo; pili, kutuma sehemu ndogo kwa ndege.",
      "Usafirishaji wa ndege ni ghali. Ungegharimu kiasi gani?",
      "Karibu dola elfu mbili. Nadhani inafaa ili kumhifadhi mteja.",
    ],
    q: [
      ["Shehena imechelewa kwa muda gani?", "Siku tano", "Siku mbili", "Mwezi mmoja"],
      ["Nini kilisababisha ucheleweshaji?", "Nyaraka pungufu forodhani", "Mgomo", "Hali mbaya ya hewa"],
      ["Usafirishaji wa ndege ungegharimu kiasi gani?", "Karibu dola elfu mbili", "Karibu dola mia tano", "Karibu dola elfu ishirini"],
    ],
  },
  "3-10": {
    lines: [
      "Mshirika wangu amenialika chakula cha jioni, lakini sijui jinsi ya kuwa mwenye heshima.",
      "Katika utamaduni wao, ni adabu kufika kuchelewa kidogo, si kwa wakati kamili.",
      "Na je, nilete zawadi?",
      "Zawadi ndogo inapendwa, kama matunda au peremende. Epuka kutoa kitu cha gharama.",
      "Ni kukosa adabu kukataa chakula?",
      "Ndiyo, ni bora kuonja kidogo cha kila kitu na kushukuru.",
    ],
    q: [
      ["Mgeni anapaswa kufika lini?", "Kuchelewa kidogo", "Mapema sana", "Kwa wakati kamili"],
      ["Zawadi gani inapendwa?", "Matunda au peremende", "Pesa", "Saa ya gharama"],
      ["Ushauri kuhusu chakula ni upi?", "Kuonja kidogo cha kila kitu", "Kukataa kwa adabu", "Kula kabla ya kwenda"],
    ],
  },
  "3-11": {
    lines: [
      "Wanachama wawili wa timu yangu wana mgogoro na unaathiri kikundi kizima.",
      "Kwanza, zungumza na kila mmoja peke yake na usikilize bila kuhukumu.",
      "Kisha uwakutanishe na uzingatie suluhisho, si lawama.",
      "Na wasipokubaliana?",
      "Weka malengo wazi, gawanya majukumu na kagua maendeleo kila wiki.",
      "Asante. Nitapanga mkutano Jumatano.",
    ],
    q: [
      ["Tatizo ni nini?", "Wanachama wawili wa timu wana mgogoro", "Mauzo yameshuka", "Meneja amejiuzulu"],
      ["Kiongozi afanye nini kwanza?", "Azungumze na kila mmoja peke yake", "Amfukuze mmoja", "Alipuuze"],
      ["Mkutano utakuwa lini?", "Jumatano", "Jumatatu", "Ijumaa"],
    ],
  },
  "3-12": {
    lines: [
      "Asante kwa kutupokea. Tungependa kuongeza mkataba wetu kwa miaka miwili zaidi.",
      "Tunafurahi kusikia hivyo. Naweza kupendekeza marekebisho kadhaa ya masharti?",
      "Bila shaka. Vipaumbele vyetu ni uwasilishaji wa haraka zaidi na ripoti ya kila mwezi.",
      "Tunaweza kuhakikisha uwasilishaji ndani ya siku kumi, nami nitakutumia ripoti kila mwezi.",
      "Kwa kubadilishana, tungekubali ongezeko dogo la bei.",
      "Ni haki. Tukamilishe maelezo na tusaini wiki ijayo.",
    ],
    q: [
      ["Mteja anataka kufanya nini?", "Kuongeza mkataba kwa miaka miwili", "Kufuta mkataba", "Kununua bidhaa mpya"],
      ["Muda wa uwasilishaji unaohakikishwa ni upi?", "Siku kumi", "Siku mbili", "Mwezi mmoja"],
      ["Mteja anakubali nini kwa kubadilishana?", "Ongezeko dogo la bei", "Ucheleweshaji mrefu", "Huduma pungufu"],
    ],
  },
  "3-final": {
    lines: [
      "Habari za asubuhi. Tupitie matokeo ya robo mwaka iliyopita.",
      "Mauzo yaliongezeka kwa asilimia kumi na mbili, hasa kutokana na wateja wapya wa kaskazini.",
      "Tukiendelea na kasi hii, tutafikia lengo la mwaka?",
      "Ndiyo, kwa sharti tuajiri watu wawili zaidi kwenye huduma kwa wateja.",
      "Hatari kuu za robo ijayo ni zipi?",
      "Kupanda kwa gharama za usafiri na ucheleweshaji unaowezekana wa msambazaji wetu mkuu.",
      "Basi napendekeza tuwasiliane na msambazaji wa pili na kuandaa mpango wa dharura.",
      "Nimekubali. Nitawasilisha mpango kwa bodi tarehe ishirini.",
    ],
    q: [
      ["Mauzo yaliongezeka kwa kiasi gani?", "Asilimia kumi na mbili", "Asilimia mbili", "Asilimia ishirini"],
      ["Nini kinahitajika kufikia lengo la mwaka?", "Watu wawili zaidi kwenye huduma kwa wateja", "Ofisi mpya", "Bei ndogo"],
      ["Hatari gani imetajwa?", "Kupanda kwa gharama za usafiri", "Mshindani mpya", "Mgomo"],
      ["Mpango utawasilishwa lini kwa bodi?", "Tarehe ishirini", "Tarehe kumi", "Mwaka ujao"],
    ],
  },
};

export default data;
