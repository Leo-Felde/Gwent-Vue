// faction: 'realms' | 'nilfgaard' | 'scoiatael' | 'monsters' | 'skellige'
// leader: cardDictionary.id
// cards: [
//  [ cardDictionary.id, desired amount (limited to cardDictionary.count) ]
// ]
export const premadeDecks = [
  {
    faction: 'realms',
    leader: 24,
    cards: [
      [1, 1],
      [2, 3],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [9, 1],
      [13, 1],
      [16, 1],
      [18, 1],
      [19, 1],
      [20, 3],
      [28, 1],
      [29, 3],
      [30, 2],
      [31, 3],
      [33, 1],
      [34, 1],
      [35, 1],
      [39, 1],
      [42, 1],
      [46, 1],
      [48, 1],
      [50, 1],
      [51, 1],
      [52, 1],
      [53, 1],
    ],
  },
  {
    faction: 'nilfgaard',
    leader: 59,
    cards: [
      [5, 1],
      [1, 3],
      [10, 1],
      [2, 1],
      [4, 1],
      [9, 1],
      [11, 1],
      [3, 1],
      [8, 1],
      [63, 1],
      [64, 1],
      [70, 1],
      [73, 1],
      [75, 1],
      [84, 1],
      [81, 1],
      [14, 1],
      [15, 1],
      [17, 1],
      [90, 1],
      [91, 1],
      [19, 3],
      [88, 1],
      [71, 4],
      [6, 1],
      [18, 1],
      [67, 1],
      [68, 1],
      [0, 1],
      [83, 1],
    ],
  },
  {
    faction: 'monsters',
    leader: 93,
    cards: [
      [5, 1],
      [1, 3],
      [10, 1],
      [4, 1],
      [9, 1],
      [11, 1],
      [3, 1],
      [8, 1],
      [124, 1],
      [125, 1],
      [138, 1],
      [14, 1],
      [15, 1],
      [101, 1],
      [105, 1],
      [106, 1],
      [107, 1],
      [17, 1],
      [135, 1],
      [98, 1],
      [99, 1],
      [100, 1],
      [102, 1],
      [19, 3],
      [131, 1],
      [132, 1],
      [133, 1],
      [134, 1],
      [6, 1],
      [18, 1],
      [127, 1],
      [128, 1],
      [129, 1],
      [0, 1],
    ],
  },
  {
    faction: 'scoiatael',
    leader: 141,
    cards: [
      [5, 1],
      [1, 3],
      [10, 1],
      [2, 1],
      [4, 1],
      [9, 1],
      [11, 1],
      [3, 1],
      [8, 1],
      [167, 1],
      [173, 1],
      [213, 1],
      [14, 1],
      [15, 1],
      [148, 1],
      [17, 1],
      [162, 1],
      [163, 1],
      [164, 1],
      [19, 3],
      [144, 1],
      [151, 1],
      [152, 1],
      [153, 1],
      [6, 1],
      [18, 1],
      [159, 1],
      [160, 1],
      [0, 1],
    ],
  },
  {
    faction: 'skellige',
    leader: 211,
    cards: [
      [5, 1],
      [202, 1],
      [10, 1],
      [2, 1],
      [204, 1],
      [11, 1],
      [3, 1],
      [8, 1],
      [203, 1],
      [184, 1],
      [195, 1],
      [14, 1],
      [15, 1],
      [192, 3],
      [186, 1],
      [17, 1],
      [187, 1],
      [188, 1],
      [189, 1],
      [200, 3],
      [182, 1],
      [6, 1],
      [210, 3],
      [199, 1],
      [0, 1],
    ],
  },
]

export function removeCircularReferences(obj: any) {
  const seen = new WeakSet()
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    })
  )
}

export function getChangedKey(oldObj: any, newObj: any): string | null {
  try {
    if (
      !oldObj ||
      !newObj ||
      typeof oldObj !== 'object' ||
      typeof newObj !== 'object'
    ) {
      return null
    }

    const oldKeys = Object.keys(oldObj)
    const newKeys = Object.keys(newObj)

    if (oldKeys.length === 0 || newKeys.length === 0) {
      return null
    }

    for (const key of newKeys) {
      if (!Object.is(oldObj[key], newObj[key])) {
        return key
      }
    }

    return null
  } catch (err) {
    return null
  }
}
