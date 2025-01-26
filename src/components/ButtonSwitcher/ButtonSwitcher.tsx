import "../../index.scss";
import { IButtonSwitcherProps } from "./ButtonSwitcher.props";
import cn from "classnames";
import "./ButtonSwitcher.scss";

export const ButtonSwitcher = ({
  switchHandler,
  buttons,
  activeId,
  additionalClass,
}: IButtonSwitcherProps) => {
  return (
    <div className="button-switcher">
      {buttons.map((b, i) => (
        <button
          className={cn("button-switcher__button", additionalClass, {
            "button-switcher__button_state_active": b.id === activeId,
          })}
          key={b.id}
          onClick={() => switchHandler(b.value || i)}
        >
          {b.text || b.id}
        </button>
      ))}
    </div>
  );
};
