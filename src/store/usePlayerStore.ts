import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { CardType, PremadeDeckType } from '@/types/card'
import { translateCards, translateCard } from '@/utils/cards'

// Define player instance interface
interface PlayerInstance {
  index: number
  health: number
  passed: boolean
  hand: CardType[]
  discardPile: CardType[]
  deck: CardType[]
  faction: string | null
  leader: CardType | null
  leaderAvaliable: boolean
  initializeDeck: (initialDeck: PremadeDeckType) => void
  fillHand: () => void
  shuffleDeck: () => void
  drawCard: () => void
  hasCards: () => boolean
  removeCard: (card: CardType) => void
}

export const usePlayerStore = defineStore('player', () => {
  const players = reactive<Record<string, PlayerInstance>>({})

  const createPlayer = (index: number): PlayerInstance => {
    const state = {
      index: ref(index),
      health: ref(2),
      passed: ref(false),
      hand: ref<CardType[]>([]),
      discardPile: ref<CardType[]>([]),
      deck: ref<CardType[]>([]),
      faction: ref<string>('realms'),
      leader: ref<CardType | null>(null),
      leaderAvaliable: ref(false),
    }

    const methods = {
      initializeDeck(initialDeck: PremadeDeckType) {
        if (
          initialDeck.cards.length === 0 ||
          !initialDeck.leader ||
          !initialDeck.faction
        )
          return
        state.faction.value = initialDeck.faction
        state.leader.value = translateCard(initialDeck.leader)
        state.deck.value.splice(
          0,
          state.deck.value.length,
          ...translateCards(initialDeck.cards)
        )
      },

      fillHand() {
        if (state.deck.value.length < 10) return

        const handCards = []
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(
            Math.random() * state.deck.value.length
          )
          const [removedElement] = state.deck.value.splice(randomIndex, 1)
          handCards.push(removedElement)
        }
        state.hand.value.splice(0, state.hand.value.length, ...handCards)
      },

      shuffleDeck() {
        let currentIndex = state.deck.value.length
        let randomIndex = 0
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--
          ;[state.deck.value[currentIndex], state.deck.value[randomIndex]] = [
            state.deck.value[randomIndex],
            state.deck.value[currentIndex],
          ]
        }
      },

      drawCard(): CardType | null {
        if (state.deck.value.length === 0) return null

        const card = state.deck.value.shift()
        return card || null
      },

      removeCard(card: CardType) {
        const index = state.hand.value.findIndex((c) => c.id === card.id)
        state.hand.value.splice(index, 1)
      },

      hasCards(): boolean {
        let canPlay = 2

        if (state.hand.value.length === 0) canPlay--
        if (state.leaderAvaliable.value) canPlay--

        return !!canPlay
      },
    }

    return reactive({
      ...state,
      ...methods,
    }) as PlayerInstance
  }

  // Public store methods
  return {
    players,
    createPlayer: (id: string, index: number) => {
      players[id] = createPlayer(index)
      return players[id]
    },
    getPlayer: (id: string) => players[id],
  }
})
