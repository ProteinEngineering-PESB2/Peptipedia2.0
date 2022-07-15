import { Box, Typography, Paper, Button, Grid } from "@mui/material";

import Claudio from "../../assets/claudio.jpeg";
import Fran from "../../assets/fran.jpeg";
import David from "../../assets/david.jpeg";
import Sanzana from "../../assets/sanzana.jpeg";
import Gabriel from "../../assets/gabriel.jpeg";

import CardProfile from "./card_profile";

export default function PeptipediaTeam() {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Peptipedia Team
        </Typography>
      </Box>
      <Box marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
            <CardProfile
              name="Claudio Guevara"
              rol="Frontend Developer"
              image={Claudio}
              github="https://github.com/ClaudioGuevaraDev"
              linkedin="https://www.linkedin.com/in/claudio-guevara-v%C3%A1squez-0b7b3123a/"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
            <CardProfile
              name="Francisca Rodríguez"
              rol="Researcher"
              image={Fran}
              github="https://github.com/franroca15"
              linkedin="https://www.linkedin.com/in/fran-ro-ca/"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
            <CardProfile
              name="Gabriel Cabas"
              rol="Backend Developer & Data engineer"
              image={Gabriel}
              github="https://github.com/GabrielCabas"
              linkedin="https://www.linkedin.com/in/gabriel-cabas-1834601b4/"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
            <CardProfile
              name="David Medina"
              rol="Researcher"
              image={David}
              github="https://github.com/dMedinaO"
              linkedin="https://www.linkedin.com/in/david-medina-924308224/"
            />
          </Grid>
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
            <CardProfile
              name="Benjamin Sanzana"
              rol="Researcher"
              image={Sanzana}
              github="https://github.com/baaass2"
              linkedin="https://www.linkedin.com/in/benjamin-sanzana-silva-239199228/"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
