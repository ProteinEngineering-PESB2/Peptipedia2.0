import { Box } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import MSAContent from "../components/msa/msa_content";
import MSAForm from "../components/msa/msa_form";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { IAlign } from "../utils/interfaces";

export default function MultiAlignmentSequence() {
  const [result, setResult] = useState<IAlign>({
    alignment: [],
    output_file: "",
    distances_file: "",
    image_heatmap: "",
    dendrogram: ""
  });

  useHandleSection({ section: "msa" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Box>
          <SectionTitle
            title="Multiple Sequence Alingment"
            description="Use ClustalW to build an MSA from the specified sequences."
          />
        </Box>

        <MSAForm setResult={setResult} />

        {result.alignment.length > 0 && <MSAContent result={result} />}
      </>
    </Layout>
  );
}
