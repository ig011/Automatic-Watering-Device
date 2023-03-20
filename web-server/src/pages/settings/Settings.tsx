import FilePresentIcon from "@mui/icons-material/FilePresent";
import InfoIcon from "@mui/icons-material/Info";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import WifiIcon from "@mui/icons-material/Wifi";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import ConfigTable from "../../components/ConfigTable/ConfigTable";
import Filesystem from "../../components/Filesystem/Filesystem";
import WifiNetworkForm from "../../components/WifiNetworks/WifiNetworkForm/WifiNetworkForm";
import { ElementWrapper, Wrapper } from "./settings.style";

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const iconSettings = {
    fontSize: "var(--font-size-settings-buttons)",
    ["@media only screen and (max-width:750px)"]: {
      fontSize: "calc(var(--font-size-settings-buttons) - 5px)",
    },
  };

  const fontSettings = {
    fontSize: "18px",
    borderColor: "red",
    ["@media only screen and (max-width:750px)"]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      fontSize: "14px",
    },
    ["@media only screen and (max-width:480px)"]: {
      fontSize: "11px",
    },
  };

  const settingsButtons = [
    {
      title: "Device configuration",
      icon: <SettingsApplicationsIcon sx={iconSettings} />,
      value: 0,
    },
    {
      title: "Connection properties",
      icon: <WifiIcon sx={iconSettings} />,
      value: 1,
    },
    {
      title: "Files",
      icon: <FilePresentIcon sx={iconSettings} />,
      value: 2,
    },
    {
      title: "About",
      icon: <InfoIcon sx={iconSettings} />,
      value: 3,
    },
  ];

  const tabRenderSwitch = (paramter: number) => {
    switch (paramter) {
      case 0:
        return <ConfigTable />;
      case 1:
        return <WifiNetworkForm />;
      case 2:
        return <Filesystem />;
      case 3:
        return <h2>Here will be about page :D ...</h2>;
      default:
        return <h2>Not implemented yet :D ...</h2>;
    }
  };

  return (
    <Wrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: "whitesmoke",
          width: "100%",
          minHeight: "70px",
        }}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            height: "2px",
          },
        }}
      >
        {settingsButtons.map((element) => {
          return (
            <Tab
              key={element.value}
              icon={element.icon}
              label={element.title}
              iconPosition="start"
              sx={fontSettings}
            />
          );
        })}
      </Tabs>
      <ElementWrapper>{tabRenderSwitch(value)}</ElementWrapper>
    </Wrapper>
  );
};

export default Settings;
