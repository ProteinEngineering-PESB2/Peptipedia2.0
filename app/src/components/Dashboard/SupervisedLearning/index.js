import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SupervisedLearningForm from "./SupervisedLearningForm";

const SupervisedLearning = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Supervised Learning</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <SupervisedLearningForm />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default SupervisedLearning;
