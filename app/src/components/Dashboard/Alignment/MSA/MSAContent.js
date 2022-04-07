import { useEffect, useRef, forwardRef } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { ProSeqViewer } from "proseqviewer/dist";
import {
  exportComponentAsPNG,
  exportComponentAsJPEG,
} from "react-component-export-image";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import CircularLoading from "../../CircularLoading";

const options = {
  sequenceColor: "clustal",
};

const ComponentPrint = forwardRef((props, ref) => (
  <div id="psv" ref={ref}></div>
));

const MSAContent = ({ data }) => {
  const componentRef = useRef();
  const [loading, setLoading] = useStateIfMounted(true);

  useEffect(() => {
    setLoading(true);
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences: data, options });
    setLoading(false);
  });

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid item lg={12} md={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
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
            <Grid item lg={2} md={3} xs={6}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => exportComponentAsPNG(componentRef)}
                sx={{
                  backgroundColor: "#2962ff",
                  width: "100%",
                  ":hover": { backgroundColor: "#2962ff" },
                }}
              >
                Export as PNG
              </Button>
            </Grid>
            <Grid item lg={2} md={3} xs={6}>
              <Button
                variant="contained"
                onClick={() => exportComponentAsJPEG(componentRef)}
                size="medium"
                sx={{
                  backgroundColor: "#2962ff",
                  width: "100%",
                  ":hover": { backgroundColor: "#2962ff" },
                }}
              >
                Export as JPG
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MSAContent;
