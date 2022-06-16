import FrequencyForm from "../components/frequency/frequency_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";

export default function Frequency() {
  useHandleSection({ section: "frequency" });

  return (
    <Layout>
      <>
        <SectionTitle title="Frequency Evaluation" />

        <FrequencyForm />
      </>
    </Layout>
  );
}
