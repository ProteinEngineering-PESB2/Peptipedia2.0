import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function GeneOntology() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("gene-ontology");
  }, []);

  return (
    <Layout>
      <h1>GeneOntology</h1>
    </Layout>
  );
}
