import { Box, Grid, Paper, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import DataTable from "../components/datatable";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import useGetAllActivities from "../hooks/useGetAllActivities";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Tree from "react-d3-tree";

function Actividades() {
  useLoadingComponent();
  useHandleSection({ section: "activities" });
  const [dataTree, setDataTree] = useState<any>({});
  const [showSkeletonTree, setShowSkeletonTree] = useState(true);

  const {
    tableActivitiies,
    loadingTableActivities,
    showSkeletonBoxplot,
    dataBoxplot,
    nameActivity,
  } = useGetAllActivities();

  const getDataTree = async () => {
    try {
      const { data } = await axios.get("/api/get_tree");
      setDataTree(data.tree);
    } catch (error) {
      setDataTree({});
    }
    setShowSkeletonTree(false);
  };

  useEffect(() => {
    getDataTree();
  }, []);

  return (
    <Layout>
      <>
        <SectionTitle
          title="Activities"
          description="Description and detail of the activities reported in the Peptipedia database. Presentation of trends in physicochemical properties and spectra."
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={3}>
            {showSkeletonTree ? (
              <Skeleton variant="rectangular" width="100%" height={450} />
            ) : (
              Object.keys(dataTree).length !== 0 && (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                  }}
                >
                  <div
                    id="treeWrapper"
                    style={{ width: "100%", height: "32rem" }}
                  >
                    <Tree
                      data={dataTree}
                      orientation="vertical"
                      initialDepth={1}
                      enableLegacyTransitions={true}
                      translate={{ x: 650, y: 50 }}
                      nodeSize={{ x: 300, y: 300 }}
                      collapsible={true}
                      rootNodeClassName="node__root"
                      branchNodeClassName="node__branch"
                      pathFunc="step"
                      transitionDuration={500}
                    />
                  </div>
                </Paper>
              )
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={5} marginTop={3}>
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
          {showSkeletonBoxplot ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={7}
              sx={{ marginTop: 3 }}
            >
              <Skeleton variant="rectangular" width="100%" height={600} />
            </Grid>
          ) : (
            dataBoxplot.length > 0 && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
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
                        height: 600,
                        title: `Activity ${nameActivity} statistics`,
                        grid: { rows: 2, columns: 5, pattern: "independent" },
                      }}
                      config={{ responsive: true }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </>
    </Layout>
  );
}

export default Actividades;
