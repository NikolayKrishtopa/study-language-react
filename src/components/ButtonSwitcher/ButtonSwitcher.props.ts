import { Mode } from "../../models/models";

export interface IButtonSwitcherProps {
  switchHandler: (mode: Mode) => void;
  buttons: Array<any & { id: number }>;
  activeId?: number | string;
  additionalClass?: string;
}
