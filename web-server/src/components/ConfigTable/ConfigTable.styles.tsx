import { Button } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  text-shadow: 0 0 1px white;
  color: white;
  gap: var(--element-gap-normal);
`;

export const ElementWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  background-color: var(--color-idchn-wifiform);
  box-shadow: 0 0 2px black;
  border-radius: 5px;

  @media only screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-scanbutton-wifiform);
  overflow: scroll;
  scrollbar-width: none;
`;

export const DownloadButton = styled(Button)({
  width: "fit-content",
  height: "70px !important",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  color: "white !important",
  boxShadow: "0 0 2px black",
  ["@media only screen and (max-width: 480px)"]: {
    flex: "1",
  },
});

export const UploadButton = styled(Button)({
  width: "fit-content",
  height: "70px !important",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  color: "white !important",
  boxShadow: "0 0 2px black",
  ["@media only screen and (max-width: 480px)"]: {
    flex: "1",
  },
});

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
  gap: 10px;

  @media only screen and (max-width: 480px) {
    padding: 5px 0px;
  }
`;

export const UploadButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--element-gap-bigger);

  @media only screen and (max-width: 480px) {
    flex: 1;
    width: 45%;
  }
`;
