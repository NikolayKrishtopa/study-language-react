export interface IButtonSwitcherProps {
  switchHandler: (i: unknown) => void;
  buttons: Array<unknown>;
  activeId?: number | string;
  additionalClass?: string;
}
