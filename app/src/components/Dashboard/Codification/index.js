import { useState } from "react"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CodificationForm from "./CodificationForm";
import CodificationContent from "./CodificationContent";

const Codification = () => {
    const [data, setData] = useState([])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Codifications</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <CodificationForm setData={setData} />
        </Grid>
        <Grid item lg={12} xs={12}>
            {data.length > 0 && <CodificationContent data={data}/>}
        </Grid>
      </Grid>
    </>
  );
};

export default Codification;
