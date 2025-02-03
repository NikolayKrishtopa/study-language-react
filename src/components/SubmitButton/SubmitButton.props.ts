export interface ISubmitButtonProps {
  onClick: () => void;
  id: string;
  state?: "neutral" | "success" | "fail";
  type?: "submit" | "forward";
}
