import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import toast from "react-hot-toast";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";

export default function useGetDBStatistics() {
  const [tableStatistics, setTableStatistics] =
    useState<ITable>(InitialValueTable);

  const getDbStatistics = async () => {
    const res = await axios.get("/api/get_db_statistics/");

    const new_data = [];
    for (let i = 0; i < res.data.data.length; i++) {
      if (res.data.data[i].length === 3) {
        const parcial_data = [
          <Link
            href={res.data.data[i][2]}
            target="_blank"
            sx={{ textDecoration: "none" }}
          >
            {res.data.data[i][0]}
          </Link>,
          res.data.data[i][1],
        ];
        new_data.push(parcial_data);
      }
    }

    setTableStatistics({
      columns: [res.data.columns[0], res.data.columns[1]],
      data: new_data,
    });
  };

  useEffect(() => {
    try {
      getDbStatistics();
    } catch (error) {
      toast.error("Server error");
    }
  }, []);

  return {
    tableStatistics,
  };
}
