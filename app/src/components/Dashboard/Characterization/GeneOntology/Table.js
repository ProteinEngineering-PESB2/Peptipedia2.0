import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "../../DataTable";

const Table = ({ type, sequence, data, columns, headers }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let newResults = [];

    data.forEach((d) => {
      if (d.type === type) {
        d.prediction.forEach((i) => {
          if (i.id_seq === sequence) {
            // setResults(i.results);
            i.results.forEach((r) => {
              newResults.push({
                ...r,
                "AmiGO 2": `http://amigo.geneontology.org/amigo/term/${r.id_go}`,
              });
            });
          }
        });
      }
    });
    setResults(newResults);
    setLoading(false);
  }, [type, sequence, data]);

  return (
    <>
      {loading === false && (
        <>
          <Grid item lg={12} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <DataTable data={results} columns={columns} />
            </Paper>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Button variant="contained" color="primary">
              <CSVLink
                data={results}
                headers={headers}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Export as CSV
              </CSVLink>
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default Table;
