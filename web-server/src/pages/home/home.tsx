import { Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DataChart from "../../components/Chart/DataChart";
import { RootState } from "../../store/store";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.5fr;
  grid-gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: whitesmoke;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 2px black;
  color: black;
`;

const Title = styled.h1`
  color: var(--color-fonts-title);
  font-size: 25px;
  margin: 0px;
  margin-left: 30px;
  padding: 15px 0px;
  text-shadow: 0 0 1px black;
`;

const ElementsWrapper = styled.div`
  height: calc(100% - 104px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 50px;
  gap: 5px;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 2px black;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  text-shadow: 0 0 1px white;
  background-color: var(--color-idchn-wifiform);
  padding: 15px 60px;
`;

const ListValue = styled(ListTitle)`
  background-color: var(--color-scanbutton-wifiform);
  padding: 15px;
`;

const Card2 = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const Card3 = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column: span 2;
`;

const ChartTitle = styled(Title)`
  font-size: 22px;
`;

const MeasurementsCard = () => {
  const data = useSelector((state: RootState) => state.awdDevice.data);

  const availableFields: Array<object> = [
    {
      title: "HUMIDITY",
      value: `${data?.humidity} [%]`,
    },
    {
      title: "TEMPERATURE",
      value: `${data?.temperature} [°C]`,
    },
    {
      title: "PUMP RUNNING VOLTAGE",
      value: `${data?.pump_voltage} [V]`,
    },
  ];

  const ListElements = ({ title, value }: any) => {
    return (
      <ListWrapper>
        <ListTitle>{title}</ListTitle>
        <ListValue>{value}</ListValue>
      </ListWrapper>
    );
  };

  return (
    <Card>
      <Title>CURRENT MEASUREMENTS AND VALUES</Title>
      <Divider
        variant="middle"
        sx={{ background: "var(--color-divider-navbar)" }}
      />
      <ElementsWrapper>
        {availableFields.map((element: any) => {
          return <ListElements title={element.title} value={element.value} />;
        })}
      </ElementsWrapper>
    </Card>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ParametersWrapper = styled(Wrapper)`
  flex: 0.5;
  height: 100%;
  background-color: green;
`;

const ParameterWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 10px;
  background-color: aqua;
`;

const ParameterTitle = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const PlusButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 5px;
  cursor: pointer;
`;

const Flower = styled.div`
  flex: 0.5;
  background-color: red;
  font-size: 30px;
`;

const ParameterValue = styled.div``;

const NumericInput = ({ title, currentValue, unit }: any) => {
  const [value, setValue] = useState(currentValue);

  return (
    <ParameterWrapper>
      <ParameterTitle>{title}</ParameterTitle>
      <PlusButton>-</PlusButton>
      <PlusButton>+</PlusButton>
      <ParameterValue>{`${value} ${unit}`}</ParameterValue>
    </ParameterWrapper>
  );
};

const Parameters = () => {
  return (
    <Card>
      <Title>AWD PARAMETERS</Title>
      <Divider
        variant="middle"
        sx={{ background: "var(--color-divider-navbar)" }}
      />
      <ContentWrapper>
        <ParametersWrapper>
          <NumericInput title="PUMP ON" currentValue={70} unit="%" />
        </ParametersWrapper>
        <Flower>FLOWER</Flower>
      </ContentWrapper>
    </Card>
  );
};

const Home = () => {
  return (
    <Wrapper>
      <MeasurementsCard />
      <Parameters />
      <Card3>
        <ChartTitle>Humidity Chart (Last 100 samples)</ChartTitle>
        <DataChart />
      </Card3>
    </Wrapper>
  );
};

export default Home;
