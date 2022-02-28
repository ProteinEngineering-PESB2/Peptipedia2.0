import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const PhisicochemicalForm = ({
  setData,
  setColumns,
  setOpenSnackbar,
  setError,
  setSeverity,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} xs={12} sx={{ margin: "start" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            setData={setData}
            setColumns={setColumns}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalForm;
