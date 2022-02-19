import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import GeneOntologyForm from "./GeneOntologyForm";
import GeneOntologyTable from "./GeneOntologyTable";

const GeneOntology = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h4">Gene Ontology Characterization</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <GeneOntologyForm setData={setData} />
        </Grid>
        {data.length > 0 && (
          <Grid item lg={12} xs={12}>
            <GeneOntologyTable data={data} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default GeneOntology;
