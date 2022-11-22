import './index.css'
import vocaburaries from './vocaburaries/vocaburaries'
import useMode from './hooks/useMode'

function App() {
  const {
    mode,
    setMode,
    currentVoc,
    swithCurrentVoc,
    askLang,
    currentCard,
    ansLang,
    askedCards,
    setNextCard,
  } = useMode()

  // useEffect(() => {
  //   console.log([mode, currentVoc, askLang, showNextCard()])
  // }, [mode, currentVoc, askLang])

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
                mode === 'STUDY' && 'button_active'
              }`}
              id="studyButton"
              onClick={() => setMode('STUDY')}
            >
              Изучение
            </button>
            <button
              className={`selectorButton ${mode === 'QUIZ' && 'button_active'}`}
              id="surveyButton"
              onClick={() => setMode('QUIZ')}
            >
              Опрос
            </button>
          </div>
          <div className="flex-row">
            <p className="card" id="questionCard">
              {mode === 'STUDY' && currentCard[askLang]}
            </p>
            <p className="card" id="answerCard">
              {mode === 'STUDY' && currentCard[ansLang]}
            </p>
          </div>
          <div>
            <button
              className="button"
              id="nextCardButton"
              onClick={() => {
                if (mode === 'STUDY') setNextCard()
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
