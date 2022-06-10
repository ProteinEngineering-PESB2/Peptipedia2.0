import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";

export default function SupervisedLearning() {
  useHandleSection({section: "supervised-learning"})

  return (
    <Layout>
      <h1>SupervisedLearning</h1>
    </Layout>
  );
}
