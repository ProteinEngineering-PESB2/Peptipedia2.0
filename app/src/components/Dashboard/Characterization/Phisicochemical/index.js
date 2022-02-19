import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PhisicochemicalForm from "./PhisicochemicalForm";
import PhisicochemicalTable from "./PhisicochemicalTable";

const Phisicochemical = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Phisicochemical Characterization</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <PhisicochemicalForm setData={setData} setColumns={setColumns} setHeaders={setHeaders}/>
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} xs={12}>
            <PhisicochemicalTable data={data} columns={columns} headers={headers} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Phisicochemical;
