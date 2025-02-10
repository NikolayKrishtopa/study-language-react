import { makeAutoObservable } from "mobx";
import { Card } from "../models/models";
import languageState from "./languageState";
import { getRandomArrElement } from "../utils/utils";

class Cards {
  cardsArr: Array<Card> = [];
  answeredCorrectly: Array<Card> = [];
  answeredWrongly: Array<Card> = [];
  askedCards: Array<Card> = [];
  currentCard: Card = getRandomArrElement(
    languageState.currentVoc.cards,
    this.askedCards
  );
  wrongClicked: Array<Number> = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentCard(newCard: Card) {
    this.currentCard = newCard;
  }

  setCardsArr(newCardsArr: Array<Card>) {
    this.cardsArr = newCardsArr;
  }

  addToCorrectly(newCard: Card) {
    this.answeredCorrectly.push(newCard);
  }

  addToWrongly(newCard: Card) {
    this.answeredWrongly.push(newCard);
  }

  markAsAsked(card: Card) {
    this.askedCards.push(card);
  }

  addToWrongClicked(id: Number) {
    this.wrongClicked.push(id);
  }

  resetWrongClicked() {
    this.wrongClicked = [];
  }

  reset() {
    this.answeredCorrectly = [];
    this.answeredCorrectly = [];
    this.askedCards = [];
    this.resetWrongClicked();
  }
}

export default new Cards();
