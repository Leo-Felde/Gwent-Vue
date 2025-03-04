import { createApp, defineComponent, h, ref } from 'vue'
import CardCarousel from '@/components/CardCarousel.vue'
import { CardType } from '@/types/card'

interface CarouselOptions {
  cards: CardType[]
  amount: number
  title?: string
  defaultFocus?: number
}

const useCarousel = (options: CarouselOptions): Promise<any> => {
  return new Promise((resolve) => {
    const selectedCards = ref<number[]>([])
    const app = createApp(
      defineComponent({
        setup() {
          const show = ref(true)

          const onSelect = (index: number) => {
            selectedCards.value.push(index)
            if (selectedCards.value.length >= options.amount) {
              show.value = false
              setTimeout(() => {
                app.unmount()
                const selectedObjects = selectedCards.value.map(
                  (i) => options.cards[i]
                )
                resolve(
                  options.amount === 1 ? selectedObjects[0] : selectedObjects
                )
              }, 300)
            }
          }

          const onClose = () => {
            show.value = false
            setTimeout(() => {
              app.unmount()
              const selectedObjects = selectedCards.value.map(
                (i) => options.cards[i]
              )
              resolve(
                options.amount === 1 ? selectedObjects[0] : selectedObjects
              )
            }, 300)
          }

          return () =>
            h(CardCarousel, {
              cards: options.cards,
              title: options.title || '',
              defaultFocus: options?.defaultFocus ?? 0,
              show: show.value,
              animate: options.amount > 0,
              onSelect,
              onClose,
            })
        },
      })
    )

    const container = document.createElement('div')
    document.body.appendChild(container)
    app.mount(container)
  })
}

export default {
  install(app: any) {
    app.config.globalProperties.$carousel = useCarousel
  },
}

export { useCarousel }
