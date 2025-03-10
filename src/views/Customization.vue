<template>
  <div id="customization">
    <section id="customization-header">
      <h2 class="bank-label">Avaliable cards</h2>
      <div class="faction-labels">
        <span class="faction-name">
          <img
            :src="require(`@/assets/img/icon/deck_shield_${faction.icon}.png`)"
          />
          <h1>{{ faction.name }}</h1>
        </span>
        <span class="faction-ability"> {{ faction.description }} </span>
        <div class="actions">
          <Button @click="importDeckJson"> Import deck </Button>
          <Button @click="changeFaction"> Change faction </Button>
          <input
            type="file"
            id="add-file"
            style="display: none"
            accept="application/JSON"
            @change="onJsonUpload"
          />
          <Button @click="downloadDeckJson"> Download deck </Button>
          <a id="download-json" style="display: none"></a>
        </div>
      </div>
      <h2 class="deck-label">Cards in Deck</h2>
    </section>
    <div id="customization-body">
      <section id="cards-bank" class="card-container">
        <Card
          v-for="(card, index) in filteredBank"
          :key="`bank-card-${index}`"
          :card="card"
          type="preview"
          show-count
          @click="addCardToDeck(card, $event)"
        />
      </section>
      <section id="customization-summary">
        <Card
          v-if="playerMe.leader"
          :card="playerMe.leader"
          type="preview"
          id="player-leader-card"
          @click="selectLeaderCard"
        />
        <p>
          <span> Total Cards in Deck </span>
          <span>
            <img :src="require('@/assets/img/icon/deck_stats_count.png')" />
            {{ playerMe.deck.length }}
          </span>
        </p>
        <p>
          <span> Number of Unit Cards </span>
          <span :style="!hasEnoughUnitCards ? 'color: red' : ''">
            <img :src="require('@/assets/img/icon/deck_stats_unit.png')" />
            {{ numberOfUnitCards }}
            <span v-if="!hasEnoughUnitCards">/22</span>
          </span>
        </p>
        <p>
          <span> Special Cards </span>
          <span :styte="numberOfSpecialsAllowed ? '' : 'red'">
            <img :src="require('@/assets/img/icon/deck_stats_special.png')" />
            {{ numberOfSpecialCards }}/10
          </span>
        </p>
        <p>
          <span> Total Unit Card Strength </span>
          <span>
            <img :src="require('@/assets/img/icon/deck_stats_strength.png')" />
            {{ totalUnitCardStrength }}
          </span>
        </p>
        <p>
          <span> Hero Cards </span>
          <span>
            <img :src="require('@/assets/img/icon/deck_stats_hero.png')" />
            {{ numberOfHeroCards }}
          </span>
        </p>
        <div id="summary-actions">
          <Button @click="onPlay"> Play </Button>
        </div>
      </section>
      <section id="cards-deck" class="card-container">
        <Card
          v-for="(card, index) in formattedDeck"
          :key="`hand-card-${index}`"
          :card="card"
          type="preview"
          show-count
          @click="removeCardFromDeck(card, $event)"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '@/components/Card.vue'
import { usePlayerStore } from '@/store/usePlayerStore'
import { CardType, factionCard, factionDictionary } from '@/types/card'
import {
  compareCardStrength,
  getLeaders,
  makeBank,
  reverseTranslateCards,
  translateCard,
  translateCards,
} from '@/utils/cards'
import { premadeDecks } from '@/utils/utils'
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import Button from '@/components/Button.vue'
import { useCarousel } from '@/plugins/carouselPlugin'
import router from '@/router'

