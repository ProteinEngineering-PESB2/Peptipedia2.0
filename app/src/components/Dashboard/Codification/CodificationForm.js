import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const CodificationForm = ({
  setFileName,
  setOpenSnackbar,
  setError,
  setSeverity,
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={6} sx={{ margin: "start" }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form
              setFileName={setFileName}
              setOpenSnackbar={setOpenSnackbar}
              setError={setError}
              setSeverity={setSeverity}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CodificationForm;
