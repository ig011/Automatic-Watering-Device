import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDeviceManualSpeed } from "../../../../features/awdDevice/awdDeviceSlice";
import { Title, Wrapper } from "./SliderInput.styles";

interface ISliderInputInterface {
  title: string;
  currentValue: number;
  unit: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
}

const SliderInput = ({
  title,
  currentValue,
  unit,
  minValue = 0,
  maxValue = 100,
  step = 10,
}: ISliderInputInterface) => {
  const dispatch = useDispatch();
  const [marks, setMarks] = useState([]);

  const generateMarks = (min: number, max: number, step: number) => {
    let outputMarks = [];
    for (let i = min; i <= max; i += step) {
      outputMarks.push({ value: i, label: String(i) });
    }
    return outputMarks;
  };

  const handleOnSliderChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    dispatch(setDeviceManualSpeed(newValue as number));
  };

  useEffect(() => {
    let generatedMarks: any = generateMarks(minValue, maxValue, step);
    setMarks(generatedMarks);
  }, []);

  return (
    <Wrapper>
      <Title>{`${title}\n${currentValue} [${unit}]`}</Title>
      <Slider
        defaultValue={currentValue}
        sx={{
          color: "whitesmoke !important",
          width: "90%",
          "& 	.MuiSlider-markLabel": {
            color: "whitesmoke! important",
            fontSize: "1rem",
          },
          ["@media only screen and (max-width: 480px)"]: {
            "& 	.MuiSlider-markLabel": {
              fontSize: "0.95rem",
            },
          },
        }}
        min={minValue}
        max={maxValue}
        step={step}
        onChangeCommitted={handleOnSliderChange}
        marks={marks}
      />
    </Wrapper>
  );
};

export default SliderInput;