export default defineComponent({
  name: 'CustomizationView',

  components: {
    Card,
    Button,
  },

  setup() {
    const playerStore = usePlayerStore()
    const playerMe =
      playerStore.players?.player || playerStore.createPlayer('player', 1)
    const cardBank = ref<CardType[]>([])
    const leaderCards = ref<CardType[]>([])

    const faction = computed(() => {
      return factionDictionary[
        (playerMe.faction as keyof typeof factionDictionary) || 'realms'
      ]
    })

    const filteredBank = computed(() => {
      return cardBank.value.filter((card) => card.count > 0)
    })

    const formattedDeck = computed(() => {
      const deckMap = new Map<number, CardType>()
      playerMe.deck.forEach((card) => {
        if (deckMap.has(card.id)) {
          deckMap.get(card.id)!.count += 1
        } else {
          deckMap.set(card.id, { ...card, count: 1 })
        }
      })
      const arr = Array.from(deckMap.values())
      arr.sort((a, b) => {
        const c1 = {
          name: a.name,
          basePower: -(a.strength || 0),
          faction: a.faction,
          isHero: a.ability.includes('hero'),
        }
        const c2 = {
          name: b.name,
          basePower: -(b.strength || 0),
          faction: b.faction,
          isHero: b.ability.includes('hero'),
        }
        return compareCardStrength(c1, c2)
      })
      return arr
    })

    const numberOfUnitCards = computed(() => {
      return playerMe.deck.filter((card) => {
        return card.faction !== 'special' && card.faction !== 'weather'
      }).length
    })

    const hasEnoughUnitCards = computed(() => {
      return numberOfUnitCards.value > 22
    })

    const totalUnitCardStrength = computed(() => {
      return playerMe.deck
        .filter((card) => {
          return (
            !card.ability.includes('hero') &&
            !card.ability.includes('spy') &&
            card.faction !== 'special' &&
            card.faction !== 'weather'
          )
        })
        .reduce((sum, card) => sum + (card.strength || 0), 0)
    })

    const numberOfSpecialCards = computed(() => {
      return playerMe.deck.filter((card) => card.faction === 'special').length
    })

    const numberOfSpecialsAllowed = computed(() => {
      return numberOfSpecialCards.value < 11
    })

    const numberOfHeroCards = computed(() => {
      return playerMe.deck.filter((card) => card.ability.includes('hero'))
        .length
    })

    const animateCardElement = async (
      cardElement: HTMLElement,
      direction: number,
      onComplete: () => void,
      isLastCard: boolean
    ) => {
      cardElement.style.pointerEvents = 'none'
      const clone = cardElement.cloneNode(true) as HTMLElement
      cardElement.parentElement?.appendChild(clone)

      const scrollTop = cardElement.parentElement?.scrollTop || 0
      const scrollLeft = cardElement.parentElement?.scrollLeft || 0

      gsap.set(clone, {
        position: 'absolute',
        pointerEvents: 'none',
        top: cardElement.offsetTop - scrollTop,
        left: cardElement.offsetLeft - scrollLeft,
      })

      if (isLastCard) {
        cardElement.style.opacity = '0'
      }

      await gsap.to(clone, {
        x: direction * 300,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          clone.remove()
          onComplete()
          if (isLastCard) {
            cardElement.style.opacity = '1'
          }
        },
      })

      cardElement.style.pointerEvents = 'all'
    }

    const addCardToDeck = (card: CardType, event: MouseEvent) => {
      if (card.count > 0) {
        const cardElement = event.currentTarget as HTMLElement

        if (card.count > 1) {
          animateCardElement(
            cardElement,
            1,
            () => {
              playerMe.deck.push(card)
              card.count -= 1
            },
            false
          )
        } else {
          animateCardElement(
            cardElement,
            1,
            () => {
              playerMe.deck.push(card)
              card.count -= 1
            },
            true
          )
        }
      }
    }

    const removeCardFromDeck = (card: CardType, event: MouseEvent) => {
      const index = playerMe.deck.findIndex((c) => c.id === card.id)
      if (index !== -1) {
        const cardElement = event.currentTarget as HTMLElement

        if (card.count > 1) {
          animateCardElement(
            cardElement,
            -1,
            () => {
              playerMe.deck.splice(index, 1)
              const bankCard = cardBank.value.find((c) => c.id === card.id)
              if (bankCard) {
                bankCard.count += 1
              }
            },
            false
          )
        } else {
          animateCardElement(
            cardElement,
            -1,
            () => {
              playerMe.deck.splice(index, 1)
              const bankCard = cardBank.value.find((c) => c.id === card.id)
              if (bankCard) {
                bankCard.count += 1
              }
            },
            true
          )
        }
      }
    }

    onMounted(() => {
      leaderCards.value = getLeaders(playerMe.faction || 'realms')
    })

    onBeforeMount(() => {
      const defaultDeck = premadeDecks[0]
      playerMe.initializeDeck(defaultDeck)

      makeCardBank()
    })

    const makeCardBank = () => {
      const translatedDeck = reverseTranslateCards(playerMe.deck)
      const bank = makeBank(playerMe.faction || 'realms', translatedDeck)

      cardBank.value = bank
    }

    const selectLeaderCard = async () => {
      const leaderCard = await useCarousel({
        cards: leaderCards.value,
        amount: 1,
        title: '',
        defaultFocus: leaderCards.value.findIndex(
          (lc) => lc.id === playerMe.leader?.id
        ),
      })
      if (!leaderCard) return
      if (leaderCard.id === playerMe.leader?.id) return

      if (leaderCard) playerMe.leader = leaderCard
    }

    const changeFaction = async () => {
      const faction = await useCarousel({
        cards: factionCard,
        amount: 1,
        title: '',
        defaultFocus: factionCard.findIndex(
          (f) => f.filename === playerMe.faction
        ),
      })

      if (!faction) return
      if (faction.filename === playerMe.faction) return

      playerMe.deck = []
      playerMe.hand = []
      playerMe.faction = faction.filename
      leaderCards.value = getLeaders(faction.filename)
      playerMe.leader = leaderCards.value[0]
      cardBank.value = makeBank(faction.filename)
    }

    const importDeckJson = () => {
      const inputElement = document.getElementById('add-file')

      if (!inputElement) return
      inputElement.click()
    }

    const onJsonUpload = (event: Event) => {
      const inputElement = event.target as HTMLInputElement
      if (!inputElement) return

      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            try {
              const deckData = JSON.parse(e.target.result as string)
              const keys = Object.keys(deckData)
              if (
                !['cards', 'leader', 'faction'].every((key) =>
                  keys.includes(key)
                )
              ) {
                // notificar json inválido
                return
              }
              const formattedDeck = translateCards(deckData.cards)
              const formattedLeader = translateCard(deckData.leader)

              playerMe.faction = deckData.faction
              playerMe.deck = formattedDeck
              playerMe.leader = formattedLeader

              makeCardBank()
            } catch (error) {
              console.error('Error parsing JSON:', error)
            }
          }
        }
        reader.readAsText(file)
      }
    }

    const downloadDeckJson = () => {
      let json = JSON.stringify({
        faction: playerMe.faction,
        leader: playerMe.leader?.id,
        cards: reverseTranslateCards(playerMe.deck),
      })

      let str = 'data:text/json;charset=utf-8,' + encodeURIComponent(json)
      let hidden_elem = document.getElementById(
        'download-json'
      ) as HTMLAnchorElement
      if (!hidden_elem) return

      hidden_elem.href = str
      hidden_elem.download = `${playerMe.faction}-deck.json`
      hidden_elem.click()
    }

    const onPlay = () => {
      // REMOVER ASAP

      router.push('/play')
    }

    return {
      playerMe,
      faction,
      cardBank,
      filteredBank,
      formattedDeck,
      addCardToDeck,
      removeCardFromDeck,
      numberOfUnitCards,
      hasEnoughUnitCards,
      totalUnitCardStrength,
      numberOfSpecialCards,
      numberOfSpecialsAllowed,
      numberOfHeroCards,
      selectLeaderCard,
      changeFaction,
      importDeckJson,
      onJsonUpload,
      downloadDeckJson,
      onPlay, // remover asap
    }
  },
})
</script>

