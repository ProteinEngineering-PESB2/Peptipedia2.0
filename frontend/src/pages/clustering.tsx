import { useState } from "react";
import ClusteringContent from "../components/clustering/clustering_content";
import ClusteringForm from "../components/clustering/clustering_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import { IDataClustering } from "../utils/interfaces";

export default function Clustering() {
  const [result, setResult] = useState<IDataClustering | null>(null);
  useHandleSection({ section: "clustering" });

  return (
    <Layout>
      <>
        <SectionTitle title="Clustering" />

        <ClusteringForm setResult={setResult} />

        {result && <ClusteringContent result={result} />}
      </>
    </Layout>
  );
}
