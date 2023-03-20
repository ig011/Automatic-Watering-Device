import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectToNetwork } from "../../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../../store/store";
import { Wrapper, Id, NetworkName, Channel } from "./WifiNetworkElement.styles";

const WifiNetworkElement = ({ id, ssid, channel }: any) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isConnecting: boolean = useSelector(
    (state: RootState) => state.awdDevice.pendings.ssids
  );

  const handleConnect = () => {
    if (password)
      dispatch(connectToNetwork({ stassid: ssid, stapsk: password }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    handleClickOpen();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Enter password for <i>{ssid}</i>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPassword(event.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isConnecting} onClick={handleConnect}>
            Connect
          </LoadingButton>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Wrapper onClick={handleOnClick}>
        <Id>{id}</Id>
        <NetworkName>{ssid}</NetworkName>
        <Channel>{channel}</Channel>
      </Wrapper>
    </>
  );
};

export default WifiNetworkElement;
