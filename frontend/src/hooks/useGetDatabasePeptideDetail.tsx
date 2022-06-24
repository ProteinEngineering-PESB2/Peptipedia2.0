import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

interface Props {
  peptideId: string | undefined;
}

export default function useGetDatabasePeptideDetail({ peptideId }: Props) {
  const [tableDatabases, setTableDatabases] =
    useState<ITable>(InitialValueTable);

  const getDatabasesFromPeptide = async () => {
    try {
      const res = await axios.get(`/api/get_db_from_peptide/${peptideId}`);
      let new_data = [];
      if (res.data.result.data.length > 0) {
        for (let i = 0; i < res.data.result.data.length; i++) {
          let parcial_data = [
            res.data.result.data[i][0],
            res.data.result.data[i][1] === null ? (
              <RemoveIcon />
            ) : (
              res.data.result.data[i][1]
            ),
          ];
          new_data.push(parcial_data);
        }
      }
      setTableDatabases({ columns: res.data.result.columns, data: new_data });
    } catch (error) {
      toast.error("Server Error");
      setTableDatabases(InitialValueTable);
    }
  };

  useEffect(() => {
    getDatabasesFromPeptide()
  }, [])

  return {
    tableDatabases
  };
}
