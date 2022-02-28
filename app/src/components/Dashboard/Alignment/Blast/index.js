import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BlastForm from "./BlastForm";
import BlastContent from "./BlastContent";

import Snackbar from "../../Snackbar";

const Blast = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        {error.length > 0 && <Snackbar severity={severity} message={error} />}
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Blast Alignment</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <BlastForm
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 && <BlastContent data={data}/>}
      </Grid>
    </>
  );
};

export default Blast;
