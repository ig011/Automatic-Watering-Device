import styled from "styled-components";

const Wrapper = styled.div`
  height: var(--margin-top-navbar);
  background-color: var(--color-background-topbar);
  color: var(--color-font-topbar);
  padding: var(--padding-topbar);
  box-shadow: 0 0 2px black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0 0 1px var(--color-font-topbar);
`;

const RightTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 15px;
  text-shadow: 0 0 1px var(--color-font-topbar);
`;

const FlowerTitle = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: oblique;
  text-shadow: 0 0 1px var(--color-font-topbar);
`;

interface topBarInterface {
  id: number;
  firmware: string;
  flower: string;
}

const TopBar = ({ id, firmware, flower }: topBarInterface) => {
  return (
    <Wrapper>
      <LeftTitle>
        Automation Watering Device
        <FlowerTitle>{flower}</FlowerTitle>
      </LeftTitle>
      <RightTitle>
        <label>Device ID: {id}</label>
        <label>Firmware version: {firmware}</label>
      </RightTitle>
    </Wrapper>
  );
};

export default TopBar;
