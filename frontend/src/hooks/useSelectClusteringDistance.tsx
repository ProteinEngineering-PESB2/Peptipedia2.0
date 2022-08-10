import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { clustering_distances } from "../utils/clustering_distances";

function useSelectClusteringDistance() {
  const [selectedClusteringDistance, setSelectedClusteringDistance] =
    useState<string>(clustering_distances[0].value);

  const handleChangeSelectClusteringDistance = (e: SelectChangeEvent) => {
    setSelectedClusteringDistance(e.target.value as string);
  };

  return {
    selectedClusteringDistance,
    clustering_distances,
    handleChangeSelectClusteringDistance,
  };
}

export default useSelectClusteringDistance;
