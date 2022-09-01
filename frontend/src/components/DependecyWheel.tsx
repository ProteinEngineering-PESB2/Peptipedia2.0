import Highcharts from "highcharts";
import {
  HighchartsChart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Tooltip,
  HighchartsProvider,
  DependencyWheelSeries,
} from "react-jsx-highcharts";
import addSankeyModule from "highcharts/modules/sankey";
import addDependencyWheelModule from "highcharts/modules/dependency-wheel";

// Apply the Sankey & Dependency Wheel module
addSankeyModule(Highcharts);
addDependencyWheelModule(Highcharts);

interface DependecyWheelProps {
  data: any;
}

function DependecyWheel({ data }: DependecyWheelProps) {
  const formattedData = Object.keys(data).reduce((arr: any, from: any) => {
    const weights: any = data[from];
    return arr.concat(
      Object.keys(weights).map((to) => [from, to, weights[to]])
    );
  }, []);

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart>
        <Title>Highcharts Dependency Wheel Diagram</Title>

        <XAxis type="category" />

        <YAxis>
          <DependencyWheelSeries
            name="Promiscuity between peptides"
            data={formattedData}
            keys={["from", "to", "weight"]}
            size="100%"
          />
        </YAxis>

        <Tooltip />
      </HighchartsChart>
    </HighchartsProvider>
  );
}

export default withHighcharts(DependecyWheel, Highcharts);
