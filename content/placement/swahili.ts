import type { PlacementContent } from "./types";

const content: PlacementContent = {
  levels: {
    1: [
      ["Mimi ___ mwanafunzi.", "ni", "ana", "ako"],
      ["Mimi ___ kitabu kimoja.", "nina", "ana", "una"],
      ["Siku inayofuata baada ya Jumatatu ni ipi?", "Jumanne", "Jumapili", "Jumatano"],
      ["Chagua sentensi sahihi.", "Sisi tunaishi Kolwezi.", "Sisi anaishi Kolwezi.", "Sisi unaishi Kolwezi."],
      ["Nambari \"tano\" ni ipi?", "5", "3", "10"],
      ["Unasema nini unapomwamkia mtu asubuhi?", "Habari za asubuhi", "Usiku mwema", "Kwa heri"],
    ],
    2: [
      ["Jana mimi ___ sokoni.", "nilikwenda", "nitakwenda", "ninakwenda"],
      ["Dada yangu ni mrefu ___ mimi.", "kuliko", "na", "kwa"],
      ["Nitakuja kesho ___ mvua haitanyesha.", "kama", "lakini", "ila"],
      ["Walipofika, wao ___ chakula.", "walikuwa wakipika", "watapika", "wanapika"],
      ["Walimu ___ wanafunzi shuleni.", "wanafundisha", "tunafundisha", "anafundisha"],
      ["Ninataka ___ kitabu hiki.", "kusoma", "soma", "nimesoma"],
    ],
    3: [
      ["Kama ningekuwa na muda zaidi, ___ Kichina.", "ningejifunza", "nitajifunza", "najifunza"],
      ["Ripoti ___ na mkurugenzi.", "ilikaguliwa", "ilikagua", "inakagua"],
      ["Kitabu ___ nilikuambia kiko mezani.", "ambacho", "ambaye", "ambao"],
      ["Mtoto ___ amelala hapa ni mdogo wangu.", "ambaye", "ambacho", "ambayo"],
      ["Usipofanya kazi kwa bidii, ___ mtihani.", "hutafaulu", "utafaulu", "ulifaulu"],
      ["Neno \"mchango\" linamaanisha nini?", "Msaada unaotolewa kwa wengine", "Safari ndefu", "Chakula cha jioni"],
    ],
  },
  reading: {
    title: "Jumamosi sokoni",
    paragraphs: [
      "Kila Jumamosi, Neema na kaka yake Daudi huenda kwenye soko kubwa la Kolwezi. Huondoka nyumbani saa moja asubuhi kwa sababu mboga nzuri huuzwa mapema. Neema hubeba kikapu kikubwa na Daudi hushika orodha aliyoandika mama yao.",
      "Sokoni, Neema hununua nyanya, vitunguu na samaki, wakati Daudi anatafuta viatu vipya vya wazi. Muuzaji anaomba dola kumi na mbili, lakini Daudi anaona bei ni kubwa mno. Baada ya mazungumzo ya kirafiki, analipa dola tisa na muuzaji anampa zawadi ndogo. Wakirudi nyumbani, watoto wamechoka lakini wana furaha, na wanaahidi kurudi wiki ijayo.",
    ],
    q: [
      ["Kwa nini wanaondoka mapema?", "Mboga nzuri huuzwa mapema.", "Soko hufungwa saa mbili.", "Mama yao anawasubiri sokoni."],
      ["Daudi anataka kununua nini?", "Viatu vya wazi", "Samaki", "Kikapu"],
      ["Daudi analipa dola ngapi mwishowe?", "Tisa", "Kumi na mbili", "Tatu"],
      ["Watoto wakoje wakirudi nyumbani?", "Wamechoka lakini wana furaha", "Wana hasira", "Wamechoka na wana huzuni"],
    ],
  },
  readAloud:
    "Jina langu ni Maria na ninafanya kazi katika hospitali ndogo. Kila asubuhi napanda basi saa kumi na mbili na nusu. Jioni napenda kupika chakula cha jioni kwa familia yangu.",
  listening: {
    lines: [
      "Habari za jioni, ningependa kuhifadhi meza kwa Ijumaa usiku.",
      "Sawa. Kwa watu wangapi?",
      "Kwa watu watano, karibu saa mbili usiku. Mmoja wa marafiki zangu ni mlaji mboga.",
      "Hakuna shida. Tuna vyakula viwili vya mboga. Naomba jina lako, tafadhali.",
      "Ndiyo, ni Okoye. O, K, O, Y, E.",
      "Asante. Meza yako imehifadhiwa kwa Ijumaa saa mbili usiku, kwa watu watano.",
    ],
    q: [
      ["Meza imehifadhiwa kwa siku gani?", "Ijumaa", "Jumamosi", "Alhamisi"],
      ["Watu wangapi watakuja?", "Watano", "Wanne", "Sita"],
      ["Mteja anasema nini kuhusu mmoja wa marafiki?", "Ni mlaji mboga.", "Atachelewa.", "Hawezi kuja."],
      ["Meza imehifadhiwa saa ngapi?", "Saa mbili usiku", "Saa moja usiku", "Saa tatu usiku"],
    ],
  },
};

export default content;
