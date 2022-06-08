import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function Pfam() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("pfam");
  }, []);

  return (
    <Layout>
      <h1>Pfam</h1>
    </Layout>
  );
}
