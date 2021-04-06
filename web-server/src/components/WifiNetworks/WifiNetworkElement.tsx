import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { connectToNetwork } from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 2px black;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const Id = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  font-weight: bold;
  padding: 10px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;

const Channel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  padding: 10px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;

const NetworkName = styled.div`
  display: flex;
  align-items: center;
  background: whitesmoke;
  padding: 10px 10px 10px 20px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;

const WifiNetworkElement = ({ id, ssid, channel }: any) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isConnecting = useSelector(
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
            onChange={(e: any) => setPassword(e.target.value)}
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
