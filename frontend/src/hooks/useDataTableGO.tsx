import { useEffect, useState } from "react";
import { InitialValueTable } from "../utils/initial_values";
import { IDataGeneOntology, ITable } from "../utils/interfaces";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Link } from "@mui/material";

interface Props {
  result: IDataGeneOntology[];
  type: string | null;
  sequence: string | null;
}

export const useDataTableGO = ({ result, sequence, type }: Props) => {
  const [table, setTable] = useState<ITable>(InitialValueTable);

  useEffect(() => {
    const rows: any[] = [];

    for (let row in result) {
      if (result[row]["type"] === type) {
        for (let new_row in result[row]["prediction"]) {
          if (result[row]["prediction"][new_row]["id_seq"] === sequence) {
            result[row]["prediction"][new_row]["results"].map((c) => {
              const row_insert = [];
              c.id_go ? row_insert.push(c.id_go) : <QuestionMarkIcon />;
              c.probability ? (
                row_insert.push(c.probability)
              ) : (
                <QuestionMarkIcon />
              );
              c.term ? row_insert.push(c.term) : <QuestionMarkIcon />;
              c.id_go ? (
                row_insert.push(
                  <Link
                    href={`http://amigo.geneontology.org/amigo/term/${c.id_go}`}
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

              rows.push(row_insert);
            });

            break;
          }
        }
      }
    }

    setTable({
      ...table,
      columns: ["ID", "Probability", "Term", "Options"],
      data: rows,
    });
  }, [sequence, type]);

  return {
    table,
  };
};
