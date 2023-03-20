import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Card,
  ElementsWrapper,
  ListTitle,
  ListValue,
  ListWrapper,
  Title,
} from "./Measurements.styles";

interface IMeasurementsInterface {
  id?: number;
  title: string;
  value: string;
}

const Measurements = () => {
  const data = useSelector((state: RootState) => state.awdDevice.data);
  const availableFields: Array<IMeasurementsInterface> = [
    {
      id: 0,
      title: "HUMIDITY",
      value: `${data?.humidity} [%]`,
    },
    {
      id: 1,
      title: "TEMPERATURE",
      value: `${data?.temperature} [°C]`,
    },
    {
      id: 2,
      title: "PUMP RUNNING VOLTAGE",
      value: `${data?.pump_voltage} [%]`,
    },
  ];

  const ListElements = ({ title, value }: IMeasurementsInterface) => {
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
        {availableFields.map((element: IMeasurementsInterface) => {
          return (
            <ListElements
              key={element.id}
              title={element.title}
              value={element.value}
            />
          );
        })}
      </ElementsWrapper>
    </Card>
  );
};

export default Measurements;
