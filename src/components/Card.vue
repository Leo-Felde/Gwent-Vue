<template>
  <div 
    class="card" 
    :class="[{'preview': isPreview}, { 'selected': isSelected }]"
    :style="cardBackground"
  >
    <div 
      v-if="!isPreview"
      class="card-power-icon" 
      :style="powerIconStyle"
    >
      <span 
        v-if="card.strength !== null"
        class="card-power-value" 
        :class="{'hero-power': isHeroPower}"
      >
        {{ card.strength }}
      </span>
    </div>
    <div 
      v-if="showRowIcon"
      class="row-icon"
      :style="rowIconStyle"
    ></div>
    <div 
      v-if="showAbilityIcon"
      class="ability-icon"
      :style="abilityIconStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { CardType } from '@/types/card'

const props = defineProps({
  card: {
    type: Object as PropType<CardType>,
    required: true
  },
  type: {
    type: String as PropType<'preview' | 'regular'>,
    default: 'regular'
  },
  isSelected: Boolean
})

const { card, type } = toRefs(props)

const SPECIAL_ABILITIES = new Set(['hero', 'decoy', 'scorch', 'mardroeme', 'fog', 'frost', 'rain', 'clear', 'horn', 'storm'])

// Computed properties
const isPreview = computed(() => type.value === 'preview')
const abilities = computed(() => card.value.ability.split(' '))
const lastAbility = computed(() => abilities.value[abilities.value.length - 1])
const isHeroPower = computed(() => abilities.value.includes('hero'))

// Image URLs
const cardBackground = computed(() => ({
  backgroundImage: isPreview.value ? largeImageUrl.value : smallImageUrl.value
}))

const largeImageUrl = computed(() => 
  `url(${require(`@/assets/img/card-lg/${card.value.faction}_${card.value.filename}.jpg`)})`
)

const smallImageUrl = computed(() =>
  `url(${require(`@/assets/img/card-sm/${card.value.faction}_${card.value.filename}.jpg`)})`
)

// Icon styles
const powerIconStyle = computed(() => {
  const ability = abilities.value[0]
  const useSpecial = SPECIAL_ABILITIES.has(ability) && !(ability === 'horn' && card.value.row)
  const icon = useSpecial ? `power_${ability}` : 'power_normal'
  return { backgroundImage: `url(${require(`@/assets/img/icon/${icon}.png`)})` }
})

const rowIconStyle = computed(() => ({
  backgroundImage: `url(${require(`@/assets/img/icon/card_row_${card.value.row}.png`)})`
}))

const abilityIconStyle = computed(() => {
  if (lastAbility.value && lastAbility.value !== 'hero') {
    return {
      backgroundImage: `url(${require(`@/assets/img/icon/card_ability_${lastAbility.value}.png`)})`
    }
  }
  return {} // Return an empty object if no valid ability is found
})

// Visibility flags
const showRowIcon = computed(() => !isPreview.value && card.value.row)
const showAbilityIcon = computed(() => 
  !isPreview.value && 
  abilities.value.length > 0 && 
  lastAbility.value !== 'hero' && 
  card.value.row
)
</script>

<style lang="sass" scoped>
.card
  $base-width: 95.4px
  $base-height: 136.13px
  
  position: relative
  width: $base-width
  height: $base-height
  background: white
  border: 1px solid #9b8405
  border-radius: 6.5%
  cursor: pointer
  background-size: cover
  background-position: center
  
  &.preview
    width: 211px
    height: 400px
  
  &.selected
    border: 2px solid yellow
    box-shadow: 0 0 10px yellow

  &-power-icon
    position: absolute
    top: -4%
    left: -4%
    width: 70%
    height: 50%
    background-size: contain
    background-position: 0 0
    background-repeat: no-repeat
    
    .card-power-value
      position: absolute
      left: 32%
      top: 30% 
      transform: translate(-50%, -50%)
      font-weight: bold
      font-size: 1.15rem
      text-align: center
      width: 100%

      &.hero-power
        color: white
        left: 31.5%
        transform: translate(-50%, -50%)

.row-icon
  position: absolute
  top: 75%
  left: 65%
  width: 33%
  height: 22%
  background-size: contain
  background-position: center
  background-repeat: no-repeat

.ability-icon
  position: absolute
  top: 75%
  left: 31%
  width: 33%
  height: 22%
  background-size: contain
  background-position: center
  background-repeat: no-repeat
</style>