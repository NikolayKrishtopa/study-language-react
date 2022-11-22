import { useState } from 'react'
import vocaburaries from '../vocaburaries/vocaburaries'
import { Vocaburary, Card } from '../models/models'

export default function useMode() {
  const defaultCard = { id: 0, en: '', ru: '' }
  const [mode, setMode] = useState<'STUDY' | 'QUIZ'>('STUDY')
  const [currentVoc, setCurrentVoc] = useState<Vocaburary>(vocaburaries[0])
  const [askLang, setAskLang] = useState<'en' | 'ru'>('en')
  const [currentCard, setCurrentCard] = useState<Card>(defaultCard)
  const [ansLang, setAnsLang] = useState<'en' | 'ru'>('ru')
  const [askedCards, setAskedCards] = useState<number[]>([])

  function reset() {
    setAskedCards([])
    setCurrentCard(defaultCard)
  }

  function swithCurrentVoc(vocNum: number) {
    setCurrentVoc(vocaburaries[vocNum])
    reset()
  }

  function toggleLang() {
    switch (askLang) {
      case 'en': {
        setAskLang('ru')
        setAnsLang('en')
        return
      }
      case 'ru': {
        setAskLang('en')
        setAnsLang('ru')
        return
      }
      default: {
        return
      }
    }
  }

  function setNextCard() {
    function getRandomIndex(): number {
      return Math.floor(Math.random() * currentVoc.cards.length)
    }
    setCurrentCard(currentVoc.cards[getRandomIndex()])
    toggleLang()
  }

  return {
    mode,
    setMode,
    currentVoc,
    swithCurrentVoc,
    askLang,
    currentCard,
    ansLang,
    askedCards,
    setNextCard,
  }
}
