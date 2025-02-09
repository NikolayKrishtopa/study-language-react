import { makeAutoObservable } from "mobx";

class Cards {
  systemMsg = "";
  userAnswer = "";
  modalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeUserAnswer(newAnswer: string) {
    this.userAnswer = newAnswer;
  }
  setSystemMsg(msg: string) {
    this.systemMsg = msg;
  }
  resetSystemMsg() {
    this.systemMsg = "";
  }
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
}

export default new Cards();
