import Grid from "@mui/material/Grid";

import Header from "./Header";
import About from "./About";
// import Statistics from "./Statistics";
import Services from "./Services";
import Team from "./Team";
import FAQs from "./FAQs";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12} sx={{ textAlign: "center" }}>
          <Header />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 7 }}>
          <About />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Services/>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Team/>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Grid item lg={12} md={12} xs={12}>
          <FAQs />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Grid item lg={12} md={12} xs={12}>
          <Contact/>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 4 }}></Grid>
    </>
  );
};

export default Home;
