import "./index.css";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Card, CardContent } from "@mui/material";

import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TransformIcon from "@mui/icons-material/Transform";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BiotechIcon from "@mui/icons-material/Biotech";
import BarChartIcon from "@mui/icons-material/BarChart";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

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
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card variant="elevation" className="ho" sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <FormatAlignCenterIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Alignment Sequence
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Use of the BLAST (Basic Local Alignment Search Tool) algorithm
                  against the Peptipedia database.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card
              variant="elevation"
              className="ho"
              sx={{ backgroundColor: "#2962ff", color: "#fff", height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <FormatAlignCenterIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Multi Alignment Sequence
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Use ClustalW to build an MSA from the specified sequences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card variant="elevation" className="ho" sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <BiotechIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Pfam Prediction
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Predict protein families and domains in a set of peptides
                  entered.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card
              variant="elevation"
              className="ho"
              sx={{ backgroundColor: "#2962ff", color: "#fff", height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <BiotechIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  GO Searching
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Predict Gene Ontology terms (Biological process, molecular
                  function or cellular component) in a set of entered peptides.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card variant="elevation" className="ho" sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <BarChartIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Frequency Evaluation
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Performs a count of amino acid frequencies in peptide
                  sequences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card
              variant="elevation"
              className="ho"
              sx={{ backgroundColor: "#2962ff", color: "#fff", height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <SquareFootIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Properties Estimation
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Performs an estimation of physicochemical properties (length,
                  molecular weight, charge, charge density and isoelectric
                  point) for a group of sequences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card variant="elevation" className="ho" sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <TransformIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Encoding Sequences
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  Numerically encodes the amino acid sequences entered, in order
                  to use Machine Learning models.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card
              variant="elevation"
              className="ho"
              sx={{ backgroundColor: "#2962ff", color: "#fff", height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <WorkspacesIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Clustering
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium">
                  It performs sequence clustering, using numerical coding
                  techniques and PCA analysis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={6} xs={12}>
            <Card variant="elevation" className="ho" sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <PsychologyIcon fontSize="large" />
                <Typography marginY={3} fontWeight="bold" variant="h5">
                  Training Predictive Models
                </Typography>
                <Typography variant="subtitle1" fontSize={18} fontWeight="medium"> 
                  It employs supervised learning algorithms on sets of input
                  sequences. Allows training, testing and prediction using new
                  data sets.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Services;
