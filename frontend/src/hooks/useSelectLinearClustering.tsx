import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { kernels } from "../utils/kernels";

export const useSelectLinearClustering = () => {
  const [selectedKernel, setSelectedKernel] = useState<string>(
    kernels[0].value
  );

  const handleChangeSelectedKernel = (e: SelectChangeEvent): void => {
    setSelectedKernel(e.target.value as string);
  };

  return {
    selectedKernel,
    handleChangeSelectedKernel,
    kernels
  };
};
