import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Layout from "../components/layout";

export default function SupervisedLearning() {
  const { toggleSection } = useAppContext();

  useEffect(() => {
    toggleSection("supervised-learning");
  }, []);

  return (
    <Layout>
      <h1>SupervisedLearning</h1>
    </Layout>
  );
}
