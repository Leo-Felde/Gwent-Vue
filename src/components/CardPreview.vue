<template>
  <div
    v-if="card"
    :class="`card-preview align-${align}`"
    v-click-outside="handleClickOutside"
  >
    <Card :card="card" type="preview" />
    <CardAbility :card="card" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'

import Card from './Card.vue'
import CardAbility from './CardAbility.vue'
import { CardType } from '@/types/card'

const emit = defineEmits(['close'])

const props = defineProps({
  card: {
    type: Object as PropType<CardType | null>,
    required: true,
  },
  align: {
    type: String,
    default: 'right',
  },
})

const handleClickOutside = () => {
  if (props.align === 'center') {
    emit('close')
  }
}
</script>

<style lang="sass" scoped>
.card-preview
  position: absolute
  top: 25%
  z-index: 90

.align
  &-right
    right: 10%
  &-center
    left: 50%
    right: 50%
  &-left
    left: 10%

.card-ability
  bottom: -30%
  left: -172px
</style>
