import { useState, useEffect } from "react";

import DataTable from "../../DataTable";

const columns = [
  {
    name: "id_go",
    label: "ID GO",
  },
  {
    name: "probability",
    label: "Probability",
  },
  {
    name: "term",
    label: "Term",
  },
];

const Table = ({ type, sequence, data }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    data.map((d) => {
      if (d.type === type) {
        d.prediction.map((i) => {
          if (i.id_seq === sequence) {
            setResults(i.results);
          }
        });
      }
    });
    setLoading(false);
  }, [type, sequence]);

  return (
    <>
      {loading === false && (
        <></>
        // <DataTable
        //   data={results}
        //   columns={columns}
        //   title="Gene Ontology Characterization"
        // />
      )}
    </>
  );
};

export default Table;
