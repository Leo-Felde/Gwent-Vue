<template>
  <div id="game">
    <!-- Opponent's Hand -->
    <div id="opponent-hand" class="hand">
      <Card
        v-for="(card, index) in playerOpponent.hand"
        :key="card.id"
        :card="card"
        :class="{ selected: selectedCard?.card.id === card.id }"
        @click="selectCard(card, index)"
      />
    </div>
    <button @click="simulateOponent"> Simulate Opponent </button>

    <!-- Opponent's Board -->
    <div id="opponent-board" class="board">
      <div class="rows">
        <div v-for="row in [...rows].reverse()" :key="row"
          class="row row-opponent"
          :class="['row-' + row, { highlight: isRowHighlighted(row, 'opponent') }]"
          @click="playCard(selectedCard?.card, row)"
          >
          <div class="cards">
            <Card v-for="card in boardRows.opponent[row]" :key="card.id" :card="card" />
          </div>
        </div>
      </div>
    </div>

    <!-- Player's Board -->
    <div id="player-board" class="board">
      <div class="rows">
        <div v-for="row in rows" :key="row"
          class="row"
          @click="playCard(selectedCard?.card, row)"
          :class="['row-' + row, { highlight: isRowHighlighted(row, 'player') }]">
          <div class="cards">
            <Card v-for="card in boardRows.player[row]" :key="card.id" :card="card" />
          </div>
        </div>
      </div>
    </div>

    <!-- Player's Hand -->
    <div id="player-hand" class="hand">
      <Card
        v-for="(card, index) in playerMe.hand"
        :key="index"
        :card="card"
        :class="{ selected: selectedCard?.card.id === card.id && selectedCard?.index === index }"
        @click="selectCard(card, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { usePlayerStore } from '@/store/usePlayerStore'
import { useGame } from '@/composables/useGame'
import { RowType } from '@/types/game'

import Card from '../components/Card.vue'

const playerStore = usePlayerStore()
const playerMe = playerStore.players.player
const playerOpponent = playerStore.players.opponent

const {
  initalize, boardRows,
  selectedCard, selectCard,
  playCard, simulateOponent
} = useGame()

const rows = computed(() => ['close', 'ranged', 'siege'] as RowType[])

onMounted(() => {
  initalize()
})

function isRowHighlighted(row: RowType, player: 'player' | 'opponent') {
  if (!selectedCard.value) return false
  const { card } = selectedCard.value
  if (player === 'opponent' && card.ability.includes('spy') && card.row.includes(row)) {
    return true
  } else if (card.ability.includes('spy')) {
    return false
  }
  if (player === 'player' && (card.row.includes(row) || (card.row.includes('agile') && ['close', 'ranged'].includes(row)))) {
    return true
  }
  return false
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
  pointer-events: none

.row.highlight
  border-color: green
  pointer-events: all

.cards
  display: flex
  gap: 10px

#opponent-hand
  position: absolute
  top: -200px
</style>
