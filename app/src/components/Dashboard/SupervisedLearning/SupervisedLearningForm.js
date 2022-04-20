import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Form from "./Form";

const SupervisedLearningForm = ({ setData, taskType, setTaskType }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} md={8} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form
              setData={setData}
              taskType={taskType}
              setTaskType={setTaskType}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SupervisedLearningForm;
