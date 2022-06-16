import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { encodings } from "../utils/encodings";

export const useSelectEncoding= () => {
  const [selectedEncoding, setSelectedEncoding] = useState<string>(
    encodings[0].value
  );

  const handleChangeSelectedEncoding = (e: SelectChangeEvent): void => {
    setSelectedEncoding(e.target.value as string);
  };

  return {
    selectedEncoding,
    handleChangeSelectedEncoding,
    encodings,
  };
};
