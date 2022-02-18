import blasterjs from "biojs-vis-blasterjs";

import { useEffect, useRef, forwardRef } from "react";
import { exportComponentAsJPEG, exportComponentAsPNG  } from 'react-component-export-image'

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"

const ComponentBlastMultipleAlignments = forwardRef((props, ref) => (
  <div id="blast-multiple-alignments" ref={ref}></div>
))

const ComponentBlastAlignmentsTable = forwardRef((props, ref) => (
  <div id="blast-alignments-table" ref={ref}></div>
))

const ComponentBlastSingleAlignment = forwardRef((props, ref) => (
  <div id="blast-single-alignment" ref={ref}></div>
))

const Blast = ({ data }) => {
  const componentBlastMultipleAlignmentsRef = useRef()
  const componentBlastAlignmentsTableRef = useRef()
  const componentBlastSingleAlignmentRef = useRef()

  useEffect(() => {
    new blasterjs({
      string: data,
      multipleAlignments: "blast-multiple-alignments",
      alignmentsTable: "blast-alignments-table",
      singleAlignment: "blast-single-alignment",
    });
  }, []);

  return (
    <>
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Typography variant="h6">Blast Multiple Alignments</Typography>
      </Grid>
      <Grid item lg={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ComponentBlastMultipleAlignments ref={componentBlastMultipleAlignmentsRef}/>
        </Paper>
      </Grid>
    </Grid>
    <Grid container spacing={3} marginTop={0}>
      <Grid item lg={2} xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportComponentAsPNG(componentBlastMultipleAlignmentsRef)}
          >
            Export as PNG
          </Button>
      </Grid>
      <Grid item lg={2} xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportComponentAsJPEG(componentBlastMultipleAlignmentsRef)}
          >
            Export as JPG
          </Button>
      </Grid>
      <Grid item lg={12} xs={12} marginTop={2}>
        <Typography variant="h6">Blast Alignments Table</Typography>
      </Grid>
      <Grid item lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ComponentBlastAlignmentsTable ref={componentBlastAlignmentsTableRef}/>
        </Paper>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Typography variant="h6">Blast Single Alignment</Typography>
      </Grid>
      <Grid item lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ComponentBlastSingleAlignment ref={componentBlastSingleAlignmentRef}/>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default Blast;
