import styled from "styled-components";

export const Wrapper = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(99vh - var(--margin-top-navbar));
  overflow: scroll;
  scrollbar-width: none;

  @media only screen and (max-width: 1279px) {
    max-height: calc(99vh - var(--margin-top-navbar-phone));
  }
`;

export const ElementWrapper = styled.div`
  width: 89%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 0px;
`;
