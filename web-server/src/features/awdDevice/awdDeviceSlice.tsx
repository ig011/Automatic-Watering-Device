import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface awdDeviceState {
  ssids: Array<object>;
  data: any;
  chartData: any;
  files: any;
  pendings: any;
  errors: any;
}

const initialState: awdDeviceState = {
  ssids: [],
  data: {
    device_id: 0,
    device_ip: "",
    device_name: "",
    device_time: "",
    firmware_version: "0.0.0",
    stassid: "",
    flower: "",
    humidity: 0,
    img_flower: "",
    pump_is_active: 0,
    pump_off: 0,
    pump_on: 0,
    pump_status: 0,
    pump_voltage: 0,
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
  chartData: [],
  files: {
    request: "/",
    files: [],
  },
};

export const awdDeviceSlice = createSlice({
  name: "awdDevice",
  initialState,
  reducers: {
    connectToNetwork: (state, { payload }: PayloadAction<object>) => {
      state.pendings.ssids = true;
    },
    connectToNetworkSuccessfull: (state) => {
      state.pendings.ssids = false;
    },
    connectToNetworkFail: (state, { payload }: PayloadAction<string>) => {
      state.pendings.ssids = false;
      state.errors.ssids = payload;
      state.ssids = [];
    },
    getAvailableWifiNetworks: (state) => {
      state.pendings.ssids = true;
    },
    getAvailableWifiNetworksSuccessfull: (state) => {
      state.pendings.ssids = false;
    },
    getAvailableWifiNetworksFail: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.pendings.ssids = false;
      state.errors.ssids = payload;
      state.ssids = [];
    },
    setAvailableWifiNetworks: (
      state,
      { payload }: PayloadAction<Array<object>>
    ) => {
      state.ssids = [...payload];
    },
    getDeviceData: (state) => {
      state.pendings.data = true;
    },
    getDeviceDataSuccessfull: (state) => {
      state.pendings.data = false;
    },
    getDeviceDataFail: (state, { payload }: PayloadAction<string>) => {
      state.pendings.data = false;
      state.errors.data = payload;
    },
    setDeviceData: (state, { payload }: PayloadAction<Array<object>>) => {
      state.data = { ...payload };
    },
    getDeviceChartData: (state) => {
      state.pendings.chartData = true;
    },
    getDeviceChartDataSuccessfull: (state) => {
      state.pendings.chartData = false;
    },
    getDeviceChartDataFail: (state, { payload }: PayloadAction<string>) => {
      state.pendings.chartData = false;
      state.errors.chartData = payload;
    },
    setDeviceChartData: (state, { payload }: PayloadAction<Array<string>>) => {
      state.chartData = payload;
    },
    getFiles: (state, { payload }: PayloadAction<object>) => {
      state.pendings.files = true;
    },
    getFilesSuccessfull: (state) => {
      state.pendings.files = false;
    },
    getFilesFail: (state, { payload }: PayloadAction<string>) => {
      state.pendings.files = false;
      state.errors.files = payload;
    },
    setFilesData: (state, { payload }: PayloadAction<Array<string>>) => {
      state.files.files = payload;
    },
    setFilesDirectory: (state, { payload }: PayloadAction<string>) => {
      state.files.request = payload;
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
  getDeviceChartData,
  getDeviceChartDataSuccessfull,
  getDeviceChartDataFail,
  setDeviceChartData,
  getFiles,
  getFilesSuccessfull,
  getFilesFail,
  setFilesData,
  setFilesDirectory,
  connectToNetwork,
  connectToNetworkSuccessfull,
  connectToNetworkFail,
} = awdDeviceSlice.actions;
export default awdDeviceSlice.reducer;
