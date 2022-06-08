import { useEffect } from "react";
import Layout from "../components/layout";
import { useAppContext } from "../hooks/useAppContext";

export default function Database() {
  const { toggleSection } = useAppContext()

  useEffect(() => {
    toggleSection("database")
  }, [])

  return (
    <Layout>
      <h1>Database</h1>
    </Layout>
  );
}
