import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Phisicochemical() {
  useHandleSection({section: "physicochemical"})

  return (
    <Layout>
      <h1>Phisicochemical</h1>
    </Layout>
  );
}
