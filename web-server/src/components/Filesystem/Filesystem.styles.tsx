import styled from "styled-components";
import { Title } from "./FileElement/FileElement.styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  text-shadow: 0 0 1px white;
  color: white;
  gap: 3px;
`;

export const FileElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const NoFileFound = styled(Title)`
  font-size: 20px;
`;
