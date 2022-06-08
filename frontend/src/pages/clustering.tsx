import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function Clustering() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("clustering");
  }, []);

  return (
    <Layout>
      <h1>Clustering</h1>
    </Layout>
  );
}
