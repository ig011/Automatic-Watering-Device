import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INavbarState {
  isOpened: boolean;
}

export interface IAwdDeviceData {
  device_id: number;
  device_ip: string;
  device_name: string;
  device_time: number;
  firmware_version: string;
  stassid: string;
  flower: string;
  humidity: number;
  img_flower: string;
  pump_is_active: number;
  pump_off: number;
  pump_on: number;
  pump_status: number;
  pump_voltage: number;
  pump_working_mode: number;
  pump_current_voltage: number;
  temperature: number;
  water_level_low: number;
}

export interface IAwdDeviceState {
  navbar: INavbarState;
  ssids: Array<object>;
  data: IAwdDeviceData;
  chartData: any;
  files: any;
  pendings: any;
  errors: any;
}

const initialState: IAwdDeviceState = {
  navbar: {
    isOpened: false,
  },
  ssids: [],
  chartData: ["1;1;1", "2;2;2"],
  files: {
    request: "/",
    files: [],
  },
  data: {
    device_id: 0,
    device_ip: "0.0.0.0",
    device_name: "DEVICE_NAME",
    device_time: 0,
    firmware_version: "0.0.0",
    stassid: "SSID",
    flower: "Example Flower Name",
    humidity: 0,
    img_flower: "",
    pump_is_active: 0,
    pump_off: 0,
    pump_on: 0,
    pump_status: 0,
    pump_voltage: 0,
    pump_working_mode: 1,
    pump_current_voltage: 0,
    temperature: 0,
    water_level_low: 0,
  },
  pendings: {
    ssids: false,
    files: false,
    config: false,
    data: false,
    chartData: false,
  },
  errors: {
    ssids: "",
    files: "",
    config: "",
    data: "",
    chartData: "",
  },
};

export const awdDeviceSlice = createSlice({
  name: "awdDevice",
  initialState,
  reducers: {
    connectToNetwork: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<object>
    ) => {
      state.pendings.ssids = true;
    },
    connectToNetworkSuccessfull: (state: IAwdDeviceState) => {
      state.pendings.ssids = false;
    },
    connectToNetworkFail: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.ssids = false;
      state.errors.ssids = payload;
      state.ssids = [];
    },
    getAvailableWifiNetworks: (state: IAwdDeviceState) => {
      state.pendings.ssids = true;
    },
    getAvailableWifiNetworksSuccessfull: (state: IAwdDeviceState) => {
      state.pendings.ssids = false;
    },
    getAvailableWifiNetworksFail: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.ssids = false;
      state.ssids = [];
      state.errors.ssids = payload;
    },
    setAvailableWifiNetworks: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<Array<object>>
    ) => {
      state.ssids = [...payload];
    },
    getDeviceData: (state: IAwdDeviceState) => {
      state.pendings.data = true;
    },
    getDeviceDataSuccessfull: (state: IAwdDeviceState) => {
      state.pendings.data = false;
    },
    getDeviceDataFail: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.data = false;
      state.errors.data = payload;
    },
    setDeviceData: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<IAwdDeviceData>
    ) => {
      state.data = { ...payload };
    },
    setDeviceParameter: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<object>
    ) => {},
    getDeviceChartData: (state: IAwdDeviceState) => {
      state.pendings.chartData = true;
    },
    getDeviceChartDataSuccessfull: (state: IAwdDeviceState) => {
      state.pendings.chartData = false;
    },
    getDeviceChartDataFail: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.chartData = false;
      state.errors.chartData = payload;
    },
    setDeviceChartData: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<Array<string>>
    ) => {
      state.chartData = payload;
    },
    setDeviceManualSpeed: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<number>
    ) => {},
    getFiles: (state: IAwdDeviceState, { payload }: PayloadAction<object>) => {
      state.pendings.files = true;
    },
    startStopDevice: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<boolean>
    ) => {},
    getFilesSuccessfull: (state: IAwdDeviceState) => {
      state.pendings.files = false;
    },
    getFilesFail: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.files = false;
      state.errors.files = payload;
    },
    setFilesData: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<Array<string>>
    ) => {
      state.files.files = payload;
    },
    setFilesDirectory: (
      state: IAwdDeviceState,
      { payload }: PayloadAction<string>
    ) => {
      state.files.request = payload;
    },
    toggleNavbar: (state: IAwdDeviceState) => {
      state.navbar.isOpened = !state.navbar.isOpened;
    },
    closeNavbar: (state: IAwdDeviceState) => {
      state.navbar.isOpened = false;
    },
  },
});

export const {
  getAvailableWifiNetworks,
  getAvailableWifiNetworksSuccessfull,
  getAvailableWifiNetworksFail,
  setAvailableWifiNetworks,
  getDeviceData,
  getDeviceDataSuccessfull,
  getDeviceDataFail,
  setDeviceData,
  setDeviceParameter,
  getDeviceChartData,
  getDeviceChartDataSuccessfull,
  getDeviceChartDataFail,
  setDeviceChartData,
  setDeviceManualSpeed,
  startStopDevice,
  getFiles,
  getFilesSuccessfull,
  getFilesFail,
  setFilesData,
  setFilesDirectory,
  connectToNetwork,
  connectToNetworkSuccessfull,
  connectToNetworkFail,
  toggleNavbar,
  closeNavbar,
} = awdDeviceSlice.actions;
export default awdDeviceSlice.reducer;
