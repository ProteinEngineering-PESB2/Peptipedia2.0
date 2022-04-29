import "./index.css";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const Services = () => {
  return (
    <>
      <Grid item lg={12} xs={12}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Services
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <div className="card ho">
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <AccessAlarmIcon fontSize="large" />
                <h4 className="my-3 fw-bold">Blast Alignment</h4>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className="card ho text-white" style={{ backgroundColor: "#2962ff" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <AccessAlarmIcon fontSize="large" />
                <h4 className="my-3 fw-bold">Blast Alignment</h4>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className="card ho">
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <AccessAlarmIcon fontSize="large" />
                <h4 className="my-3 fw-bold">Blast Alignment</h4>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className="card ho text-white" style={{ backgroundColor: "#2962ff" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <AccessAlarmIcon fontSize="large" />
                <h4 className="my-3 fw-bold">Blast Alignment</h4>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Services;
