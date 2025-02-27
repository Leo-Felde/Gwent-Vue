import { cardDictionary, CardType } from '@/types/card'

// Cria um banco de cartas que podem ser utilizadas pela facção
export function makeBank(faction: string, deck: number[][] = []): CardType[] {
  // Cria um mapa para armazenar a quantidade de cada carta no deck
  const deckCountMap = new Map<number, number>()
  if (deck.length > 0) {
    deck.forEach(([id, count]) => {
      deckCountMap.set(id, count)
    })
  }

  // Filtra e mapeia as cartas para incluir as quantidades restantes
  const cards = cardDictionary
    .filter(
      (cd) =>
        cd.row !== 'leader' &&
        [faction, 'neutral', 'weather', 'special'].includes(cd.faction)
    )
    .map((cd) => {
      const deckCount = deckCountMap.get(cd.id) || 0
      const remainingCount = cd.count - deckCount
      return {
        ...cd,
        count: remainingCount,
      }
    })

  // Ordenação personalizada para ordenar as cartas com base no poder e facção (neutras, clima e especiais são incluídas)
  cards.sort((a, b) => {
    const c1 = {
      name: a.name,
      basePower: -(a.strength || 0),
      faction: a.faction,
      isHero: a.ability.includes('hero'),
    }
    const c2 = {
      name: b.name,
      basePower: -(b.strength || 0),
      faction: b.faction,
      isHero: b.ability.includes('hero'),
    }
    return compareCardStrength(c1, c2)
  })

  return cards
}

export function compareCardStrength(
  a: { name: string; basePower: number; faction: string; isHero: boolean },
  b: { name: string; basePower: number; faction: string; isHero: boolean }
) {
  const rankA = factionRank(a.faction, a.isHero)
  const rankB = factionRank(b.faction, b.isHero)

  let dif = rankA - rankB
  if (dif !== 0) return dif
  dif = a.basePower - b.basePower
  if (dif !== 0) return dif
  return a.name.localeCompare(b.name)
}

function factionRank(f: string, isHero: boolean) {
  if (f === 'special') return -2
  if (f === 'weather') return -1
  if (isHero) return 0
  return 1
}

// Traduz uma coleção de cartas para objetos CardType.
export function translateCards(cards: number[][]): CardType[] {
  const cardMap = cards.map((c) => ({ id: c[0], count: c[1] }))

  const translatedCards: CardType[] = []
  cardMap.forEach((card) => {
    for (let i = 0; i < card.count; i++) {
      const foundCard = translateCard(card.id)
      if (foundCard) {
        translatedCards.push({ ...foundCard, count: 1 })
      }
    }
  })

  return translatedCards
}
// Traduz uma coleção de objetos CardType para um Dicionário.
export function reverseTranslateCards(cards: CardType[]): number[][] {
  const cardMap = cards.map((c) => c.id)

  const translatedCards: number[][] = []
  cardMap.forEach((id) => {
    const cardIndex = translatedCards.findIndex((el) => el[0] === id)
    if (cardIndex < 0) {
      translatedCards.push([id, 1])
    } else {
      translatedCards[cardIndex][1]++
    }
  })

  return translatedCards
}

// Traduz o ID da carta para um Object do type CardType (Json -> Object)
export function translateCard(id: number): CardType | null {
  const translatedCard = cardDictionary.find((dc) => dc.id === id)

  return translatedCard || null
}

// Traduz o id de uma carta para um valor do Dicionário (Object -> Json)
export function reverseTranslateCard(id: number): number[] | null {
  const dictionaryValue = cardDictionary.find((dc) => dc.id === id)
  const translatedCard = dictionaryValue?.id ? [dictionaryValue.id, 1] : null

  return translatedCard
}
