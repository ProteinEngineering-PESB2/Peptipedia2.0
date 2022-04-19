import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import DataTable from "../DataTable";

const columns = ["#", "Query", "Results", "Options"];

const AdvancedSearchContent = ({ queries, setQueries, queriesWithID, counts }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const d = [];
    let cont = 1;
    queries.forEach((q) => {
      d.push([
        cont,
        q,
        counts[cont-1],
        <Button
          variant="text"
          color="error"
          onClick={() => setQueries(queries.filter((query) => query !== q))}
        >
          <DeleteIcon />
        </Button>,
      ]);
      cont++;
    });
    setData(d);
    setLoading(false);
  }, [queries, setQueries, queriesWithID, counts]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <DataTable
          title={"Advanced Search Results"}
          data={data}
          columns={columns}
        />
      )}
    </>
  );
};

export default AdvancedSearchContent;
