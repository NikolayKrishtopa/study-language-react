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
  const [cardsArrForQuiz, setCardsArrForQuiz] = useState<Array<Card>>([]);
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU);
  const [askedCards, setAskedCards] = useState<Card[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [systemMsg, setSystemMsg] = useState<string>("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Card[]>([]);
  const [answeredWrongly, setAnsweredWrongly] = useState<Card[]>([]);
  const [wrongClicked, setWrongClicked] = useState<Array<Number>>([]);
  const [currentCard, setCurrentCard] = useState<Card>(
    getRandomArrElement(currentVoc.cards, askedCards)
  );

  useEffect(() => {
    if (mode !== Mode.QUIZ_QUESTION) return;
    setCardsArrForQuiz(createCardsArrForQuiz(currentVoc.cards, 4, currentCard));
    // console.log("card array set", cardsArrForQuiz);
  }, [mode]);

  useEffect(() => {
    if (mode !== Mode.QUIZ_QUESTION) return;
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
      mode === Mode.QUIZ_ANSWER_CORRECT ||
      mode === Mode.QUIZ_ANSWER_INCORRECT
    ) {
      setMode(Mode.QUIZ_QUESTION);
      setCardsArrForQuiz(createCardsArrForQuiz(currentVoc.cards, 4, card));
    }
    if (
      mode === Mode.EXAMINATION_ANSWER_CORRECT ||
      mode === Mode.EXAMINATION_ANSWER_INCORRECT
    ) {
      setMode(Mode.QUIZ_QUESTION);
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

  function switchMode(mode: Mode) {
    reset();
    setMode(mode);
  }

  function goAhead() {
    const card = getRandomArrElement(currentVoc.cards, askedCards);
    switch (mode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          setSystemMsg(
            `${answeredCorrectly.length} слов из ${currentVoc.cards.length}, ${answeredWrongly.length} неправильно.`
          );
          console.log(answeredCorrectly, answeredWrongly);

          return;
        }
        switchCard(card);
        setMode(Mode.EXAMINATION_QUESTION);
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
        setMode(Mode.EXAMINATION_QUESTION);
        setUserAnswer("");
        break;
      case Mode.EXAMINATION_QUESTION:
        setAskedCards((prev) => [...prev, currentCard]);
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setMode(Mode.EXAMINATION_ANSWER_CORRECT);
          setAnsweredCorrectly((prev) => [...prev, currentCard]);
        } else {
          setMode(Mode.EXAMINATION_ANSWER_INCORRECT);
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
        setMode(Mode.QUIZ_QUESTION);
        setUserAnswer("");
        setWrongClicked([]);
        break;

      case Mode.QUIZ_QUESTION:
        if (
          userAnswer.length > 0 &&
          currentCard[ansLang].toLowerCase().includes(userAnswer.toLowerCase())
        ) {
          setAskedCards((prev) => [...prev, currentCard]);
          setMode(Mode.QUIZ_ANSWER_CORRECT);
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
    mode,
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
}
