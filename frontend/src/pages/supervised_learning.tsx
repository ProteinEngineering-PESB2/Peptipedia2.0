import FormContainer from "../components/form/form_container";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import SupervisedLearningForm from "../components/supervised_learning/supervised_learning_form";
import { useHandleSection } from "../hooks/useHandleSection";

export default function SupervisedLearning() {
  useHandleSection({section: "supervised-learning"})

  return (
    <Layout>
      <>
      <SectionTitle title="Supervised Learning"/>

      <SupervisedLearningForm/>
      </>
    </Layout>
  );
}
