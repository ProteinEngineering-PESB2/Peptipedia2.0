import { EnumCheckbox } from "../../utils/enums";

export interface ICheckbox {
  id: string;
  title: string;
}

export const checkbox_list: ICheckbox[] = [
  {
    id: EnumCheckbox.MOLECULAR_FUNCTION,
    title: "Molecular Function",
  },
  {
    id: EnumCheckbox.BIOLOGICAL_PROCESS,
    title: "Biological Process",
  },
  {
    id: EnumCheckbox.CELULAR_COMPONENT,
    title: "Celular Component",
  },
];
