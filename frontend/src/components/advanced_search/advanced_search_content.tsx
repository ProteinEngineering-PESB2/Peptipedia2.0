import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDataTableQueries from "../../hooks/useDataTableQueries";
import DataTable from "../datatable";
import MUIDataTable from "mui-datatables";

interface Props {
  queries: string[];
  queriesWithID: string[];
  counts: number[];
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
}

export default function AdvancedSearchContent({
  counts,
  queries,
  queriesWithID,
  setOpenBackdrop,
}: Props) {
  const { tableQueries, tableResultQueries, options } = useDataTableQueries({
    counts,
    queries,
    queriesWithID,
    setOpenBackdrop,
  });

  return (
    <>
      <Box marginTop={3} boxShadow={4}>
        <DataTable table={tableQueries} title="Queries Entered" />
      </Box>
      {tableResultQueries.data.length > 0 && (
        <Box marginTop={3} boxShadow={4}>
          <MUIDataTable
            title="Queries Result"
            data={tableResultQueries.data}
            columns={tableResultQueries.columns}
            options={options}
          />
        </Box>
      )}
    </>
  );
}
