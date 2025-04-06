import { ref, nextTick, inject } from 'vue'
import gsap from 'gsap'

import { useWebSocket } from './useWebSocket'

import { usePlayerStore } from '@/store/usePlayerStore'
import { CardType, specialAbilities, weatherTypes } from '@/types/card'
import { premadeDecks, removeCircularReferences } from '@/utils/utils'
import { Board, PlayerTypes } from '@/types/game'

const notification = inject('notification') as (
  type: string,
  duration?: number,
  messsage?: string
) => Promise<void>

const playerStore = usePlayerStore()
const players = playerStore.players
const playerMe =
  playerStore.players?.player || playerStore.createPlayer('player', 1)
const playerOpponent = playerStore.createPlayer('opponent', 2)

const firstPlayer = ref<string>('player')
const currentPlayer = ref<string>('player')

const { socket } = useWebSocket()

export function useGame() {
  const boardRows = ref({
    player: ref<Board>({
      close: { cards: [], effects: [], special: [], sum: 0 },
      ranged: { cards: [], effects: [], special: [], sum: 0 },
      siege: { cards: [], effects: [], special: [], sum: 0 },
    }),
    opponent: ref<Board>({
      close: { cards: [], effects: [], special: [], sum: 0 },
      ranged: { cards: [], effects: [], special: [], sum: 0 },
      siege: { cards: [], effects: [], special: [], sum: 0 },
    }),
  })
  const boardEffects = ref<CardType[]>([])

  const selectedCard = ref<{
    card: CardType
    index: number
    isHand: boolean
  } | null>(null)

  function initalize() {
    // defaultDeck apenas para debug, remover
    const defaultDeck = premadeDecks[0]

    playerMe.fillHand()
    playerOpponent.initializeDeck(defaultDeck)
    playerOpponent.fillHand()
    // gameStart()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function gameStart() {
    await coinToss()

    await notification(
      `${currentPlayer.value === 'player' ? 'me' : 'op'}-turn`,
      1200
    )

    await initialRedraw()
  }

  // Aguarda o cointoss no servidor
  async function coinToss(): Promise<string> {
    return new Promise((resolve) => {
      const handleMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data)

        if (data.type === 'coinToss') {
          let player
          if (data.player === playerMe.index) {
            player = 'player'
          } else {
            player = 'opponent'
          }
          firstPlayer.value = player
          currentPlayer.value = player

          socket.removeEventListener('message', handleMessage)
          resolve(player)
        }
      }
      socket.addEventListener('message', handleMessage)
    })
  }

  async function initialRedraw() {
    // aqui vai precisar chamar o carousel de cartas e esperar o retorno dele
    // vai precisar chamar o componente, não o plugin!
    socket.send(
      JSON.stringify({
        type: 'initial_reDraw',
        hand: removeCircularReferences(playerMe.hand),
        deck: removeCircularReferences(playerMe.deck),
      })
    )
  }

  // Inicio de um novo round
  function startRound() {
    // reseta a pontuação, mesa e estados
    // notifica qual jogador jogará
    currentPlayer.value =
      currentPlayer.value === 'player' ? 'opponent' : 'player'

    playerMe.passed = false
    playerOpponent.passed = false
  }

  // Passe simples, após jogar uma carta
  function pass() {
    // se o jogador não tem mais cartas, passa seu round
    if (!players[currentPlayer.value].hasCards()) passRound()

    currentPlayer.value =
      currentPlayer.value === 'player' ? 'opponent' : 'player'
  }

  // Termina o round do jogador
  function passRound() {
    players[currentPlayer.value].passed = true
    // notifica que o player passou o round

    if (playerMe.passed && playerOpponent.passed) endRound()
  }

  function endRound() {
    // acabou o round. armazena a pontuação de cada player
    // verifica se algum dos jogadores venceu senão decide qual jogará no prox. round

    if (playerMe.health === 0 || playerOpponent.health === 0) endGame()
    else startRound()
  }

  function endGame() {
    if (playerMe.health === 0) {
      // perdeu
    } else {
      // ganhou
    }

    // demais lógica
  }

  function clearSelectedCard() {
    selectedCard.value = null
  }

  function selectCard(
    card: CardType,
    index: number,
    row: keyof Board | null = null
  ) {
    if (selectedCard.value?.card) {
      if (selectedCard.value.index === index) {
        clearSelectedCard()
      } else if (selectedCard.value.card.ability === 'decoy' && row !== null) {
        playDecoytoRow(card, row, index)
        return
      }
    }

    selectedCard.value = { card, index, isHand: row === null }
  }

  async function animateCard(
    startElement: HTMLElement | null,
    endElement: HTMLElement | null
  ) {
    if (!startElement || !endElement) return

    const startBox = startElement.getBoundingClientRect()
    const endBox = endElement.getBoundingClientRect()
    await gsap.fromTo(
      endElement,
      { x: startBox.x - endBox.x, y: startBox.y - endBox.y, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }

  async function playCardtoRow(
    card: CardType | null,
    target: keyof Board,
    player: PlayerTypes = 'player',
    replaceIndex: number | null = null
  ) {
    if (!card || !selectedCard.value || selectedCard.value.index < 0) return
    const isSpy = card.ability.includes('spy')
    const isSpecial = ['horn', 'mardroeme'].includes(card.ability) && !card.row
    const playerTarget = isSpy
      ? player === 'player'
        ? 'opponent'
        : 'player'
      : player
    const board = boardRows.value[playerTarget]
    const handElement = document.getElementById(`${player}-hand`) as HTMLElement

    if (selectedCard.value) selectedCard.value = null

    nextTick(() => {
      players[currentPlayer.value].removeCard(card)

      if (replaceIndex !== null) {
        board[target][isSpecial ? 'special' : 'cards'].splice(
          replaceIndex,
          1,
          card
        )
      } else {
        board[target][isSpecial ? 'special' : 'cards'].push(card)
      }

      nextTick(async () => {
        const rowElement = document.querySelector(
          `.row-${target}.row-${playerTarget}`
        ) as HTMLElement
        const boardCardElement = rowElement.querySelector(
          isSpecial ? '.special > *:last-child' : '.cards > *:last-child'
        ) as HTMLElement | null
        await animateCard(handElement, boardCardElement)

        const cardEffects = card.ability
          .split(' ')
          .filter((ability) => specialAbilities.has(ability))
        if (cardEffects) {
          cardEffects.forEach((effect) => {
            board[target].effects.push(effect)
          })
        }
        runEffects(
          isSpy ? (player === 'player' ? 'opponent' : 'player') : 'player',
          target
        )
      })
    })
  }

  async function playDecoytoRow(
    card: CardType,
    target: keyof Board,
    index: number
  ) {
    if (!selectedCard.value) return
    const replacedCard = boardRows.value.player[target].cards[index]
    const targetRow = document.querySelector(
      `.row-${target}.row-player`
    ) as HTMLElement
    const handIndex = playerMe.hand.findIndex(
      (hc) => selectedCard.value && hc.id === selectedCard.value.card.id
    )

    if (!replacedCard || !targetRow || !handIndex) return

    playCardtoRow(selectedCard.value.card, target, 'player', index)
    playerMe.hand.splice(handIndex, 1, card)
    const handElement = document.getElementById('player-hand')
    if (!handElement) return

    selectedCard.value = null

    const handCardElement = handElement.querySelector(
      `.card:nth-child(${handIndex + 1})`
    ) as HTMLElement
    nextTick(() => {
      animateCard(targetRow, handCardElement)
    })
    return
  }

  async function playWeatherCard(
    card: CardType,
    player: PlayerTypes = 'player'
  ) {
    if (!weatherTypes.has(card.filename)) return

    const weather = card.filename

    players[currentPlayer.value].removeCard(card)

    boardEffects.value.push(card)
    if (selectedCard.value) selectedCard.value = null

    nextTick(async () => {
      const handElement = document.getElementById(
        `${player}-hand`
      ) as HTMLElement
      const effectsElement = document.getElementById(
        'board-effects'
      ) as HTMLElement
      const boardCardElement = effectsElement.querySelector(
        '.card:last-child'
      ) as HTMLElement | null

      await animateCard(handElement, boardCardElement)
      // remove efeitos duplicados
      if (weather === 'clear') {
        boardEffects.value = []
      } else {
        boardEffects.value = boardEffects.value.reduce(
          (acc: CardType[], card: CardType) => {
            if (!acc.some((c: CardType) => c.filename === card.filename)) {
              acc.push(card)
            }
            return acc
          },
          []
        )
      }
    })
    ;(Object.keys(boardRows.value) as Array<'player' | 'opponent'>).forEach(
      (player) => {
        const affectedRows: (keyof Board)[] = []

        if (weather !== 'clear') {
          if (weather === 'fog' || weather === 'storm') {
            affectedRows.push('ranged')
          } else if (weather === 'rain' || weather === 'storm') {
            affectedRows.push('siege')
          } else {
            affectedRows.push('close')
          }

          affectedRows.forEach((row) => {
            if (
              !boardRows.value[player][row as keyof Board].effects.includes(
                weather
              )
            )
              boardRows.value[player][row as keyof Board].effects.push(weather)
          })
        } else {
          ;(Object.keys(boardRows.value[player]) as (keyof Board)[]).forEach(
            (row) => {
              const effectIndexOfWeather =
                boardRows.value[player][row].effects.indexOf(weather)
              if (effectIndexOfWeather >= 0) {
                boardRows.value[player][row].effects.splice(
                  effectIndexOfWeather,
                  1
                )
              }
            }
          )
        }
      }
    )
  }

  function runEffects(player: 'player' | 'opponent', row: keyof Board) {
    const playerRow = boardRows.value[player][row]

    let sum = 0
    playerRow.cards.forEach((card: CardType) => {
      sum += card.strength || 0
    })

    playerRow.sum = sum
  }

  function simulateOponent() {
    const card = playerOpponent.hand[0]
    if (card) playCardtoRow(card, card.row as keyof Board, 'opponent')
  }

  return {
    initalize,
    boardRows,
    boardEffects,
    selectedCard,
    clearSelectedCard,
    selectCard,
    playCardtoRow,
    playWeatherCard,
    simulateOponent,
  }
}
