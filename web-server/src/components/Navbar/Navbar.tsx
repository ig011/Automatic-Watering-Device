import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeNavbar } from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";
import { BottomText, SideBar } from "./Navbar.styles";

interface IDrawerButton {
  id: number;
  title: string;
  link: string;
  icon: JSX.Element | null;
}

const drawerButtons: Array<IDrawerButton> = [
  {
    id: 0,
    title: "HOME",
    link: "/",
    icon: <HomeIcon sx={{ color: "var(--color-icon-navbar)" }} />,
  },
  {
    id: 1,
    title: "SETTINGS",
    link: "/settings",
    icon: <SettingsIcon sx={{ color: "var(--color-icon-navbar)" }} />,
  },
];

const NavBar = () => {
  const firmware: string = useSelector(
    (state: RootState) => state.awdDevice.data.firmware_version
  );
  const isNavbarOpened: boolean = useSelector(
    (state: RootState) => state.awdDevice.navbar.isOpened
  );

  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  const handleCloseNavbar = () => {
    dispatch(closeNavbar());
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handleCloseNavbar();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(sidebarRef);

  return (
    <SideBar openNavbar={isNavbarOpened} ref={sidebarRef}>
      <List>
        {drawerButtons.map((element: IDrawerButton) => (
          <Link
            to={element?.link}
            style={{
              textDecoration: "none",
              color: "var(--color-text-navbar)",
            }}
            onClick={handleCloseNavbar}
            key={element.id}
          >
            <ListItem button key={element?.title}>
              <ListItemIcon>{element?.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>{element?.title}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
        <Divider
          variant="middle"
          sx={{ background: "var(--color-divider-navbar)" }}
        />
      </List>
      <BottomText>Automatic Watering Device v{firmware}</BottomText>
    </SideBar>
  );
};

export default NavBar;
