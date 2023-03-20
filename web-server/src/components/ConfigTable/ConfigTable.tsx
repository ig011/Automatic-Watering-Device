import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSelector } from "react-redux";
import { API_GET_CONFIG_FILE } from "../../api/requests/Files";
import { API_URL } from "../../api/rootSaga";
import { RootState } from "../../store/store";
import {
  ButtonsWrapper,
  DownloadButton,
  ElementWrapper,
  Title,
  UploadButton,
  UploadButtonsWrapper,
  Value,
  Wrapper,
} from "./ConfigTable.styles";

interface IConfigElementInterface {
  id?: number;
  title: string;
  value: number | string;
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
      <UploadButton
        startIcon={<UploadFileIcon />}
        variant="contained"
        sx={{
          ["@media only screen and (max-width:480px)"]: {
            fontSize: "11px !important",
          },
        }}
      >
        UPLOAD CONFIG FILE
      </UploadButton>
    </UploadButtonsWrapper>
  );
};

const ConfigElement = ({ id, title, value }: IConfigElementInterface) => {
  return (
    <ElementWrapper>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </ElementWrapper>
  );
};

const ConfigTable = () => {
  const data = useSelector((state: RootState) => state.awdDevice.data);

  const CONFIG_TABLE_FIELDS: Array<IConfigElementInterface> = [
    {
      id: 0,
      title: "Device ID",
      value: data?.device_id,
    },
    {
      id: 1,
      title: "Device IP",
      value: data?.device_ip,
    },
    {
      id: 2,
      title: "Device name",
      value: data?.device_name,
    },
    {
      id: 3,
      title: "Device time",
      value: new Date(data?.device_time * 1000).toLocaleTimeString(),
    },
    {
      id: 4,
      title: "Firmware version",
      value: data?.firmware_version,
    },
    {
      id: 6,
      title: "SSID",
      value: data?.stassid,
    },
    {
      id: 7,
      title: "Flower",
      value: data?.flower,
    },
    {
      id: 8,
      title: "Humidity [%]",
      value: data?.humidity,
    },
    {
      id: 9,
      title: "Pump off humidity [%]",
      value: data?.pump_off,
    },
    {
      id: 10,
      title: "Pump on humidity [%]",
      value: data?.pump_on,
    },
    {
      id: 11,
      title: "Pump voltage [V]",
      value: data?.pump_voltage * 0.05,
    },
  ];

  const handleDownloadConfigFileButtonOnClick = async () => {
    window.location.href = API_URL + API_GET_CONFIG_FILE;
  };

  return (
    <Wrapper>
      <ButtonsWrapper>
        <DownloadButton
          onClick={handleDownloadConfigFileButtonOnClick}
          startIcon={<FileDownloadIcon />}
          sx={{
            ["@media only screen and (max-width:480px)"]: {
              fontSize: "12px !important",
              width: "45%",
            },
          }}
        >
          DOWNLOAD CONFIG FILE
        </DownloadButton>
        <UploadConfigFileElement />
      </ButtonsWrapper>
      {CONFIG_TABLE_FIELDS.map((element: IConfigElementInterface) => {
        return (
          <ConfigElement
            key={element.id}
            title={element.title}
            value={element.value}
          />
        );
      })}
    </Wrapper>
  );
};

export default ConfigTable;
