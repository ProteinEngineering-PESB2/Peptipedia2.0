import { useEffect, useState } from "react";
import { IDataPfam, ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Link } from "@mui/material";

interface Props {
  result: IDataPfam[];
  selectedSequence: string | null;
}

export function useDataTablePfam({ result, selectedSequence }: Props) {
  const [table, setTable] = useState<ITable>(InitialValueTable);

  useEffect(() => {
    const rows = [];
    for (let row in result) {
      if (result[row].id === selectedSequence) {
        for (let data_row in result[row].data) {
          const new_row = [];
          result[row].data[data_row]["Accession"] ? (
            new_row.push(result[row].data[data_row]["Accession"])
          ) : (
            <QuestionMarkIcon />
          );
          result[row].data[data_row]["Bitscore"] ? (
            new_row.push(result[row].data[data_row]["Bitscore"])
          ) : (
            <QuestionMarkIcon />
          );
          result[row].data[data_row]["Class"] ? (
            new_row.push(result[row].data[data_row]["Class"])
          ) : (
            <QuestionMarkIcon />
          );
          result[row].data[data_row]["Evalue"] ? (
            new_row.push(result[row].data[data_row]["Evalue"])
          ) : (
            <QuestionMarkIcon />
          );
          result[row].data[data_row]["Id_accession"] ? (
            new_row.push(result[row].data[data_row]["Id_accession"])
          ) : (
            <QuestionMarkIcon />
          );
          result[row].data[data_row]["Accession"] ? (
            new_row.push(
              <Link
                href={`http://pfam.xfam.org/family/${result[row].data[data_row]["Accession"]}`}
                target="_blank"
              >
                <Button>
                  <VisibilityIcon />
                </Button>
              </Link>
            )
          ) : (
            <QuestionMarkIcon />
          );
          rows.push(new_row);
        }
        break;
      }
    }

    setTable({
      ...table,
      columns: [
        "Accession",
        "Bitscore",
        "Class",
        "Evalue",
        "Id_accession",
        "Options",
      ],
      data: rows,
    });
  }, [selectedSequence]);

  return {
    table,
  };
}
