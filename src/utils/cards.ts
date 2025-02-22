import { cardDictionary, CardType } from '@/types/card'

// Creates a bank of cards usable by the given faction
export function makeBank(faction: string, deck: number[][] = []): CardType[] {
  const blackListedIds = deck.length ? deck.map(d => d[0]) : []

  // Filter the card dictionary to get the cards for the bank
  // If a deck is provided, do not add its cards to the bank
  const cards = cardDictionary.filter(
    cd => !blackListedIds.includes(cd.id) && [faction, 'neutral', 'weather', 'special'].includes(cd.faction) && cd.faction !== 'leader'
  )

  // Sort the cards using the compare function
  cards.sort((a, b) => {
    const c1 = { name: a.name, basePower: -(a.strength || 0), faction: a.faction }
    const c2 = { name: b.name, basePower: -(b.strength || 0), faction: b.faction }
    return compare(c1, c2)
  })

  return cards
}

function compare(a: { name: string; basePower: number; faction: string }, b: { name: string; basePower: number; faction: string }) {
  let dif = factionRank(a.faction) - factionRank(b.faction)
  if (dif !== 0) return dif
  dif = a.basePower - b.basePower
  if (dif !== 0) return dif
  return a.name.localeCompare(b.name)
}

function factionRank(f: string) {
  return f === 'special' ? -2 : f === 'weather' ? -1 : 0
}

export function translateCardsFromDictionary(cards: number[][]): CardType[] {
  const cardMap = cards.map(c => ({ id: c[0], count: c[1] }))

  const translatedCards: CardType[] = []
  cardMap.forEach(card => {
    for (let i = 0; i < card.count; i++) {
      const foundCard = cardDictionary.find(dc => dc.id === card.id)
      if (foundCard) {
        translatedCards.push(foundCard)
      }
    }
  })

  return translatedCards
}

export function translateLeaderCard(leader: number): CardType | null {
  const translatedCard = cardDictionary.find(dc => dc.id === leader)

  return translatedCard || null
}
