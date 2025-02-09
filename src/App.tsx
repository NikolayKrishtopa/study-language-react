import "./index.scss";
import "../public/vendor/fonts/fonts.scss";
import useMode from "./hooks/useMode";
import { Lang, Mode } from "./models/models";
import cn from "classnames";
import Annotation from "./components/Annotation/Annotation";
import { Header } from "./components/Header/Header";
import { Popup } from "./components/Popup/Popup";
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
import modeState from "./store/modeState";
import cardsState from "./store/cardsState";
import curInterfaceState from "./store/interfaceState";
import languageState from "./store/languageState";

const App = observer(() => {
  const { switchMode, swithCurrentVoc, goAhead, reset } = useMode(
    modeState,
    cardsState,
    languageState,
    curInterfaceState
  );

  const submitButtonShown = isSubmitButtonShown(modeState.currentMode);

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
      <Popup
        isOpen={curInterfaceState.menuOpen || !!curInterfaceState.systemMsg}
        colorsInverted={!curInterfaceState.menuOpen}
        onClose={!curInterfaceState.menuOpen ? reset : undefined}
      >
        {curInterfaceState.menuOpen ? (
          <Menu
            mode={modeState.currentMode}
            currentVoc={languageState.currentVoc}
            swithCurrentVoc={swithCurrentVoc}
            switchMode={switchMode}
          />
        ) : (
          <Message
            title="Опрос окончен. Ваш результат:"
            text={curInterfaceState.systemMsg}
          />
        )}
      </Popup>

      <Header
        onClickHandler={() => curInterfaceState.toggleMenu()}
        isMenuShown={curInterfaceState.menuOpen}
        showMenuBtn={!curInterfaceState.systemMsg}
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
                  languageState.askLang === Lang.RU ? "английский" : "русский"
                } язык ...`
          }
          mainText={
            modeState.currentMode === Mode.STUDY || !cardsState.currentCard
              ? ""
              : cardsState.currentCard[languageState.askLang]
          }
        />

        {cardsState.currentCard && <CardsContainer />}
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
