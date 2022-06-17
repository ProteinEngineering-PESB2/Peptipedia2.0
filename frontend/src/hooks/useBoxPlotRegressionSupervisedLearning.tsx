import { useEffect, useState } from "react";
import { IDataRegressionSupervisedLearning } from "../utils/interfaces";

interface Props {
  data: IDataRegressionSupervisedLearning;
}

export const useBoxPlotRegressionSupervisedLearning = ({ data }: Props) => {
  const [dataBoxPlot, setDataBoxPlot] = useState<any[]>([]);

  useEffect(() => {
    let array = {
      y: data.result.error_values,
      type: "box",
      boxpoints: "all",
      name: "Training",
    };

    if (data.result.error_values_testing) {
      const array_testing = {
        y: data.result.error_values_testing,
        type: "box",
        boxpoints: "all",
        name: "Testing",
      };

      setDataBoxPlot([array, array_testing]);
    } else {
      setDataBoxPlot([array]);
    }
  }, []);

  return {
    dataBoxPlot,
  };
};
