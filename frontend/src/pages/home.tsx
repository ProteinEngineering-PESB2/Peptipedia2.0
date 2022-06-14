import Layout from "../components/layout";

import Header from "../components/home/header";
import About from "../components/home/about";
import Services from "../components/home/service";
import PeptipediaTeam from "../components/home/team";
import Resource from "../components/home/resources";
import { useHandleSection } from "../hooks/useHandleSection";
import { Box } from "@mui/material";

export default function Home() {
  useHandleSection({section: "home"})

  return (
    <Layout>
      <>
        <Header />
        <About />
        <Services />
        <Box sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" } }}>
        <PeptipediaTeam />
        </Box>
        <Resource/>
      </>
    </Layout>
  );
}
