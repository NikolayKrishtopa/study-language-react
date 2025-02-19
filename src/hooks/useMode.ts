import { useEffect } from "react";
import vocaburaries from "../vocaburaries/vocaburaries";
import { Card, Lang, Mode } from "../models/models";
import {
  getRandomArrElement,
  createRandomElemArr as createCardsArrForQuiz,
} from "../utils/utils";
import modeForType from "../store/modeState";
import cardsForType from "../store/cardsState";
import langForType from "../store/languageState";
import curInterfaceForType from "../store/interfaceState";

const useMode = (
  modeState: typeof modeForType,
  cardsState: typeof cardsForType,
  langState: typeof langForType,
  curInterfaceState: typeof curInterfaceForType
) => {
  // const [cardsState.currentCard, cardsState.changeCurrentCard] = useState<Card>(
  //   getRandomArrElement(langState.currentVoc.cards, cardsState.askedCards)
  // );

  useEffect(() => {
    if (modeState.currentMode !== Mode.QUIZ_QUESTION) return;
    cardsState.setCardsArr(
      createCardsArrForQuiz(langState.currentVoc.cards, 4, [
        cardsState.currentCard,
      ])
    );
  }, [modeState.currentMode]);

  useEffect(() => {
    if (modeState.currentMode !== Mode.QUIZ_QUESTION) return;
    goAhead();
  }, [curInterfaceState.userAnswer]);

  function reset() {
    const card = getRandomArrElement(langState.currentVoc.cards);
    cardsState.changeCurrentCard(card);
    cardsState.reset();
    curInterfaceState.reset();
    if (
      modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT ||
      modeState.currentMode === Mode.QUIZ_ANSWER_INCORRECT
    ) {
      modeState.switchMode(Mode.QUIZ_QUESTION);
      cardsState.setCardsArr(
        createCardsArrForQuiz(langState.currentVoc.cards, 4, [card])
      );
    }
    if (
      modeState.currentMode === Mode.EXAMINATION_ANSWER_CORRECT ||
      modeState.currentMode === Mode.EXAMINATION_ANSWER_INCORRECT
    ) {
      modeState.switchMode(Mode.QUIZ_QUESTION);
      cardsState.setCardsArr(
        createCardsArrForQuiz(langState.currentVoc.cards, 4, [card])
      );
    }
  }

  function swithCurrentVoc(vocNum: number) {
    langState.changeCurrentVoc(vocaburaries[vocNum]);
    reset();
  }

  function toggleLang() {
    switch (langState.askLang) {
      case Lang.EN: {
        langState.changeAskLang(Lang.RU);
        langState.changeAnsLang(Lang.EN);
        return;
      }
      case Lang.RU: {
        langState.changeAskLang(Lang.EN);
        langState.changeAnsLang(Lang.RU);
        return;
      }
      default: {
        return;
      }
    }
  }

  function switchCard(card: Card) {
    cardsState.changeCurrentCard(card);
    toggleLang();
  }

  function switchMode(newMode: Mode) {
    reset();
    modeState.switchMode(newMode);
  }

  function goAhead() {
    const card = getRandomArrElement(
      langState.currentVoc.cards,
      cardsState.askedCards
    );
    switch (modeState.currentMode) {
      case Mode.EXAMINATION_ANSWER_CORRECT:
        if (
          cardsState.askedCards.length === langState.currentVoc.cards.length
        ) {
          curInterfaceState.setSystemMsg(
            `${cardsState.answeredCorrectly.length} слов из ${langState.currentVoc.cards.length}, ${cardsState.answeredWrongly.length} неправильно.`
          );
          console.log(cardsState.answeredCorrectly, cardsState.answeredWrongly);

          return;
        }
        switchCard(card);
        modeState.switchMode(Mode.EXAMINATION_QUESTION);
        curInterfaceState.resetUserAnswer();
        break;

      case Mode.EXAMINATION_ANSWER_INCORRECT:
        if (
          cardsState.askedCards.length === langState.currentVoc.cards.length
        ) {
          curInterfaceState.setSystemMsg(
            `${cardsState.answeredCorrectly.length} слов из ${langState.currentVoc.cards.length}, ${cardsState.answeredWrongly.length} неправильно.`
          );
          console.log(cardsState.answeredCorrectly, cardsState.answeredWrongly);
          return;
        }

        switchCard(card);
        modeState.switchMode(Mode.EXAMINATION_QUESTION);
        curInterfaceState.resetUserAnswer();
        break;
      case Mode.EXAMINATION_QUESTION:
        if (!cardsState.currentCard) return;
        cardsState.markAsAsked(cardsState.currentCard);
        if (
          curInterfaceState.userAnswer.length > 0 &&
          cardsState.currentCard[langState.ansLang]
            .toLowerCase()
            .includes(curInterfaceState.userAnswer.toLowerCase())
        ) {
          modeState.switchMode(Mode.EXAMINATION_ANSWER_CORRECT);
          cardsState.addToCorrectly(cardsState.currentCard);
        } else {
          modeState.switchMode(Mode.EXAMINATION_ANSWER_INCORRECT);
          cardsState.addToWrongly(cardsState.currentCard);
        }

        break;

      case Mode.QUIZ_ANSWER_CORRECT:
        if (
          cardsState.askedCards.length === langState.currentVoc.cards.length
        ) {
          curInterfaceState.setSystemMsg(
            `${cardsState.answeredCorrectly.length} слов из ${langState.currentVoc.cards.length}, ${cardsState.answeredWrongly.length} неправильно.`
          );
          return;
        }
        switchCard(card);
        modeState.switchMode(Mode.QUIZ_QUESTION);
        curInterfaceState.resetUserAnswer();
        cardsState.resetWrongClicked();
        break;

      case Mode.QUIZ_QUESTION:
        if (!cardsState.currentCard) return;
        if (
          curInterfaceState.userAnswer.length > 0 &&
          cardsState.currentCard[langState.ansLang]
            .toLowerCase()
            .includes(curInterfaceState.userAnswer.toLowerCase())
        ) {
          cardsState.markAsAsked(cardsState.currentCard);
          modeState.switchMode(Mode.QUIZ_ANSWER_CORRECT);
          cardsState.wrongClicked.length > 0
            ? cardsState.addToWrongly(cardsState.currentCard)
            : cardsState.addToCorrectly(cardsState.currentCard);
        } else {
          const clickedCard = cardsState.cardsArr.find(
            (e) =>
              e[langState.ansLang].toLowerCase() ===
              curInterfaceState.userAnswer
          );
          if (!clickedCard) return;
          cardsState.addToWrongClicked(clickedCard.id);
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
    swithCurrentVoc,
    goAhead,
    reset,
  };
};

export default useMode;
