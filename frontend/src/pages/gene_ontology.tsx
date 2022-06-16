import { useState } from "react";
import GeneOntologyContent from "../components/gene_ontology/gene_ontology_content";
import GeneOntologyForm from "../components/gene_ontology/gene_ontology_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import { IDataGeneOntology } from "../utils/interfaces";

export default function GeneOntology() {
  const [result, setResult] = useState<IDataGeneOntology[]>([]);

  useHandleSection({ section: "gene-ontology" });

  return (
    <Layout>
      <>
        <SectionTitle title="Gene Ontology" />

        <GeneOntologyForm setResult={setResult} />

        {result.length > 0 && <GeneOntologyContent result={result} />}
      </>
    </Layout>
  );
}
