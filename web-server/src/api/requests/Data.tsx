import { ApiClient } from "../rootSaga";

const API_DATA = "data";
const API_SET_MANUAL_SPEED = "pump/manual";
const API_SET_MANUAL_START = "pump/start";

export const RequestGetDeviceData = () => {
  return ApiClient.request({
    method: "GET",
    url: API_DATA,
  });
};

export const RequestSetDeviceParameter = (payload: object) => {
  return ApiClient.request({
    method: "POST",
    url: API_DATA,
    data: payload,
  });
};

export const RequestSetDeviceManualSpeed = (deviceSpeed: number) => {
  return ApiClient.request({
    method: "POST",
    url: API_SET_MANUAL_SPEED,
    data: { value: deviceSpeed },
  });
};

export const RequestStartStopDevice = (startDevice: boolean) => {
  return ApiClient.request({
    method: "POST",
    url: API_SET_MANUAL_START,
    data: { start: startDevice },
  });
};
