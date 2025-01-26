export default interface IPopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  colorsInverted?: Boolean;
  onClose?: () => void;
}
