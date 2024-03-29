import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { algorithms } from "../utils/algorithms_clustering";

export const useSelectAlgorithmClustering = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    algorithms[0].value
  );

  const handleChangeSelectedAlgorithm = (e: SelectChangeEvent): void => {
    setSelectedAlgorithm(e.target.value as string);
  };

  return {
    algorithms,
    selectedAlgorithm,
    handleChangeSelectedAlgorithm,
  };
};
