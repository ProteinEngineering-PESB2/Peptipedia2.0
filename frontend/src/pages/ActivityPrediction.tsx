import ActivityPredictionForm from "../components/activity_prediction/ActivityPredictionForm";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

function ActivityPrediction() {
  useLoadingComponent();
  useHandleSection({ section: "activity-prediction" });

  return (
    <Layout>
      <>
        <SectionTitle
          title="Activity Prediction"
          description="Falta una descripción"
        />

        <ActivityPredictionForm />
      </>
    </Layout>
  );
}

export default ActivityPrediction;
