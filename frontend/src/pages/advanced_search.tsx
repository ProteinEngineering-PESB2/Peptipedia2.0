import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function AdvancedSearch() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("advanced-search");
  }, []);

  return (
    <Layout>
      <h1>AdvancedSearch</h1>
    </Layout>
  );
}
