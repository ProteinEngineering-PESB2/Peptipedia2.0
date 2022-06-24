import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

interface Props {
  peptideId: string | undefined;
}

export default function useGetGOPeptideDetail({ peptideId }: Props) {
  const [tableGO, setTableGO] = useState<ITable>(InitialValueTable);

  const getGOFromPeptide = async () => {
    try {
      const { data } = await axios.get(`/api/get_go_from_peptide/${peptideId}`);
      console.log(data)
      const new_data = [];
      for (let i = 0; i < data.result.data.length; i++) {
        const id_go = data.result.data[i][0]
          ? data.result.data[i][0]
          : "";
        const new_array = [
          ...data.result.data[i],
          <Button>
            <a
              href={`http://amigo.geneontology.org/amigo/term/${id_go}`}
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
      setTableGO({ columns: new_columns, data: new_data });
    } catch (error) {
      toast.error("Server Error");
      setTableGO(InitialValueTable);
    }
  };

  useEffect(() => {
    getGOFromPeptide();
  }, []);

  return {
    tableGO,
  };
}
