import styled from "styled-components";

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

export const Title = styled.h1`
  color: var(--color-fonts-title);
  font-size: 25px;
  margin: 0px;
  margin-left: 30px;
  padding: 15px 0px;
  text-shadow: 0 0 1px black;

  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ElementsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 10px 0px;
  gap: 5px;
`;

export const ListWrapper = styled.div`
  width: 95%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 2px black;
`;

export const ListTitle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  text-shadow: 0 0 1px white;
  background-color: var(--color-idchn-wifiform);

  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ListValue = styled(ListTitle)`
  background-color: var(--color-scanbutton-wifiform);
`;
