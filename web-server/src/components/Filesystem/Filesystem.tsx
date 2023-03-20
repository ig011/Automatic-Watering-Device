import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../features/awdDevice/awdDeviceSlice";
import { RootState } from "../../store/store";
import BreadcrumbsElement from "./BreadcrumbsElement/BreadcrumbsElement";
import FileElement, { MOVE_UP_STRING } from "./FileElement/FileElement";
import { Title } from "./FileElement/FileElement.styles";
import { FileElementsWrapper, NoFileFound, Wrapper } from "./Filesystem.styles";

const Filesystem = () => {
  const files = useSelector((state: RootState) => state.awdDevice.files.files);
  const request = useSelector(
    (state: RootState) => state.awdDevice.files.request
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles({ directory: request }));
  }, [request]);

  const NO_FILES_FOUND_MESSAGE: string = "Files not found...";

  return (
    <Wrapper>
      <Title>FILES</Title>
      <BreadcrumbsElement />
      {files ? (
        <FileElementsWrapper>
          {request !== "/" && <FileElement filename={MOVE_UP_STRING} />}
          {files.map((file: string) => {
            return <FileElement key={file} filename={file} />;
          })}
        </FileElementsWrapper>
      ) : (
        <NoFileFound>{NO_FILES_FOUND_MESSAGE}</NoFileFound>
      )}
    </Wrapper>
  );
};

export default Filesystem;
