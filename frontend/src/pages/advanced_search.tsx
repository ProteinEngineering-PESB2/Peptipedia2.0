import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export default function AdvancedSearch() {
  useHandleSection({ section: "advanced-search" });
  useLoadingComponent();

  return (
    <Layout>
      <h1>AdvancedSearch</h1>
    </Layout>
  );
}
