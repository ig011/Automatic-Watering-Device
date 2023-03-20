import { Breadcrumbs } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Wrapper } from "../Filesystem.styles";
import { Label } from "./BreadcrumbsElement.styles";

const BreadcrumbsElement = () => {
  const request = useSelector(
    (state: RootState) => state.awdDevice.files.request
  );

  let directoryList = request.split("/");
  directoryList[0] = "root";
  directoryList = directoryList.filter(String);

  return (
    <Wrapper>
      <Breadcrumbs aria-label="breadcrumb">
        {directoryList.map((element: any) => {
          return <Label key={element}>{element}</Label>;
        })}
      </Breadcrumbs>
    </Wrapper>
  );
};

export default BreadcrumbsElement;
