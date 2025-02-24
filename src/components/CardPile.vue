<template>
  <div class="card-pile" @click="$emit('click')">
    <div class="cover" v-if="cover" :style="coverStyle" />
    <div
      v-for="(card, index) in cards"
      :key="`deck-${card.id}`"
      class="card-wrapper"
      :style="getCardStyle(index)"
    >
      <Card :card="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from 'vue'
import Card from './Card.vue' // Import the Card component
import { CardType } from '@/types/card'

const props = defineProps({
  cards: {
    type: Array as () => CardType[],
    required: true,
  },
  cover: {
    type: String as PropType<string | null>,
    default: null,
  },
})

const stackOffset = ref<number>(0.3)

const coverStyle = computed(() => {
  const index = props.cards.length
  return {
    backgroundImage: `url(${require(`@/assets/img/card-lg/faction_${props.cover}.jpg`)})`,
    transform: `translate(${-index * stackOffset.value}px, ${-index * stackOffset.value}px)`,
    zIndex: index,
  }
})

const getCardStyle = (index: number) => {
  return {
    transform: `translate(${-index * stackOffset.value}px, ${-index * stackOffset.value}px)`,
    zIndex: index,
  }
}
</script>

<style lang="sass" scoped>
.card-pile
  position: relative;
  width: 100px
  height: 150px

.cover
  position: relative
  z-index: 99
  width: 95.4px
  height: 136.13px
  background: white
  border: 1px solid #9b8405
  border-radius: 6.5%
  cursor: pointer
  background-size: cover
  background-position: center

.card-wrapper
  position: absolute
  top: 0
  left: 0
  transition: transform 0.2s ease-in-out
  .card
    pointer-events: none
</style>
