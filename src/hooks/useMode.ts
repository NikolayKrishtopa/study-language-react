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

  function getRandomIndex(): number {
    return Math.floor(Math.random() * currentVoc.cards.length)
  }
  
  function setCard(index:number) {
    setCurrentCard(currentVoc.cards[index])
    toggleLang()
  }

  function setNextCard(mode: Mode) {
    let index: number = getRandomIndex()
    switch (mode) {
      case Mode.QUIZ:
        if (askedCards.length === currentVoc.cards.length) {return console.log('Опрос окончен')}
        while (askedCards.includes(index)){
          index = getRandomIndex()
        }
        setCard(index)
        askedCards.push(index)
        console.log(askedCards)
        break;
      case Mode.STUDY:
        setCard(index)
         break
      default:
        break;
    }
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
