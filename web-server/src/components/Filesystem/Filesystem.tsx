import { Breadcrumbs, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getFiles,
  setFilesDirectory,
} from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteFileDialog from "./DeleteFileDialog/DeleteFileDialog";
import axios from "axios";
import { API_DOWNLOAD_FILE, API_URL } from "../../api/rootSaga";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  text-shadow: 0 0 1px white;
  color: white;
  gap: 3px;
`;

const FileElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FileElementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: black;
  background-color: var(--color-elements-background);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 1px black;
`;

const FileTitle = styled.label`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    text-decoration: underline;
  }
`;

const FileIconButtons = styled.div``;

const MOVE_UP_STRING = "...";

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
    // window.location.href =
    //   API_URL + API_DOWNLOAD_FILE + +"?filename=" + request + "/" + filename;
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
              <FileDownloadIcon fontSize="inherit" />
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

const BreadcrumbsElement = () => {
  const request = useSelector(
    (state: RootState) => state.awdDevice.files.request
  );

  let directoryList = request.split("/");
  directoryList[0] = "root";
  directoryList = directoryList.filter(String);

  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    color: black;
    font-size: 15px;
    padding: 10px 0px;
  `;
  const Label = styled.label``;

  return (
    <Wrapper>
      <Breadcrumbs aria-label="breadcrumb">
        {directoryList.map((element: any) => {
          return <Label>{element}</Label>;
        })}
      </Breadcrumbs>
    </Wrapper>
  );
};

const Filesystem = () => {
  const files = useSelector((state: RootState) => state.awdDevice.files.files);
  const request = useSelector(
    (state: RootState) => state.awdDevice.files.request
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles({ directory: request }));
  }, [request]);

  const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: var(--color-fonts-title);
  `;

  return (
    <Wrapper>
      <Title>FILES</Title>
      <BreadcrumbsElement />
      {files ? (
        <FileElementsWrapper>
          {request !== "/" && <FileElement filename={MOVE_UP_STRING} />}
          {files.map((file: string) => {
            return <FileElement filename={file} />;
          })}
        </FileElementsWrapper>
      ) : null}
    </Wrapper>
  );
};

export default Filesystem;
