import { DirectiveBinding } from 'vue'

const eventMap = new WeakMap<HTMLElement, (event: MouseEvent) => void>()

export const clickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    eventMap.set(el, clickOutsideHandler)
    document.addEventListener('click', clickOutsideHandler)
  },
  unmounted(el: HTMLElement) {
    const clickOutsideHandler = eventMap.get(el)
    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler)
      eventMap.delete(el)
    }
  },
}
