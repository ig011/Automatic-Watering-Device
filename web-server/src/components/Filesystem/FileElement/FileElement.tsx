import { IconButton } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  FileElementWrapper,
  FileTitle,
  FileIconButtons,
} from "./FileElement.styles";
import { API_DOWNLOAD_FILE } from "../../../api/requests/Files";
import { API_URL } from "../../../api/rootSaga";
import { setFilesDirectory } from "../../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../../store/store";
import DeleteFileDialog from "../DeleteFileDialog/DeleteFileDialog";

export const MOVE_UP_STRING = "...";

const FileElement = ({ filename }: any) => {
  const request = useSelector(
    (state: RootState) => state.awdDevice.files.request
  );
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const isFile = (filename: string) => {
    let splitted_filename = filename.split(".");
    if (splitted_filename.length > 1 && splitted_filename[1].length >= 3)
      return true;
    return false;
  };

  const handleMoveDirectoryUp = () => {
    let splitted_request = request.split("/");
    splitted_request.pop();
    dispatch(setFilesDirectory(splitted_request.join("/")));
  };

  const handleFileElementOnClick = () => {
    if (!isFile(filename))
      dispatch(setFilesDirectory(request + "/" + filename));
  };

  const handleDeleteFile = () => setOpenDialog(true);

  const handleDownloadFile = async () => {
    window.location.href = `${API_URL}${API_DOWNLOAD_FILE}?filename=${
      request + "/" + filename
    }`;
  };

  return (
    <>
      <DeleteFileDialog
        fileName={filename}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <FileElementWrapper>
        <FileTitle
          onClick={
            filename === MOVE_UP_STRING
              ? handleMoveDirectoryUp
              : handleFileElementOnClick
          }
        >
          {filename}
        </FileTitle>
        {filename !== MOVE_UP_STRING && isFile(filename) && (
          <FileIconButtons>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleDownloadFile}
            >
              <FileDownloadIcon
                fontSize="inherit"
                onClick={handleDownloadFile}
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleDeleteFile}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </FileIconButtons>
        )}
      </FileElementWrapper>
    </>
  );
};

export default FileElement;
