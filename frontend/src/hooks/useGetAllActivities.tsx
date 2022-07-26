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
  const [showSkeletonBoxplot, setShowSkeletonBoxplot] =
    useState<boolean>(false);
  const [loadingTableActivities, setLoadingTableActivities] =
    useState<boolean>(true);

  const getSpecificActivity = async (id: string | number, name: string) => {
    try {
      setShowSkeletonBoxplot(true);

      const res = await axios.get(`/api/get_specific_act_statistics/${id}`);

      const charge = res.data["charge"];
      const charge_density = res.data["charge_density"];
      const isoelectric_point = res.data["isoelectric_point"];
      const length = res.data["length"];
      const molecular_weight = res.data["molecular_weight"];

      const charge_trace = {
        type: "box",
        y: [
          charge["min"],
          charge["25%"],
          charge["mean"],
          charge["75%"],
          charge["max"],
        ],
        name: "Charge",
      };

      const charge_density_trace = {
        type: "box",
        y: [
          charge_density["min"],
          charge_density["25%"],
          charge_density["mean"],
          charge_density["75%"],
          charge_density["max"],
        ],
        xaxis: "x2",
        yaxis: "y2",
        name: "Charge Density",
      };

      const isoelectric_point_trace = {
        type: "box",
        y: [
          isoelectric_point["min"],
          isoelectric_point["25%"],
          isoelectric_point["mean"],
          isoelectric_point["75%"],
          isoelectric_point["max"],
        ],
        xaxis: "x3",
        yaxis: "y3",
        name: "Isoelectric Point",
      };

      const length_trace = {
        type: "box",
        y: [
          length["min"],
          length["25%"],
          length["mean"],
          length["75%"],
          length["max"],
        ],
        xaxis: "x4",
        yaxis: "y4",
        name: "Length",
      };

      const molecular_weight_trace = {
        type: "box",
        y: [
          molecular_weight["min"],
          molecular_weight["25%"],
          molecular_weight["mean"],
          molecular_weight["75%"],
          molecular_weight["max"],
        ],
        xaxis: "x5",
        yaxis: "y5",
        name: "Molecular Weight",
      };

      const data = [
        charge_trace,
        charge_density_trace,
        isoelectric_point_trace,
        length_trace,
        molecular_weight_trace,
      ];

      setDataBoxplot(data);
      setNameActivity(name);
      setShowSkeletonBoxplot(false);
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
    setLoadingTableActivities(false);
  };

  useEffect(() => {
    try {
      getAllActivities();
    } catch (error) {
      toast.error("Server error");
      setLoadingTableActivities(false);
    }
  }, []);

  return {
    tableActivitiies,
    dataBoxplot,
    nameActivity,
    showSkeletonBoxplot,
    loadingTableActivities,
  };
}
