import ClusteringContent from "../components/clustering/clustering_content";
import ClusteringForm from "../components/clustering/clustering_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Clustering() {
  useHandleSection({section: "clustering"})

  return (
    <Layout>
      <>
      <SectionTitle title="Clustering"/>

      <ClusteringForm/>

      <ClusteringContent/>
      </>
    </Layout>
  );
}
