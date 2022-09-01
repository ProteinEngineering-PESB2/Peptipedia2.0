import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import StructuralPredictionContent from "../components/structural_prediction/StructuralPredictionContent";
import StructuralPredictionForm from "../components/structural_prediction/StructuralPredictionForm";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

function StructuralPrediction() {
  const [result, setResult] = useState<any>([]);
  const [sequenceValue, setSequenceValue] = useState("");

  const handleChangeSequenceValue = (e: SelectChangeEvent) => {
    setSequenceValue(e.target.value as string);
  };

  useLoadingComponent();
  useHandleSection({ section: "structural_prediction" });

  return (
    <Layout>
      <>
        <SectionTitle
          title="Structural Prediction"
          description="Secondary Structure Element (SS3 and SS8), Solvent Accessibility (ACC), Order/Disorder prediction (DISO), and TransMembrane topology (TM2 and TM8)"
        />

        <StructuralPredictionForm
          setResult={setResult}
          setSequenceValue={setSequenceValue}
        />

        {result && result.length > 0 && sequenceValue !== "" && (
          <StructuralPredictionContent
            result={result}
            handleChangeSequenceValue={handleChangeSequenceValue}
            sequenceValue={sequenceValue}
          />
        )}
      </>
    </Layout>
  );
}

export default StructuralPrediction;
