import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const SupervisedLearningForm = ({
  setData,
  setSelectedTaskType,
  setOpenSnackbar,
  setMessage,
  setSeverity,
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form
              setData={setData}
              setSelectedTaskType={setSelectedTaskType}
              setOpenSnackbar={setOpenSnackbar}
              setMessage={setMessage}
              setSeverity={setSeverity}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SupervisedLearningForm;
