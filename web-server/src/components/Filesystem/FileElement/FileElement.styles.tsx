import styled from "styled-components";

export const FileElementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: black;
  background-color: var(--color-elements-background);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 1px black;
`;

export const FileTitle = styled.label`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    text-decoration: underline;
  }
`;

export const FileIconButtons = styled.div``;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: var(--color-fonts-title);
`;
