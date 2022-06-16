import { ChangeEvent, useState } from "react";

export const useTextFieldMinSamples = () => {
  const [minSamples, setMinSamples] = useState("5");

  const handleChangeMinSamples = (e: ChangeEvent<HTMLInputElement>): void => {
    setMinSamples(e.target.value);
  };

  return {
    minSamples,
    handleChangeMinSamples,
  };
};