<style lang="sass" scoped>
#customization
  display: flex
  flex-direction: column
  padding: 15px
  gap: 10px
  padding: 30px
#customization-header
  display: flex
  justify-content: space-between
  width: 100%
#customization-body
  display: flex
  width: 100%
  #cards-bank
    margin-left: auto
  #cards-deck
    margin-right: auto

#customization-summary
  width: 20%
  color: #b68e46
  font-size: 1.1rem
  &>div
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
  &>p
    display: flex
    flex-direction: column
    &>span
      display: flex
      align-items: center
      margin: 0 auto 0 auto
      &:nth-child(2n +1)
        color: #82735f
  #player-leader-card
    height: 247px
    width: 132px

#summary-actions
  display: flex
  .button
    width: 160px
    margin-left: auto
    margin-right: auto
.faction-name
  display: flex
  img
    width: 50px
    height: 56px
    margin-left: auto
  h1
    margin: auto auto auto 6px

.faction-ability
  color: #ab977c
  font-size: 1.1rem

.bank-label, .deck-label
  margin-left: auto
  margin-right: auto
  margin-top: auto

.faction-labels
  display: flex
  flex-direction: column
  margin: 0px 15px 0px 15px

.actions
  display: flex
  justify-content: space-around

.card-container
  border: solid 1px black
  height: fit-content
  max-width: 35%
  width: 100%
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  max-height: 734px
  overflow-y: auto
  overflow-x: hidden
  padding-right: 10px
  margin-left: auto
  .card
    width: 190px !important
    height: 357px !important
    margin-bottom: 10px
</style>
