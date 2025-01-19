import { Dispatch, SetStateAction } from "react";
import { Mode } from "../../models/models";

export interface IButtonSwitcherProps {
  switchHandler: Dispatch<SetStateAction<Mode>>;
  buttons: Array<unknown>;
  activeId?: number | string;
  additionalClass?: string;
}
