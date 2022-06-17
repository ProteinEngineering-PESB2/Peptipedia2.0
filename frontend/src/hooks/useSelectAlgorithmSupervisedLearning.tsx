import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { algorithms_supervised_learning } from "../utils/algorithms_supervised_learning";

export const useSelectAlgorithmSupervisedLearning = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    algorithms_supervised_learning[0].value
  );

  const handleChangeSelectedAlgorithm = (e: SelectChangeEvent): void => {
    setSelectedAlgorithm(e.target.value as string);
  };

  return {
    selectedAlgorithm,
    handleChangeSelectedAlgorithm,
    algorithms_supervised_learning,
  };
};
