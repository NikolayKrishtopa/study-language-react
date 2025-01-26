import { Mode, Vocaburary } from "../../models/models";

export interface IMenuProps {
  mode: Mode;
  currentVoc: Vocaburary;
  swithCurrentVoc: (vocNum: number) => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}
