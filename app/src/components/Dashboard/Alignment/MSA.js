import { ProSeqViewer } from "proseqviewer/dist";

import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const options = {
  sequenceColor: "clustal",
};

const MSA = ({ data }) => {
  useEffect(() => {
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences: data, options });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="psv"></div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MSA;
