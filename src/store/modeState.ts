import { makeAutoObservable } from "mobx";
import { Mode as Modes } from "../models/models";

class Mode {
  currentMode = Modes.STUDY;
  constructor() {
    makeAutoObservable(this);
  }
  switchMode(mode: Modes) {
    this.currentMode = mode;
  }
}

export default new Mode();
