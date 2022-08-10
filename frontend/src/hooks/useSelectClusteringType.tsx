import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { clustering_types } from "../utils/clustering_types";

function useSelectClusteringType() {
  const [selectedClusteringType, setSelectedClusteringType] = useState<string>(
    clustering_types[0].value
  );

  const handleChangeSelectClusteringType = (e: SelectChangeEvent) => {
    setSelectedClusteringType(e.target.value as string);
  };

  return {
    selectedClusteringType,
    clustering_types,
    handleChangeSelectClusteringType,
  };
}

export default useSelectClusteringType;
