import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const CardProfile = ({ name, rol, image, github, linkedin }) => {
  return (
    <>
      <Card sx={{ width: "95%" }}>
        <CardMedia
          component="img"
          height="350"
          image={image}
          alt="profile"
          className="image-center"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secodary">
            {rol}
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
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon sx={{ color: "#000" }} />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon sx={{ color: "#000" }} />
              </a>
            )}
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default CardProfile;
