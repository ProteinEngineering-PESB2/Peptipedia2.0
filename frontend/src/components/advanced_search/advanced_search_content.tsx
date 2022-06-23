import { Box } from "@mui/material";
import { useEffect } from "react";
import useDataTableQueries from "../../hooks/useDataTableQueries";
import DataTable from "../datatable";

interface Props {
  queries: string[];
  queriesWithID: string[];
  counts: number[];
}

export default function AdvancedSearchContent({
  counts,
  queries,
  queriesWithID,
}: Props) {
  const { tableQueries } = useDataTableQueries({
    counts,
    queries,
    queriesWithID,
  });

  return (
    <>
      <Box marginTop={3} boxShadow={4}>
        <DataTable table={tableQueries} title="Queries Entered" />
      </Box>
    </>
  );
}
