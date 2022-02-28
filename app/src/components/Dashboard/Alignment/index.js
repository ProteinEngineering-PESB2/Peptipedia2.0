import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AlignmentForm from "./AlignmentForm";
import Blast from "./Blast";
import MSA from "./MSA";

import Snackbar from "../Snackbar";

const Alignment = () => {
  const [alignmentType, setAlignmentType] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5}>
        {error.length > 0 && <Snackbar severity={severity} message={error} />}
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Sequence Alignment</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <AlignmentForm
            setAlignmentType={setAlignmentType}
            setData={setData}
            setError={setError}
            setSeverity={setSeverity}
          />
        </Grid>
        {data.length > 0 ? (
          <>
            {alignmentType === "blast" && <Blast data={data} />}
            {alignmentType === "msa" && <MSA data={data} />}
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default Alignment;
