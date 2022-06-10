import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function GeneOntology() {
  useHandleSection({section: "gene-ontology"})

  return (
    <Layout>
      <h1>GeneOntology</h1>
    </Layout>
  );
}
