import { Box, Grid } from "@mui/material";
import useGetDatabasePeptideDetail from "../../hooks/useGetDatabasePeptideDetail";
import DataTable from "../datatable";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailDatabases({ peptideId }: Props) {
  const { tableDatabases } = useGetDatabasePeptideDetail({ peptideId });

  return (
    <>
      {tableDatabases.data.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
            <Box boxShadow={4}>
              <DataTable table={tableDatabases} title="Databases" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
