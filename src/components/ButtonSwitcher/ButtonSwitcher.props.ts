import { Mode } from "../../models/models";

export interface IButtonSwitcherProps {
  switchHandler: (mode: Mode) => void;
  buttons: Array<unknown>;
  activeId?: number | string;
  additionalClass?: string;
}
