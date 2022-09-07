import { Box, Grid, Paper, Skeleton } from "@mui/material";
import Layout from "../components/layout";
import Plot from "react-plotly.js";
import { useHandleSection } from "../hooks/useHandleSection";
import { useState } from "react";
import Downloads from "../components/database/downloads";
import BackdropComponent from "../components/backdrop_component";
import SectionTitle from "../components/section_title";
import useGetDBStatistics from "../hooks/useGetDBStatistics";
import DataTable from "../components/datatable";
import useGetGeneralStatistics from "../hooks/useGetGeneralStatistics";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function Database() {
  const [percentage, setPercentage] = useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  useLoadingComponent();

  useHandleSection({ section: "database" });
  const { tableStatistics, loadingTableStatistics } = useGetDBStatistics();
  const { dataPie, loadingDataPie } = useGetGeneralStatistics();

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} percentage={percentage} />
        <Box>
          <SectionTitle title="Database" description="" />
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
            xl={6}
            sx={{ marginTop: 3 }}
          >
            {loadingDataPie ? (
              <Skeleton variant="rectangular" width="100%" height={700} />
            ) : (
              dataPie.length > 0 && (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                    height: "100%",
                  }}
                >
                  <Plot
                    data={dataPie}
                    layout={{
                      autosize: true,
                      title: "General Activity Statistic",
                      height: 500,
                      font: {
                        size: 15,
                      },
                    }}
                    config={{
                      responsive: true,
                      displayModeBar: true,
                      autosizable: true,
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Paper>
              )
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} marginTop={3}>
            {loadingTableStatistics ? (
              <Skeleton variant="rectangular" width="100%" height={700} />
            ) : (
              tableStatistics.data.length > 0 && (
                <Box boxShadow={4}>
                  <DataTable
                    table={tableStatistics}
                    title="Database Statistics"
                  />
                </Box>
              )
            )}
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}
