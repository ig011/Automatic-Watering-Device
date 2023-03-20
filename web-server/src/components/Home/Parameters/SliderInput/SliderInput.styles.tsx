import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 100%;
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
  gap: 10%;

  @media only screen and (max-width: 480px) {
    font-size: 16px;
    gap: 5px;
  }
`;

export const Title = styled.label`
  width: 95%;
  font-size: 1.9rem;

  @media only screen and (max-width: 480px) {
    margin-top: 5px;
    font-size: 1.1rem;
  }
`;
