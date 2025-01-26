import IPopupProps from "./Popup props";
import s from "./Popup.module.scss";
import cn from "classnames";
import closeIcon from "../../../public/img/icons/close_icon.svg";

export const Popup = ({
  children,
  isOpen,
  colorsInverted,
  onClose,
}: IPopupProps) => {
  return (
    <div
      className={cn(
        s.popup,
        { [s.popupShown]: isOpen },
        { [s.popupInverted]: colorsInverted }
      )}
    >
      {!!onClose && (
        <button className={s.popupCloseBtn} onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      )}
      <div
        className={cn(s.popupContainer, {
          [s.popupContainerInverted]: colorsInverted,
        })}
      >
        {children}
      </div>
    </div>
  );
};
