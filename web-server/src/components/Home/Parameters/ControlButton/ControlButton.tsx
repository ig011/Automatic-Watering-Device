import { StartStopButton } from "./ControlButton.styles";

interface IControlButtonInterface {
  title: string;
  onClick: () => void;
}

const ControlButton = ({ title, onClick }: IControlButtonInterface) => {
  return <StartStopButton onClick={onClick}>{title}</StartStopButton>;
};

export default ControlButton;
