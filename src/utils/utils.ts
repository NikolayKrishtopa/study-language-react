export function getRandomArrElement<T extends { id: Number }>(
  arr: Array<T>,
  elementsToExclude?: Array<T>
): T {
  const unusedCards = arr.filter(
    (el) => !elementsToExclude?.some((e) => e.id === el.id)
  );
  const randomCard =
    unusedCards[Math.floor(Math.random() * unusedCards.length)];
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
