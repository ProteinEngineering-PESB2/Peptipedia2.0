import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { standarizations } from "../utils/standarization";

export function useStandarization() {
  const [selectedStandarization, setSelectedStandarization] = useState<string>(
    standarizations[0].value
  );

  const handleChangeSelectedStandarization = (e: SelectChangeEvent): void => {
    setSelectedStandarization(e.target.value as string);
  };

  return {
    selectedStandarization,
    standarizations,
    handleChangeSelectedStandarization,
  };
}
