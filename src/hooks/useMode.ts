import { useState, useEffect } from "react";
import vocaburaries from "../vocaburaries/vocaburaries";
import { Vocaburary, Card, Lang, Mode } from "../models/models";
import {
  getRandomArrElement,
  createRandomElemArr as createCardsArrForQuiz,
} from "../utils/utils";
import modeForType from "./../store/mode";
import cardsForType from "./../store/cards";
import langForType from "./../store/language";
import curInterfaceForType from "./../store/interface";

const useMode = (
  modeState: typeof modeForType,
  cardsState: typeof cardsForType,
  langState: typeof langForType,
  curInterfaceState: typeof curInterfaceForType
) => {
  // language
  const [currentVoc, setCurrentVoc] = useState<Vocaburary>(vocaburaries[0]);
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU);
  const [askLang, setAskLang] = useState<Lang>(Lang.EN);

  // cards
  const [cardsArrForQuiz, setCardsArrForQuiz] = useState<Array<Card>>([]);
  const [askedCards, setAskedCards] = useState<Card[]>([]);
  const [answeredWrongly, setAnsweredWrongly] = useState<Card[]>([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card>(
    getRandomArrElement(currentVoc.cards, askedCards)
  );
  const [wrongClicked, setWrongClicked] = useState<Array<Number>>([]);

  // interface
  const [systemMsg, setSystemMsg] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modeState.currentMode !== Mode.QUIZ_QUESTION) return;
    setCardsArrForQuiz(createCardsArrForQuiz(currentVoc.cards, 4, currentCard));
    // console.log("card array set", cardsArrForQuiz);
  }, [modeState.currentMode]);

  useEffect(() => {
    if (modeState.currentMode !== Mode.QUIZ_QUESTION) return;
    goAhead();
  }, [userAnswer]);

  function reset() {
    const card = getRandomArrElement(currentVoc.cards);
    setAskedCards([]);
    setCurrentCard(card);
    setAnsweredCorrectly([]);
    setAnsweredWrongly([]);
    setUserAnswer("");
    ResetSystMsg();
    setWrongClicked([]);
    if (
      modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT ||
      modeState.currentMode === Mode.QUIZ_ANSWER_INCORRECT
    ) {
      modeState.switchMode(Mode.QUIZ_QUESTION);
      setCardsArrForQuiz(createCardsArrForQuiz(currentVoc.cards, 4, card));
    }
    if (
      modeState.currentMode === Mode.EXAMINATION_ANSWER_CORRECT ||
      modeState.currentMode === Mode.EXAMINATION_ANSWER_INCORRECT
    ) {
      modeState.switchMode(Mode.QUIZ_QUESTION);
      setCardsArrForQuiz(createCardsArrForQuiz(currentVoc.cards, 4, card));
    }
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

  function switchCard(card: Card) {
    setCurrentCard(card);
    toggleLang();
  }

  function ResetSystMsg() {
    setSystemMsg("");
  }

  function switchMode(newMode: Mode) {
    reset();
    modeState.switchMode(newMode);
  }

  function goAhead() {
    const card = getRandomArrElement(currentVoc.cards, askedCards);
    switch (modeState.currentMode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          setSystemMsg(
            `${answeredCorrectly.length} слов из ${currentVoc.cards.length}, ${answeredWrongly.length} неправильно.`
          );
          console.log(answeredCorrectly, answeredWrongly);

          return;
        }
        switchCard(card);
        modeState.switchMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;

      case Mode.EXAMINATION_ANSWER_INCORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          setSystemMsg(
            `${answeredCorrectly.length} слов из ${currentVoc.cards.length}, ${answeredWrongly.length} неправильно.`
          );
          console.log(answeredCorrectly, answeredWrongly);
          return;
        }

        switchCard(card);
        modeState.switchMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_QUESTION:
        setAskedCards((prev) => [...prev, currentCard]);
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          modeState.switchMode(Mode.EXAMINATION_ANSWER_CORRECT);
          setAnsweredCorrectly((prev) => [...prev, currentCard]);
        } else {
          modeState.switchMode(Mode.EXAMINATION_ANSWER_INCORRECT);
          setAnsweredWrongly((prev) => [...prev, currentCard]);
        }

        break;

      case Mode.QUIZ_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          setSystemMsg(
            `${answeredCorrectly.length} слов из ${currentVoc.cards.length}, ${answeredWrongly.length} неправильно.`
          );
          console.log(answeredCorrectly, answeredWrongly);
          return;
        }
        switchCard(card);
        modeState.switchMode(Mode.QUIZ_QUESTION);
        setUserAnswer("");
        setWrongClicked([]);
        break;

      case Mode.QUIZ_QUESTION:
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setAskedCards((prev) => [...prev, currentCard]);
          modeState.switchMode(Mode.QUIZ_ANSWER_CORRECT);
          wrongClicked.length > 0
            ? setAnsweredWrongly((prev) => [...prev, currentCard])
            : setAnsweredCorrectly((prev) => [...prev, currentCard]);
        } else {
          const clickedCard = cardsArrForQuiz.find(
            (e) => e[ansLang].toLowerCase() === userAnswer
          );
          if (!clickedCard) return;
          setWrongClicked((prev) => [...prev, clickedCard.id]);
        }

        break;

      case Mode.STUDY:
        switchCard(card);
        break;
      default:
        break;
    }
  }

  return {
    switchMode,
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
    answeredCorrectly,
    cardsArrForQuiz,
    wrongClicked,
    systemMsg,
    reset,
  };
};

export default useMode;
