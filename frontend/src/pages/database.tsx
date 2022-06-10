import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Database() {
  useHandleSection({section: "database"})

  return (
    <Layout>
      <h1>Database</h1>
    </Layout>
  );
}
