import { ISubmitButtonProps } from "../components/SubmitButton/SubmitButton.props";
import { Lang, Mode } from "../models/models";

export function getRandomArrElement<T extends { id: Number }>(
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

export function createRandomElemArr<T extends { id: Number }>(
  sourceArr: Array<T>,
  resultArrLength: number,
  elementToInclude?: T,
  elementsToExclude?: Array<T>
): Array<T> {
  const supplCards = Array();
  const randomCardsQtyNeeded = !!elementToInclude
    ? resultArrLength - 1
    : resultArrLength;
  while (supplCards.length < randomCardsQtyNeeded) {
    const card = getRandomArrElement(sourceArr, elementsToExclude || []);
    if (
      !!elementToInclude &&
      (card.id === elementToInclude.id ||
        supplCards.some((e) => e.id === card.id))
    )
      continue;
    supplCards.push(card);
  }
  return !!elementToInclude
    ? addElemIntoArrWithRandomIndex(supplCards, elementToInclude)
    : supplCards;
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
