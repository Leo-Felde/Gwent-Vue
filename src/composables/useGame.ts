import { ref, nextTick } from 'vue'
import gsap from 'gsap'

import { useWebSocket } from './useWebSocket'

import { usePlayerStore } from '@/store/usePlayerStore'
import { CardType, specialAbilities, weatherTypes } from '@/types/card'
import { premadeDecks, removeCircularReferences } from '@/utils/utils'
import { Board, PlayerTypes } from '@/types/game'

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
      close: { cards: [], effects: [], special: [] },
      ranged: { cards: [], effects: [], special: [] },
      siege: { cards: [], effects: [], special: [] },
    }),
    opponent: ref<Board>({
      close: { cards: [], effects: [], special: [] },
      ranged: { cards: [], effects: [], special: [] },
      siege: { cards: [], effects: [], special: [] },
    }),
  })
  const boardEffects = ref<CardType[]>([])

  const selectedCard = ref<{ card: CardType; index: number } | null>(null)

  function initalize() {
    const defaultDeck = premadeDecks[0]

    playerMe.fillHand()
    playerOpponent.initializeDeck(defaultDeck)
    playerOpponent.fillHand()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function gameStart() {
    // após isso, aguarda o servidor enviar que o jogo está pronto para começar
    const startingPlayer = await coinToss()
    firstPlayer.value = startingPlayer
    currentPlayer.value = startingPlayer
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
            // passButton.classList.remove("hidden");
            // document.addEventListener('keydown', handleKeyDown);
            // document.addEventListener('keyup', handleKeyUp);
          } else {
            player = 'opponent'
          }
          firstPlayer.value = player
          currentPlayer.value = player

          socket.removeEventListener('message', handleMessage)
          // await ui.notification(game.firstPlayer.tag + '-coin', 1200)
          resolve(player)
        }
      }
      socket.addEventListener('message', handleMessage)
    })
  }

  async function initialRedraw() {
    // aqui vai precisar chamar o carousel de cartas e esperar o retorno dele
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

  function selectCard(card: CardType, index: number) {
    if (selectedCard.value?.index === index) clearSelectedCard
    else selectedCard.value = { card, index }
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
    player: PlayerTypes = 'player'
  ) {
    if (!card || !selectedCard.value || selectedCard.value.index < 0) return
    const isSpy = card.ability.includes('spy')
    const isSpecial = ['horn', 'mardroeme'].includes(card.ability) && !card.row
    const isPlayer = player === 'player'
    const board =
      boardRows.value[
        isSpy
          ? isPlayer
            ? 'opponent'
            : 'player'
          : isPlayer
            ? 'player'
            : 'opponent'
      ]
    const handElement = document.getElementById(`${player}-hand`) as HTMLElement

    if (selectedCard.value) selectedCard.value = null

    nextTick(() => {
      players[currentPlayer.value].removeCard(card)
      board[target][isSpecial ? 'special' : 'cards'].push(card)

      nextTick(async () => {
        const rowElement = document.querySelector(
          `.row-${target}${
            isSpy
              ? isPlayer
                ? '.row-opponent'
                : '.row-player'
              : isPlayer
                ? '.row-player'
                : '.row-opponent'
          }`
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
            addEffect(effect)
          })
        }
      })
    })
  }

  function addEffect(effect: string) {
    if (effect === 'decoy') return
    // A FAZER
    switch (effect) {
      case 'horn':
        //
        break
      case 'bond':
        //
        break
      case 'morale':
        //
        break
    }
  }

  async function playWeatherCard(
    card: CardType,
    player: PlayerTypes = 'player'
  ) {
    const weathers = ['clear', 'fog', 'rain', 'storm', 'frost']
    console.log('playWeatherCard', card)
    if (!weathers.includes(card.filename)) return

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
