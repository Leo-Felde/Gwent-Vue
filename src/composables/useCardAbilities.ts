// useCardAbilities.ts
import { useGame } from './useGame'
import type { CardType } from '@/types/card'
import type { Board } from '@/types/game'
import { AbilityKey } from '@/types/card'

type MusteredCard = { card: CardType; source: 'deck' | 'hand' }

export function createAbilityActions() {
  const { players, currentPlayer, playCardToRow } = useGame()

  return {
    muster: {
      placed: async (card: CardType) => {
        const cardName =
          card.name === "Gaunter O\\'Dimm - Darkness"
            ? "Gaunter O\\'Dimm - Darkness"
            : card.name.includes(' - ')
              ? card.name.split(' - ')[0]
              : card.name

        const musteredCards: MusteredCard[] = [
          ...players[currentPlayer.value].hand
            .filter((c) => c.name.includes(cardName))
            .map((c) => ({ card: c, source: 'hand' as const })),
          ...players[currentPlayer.value].deck
            .filter((c) => c.name.includes(cardName))
            .map((c) => ({ card: c, source: 'deck' as const })),
        ]

        musteredCards.forEach((mustered) => {
          setTimeout(() => {
            playCardToRow(
              mustered.card,
              mustered.card.row as keyof Board,
              currentPlayer.value,
              mustered.source,
              null,
              true
            )
          }, 500)
        })
      },
    },
  }
}
