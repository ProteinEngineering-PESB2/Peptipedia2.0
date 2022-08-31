import { Grid, Paper } from "@mui/material";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DependecyWheel from "../components/DependecyWheel";

function Promiscuous() {
  useLoadingComponent();
  useHandleSection({ section: "promiscuous" });

  return (
    <Layout>
      <>
        <SectionTitle title="Promiscuous" description="Falta una descripción" />

        <Grid>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <DependecyWheel />
          </Paper>
        </Grid>
      </>
    </Layout>
  );
}

export default Promiscuous;
