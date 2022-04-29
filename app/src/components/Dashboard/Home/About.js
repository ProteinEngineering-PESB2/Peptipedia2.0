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
        What is Peptipedia?
      </Typography>
      <Grid container spacing={3}>
        <Grid item marginTop={3}>
          <p className="lead" style={{ textAlign: "justify" }}>
            Peptides have attracted attention during the last decades due to
            their extraordinary therapeutic properties. Different computational
            tools have been developed to take advantage of existing information,
            compiling knowledge and making available the information for common
            users. Nevertheless, most related tools available are not user-
            friendly, present redundant information, do not clearly display the
            data, and usually are specific for particular biological activities,
            not existing so far, an integrated database with consolidated
            information to help research peptide sequences. To solve these
            necessities, we developed Peptipedia, a user-friendly web
            application and comprehensive database to search, characterize and
            analyse peptide sequences. Our tool integrates the information from
            30 previously reported databases with a total of 92 055 amino acid
            sequences, making it the biggest repository of peptides with
            recorded activities to date. Furthermore, we make available a
            variety of bioinformatics services and statistical modules to
            increase our tool&#39;s usability. Moreover, we incorporated a
            robust assembled binary classification system to predict putative
            biological activities for peptide sequences. Our tools&#39;
            significant differences with other existing alternatives become a
            substantial contribution for developing biotechnological and
            bioengineering applications for peptides. Peptipedia is available
            for non-commercial use as an open-access software, licensed under
            the GNU General Public License, version GPL 3.0. The web platform is
            publicly available at peptipedia.cl. Database URL: Both the source
            code and sample data sets are available in the <a href="https://github.com/ProteinEngineering-PESB2/peptipedia" target="_blank" style={{ textDecoration: "none" }}>GitHub repository.</a>
          </p>
        </Grid>
        {/* <Grid
          item
          lg={5}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Fornite} alt="header" style={{ height: "15rem" }} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default About;
