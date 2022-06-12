import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import MSAContent from "../components/msa/msa_content";
import MSAForm from "../components/msa/msa_form";
import { useHandleSection } from "../hooks/useHandleSection";
import { IAlign } from "../utils/interfaces";

export default function MultiAlignmentSequence() {
  const [result, setResult] = useState<IAlign[]>([]);

  useHandleSection({ section: "msa" });

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Multi Alignment Sequence
          </Typography>
        </Box>

        <MSAForm setResult={setResult} />

        {result.length > 0 && <MSAContent result={result} />}
      </>
    </Layout>
  );
}
