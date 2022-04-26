import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SupervisedLearningForm from "./SupervisedLearningForm";
import SupervisedLearningContent from "./SupervisedLearningContent";

import Snackbar from "../Snackbar";

const SupervisedLearning = () => {
  const [data, setData] = useState();
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 2 }}>
        {message.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={message}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Training Predictive Models
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <SupervisedLearningForm
            setData={setData}
            setSelectedTaskType={setSelectedTaskType}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            setSeverity={setSeverity}
          />
        </Grid>
        {data && (
          <Grid item lg={12} md={12} xs={12}>
            <SupervisedLearningContent
              data={data}
              selectedTaskType={selectedTaskType}
              setOpenSnackbar={setOpenSnackbar}
              setMessage={setMessage}
              setSeverity={setSeverity}
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default SupervisedLearning;
