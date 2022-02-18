import { useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "../../DataTable";

const title = "Phisicochemical Characterization";

const PhisicochemicalTable = ({ data, columns }) => {

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <DataTable data={data} columns={columns} title={title} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalTable;
