import { EnumFileType } from "./enums";
import { ITable, PostData } from "./interfaces";

export const InitialValuePostData: PostData = {
  fileType: EnumFileType.TEXT,
  fastaText: "",
  fastaFile: null,
  fastaFileName: "",
};

export const InitialValueTable: ITable = {
  columns: [],
  data: [],
};
