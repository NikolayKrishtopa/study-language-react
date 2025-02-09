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
import { observer } from "mobx-react-lite";
import modeState from "./store/mode";
import cardsState from "./store/cards";
import langState from "./store/language";
import curInterfaceState from "./store/interface";

const App = observer(() => {
  const {
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
  } = useMode(modeState, cardsState, langState, curInterfaceState);

  const [menuOpen, setMenuOpen] = useState(false);

  const submitButtonShown = isSubmitButtonShown(modeState.currentMode);

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
          modeState.currentMode === Mode.EXAMINATION_ANSWER_CORRECT ||
          modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT,
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
            mode={modeState.currentMode}
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
            modeState.currentMode === Mode.STUDY
              ? "Постарайтесь запомнить как можно больше слов"
              : modeState.currentMode === Mode.QUIZ_QUESTION ||
                modeState.currentMode === Mode.QUIZ_ANSWER_CORRECT
              ? "Выберите правильный вариант перевода ..."
              : `Переведите на ${
                  askLang === Lang.RU ? "английский" : "русский"
                } язык ...`
          }
          mainText={
            modeState.currentMode === Mode.STUDY ? "" : currentCard[askLang]
          }
        />

        <CardsContainer
          mode={modeState.currentMode}
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
              type={submitButtonType(modeState.currentMode)}
              state={submitButtonStyle(modeState.currentMode)}
            />
          )}
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
});

export default App;
