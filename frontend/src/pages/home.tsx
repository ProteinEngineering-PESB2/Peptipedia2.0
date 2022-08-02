import Layout from "../components/layout";

import Header from "../components/home/header";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import StatisticsCards from "../components/home/StatisticsCards";
import { Grid, Paper, Skeleton } from "@mui/material";
import BarChart from "../components/charts/bar_chart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  useHandleSection({ section: "home" });
  useLoadingComponent();
  const [dataPeptidesByDatabase, setDataPeptidesByDatabase] =
    useState<any>(null);
  const [dataPeptidesByActivity, setDataPeptidesByActivity] =
    useState<any>(null);
  const [loadingDataPeptidesByDatabase, setLoadingDataPeptidesByDatabase] =
    useState<boolean>(true);
  const [loadingDataPeptidesByActivity, setLoadingDataPeptidesByActivity] =
    useState<boolean>(true);

  const getPeptidesByDatabase = async () => {
    try {
      const response = await axios.get("/api/get_peptides_by_database/");
      setDataPeptidesByDatabase({
        x: response.data.X,
        y: response.data.Y,
      });
      setLoadingDataPeptidesByDatabase(false);
    } catch (error) {
      setDataPeptidesByDatabase(null);
      setLoadingDataPeptidesByDatabase(false);
    }
  };

  const getPeptidesByActivity = async () => {
    try {
      const response = await axios.get("/api/get_peptides_by_activity/");
      setDataPeptidesByActivity({
        x: response.data.X,
        y: response.data.Y,
      });
      setLoadingDataPeptidesByActivity(false);
    } catch (error) {
      setDataPeptidesByActivity(null);
      setLoadingDataPeptidesByActivity(false);
    }
  };

  useEffect(() => {
    getPeptidesByDatabase();
    getPeptidesByActivity();
  }, []);

  return (
    <Layout>
      <>
        <Header />

        <StatisticsCards />

        <Grid container spacing={2} marginTop={2}>
          {loadingDataPeptidesByDatabase ? (
            <Skeleton variant="rectangular" width="100%" height={500} />
          ) : (
            dataPeptidesByDatabase && (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    boxShadow: 5,
                    height: "100%",
                  }}
                >
                  <BarChart
                    x={dataPeptidesByDatabase.x}
                    y={dataPeptidesByDatabase.y}
                    title="Peptides by Database"
                  />
                </Paper>
              </Grid>
            )
          )}
          {loadingDataPeptidesByActivity ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              sx={{ marginTop: 2 }}
            />
          ) : (
            dataPeptidesByActivity && (
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    boxShadow: 5,
                  }}
                >
                  <BarChart
                    x={dataPeptidesByActivity.x}
                    y={dataPeptidesByActivity.y}
                    title="Peptides by Activity"
                  />
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </>
    </Layout>
  );
}
