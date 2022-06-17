import { useEffect, useState } from "react";
import { IDataClassificationSupervisedLearning } from "../utils/interfaces";

interface Props {
  data: IDataClassificationSupervisedLearning;
}

export const useGroupedBarSupervisedLearning = ({ data }: Props) => {
  const [dataBar, setDataBar] = useState<any[]>([]);
  const [dataBarTesting, setDataBarTesting] = useState<any[]>([]);

  useEffect(() => {
    let traceSensibility = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensibility,
      name: "Sensibility",
      type: "bar",
    };

    let traceSensivity = {
      x: data.result.analysis.categories,
      y: data.result.analysis.sensitivity,
      name: "Sensitivity",
      type: "bar",
    };

    if (data.result.analysis_testing) {
      const traceSensibilityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensibility,
        name: "Sensibility Testing",
        type: "bar",
      };

      const traceSensivityTesting = {
        x: data.result.analysis_testing.categories,
        y: data.result.analysis_testing.sensitivity,
        name: "Sensitivity Testing",
        type: "bar",
      };

      setDataBarTesting([traceSensibilityTesting, traceSensivityTesting]);
    }
    setDataBar([traceSensibility, traceSensivity]);
  }, []);

  return {
    dataBar,
    dataBarTesting,
  };
};
