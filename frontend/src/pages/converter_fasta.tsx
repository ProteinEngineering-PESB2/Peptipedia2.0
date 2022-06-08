import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function ConverterFasta() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("converter-fasta");
  }, []);

  return (
    <Layout>
      <h1>ConverterFasta</h1>
    </Layout>
  );
}
