import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FrequencyForm from "./FrequencyForm";
import FrequencyContent from "./FrequencyContent";

const Frequency = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Frequency Analysis</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FrequencyForm setData={setData} />
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} md={12} xs={12}>
            <FrequencyContent data={data} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Frequency;
