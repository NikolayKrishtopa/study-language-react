import { IMessageProps } from "./Message.props";
import "./Message.scss";

export const Message = ({ title, text }: IMessageProps) => {
  return (
    <div className="message">
      <h3 className="message__title">{title}</h3>
      <p className="message__text">{text}</p>
    </div>
  );
};
