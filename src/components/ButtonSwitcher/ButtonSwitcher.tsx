import "../../index.css";
import { IButtonSwitcherProps } from "./ButtonSwitcher.props";

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
          className={`button ${additionalClass} ${
            b.id === activeId && "button_state_active"
          }`}
          key={b.id}
          onClick={() => switchHandler(b.value || i)}
        >
          {b.text || b.id}
        </button>
      ))}
    </div>
  );
};
