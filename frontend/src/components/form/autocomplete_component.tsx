import { FormControl, Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent } from "react";

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
      />
    </FormControl>
  );
}
