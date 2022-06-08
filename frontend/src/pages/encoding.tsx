import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function Encoding() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("encoding");
  }, []);

  return (
    <Layout>
      <h1>Encoding</h1>
    </Layout>
  );
}
