import IPopupProps from "./Popup props";
import "./Popup.scss";
import cn from "classnames";
import closeIcon from "../../../public/img/icons/close.svg";

export const Popup = ({
  children,
  isOpen,
  colorsInverted,
  onClose,
}: IPopupProps) => {
  return (
    <div
      className={cn(
        "popup",
        { popup_shown: isOpen },
        { popup_inverted: colorsInverted }
      )}
    >
      {!!onClose && (
        <button className="popup__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="popup__close-icon" />
        </button>
      )}
      <div
        className={cn("popup__container", {
          popup__container_inverted: colorsInverted,
        })}
      >
        {children}
      </div>
    </div>
  );
};
