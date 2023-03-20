import styled from "styled-components";
import { Button } from "@mui/material";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: whitesmoke;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 2px black;
  color: black;

  @media only screen and (max-width: 1280px) {
    flex: 1;
    min-height: 300px;
  }
`;

export const TopElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Title = styled.h1`
  color: var(--color-fonts-title);
  font-size: 25px;
  margin: 0px;
  text-shadow: 0 0 1px black;

  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ModeButton = styled(Button)`
  font-size: 18px !important;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
  gap: 5px;

  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
