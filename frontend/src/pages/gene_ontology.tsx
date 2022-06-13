import GeneOntologyForm from "../components/gene_ontology/gene_ontology_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";

export default function GeneOntology() {
  useHandleSection({section: "gene-ontology"})

  return (
    <Layout>
      <>
      
      <SectionTitle  title="Gene Ontology"/> 

      <GeneOntologyForm/>

      </>
    </Layout>
  );
}
