import { Mode } from "../../models/models";
import Card from "../Card/Card";
import { ICardsContainerProps } from "./CardsContainer.props.";
import "./CardsContainer.scss";

export const CardsContainer = ({
  mode,
  cardsArrForQuiz,
  currentCard,
  userAnswer,
  ansLang,
  wrongClicked,
  askLang,
  setUserAnswer,
}: ICardsContainerProps) => {
  const isStudy = mode === Mode.STUDY;

  const isQuiz =
    mode === Mode.QUIZ_ANSWER_CORRECT ||
    mode === Mode.QUIZ_ANSWER_INCORRECT ||
    mode === Mode.QUIZ_QUESTION;

  const isTypeText =
    mode === Mode.STUDY ||
    mode === Mode.EXAMINATION_ANSWER_CORRECT ||
    mode === Mode.EXAMINATION_ANSWER_INCORRECT;

  return (
    <div className="cards-container">
      {isStudy && (
        <Card
          value={currentCard[askLang]}
          mode="text"
          state="neutral"
          id="questionCard"
        />
      )}
      {isQuiz ? (
        <>
          {cardsArrForQuiz.map((e) => (
            <Card
              key={e.id}
              value={e[ansLang]}
              mode={mode === Mode.QUIZ_QUESTION ? "button" : "text"}
              state={
                wrongClicked.includes(e.id)
                  ? "incorrect"
                  : mode === Mode.QUIZ_ANSWER_CORRECT &&
                    userAnswer.toLowerCase() === e[ansLang]
                  ? "correct"
                  : "neutral"
              }
              clickHandler={() => setUserAnswer(e[ansLang])}
            />
          ))}
        </>
      ) : (
        <Card
          value={isTypeText ? currentCard[ansLang] : userAnswer}
          mode={isTypeText ? "text" : "input"}
          inputHandler={(e) => setUserAnswer(e.currentTarget.value)}
          state={
            mode === Mode.EXAMINATION_ANSWER_CORRECT
              ? "correct"
              : mode === Mode.EXAMINATION_ANSWER_INCORRECT
              ? "incorrect"
              : "neutral"
          }
          id="answerCard"
        />
      )}
    </div>
  );
};
