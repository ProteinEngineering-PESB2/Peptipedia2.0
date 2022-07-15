import { useState } from "react";
import FrequencyContent from "../components/frequency/frequency_content";
import FrequencyForm from "../components/frequency/frequency_form";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { IDataFrequency } from "../utils/interfaces";

export default function Frequency() {
  const [result, setResult] = useState<IDataFrequency[]>([]);
  useHandleSection({ section: "frequency" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <SectionTitle
          title="Frequency Evaluation"
          description="Performs a count of amino acid frequencies in peptide sequences."
        />

        <FrequencyForm setResult={setResult} />

        {result.length > 0 && <FrequencyContent result={result} />}
      </>
    </Layout>
  );
}
