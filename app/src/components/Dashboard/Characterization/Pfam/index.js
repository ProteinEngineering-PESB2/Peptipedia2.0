import { useState } from "react"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PfamForm from "./PfamForm";
import PfamTable from "./PfamTable";

const Pfam = () => {
    const [data, setData] = useState([])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Pfam Characterization</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
            <PfamForm setData={setData}/>
        </Grid>
        <Grid item lg={12} xs={12}>
            {data.length > 0 && (
                <PfamTable data={data}/>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default Pfam;
