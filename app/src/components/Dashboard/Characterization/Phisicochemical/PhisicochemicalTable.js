import Plot from "react-plotly.js";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "../../DataTable";

var trace1 = {
  x: ['Trial 1', 'Trial 2', 'Trial 3'],
  y: [3, 6, 4],
  name: 'Control',
  error_y: {
    type: 'data',
    array: [1, 0.5, 1.5],
    visible: true
  },
  type: 'bar'
};
var trace2 = {
  x: ['Trial 1', 'Trial 2', 'Trial 3'],
  y: [4, 7, 3],
  name: 'Experimental',
  error_y: {
    type: 'data',
    array: [0.5, 1, 2],
    visible: true
  },
  type: 'bar'
};

const PhisicochemicalTable = ({ data, columns }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataTable
            title={"Phisicochemical Characterization Table"}
            data={data}
            columns={columns}
          />
        </Paper>
      </Grid>
      <Grid item lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Plot
            data={[trace1, trace2]}
            layout={{ barmode: "group" }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalTable;
