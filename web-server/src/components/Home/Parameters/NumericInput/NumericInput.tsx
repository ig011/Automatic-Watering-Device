import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceParameter } from "../../../../features/awdDevice/awdDeviceSlice";
import {
  ChangeButton,
  CurrentValue,
  SecondWrapper,
  Title,
  Wrapper,
} from "./NumericInput.styles";

interface IDialogInputs {
  open: boolean;
  setOpen: Function;
  title: string;
  currentValue: number;
  variableName: string;
}

const ChangeValueDialog = ({
  open,
  setOpen,
  title,
  currentValue,
  variableName,
}: IDialogInputs) => {
  const [newValue, setNewValue] = useState(currentValue);
  const dispatch = useDispatch();

  const handleClickCloseDialog = () => {
    setOpen(false);
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewValue(parseInt(event.target.value));
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let data: any = {};
    data[variableName] = newValue;
    dispatch(setDeviceParameter(data));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickCloseDialog}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <form onSubmit={handleOnSubmit}>
        <DialogContent>
          <TextField
            required
            fullWidth
            autoFocus
            id="filled-required"
            label="New value"
            defaultValue={newValue.toString()}
            variant="filled"
            type="number"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">CHANGE</Button>
          <Button onClick={handleClickCloseDialog}>CANCEL</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

interface INumericInputInterface {
  title: string;
  currentValue: number;
  unit: string;
  variableName: string;
}

const NumericInput = ({
  title,
  currentValue,
  unit,
  variableName,
}: INumericInputInterface) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnClick = () => {
    setOpenDialog(true);
  };

  return (
    <Wrapper>
      <ChangeValueDialog
        title={`Please enter new value for parameter ${title.toLowerCase()} [${unit}]`}
        open={openDialog}
        setOpen={setOpenDialog}
        currentValue={currentValue}
        variableName={variableName}
      />
      <Title>{`${title} [${unit}] `}</Title>
      <SecondWrapper>
        <CurrentValue>{currentValue}</CurrentValue>
        <ChangeButton variant="contained" onClick={handleOnClick}>
          Change
        </ChangeButton>
      </SecondWrapper>
    </Wrapper>
  );
};

export default NumericInput;
