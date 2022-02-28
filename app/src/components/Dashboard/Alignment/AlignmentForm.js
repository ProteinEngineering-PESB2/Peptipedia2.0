import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const AlignmentForm = ({
  setAlignmentType,
  setData,
  setError,
  setSeverity,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={6} sx={{ margin: "start" }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            setAlignmentType={setAlignmentType}
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AlignmentForm;
