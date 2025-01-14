import { useState } from "react";
import vocaburaries from "../vocaburaries/vocaburaries";
import { Vocaburary, Card, Lang, Mode } from "../models/models";

export default function useMode() {
  const [mode, setMode] = useState<Mode>(Mode.STUDY);
  const [currentVoc, setCurrentVoc] = useState<Vocaburary>(vocaburaries[0]);
  const [modalOpen, setModalOpen] = useState(false);

  function getRandomIndex(): number {
    return Math.floor(Math.random() * currentVoc.cards.length);
  }
  const initialIndex = getRandomIndex();

  const [askLang, setAskLang] = useState<Lang>(Lang.EN);
  const [currentCard, setCurrentCard] = useState<Card>(
    currentVoc.cards[initialIndex]
  );
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU);
  const [askedCards, setAskedCards] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [quizStatus, setQuizStatus] = useState<boolean[]>([]);

  function reset() {
    setAskedCards([]);
    setCurrentCard(currentVoc.cards[initialIndex]);
  }

  function swithCurrentVoc(vocNum: number) {
    setCurrentVoc(vocaburaries[vocNum]);
    reset();
  }

  function toggleLang() {
    switch (askLang) {
      case Lang.EN: {
        setAskLang(Lang.RU);
        setAnsLang(Lang.EN);
        return;
      }
      case Lang.RU: {
        setAskLang(Lang.EN);
        setAnsLang(Lang.RU);
        return;
      }
      default: {
        return;
      }
    }
  }

  function setCard(index: number) {
    setCurrentCard(currentVoc.cards[index]);
    toggleLang();
  }

  function setNextCard(mode: Mode) {
    let index: number = getRandomIndex();
    switch (mode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              quizStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }
        while (askedCards.includes(index)) {
          index = getRandomIndex();
        }
        setCard(index);
        setAskedCards((prev) => [...prev, index]);
        setMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_ANSWER_INCORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              quizStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }
        while (askedCards.includes(index)) {
          index = getRandomIndex();
        }
        setCard(index);
        setAskedCards((prev) => [...prev, index]);
        setMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_QUESTION:
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setMode(Mode.EXAMINATION_ANSWER_CORRECT);
          setQuizStatus((prev) => [...prev, true]);
        } else {
          setMode(Mode.EXAMINATION_ANSWER_INCORRECT);
          setQuizStatus((prev) => [...prev, false]);
        }

        break;
      case Mode.EXAMINATION_RESULT:
        setCard(index);
        break;
      case Mode.STUDY:
        setCard(index);
        break;
      default:
        break;
    }
  }

  return {
    mode,
    setMode,
    currentVoc,
    swithCurrentVoc,
    askLang,
    currentCard,
    ansLang,
    askedCards,
    setNextCard,
    userAnswer,
    setUserAnswer,
    modalOpen,
    setModalOpen,
    quizStatus,
    setQuizStatus,
  };
}
