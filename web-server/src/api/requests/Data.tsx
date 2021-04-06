import axios from "axios";
import { API_URL, API_DATA, TIMEOUT_NORMAL } from "../rootSaga";

export const RequestGetDeviceData = () => {
  return axios.request({
    method: "GET",
    url: API_URL + API_DATA,
    timeout: TIMEOUT_NORMAL,
  });
};
