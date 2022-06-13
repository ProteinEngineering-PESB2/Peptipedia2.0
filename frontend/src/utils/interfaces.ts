export interface PostData {
  fileType: string;
  fastaText: string;
  fastaFile: null | File;
  fastaFileName: string;
  checkboxs: ICheckboxs;
}

interface ICheckboxs {
  molecular_function: boolean;
  biological_process: boolean;
  celular_component: boolean;
}

export interface ITable {
  columns: Array<string>;
  data: Array<Array<any>>;
}

export interface IAlign {
  id: number;
  label: string;
  sequence: string;
}

export interface IFormatDataPfam {
  Accession: string;
  Bitscore: string;
  Class: string;
  Evalue: string;
  Id_accession: string;
  Type: string;
}

export interface IDataPfam {
  id: string;
  data: IFormatDataPfam[];
}
