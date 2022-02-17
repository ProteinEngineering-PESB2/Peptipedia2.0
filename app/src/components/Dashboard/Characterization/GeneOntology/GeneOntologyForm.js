import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const GeneOntologyForm = ({ setColumns, setData }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} xs={12} sx={{ margin: "auto" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form setColumns={setColumns} setData={setData}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GeneOntologyForm;
