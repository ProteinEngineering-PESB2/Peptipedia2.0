import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FrequencyForm from "./FrequencyForm";
import FrequencyContent from "./FrequencyContent";

import SnackbarComponent from "../../Snackbar";

const Frequency = () => {
  const [data, setData] = useStateIfMounted([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        {error.length > 0 && (
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={error}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Frequency Analysis</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FrequencyForm
            setData={setData}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} md={12} xs={12}>
            <FrequencyContent data={data} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Frequency;
