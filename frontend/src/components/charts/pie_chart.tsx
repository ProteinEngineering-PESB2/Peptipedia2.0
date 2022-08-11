import { useEffect } from "react";
import Plot from "react-plotly.js";

interface Props {
  values: number[];
  labels: string[];
  markers?: Object
}

export default function PieChart({ values, labels, markers }: Props) {

  return (
    <Plot
      data={[
        {
          values: values,
          labels: labels,
          type: "pie",
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
          marker: markers
        },
      ]}
      layout={{
        autosize: true,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        height: 430,
        font: {
          size: 15,
        },
      }}
      config={{
        displayModeBar: true,
        responsive: true,
        autosizable: true
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
