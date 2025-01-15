import "../../index.scss";
import { ICardProps } from "./Card.props";
import cn from "classnames";
import s from "./Card.module.scss";

export default function Card({
  inputHandler,
  value,
  mode,
  state,
  id,
  clickHandler,
}: ICardProps) {
  return mode === "text" ? (
    <p
      className={cn(
        s.card,
        { [s.card_state_correct]: state === "correct" },
        { [s.card_state_incorrect]: state === "incorrect" },
        { [s.card_text_s]: value.length > 30 }
      )}
      id={id}
    >
      {value}
    </p>
  ) : mode === "button" ? (
    <button
      className={cn(
        s.card,
        s.card_type_button,
        { [s.card_state_correct]: state === "correct" },
        { [s.card_state_incorrect]: state === "incorrect" },
        { [s.card_text_s]: value.length > 30 }
      )}
      id={id}
      onClick={clickHandler}
    >
      {value}
    </button>
  ) : (
    <input
      autoFocus
      type="text"
      className={s.card}
      value={value}
      onChange={inputHandler}
    />
  );
}
