import { CSVLink } from "react-csv";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "../../DataTable";

const PhisicochemicalTable = ({ data, columns, headers }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Button variant="contained" color="primary">
          <CSVLink
            data={data}
            headers={headers}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Export as CSV
          </CSVLink>
        </Button>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DataTable data={data} columns={columns} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhisicochemicalTable;
