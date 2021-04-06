import axios from "axios";
import { API_URL, API_CHART_DATA, TIMEOUT_NORMAL } from "../rootSaga";

export const RequestGetChartData = () => {
  return axios.request({
    method: "GET",
    url: API_URL + API_CHART_DATA,
    timeout: TIMEOUT_NORMAL,
  });
};
