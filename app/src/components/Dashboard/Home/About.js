import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Fornite from "../../../assets/Fortnite_Two Color.svg";

const About = () => {
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={7} xs={12} marginTop={3}>
          <p className="lead" style={{ textAlign: "justify" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <br></br>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Grid>
        <Grid
          item
          lg={5}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Fornite} alt="header" style={{ height: "18rem" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default About;
