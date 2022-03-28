import Grid from "@mui/material/Grid";

import HomeIcon from "@mui/icons-material/Home";

const Statistics = () => {
  return (
    <>
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
    </>
  );
};

export default Statistics;
