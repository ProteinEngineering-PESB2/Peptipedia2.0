import blasterjs from "biojs-vis-blasterjs";

import { useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Blast = ({ data }) => {
  useEffect(() => {
    new blasterjs({
      string: data,
      multipleAlignments: "blast-multiple-alignments",
      alignmentsTable: "blast-alignments-table",
      singleAlignment: "blast-single-alignment",
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="blast-multiple-alignments"></div>
        </Paper>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="blast-alignments-table"></div>
        </Paper>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="blast-single-alignment"></div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Blast;
