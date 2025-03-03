<template>
  <button
    :class="['button', { disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  methods: {
    handleClick(event: MouseEvent) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    },
  },
})
</script>

<style lang="sass" scoped>
.button
  font-size: 1.1rem
  color: rgb(238, 238, 238)
  background-color: rgb(20,20,20)
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4)
  border: 0.1vw ridge rgb(30,30,30)
  cursor: pointer

.button:hover
  box-shadow: 0px 3px 5px 0px rgb(21, 21, 21) !important
  transform: translateY(0px) !important

.button.disabled
  background-color: rgb(17, 17, 17) !important
  color: #8e8e8e !important
  cursor: not-allowed
</style>
