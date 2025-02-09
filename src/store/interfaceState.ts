import { makeAutoObservable } from "mobx";

class InterfaceState {
  systemMsg = "";
  userAnswer = "";
  menuOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeUserAnswer(newAnswer: string) {
    this.userAnswer = newAnswer;
  }
  resetUserAnswer() {
    this.userAnswer = "";
  }
  setSystemMsg(msg: string) {
    this.systemMsg = msg;
  }
  resetSystemMsg() {
    this.systemMsg = "";
  }
  openMenu() {
    this.menuOpen = true;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  reset() {
    this.resetSystemMsg();
    this.resetUserAnswer();
  }
}

export default new InterfaceState();
