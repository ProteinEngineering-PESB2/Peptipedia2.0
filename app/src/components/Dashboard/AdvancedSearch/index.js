import { useStateIfMounted } from "use-state-if-mounted";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AdvancedSearchForm from "./AdvancedSearchForm";
import AdvancedSearchContent from "./AdvancedSearchContent";
import PeptideDetail from "./PeptideDetail";

import Snackbar from "../Snackbar";

const AdvancedSearch = () => {
  const [queries, setQueries] = useStateIfMounted([]);
  const [queriesWithID, setQueriesWithID] = useStateIfMounted([]);
  const [counts, setCounts] = useStateIfMounted([]);
  const [openSnackbar, setOpenSnackbar] = useStateIfMounted(false);
  const [message, setMessage] = useStateIfMounted("");
  const [severity, setSeverity] = useStateIfMounted("");
  const [peptideID, setPeptideID] = useStateIfMounted(0);
  const [pageTable, setPageTable] = useStateIfMounted(0);
  const [totalTable, setTotalTable] = useStateIfMounted(20);
  const [querySelected, setQuerySelected] = useStateIfMounted("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 2 }}>
        {message.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            severity={severity}
            message={message}
          />
        )}
        {peptideID > 0 ? (
          <Grid item lg={12} md={12} xs={12}>
            <PeptideDetail
              peptideID={peptideID}
              setPeptideID={setPeptideID}
              setOpenSnackbar={setOpenSnackbar}
              setMessage={setMessage}
              setSeverity={setSeverity}
            />
          </Grid>
        ) : (
          <>
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                Advanced Search
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <AdvancedSearchForm
                queries={queries}
                setQueries={setQueries}
                queriesWithID={queriesWithID}
                setQueriesWithID={setQueriesWithID}
                counts={counts}
                setCounts={setCounts}
                setOpenSnackbar={setOpenSnackbar}
                setMessage={setMessage}
                setSeverity={setSeverity}
              />
            </Grid>
            {queries.length > 0 && (
              <Grid item lg={12} md={12} xs={12}>
                <AdvancedSearchContent
                  queries={queries}
                  setQueries={setQueries}
                  queriesWithID={queriesWithID}
                  setQueriesWithID={setQueriesWithID}
                  counts={counts}
                  setCounts={setCounts}
                  setOpenSnackbar={setOpenSnackbar}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                  setPeptideID={setPeptideID}
                  pageTable={pageTable}
                  setPageTable={setPageTable}
                  querySelected={querySelected}
                  setQuerySelected={setQuerySelected}
                  totalTable={totalTable}
                  setTotalTable={setTotalTable}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default AdvancedSearch;
