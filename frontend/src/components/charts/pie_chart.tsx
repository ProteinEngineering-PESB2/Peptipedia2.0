import Plot from "react-plotly.js";

interface Props {
  values: number[];
  labels: string[];
}

export default function PieChart({ values, labels }: Props) {
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
        },
      ]}
      layout={{
        autosize: true,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        height: 430,
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
