import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Pfam() {
  useHandleSection({section: "pfam"})

  return (
    <Layout>
      <h1>Pfam</h1>
    </Layout>
  );
}
