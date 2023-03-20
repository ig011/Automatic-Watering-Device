import CloseIcon from "@mui/icons-material/Close";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableWifiNetworks } from "../../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../../store/store";
import WifiNetworkElement from "../WifiNetworkElement/WifiNetworkElement";
import {
  Wrapper,
  ScanNetworksButton,
  HeaderWrapper,
  Id,
  NetworkName,
  ElementsWrapper,
  Channel,
} from "./WifiNetworkForm.styles";

const WifiNetworkForm = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const ssidsScanError = useSelector(
    (state: RootState) => state.awdDevice.errors.ssids
  );
  const ssids = useSelector((state: RootState) => state.awdDevice.ssids);
  const isScanning = useSelector(
    (state: RootState) => state.awdDevice.pendings.ssids
  );
  const dispatch = useDispatch();

  const handleOnClickScan = () => {
    dispatch(getAvailableWifiNetworks());
  };

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    if (!isScanning && ssidsScanError) setOpenSnack(true);
  }, [isScanning, ssidsScanError]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Wrapper>
      <ScanNetworksButton
        loading={isScanning}
        loadingPosition="start"
        startIcon={<ManageSearchIcon sx={{ fontSize: "30px !important" }} />}
        variant="contained"
        onClick={handleOnClickScan}
      >
        SCAN AVAILABLE NETWORKS
      </ScanNetworksButton>
      <HeaderWrapper>
        <Id>ID</Id>
        <NetworkName>AVAILABLE WIFI NETWORKS</NetworkName>
        <Channel>CHN</Channel>
      </HeaderWrapper>
      <ElementsWrapper>
        {ssids.length > 0 ? (
          ssids.map((element: any) => {
            return (
              <WifiNetworkElement
                id={element.id}
                ssid={element.ssid}
                channel={element.channel}
                key={element.id}
              />
            );
          })
        ) : (
          <h2>No networks available</h2>
        )}
      </ElementsWrapper>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Couldn't find any wifi networks"
        action={action}
      />
    </Wrapper>
  );
};

export default WifiNetworkForm;
