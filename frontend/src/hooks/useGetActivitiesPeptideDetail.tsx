import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { InitialValueTable } from "../utils/initial_values";
import { ITable } from "../utils/interfaces";

interface Props {
  peptideId: string | undefined;
}

export default function useGetActivitiesPeptideDetail({ peptideId }: Props) {
  const [tableActivities, setTableActivities] =
    useState<ITable>(InitialValueTable);

  const getActivitiesFromPeptide = async () => {
    try {
      const { data } = await axios.get(
        `/api/get_act_from_peptide/${peptideId}`
      );

      let new_data = [];
      if (data.result.data.length > 0) {
        for (let i = 0; i < data.result.data.length; i++) {
          let parcial_data = [
            data.result.data[i][0],
            data.result.data[i][1] ? (
              <CheckBoxIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            ),
          ];
          new_data.push(parcial_data);
        }
      }
      setTableActivities({ columns: data.result.columns, data: new_data });
    } catch (error) {
      toast.error("Server Error");
      setTableActivities(InitialValueTable);
    }
  };

  useEffect(() => {
    getActivitiesFromPeptide();
  }, []);

  return {
    tableActivities,
  };
}
