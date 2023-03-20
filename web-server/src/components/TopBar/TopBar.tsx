import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";
import { Wrapper, LeftTitle, FlowerTitle, RightTitle } from "./TopBar.styles";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const TopBar = () => {
  const id = useSelector((state: RootState) => state.awdDevice.data.device_id);
  const firmware = useSelector(
    (state: RootState) => state.awdDevice.data.firmware_version
  );
  const flower = useSelector((state: RootState) => state.awdDevice.data.flower);
  const dispatch = useDispatch();

  const handleNavbarMenuButton = () => {
    dispatch(toggleNavbar());
  };

  return (
    <Wrapper>
      <LeftTitle>
        Automatic Watering Device
        <FlowerTitle>{flower}</FlowerTitle>
      </LeftTitle>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={handleNavbarMenuButton}
        sx={{
          ["@media only screen and (min-width:1280px)"]: {
            display: "none",
          },
        }}
      >
        <MenuIcon
          fontSize="inherit"
          sx={{ color: "var(--color-icon-navbar)" }}
        />
      </IconButton>
      <RightTitle>
        <label>Device ID: {id}</label>
        <label>Firmware version: {firmware}</label>
      </RightTitle>
    </Wrapper>
  );
};

export default TopBar;
