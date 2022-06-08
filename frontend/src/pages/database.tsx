import { useContext, useEffect } from "react";
import Layout from "../components/layout";
import AppContext from "../context/AppContext";

export default function Database() {
  const { toggleSection } = useContext(AppContext)

  useEffect(() => {
    toggleSection("database")
  }, [])

  return (
    <Layout>
      <h1>Database</h1>
    </Layout>
  );
}
