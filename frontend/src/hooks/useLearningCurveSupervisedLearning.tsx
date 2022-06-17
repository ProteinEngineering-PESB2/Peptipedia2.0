import { useEffect, useState } from "react";
import { IDataClassificationSupervisedLearning } from "../utils/interfaces";

interface Props {
  data: IDataClassificationSupervisedLearning;
}

export const useLearningCurveSupervisedLearning = ({ data }: Props) => {
  const [dataErrorBars, setDataErrorBars] = useState<any[]>([]);

  useEffect(() => {
    // Areas
    const traceErrorTraining = {
      x: data.result.learning_curve.error_training.x,
      y: data.result.learning_curve.error_training.y,
      fill: "tozerox",
      fillcolor: "rgba(0,100,80,0.2)",
      line: { color: "transparent" },
      name: "Training",
      showlegend: false,
      type: "scatter",
    };

    const traceErrorTesting = {
      x: data.result.learning_curve.error_testing.x,
      y: data.result.learning_curve.error_testing.y,
      fill: "tozerox",
      fillcolor: "rgba(0,176,246,0.2)",
      line: { color: "transparent" },
      name: "Testing",
      showlegend: false,
      type: "scatter",
    };

    // Lineas
    const traceTraining = {
      x: data.result.learning_curve.training.x,
      y: data.result.learning_curve.training.y,
      line: { color: "rgb(0,100,80)" },
      mode: "lines",
      name: "Training",
      type: "scatter",
    };

    const traceTesting = {
      x: data.result.learning_curve.testing.x,
      y: data.result.learning_curve.testing.y,
      line: { color: "rgb(0,176,246)" },
      mode: "lines",
      name: "Testing",
      type: "scatter",
    };

    setDataErrorBars([
      traceErrorTraining,
      traceErrorTesting,
      traceTraining,
      traceTesting,
    ]);
  }, []);

  return {
    dataErrorBars,
  };
};
