import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const ClusteringForm = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} md={6} xs={12}>
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
    </>
  );
};

export default ClusteringForm;
