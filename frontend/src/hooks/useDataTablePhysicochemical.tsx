import { useEffect, useState } from "react";
import { IDataPhysichochemical, ITable } from "../utils/interfaces";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { InitialValueTable } from "../utils/initial_values";

interface Props {
  result: IDataPhysichochemical[];
}

export const useDataTablePhysicochemical = ({ result }: Props) => {
  const [table, setTable] = useState<ITable>(InitialValueTable);

  useEffect(() => {
    const rows: any[] = [];

    for (let row in result) {
      const new_row = [];
      result[row].id ? new_row.push(result[row].id) : <QuestionMarkIcon />;
      result[row].length ? (
        new_row.push(result[row].length)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].molecular_weight ? (
        new_row.push(result[row].molecular_weight)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].isoelectric_point ? (
        new_row.push(result[row].isoelectric_point)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].charge ? (
        new_row.push(result[row].charge)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].charge_density ? (
        new_row.push(result[row].charge_density)
      ) : (
        <QuestionMarkIcon />
      );

      rows.push(new_row);
    }

    const columns: string[] = [];
    const keys = Object.keys(result[0]);

    keys.includes("id") && columns.push("ID");
    keys.includes("length") && columns.push("Length");
    keys.includes("molecular_weight") && columns.push("Molecular Weight");
    keys.includes("isoelectric_point") && columns.push("Isoelectric Point");
    keys.includes("charge") && columns.push("Charge");
    keys.includes("charge_density") && columns.push("Charge Density");

    setTable({
      ...table,
      columns: columns,
      data: rows,
    });
  }, []);

  return {
    table,
  };
};
