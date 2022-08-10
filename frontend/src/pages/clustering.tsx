import { useState } from "react";
import ClusteringContent from "../components/clustering/clustering_content";
import ClusteringForm from "../components/clustering/clustering_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { IDataClustering } from "../utils/interfaces";

export default function Clustering() {
  const [result, setResult] = useState<any>(null);
  useHandleSection({ section: "clustering" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <SectionTitle
          title="Clustering"
          description="It performs sequence clustering, using numerical coding techniques and PCA analysis."
        />

        <ClusteringForm setResult={setResult} />

        {result && <ClusteringContent result={result} />}
      </>
    </Layout>
  );
}
