export interface ICardProps {
  value: string;
  mode: "input" | "text";
  id?: string;
  state: "neutral" | "correct" | "incorrect";
  inputHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
}
