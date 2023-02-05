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
    userAnswer,
    setUserAnswer,
    modalOpen,
    setModalOpen,
    quizStatus,
    setQuizStatus,
  } = useMode()

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
    <div className='page'>
      {modalOpen && <div>модальное окно открыто</div>}
      <header className='header'>
        <div className='overlay'></div>
      </header>
      <main className='content'>
        <p>Выберите изучаемый словарь</p>
        <div className='flex-row'>
          {vocaburaries.map((v, i) => (
            <button
              className={`button button_type_voc ${
                currentVoc.id === v.id && 'button_state_active'
              }`}
              key={v.id}
              onClick={() => swithCurrentVoc(i)}
            >
              {v.id}
            </button>
          ))}
        </div>
        <div className='flex-row'>
          <button
            className={`button ${mode === Mode.STUDY && 'button_state_active'}`}
            id='studyButton'
            onClick={() => setMode(Mode.STUDY)}
          >
            Изучение
          </button>
          <button
            className={`button ${
              (mode === Mode.QUIZ_QUESTION ||
                mode === Mode.QUIZ_ANSWER_CORRECT ||
                mode === Mode.QUIZ_ANSWER_INCORRECT) &&
              'button_state_active'
            }`}
            id='surveyButton'
            onClick={() => setMode(Mode.QUIZ_QUESTION)}
          >
            Опрос
          </button>
        </div>
        <div className='content__cards-container'>
          <p className='card' id='questionCard'>
            {currentCard[askLang]}
          </p>
          {mode === Mode.STUDY ||
          mode === Mode.QUIZ_ANSWER_CORRECT ||
          mode === Mode.QUIZ_ANSWER_INCORRECT ? (
            <p
              className={`${
                mode === Mode.QUIZ_ANSWER_CORRECT && 'card_state_correct'
              } ${
                mode === Mode.QUIZ_ANSWER_INCORRECT && 'card_state_incorrect'
              } card`}
              id='answerCard'
            >
              {mode === Mode.STUDY && currentCard[ansLang]}
              {(mode === Mode.QUIZ_ANSWER_CORRECT ||
                mode === Mode.QUIZ_ANSWER_INCORRECT) &&
                currentCard[ansLang]}
            </p>
          ) : (
            <input
              autoFocus
              type='text'
              className='card'
              value={userAnswer}
              onChange={(e: { target: { value: string } }) =>
                setUserAnswer(e.target.value)
              }
            />
          )}
        </div>
        <div>
          <button
            className='button'
            id='nextCardButton'
            onClick={() => {
              // if (mode === Mode.STUDY) setNextCard(mode)
              setNextCard(mode)
            }}
          >
            {mode === Mode.STUDY ||
            mode === Mode.QUIZ_ANSWER_CORRECT ||
            mode === Mode.QUIZ_ANSWER_INCORRECT
              ? 'Следующая карточка'
              : 'Проверить ответ'}
          </button>
        </div>
      </main>
      <footer className='footer'>
        <div className='overlay'></div>
      </footer>
    </div>
  )
}

export default App
