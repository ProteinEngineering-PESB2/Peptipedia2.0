import { useEffect, useState } from "react";
import { InitialValueTable } from "../utils/initial_values";
import { IDataClustering, ITable } from "../utils/interfaces";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface Props {
  result: IDataClustering;
}

export const useDataTableClustering = ({ result }: Props) => {
  const [table, setTable] = useState<ITable>(InitialValueTable);

  useEffect(() => {
    const rows: any[] = [];

    for (let row in result.data) {
      const new_row = [];
      result.data[row].id ? (
        new_row.push(result.data[row].id)
      ) : (
        <QuestionMarkIcon />
      );
      result.data[row].label !== undefined ||
      result.data[row].label !== null ? (
        new_row.push(result.data[row].label)
      ) : (
        <QuestionMarkIcon />
      );

      rows.push(new_row);
    }

    setTable({
      ...table,
      columns: ["ID", "Label"],
      data: rows,
    });
  }, []);

  return {
    table,
  };
};
