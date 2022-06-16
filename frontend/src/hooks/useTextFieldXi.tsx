import { ChangeEvent, useState } from "react";

export const useTextFieldXi = () => {
  const [xi, setXi] = useState("0.05");

  const handleChangeXi = (e: ChangeEvent<HTMLInputElement>): void => {
    setXi(e.target.value);
  };

  return {
    xi,
    handleChangeXi,
  };
};
