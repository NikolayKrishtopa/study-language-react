export type Card = {
  id: number
  en: string
  ru: string
}

export type Vocaburary = {
  id: number
  cards: Card[]
}

export enum Lang {
  RU = 'ru',
  EN = 'en',
}
export enum Mode {
  STUDY = 'study',
  QUIZ = 'quiz',
}
