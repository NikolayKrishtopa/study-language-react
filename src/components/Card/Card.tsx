import "../../index.css";
import { ICardProps } from "./Card.props";
import cn from "classnames";

export default function Card({
  inputHandler,
  value,
  mode,
  state,
  id,
}: ICardProps) {
  return mode === "text" ? (
    <p
      className={cn(
        "card",
        { card_state_correct: state === "correct" },
        { card_state_incorrect: state === "incorrect" }
      )}
      id={id}
    >
      {value}
    </p>
  ) : (
    <input
      autoFocus
      type="text"
      className="card"
      value={value}
      onChange={inputHandler}
    />
  );
}
