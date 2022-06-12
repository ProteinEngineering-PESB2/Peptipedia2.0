export interface PostData {
  fileType: string;
  fastaText: string;
  fastaFile: null | File;
  fastaFileName: string;
}

export interface ITable {
  columns: Array<string>;
  data: Array<Array<string | number>>;
}

export interface IAlign {
    id: number
    label: string
    sequence: string
}