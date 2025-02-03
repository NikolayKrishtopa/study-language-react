import { ISubmitButtonProps } from "./SubmitButton.props";
import ok_icon from "../../../public/img/icons/ok_icon.svg";
import arrow_right from "../../../public/img/icons/arrow_right.svg";
import "./SubmitButton.scss";
import cn from "classnames";

export const SubmitButton = ({
  onClick,
  id,
  state,
  type,
}: ISubmitButtonProps) => {
  return (
    <button
      className={cn("button", { [`button_${state}`]: !!state })}
      id={id}
      onClick={onClick}
    >
      {type === "forward" ? (
        <img src={arrow_right} alt="Далее" className="button__img" />
      ) : type === "submit" ? (
        <img src={ok_icon} alt="Далее" className="button__img" />
      ) : (
        <></>
      )}
    </button>
  );
};
