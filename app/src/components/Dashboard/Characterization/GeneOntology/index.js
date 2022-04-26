import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import GeneOntologyForm from "./GeneOntologyForm";
import GeneOntologyTable from "./GeneOntologyTable";
import SnackbarComponent from "../../Snackbar";

const GeneOntology = () => {
  const [data, setData] = useStateIfMounted([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 2 }}>
        {error.length > 0 && (
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={error}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Gene Ontology Prediction
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <GeneOntologyForm
            setData={setData}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} md={12} xs={12}>
            <GeneOntologyTable data={data} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default GeneOntology;
