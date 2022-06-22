import { Box, Grid, Paper } from "@mui/material";
import Layout from "../components/layout";
import Plot from "react-plotly.js";
import { useHandleSection } from "../hooks/useHandleSection";
import { useEffect, useState } from "react";
import Downloads from "../components/database/downloads";
import BackdropComponent from "../components/backdrop_component";
import SectionTitle from "../components/section_title";
import useGetDBStatistics from "../hooks/useGetDBStatistics";
import DataTable from "../components/datatable";
import useGetAllActivities from "../hooks/useGetAllActivities";
import useGetGeneralStatistics from "../hooks/useGetGeneralStatistics";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function Database() {
  const [percentage, setPercentage] = useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  useLoadingComponent();

  useHandleSection({ section: "database" });
  const { tableStatistics } = useGetDBStatistics();
  const { tableActivitiies, nameActivity, dataBoxplot } = useGetAllActivities();
  const { dataPie } = useGetGeneralStatistics();

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} percentage={percentage} />
        <Box>
          <SectionTitle title="Database" />
        </Box>
        <Downloads
          setOpenBackdrop={setOpenBackdrop}
          setPercentage={setPercentage}
        />
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: 3 }}
          >
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: 4,
              }}
            >
              <Plot
                data={dataPie}
                layout={{
                  autosize: true,
                  title: "General Activity Statistic",
                  height: 400
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} marginTop={3}>
            <Box boxShadow={4}>
              <DataTable table={tableStatistics} title="Database Statistics" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} marginTop={3}>
            <Box boxShadow={4}>
              <DataTable table={tableActivitiies} title="All Activities" />
            </Box>
          </Grid>
          {dataBoxplot.length > 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
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
                      height: 430,
                      title: `Activity ${nameActivity} statistics`,
                      grid: { rows: 1, columns: 5, pattern: "independent" },
                    }}
                    useResizeHandler
                    className="w-full h-full"
                  />
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>
      </>
    </Layout>
  );
}
