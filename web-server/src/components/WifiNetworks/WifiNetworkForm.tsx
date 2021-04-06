import CloseIcon from "@mui/icons-material/Close";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAvailableWifiNetworks } from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";
import WifiNetworkElement from "./WifiNetworkElement";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 22px;
  font-weight: bold;
  text-shadow: 0 0 1px white;
  overflow: hidden;
  border-radius: 10px 10px 2px 2px;
  box-shadow: 0 0 2px black;
  color: white;
`;

const Id = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-idchn-wifiform);
  padding: 15px;
`;

const NetworkName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-networkname-wifiform);
`;

const Channel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-idchn-wifiform);
`;

const ElementsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  background: var(--color-elements-background);
  border-radius: 0px 0px 10px 10px;
`;

const ScanNetworksButton = styled(LoadingButton)({
  width: "fit-content",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  "&:disabled": {
    color: "#606060 !important",
    backgroundColor: "#cfcfcf !important",
  },
});

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
