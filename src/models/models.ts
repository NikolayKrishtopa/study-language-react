export type Card = {
  id: number
  en: string
  ru: string
}

export type Vocaburary = {
  id: number
  cards: Card[]
}
