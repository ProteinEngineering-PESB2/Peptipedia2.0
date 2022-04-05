import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const BlastForm = ({ setData, setError, setSeverity, setOpenSnackbar }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={8} md={6} xs={12} sx={{ margin: "start" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
            setOpenSnackbar={setOpenSnackbar}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BlastForm;
