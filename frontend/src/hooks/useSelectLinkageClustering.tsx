import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { linkages } from "../utils/linkages";

export const useSelectLinkageClustering = () => {
  const [selectedLinkage, setSelectedLinkage] = useState<string>(
    linkages[0].value
  );

  const handleChangeSelectedLinkage = (e: SelectChangeEvent): void => {
    setSelectedLinkage(e.target.value as string);
  };

  return {
    linkages,
    selectedLinkage,
    handleChangeSelectedLinkage,
  };
};
