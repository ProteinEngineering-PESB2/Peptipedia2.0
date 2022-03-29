import AliceCarousel from "react-alice-carousel";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CardProfile from "./CardProfile";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const Team = () => {
  const items = [
    <CardProfile />,
    <CardProfile />,
    <CardProfile />,
    <CardProfile />,
    <CardProfile />,
    <CardProfile />,
    <CardProfile />,
  ];

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
      <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 3 }}>
        <AliceCarousel
          mouseTracking
          autoPlay
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          animationDuration={1500}
          infinite
          autoPlayInterval={2500}
          items={items}
          paddingLeft={15}
        />
      </Grid>
    </>
  );
};

export default Team;
