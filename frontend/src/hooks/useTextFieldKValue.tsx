import { ChangeEvent, useState } from "react";

export const useTextFieldKValue = () => {
  const [kvalue, setKValue] = useState<string>("2");

  const handleChangeKValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setKValue(e.target.value);
  };

  return {
    kvalue,
    handleChangeKValue,
  };
};
