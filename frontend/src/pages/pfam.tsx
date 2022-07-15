import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import PfamContent from "../components/pfam/pfam_content";
import PfamForm from "../components/pfam/pfam_form";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { IDataPfam } from "../utils/interfaces";

export default function Pfam() {
  const [result, setResult] = useState<IDataPfam[]>([]);

  useHandleSection({ section: "pfam" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Box>
          <SectionTitle
            title="Pfam Prediction"
            description="Predict protein families and domains in a set of peptides entered."
          />
        </Box>

        <PfamForm setResult={setResult} />

        {result.length > 0 && <PfamContent result={result} />}
      </>
    </Layout>
  );
}
