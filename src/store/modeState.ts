import { makeAutoObservable } from "mobx";
import { Mode } from "../models/models";

class ModeState {
  currentMode = Mode.STUDY;
  constructor() {
    makeAutoObservable(this);
  }
  switchMode(mode: Mode) {
    this.currentMode = mode;
  }
}

export default new ModeState();
