import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ClusteringForm from "./ClusteringForm";
import ClusteringContent from "./ClusteringContent";
import Snackbar from "../Snackbar";

const Clustering = () => {
  const [res, setRes] = useStateIfMounted();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 2 }}>
        {message.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={message}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>Clustering</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <ClusteringForm
            setRes={setRes}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            setSeverity={setSeverity}
          />
        </Grid>
        {res && (
          <Grid item lg={12} md={12} xs={12}>
            <ClusteringContent
              res={res}
              setOpenSnackbar={setOpenSnackbar}
              setMessage={setMessage}
              setSeverity={setSeverity}
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default Clustering;
