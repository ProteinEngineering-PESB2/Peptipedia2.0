import { useState } from "react"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CodificationForm from "./CodificationForm";
import CodificationContent from "./CodificationContent";

const Codification = () => {
    const [fileName, setFileName] = useState("")

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Codifications</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <CodificationForm setFileName={setFileName}/>
        </Grid>
        <Grid item lg={12} xs={12}>
          {fileName !== "" && <CodificationContent fileName={fileName}/>}
        </Grid>
      </Grid>
    </>
  );
};

export default Codification;
