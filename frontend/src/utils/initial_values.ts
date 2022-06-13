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
  },
};

export const InitialValueTable: ITable = {
  columns: [],
  data: [],
};
