import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function MultiAlignmentSequence() {
  useHandleSection({section: "msa"})

  return (
    <Layout>
      <h1>MultiAlignmentSequence</h1>
    </Layout>
  );
}
