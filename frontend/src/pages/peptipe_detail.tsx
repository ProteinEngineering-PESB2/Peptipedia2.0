import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function PeptideDetail() {
  const { peptideId } = useParams();
  useHandleSection({ section: "advanced-search" })
  useLoadingComponent();

  return (
    <Layout>
      <>
        <h1>Peptide {peptideId}</h1>
      </>
    </Layout>
  );
}
