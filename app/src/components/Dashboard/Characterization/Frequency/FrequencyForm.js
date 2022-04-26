import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const FrequencyForm = ({ setData, setOpenSnackbar, setError, setSeverity }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
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
    </>
  );
};

export default FrequencyForm;
