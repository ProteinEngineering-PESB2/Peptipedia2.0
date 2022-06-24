import { Box, Grid } from "@mui/material";
import useGetTaxonomyPeptideDetail from "../../hooks/useGetTaxonomyPeptideDetail";
import DataTable from "../datatable";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailTaxonomy({ peptideId }: Props) {
  const { tableTaxonomy } = useGetTaxonomyPeptideDetail({ peptideId });

  return (
    <>
      {tableTaxonomy.data.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
            <Box boxShadow={4}>
              <DataTable table={tableTaxonomy} title="Taxonomy" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
