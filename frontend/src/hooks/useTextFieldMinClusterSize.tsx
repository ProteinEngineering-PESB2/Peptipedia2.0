import { ChangeEvent, useState } from "react";

export const useTextFieldMinClusterSize = () => {
  const [minClusterSize, setMinClusterSize] = useState<string>("5");

  const handleChangeMinClusterSize = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setMinClusterSize(e.target.value);
  };

  return {
    minClusterSize,
    handleChangeMinClusterSize,
  };
};
