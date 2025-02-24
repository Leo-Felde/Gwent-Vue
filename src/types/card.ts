export const powerTypes = new Set([
  'hero',
  'decoy',
  'scorch',
  'mardroeme',
  'fog',
  'frost',
  'rain',
  'clear',
  'horn',
  'storm',
])
export const weatherTypes = new Set(['fog', 'frost', 'rain', 'clear', 'storm'])
export const specialAbilities = new Set([
  'spy',
  'decoy',
  'scorch',
  'mardroeme',
  'fog',
  'frost',
  'rain',
  'clear',
  'horn',
  'storm',
])

export interface CardType {
  id: number
  name: string
  faction: string
  row: string
  strength: number | null
  ability: string
  filename: string
  count: number
}

export interface PremadeDeckType {
  faction: string
  leader: number
  cards: number[][]
}

export const cardDictionary: CardType[] = [
  {
    name: 'Mysterious Elf',
    id: 1,
    faction: 'neutral',
    row: 'close',
    strength: 0,
    ability: 'hero spy',
    filename: 'mysterious_elf',
    count: 1,
  },
  {
    name: 'Decoy',
    id: 2,
    faction: 'special',
    row: '',
    strength: null,
    ability: 'decoy',
    filename: 'decoy',
    count: 3,
  },
  {
    name: 'Biting Frost',
    id: 3,
    faction: 'weather',
    row: '',
    strength: null,
    ability: 'frost',
    filename: 'frost',
    count: 3,
  },
  {
    name: 'Cirilla Fiona Elen Riannon',
    id: 4,
    faction: 'neutral',
    row: 'close',
    strength: 15,
    ability: 'hero',
    filename: 'ciri',
    count: 1,
  },
  {
    name: 'Clear Weather',
    id: 5,
    faction: 'weather',
    row: '',
    strength: null,
    ability: 'clear',
    filename: 'clear',
    count: 2,
  },
  {
    name: "Commander\\'s Horn",
    id: 6,
    faction: 'special',
    row: '',
    strength: null,
    ability: 'horn',
    filename: 'horn',
    count: 3,
  },
  {
    name: 'Dandelion',
    id: 7,
    faction: 'neutral',
    row: 'close',
    strength: 2,
    ability: 'horn',
    filename: 'dandelion',
    count: 1,
  },
  {
    name: 'Emiel Regis Rohellec Terzieff',
    id: 8,
    faction: 'neutral',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'emiel',
    count: 1,
  },
  {
    name: 'Geralt of Rivia',
    id: 9,
    faction: 'neutral',
    row: 'close',
    strength: 15,
    ability: 'hero',
    filename: 'geralt',
    count: 1,
  },
  {
    name: 'Impenetrable Fog',
    id: 10,
    faction: 'weather',
    row: '',
    strength: null,
    ability: 'fog',
    filename: 'fog',
    count: 3,
  },
  {
    name: 'Scorch',
    id: 11,
    faction: 'special',
    row: '',
    strength: null,
    ability: 'scorch',
    filename: 'scorch',
    count: 3,
  },
  {
    name: 'Torrential Rain',
    id: 12,
    faction: 'weather',
    row: '',
    strength: null,
    ability: 'rain',
    filename: 'rain',
    count: 2,
  },
  {
    name: 'Triss Merigold',
    id: 13,
    faction: 'neutral',
    row: 'close',
    strength: 7,
    ability: 'hero',
    filename: 'triss',
    count: 1,
  },
  {
    name: 'Vesemir',
    id: 14,
    faction: 'neutral',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'vesemir',
    count: 1,
  },
  {
    name: 'Villentretenmerth',
    id: 15,
    faction: 'neutral',
    row: 'close',
    strength: 7,
    ability: 'scorch_c',
    filename: 'villen',
    count: 1,
  },
  {
    name: 'Yennefer of Vengerberg',
    id: 16,
    faction: 'neutral',
    row: 'ranged',
    strength: 7,
    ability: 'hero medic',
    filename: 'yennefer',
    count: 1,
  },
  {
    name: 'Zoltan Chivay',
    id: 17,
    faction: 'neutral',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'zoltan',
    count: 1,
  },
  {
    name: 'Olgierd von Everec',
    id: 18,
    faction: 'neutral',
    row: 'agile',
    strength: 6,
    ability: 'morale',
    filename: 'olgierd',
    count: 1,
  },
  {
    name: "Gaunter O\\'Dimm",
    id: 19,
    faction: 'neutral',
    row: 'siege',
    strength: 2,
    ability: 'muster',
    filename: 'gaunter_odimm',
    count: 1,
  },
  {
    name: "Gaunter O\\'Dimm - Darkness",
    id: 20,
    faction: 'neutral',
    row: 'ranged',
    strength: 4,
    ability: 'muster',
    filename: 'gaunter_odimm_darkness',
    count: 3,
  },
  {
    name: 'Cow',
    id: 21,
    faction: 'neutral',
    row: 'ranged',
    strength: 0,
    ability: 'avenger',
    filename: 'cow',
    count: 1,
  },
  {
    name: 'Bovine Defense Force',
    id: 22,
    faction: 'neutral',
    row: 'close',
    strength: 8,
    ability: '',
    filename: 'chort',
    count: 0,
  },
  {
    name: 'Foltest - King of Temeria',
    id: 23,
    faction: 'realms',
    row: 'leader',
    strength: null,
    ability: 'foltest_king',
    filename: 'foltest_silver',
    count: 1,
  },
  {
    name: 'Foltest - Lord Commander of the North',
    id: 24,
    faction: 'realms',
    row: 'leader',
    strength: null,
    ability: 'foltest_lord',
    filename: 'foltest_gold',
    count: 1,
  },
  {
    name: 'Foltest - The Siegemaster',
    id: 25,
    faction: 'realms',
    row: 'leader',
    strength: null,
    ability: 'foltest_siegemaster',
    filename: 'foltest_copper',
    count: 1,
  },
  {
    name: 'Foltest - The Steel-Forged',
    id: 26,
    faction: 'realms',
    row: 'leader',
    strength: null,
    ability: 'foltest_steelforged',
    filename: 'foltest_bronze',
    count: 1,
  },
  {
    name: 'Foltest - Son of Medell',
    id: 27,
    faction: 'realms',
    row: 'leader',
    strength: null,
    ability: 'foltest_son',
    filename: 'foltest_son_of_medell',
    count: 1,
  },
  {
    name: 'Ballista',
    id: 28,
    faction: 'realms',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'ballista',
    count: 1,
  },
  {
    name: 'Blue Stripes Commando',
    id: 29,
    faction: 'realms',
    row: 'close',
    strength: 4,
    ability: 'bond',
    filename: 'blue_stripes',
    count: 3,
  },
  {
    name: 'Catapult',
    id: 30,
    faction: 'realms',
    row: 'siege',
    strength: 8,
    ability: 'bond',
    filename: 'catapult_1',
    count: 2,
  },
  {
    name: 'Crinfrid Reavers Dragon Hunter',
    id: 31,
    faction: 'realms',
    row: 'ranged',
    strength: 5,
    ability: 'bond',
    filename: 'crinfrid',
    count: 3,
  },
  {
    name: 'Dethmold',
    id: 32,
    faction: 'realms',
    row: 'ranged',
    strength: 6,
    ability: '',
    filename: 'dethmold',
    count: 1,
  },
  {
    name: 'Dun Banner Medic',
    id: 33,
    faction: 'realms',
    row: 'siege',
    strength: 5,
    ability: 'medic',
    filename: 'banner_nurse',
    count: 1,
  },
  {
    name: 'Esterad Thyssen',
    id: 34,
    faction: 'realms',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'esterad',
    count: 1,
  },
  {
    name: 'John Natalis',
    id: 35,
    faction: 'realms',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'natalis',
    count: 1,
  },
  {
    name: 'Kaedweni Siege Expert',
    id: 36,
    faction: 'realms',
    row: 'siege',
    strength: 1,
    ability: 'morale',
    filename: 'kaedwen_siege',
    count: 1,
  },
  {
    name: 'Kaedweni Siege Expert',
    id: 37,
    faction: 'realms',
    row: 'siege',
    strength: 1,
    ability: 'morale',
    filename: 'kaedwen_siege_1',
    count: 1,
  },
  {
    name: 'Kaedweni Siege Expert',
    id: 38,
    faction: 'realms',
    row: 'siege',
    strength: 1,
    ability: 'morale',
    filename: 'kaedwen_siege_2',
    count: 1,
  },
  {
    name: 'Keira Metz',
    id: 39,
    faction: 'realms',
    row: 'ranged',
    strength: 5,
    ability: '',
    filename: 'keira',
    count: 1,
  },
  {
    name: 'Philippa Eilhart',
    id: 40,
    faction: 'realms',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'philippa',
    count: 1,
  },
  {
    name: 'Poor Fucking Infantry',
    id: 41,
    faction: 'realms',
    row: 'close',
    strength: 1,
    ability: 'bond',
    filename: 'poor_infantry',
    count: 4,
  },
  {
    name: 'Prince Stennis',
    id: 42,
    faction: 'realms',
    row: 'close',
    strength: 5,
    ability: 'spy',
    filename: 'stennis',
    count: 1,
  },
  {
    name: 'Redanian Foot Soldier',
    id: 43,
    faction: 'realms',
    row: 'close',
    strength: 1,
    ability: '',
    filename: 'redania',
    count: 1,
  },
  {
    name: 'Redanian Foot Soldier',
    id: 44,
    faction: 'realms',
    row: 'close',
    strength: 1,
    ability: '',
    filename: 'redania_1',
    count: 1,
  },
  {
    name: 'Sheldon Skaggs',
    id: 45,
    faction: 'realms',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'sheldon',
    count: 1,
  },
  {
    name: 'Siege Tower',
    id: 46,
    faction: 'realms',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'siege_tower',
    count: 1,
  },
  {
    name: 'Siegfried of Denesle',
    id: 47,
    faction: 'realms',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'siegfried',
    count: 1,
  },
  {
    name: 'Sigismund Dijkstra',
    id: 48,
    faction: 'realms',
    row: 'close',
    strength: 4,
    ability: 'spy',
    filename: 'dijkstra',
    count: 1,
  },
  {
    name: 'Síle de Tansarville',
    id: 49,
    faction: 'realms',
    row: 'ranged',
    strength: 5,
    ability: '',
    filename: 'sheala',
    count: 1,
  },
  {
    name: 'Thaler',
    id: 50,
    faction: 'realms',
    row: 'siege',
    strength: 1,
    ability: 'spy',
    filename: 'thaler',
    count: 1,
  },
  {
    name: 'Sabrina Glevissig',
    id: 51,
    faction: 'realms',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'sabrina',
    count: 1,
  },
  {
    name: 'Vernon Roche',
    id: 52,
    faction: 'realms',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'vernon',
    count: 1,
  },
  {
    name: 'Ves',
    id: 53,
    faction: 'realms',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'ves',
    count: 1,
  },
  {
    name: 'Yarpen Zigrin',
    id: 54,
    faction: 'realms',
    row: 'close',
    strength: 2,
    ability: '',
    filename: 'yarpen',
    count: 1,
  },
  {
    name: 'Trebuchet',
    id: 55,
    faction: 'realms',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'trebuchet',
    count: 1,
  },
  {
    name: 'Trebuchet',
    id: 56,
    faction: 'realms',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'trebuchet_1',
    count: 1,
  },
  {
    name: 'Emhyr var Emreis - His Imperial Majesty',
    id: 57,
    faction: 'nilfgaard',
    row: 'leader',
    strength: null,
    ability: 'emhyr_imperial',
    filename: 'emhyr_silver',
    count: 1,
  },
  {
    name: 'Emhyr var Emreis - Emperor of Nilfgaard',
    id: 58,
    faction: 'nilfgaard',
    row: 'leader',
    strength: null,
    ability: 'emhyr_emperor',
    filename: 'emhyr_copper',
    count: 1,
  },
  {
    name: 'Emhyr var Emreis - the White Flame',
    id: 59,
    faction: 'nilfgaard',
    row: 'leader',
    strength: null,
    ability: 'emhyr_whiteflame',
    filename: 'emhyr_bronze',
    count: 1,
  },
  {
    name: 'Emhyr var Emreis - The Relentless',
    id: 60,
    faction: 'nilfgaard',
    row: 'leader',
    strength: null,
    ability: 'emhyr_relentless',
    filename: 'emhyr_gold',
    count: 1,
  },
  {
    name: 'Emhyr var Emreis - Invader of the North',
    id: 61,
    faction: 'nilfgaard',
    row: 'leader',
    strength: null,
    ability: 'emhyr_invader',
    filename: 'emhyr_invader_of_the_north',
    count: 1,
  },
  {
    name: 'Albrich',
    id: 62,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'albrich',
    count: 1,
  },
  {
    name: 'Assire var Anahid',
    id: 63,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 6,
    ability: '',
    filename: 'assire',
    count: 1,
  },
  {
    name: 'Black Infantry Archer',
    id: 64,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 10,
    ability: '',
    filename: 'black_archer',
    count: 1,
  },
  {
    name: 'Black Infantry Archer',
    id: 65,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 10,
    ability: '',
    filename: 'black_archer_1',
    count: 1,
  },
  {
    name: 'Cahir Mawr Dyffryn aep Ceallach',
    id: 66,
    faction: 'nilfgaard',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'cahir',
    count: 1,
  },
  {
    name: 'Cynthia',
    id: 67,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'cynthia',
    count: 1,
  },
  {
    name: 'Etolian Auxiliary Archers',
    id: 68,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 1,
    ability: 'medic',
    filename: 'archer_support',
    count: 1,
  },
  {
    name: 'Etolian Auxiliary Archers',
    id: 69,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 1,
    ability: 'medic',
    filename: 'archer_support_1',
    count: 1,
  },
  {
    name: 'Fringilla Vigo',
    id: 70,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 6,
    ability: '',
    filename: 'fringilla',
    count: 1,
  },
  {
    name: 'Heavy Zerrikanian Fire Scorpion',
    id: 71,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 10,
    ability: '',
    filename: 'heavy_zerri',
    count: 1,
  },
  {
    name: 'Impera Brigade Guard',
    id: 72,
    faction: 'nilfgaard',
    row: 'close',
    strength: 3,
    ability: 'bond',
    filename: 'imperal_brigade',
    count: 4,
  },
  {
    name: 'Letho of Gulet',
    id: 73,
    faction: 'nilfgaard',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'letho',
    count: 1,
  },
  {
    name: 'Menno Coehoorn',
    id: 74,
    faction: 'nilfgaard',
    row: 'close',
    strength: 10,
    ability: 'hero medic',
    filename: 'menno',
    count: 1,
  },
  {
    name: 'Morteisen',
    id: 75,
    faction: 'nilfgaard',
    row: 'close',
    strength: 3,
    ability: '',
    filename: 'morteisen',
    count: 1,
  },
  {
    name: 'Morvran Voorhis',
    id: 76,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 10,
    ability: 'hero',
    filename: 'moorvran',
    count: 1,
  },
  {
    name: 'Nausicaa Cavalry Rider',
    id: 77,
    faction: 'nilfgaard',
    row: 'close',
    strength: 2,
    ability: 'bond',
    filename: 'nauzicaa_2',
    count: 3,
  },
  {
    name: 'Puttkammer',
    id: 78,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 3,
    ability: '',
    filename: 'puttkammer',
    count: 1,
  },
  {
    name: 'Rainfarn',
    id: 79,
    faction: 'nilfgaard',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'rainfarn',
    count: 1,
  },
  {
    name: 'Renuald aep Matsen',
    id: 80,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 5,
    ability: '',
    filename: 'renuald',
    count: 1,
  },
  {
    name: 'Rotten Mangonel',
    id: 81,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 3,
    ability: '',
    filename: 'rotten',
    count: 1,
  },
  {
    name: 'Shilard Fitz-Oesterlen',
    id: 82,
    faction: 'nilfgaard',
    row: 'close',
    strength: 7,
    ability: 'spy',
    filename: 'shilard',
    count: 1,
  },
  {
    name: 'Siege Engineer',
    id: 83,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'siege_engineer',
    count: 1,
  },
  {
    name: 'Siege Technician',
    id: 84,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 0,
    ability: 'medic',
    filename: 'siege_support',
    count: 1,
  },
  {
    name: 'Stefan Skellen',
    id: 85,
    faction: 'nilfgaard',
    row: 'close',
    strength: 9,
    ability: 'spy',
    filename: 'stefan',
    count: 1,
  },
  {
    name: 'Sweers',
    id: 86,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'sweers',
    count: 1,
  },
  {
    name: 'Tibor Eggebracht',
    id: 87,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'tibor',
    count: 1,
  },
  {
    name: 'Vanhemar',
    id: 88,
    faction: 'nilfgaard',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'vanhemar',
    count: 1,
  },
  {
    name: 'Vattier de Rideaux',
    id: 89,
    faction: 'nilfgaard',
    row: 'close',
    strength: 4,
    ability: 'spy',
    filename: 'vattier',
    count: 1,
  },
  {
    name: 'Vreemde',
    id: 90,
    faction: 'nilfgaard',
    row: 'close',
    strength: 2,
    ability: '',
    filename: 'vreemde',
    count: 1,
  },
  {
    name: 'Young Emissary',
    id: 91,
    faction: 'nilfgaard',
    row: 'close',
    strength: 5,
    ability: 'bond',
    filename: 'young_emissary',
    count: 1,
  },
  {
    name: 'Young Emissary',
    id: 92,
    faction: 'nilfgaard',
    row: 'close',
    strength: 5,
    ability: 'bond',
    filename: 'young_emissary_1',
    count: 1,
  },
  {
    name: 'Zerrikanian Fire Scorpion',
    id: 93,
    faction: 'nilfgaard',
    row: 'siege',
    strength: 5,
    ability: '',
    filename: 'zerri',
    count: 1,
  },
  {
    name: 'Eredin - Commander of the Red Riders',
    id: 94,
    faction: 'monsters',
    row: 'leader',
    strength: null,
    ability: 'eredin_commander',
    filename: 'eredin_silver',
    count: 1,
  },
  {
    name: 'Eredin - Bringer of Death',
    id: 95,
    faction: 'monsters',
    row: 'leader',
    strength: null,
    ability: 'eredin_bringer_of_death',
    filename: 'eredin_bronze',
    count: 1,
  },
  {
    name: 'Eredin - Destroyer of Worlds',
    id: 96,
    faction: 'monsters',
    row: 'leader',
    strength: null,
    ability: 'eredin_destroyer',
    filename: 'eredin_gold',
    count: 1,
  },
  {
    name: 'Eredin - King of the Wild Hunt',
    id: 97,
    faction: 'monsters',
    row: 'leader',
    strength: null,
    ability: 'eredin_king',
    filename: 'eredin_copper',
    count: 1,
  },
  {
    name: 'Eredin Bréacc Glas - The Treacherous',
    id: 98,
    faction: 'monsters',
    row: 'leader',
    strength: null,
    ability: 'eredin_treacherous',
    filename: 'eredin_the_treacherous',
    count: 1,
  },
  {
    name: 'Arachas ',
    id: 99,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'arachas',
    count: 1,
  },
  {
    name: 'Arachas ',
    id: 100,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'arachas_1',
    count: 1,
  },
  {
    name: 'Arachas ',
    id: 101,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'arachas_2',
    count: 1,
  },
  {
    name: 'Arachas- Behemoth',
    id: 102,
    faction: 'monsters',
    row: 'siege',
    strength: 6,
    ability: 'muster',
    filename: 'arachas_behemoth',
    count: 1,
  },
  {
    name: 'Botchling',
    id: 103,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'poroniec',
    count: 1,
  },
  {
    name: 'Celaeno Harpy',
    id: 104,
    faction: 'monsters',
    row: 'agile',
    strength: 2,
    ability: '',
    filename: 'celaeno_harpy',
    count: 1,
  },
  {
    name: 'Cockatrice',
    id: 105,
    faction: 'monsters',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'cockatrice',
    count: 1,
  },
  {
    name: 'Crone - Brewess',
    id: 106,
    faction: 'monsters',
    row: 'close',
    strength: 6,
    ability: 'muster',
    filename: 'witch_velen',
    count: 1,
  },
  {
    name: 'Crone - Weavess',
    id: 107,
    faction: 'monsters',
    row: 'close',
    strength: 6,
    ability: 'muster',
    filename: 'witch_velen_1',
    count: 1,
  },
  {
    name: 'Crone - Whispess',
    id: 108,
    faction: 'monsters',
    row: 'close',
    strength: 6,
    ability: 'muster',
    filename: 'witch_velen_2',
    count: 1,
  },
  {
    name: 'Draug',
    id: 109,
    faction: 'monsters',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'draug',
    count: 1,
  },
  {
    name: 'Earth Elemental',
    id: 110,
    faction: 'monsters',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'earth_elemental',
    count: 1,
  },
  {
    name: 'Endrega',
    id: 111,
    faction: 'monsters',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'endrega',
    count: 1,
  },
  {
    name: 'Fiend',
    id: 112,
    faction: 'monsters',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'fiend',
    count: 1,
  },
  {
    name: 'Fire Elemental',
    id: 113,
    faction: 'monsters',
    row: 'siege',
    strength: 6,
    ability: '',
    filename: 'fire_elemental',
    count: 1,
  },
  {
    name: 'Foglet',
    id: 114,
    faction: 'monsters',
    row: 'close',
    strength: 2,
    ability: '',
    filename: 'fogling',
    count: 1,
  },
  {
    name: 'Forktail',
    id: 115,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'forktail',
    count: 1,
  },
  {
    name: 'Frightener',
    id: 116,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'frightener',
    count: 1,
  },
  {
    name: 'Gargoyle',
    id: 117,
    faction: 'monsters',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'gargoyle',
    count: 1,
  },
  {
    name: 'Ghoul',
    id: 118,
    faction: 'monsters',
    row: 'close',
    strength: 1,
    ability: 'muster',
    filename: 'ghoul',
    count: 1,
  },
  {
    name: 'Ghoul',
    id: 119,
    faction: 'monsters',
    row: 'close',
    strength: 1,
    ability: 'muster',
    filename: 'ghoul_1',
    count: 1,
  },
  {
    name: 'Ghoul',
    id: 120,
    faction: 'monsters',
    row: 'close',
    strength: 1,
    ability: 'muster',
    filename: 'ghoul_2',
    count: 1,
  },
  {
    name: 'Grave Hag',
    id: 121,
    faction: 'monsters',
    row: 'ranged',
    strength: 5,
    ability: '',
    filename: 'gravehag',
    count: 1,
  },
  {
    name: 'Griffin',
    id: 122,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'gryffin',
    count: 1,
  },
  {
    name: 'Harpy',
    id: 123,
    faction: 'monsters',
    row: 'agile',
    strength: 2,
    ability: '',
    filename: 'harpy',
    count: 1,
  },
  {
    name: 'Ice Giant',
    id: 124,
    faction: 'monsters',
    row: 'siege',
    strength: 5,
    ability: '',
    filename: 'frost_giant',
    count: 1,
  },
  {
    name: 'Imlerith',
    id: 125,
    faction: 'monsters',
    row: 'close',
    strength: 10,
    ability: 'hero',
    filename: 'imlerith',
    count: 1,
  },
  {
    name: 'Kayran',
    id: 126,
    faction: 'monsters',
    row: 'agile',
    strength: 8,
    ability: 'hero morale',
    filename: 'kayran',
    count: 1,
  },
  {
    name: 'Leshen',
    id: 127,
    faction: 'monsters',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'leshen',
    count: 1,
  },
  {
    name: 'Nekker',
    id: 128,
    faction: 'monsters',
    row: 'close',
    strength: 2,
    ability: 'muster',
    filename: 'nekker',
    count: 1,
  },
  {
    name: 'Nekker',
    id: 129,
    faction: 'monsters',
    row: 'close',
    strength: 2,
    ability: 'muster',
    filename: 'nekker_1',
    count: 1,
  },
  {
    name: 'Nekker',
    id: 130,
    faction: 'monsters',
    row: 'close',
    strength: 2,
    ability: 'muster',
    filename: 'nekker_2',
    count: 1,
  },
  {
    name: 'Plague Maiden',
    id: 131,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mighty_maiden',
    count: 1,
  },
  {
    name: 'Vampire - Bruxa',
    id: 132,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'bruxa',
    count: 1,
  },
  {
    name: 'Vampire - Ekimmara',
    id: 133,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'ekkima',
    count: 1,
  },
  {
    name: 'Vampire - Fleder',
    id: 134,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'fleder',
    count: 1,
  },
  {
    name: 'Vampire - Garkain',
    id: 135,
    faction: 'monsters',
    row: 'close',
    strength: 4,
    ability: 'muster',
    filename: 'garkain',
    count: 1,
  },
  {
    name: 'Vampire - Katakan',
    id: 136,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: 'muster',
    filename: 'katakan',
    count: 1,
  },
  {
    name: 'Werewolf',
    id: 137,
    faction: 'monsters',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'werewolf',
    count: 1,
  },
  {
    name: 'Wyvern',
    id: 138,
    faction: 'monsters',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'wyvern',
    count: 1,
  },
  {
    name: 'Toad',
    id: 139,
    faction: 'monsters',
    row: 'ranged',
    strength: 7,
    ability: 'scorch_r',
    filename: 'toad',
    count: 1,
  },
  {
    name: 'Francesca Findabair - Queen of Dol Blathanna',
    id: 140,
    faction: 'scoiatael',
    row: 'leader',
    strength: null,
    ability: 'francesca_queen',
    filename: 'francesca_silver',
    count: 1,
  },
  {
    name: 'Francesca Findabair - the Beautiful',
    id: 141,
    faction: 'scoiatael',
    row: 'leader',
    strength: null,
    ability: 'francesca_beautiful',
    filename: 'francesca_gold',
    count: 1,
  },
  {
    name: 'Francesca Findabair - Daisy of the Valley',
    id: 142,
    faction: 'scoiatael',
    row: 'leader',
    strength: null,
    ability: 'francesca_daisy',
    filename: 'francesca_copper',
    count: 1,
  },
  {
    name: 'Francesca Findabair - Pureblood Elf',
    id: 143,
    faction: 'scoiatael',
    row: 'leader',
    strength: null,
    ability: 'francesca_pureblood',
    filename: 'francesca_bronze',
    count: 1,
  },
  {
    name: 'Francesca Findabair - Hope of the Aen Seidhe',
    id: 144,
    faction: 'scoiatael',
    row: 'leader',
    strength: null,
    ability: 'francesca_hope',
    filename: 'francesca_hope_of_the_aen_seidhe',
    count: 1,
  },
  {
    name: 'Ciaran aep Easnillien',
    id: 145,
    faction: 'scoiatael',
    row: 'agile',
    strength: 3,
    ability: '',
    filename: 'ciaran',
    count: 1,
  },
  {
    name: 'Barclay Els',
    id: 146,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'barclay',
    count: 1,
  },
  {
    name: 'Dennis Cranmer',
    id: 147,
    faction: 'scoiatael',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'dennis',
    count: 1,
  },
  {
    name: 'Dol Blathanna Archer',
    id: 148,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'dol_archer',
    count: 1,
  },
  {
    name: 'Dol Blathanna Scout',
    id: 149,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'dol_infantry',
    count: 1,
  },
  {
    name: 'Dol Blathanna Scout',
    id: 150,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'dol_infantry_1',
    count: 1,
  },
  {
    name: 'Dol Blathanna Scout',
    id: 151,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'dol_infantry_2',
    count: 1,
  },
  {
    name: 'Dwarven Skirmisher',
    id: 152,
    faction: 'scoiatael',
    row: 'close',
    strength: 3,
    ability: 'muster',
    filename: 'dwarf',
    count: 1,
  },
  {
    name: 'Dwarven Skirmisher',
    id: 153,
    faction: 'scoiatael',
    row: 'close',
    strength: 3,
    ability: 'muster',
    filename: 'dwarf_1',
    count: 1,
  },
  {
    name: 'Dwarven Skirmisher',
    id: 154,
    faction: 'scoiatael',
    row: 'close',
    strength: 3,
    ability: 'muster',
    filename: 'dwarf_2',
    count: 1,
  },
  {
    name: 'Eithné',
    id: 155,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'eithne',
    count: 1,
  },
  {
    name: 'Elven Skirmisher',
    id: 156,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 2,
    ability: 'muster',
    filename: 'elf_skirmisher',
    count: 1,
  },
  {
    name: 'Elven Skirmisher',
    id: 157,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 2,
    ability: 'muster',
    filename: 'elf_skirmisher_1',
    count: 1,
  },
  {
    name: 'Elven Skirmisher',
    id: 158,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 2,
    ability: 'muster',
    filename: 'elf_skirmisher_2',
    count: 1,
  },
  {
    name: 'Filavandrel aen Fidhail',
    id: 159,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'filavandrel',
    count: 1,
  },
  {
    name: 'Havekar Healer',
    id: 160,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 0,
    ability: 'medic',
    filename: 'havekar_nurse',
    count: 1,
  },
  {
    name: 'Havekar Healer',
    id: 161,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 0,
    ability: 'medic',
    filename: 'havekar_nurse_1',
    count: 1,
  },
  {
    name: 'Havekar Healer',
    id: 162,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 0,
    ability: 'medic',
    filename: 'havekar_nurse_2',
    count: 1,
  },
  {
    name: 'Havekar Smuggler',
    id: 163,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: 'muster',
    filename: 'havekar_support',
    count: 1,
  },
  {
    name: 'Havekar Smuggler',
    id: 164,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: 'muster',
    filename: 'havekar_support_1',
    count: 1,
  },
  {
    name: 'Havekar Smuggler',
    id: 165,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: 'muster',
    filename: 'havekar_support_2',
    count: 1,
  },
  {
    name: 'Ida Emean aep Sivney',
    id: 166,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 6,
    ability: '',
    filename: 'ida',
    count: 1,
  },
  {
    name: 'Iorveth',
    id: 167,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'iorveth',
    count: 1,
  },
  {
    name: 'Isengrim Faoiltiarna',
    id: 168,
    faction: 'scoiatael',
    row: 'close',
    strength: 10,
    ability: 'hero morale',
    filename: 'isengrim',
    count: 1,
  },
  {
    name: 'Mahakaman Defender',
    id: 169,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mahakam',
    count: 1,
  },
  {
    name: 'Mahakaman Defender',
    id: 170,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mahakam_1',
    count: 1,
  },
  {
    name: 'Mahakaman Defender',
    id: 171,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mahakam_2',
    count: 1,
  },
  {
    name: 'Mahakaman Defender',
    id: 172,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mahakam_3',
    count: 1,
  },
  {
    name: 'Mahakaman Defender',
    id: 173,
    faction: 'scoiatael',
    row: 'close',
    strength: 5,
    ability: '',
    filename: 'mahakam_4',
    count: 1,
  },
  {
    name: 'Milva',
    id: 174,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 10,
    ability: 'morale',
    filename: 'milva',
    count: 1,
  },
  {
    name: 'Riordain',
    id: 175,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 1,
    ability: '',
    filename: 'riordain',
    count: 1,
  },
  {
    name: 'Saesenthessis',
    id: 176,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'saskia',
    count: 1,
  },
  {
    name: 'Toruviel',
    id: 177,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 2,
    ability: '',
    filename: 'toruviel',
    count: 1,
  },
  {
    name: 'Vrihedd Brigade Recruit',
    id: 178,
    faction: 'scoiatael',
    row: 'ranged',
    strength: 4,
    ability: '',
    filename: 'vrihedd_cadet',
    count: 1,
  },
  {
    name: 'Vrihedd Brigade Veteran',
    id: 179,
    faction: 'scoiatael',
    row: 'agile',
    strength: 5,
    ability: '',
    filename: 'vrihedd_brigade',
    count: 1,
  },
  {
    name: 'Vrihedd Brigade Veteran',
    id: 180,
    faction: 'scoiatael',
    row: 'agile',
    strength: 5,
    ability: '',
    filename: 'vrihedd_brigade_1',
    count: 1,
  },
  {
    name: 'Yaevinn',
    id: 181,
    faction: 'scoiatael',
    row: 'agile',
    strength: 6,
    ability: '',
    filename: 'yaevinn',
    count: 1,
  },
  {
    name: 'Berserker',
    id: 182,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: 'berserker',
    filename: 'berserker',
    count: 1,
  },
  {
    name: 'Birna Bran',
    id: 183,
    faction: 'skellige',
    row: 'close',
    strength: 2,
    ability: 'medic',
    filename: 'birna',
    count: 1,
  },
  {
    name: 'Blueboy Lugos',
    id: 184,
    faction: 'skellige',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'blueboy',
    count: 1,
  },
  {
    name: 'Cerys',
    id: 185,
    faction: 'skellige',
    row: 'close',
    strength: 10,
    ability: 'hero muster',
    filename: 'cerys',
    count: 1,
  },
  {
    name: 'Clan Brokva Archer',
    id: 186,
    faction: 'skellige',
    row: 'ranged',
    strength: 6,
    ability: '',
    filename: 'brokva_archer',
    count: 2,
  },
  {
    name: 'Clan Dimun Pirate',
    id: 187,
    faction: 'skellige',
    row: 'ranged',
    strength: 6,
    ability: 'scorch',
    filename: 'dimun_pirate',
    count: 1,
  },
  {
    name: 'Cerys - Clan Drummond Shield Maiden',
    id: 188,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: 'bond',
    filename: 'shield_maiden',
    count: 1,
  },
  {
    name: 'Cerys - Clan Drummond Shield Maiden',
    id: 189,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: 'bond',
    filename: 'shield_maiden_1',
    count: 1,
  },
  {
    name: 'Cerys - Clan Drummond Shield Maiden',
    id: 190,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: 'bond',
    filename: 'shield_maiden_2',
    count: 1,
  },
  {
    name: 'Clan Heymaey Skald',
    id: 191,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'heymaey',
    count: 1,
  },
  {
    name: 'Clan Tordarroch Armorsmith',
    id: 192,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'tordarroch',
    count: 1,
  },
  {
    name: 'Clan an Craite Warrior',
    id: 193,
    faction: 'skellige',
    row: 'close',
    strength: 6,
    ability: 'bond',
    filename: 'craite_warrior',
    count: 3,
  },
  {
    name: 'Donar an Hindar',
    id: 194,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'donar',
    count: 1,
  },
  {
    name: 'Draig Bon-Dhu',
    id: 195,
    faction: 'skellige',
    row: 'siege',
    strength: 2,
    ability: 'horn',
    filename: 'draig',
    count: 1,
  },
  {
    name: 'Ermion',
    id: 196,
    faction: 'skellige',
    row: 'ranged',
    strength: 8,
    ability: 'hero mardroeme',
    filename: 'ermion',
    count: 1,
  },
  {
    name: 'Hemdall',
    id: 197,
    faction: 'skellige',
    row: 'close',
    strength: 11,
    ability: 'hero',
    filename: 'hemdall',
    count: 0,
  },
  {
    name: 'Hjalmar',
    id: 198,
    faction: 'skellige',
    row: 'ranged',
    strength: 10,
    ability: 'hero',
    filename: 'hjalmar',
    count: 1,
  },
  {
    name: 'Holger Blackhand',
    id: 199,
    faction: 'skellige',
    row: 'siege',
    strength: 4,
    ability: '',
    filename: 'holger',
    count: 1,
  },
  {
    name: 'Kambi',
    id: 200,
    faction: 'skellige',
    row: 'close',
    strength: 0,
    ability: 'avenger_kambi',
    filename: 'kambi',
    count: 1,
  },
  {
    name: 'Light Longship',
    id: 201,
    faction: 'skellige',
    row: 'ranged',
    strength: 4,
    ability: 'muster',
    filename: 'light_longship',
    count: 3,
  },
  {
    name: 'Madman Lugos',
    id: 202,
    faction: 'skellige',
    row: 'close',
    strength: 6,
    ability: '',
    filename: 'madmad_lugos',
    count: 1,
  },
  {
    name: 'Mardroeme',
    id: 203,
    faction: 'special',
    row: '',
    strength: null,
    ability: 'mardroeme',
    filename: 'mardroeme',
    count: 3,
  },
  {
    name: 'Olaf',
    id: 204,
    faction: 'skellige',
    row: 'agile',
    strength: 12,
    ability: 'morale',
    filename: 'olaf',
    count: 1,
  },
  {
    name: 'Skellige Storm',
    id: 205,
    faction: 'weather',
    row: '',
    strength: null,
    ability: 'rain fog',
    filename: 'storm',
    count: 3,
  },
  {
    name: 'Svanrige',
    id: 206,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'svanrige',
    count: 1,
  },
  {
    name: 'Transformed Vildkaarl',
    id: 207,
    faction: 'skellige',
    row: 'close',
    strength: 14,
    ability: 'morale',
    filename: 'vildkaarl',
    count: 0,
  },
  {
    name: 'Transformed Young Vildkaarl',
    id: 208,
    faction: 'skellige',
    row: 'ranged',
    strength: 8,
    ability: 'bond',
    filename: 'young_vildkaarl',
    count: 0,
  },
  {
    name: 'Udalryk',
    id: 209,
    faction: 'skellige',
    row: 'close',
    strength: 4,
    ability: '',
    filename: 'udalryk',
    count: 1,
  },
  {
    name: 'War Longship',
    id: 210,
    faction: 'skellige',
    row: 'siege',
    strength: 6,
    ability: 'bond',
    filename: 'war_longship',
    count: 2,
  },
  {
    name: 'Young Berserker',
    id: 211,
    faction: 'skellige',
    row: 'ranged',
    strength: 2,
    ability: 'berserker',
    filename: 'young_berserker',
    count: 3,
  },
  {
    name: 'Crach an Craite',
    id: 212,
    faction: 'skellige',
    row: 'leader',
    strength: null,
    ability: 'crach_an_craite',
    filename: 'crach_an_craite',
    count: 0,
  },
  {
    name: 'King Bran',
    id: 213,
    faction: 'skellige',
    row: 'leader',
    strength: null,
    ability: 'king_bran',
    filename: 'king_bran',
    count: 0,
  },
  {
    name: 'Schirru',
    id: 214,
    faction: 'scoiatael',
    row: 'siege',
    strength: 8,
    ability: 'scorch_s',
    filename: 'schirru',
    count: 1,
  },
]

