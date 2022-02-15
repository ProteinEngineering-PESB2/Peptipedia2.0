import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const AlignmentForm = () => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={5}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AlignmentForm;
