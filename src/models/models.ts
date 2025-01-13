export type Card = {
  id: number;
  en: string;
  ru: string;
};

export type Vocaburary = {
  id: number;
  cards: Card[];
};

export enum Lang {
  RU = "ru",
  EN = "en",
}
export enum Mode {
  STUDY = "study",
  EXAMINATION_QUESTION = "examination_question",
  EXAMINATION_ANSWER_CORRECT = "examination_answer_correct",
  EXAMINATION_ANSWER_INCORRECT = "examination_answer_incorrect",
  EXAMINATION_RESULT = "examination_result",
  QUIZ_QUESTION = "quiz_question",
  QUIZ_ANSWER_CORRECT = "quiz_answer_correct",
  QUIZ_ANSWER_INCORRECT = "quiz_answer_incorrect",
  QUIZ_RESULT = "quiz_result",
}
