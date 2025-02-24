<template>
  <transition name="fade" appear>
    <div v-if="isVisible" class="notification" :class="type">
      <img :src="iconPath" alt="Notification Icon" class="icon" />
      <span class="message">{{ notificationMessage }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Notification',
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  setup(props) {
    const isVisible = ref(true)

    const notificationMessage = computed(() => {
      if (props.message)
        return props.message
      switch (props.type) {
      case 'me-turn':
        return 'Your turn'
      case 'op-turn':
        return 'Opponent\'s turn'
      case 'round-start':
        return 'Round start'
      case 'round-passed':
        return 'Passed'
      case 'win-round':
        return 'You win!'
      case 'lose-round':
        return 'You lose!'
      case 'draw-passed':
        return 'Draw!'
      case 'draw':
        return 'It\'s a draw!'
      default:
        return ''
      }
    })

    const iconPath = computed(() => {
      return require(`@/assets/img/icon/notif_${props.type.replace('-', '_')}.png`)
    })

    let timeoutId: number

    onMounted(() => {
      timeoutId = setTimeout(() => {
        // tempo para exibir o fade-in/out
        isVisible.value = false
      }, props.duration)
    })

    onUnmounted(() => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    })

    return {
      isVisible,
      notificationMessage,
      iconPath,
    }
  },
})
</script>
<style lang="sass" scoped>
.notification
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 100%
  height: 160px
  background-color: rgba(0, 0, 0, 0.767)
  color: white
  display: flex
  justify-content: center
  align-items: center
  font-size: 24px
  opacity: 1

.icon
  max-width: 320px
  // max-height: 200px
  margin-right: 20px
  margin-bottom: 20px
  object-fit: contain

.fade-enter-active, .fade-leave-active
  transition: opacity 0.2s ease-in-out

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>