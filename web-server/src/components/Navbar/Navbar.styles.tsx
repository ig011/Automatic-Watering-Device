import styled from "styled-components";

export const SideBar = styled.div<{ openNavbar: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-width: 250px;
  min-height: calc(100vh - var(--margin-top-navbar));
  background-color: var(--color-background-navbar);
  transition: all 0.2s ease-in-out;

  @media only screen and (max-width: 1280px) {
    position: fixed;
    min-height: calc(100vh - var(--margin-top-navbar-phone));
    left: ${(props) => (props.openNavbar ? "0" : "-250px")};
    opacity: ${(props) => (props.openNavbar ? "0.97" : "0")};
    z-index: 10;
  }
`;

export const BottomText = styled.label`
  width: 100%;
  color: var(--color-text-navbar);
  text-align: center;
  padding: 5px 0;
  font-size: var(--font-size-text-bottom);
  font-style: oblique;
`;
