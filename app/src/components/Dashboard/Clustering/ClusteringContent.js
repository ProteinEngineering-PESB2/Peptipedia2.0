import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import DataTable from "../DataTable";

const columns = ["Sequence", "Label"];

const ClusteringContent = ({ res }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const dataTable = [];

    res.data.forEach((d) => {
      dataTable.push([d.id, d.label]);
    });
    setData(dataTable);

    setLoading(false);
  }, [res]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
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
                title="Clustering Table"
                data={data}
                columns={columns}
              />
            </Paper>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Typography variant="h6">Clustering Performance</Typography>
          </Grid>
          <Grid item lg={6} md={8} xs={12}>
            <div className="table-responsive">
              <table
                className="table table-light table-hover text-center"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Calinski</th>
                    <th>Dalvies</th>
                    <th>Siluetas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-active">
                    <td>{res.performance.calinski}</td>
                    <td>{res.performance.dalvies}</td>
                    <td>{res.performance.siluetas}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ClusteringContent;
