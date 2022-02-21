import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import VisibilityIcon from "@mui/icons-material/Visibility";

import DataTable from "../../DataTable";

const Table = ({ type, sequence, data, columns }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let newResults = [];

    data.forEach((d) => {
      if (d.type === type) {
        d.prediction.forEach((i) => {
          if (i.id_seq === sequence) {
            i.results.forEach((r) => {
              let array = [
                r.id_go,
                r.probability,
                r.term,
                <Button>
                  <a
                    href={`http://amigo.geneontology.org/amigo/term/${r.id_go}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <VisibilityIcon />
                  </a>
                </Button>,
              ];
              newResults.push(array);
              array = [];
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
              <DataTable
                title={"Gene Ontology Characterization Table"}
                data={results}
                columns={columns}
              />
            </Paper>
          </Grid>
        </>
      )}
    </>
  );
};

export default Table;
