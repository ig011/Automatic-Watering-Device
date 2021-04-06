import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { API_GET_CONFIG_FILE, API_URL } from "../../api/rootSaga";
import { RootState } from "../../store/store";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  text-shadow: 0 0 1px white;
  color: white;
  gap: 3px;
`;

const ElementWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  background-color: var(--color-idchn-wifiform);
  box-shadow: 0 0 2px black;
  border-radius: 5px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 20px;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-scanbutton-wifiform);
  padding: 20px;
`;

const DownloadButton = styled(Button)({
  width: "fit-content",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  color: "white !important",
  boxShadow: "0 0 2px black",
});

const UploadButton = styled(Button)({
  width: "fit-content",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  color: "white !important",
  boxShadow: "0 0 2px black",
});

const Input = styled("input")({
  display: "none",
});

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const UploadButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface configElementInterface {
  name: string;
  value: any;
}

const UploadConfigFileElement = () => {
  return (
    <UploadButtonsWrapper>
      {/* <label htmlFor="icon-button-file">
        <Input accept="*.cfg" id="icon-button-file" type="file" />
        <IconButton
          color="primary"
          aria-label="Upload configuration file"
          component="span"
        >
          <FileOpenIcon
            sx={{ fontSize: "30px", color: "var(--color-scanbutton-wifiform)" }}
          />
        </IconButton>
      </label> */}
      <UploadButton startIcon={<UploadFileIcon />} variant="contained">
        UPLOAD CONFIG FILE
      </UploadButton>
    </UploadButtonsWrapper>
  );
};

const ConfigElement = ({ name, value }: configElementInterface) => {
  return (
    <ElementWrapper>
      <Title>{name}</Title>
      <Value>{value}</Value>
    </ElementWrapper>
  );
};

const ConfigTable = () => {
  const data = useSelector((state: RootState) => state.awdDevice.data);

  const CONFIG_TABLE_FIELDS = [
    {
      title: "Device ID",
      value: data?.device_id,
    },
    {
      title: "Device IP",
      value: data?.device_ip,
    },
    {
      title: "Device name",
      value: data?.device_name,
    },
    {
      title: "Device time",
      value: data?.device_time,
    },
    {
      title: "Firmware version",
      value: data?.firmware_version,
    },
    {
      title: "SSID",
      value: data?.stassid,
    },
    {
      title: "Flower",
      value: data?.flower,
    },
    {
      title: "Humidity [%]",
      value: data?.humidity,
    },
    {
      title: "Pump off humidity [%]",
      value: data?.pump_off,
    },
    {
      title: "Pump on humidity [%]",
      value: data?.pump_on,
    },
    {
      title: "Pump voltage [V]",
      value: data?.pump_voltage * 0.05,
    },
  ];

  const handleDownloadConfigFileButtonOnClick = async () => {
    window.location.href = API_URL + API_GET_CONFIG_FILE;
  };

  const handleUploadConfigFileButtonOnClick = async () => {
    window.location.href = API_URL + API_GET_CONFIG_FILE;
  };

  return (
    <Wrapper>
      <ButtonsWrapper>
        <DownloadButton
          onClick={handleDownloadConfigFileButtonOnClick}
          startIcon={<FileDownloadIcon />}
        >
          DOWNLOAD CONFIG FILE
        </DownloadButton>
        <UploadConfigFileElement />
      </ButtonsWrapper>
      {CONFIG_TABLE_FIELDS.map((element: any) => {
        return <ConfigElement name={element.title} value={element.value} />;
      })}
    </Wrapper>
  );
};

export default ConfigTable;
