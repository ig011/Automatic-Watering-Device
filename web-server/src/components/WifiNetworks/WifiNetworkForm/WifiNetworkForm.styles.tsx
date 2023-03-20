import LoadingButton from "@mui/lab/LoadingButton";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: 22px;
  font-weight: bold;
  text-shadow: 0 0 1px white;
  overflow: hidden;
  border-radius: 10px 10px 2px 2px;
  box-shadow: 0 0 2px black;
  color: white;

  @media only screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Id = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-idchn-wifiform);
  padding: 15px;
`;

export const NetworkName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-networkname-wifiform);
`;

export const Channel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-idchn-wifiform);
`;

export const ElementsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  background: var(--color-elements-background);
  border-radius: 0px 0px 10px 10px;
`;

export const ScanNetworksButton = styled(LoadingButton)({
  width: "fit-content",
  padding: "10px 20px !important",
  fontSize: "16px !important",
  fontWeight: "bold !important",
  backgroundColor: "var(--color-scanbutton-wifiform) !important",
  "&:disabled": {
    color: "#606060 !important",
    backgroundColor: "#cfcfcf !important",
  },
  ["@media only screen and (max-width:480px)"]: {
    width: "100%",
  },
});
