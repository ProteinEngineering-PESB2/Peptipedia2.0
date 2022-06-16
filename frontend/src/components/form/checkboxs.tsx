import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { EnumCheckbox } from "../../utils/enums";
import { PostData } from "../../utils/interfaces";
import { checkbox_list, ICheckbox } from "./checkbox_list";

interface Props {
  data: PostData;
  setData: Dispatch<SetStateAction<PostData>>;
  selectedCheckboxs: Array<string>;
}

export default function Checkboxs({ data, setData, selectedCheckboxs }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setData({
      ...data,
      checkboxs: { ...data.checkboxs, [id]: e.target.checked },
    });
  };

  const getChecked = (id: string) => {
    if (id === EnumCheckbox.BIOLOGICAL_PROCESS)
      return data.checkboxs.biological_process;
    if (id === EnumCheckbox.CELULAR_COMPONENT)
      return data.checkboxs.celular_component;
    if (id === EnumCheckbox.MOLECULAR_FUNCTION)
      return data.checkboxs.molecular_function;
    if (id === EnumCheckbox.CHARGE) return data.checkboxs.charge;
    if (id === EnumCheckbox.CHARGE_DENSITY)
      return data.checkboxs.charge_density;
    if (id === EnumCheckbox.ISOELECTRIC_POINT)
      return data.checkboxs.isoelectric_point;
    if (id === EnumCheckbox.MOLECULAR_WEIGHT)
      return data.checkboxs.molecular_weight;
    if (id === EnumCheckbox.LENGTH) return data.checkboxs.length;
  };

  return (
    <FormGroup sx={{ marginY: 1 }}>
      {checkbox_list.map(
        (c: ICheckbox) =>
          selectedCheckboxs.includes(c.id) && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={getChecked(c.id)}
                  onChange={(e) => handleChange(e, c.id)}
                />
              }
              label={c.title}
              key={c.id}
            />
          )
      )}
    </FormGroup>
  );
}
