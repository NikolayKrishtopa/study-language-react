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
  QUIZ_QUESTION = 'quiz_question',
  QUIZ_ANSWER_CORRECT = 'quiz_answer_correct',
  QUIZ_ANSWER_INCORRECT = 'quiz_answer_incorrect',
  QUIZ_RESULT = 'quiz_result',
}
