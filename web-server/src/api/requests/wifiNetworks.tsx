import { ApiClient, TIMEOUT_WIFI } from "../rootSaga";

const API_SSIDS = "ssids";
const API_SSIDS_CONNECT = "ssids/connect";

export const RequestGetAvailableWifiNetworks = () => {
  return ApiClient.request({
    method: "GET",
    url: API_SSIDS,
    timeout: TIMEOUT_WIFI,
  });
};

export const RequestConnectToNetwork = (payload: any) => {
  return ApiClient.request({
    method: "POST",
    url: API_SSIDS_CONNECT,
    data: payload,
  });
};
