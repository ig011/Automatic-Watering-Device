import axios from "axios";
import {
  API_CHART_DATA,
  API_DATA,
  API_GET_FILES,
  API_SSIDS,
  API_SSIDS_CONNECT,
  API_URL,
  TIMEOUT_WIFI,
} from "../rootSaga";

export const RequestGetAvailableWifiNetworks = () => {
  return axios.request({
    method: "GET",
    url: API_URL + API_SSIDS,
    timeout: TIMEOUT_WIFI,
  });
};

export const RequestConnectToNetwork = (payload: any) => {
  return axios.request({
    method: "POST",
    url: API_URL + API_SSIDS_CONNECT,
    data: payload,
  });
};
