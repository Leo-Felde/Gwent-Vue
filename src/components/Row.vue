<template>
  <div
    class="row"
    :class="[`row-${owner}`, `row-${row}`, { highlight: isHighlighted }]"
    @click="onRowClick"
  >
    <div class="cards">
      <Card v-for="card in cards" :key="`hand-${card.id}`" :card="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Card from './Card.vue'
import { RowType } from '@/types/game'
import { CardType } from '@/types/card'

const props = defineProps({
  owner: {
    type: String,
    default: 'player'
  },
  row: {
    type: String as () => RowType,
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

<style scoped>
.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #aaa;
  padding: 10px;
  min-height: 100px;
  cursor: pointer;
  pointer-events: none;
}

.row.highlight {
  border-color: green;
  pointer-events: all;
}

.cards {
  display: flex;
  gap: 10px;
}
</style>