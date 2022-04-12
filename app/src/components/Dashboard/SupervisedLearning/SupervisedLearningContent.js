import Plot from "react-plotly.js";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

var data = [
  {
    z: [
      [1, null, 30, 50, 1],
      [20, 1, 60, 80, 30],
      [30, 60, 1, -10, 20],
    ],
    x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    y: ["Morning", "Afternoon", "Evening"],
    type: "heatmap",
    hoverongaps: false,
  },
];

const SupervisedLearningContent = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Plot data={data}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SupervisedLearningContent;
