import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const GeneOntologyForm = ({
  setData,
  setOpenSnackbar,
  setError,
  setSeverity,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6} md={7} sx={{ margin: "start" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            setData={setData}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GeneOntologyForm;
