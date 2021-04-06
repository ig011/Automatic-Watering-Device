import FilePresentIcon from "@mui/icons-material/FilePresent";
import InfoIcon from "@mui/icons-material/Info";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import WifiIcon from "@mui/icons-material/Wifi";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import styled from "styled-components";
import ConfigTable from "../../components/ConfigTable/ConfigTable";
import Filesystem from "../../components/Filesystem/Filesystem";
import WifiNetworkForm from "../../components/WifiNetworks/WifiNetworkForm";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - var(--margin-top-navbar));
  overflow: scroll;
  scrollbar-width: none;
`;

const ElementWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

const settingsButtons = [
  {
    title: "Device configuration",
    icon: <SettingsApplicationsIcon sx={{ fontSize: "25px !important" }} />,
    value: 0,
  },
  {
    title: "Connection properties",
    icon: <WifiIcon sx={{ fontSize: "25px !important" }} />,
    value: 1,
  },
  {
    title: "Files",
    icon: <FilePresentIcon sx={{ fontSize: "25px !important" }} />,
    value: 2,
  },
  {
    title: "About",
    icon: <InfoIcon sx={{ fontSize: "25px !important" }} />,
    value: 2,
  },
];

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        sx={{
          backgroundColor: "whitesmoke",
          width: "100%",
          minHeight: "70px",
          // backgroundColor: "var(--color-background-topbar)",
        }}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        {settingsButtons.map((element) => {
          return (
            <Tab
              key={element.value}
              icon={element.icon}
              label={element.title}
              iconPosition="start"
              sx={{
                // color: "white !important",
                fontSize: "18px",
                borderColor: "red",
              }}
            />
          );
        })}
      </Tabs>
      <ElementWrapper>
        {value === 0 && <ConfigTable />}
        {value === 1 && <WifiNetworkForm />}
        {value === 2 && <Filesystem />}
      </ElementWrapper>
    </Wrapper>
  );
};

export default Settings;
