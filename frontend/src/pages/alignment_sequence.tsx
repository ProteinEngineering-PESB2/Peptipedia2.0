import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function AlignmentSequence() {
  useHandleSection({section: "alignment-sequence"})

  return (
    <Layout>
      <h1>AlignmentSequence</h1>
    </Layout>
  );
}
