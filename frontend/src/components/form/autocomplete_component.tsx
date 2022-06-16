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
    <FormControl>
      <Autocomplete
        value={value}
        onChange={handleChangeValue}
        options={options}
        renderInput={(params) => <TextField {...params} label={title} />}
        sx={{
          width: {
            xs: "100%",
            sm: "20rem",
            md: "20rem",
            lg: "20rem",
            xl: "20rem",
          },
        }}
      />
    </FormControl>
  );
}
