import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ClusteringForm from "./ClusteringForm";

const Clustering = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Clustering</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
            <ClusteringForm/>
        </Grid>
      </Grid>
    </>
  );
};

export default Clustering;
