import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AdvancedSearchForm from "./AdvancedSearchForm";

const AdvancedSearch = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Advanced Search</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <AdvancedSearchForm />
        </Grid>
        <Grid item lg={12} md={12} xs={12}></Grid>
      </Grid>
    </>
  );
};

export default AdvancedSearch;
