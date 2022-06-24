import { Box, Grid } from "@mui/material";
import useGetPfamPeptideDetail from "../../hooks/useGetPfamPeptideDetail";
import DataTable from "../datatable";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailPfam({ peptideId }: Props) {
  const { tablePfam } = useGetPfamPeptideDetail({ peptideId });

  return (
    <>
      {tablePfam.data.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
            <Box boxShadow={4}>
              <DataTable table={tablePfam} title="Pfam" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
