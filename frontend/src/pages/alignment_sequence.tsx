import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function AlignmentSequence() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("alignment-sequence");
  }, []);

  return (
    <Layout>
      <h1>AlignmentSequence</h1>
    </Layout>
  );
}
