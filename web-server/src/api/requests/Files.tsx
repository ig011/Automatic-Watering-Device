import { ApiClient } from "../rootSaga";

export const API_GET_CONFIG_FILE = "files/config";
export const API_GET_FILES = "files";
export const API_DOWNLOAD_FILE = "files/download";

export const RequestGetFiles = (payload: any) => {
  return ApiClient.request({
    method: "POST",
    url: API_GET_FILES,
    data: payload,
  });
};
