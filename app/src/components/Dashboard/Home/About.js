import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Peptipedia from "../../../assets/peptipedia.jpg";

const About = () => {
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        What is Peptipedia?
      </Typography>
      <Grid container spacing={4}>
        <Grid item marginTop={3} xl={12} lg={12} md={12}>
          <Typography
            align="justify"
            paragraph={true}
            variant="caption"
            sx={{ fontSize: 23 }}
          >
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
            code and sample data sets are available in the{" "}
            <a
              href="https://github.com/ProteinEngineering-PESB2/Peptipedia2.0"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              GitHub repository.
            </a>
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: '100%',
          }}
        >
          <img src={Peptipedia} alt="header" className="img-peptipedia"/>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
