import { useEffect, useRef, forwardRef } from "react";
import { ProSeqViewer } from "proseqviewer/dist";
import {
  exportComponentAsPNG,
  exportComponentAsJPEG,
  exportComponentAsPDF,
} from "react-component-export-image";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const options = {
  sequenceColor: "clustal",
};

const ComponentPrint = forwardRef((props, ref) => (
  <div id="psv" ref={ref}></div>
));

const MSA = ({ data }) => {
  const componentRef = useRef();

  useEffect(() => {
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences: data, options });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Typography variant="h6">Multiple Sequence Alignment</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ComponentPrint ref={componentRef} />
        </Paper>
      </Grid>
      <Grid item lg={2} xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => exportComponentAsPNG(componentRef)}
        >
          Export as PNG
        </Button>
      </Grid>
      <Grid item lg={2} xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => exportComponentAsJPEG(componentRef)}
        >
          Export as JPG
        </Button>
      </Grid>
    </Grid>
  );
};

export default MSA;
