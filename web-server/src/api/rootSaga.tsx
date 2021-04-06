import * as Effects from "redux-saga/effects";
import { put, takeEvery } from "redux-saga/effects";
import {
  connectToNetwork,
  connectToNetworkFail,
  connectToNetworkSuccessfull,
  getAvailableWifiNetworks,
  getAvailableWifiNetworksFail,
  getAvailableWifiNetworksSuccessfull,
  getDeviceChartData,
  getDeviceChartDataFail,
  getDeviceChartDataSuccessfull,
  getDeviceData,
  getDeviceDataFail,
  getDeviceDataSuccessfull,
  getFiles,
  getFilesFail,
  getFilesSuccessfull,
  setAvailableWifiNetworks,
  setDeviceChartData,
  setDeviceData,
  setFilesData,
} from "../features/awdDevice/awdDeviceSlice";
import { RequestGetChartData } from "./requests/Chart";
import { RequestGetDeviceData } from "./requests/Data";
import { RequestGetFiles } from "./requests/Files";
import {
  RequestConnectToNetwork,
  RequestGetAvailableWifiNetworks,
} from "./requests/wifiNetworks";

const call: any = Effects.call;

export const API_HOST = "192.168.0.11";
// export const API_HOST = Cookies.get("DEVICE_IP");
export const API_VERSION = "/api/";
export const API_URL = "http://" + API_HOST + API_VERSION;

export const API_SSIDS = "ssids";
export const API_SSIDS_CONNECT = "ssids/connect";

export const API_DATA = "data";
export const API_GET_CONFIG_FILE = "files/config";
export const API_DOWNLOAD_FILE = "files/download";

export const API_CHART_DATA = "chart/data";

export const API_GET_FILES = "files";

export const TIMEOUT_WIFI = 5000;
export const TIMEOUT_NORMAL = 1000;

interface GetAvailableWifiNetworks {
  data?: any;
}

export function* handleGetAvailableWifiNetworks(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(
      RequestGetAvailableWifiNetworks
    );
    yield put(setAvailableWifiNetworks(response.data?.ssids));
    yield put(getAvailableWifiNetworksSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(getAvailableWifiNetworksFail((error as Error).message));
  }
}

export function* handleGetDeviceData(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(RequestGetDeviceData);
    yield put(setDeviceData(response.data));
    yield put(getDeviceDataSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(getDeviceDataFail((error as Error).message));
  }
}

export function* handleGetChartData(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(RequestGetChartData);
    yield put(setDeviceChartData(response.data.data_points));
    yield put(getDeviceChartDataSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(getDeviceChartDataFail((error as Error).message));
  }
}

export function* handleGetDeviceConfig(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(RequestGetDeviceData);
    yield put(setDeviceData(response.data));
    yield put(getDeviceDataSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(getDeviceDataFail((error as Error).message));
  }
}

export function* handleConnectToNetwork(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(
      RequestConnectToNetwork,
      action.payload
    );
    yield put(connectToNetworkSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(connectToNetworkFail((error as Error).message));
  }
}

export function* handleGetFiles(action: any) {
  try {
    const response: GetAvailableWifiNetworks = yield call(
      RequestGetFiles,
      action.payload
    );
    yield put(setFilesData(response.data.files));
    yield put(getFilesSuccessfull());
  } catch (error) {
    console.log(error);
    yield put(getFilesFail((error as Error).message));
  }
}

export function* rootSaga() {
  yield takeEvery(
    getAvailableWifiNetworks.type,
    handleGetAvailableWifiNetworks
  );
  yield takeEvery(getDeviceData.type, handleGetDeviceData);
  yield takeEvery(getDeviceChartData.type, handleGetChartData);
  yield takeEvery(getFiles.type, handleGetFiles);
  yield takeEvery(connectToNetwork.type, handleConnectToNetwork);
}
