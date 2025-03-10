<template>
  <div
    class="row"
    :class="[`row-${owner}`, `row-${row}`, { highlight: highlight }]"
    @click="onRowClick"
  >
    <div class="special" :class="{ highlight: highlight === 'special' }">
      <Card
        v-for="(card, index) in data.special"
        :key="`${card.id}-special-${index}`"
        :card="card"
      />
    </div>
    <div class="cards" :class="{ highlight: highlight === 'cards' }">
      <Card
        v-for="(card, index) in data.cards"
        :key="`${card.id}-card-${index}`"
        :card="card"
        @click.stop.prevent="$emit('card-click', card)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Card from './Card.vue'
import { RowType } from '@/types/game'

const props = defineProps({
  owner: {
    type: String,
    default: 'player',
  },
  row: {
    type: String,
    required: true,
  },
  data: {
    type: Object as () => RowType,
    required: true,
  },
  highlight: {
    type: [String, null],
    default: null,
  },
})

const emit = defineEmits(['row-click', 'card-click'])

function onRowClick() {
  emit('row-click', props.row)
}
</script>

<style lang="sass" scoped>
.row
  display: flex
  height: 119.5px
  background-color: transparent !important
  &.highlight
    cursor: pointer

.special
  width: 15%
  height: 100%
  justify-content: center
  display: flex

.cards
  display: flex
  width: 85%
  height: 100%
  gap: 4px
  display: flex
  justify-content: center
  &.highlight
    .card
      pointer-events: none
</style>