export const ability_dict = {
  clear: {
    name: 'Clear Weather',
    description:
      'Removes all Weather Cards (Biting Frost, Impenetrable Fog and Torrential Rain) effects. ',
  },
  frost: {
    name: 'Biting Frost',
    description:
      'Sets the strength of all Close Combat cards to 1 for both players. ',
  },
  fog: {
    name: 'Impenetrable Fog',
    description:
      'Sets the strength of all Ranged Combat cards to 1 for both players. ',
  },
  rain: {
    name: 'Torrential Rain',
    description:
      'Sets the strength of all Siege Combat cards to 1 for both players. ',
  },
  storm: {
    name: 'Skellige Storm',
    description: 'Reduces the Strength of all Range and Siege Units to 1. ',
  },
  hero: {
    name: 'hero',
    description: 'Not affected by any Special Cards or abilities. ',
  },
  decoy: {
    name: 'Decoy',
    description:
      'Swap with a card on the battlefield to return it to your hand. ',
  },
  horn: {
    name: "Commander's Horn",
    description:
      'Doubles the strength of all unit cards in that row. Limited to 1 per row. ',
    // placed: async card => await card.animate('horn')
  },
  mardroeme: {
    name: 'Mardroeme',
    description:
      'Triggers transformation of all Berserker cards on the same row. ',
    // placed: async (card, row) => {
    //   const berserkers = row.findCards(c => c.abilities.includes('berserker'))
    //   await Promise.all(berserkers.map(async c => await ability_dict['berserker'].placed(c, row)))
    // }
  },
  berserker: {
    name: 'Berserker',
    description: 'Transforms into a bear when a Mardroeme card is on its row. ',
    // placed: async (card, row) => {
    //   if (row.effects.mardroeme === 0)
    //     return
    //   row.removeCard(card)
    //   const cardId = card.name.indexOf('Young') === -1 ? 206 : 207
    //   await row.addCard(new Card(card_dict[cardId], card.holder))
    // }
  },
  scorch: {
    name: 'Scorch',
    description:
      'Discard after playing. Kills the strongest card(s) on the battlefield. ',
    // activated: async card => {
    //   await ability_dict['scorch'].placed(card)
    //   await board.toGrave(card, card.holder.hand)
    // },
    // placed: async (card, row) => {
    //   if (row !== undefined)
    //     row.cards.splice( row.cards.indexOf(card), 1)
    //   const maxUnits = board.row.map( r => [r,r.maxUnits()] ).filter( p => p[1].length > 0)
    //   if (row !== undefined)
    //     row.cards.push(card)
    //   const maxPower = maxUnits.reduce( (a,p) => Math.max(a, p[1][0].power), 0 )
    //   const scorched = maxUnits.filter( p => p[1][0].power === maxPower)
    //   const cards = scorched.reduce( (a,p) => a.concat( p[1].map(u => [p[0], u])), [])

    //   await Promise.all(cards.map( async u => await u[1].animate('scorch', true, false)) )
    //   await Promise.all(cards.map( async u => await board.toGrave(u[1], u[0])) )
    // }
  },
  scorch_c: {
    name: 'Scorch - Close Combat',
    description:
      "Destroy your enemy's strongest Close Combat unit(s) if the combined strength of all his or her Close Combat units is 10 or more. ",
    // placed: async (card) => await board.getRow(card, 'close', card.holder.opponent()).scorch()
  },
  scorch_r: {
    name: 'Scorch - Ranged',
    description:
      "Destroy your enemy's strongest Ranged Combat unit(s) if the combined strength of all his or her Ranged Combat units is 10 or more. ",
    // placed: async (card) => await board.getRow(card, 'ranged', card.holder.opponent()).scorch()
  },
  scorch_s: {
    name: 'Scorch - Siege',
    description:
      "Destroys your enemy's strongest Siege Combat unit(s) if the combined strength of all his or her Siege Combat units is 10 or more. ",
    // placed: async (card) => await board.getRow(card, 'siege', card.holder.opponent()).scorch()
  },
  agile: {
    name: 'agile',
    description:
      'Can be placed in either the Close Combat or the Ranged Combat row. Cannot be moved once placed. ',
  },
  muster: {
    name: 'muster',
    description:
      'Find any cards with the same name in your deck and play them instantly. ',
    // placed: async (card) => {
    //   const i = card.name.indexOf('-')
    //   const cardName = i === -1 ?  card.name : card.name.substring(0, i)
    //   const pred = c => c.name.startsWith(cardName)
    //   const units = card.holder.hand.getCards(pred).map(x => [card.holder.hand, x])
    //     .concat(card.holder.deck.getCards(pred).map( x => [card.holder.deck, x] ) )
    //   if (units.length === 0)
    //     return
    //   await card.animate('muster')
    //   await Promise.all( units.map( async p =>  await board.addCardToRow(p[1], p[1].row, p[1].holder, p[0])))
    // }
  },
  spy: {
    name: 'spy',
    description:
      "Place on your opponent's battlefield (counts towards your opponent's total) and draw 2 cards from your deck. ",
    // placed: async (card) => {
    //   await card.animate('spy')
    //   for (let i=0;i<2;i++) {
    //     if (card.holder.deck.cards.length > 0)
    //       await card.holder.deck.draw(card.holder.hand)
    //   }
    //   card.holder = card.holder.opponent()
    // }
  },
  medic: {
    name: 'medic',
    description:
      'Choose one card from your discard pile and play it instantly (no Heroes or Special Cards). ',
    // placed: async (card) => {
    //   const grave = board.getRow(card, 'grave', card.holder)
    //   const units = card.holder.grave.findCards(c => c.isUnit())
    //   if (units.length <= 0)
    //     return
    //   const wrapper = {card : null}
    //   if (game.randomRespawn) {
    // 		 wrapper.card = grave.findCardsRandom(c => c.isUnit())[0]
    //   } else if (card.holder.controller instanceof ControllerOponent) {
    //     console.log('Oponent has played a medic, wait for him to chose which card to respawn')
    //     // Wait for the oponent to choose which card to revive
    //     wrapper.card = await new Promise((resolve) => {
    //       const handleMessage = async (event) => {
    //         const data = JSON.parse(event.data)
    //         if (data.type === 'medicDraw') {
    //           const drawnCard = grave.cards.filter(c => c.filename === data.card)[0]
    //           if (drawnCard) {
    //             resolve(drawnCard)
    //             return
    //           }
    //         }
    //       }
    //       socket.addEventListener('message', handleMessage)
    //     })
    //   } else
    //     await ui.queueCarousel(card.holder.grave, 1, (c, i) => wrapper.card=c.cards[i], c => c.isUnit(), true)
    //   const res = wrapper.card
    //   grave.removeCard(res)
    //   grave.addCard(res)
    //   await res.animate('medic')
    //   await res.autoplay(grave)
    //   return
    // }
  },
  morale: {
    name: 'Morale',
    description: 'Adds +1 to all units in the row (excluding itself). ',
    // placed: async card => await card.animate('morale')
  },
  bond: {
    name: 'Tight Bond',
    description:
      'Place next to a card with the same name to double the strength of both cards. ',
    // placed: async card => {
    //   const bonds = board.getRow(card, card.row, card.holder).findCards(c => c.name === card.name)
    //   if (bonds.length > 1)
    //     await Promise.all( bonds.map(c => c.animate('bond')) )
    // }
  },
  avenger: {
    name: 'Avenger',
    description:
      'When this card is removed from the battlefield, it summons a powerful new Unit Card to take its place. ',
    // removed: async (card) => {
    //   const bdf = new Card(card_dict[21], card.holder)
    //   bdf.removed.push( () => setTimeout( () => bdf.holder.grave.removeCard(bdf), 1001) )
    //   await board.addCardToRow(bdf, 'close', card.holder)
    // },
  },
  avenger_kambi: {
    name: 'Avenger',
    description:
      'When this card is removed from the battlefield, it summons a powerful new Unit Card to take its place. ',
    // removed: async card => {
    //   const bdf = new Card(card_dict[196], card.holder)
    //   bdf.removed.push( () => setTimeout( () => bdf.holder.grave.removeCard(bdf), 1001) )
    //   await board.addCardToRow(bdf, 'close', card.holder)
    // },
  },
  foltest_king: {
    description:
      'Pick an Impenetrable Fog card from your deck and play it instantly.',
    // activated: async card => {
    //   const out = card.holder.deck.findCard(c => c.name === 'Impenetrable Fog')
    //   if (out)
    //     await out.autoplay(card.holder.deck)
    // },
  },
  foltest_lord: {
    description:
      'Clear any weather effects (resulting from Biting Frost, Torrential Rain or Impenetrable Fog cards) in play.',
    // activated: async () => {
    //   tocar('clear', false)
    //   await weather.clearWeather()
    // },
  },
  foltest_siegemaster: {
    description:
      "Doubles the strength of all your Siege units (unless a Commander's Horn is also present on that row).",
    // activated: async card => await board.getRow(card, 'siege', card.holder).leaderHorn(),
  },
  foltest_steelforged: {
    description:
      "Destroy your enemy's strongest Siege unit(s) if the combined strength of all his or her Siege units is 10 or more.",
    // activated: async card => await ability_dict['scorch_s'].placed(card),
  },
  foltest_son: {
    description:
      "Destroy your enemy's strongest Ranged Combat unit(s) if the combined strength of all his or her Ranged Combat units is 10 or more.",
    // activated: async card => await ability_dict['scorch_r'].placed(card),
  },
  emhyr_imperial: {
    description:
      'Pick a Torrential Rain card from your deck and play it instantly.',
    // activated: async card => {
    //   const out = card.holder.deck.findCard(c => c.name === 'Torrential Rain')
    //   if (out)
    //     await out.autoplay(card.holder.deck)
    // },
  },
  emhyr_emperor: {
    description: "Look at 3 random cards from your opponent's hand.",
    // activated: async card => {
    //   // Wait for the oponent to close the carousel
    //   if (card.holder.controller instanceof ControllerOponent) {
    //     await new Promise((resolve) => {
    //       const handleMessage = async (event) => {
    //         const data = JSON.parse(event.data)
    //         if (data.type === 'containerClosed') {
    //           resolve(true)
    //         }
    //       }
    //       socket.addEventListener('message', handleMessage)
    //     })

    //     return
    //   }
    //   const container = new CardContainer()
    //   container.cards = card.holder.opponent().hand.findCardsRandom(() => true, 3)
    //   Carousel.curr.cancel()
    //   await ui.viewCardsInContainer(container)
    // },
  },
  emhyr_whiteflame: {
    description: "Cancel your opponent's Leader Ability.",
  },
  emhyr_relentless: {
    description: "Draw a card from your opponent's discard pile.",
    // activated: async card => {
    //   const grave = board.getRow(card, 'grave', card.holder.opponent())
    //   if (grave.findCards(c => c.isUnit()).length === 0)
    //     return
    //   if (card.holder.controller instanceof ControllerOponent) {
    //     const newCard = await new Promise((resolve) => {
    //       const handleMessage = async (event) => {
    //         const data = JSON.parse(event.data)

    //         if (data.type === 'addCardHand') {
    //           const drawnCard = grave.cards.filter(c => c.isUnit())[data.index]
    //           if (drawnCard) {
    //             drawnCard.holder = player_op
    //             resolve(drawnCard)
    //           }
    //         }
    //       }
    //       socket.addEventListener('message', handleMessage)
    //     })
    //     newCard.holder = player_op
    //     board.toHand(newCard, grave)
    //     return
    //   }

    //   Carousel.curr.cancel()
    //   await ui.queueCarousel(grave, 1, (c,i) => {
    //     const newCard = c.cards[i]
    //     newCard.holder = card.holder
    //     board.toHand(newCard, grave)
    //   }, c => c.isUnit(), true)
    // },
  },
  emhyr_invader: {
    description:
      'Medics cannot choose which card to revive and draw a random one from the graveyard (affects both players).',
    // gameStart: () => game.randomRespawn = true
  },
  eredin_commander: {
    description:
      "Double the strength of all your Close Combat units (unless a Commander's horn is 	also present on that row).",
    // activated: async card => await board.getRow(card, 'close', card.holder).leaderHorn(),
  },
  eredin_bringer_of_death: {
    name: 'Eredin : Bringer of Death',
    description: 'Restore a card from your discard pile to your hand.',
    // activated: async card => {
  },
  eredin_destroyer: {
    description:
      'Discard 2 card and draw 1 card of your choice from your deck.',
    // activated: async (card) => {
    //   const hand = board.getRow(card, 'hand', card.holder)
    //   const deck = board.getRow(card, 'deck', card.holder)
    //   if (card.holder.controller instanceof ControllerOponent) {
    //     // Wait for the opponent to choose which cards to discard and which to get
    //     await new Promise((resolve) => {
    //       let flag = 0
    //       const handleMessage = async (event) => {
    //         const data = JSON.parse(event.data)
    //         if (data.type === 'removeCardHand') {
    //           const card = hand.cards[data.index]
    //           hand.removeCard(card)
    //           flag+=1
    //         }
    //         if (data.type === 'addCardHand') {
    //           const drawnCard = player_op.deck.cards[data.index]
    //           hand.addCard(drawnCard)
    //           flag+=1
    //         }

    //         if (flag === 3) {
    //           resolve(true)
    //         }
    //       }
    //       socket.addEventListener('message', handleMessage)
    //     })

    //     return
    //   } else
    //     Carousel.curr.exit()
    //   await ui.queueCarousel(hand, 2, (c,i) => board.toGrave(c.cards[i], c), () => true)
    //   await ui.queueCarousel(deck, 1, (c,i) => board.toHand(c.cards[i], deck), () => true, true)
    // },
  },
  eredin_king: {
    description: 'Pick any weather card from your deck and play it instantly.',
    // activated: async card => {
    //   const deck = board.getRow(card, 'deck', card.holder)

    //   // Wait for the opponent to choose which weather card to play
    //   if (card.holder.controller instanceof ControllerOponent) {
    //     const card = await new Promise((resolve) => {
    //       const handleMessage = async (event) => {
    //         const data = JSON.parse(event.data)
    //         if (data.type === 'weatherDraw') {
    //           const drawnCard = deck.cards.filter(c => c.faction === 'weather' && c.filename === data.card)[0]
    //           if (drawnCard) {
    //             resolve(drawnCard)
    //           }
    //         }
    //       }
    //       socket.addEventListener('message', handleMessage)
    //     })
    //     board.toWeather(card, deck)
    //   } else {
    //     Carousel.curr.cancel()
    //     await ui.queueCarousel(deck, 1, (c,i) => board.toWeather(c.cards[i], deck), c => c.faction === 'weather', true)
    //   }
    // },
  },
  eredin_treacherous: {
    description:
      'Doubles the strength of all spy cards (affects both players).',
    // gameStart: () => game.doubleSpyPower = true
  },
  francesca_queen: {
    description:
      "Destroy your enemy's strongest Close Combat unit(s) if the combined strength of all his or her Close Combat units is 10 or more.",
    // activated: async card => await ability_dict['scorch_c'].placed(card),
  },
  francesca_beautiful: {
    description:
      "Doubles the strength of all your Ranged Combat units (unless a Commander's Horn is also present on that row).",
    // activated: async card => await board.getRow(card, 'ranged', card.holder).leaderHorn(),
  },
  francesca_daisy: {
    description: 'Draw an extra card at the beginning of the battle.',
    // placed: card => game.gameStart.push( () => {
    //   const draw = card.holder.deck.removeCard(0)
    //   card.holder.hand.addCard( draw )
    //   return true
    // })
  },
  francesca_pureblood: {
    description:
      'Pick a Biting Frost card from your deck and play it instantly.',
    // activated: async card => {
    //   const out = card.holder.deck.findCard(c => c.name === 'Biting Frost')
    //   if (out)
    //     await out.autoplay(card.holder.deck)
    // },
  },
  francesca_hope: {
    description:
      "Move agile units to whichever valid row maximizes their strength (don't move units already in optimal row).",
    // activated: async card => {
    //   const close = board.getRow(card, 'close')
    //   const ranged =  board.getRow(card, 'ranged')
    //   const cards = ability_dict['francesca_hope'].helper(card)
    //   await Promise.all(cards.map(async p => await board.moveTo(p.card, p.row === close ? ranged : close, p.row) ) )

    // },
    // helper: card => {
    //   const close = board.getRow(card, 'close')
    //   const ranged =  board.getRow(card, 'ranged')
    //   return validCards(close).concat( validCards(ranged) )
    //   function validCards(cont) {
    //     return cont.findCards(c => c.row === 'agile').filter(c => dif(c,cont) > 0).map(c => ({card:c, row:cont, weight:dif(c,cont)}))
    //   }
    //   function dif(card, source) {
    //     return (source === close ? ranged : close).calcCardScore(card) - card.power
    //   }
    // }
  },
  crach_an_craite: {
    description:
      "Shuffle all cards from each player's graveyard back into their decks.",
    // activated: async card => {
    //   Promise.all(card.holder.grave.cards.map(c => board.toDeck(c, card.holder.grave)))
    //   await Promise.all(card.holder.opponent().grave.cards.map(c => board.toDeck(c, card.holder.opponent().grave)))
    // },
  },
  king_bran: {
    description:
      'Units only lose half their Strength in bad weather conditions.',
    // placed: card => board.row.filter((c,i) => card.holder === player_me ^ i<3).forEach(r => r.halfWeather = true)
  },
}
