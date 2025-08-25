<template>
  <div
    class="card-pile"
    :class="{ clickable: $attrs.onClick !== undefined && cards.length > 0 }"
    @click="$emit('click')"
  >
    <div v-if="onlyCovers">
      <div
        v-for="(card, index) in cards"
        :key="`pile-cover-${index}`"
        :style="getCoverStyle(index, index !== cards.length - 1)"
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
        <div class="card-cover" v-else />
      </div>
    </div>
    <div v-show="cards.length > 0" class="pile-counter" v-if="count">
      {{ cards.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from 'vue'
import Card from './Card.vue'
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
  count: Boolean,
})
defineEmits(['click'])

const stackOffset = ref<number>(0.3)
const getCardStyle = (index: number) => {
  return {
    transform: `translate(${-index * stackOffset.value}px, ${-index * stackOffset.value}px)`,
    zIndex: index,
  }
}

const getCoverStyle = (index: number, hideBckg = false) => {
  return {
    backgroundImage: hideBckg
      ? 'none'
      : `url(${require(`@/assets/img/card-lg/faction_${props.cover}.jpg`)})`,
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
    height: 127px
    width: 90px
.card-cover
  height: 127px
  width: 90px
  background-size: contain
  border-right: 1px solid #9d9d9d
  border-bottom: 1px solid #9d9d9d
  border-radius: 6.5%

.pile-counter
  position: absolute
  z-index: 999
  bottom: 18%
  left: 15%
  background: #000000a0
  padding: 4px 12px 4px 12px
  font-size: 1.2rem
  color: tan
</style>
