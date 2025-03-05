<template>
  <div
    class="row"
    :class="[`row-${owner}`, `row-${row}`, { highlight: isHighlighted }]"
    @click="onRowClick"
  >
    <div class="effects">todo</div>
    <div class="cards">
      <Card v-for="card in cards" :key="`hand-${card.id}`" :card="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Card from './Card.vue'
import { CardType } from '@/types/card'

const props = defineProps({
  owner: {
    type: String,
    default: 'player',
  },
  row: {
    type: String,
    required: true,
  },
  cards: {
    type: Array as () => CardType[],
    required: true,
  },
  isHighlighted: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['row-click'])

function onRowClick() {
  emit('row-click', props.row)
}
</script>

<style lang="sass" scoped>
.row
  display: flex
  height: 119.5px
  cursor: pointer
  pointer-events: none

.row.highlight
  pointer-events: all
  background-color: #dbb64a2e

.effects
  width: 15%
  height: 100%

.cards
  display: flex
  width: 85%
  height: 100%
  gap: 4px
  display: flex
  justify-content: center
</style>
