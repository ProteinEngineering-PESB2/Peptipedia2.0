import { FormControl, Autocomplete, TextField } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface Props {
  options: string[];
  value: string | null;
  handleChangeValue: (
    e: SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => void;
  title: string;
}

export default function AutocompleteComponent({
  options,
  value,
  handleChangeValue,
  title,
}: Props) {
  return (
    <FormControl fullWidth>
      <Autocomplete
        value={value}
        onChange={handleChangeValue}
        options={options}
        renderInput={(params) => <TextField {...params} label={title} />}
        sx={{
          width: {
            xs: "100%",
            sm: "30rem",
            md: "30rem",
            lg: "30rem",
            xl: "30rem",
          },
        }}
      />
    </FormControl>
  );
}
