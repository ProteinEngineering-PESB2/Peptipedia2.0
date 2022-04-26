import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import Plot from "react-plotly.js";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Chart = ({ data, autocompleteValue }) => {
  const [loading, setLoading] = useState(true);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [csvData, setCSVData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const keys = [];
    const values = [];
    const csv = [];
    data.forEach((d) => {
      if (d.id_seq === autocompleteValue) {
        for (const [key, value] of Object.entries(d.counts)) {
          keys.push(key);
          values.push(value);
          csv.push([key, value]);
        }
      }
    });
    setX(keys);
    setY(values);
    setCSVData(csv);
    setLoading(false);
  }, [data, autocompleteValue]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <>
          <Grid item lg={12} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: "bar",
                    marker: {
                      color: "#2962ff",
                    },
                  },
                ]}
                layout={{
                  autosize: true,
                  height: 430,
                  title: "Frequency Analysis",
                }}
                useResizeHandler
                className="w-full h-full"
              />
            </Paper>
          </Grid>
          <Grid item xl={2} lg={2.5} md={3} sm={5} xs={12} sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2962ff",
                width: "100%",
                ":hover": { backgroundColor: "#2962ff" },
              }}
            >
              <CSVLink
                data={csvData}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Download as CSV
              </CSVLink>
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default Chart;
