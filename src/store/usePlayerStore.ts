// player-store.ts
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { CardType, PremadeDeckType } from '@/types/card'
import { translateCardsFromDictionary, translateLeaderCard } from '@/utils/cards'

// Define player instance interface
interface PlayerInstance {
  hand: CardType[]
  discardPile: CardType[]
  deck: CardType[]
  faction: string | null
  leader: CardType | null
  initializeDeck: (initialDeck: PremadeDeckType) => void
  shuffleDeck: () => void
  drawCard: () => void
  removeCard: (card: CardType) => void
}

export const usePlayerStore = defineStore('player', () => {
  const players = reactive<Record<string, PlayerInstance>>({})

  // In createPlayer function
  const createPlayer = (): PlayerInstance => {
    const state = reactive({
      hand: ref<CardType[]>([]),
      discardPile: ref<CardType[]>([]),
      deck: ref<CardType[]>([]),
      faction: ref<string | null>(null),
      leader: ref<CardType | null>(null),
    })

    // ... rest of the methods

    // Methods for each player
    const methods = {
      initializeDeck(initialDeck: PremadeDeckType) {
        if (initialDeck.cards.length === 0 || !initialDeck.leader || !initialDeck.faction) return 
        state.faction = initialDeck.faction
        state.leader = translateLeaderCard(initialDeck.leader)
        state.deck.splice(0, state.deck.length, ...translateCardsFromDictionary(initialDeck.cards))
        this.fillHand()
      },

      fillHand() {
        if (state.deck.length < 10) return
        
        const handCards = []
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * state.deck.length)
          const [removedElement] = state.deck.splice(randomIndex, 1)
          handCards.push(removedElement)
        }
        state.hand.splice(0, state.hand.length, ...handCards)
      },

      shuffleDeck() {
        let currentIndex = state.deck.length
        let randomIndex = 0
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--;
          [state.deck[currentIndex], state.deck[randomIndex]] = 
            [state.deck[randomIndex], state.deck[currentIndex]]
        }
      },

      drawCard() {
        if (state.deck.length === 0) return
        const card = state.deck.shift()!
        state.hand.push(card)
      },

      removeCard(card: CardType) {
        const index = state.hand.findIndex(c => c.id === card.id)
        state.hand.splice(index, 1)
      },
    }

    return reactive({
      ...state,
      ...methods
    }) as PlayerInstance
  }

  // Public store methods
  return {
    players,
    createPlayer: (id: string) => {
      players[id] = createPlayer()
      return players[id]
    },
    getPlayer: (id: string) => players[id],
  }
})