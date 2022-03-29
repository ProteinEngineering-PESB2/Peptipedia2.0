import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Claudio from "../../../assets/claudio.jpeg"

const Team = () => {
  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Peptipedia Team
        </Typography>
      </Grid>
      <Grid item lg={12} xs={12} sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item lg={3}>
              
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
