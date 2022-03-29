import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import Claudio from "../../../assets/claudio.jpeg";

const Team = () => {
  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Peptipedia Team
        </Typography>
      </Grid>
      <Grid item lg={12} xs={12} sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
        <Grid item lg={3} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="260"
                image={Claudio}
                alt="profile"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterButton variant="h5" component="div">
                  Claudio Guevara
                </Typography>
                <Typography variant="body2" color="text.secodary">
                  Frontend Development
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingBottom: 3, marginTop: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon sx={{ color: "#000" }}/>
                  </a>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="260"
                image={Claudio}
                alt="profile"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterButton variant="h5" component="div">
                  Claudio Guevara
                </Typography>
                <Typography variant="body2" color="text.secodary">
                  Frontend Development
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingBottom: 3, marginTop: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon sx={{ color: "#000" }}/>
                  </a>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="260"
                image={Claudio}
                alt="profile"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterButton variant="h5" component="div">
                  Claudio Guevara
                </Typography>
                <Typography variant="body2" color="text.secodary">
                  Frontend Development
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingBottom: 3, marginTop: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon sx={{ color: "#000" }}/>
                  </a>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="260"
                image={Claudio}
                alt="profile"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterButton variant="h5" component="div">
                  Claudio Guevara
                </Typography>
                <Typography variant="body2" color="text.secodary">
                  Frontend Development
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingBottom: 3, marginTop: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon sx={{ color: "#000" }}/>
                  </a>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="260"
                image={Claudio}
                alt="profile"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterButton variant="h5" component="div">
                  Claudio Guevara
                </Typography>
                <Typography variant="body2" color="text.secodary">
                  Frontend Development
                </Typography>
              </CardContent>
              <CardActions sx={{ paddingBottom: 3, marginTop: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon sx={{ color: "#000" }}/>
                  </a>
                  <a
                    href="https://stackoverflow.com/questions/42914666/react-router-external-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon sx={{ color: "#000" }}/>
                  </a>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Team;
