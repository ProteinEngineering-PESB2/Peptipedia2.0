import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Encoding() {
  useHandleSection({section: "encoding"})

  return (
    <Layout>
      <h1>Encoding</h1>
    </Layout>
  );
}
