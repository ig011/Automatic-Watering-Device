import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 2px black;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Id = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  font-weight: bold;
  padding: 10px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;

export const Channel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dddddd;
  padding: 10px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;

export const NetworkName = styled.div`
  display: flex;
  align-items: center;
  background: whitesmoke;
  padding: 10px 10px 10px 20px;
  transition: all 0.2s;
  ${Wrapper}:hover & {
    background: #454545;
    color: white;
  }
`;
