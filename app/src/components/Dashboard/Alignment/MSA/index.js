import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MSAForm from "./MSAForm";
import MSAContent from "./MSAContent";

import Snackbar from "../../Snackbar";

const MSA = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        {error.length > 0 && <Snackbar severity={severity} message={error} />}
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">MSA Alignment</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <MSAForm
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 && <MSAContent data={data}/>}
      </Grid>
    </>
  );
};

export default MSA;
