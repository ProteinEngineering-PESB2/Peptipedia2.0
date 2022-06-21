import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "@mui/material";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

export default function useGetAllActivities() {
  const [tableActivitiies, setTableActivities] =
    useState<ITable>(InitialValueTable);
  const [dataBoxplot, setDataBoxplot] = useState<any[]>([]);
  const [nameActivity, setNameActivity] = useState<string>("");

  const getSpecificActivity = async (id: string | number, name: string) => {
    try {
      const res = await axios.get(`/api/get_specific_act_statistics/${id}`);
      setDataBoxplot(res.data.data);
      setNameActivity(name);
    } catch (error) {
      toast.error("Server error");
    }
  };

  const getAllActivities = async () => {
    const res = await axios.get("/api/get_all_act_statistics/");
    const new_data = [];
    for (let i = 0; i < res.data.data.length; i++) {
      if (res.data.data[i].length === 3) {
        const parcial_data = [
          <Link
            onClick={() =>
              getSpecificActivity(res.data.data[i][0], res.data.data[i][1])
            }
            sx={{ textDecoration: "none", cursor: "pointer" }}
          >
            {res.data.data[i][1]}
          </Link>,
          res.data.data[i][2],
        ];
        new_data.push(parcial_data);
      }
    }

    setTableActivities({ columns: ["activity", "peptides"], data: new_data });
  };

  useEffect(() => {
    try {
      getAllActivities();
    } catch (error) {
      toast.error("Server error");
    }
  }, []);

  return {
    tableActivitiies,
    dataBoxplot,
    nameActivity,
  };
}
