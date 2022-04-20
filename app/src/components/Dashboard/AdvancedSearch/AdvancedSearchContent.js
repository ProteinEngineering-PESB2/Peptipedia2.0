import MUIDataTable from "mui-datatables";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import DataTable from "../DataTable";
import CircularLoading from "../CircularLoading";

import { search } from "../../../services/advanced_search";

const columns = ["#", "Query", "Results", "Options"];

const AdvancedSearchContent = ({
  queries,
  setQueries,
  queriesWithID,
  setQueriesWithID,
  counts,
  setCounts,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [columnsTable, setColumnsTable] = useState([]);
  const [pageTable, setPageTable] = useState(0);
  const [totalTable, setTotalTable] = useState(20);
  const [loadingTable, setLoadingTable] = useState(false);
  const [querySelected, setQuerySelected] = useState("");

  useEffect(() => {
    setLoading(true);
    const d = [];
    let cont = 1;
    queries.forEach((q) => {
      let query = queriesWithID[cont - 1];
      let count = counts[cont - 1];
      let position = cont - 1;

      d.push([
        cont,
        q,
        counts[cont - 1],
        <Box>
          <Button
            variant="text"
            color="info"
            onClick={() =>
              searchDatabase({ query: query, page: 0, count: count })
            }
          >
            <PlayArrowIcon />
          </Button>
          <Button variant="text" color="error" onClick={() => reset(position)}>
            <DeleteIcon />
          </Button>
        </Box>,
      ]);
      cont++;
    });
    setData(d);
    setLoading(false);
  }, [queries, setQueries, counts, queriesWithID]);

  const reset = (position) => {
    const queriesReset = queries.filter((value, index) => index !== position);
    const queriesWithIDReset = queriesWithID.filter(
      (value, index) => index !== position
    );
    const countsReset = counts.filter((value, index) => index !== position);

    setQueries(queriesReset);
    setQueriesWithID(queriesWithIDReset);
    setCounts(countsReset);
  };

  const searchDatabase = async (values) => {
    setLoadingTable(true);

    if (values.query !== "") {
      setQuerySelected(values.query);
    }

    setPageTable(values.page);

    if (values.count !== 0) {
      const total = Math.trunc(values.count / 20) + 1;
      console.log(total)
      setTotalTable(total);
    }

    const post = {
      query: values.query !== "" ? values.query : querySelected,
      limit: 20,
      page: values.page + 1,
    };

    try {
      const res = await search(post);
      setDataTable(res.query.data);
      setColumnsTable(res.query.columns);
      setLoadingTable(false);
    } catch (error) {
      console.log(error);
      setLoadingTable(false);
    }
  };

  const options = {
    selectableRowsHideCheckboxes: true,
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
    responsive: "standard",
    serverSide: true,
    count: totalTable,
    page: pageTable,
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        searchDatabase({ query: "", page: tableState.page, count: 0 });
      }
    },
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <DataTable
          title={"Advanced Search Results"}
          data={data}
          columns={columns}
        />
      )}
      {loadingTable ? (
        <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 4 }}>
          <CircularLoading />
        </Grid>
      ) : (
        dataTable.length > 0 && (
          <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 4 }}>
            <MUIDataTable
              options={options}
              data={dataTable}
              columns={columnsTable}
            />
          </Grid>
        )
      )}
    </>
  );
};

export default AdvancedSearchContent;
