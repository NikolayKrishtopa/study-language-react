import { Mode } from "../../models/models";
import Card from "../Card/Card";
import "./CardsContainer.scss";
import modeState from "../../store/modeState";
import cardsState from "./../../store/cardsState";
import curInterfaceState from "./../../store/interfaceState";
import languageState from "./../../store/languageState";
import { observer } from "mobx-react-lite";

export const CardsContainer = observer(() => {
  const isStudy = modeState.currentMode === Mode.STUDY;

  const isQuiz =
    modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT ||
    modeState.currentMode === Mode.QUIZ_ANSWER_INCORRECT ||
    modeState.currentMode === Mode.QUIZ_QUESTION;

  const isTypeText =
    modeState.currentMode === Mode.STUDY ||
    modeState.currentMode === Mode.EXAMINATION_ANSWER_CORRECT ||
    modeState.currentMode === Mode.EXAMINATION_ANSWER_INCORRECT;

  return (
    <div className="cards-container">
      {isStudy && (
        <Card
          value={cardsState.currentCard[languageState.askLang]}
          mode="text"
          state="neutral"
          id="questionCard"
        />
      )}
      {isQuiz ? (
        <>
          {cardsState.cardsArr.map((e) => (
            <Card
              key={e.id}
              value={e[languageState.ansLang]}
              mode={
                modeState.currentMode === Mode.QUIZ_QUESTION ? "button" : "text"
              }
              state={
                cardsState.wrongClicked.includes(e.id)
                  ? "incorrect"
                  : modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT &&
                    curInterfaceState.userAnswer.toLowerCase() ===
                      e[languageState.ansLang]
                  ? "correct"
                  : "neutral"
              }
              clickHandler={() =>
                curInterfaceState.changeUserAnswer(e[languageState.ansLang])
              }
            />
          ))}
        </>
      ) : (
        <Card
          value={
            isTypeText
              ? cardsState.currentCard[languageState.ansLang]
              : curInterfaceState.userAnswer
          }
          mode={isTypeText ? "text" : "input"}
          inputHandler={(e) =>
            curInterfaceState.changeUserAnswer(e.currentTarget.value)
          }
          state={
            modeState.currentMode === Mode.EXAMINATION_ANSWER_CORRECT
              ? "correct"
              : modeState.currentMode === Mode.EXAMINATION_ANSWER_INCORRECT
              ? "incorrect"
              : "neutral"
          }
          id="answerCard"
        />
      )}
    </div>
  );
});
