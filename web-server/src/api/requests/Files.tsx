import axios from "axios";
import { API_URL, API_GET_FILES, TIMEOUT_NORMAL } from "../rootSaga";

export const RequestGetFiles = (payload: any) => {
  return axios.request({
    method: "POST",
    url: API_URL + API_GET_FILES,
    timeout: TIMEOUT_NORMAL,
    data: payload,
  });
};
