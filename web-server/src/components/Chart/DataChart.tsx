import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface IDataChartInterface {
  inputChartData: Array<string>;
  title?: string;
}

const DataChart = ({ inputChartData, title }: IDataChartInterface) => {
  const mapDataValues = (data: Array<string>) => {
    let mappedArray: Array<object> = [];
    data.forEach((element: any) => {
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "var(--color-fonts-title)",
          font: {
            size: 17,
          },
        },
      },
      y: {
        ticks: {
          color: "var(--color-fonts-title)",
          font: {
            size: 17,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: title !== "",
        text: title,
        padding: {
          bottom: 20,
        },
        font: {
          size: 25,
          color: "var(--color-fonts-title)",
        },
      },
    },
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [33, 53, 70, 41, 44, 65],
        fill: true,
        borderColor: "var(--color-humidity-line)",
        backgroundColor: "rgba(80, 80, 80, 0.2)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default DataChart;
