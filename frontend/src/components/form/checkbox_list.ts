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
  {
    id: EnumCheckbox.LENGTH,
    title: "Length",
  },
  {
    id: EnumCheckbox.MOLECULAR_WEIGHT,
    title: "Molecular Weight",
  },
  {
    id: EnumCheckbox.ISOELECTRIC_POINT,
    title: "Isoelectric Point",
  },
  {
    id: EnumCheckbox.CHARGE,
    title: "Charge",
  },
  {
    id: EnumCheckbox.CHARGE_DENSITY,
    title: "Charge Density",
  },
  {
    id: EnumCheckbox.ONE_HOT_ENCODING,
    title: "One Hot Encoding",
  },
  {
    id: EnumCheckbox.PHYSICOCHEMICAL_PROPERTIES,
    title: "Physicochemical Properties",
  },
  {
    id: EnumCheckbox.DIGITAL_SIGNAL_PROCESSING,
    title: "Digital Signal Processing",
  },
];
