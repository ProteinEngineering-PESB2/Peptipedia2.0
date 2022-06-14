import { Box, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";

import Claudio from "../../assets/claudio.jpeg";
import Fran from "../../assets/fran.jpeg";
import David from "../../assets/david.jpeg";
import Sanzana from "../../assets/sanzana.jpeg";
import Gabriel from "../../assets/gabriel.jpeg";

import CardProfile from "./card_profile";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

export default function PeptipediaTeam() {
  const items = [
    <CardProfile
      name="Claudio Guevara"
      rol="Frontend Developer"
      image={Claudio}
      github="https://github.com/ClaudioGuevaraDev"
      linkedin="https://www.linkedin.com/in/claudio-guevara-v%C3%A1squez-0b7b3123a/"
    />,
    <CardProfile
      name="Francisca Rodríguez"
      rol="Researcher"
      image={Fran}
      github="https://github.com/franroca15"
      linkedin="https://www.linkedin.com/in/fran-ro-ca/"
    />,
    <CardProfile
      name="Gabriel Cabas"
      rol="Backend Developer & Data engineer"
      image={Gabriel}
      github="https://github.com/GabrielCabas"
      linkedin="https://www.linkedin.com/in/gabriel-cabas-1834601b4/"
    />,
    <CardProfile
      name="David Medina"
      rol="Researcher"
      image={David}
      github="https://github.com/dMedinaO"
      linkedin="https://www.linkedin.com/in/david-medina-924308224/"
    />,
    <CardProfile
      name="Benjamin Sanzana"
      rol="Researcher"
      image={Sanzana}
      github="https://github.com/baaass2"
      linkedin="https://www.linkedin.com/in/benjamin-sanzana-silva-239199228/"
    />,
  ];

  return (
    <>
      <Box marginTop={8}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Peptipedia Team
        </Typography>
      </Box>
      <Box marginTop={5}>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          autoPlay
          infinite
          disableButtonsControls
          disableDotsControls
          animationDuration={1500}
          autoPlayInterval={2500}
        />
      </Box>
    </>
  );
}
