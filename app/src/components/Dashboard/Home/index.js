import Grid from "@mui/material/Grid";

import HomeIcon from "@mui/icons-material/Home";

import Header from "./Header";
import About from "./About";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12} sx={{ textAlign: "center" }}>
          <Header/>
        </Grid>
        <Grid item lg={12} sx={{ marginTop: 5 }}>
          <About/>
        </Grid>
        <Grid item lg={12}>
          <FAQs/>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 2, color: "#000" }}>
        <Grid item lg={3} xs={12}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="h5">Sequences</h3>
                  <p className="">4.000.000</p>
                </div>
                <i>
                  <HomeIcon fontSize="large" />
                </i>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} xs={12}>
          <div
            className="card"
            style={{ backgroundColor: "#2962ff", color: "#fff" }}
          >
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="h5">Sequences</h3>
                  <p className="">4.000.000</p>
                </div>
                <i>
                  <HomeIcon fontSize="large" />
                </i>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} xs={12}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="h5">Sequences</h3>
                  <p className="">4.000.000</p>
                </div>
                <i>
                  <HomeIcon fontSize="large" />
                </i>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} xs={12}>
          <div
            className="card"
            style={{ backgroundColor: "#2962ff", color: "#fff" }}
          >
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="h5">Sequences</h3>
                  <p className="">4.000.000</p>
                </div>
                <i>
                  <HomeIcon fontSize="large" />
                </i>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
