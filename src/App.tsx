import "./index.scss";
import "../public/vendor/fonts/fonts.scss";
import useMode from "./hooks/useMode";
import { Lang, Mode } from "./models/models";
import Card from "./components/Card/Card";
import cn from "classnames";
import Annotation from "./components/Annotation/Annotation";
import { Header } from "./components/Header/Header";
import { Popup } from "./components/Popup/Popup";
import { useState } from "react";
import { Menu } from "./components/Menu/Menu";

function App() {
  const {
    mode,
    setMode,
    currentVoc,
    swithCurrentVoc,
    askLang,
    currentCard,
    ansLang,
    goAhead,
    userAnswer,
    setUserAnswer,
    modalOpen,
    cardsArrForQuiz,
    wrongClicked,
  } = useMode();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // useEffect(() => {
  //   const onEnter = (e: { keyCode: number }) => {
  //     if (e.keyCode === 13) {
  //       goAhead()
  //     }
  //   }
  //   window.addEventListener('keyup', onEnter)
  //   return () => {
  //     window.removeEventListener('keyup', onEnter)
  //   }
  // }, [mode])

  return (
    <div
      className={cn("page", {
        page_correct:
          mode === Mode.EXAMINATION_ANSWER_CORRECT ||
          mode === Mode.QUIZ_ANSWER_CORRECT,
      })}
    >
      {modalOpen && <div>модальное окно открыто</div>}
      <Popup isOpen={menuOpen}>
        <Menu
          mode={mode}
          currentVoc={currentVoc}
          swithCurrentVoc={swithCurrentVoc}
          setMode={setMode}
        />
      </Popup>
      <Header onClickHandler={toggleMenu} isMenuShown={menuOpen} />
      <main className="content">
        <Annotation
          prefixText={
            mode === Mode.STUDY
              ? "Постарайтесь запомнить как можно больше слов"
              : mode === Mode.QUIZ_QUESTION || mode === Mode.QUIZ_ANSWER_CORRECT
              ? "Выберите правильный вариант перевода ..."
              : `Переведите на ${
                  askLang === Lang.RU ? "английский" : "русский"
                } язык ...`
          }
          mainText={mode === Mode.STUDY ? "" : currentCard[askLang]}
        />

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
        <div>
          {mode !== Mode.QUIZ_ANSWER_INCORRECT &&
            mode !== Mode.QUIZ_QUESTION && (
              <button
                className="button"
                id="nextCardButton"
                onClick={() => {
                  goAhead();
                }}
              >
                {mode === Mode.STUDY ||
                mode === Mode.EXAMINATION_ANSWER_CORRECT ||
                mode === Mode.EXAMINATION_ANSWER_INCORRECT
                  ? "Следующая карточка"
                  : "Проверить ответ"}
              </button>
            )}
        </div>
      </main>
      <footer className="footer">
        <div className="overlay"></div>
      </footer>
    </div>
  );
}

export default App;
