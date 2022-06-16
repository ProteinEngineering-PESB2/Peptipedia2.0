import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { properties } from "../utils/proterties";

export const useSelectProperty = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>(
    properties[0].value
  );

  const handleChangeSelectedProperty = (e: SelectChangeEvent): void => {
    setSelectedProperty(e.target.value as string);
  };

  return {
    properties,
    selectedProperty,
    handleChangeSelectedProperty,
  };
};
