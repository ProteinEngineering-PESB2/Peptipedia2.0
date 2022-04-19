import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AdvancedSearchForm from "./AdvancedSearchForm";
import AdvancedSearchContent from "./AdvancedSearchContent";

const AdvancedSearch = () => {
  const [queries, setQueries] = useState([]);
  const [queriesWithID, setQueriesWithID] = useState([]);
  const [counts, setCounts] = useState([])

  return (
    <>
      <Grid container spacing={3}>
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
          />
        </Grid>
        {queries.length > 0 && (
          <Grid item lg={12} md={12} xs={12}>
            <AdvancedSearchContent
              queries={queries}
              setQueries={setQueries}
              queriesWithID={queriesWithID}
              counts={counts}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdvancedSearch;
