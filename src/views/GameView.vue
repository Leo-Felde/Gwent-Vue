<template>
  <div id="game">
    <div id="opponent-hand" class="hand">
      <Card
        v-for="card in oponentHand"
        :key="card.id"
        :card="card"
        :class="{ selected: selectedCard?.id === card.id }"
        @click="selectCard(card)"
      />
    </div>
    <button @click="simulateOponent"> Simulate Oponent </button>


    <div id="opponent-board" class="board">
      <div class="rows">
        <div
          v-for="row in ['close', 'ranged', 'siege']"
          :key="row"
          class="row row-opponent"
          :class="`row-${row}`"
        >
          <h4>{{ row }}</h4>
          <div class="cards">
            <Card v-for="card in opponentBoard[row]" :key="card.id" :card="card" />
          </div>
        </div>
      </div>
    </div>


    <div id="player-board" class="board">
      <div class="rows">
        <div
          v-for="row in ['close', 'ranged', 'siege']"
          :key="row"
          class="row"
          @click="playCard(selectedCard, row)"
          :class="['row-' + row, { highlight: selectedCard && selectedCard.row.includes(row) }]"
        >
          <h4>{{ row }}</h4>
          <div class="cards">
            <Card v-for="card in playerBoard[row]" :key="card.id" :card="card" />
          </div>
        </div>
      </div>
    </div>
    <!-- Your Hand -->
    <div id="player-hand" class="hand">
      <Card
        v-for="card in playerHand"
        :key="card.id"
        :card="card"
        :class="{ selected: selectedCard?.id === card.id }"
        @click="selectCard(card)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { CardType } from '@/types/card'

import gsap from 'gsap'
import Card from '../components/Card.vue'

const playerHand = ref<CardType[]>([
  {
    name: 'Blue Stripes Commando',
    id: 29,
    deck: 'realms',
    row: 'close',
    strength: '4',
    ability: 'bond',
    filename: 'blue_stripes',
    count: 3
  },
  {
    name: 'Yennefer of Vengerberg',
    id: 16,
    deck: 'neutral',
    row: 'ranged',
    strength: '7',
    ability: 'hero medic',
    filename: 'yennefer',
    count: 1
  },
  {
    name: 'Ballista',
    id: 28,
    deck: 'realms',
    row: 'siege',
    strength: '6',
    ability: '',
    filename: 'ballista',
    count: 1
  }
])

const oponentHand = ref<CardType[]>([
  {
    name: 'Blue Stripes Commando',
    id: 29,
    deck: 'realms',
    row: 'close',
    strength: '4',
    ability: 'bond',
    filename: 'blue_stripes',
    count: 3
  },
  {
    name: 'Yennefer of Vengerberg',
    id: 16,
    deck: 'neutral',
    row: 'ranged',
    strength: '7',
    ability: 'hero medic',
    filename: 'yennefer',
    count: 1
  },
  {
    name: 'Ballista',
    id: 28,
    deck: 'realms',
    row: 'siege',
    strength: '6',
    ability: '',
    filename: 'ballista',
    count: 1
  }
])

// Player's board setup
const playerBoard = ref<Record<string, CardType[]>>({
  close: [],
  ranged: [],
  siege: []
})

// Opponent's board setup
const opponentBoard = ref<Record<string, CardType[]>>({
  close: [],
  ranged: [],
  siege: []
})

const selectedCard = ref<CardType | null>(null)

function selectCard(card: CardType) {
  selectedCard.value = card
}

// Function to play a card
function playCard(card: CardType, row: string, player: 'player' | 'opponent' = 'player') {
  if (!card|| !row || !card.row.includes(row)) return
  const playerIsMe = player === 'player'

  const board = playerIsMe ? playerBoard.value : opponentBoard.value
  const handCardElement = document.getElementById(`${player}-hand`) as HTMLElement
  const startBox = handCardElement?.getBoundingClientRect()
  
  if (selectedCard.value)
    selectedCard.value = null

  nextTick(() => {
    board[row].push(card)
    if (playerIsMe)
      playerHand.value = playerHand.value.filter(c => c.id !== card.id)
    else
      oponentHand.value = oponentHand.value.filter(c => c.id !== card.id)

    nextTick(() => {
      const rowElement = document.querySelector(`.row-${row}${playerIsMe ? ':not(.row-opponent)' : '.row-opponent'}`) as HTMLElement
      const boardCardElement = Array.from(rowElement.querySelectorAll('.cards > *')).pop() as HTMLElement | null
      const endBox = boardCardElement?.getBoundingClientRect()
      if (startBox && endBox) {
        gsap.fromTo(
          boardCardElement,
          { x: startBox.x - endBox.x, y: startBox.y - endBox.y, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        )
      }
    })
  })
}

function simulateOponent() {
  const card = oponentHand.value[0]
  const row = card?.row

  playCard(card, row, 'opponent')
}
</script>

<style lang="sass" scoped>
#game
  display: flex
  flex-direction: column
  align-items: center
  gap: 20px

.hand
  display: flex
  gap: 10px
  min-height: 100px

.board
  width: 80%

.rows
  display: flex
  flex-direction: column
  gap: 10px

.row
  display: flex
  flex-direction: column
  align-items: center
  border: 2px dashed #aaa
  padding: 10px
  min-height: 100px
  cursor: pointer

.row.highlight
  border-color: green

.cards
  display: flex
  gap: 10px

#opponent-hand
  position: absolute
  top: -200px
</style>
