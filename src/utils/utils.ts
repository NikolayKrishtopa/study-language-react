import { ISubmitButtonProps } from "../components/SubmitButton/SubmitButton.props";
import { Mode } from "../models/models";

export function getRandomArrElement<T extends { id: number }>(
  arr: Array<T>,
  elementsToExclude?: Array<T>
): T {
  const unusedElements = arr.filter(
    (el) => !elementsToExclude?.some((e) => e.id === el.id)
  );
  const randomCard =
    unusedElements[Math.floor(Math.random() * unusedElements.length)];
  return randomCard;
}

export function addElemIntoArrWithRandomIndex<T>(
  arr: Array<T>,
  elem: T
): Array<T> {
  const index = Math.floor(Math.random() * arr.length);
  const resultArr = [...arr.slice(0, index), elem, ...arr.slice(index)];

  return resultArr;
}

export function createRandomElemArr<T extends { id: number }>(
  sourceArr: Array<T>,
  resultArrLength: number,
  elementsToInclude?: Array<T>,
  elementsToExclude?: Array<T>
): Array<T> {
  let supplCards: Array<T> = [];
  const randomCardsQtyNeeded =
    !!elementsToInclude && elementsToInclude.length > 0
      ? resultArrLength - elementsToInclude.length
      : resultArrLength;
  while (supplCards.length < randomCardsQtyNeeded) {
    const card = getRandomArrElement(sourceArr, elementsToExclude || []);
    if (
      (!!elementsToInclude &&
        elementsToInclude.some((e) => e.id === card.id)) ||
      supplCards.some((e) => e.id === card.id)
    )
      continue;
    supplCards.push(card);
  }
  if (elementsToInclude) {
    elementsToInclude.forEach((e) => {
      supplCards = addElemIntoArrWithRandomIndex(supplCards, e);
    });
  }
  return supplCards;
}

export const isSubmitButtonShown = (mode: Mode) => {
  return mode !== Mode.QUIZ_ANSWER_INCORRECT && mode !== Mode.QUIZ_QUESTION;
};

export const submitButtonType = (mode: Mode): ISubmitButtonProps["type"] => {
  if (mode === Mode.EXAMINATION_QUESTION) {
    return "submit";
  }
  if (
    mode === Mode.STUDY ||
    mode === Mode.QUIZ_ANSWER_CORRECT ||
    mode === Mode.EXAMINATION_ANSWER_CORRECT ||
    mode === Mode.EXAMINATION_ANSWER_INCORRECT
  ) {
    return "forward";
  }
  return undefined;
};

export const submitButtonStyle = (mode: Mode): ISubmitButtonProps["state"] => {
  if (mode === Mode.STUDY || mode === Mode.EXAMINATION_QUESTION) {
    return "neutral";
  }
  if (
    mode === Mode.QUIZ_ANSWER_CORRECT ||
    mode === Mode.EXAMINATION_ANSWER_CORRECT
  ) {
    return "success";
  }
  if (
    mode === Mode.QUIZ_ANSWER_INCORRECT ||
    mode === Mode.EXAMINATION_ANSWER_INCORRECT
  ) {
    return "fail";
  }
  return undefined;
};
