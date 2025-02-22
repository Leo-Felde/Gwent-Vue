import { ref, nextTick } from 'vue'
import gsap from 'gsap'

import { CardType } from '@/types/card'
import { usePlayerStore } from '@/store/usePlayerStore'
import { premadeDecks } from '@/utils/utils'
import { PlayerTypes, RowType } from '@/types/game'

const playerStore = usePlayerStore()
const playerMe = playerStore.createPlayer('player')
const playerOpponent = playerStore.createPlayer('opponent')

export function useGame() {
  interface Board {
    close: CardType[];
    ranged: CardType[];
    siege: CardType[];
  }

  const boardRows = ref({
    player: ref<Board>({ close: [], ranged: [], siege: [] }),
    opponent: ref<Board>({ close: [], ranged: [], siege: [] })
  })

  const selectedCard = ref<{ card: CardType, index: number } | null>(null)

  function initalize () {
    const defaultDeck = premadeDecks[0]

    playerMe.initializeDeck(defaultDeck)
    playerOpponent.initializeDeck(defaultDeck)
    console.log(playerMe)
  }

  function selectCard(card: CardType, index: number) {
    selectedCard.value = { card, index }
  }

  function animateCard(startElement: HTMLElement | null, endElement: HTMLElement | null) {
    if (!startElement || !endElement) return
    const startBox = startElement.getBoundingClientRect()
    const endBox = endElement.getBoundingClientRect()
    gsap.fromTo(endElement, { x: startBox.x - endBox.x, y: startBox.y - endBox.y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
  }

  function playCard(card: CardType | null, row: RowType, player: PlayerTypes = 'player') {
    console.log('playCard', card)
    if (!card || !row) return
    const isSpy = card.ability.includes('spy')
    const isPlayer = player === 'player'
    const board = boardRows.value[isSpy ? isPlayer ? 'opponent' : 'player' : isPlayer ? 'player' : 'opponent']
    const handElement = document.getElementById(`${player}-hand`) as HTMLElement

    if (selectedCard.value)
      selectedCard.value = null

    nextTick(() => {
      board[row].push(card)
      if (isPlayer) {
        playerMe.removeCard(card)
      } else {
        playerOpponent.removeCard(card)
      }

      nextTick(() => {
        const rowElement = document.querySelector(
          `.row-${row}${
            isSpy ? (isPlayer ? '.row-opponent' : ':not(.row-opponent)') : (isPlayer ? ':not(.row-opponent)' : '.row-opponent')
          }`
        ) as HTMLElement
        const boardCardElement = Array.from(rowElement.querySelectorAll('.cards > *')).pop() as HTMLElement | null
        animateCard(handElement, boardCardElement)
      })
    })
      
    
  }

  function simulateOponent() {
    const card = playerOpponent.hand[0]
    if (card) playCard(card, card.row as RowType, 'opponent')
  }

  return {
    initalize, boardRows,
    selectedCard, selectCard,
    playCard, simulateOponent
  }
}
