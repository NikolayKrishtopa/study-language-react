import IPopupProps from "./Popup props";
import s from "./Popup.module.scss";
import cn from "classnames";

export const Popup = ({ children, isOpen }: IPopupProps) => {
  return (
    <div className={cn(s.popup, { [s.popupShown]: isOpen })}>
      <div className={s.popupContainer}>{children}</div>
    </div>
  );
};
