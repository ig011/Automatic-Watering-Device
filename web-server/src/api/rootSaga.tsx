import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import * as Effects from "redux-saga/effects";
import { put, takeEvery } from "redux-saga/effects";
import Cookies from "universal-cookie";
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
  setDeviceManualSpeed,
  setDeviceParameter,
  setFilesData,
  startStopDevice,
} from "../features/awdDevice/awdDeviceSlice";
import { RequestGetChartData } from "./requests/Chart";
import {
  RequestGetDeviceData,
  RequestSetDeviceManualSpeed,
  RequestSetDeviceParameter,
  RequestStartStopDevice,
} from "./requests/Data";
import { RequestGetFiles } from "./requests/Files";
import {
  RequestConnectToNetwork,
  RequestGetAvailableWifiNetworks,
} from "./requests/wifiNetworks";

const call: any = Effects.call;

var cookieManager = new Cookies();
// export const API_HOST = cookieManager.get("DEVICE_IP");
export const API_HOST = "192.168.0.139";
export const API_VERSION = "api";
export const API_URL = `http://${API_HOST}/${API_VERSION}/`;

export const TIMEOUT_WIFI = 5000;
export const TIMEOUT_NORMAL = 1000;

export const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT_NORMAL,
});

export function* handleGetAvailableWifiNetworks() {
  try {
    const response: AxiosResponse = yield call(RequestGetAvailableWifiNetworks);
    yield put(setAvailableWifiNetworks(response.data?.ssids));
    yield put(getAvailableWifiNetworksSuccessfull());
  } catch (error) {
    yield put(getAvailableWifiNetworksFail((error as Error).message));
  }
}

export function* handleGetDeviceData() {
  try {
    const response: AxiosResponse = yield call(RequestGetDeviceData);
    yield put(setDeviceData(response.data));
    yield put(getDeviceDataSuccessfull());
  } catch (error) {
    yield put(getDeviceDataFail((error as Error).message));
  }
}

export function* handleSetDeviceParameter(action: PayloadAction) {
  try {
    yield call(RequestSetDeviceParameter, action.payload);
    yield call(handleGetDeviceData);
  } catch (error) {}
}

export function* handleGetChartData() {
  try {
    const response: AxiosResponse = yield call(RequestGetChartData);
    yield put(setDeviceChartData(response.data.data_points));
    yield put(getDeviceChartDataSuccessfull());
  } catch (error) {
    yield put(getDeviceChartDataFail((error as Error).message));
    yield put(setDeviceChartData([]));
  }
}

export function* handleGetDeviceConfig() {
  try {
    const response: AxiosResponse = yield call(RequestGetDeviceData);
    yield put(setDeviceData(response.data));
    yield put(getDeviceDataSuccessfull());
  } catch (error) {
    yield put(getDeviceDataFail((error as Error).message));
  }
}

export function* handleConnectToNetwork(action: PayloadAction) {
  try {
    yield call(RequestConnectToNetwork, action.payload);
    yield put(connectToNetworkSuccessfull());
  } catch (error) {
    yield put(connectToNetworkFail((error as Error).message));
  }
}

export function* handleGetFiles(action: PayloadAction) {
  try {
    const response: AxiosResponse = yield call(RequestGetFiles, action.payload);
    yield put(setFilesData(response.data.files));
    yield put(getFilesSuccessfull());
  } catch (error) {
    yield put(getFilesFail((error as Error).message));
  }
}

export function* handleSetDeviceManualSpeed(action: PayloadAction) {
  try {
    const response: AxiosResponse = yield call(
      RequestSetDeviceManualSpeed(action.payload as any)
    );
  } catch (error) {}
}

export function* handleStartStopDevice(action: PayloadAction) {
  try {
    const response: AxiosResponse = yield call(
      RequestStartStopDevice(action.payload as any)
    );
  } catch (error) {}
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
  yield takeEvery(setDeviceParameter.type, handleSetDeviceParameter);
  yield takeEvery(setDeviceManualSpeed.type, handleSetDeviceManualSpeed);
  yield takeEvery(startStopDevice.type, handleStartStopDevice);
}
