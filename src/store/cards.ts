import { makeAutoObservable } from "mobx";
import { Card } from "../models/models";

class Cards {
  cardsArr: Array<Card> = [];
  currentCard: undefined | Card = undefined;
  answeredCorrectly: Array<Card> = [];
  answeredWrongly: Array<Card> = [];
  askedCards: Array<Card> = [];
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
}

export default new Cards();
