import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "../../DataTable";

const PhisicochemicalTable = ({ data, columns }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataTable
            title={"Phisicochemical Characterization Table"}
            data={data}
            columns={columns}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalTable;
