import { Box, Grid } from "@mui/material";
import useGetActivitiesPeptideDetail from "../../hooks/useGetActivitiesPeptideDetail";
import DataTable from "../datatable";

interface Props {
  peptideId: string | undefined;
}

export default function PeptideDetailActivities({ peptideId }: Props) {
  const { tableActivities } = useGetActivitiesPeptideDetail({ peptideId });

  return (
    <>
      {tableActivities.data.length > 0 && (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={5}>
            <Box boxShadow={4}>
              <DataTable table={tableActivities} title="Activity" />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
