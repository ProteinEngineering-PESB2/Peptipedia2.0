import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import toast from "react-hot-toast";
import { ITable } from "../utils/interfaces";
import { InitialValueTable } from "../utils/initial_values";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function useGetDBStatistics() {
  const [tableStatistics, setTableStatistics] =
    useState<ITable>(InitialValueTable);
  const [loadingTableStatistics, setLoadingTableStatistics] =
    useState<boolean>(true);

  const getDbStatistics = async () => {
    const res = await axios.get("/api/get_db_statistics/");

    const new_data = [];
    for (let i = 0; i < res.data.data.length; i++) {
      if (res.data.data[i].length === 3) {
        const parcial_data = [
          res.data.data[i][0],
          res.data.data[i][1],
          <Link
            href={res.data.data[i][2]}
            target="_blank"
            sx={{ textDecoration: "none" }}
          >
            <RemoveRedEyeIcon />
          </Link>,
        ];
        new_data.push(parcial_data);
      }
    }

    setTableStatistics({
      columns: [res.data.columns[0], res.data.columns[1], "Options"],
      data: new_data,
    });
    setLoadingTableStatistics(false);
  };

  useEffect(() => {
    try {
      getDbStatistics();
    } catch (error) {
      toast.error("Server error");
      setLoadingTableStatistics(false);
    }
  }, []);

  return {
    tableStatistics,
    loadingTableStatistics,
  };
}
