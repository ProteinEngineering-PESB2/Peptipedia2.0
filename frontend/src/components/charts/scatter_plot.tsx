import Plot from "react-plotly.js";

interface Props {
  title: string;
  data: any[];
}

export default function ScatterPlot({ title, data }: Props) {
  return (
    <Plot
      data={data}
      layout={{
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
        font: {
          size: 15,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        autosizable: true,
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
