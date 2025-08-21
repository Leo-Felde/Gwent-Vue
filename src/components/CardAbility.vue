<template>
  <div
    class="card-ability"
    v-if="cardAbility"
    :style="`opacity: ${playingAnimation ? 0 : 1};`"
    @click.stop=""
  >
    <img
      :src="iconPath"
      alt="Ability icon"
      class="icon"
      v-if="showAbilityIcon"
    />
    <h3 :style="showAbilityIcon ? 'margin-left: 40px' : ''">
      {{ cardAbility.name || 'Leader Ability' }}
    </h3>
    <span>
      {{ cardAbility.description }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { abilityMeta, CardType } from '@/types/card'

export default defineComponent({
  name: 'CardAbility',

  props: {
    card: {
      type: Object as PropType<CardType>,
      required: true,
    },
    playingAnimation: Boolean,
  },

  setup(props) {
    const cardAbility = computed(() => {
      const abilityKey =
        props.card.ability?.filter((a) => a !== 'hero')[0] ?? []
      return abilityMeta[abilityKey as keyof typeof abilityMeta] || null
    })

    const showAbilityIcon = computed(() => {
      return props.card.row !== 'leader'
    })

    const iconPath = computed(() => {
      const abilityKey =
        props.card.ability?.filter((a) => a !== 'hero')[0] ?? []
      return require(
        `@/assets/img/icon/card_ability_${abilityKey || 'decoy'}.png`
      )
    })

    return {
      cardAbility,
      showAbilityIcon,
      iconPath,
    }
  },
})
</script>

<style lang="sass" scoped>
.card-ability
  position: absolute
  background: rgba(11, 11, 11, 0.81)
  bottom: 5%
  padding: 10px 20px 10px 20px
  height: 120px
  width: 550px
  color: tan
  transition: opacity 0.5s ease-in-out
  border: 1px solid #ffffff57
  border-left: none
  border-right: none
  text-align: center
  .icon
    height: 40px
    position: absolute
    left: 15px
  h3
    margin-top: 10px
</style>
