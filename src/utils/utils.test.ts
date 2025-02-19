import {
  addElemIntoArrWithRandomIndex,
  getRandomArrElement,
  createRandomElemArr,
} from "./utils";

addElemIntoArrWithRandomIndex([1, 4, 6], 9);

describe("add element into array with random index", () => {
  test("element added into array", () => {
    expect(
      addElemIntoArrWithRandomIndex([1, 4, 6], 9).some((e) => e === 9)
    ).toBe(true);
  });
  test("element added into array", () => {
    expect(
      addElemIntoArrWithRandomIndex([1, 4, 6], 9).some((e) => e === 9)
    ).toBe(true);
  });
});

describe("get random element of array", () => {
  const arr = [
    { id: 1 },
    { id: 4 },
    { id: 6 },
    { id: 9 },
    { id: 42 },
    { id: 14 },
    { id: 89 },
  ];
  const elementsToExclude = [{ id: 9 }];
  test("elements excluded", () => {
    expect(getRandomArrElement(arr, elementsToExclude).id === 9).toBe(false);
  });
  test("taken from correct pool", () => {
    expect(
      [1, 4, 6, 42, 14, 89].includes(
        getRandomArrElement(arr, elementsToExclude).id
      )
    ).toBe(true);
  });
});

describe("create array of random elements", () => {
  const arr = [
    { id: 1 },
    { id: 4 },
    { id: 6 },
    { id: 9 },
    { id: 42 },
    { id: 14 },
    { id: 89 },
  ];
  const elementsToExclude = [{ id: 14 }, { id: 9 }];
  const elementsToInclude = [{ id: 111 }, { id: 222 }];
  const length = 3;
  test("elements excluded", () => {
    expect(
      createRandomElemArr(
        arr,
        length,
        elementsToInclude,
        elementsToExclude
      ).some((e) => e.id === 9 || e.id === 14)
    ).toBe(false);
  });
  test("taken from correct pool", () => {
    expect(
      createRandomElemArr(
        arr,
        length,
        elementsToInclude,
        elementsToExclude
      ).some(
        (e) =>
          e.id === 1 ||
          e.id === 4 ||
          e.id === 6 ||
          e.id === 42 ||
          e.id === 89 ||
          e.id === 111 ||
          e.id === 222
      )
    ).toBe(true);
  });
  test("array length is correct", () => {
    expect(createRandomElemArr(arr, length, elementsToExclude).length).toBe(
      length
    );
  });
  test("elements to include added", () => {
    const res = createRandomElemArr(
      arr,
      length,
      elementsToInclude,
      elementsToExclude
    );
    expect(
      elementsToInclude.map((e) => {
        res.some((el) => el.id === e.id);
      }).length
    ).toEqual(elementsToInclude.length);
  });
});
