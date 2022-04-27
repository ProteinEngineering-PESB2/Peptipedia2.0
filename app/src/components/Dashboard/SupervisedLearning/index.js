import { useStateIfMounted } from "use-state-if-mounted"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SupervisedLearningForm from "./SupervisedLearningForm";
import SupervisedLearningContent from "./SupervisedLearningContent";

import Snackbar from "../Snackbar";

const SupervisedLearning = () => {
  const [data, setData] = useStateIfMounted();
  const [selectedTaskType, setSelectedTaskType] = useStateIfMounted("");
  const [openSnackbar, setOpenSnackbar] = useStateIfMounted(false);
  const [message, setMessage] = useStateIfMounted("");
  const [severity, setSeverity] = useStateIfMounted("");
  const [options, setOptions] = useStateIfMounted({})

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
            setOptions={setOptions}
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
              options={options}
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 5 }}></Grid>
    </>
  );
};

export default SupervisedLearning;
