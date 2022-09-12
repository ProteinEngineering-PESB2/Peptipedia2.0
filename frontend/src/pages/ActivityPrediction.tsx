import { useState } from "react";
import ActivityPredictionForm from "../components/activity_prediction/ActivityPredictionForm";
import ActivityPredictionTable from "../components/activity_prediction/ActivityPredictionTable";
import BackdropComponent from "../components/backdrop_component";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

export type ActivityPrediction = {
  id: string;
  columns: string[];
  data: any[][];
};

function ActivityPrediction() {
  useLoadingComponent();
  useHandleSection({ section: "activity-prediction" });
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [result, setResult] = useState<ActivityPrediction[]>([]);

  return (
    <Layout>
      <>
        <BackdropComponent open={openBackdrop} />

        <SectionTitle
          title="Activity Prediction"
          description="Predictive modelos of peptide sequences for evaluating biological activity support by assembled machine learning strategies and numerical representation of protein sequences based on signal spaces and physicochemical properties"
        />

        <ActivityPredictionForm
          setOpenBackdrop={setOpenBackdrop}
          setResult={setResult}
        />

        {result.length > 0 && <ActivityPredictionTable result={result} />}
      </>
    </Layout>
  );
}

export default ActivityPrediction;
