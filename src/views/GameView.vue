<template>
  <div id="game">
    <!-- Opponent's Leader Card -->
    <div id="opponent-leader" class="leader">
      <Card v-if="playerOpponent.leader" :card="playerOpponent.leader" />
    </div>

    <!-- Opponent's Hand  /// Hidden element -->
    <div id="opponent-hand" class="hand">
      <Card
        v-for="(card, index) in playerOpponent.hand"
        :key="`opponent-hand-card-${index}`"
        :card="card"
        :class="{ selected: selectedCard?.card.id === card.id }"
        @click="selectCard(card, index)"
      />
    </div>
    <button @click="simulateOponent">Simulate Opponent</button>

    <!-- Opponent's Board -->
    <div id="opponent-board" class="board">
      <div class="rows">
        <Row
          v-for="row in [...rows].reverse()"
          owner="opponent"
          :key="`opponent-${String(row)}-row`"
          :row="row"
          :cards="boardRows.opponent[row].cards"
          :is-highlighted="isRowHighlighted(row, 'opponent')"
          @row-click="(row) => playCard(selectedCard?.card, row)"
        />
      </div>
    </div>

    <!-- Player's Board -->
    <div id="player-board" class="board">
      <div class="rows">
        <Row
          v-for="row in rows"
          owner="player"
          :key="`player-${String(row)}-row`"
          :row="row"
          :cards="boardRows.player[row].cards"
          :is-highlighted="isRowHighlighted(row, 'player')"
          @row-click="(row) => playCard(selectedCard?.card, row)"
        />
      </div>
    </div>

    <!-- Player's Hand -->
    <div id="player-hand" class="hand">
      <Card
        v-for="(card, index) in playerMe.hand"
        :key="`player-hand-card-${index}`"
        :card="card"
        :class="{
          selected:
            selectedCard?.card.id === card.id && selectedCard?.index === index,
        }"
        @click="selectCard(card, index)"
      />
    </div>

    <!-- Player's Leader Card -->
    <div id="player-leader" class="leader">
      <Card v-if="playerMe.leader" :card="playerMe.leader" />
    </div>

    <!-- Discard Pile and Deck -->
    <div id="player-deck" class="deck-area">
      <div class="discard-pile">
        <h3>Discard Pile</h3>
        <CardPile
          :cards="playerMe.discardPile"
          :cover="playerMe.faction"
          @click="showDiscardPile"
        />
      </div>
      <div class="deck">
        <h3>Deck</h3>
        <CardPile
          :cards="playerMe.deck"
          :cover="playerMe.faction"
          only-covers
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useGame } from '@/composables/useGame'
import Card from '../components/Card.vue'
import Row from '../components/Row.vue'
import CardPile from '../components/CardPile.vue' // Import the CardPile component
import { useCarousel } from '@/plugins/carouselPlugin'

const playerStore = usePlayerStore()
const playerMe = playerStore.players.player
const playerOpponent = playerStore.players.opponent

const {
  initalize,
  boardRows,
  selectedCard,
  selectCard,
  playCard,
  simulateOponent,
} = useGame()

const rows = computed(() => ['close', 'ranged', 'siege'])

onBeforeMount(() => {
  initalize()
})

const isRowHighlighted = (row: string, player: 'player' | 'opponent') => {
  if (!selectedCard.value) return false
  const { card } = selectedCard.value
  if (
    player === 'opponent' &&
    card.ability.includes('spy') &&
    card.row.includes(row)
  ) {
    return true
  } else if (card.ability.includes('spy')) {
    return false
  }
  if (
    player === 'player' &&
    (card.row.includes(row) ||
      (card.row.includes('agile') && ['close', 'ranged'].includes(row)))
  ) {
    return true
  }
  return false
}

const showDiscardPile = () => {
  console.log(playerMe.discardPile?.length)
  if (playerMe.discardPile?.length <= 0) return

  useCarousel({
    cards: playerMe.discardPile,
    amount: 0,
    title: '',
  })
}
</script>

<style lang="sass" scoped>
#game
  display: flex
  flex-direction: column
  align-items: center
  gap: 20px
  position: relative

.hand
  display: flex
  gap: 10px
  min-height: 100px

.board
  width: 70%

.rows
  display: flex
  flex-direction: column
  gap: 10px

.leader
  position: absolute
  top: 0
  left: 0
  z-index: 10

#player-leader
  top: auto
  bottom: 0

.deck-area
  position: absolute
  bottom: 0
  right: 0
  display: flex
  gap: 20px

.discard-pile, .deck
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px

#opponent-hand
  position: absolute
  top: -200px
</style>
