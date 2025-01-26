import { Mode, Vocaburary } from "../../models/models";

export interface IMenuProps {
  mode: Mode;
  currentVoc: Vocaburary;
  swithCurrentVoc: (vocNum: number) => void;
  switchMode: (mode: Mode) => void;
}
