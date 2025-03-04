<template>
  <div
    class="card-pile"
    @click="$emit('click')"
    :class="{ clickable: !!$attrs.onClick && cards.length > 0 }"
  >
    <div v-if="onlyCovers">
      <div
        v-for="(card, index) in cards"
        :key="`pile-cover-${index}`"
        :style="getCardStyle(index, true)"
        class="card-wrapper card-cover"
      />
    </div>
    <div v-else>
      <div
        v-for="(card, index) in cards"
        :key="`pile-${card.id}`"
        class="card-wrapper"
        :style="getCardStyle(index)"
      >
        <Card :card="card" v-if="index === cards.length - 1" />
        <div v-else class="card-cover" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from 'vue'
import Card from './Card.vue' // Import the Card component
import { CardType } from '@/types/card'

const props = defineProps({
  cards: {
    type: Array as () => CardType[],
    required: true,
  },
  cover: {
    type: String as PropType<string | null>,
    required: true,
  },
  onlyCovers: Boolean,
})

const stackOffset = ref<number>(0.3)
const getCardStyle = (index: number, cover = false) => {
  return {
    backgroundImage: cover
      ? `url(${require(`@/assets/img/card-lg/faction_${props.cover}.jpg`)})`
      : 'initial',
    transform: `translate(${-index * stackOffset.value}px, ${-index * stackOffset.value}px)`,
    zIndex: index,
  }
}
</script>

<style lang="sass" scoped>
.card-pile
  position: relative
  width: 100px
  height: 150px

.card-wrapper
  position: absolute
  top: 0
  left: 0
  transition: transform 0.2s ease-in-out
  height: 0px
  width: 0px
  .card
    pointer-events: none
    height: 150px
    width: 100px

.card-cover
  height: 150px
  width: 100px
  background-size: contain
  border-right: 1px solid #9d9d9d
  border-bottom: 1px solid #9d9d9d
  border-radius: 6.5%
</style>
