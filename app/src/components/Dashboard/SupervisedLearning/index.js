import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SupervisedLearningForm from "./SupervisedLearningForm";
import SupervisedLearningContent from "./SupervisedLearningContent";

const SupervisedLearning = () => {
  const [data, setData] = useState();
  const [taskType, setTaskType] = useState("classification");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Supervised Learning</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <SupervisedLearningForm
            setData={setData}
            taskType={taskType}
            setTaskType={setTaskType}
          />
        </Grid>
        {data && (
          <Grid item lg={12} md={12} xs={12}>
            <SupervisedLearningContent data={data} taskType={taskType} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default SupervisedLearning;
