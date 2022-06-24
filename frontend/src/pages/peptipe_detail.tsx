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
import SectionTitle from "../components/section_title";
import useGetInfoPeptideDetail from "../hooks/useGetInfoPeptideDetail";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function PeptideDetail() {
  const { peptideId } = useParams();
  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();
  const { dataInfo } = useGetInfoPeptideDetail({ peptideId });

  return (
    <Layout>
      <>
        <SectionTitle title={`Peptide ${peptideId}`} />

        <PeptideDetailSequence sequence={dataInfo.sequence} />

        <PeptideDetailStructure peptideId={peptideId}/>

        <PeptideDetailPhysicochemicalProperties dataInfo={dataInfo} />

        <PeptideDetailGO peptideId={peptideId} />

        <PeptideDetailPfam peptideId={peptideId} />

        <PeptideDetailActivities peptideId={peptideId} />

        <PeptideDetailTaxonomy peptideId={peptideId} />

        <PeptideDetailDatabases peptideId={peptideId} />
      </>
    </Layout>
  );
}
