import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../api/helpers";
import DataChart from "../../components/Chart/DataChart";
import Measurements from "../../components/Home/Measurements/Measurements";
import Parameters from "../../components/Home/Parameters/Parameters";
import { RootState } from "../../store/store";
import { Card3, NoData, Title, Wrapper } from "./home.styles";

const Home = () => {
  const chartData = useSelector(
    (state: RootState) => state.awdDevice.chartData
  );

  return (
    <Wrapper>
      <Measurements />
      <Parameters />
      <Card3>
        <NoData isDataEmpty={!chartData.length}>
          There are currently no data available
        </NoData>
        <DataChart
          inputChartData={chartData}
          title="Humidity Chart (Last 100 samples)"
        />
      </Card3>
    </Wrapper>
  );
};

export default Home;
