import type { CardType } from '@/types/card'
import type { Board } from '@/types/game'
import { useGame } from '@/composables/useGame'
import { abilityMeta, AbilityKey } from '@/types/card'

export function useCardAbilities() {
  const { players, currentPlayer, playCardtoRow } = useGame()

  const abilityActions: Partial<
    Record<
      AbilityKey,
      {
        placed?: (card: CardType, row?: any) => Promise<void>
        activated?: (card: CardType) => Promise<void>
        removed?: (card: CardType) => Promise<void>
      }
    >
  > = {
    muster: {
      placed: async (card: CardType) => {
        // SE a carta tem ' - ' apenas joga as cartas do mesmo nome. Se não, também joga as cartas cujo nome tem ' - '
        // Gaunter O'din joga as cartas Darkness mas não vice-versa
        const cardName = card.name.includes(' - ')
          ? card.name
          : card.name.split(' - ')[0]
        const musteredCards = players[currentPlayer.value].deck.filter(
          (deckCard: CardType) => deckCard.name.includes(cardName)
        )

        if (musteredCards.length > 0) {
          musteredCards.forEach((mustered) => {
            playCardtoRow(
              mustered,
              mustered.row as keyof Board,
              currentPlayer.value
            )
          })
        }
      },
    },
    // FAZER AS OUTRAS HABILIDADES AQUI
  }

  return { abilityMeta, abilityActions }
}
