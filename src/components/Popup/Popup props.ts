export default interface IPopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  colorsInverted?: boolean;
  onClose?: () => void;
}
