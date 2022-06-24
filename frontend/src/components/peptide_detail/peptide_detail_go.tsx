import { Box, Grid } from "@mui/material";
import useGetGOPeptideDetail from "../../hooks/useGetGOPeptideDetail";
import DataTable from "../datatable";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailGO({ peptideId }: Props) {
  const { tableGO } = useGetGOPeptideDetail({ peptideId });

  return (
    <>
      {tableGO.data.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box boxShadow={4}>
              <DataTable table={tableGO} title="Gene Ontology" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
