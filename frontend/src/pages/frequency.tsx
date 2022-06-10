import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Frequency() {
  useHandleSection({section: "frequency"})

  return (
    <Layout>
      <h1>Frequency</h1>
    </Layout>
  );
}
