import { useEffect, useState } from "react";
import { IDataPhysichochemical, ITable } from "../utils/interfaces";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { InitialValueTable } from "../utils/initial_values";
import { Button, Stack } from "@mui/material";

interface Props {
  result: IDataPhysichochemical[];
}

export const useDataTablePhysicochemical = ({ result }: Props) => {
  const [table, setTable] = useState<ITable>(InitialValueTable);
  const [imagePlot, setImagePlot] = useState<string>("");

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
      result[row].aliphatic_index ? (
        new_row.push(result[row].aliphatic_index)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].aromaticity ? (
        new_row.push(result[row].aromaticity)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].boman_index ? (
        new_row.push(result[row].boman_index)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].hydrophobic_ratio ? (
        new_row.push(result[row].hydrophobic_ratio)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].instability_index ? (
        new_row.push(result[row].instability_index)
      ) : (
        <QuestionMarkIcon />
      );
      result[row].helical_path && result[row].profile_path ? (
        new_row.push(
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setImagePlot(result[row].profile_path)}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setImagePlot(result[row].helical_path)}
            >
              Helical
            </Button>
          </Stack>
        )
      ) : (
        <QuestionMarkIcon />
      );

      rows.push(new_row);
    }

    const columns: string[] = [];
    const keys = Object.keys(result[0]);

    keys.includes("id") && columns.push("ID");
    keys.includes("length") && columns.push("Length");
    keys.includes("molecular_weight") &&
      columns.push("Molecular Weight (PM/MW)");
    keys.includes("isoelectric_point") &&
      columns.push("Isoelectric Point (pH)");
    keys.includes("charge") && columns.push("Charge (pH)");
    keys.includes("charge_density") && columns.push("Charge Density (pH)");
    keys.includes("aliphatic_index") && columns.push("Aliphatic Index (v)");
    keys.includes("aromaticity") && columns.push("Aromaticity");
    keys.includes("boman_index") && columns.push("Boman Index (Kcal/mol)");
    keys.includes("hydrophobic_ratio") && columns.push("Hydrophobic Ratio");
    keys.includes("instability_index") && columns.push("Instability Index");
    columns.push("Options");

    setTable({
      ...table,
      columns: columns,
      data: rows,
    });
  }, []);

  return {
    table,
    imagePlot,
  };
};
