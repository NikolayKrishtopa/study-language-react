import { Card, Lang, Mode } from "../../models/models";

export interface ICardsContainerProps {
  mode: Mode;
  cardsArrForQuiz: Array<Card>;
  currentCard: Card;
  userAnswer: string;
  ansLang: Lang;
  askLang: Lang;
  wrongClicked: Array<Number>;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
}
