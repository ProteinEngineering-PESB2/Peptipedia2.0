import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { types_go } from "../components/gene_ontology/types";

export const useTypeGeneOnotology = () => {
  const [selectedTypeGO, setSelectedTypeGO] = useState<string>(
    types_go[0].value
  );

  const handleChangeSelectedTypeGO = (e: SelectChangeEvent) => {
    setSelectedTypeGO(e.target.value as string);
  };

  return {
    selectedTypeGO,
    handleChangeSelectedTypeGO,
    types_go,
  };
};
