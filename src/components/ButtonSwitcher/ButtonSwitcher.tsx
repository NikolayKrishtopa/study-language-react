import "../../index.css";
import { IButtonSwitcherProps } from "./ButtonSwitcher.props";
import cn from "classnames";

export const ButtonSwitcher = ({
  switchHandler,
  buttons,
  activeId,
  additionalClass,
}: IButtonSwitcherProps) => {
  return (
    <div className="flex-row">
      {buttons.map((b, i) => (
        <button
          className={cn("button", additionalClass, {
            button_state_active: b.id === activeId,
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
