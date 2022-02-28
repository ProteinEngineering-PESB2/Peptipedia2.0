import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const MSAForm = ({ setData, setError, setSeverity, setOpenSnackbar }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} lg={6} sx={{ margin: "start" }}>
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

export default MSAForm;
