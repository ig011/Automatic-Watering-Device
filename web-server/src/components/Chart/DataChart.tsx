import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RootState } from "../../store/store";

const DataChart = () => {
  const chartData = useSelector(
    (state: RootState) => state.awdDevice.chartData
  );

  const mapDataValues = (data: Array<string>) => {
    let mappedArray: Array<object> = [];
    data.map((element: any) => {
      const values = element.split(";");
      const timeDate = new Date(values[0] * 1000);
      mappedArray.push({
        date: timeDate.toLocaleTimeString(),
        humidity: values[1],
        temperature: values[2],
      });
    });
    return mappedArray;
  };

  return (
    <ResponsiveContainer width="90%" height="80%">
      <AreaChart width={500} height={400} data={mapDataValues(chartData)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#404040"
          strokeWidth={2}
          fill="#535353"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
