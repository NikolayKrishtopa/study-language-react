import { Mode } from "../../models/models";
import Card from "../Card/Card";
import { ICardsContainerProps } from "./CardsContainer.props.";

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
  return (
    <div className="content__cards-container">
      {mode === Mode.STUDY && (
        <Card
          value={currentCard[askLang]}
          mode="text"
          state="neutral"
          id="questionCard"
        />
      )}
      {mode === Mode.QUIZ_ANSWER_CORRECT ||
      mode === Mode.QUIZ_ANSWER_INCORRECT ||
      mode === Mode.QUIZ_QUESTION ? (
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
          value={
            mode === Mode.STUDY ||
            mode === Mode.EXAMINATION_ANSWER_CORRECT ||
            mode === Mode.EXAMINATION_ANSWER_INCORRECT
              ? currentCard[ansLang]
              : userAnswer
          }
          mode={
            mode === Mode.STUDY ||
            mode === Mode.EXAMINATION_ANSWER_CORRECT ||
            mode === Mode.EXAMINATION_ANSWER_INCORRECT
              ? "text"
              : "input"
          }
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
