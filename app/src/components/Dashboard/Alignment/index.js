import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AlignmentForm from "./AlignmentForm";
import Blast from "./Blast";
import MSA from "./MSA";

const Alignment = () => {
  const [alignmentType, setAlignmentType] = useState("");
  const [data, setData] = useState([]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h5">Sequence Alignment</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <AlignmentForm
            setAlignmentType={setAlignmentType}
            setData={setData}
          />
        </Grid>
        {data.length > 0 ? (
          <Grid item lg={12} xs={12}>
            {alignmentType === "blast" && <Blast data={data} />}
            {alignmentType === "msa" && <MSA data={data} />}
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default Alignment;
