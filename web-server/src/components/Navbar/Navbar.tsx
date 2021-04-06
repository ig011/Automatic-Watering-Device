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
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBar = styled.div`
  min-width: 250px;
  min-height: calc(100vh - var(--margin-top-navbar));
  background-color: var(--color-background-navbar);
`;

const drawerButtons = [
  {
    title: "HOME",
    link: "/",
    icon: <HomeIcon sx={{ color: "var(--color-icon-navbar)" }} />,
  },
  {
    title: "SETTINGS",
    link: "/settings",
    icon: <SettingsIcon sx={{ color: "var(--color-icon-navbar)" }} />,
  },
];

const NavBar = () => {
  return (
    <SideBar>
      <List>
        {drawerButtons.map((element) => (
          <Link
            to={element.link}
            style={{
              textDecoration: "none",
              color: "var(--color-text-navbar)",
            }}
          >
            <ListItem button key={element.title}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>{element.title}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider
        variant="middle"
        sx={{ background: "var(--color-divider-navbar)" }}
      />
    </SideBar>
  );
};

export default NavBar;
