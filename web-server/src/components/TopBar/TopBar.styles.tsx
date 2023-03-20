import styled from "styled-components";

export const Wrapper = styled.nav`
  height: var(--margin-top-navbar);
  background-color: var(--color-background-topbar);
  color: var(--color-font-topbar);
  padding: var(--padding-topbar);
  box-shadow: 0 0 2px black;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1280px) {
    height: var(--margin-top-navbar-phone);
  }
`;

export const LeftTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0 0 1px var(--color-font-topbar);
`;

export const RightTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 15px;
  text-shadow: 0 0 1px var(--color-font-topbar);

  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

export const FlowerTitle = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: oblique;
  text-shadow: 0 0 1px var(--color-font-topbar);
`;
