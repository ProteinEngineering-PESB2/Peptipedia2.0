import { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import VisibilityIcon from "@mui/icons-material/Visibility";

import DataTable from "../../DataTable";

const columns = [
  "Accession",
  "Bitscore",
  "Class",
  "Evalue",
  "Id_accession",
  "Type",
  "Pfam",
];

const Table = ({ data, autocompleteValue }) => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let new_data_results = [];

    data.forEach((r) => {
      if (r.id === autocompleteValue) {
        r.data.forEach((r_data) => {
          let new_data = [];

          new_data.push(r_data.Accession);
          new_data.push(r_data.Bitscore);
          new_data.push(r_data.Class);
          new_data.push(r_data.Evalue);
          new_data.push(r_data.Id_accession);
          new_data.push(r_data.Type);
          new_data.push(
            <Button>
              <a
                href={`http://pfam.xfam.org/family/${r_data.Accession}`}
                target="_blank"
                rel="noreferrer"
              >
                <VisibilityIcon />
              </a>
            </Button>
          );

          new_data_results.push(new_data);
          new_data = [];
        });
      }
    });
    setResults(new_data_results);
    setLoading(false);
  }, [data, autocompleteValue]);

  return (
    <>
      {loading === false && (
        <DataTable
          title="Pfam Characterization Table"
          columns={columns}
          data={results}
        />
      )}
    </>
  );
};

export default Table;
