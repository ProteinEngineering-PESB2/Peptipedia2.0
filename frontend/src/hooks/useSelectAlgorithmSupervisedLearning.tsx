import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import {
  algorithms_classification_supervised_learning,
  algorithms_regression_supervised_learning,
} from "../utils/algorithms_supervised_learning";

interface Props {
  taskType: string;
}

export const useSelectAlgorithmSupervisedLearning = ({ taskType }: Props) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    taskType === "classification"
      ? algorithms_classification_supervised_learning[0].value
      : algorithms_regression_supervised_learning[0].value
  );

  const handleChangeSelectedAlgorithm = (e: SelectChangeEvent): void => {
    setSelectedAlgorithm(e.target.value as string);
  };

  return {
    selectedAlgorithm,
    handleChangeSelectedAlgorithm,
    algorithms_classification_supervised_learning,
    algorithms_regression_supervised_learning,
  };
};
