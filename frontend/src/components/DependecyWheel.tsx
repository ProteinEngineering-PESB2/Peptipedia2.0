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

const data: any = {
  Brazil: { Portugal: 5, France: 1, Spain: 1, England: 1 },
  Canada: { Portugal: 1, France: 5, England: 1 },
  Mexico: { Portugal: 1, France: 1, Spain: 5, England: 1 },
  USA: { Portugal: 1, France: 1, Spain: 1, England: 5 },
  Portugal: { Angola: 2, Senegal: 1, Morocco: 1, "South Africa": 3 },
  France: { Angola: 1, Senegal: 3, Mali: 3, Morocco: 3, "South Africa": 1 },
  Spain: { Senegal: 1, Morocco: 3, "South Africa": 1 },
  England: { Angola: 1, Senegal: 1, Morocco: 2, "South Africa": 7 },
  "South Africa": { China: 5, India: 1, Japan: 3 },
  Angola: { China: 5, India: 1, Japan: 3 },
  Senegal: { China: 5, India: 1, Japan: 3 },
  Mali: { China: 5, India: 1, Japan: 3 },
  Morocco: { China: 5, India: 1, Japan: 3 },
};

function DependecyWheel() {
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
            name="Dependency Wheel demo series"
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
