import { Box, Grid, Paper, Skeleton } from "@mui/material";
import Plot from "react-plotly.js";
import DataTable from "../components/datatable";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import useGetAllActivities from "../hooks/useGetAllActivities";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

function Actividades() {
  useLoadingComponent();
  useHandleSection({ section: "actividades" });

  const {
    tableActivitiies,
    loadingTableActivities,
    showSkeletonBoxplot,
    dataBoxplot,
    nameActivity,
  } = useGetAllActivities();

  return (
    <Layout>
      <>
        <SectionTitle title="Actividades" description="Falta una descripción" />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5} marginTop={3}>
            {loadingTableActivities ? (
              <Skeleton variant="rectangular" width="100%" height={700} />
            ) : (
              tableActivitiies.data.length > 0 && (
                <Box boxShadow={4}>
                  <DataTable table={tableActivitiies} title="All Activities" />
                </Box>
              )
            )}
          </Grid>
          {dataBoxplot.length > 0 ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={7}
              sx={{ marginTop: 3 }}
            >
              <Box boxShadow={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Plot
                    data={dataBoxplot}
                    layout={{
                      autosize: true,
                      height: 400,
                      title: `Activity ${nameActivity} statistics`,
                      grid: { rows: 1, columns: 5, pattern: "independent" },
                    }}
                    config={{ responsive: true }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Paper>
              </Box>
            </Grid>
          ) : (
            showSkeletonBoxplot && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                sx={{ marginTop: 3 }}
              >
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Grid>
            )
          )}
        </Grid>
      </>
    </Layout>
  );
}

export default Actividades;
