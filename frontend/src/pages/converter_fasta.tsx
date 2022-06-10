import Layout from "../components/layout";
import { Box, Typography, Grid, TextField } from "@mui/material";
import { useHandleSection } from "../hooks/useHandleSection";

export default function ConverterFasta() {
  useHandleSection({section: "fasta-converter"})

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Fasta Converter
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Enter sequences"
                multiline
                rows={30}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

            </Grid>
          </Grid>
        </Box>
      </>
    </Layout>
  );
}
