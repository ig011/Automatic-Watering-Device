import styled from "styled-components";
import { Button } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 100%;
  max-height: 100%;
  margin: 0px 5px;
  padding: 10px;
  background-color: var(--color-idchn-wifiform);
  border-radius: 5px;
  color: var(--color-font-topbar);
  box-shadow: 0 0 2px black;
  font-size: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  @media only screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export const SecondWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40%;
  height: 80%;
`;

export const Title = styled.label`
  margin-left: 40px;
`;

export const CurrentValue = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  max-width: 100px;
  height: 100%;
  background-color: var(--color-scanbutton-wifiform);
  box-shadow: 0px 0px 1px black;
  border-radius: 5px;
`;

export const ChangeButton = styled(Button)`
  width: 50% !important;
  max-width: 100px !important;
  height: 100% !important;
  font-size: 15px !important;
  padding: 5px 0px !important;
  background-color: var(--color-background-change-button) !important;
  &:hover {
    background-color: var(--color-background-change-button-hover) !important;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px !important;
  }
`;
