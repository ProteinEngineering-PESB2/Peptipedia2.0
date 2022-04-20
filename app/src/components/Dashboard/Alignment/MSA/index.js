import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MSAForm from "./MSAForm";
import MSAContent from "./MSAContent";

import Snackbar from "../../Snackbar";

const MSA = () => {
  const [data, setData] = useStateIfMounted([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        {error.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            severity={severity}
            message={error}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">MSA Alignment</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <MSAForm
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
            setOpenSnackbar={setOpenSnackbar}
          />
        </Grid>
        {data.length > 0 && <MSAContent data={data} />}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default MSA;
