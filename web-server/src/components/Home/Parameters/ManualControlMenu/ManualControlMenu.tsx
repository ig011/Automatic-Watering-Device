import { useDispatch, useSelector } from "react-redux";
import {
  setDeviceParameter,
  startStopDevice,
} from "../../../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../../../store/store";
import ControlButton from "../ControlButton/ControlButton";
import SliderInput from "../SliderInput/SliderInput";
import { ButtonWrapper } from "./ManualControlMenu.styles";

const START_STOP_PUMP_VARIABLE_NAME = "start";

const ManualControlMenu = () => {
  const currentPumpValue = useSelector(
    (state: RootState) => state.awdDevice.data.pump_current_voltage
  );
  const dispatch = useDispatch();

  const handleStartOnClick = () => {
    dispatch(startStopDevice(true));
  };

  const handleStopOnClick = () => {
    dispatch(startStopDevice(false));
  };

  return (
    <>
      <SliderInput
        title="Pump Speed"
        currentValue={currentPumpValue}
        unit="%"
      />
      <ButtonWrapper>
        <ControlButton title="START" onClick={handleStartOnClick} />
        <ControlButton title="STOP" onClick={handleStopOnClick} />
      </ButtonWrapper>
    </>
  );
};

export default ManualControlMenu;
