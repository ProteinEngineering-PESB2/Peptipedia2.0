import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { filter_types_clustering } from "../utils/filter_type_clustering";

function useSelectedFilterTypeClustering() {
  const [selectedFilterTypeClustering, setSelectedFilterTypeClustering] =
    useState(filter_types_clustering[0].value);

  const handleChangeSelectFilterTypeClustering = (e: SelectChangeEvent) => {
    setSelectedFilterTypeClustering(e.target.value as string);
  };

  return {
    selectedFilterTypeClustering,
    filter_types_clustering,
    handleChangeSelectFilterTypeClustering,
  };
}

export default useSelectedFilterTypeClustering;
