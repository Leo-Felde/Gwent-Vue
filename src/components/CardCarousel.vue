<template>
  <div v-if="show" class="carousel-overlay" @click="onOverlayClick">
    <div v-if="title" class="carousel-title" @click.stop="">
      <span>{{ title }}</span>
    </div>
    <div class="carousel">
      <div
        v-for="(card, index) in cards"
        :key="`carousel-card-${index}`"
        :class="['carousel-item', { 'center-card': index === focusedIndex }]"
        :style="getCardStyle(index)"
        @click.stop="onCardClick(index)"
      >
        <Card
          :card="card"
          :isSelected="index === focusedIndex"
          type="preview"
        />
      </div>
    </div>
    <div
      class="carousel-ability"
      v-show="focusedCardAbility !== null"
      :style="`opacity: ${playingAnimation ? 0 : 1};`"
      @click.stop=""
    >
      <img
        :src="iconPath"
        alt="Ability icon"
        class="icon"
        v-if="showAbilityIcon"
      />
      <h3>
        {{ focusedCardAbility?.name || 'Leader Ability' }}
      </h3>
      <span v-if="focusedCardAbility">
        {{ focusedCardAbility.description }}
      </span>
    </div>
    <Card
      v-if="replacementCard"
      :card="replacementCard"
      type="preview"
      class="replacement-card"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { ability_dict } from '@/types/card'
import Card from './Card.vue'
import gsap from 'gsap'

export interface CardType {
  id: number
  name: string
  faction: string
  row: string
  strength: number | null
  ability: string
  filename: string
  count: number
}

export default defineComponent({
  name: 'CardCarousel',
  components: {
    Card,
  },
  props: {
    replacementCard: {
      type: Object as PropType<CardType>,
      default: null,
    },
    cards: {
      type: Array as () => CardType[],
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    defaultFocus: {
      type: Number,
      default: 0,
    },
    show: Boolean,
    readonly: Boolean,
  },

  emits: ['select', 'close'],
  setup(props, { emit }) {
    const focusedIndex = ref(props.defaultFocus)
    const playingAnimation = ref(false)

    const focusedAbility = computed(() => {
      return props.cards[focusedIndex.value].ability
        .split(' ')
        .filter((a) => a !== 'hero')[0]
    })

    const focusedCardAbility = computed(() => {
      return (
        ability_dict[focusedAbility.value as keyof typeof ability_dict] || null
      )
    })

    const showAbilityIcon = computed(() => {
      const focusedCard = props.cards[focusedIndex.value]
      return focusedCard.row !== 'leader'
    })

    const iconPath = computed(() => {
      return require(
        `@/assets/img/icon/card_ability_${focusedAbility.value || 'decoy'}.png`
      )
    })

    const onCardClick = async (index: number) => {
      if (playingAnimation.value) return

      if (index === focusedIndex.value && !props.readonly) {
        const selectedCard = document.querySelectorAll('.carousel-item')[
          index
        ] as HTMLElement
        if (!selectedCard) {
          emit('select', index)
          return
        }
        try {
          playingAnimation.value = true
          await gsap.to(selectedCard, {
            y: 2000,
            duration: 0.5,
            ease: 'power1.out',
            onComplete: () => {
              emit('select', index)

              setTimeout(() => {
                const newCard = document.querySelectorAll('.carousel-item')[
                  index
                ] as HTMLElement

                if (newCard) {
                  gsap.set(newCard, { y: 0 })
                }
              }, 100)
            },
          })
        } catch {
          // nada
        } finally {
          setTimeout(() => {
            playingAnimation.value = false
          }, 500)
        }
      } else {
        focusedIndex.value = index
      }
    }

    const onOverlayClick = () => {
      emit('close') // Emit the close event when clicking outside
    }

    const getCardStyle = (index: number) => {
      const distanceFromCenter = index - focusedIndex.value
      const scale = 1 - Math.abs(distanceFromCenter) * 0.08
      const offset = distanceFromCenter * 269
      return {
        transform: `translateX(${offset}px) scale(${scale})`,
        padding: `${Math.abs(distanceFromCenter) * 15}px`,
        zIndex: 10 - Math.abs(distanceFromCenter),
      }
    }

    return {
      playingAnimation,
      focusedCardAbility,
      showAbilityIcon,
      iconPath,
      focusedIndex,
      onCardClick,
      onOverlayClick,
      getCardStyle,
    }
  },
})
</script>

<style lang="sass" scoped>
.carousel-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000
  background: #000000ab

.carousel
  display: flex
  align-items: center
  justify-content: center
  height: 522px
  width: 100%
  position: relative

.carousel-item
  position: absolute
  transition: transform 0.5s ease, opacity 0.5s ease, scale 0.5s ease
  cursor: pointer

.carousel-title
  position: absolute
  background: #000000ab
  color: goldenrod
  width: 100%
  top: 10%
  padding: 20px
  box-shadow: 0 0 13px #ffffff57
  span
    font-size: 2rem

.carousel-ability
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
  .icon
    height: 40px
    position: absolute
    left: 15px

.center-card
  opacity: 1
  z-index: 10
</style>
