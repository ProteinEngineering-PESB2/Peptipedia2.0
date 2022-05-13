import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BlastForm from "./BlastForm";
import BlastContent from "./BlastContent";

import Snackbar from "../../Snackbar";

const Blast = () => {
  const [data, setData] = useStateIfMounted(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={2}>
        {error.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            severity={severity}
            message={error}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>Alignment Sequence</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <BlastForm
            setData={setData}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data !== null && (
          <BlastContent
            data={data}
            setError={setError}
            setSeverity={setSeverity}
            setOpenSnackbar={setOpenSnackbar}
          />
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default Blast;
