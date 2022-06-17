import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { test_size } from "../utils/test_size";

export const useTestSize = () => {
  const [selectedTestSize, setSelectedTestSize] = useState<string>(
    test_size[0].value
  );

  const handleChangeSelectedTestSize = (e: SelectChangeEvent): void => {
    setSelectedTestSize(e.target.value as string);
  };

  return {
    selectedTestSize,
    handleChangeSelectedTestSize,
    test_size
  };
};
