import { Box } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import MSAContent from "../components/msa/msa_content";
import MSAForm from "../components/msa/msa_form";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import { IAlign } from "../utils/interfaces";

export default function MultiAlignmentSequence() {
  const [result, setResult] = useState<IAlign[]>([]);

  useHandleSection({ section: "msa" });

  return (
    <Layout>
      <>
        <Box>
          <SectionTitle title="Multi Alignment Sequence" />
        </Box>

        <MSAForm setResult={setResult} />

        {result.length > 0 && <MSAContent result={result} />}
      </>
    </Layout>
  );
}
