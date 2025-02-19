import { Lang } from "../models/models";

const copyright = {
  studyModeTitle: {
    [Lang.RU]: "Постарайтесь запомнить как можно больше слов",
    [Lang.EN]: "Try to remember as many words as you can",
  },
  quizModeTitle: {
    [Lang.RU]: "Выберите правильный вариант перевода ...",
    [Lang.EN]: "Choose correct translation...",
  },
  languageName: {
    [Lang.RU]: {
      [Lang.RU]: "русский",
      [Lang.EN]: "английский",
    },
    [Lang.EN]: {
      [Lang.RU]: "russian",
      [Lang.EN]: "english",
    },
  },
  translateTo: {
    [Lang.RU]: "переведите на",
    [Lang.EN]: "translate to",
  },
  language: {
    [Lang.RU]: "язык",
    [Lang.EN]: "language",
  },
  resultMsg: {
    [Lang.RU]: "Опрос окончен. Ваш результат:",
    [Lang.EN]: "Quiz is done. Your result is",
  },
  modeName: {
    study: {
      [Lang.RU]: "Изучение",
      [Lang.EN]: "Study",
    },
    exam: {
      [Lang.RU]: "Опрос",
      [Lang.EN]: "Exam",
    },
    quiz: {
      [Lang.RU]: "Тест",
      [Lang.EN]: "Test",
    },
  },
};

export default copyright;
