import { useEffect, useState } from "react";

import Plot from "react-plotly.js";

const Chart = ({ data, autocompleteValue }) => {
  const [loading, setLoading] = useState(true);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);

  useEffect(() => {
    setLoading(true);
    const keys = [];
    const values = [];
    data.forEach((d) => {
      if (d.id_seq === autocompleteValue) {
        for (const [key, value] of Object.entries(d.counts)) {
          keys.push(key);
          values.push(value);
        }
      }
    });
    setX(keys);
    setY(values);
    setLoading(false);
  }, [data, autocompleteValue]);

  return (
    <>
    {loading ? (
        <div></div>
    ) : (
        <Plot
            data={[
                {
                    x,
                    y,
                    type: "bar"
                }
            ]}
            layout={{ autosize: true, height: 430, title: "Frequency Analysis" }}
            useResizeHandler
            className="w-full h-full"
        />
    )}
    </>
  );
};

export default Chart;
