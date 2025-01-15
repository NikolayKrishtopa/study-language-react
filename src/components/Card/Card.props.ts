export interface ICardProps {
  value: string;
  mode: "input" | "text" | "button";
  id?: string;
  state: "neutral" | "correct" | "incorrect";
  inputHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
  clickHandler?: () => void;
}
