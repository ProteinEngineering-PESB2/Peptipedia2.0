import { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PhisicochemicalForm from "./PhisicochemicalForm";
import PhisicochemicalTable from "./PhisicochemicalTable";
import SnackbarComponent from "../../Snackbar";

const Phisicochemical = () => {
  const [data, setData] = useStateIfMounted([]);
  const [columns, setColumns] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={2}>
        {error.length > 0 && (
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={error}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Properties Estimation
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <PhisicochemicalForm
            setData={setData}
            setColumns={setColumns}
            setOpenSnackbar={setOpenSnackbar}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} md={12} xs={12}>
            <PhisicochemicalTable data={data} columns={columns} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default Phisicochemical;
