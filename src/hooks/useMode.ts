import { useState, useEffect } from "react";
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
  const [cardsArr, setCardsArr] = useState<Array<Card>>([]);
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU);
  const [askedCards, setAskedCards] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [examinationStatus, setExaminationStatus] = useState<boolean[]>([]);
  const [queezeStatus, setQueezeStatus] = useState<boolean[]>([]);
  const [wrongClicked, setWrongClicked] = useState<Array<Number>>([]);

  function addElemIntoArrWithRandomIndex(arr: Array<Card>, elem: Card) {
    const index = Math.floor(Math.random() * arr.length);
    const resultArr = [...arr.slice(0, index), elem, ...arr.slice(index)];

    return resultArr;
  }

  function createCardArr() {
    const supplCards = Array();
    while (supplCards.length < 3) {
      const card = currentVoc.cards[getRandomIndex()];
      if (
        card.id === currentCard.id ||
        supplCards.some((e) => e.id === card.id)
      )
        return;
      supplCards.push(card);
    }
    setCardsArr(addElemIntoArrWithRandomIndex(supplCards, currentCard));
  }

  useEffect(() => {
    console.log(mode);

    if (mode !== Mode.QUIZ_QUESTION) return;
    createCardArr();
  }, [mode]);

  useEffect(() => {
    if (mode !== Mode.QUIZ_QUESTION) return;
    goAhead();
  }, [userAnswer]);

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

  function goAhead() {
    let index: number = getRandomIndex();
    switch (mode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (askedCards.length === currentVoc.cards.length) {
          return console.log(
            `Опрос окончен. Ваш результат: ${
              examinationStatus.filter((e) => !!e).length
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
              examinationStatus.filter((e) => !!e).length
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
              queezeStatus.filter((e) => !!e).length
            } слов из ${currentVoc.cards.length}`
          );
        }
        while (askedCards.includes(index)) {
          index = getRandomIndex();
        }

        setCard(index);
        setAskedCards((prev) => [...prev, index]);
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
          setQueezeStatus((prev) => [...prev, true]);
        } else {
          const clicked = cardsArr.find(
            (e) => e[ansLang].toLowerCase() === userAnswer
          );
          if (!!clicked) {
            setWrongClicked((prev) => [...prev, clicked.id]);
          }
          setQueezeStatus((prev) => [...prev, false]);
        }

        break;

      case Mode.EXAMINATION_RESULT:
        setCard(index);
        break;
      case Mode.QUIZ_RESULT:
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
    goAhead,
    userAnswer,
    setUserAnswer,
    modalOpen,
    setModalOpen,
    examinationStatus,
    cardsArr,
    wrongClicked,
  };
}
