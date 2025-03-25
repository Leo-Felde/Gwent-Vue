import { CardType } from './card'

export interface RowType {
  cards: CardType[]
  effects: string[]
  special: CardType[]
  sum: number
}

export interface Board {
  close: RowType
  ranged: RowType
  siege: RowType
}

export type PlayerTypes = 'player' | 'opponent'
