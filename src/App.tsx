import './index.css'
import vocaburaries from './vocaburaries/vocaburaries'
import useMode from './hooks/useMode'
import { Mode } from './models/models'
import { useEffect } from 'react'

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
  } = useMode()
  
  return (
    <div className="page">
      <header className="header">
        <div className="overlay"></div>
      </header>
      <main className="content">
        <div className="flex-column">
          <p>Выберите изучаемый словарь</p>
          <div className="flex-row">
            {vocaburaries.map((v, i) => (
              <button
                className={`vocButton ${
                  currentVoc.id === v.id && 'vocButton_chozen'
                }`}
                key={v.id}
                onClick={() => swithCurrentVoc(i)}
              >
                {v.id}
              </button>
            ))}
          </div>
          <div className="flex-row">
            <button
              className={`selectorButton ${
                mode === Mode.STUDY && 'button_active'
              }`}
              id="studyButton"
              onClick={() => setMode(Mode.STUDY)}
            >
              Изучение
            </button>
            <button
              className={`selectorButton ${
                mode === Mode.QUIZ && 'button_active'
              }`}
              id="surveyButton"
              onClick={() => setMode(Mode.QUIZ)}
            >
              Опрос
            </button>
          </div>
          <div className="flex-row">
            <p className="card" id="questionCard">
              {mode === Mode.STUDY && currentCard[askLang]}
            </p>
            <p className="card" id="answerCard">
              {mode === Mode.STUDY && currentCard[ansLang]}
            </p>
          </div>
          <div>
            <button
              className="button"
              id="nextCardButton"
              onClick={() => {
                // if (mode === Mode.STUDY) setNextCard(mode)
             setNextCard(mode)
              }}
            >
              Следующая карточка
            </button>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="overlay"></div>
      </footer>
    </div>
  )
}

export default App
