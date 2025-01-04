export interface IButtonSwitcherProps {
  switchHandler: (i: any) => void;
  buttons: Array<any>;
  activeId?: number | string;
  additionalClass?: string;
}
