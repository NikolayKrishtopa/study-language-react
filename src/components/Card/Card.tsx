import "../../index.css";
import { ICardProps } from "./Card.props";

export default function Card({
  inputHandler,
  value,
  mode,
  state,
  id,
}: ICardProps) {
  return mode === "text" ? (
    <p
      className={`card ${
        state === "correct"
          ? "card_state_correct"
          : state === "incorrect"
          ? "card_state_incorrect"
          : ""
      }`}
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
