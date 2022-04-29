import Grid from "@mui/material/Grid";

import DataTable from "../../DataTable";

const PhisicochemicalTable = ({ data, columns }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <DataTable
          title={"Phisicochemical Characterization Table"}
          data={data}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalTable;
