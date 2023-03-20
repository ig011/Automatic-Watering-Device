import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeviceParameter } from "../../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../../store/store";
import ManualControlMenu from "./ManualControlMenu/ManualControlMenu";
import NumericInput from "./NumericInput/NumericInput";
import {
  Card,
  ContentWrapper,
  ModeButton,
  Title,
  TopElements,
} from "./Parameters.styles";

const Parameters = () => {
  const [open, setOpen] = useState(false);

  const current_pump_on = useSelector(
    (state: RootState) => state.awdDevice.data.pump_on
  );
  const current_pump_off = useSelector(
    (state: RootState) => state.awdDevice.data.pump_off
  );
  const current_pump_voltage = useSelector(
    (state: RootState) => state.awdDevice.data.pump_voltage
  );
  const current_pump_mode = useSelector(
    (state: RootState) => state.awdDevice.data.pump_working_mode
  );

  const dispatch = useDispatch();

  interface IParameters {
    id: number;
    title: string;
    value: number;
    unit: string;
    variableName: string;
  }

  const parameters: Array<IParameters> = [
    {
      id: 0,
      title: "PUMP ON",
      value: current_pump_on,
      unit: "%",
      variableName: "pump_on",
    },
    {
      id: 1,
      title: "PUMP OFF",
      value: current_pump_off,
      unit: "%",
      variableName: "pump_off",
    },
    {
      id: 2,
      title: "PUMP VOLTAGE",
      value: current_pump_voltage,
      unit: "%",
      variableName: "pump_voltage",
    },
  ];

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const ChangePumpModeDialog = () => {
    const handleClickCloseDialog = () => {
      setOpen(false);
    };

    const handleClickChangeModeDialog = () => {
      dispatch(setDeviceParameter({ pump_working_mode: !current_pump_mode }));
      setOpen(false);
    };

    return (
      <Dialog
        open={open}
        onClose={handleClickCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          CHANGE THE PUMP WORKING MODE
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the pump current working mode?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickChangeModeDialog}>YES</Button>
          <Button onClick={handleClickCloseDialog}>NO</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Card>
      <ChangePumpModeDialog />
      <TopElements>
        <Title>AWD PARAMETERS</Title>
        <Stack direction="row" spacing={1} alignItems="center">
          <ModeButton
            variant="contained"
            disabled={current_pump_mode > 0}
            color="success"
            onClick={handleClickOpenDialog}
          >
            Automatic
          </ModeButton>
          <ModeButton
            variant="contained"
            disabled={!current_pump_mode}
            color="success"
            onClick={handleClickOpenDialog}
          >
            Manual
          </ModeButton>
        </Stack>
      </TopElements>
      <Divider
        variant="middle"
        sx={{ background: "var(--color-divider-navbar)" }}
      />
      <ContentWrapper>
        {current_pump_mode ? (
          parameters.map((parameter: IParameters) => {
            return (
              <NumericInput
                key={parameter.id}
                title={parameter?.title}
                currentValue={parameter?.value}
                unit={parameter?.unit}
                variableName={parameter?.variableName}
              />
            );
          })
        ) : (
          <ManualControlMenu />
        )}
      </ContentWrapper>
    </Card>
  );
};

export default Parameters;
