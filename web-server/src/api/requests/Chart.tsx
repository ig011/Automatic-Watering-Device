import { ApiClient } from "../rootSaga";

const API_CHART_DATA = "chart/data";

export const RequestGetChartData = () => {
  return ApiClient.request({
    method: "GET",
    url: API_CHART_DATA,
  });
};
