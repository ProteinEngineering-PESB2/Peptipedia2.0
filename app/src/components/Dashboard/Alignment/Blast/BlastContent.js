import axios from "axios";
import blasterjs from "biojs-vis-blasterjs";

import { useEffect, useRef, forwardRef } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import CircularLoading from "../../CircularLoading";

const ComponentBlastMultipleAlignments = forwardRef((props, ref) => (
  <div className="wrapper" ref={ref}>
    <div id="blast-multiple-alignments"></div>
  </div>
));

const BlastContent = ({ data, path }) => {
  const componentBlastMultipleAlignmentsRef = useRef();
  const [loading, setLoading] = useStateIfMounted(true);

  useEffect(() => {
    setLoading(true);
    new blasterjs({
      string: data,
      multipleAlignments: "blast-multiple-alignments",
      alignmentsTable: "blast-alignments-table",
      singleAlignment: "blast-single-alignment",
    });
    setLoading(false);
  });

  const downloadBlast = async () => {
    const res = await axios.get(path, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "result.txt");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid item lg={12} md={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6">Blast Multiple Alignments</Typography>
            </Grid>
            <Grid item lg={7} md={12} xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ComponentBlastMultipleAlignments
                  ref={componentBlastMultipleAlignmentsRef}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={0}>
            <Grid item lg={2} md={3} xs={6}>
              <Button
                variant="contained"
                onClick={() =>
                  exportComponentAsPNG(componentBlastMultipleAlignmentsRef)
                }
                size="medium"
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
                onClick={() =>
                  exportComponentAsJPEG(componentBlastMultipleAlignmentsRef)
                }
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
            <Grid item lg={12} xs={12} marginTop={2}>
              <Typography variant="h6">Blast Alignments Table</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="table-responsive">
                  <div id="blast-alignments-table"></div>
                </div>
              </Paper>
            </Grid>
            <Grid item lg={12} xs={12} marginTop={2}>
              <Typography variant="h6">Blast Single Alignment</Typography>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2962ff",
                  ":hover": { backgroundColor: "#2962ff" },
                }}
                onClick={downloadBlast}
              >
                Download Blast
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BlastContent;
