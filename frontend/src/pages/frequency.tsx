import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function Frequency() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("frequency");
  }, []);

  return (
    <Layout>
      <h1>Frequency</h1>
    </Layout>
  );
}
