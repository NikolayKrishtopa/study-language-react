import { makeAutoObservable } from "mobx";
import { Vocaburary, Lang } from "../models/models";
import vocaburaries from "../vocaburaries/vocaburaries";

class Language {
  askLang = Lang.RU;
  ansLang = Lang.EN;
  currentVoc = vocaburaries[0];
  constructor() {
    makeAutoObservable(this);
  }
  changeAskLang(lang: Lang) {
    this.askLang = lang;
  }
  changeAnsLang(lang: Lang) {
    this.ansLang = lang;
  }

  changeCurrentVoc(newVoc: Vocaburary) {
    this.currentVoc = newVoc;
  }
}

export default new Language();
