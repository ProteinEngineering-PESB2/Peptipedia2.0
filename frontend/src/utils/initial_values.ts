import { EnumFileType } from "./enums";
import { ITable, PostData } from "./interfaces";

export const InitialValuePostData: PostData = {
  fileType: EnumFileType.TEXT,
  fastaText: "",
  fastaFile: null,
  fastaFileName: "",
  checkboxs: {
    biological_process: true,
    celular_component: true,
    molecular_function: true,
    charge: true,
    charge_density: true,
    molecular_weight: true,
    isoelectric_point: true,
    length: true,
    aliphatic_index: true,
    aromaticity: true,
    boman_index: true,
    hydrophobic_ratio: true,
    instability_index: true,
    one_hot_encoding: true,
    physicochemical_properties: true,
    digital_signal_processing: true,
    acc: true,
    diso: true,
    ss3: true,
    ss8: true,
    tm2: true,
    tm8: true,
  },
  csvFile: null,
  csvFileName: "",
};

export const InitialValueTable: ITable = {
  columns: [],
  data: [],
};
