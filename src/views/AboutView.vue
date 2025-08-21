<template>
  <div>
    <button @click="showCarousel = true">Open Carousel</button>
    <CardCarousel
      v-if="showCarousel"
      :cards="hand"
      :title="'Chose up to 2 cards to redraw'"
      :show="showCarousel"
      @select="selectCard"
      @close="showCarousel = false"
    />
    <CardPreview :card="selectedCard" :align="previewAlign" />

    <button @click="showRandomCard()">Preview</button>
    <button @click="showRandomCard('center')">Preview Center</button>

    <button @click="showDefaultNotification">Notificação personalizada</button>
    <button @click="showCustomNotification">notificação e carousel</button>
  </div>
</template>

<script lang="ts">
import CardCarousel from '@/components/CardCarousel.vue'
import CardPreview from '@/components/CardPreview.vue'

import { CardType } from '@/types/card'
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  components: {
    CardCarousel,
    CardPreview,
  },

  setup() {
    const showCarousel = ref(false)
    const notification = inject('notification') as (
      type: string,
      duration?: number,
      messsage?: string
    ) => Promise<void>

    const selectedCard = ref<CardType | null>(null)
    const previewAlign = ref('center')

    const hand = ref<CardType[]>([
      {
        name: 'Crinfrid Reavers Dragon Hunter',
        id: 31,
        faction: 'realms',
        row: 'ranged',
        strength: 5,
        ability: ['bond'],
        filename: 'crinfrid',
        count: 3,
      },
      {
        name: 'Siege Tower',
        id: 46,
        faction: 'realms',
        row: 'siege',
        strength: 6,
        ability: null,
        filename: 'siege_tower',
        count: 1,
      },
      {
        name: 'Catapult',
        id: 30,
        faction: 'realms',
        row: 'siege',
        strength: 8,
        ability: ['bond'],
        filename: 'catapult_1',
        count: 2,
      },
      {
        name: 'Decoy',
        id: 2,
        faction: 'special',
        row: '',
        strength: null,
        ability: ['decoy'],
        filename: 'decoy',
        count: 3,
      },
      {
        name: 'Keira Metz',
        id: 39,
        faction: 'realms',
        row: 'ranged',
        strength: 5,
        ability: null,
        filename: 'keira',
        count: 1,
      },
      {
        name: 'Crinfrid Reavers Dragon Hunter',
        id: 31,
        faction: 'realms',
        row: 'ranged',
        strength: 5,
        ability: ['bond'],
        filename: 'crinfrid',
        count: 3,
      },
      {
        name: 'Clear Weather',
        id: 5,
        faction: 'weather',
        row: '',
        strength: null,
        ability: ['clear'],
        filename: 'clear',
        count: 2,
      },
      {
        name: 'Siege Tower',
        id: 46,
        faction: 'realms',
        row: 'siege',
        strength: 6,
        ability: null,
        filename: 'siege_tower',
        count: 1,
      },
      {
        name: 'Sabrina Glevissig',
        id: 51,
        faction: 'realms',
        row: 'ranged',
        strength: 4,
        ability: null,
        filename: 'sabrina',
        count: 1,
      },
      {
        name: 'Dandelion',
        id: 7,
        faction: 'neutral',
        row: 'close',
        strength: 2,
        ability: ['horn'],
        filename: 'dandelion',
        count: 1,
      },
    ])

    const deck = ref<CardType[]>([
      {
        name: 'Mysterious Elf',
        id: 1,
        faction: 'neutral',
        row: 'close',
        strength: 0,
        ability: ['hero', 'spy'],
        filename: 'mysterious_elf',
        count: 1,
      },
      {
        name: 'Decoy',
        id: 2,
        faction: 'special',
        row: '',
        strength: null,
        ability: ['decoy'],
        filename: 'decoy',
        count: 3,
      },
      {
        name: 'Decoy',
        id: 2,
        faction: 'special',
        row: '',
        strength: null,
        ability: ['decoy'],
        filename: 'decoy',
        count: 3,
      },
      {
        name: 'Biting Frost',
        id: 3,
        faction: 'weather',
        row: '',
        strength: null,
        ability: ['frost'],
        filename: 'frost',
        count: 3,
      },
      {
        name: 'Cirilla Fiona Elen Riannon',
        id: 4,
        faction: 'neutral',
        row: 'close',
        strength: 15,
        ability: ['hero'],
        filename: 'ciri',
        count: 1,
      },
      {
        name: "Commander\\'s Horn",
        id: 6,
        faction: 'special',
        row: '',
        strength: null,
        ability: ['horn'],
        filename: 'horn',
        count: 3,
      },
      {
        name: 'Geralt of Rivia',
        id: 9,
        faction: 'neutral',
        row: 'close',
        strength: 15,
        ability: ['hero'],
        filename: 'geralt',
        count: 1,
      },
      {
        name: 'Triss Merigold',
        id: 13,
        faction: 'neutral',
        row: 'close',
        strength: 7,
        ability: ['hero'],
        filename: 'triss',
        count: 1,
      },
      {
        name: 'Yennefer of Vengerberg',
        id: 16,
        faction: 'neutral',
        row: 'ranged',
        strength: 7,
        ability: ['hero', 'medic'],
        filename: 'yennefer',
        count: 1,
      },
      {
        name: 'Olgierd von Everec',
        id: 18,
        faction: 'neutral',
        row: 'agile',
        strength: 6,
        ability: ['morale'],
        filename: 'olgierd',
        count: 1,
      },
      {
        name: "Gaunter O\\'Dimm",
        id: 19,
        faction: 'neutral',
        row: 'siege',
        strength: 2,
        ability: ['muster'],
        filename: 'gaunter_odimm',
        count: 1,
      },
      {
        name: "Gaunter O\\'Dimm - Darkness",
        id: 20,
        faction: 'neutral',
        row: 'ranged',
        strength: 4,
        ability: ['muster'],
        filename: 'gaunter_odimm_darkness',
        count: 3,
      },
      {
        name: "Gaunter O\\'Dimm - Darkness",
        id: 20,
        faction: 'neutral',
        row: 'ranged',
        strength: 4,
        ability: ['muster'],
        filename: 'gaunter_odimm_darkness',
        count: 3,
      },
      {
        name: "Gaunter O\\'Dimm - Darkness",
        id: 20,
        faction: 'neutral',
        row: 'ranged',
        strength: 4,
        ability: ['muster'],
        filename: 'gaunter_odimm_darkness',
        count: 3,
      },
      {
        name: 'Ballista',
        id: 28,
        faction: 'realms',
        row: 'siege',
        strength: 6,
        ability: null,
        filename: 'ballista',
        count: 1,
      },
      {
        name: 'Blue Stripes Commando',
        id: 29,
        faction: 'realms',
        row: 'close',
        strength: 4,
        ability: ['bond'],
        filename: 'blue_stripes',
        count: 3,
      },
      {
        name: 'Blue Stripes Commando',
        id: 29,
        faction: 'realms',
        row: 'close',
        strength: 4,
        ability: ['bond'],
        filename: 'blue_stripes',
        count: 3,
      },
      {
        name: 'Blue Stripes Commando',
        id: 29,
        faction: 'realms',
        row: 'close',
        strength: 4,
        ability: ['bond'],
        filename: 'blue_stripes',
        count: 3,
      },
      {
        name: 'Catapult',
        id: 30,
        faction: 'realms',
        row: 'siege',
        strength: 8,
        ability: ['bond'],
        filename: 'catapult_1',
        count: 2,
      },
      {
        name: 'Crinfrid Reavers Dragon Hunter',
        id: 31,
        faction: 'realms',
        row: 'ranged',
        strength: 5,
        ability: ['bond'],
        filename: 'crinfrid',
        count: 3,
      },
      {
        name: 'Dun Banner Medic',
        id: 33,
        faction: 'realms',
        row: 'siege',
        strength: 5,
        ability: ['medic'],
        filename: 'banner_nurse',
        count: 1,
      },
      {
        name: 'Esterad Thyssen',
        id: 34,
        faction: 'realms',
        row: 'close',
        strength: 10,
        ability: ['hero'],
        filename: 'esterad',
        count: 1,
      },
      {
        name: 'John Natalis',
        id: 35,
        faction: 'realms',
        row: 'close',
        strength: 10,
        ability: ['hero'],
        filename: 'natalis',
        count: 1,
      },
      {
        name: 'Prince Stennis',
        id: 42,
        faction: 'realms',
        row: 'close',
        strength: 5,
        ability: ['spy'],
        filename: 'stennis',
        count: 1,
      },
      {
        name: 'Siege Tower',
        id: 46,
        faction: 'realms',
        row: 'siege',
        strength: 6,
        ability: null,
        filename: 'siege_tower',
        count: 1,
      },
      {
        name: 'Sigismund Dijkstra',
        id: 48,
        faction: 'realms',
        row: 'close',
        strength: 4,
        ability: ['spy'],
        filename: 'dijkstra',
        count: 1,
      },
      {
        name: 'Thaler',
        id: 50,
        faction: 'realms',
        row: 'siege',
        strength: 1,
        ability: ['spy'],
        filename: 'thaler',
        count: 1,
      },
      {
        name: 'Vernon Roche',
        id: 52,
        faction: 'realms',
        row: 'close',
        strength: 10,
        ability: ['hero'],
        filename: 'vernon',
        count: 1,
      },
      {
        name: 'Ves',
        id: 53,
        faction: 'realms',
        row: 'close',
        strength: 5,
        ability: null,
        filename: 'ves',
        count: 1,
      },
    ])

    const selectCard = (cardIndex: number) => {
      const randomCardIndex = Math.floor(Math.random() * deck.value.length)
      const [randomCard] = deck.value.splice(
        randomCardIndex,
        1,
        hand.value[cardIndex]
      )

      hand.value.splice(cardIndex, 1, randomCard)
    }

    const showDefaultNotification = async () => {
      await notification('me-turn', 1200, 'Mensagem personalizada')
    }

    const showCustomNotification = async () => {
      await notification('round-start', 1200)
      showCarousel.value = true
    }

    const showRandomCard = (align = 'right') => {
      selectedCard.value =
        deck.value[Math.floor(Math.random() * deck.value.length - 1)]

      previewAlign.value = align
    }

    return {
      showCarousel,
      hand,
      selectCard,
      showDefaultNotification,
      showCustomNotification,
      selectedCard,
      previewAlign,
      showRandomCard,
    }
  },
})
</script>
