import { useState, useEffect } from "react";
import { IDataRegressionSupervisedLearning } from "../utils/interfaces";

interface Props {
  data: IDataRegressionSupervisedLearning;
}

export const useScatterRegressionSupervisedLearning = ({ data }: Props) => {
  const [dataScatter1, setDataScatter] = useState<any[]>([]);

  useEffect(() => {
    let traceX = {
      x: data.result.scatter.x,
      y: data.result.scatter.y,
      mode: "markers",
      type: "scatter",
      name: "Training",
    };

    if (data.result.scatter_testing) {
      const traceXTesting = {
        x: data.result.scatter_testing.x,
        y: data.result.scatter_testing.y,
        mode: "markers",
        type: "scatter",
        name: "Testing",
      };

      setDataScatter([traceX, traceXTesting]);
    } else {
      setDataScatter([traceX]);
    }
  }, []);

  return {
    dataScatter1
  };
};
