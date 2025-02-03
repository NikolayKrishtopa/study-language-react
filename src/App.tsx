import "./index.scss";
import "../public/vendor/fonts/fonts.scss";
import useMode from "./hooks/useMode";
import { Lang, Mode } from "./models/models";
import cn from "classnames";
import Annotation from "./components/Annotation/Annotation";
import { Header } from "./components/Header/Header";
import { Popup } from "./components/Popup/Popup";
import { useState } from "react";
import { Menu } from "./components/Menu/Menu";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
import { Message } from "./components/Message/Message";
import { SubmitButton } from "./components/SubmitButton/SubmitButton";
import {
  isSubmitButtonShown,
  submitButtonType,
  submitButtonStyle,
} from "./utils/utils";

function App() {
  const {
    mode,
    switchMode,
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
    systemMsg,
    reset,
  } = useMode();

  const [menuOpen, setMenuOpen] = useState(false);

  const submitButtonShown = isSubmitButtonShown(mode);

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
      <Popup
        isOpen={menuOpen || !!systemMsg}
        colorsInverted={!menuOpen}
        onClose={!menuOpen ? reset : undefined}
      >
        {menuOpen ? (
          <Menu
            mode={mode}
            currentVoc={currentVoc}
            swithCurrentVoc={swithCurrentVoc}
            switchMode={switchMode}
          />
        ) : (
          <Message title="Опрос окончен. Ваш результат:" text={systemMsg} />
        )}
      </Popup>

      <Header
        onClickHandler={toggleMenu}
        isMenuShown={menuOpen}
        showMenuBtn={!systemMsg}
      />
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

        <CardsContainer
          mode={mode}
          cardsArrForQuiz={cardsArrForQuiz}
          currentCard={currentCard}
          userAnswer={userAnswer}
          ansLang={ansLang}
          askLang={askLang}
          wrongClicked={wrongClicked}
          setUserAnswer={setUserAnswer}
        />
        <div>
          {!!submitButtonShown && (
            <SubmitButton
              id="submitBtn"
              onClick={goAhead}
              type={submitButtonType(mode)}
              state={submitButtonStyle(mode)}
            />
          )}
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
