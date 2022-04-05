import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const BlastForm = ({ setData, setError, setSeverity, setOpenSnackbar, setPath }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={8} md={8} xs={12} sx={{ margin: "start" }}>
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
            setPath={setPath}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BlastForm;
