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

    <!-- Opponent's Discard Pile and Deck -->
    <div id="opponent-deck" class="deck-area">
      <div class="discard-pile">
        <CardPile
          :cards="playerOpponent.discardPile"
          :cover="playerOpponent.faction"
          @click="showDiscardPile"
        />
      </div>
      <div class="deck">
        <CardPile
          :cards="playerOpponent.deck"
          :cover="playerOpponent.faction"
          count
          only-covers
        />
      </div>
    </div>

    <!-- Opponent's Board -->
    <div id="opponent-board" class="board">
      <div class="rows">
        <Row
          v-for="row in [...rows].reverse()"
          owner="opponent"
          :key="`opponent-${String(row)}-row`"
          :row="row"
          :data="boardRows.opponent[row]"
          :highlight="rowHighlightElem(row, 'opponent')"
          @row-click="(row) => selectRow(row)"
          @card-click="selectCard($event.card, $event.index, row)"
        />
      </div>
    </div>

    <!-- Board effects -->
    <div
      id="board-effects"
      :class="{ highlight: highlightEffects() }"
      @click="playWeatherCard(selectedCard?.card)"
    >
      <Card
        v-for="(card, index) in boardEffects"
        :key="`board-effect-${index}`"
        :card="card"
        class="my-auto"
      />
    </div>

    <!-- Preview of Selected Card -->
    <CardPreview
      v-if="selectedCard"
      :card="selectedCard.card"
      :align="selectedCard.isHand ? 'right' : 'center'"
      @close="clearSelectedCard"
    />

    <!-- Player's Board -->
    <div id="player-board" class="board">
      <div class="rows">
        <Row
          v-for="row in rows"
          owner="player"
          :key="`player-${String(row)}-row`"
          :row="row"
          :data="boardRows.player[row]"
          :highlight="rowHighlightElem(row, 'player')"
          @row-click="(row) => selectRow(row)"
          @card-click="selectCard($event.card, $event.index, row)"
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

    <!-- Player Discard Pile and Deck -->
    <div id="player-deck" class="deck-area">
      <div class="discard-pile">
        <CardPile
          :cards="playerMe.discardPile"
          :cover="playerMe.faction"
          @click="showDiscardPile"
        />
      </div>
      <div class="deck">
        <CardPile
          :cards="playerMe.deck"
          :cover="playerMe.faction"
          count
          only-covers
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

import { useGame } from '@/composables/useGame'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useCarousel } from '@/plugins/carouselPlugin'

import Card from '../components/Card.vue'
import Row from '../components/Row.vue'
import CardPile from '../components/CardPile.vue'
import CardPreview from '../components/CardPreview.vue'
import { Board } from '@/types/game'

const playerStore = usePlayerStore()
const playerMe = playerStore.players.player
const playerOpponent = playerStore.players.opponent

const {
  initalize,
  boardRows,
  boardEffects,
  selectedCard,
  clearSelectedCard,
  selectCard,
  playCardtoRow,
  playWeatherCard,
  simulateOponent,
} = useGame()

const rows = computed(() => ['close', 'ranged', 'siege'])

onBeforeMount(() => {
  initalize()
})

const rowHighlightElem = (
  row: string,
  player: 'player' | 'opponent'
): string | null => {
  if (!selectedCard.value || !selectedCard.value.isHand) return null

  const { card } = selectedCard.value
  if (
    player === 'player' &&
    !card.row &&
    ['horn', 'mardroeme'].includes(card.ability)
  ) {
    return 'special'
  }
  if (
    player === 'opponent' &&
    card.ability.includes('spy') &&
    card.row.includes(row)
  ) {
    return 'cards'
  }
  if (
    player === 'player' &&
    !card.ability.includes('spy') &&
    (card.row.includes(row) ||
      (card.row.includes('agile') && ['close', 'ranged'].includes(row)))
  ) {
    return 'cards'
  }
  return null
}

const highlightEffects = () => {
  if (!selectedCard.value || !selectedCard.value.isHand) return false
  return selectedCard.value.card.faction === 'weather'
}

const showDiscardPile = () => {
  if (playerMe.discardPile?.length <= 0) return

  useCarousel({
    cards: playerMe.discardPile,
    amount: 0,
    title: '',
  })
}

const selectRow = (row: string) => {
  if (!selectedCard.value || !selectedCard.value.isHand) return
  playCardtoRow(selectedCard.value.card, row as keyof Board)
}
</script>

<style lang="sass" scoped>
#game
  display: flex
  flex-direction: column
  align-items: center
  gap: 20px
  position: relative
  height: calc(100vw * 1080 / 1920)
  background-image: url('../assets/img/board.jpg')


.hand
  display: flex
  gap: 10px
  min-height: 100px
  left: 85px
  position: relative

.board
  width: 49.8%
  position: relative
  left: 82px

.rows
  display: flex
  flex-direction: column
  gap: 16px

.leader
  position: absolute
  left: 142px
  z-index: 10
  .card
    height: 127px
    width: 90px

#player-leader
  bottom: 114px

#opponent-leader
  top: 82px

.deck-area
  position: absolute
  display: flex
  gap: 20px

#player-deck
  bottom: 90px
  right: 85px

#opponent-deck
  top: 80px
  right: 85px

.discard-pile
  margin-right: 56px

.discard-pile, .deck
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px

#opponent-hand
  position: absolute
  top: -200px

#player-hand
  .card
    &:hover, &.selected
      transition: 0.1s transform ease-in-out
      transform: translateY(-16px)


#board-effects
  height: 168px
  position: absolute
  top: 40%
  left: 6.5%
  width: 304px
  pointer-events: none
  display: flex
  justify-content: center
  &.highlight
    pointer-events: all !important
    cursor: pointer !important

#opponent-board
  margin-top: 14px

#player-board
  margin-top: 10px

.card
  border: 2px solid transparent

:deep(.card-preview.align-right)
  .card.preview
    margin-left: 35%
</style>
