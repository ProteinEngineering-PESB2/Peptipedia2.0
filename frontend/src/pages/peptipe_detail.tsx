import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import PeptideDetailActivities from "../components/peptide_detail/peptide_detail_activities";
import PeptideDetailDatabases from "../components/peptide_detail/peptide_detail_databases";
import PeptideDetailGO from "../components/peptide_detail/peptide_detail_go";
import PeptideDetailPfam from "../components/peptide_detail/peptide_detail_pfam";
import PeptideDetailPhysicochemicalProperties from "../components/peptide_detail/peptide_detail_physicochemical_properties";
import PeptideDetailSequence from "../components/peptide_detail/peptide_detail_sequence";
import PeptideDetailStructure from "../components/peptide_detail/peptide_detail_structure";
import PeptideDetailTaxonomy from "../components/peptide_detail/peptide_detail_taxonomy";
import ProSeqViewer from "../components/pro_seq_viewer";
import SectionTitle from "../components/section_title";
import useGetInfoPeptideDetail from "../hooks/useGetInfoPeptideDetail";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function PeptideDetail() {
  const { peptideId } = useParams();
  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();
  const { dataInfo } = useGetInfoPeptideDetail({ peptideId });
  const [resultStructureAnalysis, setResultStructureAnalysis] = useState<any[]>(
    []
  );

  const getStructureAnalysis = async () => {
    try {
      const response = await axios.get(
        `/api/get_structural_analysis/${peptideId}`
      );
      setResultStructureAnalysis(response.data.result.alignment);
    } catch (error) {
      setResultStructureAnalysis([]);
    }
  };

  useEffect(() => {
    getStructureAnalysis();
  }, []);

  return (
    <Layout>
      <>
        <SectionTitle title={`Peptide ${peptideId}`} />

        <PeptideDetailSequence sequence={dataInfo.sequence} />

        <PeptideDetailStructure peptideId={peptideId} />

        <PeptideDetailPhysicochemicalProperties dataInfo={dataInfo} />

        <PeptideDetailGO peptideId={peptideId} />

        <PeptideDetailPfam peptideId={peptideId} />

        <PeptideDetailActivities peptideId={peptideId} />

        <PeptideDetailTaxonomy peptideId={peptideId} />

        <PeptideDetailDatabases peptideId={peptideId} />

        {resultStructureAnalysis.length > 0 && (
          <>
          <Typography variant="h4" fontWeight="bold" marginTop={3}>Structural Prediction</Typography>
          <Box
            marginTop={1}
            boxShadow={4}
            sx={{
              maxWidth: {
                xs: "20rem",
                sm: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              },
            }}
          >
            <ProSeqViewer sequences={resultStructureAnalysis} color={true} />
          </Box>
          </>
        )}
      </>
    </Layout>
  );
}
