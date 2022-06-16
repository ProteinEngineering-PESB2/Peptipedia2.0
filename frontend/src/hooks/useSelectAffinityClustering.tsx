import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { affinities } from "../utils/affinities";

export const useSelectAffinityClustering = () => {
  const [selectedAffinity, setSelectedAffinity] = useState<string>(
    affinities[0].value
  );

  const handleChangeSelectedAffinity = (e: SelectChangeEvent): void => {
    setSelectedAffinity(e.target.value as string);
  };

  return {
    affinities,
    selectedAffinity,
    handleChangeSelectedAffinity,
  };
};
