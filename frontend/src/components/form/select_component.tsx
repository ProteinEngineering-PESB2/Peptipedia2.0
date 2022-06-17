import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IItemSelect } from "../../utils/interfaces";

interface Props {
  title: string;
  value: string;
  handleChange: (e: SelectChangeEvent) => void;
  items: IItemSelect[];
  disabled?: boolean
}

export default function SelectComponent({
  title,
  value,
  handleChange,
  items,
  disabled
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{title}</InputLabel>
      <Select
        labelId="select-label"
        label={title}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {items.map((i) => (
          <MenuItem key={i.value} value={i.value}>
            {i.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
