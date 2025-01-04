import "./index.css";
import vocaburaries from "./vocaburaries/vocaburaries";
import useMode from "./hooks/useMode";
import { Mode } from "./models/models";
import Card from "./components/Card/Card";
import { ButtonSwitcher } from "./components/ButtonSwitcher/ButtonSwitcher";

function App() {
  const {
    mode,
    setMode,
    currentVoc,
    swithCurrentVoc,
    askLang,
    currentCard,
    ansLang,
    setNextCard,
    userAnswer,
    setUserAnswer,
    modalOpen,
    setModalOpen,
    quizStatus,
    setQuizStatus,
  } = useMode();

  // useEffect(() => {
  //   const onEnter = (e: { keyCode: number }) => {
  //     if (e.keyCode === 13) {
  //       setNextCard(mode)
  //     }
  //   }
  //   window.addEventListener('keyup', onEnter)
  //   return () => {
  //     window.removeEventListener('keyup', onEnter)
  //   }
  // }, [mode])

  return (
    <div className="page">
      {modalOpen && <div>модальное окно открыто</div>}
      <header className="header">
        <div className="overlay"></div>
      </header>
      <main className="content">
        <p>Выберите изучаемый словарь</p>
        <ButtonSwitcher
          buttons={vocaburaries}
          activeId={currentVoc.id}
          additionalClass="button_type_voc"
          switchHandler={(arg) => {
            if (typeof arg !== "number") return;
            swithCurrentVoc(arg);
          }}
        />
        <ButtonSwitcher
          buttons={[
            { id: Mode.STUDY, text: "Изучение", value: Mode.STUDY },
            {
              id: Mode.QUIZ_QUESTION,
              text: "Опрос",
              value: Mode.QUIZ_QUESTION,
            },
          ]}
          activeId={
            mode === Mode.QUIZ_QUESTION ||
            mode === Mode.QUIZ_ANSWER_CORRECT ||
            mode === Mode.QUIZ_ANSWER_INCORRECT
              ? Mode.QUIZ_QUESTION
              : Mode.STUDY
          }
          switchHandler={setMode}
        />
        <div className="content__cards-container">
          <Card
            value={currentCard[askLang]}
            mode="text"
            state="neutral"
            id="questionCard"
          />
          <Card
            value={
              mode === Mode.STUDY ||
              mode === Mode.QUIZ_ANSWER_CORRECT ||
              mode === Mode.QUIZ_ANSWER_INCORRECT
                ? currentCard[ansLang]
                : userAnswer
            }
            mode={
              mode === Mode.STUDY ||
              mode === Mode.QUIZ_ANSWER_CORRECT ||
              mode === Mode.QUIZ_ANSWER_INCORRECT
                ? "text"
                : "input"
            }
            inputHandler={(e) => setUserAnswer(e.currentTarget.value)}
            state={
              mode === Mode.QUIZ_ANSWER_CORRECT
                ? "correct"
                : mode === Mode.QUIZ_ANSWER_INCORRECT
                ? "incorrect"
                : "neutral"
            }
            id="answerCard"
          />
        </div>
        <div>
          <button
            className="button"
            id="nextCardButton"
            onClick={() => {
              // if (mode === Mode.STUDY) setNextCard(mode)
              setNextCard(mode);
            }}
          >
            {mode === Mode.STUDY ||
            mode === Mode.QUIZ_ANSWER_CORRECT ||
            mode === Mode.QUIZ_ANSWER_INCORRECT
              ? "Следующая карточка"
              : "Проверить ответ"}
          </button>
        </div>
      </main>
      <footer className="footer">
        <div className="overlay"></div>
      </footer>
    </div>
  );
}

export default App;
