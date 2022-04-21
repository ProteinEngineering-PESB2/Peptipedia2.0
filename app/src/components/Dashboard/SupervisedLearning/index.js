import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SupervisedLearningForm from "./SupervisedLearningForm";
import SupervisedLearningContent from "./SupervisedLearningContent";

const SupervisedLearning = () => {
  const [data, setData] = useState();
  const [selectedTaskType, setSelectedTaskType] = useState("")

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Supervised Learning</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <SupervisedLearningForm
            setData={setData}
            setSelectedTaskType={setSelectedTaskType}
          />
        </Grid>
        {data && (
          <Grid item lg={12} md={12} xs={12}>
            <SupervisedLearningContent data={data} selectedTaskType={selectedTaskType} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default SupervisedLearning;
