import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PfamForm from "./PfamForm";
import PfamTable from "./PfamTable";
import SnackbarComponent from "../../Snackbar";

const Pfam = () => {
  const [data, setData] = useStateIfMounted([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        {error.length > 0 && (
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={error}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>Pfam Prediction</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <PfamForm
            setData={setData}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          {data.length > 0 && <PfamTable data={data} />}
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default Pfam;
