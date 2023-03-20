import styled from "styled-components";

// @media (min-width:320px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */ }
// @media (min-width:480px)  { /* smartphones, Android phones, landscape iPhone */ }
// @media (min-width:600px)  { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */ }
// @media (min-width:801px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
// @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
// @media (min-width:1281px) { /* hi-res laptops and desktops */ }

export const Wrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - var(--margin-top-navbar));
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.5fr;
  grid-gap: 20px;
  padding: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  @media only screen and (max-width: 1280px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    height: calc(100vh - var(--margin-top-navbar-phone));
    max-height: calc(100vh - var(--margin-top-navbar-phone));
    overflow: scroll;
    scrollbar-width: none;
  }
`;

export const Card = styled.div`
  width: 100%;
  background-color: whitesmoke;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 2px black;
  color: black;

  @media only screen and (max-width: 1280px) {
    min-height: 300px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
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

export const Card3 = styled(Card)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column: span 2;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px;

  @media only screen and (max-width: 1280px) {
    flex: 1;
  }
`;

export const NoData = styled.div<{ isDataEmpty: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: ${(props) => (props.isDataEmpty ? "0.8" : "0.0")};
  background-color: var(--color-background-navbar);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  transition: all 300ms ease-in-out;

  @media only screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`;
