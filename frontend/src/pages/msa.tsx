import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function MultiAlignmentSequence() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("msa");
  }, []);

  return (
    <Layout>
      <h1>MultiAlignmentSequence</h1>
    </Layout>
  );
}
