import AliceCarousel from "react-alice-carousel";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CardProfile from "./CardProfile";

import Claudio from "../../../assets/claudio.jpeg";
import Fran from "../../../assets/fran.jpeg"
import David from "../../../assets/david.jpeg"
import Sanzana from "../../../assets/sanzana.jpeg"
import UnknownMan from "../../../assets/hombre-desconocido.jpg"

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
  1500: { items: 4 },
};

const Team = () => {
  const items = [
    <CardProfile name="Claudio Guevara" rol="Frontend Development" image={Claudio}/>,
    <CardProfile name="Francisca Rodríguez" rol="Research" image={Fran}/>,
    <CardProfile name="David Medina" rol="Research" image={David}/>,
    <CardProfile name="Benjamin Sanzana" rol="Research" image={Sanzana}/>,
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
