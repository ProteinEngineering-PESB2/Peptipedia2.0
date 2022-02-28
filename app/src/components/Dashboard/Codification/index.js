import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CodificationForm from "./CodificationForm";
import CodificationContent from "./CodificationContent";
import Snackbar from "../Snackbar";

const Codification = () => {
  const [fileName, setFileName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        {error.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={error}
            severity={severity}
          />
        )}
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Codifications</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <CodificationForm
            setFileName={setFileName}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          {fileName !== "" && <CodificationContent fileName={fileName} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Codification;
