import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

interface Props {
  peptideId: string | undefined;
}

export default function useGetPfamPeptideDetail({ peptideId }: Props) {
  const [tablePfam, setTablePfam] = useState<ITable>(InitialValueTable);

  const getPfamFromPeptide = async () => {
    try {
      const { data } = await axios.get(
        `/api/get_pfam_from_peptide/${peptideId}`
      );
      const new_data = [];
      for (let i = 0; i < data.result.data.length; i++) {
        const accession = data.result.data[i][0] ? data.result.data[i][0] : "";
        const new_array = [
          ...data.result.data[i],
          <Button>
            <a
              href={`http://pfam.xfam.org/family/${accession}`}
              target="_blank"
              rel="noreferrer"
            >
              <VisibilityIcon />
            </a>
          </Button>,
        ];
        new_data.push(new_array);
      }

      const new_columns = [...data.result.columns, "Options"];
      setTablePfam({ data: new_data, columns: new_columns });
    } catch (error) {
      toast.error("Server Error");
      setTablePfam(InitialValueTable);
    }
  };

  useEffect(() => {
    getPfamFromPeptide();
  }, []);

  return {
    tablePfam,
  };
}
