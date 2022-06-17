import { useState } from "react";
import FormContainer from "../components/form/form_container";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import SupervisedLearningContentClassification from "../components/supervised_learning/supervised_learning_content_classification";
import SupervisedLearningContentRegression from "../components/supervised_learning/supervised_learning_content_regression";
import SupervisedLearningForm from "../components/supervised_learning/supervised_learning_form";
import { useHandleSection } from "../hooks/useHandleSection";
import {
  IDataClassificationSupervisedLearning,
  IDataRegressionSupervisedLearning,
} from "../utils/interfaces";

export default function SupervisedLearning() {
  const [resultClassification, setResultClassification] =
    useState<IDataClassificationSupervisedLearning | null>(null);
  const [resultRegression, setResultRegression] =
    useState<IDataRegressionSupervisedLearning | null>(null);

  useHandleSection({ section: "supervised-learning" });

  return (
    <Layout>
      <>
        <SectionTitle title="Supervised Learning" />

        <SupervisedLearningForm
          setResultClassification={setResultClassification}
          setResultRegression={setResultRegression}
        />

        {resultClassification && (
          <SupervisedLearningContentClassification
            result={resultClassification}
          />
        )}
        {resultRegression && (
          <SupervisedLearningContentRegression result={resultRegression} />
        )}
      </>
    </Layout>
  );
}
