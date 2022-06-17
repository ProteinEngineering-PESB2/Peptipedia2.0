import Plot from "react-plotly.js";

interface Props {
  title: string;
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
  data: any[];
}

export default function ScatterPlot({
  title,
  x_min,
  x_max,
  y_min,
  y_max,
  data,
}: Props) {
  return (
    <Plot
      data={data}
      layout={{
        xaxis: {
          range: [x_min, x_max],
        },
        yaxis: {
          range: [y_min, y_max],
        },
        title: title,
        autosize: true,
        height: 600,
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 100,
          pad: 4,
        },
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
