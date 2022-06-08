import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function Phisicochemical() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("phisicochemical");
  }, []);

  return (
    <Layout>
      <h1>Phisicochemical</h1>
    </Layout>
  );
}
