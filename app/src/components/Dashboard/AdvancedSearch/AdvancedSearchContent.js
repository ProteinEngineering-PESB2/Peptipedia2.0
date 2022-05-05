import MUIDataTable from "mui-datatables";

import { useEffect, useCallback } from "react";
import { useStateIfMounted } from "use-state-if-mounted"

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";

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
  setOpenSnackbar,
  setMessage,
  setSeverity,
  setPeptideID,
  querySelected,
  setQuerySelected,
  totalTable,
  setTotalTable,
  pageTable,
  setPageTable,
  peptideID
}) => {
  const [data, setData] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(true);
  const [dataTable, setDataTable] = useStateIfMounted([]);
  const [columnsTable, setColumnsTable] = useStateIfMounted([]);
  const [loadingTable, setLoadingTable] = useStateIfMounted(false);

  const options = {
    selectableRowsHideCheckboxes: true,
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
    responsive: "standard",
    serverSide: true,
    count: totalTable,
    page: pageTable,
    sort: false,
    search: false,
    filter: false,
    viewColumns: false,
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        searchDatabase({ query: "", page: tableState.page, count: 0 });
      }
    },
  };

  const reset = useCallback(
    (position) => {
      const queriesReset = queries.filter((value, index) => index !== position);
      const queriesWithIDReset = queriesWithID.filter(
        (value, index) => index !== position
      );
      const countsReset = counts.filter((value, index) => index !== position);

      if (queriesReset.length === 0) {
        setQuerySelected("")
      }

      setQueries(queriesReset);
      setQueriesWithID(queriesWithIDReset);
      setCounts(countsReset);
    },
    [counts, queries, queriesWithID, setCounts, setQueries, setQueriesWithID]
  );

  const searchDatabase = useCallback(
    async (values) => {
      setLoadingTable(true);

      if (values.query !== "") {
        setQuerySelected(values.query);
      }

      setPageTable(values.page);

      if (values.count !== 0) {
        setTotalTable(values.count);
      }

      const post = {
        query: values.query !== "" ? values.query : querySelected,
        limit: 20,
        page: values.page + 1,
      };

      try {
        const res = await search(post);

        if (res.status === "error") {
          setSeverity("error");
          setMessage(res.description);
          setOpenSnackbar(true);
          setLoadingTable(false);
        } else if (res.status === "success") {
          let new_data = [];
          for (let d = 0; d < res.data.length; d++) {
            let parcial_data = res.data[d];
            parcial_data.push(
              <Button variant="text" color="info">
                <InfoIcon onClick={() => setPeptideID(res.data[d][0])} />
              </Button>
            );
            new_data.push(parcial_data);
          }

          const new_columns = res.columns;
          new_columns.push("Options");

          setDataTable(new_data);
          setColumnsTable(new_columns);
          setLoadingTable(false);
        }
      } catch (error) {
        setSeverity("error");
        setMessage("Service no available");
        setOpenSnackbar(true);
        setLoadingTable(false);
      }
    },
    [
      querySelected,
      setMessage,
      setSeverity,
      setOpenSnackbar,
      setPeptideID,
      querySelected,
      pageTable,
      totalTable,
    ]
  );

  useEffect(() => {
    setLoading(true);

    if (querySelected !== "" && peptideID === 0) {
      searchDatabase({
        query: querySelected,
        page: pageTable,
        count: totalTable,
      });
      setPeptideID(-1)
    }

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
            color="primary"
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
  }, [queries, setQueries, counts, queriesWithID, reset, searchDatabase]);

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
        dataTable.length > 0 &&
        queriesWithID.includes(querySelected) && (
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
