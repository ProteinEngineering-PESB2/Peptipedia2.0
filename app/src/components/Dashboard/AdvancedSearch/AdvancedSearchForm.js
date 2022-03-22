import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const AdvancedSearchForm = ({ queries, setQueries }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} md={6} xs={12} sx={{ margin: "start" }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form queries={queries} setQueries={setQueries}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AdvancedSearchForm;
