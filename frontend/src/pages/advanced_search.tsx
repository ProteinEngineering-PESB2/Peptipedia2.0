import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function AdvancedSearch() {
  useHandleSection({section: "advanced-search"})

  return (
    <Layout>
      <h1>AdvancedSearch</h1>
    </Layout>
  );
}
