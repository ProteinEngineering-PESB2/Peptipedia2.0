import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

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
        font: {
          size: 15
        }
      }}
      config={{
        displayModeBar: false,
        responsive: true
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
