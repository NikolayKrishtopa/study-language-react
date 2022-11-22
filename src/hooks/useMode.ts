import { useState } from 'react'
import vocaburaries from '../vocaburaries/vocaburaries'
import { Vocaburary, Card, Lang, Mode } from '../models/models'

export default function useMode() {
  const defaultCard = { id: 0, en: '', ru: '' }
  const [mode, setMode] = useState<Mode>(Mode.STUDY)
  const [currentVoc, setCurrentVoc] = useState<Vocaburary>(vocaburaries[0])
  const [askLang, setAskLang] = useState<Lang>(Lang.EN)
  const [currentCard, setCurrentCard] = useState<Card>(defaultCard)
  const [ansLang, setAnsLang] = useState<Lang>(Lang.RU)
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
      case Lang.EN: {
        setAskLang(Lang.RU)
        setAnsLang(Lang.EN)
        return
      }
      case Lang.RU: {
        setAskLang(Lang.EN)
        setAnsLang(Lang.RU)
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
