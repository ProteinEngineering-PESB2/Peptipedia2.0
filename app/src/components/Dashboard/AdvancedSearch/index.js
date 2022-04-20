import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AdvancedSearchForm from "./AdvancedSearchForm";
import AdvancedSearchContent from "./AdvancedSearchContent";

import Snackbar from "../Snackbar";

const AdvancedSearch = () => {
  const [queries, setQueries] = useState([]);
  const [queriesWithID, setQueriesWithID] = useState([]);
  const [counts, setCounts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        {message.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            severity={severity}
            message={message}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Advanced Search</Typography>
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
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdvancedSearch;
