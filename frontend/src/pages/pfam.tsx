import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";
import PfamForm from "../components/pfam/pfam_form";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Pfam() {
  useHandleSection({ section: "pfam" });

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Pfam Prediction
          </Typography>
        </Box>

        <PfamForm/>
      </>
    </Layout>
  );
}
