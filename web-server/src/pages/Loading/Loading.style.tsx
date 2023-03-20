import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: var(--color-background-topbar);
`;

export const LoadingTitle = styled.h1`
  font-size: 45px;
  font-weight: bold;
  text-shadow: 0 0 2px white;
  color: var(--color-text-navbar);
`;
