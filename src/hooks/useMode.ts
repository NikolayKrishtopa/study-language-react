import { useState, useEffect } from "react";
import vocaburaries from "../vocaburaries/vocaburaries";
import { Vocaburary, Card, Lang, Mode } from "../models/models";
import {
  getRandomArrElement,
  createRandomElemArr as createCardsArrForQuiz,
} from "../utils/utils";

export default function useMode() {
  const [mode, setMode] = useState<Mode>(Mode.STUDY);
  const [currentVoc, setCurrentVoc] = useState<Vocaburary>(vocaburaries[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const [askLang, setAskLang] = useState<Lang>(Lang.EN);
  const [cardsArrForQuiz, setCardsArr] = useState<Array<Card>>([]);
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU);
  const [askedCards, setAskedCards] = useState<Card[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [examinationStatus, setExaminationStatus] = useState<boolean[]>([]);
  const [quizStatus, setQuizStatus] = useState<boolean[]>([]);
  const [wrongClicked, setWrongClicked] = useState<Array<Number>>([]);
  const [currentCard, setCurrentCard] = useState<Card>(
    getRandomArrElement(currentVoc.cards, askedCards)
  );

  useEffect(() => {
    if (mode !== Mode.QUIZ_QUESTION) return;
    setCardsArr(createCardsArrForQuiz(currentVoc.cards, 4, currentCard));
    // console.log("card array set", cardsArrForQuiz);
  }, [mode]);

  useEffect(() => {
    if (mode !== Mode.QUIZ_QUESTION) return;
    goAhead();
  }, [userAnswer]);

  function reset() {
    setAskedCards([]);
    setCurrentCard(getRandomArrElement(currentVoc.cards));
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

  function setCard(card: Card) {
    setCurrentCard(card);
    toggleLang();
  }

  function goAhead() {
    const card = getRandomArrElement(currentVoc.cards, askedCards);

    // console.log([cardsArrForQuiz, mode, currentCard]);

    switch (mode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              examinationStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }
        setCard(card);
        setAskedCards((prev) => [...prev, card]);
        setMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_ANSWER_INCORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              examinationStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }

        setCard(card);
        setAskedCards((prev) => [...prev, card]);
        setMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_QUESTION:
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setMode(Mode.EXAMINATION_ANSWER_CORRECT);
          setExaminationStatus((prev) => [...prev, true]);
        } else {
          setMode(Mode.EXAMINATION_ANSWER_INCORRECT);
          setExaminationStatus((prev) => [...prev, false]);
        }

        break;

      case Mode.QUIZ_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              quizStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }
        setCard(card);
        setAskedCards((prev) => [...prev, card]);
        setMode(Mode.QUIZ_QUESTION);
        setUserAnswer("");
        setWrongClicked([]);
        break;

      case Mode.QUIZ_QUESTION:
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setMode(Mode.QUIZ_ANSWER_CORRECT);
          setQuizStatus((prev) => [...prev, true]);
        } else {
          const clicked = cardsArrForQuiz.find(
            (e) => e[ansLang].toLowerCase() === userAnswer
          );
          if (!!clicked) {
            setWrongClicked((prev) => [...prev, clicked.id]);
          }
          setQuizStatus((prev) => [...prev, false]);
        }

        break;

      case Mode.EXAMINATION_RESULT:
        setCard(card);
        break;
      case Mode.QUIZ_RESULT:
        setCard(card);
        break;
      case Mode.STUDY:
        setCard(card);
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
    goAhead,
    userAnswer,
    setUserAnswer,
    modalOpen,
    setModalOpen,
    examinationStatus,
    cardsArrForQuiz,
    wrongClicked,
  };
}
